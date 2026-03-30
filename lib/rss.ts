import Parser from "rss-parser";
import { cacheLife } from "next/cache";
import type { NewsItem } from "@/types/news";

// rss-parser'a ek XML alanları için tip genişletmesi
type RawItem = {
  "media:content"?: { $?: { url?: string }; url?: string };
  "media:thumbnail"?: { $?: { url?: string }; url?: string };
  enclosure?: { url?: string };
  image?: string | { url?: string };
};

const parser = new Parser<Record<string, unknown>, RawItem>({
  customFields: {
    item: [
      ["media:content",   "media:content"],
      ["media:thumbnail", "media:thumbnail"],
      ["enclosure",       "enclosure"],
      ["image",           "image"],
    ],
  },
});

// ─── Yurt-echo'dan alınan: 7 stratejili görsel çözümleme ─────────────────────

function isValidImage(url: unknown): url is string {
  if (!url || typeof url !== "string" || url.length < 10) return false;
  try {
    const { pathname } = new URL(url);
    if (pathname.length < 5) return false;
    if (/\.(jpe?g|png|gif|webp|avif)/i.test(pathname)) return true;
    if (/(upload|image|photo|media|cdn|thumb|crop)/i.test(pathname)) return true;
    return false;
  } catch {
    return false;
  }
}

function extractImage(html: string): string {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? "";
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim();
}

function resolveImage(raw: RawItem, content: string, description: string): string | null {
  const mc = raw["media:content"];
  const mt = raw["media:thumbnail"];

  const candidates = [
    raw.enclosure?.url,
    mc?.$?.url ?? mc?.url,
    mt?.$?.url ?? mt?.url,
    typeof raw.image === "string" ? raw.image : (raw.image as { url?: string } | undefined)?.url,
    extractImage(content),
    extractImage(description),
  ];

  return candidates.find(isValidImage) ?? null;
}

// ─── XML normalleştirme — Yeni Şafak'ın <image><url> yapısını enclosure'a dönüştür ───

function preprocessXml(xml: string): string {
  // <image><url>X</url></image>  →  <enclosure url="X" type="image/webp" length="0"/>
  // Sadece tek <url> çocuğu olan <image> taglerini dönüştür (channel-level image hariç)
  return xml.replace(
    /<image>\s*<url>([^<]+)<\/url>\s*<\/image>/gi,
    '<enclosure url="$1" type="image/webp" length="0"/>'
  );
}

// ─── Manuel fetch — User-Agent header ile (bazı RSS sunucuları bot engeli) ───

async function fetchXml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; CinarHaber/1.0)",
      "Accept":     "application/rss+xml, application/xml, text/xml, */*",
    },
    next: { revalidate: 0 }, // cache burada değil, 'use cache' ile yönetiyoruz
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
  return preprocessXml(await res.text());
}

// ─── Tek feed çekme ───────────────────────────────────────────────────────────

async function fetchSingleFeed(url: string, categorySlug: string): Promise<NewsItem[]> {
  try {
    const xml  = await fetchXml(url);
    const feed = await parser.parseString(xml);

    const hostname = (() => {
      try { return new URL(url).hostname; } catch { return categorySlug; }
    })();

    return feed.items.map((item) => {
      const raw         = item as unknown as RawItem;
      const content     = (item as Record<string, string>)["content:encoded"] ?? item.content ?? "";
      const description = item.contentSnippet ?? item.content ?? "";

      return {
        title:       item.title       ?? "",
        link:        item.link        ?? "",
        pubDate:     item.pubDate     ?? new Date().toISOString(),
        description: stripHtml(description).slice(0, 220),
        imageUrl:    resolveImage(raw, content, description),
        category:    categorySlug,
        source:      hostname,
        guid:        item.guid ?? item.link ?? "",
        author:      item.creator ?? (item as Record<string, string>)["dc:creator"] ?? undefined,
      };
    });
  } catch (err) {
    console.error(`[RSS] fetch failed: ${url} —`, err);
    return [];
  }
}

// ─── Dedup yardımcısı ─────────────────────────────────────────────────────────

function dedup(items: NewsItem[]): NewsItem[] {
  return items.filter(
    (item, i, self) => i === self.findIndex((t) => t.guid === item.guid)
  );
}

// ─── Public API (cached) ──────────────────────────────────────────────────────

export async function getNewsByCategory(
  categorySlug: string,
  feedUrls: string[]
): Promise<NewsItem[]> {
  "use cache";
  cacheLife("minutes");

  const results = await Promise.allSettled(
    feedUrls.map((url) => fetchSingleFeed(url, categorySlug))
  );

  return dedup(
    results
      .filter((r): r is PromiseFulfilledResult<NewsItem[]> => r.status === "fulfilled")
      .flatMap((r) => r.value)
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
  );
}

export async function getAllLatestNews(limit = 30): Promise<NewsItem[]> {
  "use cache";
  cacheLife("minutes");

  const { CATEGORIES } = await import("./categories");

  const allFeeds = Object.entries(CATEGORIES).flatMap(([key, cat]) =>
    cat.rssFeeds.map((url) => fetchSingleFeed(url, key))
  );

  const results = await Promise.allSettled(allFeeds);

  return dedup(
    results
      .filter((r): r is PromiseFulfilledResult<NewsItem[]> => r.status === "fulfilled")
      .flatMap((r) => r.value)
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
  ).slice(0, limit);
}

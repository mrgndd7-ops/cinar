import Parser from "rss-parser";
import { cacheLife } from "next/cache";
import type { NewsItem } from "@/types/news";

type CustomItem = {
  "media:content": { $: { url: string } };
  enclosure: { url: string };
};

const parser = new Parser<Record<string, unknown>, CustomItem>({
  customFields: {
    item: [
      ["media:content", "media:content"],
      ["enclosure", "enclosure"],
    ],
  },
});

function extractImageFromContent(content: string): string | null {
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

async function fetchSingleFeed(
  url: string,
  categorySlug: string
): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(url);
    let hostname = categorySlug;
    try {
      hostname = new URL(url).hostname;
    } catch {}

    return feed.items.map((item) => ({
      title: item.title ?? "",
      link: item.link ?? "",
      pubDate: item.pubDate ?? new Date().toISOString(),
      description: item.contentSnippet ?? item.content ?? "",
      imageUrl:
        (item as unknown as CustomItem)?.["media:content"]?.$?.url ??
        (item as unknown as CustomItem)?.enclosure?.url ??
        extractImageFromContent(item.content ?? "") ??
        null,
      category: categorySlug,
      source: hostname,
      guid: item.guid ?? item.link ?? "",
    }));
  } catch (error) {
    console.error(`RSS fetch failed for ${url}:`, error);
    return [];
  }
}

function dedup(items: NewsItem[]): NewsItem[] {
  return items.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.guid === item.guid)
  );
}

export async function getNewsByCategory(
  categorySlug: string,
  feedUrls: string[]
): Promise<NewsItem[]> {
  "use cache";
  cacheLife("minutes");

  const results = await Promise.allSettled(
    feedUrls.map((url) => fetchSingleFeed(url, categorySlug))
  );

  const allItems = results
    .filter(
      (r): r is PromiseFulfilledResult<NewsItem[]> => r.status === "fulfilled"
    )
    .flatMap((r) => r.value);

  return dedup(allItems).sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
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
      .filter(
        (r): r is PromiseFulfilledResult<NewsItem[]> => r.status === "fulfilled"
      )
      .flatMap((r) => r.value)
      .sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      )
  ).slice(0, limit);
}

// formatPubDate lib/utils.ts'e taşındı (client component'ler kullanabilsin)

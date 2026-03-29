import { CATEGORIES } from "@/lib/categories";
import { getNewsByCategory, getAllLatestNews } from "@/lib/rss";
import DailyQuote from "@/components/ui/DailyQuote";
import BreakingNewsBanner from "@/components/home/BreakingNewsBanner";
import HeroSection from "@/components/home/HeroSection";
import QuickAgendaStrip from "@/components/home/QuickAgendaStrip";
import CategorySection from "@/components/home/CategorySection";

export default async function HomePage() {
  const [
    latestNews,
    gundemNews,
    siyasetNews,
    toplumNews,
    ekonomiNews,
    dunyaNews,
    aileNews,
    egitimNews,
    kulturNews,
  ] = await Promise.all([
    getAllLatestNews(20),
    getNewsByCategory("gundem", CATEGORIES.gundem.rssFeeds as unknown as string[]),
    getNewsByCategory("siyaset", CATEGORIES.siyaset.rssFeeds as unknown as string[]),
    getNewsByCategory("toplum", CATEGORIES.toplum.rssFeeds as unknown as string[]),
    getNewsByCategory("ekonomi", CATEGORIES.ekonomi.rssFeeds as unknown as string[]),
    getNewsByCategory("dunya", CATEGORIES.dunya.rssFeeds as unknown as string[]),
    getNewsByCategory("aile", CATEGORIES.aile.rssFeeds as unknown as string[]),
    getNewsByCategory("egitim", CATEGORIES.egitim.rssFeeds as unknown as string[]),
    getNewsByCategory("kultur", CATEGORIES.kultur.rssFeeds as unknown as string[]),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-16">
      <DailyQuote />
      <BreakingNewsBanner items={latestNews.slice(0, 8)} />
      <HeroSection items={latestNews.slice(0, 3)} />
      <QuickAgendaStrip items={latestNews.slice(3, 9)} />

      <div className="space-y-16">
        <CategorySection
          label="Gündem & Siyaset"
          slug="gundem"
          items={[...gundemNews, ...siyasetNews].slice(0, 4)}
          layout="grid4"
        />

        <CategorySection
          label="Toplum"
          slug="toplum"
          items={toplumNews.slice(0, 4)}
          layout="featured+list"
        />

        <CategorySection
          label="Ekonomi"
          slug="ekonomi"
          items={ekonomiNews.slice(0, 2)}
          layout="grid2"
        />

        <CategorySection
          label="Dünya"
          slug="dunya"
          items={dunyaNews.slice(0, 4)}
          layout="grid4"
        />

        <CategorySection
          label="Aile & Değerler"
          slug="aile"
          items={aileNews.slice(0, 3)}
          layout="grid3"
        />

        <CategorySection
          label="Eğitim"
          slug="egitim"
          items={egitimNews.slice(0, 5)}
          layout="horizontal"
        />

        <CategorySection
          label="Kültür"
          slug="kultur"
          items={kulturNews.slice(0, 2)}
          layout="grid2"
        />
      </div>
    </div>
  );
}

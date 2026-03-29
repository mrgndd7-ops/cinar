import { CATEGORIES } from "@/lib/categories";
import { getNewsByCategory, getAllLatestNews } from "@/lib/rss";
import DailyQuote from "@/components/ui/DailyQuote";
import BreakingNewsBanner from "@/components/home/BreakingNewsBanner";
import HeroSection from "@/components/home/HeroSection";
import QuickAgendaStrip from "@/components/home/QuickAgendaStrip";
import CategorySection from "@/components/home/CategorySection";
import EditorialBakis from "@/components/home/EditorialBakis";

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
    getAllLatestNews(30),
    getNewsByCategory("gundem", [...CATEGORIES.gundem.rssFeeds]),
    getNewsByCategory("siyaset", [...CATEGORIES.siyaset.rssFeeds]),
    getNewsByCategory("toplum", [...CATEGORIES.toplum.rssFeeds]),
    getNewsByCategory("ekonomi", [...CATEGORIES.ekonomi.rssFeeds]),
    getNewsByCategory("dunya", [...CATEGORIES.dunya.rssFeeds]),
    getNewsByCategory("aile", [...CATEGORIES.aile.rssFeeds]),
    getNewsByCategory("egitim", [...CATEGORIES.egitim.rssFeeds]),
    getNewsByCategory("kultur", [...CATEGORIES.kultur.rssFeeds]),
  ]);

  // Hero ilk 3, breaking banner onlarla çakışmasın
  const heroItems = latestNews.slice(0, 3);
  const bannerItems = latestNews.slice(3, 11);
  const agendaItems = latestNews.slice(3, 9);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-16">
      <DailyQuote />
      <BreakingNewsBanner items={bannerItems} />
      <HeroSection items={heroItems} />
      <QuickAgendaStrip items={agendaItems} />

      {/* Ana içerik: sol col-8 + sağ sidebar col-4 */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

        {/* Sol: Kategoriler */}
        <div className="xl:col-span-8 space-y-16">
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
            tinted
          />

          <EditorialBakis />

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
            tinted
          />

          <CategorySection
            label="Aile & Değerler"
            slug="aile"
            items={aileNews.slice(0, 3)}
            layout="grid3"
          />
        </div>

        {/* Sağ Sidebar */}
        <aside className="xl:col-span-4 space-y-10">
          {/* Eğitim */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-1 h-5 bg-[#396759] rounded-full" />
              <h3 className="text-base font-extrabold text-[#154539]">Eğitim</h3>
            </div>
            <div className="flex flex-col gap-5">
              {egitimNews.slice(0, 4).map((item) => (
                <a
                  key={item.guid}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3 items-start"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#efeeea]">
                    {item.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <p className="text-[13px] font-bold text-[#154539] leading-snug group-hover:text-[#77592c] transition-colors line-clamp-3">
                    {item.title}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Divider — bg shift */}
          <div className="bg-[#f5f3ef] rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-1 h-5 bg-[#e8c089] rounded-full" />
              <h3 className="text-base font-extrabold text-[#154539]">Kültür</h3>
            </div>
            <div className="flex flex-col gap-5">
              {kulturNews.slice(0, 3).map((item) => (
                <a
                  key={item.guid}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <p className="text-[13px] font-bold text-[#154539] leading-snug group-hover:text-[#77592c] transition-colors line-clamp-2">
                    {item.title}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Son dakika mini listesi */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-1 h-5 bg-[#77592c] rounded-full" />
              <h3 className="text-base font-extrabold text-[#154539]">Son Dakika</h3>
            </div>
            <div className="flex flex-col gap-3">
              {latestNews.slice(11, 17).map((item, i) => (
                <a
                  key={item.guid}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3"
                >
                  <span className="text-[11px] font-bold text-[#77592c] mt-0.5 w-5 shrink-0 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[13px] font-semibold text-[#154539] leading-snug group-hover:text-[#77592c] transition-colors line-clamp-2">
                    {item.title}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

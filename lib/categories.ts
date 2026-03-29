export const CATEGORIES = {
  gundem: {
    label: "Gündem",
    slug: "gundem",
    description: "Türkiye'nin güncel haberleri ve öne çıkan gelişmeler.",
    rssFeeds: [
      "https://www.yenisafak.com/rss-feeds?category=gundem",
    ],
  },
  siyaset: {
    label: "Siyaset",
    slug: "siyaset",
    description: "Siyasi gelişmeler, meclis haberleri ve parti gündemleri.",
    rssFeeds: [
      "https://www.yenisafak.com/rss-feeds?category=politika",
    ],
  },
  toplum: {
    label: "Toplum",
    slug: "toplum",
    description: "Sosyal konular, toplumsal değişimler ve yaşam haberleri.",
    rssFeeds: [
      "https://www.diyanethaber.com.tr/rss/gundem",
      "https://www.diyanethaber.com.tr/rss/yasam",
    ],
  },
  aile: {
    label: "Aile & Değerler",
    slug: "aile",
    description: "Aile kurumunu, değer eğitimini ve toplumsal bütünlüğü öne çıkaran haberler.",
    rssFeeds: [
      "https://www.diyanethaber.com.tr/rss/aile-1",
    ],
  },
  egitim: {
    label: "Eğitim",
    slug: "egitim",
    description: "Eğitim politikaları, okul haberleri ve akademik gelişmeler.",
    rssFeeds: [
      "https://www.diyanethaber.com.tr/rss/egitim",
      "https://www.yenisafak.com/rss-feeds?category=egitim",
    ],
  },
  ekonomi: {
    label: "Ekonomi",
    slug: "ekonomi",
    description: "Ekonomik gelişmeler, piyasalar ve iş dünyasından haberler.",
    rssFeeds: [
      "https://www.yenisafak.com/rss-feeds?category=turkiye-ekonomisi",
    ],
  },
  dunya: {
    label: "Dünya",
    slug: "dunya",
    description: "Uluslararası haberler, dış politika ve küresel gelişmeler.",
    rssFeeds: [
      "https://www.yenisafak.com/rss-feeds?category=dunya",
    ],
  },
  kultur: {
    label: "Kültür",
    slug: "kultur",
    description: "Kültür, sanat, edebiyat ve medeniyet haberleri.",
    rssFeeds: [
      "https://www.diyanethaber.com.tr/rss/kultur-sanat-haberleri",
    ],
  },
};

export type CategoryKey = keyof typeof CATEGORIES;
export type CategoryValue = (typeof CATEGORIES)[CategoryKey];

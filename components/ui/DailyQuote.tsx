import { cacheLife } from "next/cache";

const QUOTES = [
  { text: "İnsanların en hayırlısı, insanlara faydalı olandır.", source: "Hz. Peygamber (s.a.v.)" },
  { text: "İlim Çin'de de olsa gidiniz.", source: "Hz. Peygamber (s.a.v.)" },
  { text: "Güzel ahlak, dinin yarısıdır.", source: "Hz. Peygamber (s.a.v.)" },
  { text: "Komşusu açken tok yatan bizden değildir.", source: "Hz. Peygamber (s.a.v.)" },
  { text: "Kolaylaştırınız, zorlaştırmayınız.", source: "Hz. Peygamber (s.a.v.)" },
  { text: "Merhamet etmeyene merhamet edilmez.", source: "Hz. Peygamber (s.a.v.)" },
  { text: "Dünya müminin zindanı, kâfirin cennetidir.", source: "Hz. Peygamber (s.a.v.)" },
];

function getTodayQuote() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return QUOTES[dayOfYear % QUOTES.length];
}

export default async function DailyQuote() {
  "use cache";
  cacheLife("days");
  const quote = getTodayQuote();

  return (
    <section className="mb-10 flex justify-center">
      <div className="inline-flex items-center gap-4 bg-[#f5f3ef] px-8 py-3 rounded-full">
        <span className="text-[10px] tracking-widest font-bold text-[#77592c] uppercase shrink-0">
          Günün Sözü
        </span>
        <span className="text-sm font-medium italic text-[#154539]/80 max-w-lg text-center">
          &ldquo;{quote.text}&rdquo;
        </span>
        <div className="w-1.5 h-1.5 bg-[#77592c] rounded-full opacity-40 shrink-0" />
      </div>
    </section>
  );
}

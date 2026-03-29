import type { NewsItem } from "@/types/news";
import { formatPubDate } from "@/lib/rss";

interface QuickAgendaStripProps {
  items: NewsItem[];
}

export default function QuickAgendaStrip({ items }: QuickAgendaStripProps) {
  const visible = items.slice(0, 6);

  if (!visible.length) return null;

  return (
    <section className="mb-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {visible.map((item, i) => (
        <a
          key={item.guid}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-col gap-1.5 group ${
            i > 0 ? "border-l border-[#c0c8c4]/30 pl-4" : ""
          }`}
        >
          <span className="text-[10px] font-bold text-[#77592c] uppercase tracking-widest">
            {new Date(item.pubDate).toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <p className="text-xs font-semibold text-[#154539] leading-tight group-hover:text-[#77592c] transition-colors line-clamp-3">
            {item.title}
          </p>
        </a>
      ))}
    </section>
  );
}

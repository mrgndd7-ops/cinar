import Image from "next/image";
import type { NewsItem } from "@/types/news";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { formatPubDate } from "@/lib/rss";

interface NewsCardProps {
  item: NewsItem;
  priority?: boolean;
}

export default function NewsCard({ item, priority = false }: NewsCardProps) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-xl overflow-hidden hover:shadow-[0_4px_20px_-2px_rgba(21,69,57,0.10)] transition-shadow duration-300"
      style={{ boxShadow: "0 2px 12px -2px rgba(21,69,57,0.05)" }}
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full bg-[#efeeea] flex items-center justify-center">
            <span className="material-symbols-outlined text-[40px] text-[#c0c8c4]">
              image
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#154539]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-[1.2rem] space-y-2.5">
        <CategoryBadge category={item.category} />
        <h3 className="font-headline font-bold text-[#154539] text-[15px] leading-snug group-hover:text-[#77592c] transition-colors line-clamp-3">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-xs text-[#404945] leading-relaxed line-clamp-2 opacity-80">
            {item.description}
          </p>
        )}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] text-[#717975] font-medium">
            {formatPubDate(item.pubDate)}
          </span>
          <span className="text-[10px] text-[#c0c8c4]">·</span>
          <span className="text-[10px] text-[#717975] opacity-60">
            {item.source}
          </span>
        </div>
      </div>
    </a>
  );
}

import Image from "next/image";
import type { NewsItem } from "@/types/news";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { formatPubDate } from "@/lib/utils";

interface NewsCardHorizontalProps {
  item: NewsItem;
  size?: "sm" | "md";
}

export default function NewsCardHorizontal({
  item,
  size = "md",
}: NewsCardHorizontalProps) {
  const imgSize = size === "sm" ? "w-20 h-20" : "w-28 h-28";

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 items-start"
    >
      <div className={`${imgSize} rounded-xl overflow-hidden flex-shrink-0 bg-[#efeeea]`}>
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={112}
            height={112}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px] text-[#c0c8c4]">
              image
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 space-y-1.5 min-w-0">
        <CategoryBadge category={item.category} />
        <h4
          className={`font-headline font-bold text-[#154539] leading-snug group-hover:text-[#77592c] transition-colors line-clamp-3 ${
            size === "sm" ? "text-xs" : "text-sm"
          }`}
        >
          {item.title}
        </h4>
        <span className="text-[10px] text-[#717975]">
          {formatPubDate(item.pubDate)}
        </span>
      </div>
    </a>
  );
}

import Link from "next/link";
import type { NewsItem } from "@/types/news";
import NewsCard from "@/components/news/NewsCard";
import NewsCardHorizontal from "@/components/news/NewsCardHorizontal";
import Image from "next/image";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { formatPubDate } from "@/lib/utils";

type LayoutType = "grid4" | "featured+list" | "grid3" | "grid2" | "horizontal";

interface CategorySectionProps {
  label: string;
  slug: string;
  items: NewsItem[];
  layout?: LayoutType;
  tinted?: boolean;
}

export default function CategorySection({
  label,
  slug,
  items,
  layout = "grid4",
  tinted = false,
}: CategorySectionProps) {
  if (!items.length) return null;

  return (
    <section className={tinted ? "bg-[#f5f3ef] rounded-2xl p-8" : ""}>
      {/* Section Header — background-color shift ile ayırım, border yok */}
      <div className="flex items-end justify-between mb-7">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#77592c] rounded-full" />
            <h2 className="text-xl font-extrabold text-[#154539]">{label}</h2>
          </div>
          {/* Ayraç: border değil, bg shift — kısa dekoratif çizgi */}
          <div className="ml-4 h-0.5 w-12 bg-[#77592c]/30 rounded-full" />
        </div>
        <Link
          href={`/${slug}`}
          className="text-xs font-bold text-[#77592c] hover:opacity-70 transition-opacity flex items-center gap-1"
        >
          Tümünü Gör
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </Link>
      </div>

      {layout === "grid4" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(0, 4).map((item, i) => (
            <NewsCard key={item.guid} item={item} priority={i === 0} />
          ))}
        </div>
      )}

      {layout === "featured+list" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {items[0] && (
            <a
              href={items[0].link}
              target="_blank"
              rel="noopener noreferrer"
              className="group space-y-4 block"
            >
              <div className="overflow-hidden rounded-xl aspect-[4/3]">
                {items[0].imageUrl ? (
                  <Image
                    src={items[0].imageUrl}
                    alt={items[0].title}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-[#efeeea]" />
                )}
              </div>
              <CategoryBadge category={items[0].category} />
              <h3 className="text-xl font-bold text-[#154539] group-hover:text-[#77592c] transition-colors leading-snug">
                {items[0].title}
              </h3>
              {items[0].description && (
                <p className="text-sm text-[#404945]/70 leading-relaxed line-clamp-2">
                  {items[0].description}
                </p>
              )}
              <span className="text-[10px] text-[#717975]">
                {formatPubDate(items[0].pubDate)}
              </span>
            </a>
          )}
          <div className="flex flex-col gap-6">
            {items.slice(1, 4).map((item) => (
              <NewsCardHorizontal key={item.guid} item={item} />
            ))}
          </div>
        </div>
      )}

      {layout === "grid3" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.slice(0, 3).map((item, i) => (
            <NewsCard key={item.guid} item={item} priority={i === 0} />
          ))}
        </div>
      )}

      {layout === "grid2" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.slice(0, 2).map((item, i) => (
            <NewsCard key={item.guid} item={item} priority={i === 0} />
          ))}
        </div>
      )}

      {layout === "horizontal" && (
        <div className="flex flex-col gap-6">
          {items.slice(0, 5).map((item) => (
            <NewsCardHorizontal key={item.guid} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

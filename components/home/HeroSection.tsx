import Image from "next/image";
import type { NewsItem } from "@/types/news";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { formatPubDate } from "@/lib/rss";

interface HeroSectionProps {
  items: NewsItem[];
}

export default function HeroSection({ items }: HeroSectionProps) {
  const [main, ...rest] = items;
  const secondary = rest.slice(0, 2);

  if (!main) return null;

  return (
    <section className="grid grid-cols-12 gap-5 mb-14">
      {/* Ana haber */}
      <a
        href={main.link}
        target="_blank"
        rel="noopener noreferrer"
        className="col-span-12 lg:col-span-8 group relative overflow-hidden rounded-2xl aspect-[16/9] shadow-xl block"
      >
        {main.imageUrl ? (
          <Image
            src={main.imageUrl}
            alt={main.title}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[#2f5d50]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#154539]/90 via-[#154539]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-10 text-white max-w-2xl">
          <CategoryBadge category={main.category} className="mb-3" />
          <h2 className="text-2xl md:text-4xl font-extrabold leading-tight mb-3 tracking-tight">
            {main.title}
          </h2>
          {main.description && (
            <p className="text-white/75 font-medium text-base leading-relaxed hidden md:block line-clamp-2">
              {main.description}
            </p>
          )}
          <span className="text-white/50 text-xs mt-3 block">
            {formatPubDate(main.pubDate)}
          </span>
        </div>
      </a>

      {/* İkincil haberler */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
        {secondary.length === 0 && (
          <div className="flex-1 bg-[#efeeea] rounded-2xl" />
        )}
        {secondary.map((item) => (
          <a
            key={item.guid}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 group relative overflow-hidden rounded-2xl shadow-md block min-h-[160px]"
          >
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-[#2f5d50]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#154539]/85 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 text-white">
              <CategoryBadge category={item.category} className="mb-2" />
              <h3 className="text-lg font-bold leading-snug line-clamp-2">
                {item.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

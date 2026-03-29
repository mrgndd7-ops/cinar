import Image from "next/image";
import type { NewsItem } from "@/types/news";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { formatPubDate } from "@/lib/utils";
import { getFallback } from "@/lib/staticFallbacks";

interface HeroSectionProps {
  items: NewsItem[];
}

// yurt-echo yaklaşımı: ilk dolu feed'i hero olarak kullan,
// boşsa statik fallback göster
export default function HeroSection({ items }: HeroSectionProps) {
  const hasRss = items.length > 0;
  const display = hasRss ? items : getFallback("gundem", 3);

  const [main, ...rest] = display;
  const secondary = rest.slice(0, 2);

  return (
    <section className="grid grid-cols-12 gap-5 mb-14">
      {/* Ana haber */}
      <a
        href={main.link === "#" ? undefined : main.link}
        target={main.link === "#" ? undefined : "_blank"}
        rel="noopener noreferrer"
        className="col-span-12 lg:col-span-8 group relative overflow-hidden rounded-2xl aspect-[16/9] shadow-xl block cursor-pointer"
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
          // Görsel yoksa branded placeholder
          <div className="w-full h-full bg-gradient-to-br from-[#154539] to-[#2f5d50]">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <svg width="120" height="120" viewBox="0 0 36 36" fill="none">
                <path d="M18 4C18 4 10 10 10 18C10 22.4 12.8 26.2 18 28C23.2 26.2 26 22.4 26 18C26 10 18 4 18 4Z" fill="white"/>
                <rect x="17" y="26" width="2" height="6" rx="1" fill="white"/>
              </svg>
            </div>
          </div>
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
          {!hasRss ? (
            <span className="text-white/30 text-xs mt-3 block">Çınar Haber</span>
          ) : (
            <span className="text-white/50 text-xs mt-3 block">
              {formatPubDate(main.pubDate)}
            </span>
          )}
        </div>
      </a>

      {/* İkincil haberler */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
        {secondary.map((item) => (
          <a
            key={item.guid}
            href={item.link === "#" ? undefined : item.link}
            target={item.link === "#" ? undefined : "_blank"}
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
              <div className="w-full h-full bg-gradient-to-br from-[#2f5d50] to-[#154539]" />
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

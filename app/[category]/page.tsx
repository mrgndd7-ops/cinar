import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, type CategoryKey } from "@/lib/categories";
import { getNewsByCategory } from "@/lib/rss";
import { formatPubDate } from "@/lib/utils";
import NewsCard from "@/components/news/NewsCard";
import CategoryBadge from "@/components/ui/CategoryBadge";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES[category as CategoryKey];
  if (!cat) return { title: "Bulunamadı" };
  return {
    title: cat.label,
    description: cat.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ category: slug }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = CATEGORIES[category as CategoryKey];
  if (!cat) notFound();

  const items = await getNewsByCategory(
    category,
    cat.rssFeeds as unknown as string[]
  );

  const [featured, ...rest] = items;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 pb-16">
      {/* Category Header */}
      <div className="mb-10 pb-6" style={{ borderBottom: "2px solid rgba(47,93,80,0.08)" }}>
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1.5 h-8 bg-[#77592c] rounded-full" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#154539] tracking-tight">
            {cat.label}
          </h1>
        </div>
        <p className="text-sm text-[#404945]/70 ml-5 max-w-xl">{cat.description}</p>
      </div>

      {/* Featured */}
      {featured && (
        <a
          href={featured.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block mb-10 rounded-2xl overflow-hidden shadow-lg relative aspect-[21/9]"
        >
          {featured.imageUrl ? (
            <Image
              src={featured.imageUrl}
              alt={featured.title}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="w-full h-full bg-[#2f5d50]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#154539]/85 via-[#154539]/10 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white max-w-3xl">
            <CategoryBadge category={category} className="mb-3" />
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3 tracking-tight">
              {featured.title}
            </h2>
            {featured.description && (
              <p className="text-white/70 text-base leading-relaxed hidden md:block line-clamp-2">
                {featured.description}
              </p>
            )}
            <span className="text-white/50 text-xs mt-2 block">
              {formatPubDate(featured.pubDate)}
            </span>
          </div>
        </a>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((item) => (
            <NewsCard key={item.guid} item={item} />
          ))}
        </div>
      )}

      {items.length === 0 && (
        <div className="text-center py-24 text-[#717975]">
          <span className="material-symbols-outlined text-[64px] block mb-4 opacity-30">
            newspaper
          </span>
          <p className="font-medium">Bu kategoride henüz haber bulunamadı.</p>
          <Link
            href="/"
            className="mt-6 inline-block text-sm font-bold text-[#154539] hover:underline"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      )}
    </div>
  );
}

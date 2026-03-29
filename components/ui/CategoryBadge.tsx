const BADGE_COLORS: Record<string, string> = {
  gundem: "bg-[#154539] text-white",
  siyaset: "bg-[#2f5d50] text-white",
  toplum: "bg-[#77592c] text-white",
  aile: "bg-[#77592c] text-white",
  egitim: "bg-[#396759] text-white",
  ekonomi: "bg-[#404945] text-white",
  dunya: "bg-[#343e4d] text-white",
  kultur: "bg-[#e8c089] text-[#1b1c1a]",
};

const CATEGORY_LABELS: Record<string, string> = {
  gundem: "Gündem",
  siyaset: "Siyaset",
  toplum: "Toplum",
  aile: "Aile & Değerler",
  egitim: "Eğitim",
  ekonomi: "Ekonomi",
  dunya: "Dünya",
  kultur: "Kültür",
};

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export default function CategoryBadge({ category, className = "" }: CategoryBadgeProps) {
  const colorClass = BADGE_COLORS[category] ?? "bg-[#154539] text-white";
  const label = CATEGORY_LABELS[category] ?? category;

  return (
    <span
      className={`inline-block text-[9px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-sm ${colorClass} ${className}`}
    >
      {label}
    </span>
  );
}

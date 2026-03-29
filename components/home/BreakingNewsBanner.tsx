"use client";

import { useEffect, useRef, useState } from "react";
import type { NewsItem } from "@/types/news";

interface BreakingNewsBannerProps {
  items: NewsItem[];
}

export default function BreakingNewsBanner({ items }: BreakingNewsBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
        setVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  if (!items.length) return null;

  const current = items[currentIndex];

  return (
    <section className="mb-8 overflow-hidden bg-white/60 backdrop-blur rounded-xl p-1 flex items-center gap-3 shadow-sm">
      <div className="bg-[#154539] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg flex-shrink-0 tracking-widest">
        SON GELİŞME
      </div>
      <a
        href={current.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center gap-2 min-w-0"
      >
        <span
          className="inline-block w-2 h-2 rounded-full bg-[#77592c] flex-shrink-0"
          style={{
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
        <span
          className={`text-sm font-medium text-[#154539]/90 truncate transition-opacity duration-400 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {current.title}
        </span>
      </a>
      <span className="text-[10px] text-[#717975] flex-shrink-0 pr-2 hidden sm:inline">
        {items.length} haber
      </span>
    </section>
  );
}

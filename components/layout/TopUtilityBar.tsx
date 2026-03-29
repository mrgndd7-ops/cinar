"use client";

import { useState, useEffect } from "react";

const MOCK_RATES = {
  usd: { value: "32.42", trend: "down" as const },
  eur: { value: "35.15", trend: "up" as const },
  altin: { value: "2.445", trend: "up" as const },
};

export default function TopUtilityBar() {
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    setDateStr(
      new Date().toLocaleDateString("tr-TR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  return (
    <div className="w-full bg-[#2f5d50] text-white/90 text-[11px] font-medium py-1.5 px-4 md:px-6 flex justify-between items-center">
      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[13px]">cloud</span>
          <span className="hidden sm:inline">İstanbul</span>
          <span>14°C</span>
        </div>
        <div className="hidden md:flex items-center gap-4 opacity-80 border-l border-white/10 pl-4">
          <span>
            USD {MOCK_RATES.usd.value}{" "}
            <span className="text-red-400">▼</span>
          </span>
          <span>
            EUR {MOCK_RATES.eur.value}{" "}
            <span className="text-emerald-400">▲</span>
          </span>
          <span>
            ALTIN {MOCK_RATES.altin.value}{" "}
            <span className="text-emerald-400">▲</span>
          </span>
        </div>
        {dateStr && (
          <span className="hidden lg:inline text-white/50 border-l border-white/10 pl-4">
            {dateStr}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <a
          href="#"
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <span
            className="material-symbols-outlined text-[13px] text-red-400"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            circle
          </span>
          <span>Canlı Yayın</span>
        </a>
        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
          <span className="material-symbols-outlined text-[15px] cursor-pointer hover:text-white">
            share
          </span>
          <span className="material-symbols-outlined text-[15px] cursor-pointer hover:text-white">
            rss_feed
          </span>
        </div>
      </div>
    </div>
  );
}

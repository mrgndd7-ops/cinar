"use client";

import { useEffect, useState } from "react";

interface MarketItem {
  value: string;
  change: string;
  trend: "up" | "down" | "flat";
}

interface MarketData {
  usd: MarketItem;
  eur: MarketItem;
  altin: MarketItem;
}

function Arrow({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "up")   return <span className="text-emerald-400">▲</span>;
  if (trend === "down") return <span className="text-red-400">▼</span>;
  return null;
}

export default function TopUtilityBar() {
  const [data, setData]       = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/market");
        if (!res.ok) throw new Error("failed");
        const json: MarketData = await res.json();
        if (!cancelled) { setData(json); setLoading(false); }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    const interval = setInterval(load, 5 * 60 * 1000); // 5 dakikada bir yenile
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  return (
    <div className="w-full bg-[#2f5d50] text-white/90 text-[11px] font-medium py-1.5 px-4 md:px-6 flex items-center gap-5 md:gap-7">
      {loading ? (
        <span className="text-white/40">Piyasalar yükleniyor…</span>
      ) : data ? (
        <>
          <span className="flex items-center gap-1 gap-x-1.5">
            <span className="text-white/50 font-semibold">USD</span>
            <span>{data.usd.value}</span>
            <Arrow trend={data.usd.trend} />
          </span>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-x-1.5">
            <span className="text-white/50 font-semibold">EUR</span>
            <span>{data.eur.value}</span>
            <Arrow trend={data.eur.trend} />
          </span>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-x-1.5">
            <span className="text-white/50 font-semibold">ALTIN</span>
            <span>{data.altin.value}</span>
            <Arrow trend={data.altin.trend} />
          </span>
        </>
      ) : (
        <span className="text-white/30">Piyasa verisi alınamadı</span>
      )}
    </div>
  );
}

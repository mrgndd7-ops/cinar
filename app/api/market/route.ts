import { NextResponse } from "next/server";

const TRUNCGIL_URL = "https://finans.truncgil.com/v4/today.json";

export const revalidate = 300; // 5 dakika cache

export async function GET() {
  try {
    const res = await fetch(TRUNCGIL_URL, {
      next: { revalidate: 300 },
      headers: { "Accept": "application/json" },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    const usd   = data["USD"];
    const eur   = data["EUR"];
    const altin = data["GRA"]; // gram altın

    function fmt(val: string | undefined): string {
      const n = parseFloat(val ?? "0");
      return n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function trend(change: string | undefined): "up" | "down" | "flat" {
      const n = parseFloat(change ?? "0");
      if (n > 0) return "up";
      if (n < 0) return "down";
      return "flat";
    }

    return NextResponse.json({
      usd:   { value: fmt(usd?.Selling),   change: usd?.Change,   trend: trend(usd?.Change)   },
      eur:   { value: fmt(eur?.Selling),   change: eur?.Change,   trend: trend(eur?.Change)   },
      altin: { value: fmt(altin?.Selling), change: altin?.Change, trend: trend(altin?.Change) },
    }, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" },
    });
  } catch (err) {
    console.error("[market API]", err);
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }
}

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Çınar — Köklü Habercilik",
    template: "%s | Çınar",
  },
  description:
    "Güvenilir, değer odaklı habercilik. Gündem, siyaset, aile, eğitim ve daha fazlası.",
  openGraph: {
    siteName: "Çınar",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#fbf9f5] text-[#1b1c1a]">
        <Header />
        <main className="flex-1 mt-[88px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

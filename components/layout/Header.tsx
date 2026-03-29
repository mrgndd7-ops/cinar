"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TopUtilityBar from "./TopUtilityBar";

const NAV_LINKS = [
  { label: "Gündem", href: "/gundem" },
  { label: "Siyaset", href: "/siyaset" },
  { label: "Toplum", href: "/toplum" },
  { label: "Aile & Değerler", href: "/aile" },
  { label: "Eğitim", href: "/egitim" },
  { label: "Ekonomi", href: "/ekonomi" },
  { label: "Dünya", href: "/dunya" },
  { label: "Kültür", href: "/kultur" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col">
      <TopUtilityBar />
      <div
        className="glass-header w-full border-b border-[#c0c8c4]/20 shadow-sm"
        style={{ backgroundColor: "rgba(251,249,245,0.88)" }}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 md:px-6 py-3.5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Çınar logo"
            >
              <path
                d="M18 4C18 4 10 10 10 18C10 22.4 12.8 26.2 18 28C23.2 26.2 26 22.4 26 18C26 10 18 4 18 4Z"
                fill="#154539"
              />
              <path
                d="M18 4C18 4 14 14 18 22C22 14 18 4 18 4Z"
                fill="#a0d1c0"
                opacity="0.6"
              />
              <rect x="17" y="26" width="2" height="6" rx="1" fill="#154539" />
            </svg>
            <span className="text-2xl font-extrabold text-[#154539] tracking-tighter leading-none">
              Çınar
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-headline font-bold text-[13px] tracking-tight text-[#154539]">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative transition-colors hover:text-[#77592c] pb-1 ${
                    isActive
                      ? "text-[#77592c] after:content-[''] after:absolute after:-bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#77592c] after:rounded-full"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#154539] cursor-pointer hover:opacity-70 transition-opacity text-[22px] hidden sm:inline">
              search
            </span>
            <div className="hidden sm:block h-4 w-px bg-[#c0c8c4]/50 mx-1" />
            <button className="hidden sm:block text-xs font-bold text-[#154539] hover:opacity-70 transition-opacity">
              Üyelik
            </button>
            <button className="bg-[#154539] text-white px-4 py-2 rounded-xl text-xs font-bold shadow hover:opacity-90 active:scale-95 transition-all">
              Abone Ol
            </button>
            {/* Mobile hamburger */}
            <button
              className="lg:hidden ml-1 flex flex-col gap-1.5 p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menüyü aç"
            >
              <span
                className={`block h-0.5 w-5 bg-[#154539] transition-all duration-200 ${
                  mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-[#154539] transition-all duration-200 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-[#154539] transition-all duration-200 ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu — Framer Motion AnimatePresence */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-[#c0c8c4]/15 bg-[#fbf9f5]/97 backdrop-blur-md"
            >
              <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-0.5">
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.18 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block py-3 px-3 rounded-xl text-sm font-bold transition-colors ${
                          isActive
                            ? "text-[#77592c] bg-[#f5f3ef]"
                            : "text-[#154539] hover:bg-[#f5f3ef]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

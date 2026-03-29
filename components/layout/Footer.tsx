import Link from "next/link";

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

export default function Footer() {
  return (
    <footer className="bg-[#154539] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <svg
                width="32"
                height="32"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 4C18 4 10 10 10 18C10 22.4 12.8 26.2 18 28C23.2 26.2 26 22.4 26 18C26 10 18 4 18 4Z"
                  fill="#a0d1c0"
                />
                <path
                  d="M18 4C18 4 14 14 18 22C22 14 18 4 18 4Z"
                  fill="white"
                  opacity="0.5"
                />
                <rect x="17" y="26" width="2" height="6" rx="1" fill="#a0d1c0" />
              </svg>
              <span className="text-xl font-extrabold tracking-tighter">Çınar</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Köklü habercilik, güvenilir kaynak. Değer odaklı gazetecilik anlayışıyla Türkiye&apos;nin nabzını tutuyoruz.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[10px] text-white/40 font-medium">RSS Kaynakları:</span>
              <span className="text-[10px] text-white/50">Yeni Şafak · Diyanet Haber</span>
            </div>
          </div>

          {/* Kategoriler */}
          <div>
            <h3 className="text-xs font-extrabold tracking-widest uppercase text-[#a0d1c0] mb-5">
              Kategoriler
            </h3>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="text-xs font-extrabold tracking-widest uppercase text-[#a0d1c0] mb-5">
              Kurumsal
            </h3>
            <nav className="flex flex-col gap-2">
              {["Hakkımızda", "Gizlilik Politikası", "Künye", "İletişim"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/40">
          <span>© 2025 Çınar Haber. Tüm hakları saklıdır.</span>
          <span>Dijital Sığınak — Köklülük · Güven · Huzur</span>
        </div>
      </div>
    </footer>
  );
}

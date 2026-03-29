export default function EditorialBakis() {
  return (
    <section className="bg-[#154539] p-10 md:p-14 rounded-3xl relative overflow-hidden">
      {/* Dekoratif arka plan blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#77592c]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#a0d1c0]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1 space-y-5">
          <span className="text-[#77592c] font-bold tracking-[0.2em] text-[11px] uppercase block">
            Editoryal · Bakış
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
            Gündemin Ardından: Sessiz Devrimlerin Hikâyesi
          </h2>
          <p className="text-white/65 leading-relaxed font-light text-[15px]">
            Medyanın gürültüsü içinde kaybolan, toplumu sessizce dönüştüren
            iyilik hareketlerini ve kültürel derinliği inceliyoruz.
          </p>
          <button className="inline-flex items-center gap-2 text-[#77592c] font-bold text-sm border-b border-[#77592c]/60 pb-0.5 hover:gap-4 transition-all duration-200">
            Dosyayı İncele
            <span className="material-symbols-outlined text-[18px]">
              arrow_right_alt
            </span>
          </button>
        </div>

        <div className="w-full md:w-80 shrink-0">
          <div className="bg-white/8 backdrop-blur p-4 rounded-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-[#2f5d50] to-[#154539] flex items-center justify-center">
              <div className="text-center space-y-3 px-8">
                <span className="material-symbols-outlined text-[48px] text-[#a0d1c0]/60">
                  auto_stories
                </span>
                <p className="text-white/50 text-xs font-medium leading-relaxed">
                  Derinlemesine analiz,<br />değer odaklı perspektif
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

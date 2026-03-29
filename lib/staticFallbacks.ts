import type { NewsItem } from "@/types/news";

// RSS başarısız olduğunda gösterilecek statik içerik.
// Yurt-echo mimarisinden alınan yaklaşım: boş feed yerine
// marka sesiyle uyumlu placeholder haberler.

const PLACEHOLDER_IMAGE = null; // görsel yoksa NewsCard placeholder render eder

function makeItem(
  title: string,
  description: string,
  category: string,
  i: number
): NewsItem {
  return {
    title,
    description,
    link:     "#",
    pubDate:  new Date().toISOString(),
    imageUrl: PLACEHOLDER_IMAGE,
    category,
    source:   "çınar",
    guid:     `static-${category}-${i}`,
  };
}

export const STATIC_FALLBACKS: Record<string, NewsItem[]> = {
  gundem: [
    makeItem("Türkiye'nin gündeminde öne çıkan gelişmeler takip ediliyor", "Siyasi ve toplumsal alandaki son gelişmeler mercek altında.", "gundem", 1),
    makeItem("Ankara'dan kritik açıklamalar bekleniyor", "Yetkili kaynaklar gündemdeki konular hakkında açıklama yapacak.", "gundem", 2),
    makeItem("Yurt genelinde önemli gelişmeler yaşanıyor", "Türkiye'nin dört bir yanından gelen haberler derleniyor.", "gundem", 3),
    makeItem("Toplumsal mutabakat çalışmaları sürüyor", "Sivil toplum kuruluşları bir araya geldi.", "gundem", 4),
  ],
  siyaset: [
    makeItem("Meclis gündeminde kritik tartışmalar", "Yasama organı önemli konuları ele alıyor.", "siyaset", 1),
    makeItem("Siyasi partilerden güncel açıklamalar", "Muhalefet ve iktidar son gelişmeleri değerlendirdi.", "siyaset", 2),
    makeItem("Yerel yönetimlerde yeni dönem planlaması", "Büyükşehir belediyeleri stratejik kararlar aldı.", "siyaset", 3),
    makeItem("Cumhurbaşkanlığından diplomatik temas açıklaması", "Dış politikada yeni adımlar atılıyor.", "siyaset", 4),
  ],
  toplum: [
    makeItem("Toplumsal değerlere sahip çıkma çağrısı", "Sivil kuruluşlar bir araya geldi, ortak bildiri yayımladı.", "toplum", 1),
    makeItem("Gönüllü iyilik hareketleri yayılıyor", "Yardım kampanyaları Türkiye genelinde büyüyor.", "toplum", 2),
    makeItem("Komşuluk kültürü yeniden canlanıyor", "Mahalle dayanışması projeleri hayata geçirildi.", "toplum", 3),
    makeItem("Diyanet İşleri Başkanlığından yeni proje", "Toplumsal uyum için yeni adımlar atıldı.", "toplum", 4),
  ],
  aile: [
    makeItem("Aile kurumunu güçlendirme çalışmaları hız kazandı", "Aile politikalarına yönelik kapsamlı strateji açıklandı.", "aile", 1),
    makeItem("Değer eğitiminde yeni yaklaşımlar", "Okullarda karakter eğitimi müfredatı genişletiliyor.", "aile", 2),
    makeItem("Gençlere yönelik manevi destek programları", "Rehberlik hizmetleri yaygınlaştırılıyor.", "aile", 3),
  ],
  egitim: [
    makeItem("Eğitimde yeni dönem: Değer odaklı müfredat", "Milli Eğitim Bakanlığı kapsamlı reform paketini açıkladı.", "egitim", 1),
    makeItem("Öğretmen akademileri yaygınlaşıyor", "Mesleki gelişim programlarına katılım artıyor.", "egitim", 2),
    makeItem("Yerli ders materyalleri hazırlanıyor", "Dijital içerik platformu hizmete giriyor.", "egitim", 3),
    makeItem("Üniversite sınavında yeni düzenleme", "YÖK'ten önemli açıklama geldi.", "egitim", 4),
  ],
  ekonomi: [
    makeItem("Türkiye ekonomisinde yeni teşvik dönemi", "Sanayi ve ticaret alanında kapsamlı destek paketi açıklandı.", "ekonomi", 1),
    makeItem("Hane halkı ekonomisine destek artıyor", "Sosyal koruma ağı genişletiliyor.", "ekonomi", 2),
    makeItem("Tarımsal üretimde yerli tohum atağı", "Gıda güvencesi için stratejik adımlar atılıyor.", "ekonomi", 3),
  ],
  dunya: [
    makeItem("Türkiye'nin dış politikasında yeni açılımlar", "Komşu ülkelerle ilişkilerde önemli gelişmeler yaşandı.", "dunya", 1),
    makeItem("İslam dünyasından dayanışma mesajları", "OIC toplantısında önemli kararlar alındı.", "dunya", 2),
    makeItem("Doğu Akdeniz'de yeni denge arayışı", "Bölgesel güç dengesinde değişim sinyalleri.", "dunya", 3),
    makeItem("Türk diasporasından güçlü mesajlar", "Yurt dışındaki vatandaşlar ses getirdi.", "dunya", 4),
  ],
  kultur: [
    makeItem("Geleneksel sanatlar dijitalle buluşuyor", "Kültürel miras koruma projeleri hayata geçirildi.", "kultur", 1),
    makeItem("Türk edebiyatından dünyaya açılan eserler", "Çevrilen kitaplar uluslararası arenada ilgi gördü.", "kultur", 2),
    makeItem("Osmanlı arşivleri dijital ortama taşınıyor", "Tarihi belgeler herkesin erişimine açılıyor.", "kultur", 3),
  ],
};

export function getFallback(category: string, count = 4): NewsItem[] {
  return (STATIC_FALLBACKS[category] ?? STATIC_FALLBACKS.gundem).slice(0, count);
}

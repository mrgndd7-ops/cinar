import { cacheLife } from "next/cache";

const QUOTES = [
  // ─── Hz. Peygamber (s.a.v.) ──────────────────────────────────────────────────
  { text: "İnsanların en hayırlısı, insanlara faydalı olandır.", source: "Hz. Muhammed (s.a.v.)" },
  { text: "İlim Çin'de de olsa gidiniz.", source: "Hz. Muhammed (s.a.v.)" },
  { text: "Güzel ahlak, dinin yarısıdır.", source: "Hz. Muhammed (s.a.v.)" },
  { text: "Komşusu açken tok yatan bizden değildir.", source: "Hz. Muhammed (s.a.v.)" },
  { text: "Kolaylaştırınız, zorlaştırmayınız.", source: "Hz. Muhammed (s.a.v.)" },
  { text: "Merhamet etmeyene merhamet edilmez.", source: "Hz. Muhammed (s.a.v.)" },
  { text: "Ameller niyetlere göredir.", source: "Hz. Muhammed (s.a.v.) – Buhârî" },
  { text: "Kişi sevdiği ile beraberdir.", source: "Hz. Muhammed (s.a.v.) – Buhârî, Müslim" },
  { text: "Hiçbiriniz kendisi için istediğini kardeşi için istemedikçe iman etmiş olamaz.", source: "Hz. Muhammed (s.a.v.) – Buhârî, Müslim" },
  { text: "Müslüman, insanların elinden ve dilinden emin olduğu kimsedir.", source: "Hz. Muhammed (s.a.v.) – Tirmizî" },
  { text: "İman etmedikçe cennete giremezsiniz; birbirinizi sevmedikçe iman etmiş olamazsınız.", source: "Hz. Muhammed (s.a.v.) – Müslim" },
  { text: "Birbirinize buğuz etmeyin, haset etmeyin, sırt çevirmeyin.", source: "Hz. Muhammed (s.a.v.) – Buhârî" },
  { text: "Mü'minler birbirlerini sevmede tek bir beden gibidir.", source: "Hz. Muhammed (s.a.v.) – Müslim" },
  { text: "Kalbinde merhamet olmayana cennet yoktur.", source: "Hz. Muhammed (s.a.v.)" },
  { text: "Affetmek, zaferin zekâtıdır.", source: "Hz. Muhammed (s.a.v.)" },
  { text: "Bilginler, Nebilerin varisleridir.", source: "Hz. Muhammed (s.a.v.)" },
  { text: "Bütün insanlar hata eder; en hayırlısı ise çokça tövbe edenlerdir.", source: "Hz. Muhammed (s.a.v.)" },
  { text: "Ben güzel ahlakı tamamlamak üzere peygamber gönderildim.", source: "Hz. Muhammed (s.a.v.) – Buhârî, Müslim" },
  { text: "Zenginlik, mal çokluğundan değil; kalp zenginliğinden ibarettir.", source: "Hz. Muhammed (s.a.v.) – Müslim" },
  { text: "Amellerin Allah'a en sevgilisi, az da olsa devamlı olanıdır.", source: "Hz. Muhammed (s.a.v.) – Buhârî" },
  { text: "Doğruluktan ayrılmayın; doğruluk iyiliğe, iyilik de cennete götürür.", source: "Hz. Muhammed (s.a.v.) – Buhârî, Müslim" },
  { text: "İman yetmiş küsur derecedir; en üstünü 'Lâ ilâhe illallah' sözüdür.", source: "Hz. Muhammed (s.a.v.) – Müslim" },
  { text: "Allah'a iman ettim; sonra dosdoğru ol.", source: "Hz. Muhammed (s.a.v.) – Müslim" },
  { text: "Deveni bağla, ondan sonra Allah'a tevekkül et.", source: "Hz. Muhammed (s.a.v.) – Tirmizî" },
  { text: "Kim bir hayra delâlet ederse onu işleyen gibi ecir alır.", source: "Hz. Muhammed (s.a.v.) – Beyhakî" },
  { text: "Nerede olursan ol, Allah'a karşı sorumluluğunun bilincinde ol.", source: "Hz. Muhammed (s.a.v.) – Tirmizî" },
  { text: "Mü'minin en fazîletlisi, ahlâkı en güzel olanıdır.", source: "Hz. Muhammed (s.a.v.) – Buhârî" },
  { text: "Her şeyin bir zekâtı vardır; cesedin zekâtı da oruçtur.", source: "Hz. Muhammed (s.a.v.) – İbn Mâce" },
  { text: "Sadakaların en fazîletlisi su içirmek ve su hayrı yapmaktır.", source: "Hz. Muhammed (s.a.v.) – Ahmed b. Hanbel" },
  { text: "Yetimi himâye eden cennette benimle şöylece beraberdir.", source: "Hz. Muhammed (s.a.v.) – Buhârî" },
  { text: "Helâlinden kazanmak, hak yolunda yapılan muhârebe kadar ecirlidir.", source: "Hz. Muhammed (s.a.v.) – Deylemî" },
  { text: "İlmi yazarak bağlayın.", source: "Hz. Muhammed (s.a.v.) – Tirmizî" },
  { text: "Hoş gör ki hoş görülesin.", source: "Hz. Muhammed (s.a.v.) – İbn Hanbel" },
  { text: "Kim Allah için tevazu gösterirse Allah onu yükseltir.", source: "Hz. Muhammed (s.a.v.) – Müslim" },
  { text: "Güçlü olan, kuvvetle yenen değil; öfkesine hâkim olandır.", source: "Hz. Muhammed (s.a.v.) – Buhârî" },
  { text: "Din nasihattir; Allah'a, kitabına, peygamberine ve tüm Müslümanlara.", source: "Hz. Muhammed (s.a.v.) – Müslim" },
  { text: "Sabır, imanın yarısı; şükür de diğer yarısıdır.", source: "Hz. Muhammed (s.a.v.)" },
  { text: "Çalışan Allah'ın dostudur.", source: "Hz. Muhammed (s.a.v.)" },
  { text: "Güzel söz bir sadakadır.", source: "Hz. Muhammed (s.a.v.) – Buhârî" },
  { text: "Anne'nin ayağı altında cennet vardır.", source: "Hz. Muhammed (s.a.v.) – İbn Mâce" },
  { text: "En hayırlı sadaka ilim öğretmektir.", source: "Hz. Muhammed (s.a.v.)" },
  { text: "İnsanlara teşekkür etmeyen Allah'a şükretmiş olamaz.", source: "Hz. Muhammed (s.a.v.) – Tirmizî" },
  { text: "Ateşin odunu yakıp kül ettiği gibi, haset de iyilikleri yok eder.", source: "Hz. Muhammed (s.a.v.)" },
  { text: "Dünya müminin zindanı, kâfirin cennetidir.", source: "Hz. Muhammed (s.a.v.) – Müslim" },
  { text: "Komşunu seven kişiyi Allah sever.", source: "Hz. Muhammed (s.a.v.)" },
  { text: "İşlerin hayırlısı aşırılıktan uzak, ılımlı olanıdır.", source: "Hz. Muhammed (s.a.v.) – Beyhakî" },
  { text: "Cenâb-ı Allah amelsiz îmânı ve îmânsız ameli kabûl buyurmaz.", source: "Hz. Muhammed (s.a.v.)" },

  // ─── Kur'an-ı Kerim ───────────────────────────────────────────────────────────
  { text: "De ki: Ey Rabbim! İlmimi artır.", source: "Kur'an-ı Kerim – Tâhâ, 20:114" },
  { text: "Hiç bilenlerle bilmeyenler bir olur mu?", source: "Kur'an-ı Kerim – Zümer, 39:9" },
  { text: "Allah'tan kulları içinde ancak ilim sahipleri gerçek anlamda korkar.", source: "Kur'an-ı Kerim – Fâtır, 35:28" },
  { text: "Allah ilim verilen kimselerin derecesini yükseltir.", source: "Kur'an-ı Kerim – Mücâdele, 58:11" },
  { text: "Her nefis ölümü tadacaktır.", source: "Kur'an-ı Kerim – Âl-i İmrân, 3:185" },
  { text: "Biz yalnız sana ibadet eder ve yalnız senden yardım dileriz.", source: "Kur'an-ı Kerim – Fâtiha, 1:5" },
  { text: "Şüphesiz Allah, tevekkül edenleri sever.", source: "Kur'an-ı Kerim – Âl-i İmrân, 3:159" },
  { text: "Kim Allah'tan korkarsa, Allah ona bir çıkış yolu ihsan eder.", source: "Kur'an-ı Kerim – Talâk, 65:2" },
  { text: "Sana gelen her iyilik Allah'tandır; kötülük ise nefsindendir.", source: "Kur'an-ı Kerim – Nisâ, 4:79" },
  { text: "Zorluğun yanında mutlaka kolaylık vardır.", source: "Kur'an-ı Kerim – İnşirâh, 94:5" },
  { text: "Allah sabredenlerle beraberdir.", source: "Kur'an-ı Kerim – Bakara, 2:153" },
  { text: "Allah bir toplumu, onlar kendilerini değiştirmedikçe değiştirmez.", source: "Kur'an-ı Kerim – Ra'd, 13:11" },
  { text: "Rabbiniz şöyle dedi: Bana dua edin, kabul edeyim.", source: "Kur'an-ı Kerim – Mü'min, 40:60" },
  { text: "Şüphesiz Allah adaleti, iyiliği ve akrabaya yardımı emreder.", source: "Kur'an-ı Kerim – Nahl, 16:90" },
  { text: "Ey iman edenler! Sabır ve namazla Allah'tan yardım isteyin.", source: "Kur'an-ı Kerim – Bakara, 2:153" },
  { text: "Gerçekten insan büyük bir hüsran içindedir; iman edip amel-i salih işleyenler hariç.", source: "Kur'an-ı Kerim – Asr, 103:2-3" },
  { text: "Şüphesiz Allah, kötülük yapanları sevmez.", source: "Kur'an-ı Kerim – Bakara, 2:205" },
  { text: "O'nun yarattıklarını düşünün; her şeyde bir ibret vardır.", source: "Kur'an-ı Kerim – Âl-i İmrân, 3:191" },

  // ─── Hz. Ali (r.a.) ───────────────────────────────────────────────────────────
  { text: "İnsanlar bilmedikleri şeyin düşmanıdır.", source: "Hz. Ali (r.a.)" },
  { text: "Aklı tam olanın sözü az olur.", source: "Hz. Ali (r.a.)" },
  { text: "Müminin tebessümü yüzünde, hüznü ise kalbindedir.", source: "Hz. Ali (r.a.)" },
  { text: "Kime iyilik edersen et, onun efendisi olursun.", source: "Hz. Ali (r.a.)" },
  { text: "Bin zulme uğrasan da, bir zulüm yapma.", source: "Hz. Ali (r.a.)" },
  { text: "Günah işlemediğimiz günler bizim bayramımızdır.", source: "Hz. Ali (r.a.)" },
  { text: "Bir işi gösteriş için yapma; utandığın için de bırakma.", source: "Hz. Ali (r.a.)" },
  { text: "İnsanların en kötüsü, iyiliği kötülükle karşılayandır.", source: "Hz. Ali (r.a.)" },
  { text: "Yapman gereken hayırlı işleri yarına bırakma; yarın olur da sen olmazsın.", source: "Hz. Ali (r.a.)" },
  { text: "Güzel bir karakter, güzel bir yüzden daha uzun ömürlüdür.", source: "Hz. Ali (r.a.)" },
  { text: "Dili tatlı olanın arkadaşları çok olur.", source: "Hz. Ali (r.a.)" },
  { text: "İlim maldan hayırlıdır.", source: "Hz. Ali (r.a.)" },
  { text: "Eğrinin gölgesi de eğri olur.", source: "Hz. Ali (r.a.)" },
  { text: "Düşündürücü sözlerle ruhlarınızı dinlendirin; bedenler gibi ruhlar da yorulur.", source: "Hz. Ali (r.a.)" },
  { text: "Soruluncaya kadar susmak, susturuluncaya kadar söylemekten hayırlıdır.", source: "Hz. Ali (r.a.)" },
  { text: "Cennet cömertlerin, cehennem cahillerin yeridir.", source: "Hz. Ali (r.a.)" },
  { text: "Tek başına kaldığında da günaha dalma; seni gören hâkim Mevlâ'dır.", source: "Hz. Ali (r.a.)" },
  { text: "Kanaat kılıçtır; kesmediği bir şey yoktur.", source: "Hz. Ali (r.a.)" },

  // ─── Hz. Ömer (r.a.) ─────────────────────────────────────────────────────────
  { text: "Çok konuşan çok yanılır; çok yanılanın hayâ duygusu azalır.", source: "Hz. Ömer (r.a.)" },
  { text: "En çok sevdiğim kimse, bana ayıp ve kusurlarımı haber verendir.", source: "Hz. Ömer (r.a.)" },
  { text: "Sırrını gizleyen, kendine hâkim olur.", source: "Hz. Ömer (r.a.)" },
  { text: "Bugünün işini yarına bırakma.", source: "Hz. Ömer (r.a.)" },
  { text: "Dünyaya az meylet ki hür yaşayasın.", source: "Hz. Ömer (r.a.)" },
  { text: "Bir iyiliğin şerefi, geciktirilmeden hemen yapılmasındadır.", source: "Hz. Ömer (r.a.)" },
  { text: "İnsanları düzeltmek isteyenler önce kendilerini ıslah etmeli.", source: "Hz. Ömer (r.a.)" },
  { text: "Ya inandığın gibi yaşarsın ya da yaşadığın gibi inanmaya başlarsın.", source: "Hz. Ömer (r.a.)" },
  { text: "Allah'tan korkandan başka güvenilir kimse yoktur.", source: "Hz. Ömer (r.a.)" },
  { text: "Fazla lakırdıyı terk eden kimseye hikmet bahşedilir.", source: "Hz. Ömer (r.a.)" },
  { text: "Şerri bilmeyen, onun tuzağına düşer.", source: "Hz. Ömer (r.a.)" },

  // ─── Hz. Ebubekir (r.a.) ─────────────────────────────────────────────────────
  { text: "Sabır imanın yarısı, yakîn ise tamamıdır.", source: "Hz. Ebubekir (r.a.)" },
  { text: "Şöhretten kaç ki şeref seni takip etsin.", source: "Hz. Ebubekir (r.a.)" },
  { text: "Ölüme karşı hazırlıklı ol ki sana hayat verilsin.", source: "Hz. Ebubekir (r.a.)" },

  // ─── İmam Gazali ─────────────────────────────────────────────────────────────
  { text: "Şüphe duymayan hakikati bulamaz.", source: "İmam Gazali" },
  { text: "Çok işte çırak olacağına, bir işte usta ol.", source: "İmam Gazali" },
  { text: "Cahillerle tartışmayın; ben hiç galip gelemedim.", source: "İmam Gazali" },
  { text: "Ölüm, Allah'ın sevgili kullarına bir bardak tatlı soğuk su içmek gibi gelir.", source: "İmam Gazali" },
  { text: "Sabır insana mahsustur; hayvanlarda sabır yoktur, meleklerin ise buna ihtiyacı yoktur.", source: "İmam Gazali" },
  { text: "Okumak üç türlüdür: dilin okuması kıraat, aklın okuması tefekkür, kalbin okuması hayattır.", source: "İmam Gazali" },
  { text: "Cevizin kabuğunu kırıp özüne inmeyen, cevizin hepsini kabuk zanneder.", source: "İmam Gazali" },
  { text: "İlmi ile amel etmeyen âlim, başkalarını giydirdiği halde kendisi çıplak olan iğne gibidir.", source: "İmam Gazali" },
  { text: "Bir sözü söyleyeceğin zaman düşün; söylemediğinde mesul olacaksan söyle, yoksa sus.", source: "İmam Gazali" },
  { text: "Nasihat etmek kolaydır; mühim olan onu gereğince yaşamaktır.", source: "İmam Gazali" },
  { text: "Bütün işlerinde orta yolu tut; işlerin en hayırlısı budur.", source: "İmam Gazali" },
  { text: "Bedenine değil, kendine değer ver ve gönlünü olgunlaştır.", source: "İmam Gazali" },
  { text: "Belaya şükretmek lazımdır; çünkü küfür ve günahlardan başka gerçek bela yoktur.", source: "İmam Gazali" },
  { text: "Ulaşamadığına tevekkül, ulaştığına rıza, kaybettiğine sabır göster.", source: "İmam Gazali" },
  { text: "Say ki öldün, bir gün daha verildi; bugünü o gün bil, öyle yaşa.", source: "İmam Gazali" },
  { text: "Kur'an-ı Kerim ışıkları her köşeye saçılan bir güneştir.", source: "İmam Gazali" },

  // ─── İmam-ı Azam Ebu Hanife ──────────────────────────────────────────────────
  { text: "Bilgisiz kişilerle özellikle dinî konularda tartışmaya girme.", source: "İmam-ı Azam Ebu Hanife" },
  { text: "Çok gülmekten sakın; çünkü o kalbi öldürür.", source: "İmam-ı Azam Ebu Hanife" },
  { text: "Gençliğinde hep ilimle uğraş.", source: "İmam-ı Azam Ebu Hanife" },
  { text: "Kazançsız ve azıksız on yıl da kalsan ilimden yüz çevirme.", source: "İmam-ı Azam Ebu Hanife" },
  { text: "Hakk'ı söyleme konusunda sultan dâhil hiç kimseden korkma.", source: "İmam-ı Azam Ebu Hanife" },
  { text: "İnsanların hatalarının ardına düşme; güzelliklerini gör.", source: "İmam-ı Azam Ebu Hanife" },
  { text: "Ölümü çokça hatırla.", source: "İmam-ı Azam Ebu Hanife" },
  { text: "Her halükârda nasılsan öyle görün; göründüğün gibi ol.", source: "İmam-ı Azam Ebu Hanife" },
  { text: "Seninle istişare edenle sen de istişare et.", source: "İmam-ı Azam Ebu Hanife" },
  { text: "Tövbenin en büyüğü istiğfar etmektir.", source: "İmam-ı Azam Ebu Hanife" },
  { text: "Yalnız kaldığında da Allah'ı zikret; insanların yanındaymışsın gibi.", source: "İmam-ı Azam Ebu Hanife" },

  // ─── Yunus Emre ──────────────────────────────────────────────────────────────
  { text: "İlim ilim bilmektir; ilim kendin bilmektir. Sen kendini bilmezsen bu nice okumaktır.", source: "Yunus Emre" },
  { text: "Bir kez gönül yıktın ise bu kıldığın namaz değil.", source: "Yunus Emre" },
  { text: "Yaratılanı hoş gör, Yaradan'dan ötürü.", source: "Yunus Emre" },
  { text: "Sevelim sevilelim; bu dünya kimseye kalmaz.", source: "Yunus Emre" },
  { text: "Az söz erin yüküdür, çok söz hayvan yüküdür.", source: "Yunus Emre" },
  { text: "Ben gelmedim dâvi için; benim işim sevgi için.", source: "Yunus Emre" },
  { text: "Dervişlik baştadır, tacda değil.", source: "Yunus Emre" },
  { text: "En büyük ibadet sevebilmektir.", source: "Yunus Emre" },
  { text: "Gelin tanış olalım, işi kolay kılalım.", source: "Yunus Emre" },
  { text: "Mal sahibi mülk sahibi; hani bunun ilk sahibi?", source: "Yunus Emre" },
  { text: "Hiç kimseye yan bakma! Kalp Allah'ın evidir; bu evi sen yıkma.", source: "Yunus Emre" },
  { text: "Her bildiğini söyleme, ama her söylediğini bil.", source: "Yunus Emre" },
  { text: "Aşık öldü diye sala verirler; ölen bedendir, aşıklar ölmez.", source: "Yunus Emre" },
  { text: "Bir garibin duasına gir; kurtarırsa o kurtarır.", source: "Yunus Emre" },
  { text: "Eğer bir müminin kalbini kırarsan, Hakk'a eylediğin secde değildir.", source: "Yunus Emre" },
  { text: "Girdim ilim meclisine, dediler: ilim geride, illa edep, illa edep.", source: "Yunus Emre" },
  { text: "Zulüm ile abad olanın akıbeti berbat olur.", source: "Yunus Emre" },
  { text: "Sabır saadeti ebedi kalır; sabır kimde ise o nasip alır.", source: "Yunus Emre" },
  { text: "Çok mal haramsız, çok söz yalansız olmaz.", source: "Yunus Emre" },
  { text: "Dağlar nice yüksek ise yol onun üstünden geçer.", source: "Yunus Emre" },
  { text: "Derdi dünya olanın, dünya kadar derdi olurmuş.", source: "Yunus Emre" },
  { text: "Aşk aşıkı şâd eder, aslanı zencir eder, katı taşı mum eder.", source: "Yunus Emre" },
  { text: "Dünya yalan kardeşim; var mı yalan dünyada baki kalan.", source: "Yunus Emre" },

  // ─── Mevlana Celaleddin Rumi ─────────────────────────────────────────────────
  { text: "Acele şeytan hilesidir; sabır ve tedbir Allah lütfudur.", source: "Mevlana" },
  { text: "Aşk nasip işidir, hesap işi değil.", source: "Mevlana" },
  { text: "Bir mum diğer mumu tutuşturmakla ışığından bir şey kaybetmez.", source: "Mevlana" },
  { text: "Gül düşünür gülistan olursun; diken düşünür dikenlik olursun.", source: "Mevlana" },
  { text: "Gönül kazanmak istiyorsan, sevgi tohumu ek.", source: "Mevlana" },
  { text: "Her birimiz tek kanatlı melekleriz; ancak birbirimize sarılınca uçabiliriz.", source: "Mevlana" },
  { text: "Kim benliğinden kurtulursa bütün benlikler onun olur.", source: "Mevlana" },
  { text: "Ölümümüzden sonra mezarımızı yerde değil, gönüllerde arayınız.", source: "Mevlana" },
  { text: "Sabır demir kalkandır; sabır sevinç anahtarıdır.", source: "Mevlana" },
  { text: "Susmak, mana eksikliğinden değil; mana derinliğindendir.", source: "Mevlana" },
  { text: "Aynı dili konuşanlar değil, aynı duyguları paylaşanlar anlaşabilir.", source: "Mevlana" },
  { text: "Her zorluğun sonunda doğan bir ışık vardır.", source: "Mevlana" },
  { text: "Aşk; sandığın kadar değil, yandığın kadardır.", source: "Mevlana" },
  { text: "Bendeyim Kur'ân'a candan; tende can durdukça ben.", source: "Mevlana" },
  { text: "Kaç dil bildiği önemli değil; gönül dilini bilmektir insanı değerli kılan.", source: "Mevlana" },
  { text: "Ayağına batan dikenler, aradığın gülün habercisidir.", source: "Mevlana" },
  { text: "Hamdım, piştim, yandım.", source: "Mevlana" },
  { text: "Gönül, gönül verilerek alınır.", source: "Mevlana" },
  { text: "İstiyorsan Hakk'a varmayı, meslek edin gönül almayı.", source: "Mevlana" },
  { text: "Allah ile olduktan sonra ölüm de ömür de hoştur.", source: "Mevlana" },
  { text: "Küle döndüysen, yeniden güle dönmeyi bekle.", source: "Mevlana" },

  // ─── Hacı Bektaş Veli ────────────────────────────────────────────────────────
  { text: "Bir olalım, iri olalım, diri olalım.", source: "Hacı Bektaş Veli" },
  { text: "Bilimle gidilmeyen yolun sonu yoktur.", source: "Hacı Bektaş Veli" },
  { text: "Biz dile ve söze bakmayız; öze ve hale bakarız.", source: "Hacı Bektaş Veli" },
  { text: "Eline, beline, diline sahip ol.", source: "Hacı Bektaş Veli" },
  { text: "Her ne ararsan kendinde ara.", source: "Hacı Bektaş Veli" },
  { text: "İlim beşikte başlar, mezarda biter.", source: "Hacı Bektaş Veli" },
  { text: "İnsanın cemâli sözünün güzelliğidir.", source: "Hacı Bektaş Veli" },
  { text: "İncinsen de incitme.", source: "Hacı Bektaş Veli" },
  { text: "Kendine ağır geleni başkasına yapma.", source: "Hacı Bektaş Veli" },
  { text: "Okunacak en büyük kitap insandır.", source: "Hacı Bektaş Veli" },
  { text: "En yüce servet ilimdir.", source: "Hacı Bektaş Veli" },
  { text: "Özünü bilirsen özürden kurtulursun.", source: "Hacı Bektaş Veli" },

  // ─── Hoca Ahmed Yesevi ───────────────────────────────────────────────────────
  { text: "Nerde görsen gönlü kırık, merhem ol sen.", source: "Hoca Ahmed Yesevi" },
  { text: "Zâlim eğer cefa eylese 'Allah' de; sabreyle.", source: "Hoca Ahmed Yesevi" },
  { text: "Kâfir bile olsa hiç kimsenin kalbini kırma; kalp kırmak Allah'ı incitmek demektir.", source: "Hoca Ahmed Yesevi" },
  { text: "Gariplere merhamet etmek, Resûlullah'ın sünnetidir.", source: "Hoca Ahmed Yesevi" },
  { text: "Akıllı ve uyanık kimse isen, dünyâya gönül bağlama.", source: "Hoca Ahmed Yesevi" },
  { text: "Gerçek âlim bildiklerini âleme söyledi.", source: "Hoca Ahmed Yesevi" },

  // ─── Bediüzzaman Said Nursi ──────────────────────────────────────────────────
  { text: "Ümitsizlik, İslâm'a yakışmayan bir hastalıktır.", source: "Bediüzzaman Said Nursi" },
  { text: "İman hem nurdur, hem kuvvettir.", source: "Bediüzzaman Said Nursi" },
  { text: "Rıza-i İlâhî kâfidir; eğer O razı olsa, bütün dünya küsse ehemmiyeti yok.", source: "Bediüzzaman Said Nursi" },
  { text: "Her şeyin anahtarı kalpte, kalbin anahtarı da duadadır.", source: "Bediüzzaman Said Nursi" },
  { text: "En büyük zulüm, masum bir insanı incitmektir.", source: "Bediüzzaman Said Nursi" },
  { text: "Gaflet, kalbin en büyük hastalığıdır.", source: "Bediüzzaman Said Nursi" },
  { text: "Birlik ve beraberlik olmazsa cemaatin hiçbir kuvveti yoktur.", source: "Bediüzzaman Said Nursi" },
  { text: "Şükür nimeti artırır, şükransızlık ise nimeti giderir.", source: "Bediüzzaman Said Nursi" },
  { text: "Cesaret, tevekkülün meyvesidir.", source: "Bediüzzaman Said Nursi" },
  { text: "Hakikat yolunda yalnız olmak, kalabalıkta kaybolmaktan iyidir.", source: "Bediüzzaman Said Nursi" },
  { text: "Namaz dinin direğidir.", source: "Bediüzzaman Said Nursi" },
  { text: "Sıkıntı ve meşakkate sabır, şükürdür.", source: "Bediüzzaman Said Nursi" },

  // ─── Sadi-i Şirazi ───────────────────────────────────────────────────────────
  { text: "İnsan mertebesine yalnız adaletle erişilir.", source: "Sadi-i Şirazi" },
  { text: "Benim için dost bul; düşman kendin gelir.", source: "Sadi-i Şirazi" },
  { text: "Sabır acıdır, meyvesi tatlıdır.", source: "Sadi-i Şirazi" },
  { text: "Bilge, düşmanından bile bir şey öğrenir.", source: "Sadi-i Şirazi" },
  { text: "Az gül, çok düşün.", source: "Sadi-i Şirazi" },
  { text: "Cömertlik, zenginliğin süsüdür; sabır ise fakirliğin.", source: "Sadi-i Şirazi" },
  { text: "Kötülük yapma ki, kötülük görmeyesin.", source: "Sadi-i Şirazi" },
  { text: "Başkasının derdine ortak olmayan, insanlık ismini hak etmez.", source: "Sadi-i Şirazi" },
  { text: "Bilgelik neredeyse, onu bir köle de söylemiş olsa dinle.", source: "Sadi-i Şirazi" },
  { text: "Güzel söz söyleyen, söylediğiyle amel etmelidir.", source: "Sadi-i Şirazi" },

  // ─── Mehmet Akif Ersoy ───────────────────────────────────────────────────────
  { text: "Hakkın hatırı âlidir; hiçbir hatıra feda edilmez.", source: "Mehmet Akif Ersoy" },
  { text: "Doğrudan doğruya Kur'an'dan alıp ilhamı, asrın idrakine söyletmeliyiz İslâm'ı.", source: "Mehmet Akif Ersoy" },
  { text: "Korkma! Sönmez bu şafaklarda yüzen al sancak.", source: "Mehmet Akif Ersoy" },

  // ─── Abdülkadir Geylani ──────────────────────────────────────────────────────
  { text: "Allah'a yakın olmak için gönlünü temizle.", source: "Abdülkadir Geylani" },
  { text: "Dünya, kalbe girince felaket olur; elden geçince bereket olur.", source: "Abdülkadir Geylani" },
  { text: "Sözünde sadık ol; sadık kulun yüzü ak olur.", source: "Abdülkadir Geylani" },
  { text: "İhlâs olmadan amel, ruhsuz beden gibidir.", source: "Abdülkadir Geylani" },

  // ─── İbn Ataullah el-İskenderi ───────────────────────────────────────────────
  { text: "Her şeyi Allah'tan bil; sebeplere takılıp kalma.", source: "İbn Ataullah el-İskenderi" },
  { text: "Kalbini Allah'a ver; Allah da sana herkesi verir.", source: "İbn Ataullah el-İskenderi" },
  { text: "Günahın seni üzmesi, tövbenin alameti olabilir.", source: "İbn Ataullah el-İskenderi" },
  { text: "Şikâyet kapısını kapat, şükür kapısını aç.", source: "İbn Ataullah el-İskenderi" },
  { text: "Tevekkül, sebebi terk değil; kalbi sebebe bağlamamaktır.", source: "İbn Ataullah el-İskenderi" },

  // ─── İbn Kayyım el-Cevziyye ──────────────────────────────────────────────────
  { text: "Kalpler ancak Allah'ı zikrederek huzur bulur.", source: "İbn Kayyım el-Cevziyye" },
  { text: "Sabır, hastalık değil; ilaçtır.", source: "İbn Kayyım el-Cevziyye" },
  { text: "Günahlar kalbi karartır; tövbe onu parlatır.", source: "İbn Kayyım el-Cevziyye" },
  { text: "Dünya âhiretin tarlasıdır; ne ekersen onu biçersin.", source: "İbn Kayyım el-Cevziyye" },
  { text: "En büyük ceza, Allah'ı unutmaktır.", source: "İbn Kayyım el-Cevziyye" },
  { text: "Hüzün, kalbin istiğfarıdır.", source: "İbn Kayyım el-Cevziyye" },

  // ─── İbn Teymiyye ────────────────────────────────────────────────────────────
  { text: "Cenneti dünyada ara; bulursan âhirette de bulursun.", source: "İbn Teymiyye" },
  { text: "İnsanın değeri, Allah'a olan yakınlığı kadardır.", source: "İbn Teymiyye" },
  { text: "Sabır ve şükür, imanın iki kanadıdır.", source: "İbn Teymiyye" },

  // ─── Şeyh Edebali ────────────────────────────────────────────────────────────
  { text: "İnsanı yaşat ki devlet yaşasın.", source: "Şeyh Edebali" },
  { text: "Ey oğul! İnsanlar vardır, şehirler kadar büyük olur; insanlar vardır dağ başında kuru çınar gibi.", source: "Şeyh Edebali" },
  { text: "Zamanın ruhunu okumayan zamanın gerisinde kalır.", source: "Şeyh Edebali" },

  // ─── Genel İslami Hikmet ─────────────────────────────────────────────────────
  { text: "Allah bir kapıyı kaparsa, emin olun ki bin kapıyı açar.", source: "İslami Hikmet" },
  { text: "Bela imtihanı sabırla, nimet imtihanı şükürle kazanılır.", source: "İslami Hikmet" },
  { text: "Güzel konuşmanın sırrı, lüzumsuz sözleri terk etmektir.", source: "İslami Hikmet" },
  { text: "İyiliği gizlemek, kötülüğü gizlemekten daha üstündür.", source: "İslami Hikmet" },
  { text: "Adaletsizlik eden, adaletsizliğe uğrayandan daha mutsuzdur.", source: "İslami Hikmet" },
  { text: "Dua, ibadetlerin özüdür.", source: "İslami Hikmet" },
  { text: "Helal lokmadan dua yükselir.", source: "İslami Hikmet" },
  { text: "İnsanı büyük yapan gücü değil, ahlakıdır.", source: "İslami Hikmet" },
  { text: "Kibir, iblisin ilk günahıdır.", source: "İslami Hikmet" },
  { text: "Tövbe kapısı ölüm gelinceye kadar açıktır.", source: "İslami Hikmet" },
  { text: "Günahtan kaçmak, ibadetten üstündür.", source: "İslami Hikmet" },
  { text: "Kalb-i selim, her şeyin üstündedir.", source: "İslami Hikmet" },
  { text: "Gece duası kabule en yakın duadır.", source: "İslami Hikmet" },
];

function getTodayQuote() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return QUOTES[dayOfYear % QUOTES.length];
}

export default async function DailyQuote() {
  "use cache";
  cacheLife("days");
  const quote = getTodayQuote();

  return (
    <section className="mb-10 flex justify-center">
      <div className="inline-flex items-center gap-4 bg-[#f5f3ef] px-8 py-3 rounded-full">
        <span className="text-[10px] tracking-widest font-bold text-[#77592c] uppercase shrink-0">
          Günün Sözü
        </span>
        <span className="text-sm font-medium italic text-[#154539]/80 max-w-lg text-center">
          &ldquo;{quote.text}&rdquo;
        </span>
        <div className="w-1.5 h-1.5 bg-[#77592c] rounded-full opacity-40 shrink-0" />
      </div>
    </section>
  );
}

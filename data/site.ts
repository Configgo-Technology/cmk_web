export const nav = [
  { href: "/", label: "ANASAYFA" },
  { href: "/kurumsal", label: "KURUMSAL" },
  { href: "/projeler", label: "PROJELER" },
  { href: "/iletisim", label: "İLETİŞİM" },
] as const;

export const contact = {
  addressLines: [
    "Aydınlıkevler, Uzayan Sk. No:169/1,",
    "06130 Altındağ/Ankara",
  ],
  phone: "444 3 265",
  phoneHref: "tel:4443265",
  email: "info@cmk.com.tr",
  hours: ["Pzt. Cum. 09:00 - 18:00", "Cmt. 09:00-16:00"],
  mapQuery: "Aydınlıkevler, Uzayan Sk. No:169/1, 06130 Altındağ/Ankara",
};

/** CRM `project` alanı — PDF başlıklarıyla aynı yazım */
export const leadProjects = [
  "Asgardia Kent Rose",
  "Asgardia Kent Lotus",
  "Asgardia Meydan",
  "Asgardia Lumina",
  "Asgardia Park Caddesi",
  "Nova Sanayi Sitesi",
  "Anadolu Medeniyetler Müzesi",
  "Gazi Üniversitesi Rektörlük Binası",
  "Asgardia Aydınlıkevler",
  "Asgardia Motors",
  "Tarihi Diyarbakır Surları",
  "Eski Maliye Binası",
  "Hazine Müzesi",
  "Maliye Bakanlığı Döner Sermaye Binaları",
  "Tarihi Sümerbank Binası",
  "İlk Başbakanlık Binası",
  "Tarihi Defterdarlık Binası Güçlendirmesi",
  "Maliye Bakanlığı Yüksek Eğitim Merkez Binası Güçlendirmesi",
  "Akaryakıt İstasyonu İnşaatı",
  "Kreş Binası",
  "Kültür Merkezi Binası",
  "Genel Bilgi",
] as const;

export const processSteps = [
  {
    n: "1",
    title: "Analiz",
    text: "Yapılacak işi yerinde arge ekibimiz ile inceleyerek analiz yapıyoruz.",
  },
  {
    n: "2",
    title: "İş Geliştirme",
    text: "İşle ilgili gerekli geliştirme ve araştırmaları sağlıyoruz.",
  },
  {
    n: "3",
    title: "Fiyat Sunma",
    text: "Gerekli analizlerden sonra işle ilgili fiyat teklifimizi sunuyoruz.",
  },
  {
    n: "4",
    title: "Oluşum ve Teslimat",
    text: "İşe başlayıp en kısa sürede sonuçlandırarak teslim ediyoruz.",
  },
] as const;

export const brands = [
  { src: "/images/brand-restorasyon.png", alt: "CMK Restorasyon" },
  { src: "/images/brand-asgardia.png", alt: "Asgardia" },
  { src: "/images/brand-motors.png", alt: "Asgardia Motors" },
  { src: "/images/brand-barok.png", alt: "Barok Enerji" },
] as const;

export const homeAbout = {
  eyebrow: "HAKKIMIZDA",
  title: "Geçmişten güç alır, geleceği inşa ederiz.",
  text: "2014 yılından bu yana CMK HOLDİNG olarak inşaat, restorasyon, enerji ve otomotiv sektörlerinde faaliyet gösteriyoruz. Teknik uzmanlığımızı, kalite odaklı yaklaşımımızla birleştirerek modern yapılar üretiyor, kültürel mirası geleceğe taşıyoruz.",
  cta: "CMK HOLDİNG Hakkında",
  ctaHref: "/kurumsal",
  stats: [
    { value: "2014", label: "Kuruluş yılı" },
    { value: "+4", label: "Ana faaliyet alanı" },
    { value: "+12", label: "Yıllık sektör deneyimi" },
    { value: "360°", label: "Çok yönlü hizmet yaklaşımı" },
  ],
} as const;

export const aboutCopy = {
  eyebrow: "CMK HOLDİNG HAKKINDA",
  title: "Geleceği inşa ederken",
  accent: "değer üretiyoruz.",
  body: [
    "2014 yılında kurulan CMK HOLDİNG; inşaat, restorasyon, enerji ve otomotiv sektörlerinde faaliyet göstermektedir.",
    "Kalite, güven ve sürdürülebilirlik odaklı yaklaşımıyla modern yapılar üretirken kültürel mirası geleceğe taşıyor, yalnızca yapılar değil, kalıcı değerler inşa ediyor.",
  ],
} as const;

export const homeHero = {
  lines: ["Yaşam Alanları", "Geleceği", "Şekillendirir."] as const,
  text: "CMK Holding, farklı sektörlerdeki yatırımları ve sürdürülebilir projeleriyle, insan odaklı, modern ve kalıcı değerler üretir.",
  cta: "İletişime Geç",
  ctaHref: "/iletisim",
} as const;

export const corporateHero = {
  lines: ["Geçmişten güç alır,", "geleceğe değer katarız."] as const,
  text: "CMK Holding, farklı sektörlerdeki yatırımları ve sürdürülebilir projeleriyle, insan odaklı, modern ve kalıcı değerler üretir.",
} as const;

export const sharedVideo = {
  eyebrow: "ASGARDIA KENT ROSE",
  title: "Tanıtım",
  accent: "Videosu",
  text: "Asgardia Kent Rose'u daha yakından tanıyın. Projenin mimarisi, sosyal alanları ve yaşam ortamını keşfedin.",
};

export const sharedLocation = {
  eyebrow: "ASGARDIA KENT ROSE",
  title: "Proje",
  accent: "Konumu",
  text: "Asgardia Kent Rose, Ankara'da konforlu ve ulaşımı kolay bir lokasyonda yer almaktadır.",
};

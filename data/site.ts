export const nav = [
  { href: "/", label: "ANASAYFA" },
  { href: "/kurumsal", label: "KURUMSAL" },
  { href: "/projeler", label: "PROJELER" },
  { href: "/iletisim", label: "İLETİŞİM" },
] as const;

export const contact = {
  addressLines: [
    "Aydınlıkevler Mahallesi Turgut Özal Bulvarı No:169/1",
    "(Samsun Yolu) Altındağ/Ankara",
  ],
  phone: "444 3 265",
  phoneHref: "tel:4443265",
  email: "info@cmk.com.tr",
  hours: ["Pzt. Cum. 09:00 - 18:00", "Cmt. 09:00-16:00"],
  mapQuery: "Cmk Holding, Aydınlıkevler Mahallesi Turgut Özal Bulvarı No:169/1 (Samsun Yolu) Altındağ/Ankara",
  mapPoint: "https://maps.app.goo.gl/NoDsLjxXXNnzD2Q17",
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

export const sectorSlides = [
  { src: "/images/sectors/insaat.jpg", label: "İnşaat" },
  { src: "/images/sectors/restorasyon.jpg", label: "Restorasyon" },
  { src: "/images/sectors/enerji.jpg", label: "Enerji" },
  { src: "/images/sectors/otomotiv.jpg", label: "Otomotiv" },
] as const;

export type Brand = {
  src: string;
  alt: string;
  /** Etkileşimli referans detay sayfasına bağlanacak slug (örn. "asgardia-motors") */
  slug?: string;
  /** Özel/harici bağlantı gerekirse; tanımlı değilse `slug` üzerinden `/projeler/${slug}` üretilir */
  href?: string;
};

export const brands: readonly Brand[] = [
  { src: "/images/brand-restorasyon.png", alt: "CMK Restorasyon" },
  { src: "/images/brand-asgardia.png", alt: "Asgardia" },
  { src: "/images/brand-motors.png", alt: "Asgardia Motors", slug: "asgardia-motors" },
  { src: "/images/brand-barok.png", alt: "Barok Enerji" },
  { src: "/images/fod-test.png", alt: "Fod Danışmanlık" },
  { src: "/images/spectre-logo.png", alt: "Spectre" },
];

/** Referanslar bölümünden detay sayfasına açılan etkileşimli marka slug'ları */
export const interactiveBrandSlugs: ReadonlySet<string> = new Set(
  brands.map((brand) => brand.slug).filter((slug): slug is string => Boolean(slug)),
);

export function brandHref(brand: Brand): string | undefined {
  return brand.href ?? (brand.slug ? `/projeler/${brand.slug}` : undefined);
}

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

export const missionVision = {
  eyebrow: "KURUMSAL YAKLAŞIM",
  title: "Geçmişe saygı,",
  accent: "geleceğe kalıcı değer.",
  pillars: ["Kalite", "Güven", "Sürdürülebilirlik"] as const,
  items: [
    {
      code: "01",
      title: "VİZYON",
      text: "Deneyim ve birikimimizi, ülke ekonomisine değer katacak farklı sektörlerdeki iş fikirleriyle güçlendirmek; faaliyet gösterdiğimiz her alanda kalite, güven ve sürdürülebilirliği ön planda tutmaktır. Tarihi ve kültürel mirasın korunmasından modern projelerin inşasına kadar geniş bir alanda, toplumsal fayda sağlayan, estetik ve mühendisliği birleştiren çalışmalara imza atarak sektörün öncü ve güvenilir markalarından biri olarak CMK markasını, nesiller boyu kalıcı kılmaktır.",
    },
    {
      code: "02",
      title: "MİSYON",
      text: "Tarihi ve kültürel mirasımızı koruyarak gelecek nesillere aktarmak, modern kent yaşamına katkı sağlayacak projeler geliştirmek için kalite, güven ve sürdürülebilirliği işimizin özü olarak kabul ederiz. Restorasyon, inşaat, enerji ve otomotiv gibi çok disiplinli alanlarda uzmanlığımızla, hem toplumsal hem de çevresel sorumluluklarımızın bilinciyle, estetik ve işlevselliği bir araya getiren kalıcı çözümler üretmeyi hedefleriz.",
    },
  ],
} as const;

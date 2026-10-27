export const nav = [
  { href: "/", label: "ANASAYFA" },
  { href: "/kurumsal", label: "KURUMSAL" },
  { href: "/projeler", label: "PROJELER" },
  { href: "/iletisim", label: "İLETİŞİM" },
] as const;

export const contact = {
  addressLines: [
    "Aydınlıkevler, Uzayan Sk. No:169 / 1,",
    "06130 Altındağ / Ankara",
  ],
  phone: "444 3 265",
  phoneHref: "tel:4443265",
  email: "info@cmk.com.tr",
  hours: ["Pzt. Cum. 09:00 - 18:00", "Cmt. 09:00-16:00"],
  mapQuery: "Aydınlıkevler, Uzayan Sk. No:169/1, 06130 Altındağ/Ankara",
};

export const subjects = [
  "Genel Bilgi",
  "Projeler",
  "İş Birliği",
  "Diğer",
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

export const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

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

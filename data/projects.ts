import { lorem } from "./site";

export type Project = {
  slug: string;
  name: string;
  titleLines: [string, string];
  listCategory: string;
  detailCategory: string;
  dates: string;
  company: string;
  website?: string;
  headline: string;
  paragraphs: string[];
  highlights: string[];
  socialTitle: string;
  socialAccent: string;
  socialText: string;
  socialItems: string[];
  technicalTitle: string;
  technicalAccent: string;
  technicalText: string;
  technicalItems: string[];
  galleryLabel: string;
};

const photo = (slug: string, index: number) =>
  `/images/projects/${slug}/${index}.jpg`;

export const projects: Project[] = [
  {
    slug: "kent-rose",
    name: "Asgardia Kent Rose",
    titleLines: ["ASGARDIA", "KENT ROSE"],
    listCategory: "KONUT PROJESİ",
    detailCategory: "Konut",
    dates: "2021 / 2023",
    company: "ASGARDIA",
    website: "https://www.asgardia.com.tr",
    headline: "ASGARDIA AYDINLIKEVLER KONUT PROJESİ",
    paragraphs: [
      "ASGARDIA KENT ROSE, Ankara'nın merkezinde konumlanan, modern mimarisi, güçlü ulaşım bağlantıları ve kapsamlı çevresel olanaklarıyla öne çıkan bir yaşam projesidir.",
      "150.000 m² proje alanı üzerinde yükselen proje, geniş peyzaj alanları ve fonksiyonel planlamasıyla konforlu bir şehir yaşamı sunmaktadır.",
      "Toplam 13 blokta 830 konuttan oluşan proje; 2+1 ve 3+1 daire seçenekleri, 25.000 m² peyzaj alanı ve 26.000 m² ticari alanıyla farklı ihtiyaçlara yanıt vermektedir.",
      "Sağlık, eğitim, alışveriş ve sosyal yaşam noktalarına yakın konumuyla hem aileler hem de yatırımcılar için avantajlı bir yaşam modeli sunmaktadır.",
    ],
    highlights: [
      "150.000 m² Proje Alanı",
      "13 Blok & 830 Konut",
      "25.000 m² Peyzaj Alanı",
      "26.000 m² Ticari Alan",
    ],
    socialTitle: "Sosyal Donatılar",
    socialAccent: "Ortak Alanlar",
    socialText:
      "Yaşam kalitesini artırmak adına projede pek çok sosyal alan ve ortak kullanım alanı yer almaktadır:",
    socialItems: [
      "25.000 m² Peyzaj Alanı",
      "Sağlık Kurumlarına Yakınlık",
      "Eğitim Kurumlarına Ulaşım",
      "Alışveriş Merkezlerine Yakınlık",
      "Kültür & Rekreasyon Alanları",
      "Merkezi Ulaşım Avantajı",
    ],
    technicalTitle: "Teknik ve Konfor",
    technicalAccent: "Odaklı Donatılar",
    technicalText:
      "Asgardia'nın bu projesi, hem estetik hem de fonksiyonel unsurlarıyla modern şehir yaşamının ihtiyaçlarına yüksek standartlarda cevap vererek, kullanıcılarına huzurlu, güvenli ve sosyal bir yaşam ortamı sunmaktadır.",
    technicalItems: [
      "14 Katlı Bloklar",
      "2+1 & 3+1 Daire Seçenekleri",
      "26.000 m² Ticari Alan",
      "Toplu Taşıma & Ana Ulaşım Aksları",
    ],
    galleryLabel: "Asgardia AYDINLIKEVLER",
  },
  {
    slug: "aydinlikevler",
    name: "Asgardia Aydınlıkevler",
    titleLines: ["ASGARDIA", "AYDINLIKEVLER"],
    listCategory: "KONUT PROJESİ",
    detailCategory: "Konut",
    dates: "2021 / 2023",
    company: "ASGARDIA",
    website: "https://www.asgardia.com.tr",
    headline: "AYDINLIKEVLER KONUT PROJESİ",
    paragraphs: [
      "Asgardia markamızın vizyonuyla hayata geçirilen bu özel proje; modern yaşam standartlarını karşılayan, fonksiyonel mimarisi ve güçlü sosyal donatılarıyla tamamlanmıştır.",
      "Toplamda 3 konut bloğu ve bir adet 9.900 m² kapalı alana sahip ticari bloktan oluşan proje kapsamında, 188 konut kullanıcılarına teslim edilmiştir.",
      "Daire tipleri farklı ihtiyaçlara yanıt verecek şekilde çeşitlendirilmiştir. Ticari blok toplam 9 bağımsız bölümden oluşmakta olup, 5 katlı ve 9.900 m² kapalı alana sahiptir.",
    ],
    highlights: [
      "30 adet 3+1 daire",
      "114 adet A tipi 4+1 daire",
      "30 adet B tipi 4+1 daire",
      "12 adet loft daire",
    ],
    socialTitle: "Sosyal Donatılar",
    socialAccent: "Ortak Alanlar",
    socialText:
      "Yaşam kalitesini artırmak adına projede pek çok sosyal alan ve ortak kullanım alanı yer almaktadır:",
    socialItems: [
      "3 Konut Bloğu",
      "188 Konut",
      "Ticari Blok",
      "9 Bağımsız Bölüm",
      "Sosyal Alanlar",
      "Ortak Kullanım Alanları",
    ],
    technicalTitle: "Teknik ve Konfor",
    technicalAccent: "Odaklı Donatılar",
    technicalText:
      "Konut ve ticari blok birlikte planlanan proje, farklı daire tipleriyle modern yaşam ihtiyaçlarına yanıt vermektedir.",
    technicalItems: [
      "9.900 m² Ticari Alan",
      "5 Katlı Ticari Blok",
      "3+1 ve 4+1 Daireler",
      "Loft Daireler",
    ],
    galleryLabel: "Asgardia AYDINLIKEVLER",
  },
  {
    slug: "kent-lotus",
    name: "Asgardia Kent Lotus",
    titleLines: ["ASGARDIA", "KENT LOTUS"],
    listCategory: "KONUT PROJESİ",
    detailCategory: "Konut",
    dates: "2026 / 2029",
    company: "ASGARDIA",
    website: "https://www.asgardia.com.tr",
    headline: "KENT LOTUS KONUT PROJESİ",
    paragraphs: [
      "Kentsel dönüşüm projelerimizden biri olan ASGARDIA KENT LOTUS, modern mimarisi ve fonksiyonel yaşam alanlarıyla öne çıkan bir yaşam projesidir.",
      "Toplam 7 bloktan oluşan proje kapsamında, 1+1, 2+1, 3+1 ve 4+1 daire seçenekleri sunulmaktadır. Geniş balkonları ve ferah yaşam alanlarıyla planlanmıştır.",
      "Proje bünyesinde yer alan ticari alanlar; cadde mağazaları, kafe ve restoranlarıyla açık hava çarşı konseptini yansıtmaktadır. Peyzaj alanları ve dinlenme kamelyaları projeye sosyal ve doğal bir yaşam atmosferi kazandırmaktadır.",
    ],
    highlights: [
      "7 Adet Blok",
      "1+1, 2+1, 3+1 ve 4+1 Daireler",
      "Modern Çarşı ve Ticari Alanlar",
      "Peyzaj ve Sosyal Yaşam Alanları",
    ],
    socialTitle: "Sosyal Donatılar",
    socialAccent: "Ortak Alanlar",
    socialText:
      "Yaşam kalitesini artırmak amacıyla projede yeşil alanlar, yürüyüş parkurları ve dinlenme alanlarıyla desteklenen sosyal yaşam alanları yer almaktadır.",
    socialItems: [
      "Ağaçlandırılmış Yürüyüş Parkurları",
      "Peyzaj Düzenlemeli Yeşil Alanlar",
      "Dinlenme Kamelyaları",
      "Açık Hava Çarşı",
      "Cadde Mağazaları",
      "Kafe ve Restoranlar",
    ],
    technicalTitle: "Teknik ve Konfor",
    technicalAccent: "Odaklı Donatılar",
    technicalText:
      "Geniş balkonlu daire planları ve ticari çarşı kurgusu, konut yaşamını günlük ihtiyaçlarla aynı alanda buluşturmaktadır.",
    technicalItems: [
      "7 Blok",
      "Geniş Balkonlar",
      "Ferah Yaşam Alanları",
      "Ticari Çarşı Alanları",
    ],
    galleryLabel: "Asgardia KENT LOTUS",
  },
  {
    slug: "meydan",
    name: "Asgardia Meydan",
    titleLines: ["ASGARDIA", "MEYDAN"],
    listCategory: "TİCARİ PROJE",
    detailCategory: "Konut",
    dates: "2026 / 2028",
    company: "ASGARDIA",
    website: "https://www.asgardia.com.tr",
    headline: "MEYDAN KONUT PROJESİ",
    paragraphs: [
      "Keçiören'in ilk açık AVM konseptli karma yaşam projesi olan ASGARDIA MEYDAN, konut ve ticaret alanlarını bir araya getiren modern bir yaşam projesidir.",
      "Toplam 4 bloktan oluşan proje; iki katlı ticari alanları, hareketli cadde kurgusu ve günlük ihtiyaçlara kolay erişim sağlayan planlamasıyla öne çıkmaktadır.",
      "Projede yer alan 1+1 ve 2+1 daire seçenekleri, fonksiyonel iç düzenlemeleri ve modern mimarisiyle hem yatırım hem de konforlu yaşam için alternatif sunmaktadır.",
    ],
    highlights: [
      "4 Adet Blok",
      "1+1 & 2+1 Daireler",
      "2 Katlı Ticari Alanlar",
      "Açık AVM & Karma Yaşam",
    ],
    socialTitle: "Sosyal Donatılar",
    socialAccent: "Ortak Alanlar",
    socialText:
      "Açık AVM konseptiyle tasarlanan proje, ticari alanları ve sosyal yaşamı destekleyen cadde düzenlemesiyle günlük ihtiyaçlara kolay erişim sunmaktadır.",
    socialItems: [
      "Açık Hava Alışveriş Alanları",
      "İki Katlı Ticari Alanlar",
      "Cadde Mağazaları",
      "Kafe & Restoran Alanları",
      "Konut & Ticaret Bir Arada",
      "Günlük İhtiyaçlara Kolay Erişim",
    ],
    technicalTitle: "Teknik ve Konfor",
    technicalAccent: "Odaklı Donatılar",
    technicalText:
      "Dört bloklu kurgu, konut birimlerini cadde üzerindeki ticari alanlarla aynı yaşam çevresinde toplamaktadır.",
    technicalItems: [
      "4 Blok",
      "1+1 ve 2+1 Planlar",
      "İki Katlı Ticaret",
      "Açık AVM Kurgusu",
    ],
    galleryLabel: "Asgardia MEYDAN",
  },
  {
    slug: "lumina",
    name: "Asgardia Lumina",
    titleLines: ["ASGARDIA", "LUMINA"],
    listCategory: "KONUT PROJESİ",
    detailCategory: "Konut",
    dates: "2026 / 2028",
    company: "ASGARDIA",
    website: "https://www.asgardia.com.tr",
    headline: "LUMINA KONUT PROJESİ",
    paragraphs: [
      "ASGARDIA LUMINA, Ankara'nın merkezi konumunda, açık cadde AVM konseptiyle tasarlanan karma yaşam projesi olarak öne çıkmaktadır.",
      "Yaşamı ve ticareti bir araya getiren mimarisiyle modern kent yaşamına yeni bir soluk kazandırmaktadır.",
      "Projede yer alan 1+1, 2+1 ve 3+1 daire tipleri, ofis veya konut olarak kullanılabilen esnek planlarıyla farklı ihtiyaçlara yanıt vermektedir.",
    ],
    highlights: [
      "Ankara'nın Merkezi Konumu",
      "1+1, 2+1 & 3+1 Daireler",
      "Açık Cadde AVM Konsepti",
      "Konut & Ofis Kullanımı",
    ],
    socialTitle: "Sosyal Donatılar",
    socialAccent: "Ortak Alanlar",
    socialText:
      "Ankara'nın merkezi konumunda yer alan proje, açık cadde AVM konseptiyle ticari yaşamı ve çalışma alanlarını bir araya getirmektedir.",
    socialItems: [
      "Açık Cadde AVM",
      "Ticari Kullanım Alanları",
      "Merkezi Konum Avantajı",
      "Günlük İhtiyaçlara Erişim",
    ],
    technicalTitle: "Teknik ve Konfor",
    technicalAccent: "Odaklı Donatılar",
    technicalText:
      "Esnek planlar, aynı birimin konut veya ofis olarak kullanılabilmesine olanak tanımaktadır.",
    technicalItems: [
      "Esnek Daire Planları",
      "Konut Kullanımı",
      "Ofis Kullanımı",
      "Merkezi Konum",
    ],
    galleryLabel: "Asgardia LUMINA",
  },
  {
    slug: "park-caddesi",
    name: "Asgardia Park Caddesi",
    titleLines: ["ASGARDIA", "PARK CADDESİ"],
    listCategory: "KONUT PROJESİ",
    detailCategory: "Villa ve Residence",
    dates: "2026 / 2028",
    company: "ASGARDIA",
    website: "https://www.asgardia.com.tr",
    headline: "PARK CADDESİ VİLLA & RESIDENCE",
    paragraphs: [
      "ASGARDIA PARK CADDESİ, Çayyolu Park Caddesi'nde konumlanan, müstakil villa ve residence seçeneklerini bir araya getiren özel bir yaşam projesidir. Sınırlı sayıda konutu, özgün mimarisi ve nitelikli donatılarıyla ayrıcalıklı bir yaşam deneyimi sunmaktadır.",
      "Toplam 5 müstakil villa ve 7 katlı bir residence binasından oluşan proje; bahçe dubleks, 3+1 çatı dubleks, 3+1 ve 5+1 daire seçenekleriyle farklı yaşam ihtiyaçlarına yanıt vermektedir.",
      "Açık yüzme havuzu, ortak peyzaj alanları, kapalı otopark ve elektrikli araç şarj altyapısıyla konforu modern yaşam çözümleriyle buluşturmaktadır.",
    ],
    highlights: [
      "5 Adet Müstakil Villa",
      "7 Katlı Residence",
      "3+1 & 5+1 Daire Seçenekleri",
      "Villa & Residence Konsepti",
    ],
    socialTitle: "Sosyal Donatılar",
    socialAccent: "Ortak Alanlar",
    socialText:
      "ASGARDIA PARK CADDESİ, sakinlerine açık yüzme havuzu ve özenle düzenlenmiş ortak peyzaj alanlarıyla konforlu bir sosyal yaşam sunmaktadır.",
    socialItems: [
      "Açık Yüzme Havuzu",
      "Ortak Sosyal Peyzaj Alanı",
      "Müstakil Villa Yaşamı",
      "Bahçe Dubleks Daireler",
      "Çatı Dubleks Daireler",
      "Sınırlı Sayıda Konut",
    ],
    technicalTitle: "Teknik ve Konfor",
    technicalAccent: "Odaklı Donatılar",
    technicalText:
      "Villa ve residence seçenekleriyle farklı yaşam ihtiyaçlarına yanıt veren proje, kapalı otoparkı ve elektrikli araç şarj altyapısıyla modern yaşamın gereksinimlerini desteklemektedir.",
    technicalItems: [
      "Kapalı Otopark",
      "Elektrikli Araç Şarj Altyapısı",
      "Üç Katlı Müstakil Villalar",
      "Farklı Daire Planları",
    ],
    galleryLabel: "Asgardia PARK CADDESİ",
  },
  {
    slug: "kule",
    name: "Asgardia Kule",
    titleLines: ["ASGARDIA", "KULE"],
    listCategory: "KONUT PROJESİ",
    detailCategory: "Ticari Yapı",
    dates: "2026 / 2028",
    company: "ASGARDIA",
    website: "https://www.asgardia.com.tr",
    headline: "KULE & RESIDENCE",
    paragraphs: [
      "ASGARDIA KULE, Ankara'nın merkezinde konumlanan, modern mimarisi ve stratejik lokasyonuyla öne çıkan prestijli bir ticari projedir.",
      "İş dünyasına yönelik proje, profesyonel çalışma ortamını çağdaş mimari anlayışla buluşturmaktadır.",
      "1+1 ofisler ve ticari ünitelerden oluşan proje, farklı iş kollarına uygun kullanım olanakları sunmaktadır. 7/24 güvenlik hizmeti ve resepsiyonuyla profesyonel yaşam için nitelikli bir ortam sağlamaktadır.",
    ],
    highlights: [
      "Ankara Merkezi Konum",
      "1+1 Ofisler",
      "Ticari Üniteler",
      "7/24 Güvenlik & Resepsiyon",
    ],
    socialTitle: "Sosyal Donatılar",
    socialAccent: "Ortak Alanlar",
    socialText:
      "ASGARDIA KULE, profesyonel çalışma hayatını destekleyen hizmetleri ve ticari kullanım alanlarıyla iş dünyasına yönelik işlevsel bir ortam sunmaktadır.",
    socialItems: [
      "Resepsiyon Hizmeti",
      "7/24 Güvenlik",
      "Profesyonel Çalışma Alanları",
      "Ticari Kullanım Alanları",
    ],
    technicalTitle: "Teknik ve Konfor",
    technicalAccent: "Odaklı Donatılar",
    technicalText:
      "Merkezi konum ve 1+1 ofis planları, farklı iş kolları için işlevsel bir çalışma düzeni kurmaktadır.",
    technicalItems: [
      "1+1 Ofisler",
      "Ticari Üniteler",
      "7/24 Güvenlik",
      "Resepsiyon",
    ],
    galleryLabel: "Asgardia KULE",
  },
  {
    slug: "nova-sanayi",
    name: "Nova Sanayi Sitesi",
    titleLines: ["NOVA", "SANAYİ SİTESİ"],
    listCategory: "KONUT PROJESİ",
    detailCategory: "Ticari Yapı",
    dates: "2026 / 2028",
    company: "ASGARDIA",
    website: "https://www.asgardia.com.tr",
    headline: "SANAYİ SİTESİ",
    paragraphs: [
      "CMK HOLDING tarafından hayata geçirilen NOVA SANAYİ SİTESİ, modern dükkânları ve verimlilik odaklı planlamasıyla üretim ve ticaret faaliyetlerine yönelik bir projedir.",
      "Geniş kullanım alanlarıyla farklı iş kollarının ihtiyaçlarına cevap veren proje, işletmelere işlevsel bir çalışma ortamı sunmaktadır.",
      "Toplam 81 bağımsız dükkândan oluşan proje; stratejik konumu, lojistik avantajları ve modern altyapı anlayışıyla öne çıkmaktadır.",
    ],
    highlights: [
      "81 Bağımsız Dükkân",
      "Modern Sanayi Kompleksi",
      "Üretim & Ticaret Alanları",
      "Lojistik Konum Avantajı",
    ],
    socialTitle: "Sosyal Donatılar",
    socialAccent: "Ortak Alanlar",
    socialText:
      "NOVA SANAYİ SİTESİ, farklı iş kollarına hitap eden bağımsız dükkânları ve ticari faaliyetleri destekleyen planlamasıyla işletmeler için işlevsel bir çalışma ortamı sunmaktadır.",
    socialItems: [
      "Geniş Kullanım Alanlı Dükkânlar",
      "Farklı İş Kollarına Uygun Alanlar",
      "Üretim & Ticaret Odaklı Planlama",
      "İşletmelere Uygun Çalışma Alanları",
      "Operasyonel Verimlilik",
      "Stratejik Konum Avantajı",
    ],
    technicalTitle: "Teknik ve Konfor",
    technicalAccent: "Odaklı Donatılar",
    technicalText:
      "NOVA SANAYİ SİTESİ, modern altyapı anlayışı ve verimlilik odaklı planlamasıyla işletmelerin üretim ve ticaret süreçlerini destekleyen bir sanayi ortamı sunmaktadır.",
    technicalItems: [
      "Modern Altyapı Çözümleri",
      "Verimlilik Odaklı Planlama",
      "Lojistik Avantajlar",
      "Bağımsız Dükkân Yapısı",
    ],
    galleryLabel: "NOVA SANAYİ SİTESİ",
  },
  {
    slug: "rektorluk",
    name: "Gazi Üniversitesi Rektörlük Binası Restorasyonu",
    titleLines: ["GAZİ ÜNİVERSİTESİ", "REKTÖRLÜK BİNASI"],
    listCategory: "RESTORASYON",
    detailCategory: "Restorasyon",
    dates: "2021 / 2023",
    company: "CMK RESTORASYON",
    headline: "REKTÖRLÜK BİNASI RESTORASYONU",
    paragraphs: [
      "CMK Restorasyon tarafından gerçekleştirilen GAZİ ÜNİVERSİTESİ REKTÖRLÜK BİNASI RESTORASYONU, tescilli kültür varlığının tarihî kimliğini korumak ve yapı sağlığını iyileştirmek amacıyla yürütülen kapsamlı bir restorasyon projesidir.",
      "Ankara Kültür Varlıklarını Koruma Kurulu'nun 01.04.2021 tarihli onayı doğrultusunda gerçekleştirilen çalışmalar kapsamında; dış cephe, çatı, avlu, drenaj ve iç mekânlarda kısmi onarım ve güçlendirme uygulamaları tamamlanmıştır.",
      "Proje, tarihî yapının korunmasını ve kullanım işlevinin iyileştirilmesini hedeflemektedir.",
    ],
    highlights: [
      "Tescilli Kültür Varlığı",
      "CMK Restorasyon",
      "Kısmi Onarım & Güçlendirme",
      "Kurul Onayı: 01.04.2021",
    ],
    socialTitle: "Restorasyon Çalışmaları",
    socialAccent: "Uygulama Alanları",
    socialText:
      "Tarihî yapının korunması ve kullanım işlevinin iyileştirilmesi amacıyla binanın farklı bölümlerinde onarım, drenaj ve güçlendirme çalışmaları yürütülmüştür.",
    socialItems: [
      "Dış Cephe Onarımı",
      "Çatı Onarımı",
      "Avlu Düzenlemeleri",
      "Drenaj Çalışmaları",
      "İç Mekân Onarımları",
      "Yapısal Güçlendirme",
    ],
    technicalTitle: "Tarihî Koruma",
    technicalAccent: "Yapı Sağlığı",
    technicalText:
      "Restorasyon uygulamaları, yapının tarihî niteliğini korumak ve fiziksel durumunu iyileştirmek amacıyla farklı yapı bölümlerine yönelik teknik müdahaleleri kapsamaktadır.",
    technicalItems: [
      "Koruma Kurulu Onaylı Uygulama",
      "Kısmi Onarım Çalışmaları",
      "Drenaj & Yapı Sağlığı İyileştirmesi",
      "Kullanım İşlevinin İyileştirilmesi",
    ],
    galleryLabel: "Asgardia AYDINLIKEVLER",
  },
];

export const listingSlugs = [
  "kent-rose",
  "kent-lotus",
  "meydan",
  "lumina",
  "park-caddesi",
  "kule",
  "nova-sanayi",
  "kent-rose",
  "kent-rose",
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function projectImage(slug: string, index = 1) {
  return photo(slug, index);
}

export function projectGallery(slug: string) {
  return [1, 2, 3, 4, 5, 6, 7, 8].map((index) => photo(slug, index));
}

export const cardExcerpt = lorem;

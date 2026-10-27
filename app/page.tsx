import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import HeroStage from "@/components/HeroStage";
import Marquee from "@/components/Marquee";
import ProcessBand from "@/components/ProcessBand";
import ProjectSlider from "@/components/ProjectSlider";
import Reveal from "@/components/Reveal";
import { getProject } from "@/data/projects";
import { brands } from "@/data/site";

const preview = ["kent-rose", "kent-rose", "kent-rose", "kent-lotus", "meydan", "lumina", "park-caddesi", "kule", "nova-sanayi"]
  .map((slug) => {
    const project = getProject(slug);
    return project
      ? { slug: project.slug, name: project.name, category: project.listCategory }
      : null;
  })
  .filter((item): item is { slug: string; name: string; category: string } => item !== null);

export default function HomePage() {
  return (
    <main>
      <HeroStage>
        <section className="mx-auto flex h-full w-full max-w-[1440px] flex-col text-ink">
          <h1 className="max-w-[459px] text-[40px] font-normal leading-none tracking-[-1px] text-[#17243A] md:text-[72px] md:tracking-[-1.8px]">
            Yaşam Alanları
            <span className="block text-gold">Geleceği</span>
            Şekillendirir.
          </h1>
          <p className="mt-7 max-w-[355px] text-base font-normal leading-6 text-[#717784]">
            CMK Holding, farklı sektörlerdeki yatırımları ve sürdürülebilir projeleriyle, insan odaklı, modern ve
            kalıcı değerler üretir.
          </p>
          <Link
            href="/projeler"
            className="mt-8 inline-flex h-16 w-[310px] items-center justify-center gap-2.5 bg-[#B58A5A] px-2.5 text-base font-medium leading-none text-white"
          >
            PROJELERİMİZİ KEŞFEDİN
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden className="shrink-0 fill-current">
              <path d="M1.99974 13.0001L1.9996 11.0002H18.1715L14.2218 7.05044L15.636 5.63623L22 12.0002L15.636 18.3642L14.2218 16.9499L18.1716 13.0002H1.99974Z" />
            </svg>
          </Link>
          <dl className="mt-auto grid max-w-xl grid-cols-3 gap-8">
            {[
              ["25+", "Tamamlanan Proje"],
              ["500+", "Mutlu Yaşam Alanı"],
              ["10+", "Yıllık Deneyim"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-[32px] font-medium leading-none text-ink">
                  <CountUp value={value} />
                </dt>
                <dd className="mt-0 text-base leading-none text-ink">{label}</dd>
              </div>
            ))}
          </dl>
        </section>
      </HeroStage>

      <Marquee />

      <Reveal>
      <section className="relative z-10 -mt-16 bg-sand">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-20 md:grid-cols-2 md:px-8">
          <div>
            <div className="flex items-center gap-4">
              <p className="text-[11px] tracking-[0.18em] text-muted">CMK HOLDING HAKKINDA</p>
              <span className="h-px w-14 bg-gold" />
            </div>
            <h2 className="mt-4 font-geist text-4xl leading-tight text-ink md:text-5xl">
              Geleceği inşa ederken
              <span className="block text-gold">değer üretiyoruz.</span>
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
              <p>
                CMK HOLDING, 2014 yılında kurulmuş olup, sahip olduğu teknik birikim, uzman kadro ve çok sektörlü
                yapısıyla inşaat, restorasyon, enerji ve otomotiv gibi farklı alanlarda faaliyet göstermektedir.
                Kuruluşumuzdan bu yana; hem modern şehir yaşamına katkı sağlayan güncel üstyapı projeleri hem de
                kültürel miras niteliğindeki taşınmaz varlıkların özenli restorasyonu ile sektörde saygın bir yer
                edindik.
              </p>
              <p>
                Bugünü ve yarını daha yaşanır kılma hedefiyle, projelerimizde teknik yeterliliğimizi, kalite odaklı
                yaklaşımımızı ve kullanıcı beklentilerini temel alıyoruz. Fonksiyonel, sağlam, mimari ve mühendislik
                kriterlerine uygun, standartların üzerinde yapılar üretirken; çevreyle uyumlu, insan odaklı yaşam ve
                çalışma alanları yaratmayı esas alıyoruz.
              </p>
              <p>
                Taşınmaz kültür varlıklarının yalnızca mimari değil, aynı zamanda toplumsal ve kültürel birer hafıza
                olduğunun bilinciyle hareket ediyoruz. Geniş faaliyet alanlarımızla ülke ekonomisine katma değer
                sağlamayı, kalite ve güven esaslı projeler üretmeyi sürdürüyoruz. Sadece yapı değil, değer inşa
                ediyoruz.
              </p>
            </div>
          </div>
          <Image
            src="/images/about-buildings.jpg"
            alt="CMK konut blokları"
            width={1200}
            height={800}
            className="h-full max-h-[520px] w-full object-cover"
          />
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 pb-16 md:grid-cols-2 md:px-8">
          {[
            [
              "MİSYONUMUZ",
              "Tarihi ve kültürel mirası korumak, modern yaşamı destekleyen projeler geliştirmek ve tüm faaliyet alanlarımızda kalite, güven ve sürdürülebilirliği esas alarak kalıcı değerler üretmek.",
            ],
            [
              "VİZYONUMUZ",
              "Farklı sektörlerdeki deneyimimizi ve uzmanlığımızı bir araya getirerek ülke ekonomisine katkı sağlamak, mühendislik ve estetiği buluşturan projelerle sektörün öncü ve güvenilir markalarından biri olmak.",
            ],
          ].map(([title, text]) => (
            <div key={title}>
              <p className="inline-block bg-gold px-4 py-2 text-[11px] tracking-[0.16em] text-white">{title}</p>
              <p className="mt-4 text-sm leading-7 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="bg-sand">
        <div className="mx-auto max-w-[1200px] px-5 py-8 md:px-8">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <div className="flex items-center gap-4">
                <p className="text-[11px] tracking-[0.18em] text-muted">PROJELERİMİZ</p>
                <span className="h-px w-14 bg-gold" />
              </div>
              <h2 className="mt-4 font-geist text-4xl leading-tight text-ink md:text-5xl">
                Daha iyi yaşam alanları
                <span className="block text-gold">için çalışıyoruz.</span>
              </h2>
            </div>
            <p className="text-sm leading-7 text-muted">
              CMK Holding, stratejik yatırımları ve bütüncül yaklaşımıyla insan odaklı, sürdürülebilir ve uzun vadeli
              değerler üretir.
            </p>
          </div>
          <div className="mt-10">
            <ProjectSlider items={preview} />
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="bg-sand">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <div className="flex items-center gap-4">
                <p className="text-[11px] tracking-[0.18em] text-muted">REFERANSLARIMIZ</p>
                <span className="h-px w-14 bg-gold" />
              </div>
              <h2 className="mt-4 font-geist text-4xl leading-tight text-ink md:text-5xl">
                Daha iyi yaşam alanları
                <span className="block text-gold">Markalarımız</span>
              </h2>
            </div>
            <p className="text-sm leading-7 text-muted">
              Yılların verdiği tecrübe ile sizlere en mükemmel hizmeti sunmak için günün her saati çabalıyoruz.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brands.map((brand) => (
              <div key={brand.alt} className="grid h-36 place-items-center border border-line bg-white px-6">
                <Image src={brand.src} alt={brand.alt} width={220} height={120} className="max-h-20 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <ProcessBand />
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ProcessBand from "@/components/ProcessBand";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Hakkımızda" };

export default function AboutPage() {
  return (
    <main>
      <PageHero
        image="/images/about-buildings.jpg"
        crumbs={[
          { href: "/", label: "Anasayfa" },
          { label: "Hakkımızda" },
        ]}
        title="Hakkımızda"
        text="Daha yaşanabilir şehirler, daha güçlü bir gelecek için değer inşa ediyoruz."
      />

      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-20 md:grid-cols-2 md:px-8">
          <div>
            <div className="flex items-center gap-4">
              <p className="text-[11px] tracking-[0.18em] text-muted">CMK HOLDING HAKKINDA</p>
              <span className="h-px w-14 bg-gold" />
            </div>
            <h2 className="mt-4 font-geist text-4xl leading-tight text-ink md:text-5xl">
              Sadece yapı değil,
              <span className="block text-gold">değer inşa ediyoruz.</span>
            </h2>
            <p className="mt-6 text-sm leading-7 text-muted">
              CMK HOLDING, 2014 yılında kurulmuş olup, sahip olduğu teknik birikim, uzman kadro ve çok sektörlü
              yapısıyla inşaat, restorasyon, enerji ve otomotiv gibi farklı alanlarda faaliyet göstermektedir.
              Kuruluşumuzdan bu yana; hem modern şehir yaşamına katkı sağlayan güncel üstyapı projeleri hem de
              kültürel miras niteliğindeki taşınmaz varlıkların özenli restorasyonu ile sektörde saygın bir yer
              edindik.
            </p>
            <Image
              src="/images/projects/aydinlikevler/1.jpg"
              alt="CMK konut projesi"
              width={900}
              height={600}
              className="mt-8 h-64 w-full object-cover"
            />
          </div>
          <div>
            <Image
              src="/images/projects/kent-rose/2.jpg"
              alt="CMK ticari ve konut blokları"
              width={900}
              height={600}
              className="h-64 w-full object-cover"
            />
            <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
              <p>
                Bugünü ve yarını daha yaşanır kılma hedefiyle, projelerimizde teknik yeterliliğimizi, kalite odaklı
                yaklaşımımızı ve kullanıcı beklentilerini temel alıyoruz. Fonksiyonel, sağlam, mimari ve mühendislik
                kriterlerine uygun, standartların üzerinde yapılar üretirken; çevreyle uyumlu, insan odaklı yaşam ve
                çalışma alanları yaratmayı esas alıyoruz.
              </p>
              <p>
                Bu yapıların, coğrafyamızın tarihsel birikimini taşıyan ve kültürel kimliğimizi yansıtan öğeler
                olduğunu kabul ederek, bilimsel disiplinlere uygun restorasyon anlayışımızla onları geleceğe
                kazandırıyoruz. Geçmişin izlerini taşıyan bu yapılarla bugünü buluşturmak, CMK HOLDING&apos;in en temel
                sorumluluk alanlarından biridir.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Reveal>
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8">
          <div>
            <div className="flex items-center gap-4">
              <p className="text-[11px] tracking-[0.18em] text-white/70">CMK HOLDING HAKKINDA</p>
              <span className="h-px w-14 bg-gold" />
            </div>
            <h2 className="mt-4 font-geist text-4xl leading-tight md:text-5xl">
              Sadece yapı değil,
              <span className="block text-gold">değer inşa ediyoruz.</span>
            </h2>
            <p className="mt-6 text-sm leading-7 text-white/75">
              Taşınmaz kültür varlıklarının yalnızca mimari değil, aynı zamanda toplumsal ve kültürel birer hafıza
              olduğunun bilinciyle hareket ediyoruz. Tarihsel birikimimizi ve kültürel kimliğimizi yansıtan bu yapıları,
              bilimsel ilkelere uygun restorasyon anlayışımızla koruyarak gelecek nesillere aktarıyoruz.
            </p>
          </div>
          <Image
            src="/images/hero-home.jpg"
            alt="CMK yaşam alanı"
            width={1200}
            height={800}
            className="h-72 w-full object-cover"
          />
        </div>
      </section>
      </Reveal>

      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-5 py-16 md:grid-cols-2 md:px-8">
          <article className="border border-line bg-white p-8">
            <h2 className="font-geist text-4xl text-gold">Vizyonumuz</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-muted">
              <p>
                CMK HOLDING olarak vizyonumuz; iş yaşamındaki deneyim ve birikimimizi, ülke ekonomisine değer katacak
                farklı sektörlerdeki iş fikirlerini tek bir çatı altında hayata geçirerek, faaliyet gösterdiğimiz her
                alanda kalite, güven ve sürdürülebilirliği ön planda tutmaktır.
              </p>
              <p>
                Tarihi ve kültürel mirasın korunmasından modern projelerin inşasına kadar geniş bir alanda, toplumsal
                fayda sağlayan, estetik ve mühendisliği birleştiren çalışmalara imza atarak sektörün öncü ve güvenilir
                markalarından biri olmayı hedefliyoruz.
              </p>
            </div>
            <span className="mt-8 block h-px w-16 bg-gold" />
          </article>
          <article className="bg-gold-deep p-8 text-white">
            <h2 className="font-geist text-4xl">Misyonumuz</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-white/90">
              <p>
                CMK HOLDING olarak misyonumuz; tarihi ve kültürel mirasımızı koruyarak gelecek nesillere aktarmak,
                modern şehir yaşamına katkı sağlayacak projeler geliştirmek ve faaliyet gösterdiğimiz her alanda kalite,
                güven ve sürdürülebilirliği esas alarak fark yaratmaktır.
              </p>
              <p>
                Restorasyon, inşaat, enerji ve otomotiv gibi çok disiplinli alanlarda uzmanlığımızla, hem toplumsal hem
                de çevresel sorumluluklarımızın bilinciyle, estetik ve işlevselliği bir araya getiren kalıcı çözümler
                üretmeyi hedefliyoruz.
              </p>
            </div>
          </article>
        </div>
      </section>

      <ProcessBand />
    </main>
  );
}

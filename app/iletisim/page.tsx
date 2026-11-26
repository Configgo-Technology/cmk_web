import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import { Reveal } from "@/components/motion/Reveal";
import PageHero from "@/components/PageHero";
import { contact } from "@/data/site";
import { getContactFormConfig } from "@/lib/contact";
import { resolveMapEmbed } from "@/lib/maps";

export const metadata: Metadata = { title: "İletişim" };
export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const { enabled, siteKey } = getContactFormConfig();
  const mapSrc = await resolveMapEmbed(contact.mapQuery, contact.mapPoint);
  const directions = contact.mapPoint;

  return (
    <main>
      <PageHero
        image="/images/iletisim-2.webp"
        crumbs={[
          { href: "/", label: "Anasayfa" },
          { label: "İletişim" },
        ]}
        title="İletişim"
        text="Sorularınız, talepleriniz ve iş birlikleri için bize her zaman ulaşabilirsiniz."
      />

      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 md:grid-cols-2 md:px-8">
          <div>
            <Reveal variant="up">
              <div className="flex items-center gap-4">
                <p className="text-base leading-none text-muted">BİZE ULAŞIN</p>
                <span className="h-px w-14 bg-gold" />
              </div>
              <h2 className="mt-4 font-geist text-4xl leading-tight text-ink md:text-5xl">
                Görüşmekten
                <span className="block text-gold">memnuniyet duyarız.</span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-muted">
                Projelerimiz, iş birlikleri veya diğer talepleriniz için bizimle iletişime geçebilirsiniz. Ekibimiz en
                kısa sürede size dönüş sağlayacaktır.
              </p>
            </Reveal>
            <Reveal as="ul" variant="up" delay={100} className="mt-8 space-y-5 text-sm">
              <li>
                <p className="font-semibold text-ink">Adres</p>
                {contact.addressLines.map((line) => (
                  <p key={line} className="text-muted">
                    {line}
                  </p>
                ))}
              </li>
              <li>
                <p className="font-semibold text-ink">Telefon</p>
                <a href={contact.phoneHref} className="link-hover text-muted">
                  {contact.phone}
                </a>
              </li>
              <li>
                <p className="font-semibold text-ink">E-posta</p>
                <a href={`mailto:${contact.email}`} className="link-hover text-muted">
                  {contact.email}
                </a>
              </li>
            </Reveal>
          </div>

          <div>
            <Reveal variant="up" delay={80}>
              <div className="flex items-center gap-4">
                <p className="text-base leading-none text-muted">İLETİŞİM FORMU</p>
                <span className="h-px w-14 bg-gold" />
              </div>
              <h2 className="mt-4 font-geist text-4xl leading-tight text-ink md:text-5xl">
                Bizlere
                <span className="block text-gold">mesaj gönderin.</span>
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                Uzman ekibimiz, talebinizi en kısa sürede değerlendirerek sizinle iletişime geçecektir.
              </p>
            </Reveal>
            <Reveal variant="up" delay={140} className="mt-6">
              <ContactForm enabled={enabled} siteKey={enabled ? siteKey : ""} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative isolate min-h-[420px] overflow-hidden bg-navy">
        <MapEmbed
          title="CMK Holding konumu"
          src={mapSrc}
          className="absolute inset-0 z-0 h-full w-full"
        />
        <div className="pointer-events-none relative z-10 max-w-md p-6 md:p-12 [transform:translateZ(0)]">
          <Reveal variant="fade" delay={100} className="pointer-events-auto bg-navy-deep/90 p-8 text-white">
            <h2 className="font-geist text-3xl text-gold">Konumumuz</h2>
            <p className="mt-4 text-sm leading-7 text-white/80">
              Merkez ofisimiz Ankara Altındağ&apos;da yer almaktadır. Aşağıdaki harita üzerinden bize kolayca
              ulaşabilirsiniz.
            </p>
            <a
              href={directions}
              className="btn-cmk btn-cmk-gold-on-dark mt-6 inline-flex items-center px-6 py-3 text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Yol Tarifi Al
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

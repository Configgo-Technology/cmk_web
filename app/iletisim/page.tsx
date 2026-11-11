import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { contact } from "@/data/site";

export const metadata: Metadata = { title: "İletişim" };

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&z=16&output=embed`;
const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.mapQuery)}`;

export default function ContactPage() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
  const captchaRequired = process.env.NODE_ENV === "production" || Boolean(process.env.RECAPTCHA_SECRET_KEY);

  return (
    <main>
      <PageHero
        image="/images/hero-pages.jpg"
        crumbs={[
          { href: "/", label: "Anasayfa" },
          { label: "İletişim" },
        ]}
        title="İletişim"
        text="Sorularınız, talepleriniz ve iş birlikleri için bize her zaman ulaşabilirsiniz."
      />

      <Reveal>
      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 md:grid-cols-2 md:px-8">
          <div>
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
            <ul className="mt-8 space-y-5 text-sm">
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
                <a href={contact.phoneHref} className="text-muted hover:text-gold">
                  {contact.phone}
                </a>
              </li>
              <li>
                <p className="font-semibold text-ink">E-posta</p>
                <a href={`mailto:${contact.email}`} className="text-muted hover:text-gold">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
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
            <div className="mt-6">
              <ContactForm siteKey={siteKey} captchaRequired={captchaRequired} />
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      <section className="relative min-h-[420px] bg-navy">
        <iframe
          title="CMK Holding konumu"
          src={mapSrc}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="relative max-w-md p-6 md:p-12">
          <div className="bg-navy-deep/90 p-8 text-white">
            <h2 className="font-geist text-3xl text-gold">Konumumuz</h2>
            <p className="mt-4 text-sm leading-7 text-white/80">
              Merkez ofisimiz Ankara Altındağ&apos;da yer almaktadır. Aşağıdaki harita üzerinden bize kolayca
              ulaşabilirsiniz.
            </p>
            <a href={directions} className="mt-6 inline-block bg-gold px-6 py-3 text-sm text-white" target="_blank" rel="noreferrer">
              Yol Tarifi Al
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}

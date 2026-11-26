import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { brandHref, brands } from "@/data/site";

const cardBaseClass = "grid h-[164px] place-items-center border border-line bg-white px-3 lg:px-4";

export default function BrandsBand() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-[70px]">
        <Reveal variant="up">
          <div className="flex items-center gap-4">
            <p className="text-base leading-none text-muted">REFERANSLARIMIZ</p>
            <span className="h-px w-14 bg-gold" />
          </div>
          <h2 className="font-geist mt-4 text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
            Daha iyi yaşam alanları
            <span className="block text-gold">Markalarımız</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {brands.map((brand, index) => {
            const href = brandHref(brand);
            const logo = (
              <Image
                src={brand.src}
                alt={brand.alt}
                width={290}
                height={120}
                sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                className={`max-h-[120px] w-auto max-w-full object-contain ${
                  href ? "transition-transform duration-300 ease-[var(--ease-calm)] group-hover:scale-[1.05]" : ""
                }`}
              />
            );

            return (
              <Reveal key={brand.alt} variant="up" delay={(index % 6) * 55}>
                {href ? (
                  <Link
                    href={href}
                    aria-label={brand.alt}
                    className={`${cardBaseClass} group transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-calm)] hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_10px_28px_rgba(23,36,58,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold`}
                  >
                    {logo}
                  </Link>
                ) : (
                  <div className={cardBaseClass}>{logo}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

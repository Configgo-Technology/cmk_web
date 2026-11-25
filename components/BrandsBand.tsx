import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { brandHref, brands } from "@/data/site";

export default function BrandsBand() {
  return (
    <Reveal>
      <section className="bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-[70px]">
          <div className="flex items-center gap-4">
            <p className="text-base leading-none text-muted">REFERANSLARIMIZ</p>
            <span className="h-px w-14 bg-gold" />
          </div>
          <h2 className="font-geist mt-4 text-[32px] leading-none tracking-[-0.02em] text-ink md:text-[40px]">
            Daha iyi yaşam alanları
            <span className="block text-gold">Markalarımız</span>
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
            {brands.map((brand) => {
              const logo = (
                <Image
                  src={brand.src}
                  alt={brand.alt}
                  width={290}
                  height={120}
                  className="max-h-[120px] w-auto max-w-full object-contain"
                />
              );

              const href = brandHref(brand);

              if (href) {
                return (
                  <Link
                    key={brand.alt}
                    href={href}
                    aria-label={brand.alt}
                    className="grid h-[164px] place-items-center border border-line bg-white px-3 transition-colors hover:border-gold lg:px-4"
                  >
                    {logo}
                  </Link>
                );
              }

              return (
                <div
                  key={brand.alt}
                  className="grid h-[164px] place-items-center border border-line bg-white px-3 lg:px-4"
                >
                  {logo}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

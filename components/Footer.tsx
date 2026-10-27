import Image from "next/image";
import Link from "next/link";
import { contact, nav } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-14 md:grid-cols-[1.2fr_0.7fr_0.9fr_1.1fr] md:px-8">
        <div>
          <Image
            src="/images/logo-gold.png"
            alt="CMK Holding"
            width={220}
            height={188}
            className="h-28 w-auto"
            style={{ width: "auto", height: "7rem" }}
          />
          <p className="mt-6 max-w-[240px] text-sm leading-6 text-white/75">
            Daha yaşanabilir şehirler, daha güçlü bir gelecek için değer inşa ediyoruz.
          </p>
        </div>

        <div>
          <p className="text-xs tracking-[0.18em] text-white/80">MENÜ</p>
          <ul className="mt-4 space-y-2 text-sm tracking-[0.12em]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5 text-sm">
          <div>
            <p className="text-xs tracking-[0.16em] text-white/70">ÇALIŞMA SAATLERİ</p>
            {contact.hours.map((line) => (
              <p key={line} className="mt-1 text-white/85">
                {line}
              </p>
            ))}
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] text-white/70">TELEFON</p>
            <a href={contact.phoneHref} className="mt-1 block text-white/85 hover:text-gold">
              {contact.phone}
            </a>
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] text-white/70">E-POSTA</p>
            <a href={`mailto:${contact.email}`} className="mt-1 block text-white/85 hover:text-gold">
              {contact.email}
            </a>
          </div>
        </div>

        <Image
          src="/images/map-altindag.jpg"
          alt="CMK Holding merkez ofisinin uydu görüntüsü"
          width={700}
          height={420}
          className="h-40 w-full object-cover md:h-full"
        />
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[1200px] px-5 py-4 text-xs text-white/55 md:px-8">
          © 2024 CMK HOLDING. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}

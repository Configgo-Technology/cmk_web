import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import PageHero from "@/components/PageHero";

export default function LegalPage({
  title,
  crumbsLabel,
  children,
}: {
  title: string;
  crumbsLabel: string;
  children: ReactNode;
}) {
  return (
    <main>
      <PageHero
        image="/images/about-buildings.jpg"
        crumbs={[
          { href: "/", label: "Anasayfa" },
          { label: crumbsLabel },
        ]}
        title={title}
        text="CMK Holding yasal bilgilendirme metni."
      />
      <section className="bg-sand">
        <Reveal variant="up" className="mx-auto max-w-[900px] space-y-4 px-5 py-16 text-base leading-7 text-muted md:px-[70px]">
          {children}
        </Reveal>
      </section>
    </main>
  );
}

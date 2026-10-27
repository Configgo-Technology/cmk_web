"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { processSteps } from "@/data/site";

export default function ProcessBand() {
  const [open, setOpen] = useState(0);

  return (
    <Reveal>
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8">
          <Image
            src="/images/process.jpg"
            alt="Proje maketi üzerinde çalışan ekip"
            width={1400}
            height={900}
            className="h-full max-h-[420px] w-full object-cover"
          />
          <div>
            <div className="flex items-center gap-4">
              <p className="text-[11px] tracking-[0.2em] text-white/70">ÇALIŞMA YAKLAŞIMIMIZ</p>
              <span className="h-px w-16 bg-gold" />
            </div>
            <h2 className="mt-4 font-geist text-4xl leading-tight md:text-5xl">
              Fikirden teslimata,
              <span className="block text-gold">her adımda güven.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/75">
              Her projeyi ihtiyaçlara özel analiz, titiz planlama ve uzmanlıkla ele alıyor; kalite ve güven odağında
              sürdürülebilir çözümler üretiyoruz.
            </p>
            <div className="mt-8 border-t border-white/20">
              {processSteps.map((step, index) => {
                const opened = open === index;
                return (
                  <div key={step.n} className="border-b border-white/20">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 py-4 text-left"
                      aria-expanded={opened}
                      onClick={() => setOpen(opened ? -1 : index)}
                    >
                      <span className="flex items-center gap-3">
                        <span className="grid h-7 w-7 shrink-0 place-items-center bg-gold text-xs font-semibold text-navy">
                          {step.n}
                        </span>
                        <span className="font-semibold">{step.title}</span>
                      </span>
                      <span className="relative h-4 w-4 shrink-0" aria-hidden>
                        <span className="absolute top-1/2 left-0 h-px w-full bg-white" />
                        <span
                          className={`absolute top-0 left-1/2 h-full w-px bg-white transition-transform duration-300 ${
                            opened ? "scale-y-0" : ""
                          }`}
                        />
                      </span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                        opened ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pr-8 pb-4 pl-10 text-sm leading-6 text-white/70">{step.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

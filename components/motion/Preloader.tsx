"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

function shouldSkipIntro(): boolean {
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.sessionStorage.getItem("cmk-intro") === "1"
  );
}

export default function Preloader() {
  const [phase, setPhase] = useState<"run" | "leave" | "done">("run");
  const skipRef = useRef(false);

  useLayoutEffect(() => {
    if (shouldSkipIntro()) {
      skipRef.current = true;
      delete document.documentElement.dataset.preloader;
      setPhase("done");
      return;
    }
    document.documentElement.dataset.preloader = "active";
  }, []);

  useEffect(() => {
    if (skipRef.current) return;

    const leave = window.setTimeout(() => {
      setPhase("leave");
      delete document.documentElement.dataset.preloader;
      window.dispatchEvent(new Event("cmk:preloader-leave"));
    }, 1400);

    const done = window.setTimeout(() => {
      window.sessionStorage.setItem("cmk-intro", "1");
      setPhase("done");
    }, 2100);

    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
      delete document.documentElement.dataset.preloader;
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`preloader ${phase === "leave" ? "preloader-leave" : ""}`} aria-hidden>
      <Image
        src="/images/cmk-dikey-beyaz.png"
        alt=""
        width={1171}
        height={1003}
        className="preloader-logo h-24 w-auto md:h-28"
        style={{ width: "auto" }}
        priority
        sizes="(min-width: 768px) 131px, 112px"
        quality={100}
      />
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState<"run" | "leave" | "done">("run");

  useEffect(() => {
    if (window.sessionStorage.getItem("cmk-intro") === "1") {
      setPhase("done");
      return;
    }
    const leave = window.setTimeout(() => setPhase("leave"), 1400);
    const done = window.setTimeout(() => {
      window.sessionStorage.setItem("cmk-intro", "1");
      setPhase("done");
    }, 2100);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`preloader ${phase === "leave" ? "preloader-leave" : ""}`} aria-hidden>
      <Image
        src="/images/logo-gold.png"
        alt=""
        width={56}
        height={48}
        className="preloader-logo h-16 w-auto"
        style={{ width: "auto", height: "4rem" }}
        priority
      />
    </div>
  );
}

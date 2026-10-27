"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function CursorLabel() {
  const [point, setPoint] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const move = (event: PointerEvent) => {
      setPoint({ x: event.clientX, y: event.clientY });
      const target = (event.target as Element | null)?.closest("[data-cursor]");
      setLabel(target?.getAttribute("data-cursor") ?? "");
      setPreview(target?.getAttribute("data-preview") ?? "");
    };
    const leave = () => {
      setLabel("");
      setPreview("");
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed z-[70] hidden -translate-x-1/2 -translate-y-[140%] bg-[#17243A] px-3 py-2 text-[11px] tracking-[0.14em] text-white md:block ${
        label ? "opacity-100" : "opacity-0"
      }`}
      style={{ left: point.x, top: point.y }}
    >
      {preview ? (
        <Image src={preview} alt="" width={160} height={112} className="mb-2 h-28 w-40 object-cover" />
      ) : null}
      {label || "İNCELE"}
    </div>
  );
}

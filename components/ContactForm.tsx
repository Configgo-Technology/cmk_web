"use client";

import Link from "next/link";
import Script from "next/script";
import { FormEvent, useRef, useState } from "react";
import { leadProjects } from "@/data/site";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      render: (container: HTMLElement, options: { sitekey: string; size: "compact" | "normal" }) => number;
      getResponse: (widgetId: number) => string;
      reset: (widgetId: number) => void;
    };
  }
}

const fieldClass =
  "w-full border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors duration-200 hover:border-muted/60 focus:border-gold";

export default function ContactForm({
  enabled,
  siteKey,
}: {
  enabled: boolean;
  siteKey: string;
}) {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const captchaContainer = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const closed = !enabled;

  function renderCaptcha() {
    const container = captchaContainer.current;
    const captcha = window.grecaptcha;
    if (!container || !captcha) return;
    captcha.ready(() => {
      if (container !== captchaContainer.current || widgetId.current !== null) return;
      widgetId.current = captcha.render(container, {
        sitekey: siteKey,
        size: container.clientWidth < 304 ? "compact" : "normal",
      });
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (closed || pending) return;
    setError("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const kvkkConsent = form.get("kvkkConsent") === "on";
    if (!kvkkConsent) {
      setError("KVKK aydınlatma metnini onaylayın.");
      return;
    }

    const captcha = window.grecaptcha;
    const id = widgetId.current;
    const recaptchaToken = id === null ? "" : captcha?.getResponse(id) ?? "";
    if (siteKey && !recaptchaToken) {
      setError("Güvenlik doğrulamasını tamamlayın.");
      return;
    }

    setPending(true);
    let succeeded = false;
    try {
      const response = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.get("fullName"),
          email: form.get("email"),
          phone: form.get("phone"),
          project: form.get("project"),
          kvkkConsent,
          recaptchaToken,
        }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(data.error || "Mesajınız gönderilemedi.");
        return;
      }
      succeeded = true;
      setDone(true);
    } catch {
      setError("Mesajınız gönderilemedi.");
    } finally {
      if (!succeeded && id !== null) captcha?.reset(id);
      setPending(false);
    }
  }

  if (done) {
    return (
      <p className="bg-white px-4 py-6 text-sm text-ink" role="status">
        Başvurunuz alındı. En kısa sürede size dönüş yapacağız.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className={fieldClass}
          name="fullName"
          placeholder="Ad Soyad"
          aria-label="Ad Soyad"
          autoComplete="name"
          required
          minLength={2}
          maxLength={80}
        />
        <input
          className={fieldClass}
          name="email"
          type="email"
          placeholder="E-posta"
          aria-label="E-posta"
          autoComplete="email"
          required
          maxLength={120}
        />
        <input
          className={fieldClass}
          name="phone"
          type="tel"
          placeholder="Telefon"
          aria-label="Telefon"
          autoComplete="tel"
          required
          minLength={7}
          maxLength={20}
        />
        <select
          className={`${fieldClass} cursor-pointer`}
          name="project"
          aria-label="İlgilendiğiniz proje"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Proje Seçiniz
          </option>
          {leadProjects.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>
      </div>

      {siteKey ? (
        <>
          <div ref={captchaContainer} className="min-h-[78px]" />
          <Script
            src="https://www.google.com/recaptcha/api.js?render=explicit"
            onReady={renderCaptcha}
            onError={() => setError("Güvenlik doğrulaması yüklenemedi. Lütfen sayfayı yenileyin.")}
          />
        </>
      ) : null}

      <label className="flex cursor-pointer items-start gap-2 text-sm text-muted transition-colors duration-200 hover:text-ink">
        <input
          name="kvkkConsent"
          type="checkbox"
          className="mt-1 cursor-pointer accent-gold"
          checked={kvkkAccepted}
          onChange={(event) => setKvkkAccepted(event.currentTarget.checked)}
          required
        />
        <span>
          <Link
            href="/kvkk"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-gold underline-offset-2 transition-colors duration-200 hover:text-gold"
          >
            Aydınlatma Metni
          </Link>
          ,{" "}
          <Link
            href="/acik-riza"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-gold underline-offset-2 transition-colors duration-200 hover:text-gold"
          >
            Açık Rıza Metni
          </Link>
          {" "}ve{" "}
          <Link
            href="/gizlilik"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-gold underline-offset-2 transition-colors duration-200 hover:text-gold"
          >
            Gizlilik Politikası
          </Link>
          &apos;nı okudum, kişisel verilerimin işlenmesini kabul ediyorum.
        </span>
      </label>

      <label className="flex cursor-pointer items-start gap-2 text-sm text-muted transition-colors duration-200 hover:text-ink">
        <input name="commercialConsent" type="checkbox" className="mt-1 cursor-pointer accent-gold" />
        <span>Tarafıma SMS veya e-posta ile ticari elektronik ileti gönderilmesine izin veriyorum.</span>
      </label>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending || closed || !kvkkAccepted}
          className="btn-cmk btn-cmk-gold group inline-flex items-center gap-1.5 px-8 py-3 text-sm disabled:opacity-60"
        >
          {pending ? (
            "Gönderiliyor"
          ) : (
            <>
              <span>Gönder</span>
              <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </>
          )}
        </button>
      </div>
      {closed ? <p className="text-sm text-muted">Form gönderimi şu an kapalı.</p> : null}
      {error ? (
        <p className="text-sm text-ink" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}

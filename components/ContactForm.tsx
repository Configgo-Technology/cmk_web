"use client";

import { FormEvent, useEffect, useState } from "react";
import { subjects } from "@/data/site";

declare global {
  interface Window {
    grecaptcha?: {
      getResponse: () => string;
      reset: () => void;
    };
  }
}

const fieldClass =
  "w-full border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-gold";

export default function ContactForm({
  siteKey,
  captchaRequired,
}: {
  siteKey: string;
  captchaRequired: boolean;
}) {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const closed = captchaRequired && !siteKey;

  useEffect(() => {
    if (!siteKey || document.querySelector("script[data-recaptcha]")) return;
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.dataset.recaptcha = "true";
    document.body.appendChild(script);
  }, [siteKey]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (closed) return;

    const form = new FormData(event.currentTarget);
    const recaptchaToken = siteKey ? window.grecaptcha?.getResponse() ?? "" : "";
    if (siteKey && !recaptchaToken) {
      setError("Güvenlik doğrulamasını tamamlayın.");
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          subject: form.get("subject"),
          message: form.get("message"),
          privacy: form.get("privacy") === "on",
          recaptchaToken,
        }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(data.error || "Mesajınız gönderilemedi.");
        window.grecaptcha?.reset();
        return;
      }
      setDone(true);
      event.currentTarget.reset();
      window.grecaptcha?.reset();
    } catch {
      setError("Mesajınız gönderilemedi.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return <p className="bg-white px-4 py-6 text-sm text-ink">Mesajınız alındı. En kısa sürede size dönüş yapacağız.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={fieldClass} name="name" placeholder="Ad Soyad" autoComplete="name" required maxLength={80} />
        <input className={fieldClass} name="email" type="email" placeholder="E-posta" autoComplete="email" required maxLength={120} />
        <input className={fieldClass} name="phone" placeholder="Telefon" autoComplete="tel" required maxLength={20} />
        <select className={fieldClass} name="subject" defaultValue="" required>
          <option value="" disabled>
            Konu Seçiniz
          </option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <textarea className={`${fieldClass} min-h-32`} name="message" placeholder="Mesajınız" required minLength={10} maxLength={2000} />
      {siteKey ? <div className="g-recaptcha" data-sitekey={siteKey} /> : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-start gap-2 text-sm text-muted">
          <input name="privacy" type="checkbox" className="mt-1" required />
          Gizlilik ve Kullanım Koşullarını kabul ediyorum.
        </label>
        <button
          type="submit"
          disabled={pending || closed}
          className="bg-gold px-8 py-3 text-sm text-white disabled:opacity-60"
        >
          {pending ? "Gönderiliyor" : "Gönder →"}
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

import { subjects } from "@/data/site";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+()\s-]{7,20}$/;

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacy: boolean;
  recaptchaToken: string;
};

export function readContactPayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;
  return {
    name: typeof record.name === "string" ? record.name.trim() : "",
    email: typeof record.email === "string" ? record.email.trim() : "",
    phone: typeof record.phone === "string" ? record.phone.trim() : "",
    subject: typeof record.subject === "string" ? record.subject.trim() : "",
    message: typeof record.message === "string" ? record.message.trim() : "",
    privacy: record.privacy === true,
    recaptchaToken: typeof record.recaptchaToken === "string" ? record.recaptchaToken : "",
  };
}

export function validateContact(input: ContactPayload) {
  if (input.name.length < 2 || input.name.length > 80) return "Ad soyad eksik.";
  if (!emailPattern.test(input.email) || input.email.length > 120) return "E-posta geçersiz.";
  if (!phonePattern.test(input.phone)) return "Telefon geçersiz.";
  if (!subjects.includes(input.subject as (typeof subjects)[number])) return "Konu seçiniz.";
  if (input.message.length < 10 || input.message.length > 2000) return "Mesajınız çok kısa.";
  if (!input.privacy) return "Gizlilik ve kullanım koşullarını kabul edin.";
  return null;
}

export async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }
  if (!token) return false;

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  if (!response.ok) return false;
  const data = (await response.json()) as { success?: boolean };
  return data.success === true;
}

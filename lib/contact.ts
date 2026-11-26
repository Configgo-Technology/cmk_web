import { leadProjects } from "@/data/site";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+()\s-]{7,20}$/;

export type ContactPayload = {
  fullName: string;
  email: string;
  phone: string;
  project: string;
  kvkkConsent: boolean;
  recaptchaToken: string;
};

export function readContactPayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;
  return {
    fullName: typeof record.fullName === "string" ? record.fullName.trim() : "",
    email: typeof record.email === "string" ? record.email.trim() : "",
    phone: typeof record.phone === "string" ? record.phone.trim() : "",
    project: typeof record.project === "string" ? record.project.trim() : "",
    kvkkConsent: record.kvkkConsent === true,
    recaptchaToken: typeof record.recaptchaToken === "string" ? record.recaptchaToken : "",
  };
}

export function validateContact(input: ContactPayload) {
  if (input.fullName.length < 2 || input.fullName.length > 80) return "Ad soyad eksik.";
  if (!emailPattern.test(input.email) || input.email.length > 120) return "E-posta geçersiz.";
  if (!phonePattern.test(input.phone)) return "Telefon geçersiz.";
  if (!leadProjects.includes(input.project as (typeof leadProjects)[number])) {
    return "Proje seçiniz.";
  }
  if (!input.kvkkConsent) return "KVKK aydınlatma metnini onaylayın.";
  return null;
}

export function getContactFormConfig() {
  const crmBase = (process.env.CMK_CORE_URL?.trim() || "https://api.configgo.com/cmk-core").replace(/\/+$/, "");
  const webhookSecret =
    process.env.CRM_WEBHOOK_SECRET?.trim() || process.env.WEB_LEADS_WEBHOOK_SECRET?.trim() || "";
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "";
  const captchaSecret = process.env.RECAPTCHA_SECRET_KEY?.trim() ?? "";
  const production = process.env.NODE_ENV === "production";
  const hasCaptchaKeys = Boolean(siteKey && captchaSecret);
  const enabled = production
    ? Boolean(webhookSecret) && hasCaptchaKeys
    : hasCaptchaKeys || (!siteKey && !captchaSecret);

  return { enabled, crmBase, webhookSecret, siteKey, captchaSecret };
}

export async function verifyRecaptcha(token: string, secret: string) {
  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }
  if (!token) return false;

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) return false;
  const data = (await response.json()) as { success?: boolean };
  return data.success === true;
}

function postWebLead(url: string, body: string, headers: HeadersInit) {
  return fetch(url, {
    method: "POST",
    headers,
    body,
    signal: AbortSignal.timeout(10_000),
  });
}

export type ClientMeta = {
  ip?: string;
  userAgent?: string;
};

/** Canlı CRM: `POST {base}/web-leads` (201 Created + `{ success: true }`). */
export async function forwardWebLead(
  input: ContactPayload,
  base: string,
  secret: string,
  clientMeta?: ClientMeta,
) {
  const payload = JSON.stringify({
    full_name: input.fullName,
    email: input.email,
    phone: input.phone,
    project: input.project,
    kvkk_consent: input.kvkkConsent,
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (secret) headers["X-Webhook-Secret"] = secret;

  const ip = clientMeta?.ip?.replace(/[\r\n]+/g, "").trim();
  if (ip && ip !== "unknown") {
    headers["X-Forwarded-For"] = ip.slice(0, 80);
  }
  const userAgent = clientMeta?.userAgent?.replace(/[\r\n]+/g, " ").trim();
  if (userAgent) {
    headers["User-Agent"] = userAgent.slice(0, 300);
  }

  const endpoint = `${base}/web-leads`;
  let response = await postWebLead(endpoint, payload, headers);

  if (response.status >= 500) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    response = await postWebLead(endpoint, payload, headers);
  }

  return response;
}

export async function isWebLeadCreated(response: Response): Promise<boolean> {
  if (response.status !== 201) return false;
  try {
    const data = (await response.json()) as { success?: unknown };
    return data.success === true;
  } catch {
    return false;
  }
}

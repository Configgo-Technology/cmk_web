import { leadProjects } from "@/data/site";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+()\s-]{7,20}$/;

export type ContactPayload = {
  fullName: string;
  email: string;
  phone: string;
  project: string;
  kvkkConsent: boolean;
  commercialConsent: boolean;
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
    commercialConsent: record.commercialConsent === true,
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

function crmBaseUrl() {
  return (process.env.CMK_CORE_URL ?? "https://api.configgo.com/cmk-core").replace(/\/$/, "");
}

async function postWebLead(url: string, body: string, headers: HeadersInit) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    return await fetch(url, {
      method: "POST",
      headers,
      body,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

/** Canlı CRM: önce `/web-leads`, 404 olursa `/api/web-leads`. */
export async function forwardWebLead(input: ContactPayload) {
  const secret = process.env.CRM_WEBHOOK_SECRET ?? process.env.WEB_LEADS_WEBHOOK_SECRET ?? "";
  const payload = JSON.stringify({
    full_name: input.fullName,
    email: input.email,
    phone: input.phone,
    project: input.project,
    kvkk_consent: true,
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (secret) headers["X-Webhook-Secret"] = secret;

  const base = crmBaseUrl();
  const primary = `${base}/web-leads`;
  let response = await postWebLead(primary, payload, headers);

  if (response.status === 404) {
    response = await postWebLead(`${base}/api/web-leads`, payload, headers);
  }

  if (response.status >= 500) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    response = await postWebLead(
      response.url.includes("/api/web-leads") ? `${base}/api/web-leads` : primary,
      payload,
      headers,
    );
  }

  return response;
}

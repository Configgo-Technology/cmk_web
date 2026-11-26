import { NextResponse } from "next/server";
import {
  forwardWebLead,
  getContactFormConfig,
  readContactPayload,
  validateContact,
  verifyRecaptcha,
} from "@/lib/contact";
import { allowRequest, clientKey } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!allowRequest(clientKey(request))) {
    return NextResponse.json(
      { ok: false, error: "Çok fazla deneme. Bir süre sonra yeniden deneyin." },
      { status: 429 },
    );
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(length) && length > 20_000) {
    return NextResponse.json({ ok: false, error: "Gönderim kabul edilmedi." }, { status: 413 });
  }

  const { enabled, crmBase, captchaSecret, webhookSecret } = getContactFormConfig();
  if (!enabled) {
    return NextResponse.json({ ok: false, error: "Form gönderimi şu an kapalı." }, { status: 503 });
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 20_000) {
      return NextResponse.json({ ok: false, error: "Gönderim kabul edilmedi." }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Gönderim kabul edilmedi." }, { status: 400 });
  }

  const payload = readContactPayload(body);
  if (!payload) {
    return NextResponse.json({ ok: false, error: "Gönderim kabul edilmedi." }, { status: 400 });
  }

  const error = validateContact(payload);
  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 400 });
  }

  try {
    if (!(await verifyRecaptcha(payload.recaptchaToken, captchaSecret))) {
      return NextResponse.json({ ok: false, error: "Güvenlik doğrulaması başarısız." }, { status: 400 });
    }
    const upstream = await forwardWebLead(payload, crmBase, webhookSecret);
    if (!upstream.ok) {
      return NextResponse.json({ ok: false, error: "Mesajınız şu an iletilemedi." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "Mesajınız şu an iletilemedi." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

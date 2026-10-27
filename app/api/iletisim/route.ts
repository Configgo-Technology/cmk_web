import { NextResponse } from "next/server";
import { readContactPayload, validateContact, verifyRecaptcha } from "@/lib/contact";
import { allowRequest, clientKey } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!allowRequest(clientKey(request))) {
    return NextResponse.json({ ok: false, error: "Çok fazla deneme. Bir süre sonra yeniden deneyin." }, { status: 429 });
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 20_000) {
    return NextResponse.json({ ok: false, error: "Gönderim kabul edilmedi." }, { status: 413 });
  }

  if (process.env.NODE_ENV === "production" && !process.env.RECAPTCHA_SECRET_KEY) {
    return NextResponse.json({ ok: false, error: "Form gönderimi şu an kapalı." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
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

  const captchaOk = await verifyRecaptcha(payload.recaptchaToken);
  if (!captchaOk) {
    return NextResponse.json({ ok: false, error: "Güvenlik doğrulaması başarısız." }, { status: 400 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    let target: URL;
    try {
      target = new URL(webhook);
    } catch {
      return NextResponse.json({ ok: false, error: "Mesajınız şu an iletilemedi." }, { status: 500 });
    }
    if (target.protocol !== "https:") {
      return NextResponse.json({ ok: false, error: "Mesajınız şu an iletilemedi." }, { status: 500 });
    }

    const forwarded = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        subject: payload.subject,
        message: payload.message,
        privacy: true,
      }),
    });

    if (!forwarded.ok) {
      return NextResponse.json({ ok: false, error: "Mesajınız şu an iletilemedi." }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { forwardWebLead, readContactPayload, validateContact, verifyRecaptcha } from "@/lib/contact";
import { allowRequest, clientKey } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!allowRequest(clientKey(request))) {
    return NextResponse.json(
      { ok: false, error: "Çok fazla deneme. Bir süre sonra yeniden deneyin." },
      { status: 429 },
    );
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 20_000) {
    return NextResponse.json({ ok: false, error: "Gönderim kabul edilmedi." }, { status: 413 });
  }

  const hasCaptcha = Boolean(process.env.RECAPTCHA_SECRET_KEY);
  const hasCrmSecret = Boolean(process.env.CRM_WEBHOOK_SECRET ?? process.env.WEB_LEADS_WEBHOOK_SECRET);
  if (process.env.NODE_ENV === "production" && (!hasCaptcha || !hasCrmSecret)) {
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

  try {
    const upstream = await forwardWebLead(payload);
    if (!upstream.ok) {
      const status = upstream.status === 401 || upstream.status === 403 ? 502 : 502;
      return NextResponse.json({ ok: false, error: "Mesajınız şu an iletilemedi." }, { status });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "Mesajınız şu an iletilemedi." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

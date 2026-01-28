import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';
// Nodemailer requiere Node.js; no usar runtime: 'edge'

// ——— Rate limit en memoria: IP → { count, firstTs }
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 min
const RATE_MAX_REQUESTS = 5;

const rateMap = new Map<string, { count: number; firstTs: number }>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  let entry = rateMap.get(ip);

  if (!entry) {
    rateMap.set(ip, { count: 1, firstTs: now });
    return false;
  }

  if (now - entry.firstTs > RATE_WINDOW_MS) {
    rateMap.set(ip, { count: 1, firstTs: now });
    return false;
  }

  entry.count += 1;
  if (entry.count > RATE_MAX_REQUESTS) return true;
  return false;
}

// Limpieza periódica de entradas viejas (opcional, evita crecimiento infinito)
function pruneRateMap(): void {
  const now = Date.now();
  for (const [ip, v] of rateMap.entries()) {
    if (now - v.firstTs > RATE_WINDOW_MS) rateMap.delete(ip);
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildHtml(data: {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  isoDate: string;
  ip: string;
}): string {
  const esc = (s: string) =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #132d54; max-width: 560px;">
  <h2 style="color: #132d54; margin-bottom: 16px;">Nuevo mensaje desde el formulario de contacto</h2>
  <table style="border-collapse: collapse; width: 100%; margin-bottom: 16px;">
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600; width: 140px;">Nombre</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${esc(data.fullName)}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Email</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${esc(data.email)}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Teléfono</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${data.phone ? esc(data.phone) : '—'}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Empresa</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${data.company ? esc(data.company) : '—'}</td></tr>
  </table>
  <p style="margin-bottom: 4px;"><strong>Mensaje</strong></p>
  <div style="background: #fcf7f3; padding: 12px; border-radius: 8px; white-space: pre-wrap;">${esc(data.message)}</div>
  <p style="margin-top: 20px; font-size: 12px; color: #718f4e;">Enviado el ${esc(data.isoDate)}${data.ip !== 'unknown' ? ` · IP: ${esc(data.ip)}` : ''}</p>
</body>
</html>
  `.trim();
}

function buildText(data: {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  isoDate: string;
  ip: string;
}): string {
  return [
    'Nuevo mensaje desde el formulario de contacto',
    '',
    `Nombre: ${data.fullName}`,
    `Email: ${data.email}`,
    `Teléfono: ${data.phone || '—'}`,
    `Empresa: ${data.company || '—'}`,
    '',
    'Mensaje:',
    data.message,
    '',
    `Enviado el ${data.isoDate}${data.ip !== 'unknown' ? ` · IP: ${data.ip}` : ''}`,
  ].join('\n');
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  pruneRateMap();

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Demasiados envíos. Intenta de nuevo en unos minutos.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Cuerpo de la solicitud inválido.' },
      { status: 400 }
    );
  }

  const o = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  const fullName = typeof o.fullName === 'string' ? o.fullName.trim() : '';
  const email = typeof o.email === 'string' ? o.email.trim() : '';
  const phone = typeof o.phone === 'string' ? o.phone.trim() : '';
  const company = typeof o.company === 'string' ? o.company.trim() : '';
  const message = typeof o.message === 'string' ? o.message.trim() : '';
  const website = typeof o.website === 'string' ? o.website.trim() : '';

  // Honeypot: si "website" tiene contenido, responder 200 OK y no enviar
  if (website) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // Validación
  if (!fullName || fullName.length < 2) {
    return NextResponse.json(
      { success: false, error: 'El nombre debe tener al menos 2 caracteres.' },
      { status: 400 }
    );
  }
  if (!email) {
    return NextResponse.json(
      { success: false, error: 'El correo electrónico es obligatorio.' },
      { status: 400 }
    );
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, error: 'El correo electrónico no es válido.' },
      { status: 400 }
    );
  }
  if (!message || message.length < 10) {
    return NextResponse.json(
      { success: false, error: 'El mensaje debe tener al menos 10 caracteres.' },
      { status: 400 }
    );
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_TO;
  const subjectPrefix = process.env.MAIL_SUBJECT_PREFIX ?? '[Web Form]';

  if (!host || !user || !pass || !from || !to) {
    return NextResponse.json(
      { success: false, error: 'Configuración de correo incompleta.' },
      { status: 500 }
    );
  }

  const isoDate = new Date().toISOString();
  const payload = { fullName, email, phone, company, message, isoDate, ip };

  let transporter: nodemailer.Transporter;
  try {
    transporter = nodemailer.createTransport({
      host,
      port: port || (secure ? 465 : 587),
      secure: !!secure,
      auth: { user, pass },
    });
  } catch (err) {
    console.error('[contact] createTransport:', err);
    return NextResponse.json(
      { success: false, error: 'No se pudo enviar el mensaje. Intenta más tarde.' },
      { status: 500 }
    );
  }

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `${subjectPrefix} ${fullName}`,
      html: buildHtml(payload),
      text: buildText(payload),
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] sendMail:', err);
    return NextResponse.json(
      { success: false, error: 'No se pudo enviar el mensaje. Intenta más tarde.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Contact API OK' }, { status: 200 });
}

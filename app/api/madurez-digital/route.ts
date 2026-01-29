import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

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

function pruneRateMap(): void {
  const now = Date.now();
  for (const [ip, v] of rateMap.entries()) {
    if (now - v.firstTs > RATE_WINDOW_MS) rateMap.delete(ip);
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildHtml(data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  consent: boolean;
  industry: string;
  role: string;
  companySize: string;
  totalScore: number;
  level: string;
  dimensionScores: {
    strategy: number;
    channels: number;
    data: number;
    tech: number;
  };
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
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #132d54; max-width: 600px;">
  <h2 style="color: #132d54; margin-bottom: 16px;">📊 Nueva Evaluación de Madurez Digital</h2>
  
  <h3 style="color: #718f4e; margin-top: 24px; margin-bottom: 12px;">Información del Lead</h3>
  <table style="border-collapse: collapse; width: 100%; margin-bottom: 16px;">
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600; width: 160px;">Nombre</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${esc(data.name)}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Email</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${esc(data.email)}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Empresa</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${esc(data.company)}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Teléfono</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${data.phone ? esc(data.phone) : '—'}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Industria</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${esc(data.industry)}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Rol</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${esc(data.role)}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Tamaño Empresa</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${esc(data.companySize)}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Consultoría</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${data.consent ? '✅ Sí, interesado' : '❌ No'}</td></tr>
  </table>

  <h3 style="color: #718f4e; margin-top: 24px; margin-bottom: 12px;">Resultados de la Evaluación</h3>
  <div style="background: #fcf7f3; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
    <p style="margin: 0 0 8px 0; font-size: 18px;"><strong>Score Total: ${data.totalScore}/100</strong></p>
    <p style="margin: 0; font-size: 16px; color: #718f4e;"><strong>Nivel: ${esc(data.level)}</strong></p>
  </div>

  <h4 style="color: #132d54; margin-top: 20px; margin-bottom: 12px;">Desglose por Dimensión</h4>
  <table style="border-collapse: collapse; width: 100%; margin-bottom: 16px;">
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600; width: 160px;">🎯 Estrategia</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${data.dimensionScores.strategy}/100</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">📱 Canales Digitales</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${data.dimensionScores.channels}/100</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">📊 Datos & Analytics</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${data.dimensionScores.data}/100</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">💻 Tecnología</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${data.dimensionScores.tech}/100</td></tr>
  </table>

  <p style="margin-top: 20px; font-size: 12px; color: #718f4e;">Evaluación completada el ${esc(data.isoDate)}${data.ip !== 'unknown' ? ` · IP: ${esc(data.ip)}` : ''}</p>
  
  <div style="margin-top: 24px; padding: 12px; background: #e8f5e9; border-left: 4px solid #718f4e; border-radius: 4px;">
    <p style="margin: 0; font-size: 14px;"><strong>💡 Acción sugerida:</strong> ${data.consent ? 'El lead está interesado en consultoría estratégica. Contactar pronto.' : 'Enviar seguimiento con recursos adicionales.'}</p>
  </div>
</body>
</html>
  `.trim();
}

function buildText(data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  consent: boolean;
  industry: string;
  role: string;
  companySize: string;
  totalScore: number;
  level: string;
  dimensionScores: {
    strategy: number;
    channels: number;
    data: number;
    tech: number;
  };
  isoDate: string;
  ip: string;
}): string {
  return [
    '📊 Nueva Evaluación de Madurez Digital',
    '',
    '=== Información del Lead ===',
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    `Empresa: ${data.company}`,
    `Teléfono: ${data.phone || '—'}`,
    `Industria: ${data.industry}`,
    `Rol: ${data.role}`,
    `Tamaño Empresa: ${data.companySize}`,
    `Interesado en Consultoría: ${data.consent ? 'Sí' : 'No'}`,
    '',
    '=== Resultados de la Evaluación ===',
    `Score Total: ${data.totalScore}/100`,
    `Nivel: ${data.level}`,
    '',
    'Desglose por Dimensión:',
    `  🎯 Estrategia: ${data.dimensionScores.strategy}/100`,
    `  📱 Canales Digitales: ${data.dimensionScores.channels}/100`,
    `  📊 Datos & Analytics: ${data.dimensionScores.data}/100`,
    `  💻 Tecnología: ${data.dimensionScores.tech}/100`,
    '',
    `Evaluación completada el ${data.isoDate}${data.ip !== 'unknown' ? ` · IP: ${data.ip}` : ''}`,
    '',
    data.consent ? '💡 El lead está interesado en consultoría estratégica. Contactar pronto.' : '💡 Enviar seguimiento con recursos adicionales.',
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
  const name = typeof o.name === 'string' ? o.name.trim() : '';
  const email = typeof o.email === 'string' ? o.email.trim() : '';
  const company = typeof o.company === 'string' ? o.company.trim() : '';
  const phone = typeof o.phone === 'string' ? o.phone.trim() : '';
  const consent = typeof o.consent === 'boolean' ? o.consent : false;
  const industry = typeof o.industry === 'string' ? o.industry.trim() : '';
  const role = typeof o.role === 'string' ? o.role.trim() : '';
  const companySize = typeof o.companySize === 'string' ? o.companySize.trim() : '';
  const totalScore = typeof o.totalScore === 'number' ? o.totalScore : 0;
  const level = typeof o.level === 'string' ? o.level.trim() : '';
  
  const dimensionScores = (o.dimensionScores && typeof o.dimensionScores === 'object' ? o.dimensionScores : {}) as Record<string, unknown>;
  const dimensions = {
    strategy: typeof dimensionScores.strategy === 'number' ? dimensionScores.strategy : 0,
    channels: typeof dimensionScores.channels === 'number' ? dimensionScores.channels : 0,
    data: typeof dimensionScores.data === 'number' ? dimensionScores.data : 0,
    tech: typeof dimensionScores.tech === 'number' ? dimensionScores.tech : 0,
  };

  // Validación
  if (!name || name.length < 2) {
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
  if (!company || company.length < 2) {
    return NextResponse.json(
      { success: false, error: 'La empresa es obligatoria.' },
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

  if (!host || !user || !pass || !from || !to) {
    return NextResponse.json(
      { success: false, error: 'Configuración de correo incompleta.' },
      { status: 500 }
    );
  }

  const isoDate = new Date().toISOString();
  const payload = {
    name,
    email,
    company,
    phone,
    consent,
    industry,
    role,
    companySize,
    totalScore,
    level,
    dimensionScores: dimensions,
    isoDate,
    ip,
  };

  let transporter: nodemailer.Transporter;
  try {
    transporter = nodemailer.createTransport({
      host,
      port: port || (secure ? 465 : 587),
      secure: !!secure,
      auth: { user, pass },
    });
  } catch (err) {
    console.error('[madurez-digital] createTransport:', err);
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
      subject: `[Madurez Digital] ${name} - ${company} (${totalScore}/100)`,
      html: buildHtml(payload),
      text: buildText(payload),
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[madurez-digital] sendMail:', err);
    return NextResponse.json(
      { success: false, error: 'No se pudo enviar el mensaje. Intenta más tarde.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Madurez Digital API OK' }, { status: 200 });
}

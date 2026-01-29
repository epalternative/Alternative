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

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('es-PA', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

function formatNumber(n: number, decimals = 0): string {
  return new Intl.NumberFormat('es-PA', { maximumFractionDigits: decimals, minimumFractionDigits: decimals }).format(n);
}

function buildHtml(data: {
  email: string;
  processName: string;
  frecuencia: string;
  volumen: number;
  tiempoMinutos: number;
  personas: number;
  costoHora: number;
  mejoraPct: number;
  costoProyecto: number;
  costoAnual: number;
  costoOptimizado: number;
  ahorroAnual: number;
  roi: number;
  paybackMeses: number;
  beneficioAno1: number;
  beneficio3Anos: number;
  recommendationLevel: string;
  recommendationTitle: string;
  isoDate: string;
  ip: string;
}): string {
  const esc = (s: string) =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  // Color según nivel de recomendación
  let roiColor = '#718f4e';
  let roiBg = '#f0f4e9';
  if (data.roi > 200) {
    roiColor = '#28a745';
    roiBg = '#e8f5e9';
  } else if (data.roi >= 100) {
    roiColor = '#718f4e';
    roiBg = '#f0f4e9';
  } else if (data.roi >= 50) {
    roiColor = '#ffc107';
    roiBg = '#fff8e1';
  } else {
    roiColor = '#dc3545';
    roiBg = '#ffebee';
  }

  const frecuenciaMap: Record<string, string> = {
    hora: 'por hora',
    dia: 'por día',
    semana: 'por semana',
    mes: 'por mes',
    trimestre: 'por trimestre',
  };

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #132d54; max-width: 600px;">
  <h2 style="color: #132d54; margin-bottom: 16px;">Calculadora ROI - Nueva Descarga</h2>
  
  <h3 style="color: #718f4e; margin-top: 24px; margin-bottom: 12px;">Informacion del Lead</h3>
  <table style="border-collapse: collapse; width: 100%; margin-bottom: 16px;">
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600; width: 160px;">Email</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${esc(data.email)}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Proceso</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${data.processName ? esc(data.processName) : '(No especificado)'}</td></tr>
  </table>

  <h3 style="color: #718f4e; margin-top: 24px; margin-bottom: 12px;">Resultados del Analisis</h3>
  <div style="background: ${roiBg}; padding: 16px; border-radius: 8px; margin-bottom: 16px; text-align: center;">
    <p style="margin: 0 0 8px 0; font-size: 24px; color: ${roiColor};"><strong>ROI: ${formatNumber(data.roi, 0)}%</strong></p>
    <p style="margin: 0; font-size: 14px; color: ${roiColor};"><strong>${esc(data.recommendationTitle)}</strong></p>
  </div>

  <table style="border-collapse: collapse; width: 100%; margin-bottom: 16px;">
    <tr style="background: #fcf7f3;"><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Costo Anual Actual</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${formatCurrency(data.costoAnual)}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Costo Anual Optimizado</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${formatCurrency(data.costoOptimizado)}</td></tr>
    <tr style="background: #e8f5e9;"><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600; color: #28a745;">Ahorro Anual</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa; color: #28a745; font-weight: bold;">${formatCurrency(data.ahorroAnual)}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Payback</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${formatNumber(data.paybackMeses, 1)} meses</td></tr>
    <tr style="background: #fcf7f3;"><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Beneficio Neto Año 1</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${formatCurrency(data.beneficioAno1)}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Beneficio Acumulado 3 Años</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${formatCurrency(data.beneficio3Anos)}</td></tr>
  </table>

  <h3 style="color: #718f4e; margin-top: 24px; margin-bottom: 12px;">Parametros Ingresados</h3>
  <table style="border-collapse: collapse; width: 100%; margin-bottom: 16px;">
    <tr style="background: #fcf7f3;"><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600; width: 160px;">Volumen</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${data.volumen} ${frecuenciaMap[data.frecuencia] || data.frecuencia}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Tiempo por ejecucion</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${data.tiempoMinutos} minutos</td></tr>
    <tr style="background: #fcf7f3;"><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Personas involucradas</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${data.personas}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Costo por hora</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${formatCurrency(data.costoHora)}</td></tr>
    <tr style="background: #fcf7f3;"><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Mejora esperada</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${data.mejoraPct}%</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Costo del proyecto</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${formatCurrency(data.costoProyecto)}</td></tr>
  </table>

  <p style="margin-top: 20px; font-size: 12px; color: #718f4e;">Calculadora completada el ${esc(data.isoDate)}${data.ip !== 'unknown' ? ` - IP: ${esc(data.ip)}` : ''}</p>
  
  <div style="margin-top: 24px; padding: 12px; background: #e8f5e9; border-left: 4px solid #718f4e; border-radius: 4px;">
    <p style="margin: 0; font-size: 14px;"><strong>Accion sugerida:</strong> ${data.roi >= 100 ? 'Lead con alto potencial. Contactar para ofrecer consultoria de optimizacion.' : 'Enviar seguimiento con informacion sobre como mejorar el ROI del proyecto.'}</p>
  </div>
</body>
</html>
  `.trim();
}

function buildText(data: {
  email: string;
  processName: string;
  frecuencia: string;
  volumen: number;
  tiempoMinutos: number;
  personas: number;
  costoHora: number;
  mejoraPct: number;
  costoProyecto: number;
  costoAnual: number;
  costoOptimizado: number;
  ahorroAnual: number;
  roi: number;
  paybackMeses: number;
  beneficioAno1: number;
  beneficio3Anos: number;
  recommendationLevel: string;
  recommendationTitle: string;
  isoDate: string;
  ip: string;
}): string {
  const frecuenciaMap: Record<string, string> = {
    hora: 'por hora',
    dia: 'por día',
    semana: 'por semana',
    mes: 'por mes',
    trimestre: 'por trimestre',
  };

  return [
    'Calculadora ROI - Nueva Descarga',
    '',
    '=== Informacion del Lead ===',
    `Email: ${data.email}`,
    `Proceso: ${data.processName || '(No especificado)'}`,
    '',
    '=== Resultados del Analisis ===',
    `ROI: ${formatNumber(data.roi, 0)}%`,
    `Nivel: ${data.recommendationTitle}`,
    `Costo Anual Actual: ${formatCurrency(data.costoAnual)}`,
    `Costo Anual Optimizado: ${formatCurrency(data.costoOptimizado)}`,
    `Ahorro Anual: ${formatCurrency(data.ahorroAnual)}`,
    `Payback: ${formatNumber(data.paybackMeses, 1)} meses`,
    `Beneficio Neto Año 1: ${formatCurrency(data.beneficioAno1)}`,
    `Beneficio Acumulado 3 Años: ${formatCurrency(data.beneficio3Anos)}`,
    '',
    '=== Parametros Ingresados ===',
    `Volumen: ${data.volumen} ${frecuenciaMap[data.frecuencia] || data.frecuencia}`,
    `Tiempo por ejecucion: ${data.tiempoMinutos} minutos`,
    `Personas involucradas: ${data.personas}`,
    `Costo por hora: ${formatCurrency(data.costoHora)}`,
    `Mejora esperada: ${data.mejoraPct}%`,
    `Costo del proyecto: ${formatCurrency(data.costoProyecto)}`,
    '',
    `Calculadora completada el ${data.isoDate}${data.ip !== 'unknown' ? ` - IP: ${data.ip}` : ''}`,
    '',
    data.roi >= 100 ? 'Lead con alto potencial. Contactar para ofrecer consultoria de optimizacion.' : 'Enviar seguimiento con informacion sobre como mejorar el ROI del proyecto.',
  ].join('\n');
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  pruneRateMap();

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Demasiados envios. Intenta de nuevo en unos minutos.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Cuerpo de la solicitud invalido.' },
      { status: 400 }
    );
  }

  const o = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  const email = typeof o.email === 'string' ? o.email.trim() : '';
  const processName = typeof o.processName === 'string' ? o.processName.trim() : '';
  const frecuencia = typeof o.frecuencia === 'string' ? o.frecuencia : 'dia';
  const volumen = typeof o.volumen === 'number' ? o.volumen : 0;
  const tiempoMinutos = typeof o.tiempoMinutos === 'number' ? o.tiempoMinutos : 0;
  const personas = typeof o.personas === 'number' ? o.personas : 0;
  const costoHora = typeof o.costoHora === 'number' ? o.costoHora : 0;
  const mejoraPct = typeof o.mejoraPct === 'number' ? o.mejoraPct : 0;
  const costoProyecto = typeof o.costoProyecto === 'number' ? o.costoProyecto : 0;
  const costoAnual = typeof o.costoAnual === 'number' ? o.costoAnual : 0;
  const costoOptimizado = typeof o.costoOptimizado === 'number' ? o.costoOptimizado : 0;
  const ahorroAnual = typeof o.ahorroAnual === 'number' ? o.ahorroAnual : 0;
  const roi = typeof o.roi === 'number' ? o.roi : 0;
  const paybackMeses = typeof o.paybackMeses === 'number' ? o.paybackMeses : 0;
  const beneficioAno1 = typeof o.beneficioAno1 === 'number' ? o.beneficioAno1 : 0;
  const beneficio3Anos = typeof o.beneficio3Anos === 'number' ? o.beneficio3Anos : 0;
  const recommendationLevel = typeof o.recommendationLevel === 'string' ? o.recommendationLevel : '';
  const recommendationTitle = typeof o.recommendationTitle === 'string' ? o.recommendationTitle : '';

  // Validación
  if (!email) {
    return NextResponse.json(
      { success: false, error: 'El correo electronico es obligatorio.' },
      { status: 400 }
    );
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, error: 'El correo electronico no es valido.' },
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
      { success: false, error: 'Configuracion de correo incompleta.' },
      { status: 500 }
    );
  }

  const isoDate = new Date().toISOString();
  const payload = {
    email,
    processName,
    frecuencia,
    volumen,
    tiempoMinutos,
    personas,
    costoHora,
    mejoraPct,
    costoProyecto,
    costoAnual,
    costoOptimizado,
    ahorroAnual,
    roi,
    paybackMeses,
    beneficioAno1,
    beneficio3Anos,
    recommendationLevel,
    recommendationTitle,
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
    console.error('[roi-calculator] createTransport:', err);
    return NextResponse.json(
      { success: false, error: 'No se pudo enviar el mensaje. Intenta mas tarde.' },
      { status: 500 }
    );
  }

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `[ROI Calculator] ${processName || 'Proceso'} - ROI ${formatNumber(roi, 0)}%`,
      html: buildHtml(payload),
      text: buildText(payload),
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[roi-calculator] sendMail:', err);
    return NextResponse.json(
      { success: false, error: 'No se pudo enviar el mensaje. Intenta mas tarde.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'ROI Calculator API OK' }, { status: 200 });
}

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

// Mismo bloque SMTP que el formulario de contacto: SMTP_*, MAIL_FROM, MAIL_TO, MAIL_SUBJECT_PREFIX
const MAX_FILE_SIZE_MB = 10;
const MAX_FILES = 5;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmailHtml(body: {
  nombreCompleto: string;
  email: string;
  numeroContacto: string;
  asunto: string;
  descripcion: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #132d54;">
  <h2 style="color: #132d54;">Nueva solicitud – Helpdesk IT</h2>
  <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Nombre completo</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${escapeHtml(body.nombreCompleto)}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Correo electrónico</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${escapeHtml(body.email)}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Número de contacto</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${escapeHtml(body.numeroContacto || '—')}</td></tr>
    <tr><td style="padding: 8px 12px; border: 1px solid #c5c0aa; font-weight: 600;">Asunto</td><td style="padding: 8px 12px; border: 1px solid #c5c0aa;">${escapeHtml(body.asunto)}</td></tr>
  </table>
  <p style="margin-top: 16px;"><strong>Descripción del caso</strong></p>
  <p style="white-space: pre-wrap; background: #fcf7f3; padding: 12px; border-radius: 8px;">${escapeHtml(body.descripcion)}</p>
  <p style="margin-top: 24px; font-size: 12px; color: #718f4e;">Enviado desde el formulario Helpdesk IT – Alternative</p>
</body>
</html>
  `.trim();
}

function buildText(body: {
  nombreCompleto: string;
  email: string;
  numeroContacto: string;
  asunto: string;
  descripcion: string;
}): string {
  return [
    'Nueva solicitud – Helpdesk IT',
    '',
    `Nombre completo: ${body.nombreCompleto}`,
    `Correo electrónico: ${body.email}`,
    `Número de contacto: ${body.numeroContacto || '—'}`,
    `Asunto: ${body.asunto}`,
    '',
    'Descripción del caso:',
    body.descripcion,
    '',
    'Enviado desde el formulario Helpdesk IT – Alternative',
  ].join('\n');
}

export async function POST(request: NextRequest) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM;
  const toRaw = process.env.HELPDESK_MAIL_TO ?? process.env.MAIL_TO;
  const subjectPrefix = process.env.MAIL_SUBJECT_PREFIX ?? '[Helpdesk IT]';

  if (!host || !user || !pass || !from || !toRaw) {
    return NextResponse.json(
      { error: 'Configuración de correo incompleta. Revisa SMTP_*, MAIL_FROM y MAIL_TO o HELPDESK_MAIL_TO.' },
      { status: 500 }
    );
  }

  const to = toRaw.split(',').map((e) => e.trim()).filter(Boolean);

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: 'Cuerpo de la solicitud inválido.' },
      { status: 400 }
    );
  }

  const nombreCompleto = (formData.get('nombreCompleto') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const numeroContacto = (formData.get('numeroContacto') as string | null)?.trim() ?? '';
  const asunto = (formData.get('asunto') as string | null)?.trim() ?? '';
  const descripcion = (formData.get('descripcion') as string | null)?.trim() ?? '';

  if (!nombreCompleto || !email || !asunto || !descripcion) {
    return NextResponse.json(
      { error: 'Faltan campos obligatorios: nombre completo, correo, asunto y descripción.' },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: 'El correo electrónico no es válido.' },
      { status: 400 }
    );
  }

  const rawFiles = formData.getAll('adjuntos').filter((v): v is File => v instanceof File);
  const files = rawFiles
    .filter((f) => f.size > 0 && f.size <= MAX_FILE_SIZE_MB * 1024 * 1024)
    .slice(0, MAX_FILES);

  const attachments: { filename: string; content: Buffer }[] = [];
  for (const file of files) {
    try {
      const ab = await file.arrayBuffer();
      attachments.push({ filename: file.name || 'adjunto', content: Buffer.from(ab) });
    } catch {
      // omitir archivos que no se puedan leer
    }
  }

  const body = { nombreCompleto, email, numeroContacto, asunto, descripcion };

  let transporter: nodemailer.Transporter;
  try {
    transporter = nodemailer.createTransport({
      host,
      port: port || (secure ? 465 : 587),
      secure: !!secure,
      requireTLS: true,
      auth: { user, pass },
    });
    console.log('[helpdesk] SMTP', {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      user: process.env.SMTP_USER,
    });
    await transporter.verify();
    console.log('[helpdesk] SMTP verify OK');
  } catch (err) {
    console.error('[helpdesk] createTransport/verify:', err);
    return NextResponse.json(
      { error: 'No se pudo enviar la solicitud. Intenta más tarde.' },
      { status: 500 }
    );
  }

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `${subjectPrefix} ${asunto} – ${nombreCompleto}`,
      html: buildEmailHtml(body),
      text: buildText(body),
      attachments: attachments.length ? attachments : undefined,
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[helpdesk] sendMail:', err);
    return NextResponse.json(
      { error: 'No se pudo enviar la solicitud. Intenta más tarde.' },
      { status: 500 }
    );
  }
}

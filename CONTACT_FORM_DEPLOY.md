# Formularios de correo – Deploy y checklist

Usan **nodemailer** y el mismo bloque SMTP: **formulario de contacto** (`/api/contact`) y **Helpdesk IT** (`/api/helpdesk`, página `/es/helpdesk-it`).

## 1. Variables de entorno (.env.local)

Copia este bloque en `.env.local` (nunca lo subas a git) y sustituye los placeholders:

```env
# ——— SMTP (nodemailer): contacto + Helpdesk IT ———
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=forms@midominio.com
SMTP_PASS=tu_contraseña_del_buzon
MAIL_FROM=forms@midominio.com
# Contacto: destinatario de /api/contact
MAIL_TO=katherine@grupoalternative.com
# Helpdesk IT: destinatarios de /api/helpdesk (varios separados por coma). Si no existe, se usa MAIL_TO.
HELPDESK_MAIL_TO=katherine@grupoalternative.com,support@grupoalternative.com
MAIL_SUBJECT_PREFIX=[Web Form]
```

- **SMTP_HOST**: servidor SMTP (Hostinger: `smtp.hostinger.com`; Gmail: `smtp.gmail.com`).
- **SMTP_PORT**: `465` (SSL) o `587` (TLS).
- **SMTP_SECURE**: `true` si usas 465, `false` si usas 587.
- **SMTP_USER** / **SMTP_PASS**: usuario y contraseña del buzón (usuario = correo completo).
- **MAIL_FROM**: remitente visible (mismo usuario o alias permitido).
- **MAIL_TO**: destinatario del formulario de **contacto**.
- **HELPDESK_MAIL_TO**: destinatarios del formulario **Helpdesk IT** (varios con coma). Opcional; si no se define, se usa **MAIL_TO**.

---

## 2. Cómo setearlas en Vercel

1. En el dashboard del proyecto: **Settings** → **Environment Variables**.
2. Añade cada variable (Name y Value). No uses comillas en el valor.
3. Elige el entorno: **Production**, **Preview** y/o **Development** según quieras que apliquen.
4. Guarda y haz un **redeploy** para que se apliquen (los builds ya usan las variables; un nuevo deploy las carga).

---

## 3. Probar localmente

1. Crea `.env.local` con el bloque anterior y tus valores reales.
2. Instala dependencias: `npm install` (incluye `nodemailer`).
3. Arranca: `npm run dev`.
4. Prueba **contacto**: abre `/es/contacto`, envía y comprueba que llega a **MAIL_TO** con asunto `[Web Form] Nombre`.
5. Prueba **Helpdesk IT**: abre `/es/helpdesk-it`, envía (con o sin adjuntos) y comprueba que llega a **HELPDESK_MAIL_TO** (o **MAIL_TO** si no está definido) con asunto `[Web Form] Asunto – Nombre`.

Errores SMTP: en la consola de `next dev`, contact usa el prefijo `[contact]` y helpdesk `[helpdesk]`.

---

## 4. Errores frecuentes

| Síntoma | Causa habitual | Qué revisar |
|--------|----------------|-------------|
| "Configuración de correo incompleta" | Faltan vars en `.env.local` o en Vercel | Que existan `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` y `MAIL_TO` (o `HELPDESK_MAIL_TO` para helpdesk). |
| Timeout / conexión rechazada | Puerto o SSL incorrectos | 465 → `SMTP_SECURE=true`; 587 → `SMTP_SECURE=false`. Comprueba que el host permita ese puerto. |
| Auth failed / 535 | Usuario o contraseña incorrectos | `SMTP_USER` = correo completo; contraseña del buzón, no de la panel. En Gmail: contraseña de aplicación. |
| From address not allowed | El servidor no admite ese remitente | `MAIL_FROM` debe ser el mismo que `SMTP_USER` o un alias configurado en el buzón. |
| 429 al enviar seguido | Rate limit (5 en 10 min por IP) | Comportamiento esperado. Esperar o probar desde otra IP / otro navegador. |

---

## 5. SPF / DKIM / DMARC (recomendación mínima)

Para que los correos no caigan en spam y no reboten:

- **SPF**: en DNS del dominio, publica un registro TXT que permita enviar por el servidor SMTP que usas (p. ej. el de Hostinger). Sin SPF, muchos receptores rechazan o marcan como spam.
- **DKIM**: firma de dominio que ofrece el proveedor (Hostinger, etc.). Actívala en el panel y añade el registro DNS que te indiquen.
- **DMARC**: política (en DNS) que indica qué hacer con mails que fallen SPF/DKIM (rechazar, cuarentena, etc.). Aunque sea `p=none` al inicio, tener DMARC suele mejorar reputación.

Sin entrar en detalle: configura SPF y DKIM para el dominio desde el que envías (`MAIL_FROM`) y, si puedes, un DMARC básico.

---

## 6. Checklist antes de producción

- [ ] `.env.local` en local con todas las vars del formulario (no commiteado).
- [ ] En Vercel, todas las vars configuradas para el entorno que uses (Production/Preview).
- [ ] Contacto: prueba en producción y comprueba que llega a **MAIL_TO**.
- [ ] Helpdesk IT: prueba en producción y comprueba que llega a **HELPDESK_MAIL_TO** (o **MAIL_TO**).
- [ ] Comprobar que Reply-To es el email del usuario en ambos formularios.
- [ ] Probar rate limit: 6º envío en 10 min desde la misma IP debe devolver 429.
- [ ] Honeypot: si en el cuerpo del POST envías `"website":"http://spam"` no debe enviarse correo y la API debe responder 200.

# Prompt: corrección SEO de grupoalternative.com

Lee primero `docs/SEO-AUDIT.md` completo. Este prompt corrige los hallazgos de ese audit (referencias C1–C5, A1–A13, M1–M16, B1–B13 son de ahí). No re-audites; ejecuta.

## Reglas de trabajo

- Trabaja en la rama `seo/fix` a partir de `main`. **Un commit por fase**, con mensaje `seo(faseN): ...`. No mezcles fases.
- Al terminar cada fase corre `next build` y el script de verificación de la Fase 6 (créalo primero si no existe). Si el build falla, arregla antes de seguir.
- **No cambies diseño, copy visible, animaciones ni estructura de componentes** más allá de lo que aquí se pide. Esto es SEO técnico, no rediseño.
- **No inventes cifras.** Si necesitas un dato que no está en el repo (número de proyectos, años, teléfono, dirección), usa el placeholder `TODO_EDWIN` y lístalo al final.
- Next.js es **14.2** (App Router, `middleware.ts`). No uses APIs de Next 15/16 (`proxy.ts`, `await params`, `cacheComponents`, etc.).
- Cuando el audit y el código real difieran, manda el código real; anótalo en el reporte final.

---

## FASE 1 — Metadata única por página (C1, C2, A6, A13, M2, B1, B4)

### 1.1 Registro central de rutas

Crea `lib/seo/routes.ts` como **única fuente de verdad** de las páginas indexables. Tipo:

```ts
export type PageType = 'home' | 'hub' | 'service' | 'industry' | 'page' | 'tool';

export interface RouteMeta {
  path: string;                 // sin locale, p.ej. '/servicios/sistemas-calidad/certificacion-iso'
  type: PageType;
  title: { es: string; en: string };        // 50–60 chars, SIN sufijo de marca
  description: { es: string; en: string };  // 140–160 chars
  keyword: { es: string; en: string };      // keyword principal (para Service.serviceType y control interno)
  updatedAt: string;            // ISO date, la fecha real del último cambio de contenido
  priority: number;
  changeFrequency: 'weekly' | 'monthly';
  breadcrumb: { es: string; en: string };   // label corto para BreadcrumbList
  noindex?: boolean;
}
export const ROUTES: RouteMeta[] = [ ... ];
export function getRouteMeta(path: string): RouteMeta | undefined;
```

Cubre **todas** las rutas del árbol de `app/[locale]/` excepto `helpdesk-it`, `studio` y `business-consultants` (ver Fase 3). Incluye las 5 que faltan en el sitemap (M4).

Reglas para titles/descriptions (escríbelos tú, en ambos idiomas, revisando el H1 y el copy real de cada página para que coincidan):
- Title: keyword principal al inicio + "Panamá" cuando aplique + valor. Ejemplos del patrón:
  - `/servicios/sistemas-calidad/certificacion-iso` → es: `Certificación ISO en Panamá: 9001, 14001, 27001 y 45001` / en: `ISO Certification in Panama: 9001, 14001, 27001 & 45001`
  - `/servicios/optimizacion-procesos/bpm-empresarial` → es: `Consultoría BPM en Panamá | Gestión de Procesos de Negocio`
  - `/servicios/gestion-proyectos/pmo-office` → es: `Implementación de PMO en Panamá | Oficina de Proyectos`
  - `/industrias/banca-servicios-financieros` → es: `Consultoría para Banca en Panamá | Procesos, SBP y PMO`
  - `/contacto` → es: `Contacto | Diagnóstico Gratuito para tu Empresa en Panamá`
  - `/blog` → es: `Blog de Procesos, Calidad y Proyectos | Grupo Alternative`
- Description: qué es + para quién + beneficio concreto + CTA. Sin frases genéricas ("en el dinámico mundo empresarial").
- **Ninguna combinación title/description puede repetirse.** El script de la Fase 6 lo comprueba.

### 1.2 Helper de metadata

En `lib/seo.ts` añade:

```ts
export function buildPageMetadata(path: string, locale: 'es' | 'en'): Metadata
```
Devuelve `title` (string absoluto, **sin** template), `description`, `alternates` (canonical + languages usando el `buildAlternates` existente, que ya funciona), `openGraph` (type website, locale `es_PA`/`en_US`, url, siteName, title, description, images: `[{ url: '/og-image.png', width: 1200, height: 630 }]`), `twitter` (summary_large_image, misma imagen), `robots` (según `noindex`). Si `getRouteMeta` no encuentra la ruta, lanza error en build (mejor romper el build que publicar otra página con metadata duplicada).

### 1.3 Convertir cada página a wrapper server + client

Para **cada** `page.tsx` con `"use client"` (63 archivos), aplica este patrón con un script (`scripts/codemod-page-split.mjs`), no a mano:

1. Renombra `page.tsx` → `PageClient.tsx` en la misma carpeta (mantiene `"use client"`; exporta el componente como `default`).
2. Crea un nuevo `page.tsx` server component:

```tsx
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageJsonLd } from '@/lib/seo/jsonld';
import PageClient from './PageClient';

const PATH = '/servicios/sistemas-calidad/certificacion-iso';

export function generateMetadata({ params }: { params: { locale: 'es' | 'en' } }): Metadata {
  return buildPageMetadata(PATH, params.locale);
}

export default function Page({ params }: { params: { locale: 'es' | 'en' } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <JsonLd data={buildPageJsonLd(PATH, params.locale)} />
      <PageClient />
    </>
  );
}
```

`PATH` se deriva de la ruta del archivo. Para rutas dinámicas que sobreviven (ver Fase 3) el `PATH` sale de `params`.

Si alguna página cliente recibe props del router (`params`), pásalos desde el wrapper.

### 1.4 Layouts

- `app/[locale]/layout.tsx`: **elimina `headers()` y `x-pathname`** del `generateMetadata` (cada página ya trae su canonical). Deja solo: `metadataBase`, `title` como string fijo de fallback (sin `template`), `description` fallback, `icons`, `openGraph.siteName`. **Elimina `keywords`** (B1). Añade `setRequestLocale(locale)` al inicio del layout.
- Elimina `app/[locale]/nosotros/layout.tsx` y `app/[locale]/helpdesk-it/layout.tsx` (A6, B4): sus páginas pasan por el patrón 1.3. `helpdesk-it` va al registro con `noindex: true`.
- `middleware.ts`: quita el `response.headers.set('x-pathname', ...)` (B11), ya no se usa.
- **`<html lang>` (A1):** el root layout debe emitir el locale real. Mueve `<html>`/`<body>` a `app/[locale]/layout.tsx` con `lang={locale}`, convierte `app/layout.tsx` en un layout mínimo que solo devuelve `children` **si Next 14.2 lo permite sin html/body** — verifica con el build; si Next exige html/body en el root, usa route groups: `app/(site)/[locale]/layout.tsx` con html/body y `app/(studio)/studio/layout.tsx` con su propio html/body, y elimina `app/layout.tsx`. Elimina `components/layout/set-html-lang.tsx`.
- `blog/[slug]/page.tsx`: quita la dependencia del `template` (ya no existe); el title es `post.metaTitle` tal cual. Si supera 60 chars, acorta en `lib/blog.ts`. Emite `post.keywords` no (Google lo ignora) — pero úsalos en Fase 2 para enlazado.
- `app/[locale]/blog/page.tsx` (A13): metadata propia vía el registro (`/blog`).

---

## FASE 2 — Datos estructurados (C3, A12, B10)

### 2.1 Componente y builder

- `components/seo/JsonLd.tsx`: server component que renderiza `<script type="application/ld+json">` con `JSON.stringify`. Acepta un objeto o un array de objetos (usa `@graph`).
- `lib/seo/jsonld.ts` con `buildPageJsonLd(path, locale)` que compone según `RouteMeta.type`:
  - **Siempre:** `BreadcrumbList` construido desde los segmentos del path usando `breadcrumb` del registro (Inicio → Servicios → Sistemas de Calidad → Certificación ISO).
  - `type: 'service'`: `Service` con `name` (title del registro), `serviceType` (keyword), `provider` → `@id` de la Organization, `areaServed: { '@type': 'Country', name: 'Panamá' }`, `url`, `description`. Más `FAQPage` si la página tiene FAQs (ver 2.3).
  - `type: 'industry'`: `WebPage` + `FAQPage` si aplica.
  - `type: 'home'`: nada extra (la Organization va en el layout).
- Instala `schema-dts` y tipa los objetos.

### 2.2 Organization en el layout

En `app/[locale]/layout.tsx` renderiza una vez `ProfessionalService` (subtipo de LocalBusiness) con `@id: 'https://grupoalternative.com/#organization'`, `name: 'Grupo Alternative'`, `url`, `logo` (usa `/og-image.png` o el logo horizontal, no `logo_24.webp`), `telephone: '+50769908906'`, `email: 'info@grupoalternative.com'`, `address` (`addressLocality: 'Ciudad de Panamá'`, `addressCountry: 'PA'`; calle = `TODO_EDWIN`), `openingHoursSpecification` (Lun–Sáb 08:00–17:00, tomado del footer), `areaServed: 'PA'`, `founder`/`employee`: `Person` Katherine González con `jobTitle` y `sameAs` LinkedIn (`TODO_EDWIN` la URL), `sameAs` de la empresa (`TODO_EDWIN`). Añade `WebSite` con `inLanguage`.

### 2.3 FAQs fuera del JSX

Las FAQs viven hoy en arrays `faqs` dentro de cada `PageClient.tsx` (§7.1 del audit). Para que el server component las use en `FAQPage`:
- Crea `lib/content/faqs/<slug>.ts` (o un único `lib/content/faqs.ts` keyed por path) exportando `{ question: {es,en}, answer: {es,en} }[]`.
- Mueve cada array ahí con un script; el `PageClient.tsx` lo importa y sigue renderizando igual (misma UI).
- `buildPageJsonLd` lee de ahí. **No importes datos desde un archivo `"use client"` a un server component.**

### 2.4 Blog

- Cambia `Article` → `BlogPosting`; añade `inLanguage`, `articleSection` (categoryLabel), `wordCount` si es calculable.
- Corrige la imagen (A12): helper `absoluteUrl(src)` que devuelve `src` si ya empieza por `http`, si no `${SITE_URL}${src}`. Úsalo en OG y en JSON-LD.
- Fallback OG para posts sin `heroImage`: `/og-image.png`.
- `heroImage` de posts estáticos: no cambies la imagen vertical por otra sin permiso; anota en el reporte que `consulting-session.webp` es 1066×1600 y debe reemplazarse por una 1200×630 (`TODO_EDWIN`).

Valida un ejemplo de cada tipo con el validador de schema.org (`npx` no tiene acceso a red aquí; genera el JSON y guárdalo en `docs/seo-samples/*.json` para validar manualmente).

---

## FASE 3 — Robots, sitemap, redirecciones y soft-404 (C4, A2, A3, A4, A5, M3, M4, M5, M14, B3)

### 3.1 `app/robots.ts`
- Quita `/_next/` y `/admin/`. Deja `/api/`, añade `/studio`, `/es/studio`, `/en/studio`.

### 3.2 Studio
- Elimina `app/[locale]/studio/` (duplicado). El de `app/studio/` se queda; dale `export const metadata = { robots: { index: false, follow: false } }` en su layout.

### 3.3 `app/sitemap.ts`
- Reescríbelo para que itere `ROUTES` (M14). Cero listas hardcodeadas.
- `lastModified` = `updatedAt` del registro; para posts, `post.updatedAt ?? post.publishedAt` (A5).
- Excluye `noindex`. Excluye `/casos-exito` hasta que tenga contenido (A4) — o mejor: dale `noindex: true` en el registro y ponle metadata honesta ("próximamente"); decide lo segundo.
- `/en/*` con `priority` 0.2 menor que su par `/es`.

### 3.4 Rutas dinámicas soft-404 (A3)
- Elimina los 6 `app/[locale]/servicios/*/[slug]/page.tsx` (stubs "Contenido en desarrollo"). Las subpáginas reales son carpetas explícitas; el 404 lo da Next solo.
- `industrias/[slug]`, `industrias/banca-servicios-financieros/[subslug]`, `recursos/[slug]`: si el slug no está en su `Record` local → `notFound()`. Añade `generateStaticParams` con las claves del record y `export const dynamicParams = false`.

### 3.5 `vercel.json`
- Corrige `aplicaciones-medida` → `aplicaciones-web-moviles` (2 reglas).
- Añade comodines al final: `/service/:path*` → `/es/servicios`, `/services/:path*` → `/en/servicios`, `/project/:path*` → `/es/casos-exito` (o `/es/nosotros` si casos-exito queda noindex — elige coherente con 3.3).
- Los 6 redirects de blog que apuntan a slugs inexistentes: **comprueba en Sanity** si existen esos slugs (`NEXT_PUBLIC_SANITY_PROJECT_ID`/`DATASET` del `.env` local; usa el cliente de `sanity/lib/client.ts`). Si existen, mantén. Si no, redirígelos a `/es/blog`. Documenta cuál fue el caso.
- Añade `/beneficios-de-la-consultoria-en-ti` → `/es/servicios/transformacion-digital`.
- Elimina las reglas redundantes con `next-intl` (`/servicios`, `/blog`, `/contacto`, `/industrias/:path*`, etc. — todas las que son "ruta sin prefijo → misma ruta con /es") **solo si** verificas que `next-intl` redirige igual (308 → `/es/...`). Si no estás seguro, déjalas.

### 3.6 `business-consultants` (M3)
- Elimina `app/[locale]/business-consultants/`. Añade en `vercel.json`: `/es/business-consultants` → `/es/nosotros`, `/en/business-consultants` → `/en/nosotros`.

---

## FASE 4 — Contadores y cifras (C5, M8, M9)

- `components/ui/counter.tsx`: `useState(end)` como valor inicial (el HTML servido muestra la cifra real). En el `useEffect`, cuando `inView`, resetea a 0 y anima hasta `end`. Sin hydration mismatch porque server y primer render cliente coinciden.
- Etiquetas de las 3 stats del hero: mueve a `messages/es.json` / `en.json` (`hero.stats.*`) y usa `useTranslations` (M9).
- Cifras: el hero dice 500+ / 98% / 15+, `messages/es.json` dice 50+ y `nosotros` dice "más de 5 años". **No decidas tú.** Deja los valores actuales y pon en el reporte final la lista de inconsistencias como `TODO_EDWIN`.

---

## FASE 5 — Rendimiento y renderizado (A7, A8, A9, A10, M1, M6, M11, B5, B6, B8)

- **Fuentes:** elimina el `@import` de Google Fonts en `globals.css`; usa `next/font/google` con `Inter` (weights 400/500/600/700, `display: 'swap'`) aplicado en el `<body>` vía variable CSS. Actualiza `tailwind.config` si referencia la familia.
- **Imágenes:** quita `images: { unoptimized: true }`. Si alguna imagen remota (Sanity CDN) se usa con `next/image`, añade `images.remotePatterns` para `cdn.sanity.io`. Verifica con el build que ningún `next/image` rompe.
- **OG/Twitter (A9):** `twitter.images` → `/og-image.png`. En `app/[locale]/opengraph-image.tsx` reemplaza el fetch de `logo_24.webp` (502 KB) por el logo horizontal más ligero que exista en `public/`, o convierte `logo_24.webp` a una versión de ≤600 px de ancho y usa esa.
- **`metadataBase` (A10):** en el root, `new URL(SITE_URL)`. Nada de `NEXTAUTH_URL`.
- **Renderizado estático (A7):** en la config de `next-intl` (`middleware.ts` / `i18n.ts` o `defineRouting` si migras) pon `localeDetection: false`, `localeCookie: false`, `alternateLinks: false` (esto último también elimina la cabecera `Link` con el `x-default` contradictorio, M1). Con `setRequestLocale` ya puesto en layout y páginas (Fase 1), el build debería prerenderizar. **Comprueba** que `prerender-manifest.json` ahora contiene las rutas de `[locale]` y que existen los `.html` en `.next/server/app/`. Si alguna ruta sigue dinámica, identifica qué API dinámica la fuerza (`headers()`, `cookies()`, `searchParams`) y anótalo; no la fuerces si es una calculadora que realmente necesita ser dinámica.
- `browserslist`: elimina `ie >= 11`; usa `defaults` (M11).
- Limpieza (B5, B6, B8): desinstala `gray-matter`; elimina `components/servicios/HeroReveal.tsx`; lista (no borres) los `public/logo_*.jpeg` sin referencia en el reporte.
- `next.config.js`: pon `eslint.ignoreDuringBuilds: false` y corrige lo que salga; si son >20 errores no-SEO, déjalo en `true` y reporta.

---

## FASE 6 — Verificación y reporte

### 6.1 `scripts/seo-check.mjs`
Script que arranca `next start` sobre el build, rastrea **todas** las rutas de `ROUTES` × {es, en} + posts + 4 sondas de slug inexistente, y comprueba:
- HTTP 200 en rutas del registro; **404** en las 4 sondas y en `/es/servicios/optimizacion-procesos/slug-inexistente-xyz`.
- `<title>` y `<meta description>` presentes, longitud 30–65 / 100–170, y **sin duplicados** en todo el set (falla si hay dos iguales).
- `<html lang>` igual al locale.
- Exactamente 1 `<h1>`.
- `canonical` = URL de la ruta; 3 `hreflang`.
- Al menos 1 bloque `ld+json` válido (JSON parseable) por ruta indexable; que contenga `BreadcrumbList`; y `FAQPage` en las rutas que tienen FAQs en `lib/content/faqs`.
- Sin `<meta name="keywords">`.
- Hero de `/es` y `/en` **no** contiene `>0<!-- -->+`.
- `sitemap.xml`: cada `<loc>` responde 200, ningún `noindex` incluido, `lastmod` no idénticos todos.
- `robots.txt` no contiene `/_next/`.
Salida: tabla en consola + exit code ≠ 0 si algo falla. Añádelo como `npm run seo:check`.

### 6.2 `docs/SEO-FIX-REPORT.md`
Al terminar todas las fases, escribe el reporte con:
1. Tabla hallazgo del audit → estado (corregido / parcial / no aplicado + motivo).
2. Antes/después: nº de titles únicos, nº de rutas con JSON-LD, nº de soft-404, rutas prerenderizadas, First Load JS de home y de una página de servicio (del output de `next build`).
3. Lista completa de `TODO_EDWIN` (cifras, dirección, LinkedIn, imagen OG del blog, slugs de Sanity que no existían, logos sin referencia).
4. Comandos exactos para verificar en producción tras el deploy (`curl -sI` de 5 redirects, `curl -s | grep ld+json` de una página de servicio).

No hagas merge a `main`. Deja la rama `seo/fix` lista para revisión.

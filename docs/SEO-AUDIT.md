# Auditoría SEO Técnica — grupoalternative.com

**Fecha:** 2026-09-02
**Commit auditado:** `76d7b5e` (branch `main`, working tree limpio)
**Alcance:** diagnóstico únicamente. No se incluyen recomendaciones ni cambios de código.

**Método:**
1. Lectura estática del repositorio.
2. `next build` en un directorio aislado (`NEXT_DIST_DIR=.next-seoaudit`) para obtener tamaños de bundle.
3. **`next start` + rastreo del HTML realmente servido** de las 57 rutas ES, para verificar `<title>`, `<meta description>`, `<link rel="canonical">`, `hreflang`, `<html lang>`, conteo de `<h1>`, JSON-LD y códigos de estado.

> El paso 3 fue decisivo: varias conclusiones que parecían obvias por lectura estática resultaron falsas al comprobar el HTML servido (ver §11, *Verificación en HTML servido*). Todo lo que aquí se afirma sobre el output está medido, no inferido.

El directorio de build temporal y el proceso del servidor fueron eliminados; el único cambio en el repositorio es este archivo.

---

## 1. STACK

### 1.1 Versiones y framework

| Ítem | Valor | Fuente |
|---|---|---|
| Next.js | `14.2.28` | `package.json:126` |
| React / ReactDOM | `18.2.0` | `package.json:134`, `package.json:139` |
| Router | **App Router** (`app/`). No existe directorio `pages/` | `app/` |
| TypeScript | `5.2.2`, `strict: true` | `package.json:31`, `tsconfig.json:8` |
| i18n | **next-intl** `^4.7.0` (plugin en next.config) | `package.json:128`, `next.config.js:1-2` |
| CMS blog | Sanity (`next-sanity ^12.0.14`, `sanity ^5.7.0`), opcional con fallback estático | `package.json:129`, `lib/blog.ts:131-134` |
| ORM | Prisma `6.7.0` (`build` corre `prisma generate`) | `package.json:5` |
| Hosting | Vercel (existe `vercel.json`; no hay `Dockerfile` ni adaptadores) | `vercel.json` |

### 1.2 `next.config.js`

```js
// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: process.env.NEXT_OUTPUT_MODE,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },   // ← optimización de imágenes DESACTIVADA
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
```

- **No hay bloque `redirects()`**. Todas las redirecciones viven en `vercel.json` (§5).
- **No hay bloque `headers()`** (sin `X-Robots-Tag`, sin `Cache-Control` propio).
- `images: { unoptimized: true }` (`next.config.js:15`): `next/image` no genera AVIF/WebP ni `srcset`; sirve el archivo original.
- `output` sale de `NEXT_OUTPUT_MODE`; si no está definida en Vercel queda `undefined` (modo servidor estándar).

### 1.3 Resolución de `[locale]`

```ts
// i18n.ts
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
```

```ts
// middleware.ts
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export function middleware(req: NextRequest) {
  // Sanity Studio: servir sin layout de locale
  if (req.nextUrl.pathname.startsWith('/studio')) {
    return NextResponse.next();
  }

  const response = intlMiddleware(req);

  // Pass the original pathname to layouts/pages so they can build correct canonical/hreflang URLs
  response.headers.set('x-pathname', req.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

- `localePrefix: 'always'` → toda URL pública lleva prefijo `/es` o `/en`; la raíz `/` redirige a `/es`.
- Los slugs son **idénticos en ambos idiomas** (`/en/servicios/...`, no `/en/services/...`); `vercel.json` redirige las variantes inglesas hacia los slugs españoles.
- El truco de `x-pathname` **sí funciona**: verificado en §11.2. Es la base del canonical por página.
- Efecto secundario: la cabecera `x-pathname` se filtra a la **respuesta pública** (visible en cada request: `x-pathname: /es/contacto`).

### 1.4 Árbol de rutas (`app/`)

Leyenda: **SC** = Server Component · **CC** = Client Component (`"use client"` en la primera línea).

```
app/
├── layout.tsx                                        SC   (root, metadata estática)
├── robots.ts                                         SC
├── sitemap.ts                                        SC
├── studio/[[...tool]]/page.tsx                       CC
├── api/
│   ├── contact/route.ts
│   ├── helpdesk/route.ts
│   ├── madurez-digital/route.ts
│   └── roi-calculator/route.ts
└── [locale]/
    ├── layout.tsx                                    SC   (generateMetadata + generateStaticParams)
    ├── opengraph-image.tsx                           SC   (ImageResponse 1200×630)
    ├── page.tsx                             (home)   CC
    ├── blog/page.tsx                                 SC
    ├── blog/[slug]/page.tsx                          SC   (generateMetadata + generateStaticParams + JSON-LD)
    ├── business-consultants/page.tsx                 CC
    ├── casos-exito/page.tsx                          CC
    ├── contacto/page.tsx                             CC
    ├── helpdesk-it/layout.tsx                        SC   (metadata estática, noindex)
    ├── helpdesk-it/page.tsx                          CC
    ├── industrias/page.tsx                           CC
    ├── industrias/[slug]/page.tsx                    CC
    ├── industrias/banca-servicios-financieros/page.tsx                          CC
    ├── industrias/banca-servicios-financieros/[subslug]/page.tsx                CC
    ├── industrias/banca-servicios-financieros/cumplimiento-regulatorio-sbp/     CC
    ├── industrias/banca-servicios-financieros/gestion-proyectos-bancarios/      CC
    ├── industrias/banca-servicios-financieros/iso-9001-sector-financiero/       CC
    ├── industrias/banca-servicios-financieros/transformacion-digital-bancaria/  CC
    ├── industrias/{energia-utilities, gobierno-sector-publico,
    │               manufactura-logistica, retail-comercio, salud-farmaceutica,
    │               servicios-profesionales, tecnologia-telecomunicaciones}/     CC (×7)
    ├── nosotros/layout.tsx                           SC   (metadata estática)
    ├── nosotros/page.tsx                             CC
    ├── nosotros/katherine-gonzalez/page.tsx          CC
    ├── recursos/page.tsx                             CC
    ├── recursos/[slug]/page.tsx                      CC
    ├── recursos/calculadoras/page.tsx                CC
    ├── recursos/calculadoras/madurez-digital/page.tsx            CC
    ├── recursos/calculadoras/roi-optimizacion-procesos/page.tsx  CC
    ├── servicios/page.tsx                            CC
    ├── servicios/consultoria-estrategica/page.tsx                CC
    │   ├── [slug]/page.tsx                           CC  (stub "Contenido en desarrollo")
    │   ├── diagnostico-organizacional/               CC
    │   ├── diseno-organizacional/                    CC
    │   └── planificacion-estrategica/                CC
    ├── servicios/desarrollo-tecnologia/page.tsx                  CC
    │   ├── [slug]/page.tsx                           CC  (stub)
    │   ├── aplicaciones-web-moviles/                 CC
    │   ├── consultoria-tecnologica/                  CC
    │   ├── desarrollo-software/                      CC
    │   └── integracion-sistemas/                     CC
    ├── servicios/gestion-proyectos/page.tsx                      CC
    │   ├── [slug]/page.tsx                           CC  (stub)
    │   ├── casos-negocio/                            CC
    │   ├── metodologias-agiles/                      CC
    │   ├── pmo-office/                               CC
    │   └── pmp-project-management/                   CC
    ├── servicios/optimizacion-procesos/page.tsx                  CC
    │   ├── [slug]/page.tsx                           CC  (stub)
    │   ├── automatizacion-procesos/                  CC
    │   ├── bpm-empresarial/                          CC
    │   ├── diseno-procesos/                          CC
    │   └── lean-six-sigma/                           CC
    ├── servicios/sistemas-calidad/page.tsx                       CC
    │   ├── [slug]/page.tsx                           CC  (stub)
    │   ├── auditoria-calidad/                        CC
    │   ├── certificacion-iso/                        CC
    │   ├── gestion-calidad/                          CC
    │   └── implementacion-iso-9001/                  CC
    ├── servicios/transformacion-digital/page.tsx                 CC
    │   ├── [slug]/page.tsx                           CC  (stub)
    │   ├── analisis-datos/                           CC
    │   ├── change-management/                        CC
    │   ├── digitalizacion-procesos/                  CC
    │   └── estrategia-digital/                       CC
    └── studio/[[...tool]]/page.tsx                   CC
```

**Conteo:** 66 `page.tsx` bajo `app/[locale]/` + 1 en `app/studio/`. De esos 67, **63 son Client Components**. Son Server Components únicamente: `app/[locale]/blog/page.tsx`, `app/[locale]/blog/[slug]/page.tsx`, los 3 `layout.tsx` y `opengraph-image.tsx`.

**Rutas duplicadas de Studio:** `app/studio/[[...tool]]/page.tsx` y `app/[locale]/studio/[[...tool]]/page.tsx` conviven. `middleware.ts:14-16` deja pasar `/studio` sin locale, pero `/es/studio` y `/en/studio` siguen siendo alcanzables. Verificado: los tres devuelven **200** con `<meta name="robots" content="index, follow">` (§11.5).

---

## 2. METADATA POR PÁGINA

### 2.1 `metadataBase`

Definido **dos veces**, con valores distintos:

```ts
// app/layout.tsx:5-11
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? SITE_URL),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};
```

```ts
// app/[locale]/layout.tsx:39-40  (dentro de generateMetadata)
return {
  metadataBase: new URL(SITE_URL),   // 'https://grupoalternative.com'
  ...
```

- `SITE_URL = 'https://grupoalternative.com'` (`lib/seo.ts:7`).
- El layout raíz depende de `NEXTAUTH_URL`, que es una variable de **autenticación**, no de sitio. Si en Vercel apunta a un preview (`*.vercel.app`) o a `localhost`, el `metadataBase` de la raíz queda mal. Queda mitigado dentro de `[locale]` porque el layout hijo lo sobrescribe, pero **no** para las rutas fuera de `[locale]` (`/studio`).
- `NEXTAUTH_URL` no aparece en `.env.example`; su valor real en producción no es determinable desde el repo (§10.2).

### 2.2 Fuente de metadata por página

Barrido sobre los 67 `page.tsx` y los 3 `layout.tsx`:

| Fuente de metadata | Archivos |
|---|---|
| `generateMetadata` | `app/[locale]/layout.tsx:16`, `app/[locale]/blog/[slug]/page.tsx:71` |
| `export const metadata` | `app/layout.tsx:5`, `app/[locale]/nosotros/layout.tsx:3`, `app/[locale]/helpdesk-it/layout.tsx:3` |
| **Ninguna (hereda del layout)** | **los 65 `page.tsx` restantes** |

**Ningún `page.tsx` del sitio exporta `metadata` ni `generateMetadata`, salvo `blog/[slug]/page.tsx`.** Consecuencia directa de que 63 de 67 páginas sean `"use client"`: un Client Component no puede exportar `metadata` en el App Router, y el patrón de `layout.tsx` acompañante solo se aplicó en 2 rutas (`nosotros`, `helpdesk-it`).

### 2.3 Fuente de title/description (layout `[locale]`)

```ts
// app/[locale]/layout.tsx:16-48
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;

  // Read the actual pathname set by middleware so canonical/hreflang are page-specific
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || `/${locale}`;

  const metadata = {
    es: {
      title: 'Consultoría Empresarial que Genera Resultados | Alternative',
      description: 'Consultoría en optimización de procesos, gestión de proyectos y sistemas de calidad. Equipo certificado PMP®, ISO 9001 Lead Auditor y Lean Six Sigma. Experiencia en LATAM y el Caribe.',
      keywords: 'consultoría empresarial, optimización de procesos, gestión de proyectos, sistemas de calidad, ISO 9001, consultoría BPM, transformación digital',
    },
    en: {
      title: 'Business Consulting that Delivers Results | Alternative',
      description: 'Consulting in process optimization, project management, and quality systems. Team certified in PMP®, ISO 9001 Lead Auditor, and Lean Six Sigma. Experience in LATAM and the Caribbean.',
      keywords: 'business consulting, process optimization, project management, quality systems, ISO 9001, BPM consulting, digital transformation',
    }
  };

  const meta = metadata[locale as keyof typeof metadata] || metadata.es;
  const alternates = buildAlternates(pathname);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: meta.title, template: `%s | Alternative` },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: 'Alternative' }],
    alternates,
    openGraph: { /* … images: [`${SITE_URL}/logo_24.webp`] … */ },
    twitter: { card: 'summary_large_image', /* … */ },
    robots: { index: true, follow: true },
    icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  };
}
```

### 2.4 Tabla ruta → metadata resultante *(valores medidos en el HTML servido)*

`ES-DEFAULT` = `Consultoría Empresarial que Genera Resultados | Alternative`
`EN-DEFAULT` = `Business Consulting that Delivers Results | Alternative`
`DESC-ES` / `DESC-EN` = las descriptions del bloque anterior.

| Ruta (es) | Fuente title | Title resultante | Fuente description | Description resultante | Canonical | `alternates.languages` |
|---|---|---|---|---|---|---|
| `/es` | layout `[locale]` (`title.default`) | `ES-DEFAULT` | layout `[locale]` | `DESC-ES` | `.../es` ✅ | es/en/x-default ✅ |
| `/es/servicios` | heredado | `ES-DEFAULT` | heredado | `DESC-ES` | `.../es/servicios` ✅ | ✅ |
| `/es/servicios/optimizacion-procesos` | heredado | `ES-DEFAULT` | heredado | `DESC-ES` | correcto ✅ | ✅ |
| `/es/servicios/optimizacion-procesos/bpm-empresarial` | heredado | `ES-DEFAULT` | heredado | `DESC-ES` | correcto ✅ | ✅ |
| `/es/servicios/**` (las 27 restantes) | heredado | `ES-DEFAULT` | heredado | `DESC-ES` | correcto ✅ | ✅ |
| `/es/industrias` + `/es/industrias/**` (12 rutas) | heredado | `ES-DEFAULT` | heredado | `DESC-ES` | correcto ✅ | ✅ |
| `/es/casos-exito` | heredado | `ES-DEFAULT` | heredado | `DESC-ES` | correcto ✅ | ✅ |
| `/es/contacto` | heredado | `ES-DEFAULT` | heredado | `DESC-ES` | correcto ✅ | ✅ |
| `/es/recursos` + `/es/recursos/**` (4 rutas) | heredado | `ES-DEFAULT` | heredado | `DESC-ES` | correcto ✅ | ✅ |
| `/es/blog` (índice) | heredado | `ES-DEFAULT` | heredado | `DESC-ES` | correcto ✅ | ✅ |
| `/es/business-consultants` | heredado | `ES-DEFAULT` | heredado | `DESC-ES` | correcto ✅ | ✅ |
| `/es/nosotros` | `nosotros/layout.tsx:4` + template | `Nosotros - Grupo Alternative \| Consultoría Empresarial Panamá \| Alternative` | `nosotros/layout.tsx:5-6` | `Más de 5 años transformando empresas en LATAM…` | correcto ✅ | ✅ |
| `/es/nosotros/katherine-gonzalez` | hereda de `nosotros/layout.tsx` | **idéntico a `/es/nosotros`** | ídem | **idéntica a `/es/nosotros`** | correcto ✅ | ✅ |
| `/es/helpdesk-it` | `helpdesk-it/layout.tsx:4` + template | `Helpdesk IT – Alternative \| Alternative` | `helpdesk-it/layout.tsx:5-6` | `Reporta incidencias, solicitudes de soporte…` | correcto ✅ | ✅ · **`robots: noindex`** ✅ |
| `/es/blog/[slug]` | `blog/[slug]/page.tsx:77` (`post.metaTitle`) + template | p. ej. `Qué es BPM: Guía Completa Business Process Management 2026 \| Alternative` | `post.metaDescription` | específica por post ✅ | **propio** (`page.tsx:80`) ✅ | propio ✅ |
| `/es/studio`, `/studio` | layout `[locale]` / raíz | `ES-DEFAULT` / sin título | heredada / ninguna | `DESC-ES` / ninguna | `.../es/studio` | heredado |

Las rutas `/en/**` son idénticas con `EN-DEFAULT` / `DESC-EN`, **salvo** `/en/nosotros`, `/en/nosotros/katherine-gonzalez` y `/en/helpdesk-it`, cuyos layouts tienen title y description **en español hardcodeados** (`nosotros/layout.tsx:3-12`, `helpdesk-it/layout.tsx:3-8`): no leen `params.locale`. Verificado: `/en/nosotros` sirve `<title>Nosotros - Grupo Alternative | Consultoría Empresarial Panamá | Alternative</title>`.

### 2.5 Canonical y hreflang — **funcionan correctamente**

```ts
// lib/seo.ts:13-35
export const SITE_URL = 'https://grupoalternative.com';

export function canonicalUrl(pathname: string): string {
  const clean = pathname === '/' ? '' : pathname.replace(/\/+$/, '');
  return `${SITE_URL}${clean}`;
}

export function buildAlternates(pathname: string) {
  const withoutLocale = pathname.replace(/^\/(es|en)/, '') || '';
  return {
    canonical: canonicalUrl(pathname),
    languages: {
      es: canonicalUrl(`/es${withoutLocale}`),
      en: canonicalUrl(`/en${withoutLocale}`),
      'x-default': canonicalUrl(`/es${withoutLocale}`),
    },
  };
}
```

La cadena `middleware` → `x-pathname` → `headers()` → `buildAlternates()` **opera como se pretendía**. Comprobado en las 57 rutas ES rastreadas: **todas** emiten un canonical propio y correcto, y los tres `hreflang` apuntan a la URL equivalente. Ejemplos medidos:

```html
<!-- HTML servido de /es/servicios/optimizacion-procesos/bpm-empresarial -->
<link rel="canonical" href="https://grupoalternative.com/es/servicios/optimizacion-procesos/bpm-empresarial"/>
<link rel="alternate" hrefLang="es" href="https://grupoalternative.com/es/servicios/optimizacion-procesos/bpm-empresarial"/>
<link rel="alternate" hrefLang="en" href="https://grupoalternative.com/en/servicios/optimizacion-procesos/bpm-empresarial"/>
<link rel="alternate" hrefLang="x-default" href="https://grupoalternative.com/es/servicios/optimizacion-procesos/bpm-empresarial"/>
```

**Este apartado no es un hallazgo negativo.** Es la parte de la implementación SEO que sí está correcta, y corresponde al arreglo del commit `76d7b5e`.

**El único problema detectado en hreflang es una contradicción entre capas.** `next-intl` emite además una cabecera HTTP `Link:` propia con un `x-default` distinto del que va en el HTML:

```http
# Cabeceras de respuesta de /es/servicios
link: <https://grupoalternative.com/es/servicios>; rel="alternate"; hreflang="es",
      <https://grupoalternative.com/en/servicios>; rel="alternate"; hreflang="en",
      <https://grupoalternative.com/servicios>;    rel="alternate"; hreflang="x-default"
x-pathname: /es/servicios
```

`x-default` = `/servicios` (sin prefijo de locale) en la cabecera HTTP, frente a `/es/servicios` en el HTML. `/servicios` sin prefijo es una URL que **siempre redirige** (`vercel.json` + `next-intl`), por lo que es un destino inválido para `x-default`. Dos señales contradictorias sobre el mismo recurso.

### 2.6 Renderizado: nada se prerenderiza

El `next build` etiqueta las rutas como `●` (SSG) porque `generateStaticParams` existe, pero **no se escribe ningún HTML a disco**:

- `find .next-seoaudit -name "*.html"` → solo 3 archivos: `_not-found.html`, `pages/404.html`, `pages/500.html`. Ninguna ruta de `[locale]`.
- `prerender-manifest.json` → `routes` contiene únicamente `/robots.txt` y `/sitemap.xml`.
- Toda respuesta de página lleva `Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate`.

Es decir: **las 119 rutas se renderizan en el servidor en cada petición y son incacheables en CDN.** Dos causas concurrentes:
1. `headers()` dentro del `generateMetadata` del layout `[locale]` (`app/[locale]/layout.tsx:20`) fuerza render dinámico en toda la subestructura.
2. El middleware de `next-intl` fija la cookie `NEXT_LOCALE` (`set-cookie: NEXT_LOCALE=es; Path=/; SameSite=lax`), lo que marca la respuesta como privada.

`generateStaticParams` en `app/[locale]/layout.tsx:108-110` y en `blog/[slug]/page.tsx:116-120` no produce HTML estático.

### 2.7 Títulos y descriptions DUPLICADOS — **el hallazgo principal**

**Confirmado sobre el HTML servido.** `/es` y `/es/contacto` devuelven exactamente el mismo `<title>` y la misma `<meta name="description">`. Y no es un caso aislado:

De las **57 rutas ES rastreadas**:

| Title / description | Nº de rutas |
|---|---:|
| `ES-DEFAULT` + `DESC-ES` (idénticos) | **53** |
| `Nosotros - Grupo Alternative \| … \| Alternative` (compartido por 2 URLs) | 2 |
| `Helpdesk IT – Alternative \| Alternative` (noindex) | 1 |
| Título propio de post de blog | 1 (+1 post más no rastreado en el barrido) |

**53 de 57 URLs en español comparten un único par title/description.** Sumando `/en`, el sitio publica ~110 URLs indexables con 2 títulos distintos en total.

Duplicación adicional:
- `/es/nosotros` y `/es/nosotros/katherine-gonzalez` comparten title y description (la sub-página hereda del `layout.tsx` de `nosotros`).
- `/en/nosotros` sirve el mismo title y description **en español** que `/es/nosotros`.

### 2.8 Meta `keywords`

Sí existe, en un único punto:

```ts
// app/[locale]/layout.tsx:27  (es)
keywords: 'consultoría empresarial, optimización de procesos, gestión de proyectos, sistemas de calidad, ISO 9001, consultoría BPM, transformación digital',
// app/[locale]/layout.tsx:32  (en)
keywords: 'business consulting, process optimization, project management, quality systems, ISO 9001, BPM consulting, digital transformation',
```

Verificado en el HTML: se emite `<meta name="keywords" content="…">` **con el mismo valor en las 57 rutas**, incluidas las páginas de servicio, industria y blog.

Los posts del blog tienen `keywords[]` en su modelo de datos (`lib/blog.ts:53`; valores en `lib/blog.ts:93` y `lib/blog.ts:127`), pero **`generateMetadata` del post no los usa** (`blog/[slug]/page.tsx:82-113`).

### 2.9 Open Graph / Twitter — qué se emite realmente

Medido en el HTML servido, no inferido del código:

**Páginas normales** (`/es`, `/es/contacto`, `/es/servicios/**`, …):

```html
<meta property="og:image" content="https://grupoalternative.com/es/opengraph-image?8988eb28b3295276"/>
<meta property="og:image:type" content="image/png"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:image:alt" content="Alternative - Consultoría Empresarial"/>
<meta name="twitter:image" content="https://grupoalternative.com/logo_24.webp"/>
```

- **`og:image` lo gana `app/[locale]/opengraph-image.tsx`**, no el `logo_24.webp` declarado en el layout: la convención de archivo tiene precedencia sobre `openGraph.images`. Formato correcto (PNG 1200×630).
- **`twitter:image` sí usa `logo_24.webp` crudo** (`app/[locale]/layout.tsx:69`), que es un archivo de **3310 × 1990 px y 502 KB** — ni 1.91:1 ni un peso razonable para una tarjeta social.
- El `og:image` generado incrusta ese mismo `logo_24.webp` de 502 KB dentro del canvas (`app/[locale]/opengraph-image.tsx:24-32`), descargándolo por HTTP en cada generación.
- `public/og-image.png` (**1200 × 630, 17 KB**, formato correcto) **no está referenciado en ninguna parte** (`grep -rn "og-image"` sobre `app/`, `components/`, `lib/` → 0 resultados).

**Posts de blog:**

```html
<meta property="og:image" content="https://grupoalternative.com/images/consulting-session.webp"/>
<meta property="og:image:alt" content="Diagrama de flujo de proceso optimizado - BPM"/>
<meta property="og:type" content="article"/>
```

- Aquí el metadata define `openGraph` completo, así que la convención de archivo no se aplica.
- `consulting-session.webp` es **1066 × 1600 px — vertical**, relación 0.67:1. Se recortará mal en todas las plataformas.
- Si el post viene de Sanity, `heroImage` ya es una URL absoluta del CDN (`lib/sanity-blog.ts:102`), y `${SITE_URL}${post.heroImage}` (`blog/[slug]/page.tsx:100`) produce `https://grupoalternative.com/https://cdn.sanity.io/...`. Mismo bug en el `image` del JSON-LD (`blog/[slug]/page.tsx:30`).

### 2.10 `<html lang>` incorrecto en `/en`

```tsx
// app/layout.tsx:19
<html lang="es" suppressHydrationWarning>
```

```tsx
// components/layout/set-html-lang.tsx
'use client';
import { useEffect } from 'react';

export function SetHtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);
  return null;
}
```

**Verificado:** el HTML servido de `/en/nosotros` y `/en/servicios/optimizacion-procesos/bpm-empresarial` empieza por `<html lang="es">`. La corrección solo ocurre tras la hidratación en cliente. Cualquier rastreador que lea el HTML inicial ve toda la sección inglesa declarada como español.

---

## 3. SITEMAP Y ROBOTS

### 3.1 Archivos

- `app/sitemap.ts` — **sí** (`/sitemap.xml`).
- `app/robots.ts` — **sí** (`/robots.txt`).
- `public/` — **no** hay `sitemap.xml` ni `robots.txt` estáticos. El único archivo suelto relevante es `public/googlec6c6f503bd291312.html` (verificación de Search Console).

Ambos son las **únicas dos rutas realmente estáticas** del proyecto (`○` en el build; los únicos registros de `prerender-manifest.json`).

### 3.2 `app/robots.ts`

```ts
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: 'https://grupoalternative.com/sitemap.xml',
  };
}
```

Salida verificada:

```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

Sitemap: https://grupoalternative.com/sitemap.xml
```

- **Bloquea `/_next/`**, es decir el JS y el CSS del sitio. En un sitio donde 63 de 67 páginas son Client Components, esto impide a Googlebot renderizar la capa cliente.
- Bloquea `/admin/`, ruta que **no existe** en el repo.
- **No bloquea `/studio`** ni `/es/studio` / `/en/studio`, que sí existen y devuelven 200 con `robots: index, follow`.

### 3.3 `app/sitemap.ts`

```ts
// app/sitemap.ts
function bilingualEntry(
  path: string,
  opts: { changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }
): MetadataRoute.Sitemap {
  const langs = {
    es: `${SITE_URL}/es${path}`,
    en: `${SITE_URL}/en${path}`,
    'x-default': `${SITE_URL}/es${path}`,
  };
  return [
    { url: `${SITE_URL}/es${path}`, lastModified: new Date(), ...opts, alternates: { languages: langs } },
    { url: `${SITE_URL}/en${path}`, lastModified: new Date(), ...opts, alternates: { languages: langs } },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  routes.push(...bilingualEntry('', { changeFrequency: 'weekly', priority: 1 }));

  const mainPages = ['servicios', 'industrias', 'casos-exito', 'nosotros', 'blog', 'contacto', 'recursos'];
  mainPages.forEach((page) => {
    routes.push(...bilingualEntry(`/${page}`, { changeFrequency: 'weekly', priority: 0.9 }));
  });

  const servicios = ['optimizacion-procesos', 'sistemas-calidad', 'gestion-proyectos',
                     'transformacion-digital', 'consultoria-estrategica', 'desarrollo-tecnologia'];
  // ...
  const subServicios: Record<string, string[]> = {
    'optimizacion-procesos': ['bpm-empresarial', 'lean-six-sigma', 'diseno-procesos', 'automatizacion-procesos'],
    'sistemas-calidad': ['implementacion-iso-9001', 'auditoria-calidad', 'certificacion-iso', 'gestion-calidad'],
    'gestion-proyectos': ['pmp-project-management', 'metodologias-agiles', 'pmo-office', 'casos-negocio'],
    'transformacion-digital': ['estrategia-digital', 'change-management', 'digitalizacion-procesos', 'analisis-datos'],
    'consultoria-estrategica': ['diagnostico-organizacional', 'diseno-organizacional', 'planificacion-estrategica'],
    'desarrollo-tecnologia': ['aplicaciones-web-moviles', 'consultoria-tecnologica', 'desarrollo-software', 'integracion-sistemas'],
  };
  // ...
  const industrias = ['banca-servicios-financieros', 'manufactura-logistica', 'retail-comercio',
                      'tecnologia-telecomunicaciones', 'servicios-profesionales',
                      'gobierno-sector-publico', 'salud-farmaceutica', 'energia-utilities'];
  // ...
  const calculators = ['calculadoras', 'calculadoras/roi-optimizacion-procesos', 'calculadoras/madurez-digital'];
  // ...

  // ── Blog posts (from Sanity or static) ──
  const blogSlugs = await getAllSlugsAsync();
  blogSlugs.forEach((slug) => {
    routes.push(...bilingualEntry(`/blog/${slug}`, { changeFrequency: 'monthly', priority: 0.8 }));
  });

  return routes;
}
```

**¿Dinámico o hardcodeado?** Híbrido:
- **Blog: dinámico.** `getAllSlugsAsync()` (`app/sitemap.ts:90`) consulta Sanity si están definidas `NEXT_PUBLIC_SANITY_PROJECT_ID` y `NEXT_PUBLIC_SANITY_DATASET`, y si no cae al array estático `BLOG_POSTS` (`lib/blog.ts:186-199`).
- **Todo lo demás: listas hardcodeadas** en el propio `sitemap.ts` (líneas 31, 37-44, 50-57, 65-74, 80-84). No se derivan del árbol de `app/`, hay que sincronizarlas a mano.

**Salida verificada: 100 URLs.**

```xml
<!-- /sitemap.xml (fragmento real) -->
<url>
<loc>https://grupoalternative.com/es</loc>
<xhtml:link rel="alternate" hreflang="es" href="https://grupoalternative.com/es" />
<xhtml:link rel="alternate" hreflang="en" href="https://grupoalternative.com/en" />
<xhtml:link rel="alternate" hreflang="x-default" href="https://grupoalternative.com/es" />
<lastmod>2026-09-02T21:12:52.555Z</lastmod>
<changefreq>weekly</changefreq>
<priority>1</priority>
</url>
```

**`lastmod`: NO es real.** `lastModified: new Date()` (`app/sitemap.ts:19-20`). Verificado: **las 100 URLs comparten un único `lastmod`, idéntico al milisegundo** (`2026-09-02T21:12:52.555Z` = instante del build). Como el sitemap es la única ruta estática, ese valor queda **congelado hasta el siguiente despliegue**, y entonces las 100 URLs cambian de `lastmod` a la vez aunque no se haya tocado su contenido. Ni siquiera los posts usan `post.publishedAt` / `post.updatedAt`, que sí existen en el modelo (`lib/blog.ts:49-50`).

### 3.4 Cobertura del sitemap frente a las rutas reales

Páginas reales **ausentes** del sitemap:

| Ruta | Nota |
|---|---|
| `/nosotros/katherine-gonzalez` | página real, no listada |
| `/industrias/banca-servicios-financieros/cumplimiento-regulatorio-sbp` | página real, no listada |
| `/industrias/banca-servicios-financieros/gestion-proyectos-bancarios` | página real, no listada |
| `/industrias/banca-servicios-financieros/iso-9001-sector-financiero` | página real, no listada |
| `/industrias/banca-servicios-financieros/transformacion-digital-bancaria` | página real, no listada |
| `/business-consultants` | página real, no listada (probablemente intencional: es legado) |
| `/helpdesk-it` | correctamente ausente (`noindex`) |
| `/studio` | correctamente ausente del sitemap, pero **indexable** (§3.2) |

URLs listadas que **no** tienen contenido real: `/casos-exito` (placeholder "Contenido en desarrollo…", `app/[locale]/casos-exito/page.tsx:28`, `priority: 0.9`) y las 3 rutas de `/recursos/calculadoras*` cuyo copy indexable son 9-18 palabras.

El sitemap publica además las 50 URLs `/en/**` con la misma prioridad que las `/es`.

---

## 4. DATOS ESTRUCTURADOS (JSON-LD)

Barrido completo: `grep -rn "application/ld+json"` sobre `app/`, `components/`, `lib/` → **1 sola ocurrencia**. Confirmado midiendo el HTML servido: **0 bloques `application/ld+json` en las 55 rutas no-blog**; solo los posts lo llevan.

| Schema | Archivo | Rutas donde se renderiza |
|---|---|---|
| `Article` (con `Person` como `author`, `Organization` como `publisher`, `ImageObject` como logo, `WebPage` como `mainEntityOfPage`) | `app/[locale]/blog/[slug]/page.tsx:12-51` | `/es/blog/[slug]` y `/en/blog/[slug]` — hoy 2 posts × 2 locales = 4 URLs |

```tsx
// app/[locale]/blog/[slug]/page.tsx:25-50
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  image: post.heroImage ? `${baseUrl}${post.heroImage}` : undefined,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt ?? post.publishedAt,
  author: {
    '@type': 'Person',
    name: locale === 'en' ? post.author.nameEn : post.author.name,
    url: post.author.link ? `${baseUrl}${post.author.link}` : undefined,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Grupo Alternative',
    logo: { '@type': 'ImageObject', url: `${baseUrl}/logo_alternative_horizontal.webp` },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': url },
};
return (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
);
```

**Explícitamente: NO existe ningún otro dato estructurado en el repositorio.**

- ❌ `Organization` — no existe como nodo propio del sitio; solo anidado como `publisher` dentro de `Article`.
- ❌ `LocalBusiness` / `ProfessionalService` — no existe, pese a que el footer contiene NAP completo: `Panamá, Ciudad de Panamá`, `+507 6990-8906`, `info@grupoalternative.com`, horario `Lun-Sáb: 08:00 a.m. - 05:00 p.m.` (`components/layout/footer.tsx:150-173`).
- ❌ `Service` — no existe en ninguna de las 33 páginas de servicio.
- ❌ `FAQPage` — no existe, pese a que 30 páginas renderizan bloques de FAQ reales, con las respuestas presentes en el HTML (§7.3).
- ❌ `BreadcrumbList` — no existe. Hay breadcrumbs **visuales** en 11+ páginas (`app/[locale]/recursos/[slug]/page.tsx:26-30`, `app/[locale]/contacto/page.tsx`, todas las de `industrias/`), sin marcado.
- ❌ `BlogPosting` — se usa `Article` genérico.
- ❌ `Person` para `nosotros/katherine-gonzalez` — sin marcado.
- ❌ `WebSite` + `SearchAction`, `AggregateRating`, `Review` — no existen.

Defectos del único JSON-LD presente:
- `image: ${baseUrl}${post.heroImage}` se rompe para posts de Sanity (URL absoluta concatenada; §2.9).
- No incluye `inLanguage`, `wordCount` ni `articleSection`.
- `dateModified` cae siempre en `publishedAt` porque ningún post estático define `updatedAt`.

---

## 5. REDIRECCIONES

### 5.1 Dónde viven

| Mecanismo | Estado |
|---|---|
| `redirects()` en `next.config.js` | **No existe** |
| `middleware.ts` / `proxy.ts` | Existe `middleware.ts`, pero **no hace redirecciones propias**; delega en `next-intl` (`localePrefix: 'always'` → `/` ⇒ `/es`) y añade `x-pathname`. No hay `proxy.ts`. |
| `vercel.json` | **Sí** — 46 reglas, todas `"permanent": true` (308) |

```jsonc
// vercel.json
{
  "redirects": [
    { "source": "/inicio",                                          "destination": "/es",                                                     "permanent": true },
    { "source": "/service/consultoria-de-procesos",                 "destination": "/es/servicios/optimizacion-procesos",                     "permanent": true },
    { "source": "/service/consultoria-de-proyectos",                "destination": "/es/servicios/gestion-proyectos",                         "permanent": true },
    { "source": "/service/consultoria-de-calidad",                  "destination": "/es/servicios/sistemas-calidad",                          "permanent": true },
    { "source": "/service/consultoria-de-tecnologia-informacion",   "destination": "/es/servicios/transformacion-digital",                    "permanent": true },
    { "source": "/service/desarrollo-software",                     "destination": "/es/servicios/desarrollo-tecnologia/aplicaciones-medida", "permanent": true },
    { "source": "/consultoria-de-gestion-de-proyectos-pmi-panama",  "destination": "/es/servicios/gestion-proyectos/pmp-project-management",  "permanent": true },
    { "source": "/consultores-de-empresas",                         "destination": "/es/nosotros",                                            "permanent": true },
    { "source": "/contact",                                         "destination": "/es/contacto",                                            "permanent": true },
    { "source": "/servicios",                                       "destination": "/es/servicios",                                           "permanent": true },
    { "source": "/proyectos-exitosos",                              "destination": "/es/casos-exito",                                         "permanent": true },
    { "source": "/blog-grupo-alternative",                          "destination": "/es/blog",                                                "permanent": true },
    { "source": "/profile",                                         "destination": "/es/nosotros",                                            "permanent": true },
    { "source": "/profilekg",                                       "destination": "/es/nosotros",                                            "permanent": true },
    { "source": "/ia-en-gestion-de-proyectos",                      "destination": "/es/blog/ia-gestion-proyectos",                           "permanent": true },
    { "source": "/diagramas-de-flujo-de-proces-llave-maestra-la-eficiencia-laboral",
                                                                    "destination": "/es/blog/diagramas-flujo-procesos",                       "permanent": true },
    { "source": "/la-columna-vertebral-del-exito-empresarial",      "destination": "/es/blog/columna-vertebral-exito",                        "permanent": true },
    { "source": "/codigo-impecable-la-importancia-de-la-calidad-en-el-desarrollo-de-software-empresarial",
                                                                    "destination": "/es/blog/calidad-desarrollo-software",                    "permanent": true },
    { "source": "/services/it-consulting",                          "destination": "/en/servicios/transformacion-digital",                    "permanent": true },
    { "source": "/services/process-consulting",                     "destination": "/en/servicios/optimizacion-procesos",                     "permanent": true },
    { "source": "/services/project-consulting",                     "destination": "/en/servicios/gestion-proyectos",                         "permanent": true },
    { "source": "/services/quality-consulting",                     "destination": "/en/servicios/sistemas-calidad",                          "permanent": true },
    { "source": "/services/software-development",                   "destination": "/en/servicios/desarrollo-tecnologia/aplicaciones-medida", "permanent": true },
    { "source": "/industrias",                                      "destination": "/es/industrias",                                          "permanent": true },
    { "source": "/industrias/:path*",                               "destination": "/es/industrias/:path*",                                   "permanent": true },
    { "source": "/nosotros",                                        "destination": "/es/nosotros",                                            "permanent": true },
    { "source": "/recursos",                                        "destination": "/es/recursos",                                            "permanent": true },
    { "source": "/recursos/:path*",                                 "destination": "/es/recursos/:path*",                                     "permanent": true },
    { "source": "/casos-exito",                                     "destination": "/es/casos-exito",                                         "permanent": true },
    { "source": "/blog",                                            "destination": "/es/blog",                                                "permanent": true },
    { "source": "/blog/:path*",                                     "destination": "/es/blog/:path*",                                         "permanent": true },
    { "source": "/navegando-el-futuro-de-la-transformacion",        "destination": "/es/blog/navegando-el-futuro-de-la-transformacion",       "permanent": true },
    { "source": "/navegando-el-futuro-de-la-transformacion/",       "destination": "/es/blog/navegando-el-futuro-de-la-transformacion",       "permanent": true },
    { "source": "/contacto",                                        "destination": "/es/contacto",                                            "permanent": true },
    { "source": "/success-stories",                                 "destination": "/en/casos-exito",                                         "permanent": true },
    { "source": "/team-profile",                                    "destination": "/es/nosotros",                                            "permanent": true },
    { "source": "/business-consultants",                            "destination": "/en/nosotros",                                            "permanent": true },
    { "source": "/en/services",                                     "destination": "/en/servicios",                                           "permanent": true },
    { "source": "/en/services/:path*",                              "destination": "/en/servicios/:path*",                                    "permanent": true },
    { "source": "/en/industries",                                   "destination": "/en/industrias",                                          "permanent": true },
    { "source": "/en/industries/:path*",                            "destination": "/en/industrias/:path*",                                   "permanent": true },
    { "source": "/en/about",                                        "destination": "/en/nosotros",                                            "permanent": true },
    { "source": "/en/success-stories",                              "destination": "/en/casos-exito",                                         "permanent": true },
    { "source": "/en/contact",                                      "destination": "/en/contacto",                                            "permanent": true },
    { "source": "/en/resources",                                    "destination": "/en/recursos",                                            "permanent": true },
    { "source": "/en/resources/:path*",                             "destination": "/en/recursos/:path*",                                     "permanent": true }
  ]
}
```

### 5.2 Verificación de las URLs de WordPress solicitadas

| URL antigua | ¿Regla? | Destino | ¿El destino existe? |
|---|---|---|---|
| `/service/*` | **Parcial** — 5 reglas literales, **sin comodín `/service/:path*`** | ver tabla | 4 de 5 sí. `/es/servicios/desarrollo-tecnologia/aplicaciones-medida` **NO existe** (la ruta real es `aplicaciones-web-moviles`) → cae en el `[slug]` stub, **HTTP 200 verificado** |
| `/project/*` | ❌ **No existe ninguna regla** | — | 404 |
| `/consultores-de-empresas` | ✅ Sí (`vercel.json:37-41`) | `/es/nosotros` | ✅ Sí |
| `/blog-grupo-alternative` | ✅ Sí (`vercel.json:57-61`) | `/es/blog` | ✅ Sí |
| `/beneficios-de-la-consultoria-en-ti` | ❌ **No existe ninguna regla** | — | 404 |
| `/ia-en-gestion-de-proyectos` | ✅ Sí (`vercel.json:72-76`) | `/es/blog/ia-gestion-proyectos` | ❌ **El slug NO existe — HTTP 404 verificado** |

### 5.3 Redirecciones 308 que terminan en error

Slugs de blog disponibles en el fallback estático (`lib/blog.ts:62`, `lib/blog.ts:96`):

```
que-es-bpm-business-process-management-guia-completa
caso-exito-banco-regional-40-menos-tiempos-bpm
```

| Regla en `vercel.json` | Destino | Resultado verificado |
|---|---|---|
| `/ia-en-gestion-de-proyectos` | `/es/blog/ia-gestion-proyectos` | **404** |
| `/diagramas-de-flujo-de-proces-llave-maestra-la-eficiencia-laboral` | `/es/blog/diagramas-flujo-procesos` | 404 (mismo patrón) |
| `/la-columna-vertebral-del-exito-empresarial` | `/es/blog/columna-vertebral-exito` | 404 |
| `/codigo-impecable-…-software-empresarial` | `/es/blog/calidad-desarrollo-software` | 404 |
| `/navegando-el-futuro-de-la-transformacion` (×2 reglas) | `/es/blog/navegando-el-futuro-de-la-transformacion` | 404 |
| `/service/desarrollo-software` | `/es/servicios/desarrollo-tecnologia/aplicaciones-medida` | **200 soft-404** (stub "Contenido en desarrollo…") |
| `/services/software-development` | `/en/servicios/desarrollo-tecnologia/aplicaciones-medida` | 200 soft-404 |

*(Las 6 primeras filas dejarían de ser un problema si Sanity contiene esos posts; no verificable desde el repo — §10.2.)*

### 5.4 Otras observaciones

- `/business-consultants` → `/en/nosotros`, **pero la página existe** y es alcanzable en `/es/business-consultants` y `/en/business-consultants` (**200 verificado en ambas**). El redirect solo cubre la ruta sin prefijo de locale. Contenido que duplica `/nosotros`, con canonical propio y sin `noindex`.
- Las reglas de `vercel.json` se ejecutan antes del middleware, así que `/blog/:path*` → `/es/blog/:path*` funciona. Pero `next-intl` ya redirige cualquier ruta sin prefijo a `/es/...`, por lo que buena parte de esas reglas son redundantes: dos capas haciendo lo mismo.
- No hay redirección `www` → apex ni `http` → `https` en el repo (normalmente lo resuelve Vercel a nivel de dominio; no verificable aquí).
- No hay reglas para barra final (`/es/servicios/` vs `/es/servicios`).

---

## 6. CONTADORES DEL HERO (por qué el HTML servido muestra "0+" y "0%")

### 6.1 Dónde están

```tsx
// app/[locale]/page.tsx:439-455
{[
  { number: 500, suffix: '+', label: 'Proyectos Completados' },
  { number: 98,  suffix: '%', label: 'Satisfacción del Cliente' },
  { number: 15,  suffix: '+', label: 'Años de Experiencia' }
].map((stat, i) => (
  <div key={i}>
    <div className="text-3xl font-bold text-turquesa mb-1">
      <Counter end={stat.number} suffix={stat.suffix} />
    </div>
    <div className="text-sm text-white/60">
      {stat.label}
    </div>
  </div>
))}
```

### 6.2 El componente `Counter`

```tsx
// components/ui/counter.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export function Counter({ end, suffix = '', prefix = '', duration = 2000, className = '' }: CounterProps) {
  const [count, setCount] = useState(0);          // ← (1) estado inicial = 0
  const countRef = useRef(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {                                // ← (2) no se ejecuta en el servidor
    if (inView) {                                  // ← (3) y solo cuando entra en viewport
      const startTime = Date?.now?.();
      const timer = setInterval(() => {
        const elapsed = (Date?.now?.() ?? 0) - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        countRef.current = Math.floor(easeOut * end);
        setCount(countRef.current);

        if (progress >= 1) {
          clearInterval(timer);
          setCount(end);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}                      // ← (4) renderiza `count`, no `end`
    </span>
  );
}
```

### 6.3 Explicación — **respuesta: sí, el valor inicial del estado es 0 y se anima en cliente**

Secuencia exacta:

1. `useState(0)` (`components/ui/counter.tsx:15`) — durante el render en servidor (los Client Components del App Router **sí** se renderizan a HTML en el servidor), `count` vale `0`.
2. El JSX emitido es `{prefix}{count}{suffix}`, es decir `0` + `+`.
3. `useEffect` **no corre en el servidor**; y en cliente no arranca hasta que `useInView` reporta `inView === true` con `threshold: 0.5`.
4. Por tanto el HTML entregado a Googlebot, a las tarjetas sociales y a cualquier cliente sin JS contiene `0+`, `0%`, `0+`.

**Verificado en el HTML servido de `/es`:**

```html
<!-- fragmento literal del HTML de https://…/es -->
">0<!-- -->+</span></div><div class="text-sm text-white/60">Proyectos Completados</div>
">0<!-- -->%</span></div><div class="text-sm text-white/60">Satisfacción del Cliente</div>
```

El `<!-- -->` es el separador de nodos de texto de React, y confirma que el `0` es el valor del estado, no una cadena estática.

El mismo patrón afecta a `app/[locale]/business-consultants/page.tsx:183` ("Años de Experiencia").

### 6.4 Inconsistencia de cifras (adicional)

Las cifras y etiquetas están **hardcodeadas en español** dentro de un Client Component multilingüe (`app/[locale]/page.tsx:441-443`: las etiquetas no pasan por `next-intl`, se muestran en español también en `/en`), y **contradicen los textos traducidos**:

```json
// messages/es.json → hero.stats
"stats": {
  "projects": "50+ proyectos exitosos",
  "costReduction": "35% reducción de costos promedio"
}
```

`50+` en los mensajes frente a `500+` en el hero. Además `nosotros/layout.tsx:6` dice "Más de 5 años" mientras el hero dice "15+ Años de Experiencia" y `lib/blog.ts:86` dice "Llevo 15 años".

### 6.5 `HeroReveal` — código muerto

`components/servicios/HeroReveal.tsx` (33 KB) **no está importado en ninguna parte** (`grep -rn "HeroReveal"` → solo su propia definición). Corresponde al hero revertido en el commit `9017443`. Ahí las mismas estadísticas sí son strings estáticos:

```tsx
// components/servicios/HeroReveal.tsx:352-356  (componente NO usado)
{[
  { n: '500+', l: 'Proyectos Completados' },
  { n: '98%',  l: 'Satisfacción del Cliente' },
  { n: '15+',  l: 'Años de Experiencia' },
].map((s, i) => (
```

Incluye además un `<link rel="stylesheet">` a Google Fonts dentro del `return` (`HeroReveal.tsx:171-176`) — ver §9.2.

---

## 7. CONTENIDO DE SERVICIOS

### 7.1 De dónde salen los textos

**No hay capa de datos.** Ni JSON, ni MDX, ni TS de contenido, ni CMS. **Todo el copy está hardcodeado en el JSX de cada `page.tsx`**, mediante ternarios `isEs ? '…' : '…'` sobre `useLocale()`.

Patrón típico, idéntico en las 33 páginas de servicio:

```tsx
// app/[locale]/servicios/optimizacion-procesos/bpm-empresarial/page.tsx:362-370
const faqs = [
  {
    question: isEs ? '¿Cómo determinan el alcance de implementación de BPM?' : 'How do you determine the scope of BPM implementation?',
    answer: isEs
      ? 'Evaluamos: cantidad de procesos a gestionar, madurez actual, necesidad de herramientas BPMS, complejidad organizacional (geografías, unidades). Diagnóstico BPM gratuito desarrolla roadmap y propuesta específica.'
      : 'We evaluate: number of processes to manage, current maturity, need for BPMS tools, organizational complexity (geographies, units). Free BPM diagnosis develops roadmap and specific proposal.'
  },
  // ... 5 más
];
```

Contraste: la **home**, el **header** y el **footer** sí usan `next-intl` (`messages/es.json`, `messages/en.json`, 32 KB y 31 KB), mientras que **ninguna** página de servicio o industria lo usa. Son dos sistemas de contenido conviviendo.

Estructuras de datos locales, todas dentro del propio archivo de página:
- `faqs: { question, answer }[]` — en cada página de servicio.
- `subServiceData: Record<string, { title, titleEn }>` — en cada `[slug]/page.tsx` (`servicios/optimizacion-procesos/[slug]/page.tsx:7-12`).
- `industryData: Record<string, { title, titleEn, icon, hasSubPages?, subPages? }>` — `app/[locale]/industrias/[slug]/page.tsx:8-32`.
- `resourceData: Record<string, { title, titleEn, icon }>` — `app/[locale]/recursos/[slug]/page.tsx:9-15`.

### 7.2 Tabla de páginas de servicio

Conteo de palabras: aproximado, extrayendo literales de cadena del JSX (excluyendo `className`, rutas e identificadores) y contando el lado español. `H1` y `H2` son **medidos sobre el HTML servido**.

| Ruta de servicio | Palabras ES (aprox.) | ¿H1 único? | H2 | ¿FAQ? | ¿Enlaza a casos de éxito / blog? |
|---|---:|---|---:|---|---|
| `/servicios` | ~200 | ✅ 1 | 2 | ❌ | ❌ / ❌ |
| `/servicios/optimizacion-procesos` | ~1.055 | ✅ 1 | 6 | ✅ | ✅ casos-exito / ❌ |
| `/servicios/optimizacion-procesos/bpm-empresarial` | ~1.645 | ✅ 1 | 7 | ✅ (6) | ❌ / ❌ |
| `/servicios/optimizacion-procesos/lean-six-sigma` | ~1.391 | ✅ 1 | 8 | ✅ | ❌ / ❌ |
| `/servicios/optimizacion-procesos/diseno-procesos` | ~1.538 | ✅ 1 | 8 | ✅ | ❌ / ❌ |
| `/servicios/optimizacion-procesos/automatizacion-procesos` | ~1.694 | ✅ 1 | 7 | ✅ | ❌ / ❌ |
| `/servicios/optimizacion-procesos/[slug]` **(stub)** | ~21 | ✅ 1 | 0 | ❌ | ❌ / ❌ |
| `/servicios/sistemas-calidad` | ~1.767 | ✅ 1 | 7 | ✅ | ✅ casos-exito / ❌ |
| `/servicios/sistemas-calidad/implementacion-iso-9001` | ~1.994 | ✅ 1 | 8 | ✅ | ❌ / ❌ |
| `/servicios/sistemas-calidad/auditoria-calidad` | ~2.328 | ✅ 1 | 9 | ✅ | ❌ / ❌ |
| `/servicios/sistemas-calidad/certificacion-iso` | ~1.990 | ✅ 1 | 8 | ✅ | ❌ / ❌ |
| `/servicios/sistemas-calidad/gestion-calidad` | ~2.207 | ✅ 1 | 8 | ✅ | ❌ / ❌ |
| `/servicios/sistemas-calidad/[slug]` **(stub)** | ~29 | ✅ 1 | 0 | ❌ | ❌ / ❌ |
| `/servicios/gestion-proyectos` | ~1.944 | ✅ 1 | 8 | ✅ | ❌ / ❌ |
| `/servicios/gestion-proyectos/pmp-project-management` | ~1.861 | ✅ 1 | 8 | ✅ | ❌ / ❌ |
| `/servicios/gestion-proyectos/metodologias-agiles` | ~1.804 | ✅ 1 | 8 | ✅ | ❌ / ❌ |
| `/servicios/gestion-proyectos/pmo-office` | ~1.807 | ✅ 1 | 8 | ✅ | ❌ / ❌ |
| `/servicios/gestion-proyectos/casos-negocio` | ~2.037 | ✅ 1 | 9 | ✅ | ❌ / ❌ |
| `/servicios/gestion-proyectos/[slug]` **(stub)** | ~24 | ✅ 1 | 0 | ❌ | ❌ / ❌ |
| `/servicios/transformacion-digital` | ~2.056 | ✅ 1 | 6 | ✅ | ✅ casos-exito / ❌ |
| `/servicios/transformacion-digital/estrategia-digital` | ~3.190 | ✅ 1 | 9 | ✅ | ❌ / ❌ |
| `/servicios/transformacion-digital/change-management` | ~3.148 | ✅ 1 | 9 | ✅ | ❌ / ❌ |
| `/servicios/transformacion-digital/digitalizacion-procesos` | ~2.992 | ✅ 1 | 9 | ✅ | ❌ / ❌ |
| `/servicios/transformacion-digital/analisis-datos` | ~2.796 | ✅ 1 | 9 | ✅ | ❌ / ❌ |
| `/servicios/transformacion-digital/[slug]` **(stub)** | ~27 | ✅ 1 | 0 | ❌ | ❌ / ❌ |
| `/servicios/consultoria-estrategica` | ~2.313 | ✅ 1 (lo aporta `ConsultoriaEstrategicaHero.tsx:106`) | 6 | ✅ | ❌ / ❌ |
| `/servicios/consultoria-estrategica/diagnostico-organizacional` | ~2.863 | ✅ 1 | 8 | ✅ | ❌ / ❌ |
| `/servicios/consultoria-estrategica/diseno-organizacional` | ~3.287 | ✅ 1 | 9 | ✅ | ❌ / ❌ |
| `/servicios/consultoria-estrategica/planificacion-estrategica` | ~3.257 | ✅ 1 | 9 | ✅ | ❌ / ❌ |
| `/servicios/consultoria-estrategica/[slug]` **(stub)** | ~24 | ✅ 1 | 0 | ❌ | ❌ / ❌ |
| `/servicios/desarrollo-tecnologia` | ~1.998 | ✅ 1 | 6 | ✅ | ✅ casos-exito / ❌ |
| `/servicios/desarrollo-tecnologia/desarrollo-software` | ~3.297 | ✅ 1 | 9 | ✅ | ✅ casos-exito / ❌ |
| `/servicios/desarrollo-tecnologia/aplicaciones-web-moviles` | ~3.297 | ✅ 1 | 9 | ✅ | ✅ casos-exito / ❌ |
| `/servicios/desarrollo-tecnologia/consultoria-tecnologica` | ~3.073 | ✅ 1 | 9 | ✅ | ❌ / ❌ |
| `/servicios/desarrollo-tecnologia/integracion-sistemas` | ~3.557 | ✅ 1 | 9 | ✅ | ❌ / ❌ |
| `/servicios/desarrollo-tecnologia/[slug]` **(stub)** | ~27 | ✅ 1 | 0 | ❌ | ❌ / ❌ |

**Resumen:**
- **Volumen de contenido: bueno.** 27 de las 33 páginas superan las 1.000 palabras; la mediana ronda 2.000. La jerarquía de encabezados es correcta: **exactamente un `<h1>` por página en las 57 rutas medidas**, con 6-9 `<h2>` en las páginas de contenido.
- `/servicios` (índice) es la excepción de volumen: ~200 palabras y solo 2 `<h2>`.
- Los 6 `[slug]/page.tsx` renderizan `<h1>{slug}</h1>` + "Contenido en desarrollo…" y **devuelven HTTP 200 para cualquier sub-slug inexistente** (soft-404 verificado). No llaman a `notFound()`.
- **Ninguna** página de servicio enlaza al blog. Solo 8 de 33 enlazan a `/casos-exito`, que es un placeholder. El enlazado interno hacia contenido editorial es nulo.

### 7.3 Sobre las FAQ

Las respuestas **sí están en el HTML servido** (verificado: la respuesta completa de la primera FAQ de BPM aparece en el HTML de `/es/servicios/optimizacion-procesos/bpm-empresarial`). `FAQItem` renderiza siempre el `<p>{answer}</p>` y solo anima `height`/`opacity` con framer-motion; no hay render condicional:

```tsx
// app/[locale]/servicios/optimizacion-procesos/bpm-empresarial/page.tsx:125-139
<motion.div
  initial={false}
  animate={{
    height: isOpen ? 'auto' : 0,
    opacity: isOpen ? 1 : 0
  }}
  transition={{ duration: 0.3 }}
  className="overflow-hidden"
>
  <p className="pb-6 text-foreground/70 leading-relaxed">
    {answer}
  </p>
</motion.div>
```

Contenido rastreable, pero **sin `FAQPage` JSON-LD** (§4): no puede optar a rich results.

### 7.4 Páginas de industria (contexto adicional)

| Ruta | Palabras ES (aprox.) | H1 | H2 | FAQ | Enlaza casos-exito |
|---|---:|---|---:|---|---|
| `/industrias` | ~67 | ✅ 1 | 8 | ❌ | ❌ |
| `/industrias/[slug]` (genérico) | ~115 | ✅ 1 | 0 | ❌ | ❌ |
| `/industrias/banca-servicios-financieros` | ~2.150 | ✅ 1 | 6 | ✅ | ✅ |
| `/industrias/gobierno-sector-publico` | ~2.011 | ✅ 1 | 5 | ✅ | ✅ |
| `/industrias/salud-farmaceutica` | ~2.064 | ✅ 1 | 5 | ✅ | ✅ |
| `/industrias/manufactura-logistica` | ~856 | ✅ 1 | 5 | ✅ | ✅ |
| `/industrias/energia-utilities` | ~563 | ✅ 1 | 5 | ✅ | ✅ |
| `/industrias/retail-comercio` | ~551 | ✅ 1 | 5 | ✅ | ✅ |
| `/industrias/servicios-profesionales` | ~527 | ✅ 1 | 5 | ✅ | ✅ |
| `/industrias/tecnologia-telecomunicaciones` | ~538 | ✅ 1 | 5 | ✅ | ✅ |
| `/industrias/banca…/transformacion-digital-bancaria` | ~950 | ✅ 1 | 2 | ❌ | ❌ |
| `/industrias/banca…/cumplimiento-regulatorio-sbp` | ~35* | ✅ 1 | 2 | ❌ | ❌ |
| `/industrias/banca…/gestion-proyectos-bancarios` | ~32* | ✅ 1 | 2 | ❌ | ❌ |
| `/industrias/banca…/iso-9001-sector-financiero` | ~34* | ✅ 1 | 4 | ❌ | ❌ |

\* Estas tres tienen 540-626 líneas de JSX; su texto vive en arrays de objetos con claves que el extractor no capturó. El contenido real es mayor que el número mostrado (§10.2).

### 7.5 Otras páginas con problemas de contenido

| Ruta | Estado (verificado) |
|---|---|
| `/casos-exito` | **Placeholder**: `<h1>Casos de Éxito</h1>` + "Contenido en desarrollo…" (`app/[locale]/casos-exito/page.tsx:26-30`). 34 líneas, **0 `<h2>`**. Está en el sitemap con `priority: 0.9` y recibe enlaces desde 16 páginas + el header. |
| `/recursos/[slug]` | Genérica para 5 slugs; sin `notFound()`, cualquier slug devuelve **200**. |
| `/business-consultants` | 343 líneas, 1 `<h1>` + 3 `<h2>`, contenido que duplica `/nosotros`; indexable en ambos locales. |
| `/nosotros/katherine-gonzalez` | 229 líneas, 1 `<h1>` pero **0 `<h2>`**; hereda title y description de `/nosotros`. |
| `/recursos`, `/recursos/calculadoras`, `/recursos/calculadoras/*` | 9-18 palabras de copy indexable cada una (son apps interactivas). |

---

## 8. BLOG

### 8.1 Almacenamiento

**Dual, con fallback.** No hay MDX ni ficheros de contenido.

```ts
// lib/blog.ts:131-134
const SANITY_ENABLED =
  typeof process !== 'undefined' &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_DATASET;
```

```ts
// lib/blog.ts:140-152
export async function getAllPostsAsync(): Promise<BlogPost[]> {
  if (SANITY_ENABLED) {
    try {
      const { fetchAllPostsFromSanity } = await import('@/lib/sanity-blog');
      const posts = await fetchAllPostsFromSanity();
      if (posts.length > 0) return posts;
    } catch (_) {
      // fallback to static
    }
  }
  return BLOG_POSTS;
}
```

| Capa | Ruta | Contenido |
|---|---|---|
| Estática (fallback) | `lib/blog.ts:60-129` — array `BLOG_POSTS` | **2 posts**, solo metadata (sin `body`) |
| CMS | Sanity, vía `lib/sanity-blog.ts` + `sanity/lib/queries.ts` | Portable Text en `body` / `bodyEn` |
| Cuerpo hardcodeado | `components/blog/contents/BpmArticleContent.tsx`, `BancoRegionalCaseContent.tsx` | Mapeados por slug en `app/[locale]/blog/[slug]/page.tsx:53-65` |

Los 2 posts estáticos son `que-es-bpm-business-process-management-guia-completa` y `caso-exito-banco-regional-40-menos-tiempos-bpm`; ambos tienen componente de cuerpo dedicado. Si Sanity devolviera un post que **no** está en `BLOG_SLUG_TO_CONTENT` ni trae `body`, la página renderizaría el excerpt + "Contenido en preparación." con HTTP 200:

```tsx
// app/[locale]/blog/[slug]/page.tsx:139-148
{hasSanityBody ? (
  <BlogPortableText value={bodyContent} />
) : (
  <div className="blog-prose">
    <p>{localeTyped === 'es' ? post.excerpt : post.excerptEn}</p>
    <p className="text-azul-marino/70 dark:text-white/70">
      {localeTyped === 'es' ? 'Contenido en preparación.' : 'Content coming soon.'}
    </p>
  </div>
)}
```

Un slug inexistente **sí devuelve 404 correctamente** (verificado), porque la página llama a `notFound()` (`blog/[slug]/page.tsx:125`). Es la única familia de rutas dinámicas del sitio que lo hace.

### 8.2 "Frontmatter" (esquema de post)

No hay frontmatter: el esquema es el interface TypeScript.

```ts
// lib/blog.ts:26-57
export interface BlogPost {
  /** URL slug - same in both locales */
  slug: string;
  /** Meta for SEO */
  metaTitle: string;
  metaTitleEn: string;
  metaDescription: string;
  metaDescriptionEn: string;
  /** Display */
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  category: BlogCategory;          // union de 6 valores, lib/blog.ts:6-12
  categoryLabel: string;
  categoryLabelEn: string;
  /** Hero image path (optional) */
  heroImage?: string;
  heroImageAlt?: string;
  heroImageAltEn?: string;
  /** Author */
  author: BlogAuthor;              // { name, nameEn, role, roleEn, image?, bio, bioEn, certifications?, link? }
  /** Dates & reading */
  publishedAt: string;             // ISO date
  updatedAt?: string;
  readingTimeMinutes: number;
  /** Keywords for internal linking */
  keywords?: string[];
  /** Body from Sanity (Portable Text blocks) – only when fetched from Sanity */
  body?: unknown[];
  bodyEn?: unknown[];
}
```

Fechas de los 2 posts estáticos: `2026-01-15` y `2026-01-20`. **Ninguno define `updatedAt`.**

### 8.3 Metadata y OG image del post

```ts
// app/[locale]/blog/[slug]/page.tsx:71-114
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = params;
  const post = await getPostBySlugAsync(slug);
  if (!post) return { title: 'Blog | Alternative' };

  const isEn = locale === 'en';
  const title = isEn ? post.metaTitleEn : post.metaTitle;
  const description = isEn ? post.metaDescriptionEn : post.metaDescription;

  const canonical = `${SITE_URL}/${locale}/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${SITE_URL}/es/blog/${slug}`,
        en: `${SITE_URL}/en/blog/${slug}`,
        'x-default': `${SITE_URL}/es/blog/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      locale: locale === 'es' ? 'es_PA' : 'en_US',
      url: canonical,
      siteName: 'Alternative',
      title,
      description,
      images: post.heroImage
        ? [{ url: `${SITE_URL}${post.heroImage}`, alt: isEn ? post.heroImageAltEn : post.heroImageAlt }]
        : undefined,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
  };
}
```

- Es la **única** ruta con metadata realmente por página (title y description propios).
- El `template` del layout `[locale]` le añade ` | Alternative`. Verificado: `Qué es BPM: Guía Completa Business Process Management 2026 | Alternative` — 72 caracteres, por encima de lo que se muestra en SERP.
- **OG image:** `${SITE_URL}${post.heroImage}` → `https://grupoalternative.com/images/consulting-session.webp`, que es **1066 × 1600 (vertical)**. Además se rompe para posts de Sanity (§2.9).
- Al definir `openGraph` completo, se anula `app/[locale]/opengraph-image.tsx`. Si un post no tiene `heroImage`, `images: undefined` → **el post queda sin imagen OG**, sin fallback.
- `post.keywords` existe pero no se emite.
- `/es/blog` (índice) no tiene metadata propia: hereda `ES-DEFAULT`.

### 8.4 Librerías de contenido en `package.json`

| Librería | ¿Presente? | Uso real |
|---|---|---|
| `gray-matter` `4.0.3` | ✅ instalada (`package.json:114`) | **Ninguno** — `grep -rn "gray-matter"` sobre `app/`, `components/`, `lib/` → 0 resultados. Dependencia huérfana. |
| `next-mdx-remote` | ❌ | — |
| `contentlayer` | ❌ | — |
| `velite` | ❌ | — |
| `@mdx-js/*` / `@next/mdx` | ❌ | — |
| `next-sanity` `^12.0.14` | ✅ | Sí (`sanity/lib/client.ts`, `lib/sanity-blog.ts`) |
| `@portabletext/react` `^3.2.4` | ✅ | Sí (`components/blog/BlogPortableText.tsx`) |
| `@sanity/image-url` `^2.0.3` | ✅ | Sí (`lib/sanity-blog.ts:11`) |

---

## 9. RENDIMIENTO

### 9.1 Imágenes

- **`next/image`: 9 archivos** lo importan — `app/[locale]/page.tsx`, `app/[locale]/nosotros/page.tsx`, `app/[locale]/nosotros/katherine-gonzalez/page.tsx`, `app/[locale]/business-consultants/page.tsx`, `app/[locale]/helpdesk-it/page.tsx`, `components/blog/BlogPageClient.tsx`, `components/blog/BlogPostLayout.tsx`, `components/layout/header.tsx`, `components/layout/footer.tsx`.
- **`<img>` crudo: 0 ocurrencias** en `app/` y `components/`. La única está en `app/[locale]/opengraph-image.tsx:24`, dentro de `ImageResponse`, donde es obligatoria.
- **Pero `images: { unoptimized: true }`** (`next.config.js:15`) desactiva el optimizador: sin `srcset`, sin AVIF/WebP, sin redimensionado. `next/image` funciona aquí como un `<img>` con `width`/`height`.
- Las 33 páginas de servicio y las 13 de industria **no usan ninguna imagen** — son íconos SVG de `lucide-react` y gradientes CSS. Nada que optimizar, pero tampoco material para Google Images.
- Pesos relevantes en `public/`: `logo_24.webp` **502 KB** (3310×1990, usado como `twitter:image` y embebido en el OG generado), `images/consulting-session.webp` (1066×1600), y 25 `logo_*.jpeg` sin referenciar.

### 9.2 Fuentes

**No se usa `next/font`** (`grep -rn "next/font"` → 0 resultados). Dos cargas externas:

```css
/* app/globals.css:1-7 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Mona Sans font - Using Inter as fallback since Mona Sans is similar */
/* Inter is a very similar grotesque sans-serif that works well as alternative */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

```tsx
// components/servicios/HeroReveal.tsx:171-176   (componente NO usado)
{/* eslint-disable-next-line @next/next/no-page-custom-font */}
<link
  href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap"
  rel="stylesheet"
/>
```

Consecuencias del `@import` dentro del CSS:
- Es **render-blocking en cascada**: el navegador debe descargar y parsear `globals.css` antes de descubrir la petición a `fonts.googleapis.com`, que a su vez descubre `fonts.gstatic.com`. Tres saltos secuenciales antes del primer glifo.
- Sin `preconnect` ni `preload`: no hay ningún `<link rel="preconnect">` en los layouts (verificado en el HTML servido).
- Sin `next/font` no hay auto-hospedaje, ni `size-adjust` del fallback, ni mitigación del CLS por swap de fuente.
- El segundo `<link>` vive dentro del `<body>` de un componente que hoy no está en el árbol; sería un problema si se reintroduce `HeroReveal`.

### 9.3 Scripts de terceros

**Ninguno.** `grep -rn "next/script"` → 0 resultados. `grep -rni "gtag|googletagmanager|hotjar|clarity|facebook.net"` → 0 resultados de analítica.

No hay Google Analytics, ni GTM, ni píxeles, ni herramientas de sesión. Solo existe `public/googlec6c6f503bd291312.html` (verificación de Search Console) y un botón de WhatsApp que es un `<a href="https://wa.me/...">` plano (`components/ui/whatsapp-button.tsx:30`), sin script.

### 9.4 Bundles y First Load JS

`next build` (Next 14.2.28) completó sin errores. 119 rutas procesadas.

**Base compartida:**

```
+ First Load JS shared by all                       87.7 kB
  ├ chunks/2117-724f64343f9d9767.js                 31.8 kB
  ├ chunks/fd9d1056-efbb5f4a710e7b0a.js             53.6 kB
  └ other shared chunks (total)                      2.28 kB

ƒ Middleware                                        54.6 kB
```

**Por ruta** (`Size` = JS propio de la ruta; `First Load JS` = total con la base compartida):

| Ruta | Size | First Load JS |
|---|---:|---:|
| `/[locale]` (home) | 10.1 kB | **167 kB** |
| `/[locale]/blog` | 4.29 kB | 156 kB |
| `/[locale]/blog/[slug]` | 46.8 kB | **184 kB** |
| `/[locale]/casos-exito` | 817 B | 105 kB |
| `/[locale]/contacto` | 4.05 kB | 150 kB |
| `/[locale]/helpdesk-it` | 3.91 kB | 114 kB |
| `/[locale]/industrias` | 2.1 kB | 115 kB |
| `/[locale]/industrias/banca-servicios-financieros` | 15.1 kB | 161 kB |
| `/[locale]/industrias/salud-farmaceutica` | 16.7 kB | 163 kB |
| `/[locale]/industrias/manufactura-logistica` | 15.5 kB | 162 kB |
| `/[locale]/industrias/gobierno-sector-publico` | 15 kB | 161 kB |
| `/[locale]/industrias/banca…/cumplimiento-regulatorio-sbp` | 6.74 kB | 153 kB |
| `/[locale]/nosotros` | 16.4 kB | **173 kB** |
| `/[locale]/nosotros/katherine-gonzalez` | 4.18 kB | 156 kB |
| `/[locale]/recursos` | 2.96 kB | 149 kB |
| `/[locale]/recursos/calculadoras` | 2.63 kB | 149 kB |
| `/[locale]/recursos/calculadoras/madurez-digital` | 11.6 kB | 176 kB |
| **`/[locale]/recursos/calculadoras/roi-optimizacion-procesos`** | **151 kB** | **316 kB** |
| `/[locale]/servicios` | 5.78 kB | 152 kB |
| `/[locale]/servicios/consultoria-estrategica` | 12.4 kB | 166 kB |
| `/[locale]/servicios/consultoria-estrategica/planificacion-estrategica` | 16.3 kB | 169 kB |
| `/[locale]/servicios/desarrollo-tecnologia/integracion-sistemas` | 17.2 kB | 170 kB |
| `/[locale]/servicios/desarrollo-tecnologia/desarrollo-software` | 15.1 kB | 171 kB |
| `/[locale]/servicios/gestion-proyectos/*` | 11.6-12.7 kB | 165-166 kB |
| `/[locale]/servicios/optimizacion-procesos/*` | 10.6-11.8 kB | 165-166 kB |
| `/[locale]/servicios/sistemas-calidad/*` | 10.9-12.4 kB | 164-166 kB |
| `/[locale]/servicios/transformacion-digital/analisis-datos` | 16.6 kB | 170 kB |
| `/[locale]/servicios/*/[slug]` (los 6 stubs) | 973 B-1.15 kB | 105 kB |
| `/[locale]/studio/[[...tool]]` | 1.45 kB | 97.9 kB |
| `/studio/[[...tool]]` | 793 B | 88.5 kB |
| `/robots.txt`, `/sitemap.xml` | 0 B | 0 B |

Lecturas:
- **Suelo de 87.7 kB compartidos** y **~165-171 kB de First Load JS en prácticamente todas las páginas de contenido**. Para páginas que son texto e íconos SVG, es mucho: el coste lo imponen `framer-motion` + la hidratación del árbol completo, consecuencia de que todo sea Client Component.
- **`/recursos/calculadoras/roi-optimizacion-procesos`: 316 kB de First Load JS**, 151 kB solo de la ruta. Casi el doble que cualquier otra. Es la única página que carga la librería de gráficas.
- `/blog/[slug]`: 184 kB, por los componentes de artículo hardcodeados (`BpmArticleContent`, `BancoRegionalCaseContent`).
- Los 6 stubs `[slug]` pesan ~105 kB para mostrar "Contenido en desarrollo…".
- **Middleware de 54.6 kB**, que se ejecuta en cada petición.
- **Ninguna ruta se prerenderiza a disco** (§2.6): pese al marcador `●`, `prerender-manifest.json` solo contiene `/robots.txt` y `/sitemap.xml`, y todas las respuestas llevan `Cache-Control: private, no-cache, no-store`.

### 9.5 Otras observaciones

- `framer-motion` `10.18.0` se importa en prácticamente todas las páginas (`motion`, `useInView`, `useScroll`, `useTransform`) y en header/footer. Al ser todo Client Component, entra en el bundle de cliente de cada ruta.
- Dependencias muy pesadas en `package.json` que no están en el árbol de rutas públicas: `plotly.js` + `react-plotly.js` (~3 MB), `mapbox-gl` `1.13.3`, `chart.js` + `react-chartjs-2`, `recharts`, `jspdf` + `jspdf-autotable`, `sanity` (Studio completo, montado en `/studio`).
- `browserslist` incluye `"ie >= 11"` (`package.json:145-150`) → transpilación y polyfills adicionales en todo el JS servido, para un navegador sin soporte desde 2022.
- No hay `loading.tsx` ni `error.tsx` en ninguna ruta; sin streaming ni Suspense boundaries.
- `eslint.ignoreDuringBuilds: true` (`next.config.js:8`) suprime, entre otras, `@next/next/no-img-element` y `no-page-custom-font`.

---

## 10. RESUMEN

### 10.1 Problemas encontrados, por prioridad

#### 🔴 CRÍTICO

| # | Problema | Archivo(s) |
|---|---|---|
| C1 | **53 de las 57 rutas ES comparten el mismo `<title>` y la misma `<meta description>`** (verificado en HTML servido). Ningún `page.tsx` exporta metadata salvo `blog/[slug]`; solo 2 rutas tienen `layout.tsx` con metadata propia. `/es` y `/es/contacto` son idénticos, igual que las 33 páginas de servicio y las 13 de industria. | Los 63 `page.tsx` con `"use client"`; origen en `app/[locale]/layout.tsx:23-44` |
| C2 | **`"use client"` en 63 de 67 páginas** impide toda metadata por ruta (causa estructural de C1) y arrastra `framer-motion` + la hidratación del árbol completo al bundle, fijando ~165-171 kB de First Load JS en páginas que son texto e íconos. | `app/[locale]/**/page.tsx` |
| C3 | **Sin datos estructurados fuera del blog.** Cero `Organization`, `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList` — pese a tener NAP completo en el footer, 30 bloques de FAQ con las respuestas ya presentes en el HTML, y breadcrumbs visuales en 11+ páginas. Medido: 0 bloques `ld+json` en las 55 rutas no-blog. | Todo `app/`; único JSON-LD en `app/[locale]/blog/[slug]/page.tsx:12-51` |
| C4 | **7+ redirecciones 308 apuntan a URLs que fallan.** `/ia-en-gestion-de-proyectos` → **404 verificado**; `/service/desarrollo-software` → **200 soft-404 verificado**. Consume presupuesto de rastreo y pierde el enlace entrante. | `vercel.json` (`/ia-en-gestion-de-proyectos`, `/diagramas-de-flujo…`, `/la-columna-vertebral…`, `/codigo-impecable…`, `/navegando-el-futuro…` ×2, `/service/desarrollo-software`, `/services/software-development`) |
| C5 | **El HTML servido de la home muestra `0+`, `0%`, `0+`** como cifras de prueba social. `Counter` inicia en `useState(0)` y solo anima en cliente al entrar en viewport. Verificado literalmente en el HTML: `>0<!-- -->+`. | `components/ui/counter.tsx:15,41`; usos en `app/[locale]/page.tsx:441-450` y `app/[locale]/business-consultants/page.tsx:183` |

#### 🟠 ALTO

| # | Problema | Archivo(s) |
|---|---|---|
| A1 | **`<html lang="es">` hardcodeado**: todas las URLs `/en/**` se sirven declarando español (verificado). La corrección es un `useEffect` post-hidratación. | `app/layout.tsx:19`, `components/layout/set-html-lang.tsx:6-10` |
| A2 | **`robots.txt` bloquea `/_next/`**, impidiendo a Googlebot descargar el JS/CSS que este sitio necesita para renderizar (63 de 67 páginas son Client Components). | `app/robots.ts:9` |
| A3 | **8 rutas dinámicas devuelven HTTP 200 con contenido vacío** ("Contenido en desarrollo…") para cualquier slug inexistente. Soft-404 verificado en `/es/servicios/optimizacion-procesos/slug-inexistente-xyz`, `/es/industrias/slug-inexistente-xyz` y `/es/recursos/slug-inexistente-xyz`. Ninguna llama a `notFound()`. Solo `blog/[slug]` lo hace bien. | `app/[locale]/servicios/*/[slug]/page.tsx` (×6), `app/[locale]/industrias/[slug]/page.tsx`, `app/[locale]/industrias/banca-servicios-financieros/[subslug]/page.tsx`, `app/[locale]/recursos/[slug]/page.tsx` |
| A4 | **`/casos-exito` es un placeholder** ("Contenido en desarrollo…", 0 `<h2>`) pero está en el sitemap con `priority: 0.9` y recibe enlaces internos desde 8 páginas de servicio, 8 de industria y el header. | `app/[locale]/casos-exito/page.tsx:26-30`, `app/sitemap.ts:31-34` |
| A5 | **`lastmod` del sitemap no es real**: las **100 URLs comparten el mismo timestamp al milisegundo** (instante del build), congelado hasta el siguiente despliegue. `publishedAt`/`updatedAt` existen en el modelo pero no se usan. | `app/sitemap.ts:19-20` |
| A6 | **`/en/nosotros`, `/en/nosotros/katherine-gonzalez` y `/en/helpdesk-it` sirven title y description en español**; los layouts no leen `params.locale`. Verificado. | `app/[locale]/nosotros/layout.tsx:3-12`, `app/[locale]/helpdesk-it/layout.tsx:3-8` |
| A7 | **Ninguna ruta se prerenderiza.** Las 119 rutas se renderizan en el servidor en cada petición y son incacheables en CDN (`Cache-Control: private, no-cache, no-store`), por `headers()` en el `generateMetadata` del layout y por la cookie `NEXT_LOCALE` del middleware. Los dos `generateStaticParams` no producen HTML. | `app/[locale]/layout.tsx:20,108-110`, `middleware.ts:18`, `app/[locale]/blog/[slug]/page.tsx:116-120` |
| A8 | **Fuentes vía `@import` en CSS**, sin `next/font`, sin `preconnect`, sin `preload`: cadena de tres saltos bloqueantes antes del primer glifo, más CLS por swap. | `app/globals.css:7` |
| A9 | **`twitter:image` es un logo de 3310×1990 y 502 KB.** El `public/og-image.png` correcto (1200×630, 17 KB) no se usa en ninguna parte. El `og:image` generado incrusta además ese mismo archivo de 502 KB. | `app/[locale]/layout.tsx:69`, `app/[locale]/opengraph-image.tsx:24-32`, `public/og-image.png` |
| A10 | **`metadataBase` de la raíz depende de `NEXTAUTH_URL`**, una variable de autenticación. Si apunta a preview o localhost, las URLs absolutas de las rutas fuera de `[locale]` quedan mal. | `app/layout.tsx:6` |
| A11 | **Sin analítica.** Ni GA4, ni GTM, ni ninguna medición. No hay forma de validar el impacto de ningún cambio SEO. | Ausencia global |
| A12 | **La OG image de los posts de Sanity produce una URL inválida** (`https://grupoalternative.com/https://cdn.sanity.io/…`), porque `urlFor()` ya devuelve una URL absoluta. Mismo bug en el `image` del JSON-LD. Además, un post sin `heroImage` queda **sin ninguna imagen OG** (no hay fallback). | `app/[locale]/blog/[slug]/page.tsx:30,100` vs `lib/sanity-blog.ts:102` |
| A13 | **`/es/blog` (índice del blog) no tiene metadata propia**: sirve `ES-DEFAULT`, igual que la home. Es la puerta de entrada al contenido editorial. | `app/[locale]/blog/page.tsx` (8 líneas, sin `generateMetadata`) |

#### 🟡 MEDIO

| # | Problema | Archivo(s) |
|---|---|---|
| M1 | **`x-default` contradictorio entre capas**: la cabecera HTTP `Link:` de `next-intl` declara `x-default` = `/servicios` (sin locale, URL que siempre redirige), mientras el HTML declara `/es/servicios`. Dos señales opuestas sobre el mismo recurso. | `middleware.ts:6-10` (next-intl) vs `lib/seo.ts:32` |
| M2 | **`/es/nosotros` y `/es/nosotros/katherine-gonzalez` comparten title y description**, porque la sub-página hereda del `layout.tsx` de `nosotros`. | `app/[locale]/nosotros/layout.tsx:3-12` |
| M3 | **`/business-consultants` duplica el contenido de `/nosotros`** y es indexable en ambos locales (200 verificado en `/es/` y `/en/`); el redirect de `vercel.json` solo cubre la ruta sin prefijo. | `app/[locale]/business-consultants/page.tsx`, `vercel.json` |
| M4 | **5 páginas reales ausentes del sitemap**: `nosotros/katherine-gonzalez` y las 4 sub-páginas de `industrias/banca-servicios-financieros`. | `app/sitemap.ts:31-87` |
| M5 | **`/studio` (Sanity) indexable**: existe en `/studio`, `/es/studio` y `/en/studio` (200 verificado en las tres) con `<meta name="robots" content="index, follow">`, y no está en `robots.ts`. | `app/studio/[[...tool]]/page.tsx`, `app/[locale]/studio/[[...tool]]/page.tsx`, `middleware.ts:14-16`, `app/robots.ts:9` |
| M6 | **`images: { unoptimized: true }`** anula el optimizador de Next: sin AVIF/WebP, sin `srcset` responsivo. | `next.config.js:15` |
| M7 | **Enlazado interno hacia el blog: nulo.** Ninguna de las 33 páginas de servicio ni de las 13 de industria enlaza a `/blog` ni a un post. | `app/[locale]/servicios/**`, `app/[locale]/industrias/**` |
| M8 | **Cifras contradictorias entre secciones**: hero `500+` proyectos vs `messages/es.json` `50+`; `15+ años` en el hero vs "Más de 5 años" en la description de `/nosotros`. | `app/[locale]/page.tsx:441`, `messages/es.json` (`hero.stats.projects`), `app/[locale]/nosotros/layout.tsx:6` |
| M9 | **Las etiquetas de las estadísticas del hero están en español también en `/en`** (no pasan por `next-intl`). | `app/[locale]/page.tsx:441-443` |
| M10 | **`/recursos/calculadoras/roi-optimizacion-procesos`: 316 kB de First Load JS**, casi el doble de cualquier otra ruta. | `app/[locale]/recursos/calculadoras/roi-optimizacion-procesos/page.tsx` |
| M11 | **`browserslist` incluye `ie >= 11`**, forzando transpilación y polyfills en todo el JS. | `package.json:145-150` |
| M12 | **`eslint.ignoreDuringBuilds: true`** silencia las reglas de Next relevantes para SEO y rendimiento. | `next.config.js:8` |
| M13 | **Dos sistemas de contenido conviviendo**: `next-intl` (home, header, footer) y ternarios `isEs ? … : …` hardcodeados (33 servicios + 13 industrias). Ninguna traducción de servicios pasa por `messages/*.json`. | `messages/*.json` vs `app/[locale]/servicios/**` |
| M14 | **`app/sitemap.ts` mantiene listas hardcodeadas** que hay que sincronizar a mano con `app/`; ya está desincronizado (M4). | `app/sitemap.ts:31,37-44,50-57,65-74,80-84` |
| M15 | **`/servicios` (índice): ~200 palabras y solo 2 `<h2>`** para la página cabecera de la línea de negocio principal, que es padre de 32 sub-páginas. | `app/[locale]/servicios/page.tsx` |
| M16 | **`og:image` de los posts es vertical** (`consulting-session.webp`, 1066×1600, ratio 0.67:1); se recorta mal en todas las plataformas. Los 2 posts comparten la misma imagen. | `lib/blog.ts:78,112`, `public/images/consulting-session.webp` |

#### 🔵 BAJO

| # | Problema | Archivo(s) |
|---|---|---|
| B1 | **`meta keywords` global e idéntico** en las 57 rutas (ignorado por Google desde 2009; señal de descuido). | `app/[locale]/layout.tsx:27,32` |
| B2 | **`post.keywords` existe pero no se emite** en la metadata del post. | `lib/blog.ts:53,93,127` vs `app/[locale]/blog/[slug]/page.tsx:82-113` |
| B3 | **`robots.ts` bloquea `/admin/`, ruta inexistente.** | `app/robots.ts:9` |
| B4 | **Doble sufijo de marca**: el `template: '%s \| Alternative'` se aplica a títulos que ya la incluyen → `Helpdesk IT – Alternative \| Alternative`, `Nosotros - Grupo Alternative \| Consultoría Empresarial Panamá \| Alternative` (76 caracteres). | `app/[locale]/layout.tsx:43` + `nosotros/layout.tsx:4` + `helpdesk-it/layout.tsx:4` |
| B5 | **`gray-matter` instalado sin uso alguno.** | `package.json:114` |
| B6 | **`components/servicios/HeroReveal.tsx` (33 KB) es código muerto**, con un `<link>` a Google Fonts dentro del `<body>`. | `components/servicios/HeroReveal.tsx` |
| B7 | **Doble capa de redirecciones redundante**: `vercel.json` replica lo que `next-intl` (`localePrefix: 'always'`) ya hace para rutas sin prefijo. | `vercel.json`, `middleware.ts:6-10` |
| B8 | **`public/` con 25 `logo_*.jpeg` sin referenciar.** | `public/` |
| B9 | **Sin `loading.tsx` ni `error.tsx`** en ninguna ruta; sin Suspense boundaries. | `app/` |
| B10 | **JSON-LD sin `inLanguage`, `wordCount` ni `articleSection`**; se usa `Article` en vez de `BlogPosting`; `dateModified` siempre cae en `publishedAt` porque ningún post define `updatedAt`. | `app/[locale]/blog/[slug]/page.tsx:27,32`, `lib/blog.ts:91,125` |
| B11 | **La cabecera `x-pathname` se filtra a la respuesta pública** en cada petición. Inofensiva, pero es detalle de implementación expuesto. | `middleware.ts:21` |
| B12 | **`/nosotros/katherine-gonzalez` tiene `<h1>` pero 0 `<h2>`**: sin subestructura para una página de perfil profesional (relevante para E-E-A-T). | `app/[locale]/nosotros/katherine-gonzalez/page.tsx` |
| B13 | **Comentario obsoleto sobre "Mona Sans"** en `globals.css`, y OG heredando el nombre `logo_24.webp`. | `app/globals.css:5-6`, `public/logo_24.webp` |

### 10.2 Lo que NO pude determinar

| # | Ítem | Motivo |
|---|---|---|
| 1 | **Si Sanity contiene posts adicionales** (y por tanto si los 6 redirects de blog de C4 realmente terminan en 404 en producción). | Requiere consultar el dataset de Sanity en producción. `.env.example` declara `NEXT_PUBLIC_SANITY_PROJECT_ID=5s1f6jl3` / `dataset=production`, pero el `.env` real no está en el repo y no se hicieron peticiones de red al CMS. El fallback estático solo tiene 2 slugs; la verificación local con `next start` corrió sin credenciales de Sanity, así que confirma el comportamiento del fallback, no el de producción. |
| 2 | **Valor de `NEXTAUTH_URL` en producción** (afecta a A10). | No aparece en `.env.example` ni en `vercel.json`; se configura en el panel de Vercel. |
| 3 | **Si las redirecciones de `vercel.json` funcionan tal como están escritas.** | Son configuración de plataforma: no se aplican bajo `next start`. Lo verificado es el **destino** de cada regla (si la URL final existe o no), no la ejecución del 308. |
| 4 | **Si `www.grupoalternative.com` redirige al apex, y si hay `http`→`https`.** | Se resuelve a nivel de dominio en Vercel, fuera del repositorio. |
| 5 | **Core Web Vitals reales (LCP, INP, CLS) y datos de campo.** | Requiere PageSpeed Insights / CrUX sobre el sitio desplegado. No hay analítica instalada (A11). Los tamaños de §9.4 son de build, no de campo. |
| 6 | **Conteo exacto de palabras por página.** | Los conteos de §7.2 y §7.4 son aproximaciones por extracción de literales del JSX. Subestiman las páginas cuyo texto vive en arrays de objetos con claves no capturadas por el extractor, notablemente las 3 sub-páginas de banca (muestran ~35 palabras pero tienen 540-626 líneas de JSX). Los conteos de `<h1>`/`<h2>` sí son exactos: medidos sobre el HTML servido. |
| 7 | **Estado real de indexación en Google** (páginas indexadas, canónicas elegidas, cobertura, hreflang detectados, si Google está fusionando las 53 URLs con title duplicado). | Requiere acceso a Google Search Console. Solo consta el archivo de verificación `public/googlec6c6f503bd291312.html`. |
| 8 | **Si Vercel aplica caché al `sitemap.xml`** y con qué TTL. | No hay `revalidate` ni `dynamic` declarados en `app/sitemap.ts`, ni `headers()` en `next.config.js`. Depende de la configuración del despliegue. |
| 9 | **Backlinks entrantes a las URLs de WordPress sin redirección** (`/project/*`, `/beneficios-de-la-consultoria-en-ti`) y por tanto el coste real de su ausencia. | Requiere Search Console o una herramienta de backlinks. |
| 10 | **Comportamiento del `Cache-Control: no-store` en el CDN de Vercel.** | Medido en `next start` local. Vercel puede aplicar sus propias reglas de caché para funciones; no verificable sin acceso al despliegue. |

---

## 11. VERIFICACIÓN EN HTML SERVIDO

Metodología del paso 3: `next build` en dist aislado → `next start -p 3117` → rastreo de las 57 rutas ES (+ 4 sondas de slug inexistente) leyendo el HTML de respuesta. Este apartado documenta las mediciones que corrigieron o confirmaron el análisis estático.

### 11.1 Duplicación de title/description — **confirmada**

De 57 rutas ES rastreadas, **53 devuelven exactamente**:

```html
<title>Consultoría Empresarial que Genera Resultados | Alternative</title>
<meta name="description" content="Consultoría en optimización de procesos, gestión de proyectos y sistemas de calidad. Equipo certificado PMP®, ISO 9001 Lead Auditor y Lean Six Sigma. Experiencia en LATAM y el Caribe."/>
<meta name="keywords" content="consultoría empresarial, optimización de procesos, gestión de proyectos, sistemas de calidad, ISO 9001, consultoría BPM, transformación digital"/>
```

Incluye `/es`, `/es/contacto`, `/es/blog`, `/es/casos-exito`, las 33 de servicios, las 13 de industrias y las 5 de recursos.

### 11.2 Canonical y hreflang — **correctos** (corrige una hipótesis del análisis estático)

Por lectura del código parecía que `response.headers.set('x-pathname', …)` en `middleware.ts:21` no llegaría a `headers()` en el layout, lo que habría dejado el canonical de todo el sitio apuntando a `/es`. **La medición lo desmiente**: las 57 rutas emiten canonical propio y correcto. La cabecera `x-pathname` sí alcanza el render del Server Component.

```html
<!-- /es/contacto -->
<link rel="canonical" href="https://grupoalternative.com/es/contacto"/>
<link rel="alternate" hrefLang="es" href="https://grupoalternative.com/es/contacto"/>
<link rel="alternate" hrefLang="en" href="https://grupoalternative.com/en/contacto"/>
<link rel="alternate" hrefLang="x-default" href="https://grupoalternative.com/es/contacto"/>
```

Es la pieza que sí funciona bien. El único defecto es el `x-default` contradictorio de la cabecera HTTP `Link:` (M1).

### 11.3 Jerarquía de encabezados — **correcta** (corrige el conteo estático)

El barrido por `grep` sobre el código daba 0 `<h1>` en `/servicios`, `/business-consultants`, `/nosotros/katherine-gonzalez` y `/servicios/consultoria-estrategica`, porque el patrón no capturaba `<motion.h1>` ni los `<h1>` situados en componentes hero. **Medido sobre el HTML: las 57 rutas tienen exactamente 1 `<h1>`.** No hay problema de encabezados; el único apunte real es `/nosotros/katherine-gonzalez`, con `<h1>` pero 0 `<h2>` (B12).

### 11.4 Contadores del hero — **confirmado**

```html
">0<!-- -->+</span></div><div class="text-sm text-white/60">Proyectos Completados</div>
">0<!-- -->%</span></div><div class="text-sm text-white/60">Satisfacción del Cliente</div>
```

### 11.5 Códigos de estado

| URL sondeada | Esperado | Medido |
|---|---|---|
| `/es/servicios/optimizacion-procesos/slug-inexistente-xyz` | 404 | **200** ⚠️ soft-404 |
| `/es/industrias/slug-inexistente-xyz` | 404 | **200** ⚠️ soft-404 |
| `/es/recursos/slug-inexistente-xyz` | 404 | **200** ⚠️ soft-404 |
| `/es/servicios/desarrollo-tecnologia/aplicaciones-medida` (destino de un redirect) | 404 | **200** ⚠️ soft-404 |
| `/es/blog/slug-inexistente-xyz` | 404 | **404** ✅ |
| `/es/blog/ia-gestion-proyectos` (destino de un redirect) | — | **404** ⚠️ |
| `/es/studio`, `/studio` | noindex o 404 | **200 + `robots: index, follow`** ⚠️ |
| `/es/business-consultants`, `/en/business-consultants` | — | **200** (duplicado indexable) |

### 11.6 Cabeceras de respuesta (todas las páginas)

```http
HTTP/1.1 200 OK
link: <…/es/contacto>; rel="alternate"; hreflang="es", <…/en/contacto>; rel="alternate"; hreflang="en", <…/contacto>; rel="alternate"; hreflang="x-default"
set-cookie: NEXT_LOCALE=es; Path=/; SameSite=lax
x-pathname: /es/contacto
Vary: RSC, Next-Router-State-Tree, Next-Router-Prefetch, Accept-Encoding
Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate
```

### 11.7 JSON-LD

0 bloques `application/ld+json` en las 55 rutas no-blog. Presente únicamente en los 2 posts.

### 11.8 Sitemap

100 `<loc>`, un único `<lastmod>` (`2026-09-02T21:12:52.555Z`) compartido por las 100 entradas.

---

*Auditoría realizada sobre el commit `76d7b5e`. Las citas de archivo y línea corresponden a ese estado; las mediciones de HTML corresponden a un `next build` + `next start` de ese mismo commit, ejecutados en un directorio de build temporal ya eliminado.*

# Reporte de corrección SEO — Fases 1a, 1b y 4

**Rama:** `seo/fix` (sin merge a `main`)
**Base:** `76d7b5e`
**Commits:** `07ac65f` (1a) · `78b0c79` (1b) · `8d0151a` (1a ajustes) · `2eb08b7` (4)

Fases 2, 3, 5 y 6.2 **pendientes**. Este reporte cubre lo ejecutado hasta ahora.

---

## 1. Estado de los hallazgos del audit

| # | Hallazgo | Estado | Dónde |
|---|---|---|---|
| **C1** | 52 de 55 rutas comparten title y description | ✅ **Corregido** | `lib/seo/routes.ts` + 54 `page.tsx`. Verificado: 108 URLs, 0 duplicados |
| **C2** | `"use client"` impide metadata por ruta | ✅ **Corregido** | 53 páginas divididas en `page.tsx` + `PageClient.tsx` |
| **C3** | Sin datos estructurados fuera del blog | ⏳ Fase 2 | — |
| **C4** | Redirecciones 308 que terminan en 404 | ⏳ Fase 3 | — |
| **C5** | El HTML sirve `0+` / `0%` | ✅ **Corregido** | `components/ui/counter.tsx` |
| **A1** | `<html lang="es">` en las URLs `/en` | ✅ **Corregido** | `app/[locale]/layout.tsx` es root layout con `lang={locale}` |
| **A2** | `robots.txt` bloquea `/_next/` | ⏳ Fase 3 | — |
| **A3** | Soft-404 en 8 rutas dinámicas | ⏳ Fase 3 | — |
| **A4** | `/casos-exito` placeholder en el sitemap | 🟡 **Parcial** | Ya tiene `noindex: true` y metadata honesta en el registro; sale del sitemap en Fase 3 |
| **A5** | `lastmod` del sitemap no real | 🟡 **Parcial** | El registro ya trae `updatedAt` real por ruta; el sitemap lo consumirá en Fase 3 |
| **A6** | `/en/nosotros` y `/en/helpdesk-it` con metadata en español | ✅ **Corregido** | Layouts eliminados; ambas pasan por el registro bilingüe |
| **A7** | Ninguna ruta se prerenderiza | ✅ **Corregido** | **115 páginas HTML en disco** (antes 0) |
| **A8** | Fuentes por `@import` | ⏳ Fase 5 | — |
| **A9** | `twitter:image` de 502 KB | 🟡 **Parcial** | `buildPageMetadata` ya apunta a `/og-image.png`; ver §5 |
| **A10** | `metadataBase` desde `NEXTAUTH_URL` | ✅ **Corregido** | Ahora `new URL(SITE_URL)` |
| **A11** | Sin analítica | ❌ No aplicado | Fuera del alcance del plan |
| **A12** | OG image rota para posts de Sanity | ⏳ Fase 2 | `absoluteUrl()` ya existe en `lib/seo.ts`, falta usarlo |
| **A13** | `/blog` sin metadata propia | ✅ **Corregido** | `app/[locale]/blog/page.tsx` |
| **M1** | `x-default` contradictorio en la cabecera `Link` | ⏳ Fase 5 | Requiere `alternateLinks: false` |
| **M2** | `/nosotros` y `katherine-gonzalez` con la misma metadata | ✅ **Corregido** | Entradas separadas en el registro |
| **M8** | Cifras contradictorias (500+ vs 50+, 5 vs 15 años) | ✅ **Corregido** | Ver §3 |
| **M9** | Etiquetas del hero en español dentro de `/en` | ✅ **Corregido** | `hero.counters.*` vía next-intl |
| **B1** | `meta keywords` global | ✅ **Corregido** | Eliminado del layout. Verificado: 0 en las 108 URLs |
| **B4** | Doble sufijo de marca en el title | ✅ **Corregido** | Eliminado `title.template` |
| **B11** | `x-pathname` expuesto en la respuesta | ✅ **Corregido** | `middleware.ts` |

---

## 2. Antes / después medido

Ambas columnas provienen de `next build` + rastreo del HTML servido con `scripts/seo-check.mjs`.

| Métrica | Antes (`76d7b5e`) | Después (`2eb08b7`) |
|---|---:|---:|
| Titles únicos en ES (55 rutas) | **3** | **54** |
| Descriptions únicas en ES | **3** | **54** |
| URLs con `<meta name="keywords">` | 110 | **0** |
| URLs `/en` con `<html lang="es">` | 55 | **0** |
| Rutas con canonical propio | 55 (ya correcto) | 108 |
| Páginas prerenderizadas a HTML | **0** | **115** |
| Rutas en `prerender-manifest.json` | 2 | **116** |
| Cifras del hero en el HTML | `0+`, `0%`, `0+` | `50+`, `98%`, `15+` |
| Rutas con JSON-LD | 4 (solo posts) | 4 (Fase 2 pendiente) |
| Soft-404 (HTTP 200 en slug inexistente) | 4 | 4 (Fase 3 pendiente) |

### First Load JS (`next build`)

| Ruta | Antes | Después |
|---|---:|---:|
| Base compartida | 87.7 kB | 87.7 kB |
| `/[locale]` (home) | 167 kB | 167 kB |
| `/[locale]/servicios/optimizacion-procesos/bpm-empresarial` | 165 kB | 165 kB |
| `/[locale]/nosotros` | 173 kB | 173 kB |

Sin cambio, y es lo esperado: la división server/client no reduce el bundle porque
`PageClient.tsx` sigue siendo el mismo árbol cliente. La reducción de peso es
objetivo de la Fase 5.

### Verificación end-to-end

```
node scripts/seo-check.mjs --port 3141 --external

checks superados: 1299   ·   hallazgos: 6
nota: lib/seo/jsonld.ts no existe → checks de JSON-LD omitidos (Fase 2)

▸ Fase 3 — 6 hallazgo(s)
   ✖ /es/servicios/optimizacion-procesos/slug-inexistente-xyz  HTTP 200, se esperaba 404
   ✖ /es/servicios/sistemas-calidad/slug-inexistente-xyz       HTTP 200, se esperaba 404
   ✖ /es/industrias/slug-inexistente-xyz                       HTTP 200, se esperaba 404
   ✖ /es/recursos/slug-inexistente-xyz                          HTTP 200, se esperaba 404
   ✖ /robots.txt                                                sigue bloqueando /_next/
   ✖ /sitemap.xml                                               incluye ruta noindex: /casos-exito
```

**0 hallazgos de Fase 1b y 0 de Fase 4.** Los 6 restantes son exactamente el
alcance de la Fase 3.

---

## 3. Cifras: qué se cambió y qué no

Cifras oficiales confirmadas: **15+ años**, **50+ proyectos**, **98% satisfacción**.

### Corregidas (se refieren a la empresa como un todo)

| Archivo | Antes | Después |
|---|---|---|
| `app/[locale]/PageClient.tsx:441` | `number: 500` | `number: 50` |
| `app/[locale]/nosotros/PageClient.tsx:859-860` | "más de 5 años" / "over 5 years" | "más de 15 años" / "over 15 years" |
| `lib/seo/routes.ts` → `/nosotros` | sin cifra | "Más de 15 años" (ES y EN) |
| `components/servicios/HeroReveal.tsx:353` | `'500+'` | `'50+'` (código muerto; se elimina en Fase 5) |

`98` y `15` en la home ya eran correctos y no se tocaron.

### Deliberadamente NO tocadas (otro contexto)

| Archivo | Mención | Por qué se deja |
|---|---|---|
| `industrias/manufactura-logistica/PageClient.tsx:289` | "500+ empleados" | Tamaño de planta del cliente |
| `nosotros/PageClient.tsx:403` | "de 20 hasta 500+ empleados" | Tamaño de empresa cliente |
| `consultoria-estrategica/diseno-organizacional/PageClient.tsx:447` | "500+" | Tramo de tamaño organizacional |
| `optimizacion-procesos/bpm-empresarial/PageClient.tsx:854` | "3 países • 500+ empleados" | Caso de éxito de un cliente |
| `sistemas-calidad/auditoria-calidad/PageClient.tsx:473` | "500+" | Duración de auditoría por tamaño |
| `lib/calculators/madurez-digital-data.ts:66` + `messages/*.json:479` | `"500+"` | Opción de tamaño en la calculadora |
| `gestion-proyectos/PageClient.tsx:255,309` | "mínimo 5 años" | Experiencia de **PMs individuales** |
| `consultoria-estrategica/**` | "3-5 años", "5-10 años" | Horizonte de planes estratégicos |
| `desarrollo-tecnologia/consultoria-tecnologica/PageClient.tsx` | "TCO 5 años" | Ventana de análisis financiero |
| `salud-farmaceutica/PageClient.tsx:720` | "últimos 5 años" | Historia de una clínica cliente |
| `transformacion-digital/change-management/PageClient.tsx:1073` | "hace 5 años" | Antecedente de un cliente |
| `desarrollo-tecnologia/desarrollo-software/PageClient.tsx:210` | "sistema antiguo (15+ años)" | Edad de un sistema legacy |

---

## 4. `TODO_EDWIN`

### 4.1 Años de la práctica bancaria y tech — pendiente de Katherine

Según tu instrucción, las dejo intactas y las marco para confirmación. Si la
empresa tiene 15 años, decir "más de 10" en banca es defendible (la práctica
bancaria puede ser más joven que la empresa), pero conviene confirmarlo:

| Archivo | Línea | Texto |
|---|---:|---|
| `industrias/banca-servicios-financieros/PageClient.tsx` | 335 | "Experiencia específica de 10+ años en bancos, cooperativas y aseguradoras" |
| `industrias/banca-servicios-financieros/PageClient.tsx` | 454 | "Alternative tiene más de 10 años ejecutando proyectos en instituciones financieras" |
| `industrias/banca-servicios-financieros/PageClient.tsx` | 597 | idem (repetido en otra sección) |
| `industrias/banca-servicios-financieros/gestion-proyectos-bancarios/PageClient.tsx` | 247 | `{ label: 'Experiencia Banca', value: '10+ años' }` |
| `industrias/tecnologia-telecomunicaciones/PageClient.tsx` | 230 | "10+ años gestionando proyectos tech complejos" |
| `lib/seo/routes.ts` | banca | "Más de 10 años ejecutando proyectos en instituciones financieras" |
| `lib/seo/routes.ts` | tech | "10+ años en proyectos tech con metodologías ágiles" |

**Decisión necesaria:** ¿son 10 o 15? Si cambian, hay que tocar las 5 primeras
(copy visible) **y** las 2 del registro.

### 4.2 Cinco H1 hardcodeados en español que se sirven también en `/en`

Sin resolver: es copy visible, fuera del alcance acordado.

`industrias/energia-utilities` · `industrias/retail-comercio` ·
`industrias/servicios-profesionales` · `industrias/tecnologia-telecomunicaciones` ·
`helpdesk-it`

La metadata EN de esas rutas ya es correcta; el `<h1>` y el hero siguen en español.

### 4.3 `certificacion-iso` — alcance real de la página

El title del prompt mencionaba ISO 9001, 14001, 27001 y 45001, pero la página
solo cubre ISO 9001. Title aplicado: `Certificación ISO 9001 en Panamá | De Cero
al Certificado`. Si Alternative presta servicio sobre las otras tres normas, hay
que ampliar el contenido antes de prometerlas en el title.

### 4.4 Otros pendientes ya conocidos

- `NEXTAUTH_URL` en Vercel (ya no afecta al `metadataBase`, pero conviene revisar).
- `NEXT_OUTPUT_MODE` en Vercel: confirmar que no es `export` antes de la Fase 5.
- Dirección postal, URL de LinkedIn y `sameAs` de la empresa para el
  `ProfessionalService` de la Fase 2.
- Imagen OG del blog: `consulting-session.webp` es 1066×1600 (vertical).

---

## 5. Desviaciones respecto al prompt

1. **`og:image` — precedencia no resuelta.** `buildPageMetadata` declara
   `/og-image.png` como pedía el punto 1.2, pero `app/[locale]/opengraph-image.tsx`
   **tiene precedencia** sobre `openGraph.images` (medido en el audit: el
   `og:image` servido es la ruta generada, no el archivo). Hoy conviven una
   convención de archivo que gana y una declaración que no se usa. La Fase 5 debe
   decidir cuál se queda: o se borra `opengraph-image.tsx`, o se quita `images` de
   `buildPageMetadata`. `twitter:image` sí toma `/og-image.png` (ahí no hay
   convención de archivo), así que A9 queda resuelto para Twitter.

2. **Longitud de dos titles.** `sistemas-calidad` EN (47) y
   `digitalizacion-procesos` ES (49) quedan bajo el objetivo de 50. Son los textos
   aprobados de forma explícita. `validate-routes.mjs` los reporta como aviso, no
   error: por encima de 60 hay truncamiento real en SERP, por debajo de 50 no hay
   perjuicio.

3. **Sin `JsonLd` en las páginas generadas.** La plantilla del punto 1.3 incluía
   `<JsonLd data={buildPageJsonLd(...)} />`, pero `lib/seo/jsonld.ts` es Fase 2 y
   aún no existe: importarlo rompería el build. Las 54 páginas quedan listas para
   añadir esa línea.

4. **Ruta a `<html lang>`.** No se usaron route groups. Se eliminó `app/layout.tsx`
   y `app/[locale]/layout.tsx` pasó a ser root layout, con `app/studio/layout.tsx`
   para la rama fuera de `[locale]`. Los route groups del prompt no habrían
   funcionado: `app/(site)/layout.tsx` no tiene acceso a `params.locale`.

5. **Conteo de rutas.** El audit decía 57 rutas ES; el árbol real tiene **55**
   (54 en el registro tras excluir `business-consultants`). El audit contó 2 de más.

---

## 6. Incidencia durante el build

Tras eliminar `app/layout.tsx`, el primer `next build` falló:

```
.next/types/app/layout.ts:2:24
Type error: Cannot find module '../../../app/layout.js'
```

No era un fallo del código (`✓ Compiled successfully`), sino un artefacto obsoleto:
`.next/types/` conservaba el validador de tipos del layout eliminado, y
`tsconfig.json` incluye `.next/types/**/*.ts`. Se resolvió borrando `.next`.

**Te pasará igual la primera vez que compiles con un `.next` caliente.** Basta con
`rm -rf .next` (o `Remove-Item -Recurse -Force .next`) antes del primer build.

Nota adicional: Next añade automáticamente el `distDir` a `include` en
`tsconfig.json` cuando se usa `NEXT_DIST_DIR`. Ese cambio se revirtió.

---

## 7. Comandos para verificar en producción tras el deploy

```bash
# 1. Titles únicos: estas dos URLs devolvían el MISMO title
curl -s https://grupoalternative.com/es | grep -o '<title>[^<]*</title>'
curl -s https://grupoalternative.com/es/contacto | grep -o '<title>[^<]*</title>'

# 2. lang correcto en la sección inglesa
curl -s https://grupoalternative.com/en/nosotros | grep -o '<html lang="[^"]*"'

# 3. keywords eliminadas (debe devolver 0)
curl -s https://grupoalternative.com/es/servicios | grep -c '<meta name="keywords"'

# 4. Contadores del hero (debe mostrar 50, 98 y 15, nunca 0)
curl -s https://grupoalternative.com/es | grep -oE '>[0-9]+<!-- -->[+%]'

# 5. Canonical por página
curl -s https://grupoalternative.com/es/servicios/sistemas-calidad/certificacion-iso \
  | grep -o '<link rel="canonical" href="[^"]*"'

# 6. Redirecciones de WordPress (pendientes de Fase 3; hoy 2 de estas fallan)
for u in /consultores-de-empresas /blog-grupo-alternative /ia-en-gestion-de-proyectos \
         /service/desarrollo-software /beneficios-de-la-consultoria-en-ti; do
  printf '%-45s ' "$u"
  curl -sI "https://grupoalternative.com$u" | grep -iE '^(HTTP|location)' | tr '\n' ' '
  echo
done

# 7. JSON-LD en una página de servicio (Fase 2, aún vacío)
curl -s https://grupoalternative.com/es/servicios/optimizacion-procesos/bpm-empresarial \
  | grep -c 'application/ld+json'
```

Verificación local completa:

```bash
rm -rf .next && npx next build
node scripts/validate-routes.mjs
npx next start -p 3141 &
node scripts/seo-check.mjs --port 3141 --external
```

---

## 8. Siguiente paso

Fase 2 (datos estructurados) y Fase 3 (robots, sitemap, soft-404, redirecciones).
Los 6 hallazgos abiertos de `seo-check` son exactamente el alcance de la Fase 3.

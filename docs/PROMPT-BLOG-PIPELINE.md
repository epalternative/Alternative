# Prompt: pipeline editorial del blog (bloque 3)

Rama `content/blog-pipeline` desde `main`. Un commit por fase.

## Reglas

- **Solo aditivo.** No modifiques nada en `app/`, `components/`, `lib/seo/`, `sanity/`, `middleware.ts`, `next.config.js` ni `vercel.json`. Todo lo nuevo vive en `content/`, `.claude/commands/`, `scripts/`, `.github/workflows/` y `docs/`. La única excepción: añadir 3 líneas al `CLAUDE.md` raíz (Fase 1) y scripts nuevos en `package.json`.
- **Nunca publiques en Sanity.** El pipeline crea **borradores** (`drafts.*`); publicar es un clic humano en el Studio.
- **Nunca inventes cifras, clientes ni casos.** Las únicas cifras permitidas en un artículo son las que ya existen en el sitio (lista blanca en `content/CLAUDE.md`) o las que vengan de una fuente externa citada con URL.
- Si algo del schema de Sanity no encaja con lo que asumo aquí, adapta el pipeline al schema real y anótalo en el reporte. No cambies el schema.

---

## FASE 0 — Reconocimiento (no escribas nada todavía)

Lee y resume en `docs/BLOG-PIPELINE.md` (sección "Cómo está montado el blog"):

1. `sanity/schemas/` — el documento del post: nombre exacto del tipo, campos (title, slug, excerpt/description, body y su tipo — `blockContent`?—, author y si es referencia, publishedAt, categories, heroImage, cualquier campo SEO). Tipo y campos del documento `author` si existe, y si ya hay un documento de Katherine González (consulta con el cliente de `sanity/lib/client.ts`; el dataset es público de lectura).
2. `lib/blog.ts` — cómo se obtienen los posts (GROQ), cómo funciona el fallback estático, qué campos consume `blog/[slug]/page.tsx` para metadata y JSON-LD, y si hay `revalidate`/ISR (esto define cuánto tarda en aparecer un post publicado).
3. Categorías existentes en Sanity y en el fallback estático (slugs exactos).
4. Cómo se referencian las imágenes (asset de Sanity vs `/public`).

Entrega una tabla **campo del frontmatter → campo de Sanity** antes de seguir. Si falta algo imprescindible (p. ej. no existe documento de autora), dilo como `TODO_EDWIN` y sigue con lo demás.

---

## FASE 1 — Guía editorial

### 1.1 `content/CLAUDE.md`

Guía que leerán los comandos. Contenido:

- **Marca y voz:** "Alternative" / "Grupo Alternative". Autora: Katherine González (CEO, PMP®, ISO 9001 Lead Auditor, MBA, Six Sigma Green Belt). Primera persona del plural o primera del singular cuando cuenta experiencia propia en banca. Español de Panamá, técnico, directo. Prohibidas las frases de relleno: "en el dinámico mundo empresarial", "en la era digital", "es fundamental", "cabe destacar", "sin duda". Nada de listas genéricas sin dato local.
- **Lector:** gerente de procesos, calidad, cumplimiento, PMO o TI de un banco, cooperativa, aseguradora o empresa mediana panameña. Ya sabe qué es ISO o BPM; quiere saber cómo se hace aquí, cuánto cuesta y qué le va a pedir el regulador.
- **SEO por artículo:** title 50–60 caracteres con la keyword al inicio (y "Panamá" cuando aplique); description 140–160; un H1; H2/H3 con variantes semánticas; 1.200–1.800 palabras; keyword en el primer párrafo, en un H2 y en la conclusión; nunca más de una vez por cada 150 palabras.
- **E-E-A-T obligatorio:** cada artículo incluye (a) al menos una referencia concreta al contexto panameño (SBP, MICI, MINSA, MITRADEL, CSS, ACODECO, DGI, Gaceta Oficial, un gremio) verificada con URL; (b) al menos un párrafo de experiencia propia ("en los bancos donde he trabajado…", sin nombrar la entidad); (c) enlaces: 1 a la página de servicio pilar, 2 a artículos o páginas relacionadas del sitio (slugs sacados de `lib/seo/routes.ts` y del listado de posts), 1–2 externos a fuente primaria (ISO.org, PMI, SBP, Gaceta).
- **Normativa:** todo Acuerdo, ley o resolución citado se verifica con WebFetch en la fuente oficial antes de citarlo; número, año y materia exactos; si no se puede verificar, no se cita. Esto no es negociable.
- **Lista blanca de cifras propias:** 15+ años, 50+ proyectos, 98% satisfacción, 4–8 meses para ISO 9001, 85% aprueba en primera auditoría, 30–50% reducción de costos con LSS, 60–80% reducción de tiempos con RPA, 40–60% con digitalización, PMs con 5–15 años. Cualquier otra cifra sobre Alternative está prohibida.
- **Estructura fija:** intro con el problema (3–4 líneas, sin definiciones de manual) → contexto Panamá → desarrollo en H2 → una tabla o checklist → errores comunes → conclusión con CTA a `/es/contacto` ("diagnóstico gratuito de 15 minutos").
- **Formato del archivo:** Markdown con frontmatter YAML (campos definidos en Fase 2). Sin HTML embebido. Imágenes: solo la `heroImage` (ver 2.3); nada de imágenes dentro del cuerpo por ahora.

### 1.2 `CLAUDE.md` raíz — añade al final, sin tocar el resto:

```
## Blog
- Para investigar o escribir artículos lee `content/CLAUDE.md` y usa `/investigar` y `/articulo`.
- Los enlaces internos salen de `lib/seo/routes.ts`; nunca inventes rutas.
- Nunca publiques en Sanity desde código: el pipeline solo crea borradores.
```

### 1.3 `content/calendario.md`

Tabla con las 12 semanas: semana, cluster, título de trabajo, keyword, tipo (pillar/cluster), estado (`pendiente` / `brief` / `borrador` / `PR` / `publicado`), slug. Semillas:

| Sem | Cluster | Título de trabajo | Keyword |
|---|---|---|---|
| 1 | ISO | Certificación ISO 9001 en Panamá: costos, plazos y pasos | certificación ISO 9001 Panamá |
| 2 | BPM | 7 señales de que tu empresa necesita optimizar procesos | optimización de procesos Panamá |
| 3 | Riesgo | Gobierno corporativo bancario: qué exige el Acuerdo 5-2011 | gobierno corporativo Panamá |
| 4 | PMO | Cómo implementar una PMO en 90 días | implementación PMO Panamá |
| 5 | ISO | Auditoría interna ISO 9001: checklist para certificar | auditoría interna ISO 9001 |
| 6 | BPM | BPMN 2.0: cómo mapear un proceso paso a paso | mapeo de procesos BPMN |
| 7 | Riesgo | Riesgo operativo en banca: guía práctica del Acuerdo 11-2018 | riesgo operativo banca Panamá |
| 8 | PMO | PMO ágil o tradicional: cómo elegir | metodologías ágiles Panamá |
| 9 | Transf. digital | Digitalizar sin arreglar procesos: el error más caro | transformación digital Panamá |
| 10 | BPM | Lean Six Sigma: cómo reducir costos operativos | Lean Six Sigma Panamá |
| 11 | Riesgo | Riesgo de TI en banca: qué pide el Acuerdo 3-2012 | riesgo tecnológico banca Panamá |
| 12 | ISO | ISO 9001 en cooperativas: qué cambia frente a un banco | ISO 9001 cooperativas Panamá |

No confirmes ningún Acuerdo del calendario sin verificarlo cuando toque escribirlo.

---

## FASE 2 — Comandos

### 2.1 `.claude/commands/investigar.md` → `/investigar <keyword> [slug]`

Pasos que debe ejecutar:

1. WebSearch de la keyword tal cual y de 2 variantes (con "Panamá", con "cómo"/"cuánto cuesta"/"requisitos"). Anota las 10 primeras URLs distintas.
2. WebFetch de los 5 primeros resultados relevantes (descarta foros y agregadores). De cada uno: título, H2s, longitud aproximada, qué preguntas responde, si menciona Panamá.
3. Preguntas relacionadas / "People also ask" que aparezcan en los resultados.
4. **Huecos:** qué no cubre ningún competidor (típicamente: normativa panameña, costos locales, plazos reales, ejemplo de banca).
5. Normativa candidata a citar, con la URL oficial que habrá que verificar en `/articulo`.
6. Enlaces internos propuestos: leer `lib/seo/routes.ts` y la lista de posts (GROQ + fallback) y elegir 1 pilar + 2 relacionados que existan.
7. Propuesta: title (≤60), description (≤160), keyword principal, 3 secundarias, outline H2/H3, tabla o checklist sugerida.

Salida: `content/briefs/<slug>.md` (slug = kebab-case de la keyword si no se pasa). Actualiza la fila del calendario a `brief`. **No escribe el artículo.**

### 2.2 `.claude/commands/articulo.md` → `/articulo <slug>`

1. Lee `content/CLAUDE.md` y `content/briefs/<slug>.md`. Si no hay brief, detente y pide correr `/investigar`.
2. Verifica cada norma del brief con WebFetch antes de citarla (regla de `content/CLAUDE.md`).
3. Escribe `content/posts/<slug>.md` con este frontmatter (ajústalo a la tabla de mapeo de la Fase 0):

```yaml
---
title: ""              # 50-60
metaTitle: ""          # opcional si el schema lo tiene; si no, = title
description: ""        # 140-160 → excerpt/metaDescription en Sanity
slug: ""
locale: es
author: katherine-gonzalez     # slug/ref del documento author en Sanity
category: ""           # slug existente en Sanity
keyword: ""
secondaryKeywords: []
publishedAt: YYYY-MM-DD        # fecha prevista; el push la respeta
heroImage: ""          # ruta en content/images/ o vacío
heroImageAlt: ""
serviceLink: ""        # ruta de lib/seo/routes.ts
relatedLinks: []       # 2 rutas o slugs de posts existentes
sources: []            # URLs verificadas
status: draft
---
```

4. Cuerpo de 1.200–1.800 palabras siguiendo la estructura fija. Un solo H1 (= title). Enlaces internos absolutos con locale (`/es/...`).
5. Ejecuta `npm run blog:lint -- content/posts/<slug>.md` (Fase 3) y corrige hasta que pase.
6. Crea rama `blog/<slug>` desde `main`, commit `blog: <slug>`, push. Si `gh` está disponible, abre PR con título `Blog: <title>` y cuerpo = brief resumido + checklist de revisión (normativa verificada, cifras en lista blanca, enlaces resuelven). Si no hay `gh`, imprime la URL de "compare" para abrir el PR a mano.
7. Actualiza la fila del calendario a `PR`.

---

## FASE 3 — Validación y push a Sanity

### 3.1 `scripts/blog-lint.mjs` (`npm run blog:lint -- <archivo>`)

Falla con código ≠ 0 si:
- title fuera de 50–60 o description fuera de 140–160;
- slug ya existe en Sanity (consulta GROQ) o en el fallback estático;
- `category` o `author` no existen en Sanity;
- algún enlace interno no está en `lib/seo/routes.ts` ni es un post existente;
- aparece alguna frase prohibida de `content/CLAUDE.md`;
- aparece un porcentaje o cifra con "proyectos", "clientes", "años" o "ahorro" que no esté en la lista blanca y no tenga una URL en `sources` en el mismo párrafo (heurística: avisa, no falla, y lista cada caso);
- menos de 1.100 o más de 1.900 palabras;
- más de un H1;
- no hay enlace a `/es/contacto`.

### 3.2 `scripts/sanity-push-post.mjs` (`npm run blog:push -- <archivo> [--dry-run]`)

- Lee el Markdown, separa frontmatter y cuerpo.
- Convierte el cuerpo a Portable Text. Ruta recomendada: `marked` → HTML → `@sanity/block-tools` `htmlToBlocks` con el tipo de bloque **real del schema** (léelo en Fase 0) y `jsdom`. Si el schema tiene tipos custom (callouts, tablas), mapéalos si es trivial; si no, degrada a párrafos y anótalo.
- Si hay `heroImage`, sube el archivo como asset (`client.assets.upload('image', …)`) y referencia el asset.
- Crea o reemplaza el documento **`drafts.post-<slug>`** con `createOrReplace`. Idempotente: relanzar el script actualiza el mismo borrador.
- Token: `SANITY_API_WRITE_TOKEN` desde `.env.local` o variable de entorno. Si falta, aborta con mensaje claro. **Nunca lo escribas en logs ni en el repo.**
- `--dry-run`: imprime el documento JSON y no toca Sanity.
- Tras el push, lee el borrador de vuelta y verifica que `body` tiene bloques y que `slug.current` coincide. Imprime la URL del documento en el Studio.

### 3.3 `.github/workflows/blog-publish.yml`

- Trigger: `push` a `main` con cambios en `content/posts/**`.
- Pasos: checkout, `npm ci`, `node scripts/sanity-push-post.mjs` para cada archivo cambiado (usa `git diff --name-only` contra el commit anterior).
- Secrets necesarios: `SANITY_API_WRITE_TOKEN`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`. **No los crees tú**; deja en el reporte la lista exacta para que Edwin los configure en GitHub → Settings → Secrets.
- Añade `concurrency` para que dos merges seguidos no se pisen.

---

## FASE 4 — Prueba end-to-end

1. `/investigar "certificación ISO 9001 Panamá" certificacion-iso-9001-panama-costos-plazos`
2. `/articulo certificacion-iso-9001-panama-costos-plazos`
3. `npm run blog:lint` sobre el resultado hasta que pase.
4. `npm run blog:push -- content/posts/certificacion-iso-9001-panama-costos-plazos.md --dry-run` y pega en el reporte los primeros 30 bloques del JSON.
5. Si `SANITY_API_WRITE_TOKEN` existe en `.env.local`, haz el push real del **borrador** y reporta la URL del Studio. Si no existe, detente aquí y márcalo.
6. **No** hagas merge del PR del artículo; Edwin lo revisa.

---

## FASE 5 — Reporte

`docs/BLOG-PIPELINE.md` con:

1. Cómo está montado el blog (Fase 0) y la tabla de mapeo frontmatter → Sanity.
2. Manual de uso en 6 líneas para Edwin (lunes: `/investigar`, `/articulo`, revisar PR, merge) y en 3 líneas para Katherine (abrir Studio → Borradores → leer → Publicar).
3. Cuánto tarda un post publicado en aparecer en el sitio (según el `revalidate` que encontraste) y qué hacer si no aparece.
4. Secrets y variables que faltan, con dónde configurarlos.
5. `TODO_EDWIN` y decisiones abiertas.
6. Qué **no** cubre el pipeline todavía (imágenes en el cuerpo, versión EN de los posts, cron automático) y qué haría falta para cada uno.

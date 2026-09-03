# Pipeline editorial del blog

**Rama:** `content/blog-pipeline` · **Base:** `main`
**Estado:** Fase 0 (reconocimiento) completada. Fases 1-5 pendientes de tu visto bueno.

---

## 1. Cómo está montado el blog

### 1.1 Esquema de Sanity

Proyecto `5s1f6jl3`, dataset `production`, **público de lectura** (verificado: las consultas GROQ responden sin token).

`sanity/schemaTypes/post.ts` — tipo de documento **`post`**:

| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| `slug` | `slug` | ✅ | `options.source: 'title'`, máx. 96. Se lee como `slug.current` |
| `title` / `titleEn` | `string` | ES ✅ | |
| `excerpt` / `excerptEn` | `text` | — | |
| `metaTitle` / `metaTitleEn` | `string` | — | Si falta, `lib/sanity-blog.ts` cae a `title` |
| `metaDescription` / `metaDescriptionEn` | `text` | — | Si falta, cae a `excerpt` |
| `heroImage` | `image` (hotspot) | — | Asset de Sanity, no ruta de `/public` |
| `heroImageAlt` / `heroImageAltEn` | `string` | — | |
| `author` | `reference` → `author` | ✅ | |
| `category` | `reference` → `category` | ✅ | |
| `publishedAt` | `datetime` | ✅ | ISO con hora, no solo fecha |
| `readingTimeMinutes` | `number` | — | |
| `keywords` | `array<string>` | — | Se leen pero **no se emiten** en la metadata |
| `body` / `bodyEn` | `blockContent` | — | |

**`blockContent`** (`sanity/schemaTypes/blockContent.ts`) es un `array` de:
- `block` con estilos `normal`, `h2`, `h3`, `blockquote`; listas `bullet` y `number`; decoradores `strong` y `em`; anotación `link` con campo `href` (tipo `url`).
- `image` con hotspot.

**No hay H1 en `blockContent`**: el H1 lo pone el layout desde `title`. El cuerpo empieza en H2, que es justo lo que pide la guía editorial.

**No hay tipos custom** (callouts, tablas). Una tabla Markdown **no tiene destino** en este esquema — hay que degradarla a lista o párrafos. Lo anoto abajo como decisión abierta.

### 1.2 Documentos que ya existen

**Autora — existe, no hace falta crearla:**

```
_id:            d1e1d740-38b3-483f-9558-a71c45c369f2
name:           Katherine González
role:           CEO, Grupo Alternative
certifications: PMP® | ISO 9001 Lead Auditor | MBA
image:          sí
link:           null   ← ver TODO_EDWIN 1
```

**Categorías — las 6 del esquema existen:**

| `slug` | `label` | `labelEn` | `_id` |
|---|---|---|---|
| `calidad` | Sistema de Calidad | Quality Systems | `27452a3d-…` |
| `optimizacion-procesos` | Optimización de Procesos | Process Optimization | `8bdf4153-…` |
| `proyectos` | Gestión de Proyectos | Project Management | `997284bd-…` |
| `tecnologia` | Desarrollo & Tecnología | Development & Technology | `dbf9e855-…` |
| `estrategia` | Consultoría Estratégica | Strategic Consulting | `ed70b632-…` |
| `transformacion-digital` | Transformación Digital | Digital Transformation | `e876872f-…` |

Ojo: `category.slug` es un **`string` con lista cerrada**, no un tipo `slug`. La consulta lo lee como `"category": category->{"category": slug, …}`.

**Posts publicados — 3:**

| Slug | Categoría | body / bodyEn | Hero |
|---|---|---|---|
| `planificacion-estrategica-2026-checklist-cfos` | proyectos | 108 / 108 | sí |
| `que-es-bpm-business-process-management-guia-completa` | optimizacion-procesos | 83 / 83 | sí |
| `navegando-el-futuro-de-la-transformacion` | transformacion-digital | 91 / 91 | sí |

Los tres tienen `metaTitle`, `metaDescription`, `excerpt`, 3 `keywords`, `readingTimeMinutes` y alt de imagen. El esquema se está usando completo.

### 1.3 Obtención de datos y fallback

`lib/blog.ts` decide en tiempo de ejecución:

```ts
const SANITY_ENABLED =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET;
```

Si están definidas, consulta Sanity; si la consulta falla o devuelve vacío, cae al array estático `BLOG_POSTS`. El fallback tiene 2 posts: `que-es-bpm-…` y `caso-exito-banco-regional-40-menos-tiempos-bpm`.

`getPostBySlugAsync` hace el fallback **por slug**, así que un post que solo está en el estático sigue resolviendo. `getAllSlugsAsync` y `getAllPostsAsync`, en cambio, devuelven **solo la lista de Sanity** si no está vacía.

### 1.4 Campos que consume la página del post

`app/[locale]/blog/[slug]/page.tsx`:

- **Metadata:** `metaTitle`/`metaTitleEn`, `metaDescription`/`metaDescriptionEn`, `heroImage` (con `absoluteUrl()`, fallback a `/og-image.png`), `heroImageAlt`/`En`, `publishedAt`, `author.name`.
- **JSON-LD `BlogPosting`:** lo anterior más `categoryLabel`/`En` → `articleSection`, `body`/`bodyEn` → `wordCount`, `keywords`, `updatedAt` (`_updatedAt`) → `dateModified`, `author.link` → `author.url`.
- **Cuerpo:** `body`/`bodyEn` vía `BlogPortableText`.

---

## 2. Tabla de mapeo: frontmatter → Sanity

Ajustada al esquema real. Los campos del prompt que no encajan van marcados.

| Frontmatter | Campo en Sanity | Tipo | Transformación |
|---|---|---|---|
| `title` | `title` | `string` | directo |
| `metaTitle` | `metaTitle` | `string` | si vacío → `title` |
| `description` | `metaDescription` **y** `excerpt` | `text` | **a los dos**: `metaDescription` alimenta la `<meta>`, `excerpt` se muestra en el índice del blog |
| `slug` | `slug` | `slug` | envolver: `{ _type: 'slug', current: <slug> }` |
| `locale: es` | — | — | **No existe campo de idioma.** El esquema es bilingüe por pares de campos (`title`/`titleEn`). Un post en ES rellena los campos base y deja los `*En` vacíos |
| `author: katherine-gonzalez` | `author` | `reference` | resolver a `{ _type:'reference', _ref:'d1e1d740-38b3-483f-9558-a71c45c369f2' }`. **El slug no sirve**: `author` no tiene campo slug, hay que resolver por `name` o usar el `_id` |
| `category` | `category` | `reference` | GROQ `*[_type=="category" && slug==$cat][0]._id` → `{_type:'reference',_ref:…}` |
| `keyword` + `secondaryKeywords` | `keywords` | `array<string>` | concatenar: `[keyword, ...secondaryKeywords]` |
| `publishedAt: YYYY-MM-DD` | `publishedAt` | `datetime` | **añadir hora**: `YYYY-MM-DDT12:00:00.000Z`. El campo es `datetime`, una fecha suelta lo rompe |
| `heroImage` | `heroImage` | `image` | subir con `client.assets.upload('image', …)` → `{_type:'image', asset:{_type:'reference',_ref:<assetId>}}` |
| `heroImageAlt` | `heroImageAlt` | `string` | directo |
| (cuerpo Markdown) | `body` | `blockContent` | `marked` → HTML → `htmlToBlocks` con el esquema de `blockContent` |
| `serviceLink`, `relatedLinks` | — | — | **No hay campo.** Van dentro del cuerpo como enlaces Markdown; el lint verifica que resuelvan |
| `sources` | — | — | **No hay campo.** Se usan solo para el lint y para citar en el cuerpo |
| `status: draft` | — | — | Se refleja en el `_id`: `drafts.post-<slug>` |
| — | `readingTimeMinutes` | `number` | **calcular**: `Math.ceil(palabras / 200)`. Los 3 posts existentes lo tienen |
| — | `titleEn`, `excerptEn`, `metaTitleEn`, `metaDescriptionEn`, `bodyEn`, `heroImageAltEn` | — | Se dejan vacíos. Ver "qué no cubre" |

### Ajustes al frontmatter del prompt

1. `author: katherine-gonzalez` no puede resolverse por slug — el tipo `author` no tiene ese campo. Propongo `author: "Katherine González"` y que el script resuelva por `name`, con el `_id` como fallback fijo.
2. `locale: es` no tiene destino. Lo dejo en el frontmatter como documentación, pero el script lo usa solo para decidir si escribe en los campos base o en los `*En`.
3. Falta `readingTimeMinutes`: lo calcula el script, no hace falta escribirlo a mano.

---

## 3. Hallazgo crítico: un post publicado NO aparece solo

**No existe `revalidate` ni ISR en ninguna parte del proyecto.** Verificado: `grep -rn "export const revalidate\|revalidateTag\|revalidatePath"` sobre `app/`, `lib/` y `sanity/` no devuelve nada. Los únicos `dynamic` son los de las cuatro rutas `/api`.

Como el sitio se prerenderiza por completo en el build (121 páginas), el efecto es:

| Acción en Sanity | Qué pasa en el sitio |
|---|---|
| Se crea un **borrador** (`drafts.*`) | Nada. Los borradores no salen en las consultas GROQ públicas |
| Katherine **publica** un post nuevo | Su URL directa **sí** responde (Next la genera on-demand, porque `dynamicParams` no está en `false`)… pero **no aparece en `/es/blog` ni en el `sitemap.xml`**, que son HTML estático del último build |
| Se **edita** un post ya publicado | La página sigue mostrando la versión del build. No se actualiza |

**En la práctica: hasta el siguiente despliegue, no se ve.**

Como el flujo previsto es *merge a `main` → GitHub Action empuja a Sanity → Vercel despliega*, en el caso normal funciona. Pero hay una **condición de carrera**: Vercel arranca el build con el mismo push que dispara la Action. Si el build de Vercel termina de leer Sanity antes de que la Action haya empujado el documento, el post no entra en ese build.

Y como el pipeline crea **borradores**, el post no está publicado hasta que Katherine le da al botón — que ocurre *después* del despliegue. Así que **siempre** hará falta un despliegue posterior a la publicación.

Tres salidas posibles, a decidir en la Fase 3:

1. **Webhook de Sanity → Deploy Hook de Vercel.** Publicar dispara un despliegue. Simple y sin tocar código.
2. **ISR:** `export const revalidate = 3600` en `blog/page.tsx` y `blog/[slug]/page.tsx`. El post aparece solo en ≤1 h. Contrapartida: esas rutas dejan de ser HTML puro.
3. **Revalidación on-demand:** endpoint `/api/revalidate` + webhook de Sanity. Lo más fino, lo más trabajo.

Mi recomendación es la 1: cero código, cero riesgo sobre lo ya verificado, y encaja con que publicar es un acto humano y puntual.

---

## 4. Colisión de slugs: dos posts se renderizan desde código

`app/[locale]/blog/[slug]/page.tsx` tiene un mapa `BLOG_SLUG_TO_CONTENT` con dos slugs cuyo cuerpo viene de **componentes React hardcodeados**, no de Sanity:

```
que-es-bpm-business-process-management-guia-completa  → BpmArticleContent
caso-exito-banco-regional-40-menos-tiempos-bpm        → BancoRegionalCaseContent
```

La lógica comprueba el mapa **antes** de mirar el `body` de Sanity. Consecuencia: `que-es-bpm-…` existe en Sanity con 83 bloques de contenido **que nunca se muestran**; se sirve el componente.

Para el pipeline significa dos cosas:
- Un post nuevo **no puede** usar esos dos slugs. El lint debe rechazarlos.
- Es una inconsistencia preexistente que conviene resolver aparte (o se borra el mapa y se confía en Sanity, o se borra el post de Sanity).

---

## 5. Imágenes

| Origen | Cómo se referencia |
|---|---|
| Sanity | Asset. `lib/sanity-blog.ts` lo convierte con `urlFor()` → `https://cdn.sanity.io/images/5s1f6jl3/production/…` |
| Fallback estático | Ruta de `/public`, p. ej. `/images/consulting-session.webp` |

`absoluteUrl()` (`lib/seo.ts`) distingue ambos casos, así que OG y JSON-LD funcionan con cualquiera. `next.config.js` ya tiene `remotePatterns` para `cdn.sanity.io`.

El script de push subirá la imagen local como asset. **No hay que meter rutas de `/public` en el frontmatter** de posts que van a Sanity.

---

## 6. `TODO_EDWIN`

1. **`author.link` está en `null`** en el documento de Katherine. El JSON-LD del post construye `author.url` a partir de ese campo, así que hoy los posts de Sanity emiten un `author` **sin URL**. El fallback estático sí lo tiene (`/nosotros`). Arreglo: poner `link: "/nosotros/katherine-gonzalez"` en el Studio. Es un clic y mejora el E-E-A-T.
2. **Decidir cómo se refresca el sitio tras publicar** (§3). Sin esto el pipeline entrega borradores que nadie ve.
3. **Colisión de slugs** (§4): qué hacer con `que-es-bpm-…`, que existe duplicado en Sanity y como componente.
4. **`SANITY_API_WRITE_TOKEN`**: no existe `.env.local` en el repo. Hará falta para la Fase 3. Se crea en sanity.io/manage → API → Tokens, con permiso *Editor*.

---

## 7. Decisiones abiertas antes de la Fase 1

- **Tablas en los artículos.** La guía editorial pide "una tabla o checklist", pero `blockContent` no soporta tablas. Opciones: (a) restringir a checklists en listas; (b) degradar la tabla a lista con negritas; (c) añadir un tipo `table` al esquema — descartado, la regla dice no tocar el esquema. **Propongo (a)**, y que la guía editorial pida checklist en vez de tabla.
- **Posts en inglés.** El esquema es bilingüe por pares de campos, pero el pipeline solo generaría ES. Los `*En` quedarían vacíos y `lib/sanity-blog.ts` cae a los campos ES, así que `/en/blog/<slug>` mostraría el post **en español**. Hay que decidir si eso es aceptable de momento o si el pipeline debe generar también la versión EN.

---

*Fase 0 completada. Detenido a la espera de revisión, según lo acordado.*

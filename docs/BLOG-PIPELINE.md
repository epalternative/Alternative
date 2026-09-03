# Pipeline editorial del blog

**Rama:** `content/blog-pipeline` · **Base:** `main`
**Estado:** Fases 0 a 5 completadas y probadas end-to-end.

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
| `author: "Katherine González"` | `author` | `reference` | resolver por `name` a `{ _type:'reference', _ref:'d1e1d740-38b3-483f-9558-a71c45c369f2' }`. **El slug no sirve**: `author` no tiene campo slug, hay que resolver por `name` o usar el `_id` |
| `category` | `category` | `reference` | GROQ `*[_type=="category" && slug==$cat][0]._id` → `{_type:'reference',_ref:…}` |
| `keyword` + `secondaryKeywords` | `keywords` | `array<string>` | concatenar: `[keyword, ...secondaryKeywords]` |
| `publishedAt: YYYY-MM-DD` | `publishedAt` | `datetime` | **añadir hora fija**: `YYYY-MM-DDT08:00:00-05:00`. El campo es `datetime`, una fecha suelta lo rompe |
| `heroImage` | `heroImage` | `image` | subir con `client.assets.upload('image', …)` → `{_type:'image', asset:{_type:'reference',_ref:<assetId>}}` |
| `heroImageAlt` | `heroImageAlt` | `string` | directo |
| (cuerpo Markdown) | `body` | `blockContent` | `marked` → HTML → `htmlToBlocks` con el esquema de `blockContent` |
| `serviceLink`, `relatedLinks` | — | — | **No hay campo.** Van dentro del cuerpo como enlaces Markdown; el lint verifica que resuelvan |
| (enlaces del cuerpo) | `markDefs[].href` | `url` | **absolutizar**: el tipo `url` de Sanity exige URL absoluta. El Markdown los mantiene relativos y el push antepone `https://grupoalternative.com` |
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


---

## 8. Manual de uso

### Para Edwin — el lunes, 4 pasos

1. `/investigar "<keyword>" <slug>` → produce el brief en `content/briefs/`. Revísalo: los huecos detectados son el ángulo del artículo.
2. `/articulo <slug>` → escribe ES + EN, pasa el lint y abre el PR.
3. Revisa el PR con su checklist: normativa verificada, cifras en lista blanca, enlaces que resuelven, versión EN completa.
4. Merge. La GitHub Action empuja el borrador a Sanity automáticamente.

### Para Katherine — 3 pasos

1. Abre el Studio y ve a **Borradores**.
2. Lee el artículo. Si algo no suena a ti, edítalo ahí mismo.
3. Pulsa **Publicar**.

---

## 9. Cuándo aparece un post publicado en el sitio

**No aparece solo.** Ver §3: no hay `revalidate` ni ISR en el proyecto.

Tras pulsar *Publicar* en el Studio hace falta **un despliegue** para que el post entre en `/es/blog` y en el `sitemap.xml`.

### Configurar el refresco automático — pasos exactos

No se implementó nada en código, según lo acordado. Estos son los pasos para que publicar dispare un despliegue:

**1. Crear el Deploy Hook en Vercel**

- vercel.com → proyecto **alternative** → *Settings* → *Git* → **Deploy Hooks**
- Nombre: `sanity-publish`
- Rama: `main`
- *Create Hook* → copia la URL, con el formato
  `https://api.vercel.com/v1/integrations/deploy/prj_xxx/yyy`

**2. Crear el webhook en Sanity**

- sanity.io/manage → proyecto **5s1f6jl3** → *API* → **Webhooks** → *Create webhook*
- **Name:** `Publicar post → desplegar sitio`
- **URL:** la del Deploy Hook del paso 1
- **Dataset:** `production`
- **Trigger on:** `Create`, `Update`, `Delete`
- **Filter:** `_type == "post"`
- **Projection:** vacío
- **HTTP method:** `POST`
- **Secret:** vacío (el Deploy Hook ya es una URL secreta)
- *Save*

**3. Comprobarlo**

Publica cualquier post en el Studio y mira si aparece un despliegue nuevo en Vercel en menos de un minuto.

> El filtro `_type == "post"` es importante: sin él, editar una categoría o la ficha de la autora también dispararía un despliegue.

### Si un post publicado no aparece

1. ¿Hubo despliegue en Vercel después de publicar? Si no, revisa el webhook.
2. ¿El documento está publicado o sigue en borrador? Un `drafts.*` no sale en las consultas públicas.
3. ¿Tiene `slug`, `title`, `author`, `category` y `publishedAt`? Los cuatro últimos son obligatorios en el esquema.
4. Comprueba que la consulta lo devuelve:
   ```bash
   curl -s "https://5s1f6jl3.api.sanity.io/v2024-01-01/data/query/production?query=*%5B_type%3D%3D%22post%22%5D.slug.current"
   ```

---

## 10. Secrets y variables que faltan

### GitHub → Settings → Secrets and variables → Actions

| Secret | Valor | Para qué |
|---|---|---|
| `SANITY_API_WRITE_TOKEN` | Token con permiso *Editor* | El workflow escribe los borradores |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `5s1f6jl3` | |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | |

El token se crea en sanity.io/manage → *API* → *Tokens* → *Add API token*, con permiso **Editor** (no *Deploy Studio*, no *Viewer*).

### En local

`.env.local` (ya creado, y está en `.gitignore`) con esas mismas tres variables.

> ⚠️ **Rota el token actual.** El que hay en `.env.local` quedó escrito en la conversación de trabajo, y además llegó a estar pegado en `.env.example`, que sí se versiona. Se sacó de ahí antes de commitear —se verificó que nunca entró al historial de git— pero conviene crear uno nuevo y borrar el viejo en sanity.io/manage.

---

## 11. Prueba end-to-end (Fase 4)

Ejecutada con la keyword `certificación ISO 9001 Panamá`.

| Paso | Resultado |
|---|---|
| `/investigar` | `content/briefs/certificacion-iso-9001-panama-costos-plazos.md`. 5 competidores analizados; ninguno menciona a la DGNTI ni al CNA |
| `/articulo` (ES) | 1.374 palabras · title 56 · description 151 · **lint en verde** |
| `/articulo` (EN) | 1.375 palabras · title 60 · description 154 · **lint en verde** |
| `blog:push --dry-run` | 51 bloques; detectó un bug real (ver abajo) |
| `blog:push` real | `drafts.post-certificacion-iso-9001-panama-costos-plazos`, body 51 · bodyEn 51 |
| Idempotencia | Segunda ejecución actualiza el mismo borrador |
| Aislamiento | El dataset público sigue devolviendo 3 posts: el borrador no se ve |

### Conversión a Portable Text — verificada

```
bloques totales : 51
estilos         : {"normal": 43, "h2": 8}
items de lista  : {"number": 8}
spans en strong : 18
enlaces         : 4  (/es/... en el ES, /en/... en el EN)
```

### Bug que encontró el dry-run

`gray-matter` parsea una fecha YAML sin comillas como objeto `Date`, no como string. La concatenación producía:

```
"publishedAt": "Mon Sep 07 2026 19:00:00 GMT-0500 (hora estándar oriental)T08:00:00-05:00"
```

Corregido con `toDateOnly()`, que normaliza `Date` y string a `YYYY-MM-DD` usando UTC para que la zona horaria local no desplace la fecha. Es exactamente el tipo de fallo que justifica que el `--dry-run` exista.

### Normativa del artículo de prueba

| Fuente | Verificada | URL |
|---|---|---|
| DGNTI (MICI) | ✅ | https://www.mici.gob.pa/direccion-general-de-normas-y-tecnologia-industrial/ |
| CNA (MICI) | ✅ | https://mici.gob.pa/cna-quienes-somos/ |
| Acuerdo 011-2018 (SBP) | ✅ (fase anterior) | PDF oficial |
| **ISO.org** | ❌ **descartada** | Devuelve **HTTP 403** a peticiones automatizadas |

**ISO.org no es verificable con WebFetch.** Siguiendo la regla de `content/CLAUDE.md`, no se citó. Es una limitación permanente del pipeline: cualquier artículo que quiera citar iso.org tendrá que verificarlo a mano.

El artículo encontró además un dato que ningún competidor tiene: los esquemas de acreditación que ofrece el CNA son laboratorios de ensayo y calibración, organismos de inspección y organismos de validación y verificación — **la certificación de sistemas de gestión no está entre ellos**.

---

## 11 bis. Dos bugs de enlaces detectados al revisar el borrador

### Corregido: los `href` relativos invalidaban el documento

El primer push guardó los enlaces internos tal cual venían del Markdown:

```
/es/servicios/sistemas-calidad
/es/contacto
```

El campo `href` de la anotación `link` es de **tipo `url`** en `blockContent`, y
ese tipo valida que el valor sea una URL absoluta. Con paths relativos, el Studio
marca el documento como inválido y no deja publicarlo.

`sanity-push-post.mjs` incorpora ahora `absolutizeLinks()`, que antepone
`https://grupoalternative.com` a todo `href` que empiece por `/`, **en el límite
con Sanity**. El Markdown del repositorio sigue con enlaces relativos, que es lo
correcto para el control de versiones y para el lint.

Verificado en el borrador tras el arreglo: los 4 enlaces del ES apuntan a
`https://grupoalternative.com/es/...` y los del EN a `.../en/...`.

### Pendiente: los enlaces internos abren en pestaña nueva

`components/blog/BlogPortableText.tsx` (líneas 41-49) renderiza **todos** los
enlaces del cuerpo con `target="_blank" rel="noopener noreferrer"`:

```tsx
link: ({ value, children }) => (
  <a href={value?.href} target="_blank" rel="noopener noreferrer" …>
```

Para un enlace externo está bien. Para uno interno no: abre una pestaña nueva
hacia el propio sitio y rompe la navegación. Como efecto secundario, el enlace
interno pierde parte de su valor como señal de navegación.

**No lo he corregido**: `components/` está fuera del alcance aditivo acordado
para esta rama. Es un cambio pequeño —distinguir por si el `href` empieza por
`https://grupoalternative.com` o por `/`— pero debe ir en su propia rama.

Es una incidencia preexistente que solo se hace visible ahora: este es el primer
artículo con enlaces internos dentro del cuerpo de Sanity.

---

## 12. Qué NO cubre el pipeline todavía

| Falta | Qué haría falta |
|---|---|
| **Imágenes en el cuerpo** | Solo se sube la `heroImage`. Para imágenes dentro del texto habría que subir cada asset y sustituir la referencia Markdown por un bloque `image` antes de `htmlToBlocks` |
| **Tablas** | `blockContent` no las soporta. O se añade un tipo `table` al esquema (fuera del alcance acordado) o se sigue con checklists |
| **Cron automático** | Hoy `/investigar` y `/articulo` se lanzan a mano. Se podría programar con `/loop` o una routine, pero conviene mantener el gate humano |
| **Traducción como paso separado** | La versión EN la escribe el mismo comando. Si se quiere revisión de un traductor, habría que partir `/articulo` en dos |
| **Publicación automática** | Deliberado: publicar es un clic humano en el Studio |
| **Verificación de enlaces externos** | El lint valida los internos. Un enlace externo roto no lo detecta nadie |

---

## 13. `TODO_EDWIN` — pipeline

1. **Rotar `SANITY_API_WRITE_TOKEN`** (§10).
2. **Configurar los 3 secrets en GitHub** (§10). Sin ellos el workflow falla al mergear.
3. **Configurar Deploy Hook + webhook** (§9). Sin esto los posts publicados no aparecen.
4. **`author.link` está en `null`** (§6.1). Un clic en el Studio: `/nosotros/katherine-gonzalez`.
5. **Migrar a Sanity los dos slugs hardcodeados** (§4). `que-es-bpm-…` ya tiene 83 bloques en Sanity que no se muestran; habría que borrar su entrada de `BLOG_SLUG_TO_CONTENT` y comprobar que el render coincide. Para `caso-exito-banco-regional-…` hay que crear antes el documento: no existe en Sanity.
6. **Revisar el borrador del artículo de prueba** en el Studio y decidir si se publica.
7. **Arreglar `target="_blank"` en enlaces internos** (§11 bis). Rama aparte: toca `components/`.

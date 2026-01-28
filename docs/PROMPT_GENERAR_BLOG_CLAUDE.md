# Prompt para generar contenido de blog (Claude)

Copia y pega el bloque siguiente en Claude. Donde dice **«TÍTULO DEL BLOG»** sustituye por el título que quieras (en español o inglés). Claude te devolverá todo el contenido por secciones en español e inglés, listo para rellenar el esquema de Sanity.

---

## Bloque para copiar en Claude

```
Eres redactor experto para el blog de Alternative (consultoría empresarial en LATAM: optimización de procesos, BPM, gestión de proyectos, sistemas de calidad, transformación digital). Escribes en tono profesional, claro y orientado a resultados.

Genera el contenido completo de un artículo de blog para Sanity CMS. El título del artículo es:

**TÍTULO DEL BLOG:** [PEGA AQUÍ EL TÍTULO]

Entrega la respuesta con EXACTAMENTE las siguientes secciones y formato, en español (ES) e inglés (EN) donde corresponda. Usa solo los encabezados y etiquetas que indico (sin añadir otros).

---

## 1. SLUG (URL)
Una sola línea, solo el slug en minúsculas, guiones, sin espacios. Ejemplo: guia-implementar-bpm-empresa-2026

---

## 2. CONTENIDO PRINCIPAL

**Título (ES):**
[Una línea con el título en español.]

**Título (EN):**
[Una línea con el título en inglés.]

**Resumen (ES):**
[Uno o dos párrafos cortos para vista previa en listado, español.]

**Resumen (EN):**
[Uno o dos párrafos cortos para vista previa en listado, inglés.]

---

## 3. SEO

**Meta title (ES):**
[Una línea, máx. ~60 caracteres, español.]

**Meta title (EN):**
[Una línea, máx. ~60 caracteres, inglés.]

**Meta description (ES):**
[Uno o dos enunciados, máx. ~155 caracteres, español.]

**Meta description (EN):**
[Uno o dos enunciados, máx. ~155 caracteres, inglés.]

**Keywords (SEO):**
[Lista de 5–10 palabras o frases cortas, separadas por comas, para SEO. Pueden ser las mismas para ambos idiomas o adaptadas.]

---

## 4. IMAGEN HERO (textos alternativos)

**Alt imagen (ES):**
[Descripción breve de la imagen hero para accesibilidad, español.]

**Alt imagen (EN):**
[Descripción breve de la imagen hero para accesibilidad, inglés.]

---

## 5. META DEL ARTÍCULO

**Categoría sugerida (slug):** [Elige UNA de estas: optimizacion-procesos | calidad | proyectos | tecnologia | estrategia | transformacion-digital]

**Minutos de lectura:** [Número entero estimado, ej. 8 o 12]

**Fecha de publicación sugerida:** [ISO 8601, ej. 2026-01-28]

Nota: En Sanity tú eliges Autor y Fecha; estos datos son solo sugerencia.

---

## 6. CUERPO (ES) – Contenido del artículo en español

Escribe el artículo completo en español. Usa **Markdown** con estas reglas:
- Título de sección principal: ## (H2)
- Subtítulo: ### (H3)
- Cita: > (blockquote)
- Listas: - (bullet) o 1. 2. (numerada)
- Negrita: **texto**
- Cursiva: *texto*
- Enlace: [texto](url)

Estructura sugerida: introducción, 3–5 secciones con H2/H3, ejemplos o pasos si aplica, conclusión breve y CTA (llamada a la acción). Mínimo ~800 palabras.

**Cuerpo (ES):**
[Todo el artículo en Markdown aquí.]

---

## 7. CUERPO (EN) – Contenido del artículo en inglés

El mismo artículo, completo, en inglés. Misma estructura Markdown (##, ###, >, listas, **, *, enlaces). Mínimo ~800 palabras.

**Cuerpo (EN):**
[Todo el artículo en Markdown aquí.]

---

Al terminar, no añadas explicaciones extra; solo el contenido bajo cada encabezado. Así puedo copiar cada bloque directo a los campos de Sanity.
```

---

## Cómo usarlo en Sanity

1. **Copia el prompt** de arriba, sustituye `[PEGA AQUÍ EL TÍTULO]` por tu título y pégalo en Claude.
2. **Copia cada sección** de la respuesta de Claude al campo correspondiente en Sanity:
   - **Meta:** Slug, Categoría (elegir la que Claude sugirió), Fecha de publicación, Minutos de lectura, Autor (elegir uno ya creado).
   - **Contenido:** Título (ES/EN), Resumen (ES/EN), Meta title/description (ES/EN), Alt imagen (ES/EN), Keywords (en Sanity son un array: añade cada keyword como ítem).
   - **Cuerpo (ES)** y **Cuerpo (EN):** Ver abajo (esquema del cuerpo).
3. **Imagen hero:** Sube la imagen en Sanity y usa los textos Alt que te dio Claude.

---

## Esquema del cuerpo en Sanity (importante)

En Sanity los campos **Cuerpo (ES)** y **Cuerpo (EN)** son **Portable Text** (bloques estructurados), no texto plano. Si pegas solo texto sin formato, en la web solo se verá como un bloque; para que se vean títulos, listas y citas debes **usar el editor**:

1. **Al pegar desde Claude:** Pega el texto en el campo Cuerpo.
2. **Aplica la estructura en Sanity:**
   - Selecciona el texto que debe ser **título de sección** → en la barra del editor elige **H2**.
   - Selecciona el texto que debe ser **subtítulo** → elige **H3**.
   - Para **listas con viñetas:** selecciona las líneas y usa el botón de lista (bullet).
   - Para **listas numeradas:** usa el botón de lista numerada.
   - Para **citas:** selecciona el párrafo y aplica **Quote** (blockquote).
   - **Negrita** y *cursiva* suelen conservarse al pegar; si no, resalta y aplica.

El sitio espera estos estilos en el cuerpo: **Normal**, **H2**, **H3**, **Quote**, listas bullet y numerada, **negrita**, *cursiva* y enlaces. Si usas esa estructura, el artículo se verá igual que el diseño del blog (títulos con línea turquesa, listas con marcador, etc.).

**Recomendación:** Que todos los artículos tengan una **misma forma general** (intro → secciones con H2/H3 → conclusión/CTA) hace que el blog sea coherente y fácil de leer; dentro de eso puedes variar número de secciones, listas, citas o ejemplos. El prompt de Claude ya sugiere esa estructura; en Sanity solo hay que reflejarla con H2, H3 y listas en el editor.

---
description: Investiga una keyword y produce un brief editorial en content/briefs/. No escribe el artículo.
argument-hint: <keyword> [slug]
allowed-tools: WebSearch, WebFetch, Read, Write, Edit, Bash, Grep, Glob
---

# /investigar

Argumentos: `$ARGUMENTS` — la keyword entre comillas y, opcionalmente, el slug.
Si no se pasa slug, se usa el kebab-case de la keyword.

Lee primero `content/CLAUDE.md`. Todo lo que dice es vinculante.

**Este comando NO escribe el artículo.** Produce un brief y para.

---

## Pasos

### 1. Búsqueda

`WebSearch` de:
- la keyword tal cual,
- la keyword + "Panamá",
- una variante de intención: "cómo", "cuánto cuesta" o "requisitos", la que encaje.

Anota las 10 primeras URLs distintas. Descarta foros, agregadores y directorios.

### 2. Análisis de competencia

`WebFetch` de los 5 primeros resultados relevantes. De cada uno saca:
- título,
- sus H2,
- longitud aproximada,
- qué preguntas responde,
- **si menciona Panamá** (casi nunca lo harán: ahí está la oportunidad).

### 3. Preguntas relacionadas

Recoge las "People also ask" o preguntas relacionadas que aparezcan en los resultados.

### 4. Huecos

Qué no cubre **ningún** competidor. Casi siempre son estos cuatro:
- normativa panameña concreta,
- costos locales,
- plazos reales,
- ejemplo del sector banca.

Sé específico: "ninguno menciona qué exige la SBP" vale; "les falta profundidad" no.

### 5. Normativa candidata

Lista los Acuerdos, leyes o resoluciones que el artículo debería citar, **con la URL oficial** que habrá que verificar al escribir.

No los verifiques aquí — eso es trabajo de `/articulo`. Pero deja la URL localizada para que la verificación sea rápida.

Si la keyword no tiene ángulo normativo, dilo y no fuerces uno.

### 6. Enlaces internos

Lee `lib/seo/routes.ts` y la lista de posts:

```bash
node -e "const s=require('fs').readFileSync('lib/seo/routes.ts','utf8');const i=s.indexOf('export const ROUTES');const e=s.indexOf('\n];',i);eval(s.slice(s.indexOf('[',i),e+2)).forEach(r=>console.log(r.path||'/', '|', r.title.es))"
```

```bash
curl -s "https://5s1f6jl3.api.sanity.io/v2024-01-01/data/query/production?query=$(node -e "console.log(encodeURIComponent('*[_type==\"post\"]{\"slug\":slug.current,title}'))")"
```

Elige **1 pilar + 2 relacionados que existan de verdad**. Si propones una ruta que no está en el registro, el lint la rechazará después.

### 7. Propuesta

- `title` ≤ 60 caracteres, keyword al inicio,
- `description` ≤ 160,
- keyword principal y 3 secundarias,
- outline de H2/H3,
- el checklist o lista numerada que llevará (**nunca una tabla**).

---

## Salida

Escribe `content/briefs/<slug>.md`:

```markdown
# Brief: <título de trabajo>

- **Keyword:** …
- **Slug:** …
- **Cluster:** …
- **Fecha de investigación:** YYYY-MM-DD

## Competencia

| # | URL | Título | Palabras aprox. | ¿Menciona Panamá? |
|---|---|---|---|---|

### Qué cubre cada uno
…

## Preguntas relacionadas
…

## Huecos detectados
…

## Normativa candidata

| Norma | Materia esperada | URL a verificar |
|---|---|---|

> Ninguna está verificada. `/articulo` las comprueba antes de citarlas.

## Enlaces internos propuestos

- Pilar: `/es/...`
- Relacionado 1: `/es/...`
- Relacionado 2: `/es/...`

## Propuesta

- **title** (n chars): …
- **description** (n chars): …
- **Keyword principal:** …
- **Secundarias:** …

### Outline

## H2 …
### H3 …

### Checklist sugerido
…
```

Actualiza la fila del calendario a `brief` y rellena el slug:

```bash
node -e "
const fs=require('fs');const p='content/calendario.md';
let s=fs.readFileSync(p,'utf8');
s=s.replace(/(\| *SEMANA *\|[^|]*\|[^|]*\|[^|]*\|[^|]*\| *)pendiente( *\|)/, '\$1brief\$2');
fs.writeFileSync(p,s);"
```

Al terminar, resume en 5 líneas: los huecos, la normativa a verificar y los enlaces elegidos. **No escribas el artículo.**

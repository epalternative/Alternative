---
description: Escribe un artículo del blog (ES + EN) desde su brief, lo pasa por el lint y abre PR. Nunca publica en Sanity.
argument-hint: <slug>
allowed-tools: WebFetch, WebSearch, Read, Write, Edit, Bash, Grep, Glob
---

# /articulo

Argumento: `$ARGUMENTS` — el slug del artículo.

---

## 1. Contexto

Lee, en este orden:

1. `content/CLAUDE.md` — la guía editorial. Vinculante.
2. `content/briefs/<slug>.md` — el brief.

**Si no existe el brief, detente** y pide correr primero:

```
/investigar "<keyword>" <slug>
```

No escribas un artículo sin brief.

---

## 2. Verificación de normativa — antes de escribir

Para **cada** norma del brief:

1. `WebFetch` de la URL oficial.
2. Si el PDF no devuelve texto legible, descárgalo y extrae el texto antes de darlo por bueno.
3. Confirma **número, año y materia exactos** contra el encabezado del documento.
4. Si no puedes verificarla: **no la cites**. Ni de pasada, ni con "aproximadamente".

Los tres Acuerdos ya verificados en `content/CLAUDE.md` (005-2011, 003-2012, 011-2018) no necesitan reverificación.

Cada norma que sobreviva va a `sources` del frontmatter con su URL.

---

## 3. Artículo en español

Escribe `content/posts/<slug>.md` con el frontmatter de `content/CLAUDE.md`.

`publishedAt` en formato `YYYY-MM-DD`: el script de push le añade `T08:00:00-05:00`.

### Cuerpo

- 1.200–1.800 palabras.
- Un solo H1 (lo pone el `title`; **el cuerpo empieza en H2**).
- Estructura fija de la guía: problema → contexto Panamá → desarrollo en H2 → checklist o lista numerada → errores comunes → conclusión con CTA.
- **Nunca una tabla Markdown.** El `blockContent` de Sanity no las soporta.
- Enlaces internos absolutos: `/es/...`.
- Un párrafo en primera persona con experiencia propia, sin nombrar clientes.
- Solo cifras de la lista blanca. Cualquier otra cifra necesita URL en `sources`.

---

## 4. Lint del español

```bash
npm run blog:lint -- content/posts/<slug>.md
```

Corrige y repite **hasta que pase**. No sigas con un lint en rojo.

---

## 5. Versión en inglés — obligatoria

Solo cuando el ES pase el lint, escribe `content/posts/<slug>.en.md`:

- Mismo frontmatter, con el texto traducido.
- **Cuerpo traducido completo**, no resumido ni recortado.
- Enlaces internos apuntando a `/en/...` (mismos destinos, otro locale).
- Las mismas `sources`.

Pásale el lint también:

```bash
npm run blog:lint -- content/posts/<slug>.en.md
```

---

## 6. Rama, commit y PR

```bash
git checkout main && git pull --ff-only origin main
git checkout -b blog/<slug>
git add content/posts/<slug>.md content/posts/<slug>.en.md content/briefs/<slug>.md content/calendario.md
git commit -m "blog: <slug>"
git push -u origin blog/<slug>
```

Si `gh` está disponible y tiene permiso de escritura:

```bash
gh pr create --base main --head blog/<slug> \
  --title "Blog: <title>" \
  --body "<cuerpo>"
```

El cuerpo del PR lleva:
- resumen del brief en 5 líneas,
- **checklist de revisión:**
  - [ ] Normativa verificada contra fuente oficial (lista de normas + URL)
  - [ ] Cifras dentro de la lista blanca, o con fuente citada
  - [ ] Enlaces internos resuelven (`serviceLink` + 2 relacionados)
  - [ ] Versión EN presente y completa
  - [ ] Lint en verde para ES y EN
  - [ ] Ningún cliente nombrado

Si `gh` falla por permisos, **imprime la URL de compare** para abrirlo a mano:

```
https://github.com/epalternative/Alternative/compare/main...blog/<slug>?expand=1
```

---

## 7. Calendario

Actualiza la fila a `PR`.

---

## Lo que este comando NO hace

- **No publica en Sanity.** Ni siquiera crea el borrador: eso es `npm run blog:push`, que corre en el workflow al mergear.
- **No hace merge del PR.** Lo revisa Edwin.
- **No inventa cifras, clientes ni casos.**

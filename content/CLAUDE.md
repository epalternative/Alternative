# Guía editorial del blog — Grupo Alternative

Esta guía la leen `/investigar` y `/articulo`. Todo lo que dice es vinculante.

---

## Marca y voz

- La empresa es **Alternative** o **Grupo Alternative**. Nunca "la empresa" a secas ni inventes nombres comerciales.
- Autora: **Katherine González**, CEO. PMP®, ISO 9001 Lead Auditor, MBA, Six Sigma Green Belt.
- Primera persona del plural para lo que hace la firma ("acompañamos", "diseñamos"). Primera del singular cuando cuenta experiencia propia ("he visto", "en los bancos donde he trabajado").
- **Español de Panamá.** Técnico, directo, sin rodeos. Frases cortas. Si una idea cabe en una línea, no ocupa tres.
- Se escribe para alguien que ya sabe de qué va el tema. Nada de definiciones de manual en la introducción.

### Frases prohibidas

No aparecen nunca, ni reformuladas:

```
en el dinámico mundo empresarial      en la era digital
es fundamental                        cabe destacar
sin duda                              hoy en día
en un mundo cada vez más              la clave del éxito
no es un secreto que                  ¿alguna vez te has preguntado?
```

Tampoco listas genéricas sin dato local ("5 beneficios de ISO 9001" sin una sola referencia a Panamá).

---

## Lector

Gerente de procesos, calidad, cumplimiento, PMO o TI de un banco, cooperativa, aseguradora o empresa mediana panameña.

Ya sabe qué es ISO o BPM. Lo que quiere saber es:
- cómo se hace **aquí**,
- cuánto cuesta y cuánto tarda,
- qué le va a pedir el regulador.

Si un párrafo no responde a alguna de esas tres, sobra.

---

## SEO por artículo

| Elemento | Regla |
|---|---|
| `title` | 50–60 caracteres, keyword al inicio, "Panamá" cuando aplique |
| `description` | 140–160 caracteres |
| H1 | Exactamente uno, igual al `title` |
| H2/H3 | Variantes semánticas de la keyword, no repeticiones literales |
| Extensión | 1.200–1.800 palabras |
| Keyword | En el primer párrafo, en un H2 y en la conclusión |
| Densidad | Nunca más de una aparición por cada 150 palabras |

---

## E-E-A-T obligatorio

Cada artículo lleva las tres cosas:

1. **Contexto panameño verificado.** Al menos una referencia concreta a SBP, MICI, MINSA, MITRADEL, CSS, ACODECO, DGI, Gaceta Oficial o un gremio, con URL comprobada.
2. **Experiencia propia.** Al menos un párrafo en primera persona sobre algo vivido ("en los bancos donde he trabajado…"). **Nunca se nombra a la entidad cliente.**
3. **Enlaces:**
   - 1 a la página de servicio pilar,
   - 2 a artículos o páginas relacionadas del sitio,
   - 1–2 externos a fuente primaria (ISO.org, PMI, SBP, Gaceta Oficial).

Las rutas internas salen de `lib/seo/routes.ts` y del listado de posts. **Nunca se inventa una ruta.**

---

## Normativa — regla no negociable

Todo Acuerdo, ley o resolución que se cite:

1. Se verifica con WebFetch **en la fuente oficial** antes de citarlo.
2. Se cita con número, año y materia exactos.
3. Si no se puede verificar, **no se cita**. No se aproxima ni se deja "aproximadamente".
4. La URL de la fuente queda en `sources` del frontmatter.

Acuerdos ya verificados y reutilizables (PDF oficial de la SBP):

| Acuerdo | Fecha | Materia |
|---|---|---|
| 005-2011 | 20 sep 2011 | Gobierno corporativo |
| 003-2012 | 22 may 2012 | Gestión del riesgo de la tecnología de la información |
| 011-2018 | 11 sep 2018 | Riesgo operativo |

Cualquier otro se verifica de cero.

---

## Lista blanca de cifras propias

Estas son las **únicas** cifras sobre Alternative que pueden aparecer:

```
15+ años de experiencia          50+ proyectos completados
98% satisfacción del cliente     4–8 meses para certificar ISO 9001
85% aprueba en primera auditoría 30–50% reducción de costos con Lean Six Sigma
60–80% reducción de tiempos con RPA
40–60% reducción de tiempos con digitalización
PMs con 5–15 años de experiencia
```

Cualquier otra cifra sobre Alternative está **prohibida**. Cifras de terceros: solo con URL en `sources`.

Nunca se nombra a un cliente. Nunca se inventa un caso.

---

## Estructura fija

1. **Intro con el problema** — 3–4 líneas. Sin definiciones de manual.
2. **Contexto Panamá** — qué exige aquí la normativa o el mercado.
3. **Desarrollo en H2** — el grueso del artículo.
4. **Un checklist o una lista numerada** — accionable.
5. **Errores comunes** — qué sale mal en la práctica.
6. **Conclusión con CTA** a `/es/contacto`, mencionando el *diagnóstico gratuito de 15 minutos*.

> **Nunca uses tablas Markdown en el cuerpo.** El tipo `blockContent` de Sanity no las soporta y se perderían al convertir a Portable Text. Donde pedirías una tabla, usa un **checklist o una lista numerada**.

---

## Formato del archivo

- Markdown con frontmatter YAML.
- Sin HTML embebido.
- Imágenes: solo `heroImage`. Nada de imágenes dentro del cuerpo por ahora.
- Enlaces internos absolutos con locale: `/es/...` en el archivo ES, `/en/...` en el `.en.md`.

### Frontmatter

```yaml
---
title: ""                      # 50-60
metaTitle: ""                  # opcional; si falta se usa title
description: ""                # 140-160 → metaDescription y excerpt en Sanity
slug: ""
author: "Katherine González"   # se resuelve por nombre en Sanity
category: ""                   # slug existente: calidad | optimizacion-procesos |
                               # proyectos | tecnologia | estrategia | transformacion-digital
keyword: ""
secondaryKeywords: []
publishedAt: YYYY-MM-DD        # el push le añade T08:00:00-05:00
heroImage: ""                  # ruta en content/images/ o vacío
heroImageAlt: ""
serviceLink: ""                # ruta de lib/seo/routes.ts — solo para el lint
relatedLinks: []               # 2 rutas o slugs — solo para el lint
sources: []                    # URLs verificadas — solo para el lint
status: draft
---
```

`serviceLink`, `relatedLinks` y `sources` **no se envían a Sanity**: existen para que el lint verifique que los enlaces del cuerpo resuelven y que la normativa citada tiene fuente.

### Versión en inglés — obligatoria

Todo artículo tiene su par `content/posts/<slug>.en.md`:

- Mismo frontmatter, con el texto traducido.
- El cuerpo traducido, no resumido.
- Enlaces internos apuntando a `/en/...`.
- El push lo mapea a los campos `*En` del **mismo** documento de Sanity.

---

## Slugs prohibidos

Estos dos se renderizan desde componentes hardcodeados y su cuerpo de Sanity se ignora:

```
que-es-bpm-business-process-management-guia-completa
caso-exito-banco-regional-40-menos-tiempos-bpm
```

Un artículo nuevo no puede usarlos. El lint los rechaza.

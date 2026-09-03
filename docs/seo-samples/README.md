# Muestras de JSON-LD servido en producción

Capturadas del HTML real de `https://grupoalternative.com`, no generadas en local.
Cada fichero incluye `_source` y `_capturedAt`.

| Fichero | Página | Nodos |
|---|---|---|
| `organization.json` | bloque del layout, aislado | `ProfessionalService`, `WebSite` |
| `home.json` | `/es` | `ProfessionalService`, `WebSite` |
| `servicio-con-faq.json` | `/es/servicios/sistemas-calidad/certificacion-iso` | `ProfessionalService`, `WebSite`, `BreadcrumbList`, `Service`, `FAQPage` (6 preguntas) |
| `blog-post.json` | `/es/blog/que-es-bpm-business-process-management-guia-completa` | `ProfessionalService`, `WebSite`, `BlogPosting` |

## Cómo validarlos

**Rich Results Test** — https://search.google.com/test/rich-results

Pega la URL directamente (es lo más fiel, incluye el HTML servido):

```
https://grupoalternative.com/es/servicios/sistemas-calidad/certificacion-iso
https://grupoalternative.com/es/blog/que-es-bpm-business-process-management-guia-completa
https://grupoalternative.com/es
```

O usa la pestaña "Código" y pega el contenido de `blocks` de cada fichero.

**Schema Markup Validator** — https://validator.schema.org/ (valida schema.org
completo, no solo los tipos que Google usa para rich results).

## Qué esperar

- `FAQPage` y `BreadcrumbList` son elegibles para rich results.
- `Service` y `ProfessionalService` no generan rich result propio, pero
  alimentan el Knowledge Graph y la comprensión de entidad.
- `BlogPosting` es elegible para el carrusel de artículos.

Cada página emite **dos** bloques `ld+json`: el del layout
(`ProfessionalService` + `WebSite`, iguales en todo el sitio) y el `@graph`
específico de la página. Ambos comparten `@context` y se referencian por `@id`
(`#organization`, `#website`).

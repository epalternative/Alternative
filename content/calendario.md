# Calendario editorial — 12 semanas

Estados: `pendiente` → `brief` (tras `/investigar`) → `borrador` (tras `/articulo`) → `PR` → `publicado`.

Los comandos actualizan la fila automáticamente. El slug se fija al correr `/investigar`.

| Sem | Cluster | Título de trabajo | Keyword | Tipo | Estado | Slug |
|---|---|---|---|---|---|---|
| 1 | ISO | Certificación ISO 9001 en Panamá: costos, plazos y pasos | certificación ISO 9001 Panamá | pillar | PR | `certificacion-iso-9001-panama-costos-plazos` |
| 2 | BPM | 7 señales de que tu empresa necesita optimizar procesos | optimización de procesos Panamá | pillar | pendiente | |
| 3 | Riesgo | Gobierno corporativo bancario: qué exige el Acuerdo 5-2011 | gobierno corporativo Panamá | cluster | pendiente | |
| 4 | PMO | Cómo implementar una PMO en 90 días | implementación PMO Panamá | pillar | pendiente | |
| 5 | ISO | Auditoría interna ISO 9001: checklist para certificar | auditoría interna ISO 9001 | cluster | pendiente | |
| 6 | BPM | BPMN 2.0: cómo mapear un proceso paso a paso | mapeo de procesos BPMN | cluster | pendiente | |
| 7 | Riesgo | Riesgo operativo en banca: guía práctica del Acuerdo 11-2018 | riesgo operativo banca Panamá | cluster | pendiente | |
| 8 | PMO | PMO ágil o tradicional: cómo elegir | metodologías ágiles Panamá | cluster | pendiente | |
| 9 | Transf. digital | Digitalizar sin arreglar procesos: el error más caro | transformación digital Panamá | pillar | pendiente | |
| 10 | BPM | Lean Six Sigma: cómo reducir costos operativos | Lean Six Sigma Panamá | cluster | pendiente | |
| 11 | Riesgo | Riesgo de TI en banca: qué pide el Acuerdo 3-2012 | riesgo tecnológico banca Panamá | cluster | pendiente | |
| 12 | ISO | ISO 9001 en cooperativas: qué cambia frente a un banco | ISO 9001 cooperativas Panamá | cluster | pendiente | |

## Notas

- **Ningún Acuerdo del calendario está confirmado por el hecho de aparecer aquí.** Los títulos de trabajo de las semanas 3, 7 y 11 mencionan Acuerdos que hay que verificar con WebFetch al escribir el artículo, aunque tres ya estén verificados en `content/CLAUDE.md`. Si al verificar resulta que el número o la materia no coinciden, **se corrige el título**, no el hecho.
- Los clusters apuntan a estas páginas pilar de `lib/seo/routes.ts`:
  - ISO → `/es/servicios/sistemas-calidad`
  - BPM → `/es/servicios/optimizacion-procesos`
  - PMO → `/es/servicios/gestion-proyectos`
  - Riesgo → `/es/industrias/banca-servicios-financieros`
  - Transf. digital → `/es/servicios/transformacion-digital`
- Cada artículo lleva su par en inglés (`<slug>.en.md`). El calendario no lo lista aparte: es parte de la misma fila.

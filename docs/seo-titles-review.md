# Revisión de titles y descriptions — Fase 1a

**Rama:** `seo/fix` · **Fuente:** `lib/seo/routes.ts` · **Rutas:** 54

Este documento es **solo para tu revisión**. Nada de esto está aplicado todavía a las páginas: la Fase 1b (codemod + layouts) no se ejecuta hasta tu OK.

## Cómo leer la tabla

- **H1 actual** = el `<h1>` que la página ya renderiza hoy (extraído del código, rama ES). No lo he modificado.
- **chars** = longitud de title ES / title EN / description ES / description EN.
- Objetivo: title 50–60, description 140–160. **Las 108 combinaciones son únicas** entre sí.
- 🇪🇸 marca páginas cuyo H1 está hardcodeado en español y se muestra igual en `/en` (ver Notas).

---

## Home

### `/`

> **H1 actual:** Consultoría empresarial estratégicamente

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Consultoría Empresarial en Panamá \| Grupo Alternative | 53 |
| **Title EN** | Business Consulting Firm in Panama \| Grupo Alternative | 54 |
| **Desc ES** | Consultoría en procesos, calidad, proyectos y transformación digital para empresas en Panamá y LATAM. Equipo PMP® e ISO 9001 Lead Auditor. Diagnóstico gratuito. | 160 |
| **Desc EN** | Consulting in processes, quality, projects and digital transformation for companies in Panama and LATAM. PMP® and ISO 9001 Lead Auditor team. Free diagnosis. | 157 |
| **Keyword** | consultoría empresarial Panamá / business consulting Panama | |
| **Breadcrumb** | Inicio / Home | |
| **updatedAt · priority · freq** | 2026-03-03 · 1 · weekly | |

## Servicios — hub y categorías

### `/servicios`

> **H1 actual:** Nuestros Servicios

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Servicios de Consultoría Empresarial en Panamá \| 6 Áreas | 56 |
| **Title EN** | Business Consulting Services in Panama \| 6 Practice Areas | 57 |
| **Desc ES** | Seis áreas de especialización: procesos, calidad, proyectos, transformación digital, estrategia y desarrollo tecnológico. Del diagnóstico a la implementación. | 158 |
| **Desc EN** | Six areas of expertise: processes, quality, projects, digital transformation, strategy and technology development. From diagnosis to full implementation. | 153 |
| **Keyword** | servicios de consultoría / consulting services | |
| **Breadcrumb** | Servicios / Services | |
| **updatedAt · priority · freq** | 2026-01-23 · 0.9 · weekly | |

### `/servicios/optimizacion-procesos`

> **H1 actual:** Optimización de Procesos

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Optimización de Procesos en Panamá \| Reduce Costos | 50 |
| **Title EN** | Process Optimization in Panama \| Reduce Operating Costs | 55 |
| **Desc ES** | Rediseñamos tus procesos para reducir costos y acelerar el crecimiento: BPM, Lean Six Sigma, diseño de procesos y automatización. Resultados medibles. | 150 |
| **Desc EN** | We redesign your processes to cut costs and accelerate growth: BPM, Lean Six Sigma, process design and automation. Measurable results, not slideware. | 149 |
| **Keyword** | optimización de procesos / process optimization | |
| **Breadcrumb** | Optimización de Procesos / Process Optimization | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.8 · weekly | |

### `/servicios/sistemas-calidad`

> **H1 actual:** Sistemas de calidad alineados a marcos de referencia internacionales

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Consultoría en Sistemas de Calidad ISO 9001 en Panamá | 53 |
| **Title EN** | ISO 9001 Quality Management System Consulting in Panama | 55 |
| **Desc ES** | Implementación, auditoría y certificación ISO 9001 para banca, manufactura y servicios regulados. Certificación en 4-8 meses con 85%+ de aprobación. | 148 |
| **Desc EN** | ISO 9001 implementation, audit and certification for banking, manufacturing and regulated services. Certification in 4-8 months with 85%+ first-time approval. | 158 |
| **Keyword** | sistemas de gestión de calidad / quality management systems | |
| **Breadcrumb** | Sistemas de Calidad / Quality Systems | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.8 · weekly | |

### `/servicios/gestion-proyectos`

> **H1 actual:** Project Managers certificados para tus proyectos críticos

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Gestión de Proyectos en Panamá \| PMs Certificados PMP | 53 |
| **Title EN** | Project Management in Panama \| PMP Certified Managers | 53 |
| **Desc ES** | Tercerización de Project Managers PMP®, Scrum Masters y Directores de PMO. Se integran a tu equipo en días, no meses, con metodología y respaldo empresarial. | 157 |
| **Desc EN** | Outsourced PMP® Project Managers, Scrum Masters and PMO Directors. They join your team in days, not months, with proven methodology and company backing. | 152 |
| **Keyword** | gestión de proyectos / project management | |
| **Breadcrumb** | Gestión de Proyectos / Project Management | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.8 · weekly | |

### `/servicios/transformacion-digital`

> **H1 actual:** Transformación digital con estrategia y ejecución

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Transformación Digital en Panamá \| Estrategia y Ejecución | 57 |
| **Title EN** | Digital Transformation in Panama \| Strategy and Delivery | 56 |
| **Desc ES** | De la estrategia digital a la implementación: digitalización de procesos, gestión del cambio y análisis de datos. Transformación con resultados medibles. | 153 |
| **Desc EN** | From digital strategy to implementation: process digitization, change management and data analytics. Transformation with measurable business results. | 149 |
| **Keyword** | transformación digital / digital transformation | |
| **Breadcrumb** | Transformación Digital / Digital Transformation | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.8 · weekly | |

### `/servicios/consultoria-estrategica`

> **H1 actual:** Estrategia clara que impulsa crecimiento sostenible

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Consultoría Estratégica en Panamá \| Rumbo y Ejecución | 53 |
| **Title EN** | Strategic Consulting in Panama \| Direction and Execution | 56 |
| **Desc ES** | Para empresas que necesitan claridad de rumbo: planificación estratégica, diagnóstico y diseño organizacional. Estrategia ejecutable, no PowerPoint. | 148 |
| **Desc EN** | For companies that need clarity of direction: strategic planning, organizational diagnosis and design. Executable strategy, not slideware left in a drawer. | 155 |
| **Keyword** | consultoría estratégica / strategic consulting | |
| **Breadcrumb** | Consultoría Estratégica / Strategic Consulting | |
| **updatedAt · priority · freq** | 2026-02-07 · 0.8 · weekly | |

### `/servicios/desarrollo-tecnologia`

> **H1 actual:** Soluciones tecnológicas a medida para tu negocio

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Desarrollo de Tecnología a Medida para Empresas en Panamá | 57 |
| **Title EN** | Custom Technology Development for Companies in Panama | 53 |
| **Desc ES** | Software a medida, aplicaciones web y móviles, integración de sistemas y consultoría tecnológica. Tecnología para tu problema concreto, no soluciones genéricas. | 160 |
| **Desc EN** | Custom software, web and mobile applications, system integration and technology consulting. Technology built for your actual problem, not generic solutions. | 156 |
| **Keyword** | desarrollo de tecnología / technology development | |
| **Breadcrumb** | Desarrollo y Tecnología / Development & Technology | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.8 · weekly | |

## Servicios — subpáginas

### `/servicios/optimizacion-procesos/bpm-empresarial`

> **H1 actual:** Gestiona procesos de forma sistemática y sostenible con BPM

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Consultoría BPM en Panamá \| Gestión de Procesos de Negocio | 58 |
| **Title EN** | BPM Consulting in Panama \| Business Process Management | 54 |
| **Desc ES** | Implementamos Business Process Management para gestionar procesos de forma continua: diseño, monitoreo, mejora y gobierno. Para operaciones complejas. | 150 |
| **Desc EN** | We implement Business Process Management to run processes continuously: design, monitoring, improvement and governance. For complex cross-department operations. | 160 |
| **Keyword** | BPM empresarial / business process management | |
| **Breadcrumb** | BPM Empresarial / Business BPM | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/optimizacion-procesos/lean-six-sigma`

> **H1 actual:** Elimina desperdicios y mejora eficiencia con Lean Six Sigma

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Lean Six Sigma en Panamá \| Consultoría con Black Belt | 53 |
| **Title EN** | Lean Six Sigma in Panama \| Black Belt Certified Consulting | 58 |
| **Desc ES** | Metodología probada para eliminar desperdicios y variabilidad: reducción de 30-50% en costos y mejora de 40%+ en productividad. Equipo certificado Black Belt. | 158 |
| **Desc EN** | Proven methodology to remove waste and variability: 30-50% cost reduction and 40%+ productivity improvement. Black Belt certified team across many industries. | 158 |
| **Keyword** | Lean Six Sigma / Lean Six Sigma | |
| **Breadcrumb** | Lean Six Sigma / Lean Six Sigma | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/optimizacion-procesos/diseno-procesos`

> **H1 actual:** Diseñamos procesos escalables que impulsan crecimiento sostenible

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Diseño de Procesos en Panamá \| Mapeo y Estandarización | 54 |
| **Title EN** | Process Design in Panama \| Mapping and Standardization | 54 |
| **Desc ES** | Diseño y rediseño de procesos con metodología estructurada. Procesos documentados, estandarizados y listos para escalar, certificar ISO y ganar eficiencia. | 155 |
| **Desc EN** | Process design and redesign with structured methodology. Documented, standardized processes ready to scale, pass ISO certification and gain efficiency. | 151 |
| **Keyword** | diseño de procesos / process design | |
| **Breadcrumb** | Diseño de Procesos / Process Design | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/optimizacion-procesos/automatizacion-procesos`

> **H1 actual:** Automatiza procesos y libera a tu equipo para trabajo estratégico

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Automatización de Procesos con RPA en Panamá \| Workflows | 56 |
| **Title EN** | Process Automation with RPA in Panama \| Digital Workflows | 57 |
| **Desc ES** | RPA, workflows digitales e integraciones entre sistemas, con reducción de 60-80% en tiempos. Primero optimizamos y luego automatizamos, para ROI real. | 150 |
| **Desc EN** | RPA, digital workflows and system integrations, with 60-80% time reduction. We optimize the process first and automate second, so the ROI is real. | 146 |
| **Keyword** | automatización de procesos / process automation | |
| **Breadcrumb** | Automatización / Automation | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/sistemas-calidad/implementacion-iso-9001`

> **H1 actual:** Implementación ISO 9001:2015 completa y certificable

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Implementación ISO 9001:2015 en Panamá \| 4-8 Meses | 50 |
| **Title EN** | ISO 9001:2015 Implementation in Panama \| 4-8 Months | 51 |
| **Desc ES** | Implementamos sistemas de gestión de calidad ISO 9001:2015 desde cero: metodología en 7 fases, documentación, capacitación y auditorías internas. | 145 |
| **Desc EN** | We implement ISO 9001:2015 quality management systems from scratch: 7-phase methodology, documentation, training and internal audits through certification. | 155 |
| **Keyword** | implementación ISO 9001 / ISO 9001 implementation | |
| **Breadcrumb** | Implementación ISO 9001 / ISO 9001 Implementation | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/sistemas-calidad/auditoria-calidad`

> **H1 actual:** Auditoría de calidad que identifica y corrige problemas antes de certificación

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Auditoría de Calidad ISO 9001 en Panamá \| Lead Auditor | 54 |
| **Title EN** | ISO 9001 Quality Audit in Panama \| Lead Auditor Certified | 57 |
| **Desc ES** | Auditorías internas completas, enfocadas o de seguimiento con auditores ISO 9001 Lead Auditor. Detecta y corrige hallazgos antes de la certificación. | 149 |
| **Desc EN** | Complete, focused or follow-up internal audits led by ISO 9001 Lead Auditor certified professionals. Find and fix findings before the certification audit. | 154 |
| **Keyword** | auditoría de calidad / quality audit | |
| **Breadcrumb** | Auditoría de Calidad / Quality Audit | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/sistemas-calidad/certificacion-iso`

> **H1 actual:** De cero al certificado ISO 9001 con acompañamiento completo

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Certificación ISO 9001 en Panamá \| 85% Aprueba a la 1ª | 54 |
| **Title EN** | ISO 9001 Certification in Panama \| 85% Pass on First Try | 56 |
| **Desc ES** | De cero al certificado ISO 9001 con acompañamiento completo: implementación, auditorías internas y apoyo en la auditoría del organismo certificador. 4-8 meses. | 159 |
| **Desc EN** | From zero to ISO 9001 certificate with full support: implementation, internal audits and assistance during the certification body audit. Four to eight months. | 158 |
| **Keyword** | certificación ISO 9001 / ISO 9001 certification | |
| **Breadcrumb** | Certificación ISO / ISO Certification | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/sistemas-calidad/gestion-calidad`

> **H1 actual:** Calidad estructurada sin burocracia ISO

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Gestión de Calidad Pragmática en Panamá \| Sin Burocracia | 56 |
| **Title EN** | Pragmatic Quality Management in Panama \| No Bureaucracy | 55 |
| **Desc ES** | Calidad estructurada sin la burocracia de una certificación ISO. Solo lo esencial: controles, indicadores y mejora continua a la medida de tu operación. | 152 |
| **Desc EN** | Structured quality without ISO certification bureaucracy. Only the essentials, maximum impact: controls, indicators and continuous improvement built to fit you. | 160 |
| **Keyword** | gestión de calidad / quality management | |
| **Breadcrumb** | Gestión de Calidad / Quality Management | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/gestion-proyectos/pmp-project-management`

> **H1 actual:** Project Managers certificados PMP para tus proyectos críticos

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Project Managers PMP en Panamá \| Tercerización de PMs | 53 |
| **Title EN** | PMP Project Managers in Panama \| PM Outsourcing Service | 55 |
| **Desc ES** | Profesionales con certificación PMP activa y 5-15 años de experiencia, listos para integrarse a tu proyecto en días. Sin riesgo de contratación permanente. | 155 |
| **Desc EN** | Professionals with active PMP certification and 5-15 years of experience, ready to join your project in days. Without the risk of a permanent hire. | 147 |
| **Keyword** | project manager PMP / PMP project manager | |
| **Breadcrumb** | Project Management PMP / PMP Project Management | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/gestion-proyectos/metodologias-agiles`

> **H1 actual:** Scrum Masters y PMs Ágiles para entregar valor más rápido

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Metodologías Ágiles en Panamá \| Scrum Masters Certificados | 58 |
| **Title EN** | Agile Methodologies in Panama \| Certified Scrum Masters | 55 |
| **Desc ES** | Scrum Masters certificados que transforman equipos de desarrollo: entregas cada 2-4 semanas, feedback continuo y mejora constante en productos digitales. | 153 |
| **Desc EN** | Certified Scrum Masters who transform development teams: deliveries every 2-4 weeks, continuous feedback and steady improvement in digital products. | 148 |
| **Keyword** | metodologías ágiles Scrum / agile methodologies Scrum | |
| **Breadcrumb** | Metodologías Ágiles / Agile Methodologies | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/gestion-proyectos/pmo-office`

> **H1 actual:** Gobernanza, visibilidad y control de tu portafolio de proyectos

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Implementación de PMO en Panamá \| Oficina de Proyectos | 54 |
| **Title EN** | PMO Implementation in Panama \| Project Management Office | 56 |
| **Desc ES** | Implementa un PMO interno con nuestra consultoría o incorpora un Director PMO tercerizado. Alinea proyectos con la estrategia y prioriza mejor tus recursos. | 156 |
| **Desc EN** | Build an internal PMO with our consulting or bring in an outsourced PMO Director. Align projects to strategy, prioritize resources and reduce project failure. | 158 |
| **Keyword** | implementación PMO / PMO implementation | |
| **Breadcrumb** | PMO / PMO | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/gestion-proyectos/casos-negocio`

> **H1 actual:** Business cases que convencen a tu junta y desbloquean inversiones

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Casos de Negocio en Panamá \| ROI, VPN y TIR para tu Junta | 57 |
| **Title EN** | Business Cases in Panama \| ROI, NPV and IRR for Your Board | 58 |
| **Desc ES** | Casos de negocio con análisis financiero de ROI, VPN, TIR y payback, alternativas evaluadas y presentación ejecutiva. Para que tu proyecto sea aprobado. | 152 |
| **Desc EN** | Rigorous business cases with ROI, NPV, IRR and payback analysis, evaluated alternatives and an executive presentation. So your project gets the green light. | 156 |
| **Keyword** | caso de negocio / business case | |
| **Breadcrumb** | Casos de Negocio / Business Cases | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/transformacion-digital/estrategia-digital`

> **H1 actual:** Hoja de ruta digital alineada a objetivos de negocio

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Estrategia Digital en Panamá \| Roadmap Priorizado por ROI | 57 |
| **Title EN** | Digital Strategy in Panama \| ROI-Prioritized Roadmap | 52 |
| **Desc ES** | Estrategia digital con roadmap de implementación, iniciativas priorizadas por ROI y business cases tecnológicos. Define dónde invertir y cómo generar valor. | 156 |
| **Desc EN** | Digital strategy with an implementation roadmap, initiatives prioritized by ROI and technology business cases. Defines where to invest and how to create value. | 159 |
| **Keyword** | estrategia digital / digital strategy | |
| **Breadcrumb** | Estrategia Digital / Digital Strategy | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/transformacion-digital/change-management`

> **H1 actual:** Gestión del cambio que asegura adopción de tecnología

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Gestión del Cambio en Panamá \| Adopción de Tecnología | 53 |
| **Title EN** | Change Management in Panama \| Drive Technology Adoption | 55 |
| **Desc ES** | Gestión estructurada del cambio en transformaciones digitales: comunicación, capacitación, manejo de resistencias y cultura para que la tecnología se use. | 154 |
| **Desc EN** | Structured organizational change for digital transformations: communication, training, resistance management and digital culture so the technology gets used. | 157 |
| **Keyword** | gestión del cambio / change management | |
| **Breadcrumb** | Gestión del Cambio / Change Management | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/transformacion-digital/digitalizacion-procesos`

> **H1 actual:** Automatiza procesos y elimina trabajo manual repetitivo

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Digitalización de Procesos en Panamá \| RPA y Workflows | 54 |
| **Title EN** | Process Digitization in Panama \| RPA and Digital Workflows | 58 |
| **Desc ES** | Automatiza procesos con RPA, workflows digitales e integraciones, y elimina el papel. Reducción de 40-60% en tiempos y equipos libres para lo estratégico. | 154 |
| **Desc EN** | Automate processes with RPA, digital workflows and integrations, and remove paper. 40-60% time reduction and teams freed up for strategic work. | 143 |
| **Keyword** | digitalización de procesos / process digitization | |
| **Breadcrumb** | Digitalización / Digitization | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/transformacion-digital/analisis-datos`

> **H1 actual:** Decisiones basadas en datos con dashboards y analytics

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Análisis de Datos y BI en Panamá \| Dashboards Ejecutivos | 56 |
| **Title EN** | Data Analytics and BI in Panama \| Executive Dashboards | 54 |
| **Desc ES** | Business Intelligence y análisis de datos: consolidación de fuentes dispersas, dashboards ejecutivos en tiempo real, reportes y analytics predictivo. | 149 |
| **Desc EN** | Business Intelligence and data analytics: consolidation of scattered sources, real-time executive dashboards, automated reporting and predictive analytics. | 155 |
| **Keyword** | análisis de datos business intelligence / data analytics business intelligence | |
| **Breadcrumb** | Análisis de Datos / Data Analytics | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/consultoria-estrategica/diagnostico-organizacional`

> **H1 actual:** Evaluación profunda de salud organizacional

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Diagnóstico Organizacional en Panamá \| Evaluación 360° | 54 |
| **Title EN** | Organizational Diagnosis in Panama \| 360° Assessment | 52 |
| **Desc ES** | Evaluación profunda de cultura, procesos, estructura, capacidades y liderazgo. Un diagnóstico objetivo que revela qué funciona, qué no, y por qué. | 146 |
| **Desc EN** | In-depth evaluation of culture, processes, structure, capabilities and leadership. An objective diagnosis showing what works, what does not, and why. | 149 |
| **Keyword** | diagnóstico organizacional / organizational diagnosis | |
| **Breadcrumb** | Diagnóstico Organizacional / Organizational Diagnosis | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/consultoria-estrategica/diseno-organizacional`

> **H1 actual:** Estructura organizacional alineada a tu estrategia

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Diseño Organizacional en Panamá \| Estructura y Roles | 52 |
| **Title EN** | Organizational Design in Panama \| Structure and Roles | 53 |
| **Desc ES** | Diseño y rediseño de estructura: organigrama optimizado, roles y responsabilidades, governance y modelo operativo. Estructura que elimina silos. | 144 |
| **Desc EN** | Structure design and redesign: optimized org chart, roles and responsibilities, governance and operating model. A structure that removes dysfunctional silos. | 157 |
| **Keyword** | diseño organizacional / organizational design | |
| **Breadcrumb** | Diseño Organizacional / Organizational Design | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/consultoria-estrategica/planificacion-estrategica`

> **H1 actual:** Plan estratégico ejecutable que impulsa crecimiento

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Planificación Estratégica en Panamá \| Plan a 3-5 Años | 53 |
| **Title EN** | Strategic Planning in Panama \| Three to Five Year Plan | 54 |
| **Desc ES** | Plan estratégico a 3-5 años con visión clara, objetivos medibles, iniciativas priorizadas y roadmap de ejecución que se traduce en acciones concretas. | 150 |
| **Desc EN** | A 3-5 year strategic plan with clear vision, measurable objectives, prioritized initiatives and an execution roadmap that turns into concrete action. | 149 |
| **Keyword** | planificación estratégica / strategic planning | |
| **Breadcrumb** | Planificación Estratégica / Strategic Planning | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/desarrollo-tecnologia/desarrollo-software`

> **H1 actual:** Software a medida que resuelve problemas específicos de tu negocio

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Desarrollo de Software a Medida en Panamá para Empresas | 55 |
| **Title EN** | Custom Software Development in Panama for Companies | 51 |
| **Desc ES** | Software custom para automatizar procesos, gestionar operaciones complejas y manejar información crítica. Diseñado para tus flujos de trabajo reales. | 149 |
| **Desc EN** | Custom software to automate processes, run complex operations and handle critical information. Designed around your workflows, not software you must adapt to. | 158 |
| **Keyword** | desarrollo de software a medida / custom software development | |
| **Breadcrumb** | Desarrollo de Software / Software Development | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/desarrollo-tecnologia/aplicaciones-web-moviles`

> **H1 actual:** Apps web y móviles que conectan tu negocio con clientes

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Desarrollo de Apps Web y Móviles en Panamá \| iOS/Android | 56 |
| **Title EN** | Web and Mobile App Development in Panama \| iOS/Android | 54 |
| **Desc ES** | Aplicaciones web responsivas, apps móviles nativas iOS y Android, y PWAs: portales de clientes, apps de campo, e-commerce y plataformas digitales a medida. | 155 |
| **Desc EN** | Responsive web applications, native iOS and Android mobile apps and PWAs: client portals, field apps for staff, e-commerce and custom digital platforms. | 152 |
| **Keyword** | desarrollo de aplicaciones móviles / mobile app development | |
| **Breadcrumb** | Apps Web y Móviles / Web & Mobile Apps | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/desarrollo-tecnologia/consultoria-tecnologica`

> **H1 actual:** Asesoría estratégica para decisiones tecnológicas críticas

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Consultoría Tecnológica en Panamá \| Arquitectura y Vendors | 58 |
| **Title EN** | Technology Consulting in Panama \| Architecture and Vendors | 58 |
| **Desc ES** | Arquitectura de soluciones, selección de tecnologías, evaluación de vendors, roadmap y decisiones build vs buy. Evita inversiones tecnológicas equivocadas. | 155 |
| **Desc EN** | Solution architecture, technology selection, vendor evaluation, roadmap and build vs buy decisions. Avoid costly technology investments that miss the mark. | 155 |
| **Keyword** | consultoría tecnológica / technology consulting | |
| **Breadcrumb** | Consultoría Tecnológica / Technology Consulting | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/servicios/desarrollo-tecnologia/integracion-sistemas`

> **H1 actual:** Conecta tus sistemas y elimina trabajo manual

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Integración de Sistemas y APIs en Panamá \| Middleware | 53 |
| **Title EN** | System and API Integration in Panama \| Middleware & Data | 56 |
| **Desc ES** | Integración entre sistemas empresariales con APIs, middleware y sincronización de datos. Elimina islas de información y el copiado manual de datos. | 147 |
| **Desc EN** | Integration across enterprise systems with APIs, middleware and data synchronization. Remove information islands and manual copying of data between systems. | 156 |
| **Keyword** | integración de sistemas / system integration | |
| **Breadcrumb** | Integración de Sistemas / System Integration | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

## Industrias

### `/industrias`

> **H1 actual:** Industrias

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Industrias que Atendemos \| Consultoría Sectorial Panamá | 55 |
| **Title EN** | Industries We Serve \| Sector-Specific Consulting Panama | 55 |
| **Desc ES** | Experiencia comprobada en ocho sectores regulados y de alta complejidad: banca, manufactura, retail, tecnología, servicios, gobierno, salud y energía. | 150 |
| **Desc EN** | Proven experience across eight regulated, high-complexity sectors: banking, manufacturing, retail, technology, services, government, healthcare and energy. | 155 |
| **Keyword** | consultoría por industria / industry consulting | |
| **Breadcrumb** | Industrias / Industries | |
| **updatedAt · priority · freq** | 2026-01-26 · 0.9 · weekly | |

### `/industrias/banca-servicios-financieros`

> **H1 actual:** Soluciones especializadas para instituciones financieras reguladas

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Consultoría para Banca en Panamá \| Procesos, SBP y PMO | 54 |
| **Title EN** | Banking Consulting in Panama \| Processes, SBP and PMO | 53 |
| **Desc ES** | Más de 10 años ejecutando proyectos en instituciones financieras de Panamá y Centroamérica: normativa SBP, procesos core, auditoría y trazabilidad. | 147 |
| **Desc EN** | Over 10 years delivering projects for financial institutions in Panama and Central America: SBP regulation, core processes, audit and traceability. | 147 |
| **Keyword** | consultoría bancaria / banking consulting | |
| **Breadcrumb** | Banca y Servicios Financieros / Banking & Financial Services | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/industrias/banca-servicios-financieros/gestion-proyectos-bancarios`

> **H1 actual:** Project Managers certificados para proyectos críticos en instituciones financieras

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Gestión de Proyectos Bancarios en Panamá \| PMs PMP | 50 |
| **Title EN** | Banking Project Management in Panama \| PMP Managers | 51 |
| **Desc ES** | PMs PMP® con experiencia en banca regulada: transformación digital, core bancario, cumplimiento y certificaciones. Metodología para proyectos 24/7 críticos. | 156 |
| **Desc EN** | PMP® managers experienced in regulated banking: digital transformation, core banking, compliance and certifications. Methodology for critical 24/7 projects. | 156 |
| **Keyword** | gestión de proyectos bancarios / banking project management | |
| **Breadcrumb** | Proyectos Bancarios / Banking Projects | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.6 · monthly | |

### `/industrias/banca-servicios-financieros/cumplimiento-regulatorio-sbp`

> **H1 actual:** Asesoría e implementación para cumplir normativas de la Superintendencia de Bancos

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Cumplimiento Regulatorio SBP para Bancos en Panamá | 50 |
| **Title EN** | SBP Regulatory Compliance for Banks in Panama \| Controls | 56 |
| **Desc ES** | Políticas, procedimientos y controles internos alineados a los Acuerdos de la Superintendencia de Bancos. Preparación para supervisiones y remediación. | 151 |
| **Desc EN** | Policies, procedures and internal controls aligned to Superintendency of Banks agreements. Supervision readiness and remediation of regulatory findings. | 152 |
| **Keyword** | cumplimiento regulatorio SBP / SBP regulatory compliance | |
| **Breadcrumb** | Cumplimiento SBP / SBP Compliance | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.6 · monthly | |

### `/industrias/banca-servicios-financieros/transformacion-digital-bancaria`

> **H1 actual:** Estrategia y ejecución de proyectos de transformación digital para bancos

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Transformación Digital Bancaria en Panamá \| Banca Móvil | 55 |
| **Title EN** | Banking Digital Transformation in Panama \| Mobile Banking | 57 |
| **Desc ES** | Proyectos digitales bancarios: banca móvil, onboarding digital, pagos instantáneos y digitalización de procesos core, con balance entre innovación y riesgo. | 156 |
| **Desc EN** | Banking digital projects: mobile banking, digital onboarding, instant payments and core process digitization, balancing innovation against financial risk. | 154 |
| **Keyword** | transformación digital bancaria / banking digital transformation | |
| **Breadcrumb** | Transformación Digital Bancaria / Banking Digital Transformation | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.6 · monthly | |

### `/industrias/banca-servicios-financieros/iso-9001-sector-financiero`

> **H1 actual:** Implementación de ISO 9001 para instituciones financieras reguladas

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | ISO 9001 para el Sector Financiero en Panamá \| Bancos | 53 |
| **Title EN** | ISO 9001 for the Financial Sector in Panama \| Banks | 51 |
| **Desc ES** | Sistemas de gestión ISO 9001:2015 adaptados a procesos bancarios: documentación de procesos core, controles, auditorías internas y preparación para certificar. | 159 |
| **Desc EN** | ISO 9001:2015 management systems adapted to banking processes: core process documentation, controls, internal audits and certification readiness. | 145 |
| **Keyword** | ISO 9001 sector financiero / ISO 9001 financial sector | |
| **Breadcrumb** | ISO 9001 Financiero / ISO 9001 Financial | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.6 · monthly | |

### `/industrias/manufactura-logistica`

> **H1 actual:** Consultoría para manufactura: eficiencia operativa y sistemas de calidad

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Consultoría para Manufactura y Logística en Panamá | 50 |
| **Title EN** | Manufacturing and Logistics Consulting Services in Panama | 57 |
| **Desc ES** | Proyectos industriales, Lean Manufacturing, Six Sigma, ISO 9001 y digitalización de operaciones. PMs con experiencia en plantas de producción. | 142 |
| **Desc EN** | Industrial projects, Lean Manufacturing, Six Sigma, ISO 9001 and operations digitization. Managers experienced in production plants and complex logistics. | 154 |
| **Keyword** | consultoría manufactura / manufacturing consulting | |
| **Breadcrumb** | Manufactura y Logística / Manufacturing & Logistics | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/industrias/retail-comercio` 🇪🇸

> **H1 actual:** Consultoría para retail: transformación digital y omnicanalidad

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Consultoría para Retail y Comercio en Panamá \| Omnicanal | 56 |
| **Title EN** | Retail and Commerce Consulting in Panama \| Omnichannel | 54 |
| **Desc ES** | Transformación digital retail, e-commerce, integración omnicanal y optimización de operaciones. PMs que entienden operar tiendas físicas y canales digitales. | 157 |
| **Desc EN** | Retail digital transformation, e-commerce, omnichannel integration and operations optimization. Managers who understand stores and digital channels at once. | 156 |
| **Keyword** | consultoría retail / retail consulting | |
| **Breadcrumb** | Retail y Comercio / Retail & Commerce | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/industrias/tecnologia-telecomunicaciones` 🇪🇸

> **H1 actual:** Consultoría para empresas tech: gestión de proyectos ágiles y desarrollo

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Consultoría para Empresas Tech y Telecom en Panamá | 50 |
| **Title EN** | Technology and Telecom Consulting in Panama \| Agile PMs | 55 |
| **Desc ES** | Scrum Masters certificados y Project Managers para implementaciones tecnológicas, desarrollo e integración. 10+ años en proyectos tech con metodologías ágiles. | 159 |
| **Desc EN** | Certified Scrum Masters and Project Managers for technology rollouts, development and integration. 10+ years on complex tech projects with agile methods. | 153 |
| **Keyword** | consultoría tecnología telecomunicaciones / technology telecom consulting | |
| **Breadcrumb** | Tecnología y Telecom / Technology & Telecom | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/industrias/servicios-profesionales` 🇪🇸

> **H1 actual:** Consultoría para firmas de servicios: gestión de proyectos y eficiencia

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Consultoría para Firmas de Servicios Profesionales Panamá | 57 |
| **Title EN** | Consulting for Professional Services Firms in Panama | 52 |
| **Desc ES** | Gestión de proyectos, optimización de operaciones y sistemas de calidad. PMs que entienden facturación por hora, utilización y rentabilidad por cliente. | 152 |
| **Desc EN** | Project management, operations optimization, quality systems and tooling. Managers who understand hourly billing, utilization and per-client profitability. | 155 |
| **Keyword** | consultoría servicios profesionales / professional services consulting | |
| **Breadcrumb** | Servicios Profesionales / Professional Services | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/industrias/gobierno-sector-publico`

> **H1 actual:** Consultoría para entidades gubernamentales: gestión de proyectos y modernización

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Consultoría para Gobierno y Sector Público en Panamá | 52 |
| **Title EN** | Government and Public Sector Consulting Services in Panama | 58 |
| **Desc ES** | Proyectos públicos complejos, optimización de procesos, sistemas de calidad y modernización de servicios. PMs con experiencia en contratación pública. | 150 |
| **Desc EN** | Complex public projects, government process optimization, quality systems and service modernization. Managers experienced in public procurement rules. | 150 |
| **Keyword** | consultoría sector público / public sector consulting | |
| **Breadcrumb** | Gobierno y Sector Público / Government & Public Sector | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

### `/industrias/salud-farmaceutica`

> **H1 actual:** Consultoría para sector salud: calidad y cumplimiento regulatorio

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Consultoría para el Sector Salud y Farmacéutico en Panamá | 57 |
| **Title EN** | Healthcare and Pharmaceutical Consulting in Panama | 50 |
| **Desc ES** | Proyectos en instituciones de salud, sistemas de calidad, cumplimiento regulatorio sanitario y optimización de procesos clínicos y administrativos. | 147 |
| **Desc EN** | Projects in healthcare institutions, quality systems, health regulatory compliance and optimization of clinical and administrative processes. | 141 |
| **Keyword** | consultoría sector salud / healthcare consulting | |
| **Breadcrumb** | Salud y Farmacéutica / Healthcare & Pharma | |
| **updatedAt · priority · freq** | 2026-01-26 · 0.7 · monthly | |

### `/industrias/energia-utilities` 🇪🇸

> **H1 actual:** Consultoría para sector energía: proyectos de infraestructura y operaciones críticas

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Consultoría para el Sector Energía y Utilities en Panamá | 56 |
| **Title EN** | Energy and Utilities Consulting in Panama \| Infrastructure | 58 |
| **Desc ES** | Proyectos de infraestructura energética, optimización de operaciones 24/7, sistemas de calidad y mantenimiento de activos críticos con PMs certificados. | 152 |
| **Desc EN** | Energy infrastructure projects, 24/7 operations optimization, quality systems and critical asset maintenance, led by certified project managers. | 144 |
| **Keyword** | consultoría sector energía / energy sector consulting | |
| **Breadcrumb** | Energía y Utilities / Energy & Utilities | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.7 · monthly | |

## Páginas institucionales

### `/nosotros`

> **H1 actual:** Transformamos Empresas con Resultados

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Sobre Nosotros \| Consultores Certificados PMP e ISO 9001 | 56 |
| **Title EN** | About Us \| PMP and ISO 9001 Certified Consultants in Panama | 59 |
| **Desc ES** | Consultores especializados en optimización de procesos, gestión de proyectos y transformación digital para el sector servicios en América Latina. | 145 |
| **Desc EN** | Consultants specialized in process optimization, project management and digital transformation for the services sector across Latin America. | 140 |
| **Keyword** | sobre Grupo Alternative / about Grupo Alternative | |
| **Breadcrumb** | Nosotros / About Us | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.8 · monthly | |

### `/nosotros/katherine-gonzalez`

> **H1 actual:** Katherine González

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Katherine González \| Fundadora y CEO de Grupo Alternative | 57 |
| **Title EN** | Katherine González \| Founder and CEO of Grupo Alternative | 57 |
| **Desc ES** | Líder con más de 15 años transformando organizaciones en Latinoamérica. Especialista en estrategia, optimización de procesos y transformación digital. | 150 |
| **Desc EN** | Leader with over 15 years transforming organizations across Latin America. Specialist in strategic consulting, process optimization and digital transformation. | 159 |
| **Keyword** | Katherine González consultora / Katherine González consultant | |
| **Breadcrumb** | Katherine González / Katherine González | |
| **updatedAt · priority · freq** | 2026-02-02 · 0.6 · monthly | |

### `/contacto`

> **H1 actual:** Contacto

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Contacto \| Diagnóstico Gratuito para tu Empresa en Panamá | 57 |
| **Title EN** | Contact Us \| Free Business Diagnosis for Your Company | 53 |
| **Desc ES** | Agenda un diagnóstico gratuito de 15 minutos con nuestro equipo de consultores en Ciudad de Panamá. Cuéntanos tu reto y te decimos por dónde empezar. | 149 |
| **Desc EN** | Book a free 15-minute diagnosis with our consulting team in Panama City. Tell us your operational challenge and we will show you where to start. | 144 |
| **Keyword** | contacto consultoría Panamá / contact consulting Panama | |
| **Breadcrumb** | Contacto / Contact | |
| **updatedAt · priority · freq** | 2026-01-29 · 0.8 · monthly | |

### `/casos-exito` · `noindex`

> **H1 actual:** Casos de Éxito

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Casos de Éxito \| Próximamente en Grupo Alternative | 50 |
| **Title EN** | Success Stories \| Coming Soon at Grupo Alternative | 50 |
| **Desc ES** | Estamos preparando los casos de éxito con métricas verificadas de nuestros proyectos de consultoría. Mientras tanto, escríbenos para conocer referencias. | 153 |
| **Desc EN** | We are preparing success stories with verified metrics from our consulting projects. In the meantime, contact us to request client references. | 142 |
| **Keyword** | casos de éxito consultoría / consulting success stories | |
| **Breadcrumb** | Casos de Éxito / Success Stories | |
| **updatedAt · priority · freq** | 2026-01-23 · 0.3 · monthly | |

### `/blog`

> **H1 actual:** Insights y Tendencias

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Blog de Procesos, Calidad y Proyectos \| Grupo Alternative | 57 |
| **Title EN** | Blog on Processes, Quality and Projects \| Alternative | 53 |
| **Desc ES** | Insights y tendencias sobre optimización de procesos, sistemas de calidad, gestión de proyectos y transformación digital, escritos por consultores en ejercicio. | 160 |
| **Desc EN** | Insights and trends on process optimization, quality systems, project management and digital transformation, written by practicing consultants. | 143 |
| **Keyword** | blog consultoría empresarial / business consulting blog | |
| **Breadcrumb** | Blog / Blog | |
| **updatedAt · priority · freq** | 2026-01-28 · 0.9 · weekly | |

### `/helpdesk-it` 🇪🇸 · `noindex`

> **H1 actual:** Helpdesk IT – Alternative

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Helpdesk IT \| Soporte Técnico para Clientes de Alternative | 58 |
| **Title EN** | IT Helpdesk \| Technical Support for Alternative Clients | 55 |
| **Desc ES** | Formulario para reportar incidencias, solicitudes de soporte o requerimientos técnicos de los servicios contratados. Damos seguimiento por correo electrónico. | 158 |
| **Desc EN** | Form to report incidents, support requests or technical requirements related to your contracted services. Our team follows up with you by email. | 144 |
| **Keyword** | helpdesk soporte IT / IT helpdesk support | |
| **Breadcrumb** | Helpdesk IT / IT Helpdesk | |
| **updatedAt · priority · freq** | 2026-01-27 · 0.1 · monthly | |

## Recursos y herramientas

### `/recursos`

> **H1 actual:** Recursos

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Recursos Gratuitos \| Guías y Herramientas de Consultoría | 56 |
| **Title EN** | Free Resources \| Consulting Guides, Tools and Calculators | 57 |
| **Desc ES** | Guías descargables, calculadoras y contenido gratuito sobre procesos, calidad, proyectos y transformación digital para equipos directivos en Panamá y LATAM. | 156 |
| **Desc EN** | Downloadable guides, calculators and free content on processes, quality, projects and digital transformation for management teams in Panama and LATAM. | 150 |
| **Keyword** | recursos de consultoría / consulting resources | |
| **Breadcrumb** | Recursos / Resources | |
| **updatedAt · priority · freq** | 2026-01-29 · 0.9 · weekly | |

### `/recursos/calculadoras`

> **H1 actual:** Calculadoras

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Calculadoras Gratuitas para Empresas \| ROI y Madurez | 52 |
| **Title EN** | Free Business Calculators \| ROI and Digital Maturity | 52 |
| **Desc ES** | Herramientas interactivas y gratuitas para cuantificar el impacto de tus iniciativas: retorno de la optimización de procesos y nivel de madurez digital. | 152 |
| **Desc EN** | Free interactive tools to quantify the impact of your initiatives: return on process optimization and your organization digital maturity level. | 143 |
| **Keyword** | calculadoras empresariales / business calculators | |
| **Breadcrumb** | Calculadoras / Calculators | |
| **updatedAt · priority · freq** | 2026-01-29 · 0.7 · monthly | |

### `/recursos/calculadoras/roi-optimizacion-procesos`

> **H1 actual:** Calculadora de ROI: Optimización de Procesos

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Calculadora de ROI de Optimización de Procesos \| Gratis | 55 |
| **Title EN** | Process Optimization ROI Calculator \| Free Online Tool | 54 |
| **Desc ES** | Calcula gratis el retorno de invertir en optimizar tus procesos: ahorro estimado, payback y ROI a partir de tus propios datos operativos. Resultado en minutos. | 159 |
| **Desc EN** | Calculate for free the return of investing in process optimization: estimated savings, payback and ROI from your own operating data. Results in minutes. | 152 |
| **Keyword** | calculadora ROI procesos / process ROI calculator | |
| **Breadcrumb** | Calculadora de ROI / ROI Calculator | |
| **updatedAt · priority · freq** | 2026-01-29 · 0.7 · monthly | |

### `/recursos/calculadoras/madurez-digital`

> **H1 actual:** ¿Qué tan digital es tu empresa?

| | Texto propuesto | chars |
|---|---|---:|
| **Title ES** | Test de Madurez Digital Gratis \| Evalúa tu Empresa | 50 |
| **Title EN** | Free Digital Maturity Test \| Assess Your Company Online | 55 |
| **Desc ES** | ¿Qué tan digital es tu empresa? Responde el cuestionario y obtén un diagnóstico gratuito de tu nivel de madurez digital con recomendaciones priorizadas. | 152 |
| **Desc EN** | How digital is your company? Answer the questionnaire and get a free assessment of your digital maturity level with prioritized recommendations. | 144 |
| **Keyword** | test madurez digital / digital maturity assessment | |
| **Breadcrumb** | Madurez Digital / Digital Maturity | |
| **updatedAt · priority · freq** | 2026-01-29 · 0.7 · monthly | |


---

## Notas, decisiones y desviaciones del prompt

### 1. Corrección al audit: son 55 rutas estáticas, no 57

`docs/SEO-AUDIT.md` dice "57 rutas ES". El conteo real sobre el árbol de archivos es **55** rutas estáticas (excluyendo dinámicas y `/studio`). El audit contó 2 de más. Aplicando la regla "cuando el audit y el código real difieran, manda el código real":

| | |
|---|---|
| `page.tsx` bajo `app/[locale]/` | 66 |
| menos rutas dinámicas (`[slug]`, `[subslug]`, `[[...tool]]`) | −11 → 55 |
| menos `business-consultants` (se elimina en Fase 3) | −1 → **54 en el registro** |

En consecuencia, la cifra "53 de 57 comparten title" del audit es realmente **52 de 55**. La sustancia del hallazgo no cambia.

### 2. `certificacion-iso`: no usé el title de ejemplo del prompt

El prompt propone `Certificación ISO en Panamá: 9001, 14001, 27001 y 45001`. **No lo usé**: la página solo habla de ISO 9001 (H1: "De cero al certificado ISO 9001 con acompañamiento completo"; el copy no menciona 14001, 27001 ni 45001 en ningún punto). Prometer cuatro normas que la página no cubre generaría una discrepancia title/contenido y un rebote alto.

Title aplicado: `Certificación ISO 9001 en Panamá | 85% Aprueba a la 1ª`.

👉 Si Alternative **sí** presta servicio sobre 14001/27001/45001, dímelo: cambio el title y habría que ampliar el copy de la página.

### 3. `/casos-exito` → `noindex` con metadata honesta

Siguiendo tu punto: la página es hoy un placeholder ("Contenido en desarrollo"). Le puse `noindex: true`, `priority: 0.3` y metadata que dice la verdad ("Próximamente"). En la Fase 3 saldrá del sitemap. Los ~16 enlaces internos que apuntan a ella se mantienen (no toco diseño ni navegación).

### 4. `/helpdesk-it` → en el registro con `noindex: true`

Resuelto según tu punto 5.

### 5. 🇪🇸 Cinco páginas tienen el H1 en español también en `/en`

Estas páginas **no** usan ternario `isEs ? … : …` en su H1 ni en su hero: el texto está hardcodeado en español y se sirve igual en `/en`.

| Ruta | H1 (se muestra igual en `/es` y `/en`) |
|---|---|
| `/industrias/energia-utilities` | Consultoría para sector energía: proyectos de infraestructura y operaciones críticas |
| `/industrias/retail-comercio` | Consultoría para retail: transformación digital y omnicanalidad |
| `/industrias/servicios-profesionales` | Consultoría para firmas de servicios: gestión de proyectos y eficiencia |
| `/industrias/tecnologia-telecomunicaciones` | Consultoría para empresas tech: gestión de proyectos ágiles y desarrollo |
| `/helpdesk-it` | Helpdesk IT – Alternative |

**No lo corregí**: es un cambio de copy visible, fuera del alcance que fijaste ("no cambies copy visible"). El registro sí trae title y description correctos en inglés para esas rutas, así que la metadata quedará bien aunque el H1 siga en español — pero es una incoherencia que un revisor de calidad notará.

`TODO_EDWIN`: decidir si se traducen esos 5 H1 y sus heros en una fase aparte.

### 6. Todas las cifras salen del copy real

Ninguna cifra es inventada. Trazabilidad:

| Cifra usada | Ruta de origen |
|---|---|
| 30-50% costos · 40%+ productividad | `lean-six-sigma` (hero) |
| 60-80% reducción de tiempos | `automatizacion-procesos` (hero) |
| 40-60% reducción de tiempos | `digitalizacion-procesos` (hero) |
| 4-8 meses · 85%+ primera auditoría | `sistemas-calidad`, `certificacion-iso` (hero) |
| Metodología en 7 fases | `implementacion-iso-9001` (hero) |
| 5-15 años de experiencia | `pmp-project-management` (hero) |
| Entregas cada 2-4 semanas | `metodologias-agiles` (hero) |
| Plan a 3-5 años | `planificacion-estrategica` (hero) |
| Más de 10 años en banca | `industrias/banca-servicios-financieros` (hero) |
| 10+ años en tech | `industrias/tecnologia-telecomunicaciones` (hero) |
| Más de 15 años (Katherine) | `nosotros/katherine-gonzalez` (hero) |
| Diagnóstico gratuito de 15 min | `contacto` (hero) |

### 7. `TODO_EDWIN` — cifras contradictorias entre secciones

Detectadas al escribir los textos. **No decidí ninguna**; las descriptions evitan estos números salvo donde son inequívocos:

| Dato | Valor A | Valor B | Valor C |
|---|---|---|---|
| Años de experiencia de la empresa | Hero home: **15+** | `nosotros/layout`: **más de 5 años** | Banca: **más de 10 años** |
| Proyectos completados | Hero home: **500+** | `messages/es.json` (`hero.stats.projects`): **50+** | — |

La home dice "15+ Años de Experiencia" y la description de `/nosotros` decía "Más de 5 años". En la description nueva de `/nosotros` **omití el número** hasta que confirmes cuál es el correcto.

### 8. `updatedAt` = fecha del último commit del `page.tsx`

Extraída con `git log -1 --format=%cs -- <archivo>`. Es el dato más honesto disponible en el repo y alimentará el `lastmod` del sitemap en la Fase 3, sustituyendo el `new Date()` actual. Si sabes que alguna página cambió de contenido en otra fecha, corrígela en el registro.

### 9. Qué NO está en el registro y por qué

| Ruta | Motivo |
|---|---|
| `/business-consultants` | Se elimina en Fase 3.6 (duplica `/nosotros`); pasa a redirect |
| `/blog/[slug]` | Ya tiene `generateMetadata` propia desde Sanity/estático |
| `/industrias/[slug]`, `/industrias/banca…/[subslug]`, `/recursos/[slug]` | Dinámicas; en Fase 3.4 reciben `notFound()` + `generateStaticParams` |
| `/servicios/*/[slug]` (×6) | Stubs "Contenido en desarrollo"; se eliminan en Fase 3.4 |
| `/studio`, `/[locale]/studio` | Fase 3.2: se queda solo `app/studio/` con `noindex` |

---

## Estado de la Fase 1a

| Check | Resultado |
|---|---|
| Rutas en el registro | 54 |
| Cobertura vs. árbol de `app/[locale]/` | 54/54 — sin faltantes ni sobrantes |
| Titles fuera de 50–60 chars | 0 |
| Descriptions fuera de 140–160 chars | 0 |
| Combinaciones title/description duplicadas | **0** (de 108) |
| `tsc --noEmit` sobre `lib/seo/routes.ts` | limpio |

**Archivos creados:** `lib/seo/routes.ts`, `docs/seo-titles-review.md`.
**Archivos modificados:** ninguno. Ninguna página, layout ni configuración se ha tocado todavía.

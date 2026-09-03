/**
 * Registro central de rutas indexables — única fuente de verdad para
 * metadata, sitemap, breadcrumbs y JSON-LD.
 *
 * Reglas:
 * - `title` NO lleva sufijo de marca: el layout ya no aplica `template`.
 * - `description` describe qué es, para quién y el beneficio concreto.
 * - Toda cifra proviene del copy real de la página. No se inventan datos.
 * - Ninguna combinación title/description puede repetirse (lo valida `npm run seo:check`).
 * - `updatedAt` = fecha del último commit que tocó el `page.tsx` correspondiente.
 */

export type PageType = 'home' | 'hub' | 'service' | 'industry' | 'page' | 'tool';

export interface RouteMeta {
  /** Path sin locale, p.ej. '/servicios/sistemas-calidad/certificacion-iso'. La home es ''. */
  path: string;
  type: PageType;
  /** 50–60 caracteres, sin sufijo de marca. */
  title: { es: string; en: string };
  /** 140–160 caracteres. */
  description: { es: string; en: string };
  /** Keyword principal: alimenta `Service.serviceType` y el control interno. */
  keyword: { es: string; en: string };
  /** ISO date del último cambio real de contenido. */
  updatedAt: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly';
  /** Label corto para BreadcrumbList. */
  breadcrumb: { es: string; en: string };
  noindex?: boolean;
}

export const ROUTES: RouteMeta[] = [
  // ─────────────────────────────────────────────────────────────
  // HOME
  // ─────────────────────────────────────────────────────────────
  {
    path: '',
    type: 'home',
    title: {
      es: 'Consultoría Empresarial en Panamá | Grupo Alternative',
      en: 'Business Consulting Firm in Panama | Grupo Alternative',
    },
    description: {
      es: 'Consultoría en procesos, calidad, proyectos y transformación digital para empresas en Panamá y LATAM. Equipo PMP® e ISO 9001 Lead Auditor. Diagnóstico gratuito.',
      en: 'Consulting in processes, quality, projects and digital transformation for companies in Panama and LATAM. PMP® and ISO 9001 Lead Auditor team. Free diagnosis.',
    },
    keyword: { es: 'consultoría empresarial Panamá', en: 'business consulting Panama' },
    updatedAt: '2026-03-03',
    priority: 1.0,
    changeFrequency: 'weekly',
    breadcrumb: { es: 'Inicio', en: 'Home' },
  },

  // ─────────────────────────────────────────────────────────────
  // SERVICIOS — hub
  // ─────────────────────────────────────────────────────────────
  {
    path: '/servicios',
    type: 'hub',
    title: {
      es: 'Servicios de Consultoría Empresarial en Panamá | 6 Áreas',
      en: 'Business Consulting Services in Panama | 6 Practice Areas',
    },
    description: {
      es: 'Seis áreas de especialización: procesos, calidad, proyectos, transformación digital, estrategia y desarrollo tecnológico. Del diagnóstico a la implementación.',
      en: 'Six areas of expertise: processes, quality, projects, digital transformation, strategy and technology development. From diagnosis to full implementation.',
    },
    keyword: { es: 'servicios de consultoría', en: 'consulting services' },
    updatedAt: '2026-01-23',
    priority: 0.9,
    changeFrequency: 'weekly',
    breadcrumb: { es: 'Servicios', en: 'Services' },
  },

  // ── Optimización de procesos ─────────────────────────────────
  {
    path: '/servicios/optimizacion-procesos',
    type: 'service',
    title: {
      es: 'Optimización de Procesos en Panamá | Reduce Costos',
      en: 'Process Optimization in Panama | Reduce Operating Costs',
    },
    description: {
      es: 'Rediseñamos tus procesos para reducir costos y acelerar el crecimiento: BPM, Lean Six Sigma, diseño de procesos y automatización. Resultados medibles.',
      en: 'We redesign your processes to cut costs and accelerate growth: BPM, Lean Six Sigma, process design and automation. Measurable results, not slideware.',
    },
    keyword: { es: 'optimización de procesos', en: 'process optimization' },
    updatedAt: '2026-02-02',
    priority: 0.8,
    changeFrequency: 'weekly',
    breadcrumb: { es: 'Optimización de Procesos', en: 'Process Optimization' },
  },
  {
    path: '/servicios/optimizacion-procesos/bpm-empresarial',
    type: 'service',
    title: {
      es: 'Consultoría BPM en Panamá | Gestión de Procesos de Negocio',
      en: 'BPM Consulting in Panama | Business Process Management',
    },
    description: {
      es: 'Implementamos Business Process Management para gestionar procesos de forma continua: diseño, monitoreo, mejora y gobierno. Para operaciones complejas.',
      en: 'We implement Business Process Management to run processes continuously: design, monitoring, improvement and governance. For complex cross-department operations.',
    },
    keyword: { es: 'BPM empresarial', en: 'business process management' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'BPM Empresarial', en: 'Business BPM' },
  },
  {
    path: '/servicios/optimizacion-procesos/lean-six-sigma',
    type: 'service',
    title: {
      es: 'Lean Six Sigma en Panamá | Consultoría con Black Belt',
      en: 'Lean Six Sigma in Panama | Black Belt Certified Consulting',
    },
    description: {
      es: 'Metodología probada para eliminar desperdicios y variabilidad: reducción de 30-50% en costos y mejora de 40%+ en productividad. Equipo certificado Black Belt.',
      en: 'Proven methodology to remove waste and variability: 30-50% cost reduction and 40%+ productivity improvement. Black Belt certified team across many industries.',
    },
    keyword: { es: 'Lean Six Sigma', en: 'Lean Six Sigma' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Lean Six Sigma', en: 'Lean Six Sigma' },
  },
  {
    path: '/servicios/optimizacion-procesos/diseno-procesos',
    type: 'service',
    title: {
      es: 'Diseño de Procesos en Panamá | Mapeo y Estandarización',
      en: 'Process Design in Panama | Mapping and Standardization',
    },
    description: {
      es: 'Diseño y rediseño de procesos con metodología estructurada. Procesos documentados, estandarizados y listos para escalar, certificar ISO y ganar eficiencia.',
      en: 'Process design and redesign with structured methodology. Documented, standardized processes ready to scale, pass ISO certification and gain efficiency.',
    },
    keyword: { es: 'diseño de procesos', en: 'process design' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Diseño de Procesos', en: 'Process Design' },
  },
  {
    path: '/servicios/optimizacion-procesos/automatizacion-procesos',
    type: 'service',
    title: {
      es: 'Automatización de Procesos con RPA en Panamá | Bots y APIs',
      en: 'Process Automation with RPA in Panama | Bots and APIs',
    },
    description: {
      es: 'RPA e integraciones entre sistemas para eliminar tareas repetitivas, con reducción de 60-80% en tiempos. Primero optimizamos y luego automatizamos.',
      en: 'RPA and system integrations that remove repetitive manual tasks, with 60-80% time reduction. We optimize the process first and automate it second.',
    },
    keyword: { es: 'automatización de procesos', en: 'process automation' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Automatización', en: 'Automation' },
  },

  // ── Sistemas de calidad ──────────────────────────────────────
  {
    path: '/servicios/sistemas-calidad',
    type: 'service',
    title: {
      es: 'Sistemas de Gestión de Calidad en Panamá | Consultoría',
      en: 'Quality Management Systems Consulting in Panama',
    },
    description: {
      es: 'Diseñamos, implementamos y auditamos tu sistema de gestión de calidad, con o sin certificación. Para banca, manufactura y servicios con exigencia regulatoria.',
      en: 'We design, implement and audit your quality management system, with or without certification. For banking, manufacturing and regulated service companies.',
    },
    keyword: { es: 'sistema de gestión de calidad Panamá', en: 'quality management system Panama' },
    updatedAt: '2026-02-02',
    priority: 0.8,
    changeFrequency: 'weekly',
    breadcrumb: { es: 'Sistemas de Calidad', en: 'Quality Systems' },
  },
  {
    path: '/servicios/sistemas-calidad/implementacion-iso-9001',
    type: 'service',
    title: {
      es: 'Implementación ISO 9001:2015 en Panamá | 4-8 Meses',
      en: 'ISO 9001:2015 Implementation in Panama | 4-8 Months',
    },
    description: {
      es: 'Implementamos sistemas de gestión de calidad ISO 9001:2015 desde cero: metodología en 7 fases, documentación, capacitación y auditorías internas.',
      en: 'We implement ISO 9001:2015 quality management systems from scratch: 7-phase methodology, documentation, training and internal audits through certification.',
    },
    keyword: { es: 'implementación ISO 9001', en: 'ISO 9001 implementation' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Implementación ISO 9001', en: 'ISO 9001 Implementation' },
  },
  {
    path: '/servicios/sistemas-calidad/auditoria-calidad',
    type: 'service',
    title: {
      es: 'Auditoría de Calidad ISO 9001 en Panamá | Lead Auditor',
      en: 'ISO 9001 Quality Audit in Panama | Lead Auditor Certified',
    },
    description: {
      es: 'Auditorías internas completas, enfocadas o de seguimiento con auditores ISO 9001 Lead Auditor. Detecta y corrige hallazgos antes de la certificación.',
      en: 'Complete, focused or follow-up internal audits led by ISO 9001 Lead Auditor certified professionals. Find and fix findings before the certification audit.',
    },
    keyword: { es: 'auditoría de calidad', en: 'quality audit' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Auditoría de Calidad', en: 'Quality Audit' },
  },
  {
    path: '/servicios/sistemas-calidad/certificacion-iso',
    type: 'service',
    title: {
      es: 'Certificación ISO 9001 en Panamá | De Cero al Certificado',
      en: 'ISO 9001 Certification in Panama | From Zero to Certified',
    },
    description: {
      es: 'De cero al certificado ISO 9001 con acompañamiento completo: implementación, auditorías internas y apoyo en la auditoría del organismo certificador. 4-8 meses.',
      en: 'From zero to ISO 9001 certificate with full support: implementation, internal audits and assistance during the certification body audit. Four to eight months.',
    },
    keyword: { es: 'certificación ISO 9001', en: 'ISO 9001 certification' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Certificación ISO', en: 'ISO Certification' },
  },
  {
    path: '/servicios/sistemas-calidad/gestion-calidad',
    type: 'service',
    title: {
      es: 'Gestión de Calidad Pragmática en Panamá | Sin Burocracia',
      en: 'Pragmatic Quality Management in Panama | No Bureaucracy',
    },
    description: {
      es: 'Calidad estructurada sin la burocracia de una certificación ISO. Solo lo esencial: controles, indicadores y mejora continua a la medida de tu operación.',
      en: 'Structured quality without ISO certification bureaucracy. Only the essentials, maximum impact: controls, indicators and continuous improvement built to fit you.',
    },
    keyword: { es: 'gestión de calidad', en: 'quality management' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Gestión de Calidad', en: 'Quality Management' },
  },

  // ── Gestión de proyectos ─────────────────────────────────────
  {
    path: '/servicios/gestion-proyectos',
    type: 'service',
    title: {
      es: 'Consultoría en Gestión de Proyectos en Panamá | PMO y PMP',
      en: 'Project Management Consulting in Panama | PMO and PMP',
    },
    description: {
      es: 'Cuatro frentes en un mismo equipo: Project Managers PMP® tercerizados, Scrum Masters, implementación de PMO y casos de negocio. Se integran en días, no meses.',
      en: 'Four fronts in a single team: outsourced PMP® project managers, Scrum Masters, PMO implementation and business cases. They join you in days, not months.',
    },
    keyword: { es: 'gestión de proyectos', en: 'project management' },
    updatedAt: '2026-02-02',
    priority: 0.8,
    changeFrequency: 'weekly',
    breadcrumb: { es: 'Gestión de Proyectos', en: 'Project Management' },
  },
  {
    path: '/servicios/gestion-proyectos/pmp-project-management',
    type: 'service',
    title: {
      es: 'Project Managers PMP en Panamá | Tercerización de PMs',
      en: 'PMP Project Managers in Panama | PM Outsourcing Service',
    },
    description: {
      es: 'Profesionales con certificación PMP activa y 5-15 años de experiencia, listos para integrarse a tu proyecto en días. Sin riesgo de contratación permanente.',
      en: 'Professionals with active PMP certification and 5-15 years of experience, ready to join your project in days. Without the risk of a permanent hire.',
    },
    keyword: { es: 'project manager PMP', en: 'PMP project manager' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Project Management PMP', en: 'PMP Project Management' },
  },
  {
    path: '/servicios/gestion-proyectos/metodologias-agiles',
    type: 'service',
    title: {
      es: 'Metodologías Ágiles en Panamá | Scrum Masters Certificados',
      en: 'Agile Methodologies in Panama | Certified Scrum Masters',
    },
    description: {
      es: 'Scrum Masters certificados que transforman equipos de desarrollo: entregas cada 2-4 semanas, feedback continuo y mejora constante en productos digitales.',
      en: 'Certified Scrum Masters who transform development teams: deliveries every 2-4 weeks, continuous feedback and steady improvement in digital products.',
    },
    keyword: { es: 'metodologías ágiles Scrum', en: 'agile methodologies Scrum' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Metodologías Ágiles', en: 'Agile Methodologies' },
  },
  {
    path: '/servicios/gestion-proyectos/pmo-office',
    type: 'service',
    title: {
      es: 'Implementación de PMO en Panamá | Oficina de Proyectos',
      en: 'PMO Implementation in Panama | Project Management Office',
    },
    description: {
      es: 'Implementa un PMO interno con nuestra consultoría o incorpora un Director PMO tercerizado. Alinea proyectos con la estrategia y prioriza mejor tus recursos.',
      en: 'Build an internal PMO with our consulting or bring in an outsourced PMO Director. Align projects to strategy, prioritize resources and reduce project failure.',
    },
    keyword: { es: 'implementación PMO', en: 'PMO implementation' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'PMO', en: 'PMO' },
  },
  {
    path: '/servicios/gestion-proyectos/casos-negocio',
    type: 'service',
    title: {
      es: 'Casos de Negocio en Panamá | ROI, VPN y TIR para tu Junta',
      en: 'Business Cases in Panama | ROI, NPV and IRR for Your Board',
    },
    description: {
      es: 'Casos de negocio con análisis financiero de ROI, VPN, TIR y payback, alternativas evaluadas y presentación ejecutiva. Para que tu proyecto sea aprobado.',
      en: 'Rigorous business cases with ROI, NPV, IRR and payback analysis, evaluated alternatives and an executive presentation. So your project gets the green light.',
    },
    keyword: { es: 'caso de negocio', en: 'business case' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Casos de Negocio', en: 'Business Cases' },
  },

  // ── Transformación digital ───────────────────────────────────
  {
    path: '/servicios/transformacion-digital',
    type: 'service',
    title: {
      es: 'Transformación Digital en Panamá | Estrategia y Ejecución',
      en: 'Digital Transformation in Panama | Strategy and Delivery',
    },
    description: {
      es: 'De la estrategia digital a la implementación: digitalización de procesos, gestión del cambio y análisis de datos. Transformación con resultados medibles.',
      en: 'From digital strategy to implementation: process digitization, change management and data analytics. Transformation with measurable business results.',
    },
    keyword: { es: 'transformación digital', en: 'digital transformation' },
    updatedAt: '2026-02-02',
    priority: 0.8,
    changeFrequency: 'weekly',
    breadcrumb: { es: 'Transformación Digital', en: 'Digital Transformation' },
  },
  {
    path: '/servicios/transformacion-digital/estrategia-digital',
    type: 'service',
    title: {
      es: 'Estrategia Digital en Panamá | Roadmap Priorizado por ROI',
      en: 'Digital Strategy in Panama | ROI-Prioritized Roadmap',
    },
    description: {
      es: 'Estrategia digital con roadmap de implementación, iniciativas priorizadas por ROI y business cases tecnológicos. Define dónde invertir y cómo generar valor.',
      en: 'Digital strategy with an implementation roadmap, initiatives prioritized by ROI and technology business cases. Defines where to invest and how to create value.',
    },
    keyword: { es: 'estrategia digital', en: 'digital strategy' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Estrategia Digital', en: 'Digital Strategy' },
  },
  {
    path: '/servicios/transformacion-digital/change-management',
    type: 'service',
    title: {
      es: 'Gestión del Cambio en Panamá | Adopción de Tecnología',
      en: 'Change Management in Panama | Drive Technology Adoption',
    },
    description: {
      es: 'Gestión estructurada del cambio en transformaciones digitales: comunicación, capacitación, manejo de resistencias y cultura para que la tecnología se use.',
      en: 'Structured organizational change for digital transformations: communication, training, resistance management and digital culture so the technology gets used.',
    },
    keyword: { es: 'gestión del cambio', en: 'change management' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Gestión del Cambio', en: 'Change Management' },
  },
  {
    path: '/servicios/transformacion-digital/digitalizacion-procesos',
    type: 'service',
    title: {
      es: 'Digitalización de Procesos en Panamá | Cero Papel',
      en: 'Process Digitization in Panama | Paperless Operations',
    },
    description: {
      es: 'Digitalización de documentos, formularios y flujos de aprobación para sacar el papel de tu operación. Hasta 40-60% menos tiempo en los procesos clave.',
      en: 'Digitization of documents, forms and approval flows to take paper out of your operation. Up to 40-60% less time on your key business processes.',
    },
    keyword: { es: 'digitalización de procesos cero papel', en: 'paperless process digitization' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Digitalización', en: 'Digitization' },
  },
  {
    path: '/servicios/transformacion-digital/analisis-datos',
    type: 'service',
    title: {
      es: 'Análisis de Datos y BI en Panamá | Dashboards Ejecutivos',
      en: 'Data Analytics and BI in Panama | Executive Dashboards',
    },
    description: {
      es: 'Business Intelligence y análisis de datos: consolidación de fuentes dispersas, dashboards ejecutivos en tiempo real, reportes y analytics predictivo.',
      en: 'Business Intelligence and data analytics: consolidation of scattered sources, real-time executive dashboards, automated reporting and predictive analytics.',
    },
    keyword: { es: 'análisis de datos business intelligence', en: 'data analytics business intelligence' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Análisis de Datos', en: 'Data Analytics' },
  },

  // ── Consultoría estratégica ──────────────────────────────────
  {
    path: '/servicios/consultoria-estrategica',
    type: 'service',
    title: {
      es: 'Consultoría Estratégica en Panamá | Rumbo y Ejecución',
      en: 'Strategic Consulting in Panama | Direction and Execution',
    },
    description: {
      es: 'Para empresas que necesitan claridad de rumbo: planificación estratégica, diagnóstico y diseño organizacional. Estrategia ejecutable, no PowerPoint.',
      en: 'For companies that need clarity of direction: strategic planning, organizational diagnosis and design. Executable strategy, not slideware left in a drawer.',
    },
    keyword: { es: 'consultoría estratégica', en: 'strategic consulting' },
    updatedAt: '2026-02-07',
    priority: 0.8,
    changeFrequency: 'weekly',
    breadcrumb: { es: 'Consultoría Estratégica', en: 'Strategic Consulting' },
  },
  {
    path: '/servicios/consultoria-estrategica/diagnostico-organizacional',
    type: 'service',
    title: {
      es: 'Diagnóstico Organizacional en Panamá | Evaluación 360°',
      en: 'Organizational Diagnosis in Panama | 360° Assessment',
    },
    description: {
      es: 'Evaluación profunda de cultura, procesos, estructura, capacidades y liderazgo. Un diagnóstico objetivo que revela qué funciona, qué no, y por qué.',
      en: 'In-depth evaluation of culture, processes, structure, capabilities and leadership. An objective diagnosis showing what works, what does not, and why.',
    },
    keyword: { es: 'diagnóstico organizacional', en: 'organizational diagnosis' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Diagnóstico Organizacional', en: 'Organizational Diagnosis' },
  },
  {
    path: '/servicios/consultoria-estrategica/diseno-organizacional',
    type: 'service',
    title: {
      es: 'Diseño Organizacional en Panamá | Estructura y Roles',
      en: 'Organizational Design in Panama | Structure and Roles',
    },
    description: {
      es: 'Diseño y rediseño de estructura: organigrama optimizado, roles y responsabilidades, governance y modelo operativo. Estructura que elimina silos.',
      en: 'Structure design and redesign: optimized org chart, roles and responsibilities, governance and operating model. A structure that removes dysfunctional silos.',
    },
    keyword: { es: 'diseño organizacional', en: 'organizational design' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Diseño Organizacional', en: 'Organizational Design' },
  },
  {
    path: '/servicios/consultoria-estrategica/planificacion-estrategica',
    type: 'service',
    title: {
      es: 'Planificación Estratégica en Panamá | Plan a 3-5 Años',
      en: 'Strategic Planning in Panama | Three to Five Year Plan',
    },
    description: {
      es: 'Plan estratégico a 3-5 años con visión clara, objetivos medibles, iniciativas priorizadas y roadmap de ejecución que se traduce en acciones concretas.',
      en: 'A 3-5 year strategic plan with clear vision, measurable objectives, prioritized initiatives and an execution roadmap that turns into concrete action.',
    },
    keyword: { es: 'planificación estratégica', en: 'strategic planning' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Planificación Estratégica', en: 'Strategic Planning' },
  },

  // ── Desarrollo y tecnología ──────────────────────────────────
  {
    path: '/servicios/desarrollo-tecnologia',
    type: 'service',
    title: {
      es: 'Desarrollo de Tecnología a Medida para Empresas en Panamá',
      en: 'Custom Technology Development for Companies in Panama',
    },
    description: {
      es: 'Software a medida, aplicaciones web y móviles, integración de sistemas y consultoría tecnológica. Tecnología para tu problema concreto, no soluciones genéricas.',
      en: 'Custom software, web and mobile applications, system integration and technology consulting. Technology built for your actual problem, not generic solutions.',
    },
    keyword: { es: 'desarrollo de tecnología', en: 'technology development' },
    updatedAt: '2026-02-02',
    priority: 0.8,
    changeFrequency: 'weekly',
    breadcrumb: { es: 'Desarrollo y Tecnología', en: 'Development & Technology' },
  },
  {
    path: '/servicios/desarrollo-tecnologia/desarrollo-software',
    type: 'service',
    title: {
      es: 'Desarrollo de Software a Medida en Panamá para Empresas',
      en: 'Custom Software Development in Panama for Companies',
    },
    description: {
      es: 'Software custom para automatizar procesos, gestionar operaciones complejas y manejar información crítica. Diseñado para tus flujos de trabajo reales.',
      en: 'Custom software to automate processes, run complex operations and handle critical information. Designed around your workflows, not software you must adapt to.',
    },
    keyword: { es: 'desarrollo de software a medida', en: 'custom software development' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Desarrollo de Software', en: 'Software Development' },
  },
  {
    path: '/servicios/desarrollo-tecnologia/aplicaciones-web-moviles',
    type: 'service',
    title: {
      es: 'Desarrollo de Apps Web y Móviles en Panamá | iOS/Android',
      en: 'Web and Mobile App Development in Panama | iOS/Android',
    },
    description: {
      es: 'Aplicaciones web responsivas, apps móviles nativas iOS y Android, y PWAs: portales de clientes, apps de campo, e-commerce y plataformas digitales a medida.',
      en: 'Responsive web applications, native iOS and Android mobile apps and PWAs: client portals, field apps for staff, e-commerce and custom digital platforms.',
    },
    keyword: { es: 'desarrollo de aplicaciones móviles', en: 'mobile app development' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Apps Web y Móviles', en: 'Web & Mobile Apps' },
  },
  {
    path: '/servicios/desarrollo-tecnologia/consultoria-tecnologica',
    type: 'service',
    title: {
      es: 'Consultoría Tecnológica en Panamá | Arquitectura y Vendors',
      en: 'Technology Consulting in Panama | Architecture and Vendors',
    },
    description: {
      es: 'Arquitectura de soluciones, selección de tecnologías, evaluación de vendors, roadmap y decisiones build vs buy. Evita inversiones tecnológicas equivocadas.',
      en: 'Solution architecture, technology selection, vendor evaluation, roadmap and build vs buy decisions. Avoid costly technology investments that miss the mark.',
    },
    keyword: { es: 'consultoría tecnológica', en: 'technology consulting' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Consultoría Tecnológica', en: 'Technology Consulting' },
  },
  {
    path: '/servicios/desarrollo-tecnologia/integracion-sistemas',
    type: 'service',
    title: {
      es: 'Integración de Sistemas y APIs en Panamá | Middleware',
      en: 'System and API Integration in Panama | Middleware & Data',
    },
    description: {
      es: 'Integración entre sistemas empresariales con APIs, middleware y sincronización de datos. Elimina islas de información y el copiado manual de datos.',
      en: 'Integration across enterprise systems with APIs, middleware and data synchronization. Remove information islands and manual copying of data between systems.',
    },
    keyword: { es: 'integración de sistemas', en: 'system integration' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Integración de Sistemas', en: 'System Integration' },
  },

  // ─────────────────────────────────────────────────────────────
  // INDUSTRIAS
  // ─────────────────────────────────────────────────────────────
  {
    path: '/industrias',
    type: 'hub',
    title: {
      es: 'Industrias que Atendemos | Consultoría Sectorial Panamá',
      en: 'Industries We Serve | Sector-Specific Consulting Panama',
    },
    description: {
      es: 'Experiencia comprobada en ocho sectores regulados y de alta complejidad: banca, manufactura, retail, tecnología, servicios, gobierno, salud y energía.',
      en: 'Proven experience across eight regulated, high-complexity sectors: banking, manufacturing, retail, technology, services, government, healthcare and energy.',
    },
    keyword: { es: 'consultoría por industria', en: 'industry consulting' },
    updatedAt: '2026-01-26',
    priority: 0.9,
    changeFrequency: 'weekly',
    breadcrumb: { es: 'Industrias', en: 'Industries' },
  },
  {
    path: '/industrias/banca-servicios-financieros',
    type: 'industry',
    title: {
      es: 'Consultoría para Banca en Panamá | Procesos, SBP y PMO',
      en: 'Banking Consulting in Panama | Processes, SBP and PMO',
    },
    description: {
      es: 'Más de 15 años ejecutando proyectos en instituciones financieras de Panamá y Centroamérica: normativa SBP, procesos core, auditoría y trazabilidad.',
      en: 'Over 15 years delivering projects for financial institutions in Panama and Central America: SBP regulation, core processes, audit and traceability.',
    },
    keyword: { es: 'consultoría bancaria', en: 'banking consulting' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Banca y Servicios Financieros', en: 'Banking & Financial Services' },
  },
  {
    path: '/industrias/banca-servicios-financieros/gestion-proyectos-bancarios',
    type: 'industry',
    title: {
      es: 'Gestión de Proyectos Bancarios en Panamá | PMs PMP',
      en: 'Banking Project Management in Panama | PMP Managers',
    },
    description: {
      es: 'PMs PMP® con experiencia en banca regulada: transformación digital, core bancario, cumplimiento y certificaciones. Metodología para proyectos 24/7 críticos.',
      en: 'PMP® managers experienced in regulated banking: digital transformation, core banking, compliance and certifications. Methodology for critical 24/7 projects.',
    },
    keyword: { es: 'gestión de proyectos bancarios', en: 'banking project management' },
    updatedAt: '2026-09-03',
    priority: 0.6,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Proyectos Bancarios', en: 'Banking Projects' },
  },
  {
    path: '/industrias/banca-servicios-financieros/cumplimiento-regulatorio-sbp',
    type: 'industry',
    title: {
      es: 'Cumplimiento Regulatorio SBP para Bancos en Panamá',
      en: 'SBP Regulatory Compliance for Banks in Panama | Controls',
    },
    description: {
      es: 'Políticas, procedimientos y controles internos alineados a los Acuerdos de la Superintendencia de Bancos. Preparación para supervisiones y remediación.',
      en: 'Policies, procedures and internal controls aligned to Superintendency of Banks agreements. Supervision readiness and remediation of regulatory findings.',
    },
    keyword: { es: 'cumplimiento regulatorio SBP', en: 'SBP regulatory compliance' },
    updatedAt: '2026-09-03',
    priority: 0.6,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Cumplimiento SBP', en: 'SBP Compliance' },
  },
  {
    path: '/industrias/banca-servicios-financieros/transformacion-digital-bancaria',
    type: 'industry',
    title: {
      es: 'Transformación Digital Bancaria en Panamá | Banca Móvil',
      en: 'Banking Digital Transformation in Panama | Mobile Banking',
    },
    description: {
      es: 'Proyectos digitales bancarios: banca móvil, onboarding digital, pagos instantáneos y digitalización de procesos core, con balance entre innovación y riesgo.',
      en: 'Banking digital projects: mobile banking, digital onboarding, instant payments and core process digitization, balancing innovation against financial risk.',
    },
    keyword: { es: 'transformación digital bancaria', en: 'banking digital transformation' },
    updatedAt: '2026-02-02',
    priority: 0.6,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Transformación Digital Bancaria', en: 'Banking Digital Transformation' },
  },
  {
    path: '/industrias/banca-servicios-financieros/iso-9001-sector-financiero',
    type: 'industry',
    title: {
      es: 'ISO 9001 para el Sector Financiero en Panamá | Bancos',
      en: 'ISO 9001 for the Financial Sector in Panama | Banks',
    },
    description: {
      es: 'Sistemas de gestión ISO 9001:2015 adaptados a procesos bancarios: documentación de procesos core, controles, auditorías internas y preparación para certificar.',
      en: 'ISO 9001:2015 management systems adapted to banking processes: core process documentation, controls, internal audits and certification readiness.',
    },
    keyword: { es: 'ISO 9001 sector financiero', en: 'ISO 9001 financial sector' },
    updatedAt: '2026-09-03',
    priority: 0.6,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'ISO 9001 Financiero', en: 'ISO 9001 Financial' },
  },
  {
    path: '/industrias/manufactura-logistica',
    type: 'industry',
    title: {
      es: 'Consultoría para Manufactura y Logística en Panamá',
      en: 'Manufacturing and Logistics Consulting Services in Panama',
    },
    description: {
      es: 'Proyectos industriales, Lean Manufacturing, Six Sigma, ISO 9001 y digitalización de operaciones. PMs con experiencia en plantas de producción.',
      en: 'Industrial projects, Lean Manufacturing, Six Sigma, ISO 9001 and operations digitization. Managers experienced in production plants and complex logistics.',
    },
    keyword: { es: 'consultoría manufactura', en: 'manufacturing consulting' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Manufactura y Logística', en: 'Manufacturing & Logistics' },
  },
  {
    path: '/industrias/retail-comercio',
    type: 'industry',
    title: {
      es: 'Consultoría para Retail y Comercio en Panamá | Omnicanal',
      en: 'Retail and Commerce Consulting in Panama | Omnichannel',
    },
    description: {
      es: 'Transformación digital retail, e-commerce, integración omnicanal y optimización de operaciones. PMs que entienden operar tiendas físicas y canales digitales.',
      en: 'Retail digital transformation, e-commerce, omnichannel integration and operations optimization. Managers who understand stores and digital channels at once.',
    },
    keyword: { es: 'consultoría retail', en: 'retail consulting' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Retail y Comercio', en: 'Retail & Commerce' },
  },
  {
    path: '/industrias/tecnologia-telecomunicaciones',
    type: 'industry',
    title: {
      es: 'Consultoría para Empresas Tech y Telecom en Panamá',
      en: 'Technology and Telecom Consulting in Panama | Agile PMs',
    },
    description: {
      es: 'Scrum Masters certificados y Project Managers para implementaciones tecnológicas, desarrollo e integración. 15+ años en proyectos tech con metodologías ágiles.',
      en: 'Certified Scrum Masters and Project Managers for technology rollouts, development and integration. 15+ years on complex tech projects with agile methods.',
    },
    keyword: { es: 'consultoría tecnología telecomunicaciones', en: 'technology telecom consulting' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Tecnología y Telecom', en: 'Technology & Telecom' },
  },
  {
    path: '/industrias/servicios-profesionales',
    type: 'industry',
    title: {
      es: 'Consultoría para Firmas de Servicios Profesionales en Panamá',
      en: 'Consulting for Professional Services Firms in Panama',
    },
    description: {
      es: 'Gestión de proyectos, optimización de operaciones y sistemas de calidad. PMs que entienden facturación por hora, utilización y rentabilidad por cliente.',
      en: 'Project management, operations optimization, quality systems and tooling. Managers who understand hourly billing, utilization and per-client profitability.',
    },
    keyword: { es: 'consultoría servicios profesionales', en: 'professional services consulting' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Servicios Profesionales', en: 'Professional Services' },
  },
  {
    path: '/industrias/gobierno-sector-publico',
    type: 'industry',
    title: {
      es: 'Consultoría para Gobierno y Sector Público en Panamá',
      en: 'Government and Public Sector Consulting Services in Panama',
    },
    description: {
      es: 'Proyectos públicos complejos, optimización de procesos, sistemas de calidad y modernización de servicios. PMs con experiencia en contratación pública.',
      en: 'Complex public projects, government process optimization, quality systems and service modernization. Managers experienced in public procurement rules.',
    },
    keyword: { es: 'consultoría sector público', en: 'public sector consulting' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Gobierno y Sector Público', en: 'Government & Public Sector' },
  },
  {
    path: '/industrias/salud-farmaceutica',
    type: 'industry',
    title: {
      es: 'Consultoría para el Sector Salud y Farmacéutico en Panamá',
      en: 'Healthcare and Pharmaceutical Consulting in Panama',
    },
    description: {
      es: 'Proyectos en instituciones de salud, sistemas de calidad, cumplimiento regulatorio sanitario y optimización de procesos clínicos y administrativos.',
      en: 'Projects in healthcare institutions, quality systems, health regulatory compliance and optimization of clinical and administrative processes.',
    },
    keyword: { es: 'consultoría sector salud', en: 'healthcare consulting' },
    updatedAt: '2026-01-26',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Salud y Farmacéutica', en: 'Healthcare & Pharma' },
  },
  {
    path: '/industrias/energia-utilities',
    type: 'industry',
    title: {
      es: 'Consultoría para el Sector Energía y Utilities en Panamá',
      en: 'Energy and Utilities Consulting in Panama | Infrastructure',
    },
    description: {
      es: 'Proyectos de infraestructura energética, optimización de operaciones 24/7, sistemas de calidad y mantenimiento de activos críticos con PMs certificados.',
      en: 'Energy infrastructure projects, 24/7 operations optimization, quality systems and critical asset maintenance, led by certified project managers.',
    },
    keyword: { es: 'consultoría sector energía', en: 'energy sector consulting' },
    updatedAt: '2026-02-02',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Energía y Utilities', en: 'Energy & Utilities' },
  },

  // ─────────────────────────────────────────────────────────────
  // PÁGINAS INSTITUCIONALES
  // ─────────────────────────────────────────────────────────────
  {
    path: '/nosotros',
    type: 'page',
    title: {
      es: 'Sobre Nosotros | Consultores Certificados PMP e ISO 9001',
      en: 'About Us | PMP and ISO 9001 Certified Consultants in Panama',
    },
    description: {
      es: 'Más de 15 años como consultores en optimización de procesos, gestión de proyectos y transformación digital para el sector servicios en América Latina.',
      en: 'Over 15 years as consultants in process optimization, project management and digital transformation for the services sector across Latin America.',
    },
    keyword: { es: 'sobre Grupo Alternative', en: 'about Grupo Alternative' },
    updatedAt: '2026-02-02',
    priority: 0.8,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Nosotros', en: 'About Us' },
  },
  {
    path: '/nosotros/katherine-gonzalez',
    type: 'page',
    title: {
      es: 'Katherine González | Fundadora y CEO de Grupo Alternative',
      en: 'Katherine González | Founder and CEO of Grupo Alternative',
    },
    description: {
      es: 'Líder con más de 15 años transformando organizaciones en Latinoamérica. Especialista en estrategia, optimización de procesos y transformación digital.',
      en: 'Leader with over 15 years transforming organizations across Latin America. Specialist in strategic consulting, process optimization and digital transformation.',
    },
    keyword: { es: 'Katherine González consultora', en: 'Katherine González consultant' },
    updatedAt: '2026-02-02',
    priority: 0.6,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Katherine González', en: 'Katherine González' },
  },
  {
    path: '/contacto',
    type: 'page',
    title: {
      es: 'Contacto | Diagnóstico Gratuito para tu Empresa en Panamá',
      en: 'Contact Us | Free Business Diagnosis for Your Company',
    },
    description: {
      es: 'Agenda un diagnóstico gratuito de 15 minutos con nuestro equipo de consultores en Ciudad de Panamá. Cuéntanos tu reto y te decimos por dónde empezar.',
      en: 'Book a free 15-minute diagnosis with our consulting team in Panama City. Tell us your operational challenge and we will show you where to start.',
    },
    keyword: { es: 'contacto consultoría Panamá', en: 'contact consulting Panama' },
    updatedAt: '2026-01-29',
    priority: 0.8,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Contacto', en: 'Contact' },
  },
  {
    path: '/casos-exito',
    type: 'page',
    // noindex: la página es hoy un placeholder ("Contenido en desarrollo").
    // Metadata honesta hasta que tenga casos reales publicados.
    noindex: true,
    title: {
      es: 'Casos de Éxito | Próximamente en Grupo Alternative',
      en: 'Success Stories | Coming Soon at Grupo Alternative',
    },
    description: {
      es: 'Estamos preparando los casos de éxito con métricas verificadas de nuestros proyectos de consultoría. Mientras tanto, escríbenos para conocer referencias.',
      en: 'We are preparing success stories with verified metrics from our consulting projects. In the meantime, contact us to request client references.',
    },
    keyword: { es: 'casos de éxito consultoría', en: 'consulting success stories' },
    updatedAt: '2026-01-23',
    priority: 0.3,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Casos de Éxito', en: 'Success Stories' },
  },
  {
    path: '/blog',
    type: 'hub',
    title: {
      es: 'Blog de Procesos, Calidad y Proyectos | Grupo Alternative',
      en: 'Blog on Processes, Quality and Projects | Alternative',
    },
    description: {
      es: 'Insights y tendencias sobre optimización de procesos, sistemas de calidad, gestión de proyectos y transformación digital, escritos por consultores en ejercicio.',
      en: 'Insights and trends on process optimization, quality systems, project management and digital transformation, written by practicing consultants.',
    },
    keyword: { es: 'blog consultoría empresarial', en: 'business consulting blog' },
    updatedAt: '2026-01-28',
    priority: 0.9,
    changeFrequency: 'weekly',
    breadcrumb: { es: 'Blog', en: 'Blog' },
  },
  {
    path: '/helpdesk-it',
    type: 'page',
    // noindex: formulario privado para clientes con servicios contratados.
    noindex: true,
    title: {
      es: 'Helpdesk IT | Soporte Técnico para Clientes de Alternative',
      en: 'IT Helpdesk | Technical Support for Alternative Clients',
    },
    description: {
      es: 'Formulario para reportar incidencias, solicitudes de soporte o requerimientos técnicos de los servicios contratados. Damos seguimiento por correo electrónico.',
      en: 'Form to report incidents, support requests or technical requirements related to your contracted services. Our team follows up with you by email.',
    },
    keyword: { es: 'helpdesk soporte IT', en: 'IT helpdesk support' },
    updatedAt: '2026-01-27',
    priority: 0.1,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Helpdesk IT', en: 'IT Helpdesk' },
  },

  // ─────────────────────────────────────────────────────────────
  // RECURSOS Y HERRAMIENTAS
  // ─────────────────────────────────────────────────────────────
  {
    path: '/recursos',
    type: 'hub',
    title: {
      es: 'Recursos Gratuitos | Guías y Herramientas de Consultoría',
      en: 'Free Resources | Consulting Guides, Tools and Calculators',
    },
    description: {
      es: 'Guías descargables, calculadoras y contenido gratuito sobre procesos, calidad, proyectos y transformación digital para equipos directivos en Panamá y LATAM.',
      en: 'Downloadable guides, calculators and free content on processes, quality, projects and digital transformation for management teams in Panama and LATAM.',
    },
    keyword: { es: 'recursos de consultoría', en: 'consulting resources' },
    updatedAt: '2026-01-29',
    priority: 0.9,
    changeFrequency: 'weekly',
    breadcrumb: { es: 'Recursos', en: 'Resources' },
  },
  {
    path: '/recursos/calculadoras',
    type: 'hub',
    title: {
      es: 'Calculadoras Gratuitas para Empresas | ROI y Madurez',
      en: 'Free Business Calculators | ROI and Digital Maturity',
    },
    description: {
      es: 'Herramientas interactivas y gratuitas para cuantificar el impacto de tus iniciativas: retorno de la optimización de procesos y nivel de madurez digital.',
      en: 'Free interactive tools to quantify the impact of your initiatives: return on process optimization and your organization digital maturity level.',
    },
    keyword: { es: 'calculadoras empresariales', en: 'business calculators' },
    updatedAt: '2026-01-29',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Calculadoras', en: 'Calculators' },
  },
  {
    path: '/recursos/calculadoras/roi-optimizacion-procesos',
    type: 'tool',
    title: {
      es: 'Calculadora de ROI de Optimización de Procesos | Gratis',
      en: 'Process Optimization ROI Calculator | Free Online Tool',
    },
    description: {
      es: 'Calcula gratis el retorno de invertir en optimizar tus procesos: ahorro estimado, payback y ROI a partir de tus propios datos operativos. Resultado en minutos.',
      en: 'Calculate for free the return of investing in process optimization: estimated savings, payback and ROI from your own operating data. Results in minutes.',
    },
    keyword: { es: 'calculadora ROI procesos', en: 'process ROI calculator' },
    updatedAt: '2026-01-29',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Calculadora de ROI', en: 'ROI Calculator' },
  },
  {
    path: '/recursos/calculadoras/madurez-digital',
    type: 'tool',
    title: {
      es: 'Test de Madurez Digital Gratis | Evalúa tu Empresa',
      en: 'Free Digital Maturity Test | Assess Your Company Online',
    },
    description: {
      es: '¿Qué tan digital es tu empresa? Responde el cuestionario y obtén un diagnóstico gratuito de tu nivel de madurez digital con recomendaciones priorizadas.',
      en: 'How digital is your company? Answer the questionnaire and get a free assessment of your digital maturity level with prioritized recommendations.',
    },
    keyword: { es: 'test madurez digital', en: 'digital maturity assessment' },
    updatedAt: '2026-01-29',
    priority: 0.7,
    changeFrequency: 'monthly',
    breadcrumb: { es: 'Madurez Digital', en: 'Digital Maturity' },
  },
];

/** Índice por path para lookup O(1). */
const BY_PATH = new Map(ROUTES.map((r) => [r.path, r]));

/**
 * Devuelve la metadata registrada para un path (sin locale).
 * La home es `''`; se acepta también `'/'` por comodidad.
 */
export function getRouteMeta(path: string): RouteMeta | undefined {
  const normalized = path === '/' ? '' : path.replace(/\/+$/, '');
  return BY_PATH.get(normalized);
}

/** Rutas que deben entrar al sitemap (excluye `noindex`). */
export function getIndexableRoutes(): RouteMeta[] {
  return ROUTES.filter((r) => !r.noindex);
}

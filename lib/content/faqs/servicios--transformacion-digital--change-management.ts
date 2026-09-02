import type { FaqEntry } from '../faqs';

/** FAQs de /servicios/transformacion-digital/change-management — extraídas de su PageClient.tsx. */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: "¿Change management es necesario para todos los proyectos digitales?",
      en: "Is change management necessary for all digital projects?",
    },
    answer: {
      es: "Depende de alcance y complejidad. NO necesario: Cambio menor (<10 personas afectadas), herramienta que no cambia flujos de trabajo, upgrade técnico transparente a usuarios. RECOMENDABLE: Cambio medio (10-50 personas), nuevo sistema que requiere capacitación, cambio en proceso conocido. CRÍTICO: Cambio mayor (50+ personas), transformación profunda de formas de trabajo, cultura resistente, proyectos previos fallidos. Evaluamos y recomendamos nivel apropiado de change management según contexto.",
      en: "Depends on scope and complexity. NOT necessary: Minor change (<10 people affected), tool that doesn't change workflows, technical upgrade transparent to users. RECOMMENDED: Medium change (10-50 people), new system requiring training, change in known process. CRITICAL: Major change (50+ people), deep transformation of ways of working, resistant culture, previous failed projects. We evaluate and recommend appropriate change management level according to context.",
    },
  },
  {
    question: {
      es: "¿Cuándo se debe iniciar change management en un proyecto?",
      en: "When should change management start in a project?",
    },
    answer: {
      es: "Desde día 1 del proyecto, NO al final. Error común: diseñar e implementar tecnología 6 meses, luego \"agregar change management\" último mes. Resultado: muy tarde, resistencia ya establecida. Enfoque correcto: Change management en paralelo con implementación técnica: análisis stakeholders durante diseño, comunicaciones durante desarrollo, capacitación semanas antes de go-live, soporte intensivo durante lanzamiento. Change management no es fase; es disciplina que acompaña todo el proyecto.",
      en: "From day 1 of project, NOT at end. Common error: design and implement technology 6 months, then \"add change management\" last month. Result: too late, resistance already established. Correct approach: Change management parallel to technical implementation: stakeholder analysis during design, communications during development, training weeks before go-live, intensive support during launch. Change management is not a phase; it's a discipline that accompanies entire project.",
    },
  },
  {
    question: {
      es: "¿Alternative solo diseña plan de change o también lo ejecuta?",
      en: "Does Alternative only design change plan or also execute it?",
    },
    answer: {
      es: "Ambos. Diseñamos: Estrategia, análisis stakeholders, planes de comunicación y capacitación. Ejecutamos: Facilitamos comunicaciones clave, impartimos capacitaciones, reclutamos y activamos champions, gestionamos resistencias, monitoreamos adopción. Diferencia vs consultoras que solo entregan PowerPoint: Alternative acompaña ejecución hasta ver adopción real. Podemos también capacitar a equipo interno del cliente para que ellos ejecuten con nuestra guía.",
      en: "Both. We design: Strategy, stakeholder analysis, communication and training plans. We execute: We facilitate key communications, deliver training, recruit and activate champions, manage resistance, monitor adoption. Difference vs consultancies that only deliver PowerPoint: Alternative accompanies execution until seeing real adoption. We can also train client's internal team so they execute with our guidance.",
    },
  },
  {
    question: {
      es: "¿Cómo miden éxito de change management?",
      en: "How do you measure change management success?",
    },
    answer: {
      es: "Métricas cuantitativas y cualitativas. Cuantitativas: % usuarios activos del sistema, % transacciones en nuevo vs viejo sistema, tiempo promedio hasta competencia, cantidad de tickets a help desk, errores de uso. Cualitativas: Encuestas de satisfacción, nivel de resistencia (alto/medio/bajo), feedback en reuniones, comentarios de gerencia. Meta típica: 80%+ adopción activa a 3 meses post-lanzamiento, 70%+ satisfacción de usuarios, <20% resistencia activa. Reportamos métricas semanalmente a steering committee.",
      en: "Quantitative and qualitative metrics. Quantitative: % active system users, % transactions in new vs old system, average time to competence, number of help desk tickets, usage errors. Qualitative: Satisfaction surveys, resistance level (high/medium/low), meeting feedback, management comments. Typical goal: 80%+ active adoption at 3 months post-launch, 70%+ user satisfaction, <20% active resistance. We report metrics weekly to steering committee.",
    },
  },
  {
    question: {
      es: "¿Qué hacer con personas que se niegan a adoptar el cambio?",
      en: "What to do with people who refuse to adopt change?",
    },
    answer: {
      es: "Enfoque escalonado: (1) Entender causa raíz: ¿Es falta de conocimiento, miedo, desacuerdo legítimo? (2) Intervención apropiada: Capacitación adicional, coaching one-on-one, abordar preocupación específica. (3) Involucrar gerencia: Si resistencia persiste, gerente directo tiene conversación. (4) Consecuencias claras: Si adopción es no-negociable (ej: viejo sistema se apaga), comunicar timeline y consecuencias. (5) Casos extremos: Pequeño % puede ser reasignado a roles donde cambio no aplica. Experiencia: 90%+ de resistentes iniciales adoptan con estrategia correcta; solo 5-10% son casos extremos.",
      en: "Staggered approach: (1) Understand root cause: Is it lack of knowledge, fear, legitimate disagreement? (2) Appropriate intervention: Additional training, one-on-one coaching, address specific concern. (3) Involve management: If resistance persists, direct manager has conversation. (4) Clear consequences: If adoption is non-negotiable (e.g.: old system shuts down), communicate timeline and consequences. (5) Extreme cases: Small % can be reassigned to roles where change doesn't apply. Experience: 90%+ of initial resisters adopt with correct strategy; only 5-10% are extreme cases.",
    },
  },
  {
    question: {
      es: "¿Change management solo aplica a transformación digital o también a otros cambios?",
      en: "Does change management only apply to digital transformation or also to other changes?",
    },
    answer: {
      es: "Aplica a cualquier cambio organizacional significativo: reestructuraciones, fusiones y adquisiciones, cambios de cultura, nuevas estrategias, reubicaciones, implementación de nueva regulación. Transformación digital es caso común pero principios de change management (comunicación, capacitación, gestión de resistencias, adopción) aplican universalmente. Alternative tiene experiencia en change management para transformaciones digitales específicamente, que tienen dinámicas particulares (resistencia a tecnología, capacitación técnica intensiva, métricas de uso de sistemas).",
      en: "Applies to any significant organizational change: restructurings, mergers and acquisitions, culture changes, new strategies, relocations, new regulation implementation. Digital transformation is common case but change management principles (communication, training, resistance management, adoption) apply universally. Alternative has experience in change management for digital transformations specifically, which have particular dynamics (technology resistance, intensive technical training, system usage metrics).",
    },
  },
];

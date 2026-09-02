import type { FaqEntry } from '../faqs';

/** FAQs de /servicios/sistemas-calidad/auditoria-calidad — extraídas de su PageClient.tsx. */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: "¿Cuánto tiempo toma una auditoría interna completa?",
      en: "How long does a complete internal audit take?",
    },
    answer: {
      es: "Depende del tamaño y complejidad de la organización. Para empresas pequeñas (50-100 empleados): 3-5 días. Medianas (100-500): 5-7 días. Grandes (500+): 7-10 días. Incluye planificación, ejecución, reporte y reuniones.",
      en: "Depends on organization size and complexity. For small companies (50-100 employees): 3-5 days. Medium (100-500): 5-7 days. Large (500+): 7-10 days. Includes planning, execution, reporting and meetings.",
    },
  },
  {
    question: {
      es: "¿Qué diferencia hay entre auditoría interna y externa?",
      en: "What's the difference between internal and external audit?",
    },
    answer: {
      es: "Auditoría interna es realizada por personal independiente (puede ser externo) para evaluar eficacia del sistema y preparar para certificación. Auditoría externa es realizada por organismo certificador para otorgar o mantener certificación ISO. La interna es preparatoria, la externa es de certificación.",
      en: "Internal audit is performed by independent personnel (can be external) to evaluate system effectiveness and prepare for certification. External audit is performed by certification body to grant or maintain ISO certification. Internal is preparatory, external is for certification.",
    },
  },
  {
    question: {
      es: "¿Qué pasa si encuentran muchas no conformidades?",
      en: "What happens if they find many non-conformities?",
    },
    answer: {
      es: "Es normal encontrar no conformidades en auditorías internas, especialmente si es la primera vez. Lo importante es tener un plan de acción correctiva priorizado. Nosotros ayudamos a clasificar (mayores vs menores), priorizar y desarrollar plan de corrección con responsables y fechas. El objetivo es corregir antes de auditoría externa.",
      en: "It's normal to find non-conformities in internal audits, especially if it's the first time. What matters is having a prioritized corrective action plan. We help classify (major vs minor), prioritize and develop correction plan with responsible parties and dates. Goal is to correct before external audit.",
    },
  },
  {
    question: {
      es: "¿Necesito estar certificado ISO 9001 para hacer auditoría interna?",
      en: "Do I need to be ISO 9001 certified to do internal audit?",
    },
    answer: {
      es: "No necesariamente. Puedes hacer auditoría interna para: (1) Evaluar sistema de calidad existente aunque no esté certificado, (2) Preparar para certificación futura, (3) Diagnosticar eficacia de procesos. La auditoría interna es una herramienta de mejora, no requiere certificación previa.",
      en: "Not necessarily. You can do internal audit to: (1) Evaluate existing quality system even if not certified, (2) Prepare for future certification, (3) Diagnose process effectiveness. Internal audit is an improvement tool, doesn't require prior certification.",
    },
  },
  {
    question: {
      es: "¿Pueden auditar solo procesos específicos?",
      en: "Can you audit only specific processes?",
    },
    answer: {
      es: "Sí, ofrecemos auditorías enfocadas por proceso. Ideal cuando necesitas evaluación profunda de áreas específicas como: gestión documental, control de no conformidades, revisión por la dirección, o procesos críticos del negocio. Es más rápida y económica que auditoría completa.",
      en: "Yes, we offer focused audits by process. Ideal when you need deep evaluation of specific areas like: document management, non-conformity control, management review, or critical business processes. Faster and more economical than complete audit.",
    },
  },
  {
    question: {
      es: "¿Qué incluye el reporte de auditoría?",
      en: "What does the audit report include?",
    },
    answer: {
      es: "El reporte incluye: (1) Resumen ejecutivo, (2) Hallazgos detallados con evidencia objetiva, (3) No conformidades clasificadas (mayores/menores) con referencias a ISO 9001, (4) Oportunidades de mejora, (5) Buenas prácticas identificadas, (6) Plan de acción correctiva recomendado con responsables y fechas. Todo documentado y trazable.",
      en: "The report includes: (1) Executive summary, (2) Detailed findings with objective evidence, (3) Classified non-conformities (major/minor) with ISO 9001 references, (4) Improvement opportunities, (5) Identified best practices, (6) Recommended corrective action plan with responsible parties and dates. All documented and traceable.",
    },
  },
];

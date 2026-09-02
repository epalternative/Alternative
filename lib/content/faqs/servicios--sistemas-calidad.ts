import type { FaqEntry } from '../faqs';

/** FAQs de /servicios/sistemas-calidad — extraídas de su PageClient.tsx. */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: "¿Cuánto tiempo toma implementar ISO 9001 desde cero?",
      en: "How long does it take to implement ISO 9001 from scratch?",
    },
    answer: {
      es: "Depende del tamaño y complejidad de la empresa. Típicamente: PYME (20-50 empleados) 4-6 meses, empresa mediana (50-200 empleados) 6-8 meses, empresa grande (200+ empleados) 8-12 meses. El tiempo incluye documentación, implementación operativa, auditorías internas y corrección de no conformidades antes de certificación.",
      en: "Depends on company size and complexity. Typically: SME (20-50 employees) 4-6 months, medium company (50-200 employees) 6-8 months, large company (200+ employees) 8-12 months. Time includes documentation, operational implementation, internal audits, and non-conformity correction before certification.",
    },
  },
  {
    question: {
      es: "¿Qué diferencia hay entre implementación ISO y certificación ISO?",
      en: "What's the difference between ISO implementation and ISO certification?",
    },
    answer: {
      es: "Implementación es el trabajo interno: documentar procesos, capacitar personal, implementar controles, hacer auditorías internas. Certificación es el proceso externo: organismo certificador (como SGS, Bureau Veritas) audita tu sistema y emite certificado oficial si cumples requisitos. Alternative hace implementación completa y te acompaña en certificación.",
      en: "Implementation is internal work: document processes, train staff, implement controls, conduct internal audits. Certification is external process: certifying body (like SGS, Bureau Veritas) audits your system and issues official certificate if you meet requirements. Alternative does complete implementation and supports you in certification.",
    },
  },
  {
    question: {
      es: "¿Necesito certificación ISO o solo gestión de calidad?",
      en: "Do I need ISO certification or just quality management?",
    },
    answer: {
      es: "Si cliente/licitación exige certificado ISO, necesitas certificación completa. Si solo necesitas calidad estructurada sin requisito formal, gestión de calidad pragmática es suficiente. En diagnóstico inicial evaluamos tu necesidad específica y recomendamos enfoque óptimo.",
      en: "If client/tender requires ISO certificate, you need complete certification. If you only need structured quality without formal requirement, pragmatic quality management is sufficient. In initial diagnosis we evaluate your specific need and recommend optimal approach.",
    },
  },
  {
    question: {
      es: "¿Qué pasa si no paso la auditoría de certificación?",
      en: "What happens if I don't pass the certification audit?",
    },
    answer: {
      es: "Si hay no conformidades menores, tienes plazo (típicamente 90 días) para corregirlas y auditoría de seguimiento. Si hay no conformidades mayores, debes corregir y nueva auditoría completa. Alternative prepara exhaustivamente para minimizar riesgo: 85%+ de nuestros clientes aprueban primera auditoría. Si no apruebas, te acompañamos en corrección sin costo adicional hasta aprobar.",
      en: "If there are minor non-conformities, you have deadline (typically 90 days) to correct them and follow-up audit. If there are major non-conformities, you must correct and new complete audit. Alternative prepares exhaustively to minimize risk: 85%+ of our clients approve first audit. If you don't approve, we support you in correction at no additional cost until approval.",
    },
  },
  {
    question: {
      es: "¿Cuánto cuesta certificación ISO 9001?",
      en: "How much does ISO 9001 certification cost?",
    },
    answer: {
      es: "Costo tiene dos componentes: (1) Implementación con Alternative: depende de tamaño empresa y procesos, típicamente $15K-50K. (2) Certificación con organismo externo: $3K-10K/año (auditoría inicial + renovación anual). Alternative te ayuda a seleccionar organismo certificador objetivo y negociar mejores tarifas. Incluimos estimación detallada en diagnóstico inicial.",
      en: "Cost has two components: (1) Implementation with Alternative: depends on company size and processes, typically $15K-50K. (2) Certification with external body: $3K-10K/year (initial audit + annual renewal). Alternative helps you select objective certifying body and negotiate better rates. We include detailed estimate in initial diagnosis.",
    },
  },
  {
    question: {
      es: "¿Mantengo certificación después de implementación?",
      en: "Do I maintain certification after implementation?",
    },
    answer: {
      es: "Sí. Certificación ISO requiere mantenimiento: auditorías de vigilancia anuales del organismo certificador, auditorías internas periódicas, revisión de gestión, mejora continua. Alternative te capacita para mantener sistema internamente. Opcionalmente ofrecemos servicio de mantenimiento continuo con auditorías internas y preparación para auditorías de vigilancia.",
      en: "Yes. ISO certification requires maintenance: annual surveillance audits by certifying body, periodic internal audits, management review, continuous improvement. Alternative trains you to maintain system internally. Optionally we offer continuous maintenance service with internal audits and preparation for surveillance audits.",
    },
  },
];

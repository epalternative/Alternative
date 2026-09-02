import type { FaqEntry } from '../faqs';

/** FAQs de /servicios/optimizacion-procesos/automatizacion-procesos — extraídas de su PageClient.tsx. */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: "¿Cómo determinan el costo de automatización?",
      en: "How do you determine automation cost?",
    },
    answer: {
      es: "Depende de: tipo de automatización (RPA, workflow, API, IA), cantidad de procesos, complejidad de sistemas, necesidad de optimización previa, licencias de software. Evaluación gratuita calcula ROI específico y presenta opciones.",
      en: "It depends on: type of automation (RPA, workflow, API, AI), number of processes, system complexity, need for prior optimization, software licenses. Free evaluation calculates specific ROI and presents options.",
    },
  },
  {
    question: {
      es: "¿Automatización significa despedir personas?",
      en: "Does automation mean firing people?",
    },
    answer: {
      es: "No. Liberamos personas de trabajo tedioso para que se enfoquen en alto valor. Clientes típicamente NO despiden; reasignan capacidad a actividades estratégicas o crecen sin contratar proporcionalmente.",
      en: "No. We free people from tedious work so they can focus on high value. Clients typically DON'T fire; they reassign capacity to strategic activities or grow without hiring proportionally.",
    },
  },
  {
    question: {
      es: "¿Qué pasa si mi proceso cambia?",
      en: "What happens if my process changes?",
    },
    answer: {
      es: "Bots bien diseñados son resilientes a cambios menores. Cambios significativos requieren ajustes (similar a capacitar empleado). Incluimos soporte post-implementación. Mantenimiento típico: 10-15% costo inicial anual.",
      en: "Well-designed bots are resilient to minor changes. Significant changes require adjustments (similar to training an employee). We include post-implementation support. Typical maintenance: 10-15% initial cost annually.",
    },
  },
  {
    question: {
      es: "¿Puedo automatizar con sistemas viejos (legacy)?",
      en: "Can I automate with old (legacy) systems?",
    },
    answer: {
      es: "Sí. RPA es ideal para eso. No modifica sistemas; interactúa con interfaz como humano. Hemos automatizado en mainframe de los 80s exitosamente.",
      en: "Yes. RPA is ideal for that. It doesn't modify systems; it interacts with the interface like a human. We've successfully automated on 80s mainframes.",
    },
  },
  {
    question: {
      es: "¿Qué tan segura es la automatización?",
      en: "How secure is automation?",
    },
    answer: {
      es: "Muy segura. Bots con credenciales dedicadas y permisos mínimos, trazabilidad completa, encriptación de datos sensibles, cumplimiento ISO 27001/SOC 2. Frecuentemente MEJORA seguridad vs manejo humano.",
      en: "Very secure. Bots with dedicated credentials and minimum permissions, complete traceability, sensitive data encryption, ISO 27001/SOC 2 compliance. Frequently IMPROVES security vs human handling.",
    },
  },
  {
    question: {
      es: "¿Qué procesos NO automatizar?",
      en: "What processes NOT to automate?",
    },
    answer: {
      es: "Procesos con juicio complejo o empatía, procesos inestables que cambian constantemente, excepciones >30%, procesos que deben optimizarse primero. Evaluamos caso por caso.",
      en: "Processes with complex judgment or empathy, unstable processes that constantly change, exceptions >30%, processes that must be optimized first. We evaluate case by case.",
    },
  },
];

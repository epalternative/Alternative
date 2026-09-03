import type { FaqEntry } from '../faqs';

/**
 * FAQs de /industrias/banca-servicios-financieros/cumplimiento-regulatorio-sbp
 *
 * Los Acuerdos citados se verificaron contra el PDF oficial de la SBP:
 * - Acuerdo 005-2011 (20 sep 2011), Gobierno Corporativo
 *   https://www.superbancos.gob.pa/documentos/leyes_y_regulaciones/acuerdos/2011/Acuerdo_5-2011.pdf
 * - Acuerdo 011-2018 (11 sep 2018), Riesgo Operativo
 *   https://www.superbancos.gob.pa/documentos/leyes_y_regulaciones/acuerdos/2018/Acuerdo_11-2018.pdf
 */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: '¿Por dónde empezamos si nunca hemos documentado formalmente nuestros procesos?',
      en: 'Where do we start if we have never formally documented our processes?',
    },
    answer: {
      es: 'Por un diagnóstico de brechas: comparamos lo que la entidad hace hoy contra lo que el marco regulatorio exige documentar, y priorizamos por criticidad. No se documenta todo a la vez. Se empieza por los procesos que un supervisor revisa primero y por aquellos donde una falla tiene impacto directo en el cliente o en el balance.',
      en: 'With a gap assessment: we compare what the institution does today against what the regulatory framework requires to be documented, and we prioritize by criticality. You do not document everything at once. You start with the processes an inspector reviews first and with those where a failure has direct impact on the customer or the balance sheet.',
    },
  },
  {
    question: {
      es: '¿Qué pide exactamente el Acuerdo 011-2018 sobre riesgo operativo?',
      en: 'What exactly does Agreement 011-2018 require on operational risk?',
    },
    answer: {
      es: 'El Acuerdo 011-2018 establece que la gestión del riesgo operativo debe incluir identificación, medición, mitigación, monitoreo y control. En la práctica eso significa que no basta con tener un manual: hay que poder demostrar el ciclo completo con evidencia, incluido el seguimiento de que las acciones de mitigación se cierran en los plazos definidos.',
      en: 'Agreement 011-2018 establishes that operational risk management must include identification, measurement, mitigation, monitoring and control. In practice that means a manual is not enough: you must be able to demonstrate the full cycle with evidence, including follow-up showing that mitigation actions are closed within the defined timeframes.',
    },
  },
  {
    question: {
      es: '¿Nos preparan para la supervisión o solo entregan documentos?',
      en: 'Do you prepare us for the inspection or only deliver documents?',
    },
    answer: {
      es: 'Ambas cosas, y la segunda sin la primera sirve de poco. Hacemos una pre-auditoría interna que simula el enfoque de una supervisión, identificamos los hallazgos probables y preparamos la evidencia. Además trabajamos con el equipo la parte que no está en ningún manual: cómo responder un requerimiento, qué mostrar y qué no improvisar.',
      en: 'Both, and the second is of little use without the first. We run an internal pre-audit that simulates the approach of an inspection, identify the likely findings and prepare the evidence. We also work with the team on the part that is in no manual: how to answer a request, what to show and what not to improvise.',
    },
  },
  {
    question: {
      es: '¿Cómo encaja el gobierno corporativo en un proyecto de cumplimiento?',
      en: 'How does corporate governance fit into a compliance project?',
    },
    answer: {
      es: 'El Acuerdo 005-2011 actualiza las disposiciones sobre gobierno corporativo, y en la práctica define quién responde por qué. Un marco de control interno sin dueños claros y sin reporte a junta directiva se cae en la primera revisión. Por eso el diseño de roles, comités y líneas de reporte va antes que la documentación de detalle, no después.',
      en: 'Agreement 005-2011 updates the corporate governance provisions, and in practice it defines who answers for what. An internal control framework without clear owners and without reporting to the board falls apart at the first review. That is why the design of roles, committees and reporting lines comes before detailed documentation, not after.',
    },
  },
  {
    question: {
      es: '¿Trabajan sobre observaciones ya emitidas por el regulador?',
      en: 'Do you work on observations already issued by the regulator?',
    },
    answer: {
      es: 'Sí, y es uno de los encargos más frecuentes. Analizamos la observación para entender qué control falló, no solo qué documento falta. A partir de ahí construimos el plan de remediación con acciones concretas, responsables y fechas, implementamos los controles y dejamos preparada la evidencia de cierre.',
      en: 'Yes, and it is one of the most frequent engagements. We analyze the observation to understand which control failed, not just which document is missing. From there we build the remediation plan with concrete actions, owners and dates, implement the controls and leave the closure evidence prepared.',
    },
  },
];

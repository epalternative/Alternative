import type { FaqEntry } from '../faqs';

/** FAQs de /servicios/transformacion-digital/digitalizacion-procesos — extraídas de su PageClient.tsx. */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: "¿Cómo determinan qué procesos automatizar primero?",
      en: "How do you determine which processes to automate first?",
    },
    answer: {
      es: "Priorizamos por ROI: (Ahorro anual - Costo de automatización) / Costo de automatización. Factores: (1) Volumen: Procesos que se ejecutan 50+ veces/mes tienen mayor ROI. (2) Tiempo consumido: Procesos que toman 10+ horas/semana del equipo. (3) Complejidad técnica: Procesos simples con reglas claras se automatizan más rápido. (4) Errores: Procesos con alta tasa de error humano. (5) Impacto negocio: Cuellos de botella críticos. Matriz impacto vs esfuerzo identifica quick wins.",
      en: "We prioritize by ROI: (Annual savings - Automation cost) / Automation cost. Factors: (1) Volume: Processes executed 50+ times/month have higher ROI. (2) Time consumed: Processes taking 10+ hours/week from team. (3) Technical complexity: Simple processes with clear rules automate faster. (4) Errors: Processes with high human error rate. (5) Business impact: Critical bottlenecks. Impact vs effort matrix identifies quick wins.",
    },
  },
  {
    question: {
      es: "¿Qué pasa si el proceso cambia después de automatizar?",
      en: "What happens if the process changes after automating?",
    },
    answer: {
      es: "Automatizaciones bien diseñadas son resilientes a cambios menores. Cambios significativos requieren ajustes (similar a capacitar empleado cuando proceso cambia). Incluimos soporte post-implementación para ajustes sin costo. Mantenimiento anual típico: 10-15% costo inicial (muy inferior a costo de personas ejecutando manual). Procesos muy inestables (cambian semanalmente) NO se deben automatizar hasta estabilizar.",
      en: "Well-designed automations are resilient to minor changes. Significant changes require adjustments (similar to training employee when process changes). We include post-implementation support for adjustments at no cost. Typical annual maintenance: 10-15% initial cost (much lower than cost of people executing manually). Very unstable processes (change weekly) should NOT be automated until stabilized.",
    },
  },
  {
    question: {
      es: "¿RPA reemplaza necesidad de integrar sistemas correctamente?",
      en: "Does RPA replace need to properly integrate systems?",
    },
    answer: {
      es: "RPA es solución táctica rápida (semanas) cuando integración nativa no es viable: sistemas legacy sin APIs, costo/tiempo de integración prohibitivo, solución temporal mientras migras a nuevo sistema. Integración API es solución estratégica permanente (meses) cuando: alto volumen transaccional, tiempo real crítico, aplicaciones modernas con APIs, solución de largo plazo. Frecuentemente combinamos: RPA para quick wins inmediatos, luego integraciones API para solución sostenible.",
      en: "RPA is quick tactical solution (weeks) when native integration isn't viable: legacy systems without APIs, prohibitive integration cost/time, temporary solution while migrating to new system. API integration is permanent strategic solution (months) when: high transactional volume, critical real-time, modern applications with APIs, long-term solution. We frequently combine: RPA for immediate quick wins, then API integrations for sustainable solution.",
    },
  },
  {
    question: {
      es: "¿Qué tan segura es automatización con acceso a sistemas críticos?",
      en: "How secure is automation with access to critical systems?",
    },
    answer: {
      es: "Muy segura si se implementa correctamente: (1) Credenciales dedicadas: Bot tiene credenciales propias con permisos mínimos necesarios, no comparte contraseñas humanas. (2) Trazabilidad: Toda actividad del bot queda registrada en logs auditables. (3) Encriptación: Datos sensibles encriptados en tránsito y reposo. (4) Cumplimiento: Diseñamos automatizaciones alineadas a ISO 27001, SOC 2, regulaciones. De hecho, bots frecuentemente SON MÁS seguros que humanos: no cometen errores, siguen procedimientos exactamente, todo es auditable.",
      en: "Very secure if implemented correctly: (1) Dedicated credentials: Bot has own credentials with minimum necessary permissions, doesn't share human passwords. (2) Traceability: All bot activity is recorded in auditable logs. (3) Encryption: Sensitive data encrypted in transit and at rest. (4) Compliance: We design automations aligned to ISO 27001, SOC 2, regulations. In fact, bots are frequently MORE secure than humans: they don't make errors, follow procedures exactly, everything is auditable.",
    },
  },
  {
    question: {
      es: "¿Puedo automatizar aunque tenga sistemas antiguos (legacy)?",
      en: "Can I automate even if I have old (legacy) systems?",
    },
    answer: {
      es: "Sí, RPA es ideal precisamente para eso. RPA no requiere modificar sistemas existentes ni acceso a código/base de datos; bot interactúa con interfaz de usuario como lo haría persona. Hemos automatizado exitosamente en: mainframes de los 80s, sistemas AS/400, aplicaciones cliente-servidor antiguas, sistemas propietarios sin APIs, aplicaciones escritorio viejas. Si persona puede hacerlo manualmente, bot puede hacerlo automatizado.",
      en: "Yes, RPA is ideal precisely for that. RPA doesn't require modifying existing systems or access to code/database; bot interacts with user interface as person would. We've successfully automated in: 80s mainframes, AS/400 systems, old client-server applications, proprietary systems without APIs, old desktop applications. If person can do it manually, bot can do it automated.",
    },
  },
  {
    question: {
      es: "¿Qué procesos NO se deben automatizar?",
      en: "What processes should NOT be automated?",
    },
    answer: {
      es: "Evitar automatizar: (1) Procesos con juicio complejo: Decisiones que requieren intuición, empatía, negociación. (2) Procesos altamente inestables: Cambian cada semana, automatización requiere ajustes constantes. (3) Procesos con excepciones >30%: Si mayoría de casos son \"especiales\", automatización no es eficiente. (4) Procesos mal diseñados: Primero optimiza, luego automatiza. (5) Procesos regulados sin trazabilidad clara: Donde auditoría manual es crítica. Durante evaluación identificamos qué debe optimizarse antes de automatizar y qué es bueno candidato.",
      en: "Avoid automating: (1) Processes with complex judgment: Decisions requiring intuition, empathy, negotiation. (2) Highly unstable processes: Change every week, automation requires constant adjustments. (3) Processes with >30% exceptions: If majority of cases are \"special\", automation isn't efficient. (4) Poorly designed processes: First optimize, then automate. (5) Regulated processes without clear traceability: Where manual audit is critical. During evaluation we identify what must be optimized before automating and what is good candidate.",
    },
  },
];

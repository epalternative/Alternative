import type { FaqEntry } from '../faqs';

/** FAQs de /servicios/transformacion-digital/analisis-datos — extraídas de su PageClient.tsx. */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: "¿Cómo determinan alcance y costo de implementación de BI?",
      en: "How do you determine scope and cost of BI implementation?",
    },
    answer: {
      es: "Depende de: cantidad de fuentes de datos a consolidar, complejidad de transformaciones requeridas, número de dashboards/reportes, frecuencia de actualización (tiempo real vs diario), usuarios simultáneos, necesidad de análisis predictivo. Proyecto pequeño (1-2 fuentes, 3-5 dashboards). Proyecto mediano (3-5 fuentes, 8-12 dashboards). Proyecto grande (5+ fuentes, 15+ dashboards, predictivo). Evaluamos en diagnóstico inicial y presentamos opciones por fases.",
      en: "Depends on: number of data sources to consolidate, complexity of required transformations, number of dashboards/reports, update frequency (real-time vs daily), simultaneous users, need for predictive analysis. Small project (1-2 sources, 3-5 dashboards). Medium project (3-5 sources, 8-12 dashboards). Large project (5+ sources, 15+ dashboards, predictive). We evaluate in initial diagnosis and present options by phases.",
    },
  },
  {
    question: {
      es: "¿Necesito Data Warehouse o puedo conectar directamente a sistemas?",
      en: "Do I need Data Warehouse or can I connect directly to systems?",
    },
    answer: {
      es: "Conexión directa: Funciona para análisis simples, pocas fuentes, datos limpios. Ventaja: más rápido de implementar. Data Warehouse: Recomendable cuando: múltiples fuentes, datos sucios que necesitan limpieza, análisis histórico (sistemas operacionales no guardan historia), necesidad de cálculos complejos, alto volumen de consultas. Mayoría de proyectos medianos-grandes se benefician de DW ligero (puede ser Azure SQL, Snowflake, o hasta base relacional simple). Evaluamos y recomendamos según caso.",
      en: "Direct connection: Works for simple analysis, few sources, clean data. Advantage: faster to implement. Data Warehouse: Recommended when: multiple sources, dirty data needing cleaning, historical analysis (operational systems don't keep history), need for complex calculations, high query volume. Most medium-large projects benefit from light DW (can be Azure SQL, Snowflake, or even simple relational database). We evaluate and recommend according to case.",
    },
  },
  {
    question: {
      es: "¿Alternative solo implementa dashboards o también ejecuta análisis?",
      en: "Does Alternative only implement dashboards or also execute analysis?",
    },
    answer: {
      es: "Ambos modelos: (1) Implementación de capacidad BI: Desarrollamos dashboards, capacitamos tu equipo, ellos ejecutan análisis ongoing. (2) Análisis como servicio: Alternative ejecuta análisis periódicos y entrega insights (ej: análisis mensual de rentabilidad con recomendaciones). Modelo 1 es más común (capacidad interna sostenible). Modelo 2 para empresas sin analista interno. También ofrecemos híbrido: implementamos + acompañamiento analítico primeros 6 meses.",
      en: "Both models: (1) BI capability implementation: We develop dashboards, train your team, they execute ongoing analysis. (2) Analysis as service: Alternative executes periodic analysis and delivers insights (e.g.: monthly profitability analysis with recommendations). Model 1 is more common (sustainable internal capability). Model 2 for companies without internal analyst. We also offer hybrid: we implement + analytical accompaniment first 6 months.",
    },
  },
  {
    question: {
      es: "¿Qué tan actualizada estará la información en dashboards?",
      en: "How updated will information be in dashboards?",
    },
    answer: {
      es: "Depende de necesidad y viabilidad técnica: Tiempo real: Dashboards actualizados cada pocos segundos (ej: monitoreo de producción, operaciones call center). Requiere conexiones directas o streaming. Cerca de tiempo real: Cada 15-30 minutos (ej: ventas retail). Diario: Actualización nocturna (mayoría de casos). Semanal/Mensual: Para análisis históricos o fuentes que solo actualizan periódicamente. Balanceamos necesidad de negocio vs complejidad técnica y costo. Mayoría de clientes operan felizmente con actualización diaria nocturna.",
      en: "Depends on need and technical viability: Real-time: Dashboards updated every few seconds (e.g.: production monitoring, call center operations). Requires direct connections or streaming. Near real-time: Every 15-30 minutes (e.g.: retail sales). Daily: Nightly update (majority of cases). Weekly/Monthly: For historical analysis or sources that only update periodically. We balance business need vs technical complexity and cost. Majority of clients operate happily with nightly daily update.",
    },
  },
  {
    question: {
      es: "¿Puedo agregar nuevos dashboards después de implementación inicial?",
      en: "Can I add new dashboards after initial implementation?",
    },
    answer: {
      es: "Sí, absolutamente. Recomendamos enfoque iterativo: Fase 1 (inicial): Dashboards core más críticos (típicamente 5-8). Fase 2 (3-6 meses después): Nuevos dashboards según necesidades que surgieron. Fase 3 (ongoing): Evolución continua. Razones: (1) Aprendizaje de uso genera nuevas necesidades, (2) Presupuesto se distribuye en fases, (3) Cambio incremental es más manejable. Arquitectura de datos se diseña flexible desde inicio para facilitar expansión bajo costo adicional.",
      en: "Yes, absolutely. We recommend iterative approach: Phase 1 (initial): Most critical core dashboards (typically 5-8). Phase 2 (3-6 months later): New dashboards according to needs that arose. Phase 3 (ongoing): Continuous evolution. Reasons: (1) Usage learning generates new needs, (2) Budget distributed in phases, (3) Incremental change is more manageable. Data architecture designed flexible from start to facilitate expansion at low additional cost.",
    },
  },
  {
    question: {
      es: "¿Alternative puede capacitar a mi equipo para que ellos creen reportes?",
      en: "Can Alternative train my team so they create reports?",
    },
    answer: {
      es: "Sí, ofrecemos capacitación en dos niveles: (1) Power User: Para analistas o usuarios técnicos que crearán nuevos reportes y dashboards. Curso 16-24 horas (teoría + práctica con datos reales de la empresa). Incluye: conceptos de modelado de datos, DAX/cálculos, mejores prácticas de visualización. (2) Usuario final: Para ejecutivos y gerencia que USAN dashboards pero no los crean. Curso 4-8 horas enfocado en interpretación y uso. Objetivo: autonomía para que tu equipo pueda crear nuevos reportes sin Alternative (sostenibilidad).",
      en: "Yes, we offer training at two levels: (1) Power User: For analysts or technical users who will create new reports and dashboards. 16-24 hour course (theory + practice with real company data). Includes: data modeling concepts, DAX/calculations, visualization best practices. (2) End user: For executives and management who USE dashboards but don't create them. 4-8 hour course focused on interpretation and use. Objective: autonomy so your team can create new reports without Alternative (sustainability).",
    },
  },
];

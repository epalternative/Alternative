import type { FaqEntry } from '../faqs';

/** FAQs de /servicios/desarrollo-tecnologia/desarrollo-software — extraídas de su PageClient.tsx. */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: "¿Cuánto cuesta realmente desarrollar software custom?",
      en: "How much does it really cost to develop custom software?",
    },
    answer: {
      es: "Rangos típicos según complejidad: Software simple (1-2 módulos, <20 pantallas, usuarios limitados): $25K-$50K. Software mediano (3-5 módulos, integración con 2-3 sistemas, <100 usuarios): $50K-$120K. Software complejo (5+ módulos, integraciones múltiples, >100 usuarios, alta transaccionalidad): $120K-$300K+. Factores que influyen: cantidad de funcionalidades, integraciones, usuarios concurrentes, seguridad/cumplimiento, móvil adicional a web, complejidad de lógica de negocio. Hacemos discovery y estimamos con precisión antes de ejecución.",
      en: "Typical ranges according to complexity: Simple software (1-2 modules, <20 screens, limited users): $25K-$50K. Medium software (3-5 modules, integration with 2-3 systems, <100 users): $50K-$120K. Complex software (5+ modules, multiple integrations, >100 users, high transactionality): $120K-$300K+. Factors that influence: number of features, integrations, concurrent users, security/compliance, mobile in addition to web, business logic complexity. We do discovery and estimate accurately before execution.",
    },
  },
  {
    question: {
      es: "¿Metodología ágil vs cascada: qué significa en la práctica?",
      en: "Agile vs waterfall methodology: what does it mean in practice?",
    },
    answer: {
      es: "Ágil (nuestra preferencia): Desarrollamos en sprints de 2-3 semanas. Cada sprint entrega funcionalidades funcionando que puedes ver y probar. Puedes ajustar prioridades entre sprints. Ventaja: flexibilidad, ves progreso constante, reduces riesgo (si algo no va bien, lo detectas temprano). Cascada: Definimos TODO upfront, desarrollamos 6 meses, entregas al final. Riesgo: si requisitos cambiaron o había mal entendidos, los descubres al final. Usamos cascada solo cuando cliente prefiere o contrato gubernamental lo requiere. 90% de proyectos son ágiles.",
      en: "Agile (our preference): We develop in 2-3 week sprints. Each sprint delivers working features you can see and test. You can adjust priorities between sprints. Advantage: flexibility, you see constant progress, reduce risk (if something goes wrong, you detect it early). Waterfall: We define EVERYTHING upfront, develop 6 months, deliver at end. Risk: if requirements changed or there were misunderstandings, you discover them at end. We use waterfall only when client prefers or government contract requires it. 90% of projects are agile.",
    },
  },
  {
    question: {
      es: "¿Qué pasa si mis requisitos cambian durante desarrollo?",
      en: "What happens if my requirements change during development?",
    },
    answer: {
      es: "En metodología ágil, cambios son esperados y manejables. Cambios menores (ajustar formulario, cambiar validación): Se incorporan en sprint actual o siguiente sin costo adicional. Cambios significativos (nuevo módulo, nueva integración): Evaluamos impacto en tiempo/costo, presentamos opciones (agregar al scope con ajuste de presupuesto, o diferir a fase 2). Cambios mayores (cambio fundamental de concepto): Puede requerir re-estimación del proyecto. Transparencia total: siempre comunicamos impacto de cambios ANTES de ejecutar.",
      en: "In agile methodology, changes are expected and manageable. Minor changes (adjust form, change validation): Incorporated in current or next sprint at no additional cost. Significant changes (new module, new integration): We evaluate impact on time/cost, present options (add to scope with budget adjustment, or defer to phase 2). Major changes (fundamental concept change): May require project re-estimation. Total transparency: we always communicate impact of changes BEFORE executing.",
    },
  },
  {
    question: {
      es: "¿Alternative mantiene el código rehén o cliente es dueño?",
      en: "Does Alternative hold code hostage or is client owner?",
    },
    answer: {
      es: "Cliente es dueño 100% del código fuente desde día 1. Al finalizar proyecto entregamos: código fuente completo, acceso a repositorio GitHub/Azure DevOps, base de datos con scripts, documentación técnica. Cliente puede: (1) Contratar Alternative para soporte ongoing (típico), (2) Contratar otro proveedor, (3) Mantener internamente si tiene desarrolladores. No hay lock-in. Diferencia vs muchos vendors que retienen código y cliente queda dependiente.",
      en: "Client owns 100% of source code from day 1. Upon project completion we deliver: complete source code, GitHub/Azure DevOps repository access, database with scripts, technical documentation. Client can: (1) Hire Alternative for ongoing support (typical), (2) Hire another provider, (3) Maintain internally if they have developers. No lock-in. Difference vs many vendors that retain code and client becomes dependent.",
    },
  },
  {
    question: {
      es: "¿Puedo ver el sistema mientras se desarrolla o solo al final?",
      en: "Can I see the system while it's being developed or only at the end?",
    },
    answer: {
      es: "Ves progreso cada 2-3 semanas (cada sprint). Al final de cada sprint: (1) Demo en vivo de funcionalidades completadas (15-30 min), (2) Puedes probar en ambiente de testing, (3) Damos feedback sobre qué viene en siguiente sprint, (4) Tú priorizas qué es más importante siguiente. Nunca esperamos 6 meses para mostrarte algo. Si algo no te gusta, lo ajustamos en siguiente sprint. Transparencia y feedback continuo son clave de ágil.",
      en: "You see progress every 2-3 weeks (each sprint). At end of each sprint: (1) Live demo of completed features (15-30 min), (2) You can test in testing environment, (3) We give feedback on what's coming in next sprint, (4) You prioritize what's most important next. We never wait 6 months to show you something. If you don't like something, we adjust it in next sprint. Transparency and continuous feedback are key to agile.",
    },
  },
  {
    question: {
      es: "¿Qué sucede después del lanzamiento? ¿Soporte incluido?",
      en: "What happens after launch? Is support included?",
    },
    answer: {
      es: "Garantía post-lanzamiento: 3-6 meses incluidos (según proyecto). Cubre: corrección de bugs, ajustes basados en uso real, soporte a usuarios. Después de garantía: Tres opciones: (1) Contrato de soporte Alternative: Mantenimiento, actualizaciones menores, soporte técnico, nuevas funcionalidades negociadas separadamente. (2) Soporte puntual: Pagas por hora según necesites (sin contrato). (3) Mantén internamente: Si tienes desarrolladores (tienes código fuente). Mayoría de clientes (80%) continúan con contrato de soporte Alternative por continuidad y conocimiento del sistema.",
      en: "Post-launch warranty: 3-6 months included (according to project). Covers: bug fixes, adjustments based on real usage, user support. After warranty: Three options: (1) Alternative support contract: Maintenance, minor updates, technical support, new features negotiated separately. (2) On-demand support: Pay per hour as needed (no contract). (3) Maintain internally: If you have developers (you have source code). Majority of clients (80%) continue with Alternative support contract for continuity and system knowledge.",
    },
  },
];

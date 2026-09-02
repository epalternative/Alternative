import type { FaqEntry } from '../faqs';

/** FAQs de /servicios/desarrollo-tecnologia — extraídas de su PageClient.tsx. */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: "¿Cómo determinan costo y tiempo de desarrollo?",
      en: "How do you determine development cost and time?",
    },
    answer: {
      es: "Depende de complejidad: cantidad de módulos/pantallas, integraciones con sistemas existentes, usuarios concurrentes, requisitos de seguridad/cumplimiento, necesidad de apps móviles. Estimación: Hacemos discovery de 1-2 semanas, desarrollamos especificación funcional detallada, estimamos esfuerzo en horas, presentamos propuesta con costo fijo o time & materials.",
      en: "Depends on complexity: number of modules/screens, integrations with existing systems, concurrent users, security/compliance requirements, need for mobile apps. Estimation: We do 1-2 week discovery, develop detailed functional specification, estimate effort in hours, present proposal with fixed cost or time & materials.",
    },
  },
  {
    question: {
      es: "¿Desarrollo custom vs comprar software comercial: cuándo cada uno?",
      en: "Custom development vs buying commercial software: when each?",
    },
    answer: {
      es: "Compra software comercial cuando: Proceso es estándar (contabilidad, nómina, CRM básico), múltiples vendors tienen soluciones probadas, presupuesto limitado, necesitas solución YA (1-2 meses). Desarrollo custom cuando: Proceso es único a tu negocio, software comercial requiere customizaciones mayores, ventaja competitiva está en tecnología, software comercial no existe para tu nicho, necesitas propiedad completa de IP. A veces híbrido es óptimo: software comercial core + desarrollos custom que lo complementan.",
      en: "Buy commercial software when: Process is standard (accounting, payroll, basic CRM), multiple vendors have proven solutions, limited budget, you need solution NOW (1-2 months). Custom development when: Process is unique to your business, commercial software requires major customizations, competitive advantage is in technology, commercial software doesn't exist for your niche, you need complete IP ownership. Sometimes hybrid is optimal: commercial software core + custom developments that complement it.",
    },
  },
  {
    question: {
      es: "¿Quién es dueño del código fuente y la solución?",
      en: "Who owns the source code and solution?",
    },
    answer: {
      es: "Cliente es dueño 100%. Código fuente, base de datos, documentación son propiedad del cliente. Alternative entrega todo al finalizar proyecto. Diferencia vs vendors que retienen propiedad: Algunos vendors desarrollan pero retienen código (cliente queda \"rehén\"). Nosotros transferimos propiedad completa. Cliente puede: contratar otro proveedor para mantenimiento, modificar código internamente si tiene capacidad, o continuar con Alternative para soporte.",
      en: "Client owns 100%. Source code, database, documentation are client property. Alternative delivers everything upon project completion. Difference vs vendors that retain ownership: Some vendors develop but retain code (client becomes \"hostage\"). We transfer complete ownership. Client can: hire another provider for maintenance, modify code internally if they have capacity, or continue with Alternative for support.",
    },
  },
  {
    question: {
      es: "¿Qué pasa después del lanzamiento? ¿Quién mantiene el sistema?",
      en: "What happens after launch? Who maintains the system?",
    },
    answer: {
      es: "Tres opciones post-lanzamiento: (1) Soporte Alternative (más común): Contrato de soporte/mantenimiento 12-24 meses. Incluye: corrección de bugs, ajustes menores, soporte a usuarios, actualizaciones de seguridad. (2) Equipo interno cliente: Si tiene desarrolladores, puede mantener (tenemos código fuente). Alternative provee knowledge transfer. (3) Otro proveedor: Cliente puede contratar cualquier proveedor (código es suyo). Típicamente clientes prefieren opción 1 por continuidad y conocimiento del sistema.",
      en: "Three post-launch options: (1) Alternative Support (most common): 12-24 month support/maintenance contract. Includes: bug fixes, minor adjustments, user support, security updates. (2) Internal client team: If they have developers, can maintain (we have source code). Alternative provides knowledge transfer. (3) Another provider: Client can hire any provider (code is theirs). Typically clients prefer option 1 for continuity and system knowledge.",
    },
  },
  {
    question: {
      es: "¿Metodología ágil vs cascada: cómo trabajan?",
      en: "Agile vs waterfall methodology: how do you work?",
    },
    answer: {
      es: "Metodología ágil (preferida 90% proyectos): Desarrollo iterativo en sprints de 2-3 semanas. Cliente ve progreso cada sprint, puede ajustar prioridades, entrega incremental de valor. Ventajas: flexibilidad, feedback temprano, riesgo reducido. Cascada (10% proyectos): Requisitos completos upfront, desarrollo lineal, entrega al final. Usamos cuando: requisitos extremadamente claros y estables, cliente prefiere no involucrarse semanalmente, contratos gubernamentales que requieren scope fijo. Enfoque típico: Ágil con sprints de 2 semanas, demos cada sprint, ajustes según feedback.",
      en: "Agile methodology (preferred 90% of projects): Iterative development in 2-3 week sprints. Client sees progress each sprint, can adjust priorities, incremental value delivery. Advantages: flexibility, early feedback, reduced risk. Waterfall (10% of projects): Complete requirements upfront, linear development, delivery at end. We use when: extremely clear and stable requirements, client prefers not to be involved weekly, government contracts requiring fixed scope. Typical approach: Agile with 2-week sprints, demos each sprint, adjustments based on feedback.",
    },
  },
  {
    question: {
      es: "¿Alternative solo desarrolla o también da consultoría estratégica tecnológica?",
      en: "Does Alternative only develop or also provide strategic technology consulting?",
    },
    answer: {
      es: "Ambos. Desarrollo (este servicio): Construimos la solución. Consultoría tecnológica (servicio 4): Asesoramos en decisiones estratégicas antes de desarrollar: arquitectura de solución, build vs buy, selección de tecnologías, evaluación de vendors, roadmap tecnológico. Secuencia típica: (1) Consultoría define QUÉ y CÓMO, (2) Desarrollo construye, (3) Soporte mantiene. Algunos clientes contratan solo consultoría (toman decisiones, ejecutan internamente). Mayoría contratan consultoría + desarrollo.",
      en: "Both. Development (this service): We build the solution. Technology consulting (service 4): We advise on strategic decisions before developing: solution architecture, build vs buy, technology selection, vendor evaluation, technology roadmap. Typical sequence: (1) Consulting defines WHAT and HOW, (2) Development builds, (3) Support maintains. Some clients hire only consulting (make decisions, execute internally). Majority hire consulting + development.",
    },
  },
];

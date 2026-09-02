import type { FaqEntry } from '../faqs';

/** FAQs de /servicios/desarrollo-tecnologia/aplicaciones-web-moviles — extraídas de su PageClient.tsx. */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: "¿Cuánto cuesta desarrollar app móvil o web?",
      en: "How much does it cost to develop mobile or web app?",
    },
    answer: {
      es: "Depende de complejidad y alcance: App simple (5-10 pantallas, funcionalidad básica, sin integraciones complejas): $15K-$35K. App mediana (15-25 pantallas, integraciones API, backend custom, login/usuarios): $35K-$80K. App compleja (30+ pantallas, funcionalidades avanzadas, AI/ML, pagos, tiempo real): $80K-$200K+. Web app: Típicamente 60-70% costo de móvil (menos testing, sin App Store). Estimamos con precisión después de discovery session donde entendemos alcance.",
      en: "Depends on complexity and scope: Simple app (5-10 screens, basic functionality, no complex integrations): $15K-$35K. Medium app (15-25 screens, API integrations, custom backend, login/users): $35K-$80K. Complex app (30+ screens, advanced features, AI/ML, payments, real-time): $80K-$200K+. Web app: Typically 60-70% cost of mobile (less testing, no App Store). We estimate accurately after discovery session where we understand scope.",
    },
  },
  {
    question: {
      es: "¿Cuánto tiempo toma desarrollo y publicación?",
      en: "How long does development and publication take?",
    },
    answer: {
      es: "Desarrollo: 3-5 meses típicamente. App simple: 2-3 meses. App compleja: 5-8 meses. Publicación en App Store/Play Store: 1-2 semanas adicionales (revisión de Apple/Google). Total: 3-6 meses desde kickoff hasta app disponible para descargar. Factor crítico: definición clara de alcance al inicio acelera todo. Cambios significativos de scope durante desarrollo pueden extender timeline 30-50%.",
      en: "Development: 3-5 months typically. Simple app: 2-3 months. Complex app: 5-8 months. Publication in App Store/Play Store: 1-2 additional weeks (Apple/Google review). Total: 3-6 months from kickoff until app available for download. Critical factor: clear scope definition at start accelerates everything. Significant scope changes during development can extend timeline 30-50%.",
    },
  },
  {
    question: {
      es: "¿Necesito app iOS Y Android o puedo empezar con una?",
      en: "Do I need iOS AND Android app or can I start with one?",
    },
    answer: {
      es: "Depende de tu audiencia. Datos LATAM: iOS ~20-30% market share, Android 70-80%. Si B2C (consumidor): Recomendamos iOS + Android desde inicio (no pierdes 70% del mercado). Si B2B (empresas): Puedes empezar con la plataforma que domina tu cliente target y agregar segunda después. Recomendación: React Native (cross-platform) te da ambas por costo de 1.5X una nativa. Mejor que hacer una nativa ahora y otra en 6 meses (costos duplicados).",
      en: "Depends on your audience. LATAM data: iOS ~20-30% market share, Android 70-80%. If B2C (consumer): We recommend iOS + Android from start (you don't lose 70% of market). If B2B (businesses): You can start with platform that dominates your target client and add second later. Recommendation: React Native (cross-platform) gives you both for cost of 1.5X one native. Better than making one native now and another in 6 months (duplicated costs).",
    },
  },
  {
    question: {
      es: "¿App funciona offline o requiere internet siempre?",
      en: "Does app work offline or always require internet?",
    },
    answer: {
      es: "Depende de diseño. Apps que SÍ pueden funcionar offline: Apps con datos locales (catálogos, contenido descargado), apps de captura de datos (formularios, fotos) que sincronizan después, apps de lectura (noticias, documentos). Apps que requieren internet: Apps con datos en tiempo real (social media, trading), apps transaccionales (pagos, transferencias), apps colaborativas (chat, video). Diseñamos estrategia offline apropiada según tu caso: offline completo, offline parcial (solo lectura), o solo online.",
      en: "Depends on design. Apps that CAN work offline: Apps with local data (catalogs, downloaded content), data capture apps (forms, photos) that sync later, reading apps (news, documents). Apps that require internet: Apps with real-time data (social media, trading), transactional apps (payments, transfers), collaborative apps (chat, video). We design appropriate offline strategy according to your case: complete offline, partial offline (read-only), or online only.",
    },
  },
  {
    question: {
      es: "¿Alternative diseña UX/UI o solo programa?",
      en: "Does Alternative design UX/UI or only program?",
    },
    answer: {
      es: "Hacemos ambos. Diseño UX/UI completo incluido: User research, wireframes, diseño visual profesional, prototipo interactivo. Diseñadores UX/UI en equipo. Diferencia vs agencias que solo diseñan: Diseñamos Y desarrollamos, asegurando que diseño es técnicamente viable y se implementa fielmente. Diferencia vs developers que solo programan: No usamos templates genéricos; diseño custom adaptado a tu marca y audiencia. Si ya tienes diseños de agencia externa, podemos implementarlos también.",
      en: "We do both. Complete UX/UI design included: User research, wireframes, professional visual design, interactive prototype. UX/UI designers on team. Difference vs agencies that only design: We design AND develop, ensuring design is technically viable and implemented faithfully. Difference vs developers that only program: We don't use generic templates; custom design adapted to your brand and audience. If you already have designs from external agency, we can implement them too.",
    },
  },
  {
    question: {
      es: "¿Qué pasa después de lanzamiento? ¿Actualizaciones incluidas?",
      en: "What happens after launch? Are updates included?",
    },
    answer: {
      es: "Post-lanzamiento incluye: 3 meses soporte (corrección bugs, ajustes menores), actualizaciones de seguridad, compatibilidad con nuevas versiones de iOS/Android. Después de 3 meses: Contrato de mantenimiento opcional (según complejidad): Actualizaciones periódicas, nuevas funcionalidades, soporte usuarios, monitoreo, optimizaciones. Apps requieren mantenimiento continuo: OS actualiza (iOS 18, Android 15), APIs de terceros cambian, bugs surgen con uso masivo. Sin mantenimiento, app se degrada en 12-18 meses.",
      en: "Post-launch includes: 3 months support (bug fixes, minor adjustments), security updates, compatibility with new iOS/Android versions. After 3 months: Optional maintenance contract (according to complexity): Periodic updates, new features, user support, monitoring, optimizations. Apps require continuous maintenance: OS updates (iOS 18, Android 15), third-party APIs change, bugs arise with massive usage. Without maintenance, app degrades in 12-18 months.",
    },
  },
];

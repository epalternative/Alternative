import type { FaqEntry } from '../faqs';

/** FAQs de /servicios/desarrollo-tecnologia/integracion-sistemas — extraídas de su PageClient.tsx. */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: "¿Cuánto cuesta integrar dos sistemas?",
      en: "How much does it cost to integrate two systems?",
    },
    answer: {
      es: "Depende de complejidad de integración: Integración simple (2 sistemas modernos con APIs documentadas, flujo unidireccional): $15K-$30K. Integración media (2-3 sistemas, flujos bidireccionales, transformación de datos): $30K-$60K. Integración compleja (5+ sistemas, lógica de negocio compleja, manejo de excepciones sofisticado): $60K-$120K+. Factores: calidad de APIs, volumen transaccional, tiempo real vs batch, manejo de errores. Evaluamos y estimamos con precisión.",
      en: "Depends on integration complexity: Simple integration (2 modern systems with documented APIs, unidirectional flow): $15K-$30K. Medium integration (2-3 systems, bidirectional flows, data transformation): $30K-$60K. Complex integration (5+ systems, complex business logic, sophisticated exception handling): $60K-$120K+. Factors: API quality, transaction volume, real-time vs batch, error handling. We evaluate and estimate accurately.",
    },
  },
  {
    question: {
      es: "¿Integraciones funcionan en tiempo real o hay delay?",
      en: "Do integrations work in real-time or is there delay?",
    },
    answer: {
      es: "Depende de diseño y necesidad: Tiempo real (<1 segundo): Webhooks + APIs REST. Ej: venta en e-commerce actualiza inventario instantáneamente. Near real-time (minutos): Polling periódico cada 5-15 min. Batch (horas): ETL que corre cada noche. Más común para consolidación de datos no urgentes. Recomendación: Balance entre necesidad de negocio y complejidad técnica. No todo necesita ser tiempo real; batch nocturno suficiente para muchos casos (60% integraciones).",
      en: "Depends on design and need: Real-time (<1 second): Webhooks + REST APIs. E.g.: sale in e-commerce updates inventory instantly. Near real-time (minutes): Periodic polling every 5-15 min. Batch (hours): ETL that runs each night. More common for non-urgent data consolidation. Recommendation: Balance between business need and technical complexity. Not everything needs to be real-time; nightly batch sufficient for many cases (60% integrations).",
    },
  },
  {
    question: {
      es: "¿Qué pasa si un sistema actualiza su API y rompe integración?",
      en: "What happens if a system updates its API and breaks integration?",
    },
    answer: {
      es: "Prevención: Integraciones bien diseñadas usan versionado de APIs (api.com/v1 vs /v2), contratos claros, testing automatizado. Cuando ocurre: Monitoreo detecta falla inmediatamente, alertas automáticas, equipo Alternative responde. Contrato de soporte incluye: Actualizaciones cuando vendors cambian APIs (común 1-2 veces/año por sistema). Sin soporte: Cliente asume riesgo de mantener. Por eso 90% de clientes contratan soporte ongoing según complejidad.",
      en: "Prevention: Well-designed integrations use API versioning (api.com/v1 vs /v2), clear contracts, automated testing. When it occurs: Monitoring detects failure immediately, automatic alerts, Alternative team responds. Support contract includes: Updates when vendors change APIs (common 1-2 times/year per system). Without support: Client assumes maintenance risk. That's why 90% of clients hire ongoing support according to complexity.",
    },
  },
  {
    question: {
      es: "¿Alternative usa herramientas low-code como Zapier o desarrollo custom?",
      en: "Does Alternative use low-code tools like Zapier or custom development?",
    },
    answer: {
      es: "Ambos según caso: Zapier/Make (low-code) cuando: integraciones simples, bajo volumen (<10K transacciones/mes), presupuesto limitado, no crítico si falla ocasionalmente. Desarrollo custom cuando: alto volumen, lógica compleja, criticidad alta (no puede fallar), necesidad de control total, transformaciones complejas. Nuestra experiencia: 30% proyectos usan low-code, 70% custom. Low-code tiene límites: 10K transacciones/mes, integraciones simples, menos control.",
      en: "Both according to case: Zapier/Make (low-code) when: simple integrations, low volume (<10K transactions/month), limited budget, not critical if fails occasionally. Custom development when: high volume, complex logic, high criticality (cannot fail), need for total control, complex transformations. Our experience: 30% of projects use low-code, 70% custom. Low-code has limits: 10K transactions/month, simple integrations, less control.",
    },
  },
  {
    question: {
      es: "¿Integración requiere modificar sistemas existentes?",
      en: "Does integration require modifying existing systems?",
    },
    answer: {
      es: "Idealmente no. Integraciones bien diseñadas son \"no invasivas\": se conectan vía APIs sin tocar código de sistemas. Excepción: Sistemas sin APIs necesitan: (1) Desarrollo de API custom (capa intermedia), o (2) RPA (bot que usa interfaz), o (3) Acceso directo a base de datos (menos ideal, riesgoso). Sistemas modernos (Salesforce, NetSuite, HubSpot, QuickBooks Online) tienen APIs robustas. Sistemas legacy (AS/400, Progress, FoxPro) requieren trabajo adicional.",
      en: "Ideally no. Well-designed integrations are \"non-invasive\": connect via APIs without touching system code. Exception: Systems without APIs need: (1) Custom API development (intermediate layer), or (2) RPA (bot that uses interface), or (3) Direct database access (less ideal, risky). Modern systems (Salesforce, NetSuite, HubSpot, QuickBooks Online) have robust APIs. Legacy systems (AS/400, Progress, FoxPro) require additional work.",
    },
  },
  {
    question: {
      es: "¿Cómo aseguran que datos sensibles están protegidos en integraciones?",
      en: "How do you ensure sensitive data is protected in integrations?",
    },
    answer: {
      es: "Seguridad por capas: (1) Encriptación: Datos en tránsito encriptados (SSL/TLS), credenciales en reposo encriptadas. (2) Autenticación: OAuth 2.0 (estándar seguro), API keys rotadas, no contraseñas en código. (3) Mínimo privilegio: Integraciones solo acceden a datos necesarios, no acceso completo a sistemas. (4) Auditoría: Logs completos de qué datos se accedieron cuándo. (5) Cumplimiento: Diseñamos alineados a GDPR, SOC 2, ISO 27001 según industria. Integraciones Alternative son tan o más seguras que acceso manual.",
      en: "Security by layers: (1) Encryption: Data in transit encrypted (SSL/TLS), credentials at rest encrypted. (2) Authentication: OAuth 2.0 (secure standard), rotated API keys, no passwords in code. (3) Minimum privilege: Integrations only access necessary data, not complete system access. (4) Auditing: Complete logs of what data was accessed when. (5) Compliance: We design aligned to GDPR, SOC 2, ISO 27001 according to industry. Alternative integrations are as or more secure than manual access.",
    },
  },
];

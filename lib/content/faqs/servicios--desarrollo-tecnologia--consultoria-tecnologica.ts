import type { FaqEntry } from '../faqs';

/** FAQs de /servicios/desarrollo-tecnologia/consultoria-tecnologica — extraídas de su PageClient.tsx. */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: "¿Cuánto cuesta consultoría tecnológica?",
      en: "How much does technology consulting cost?",
    },
    answer: {
      es: "Depende de alcance y complejidad: Consultoría puntual (arquitectura de solución, evaluación de 2-3 opciones): $10K-$25K. Consultoría completa (evaluación exhaustiva de 5+ opciones, RFP, TCO, recomendaciones): $25K-$60K. Consultoría estratégica (roadmap tecnológico 3 años, diagnóstico completo, arquitectura enterprise): $40K-$100K+. Típicamente consultoría es 5-15% del valor de inversión tecnológica que estás evaluando.",
      en: "Depends on scope and complexity: Point consulting (solution architecture, evaluation of 2-3 options): $10K-$25K. Complete consulting (exhaustive evaluation of 5+ options, RFP, TCO, recommendations): $25K-$60K. Strategic consulting (3-year technology roadmap, complete diagnosis, enterprise architecture): $40K-$100K+. Typically consulting is 5-15% of value of technology investment you're evaluating.",
    },
  },
  {
    question: {
      es: "¿Consultoría solo recomienda o también ejecuta?",
      en: "Does consulting only recommend or also execute?",
    },
    answer: {
      es: "Ambos modelos: (1) Solo consultoría: Recomendamos, cliente ejecuta con vendor elegido o internamente. (2) Consultoría + implementación: Recomendamos Y ejecutamos con nuestro equipo de desarrollo. Modelo 2 es común cuando recomendación es desarrollo custom o integración compleja. Ventaja de Alternative: Somos consultores QUE TAMBIÉN desarrollamos, entonces recomendaciones son técnicamente viables (consultores que no desarrollan a veces recomiendan cosas imposibles de ejecutar).",
      en: "Both models: (1) Consulting only: We recommend, client executes with chosen vendor or internally. (2) Consulting + implementation: We recommend AND execute with our development team. Model 2 is common when recommendation is custom development or complex integration. Alternative advantage: We are consultants WHO ALSO develop, so recommendations are technically viable (consultants who don't develop sometimes recommend things impossible to execute).",
    },
  },
  {
    question: {
      es: "¿Alternative tiene alianzas con vendors que sesgan recomendaciones?",
      en: "Does Alternative have vendor alliances that bias recommendations?",
    },
    answer: {
      es: "No tenemos alianzas comerciales con vendors tecnológicos (SAP, Salesforce, Microsoft, Oracle). No ganamos comisiones por recomendar proveedor específico. Nuestro modelo: Cobramos por consultoría, punto. Recomendación es puramente basada en análisis objetivo de lo mejor para tu caso. Diferencia crítica: Muchas \"consultoras\" son en realidad revendedoras de tecnología específica (ej: partner SAP). Nosotros no. Si recomendamos SAP es porque análisis dice que es mejor opción, no porque ganamos comisión.",
      en: "We don't have commercial alliances with technology vendors (SAP, Salesforce, Microsoft, Oracle). We don't earn commissions for recommending specific provider. Our model: We charge for consulting, period. Recommendation is purely based on objective analysis of what's best for your case. Critical difference: Many \"consultancies\" are actually resellers of specific technology (e.g.: SAP partner). We are not. If we recommend SAP it's because analysis says it's best option, not because we earn commission.",
    },
  },
  {
    question: {
      es: "¿Qué pasa si no estoy de acuerdo con recomendación de consultoría?",
      en: "What happens if I don't agree with consulting recommendation?",
    },
    answer: {
      es: "Recomendación no es mandato. Presentamos análisis objetivo con evidencia, pros/cons de opciones, y recomendación justificada. Cliente decide siempre. Si decides opción diferente por razones estratégicas/políticas que no consideramos, está bien. Lo importante: Decisión es informada (conoces trade-offs) vs decisión ciega. Experiencia: 85% de clientes siguen recomendación porque análisis es riguroso, 15% eligen diferente por factores que priorizan distinto (ej: relación existente con vendor, política corporativa).",
      en: "Recommendation is not mandate. We present objective analysis with evidence, pros/cons of options, and justified recommendation. Client always decides. If you choose different option for strategic/political reasons we didn't consider, that's fine. Important: Decision is informed (you know trade-offs) vs blind decision. Experience: 85% of clients follow recommendation because analysis is rigorous, 15% choose differently for factors they prioritize differently (e.g.: existing relationship with vendor, corporate policy).",
    },
  },
  {
    question: {
      es: "¿Consultoría garantiza éxito de proyecto si sigo recomendación?",
      en: "Does consulting guarantee project success if I follow recommendation?",
    },
    answer: {
      es: "Consultoría reduce riesgo significativamente pero no garantiza. Garantizamos: (1) Análisis riguroso con metodología probada, (2) Recomendación técnicamente viable, (3) TCO calculado correctamente. NO garantizamos: éxito de implementación (depende de vendor/equipo implementador), adopción de usuarios (change management), contexto de negocio no cambia. Analogía: Arquitecto garantiza planos técnicamente sólidos, no garantiza que constructor ejecute perfectamente. Sin embargo, probabilidad de éxito con consultoría vs sin ella: 3X mayor.",
      en: "Consulting significantly reduces risk but doesn't guarantee. We guarantee: (1) Rigorous analysis with proven methodology, (2) Technically viable recommendation, (3) Correctly calculated TCO. We DON'T guarantee: implementation success (depends on vendor/implementing team), user adoption (change management), business context doesn't change. Analogy: Architect guarantees technically sound plans, doesn't guarantee builder executes perfectly. However, success probability with consulting vs without it: 3X greater.",
    },
  },
  {
    question: {
      es: "¿Cuándo en ciclo de proyecto debo contratar consultoría?",
      en: "When in project cycle should I hire consulting?",
    },
    answer: {
      es: "ANTES de comprometer inversión. Secuencia correcta: (1) Identificas necesidad (ej: \"necesitamos ERP\"), (2) Contratas consultoría para evaluar opciones, (3) Decides basado en análisis, (4) Contratas implementación con vendor elegido o Alternative. Error común: Contratar consultoría DESPUÉS de ya haber comprado tecnología (\"ayúdanos a implementar este SAP que compramos\"). Ahí consultora tiene manos atadas - decisión ya se tomó. Momento óptimo: Cuando sabes QUÉ necesitas pero no sabes CÓMO (tecnología, approach, vendor).",
      en: "BEFORE committing investment. Correct sequence: (1) You identify need (e.g.: \"we need ERP\"), (2) You hire consulting to evaluate options, (3) You decide based on analysis, (4) You hire implementation with chosen vendor or Alternative. Common error: Hiring consulting AFTER already having bought technology (\"help us implement this SAP we bought\"). There consultancy has hands tied - decision already made. Optimal moment: When you know WHAT you need but don't know HOW (technology, approach, vendor).",
    },
  },
];

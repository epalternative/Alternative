import type { FaqEntry } from '../faqs';

/** FAQs de /servicios/gestion-proyectos/casos-negocio — extraídas de su PageClient.tsx. */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: "¿Cuánto tarda desarrollar un business case?",
      en: "How long does it take to develop a business case?",
    },
    answer: {
      es: "Depende del alcance y disponibilidad de datos. Típicamente 2-4 semanas para un business case completo: discovery 3-5 días, análisis 1-2 semanas, documentación y revisión 1 semana. Para iniciativas más simples, podemos entregar en 1-2 semanas.",
      en: "It depends on scope and data availability. Typically 2-4 weeks for a complete business case: discovery 3-5 days, analysis 1-2 weeks, documentation and review 1 week. For simpler initiatives, we can deliver in 1-2 weeks.",
    },
  },
  {
    question: {
      es: "¿Incluyen el modelo financiero en Excel o solo el documento?",
      en: "Do you include the financial model in Excel or just the document?",
    },
    answer: {
      es: "Sí. Entregamos el business case en Word/PDF y el modelo financiero en Excel (o Google Sheets) para que tu equipo pueda ajustar supuestos, escenarios y mantenerlo vivo. La propiedad intelectual es del cliente.",
      en: "Yes. We deliver the business case in Word/PDF and the financial model in Excel (or Google Sheets) so your team can adjust assumptions, scenarios and keep it alive. Intellectual property belongs to the client.",
    },
  },
  {
    question: {
      es: "¿Pueden presentar el business case ante nuestra junta?",
      en: "Can you present the business case to our board?",
    },
    answer: {
      es: "Sí, si lo solicitas. Preparamos el deck ejecutivo y uno de nuestros consultores puede acompañar la presentación, responder preguntas técnicas o de metodología, y apoyar al sponsor durante la junta. Suele ser valioso cuando hay escepticismo o preguntas difíciles.",
      en: "Yes, if you request it. We prepare the executive deck and one of our consultants can join the presentation, answer technical or methodology questions, and support the sponsor during the board meeting. It is often valuable when there is skepticism or tough questions.",
    },
  },
  {
    question: {
      es: "¿Qué industrias han apoyado con business cases?",
      en: "What industries have you supported with business cases?",
    },
    answer: {
      es: "Banca, seguros, retail, manufactura, tecnología, telecomunicaciones, salud, gobierno y servicios profesionales. El rigor del análisis es transversal; adaptamos el lenguaje y los indicadores al sector del cliente.",
      en: "Banking, insurance, retail, manufacturing, technology, telecommunications, healthcare, government and professional services. The rigor of the analysis is transversal; we adapt the language and indicators to the client's sector.",
    },
  },
  {
    question: {
      es: "¿El business case garantiza la aprobación?",
      en: "Does the business case guarantee approval?",
    },
    answer: {
      es: "No. Un business case bien hecho aumenta sustancialmente la probabilidad de aprobación al presentar argumentos claros, números rigurosos y riesgos explícitos. La decisión final siempre es de la junta o comité. Lo que sí garantizamos es que la decisión se tome con información de calidad.",
      en: "No. A well-done business case substantially increases the probability of approval by presenting clear arguments, rigorous numbers and explicit risks. The final decision is always the board's or committee's. What we do guarantee is that the decision is made with quality information.",
    },
  },
  {
    question: {
      es: "¿Cómo se cobra un business case?",
      en: "How is a business case charged?",
    },
    answer: {
      es: "Por proyecto fijo según alcance acordado. Incluye discovery, análisis, documentación y una ronda de revisiones. Presentación en junta y rondas adicionales de ajuste se cotizan por separado si se requieren. No hay costos ocultos.",
      en: "Fixed per project according to agreed scope. Includes discovery, analysis, documentation and one round of revisions. Board presentation and additional adjustment rounds are quoted separately if required. No hidden costs.",
    },
  },
];

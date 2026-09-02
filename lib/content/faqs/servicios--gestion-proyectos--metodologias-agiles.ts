import type { FaqEntry } from '../faqs';

/** FAQs de /servicios/gestion-proyectos/metodologias-agiles — extraídas de su PageClient.tsx. */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: "¿Cuál es la diferencia entre Scrum Master y Project Manager tradicional?",
      en: "What's the difference between Scrum Master and traditional Project Manager?",
    },
    answer: {
      es: "El PM tradicional dirige y asigna tareas. El Scrum Master facilita y remueve impedimentos. El equipo es auto-organizado y toma decisiones técnicas. El SM no es jefe del equipo; es su facilitador y coach. Reporta a la organización sobre adopción ágil, no sobre desempeño individual.",
      en: "The traditional PM directs and assigns tasks. The Scrum Master facilitates and removes impediments. The team is self-organized and makes technical decisions. The SM is not the team's boss; they're their facilitator and coach. They report to the organization on agile adoption, not individual performance.",
    },
  },
  {
    question: {
      es: "¿Cuánto tiempo necesitamos un Scrum Master externo?",
      en: "How long do we need an external Scrum Master?",
    },
    answer: {
      es: "Típicamente 3-6 meses para establecer prácticas sólidas. Después opciones: entrenar SM interno, reducir a coaching quincenal, o mantener si el valor lo justifica. Nuestro objetivo es dejar capacidad instalada, no dependencia.",
      en: "Typically 3-6 months to establish solid practices. Then options: train internal SM, reduce to bi-weekly coaching, or maintain if value justifies it. Our goal is to leave installed capacity, not dependency.",
    },
  },
  {
    question: {
      es: "¿Ágil funciona para proyectos no-software?",
      en: "Does Agile work for non-software projects?",
    },
    answer: {
      es: "Sí, con adaptaciones. Marketing, HR, operaciones usan Kanban exitosamente. Hardware y construcción usan híbridos ágil-waterfall. El principio de entregas incrementales y feedback continuo aplica a casi cualquier trabajo de conocimiento.",
      en: "Yes, with adaptations. Marketing, HR, operations use Kanban successfully. Hardware and construction use agile-waterfall hybrids. The principle of incremental deliveries and continuous feedback applies to almost any knowledge work.",
    },
  },
  {
    question: {
      es: "¿Qué pasa si el equipo ya tiene Project Manager?",
      en: "What if the team already has a Project Manager?",
    },
    answer: {
      es: "Pueden coexistir. El PM gestiona stakeholders, presupuesto, contratos. El SM facilita al equipo de desarrollo. En transiciones, a veces el PM evoluciona a SM o a Product Owner. Evaluamos caso por caso.",
      en: "They can coexist. The PM manages stakeholders, budget, contracts. The SM facilitates the development team. In transitions, sometimes the PM evolves to SM or Product Owner. We evaluate case by case.",
    },
  },
  {
    question: {
      es: "¿Cómo miden el éxito del Scrum Master?",
      en: "How do you measure Scrum Master success?",
    },
    answer: {
      es: "Métricas de equipo, no individuales: velocidad sostenible, predictibilidad de entregas, satisfacción del equipo (encuestas), reducción de impedimentos, calidad de retrospectivas, madurez ágil progresiva.",
      en: "Team metrics, not individual: sustainable velocity, delivery predictability, team satisfaction (surveys), impediment reduction, retrospective quality, progressive agile maturity.",
    },
  },
  {
    question: {
      es: "¿Scrum funciona con equipos remotos o híbridos?",
      en: "Does Scrum work with remote or hybrid teams?",
    },
    answer: {
      es: "Absolutamente. Dailys por video, boards digitales (Jira, Miro), herramientas de retrospectiva virtual. De hecho, Scrum provee estructura que equipos remotos necesitan para coordinarse efectivamente.",
      en: "Absolutely. Dailies by video, digital boards (Jira, Miro), virtual retrospective tools. In fact, Scrum provides structure that remote teams need to coordinate effectively.",
    },
  },
];

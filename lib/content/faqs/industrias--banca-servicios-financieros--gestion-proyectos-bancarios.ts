import type { FaqEntry } from '../faqs';

/**
 * FAQs de /industrias/banca-servicios-financieros/gestion-proyectos-bancarios
 *
 * Acuerdos verificados contra el PDF oficial de la SBP:
 * - Acuerdo 003-2012 (22 may 2012), gestión del riesgo de la tecnología de la información
 *   https://www.superbancos.gob.pa/documentos/leyes_y_regulaciones/acuerdos/2012/Acuerdo_3-2012.pdf
 * - Acuerdo 011-2018 (11 sep 2018), Riesgo Operativo
 *   https://www.superbancos.gob.pa/documentos/leyes_y_regulaciones/acuerdos/2018/Acuerdo_11-2018.pdf
 */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: '¿En qué se diferencia un proyecto bancario de uno en cualquier otra industria?',
      en: 'How is a banking project different from one in any other industry?',
    },
    answer: {
      es: 'En que el margen de error es distinto. Un despliegue que en otra industria se corrige al día siguiente, en un core bancario afecta saldos, cierres y reportería regulatoria. Eso obliga a ventanas de cambio acotadas, planes de reversión probados y evidencia de cada paso. La metodología no cambia; cambia el nivel de rigor exigible en control de cambios y en trazabilidad.',
      en: 'The margin for error is different. A deployment that in another industry is fixed the next day affects balances, closings and regulatory reporting in a core banking system. That forces tight change windows, tested rollback plans and evidence for every step. The methodology does not change; what changes is the level of rigor required in change control and traceability.',
    },
  },
  {
    question: {
      es: '¿Qué exige la normativa sobre proyectos tecnológicos?',
      en: 'What does the regulation require regarding technology projects?',
    },
    answer: {
      es: 'El Acuerdo 003-2012 establece lineamientos para la gestión del riesgo de la tecnología de la información. Para un proyecto eso se traduce en que el riesgo tecnológico no es un anexo al final: la identificación de riesgos, los controles y la evidencia forman parte del proyecto desde el arranque. Y el Acuerdo 011-2018 añade que la mitigación debe monitorearse hasta cerrarse en los plazos definidos.',
      en: 'Agreement 003-2012 establishes guidelines for information technology risk management. For a project this means technology risk is not an annex at the end: risk identification, controls and evidence are part of the project from kick-off. And Agreement 011-2018 adds that mitigation must be monitored until it is closed within the defined timeframes.',
    },
  },
  {
    question: {
      es: '¿Aportan un PM o montan la capacidad interna?',
      en: 'Do you provide a PM or build the internal capability?',
    },
    answer: {
      es: 'Las dos modalidades. Podemos asignar un Project Manager certificado PMP® que se integra al proyecto, o acompañar a la entidad a estructurar su propia práctica de gestión de proyectos. La segunda tiene sentido cuando hay varios proyectos simultáneos y el problema no es un proyecto concreto sino la falta de método común.',
      en: 'Both. We can assign a PMP® certified Project Manager who joins the project, or support the institution in structuring its own project management practice. The second makes sense when there are several simultaneous projects and the problem is not one project but the lack of a common method.',
    },
  },
  {
    question: {
      es: '¿Cómo gestionan un proyecto que no puede parar la operación?',
      en: 'How do you manage a project that cannot stop operations?',
    },
    answer: {
      es: 'Se planifica alrededor del calendario operativo, no contra él. Eso significa identificar desde el inicio los cierres, los picos de operación y las ventanas reales disponibles, y diseñar el despliegue por fases con puntos de reversión. Un plan que ignora el cierre de mes se rompe en el primer hito.',
      en: 'You plan around the operational calendar, not against it. That means identifying closings, operational peaks and the real available windows from the outset, and designing a phased deployment with rollback points. A plan that ignores month-end closing breaks at the first milestone.',
    },
  },
  {
    question: {
      es: '¿Qué pasa con un proyecto que ya viene retrasado?',
      en: 'What about a project that is already behind schedule?',
    },
    answer: {
      es: 'Se empieza por entender por qué, que casi nunca es lo que parece. Hacemos una evaluación del estado real —alcance comprometido, dependencias, riesgos abiertos— y a partir de ahí se hace un replanteamiento completo con supuestos explícitos. Recuperar un proyecto exige decidir qué se recorta; sin esa decisión, el replan solo mueve la fecha.',
      en: 'You start by understanding why, which is almost never what it seems. We assess the real status — committed scope, dependencies, open risks — and from there do a full replan with explicit assumptions. Recovering a project requires deciding what gets cut; without that decision, the replan only moves the date.',
    },
  },
];

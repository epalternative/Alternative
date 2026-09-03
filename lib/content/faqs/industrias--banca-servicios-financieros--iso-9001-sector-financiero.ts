import type { FaqEntry } from '../faqs';

/**
 * FAQs de /industrias/banca-servicios-financieros/iso-9001-sector-financiero
 *
 * Acuerdos verificados contra el PDF oficial de la SBP:
 * - Acuerdo 005-2011 (20 sep 2011), Gobierno Corporativo
 *   https://www.superbancos.gob.pa/documentos/leyes_y_regulaciones/acuerdos/2011/Acuerdo_5-2011.pdf
 * - Acuerdo 011-2018 (11 sep 2018), Riesgo Operativo
 *   https://www.superbancos.gob.pa/documentos/leyes_y_regulaciones/acuerdos/2018/Acuerdo_11-2018.pdf
 */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: '¿ISO 9001 es obligatoria para un banco en Panamá?',
      en: 'Is ISO 9001 mandatory for a bank in Panama?',
    },
    answer: {
      es: 'No. ISO 9001 es voluntaria; la normativa bancaria es obligatoria y va por otra vía. Lo que ocurre es que ambas piden lo mismo en el fondo: procesos definidos, responsables identificados, evidencia de que los controles operan y mejora a partir de lo que falla. Certificar no exime de nada, pero aprovecha trabajo que la entidad ya tiene que hacer.',
      en: 'No. ISO 9001 is voluntary; banking regulation is mandatory and follows a different track. What happens is that both ask for the same thing underneath: defined processes, identified owners, evidence that controls operate, and improvement based on what fails. Certifying exempts you from nothing, but it leverages work the institution already has to do.',
    },
  },
  {
    question: {
      es: '¿Duplicamos trabajo si ya cumplimos con la normativa de la SBP?',
      en: 'Do we duplicate work if we already comply with SBP regulation?',
    },
    answer: {
      es: 'No si se diseña un sistema único. El Acuerdo 011-2018 exige identificar, medir, mitigar, monitorear y controlar el riesgo operativo; ISO 9001 exige enfoque a procesos y pensamiento basado en riesgos. La matriz de riesgos y controles puede ser la misma, con vistas distintas para cada destinatario. Montar dos sistemas paralelos es el error más caro y el más común.',
      en: 'Not if you design a single system. Agreement 011-2018 requires identifying, measuring, mitigating, monitoring and controlling operational risk; ISO 9001 requires a process approach and risk-based thinking. The risk and control matrix can be the same, with different views for each audience. Building two parallel systems is the most expensive and most common mistake.',
    },
  },
  {
    question: {
      es: '¿Qué alcance conviene certificar primero?',
      en: 'What scope makes sense to certify first?',
    },
    answer: {
      es: 'Un alcance acotado y defendible antes que uno amplio y frágil. Suele funcionar empezar por procesos con cara al cliente y volumen alto, donde la mejora se nota y la evidencia es fácil de sostener. Ampliar después es sencillo; recortar un alcance que ya se declaró ante el organismo certificador, no.',
      en: 'A narrow, defensible scope rather than a broad, fragile one. It usually works to start with high-volume customer-facing processes, where improvement is visible and evidence is easy to sustain. Expanding later is straightforward; narrowing a scope already declared to the certification body is not.',
    },
  },
  {
    question: {
      es: '¿Quién debe liderar el sistema de gestión de calidad?',
      en: 'Who should lead the quality management system?',
    },
    answer: {
      es: 'Alguien con autoridad para decidir sobre procesos, no un rol simbólico. El Acuerdo 005-2011 actualiza las disposiciones sobre gobierno corporativo y ahí está la clave: si el sistema no reporta a un nivel que pueda resolver conflictos entre áreas, se convierte en un archivo de documentos que nadie usa.',
      en: 'Someone with authority to decide on processes, not a symbolic role. Agreement 005-2011 updates the corporate governance provisions and that is the key: if the system does not report to a level that can resolve conflicts between areas, it becomes a document archive nobody uses.',
    },
  },
  {
    question: {
      es: '¿Cómo se sostiene la certificación después de obtenerla?',
      en: 'How is the certification sustained after obtaining it?',
    },
    answer: {
      es: 'Con auditorías internas que busquen problemas de verdad y con indicadores que alguien mire. El organismo certificador vuelve periódicamente, y la diferencia entre una entidad que renueva sin sobresaltos y otra que corre las semanas previas está en si el sistema se usó durante el año o se guardó tras la auditoría inicial.',
      en: 'With internal audits that genuinely look for problems and with indicators someone actually reviews. The certification body returns periodically, and the difference between an institution that renews smoothly and one that scrambles in the preceding weeks is whether the system was used during the year or shelved after the initial audit.',
    },
  },
];

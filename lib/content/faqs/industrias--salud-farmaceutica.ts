import type { FaqEntry } from '../faqs';

/** FAQs de /industrias/salud-farmaceutica — extraídas de su PageClient.tsx. */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: "¿ISO 9001 en salud genera burocracia que frena atención médica?",
      en: "Does ISO 9001 in healthcare create bureaucracy that slows medical care?",
    },
    answer: {
      es: "Mal implementado, sí. ISO con documentación excesiva y procesos rígidos puede frenar. Bien implementado, mejora atención: Protocolos claros (médicos no \"inventan\", siguen mejores prácticas probadas), procesos optimizados (menos esperas), controles que previenen errores (seguridad paciente). Alternative diseña ISO pragmático para salud: documentamos esencial, procesos ágiles adaptados a realidad clínica. 85% instituciones salud reportan ISO como mejora neta después de 18 meses.",
      en: "Poorly implemented, yes. ISO with excessive documentation and rigid processes can slow down. Well implemented, improves care: Clear protocols (doctors don't \"invent\", follow proven best practices), optimized processes (less waiting), controls that prevent errors (patient safety). Alternative designs pragmatic ISO for healthcare: we document essential, agile processes adapted to clinical reality. 85% of healthcare institutions report ISO as net improvement after 18 months.",
    },
  },
  {
    question: {
      es: "¿Alternative tiene experiencia con BPM farmacéuticas o solo ISO?",
      en: "Does Alternative have experience with pharmaceutical GMP or only ISO?",
    },
    answer: {
      es: "Experiencia en ambos. ISO 9001/13485: Sistema de gestión de calidad general. BPM (Buenas Prácticas Manufactura): Requisitos específicos farmacéuticas/dispositivos médicos. Muchas empresas implementan ISO + BPM juntos (complementarios). Tenemos experiencia preparando distribuidoras farmacéuticas para certificación BPD (Buenas Prácticas Distribución) y BPA (Almacenamiento). Si empresa requiere cumplimiento BPM/BPD/BPA, diseñamos sistema que cumpla regulación local.",
      en: "Experience in both. ISO 9001/13485: General quality management system. GMP (Good Manufacturing Practices): Specific requirements for pharmaceuticals/medical devices. Many companies implement ISO + GMP together (complementary). We have experience preparing pharmaceutical distributors for GDP (Good Distribution Practices) and GSP (Good Storage Practices) certification. If company requires GMP/GDP/GSP compliance, we design system that complies with local regulations.",
    },
  },
  {
    question: {
      es: "¿Cómo Alternative maneja implementación sin afectar atención de pacientes?",
      en: "How does Alternative handle implementation without affecting patient care?",
    },
    answer: {
      es: "Metodología específica para 24/7: (1) Diagnóstico: Sin interrumpir, observamos operación, entrevistamos fuera de horas pico. (2) Diseño: Workshops con personal en horarios convenientes (no horas críticas). (3) Capacitación: Turnos múltiples (capacitamos personal de mañana, tarde, noche separadamente). (4) Go-live: Gradual por área (no toda institución simultánea), soporte intensivo primeras semanas. Objetivo: mejorar operación sin afectar pacientes.",
      en: "Specific methodology for 24/7: (1) Diagnosis: Without interrupting, we observe operation, interview outside peak hours. (2) Design: Workshops with staff at convenient times (not critical hours). (3) Training: Multiple shifts (we train morning, afternoon, night staff separately). (4) Go-live: Gradual by area (not entire institution simultaneously), intensive support first weeks. Objective: improve operation without affecting patients.",
    },
  },
  {
    question: {
      es: "¿Certificación ISO en salud es reconocida por aseguradoras/reguladores?",
      en: "Is ISO certification in healthcare recognized by insurers/regulators?",
    },
    answer: {
      es: "Sí. ISO 9001 es reconocido internacionalmente. Aseguradoras: Muchas valoran ISO al negociar tarifas (demuestra calidad). Reguladores: Ministerio Salud ve ISO positivamente (aunque no reemplaza licencias sanitarias). Convenios corporativos: Empresas grandes prefieren clínicas certificadas ISO para convenios. Acreditaciones: ISO 9001 facilita acreditaciones hospitalarias (Joint Commission, ICONTEC). ISO no reemplaza cumplimiento sanitario obligatorio, pero complementa y facilita.",
      en: "Yes. ISO 9001 is internationally recognized. Insurers: Many value ISO when negotiating rates (demonstrates quality). Regulators: Ministry of Health views ISO positively (though it doesn't replace sanitary licenses). Corporate agreements: Large companies prefer ISO-certified clinics for agreements. Accreditations: ISO 9001 facilitates hospital accreditations (Joint Commission, ICONTEC). ISO doesn't replace mandatory sanitary compliance, but complements and facilitates it.",
    },
  },
];

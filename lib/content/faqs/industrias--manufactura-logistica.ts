import type { FaqEntry } from '../faqs';

/** FAQs de /industrias/manufactura-logistica — extraídas de su PageClient.tsx. */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: "¿Lean Manufacturing funciona en plantas pequeñas o solo grandes?",
      en: "Does Lean Manufacturing work in small plants or only large ones?",
    },
    answer: {
      es: "Lean aplica a cualquier tamaño: Planta pequeña (20 empleados, 1 línea) hasta grande (500+ empleados, 10+ líneas). Principios Lean son universales: eliminar desperdicios, flujo continuo, mejora continua. Diferencia: Escala de proyecto y complejidad. Planta pequeña: proyecto Lean 3-4 meses, mejoras 15-25%. Planta grande: proyecto 8-12 meses, mejoras 20-35%. ROI positivo en ambos casos (payback típico 6-18 meses).",
      en: "Lean applies to any size: Small plant (20 employees, 1 line) to large (500+ employees, 10+ lines). Lean principles are universal: eliminate waste, continuous flow, continuous improvement. Difference: Project scale and complexity. Small plant: Lean project 3-4 months, improvements 15-25%. Large plant: project 8-12 months, improvements 20-35%. Positive ROI in both cases (typical payback 6-18 months).",
    },
  },
  {
    question: {
      es: "¿Implementación Lean requiere parar producción?",
      en: "Does Lean implementation require stopping production?",
    },
    answer: {
      es: "No. Lean se implementa con planta operando. Metodología: (1) Diagnóstico: Sin parar, observamos operación, (2) Eventos Kaizen: Workshops 2-3 días con equipo (línea puede seguir con resto), (3) Cambios: Implementamos en turnos de mantenimiento o fin de semana, (4) Re-layout: Si necesario, en parada anual programada. Objetivo es mejorar mientras produces, no parar 3 meses para optimizar.",
      en: "No. Lean is implemented with plant operating. Methodology: (1) Diagnosis: Without stopping, we observe operation, (2) Kaizen Events: 2-3 day workshops with team (line can continue with rest), (3) Changes: We implement during maintenance shifts or weekend, (4) Re-layout: If necessary, during scheduled annual shutdown. Objective is to improve while producing, not stop 3 months to optimize.",
    },
  },
  {
    question: {
      es: "¿ISO 9001 en manufactura es burocracia o realmente ayuda?",
      en: "Is ISO 9001 in manufacturing bureaucracy or does it really help?",
    },
    answer: {
      es: "Bien implementado, ayuda significativamente: Documenta procesos (reduce variabilidad operador a operador), estandariza controles de calidad (menos defectos), asegura trazabilidad (crítico para recalls/auditorías), facilita training de nuevos operadores (procedimientos claros). Mal implementado: Puede generar burocracia si exceso de documentación innecesaria. Alternative diseña ISO pragmático: documenta lo esencial, controles que agregan valor. 90% manufactureras reportan ISO como beneficio neto después de 18 meses.",
      en: "Well implemented, helps significantly: Documents processes (reduces operator-to-operator variability), standardizes quality controls (fewer defects), ensures traceability (critical for recalls/audits), facilitates training of new operators (clear procedures). Poorly implemented: Can generate bureaucracy if excess unnecessary documentation. Alternative designs pragmatic ISO: documents essential, controls that add value. 90% of manufacturers report ISO as net benefit after 18 months.",
    },
  },
  {
    question: {
      es: "¿Alternative tiene experiencia en industrias específicas (alimentos, farmacéutica, metalmecánica)?",
      en: "Does Alternative have experience in specific industries (food, pharmaceutical, metalworking)?",
    },
    answer: {
      es: "Experiencia en múltiples verticales manufactura: alimentos y bebidas, farmacéutica, plásticos, metalmecánica, textil, electrónica. Aunque procesos específicos difieren, principios Lean y ISO aplican universalmente. Para industrias reguladas (farmacéutica BPM, alimentos HACCP), tenemos experiencia en cumplimiento adicional a ISO 9001. Si manufactura muy específica, curva aprendizaje inicial de particularidades técnicas pero metodología comprobada.",
      en: "Experience in multiple manufacturing verticals: food and beverages, pharmaceutical, plastics, metalworking, textile, electronics. Although specific processes differ, Lean and ISO principles apply universally. For regulated industries (pharmaceutical GMP, food HACCP), we have experience in additional compliance beyond ISO 9001. If very specific manufacturing, initial learning curve of technical particularities but proven methodology.",
    },
  },
];

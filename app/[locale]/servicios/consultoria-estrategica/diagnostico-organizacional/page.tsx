'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import {
  Search,
  ArrowRight,
  ChevronDown,
  TrendingDown,
  Building2,
  AlertTriangle,
  FileText,
  Users,
  Zap,
  TrendingUp,
  CheckCircle2,
  Phone,
  Sparkles,
  Shield,
  Clock,
  Target,
  Layers,
  BarChart3,
  Brain,
  Award,
  GitBranch,
  RefreshCw
} from 'lucide-react';

// =====================================================
// ANIMATION COMPONENTS
// =====================================================

const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerContainer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// =====================================================
// FAQ COMPONENT
// =====================================================

const FAQItem = ({ 
  question, 
  answer, 
  isOpen, 
  onClick 
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void 
}) => (
  <motion.div 
    className="border-b border-gris-arena/20 last:border-0"
    initial={false}
  >
    <button
      onClick={onClick}
      className="w-full py-6 flex items-center justify-between text-left group"
    >
      <span className="text-lg font-semibold text-azul-marino dark:text-white group-hover:text-turquesa transition-colors pr-8">
        {question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0"
      >
        <ChevronDown className="w-5 h-5 text-turquesa" />
      </motion.div>
    </button>
    <motion.div
      initial={false}
      animate={{ 
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <p className="pb-6 text-foreground/70 leading-relaxed">
        {answer}
      </p>
    </motion.div>
  </motion.div>
);

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function DiagnosticoOrganizacionalPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Consultoría Estratégica' : 'Strategic Consulting', href: `/${locale}/servicios/consultoria-estrategica` },
    { label: isEs ? 'Diagnóstico Organizacional' : 'Organizational Diagnosis', href: null }
  ];

  const forWho = [
    {
      icon: AlertTriangle,
      title: isEs ? 'Sientes que "algo no funciona" sin claridad' : 'You feel "something doesn\'t work" without clarity',
      description: isEs
        ? 'Empresa tiene síntomas de problemas (baja productividad, alta rotación, conflictos) pero no está claro cuál es causa raíz. Necesitas diagnóstico objetivo.'
        : 'Company has problem symptoms (low productivity, high turnover, conflicts) but it\'s not clear what root cause is. You need objective diagnosis.',
      color: 'turquesa'
    },
    {
      icon: Building2,
      title: isEs ? 'Antes de transformación mayor' : 'Before major transformation',
      description: isEs
        ? 'Planeando transformación digital, reestructuración o cambio estratégico. Necesitas entender estado actual para diseñar transformación efectiva.'
        : 'Planning digital transformation, restructuring or strategic change. You need to understand current state to design effective transformation.',
      color: 'menta'
    },
    {
      icon: Users,
      title: isEs ? 'Nuevo líder necesita entender situación real' : 'New leader needs to understand real situation',
      description: isEs
        ? 'Nuevo CEO, gerente general o líder asumiendo. Necesita diagnóstico rápido y objetivo de salud organizacional antes de tomar decisiones.'
        : 'New CEO, general manager or leader assuming. Needs quick and objective diagnosis of organizational health before making decisions.',
      color: 'violeta'
    },
    {
      icon: TrendingDown,
      title: isEs ? 'Rendimiento organizacional en declive' : 'Organizational performance declining',
      description: isEs
        ? 'Métricas clave empeorando (productividad, satisfacción empleados, calidad, rentabilidad). Necesitas identificar qué está fallando.'
        : 'Key metrics worsening (productivity, employee satisfaction, quality, profitability). You need to identify what\'s failing.',
      color: 'turquesa'
    },
    {
      icon: Zap,
      title: isEs ? 'Fricción o conflictos organizacionales' : 'Organizational friction or conflicts',
      description: isEs
        ? 'Silos departamentales, falta de colaboración, conflictos entre áreas, comunicación disfuncional. Necesitas entender causas.'
        : 'Departmental silos, lack of collaboration, conflicts between areas, dysfunctional communication. You need to understand causes.',
      color: 'menta'
    },
    {
      icon: FileText,
      title: isEs ? 'Preparación para auditoría o certificación' : 'Preparation for audit or certification',
      description: isEs
        ? 'Antes de certificación ISO, auditoría externa o evaluación de compliance. Necesitas identificar gaps y preparar remediación.'
        : 'Before ISO certification, external audit or compliance evaluation. You need to identify gaps and prepare remediation.',
      color: 'violeta'
    }
  ];

  const diagnosisAreas = [
    {
      title: isEs ? 'CULTURA ORGANIZACIONAL' : 'ORGANIZATIONAL CULTURE',
      description: isEs
        ? 'Valores, creencias, comportamientos, normas no escritas que definen cómo se trabaja. Identifica si cultura soporta o frena estrategia.'
        : 'Values, beliefs, behaviors, unwritten norms that define how work is done. Identifies if culture supports or hinders strategy.',
      whatWeEvaluate: isEs
        ? ['Valores declarados vs valores reales', 'Nivel de engagement y compromiso', 'Cultura de innovación vs conservadora', 'Transparencia y comunicación', 'Tolerancia al riesgo']
        : ['Declared vs real values', 'Engagement and commitment level', 'Innovation vs conservative culture', 'Transparency and communication', 'Risk tolerance'],
      icon: Users,
      color: 'turquesa'
    },
    {
      title: isEs ? 'PROCESOS Y OPERACIONES' : 'PROCESSES AND OPERATIONS',
      description: isEs
        ? 'Eficiencia, calidad y efectividad de procesos core del negocio. Identifica cuellos de botella, ineficiencias y oportunidades de mejora.'
        : 'Efficiency, quality and effectiveness of core business processes. Identifies bottlenecks, inefficiencies and improvement opportunities.',
      whatWeEvaluate: isEs
        ? ['Mapeo de procesos críticos', 'Tiempos de ciclo y eficiencia', 'Calidad y errores', 'Documentación de procesos', 'Automatización vs manual']
        : ['Critical process mapping', 'Cycle times and efficiency', 'Quality and errors', 'Process documentation', 'Automation vs manual'],
      icon: Zap,
      color: 'menta'
    },
    {
      title: isEs ? 'ESTRUCTURA Y GOVERNANCE' : 'STRUCTURE AND GOVERNANCE',
      description: isEs
        ? 'Organigrama, roles, responsabilidades, procesos de decisión. Evalúa si estructura habilita o frena ejecución estratégica.'
        : 'Organizational chart, roles, responsibilities, decision processes. Evaluates if structure enables or hinders strategic execution.',
      whatWeEvaluate: isEs
        ? ['Claridad de roles y responsabilidades', 'Niveles jerárquicos y spans', 'Procesos de toma de decisiones', 'Silos vs colaboración', 'Accountability']
        : ['Role and responsibility clarity', 'Hierarchical levels and spans', 'Decision-making processes', 'Silos vs collaboration', 'Accountability'],
      icon: Building2,
      color: 'violeta'
    },
    {
      title: isEs ? 'CAPACIDADES Y TALENTO' : 'CAPABILITIES AND TALENT',
      description: isEs
        ? 'Habilidades, conocimientos y competencias del equipo. Identifica gaps de capacidades críticas para ejecutar estrategia.'
        : 'Skills, knowledge and team competencies. Identifies gaps in critical capabilities to execute strategy.',
      whatWeEvaluate: isEs
        ? ['Competencias técnicas y gerenciales', 'Gaps de talento críticos', 'Desarrollo y capacitación', 'Retención y rotación', 'Sucesión y pipeline']
        : ['Technical and management competencies', 'Critical talent gaps', 'Development and training', 'Retention and turnover', 'Succession and pipeline'],
      icon: Brain,
      color: 'turquesa'
    },
    {
      title: isEs ? 'LIDERAZGO Y GESTIÓN' : 'LEADERSHIP AND MANAGEMENT',
      description: isEs
        ? 'Efectividad del liderazgo, estilos de gestión, capacidad de ejecución. Evalúa si liderazgo tiene capacidades para ejecutar estrategia.'
        : 'Leadership effectiveness, management styles, execution capacity. Evaluates if leadership has capabilities to execute strategy.',
      whatWeEvaluate: isEs
        ? ['Estilos de liderazgo', 'Capacidad de ejecución', 'Visión estratégica', 'Comunicación y alineación', 'Desarrollo de equipos']
        : ['Leadership styles', 'Execution capacity', 'Strategic vision', 'Communication and alignment', 'Team development'],
      icon: Award,
      color: 'menta'
    },
    {
      title: isEs ? 'TECNOLOGÍA Y SISTEMAS' : 'TECHNOLOGY AND SYSTEMS',
      description: isEs
        ? 'Herramientas tecnológicas, sistemas de información, infraestructura IT. Evalúa si tecnología soporta operación y estrategia.'
        : 'Technology tools, information systems, IT infrastructure. Evaluates if technology supports operation and strategy.',
      whatWeEvaluate: isEs
        ? ['Adecuación de sistemas a necesidades', 'Integración entre sistemas', 'Capacidades tecnológicas', 'Infraestructura y seguridad', 'Digitalización']
        : ['System adequacy to needs', 'Integration between systems', 'Technological capabilities', 'Infrastructure and security', 'Digitization'],
      icon: BarChart3,
      color: 'violeta'
    }
  ];

  const processPhases = [
    {
      phase: isEs ? 'PLANIFICACIÓN Y PREPARACIÓN' : 'PLANNING AND PREPARATION',
      duration: isEs ? '1 semana' : '1 week',
      description: isEs
        ? 'Definición de alcance y objetivos del diagnóstico. Identificación de stakeholders clave. Diseño de metodología y herramientas. Preparación de entrevistas y encuestas.'
        : 'Definition of diagnosis scope and objectives. Key stakeholder identification. Methodology and tools design. Interview and survey preparation.',
      icon: Target,
      deliverable: isEs ? 'Plan de diagnóstico y cronograma' : 'Diagnosis plan and schedule',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'RECOLECCIÓN DE DATOS' : 'DATA COLLECTION',
      duration: isEs ? '2-3 semanas' : '2-3 weeks',
      description: isEs
        ? 'Entrevistas profundas con C-level y líderes (15-25 personas). Encuestas a empleados (si aplica). Revisión de documentos (estados financieros, reportes, procesos). Observación de operaciones. Análisis de datos cuantitativos.'
        : 'Deep interviews with C-level and leaders (15-25 people). Employee surveys (if applicable). Document review (financial statements, reports, processes). Operations observation. Quantitative data analysis.',
      icon: Search,
      deliverable: isEs ? 'Datos completos recopilados' : 'Complete data collected',
      color: 'menta'
    },
    {
      phase: isEs ? 'ANÁLISIS Y DIAGNÓSTICO' : 'ANALYSIS AND DIAGNOSIS',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Síntesis de hallazgos. Análisis de causas raíz (por qué ocurren problemas). Identificación de brechas críticas. Priorización de temas (impacto vs urgencia). Desarrollo de conclusiones y recomendaciones.'
        : 'Findings synthesis. Root cause analysis (why problems occur). Critical gap identification. Theme prioritization (impact vs urgency). Conclusions and recommendations development.',
      icon: Brain,
      deliverable: isEs ? 'Diagnóstico completo con hallazgos' : 'Complete diagnosis with findings',
      color: 'violeta'
    },
    {
      phase: isEs ? 'PRESENTACIÓN Y PLAN DE ACCIÓN' : 'PRESENTATION AND ACTION PLAN',
      duration: isEs ? '1 semana' : '1 week',
      description: isEs
        ? 'Presentación ejecutiva de hallazgos. Socialización con liderazgo. Desarrollo de plan de acción priorizado. Definición de quick wins y proyectos de mejora. Roadmap de implementación.'
        : 'Executive presentation of findings. Socialization with leadership. Prioritized action plan development. Quick wins and improvement projects definition. Implementation roadmap.',
      icon: FileText,
      deliverable: isEs ? 'Documento de diagnóstico + plan de acción' : 'Diagnosis document + action plan',
      color: 'turquesa'
    }
  ];

  const includes = [
    {
      title: isEs ? 'Análisis y Evaluación' : 'Analysis and Evaluation',
      icon: Search,
      items: isEs
        ? ['Entrevistas con 15-25 stakeholders clave', 'Encuestas a empleados (si aplica)', 'Revisión de documentos y datos', 'Análisis de procesos críticos', 'Benchmarking vs mejores prácticas']
        : ['Interviews with 15-25 key stakeholders', 'Employee surveys (if applicable)', 'Document and data review', 'Critical process analysis', 'Best practices benchmarking'],
      color: 'turquesa'
    },
    {
      title: isEs ? 'Diagnóstico Completo' : 'Complete Diagnosis',
      icon: FileText,
      items: isEs
        ? ['Documento de diagnóstico (40-60 páginas)', 'Hallazgos por área evaluada', 'Análisis de causas raíz', 'Identificación de brechas críticas', 'Priorización de temas']
        : ['Diagnosis document (40-60 pages)', 'Findings per evaluated area', 'Root cause analysis', 'Critical gap identification', 'Theme prioritization'],
      color: 'menta'
    },
    {
      title: isEs ? 'Plan de Acción' : 'Action Plan',
      icon: Target,
      items: isEs
        ? ['Plan de acción priorizado', 'Quick wins identificados', 'Proyectos de mejora', 'Roadmap de implementación', 'Estimación de recursos requeridos']
        : ['Prioritized action plan', 'Identified quick wins', 'Improvement projects', 'Implementation roadmap', 'Required resources estimation'],
      color: 'violeta'
    },
    {
      title: isEs ? 'Presentación y Soporte' : 'Presentation and Support',
      icon: Users,
      items: isEs
        ? ['Presentación ejecutiva', 'Socialización con liderazgo', 'Sesión de Q&A', 'Acompañamiento en primeros pasos (opcional)', 'Seguimiento de implementación']
        : ['Executive presentation', 'Socialization with leadership', 'Q&A session', 'Support in first steps (optional)', 'Implementation monitoring'],
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '100%', label: isEs ? 'Claridad de situación actual' : 'Clarity of current situation', icon: Search },
    { value: 'Objetivo', label: isEs ? 'Evaluación imparcial y rigurosa' : 'Impartial and rigorous evaluation', icon: Target },
    { value: 'Priorizado', label: isEs ? 'Plan de acción con quick wins' : 'Action plan with quick wins', icon: TrendingUp },
    { value: '3-6', label: isEs ? 'semanas Diagnóstico completo' : 'weeks Complete diagnosis', icon: Clock },
    { value: '360°', label: isEs ? 'Evaluación de todas las áreas' : 'Evaluation of all areas', icon: Layers },
    { value: 'Ejecutable', label: isEs ? 'Recomendaciones accionables' : 'Actionable recommendations', icon: CheckCircle2 }
  ];

  const faqs = [
    {
      question: isEs ? '¿Cuánto tiempo toma diagnóstico organizacional completo?' : 'How long does complete organizational diagnosis take?',
      answer: isEs
        ? 'Duración típica: 3-6 semanas desde kick-off hasta presentación final. Desglose: Planificación (1 semana), Recolección de datos (2-3 semanas), Análisis (1-2 semanas), Presentación (1 semana). Factores que influyen: tamaño de organización (más personas = más entrevistas), complejidad (múltiples ubicaciones, múltiples líneas de negocio), profundidad requerida (diagnóstico superficial vs profundo). Diagnóstico rápido (2 semanas): Para empresas pequeñas (<50 empleados) con alcance limitado. Diagnóstico completo (4-6 semanas): Para empresas medianas-grandes con evaluación exhaustiva.'
        : 'Typical duration: 3-6 weeks from kick-off until final presentation. Breakdown: Planning (1 week), Data collection (2-3 weeks), Analysis (1-2 weeks), Presentation (1 week). Factors that influence: organization size (more people = more interviews), complexity (multiple locations, multiple business lines), required depth (superficial vs deep diagnosis). Quick diagnosis (2 weeks): For small companies (<50 employees) with limited scope. Complete diagnosis (4-6 weeks): For medium-large companies with exhaustive evaluation.'
    },
    {
      question: isEs ? '¿Qué metodologías y herramientas usan en diagnóstico?' : 'What methodologies and tools do you use in diagnosis?',
      answer: isEs
        ? 'Metodología combinada: (1) Entrevistas estructuradas: Con C-level, líderes funcionales, gerencia media, empleados clave. Guía de entrevista diseñada según área evaluada. (2) Encuestas cuantitativas: Engagement, satisfacción, cultura (si aplica). (3) Análisis documental: Estados financieros, reportes operacionales, procesos documentados, políticas. (4) Observación: Sesiones de trabajo, reuniones, operaciones en campo. (5) Análisis de datos: Métricas de productividad, calidad, rotación, etc. Frameworks: Modelo de 7-S de McKinsey, Balanced Scorecard, análisis FODA organizacional, evaluación de madurez por dimensión.'
        : 'Combined methodology: (1) Structured interviews: With C-level, functional leaders, middle management, key employees. Interview guide designed according to evaluated area. (2) Quantitative surveys: Engagement, satisfaction, culture (if applicable). (3) Document analysis: Financial statements, operational reports, documented processes, policies. (4) Observation: Work sessions, meetings, field operations. (5) Data analysis: Productivity, quality, turnover metrics, etc. Frameworks: McKinsey 7-S Model, Balanced Scorecard, organizational SWOT analysis, maturity evaluation by dimension.'
    },
    {
      question: isEs ? '¿Diagnóstico es confidencial? ¿Quién ve los resultados?' : 'Is diagnosis confidential? Who sees results?',
      answer: isEs
        ? 'Confidencialidad total. Resultados se presentan primero a CEO/liderazgo ejecutivo. Cliente decide: (1) Qué compartir con organización (resumen vs completo), (2) Si socializar hallazgos con empleados, (3) Si usar diagnóstico para comunicación externa. Alternative mantiene confidencialidad estricta. No compartimos hallazgos con terceros sin autorización explícita. Algunos clientes prefieren diagnóstico "privado" (solo C-level), otros "transparente" (comparten con organización para generar ownership de mejoras). Recomendamos transparencia selectiva: compartir temas generales, mantener confidenciales feedbacks individuales específicos.'
        : 'Total confidentiality. Results are first presented to CEO/executive leadership. Client decides: (1) What to share with organization (summary vs complete), (2) Whether to socialize findings with employees, (3) Whether to use diagnosis for external communication. Alternative maintains strict confidentiality. We don\'t share findings with third parties without explicit authorization. Some clients prefer "private" diagnosis (C-level only), others "transparent" (share with organization to generate improvement ownership). We recommend selective transparency: share general themes, keep specific individual feedbacks confidential.'
    },
    {
      question: isEs ? '¿Diagnóstico identifica problemas o también propone soluciones?' : 'Does diagnosis identify problems or also propose solutions?',
      answer: isEs
        ? 'Ambos. Diagnóstico incluye: (1) Hallazgos: Qué está funcionando bien, qué no funciona, brechas identificadas. (2) Análisis de causas raíz: Por qué ocurren problemas (no solo síntomas). (3) Recomendaciones: Qué hacer para mejorar, priorizado por impacto y urgencia. (4) Plan de acción: Quick wins (mejoras rápidas), proyectos de mejora (mediano plazo), iniciativas estratégicas (largo plazo). Diferencia: Diagnóstico profundo incluye recomendaciones detalladas. Diagnóstico superficial solo identifica problemas. Alternative siempre incluye recomendaciones y plan de acción porque diagnóstico sin acción no genera valor.'
        : 'Both. Diagnosis includes: (1) Findings: What\'s working well, what doesn\'t work, identified gaps. (2) Root cause analysis: Why problems occur (not just symptoms). (3) Recommendations: What to do to improve, prioritized by impact and urgency. (4) Action plan: Quick wins (quick improvements), improvement projects (medium term), strategic initiatives (long term). Difference: Deep diagnosis includes detailed recommendations. Superficial diagnosis only identifies problems. Alternative always includes recommendations and action plan because diagnosis without action doesn\'t generate value.'
    },
    {
      question: isEs ? '¿Qué pasa si diagnóstico revela problemas graves o conflictos internos?' : 'What happens if diagnosis reveals serious problems or internal conflicts?',
      answer: isEs
        ? 'Diagnóstico objetivo puede revelar problemas sensibles: conflictos entre ejecutivos, cultura tóxica, liderazgo inefectivo, fraude potencial. Alternative maneja con: (1) Confidencialidad estricta: Hallazgos sensibles se presentan solo a CEO/junta en sesión privada. (2) Discreción profesional: No exponemos problemas públicamente sin autorización. (3) Recomendaciones constructivas: Enfocadas en soluciones, no en culpar personas. (4) Apoyo en gestión: Si problemas son graves, acompañamos en comunicación y remediación. Experiencia: 90% de diagnósticos revelan problemas manejables. 10% revelan problemas graves que requieren intervención inmediata. En estos casos, diagnóstico es crítico para tomar acción antes de que situación empeore.'
        : 'Objective diagnosis can reveal sensitive problems: conflicts between executives, toxic culture, ineffective leadership, potential fraud. Alternative handles with: (1) Strict confidentiality: Sensitive findings presented only to CEO/board in private session. (2) Professional discretion: We don\'t expose problems publicly without authorization. (3) Constructive recommendations: Focused on solutions, not blaming people. (4) Management support: If problems are serious, we support in communication and remediation. Experience: 90% of diagnoses reveal manageable problems. 10% reveal serious problems requiring immediate intervention. In these cases, diagnosis is critical to take action before situation worsens.'
    },
    {
      question: isEs ? '¿Diagnóstico organizacional es paso previo a planificación estratégica?' : 'Is organizational diagnosis a step before strategic planning?',
      answer: isEs
        ? 'Frecuentemente sí, pero no siempre. Dos modelos: (1) Diagnóstico primero, luego planificación: Cuando situación actual es incierta o hay problemas significativos. Diagnóstico clarifica punto de partida antes de definir destino. Secuencia: Diagnóstico (3-6 semanas) → Planificación Estratégica (2-3 meses). (2) Planificación sin diagnóstico previo: Cuando situación es relativamente clara y equipo tiene buen entendimiento. Diagnóstico se hace como parte de fase de análisis de planificación estratégica. Recomendación: Si empresa tiene síntomas de problemas o nueva liderazgo, diagnóstico previo es valioso. Si empresa está funcionando bien y solo necesita clarificar rumbo, puede ir directo a planificación.'
        : 'Frequently yes, but not always. Two models: (1) Diagnosis first, then planning: When current situation is uncertain or there are significant problems. Diagnosis clarifies starting point before defining destination. Sequence: Diagnosis (3-6 weeks) → Strategic Planning (2-3 months). (2) Planning without prior diagnosis: When situation is relatively clear and team has good understanding. Diagnosis is done as part of strategic planning analysis phase. Recommendation: If company has problem symptoms or new leadership, prior diagnosis is valuable. If company is functioning well and only needs to clarify direction, can go directly to planning.'
    }
  ];

  const colorClasses = {
    turquesa: { bg: 'bg-turquesa/10', text: 'text-turquesa', border: 'border-turquesa/20', badge: 'bg-turquesa/10 text-turquesa' },
    menta: { bg: 'bg-menta/10', text: 'text-menta', border: 'border-menta/20', badge: 'bg-menta/10 text-menta' },
    violeta: { bg: 'bg-violeta/10', text: 'text-violeta', border: 'border-violeta/20', badge: 'bg-violeta/10 text-violeta' }
  };

  return (
    <>
      {/* Reading Progress Indicator */}
      <ReadingProgress />

      {/* Service Sidebar */}
      <ServiceSidebar 
        locale={locale} 
        currentService="consultoria-estrategica"
      />

      {/* =====================================================
          HERO SECTION - Unique Design with Diagnosis Diagram
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        {/* Background Pattern - Analysis Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(108, 196, 212, 0.1) 20px, rgba(108, 196, 212, 0.1) 22px),
              repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(108, 196, 212, 0.1) 20px, rgba(108, 196, 212, 0.1) 22px)
            `
          }} />
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[10%] w-40 h-40 bg-turquesa/10 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[8%] w-32 h-32 bg-menta/10 rounded-full blur-2xl"
          />
        </div>

        <div className="container-custom relative z-10 pt-8 pb-16 lg:pb-20">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
            aria-label="Breadcrumb"
          >
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {idx > 0 && (
                    <ChevronDown className="w-4 h-4 text-white/40 -rotate-90" />
                  )}
                  {crumb.href ? (
                    <Link 
                      href={crumb.href}
                      className="text-white/60 hover:text-turquesa transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-turquesa font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Icon + Category */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-turquesa/20 rounded-2xl flex items-center justify-center
                                border border-turquesa/30">
                  <Search className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Diagnóstico Organizacional' : 'Organizational Diagnosis'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Consultoría Estratégica' : 'Strategic Consulting'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Evaluación profunda de salud organizacional'
                  : 'Deep evaluation of organizational health'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Evaluación profunda de salud organizacional: cultura, procesos, estructura, capacidades, liderazgo. Identifica brechas críticas y oportunidades de mejora. Diagnóstico objetivo que revela qué funciona, qué no, y por qué.'
                  : 'Deep evaluation of organizational health: culture, processes, structure, capabilities, leadership. Identifies critical gaps and improvement opportunities. Objective diagnosis that reveals what works, what doesn\'t, and why.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Solicita Diagnóstico' : 'Request Diagnosis'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/recursos`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Descarga guía de diagnóstico' : 'Download diagnosis guide'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '20+', label: isEs ? 'diagnósticos organizacionales' : 'organizational diagnoses' },
                  { value: '360°', label: isEs ? 'Evaluación completa' : 'Complete evaluation' },
                  { icon: true, label: isEs ? 'Análisis de causas raíz' : 'Root cause analysis' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    {stat.icon ? (
                      <Sparkles className="w-4 h-4 text-turquesa" />
                    ) : (
                      <span className="text-turquesa font-bold">{stat.value}</span>
                    )}
                    <span className="text-white/60 text-sm">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual - Diagnosis Diagram Floating */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative"
                >
                  {/* Diagnosis Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-turquesa" />
                    <div className="w-3 h-3 rounded-full bg-menta" />
                    <div className="w-3 h-3 rounded-full bg-violeta" />
                    <span className="ml-auto text-white/40 text-sm">
                      {isEs ? 'Áreas Evaluadas' : 'Evaluated Areas'}
                    </span>
                  </div>

                  {/* Diagnosis Areas Visualization */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { icon: Users, label: isEs ? 'Cultura' : 'Culture', color: 'turquesa', status: 75 },
                      { icon: Zap, label: isEs ? 'Procesos' : 'Processes', color: 'menta', status: 70 },
                      { icon: Building2, label: isEs ? 'Estructura' : 'Structure', color: 'violeta', status: 65 },
                      { icon: Brain, label: isEs ? 'Capacidades' : 'Capabilities', color: 'turquesa', status: 80 },
                      { icon: Award, label: isEs ? 'Liderazgo' : 'Leadership', color: 'menta', status: 85 },
                      { icon: BarChart3, label: isEs ? 'Tecnología' : 'Technology', color: 'violeta', status: 60 }
                    ].map((area, idx) => {
                      const Icon = area.icon;
                      const colors = colorClasses[area.color as keyof typeof colorClasses];
                      return (
                        <motion.div
                          key={idx}
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: idx * 0.15 }}
                          className={`${colors.bg} rounded-xl p-3 text-center`}
                        >
                          <Icon className={`w-5 h-5 ${colors.text} mx-auto mb-1`} />
                          <span className="text-white/70 text-xs block mb-1">{area.label}</span>
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${area.status}%` }}
                              transition={{ duration: 1.5, delay: 0.5 + idx * 0.1 }}
                              className={`h-full ${colors.text.replace('text-', 'bg-')} rounded-full`}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Overall Health Score */}
                  <div className="bg-turquesa/20 rounded-xl p-4 text-center">
                    <div className="text-white/60 text-xs mb-1">{isEs ? 'Salud Organizacional' : 'Organizational Health'}</div>
                    <div className="text-3xl font-bold text-turquesa">72%</div>
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-turquesa rounded-2xl p-4 shadow-xl"
                >
                  <Search className="w-8 h-8 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUÉ ES DIAGNÓSTICO ORGANIZACIONAL SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs ? 'Diagnóstico organizacional: radiografía completa de tu empresa' : 'Organizational diagnosis: complete X-ray of your company'}
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs 
                    ? 'Diagnóstico organizacional es evaluación sistemática y profunda de salud organizacional de tu empresa. Analiza múltiples dimensiones: cultura organizacional (valores, comportamientos, engagement), procesos y operaciones (eficiencia, calidad, cuellos de botella), estructura y governance (roles, responsabilidades, toma de decisiones), capacidades y talento (competencias, gaps, desarrollo), liderazgo y gestión (efectividad, estilos, ejecución), tecnología y sistemas (adecuación, integración, digitalización).'
                    : 'Organizational diagnosis is systematic and deep evaluation of your company\'s organizational health. Analyzes multiple dimensions: organizational culture (values, behaviors, engagement), processes and operations (efficiency, quality, bottlenecks), structure and governance (roles, responsibilities, decision-making), capabilities and talent (competencies, gaps, development), leadership and management (effectiveness, styles, execution), technology and systems (adequacy, integration, digitization).'}
                </p>
                <p>
                  {isEs 
                    ? 'El propósito: Entender QUÉ está funcionando bien y QUÉ no, POR QUÉ ocurren problemas (causas raíz, no solo síntomas), y QUÉ hacer para mejorar (recomendaciones priorizadas). Es como un "chequeo médico completo" de la organización: identifica problemas antes de que se vuelvan críticos, valida intuiciones con datos objetivos, y proporciona base sólida para tomar decisiones estratégicas.'
                    : 'The purpose: Understand WHAT is working well and WHAT isn\'t, WHY problems occur (root causes, not just symptoms), and WHAT to do to improve (prioritized recommendations). It\'s like a "complete medical checkup" of the organization: identifies problems before they become critical, validates intuitions with objective data, and provides solid foundation for making strategic decisions.'}
                </p>
                <p>
                  {isEs 
                    ? 'Diferencia con auditoría: Auditoría evalúa cumplimiento (¿seguimos procesos? ¿cumplimos regulaciones?). Diagnóstico organizacional evalúa efectividad (¿procesos funcionan bien? ¿estructura habilita estrategia?). Diagnóstico es más amplio y estratégico; auditoría es más específica y operacional.'
                    : 'Difference with audit: Audit evaluates compliance (do we follow processes? do we comply with regulations?). Organizational diagnosis evaluates effectiveness (do processes work well? does structure enable strategy?). Diagnosis is broader and strategic; audit is more specific and operational.'}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          PARA QUIÉN ES SECTION - Grid 2x3
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Cuándo necesitas diagnóstico organizacional?' : 'When do you need organizational diagnosis?'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forWho.map((item, idx) => {
              const colors = colorClasses[item.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-background p-8 rounded-2xl shadow-brand 
                               hover:shadow-brand-lg transition-all duration-300 border border-gris-arena/20"
                  >
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <item.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          ÁREAS DE DIAGNÓSTICO SECTION - 6 Cards
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '6 áreas que evaluamos en diagnóstico organizacional' : '6 areas we evaluate in organizational diagnosis'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diagnosisAreas.map((area, idx) => {
              const colors = colorClasses[area.color as keyof typeof colorClasses];
              const Icon = area.icon;
              return (
                <StaggerItem key={idx}>
                  <div className="bg-blanco-hueso dark:bg-card p-8 rounded-2xl shadow-brand border border-gris-arena/20">
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-bold text-azul-marino dark:text-white mb-3">
                      {area.title}
                    </h3>
                    <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                      {area.description}
                    </p>
                    <div>
                      <div className={`${colors.text} font-semibold text-xs mb-2`}>
                        {isEs ? 'Qué evaluamos:' : 'What we evaluate:'}
                      </div>
                      <ul className="space-y-1">
                        {area.whatWeEvaluate.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-foreground/60 text-sm flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 ${colors.bg.replace('/10', '')} rounded-full mt-1.5 flex-shrink-0`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          PROCESO DE DIAGNÓSTICO - Timeline 4 Fases
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Cómo realizamos diagnóstico organizacional' : 'How we conduct organizational diagnosis'}
            </h2>
          </AnimatedSection>

          {/* Timeline - Desktop */}
          <div className="hidden lg:block relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-turquesa via-menta to-violeta -translate-y-1/2" />
            
            <div className="grid grid-cols-4 gap-6 relative">
              {processPhases.map((phase, idx) => {
                const colors = colorClasses[phase.color as keyof typeof colorClasses];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-turquesa rounded-full border-4 border-white dark:border-background z-10" />
                    <div className="pt-8">
                      <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <phase.icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <div className="bg-white dark:bg-background p-4 rounded-2xl shadow-brand">
                        <div className="text-turquesa text-xs font-medium mb-1">{phase.duration}</div>
                        <h3 className="text-sm font-bold text-azul-marino dark:text-white mb-2">
                          {phase.phase}
                        </h3>
                        <p className="text-foreground/70 text-xs mb-2 leading-relaxed line-clamp-4">
                          {phase.description}
                        </p>
                        <div className="text-xs text-turquesa font-medium">
                          {phase.deliverable}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet - Vertical Stack */}
          <div className="lg:hidden space-y-6">
            {processPhases.map((phase, idx) => {
              const colors = colorClasses[phase.color as keyof typeof colorClasses];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-background p-6 rounded-2xl shadow-brand border-l-4 border-turquesa"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <phase.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-turquesa text-sm font-medium mb-1">{phase.duration}</div>
                      <h3 className="text-lg font-bold text-azul-marino dark:text-white mb-2">
                        {phase.phase}
                      </h3>
                      <p className="text-foreground/70 text-sm mb-3 leading-relaxed">
                        {phase.description}
                      </p>
                      <div className="text-xs text-turquesa font-medium">
                        {phase.deliverable}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <AnimatedSection className="text-center mt-12">
            <p className="text-lg text-turquesa font-semibold">
              {isEs ? 'DURACIÓN TOTAL: 3-6 semanas típicamente' : 'TOTAL DURATION: 3-6 weeks typically'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          QUÉ INCLUYE SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Qué incluye' : 'What\'s included'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {includes.map((item, idx) => {
              const colors = colorClasses[item.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <div className="bg-blanco-hueso dark:bg-card p-8 rounded-2xl shadow-brand border border-gris-arena/20">
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <item.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-4">
                      {item.title}
                    </h3>
                    <ul className="space-y-2">
                      {item.items.map((listItem, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                          <span className="text-foreground/70 text-sm">{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          BENEFICIOS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-azul-marino">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              {isEs ? 'Beneficios' : 'Benefits'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 
                             text-center hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-turquesa" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-turquesa mb-2">
                    {benefit.value}
                  </div>
                  <p className="text-white/70 text-sm">{benefit.label}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          CASO DE ÉXITO SECTION - HIDDEN FOR VALIDATION
          ===================================================== */}
      {false && (
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-blanco-hueso dark:bg-card rounded-3xl p-8 lg:p-12 overflow-hidden relative">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-turquesa" />
                  </div>
                  <div>
                    <span className="text-turquesa font-medium text-sm uppercase tracking-wider">
                      {isEs ? 'Caso de Éxito' : 'Success Story'}
                    </span>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                      {isEs ? 'Diagnóstico revela causas raíz y empresa mejora productividad 35%' : 'Diagnosis reveals root causes and company improves productivity 35%'}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Cliente' : 'Client'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Empresa de servicios profesionales (80 empleados, $12M revenue)'
                          : 'Professional services company (80 employees, $12M revenue)'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Situación' : 'Situation'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'CEO sentía que "algo no funcionaba" pero sin claridad. Síntomas: productividad baja, alta rotación (25% anual), conflictos entre áreas, proyectos retrasados frecuentemente. Sin diagnóstico objetivo, solo intuiciones.'
                          : 'CEO felt "something doesn\'t work" but without clarity. Symptoms: low productivity, high turnover (25% annually), conflicts between areas, frequently delayed projects. No objective diagnosis, only intuitions.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-foreground/70 mb-3 text-sm">
                        {isEs 
                          ? 'Diagnóstico organizacional completo en 4 semanas:'
                          : 'Complete organizational diagnosis in 4 weeks:'}
                      </p>
                      <div className="space-y-3 text-foreground/70 text-sm">
                        <div>
                          <strong className="text-azul-marino dark:text-white">{isEs ? 'Semana 1-2: Recolección' : 'Week 1-2: Collection'}</strong>
                          <p className="mt-1">{isEs ? '20 entrevistas (CEO, 5 ejecutivos, 8 gerentes, 6 empleados clave). Encuesta a 60 empleados. Revisión de documentos (reportes, procesos, estados financieros).' : '20 interviews (CEO, 5 executives, 8 managers, 6 key employees). Survey to 60 employees. Document review (reports, processes, financial statements).'}</p>
                        </div>
                        <div>
                          <strong className="text-azul-marino dark:text-white">{isEs ? 'Semana 3: Análisis' : 'Week 3: Analysis'}</strong>
                          <p className="mt-1">{isEs ? 'Síntesis de hallazgos. Análisis de causas raíz. Identificación de 8 temas críticos priorizados.' : 'Findings synthesis. Root cause analysis. Identification of 8 prioritized critical themes.'}</p>
                        </div>
                        <div>
                          <strong className="text-azul-marino dark:text-white">{isEs ? 'Semana 4: Presentación' : 'Week 4: Presentation'}</strong>
                          <p className="mt-1">{isEs ? 'Presentación ejecutiva. Plan de acción con 12 recomendaciones priorizadas.' : 'Executive presentation. Action plan with 12 prioritized recommendations.'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Hallazgos Críticos' : 'Critical Findings'}
                      </h4>
                      <ul className="space-y-2 text-foreground/70 text-sm">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span><strong>{isEs ? 'Causa raíz #1:' : 'Root cause #1:'}</strong> {isEs ? 'Roles y responsabilidades confusos (3 áreas haciendo mismo trabajo, otros cayendo en grietas)' : 'Confusing roles and responsibilities (3 areas doing same work, others falling in gaps)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span><strong>{isEs ? 'Causa raíz #2:' : 'Root cause #2:'}</strong> {isEs ? 'Falta de procesos documentados (dependencia de personas clave, conocimiento no transferible)' : 'Lack of documented processes (dependency on key people, non-transferable knowledge)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span><strong>{isEs ? 'Causa raíz #3:' : 'Root cause #3:'}</strong> {isEs ? 'Silos departamentales (falta colaboración, comunicación disfuncional)' : 'Departmental silos (lack of collaboration, dysfunctional communication)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span><strong>{isEs ? 'Causa raíz #4:' : 'Root cause #4:'}</strong> {isEs ? 'Falta de desarrollo de talento (empleados sienten estancamiento, buscan oportunidades externas)' : 'Lack of talent development (employees feel stagnation, seek external opportunities)'}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Plan de Acción Priorizado' : 'Prioritized Action Plan'}
                      </h4>
                      <ul className="space-y-2 text-foreground/70 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span><strong>{isEs ? 'Quick Win 1:' : 'Quick Win 1:'}</strong> {isEs ? 'Clarificar roles críticos (matriz RACI) - 2 semanas' : 'Clarify critical roles (RACI matrix) - 2 weeks'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span><strong>{isEs ? 'Quick Win 2:' : 'Quick Win 2:'}</strong> {isEs ? 'Documentar 5 procesos core - 4 semanas' : 'Document 5 core processes - 4 weeks'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span><strong>{isEs ? 'Proyecto 1:' : 'Project 1:'}</strong> {isEs ? 'Rediseñar estructura organizacional - 8 semanas' : 'Redesign organizational structure - 8 weeks'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span><strong>{isEs ? 'Proyecto 2:' : 'Project 2:'}</strong> {isEs ? 'Programa de desarrollo de talento - 12 semanas' : 'Talent development program - 12 weeks'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-azul-marino dark:text-white mb-4">
                      {isEs ? 'Resultados (18 meses post-diagnóstico)' : 'Results (18 months post-diagnosis)'}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { value: '+35%', label: isEs ? 'Productividad' : 'Productivity', sub: isEs ? 'Proyectos/día' : 'Projects/day' },
                        { value: '12%', label: isEs ? 'Rotación' : 'Turnover', sub: isEs ? '25% → 12%' : '25% → 12%' },
                        { value: '100%', label: isEs ? 'Roles clarificados' : 'Roles clarified', sub: isEs ? 'Matriz RACI' : 'RACI matrix' },
                        { value: '15', label: isEs ? 'Procesos documentados' : 'Documented processes', sub: isEs ? 'Procesos core' : 'Core processes' },
                        { value: '-60%', label: isEs ? 'Conflictos entre áreas' : 'Conflicts between areas', sub: isEs ? 'Comités integración' : 'Integration committees' },
                        { value: '+45%', label: isEs ? 'Satisfacción empleados' : 'Employee satisfaction', sub: isEs ? 'Encuesta anual' : 'Annual survey' },
                        { value: '18', label: isEs ? 'Empleados desarrollados' : 'Employees developed', sub: isEs ? 'Programa talento' : 'Talent program' },
                        { value: '280%', label: isEs ? 'ROI diagnóstico' : 'Diagnosis ROI', sub: isEs ? '18 meses' : '18 months' }
                      ].map((stat, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          className="bg-white dark:bg-background p-4 rounded-2xl shadow-brand text-center"
                        >
                          <div className="text-2xl font-bold text-turquesa mb-1">
                            {stat.value}
                          </div>
                          <div className="text-xs font-medium text-azul-marino dark:text-white">
                            {stat.label}
                          </div>
                          <div className="text-xs text-foreground/50">{stat.sub}</div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-turquesa/10 p-4 rounded-xl border border-turquesa/20 mb-6">
                      <p className="text-sm text-foreground/70">
                        <strong className="text-azul-marino dark:text-white">{isEs ? 'Factor Crítico:' : 'Critical Factor:'}</strong>{' '}
                        {isEs 
                          ? 'Diagnóstico reveló causas raíz que CEO no había identificado. Sin diagnóstico, habrían tratado síntomas (rotación) sin resolver problema real (falta desarrollo, roles confusos).'
                          : 'Diagnosis revealed root causes that CEO hadn\'t identified. Without diagnosis, they would have treated symptoms (turnover) without solving real problem (lack of development, confusing roles).'}
                      </p>
                    </div>
                  </div>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                  {isEs 
                    ? '"Diagnóstico nos dio claridad que no teníamos. Pensábamos que problema era rotación; realidad era falta de desarrollo y roles confusos. Resolvimos causas raíz y todo mejoró."'
                    : '"Diagnosis gave us clarity we didn\'t have. We thought problem was turnover; reality was lack of development and confusing roles. We solved root causes and everything improved."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— {isEs ? 'CEO' : 'CEO'}</span>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* =====================================================
          FAQ SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Preguntas frecuentes' : 'Frequently Asked Questions'}
            </h2>
          </AnimatedSection>

          <AnimatedSection className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-background rounded-2xl p-8">
              {faqs.map((faq, idx) => (
                <FAQItem
                  key={idx}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === idx}
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          CTA FINAL SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-violeta relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-turquesa/10 rounded-full blur-2xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs ? '¿Tu empresa necesita diagnóstico organizacional?' : 'Does your company need organizational diagnosis?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Sesión de evaluación gratuita de 30 minutos. Evaluamos situación y determinamos si diagnóstico organizacional es apropiado.'
                  : 'Free 30-minute evaluation session. We evaluate situation and determine if organizational diagnosis is appropriate.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Evaluación preliminar de síntomas organizacionales' : 'Preliminary evaluation of organizational symptoms',
                  isEs ? 'Identificación de áreas que requieren diagnóstico' : 'Identification of areas requiring diagnosis',
                  isEs ? 'Alcance y metodología de diagnóstico' : 'Diagnosis scope and methodology',
                  isEs ? 'Timeline y recursos requeridos' : 'Timeline and required resources',
                  isEs ? 'Propuesta de diagnóstico organizacional' : 'Organizational diagnosis proposal'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/${locale}/contacto`}
                    className="inline-flex items-center gap-3 bg-turquesa text-azul-marino 
                               font-semibold px-8 py-4 rounded-lg hover:bg-menta 
                               transition-all duration-300 shadow-lg group"
                  >
                    {isEs ? 'Solicitar Diagnóstico Organizacional' : 'Request Organizational Diagnosis'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href="https://wa.me/50769908906"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm 
                               text-white font-medium px-8 py-4 rounded-lg 
                               hover:bg-white/20 transition-all duration-300 border border-white/20"
                  >
                    <Phone className="w-5 h-5" />
                    WhatsApp
                  </a>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

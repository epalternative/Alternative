'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import {
  Target,
  ArrowRight,
  ChevronDown,
  TrendingUp,
  Building2,
  AlertTriangle,
  FileText,
  TrendingDown,
  CheckCircle2,
  Phone,
  Sparkles,
  Shield,
  Clock,
  Users,
  Search,
  Layers,
  BarChart3,
  GitBranch,
  Award,
  DollarSign,
  Zap,
  BookOpen,
  Calendar,
  Monitor
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

export default function PlanificacionEstrategicaPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [openComponent, setOpenComponent] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Consultoría Estratégica' : 'Strategic Consulting', href: `/${locale}/servicios/consultoria-estrategica` },
    { label: isEs ? 'Planificación Estratégica' : 'Strategic Planning', href: null }
  ];

  const forWho = [
    {
      icon: FileText,
      title: isEs ? 'Sin plan estratégico o desactualizado' : 'No strategic plan or outdated',
      description: isEs
        ? 'Empresa opera sin rumbo claro o plan estratégico tiene 5+ años sin actualizarse. Contexto cambió significativamente desde último plan.'
        : 'Company operates without clear direction or strategic plan is 5+ years without updating. Context changed significantly since last plan.',
      color: 'turquesa'
    },
    {
      icon: Users,
      title: isEs ? 'Nuevo liderazgo asumiendo' : 'New leadership assuming',
      description: isEs
        ? 'Nuevo CEO, transición generacional o equipo ejecutivo renovado. Necesitan definir visión y alinear organización bajo nuevo liderazgo.'
        : 'New CEO, generational transition or renewed executive team. They need to define vision and align organization under new leadership.',
      color: 'menta'
    },
    {
      icon: TrendingDown,
      title: isEs ? 'Crecimiento estancado o en declive' : 'Stagnant or declining growth',
      description: isEs
        ? 'Empresa dejó de crecer, perdiendo market share o en declive. Necesita estrategia clara para revertir situación y recuperar crecimiento.'
        : 'Company stopped growing, losing market share or in decline. Needs clear strategy to reverse situation and recover growth.',
      color: 'violeta'
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'Cambios significativos de mercado' : 'Significant market changes',
      description: isEs
        ? 'Nueva competencia, disrupción tecnológica, cambios regulatorios o crisis que obligan a replantear estrategia.'
        : 'New competition, technological disruption, regulatory changes or crisis that force strategy rethink.',
      color: 'turquesa'
    },
    {
      icon: TrendingUp,
      title: isEs ? 'Antes de expansión mayor' : 'Before major expansion',
      description: isEs
        ? 'Expansión geográfica, nuevas líneas de negocio, fundraising o inversión significativa. Inversionistas/junta requieren plan claro.'
        : 'Geographic expansion, new business lines, fundraising or significant investment. Investors/board require clear plan.',
      color: 'menta'
    },
    {
      icon: Building2,
      title: isEs ? 'Desalineación del equipo ejecutivo' : 'Executive team misalignment',
      description: isEs
        ? 'Cada ejecutivo empujando su agenda. Falta de consenso sobre prioridades. Recursos dispersos sin foco claro.'
        : 'Each executive pushing their agenda. Lack of consensus on priorities. Resources scattered without clear focus.',
      color: 'violeta'
    }
  ];

  const planComponents = [
    {
      title: isEs ? 'ANÁLISIS ESTRATÉGICO (DIAGNÓSTICO)' : 'STRATEGIC ANALYSIS (DIAGNOSIS)',
      content: isEs
        ? 'Análisis externo (PESTEL, 5 Fuerzas de Porter, competencia). Análisis interno (capacidades, recursos, cultura, procesos). FODA completo (Fortalezas, Oportunidades, Debilidades, Amenazas). Análisis de brechas (dónde estamos vs dónde necesitamos estar). Propósito: Entender punto de partida antes de definir destino.'
        : 'External analysis (PESTEL, Porter\'s 5 Forces, competition). Internal analysis (capabilities, resources, culture, processes). Complete SWOT (Strengths, Opportunities, Weaknesses, Threats). Gap analysis (where we are vs where we need to be). Purpose: Understand starting point before defining destination.',
      icon: Search,
      color: 'turquesa'
    },
    {
      title: isEs ? 'VISIÓN Y PROPÓSITO' : 'VISION AND PURPOSE',
      content: isEs
        ? 'Propósito organizacional (por qué existimos). Visión 2030 o 2035 (dónde queremos estar en 5-10 años). Valores corporativos (cómo operamos). Aspiración estratégica clara y motivadora. Propósito: Definir destino inspirador que alinea a organización.'
        : 'Organizational purpose (why we exist). Vision 2030 or 2035 (where we want to be in 5-10 years). Corporate values (how we operate). Clear and motivating strategic aspiration. Purpose: Define inspiring destination that aligns organization.',
      icon: Target,
      color: 'menta'
    },
    {
      title: isEs ? 'OBJETIVOS ESTRATÉGICOS' : 'STRATEGIC OBJECTIVES',
      content: isEs
        ? '4-6 objetivos estratégicos (no más de 7). Organizados en perspectivas del Balanced Scorecard: Financiera (rentabilidad, crecimiento), Cliente (satisfacción, lealtad, market share), Procesos Internos (eficiencia, calidad, innovación), Aprendizaje y Crecimiento (talento, cultura, tecnología). Propósito: Traducir visión a objetivos medibles.'
        : '4-6 strategic objectives (no more than 7). Organized in Balanced Scorecard perspectives: Financial (profitability, growth), Customer (satisfaction, loyalty, market share), Internal Processes (efficiency, quality, innovation), Learning and Growth (talent, culture, technology). Purpose: Translate vision to measurable objectives.',
      icon: TrendingUp,
      color: 'violeta'
    },
    {
      title: isEs ? '牛APA ESTRATÉGICO' : 'STRATEGIC MAP',
      content: isEs
        ? 'Representación visual de objetivos estratégicos. Relaciones causa-efecto entre objetivos. Lógica estratégica: cómo un objetivo habilita otro. Una página que comunica toda la estrategia. Propósito: Comunicar estrategia visual y comprensiblemente.'
        : 'Visual representation of strategic objectives. Cause-effect relationships between objectives. Strategic logic: how one objective enables another. One page that communicates entire strategy. Purpose: Communicate strategy visually and understandably.',
      icon: Layers,
      color: 'turquesa'
    },
    {
      title: isEs ? 'INDICADORES (KPIs)' : 'INDICATORS (KPIs)',
      content: isEs
        ? '2-3 KPIs por objetivo estratégico (10-15 KPIs totales). Definición de cada KPI (fórmula, fuente, frecuencia). Baseline actual y metas 1 año, 3 años, 5 años. Semáforo (verde/amarillo/rojo) para seguimiento. Propósito: Medir progreso objetivamente.'
        : '2-3 KPIs per strategic objective (10-15 total KPIs). Definition of each KPI (formula, source, frequency). Current baseline and goals 1 year, 3 years, 5 years. Traffic light (green/yellow/red) for monitoring. Purpose: Measure progress objectively.',
      icon: BarChart3,
      color: 'menta'
    },
    {
      title: isEs ? 'INICIATIVAS ESTRATÉGICAS' : 'STRATEGIC INITIATIVES',
      content: isEs
        ? '8-15 iniciativas/proyectos estratégicos priorizados. Para cada iniciativa: objetivo que impacta, descripción, sponsor, timeline, recursos requeridos, ROI preliminar. Roadmap de iniciativas (qué ejecutar cuándo). Propósito: Traducir estrategia a acciones concretas.'
        : '8-15 prioritized strategic initiatives/projects. For each initiative: objective it impacts, description, sponsor, timeline, required resources, preliminary ROI. Initiative roadmap (what to execute when). Purpose: Translate strategy to concrete actions.',
      icon: Zap,
      color: 'violeta'
    },
    {
      title: isEs ? 'CASCADA ORGANIZACIONAL' : 'ORGANIZATIONAL CASCADE',
      content: isEs
        ? 'Objetivos corporativos → objetivos departamentales → objetivos individuales. Cada departamento tiene 3-5 objetivos alineados a estrategia. Cada persona clave tiene objetivos individuales conectados. Propósito: Cada persona sabe cómo contribuye a estrategia.'
        : 'Corporate objectives → departmental objectives → individual objectives. Each department has 3-5 objectives aligned to strategy. Each key person has connected individual objectives. Purpose: Each person knows how they contribute to strategy.',
      icon: GitBranch,
      color: 'turquesa'
    },
    {
      title: isEs ? 'SISTEMA DE GESTIÓN ESTRATÉGICA' : 'STRATEGIC MANAGEMENT SYSTEM',
      content: isEs
        ? 'Reuniones de estrategia (mensuales ejecutivas, trimestrales ampliadas). Dashboard de KPIs corporativos. Proceso de revisión y ajuste de estrategia. Governance (quién decide qué, cuándo). Propósito: Asegurar ejecución disciplinada y ajustes basados en realidad.'
        : 'Strategy meetings (monthly executive, quarterly expanded). Corporate KPI dashboard. Strategy review and adjustment process. Governance (who decides what, when). Purpose: Ensure disciplined execution and adjustments based on reality.',
      icon: Monitor,
      color: 'menta'
    }
  ];

  const processPhases = [
    {
      phase: isEs ? 'DIAGNÓSTICO ESTRATÉGICO' : 'STRATEGIC DIAGNOSIS',
      duration: isEs ? '3-4 semanas' : '3-4 weeks',
      description: isEs
        ? 'Entrevistas profundas con C-level y líderes clave (10-15 personas). Análisis de documentos (estados financieros, planes previos, reportes). Análisis de competencia y mercado. FODA completo. Identificación de temas estratégicos críticos.'
        : 'Deep interviews with C-level and key leaders (10-15 people). Document analysis (financial statements, previous plans, reports). Competition and market analysis. Complete SWOT. Identification of critical strategic themes.',
      icon: Search,
      deliverable: isEs ? 'Documento de diagnóstico con hallazgos' : 'Diagnosis document with findings',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'DESARROLLO DE ESTRATEGIA' : 'STRATEGY DEVELOPMENT',
      duration: isEs ? '4-6 semanas' : '4-6 weeks',
      description: isEs
        ? 'Workshop 1 (día completo): Análisis de diagnóstico, definición de visión y propósito. Workshop 2 (día completo): Definición de objetivos estratégicos, construcción de mapa estratégico. Workshop 3 (día completo): Priorización de iniciativas estratégicas, definición de KPIs. Trabajo entre workshops: Alternative desarrolla borradores para validación. Socialización con stakeholders clave.'
        : 'Workshop 1 (full day): Diagnosis analysis, vision and purpose definition. Workshop 2 (full day): Strategic objectives definition, strategic map construction. Workshop 3 (full day): Strategic initiatives prioritization, KPI definition. Work between workshops: Alternative develops drafts for validation. Socialization with key stakeholders.',
      icon: Target,
      deliverable: isEs ? 'Plan estratégico completo (documento + presentación)' : 'Complete strategic plan (document + presentation)',
      color: 'menta'
    },
    {
      phase: isEs ? 'CASCADA Y OPERACIONALIZACIÓN' : 'CASCADE AND OPERATIONALIZATION',
      duration: isEs ? '2-3 semanas' : '2-3 weeks',
      description: isEs
        ? 'Cascada de objetivos estratégicos a departamentos. Definición de proyectos estratégicos con PMs asignados. Desarrollo de dashboard de KPIs. Diseño de sistema de seguimiento (reuniones, reportes). Plan de comunicación de estrategia a toda la organización.'
        : 'Cascade of strategic objectives to departments. Definition of strategic projects with assigned PMs. KPI dashboard development. Monitoring system design (meetings, reports). Strategy communication plan to entire organization.',
      icon: Layers,
      deliverable: isEs ? 'Objetivos departamentales + dashboard + sistema de seguimiento' : 'Departmental objectives + dashboard + monitoring system',
      color: 'violeta'
    },
    {
      phase: isEs ? 'ACOMPAÑAMIENTO EN EJECUCIÓN' : 'EXECUTION SUPPORT',
      duration: isEs ? '6-12 meses' : '6-12 months',
      description: isEs
        ? 'Reunión mensual de seguimiento de estrategia (Alternative facilita). Revisión de KPIs y avance de iniciativas. Identificación de desviaciones y acciones correctivas. Coaching a liderazgo en ejecución estratégica. Ajustes de estrategia según aprendizajes.'
        : 'Monthly strategy monitoring meeting (Alternative facilitates). KPI and initiative progress review. Deviation identification and corrective actions. Leadership coaching in strategic execution. Strategy adjustments according to learnings.',
      icon: GitBranch,
      deliverable: isEs ? 'Estrategia ejecutándose con monitoreo disciplinado' : 'Strategy executing with disciplined monitoring',
      color: 'turquesa'
    }
  ];

  const includes = [
    {
      title: isEs ? 'Documentos Estratégicos' : 'Strategic Documents',
      icon: FileText,
      items: isEs
        ? ['Plan estratégico completo (60-80 páginas)', 'Resumen ejecutivo (5 páginas)', 'Mapa estratégico (1 página visual)', 'Presentación ejecutiva (PowerPoint 30-40 slides)']
        : ['Complete strategic plan (60-80 pages)', 'Executive summary (5 pages)', 'Strategic map (1 visual page)', 'Executive presentation (PowerPoint 30-40 slides)'],
      color: 'turquesa'
    },
    {
      title: isEs ? 'Análisis y Herramientas' : 'Analysis and Tools',
      icon: BarChart3,
      items: isEs
        ? ['Diagnóstico estratégico completo', 'Balanced Scorecard con KPIs', 'Roadmap de iniciativas estratégicas', 'Business cases preliminares de iniciativas top']
        : ['Complete strategic diagnosis', 'Balanced Scorecard with KPIs', 'Strategic initiatives roadmap', 'Preliminary business cases of top initiatives'],
      color: 'menta'
    },
    {
      title: isEs ? 'Cascada Organizacional' : 'Organizational Cascade',
      icon: GitBranch,
      items: isEs
        ? ['Objetivos por departamento', 'Dashboard de KPIs corporativos', 'Templates de cascada a objetivos individuales', 'Sistema de seguimiento diseñado']
        : ['Objectives by department', 'Corporate KPI dashboard', 'Templates for cascade to individual objectives', 'Designed monitoring system'],
      color: 'violeta'
    },
    {
      title: isEs ? 'Acompañamiento' : 'Support',
      icon: Users,
      items: isEs
        ? ['6-12 reuniones mensuales de seguimiento', 'Facilitación de reuniones estratégicas', 'Coaching a liderazgo', 'Ajustes de estrategia según evolución']
        : ['6-12 monthly monitoring meetings', 'Strategic meetings facilitation', 'Leadership coaching', 'Strategy adjustments according to evolution'],
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '100%', label: isEs ? 'Alineación de equipo ejecutivo en prioridades' : 'Executive team alignment on priorities', icon: Users },
    { value: '3-5', label: isEs ? 'años Horizonte de planeación claro' : 'years Clear planning horizon', icon: Calendar },
    { value: '10-15', label: isEs ? 'KPIs medibles de progreso' : 'Measurable progress KPIs', icon: BarChart3 },
    { value: '3X', label: isEs ? 'Mayor probabilidad de ejecutar vs plan sin acompañamiento' : 'Higher probability of executing vs plan without support', icon: TrendingUp },
    { value: '2-3', label: isEs ? 'meses Desarrollo completo de plan' : 'months Complete plan development', icon: Clock },
    { value: 'Ejecutable', label: isEs ? 'Traducido a acciones concretas' : 'Translated to concrete actions', icon: CheckCircle2 }
  ];

  const bscPerspectives = [
    {
      perspective: isEs ? 'FINANCIERA' : 'FINANCIAL',
      question: isEs ? '¿Cómo debemos aparecer ante accionistas/dueños para ser financieramente exitosos?' : 'How should we appear to shareholders/owners to be financially successful?',
      objectives: isEs
        ? ['Crecimiento de revenue', 'Rentabilidad (EBITDA, ROE)', 'Flujo de caja', 'Valoración de empresa']
        : ['Revenue growth', 'Profitability (EBITDA, ROE)', 'Cash flow', 'Company valuation'],
      icon: DollarSign,
      color: 'turquesa'
    },
    {
      perspective: isEs ? 'CLIENTE' : 'CUSTOMER',
      question: isEs ? '¿Cómo debemos aparecer ante clientes para lograr visión?' : 'How should we appear to customers to achieve vision?',
      objectives: isEs
        ? ['Satisfacción de clientes', 'Lealtad/retención', 'Market share', 'Nuevos clientes', 'NPS']
        : ['Customer satisfaction', 'Loyalty/retention', 'Market share', 'New customers', 'NPS'],
      icon: Users,
      color: 'menta'
    },
    {
      perspective: isEs ? 'PROCESOS INTERNOS' : 'INTERNAL PROCESSES',
      question: isEs ? '¿En qué procesos debemos ser excelentes para satisfacer clientes y accionistas?' : 'In what processes must we excel to satisfy customers and shareholders?',
      objectives: isEs
        ? ['Excelencia operacional', 'Innovación', 'Calidad', 'Eficiencia', 'Gestión de riesgos']
        : ['Operational excellence', 'Innovation', 'Quality', 'Efficiency', 'Risk management'],
      icon: Zap,
      color: 'violeta'
    },
    {
      perspective: isEs ? 'APRENDIZAJE Y CRECIMIENTO' : 'LEARNING AND GROWTH',
      question: isEs ? '¿Cómo mantener capacidad de cambiar y mejorar para lograr visión?' : 'How to maintain capacity to change and improve to achieve vision?',
      objectives: isEs
        ? ['Talento (atracción, desarrollo, retención)', 'Cultura organizacional', 'Tecnología', 'Capacidades']
        : ['Talent (attraction, development, retention)', 'Organizational culture', 'Technology', 'Capabilities'],
      icon: TrendingUp,
      color: 'turquesa'
    }
  ];

  const faqs = [
    {
      question: isEs ? '¿Cuánto tiempo real toma desarrollar plan estratégico?' : 'How long does it really take to develop strategic plan?',
      answer: isEs
        ? 'Desarrollo: 2-3 meses desde kick-off hasta plan completo. Incluye: diagnóstico (3-4 semanas), desarrollo de estrategia con workshops (4-6 semanas), cascada y operacionalización (2-3 semanas). Acompañamiento: 6-12 meses adicionales para asegurar ejecución. Tiempo del equipo del cliente: 3-4 días completos en workshops + entrevistas + revisiones entre workshops. Es inversión significativa pero estrategia que define próximos 3-5 años justifica dedicación.'
        : 'Development: 2-3 months from kick-off until complete plan. Includes: diagnosis (3-4 weeks), strategy development with workshops (4-6 weeks), cascade and operationalization (2-3 weeks). Support: 6-12 additional months to ensure execution. Client team time: 3-4 full days in workshops + interviews + reviews between workshops. It\'s significant investment but strategy that defines next 3-5 years justifies dedication.'
    },
    {
      question: isEs ? '¿Quién debe participar en desarrollo de plan estratégico?' : 'Who should participate in strategic plan development?',
      answer: isEs
        ? 'Core team (participación completa): CEO, CFO, COO, líderes funcionales clave (comercial, operaciones, finanzas). Típicamente 5-8 personas. Participación parcial: Gerencia media (entrevistas, validación de cascada), consejo/junta directiva (validación de visión y estrategia), clientes clave (entrevistas sobre necesidades futuras). Facilitación: Alternative facilita proceso pero estrategia es CO-CREADA con liderazgo, no impuesta externamente. Ownership del equipo es crítico para ejecución.'
        : 'Core team (full participation): CEO, CFO, COO, key functional leaders (commercial, operations, finance). Typically 5-8 people. Partial participation: Middle management (interviews, cascade validation), board/directors (vision and strategy validation), key clients (interviews on future needs). Facilitation: Alternative facilitates process but strategy is CO-CREATED with leadership, not externally imposed. Team ownership is critical for execution.'
    },
    {
      question: isEs ? '¿Plan estratégico se actualiza anualmente o dura 3-5 años?' : 'Is strategic plan updated annually or lasts 3-5 years?',
      answer: isEs
        ? 'Horizonte de visión: 3-5 años (dónde queremos estar no cambia año a año). Revisión anual: Objetivos estratégicos se revisan anualmente pero usualmente no cambian dramáticamente (ajustes menores). Actualización continua: Iniciativas y KPIs se ajustan trimestralmente según progreso y contexto. Revisión mayor: Cada 2-3 años o cuando cambio significativo externo lo amerita (nueva competencia, regulación, crisis). Plan estratégico es "documento vivo" no documento estático.'
        : 'Vision horizon: 3-5 years (where we want to be doesn\'t change year to year). Annual review: Strategic objectives are reviewed annually but usually don\'t change dramatically (minor adjustments). Continuous update: Initiatives and KPIs adjust quarterly according to progress and context. Major review: Every 2-3 years or when significant external change warrants it (new competition, regulation, crisis). Strategic plan is "living document" not static document.'
    },
    {
      question: isEs ? '¿Cómo se relaciona plan estratégico con presupuesto anual?' : 'How does strategic plan relate to annual budget?',
      answer: isEs
        ? 'Relación crítica pero frecuentemente desconectada en empresas. Secuencia correcta: Plan estratégico define QUÉ hacer → Presupuesto anual asigna RECURSOS para hacerlo. Problema común: Empresas hacen presupuesto basado en año anterior +X%, sin conexión a estrategia. Enfoque Alternative: Presupuesto debe financiar iniciativas estratégicas. Si iniciativa es prioritaria pero sin presupuesto, no se ejecuta. Facilitamos alineación estrategia-presupuesto durante cascada.'
        : 'Critical relationship but frequently disconnected in companies. Correct sequence: Strategic plan defines WHAT to do → Annual budget assigns RESOURCES to do it. Common problem: Companies make budget based on previous year +X%, without connection to strategy. Alternative approach: Budget must finance strategic initiatives. If initiative is priority but without budget, it doesn\'t execute. We facilitate strategy-budget alignment during cascade.'
    },
    {
      question: isEs ? '¿Qué pasa si contexto cambia drásticamente durante ejecución del plan?' : 'What happens if context changes drastically during plan execution?',
      answer: isEs
        ? 'Plan estratégico debe ser flexible ante cambios contextuales. Cambios menores: Se gestionan en reuniones mensuales de estrategia (ajustar tácticas, no objetivos). Cambios significativos: Pueden requerir revisión de iniciativas o KPIs (ej: pandemia COVID, nueva regulación). Cambios dramáticos: Pueden requerir revisión de objetivos estratégicos completos (ej: disrupción tecnológica, cambio de modelo de negocio). Metodología incluye proceso de "revisión estratégica extraordinaria" cuando contexto cambia drásticamente.'
        : 'Strategic plan must be flexible to contextual changes. Minor changes: Managed in monthly strategy meetings (adjust tactics, not objectives). Significant changes: May require review of initiatives or KPIs (e.g.: COVID pandemic, new regulation). Dramatic changes: May require review of complete strategic objectives (e.g.: technological disruption, business model change). Methodology includes "extraordinary strategic review" process when context changes drastically.'
    },
    {
      question: isEs ? '¿Alternative garantiza resultados del plan estratégico?' : 'Does Alternative guarantee strategic plan results?',
      answer: isEs
        ? 'Alternative garantiza: (1) Proceso riguroso de planificación con mejores prácticas probadas, (2) Plan estratégico ejecutable con objetivos, KPIs, iniciativas claras, (3) Acompañamiento disciplinado en ejecución si contratado. NO garantizamos resultados financieros específicos porque ejecución depende de: equipo del cliente, contexto de mercado (fuera de control), disciplina en seguimiento, recursos asignados. Sin embargo, empresas que siguen metodología disciplinadamente tienen 3X mayor probabilidad de lograr objetivos vs empresas sin plan o sin seguimiento.'
        : 'Alternative guarantees: (1) Rigorous planning process with proven best practices, (2) Executable strategic plan with clear objectives, KPIs, initiatives, (3) Disciplined execution support if contracted. We DON\'T guarantee specific financial results because execution depends on: client team, market context (out of control), monitoring discipline, assigned resources. However, companies that follow methodology disciplinarily have 3X higher probability of achieving objectives vs companies without plan or without monitoring.'
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
          HERO SECTION - Unique Design with Strategic Map/BSC
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        {/* Background Pattern - Strategic Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(108, 196, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(108, 196, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
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
                  <Target className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Planificación Estratégica' : 'Strategic Planning'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Consultoría Estratégica' : 'Strategic Consulting'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Plan estratégico ejecutable que impulsa crecimiento'
                  : 'Executable strategic plan that drives growth'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Desarrollo de plan estratégico 3-5 años con visión clara, objetivos medibles, iniciativas priorizadas y roadmap de ejecución. Estrategia que se traduce a acciones concretas y genera resultados, no PowerPoint que queda en gaveta.'
                  : 'Development of 3-5 year strategic plan with clear vision, measurable objectives, prioritized initiatives and execution roadmap. Strategy that translates to concrete actions and generates results, not PowerPoint that stays in drawer.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Desarrolla tu Plan Estratégico' : 'Develop Your Strategic Plan'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/recursos`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Descarga template de planificación' : 'Download planning template'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '25+', label: isEs ? 'planes estratégicos desarrollados' : 'strategic plans developed' },
                  { value: 'BSC', label: isEs ? 'Metodología Balanced Scorecard' : 'Balanced Scorecard methodology' },
                  { icon: true, label: isEs ? 'Acompañamiento en ejecución' : 'Execution support' }
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

            {/* Right Visual - Strategic Map/BSC Floating */}
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
                  {/* BSC Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-turquesa" />
                    <div className="w-3 h-3 rounded-full bg-menta" />
                    <div className="w-3 h-3 rounded-full bg-violeta" />
                    <span className="ml-auto text-white/40 text-sm">
                      {isEs ? 'Balanced Scorecard' : 'Balanced Scorecard'}
                    </span>
                  </div>

                  {/* BSC Perspectives Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: isEs ? 'Financiera' : 'Financial', icon: DollarSign, color: 'turquesa', progress: 85 },
                      { label: isEs ? 'Cliente' : 'Customer', icon: Users, color: 'menta', progress: 75 },
                      { label: isEs ? 'Procesos' : 'Processes', icon: Zap, color: 'violeta', progress: 70 },
                      { label: isEs ? 'Aprendizaje' : 'Learning', icon: TrendingUp, color: 'turquesa', progress: 65 }
                    ].map((perspective, idx) => {
                      const Icon = perspective.icon;
                      const colors = colorClasses[perspective.color as keyof typeof colorClasses];
                      return (
                        <motion.div
                          key={idx}
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                          className={`${colors.bg} rounded-xl p-4`}
                        >
                          <Icon className={`w-6 h-6 ${colors.text} mx-auto mb-2`} />
                          <span className="text-white/70 text-xs block text-center mb-2">{perspective.label}</span>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${perspective.progress}%` }}
                              transition={{ duration: 1.5, delay: 0.5 + idx * 0.3 }}
                              className={`h-full ${colors.text.replace('text-', 'bg-')} rounded-full`}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Strategic Objectives */}
                  <div className="mt-6 space-y-2">
                    {[
                      { label: isEs ? 'Objetivo 1' : 'Objective 1', progress: 90 },
                      { label: isEs ? 'Objetivo 2' : 'Objective 2', progress: 75 },
                      { label: isEs ? 'Objetivo 3' : 'Objective 3', progress: 60 }
                    ].map((obj, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white/60 text-xs">{obj.label}</span>
                          <span className="text-turquesa font-bold text-xs">{obj.progress}%</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${obj.progress}%` }}
                            transition={{ duration: 1.5, delay: 0.7 + idx * 0.2 }}
                            className="h-full bg-turquesa rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-turquesa rounded-2xl p-4 shadow-xl"
                >
                  <Target className="w-8 h-8 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUÉ ES PLANIFICACIÓN ESTRATÉGICA SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs ? 'Planificación estratégica: el mapa de ruta de tu empresa' : 'Strategic planning: your company\'s roadmap'}
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs 
                    ? 'Planificación estratégica es el proceso estructurado de definir DÓNDE quiere estar tu empresa en 3-5 años (visión), QUÉ objetivos estratégicos debe lograr, y CÓMO va a lograrlos (iniciativas, recursos, responsables). Es el mapa de ruta que alinea a toda la organización hacia un destino común.'
                    : 'Strategic planning is the structured process of defining WHERE your company wants to be in 3-5 years (vision), WHAT strategic objectives it must achieve, and HOW it will achieve them (initiatives, resources, responsible parties). It\'s the roadmap that aligns entire organization toward a common destination.'}
                </p>
                <p>
                  {isEs 
                    ? 'Un plan estratégico robusto incluye: análisis de situación actual (interno y externo), definición de visión y objetivos estratégicos, identificación de iniciativas estratégicas priorizadas, asignación de recursos y responsables, sistema de medición (KPIs), plan de comunicación y cascada a organización, sistema de seguimiento y ajuste.'
                    : 'A robust strategic plan includes: current situation analysis (internal and external), vision and strategic objectives definition, prioritized strategic initiatives identification, resource and responsible party allocation, measurement system (KPIs), communication and organizational cascade plan, monitoring and adjustment system.'}
                </p>
                <p>
                  {isEs 
                    ? 'Diferencia con plan de negocio: Plan de negocio es documento para inversionistas/bancos (proyecciones financieras detalladas). Plan estratégico es herramienta interna de gestión (qué hacer, cómo, con quién). Se complementan pero tienen propósitos diferentes.'
                    : 'Difference with business plan: Business plan is document for investors/banks (detailed financial projections). Strategic plan is internal management tool (what to do, how, with whom). They complement each other but have different purposes.'}
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
              {isEs ? '¿Cuándo necesitas plan estratégico formal?' : 'When do you need formal strategic plan?'}
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
          COMPONENTES DEL PLAN SECTION - Accordion 8 componentes
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '8 componentes de plan estratégico Alternative' : '8 components of Alternative strategic plan'}
            </h2>
          </AnimatedSection>

          <AnimatedSection className="max-w-4xl mx-auto">
            <div className="bg-blanco-hueso dark:bg-card rounded-2xl p-8">
              {planComponents.map((component, idx) => {
                const colors = colorClasses[component.color as keyof typeof colorClasses];
                return (
                  <motion.div 
                    key={idx}
                    className="border-b border-gris-arena/20 last:border-0"
                    initial={false}
                  >
                    <button
                      onClick={() => setOpenComponent(openComponent === idx ? null : idx)}
                      className="w-full py-6 flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <component.icon className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        <span className="text-lg font-semibold text-azul-marino dark:text-white group-hover:text-turquesa transition-colors">
                          {component.title}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: openComponent === idx ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 ml-4"
                      >
                        <ChevronDown className="w-5 h-5 text-turquesa" />
                      </motion.div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: openComponent === idx ? 'auto' : 0,
                        opacity: openComponent === idx ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-16 text-foreground/70 leading-relaxed">
                        {component.content}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          PROCESO DE PLANIFICACIÓN - Timeline 4 Fases
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Cómo desarrollamos tu plan estratégico' : 'How we develop your strategic plan'}
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
              {isEs ? 'DURACIÓN TOTAL: 2-3 meses desarrollo + 6-12 meses acompañamiento' : 'TOTAL DURATION: 2-3 months development + 6-12 months support'}
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
          CASO DE ÉXITO SECTION
          ===================================================== */}
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
                      {isEs ? 'Manufacturera desarrolla plan estratégico y duplica EBITDA' : 'Manufacturer develops strategic plan and doubles EBITDA'}
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
                          ? 'Empresa manufacturera de componentes industriales ($18M revenue, 120 empleados, 35 años operando)'
                          : 'Industrial components manufacturing company ($18M revenue, 120 employees, 35 years operating)'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Situación' : 'Situation'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Empresa fundada por ingeniero visionario (ya fallecido). Hijo asumió como CEO hace 2 años sin experiencia gerencial previa. Sin plan estratégico formal (padre tenía todo "en la cabeza"). Crecimiento estancado últimos 5 años. Competencia asiática de bajo costo ganando mercado. Equipo ejecutivo (5 personas, promedio 20 años en empresa) escéptico de cambio.'
                          : 'Company founded by visionary engineer (already deceased). Son assumed as CEO 2 years ago without previous management experience. No formal strategic plan (father had everything "in his head"). Stagnant growth last 5 years. Low-cost Asian competition winning market. Executive team (5 people, average 20 years in company) skeptical of change.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Desafíos Críticos' : 'Critical Challenges'}
                      </h4>
                      <ul className="space-y-2 text-foreground/70 text-sm">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Margen erosionándose (precio vs costos)' : 'Eroding margin (price vs costs)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Productos commoditizados (competencia por precio)' : 'Commoditized products (price competition)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Planta operando a 60% capacidad' : 'Plant operating at 60% capacity'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Sin diferenciación clara' : 'No clear differentiation'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Cultura resistente ("siempre lo hemos hecho así")' : 'Resistant culture ("we\'ve always done it this way")'}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-foreground/70 mb-3 text-sm">
                        {isEs 
                          ? 'Plan estratégico 2024-2028 desarrollado en 3 meses:'
                          : '2024-2028 strategic plan developed in 3 months:'}
                      </p>
                      <div className="space-y-3 text-foreground/70 text-sm">
                        <div>
                          <strong className="text-azul-marino dark:text-white">{isEs ? 'Diagnóstico (Mes 1):' : 'Diagnosis (Month 1):'}</strong>
                          <p className="mt-1">{isEs ? 'Hallazgos críticos: Productos de bajo valor agregado (alta sustitución). Cliente base concentrada (60% en 3 clientes). Sin capacidad de ingeniería para productos complejos. Talento técnico envejeciendo sin sucesión. Procesos ineficientes vs competencia moderna.' : 'Critical findings: Low value-added products (high substitution). Concentrated client base (60% in 3 clients). No engineering capacity for complex products. Aging technical talent without succession. Inefficient processes vs modern competition.'}</p>
                        </div>
                        <div>
                          <strong className="text-azul-marino dark:text-white">{isEs ? 'Estrategia Co-creada (Mes 2):' : 'Co-created Strategy (Month 2):'}</strong>
                          <p className="mt-1">{isEs ? 'Visión 2028: "Ser el proveedor preferido de componentes de alta precisión para industrias especializadas en Centroamérica". 5 Objetivos Estratégicos: Financiero (Duplicar EBITDA), Cliente (Diversificar base), Procesos (Especialización alta precisión, Excelencia operacional), Aprendizaje (Desarrollar capacidades ingeniería avanzada). 8 Iniciativas Estratégicas Priorizadas.' : 'Vision 2028: "Be preferred provider of high-precision components for specialized industries in Central America". 5 Strategic Objectives: Financial (Double EBITDA), Customer (Diversify base), Processes (High-precision specialization, Operational excellence), Learning (Develop advanced engineering capabilities). 8 Prioritized Strategic Initiatives.'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? '8 Iniciativas Estratégicas' : '8 Strategic Initiatives'}
                      </h4>
                      <ul className="space-y-2 text-foreground/70 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Crear división de componentes de alta precisión' : 'Create high-precision components division'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Adquirir equipos CNC de 5 ejes ($800K inversión)' : 'Acquire 5-axis CNC equipment ($800K investment)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Reclutar 3 ingenieros mecánicos senior' : 'Recruit 3 senior mechanical engineers'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Certificar ISO 9001' : 'Certify ISO 9001'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Implementar Lean Manufacturing' : 'Implement Lean Manufacturing'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Diversificar a 3 industrias nuevas' : 'Diversify to 3 new industries'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Desarrollar pipeline de talento técnico' : 'Develop technical talent pipeline'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Digitalizar operación (ERP + MES)' : 'Digitize operation (ERP + MES)'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-azul-marino dark:text-white mb-4">
                      {isEs ? 'Resultados (30 meses post-plan, a Dic 2024)' : 'Results (30 months post-plan, Dec 2024)'}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { value: '+89%', label: isEs ? 'EBITDA' : 'EBITDA', sub: isEs ? '$1.8M → $3.4M' : '$1.8M → $3.4M' },
                        { value: '+33%', label: isEs ? 'Revenue' : 'Revenue', sub: isEs ? '$18M → $24M' : '$18M → $24M' },
                        { value: '14%', label: isEs ? 'Margen EBITDA' : 'EBITDA Margin', sub: isEs ? '10% → 14%' : '10% → 14%' },
                        { value: '42%', label: isEs ? 'Clientes top 3' : 'Top 3 clients', sub: isEs ? '60% → 42% de revenue' : '60% → 42% of revenue' },
                        { value: '35%', label: isEs ? 'Productos alta precisión' : 'High-precision products', sub: isEs ? '0% → 35% de ventas' : '0% → 35% of sales' },
                        { value: 'ISO 9001', label: isEs ? 'Certificación' : 'Certification', sub: isEs ? 'Lograda (mes 18)' : 'Achieved (month 18)' },
                        { value: '85%', label: isEs ? 'Capacidad utilizada' : 'Capacity utilized', sub: isEs ? '60% → 85%' : '60% → 85%' },
                        { value: '100%', label: isEs ? 'Compromiso ejecutivo' : 'Executive commitment', sub: isEs ? 'Escepticismo vencido' : 'Skepticism overcome' }
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
                        <strong className="text-azul-marino dark:text-white">{isEs ? 'Factores Críticos de Éxito:' : 'Critical Success Factors:'}</strong>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0 mt-0.5" />
                            <span>{isEs ? 'Quick win temprano: certificar ISO 9001 en 6 meses (credibilidad)' : 'Early quick win: certify ISO 9001 in 6 months (credibility)'}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0 mt-0.5" />
                            <span>{isEs ? 'Inversión $800K en equipos CNC aprobada por junta (Alternative desarrolló business case)' : '$800K investment in CNC equipment approved by board (Alternative developed business case)'}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0 mt-0.5" />
                            <span>{isEs ? 'Reuniones mensuales de estrategia mantenidas religiosamente 30 meses' : 'Monthly strategy meetings maintained religiously 30 months'}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0 mt-0.5" />
                            <span>{isEs ? 'CEO creció como líder estratégico (coaching de Alternative)' : 'CEO grew as strategic leader (Alternative coaching)'}</span>
                          </li>
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                  {isEs 
                    ? '"Plan estratégico nos salvó de commoditización y competencia asiática. Nos especializamos en alta precisión donde podemos competir. EBITDA casi duplicado en 2.5 años."'
                    : '"Strategic plan saved us from commoditization and Asian competition. We specialized in high precision where we can compete. EBITDA almost doubled in 2.5 years."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— {isEs ? 'CEO' : 'CEO'}</span>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          BALANCED SCORECARD SECTION - Diagrama Visual 4 Perspectivas
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Metodología Balanced Scorecard que usamos' : 'Balanced Scorecard methodology we use'}
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              {isEs 
                ? 'Utilizamos framework Balanced Scorecard (Kaplan & Norton) para estructurar plan estratégico. BSC organiza objetivos en 4 perspectivas balanceadas, no solo financiera.'
                : 'We use Balanced Scorecard framework (Kaplan & Norton) to structure strategic plan. BSC organizes objectives in 4 balanced perspectives, not just financial.'}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {bscPerspectives.map((perspective, idx) => {
              const colors = colorClasses[perspective.color as keyof typeof colorClasses];
              const Icon = perspective.icon;
              return (
                <StaggerItem key={idx}>
                  <div className="bg-white dark:bg-background p-8 rounded-2xl shadow-brand border border-gris-arena/20">
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-bold text-azul-marino dark:text-white mb-3">
                      {perspective.perspective}
                    </h3>
                    <p className="text-foreground/70 mb-4 text-sm italic">
                      {perspective.question}
                    </p>
                    <div>
                      <div className={`${colors.text} font-semibold text-xs mb-2`}>
                        {isEs ? 'Objetivos típicos:' : 'Typical objectives:'}
                      </div>
                      <ul className="space-y-1">
                        {perspective.objectives.map((obj, objIdx) => (
                          <li key={objIdx} className="text-foreground/60 text-sm flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 ${colors.bg.replace('/10', '')} rounded-full mt-1.5 flex-shrink-0`} />
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <AnimatedSection className="mt-12">
            <div className="bg-turquesa/10 p-6 rounded-2xl border border-turquesa/20">
              <p className="text-foreground/70 text-center">
                <strong className="text-azul-marino dark:text-white">{isEs ? 'Lógica Causa-Efecto:' : 'Cause-Effect Logic:'}</strong>{' '}
                {isEs 
                  ? 'Aprendizaje → habilita → Procesos → que entregan → Cliente → que genera → Financiero'
                  : 'Learning → enables → Processes → that deliver → Customer → that generates → Financial'}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          FAQ SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Preguntas frecuentes' : 'Frequently Asked Questions'}
            </h2>
          </AnimatedSection>

          <AnimatedSection className="max-w-3xl mx-auto">
            <div className="bg-blanco-hueso dark:bg-card rounded-2xl p-8">
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
                {isEs ? '¿Listo para desarrollar tu plan estratégico?' : 'Ready to develop your strategic plan?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Sesión de diagnóstico estratégico de 30 minutos. Evaluamos situación actual y desarrollamos propuesta de planificación estratégica.'
                  : '30-minute strategic diagnosis session. We evaluate current situation and develop strategic planning proposal.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Evaluación de situación estratégica actual' : 'Evaluation of current strategic situation',
                  isEs ? 'Identificación de temas estratégicos críticos' : 'Identification of critical strategic themes',
                  isEs ? 'Alcance de plan estratégico apropiado' : 'Appropriate strategic plan scope',
                  isEs ? 'Timeline y metodología de trabajo' : 'Timeline and work methodology',
                  isEs ? 'Propuesta de consultoría' : 'Consulting proposal'
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
                    {isEs ? 'Desarrollar Plan Estratégico' : 'Develop Strategic Plan'}
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

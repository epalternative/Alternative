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
  TrendingDown,
  Building2,
  FileText,
  AlertTriangle,
  TrendingUp,
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
  Award
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

export default function ConsultoriaEstrategicaPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // =====================================================
  // CONTENT DATA
  // =====================================================

  const problems = [
    {
      icon: Target,
      title: isEs ? 'Sin claridad de rumbo estratégico' : 'No strategic direction clarity',
      description: isEs 
        ? 'Equipo ejecutivo sin consenso sobre prioridades. Cada área empujando su agenda. Recursos dispersos en 20 iniciativas sin foco claro.'
        : 'Executive team without consensus on priorities. Each area pushing its agenda. Resources scattered across 20 initiatives without clear focus.'
    },
    {
      icon: TrendingDown,
      title: isEs ? 'Crecimiento estancado o en declive' : 'Stagnant or declining growth',
      description: isEs
        ? 'Negocio que no crece al ritmo esperado o está perdiendo terreno vs competencia. Sin plan claro de cómo revertir situación.'
        : 'Business that doesn\'t grow at expected rate or is losing ground vs competition. No clear plan on how to reverse situation.'
    },
    {
      icon: Building2,
      title: isEs ? 'Estructura organizacional desalineada' : 'Misaligned organizational structure',
      description: isEs
        ? 'Organigrama que no soporta la estrategia. Roles confusos, silos departamentales, falta de ownership de iniciativas estratégicas.'
        : 'Organizational chart that doesn\'t support strategy. Confusing roles, departmental silos, lack of ownership of strategic initiatives.'
    },
    {
      icon: FileText,
      title: isEs ? 'Plan estratégico en gaveta sin ejecutar' : 'Strategic plan in drawer without execution',
      description: isEs
        ? 'Tienen plan estratégico bonito en PowerPoint pero nadie lo ejecuta. Sin cascada a objetivos operacionales ni seguimiento disciplinado.'
        : 'They have a nice strategic plan in PowerPoint but no one executes it. No cascade to operational objectives or disciplined follow-up.'
    }
  ];

  const services = [
    {
      icon: Target,
      title: isEs ? 'Planificación Estratégica' : 'Strategic Planning',
      description: isEs
        ? 'Desarrollo de plan estratégico 3-5 años con visión, objetivos estratégicos, iniciativas priorizadas, cascada a objetivos operacionales y roadmap de ejecución.'
        : 'Development of 3-5 year strategic plan with vision, strategic objectives, prioritized initiatives, cascade to operational objectives and execution roadmap.',
      forWho: isEs
        ? 'Empresas sin plan estratégico formal, organizaciones con estrategia desactualizada, nuevos CEOs que necesitan redefinir rumbo'
        : 'Companies without formal strategic plan, organizations with outdated strategy, new CEOs who need to redefine direction',
      result: isEs
        ? 'Plan estratégico ejecutable + Balanced Scorecard + roadmap de iniciativas + sistema de seguimiento'
        : 'Executable strategic plan + Balanced Scorecard + initiative roadmap + monitoring system',
      href: `/${locale}/servicios/consultoria-estrategica/planificacion-estrategica`,
      color: 'turquesa'
    },
    {
      icon: Search,
      title: isEs ? 'Diagnóstico Organizacional' : 'Organizational Diagnosis',
      description: isEs
        ? 'Evaluación profunda de salud organizacional: cultura, procesos, estructura, capacidades, liderazgo. Identifica brechas críticas y oportunidades de mejora.'
        : 'Deep evaluation of organizational health: culture, processes, structure, capabilities, leadership. Identifies critical gaps and improvement opportunities.',
      forWho: isEs
        ? 'Empresas que sienten "algo no funciona" sin claridad de qué, organizaciones antes de transformación mayor, nuevos líderes que necesitan entender situación real'
        : 'Companies that feel "something doesn\'t work" without clarity on what, organizations before major transformation, new leaders who need to understand real situation',
      result: isEs
        ? 'Diagnóstico completo con hallazgos + análisis de causas raíz + plan de acción priorizado'
        : 'Complete diagnosis with findings + root cause analysis + prioritized action plan',
      href: `/${locale}/servicios/consultoria-estrategica/diagnostico-organizacional`,
      color: 'menta'
    },
    {
      icon: Building2,
      title: isEs ? 'Diseño Organizacional' : 'Organizational Design',
      description: isEs
        ? 'Diseño o rediseño de estructura organizacional alineada a estrategia: organigrama, roles, responsabilidades, procesos de governance, modelo operativo.'
        : 'Design or redesign of organizational structure aligned to strategy: organizational chart, roles, responsibilities, governance processes, operating model.',
      forWho: isEs
        ? 'Empresas escalando que necesitan nueva estructura, organizaciones con silos disfuncionales, fusiones/adquisiciones que requieren integración'
        : 'Scaling companies that need new structure, organizations with dysfunctional silos, mergers/acquisitions requiring integration',
      result: isEs
        ? 'Estructura organizacional optimizada + perfiles de puesto + modelo de governance + plan de transición'
        : 'Optimized organizational structure + job profiles + governance model + transition plan',
      href: `/${locale}/servicios/consultoria-estrategica/diseno-organizacional`,
      color: 'violeta'
    }
  ];

  const benefits = [
    { value: '100%', label: isEs ? 'Claridad de objetivos estratégicos y prioridades' : 'Clarity of strategic objectives and priorities', icon: Target },
    { value: '80%+', label: isEs ? 'Alineación de equipo ejecutivo en estrategia' : 'Executive team alignment on strategy', icon: Users },
    { value: '3X', label: isEs ? 'Mayor probabilidad de ejecutar vs plan sin acompañamiento' : 'Higher probability of executing vs plan without support', icon: TrendingUp },
    { value: 'Ejecutable', label: isEs ? 'Estrategia traducida a acciones concretas' : 'Strategy translated to concrete actions', icon: CheckCircle2 },
    { value: 'Medible', label: isEs ? 'KPIs y seguimiento disciplinado' : 'KPIs and disciplined monitoring', icon: BarChart3 },
    { value: '6-12', label: isEs ? 'meses Para ver resultados tangibles de estrategia' : 'months To see tangible strategy results', icon: Clock }
  ];

  const methodologySteps = [
    {
      step: isEs ? 'DIAGNÓSTICO' : 'DIAGNOSIS',
      description: isEs
        ? 'Entendemos situación actual: entorno competitivo, capacidades internas, cultura, desafíos, oportunidades.'
        : 'We understand current situation: competitive environment, internal capabilities, culture, challenges, opportunities.',
      icon: Search,
      color: 'turquesa'
    },
    {
      step: isEs ? 'CO-CREACIÓN' : 'CO-CREATION',
      description: isEs
        ? 'Workshops estratégicos con liderazgo. No imponemos estrategia; co-creamos con equipo para asegurar ownership.'
        : 'Strategic workshops with leadership. We don\'t impose strategy; we co-create with team to ensure ownership.',
      icon: Users,
      color: 'menta'
    },
    {
      step: isEs ? 'DISEÑO' : 'DESIGN',
      description: isEs
        ? 'Desarrollamos plan estratégico completo: visión, objetivos, iniciativas, KPIs, roadmap, business cases.'
        : 'We develop complete strategic plan: vision, objectives, initiatives, KPIs, roadmap, business cases.',
      icon: Target,
      color: 'violeta'
    },
    {
      step: isEs ? 'CASCADA' : 'CASCADE',
      description: isEs
        ? 'Traducimos estrategia a objetivos operacionales por departamento. Cada persona sabe cómo contribuye.'
        : 'We translate strategy to operational objectives by department. Each person knows how they contribute.',
      icon: Layers,
      color: 'turquesa'
    },
    {
      step: isEs ? 'ACOMPAÑAMIENTO' : 'SUPPORT',
      description: isEs
        ? 'Acompañamos ejecución primeros 6-12 meses: reuniones mensuales de seguimiento, ajustes, coaching de liderazgo.'
        : 'We support execution first 6-12 months: monthly monitoring meetings, adjustments, leadership coaching.',
      icon: GitBranch,
      color: 'menta'
    }
  ];

  const faqs = [
    {
      question: isEs ? '¿Cómo determinan alcance y duración de consultoría estratégica?' : 'How do you determine scope and duration of strategic consulting?',
      answer: isEs
        ? 'Depende del servicio: Planificación estratégica completa: 2-4 meses desarrollo + 6-12 meses acompañamiento. Diagnóstico organizacional: 3-6 semanas. Diseño organizacional: 6-10 semanas. Factores: tamaño de organización, complejidad de situación, nivel de alineación actual del equipo, urgencia. Diagnóstico inicial gratuito evalúa situación, define alcance apropiado y desarrolla propuesta personalizada.'
        : 'Depends on service: Complete strategic planning: 2-4 months development + 6-12 months support. Organizational diagnosis: 3-6 weeks. Organizational design: 6-10 weeks. Factors: organization size, situation complexity, current team alignment level, urgency. Free initial diagnosis evaluates situation, defines appropriate scope and develops personalized proposal.'
    },
    {
      question: isEs ? '¿Alternative solo desarrolla el plan o también acompaña ejecución?' : 'Does Alternative only develop the plan or also support execution?',
      answer: isEs
        ? 'Ofrecemos ambos modelos según necesidad del cliente: (1) Solo desarrollo de plan: Desarrollamos estrategia, la entregamos, equipo del cliente ejecuta internamente. (2) Desarrollo + acompañamiento: Desarrollamos estrategia Y acompañamos ejecución 6-12 meses con reuniones mensuales de seguimiento, coaching de liderazgo, ajustes según evolución. Modelo 2 tiene significativamente mayor tasa de éxito (3X probabilidad de ejecutar vs solo entregar plan).'
        : 'We offer both models according to client need: (1) Plan development only: We develop strategy, deliver it, client team executes internally. (2) Development + support: We develop strategy AND support execution 6-12 months with monthly monitoring meetings, leadership coaching, adjustments according to evolution. Model 2 has significantly higher success rate (3X probability of executing vs just delivering plan).'
    },
    {
      question: isEs ? '¿Qué diferencia a Alternative de consultoras estratégicas grandes?' : 'What differentiates Alternative from large strategic consultancies?',
      answer: isEs
        ? 'Tres diferenciadores clave: (1) Enfoque en PYMES y empresas medianas: Consultoras grandes (McKinsey, BCG, Deloitte) trabajan con Fortune 500. Alternative especializa en empresas $5M-$100M revenue donde estrategia es igualmente crítica pero presupuesto es limitado. (2) Precio accesible: Consultoría estratégica grande: $200K-$500K+. Alternative: $25K-$100K según alcance. (3) Implementación práctica: Consultoras grandes entregan PowerPoint de 200 slides. Alternative entrega plan ejecutable Y acompaña implementación. Diferencia: estrategia que se ejecuta vs estrategia que queda en gaveta.'
        : 'Three key differentiators: (1) Focus on SMEs and medium companies: Large consultancies (McKinsey, BCG, Deloitte) work with Fortune 500. Alternative specializes in $5M-$100M revenue companies where strategy is equally critical but budget is limited. (2) Affordable price: Large strategic consulting: $200K-$500K+. Alternative: $25K-$100K according to scope. (3) Practical implementation: Large consultancies deliver 200-slide PowerPoint. Alternative delivers executable plan AND supports implementation. Difference: strategy that executes vs strategy that stays in drawer.'
    },
    {
      question: isEs ? '¿Involucran al equipo del cliente o Alternative hace todo?' : 'Do you involve client team or does Alternative do everything?',
      answer: isEs
        ? 'Modelo altamente colaborativo. Alternative NO desarrolla estrategia en torre de marfil y la presenta. Proceso es co-creación con liderazgo del cliente: workshops estratégicos donde equipo participa activamente, entrevistas profundas a stakeholders clave, validación continua de hallazgos y recomendaciones. Razón: ownership. Estrategia que el equipo ayudó a desarrollar tiene 5X más probabilidad de ejecutarse que estrategia impuesta externamente. Tiempo del equipo: 3-4 días completos en workshops + entrevistas + revisiones. Es inversión significativa pero estrategia que define próximos 3-5 años justifica dedicación.'
        : 'Highly collaborative model. Alternative does NOT develop strategy in ivory tower and present it. Process is co-creation with client leadership: strategic workshops where team actively participates, deep interviews with key stakeholders, continuous validation of findings and recommendations. Reason: ownership. Strategy that team helped develop has 5X more probability of executing than externally imposed strategy. Team time: 3-4 full days in workshops + interviews + reviews. It\'s significant investment but strategy that defines next 3-5 years justifies dedication.'
    },
    {
      question: isEs ? '¿Cómo aseguran que plan estratégico realmente se ejecute?' : 'How do you ensure strategic plan is really executed?',
      answer: isEs
        ? 'Cinco mecanismos: (1) Cascada rigurosa: Estrategia se traduce a objetivos departamentales e individuales. (2) Sistema de seguimiento: Reuniones mensuales disciplinadas de revisión de estrategia. (3) KPIs claros: Métricas específicas por objetivo, no ambigüedad. (4) Ownership definido: Cada iniciativa tiene dueño con accountability. (5) Acompañamiento Alternative: Primeros 6-12 meses facilitamos reuniones, monitoreamos, ajustamos, coaching. Sin seguimiento disciplinado, 90% de planes fracasan. Con seguimiento, tasa de éxito sube a 70-80%.'
        : 'Five mechanisms: (1) Rigorous cascade: Strategy translates to departmental and individual objectives. (2) Monitoring system: Disciplined monthly strategy review meetings. (3) Clear KPIs: Specific metrics per objective, no ambiguity. (4) Defined ownership: Each initiative has owner with accountability. (5) Alternative support: First 6-12 months we facilitate meetings, monitor, adjust, coaching. Without disciplined follow-up, 90% of plans fail. With follow-up, success rate rises to 70-80%.'
    },
    {
      question: isEs ? '¿Cuándo es el momento apropiado para desarrollar plan estratégico?' : 'When is the appropriate time to develop strategic plan?',
      answer: isEs
        ? 'Momentos críticos donde plan estratégico es más valioso: (1) Transiciones de liderazgo (nuevo CEO, sucesión generacional), (2) Crecimiento estancado o declive (necesitas revertir situación), (3) Cambios significativos de mercado (nueva competencia, disrupción tecnológica, regulación), (4) Hitos de crecimiento (antes de expansión mayor, entrada a nuevos mercados, fundraising), (5) Post-fusión/adquisición (integrar empresas con estrategia unificada). Si empresa opera "en piloto automático" sin rumbo claro, momento es YA.'
        : 'Critical moments where strategic plan is most valuable: (1) Leadership transitions (new CEO, generational succession), (2) Stagnant or declining growth (you need to reverse situation), (3) Significant market changes (new competition, technological disruption, regulation), (4) Growth milestones (before major expansion, entry to new markets, fundraising), (5) Post-merger/acquisition (integrate companies with unified strategy). If company operates "on autopilot" without clear direction, moment is NOW.'
    }
  ];

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Consultoría Estratégica' : 'Strategic Consulting', href: null }
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
          HERO SECTION
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        {/* Background Elements - Subtle */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[8%] w-32 h-32 bg-turquesa/10 rounded-2xl rotate-12"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[5%] w-24 h-24 bg-menta/10 rounded-2xl -rotate-6"
          />
        </div>

        <div className="container-custom relative z-10 pt-8 pb-16 lg:pb-20">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center gap-2 text-sm">
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
                    {isEs ? 'Consultoría Estratégica' : 'Strategic Consulting'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Consultoría Empresarial' : 'Business Consulting'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs ? 'Estrategia clara que impulsa crecimiento sostenible' : 'Clear strategy that drives sustainable growth'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Consultoría estratégica para empresas que necesitan claridad de rumbo: planificación estratégica, diagnóstico organizacional, diseño de estructura organizacional. Estrategia ejecutable que alinea equipos y genera resultados medibles, no PowerPoint que queda en gavetas.'
                  : 'Strategic consulting for companies that need direction clarity: strategic planning, organizational diagnosis, organizational structure design. Executable strategy that aligns teams and generates measurable results, not PowerPoint that stays in drawers.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Desarrolla tu Estrategia' : 'Develop Your Strategy'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Diagnóstico organizacional gratuito' : 'Free organizational diagnosis'}
                </Link>
              </div>

              {/* Stats - Inline Compact */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '25+', label: isEs ? 'planes estratégicos desarrollados' : 'strategic plans developed' },
                  { value: 'Ejecutable', label: isEs ? 'estrategia, no teórica' : 'strategy, not theoretical' },
                  { icon: true, label: isEs ? 'Enfoque en resultados medibles' : 'Focus on measurable results' }
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

            {/* Right Visual - Strategic Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Main Card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-turquesa" />
                    <div className="w-3 h-3 rounded-full bg-menta" />
                    <div className="w-3 h-3 rounded-full bg-violeta" />
                    <span className="ml-auto text-white/40 text-sm">
                      {isEs ? 'Roadmap Estratégico' : 'Strategic Roadmap'}
                    </span>
                  </div>

                  {/* Strategic Objectives Visualization */}
                  <div className="space-y-4">
                    {[
                      { label: isEs ? 'Objetivo Financiero' : 'Financial Objective', progress: 85, color: 'turquesa' },
                      { label: isEs ? 'Objetivo Cliente' : 'Client Objective', progress: 75, color: 'menta' },
                      { label: isEs ? 'Objetivo Procesos' : 'Process Objective', progress: 70, color: 'violeta' },
                      { label: isEs ? 'Objetivo Aprendizaje' : 'Learning Objective', progress: 65, color: 'turquesa' }
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white/60 text-sm">{item.label}</span>
                          <span className={`font-bold text-sm ${
                            item.color === 'turquesa' ? 'text-turquesa' :
                            item.color === 'menta' ? 'text-menta' : 'text-violeta'
                          }`}>{item.progress}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ duration: 1.5, delay: 0.5 + idx * 0.3 }}
                            className={`h-full ${
                              item.color === 'turquesa' ? 'bg-turquesa' :
                              item.color === 'menta' ? 'bg-menta' : 'bg-violeta'
                            } rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Strategic Pillars */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    {[
                      { icon: Target, label: isEs ? 'Visión' : 'Vision', color: 'turquesa' },
                      { icon: TrendingUp, label: isEs ? 'Objetivos' : 'Objectives', color: 'menta' },
                      { icon: BarChart3, label: isEs ? 'KPIs' : 'KPIs', color: 'violeta' },
                      { icon: GitBranch, label: isEs ? 'Ejecución' : 'Execution', color: 'turquesa' }
                    ].map((pillar, idx) => {
                      const Icon = pillar.icon;
                      const colors = colorClasses[pillar.color as keyof typeof colorClasses];
                      return (
                        <motion.div
                          key={idx}
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                          className={`${colors.bg} rounded-xl p-4 text-center`}
                        >
                          <Icon className={`w-6 h-6 ${colors.text} mx-auto mb-2`} />
                          <span className="text-white/70 text-xs">{pillar.label}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-turquesa rounded-2xl p-4 shadow-xl"
                >
                  <Award className="w-8 h-8 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EL PROBLEMA SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs 
                ? '¿Por qué 67% de las estrategias fracasan en ejecución?'
                : 'Why do 67% of strategies fail in execution?'}
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto mb-8">
              {isEs 
                ? 'Tener estrategia no es el problema; ejecutarla es el problema. La mayoría de planes estratégicos fracasan porque: son demasiado genéricos sin acciones concretas, no se comunican efectivamente a toda la organización, no se traducen a objetivos individuales, no se monitorean con disciplina, o la estructura organizacional no está alineada a la estrategia.'
                : 'Having strategy is not the problem; executing it is. Most strategic plans fail because: they are too generic without concrete actions, not effectively communicated to entire organization, not translated to individual objectives, not monitored with discipline, or organizational structure is not aligned to strategy.'}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-6 mb-8">
            {problems.map((problem, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-background p-8 rounded-2xl shadow-brand 
                             hover:shadow-brand-lg transition-all duration-300 border border-gris-arena/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-turquesa/20 rounded-xl 
                                    flex items-center justify-center">
                      <problem.icon className="w-7 h-7 text-turquesa" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-2">
                        {problem.title}
                      </h3>
                      <p className="text-foreground/70 leading-relaxed">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection className="text-center">
            <p className="text-lg text-turquesa font-semibold">
              {isEs 
                ? 'Alternative desarrolla estrategia ejecutable y acompaña implementación.'
                : 'Alternative develops executable strategy and supports implementation.'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          3 SERVICIOS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Servicios' : 'Services'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '3 pilares de consultoría estratégica' : '3 pillars of strategic consulting'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const colors = colorClasses[service.color as keyof typeof colorClasses];

              return (
                <StaggerItem key={idx}>
                  <Link href={service.href}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className={`group bg-blanco-hueso dark:bg-card p-8 rounded-2xl 
                                  shadow-brand hover:shadow-brand-lg transition-all duration-300
                                  border ${colors.border} h-full`}
                    >
                      <div className={`w-16 h-16 ${colors.bg} rounded-2xl 
                                      flex items-center justify-center mb-6
                                      group-hover:scale-110 transition-transform`}>
                        <service.icon className={`w-8 h-8 ${colors.text}`} />
                      </div>

                      <h3 className="text-2xl font-semibold text-azul-marino dark:text-white mb-3 
                                     group-hover:text-turquesa transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-foreground/70 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-2">
                          <span className={`${colors.badge} font-medium text-sm px-2 py-1 rounded`}>
                            {isEs ? 'Para quién:' : 'For whom:'}
                          </span>
                          <span className="text-foreground/60 text-sm flex-1">{service.forWho}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className={`${colors.badge} font-medium text-sm px-2 py-1 rounded`}>
                            {isEs ? 'Resultado típico:' : 'Typical result:'}
                          </span>
                          <span className="text-foreground/60 text-sm flex-1">{service.result}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-turquesa font-medium group-hover:gap-3 transition-all">
                        <span>{isEs ? 'Conoce más' : 'Learn more'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </motion.div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          BENEFICIOS MEDIBLES SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-azul-marino">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              {isEs ? 'Beneficios medibles' : 'Measurable benefits'}
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
              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-turquesa/5 rounded-full blur-3xl" />

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
                      {isEs ? 'Empresa familiar desarrolla plan estratégico y crece 40%' : 'Family company develops strategic plan and grows 40%'}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Left - Description */}
                  <div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Cliente' : 'Client'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Empresa familiar de distribución (3ra generación, $25M revenue, 150 empleados)'
                          : 'Family distribution company (3rd generation, $25M revenue, 150 employees)'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Situación Inicial' : 'Initial Situation'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Fundador (1ra generación) jubilándose. Hijo (3ra generación) asumiendo como CEO. Sin plan estratégico formal previo (fundador tenía todo "en la cabeza"). Equipo ejecutivo desalineado sobre prioridades. Crecimiento estancado últimos 3 años (+2% anual vs +15% industria).'
                          : 'Founder (1st generation) retiring. Son (3rd generation) assuming as CEO. No formal strategic plan previously (founder had everything "in his head"). Executive team misaligned on priorities. Stagnant growth last 3 years (+2% annually vs +15% industry).'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Desafíos Críticos' : 'Critical Challenges'}
                      </h4>
                      <ul className="space-y-2 text-foreground/70 text-sm">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Sin visión compartida entre generaciones' : 'No shared vision between generations'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? '5 ejecutivos con 5 agendas diferentes' : '5 executives with 5 different agendas'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Estructura organizacional centrada en fundador (cuello de botella)' : 'Organizational structure centered on founder (bottleneck)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Competencia más grande ganando clientes clave' : 'Larger competition winning key clients'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Falta de procesos documentados (dependencia de personas clave)' : 'Lack of documented processes (dependency on key people)'}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-foreground/70 mb-3">
                        {isEs 
                          ? 'Planificación estratégica completa en 3 meses:'
                          : 'Complete strategic planning in 3 months:'}
                      </p>
                      <div className="space-y-3 text-foreground/70 text-sm">
                        <div>
                          <strong className="text-azul-marino dark:text-white">{isEs ? 'Mes 1: Diagnóstico y Análisis' : 'Month 1: Diagnosis and Analysis'}</strong>
                          <p className="mt-1">{isEs ? 'Entrevistas con 12 stakeholders clave (familia, ejecutivos, clientes). Análisis FODA profundo. Benchmarking vs competencia. Análisis de capacidades internas.' : 'Interviews with 12 key stakeholders (family, executives, clients). Deep SWOT analysis. Benchmarking vs competition. Internal capabilities analysis.'}</p>
                        </div>
                        <div>
                          <strong className="text-azul-marino dark:text-white">{isEs ? 'Mes 2: Desarrollo de Estrategia' : 'Month 2: Strategy Development'}</strong>
                          <p className="mt-1">{isEs ? 'Workshops estratégicos con equipo ejecutivo (3 sesiones de día completo). Definición de visión 2030. 5 objetivos estratégicos priorizados. 12 iniciativas estratégicas con ownership. Balanced Scorecard con KPIs por perspectiva.' : 'Strategic workshops with executive team (3 full-day sessions). Vision 2030 definition. 5 prioritized strategic objectives. 12 strategic initiatives with ownership. Balanced Scorecard with KPIs per perspective.'}</p>
                        </div>
                        <div>
                          <strong className="text-azul-marino dark:text-white">{isEs ? 'Mes 3: Cascada y Sistema de Ejecución' : 'Month 3: Cascade and Execution System'}</strong>
                          <p className="mt-1">{isEs ? 'Cascada de objetivos estratégicos a objetivos departamentales. Definición de proyectos estratégicos con PMs asignados. Sistema de seguimiento mensual (reuniones de estrategia). Quick wins identificados para primeros 90 días.' : 'Cascade of strategic objectives to departmental objectives. Definition of strategic projects with assigned PMs. Monthly monitoring system (strategy meetings). Quick wins identified for first 90 days.'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Plan Estratégico 3 Años' : '3-Year Strategic Plan'}
                      </h4>
                      <ul className="space-y-2 text-foreground/70 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Objetivo 1: Digitalizar operación (e-commerce B2B, automatización)' : 'Objective 1: Digitize operation (B2B e-commerce, automation)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Objetivo 2: Expandir a 2 nuevas ciudades' : 'Objective 2: Expand to 2 new cities'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Objetivo 3: Diversificar portafolio (3 nuevas categorías)' : 'Objective 3: Diversify portfolio (3 new categories)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Objetivo 4: Profesionalizar gestión (procesos, estructura, talento)' : 'Objective 4: Professionalize management (processes, structure, talent)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Objetivo 5: Fortalecer cultura y sucesión generacional' : 'Objective 5: Strengthen culture and generational succession'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Right - Stats */}
                  <div>
                    <h4 className="font-semibold text-azul-marino dark:text-white mb-4">
                      {isEs ? 'Resultados (24 meses post-plan)' : 'Results (24 months post-plan)'}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { value: '+40%', label: isEs ? 'Revenue' : 'Revenue', sub: isEs ? '$25M → $35M' : '$25M → $35M' },
                        { value: '25%', label: isEs ? 'E-commerce' : 'E-commerce', sub: isEs ? '0% → 25% de ventas' : '0% → 25% of sales' },
                        { value: '2', label: isEs ? 'Ciudades nuevas' : 'New cities', sub: isEs ? 'Expansión' : 'Expansion' },
                        { value: '18%', label: isEs ? 'Nuevas categorías' : 'New categories', sub: isEs ? 'De revenue' : 'Of revenue' },
                        { value: '15', label: isEs ? 'Procesos documentados' : 'Documented processes', sub: isEs ? 'Procesos core' : 'Core processes' },
                        { value: '100%', label: isEs ? 'Alineación ejecutiva' : 'Executive alignment', sub: isEs ? 'En estrategia' : 'On strategy' },
                        { value: 'Mensual', label: isEs ? 'Reuniones estratégicas' : 'Strategic meetings', sub: isEs ? 'Disciplina mantenida' : 'Discipline maintained' },
                        { value: 'Exitosa', label: isEs ? 'Transición generacional' : 'Generational transition', sub: isEs ? 'Fundador mentoreando' : 'Founder mentoring' }
                      ].map((stat, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          className="bg-white dark:bg-background p-4 rounded-2xl shadow-brand text-center"
                        >
                          <div className="text-2xl lg:text-3xl font-bold text-turquesa mb-1">
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
                          ? 'No solo desarrollar plan; acompañar primeros 12 meses de ejecución con reuniones mensuales de seguimiento.'
                          : 'Not just developing plan; supporting first 12 months of execution with monthly monitoring meetings.'}
                      </p>
                    </div>
                  </div>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                  {isEs 
                    ? '"Alternative nos dio claridad que no teníamos. Por primera vez, toda la familia y ejecutivos estamos remando en misma dirección. Crecimiento 40% es resultado directo."'
                    : '"Alternative gave us clarity we didn\'t have. For the first time, entire family and executives are rowing in same direction. 40% growth is direct result."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— {isEs ? 'CEO (3ra Generación)' : 'CEO (3rd Generation)'}</span>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* =====================================================
          NUESTRA METODOLOGÍA SECTION - 5 Pasos
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Metodología de consultoría estratégica Alternative' : 'Alternative strategic consulting methodology'}
            </h2>
          </AnimatedSection>

          {/* Timeline - Desktop */}
          <div className="hidden lg:block relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-turquesa via-menta to-violeta -translate-y-1/2" />
            
            <div className="grid grid-cols-5 gap-4 relative">
              {methodologySteps.map((step, idx) => {
                const colors = colorClasses[step.color as keyof typeof colorClasses];
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
                        <step.icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <div className="bg-white dark:bg-background p-4 rounded-2xl shadow-brand">
                        <h3 className="text-sm font-bold text-azul-marino dark:text-white mb-2">
                          {isEs ? 'PASO' : 'STEP'} {idx + 1}: {step.step}
                        </h3>
                        <p className="text-foreground/70 text-xs leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet - Vertical Stack */}
          <div className="lg:hidden space-y-6">
            {methodologySteps.map((step, idx) => {
              const colors = colorClasses[step.color as keyof typeof colorClasses];
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
                      <step.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'PASO' : 'STEP'} {idx + 1}: {step.step}
                      </h3>
                      <p className="text-foreground/70 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
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
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-turquesa/10 rounded-full blur-2xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs ? '¿Tu empresa necesita claridad estratégica?' : 'Does your company need strategic clarity?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Diagnóstico estratégico gratuito de 30 minutos. Evaluamos situación actual y recomendamos servicio apropiado (planificación, diagnóstico o diseño).'
                  : 'Free 30-minute strategic diagnosis. We evaluate current situation and recommend appropriate service (planning, diagnosis or design).'}
              </p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Evaluación preliminar de situación estratégica' : 'Preliminary evaluation of strategic situation',
                  isEs ? 'Identificación de desafíos críticos' : 'Identification of critical challenges',
                  isEs ? 'Recomendación de servicio apropiado' : 'Appropriate service recommendation',
                  isEs ? 'Alcance y timeline de consultoría' : 'Consulting scope and timeline',
                  isEs ? 'Propuesta personalizada' : 'Personalized proposal'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/${locale}/contacto`}
                    className="inline-flex items-center gap-3 bg-turquesa text-azul-marino 
                               font-semibold px-8 py-4 rounded-lg hover:bg-menta 
                               transition-all duration-300 shadow-lg group"
                  >
                    {isEs ? 'Solicitar Diagnóstico Estratégico' : 'Request Strategic Diagnosis'}
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

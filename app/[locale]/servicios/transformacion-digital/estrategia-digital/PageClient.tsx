'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import { faqs as faqData } from '@/lib/content/faqs/servicios--transformacion-digital--estrategia-digital';
import { localizeFaqs } from '@/lib/content/faqs';
import {
  Target,
  ArrowRight,
  ChevronDown,
  Map,
  TrendingUp,
  CheckCircle2,
  Building2,
  Phone,
  FileText,
  BarChart3,
  Users,
  Shield,
  Sparkles,
  Clock,
  Zap,
  Layers,
  Search,
  GitBranch,
  Monitor,
  BookOpen,
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

export default function EstrategiaDigitalPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [openComponent, setOpenComponent] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Transformación Digital' : 'Digital Transformation', href: `/${locale}/servicios/transformacion-digital` },
    { label: isEs ? 'Estrategia Digital' : 'Digital Strategy', href: null }
  ];

  const forWho = [
    {
      number: '1',
      icon: Target,
      title: isEs ? 'Iniciando transformación sin claridad de por dónde empezar' : 'Starting transformation without clarity on where to start',
      description: isEs
        ? 'Sabes que necesitas transformarte digitalmente pero no sabes QUÉ hacer primero. Múltiples ideas sin priorización clara ni ROI calculado.'
        : 'You know you need to digitally transform but don\'t know WHAT to do first. Multiple ideas without clear prioritization or calculated ROI.',
      color: 'turquesa'
    },
    {
      number: '2',
      icon: TrendingUp,
      title: isEs ? 'Presupuesto limitado que debe invertirse inteligentemente' : 'Limited budget that must be invested intelligently',
      description: isEs
        ? 'No puedes invertir en todo. Necesitas identificar iniciativas de mayor impacto por dólar invertido y ejecutarlas en orden correcto.'
        : 'You can\'t invest in everything. You need to identify initiatives with greatest impact per dollar invested and execute them in correct order.',
      color: 'menta'
    },
    {
      number: '3',
      icon: Zap,
      title: isEs ? 'Múltiples iniciativas digitales descoordinadas' : 'Multiple uncoordinated digital initiatives',
      description: isEs
        ? 'Cada departamento impulsa su proyecto digital sin visión unificada. Duplicación de esfuerzos, sistemas desconectados, desperdicio de recursos.'
        : 'Each department pushes its digital project without unified vision. Duplication of efforts, disconnected systems, resource waste.',
      color: 'violeta'
    },
    {
      number: '4',
      icon: BarChart3,
      title: isEs ? 'Directorio/inversores exigen plan digital claro' : 'Board/investors demand clear digital plan',
      description: isEs
        ? 'Junta directiva o inversores piden estrategia digital articulada con ROI demostrable antes de aprobar presupuesto significativo.'
        : 'Board of directors or investors request articulated digital strategy with demonstrable ROI before approving significant budget.',
      color: 'turquesa'
    },
    {
      number: '5',
      icon: Award,
      title: isEs ? 'Competencia más digital amenaza tu posición' : 'More digital competition threatens your position',
      description: isEs
        ? 'Competidores están transformándose digitalmente y ganando ventaja. Necesitas plan para cerrar brecha o diferenciarte digitalmente.'
        : 'Competitors are digitally transforming and gaining advantage. You need plan to close gap or differentiate digitally.',
      color: 'menta'
    },
    {
      number: '6',
      icon: TrendingUp,
      title: isEs ? 'Empresa escalando requiere capacidades digitales' : 'Scaling company requires digital capabilities',
      description: isEs
        ? 'Crecimiento rápido (nuevos mercados, productos, geografías) requiere capacidades digitales que operación manual actual no soporta.'
        : 'Rapid growth (new markets, products, geographies) requires digital capabilities that current manual operation doesn\'t support.',
      color: 'violeta'
    }
  ];

  const components = [
    {
      number: '1',
      icon: Search,
      title: isEs ? 'Evaluación de Madurez Digital' : 'Digital Maturity Assessment',
      description: isEs
        ? 'Evaluamos madurez digital actual en 5 dimensiones: Estrategia y liderazgo, Procesos y operaciones, Tecnología y datos, Talento y cultura, Cliente y experiencia. Framework: Escala 1-5 (Inicial → Optimizado → Diferenciado). Benchmarking vs industria.'
        : 'We evaluate current digital maturity in 5 dimensions: Strategy and leadership, Processes and operations, Technology and data, Talent and culture, Customer and experience. Framework: Scale 1-5 (Initial → Optimized → Differentiated). Benchmarking vs industry.',
      deliverable: isEs ? 'Assessment de madurez con score por dimensión + gaps vs mejor práctica' : 'Maturity assessment with score per dimension + gaps vs best practice',
      color: 'turquesa'
    },
    {
      number: '2',
      icon: Building2,
      title: isEs ? 'Análisis de Contexto de Negocio' : 'Business Context Analysis',
      description: isEs
        ? 'Entendemos objetivos estratégicos de negocio, desafíos competitivos, tendencias de industria, expectativas de clientes. Propósito: Asegurar que estrategia digital está alineada a estrategia de negocio, no existe en vacío.'
        : 'We understand strategic business objectives, competitive challenges, industry trends, customer expectations. Purpose: Ensure digital strategy is aligned to business strategy, doesn\'t exist in vacuum.',
      deliverable: isEs ? 'Análisis de contexto + alineación objetivos digitales con objetivos de negocio' : 'Context analysis + alignment of digital objectives with business objectives',
      color: 'menta'
    },
    {
      number: '3',
      icon: Sparkles,
      title: isEs ? 'Visión Digital Futura' : 'Future Digital Vision',
      description: isEs
        ? 'Definimos estado digital deseado en 2-3 años: capacidades digitales que empresa tendrá, experiencia de cliente digital, procesos automatizados, decisiones basadas en datos. Co-creación: Workshops con liderazgo para construir visión compartida.'
        : 'We define desired digital state in 2-3 years: digital capabilities company will have, digital customer experience, automated processes, data-driven decisions. Co-creation: Workshops with leadership to build shared vision.',
      deliverable: isEs ? 'Visión digital articulada + estado futuro vs actual (gaps)' : 'Articulated digital vision + future vs current state (gaps)',
      color: 'violeta'
    },
    {
      number: '4',
      icon: Layers,
      title: isEs ? 'Identificación de Iniciativas' : 'Initiative Identification',
      description: isEs
        ? 'Generamos cartera de iniciativas digitales en 5 pilares: Experiencia de cliente digital, Procesos y automatización, Datos y analytics, Tecnología e infraestructura, Cultura y talento digital. Fuentes: Análisis de gaps, benchmarking de industria, mejores prácticas, innovación.'
        : 'We generate portfolio of digital initiatives in 5 pillars: Digital customer experience, Processes and automation, Data and analytics, Technology and infrastructure, Culture and digital talent. Sources: Gap analysis, industry benchmarking, best practices, innovation.',
      deliverable: isEs ? 'Cartera de 15-30 iniciativas digitales candidatas con descripción de cada una' : 'Portfolio of 15-30 candidate digital initiatives with description of each',
      color: 'turquesa'
    },
    {
      number: '5',
      icon: GitBranch,
      title: isEs ? 'Priorización y Roadmap' : 'Prioritization and Roadmap',
      description: isEs
        ? 'Priorizamos iniciativas por impacto de negocio vs esfuerzo de implementación. Matriz 2x2: Quick wins, Proyectos estratégicos, Fill-ins, Hard slogs. Criterios de priorización: ROI proyectado, alineación estratégica, factibilidad técnica, interdependencias, riesgo.'
        : 'We prioritize initiatives by business impact vs implementation effort. 2x2 Matrix: Quick wins, Strategic projects, Fill-ins, Hard slogs. Prioritization criteria: Projected ROI, strategic alignment, technical feasibility, interdependencies, risk.',
      deliverable: isEs ? 'Roadmap de implementación en olas (Ola 1: meses 1-6, Ola 2: meses 7-12, Ola 3: año 2+)' : 'Implementation roadmap in waves (Wave 1: months 1-6, Wave 2: months 7-12, Wave 3: year 2+)',
      color: 'menta'
    },
    {
      number: '6',
      icon: FileText,
      title: isEs ? 'Business Cases de Iniciativas Prioritarias' : 'Business Cases for Priority Initiatives',
      description: isEs
        ? 'Desarrollamos business case completo para top 5-10 iniciativas prioritarias: Inversión (CAPEX + OPEX), Beneficios cuantificados, ROI/VPN/TIR, Riesgos, Plan de implementación. Rigor: Mismo nivel de análisis que servicio "Casos de Negocio" standalone.'
        : 'We develop complete business case for top 5-10 priority initiatives: Investment (CAPEX + OPEX), Quantified benefits, ROI/NPV/IRR, Risks, Implementation plan. Rigor: Same level of analysis as standalone "Business Cases" service.',
      deliverable: isEs ? 'Business cases ejecutivos + resumen financiero consolidado' : 'Executive business cases + consolidated financial summary',
      color: 'violeta'
    },
    {
      number: '7',
      icon: Shield,
      title: isEs ? 'Plan de Governance' : 'Governance Plan',
      description: isEs
        ? 'Definimos cómo se gobernará transformación digital: Roles (Comité Digital, Digital Leader, Champions), Procesos de aprobación, Métricas de seguimiento, Reuniones de governance. Propósito: Asegurar ejecución disciplinada y toma de decisiones ágil.'
        : 'We define how digital transformation will be governed: Roles (Digital Committee, Digital Leader, Champions), Approval processes, Monitoring metrics, Governance meetings. Purpose: Ensure disciplined execution and agile decision-making.',
      deliverable: isEs ? 'Modelo de governance + RACI de transformación digital' : 'Governance model + RACI of digital transformation',
      color: 'turquesa'
    },
    {
      number: '8',
      icon: Users,
      title: isEs ? 'Plan de Gestión del Cambio' : 'Change Management Plan',
      description: isEs
        ? 'Estrategia de change management para transformación: Stakeholder mapping, Plan de comunicaciones, Estrategia de capacitación, Gestión de resistencias. Propósito: Transformación digital falla más por personas que por tecnología. Plan de cambio es crítico.'
        : 'Change management strategy for transformation: Stakeholder mapping, Communications plan, Training strategy, Resistance management. Purpose: Digital transformation fails more due to people than technology. Change plan is critical.',
      deliverable: isEs ? 'Change management plan de alto nivel' : 'High-level change management plan',
      color: 'menta'
    }
  ];

  const processPhases = [
    {
      phase: isEs ? 'DISCOVERY Y DIAGNÓSTICO' : 'DISCOVERY AND DIAGNOSIS',
      duration: isEs ? '2-3 semanas' : '2-3 weeks',
      description: isEs
        ? 'Entrevistas con C-level y líderes clave (8-12 personas), Assessment de madurez digital (cuestionario + evidencias), Revisión de sistemas y tecnología actual, Análisis de procesos críticos, Benchmarking vs competidores e industria.'
        : 'Interviews with C-level and key leaders (8-12 people), Digital maturity assessment (questionnaire + evidence), Review of current systems and technology, Analysis of critical processes, Benchmarking vs competitors and industry.',
      icon: Search,
      deliverable: isEs ? 'Diagnóstico de madurez digital + gaps identificados' : 'Digital maturity diagnosis + identified gaps',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'DISEÑO DE ESTRATEGIA' : 'STRATEGY DESIGN',
      duration: isEs ? '3-4 semanas' : '3-4 weeks',
      description: isEs
        ? 'Workshops de visión digital con liderazgo, Identificación de iniciativas digitales candidatas, Desarrollo de business cases preliminares, Priorización de iniciativas (matriz impacto vs esfuerzo), Desarrollo de roadmap en olas.'
        : 'Digital vision workshops with leadership, Identification of candidate digital initiatives, Development of preliminary business cases, Initiative prioritization (impact vs effort matrix), Development of roadmap in waves.',
      icon: GitBranch,
      deliverable: isEs ? 'Borrador de estrategia digital para revisión' : 'Digital strategy draft for review',
      color: 'menta'
    },
    {
      phase: isEs ? 'VALIDACIÓN Y REFINAMIENTO' : 'VALIDATION AND REFINEMENT',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Presentación de estrategia a liderazgo, Incorporación de feedback, Refinamiento de business cases de top iniciativas, Ajustes de priorización según restricciones, Desarrollo de plan de governance.'
        : 'Strategy presentation to leadership, Incorporation of feedback, Refinement of top initiative business cases, Prioritization adjustments according to constraints, Development of governance plan.',
      icon: CheckCircle2,
      deliverable: isEs ? 'Estrategia digital refinada' : 'Refined digital strategy',
      color: 'violeta'
    },
    {
      phase: isEs ? 'PRESENTACIÓN EJECUTIVA' : 'EXECUTIVE PRESENTATION',
      duration: isEs ? '1 semana' : '1 week',
      description: isEs
        ? 'Preparación de presentación para junta/gerencia, Desarrollo de resumen ejecutivo (10-15 slides), Presentación formal de estrategia, Q&A con stakeholders clave, Plan de next steps para ejecución.'
        : 'Preparation of presentation for board/management, Development of executive summary (10-15 slides), Formal strategy presentation, Q&A with key stakeholders, Plan of next steps for execution.',
      icon: Monitor,
      deliverable: isEs ? 'Estrategia digital final + presentación ejecutiva' : 'Final digital strategy + executive presentation',
      color: 'turquesa'
    }
  ];

  const includes = [
    {
      title: isEs ? 'Documentos Estratégicos' : 'Strategic Documents',
      icon: FileText,
      items: isEs
        ? ['Documento de estrategia digital completo (40-60 páginas)', 'Resumen ejecutivo (2 páginas)', 'Presentación ejecutiva (PowerPoint 20-30 slides)', 'Roadmap visual de transformación']
        : ['Complete digital strategy document (40-60 pages)', 'Executive summary (2 pages)', 'Executive presentation (PowerPoint 20-30 slides)', 'Visual transformation roadmap'],
      color: 'turquesa'
    },
    {
      title: isEs ? 'Análisis y Business Cases' : 'Analysis and Business Cases',
      icon: BarChart3,
      items: isEs
        ? ['Assessment de madurez digital', 'Business cases de top 5-10 iniciativas', 'Análisis financiero consolidado (ROI, inversión total)', 'Análisis de riesgos']
        : ['Digital maturity assessment', 'Business cases for top 5-10 initiatives', 'Consolidated financial analysis (ROI, total investment)', 'Risk analysis'],
      color: 'menta'
    },
    {
      title: isEs ? 'Roadmap y Governance' : 'Roadmap and Governance',
      icon: Map,
      items: isEs
        ? ['Roadmap de implementación en olas con timeline', 'Priorización de iniciativas', 'Modelo de governance de transformación', 'KPIs de seguimiento de estrategia']
        : ['Implementation roadmap in waves with timeline', 'Initiative prioritization', 'Transformation governance model', 'Strategy monitoring KPIs'],
      color: 'violeta'
    },
    {
      title: isEs ? 'Plan de Cambio' : 'Change Plan',
      icon: Users,
      items: isEs
        ? ['Change management plan de alto nivel', 'Stakeholder mapping', 'Plan de comunicaciones', 'Estrategia de capacitación']
        : ['High-level change management plan', 'Stakeholder mapping', 'Communications plan', 'Training strategy'],
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '100%', label: isEs ? 'Claridad de dónde invertir digitalmente' : 'Clarity on where to invest digitally', icon: Target },
    { value: 'ROI', label: isEs ? 'Priorización Basada en ROI, no en opiniones' : 'Prioritization Based on ROI, not opinions', icon: BarChart3 },
    { value: '6-10', label: isEs ? 'semanas Desarrollo completo de estrategia' : 'weeks Complete strategy development', icon: Clock },
    { value: '15-30', label: isEs ? 'Iniciativas identificadas y priorizadas' : 'Initiatives identified and prioritized', icon: Layers },
    { value: 'ROI', label: isEs ? 'Proyectado de cada iniciativa' : 'Projected for each initiative', icon: TrendingUp },
    { value: '✓', label: isEs ? 'Ejecutable Roadmap con next steps claros' : 'Executable Roadmap with clear next steps', icon: CheckCircle2 }
  ];

  const maturityLevels = [
    {
      level: '1',
      title: isEs ? 'INICIAL' : 'INITIAL',
      description: isEs
        ? 'Digital ad-hoc, sin estrategia, Procesos manuales dominantes, Datos en silos (Excel), Cultura resistente a digital'
        : 'Ad-hoc digital, no strategy, Dominant manual processes, Data in silos (Excel), Culture resistant to digital',
      color: 'red'
    },
    {
      level: '2',
      title: isEs ? 'EN DESARROLLO' : 'IN DEVELOPMENT',
      description: isEs
        ? 'Primeras iniciativas digitales puntuales, Algunos procesos digitalizados, Sistemas básicos implementados, Conciencia de necesidad digital'
        : 'First specific digital initiatives, Some digitized processes, Basic systems implemented, Awareness of digital need',
      color: 'orange'
    },
    {
      level: '3',
      title: isEs ? 'DEFINIDO' : 'DEFINED',
      description: isEs
        ? 'Estrategia digital articulada, Procesos core digitalizados, Sistemas integrados parcialmente, Cultura aceptando digital'
        : 'Articulated digital strategy, Core processes digitized, Partially integrated systems, Culture accepting digital',
      color: 'yellow'
    },
    {
      level: '4',
      title: isEs ? 'GESTIONADO' : 'MANAGED',
      description: isEs
        ? 'Transformación digital en ejecución, Mayoría de procesos digitales, Datos consolidados y analizados, Cultura digital establecida'
        : 'Digital transformation in execution, Majority of digital processes, Consolidated and analyzed data, Established digital culture',
      color: 'turquesa'
    },
    {
      level: '5',
      title: isEs ? 'OPTIMIZADO' : 'OPTIMIZED',
      description: isEs
        ? 'Diferenciación digital vs competencia, Innovación digital continua, Decisiones 100% basadas en datos, Cultura digital nativa'
        : 'Digital differentiation vs competition, Continuous digital innovation, 100% data-driven decisions, Native digital culture',
      color: 'menta'
    }
  ];

  const faqs = localizeFaqs(faqData, isEs ? 'es' : 'en');

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
        currentService="transformacion-digital"
      />

      {/* =====================================================
          HERO SECTION - Standard Design
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
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
                    {isEs ? 'Estrategia Digital' : 'Digital Strategy'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Transformación Digital' : 'Digital Transformation'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Hoja de ruta digital alineada a objetivos de negocio'
                  : 'Digital roadmap aligned to business objectives'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Desarrollo de estrategia digital clara con roadmap de implementación, priorización de iniciativas por ROI, business cases de inversiones tecnológicas y plan de transformación ejecutable. Estrategia que guía DÓNDE invertir, QUÉ tecnologías adoptar y CÓMO generar valor medible.'
                  : 'Development of clear digital strategy with implementation roadmap, ROI-based initiative prioritization, technology investment business cases and executable transformation plan. Strategy that guides WHERE to invest, WHAT technologies to adopt and HOW to generate measurable value.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Desarrolla tu Estrategia Digital' : 'Develop Your Digital Strategy'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/recursos`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Descarga framework de madurez digital' : 'Download digital maturity framework'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '20+', label: isEs ? 'roadmaps digitales' : 'digital roadmaps' },
                  { value: 'ROI', label: isEs ? 'proyectado de cada iniciativa' : 'projected for each initiative' },
                  { icon: true, label: isEs ? 'Estrategia ejecutable, no PowerPoint olvidable' : 'Executable strategy, not forgettable PowerPoint' }
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

            {/* Right Visual - Roadmap Strategy */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
                >
                  {/* Roadmap Timeline */}
                  <div className="mb-6">
                    <h3 className="text-white/80 text-sm font-medium mb-4">
                      {isEs ? 'Roadmap Estratégico' : 'Strategic Roadmap'}
                    </h3>
                    <div className="space-y-4">
                      {[
                        { phase: isEs ? 'Q1-Q2' : 'Q1-Q2', label: isEs ? 'Fundaciones' : 'Foundations', progress: 100, color: 'turquesa' },
                        { phase: isEs ? 'Q3-Q4' : 'Q3-Q4', label: isEs ? 'Crecimiento' : 'Growth', progress: 75, color: 'menta' },
                        { phase: isEs ? 'Año 2' : 'Year 2', label: isEs ? 'Escalamiento' : 'Scaling', progress: 40, color: 'violeta' }
                      ].map((item, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <span className="text-white font-semibold text-sm">{item.phase}</span>
                              <span className="text-white/60 text-xs block">{item.label}</span>
                            </div>
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
                  </div>

                  {/* Strategic Pillars */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Target, label: isEs ? 'Priorización' : 'Prioritization', bgClass: 'bg-turquesa/20', textClass: 'text-turquesa' },
                      { icon: TrendingUp, label: isEs ? 'ROI' : 'ROI', bgClass: 'bg-menta/20', textClass: 'text-menta' },
                      { icon: Zap, label: isEs ? 'Ejecución' : 'Execution', bgClass: 'bg-violeta/20', textClass: 'text-violeta' },
                      { icon: Award, label: isEs ? 'Valor' : 'Value', bgClass: 'bg-turquesa/20', textClass: 'text-turquesa' }
                    ].map((pillar, idx) => {
                      const Icon = pillar.icon;
                      return (
                        <motion.div
                          key={idx}
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                          className={`${pillar.bgClass} rounded-xl p-4 text-center`}
                        >
                          <Icon className={`w-6 h-6 ${pillar.textClass} mx-auto mb-2`} />
                          <span className="text-white/70 text-xs">{pillar.label}</span>
                        </motion.div>
                      );
                    })}
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
          QUÉ ES ESTRATEGIA DIGITAL SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs ? 'Estrategia digital: el plan maestro de tu transformación' : 'Digital strategy: the master plan of your transformation'}
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs 
                    ? 'Estrategia digital es el plan estratégico que define cómo tu empresa usará tecnología digital para lograr objetivos de negocio y crear ventaja competitiva. Responde: ¿Dónde estamos digitalmente hoy? ¿Dónde necesitamos estar en 2-3 años? ¿Qué iniciativas digitales nos llevan allá? ¿Cuál es el ROI esperado de cada inversión?'
                    : 'Digital strategy is the strategic plan that defines how your company will use digital technology to achieve business objectives and create competitive advantage. Answers: Where are we digitally today? Where do we need to be in 2-3 years? What digital initiatives take us there? What is the expected ROI of each investment?'}
                </p>
                <p>
                  {isEs 
                    ? 'Una estrategia digital robusta incluye: evaluación de madurez digital actual, visión digital futura alineada a estrategia de negocio, identificación de iniciativas digitales (procesos, tecnología, datos, cultura), priorización por impacto vs esfuerzo, roadmap de implementación en olas, business cases con ROI proyectado, plan de governance y gestión del cambio.'
                    : 'A robust digital strategy includes: current digital maturity assessment, future digital vision aligned to business strategy, identification of digital initiatives (processes, technology, data, culture), prioritization by impact vs effort, implementation roadmap in waves, business cases with projected ROI, governance plan and change management.'}
                </p>
                <p>
                  {isEs 
                    ? 'Diferencia con plan de TI: Plan de TI es táctico (qué sistemas mantener, infraestructura, soporte). Estrategia digital es estratégica (cómo tecnología transforma el negocio, nuevas capacidades, ventaja competitiva). Complementarios pero diferentes niveles.'
                    : 'Difference with IT plan: IT plan is tactical (what systems to maintain, infrastructure, support). Digital strategy is strategic (how technology transforms business, new capabilities, competitive advantage). Complementary but different levels.'}
                </p>
              </div>
            </AnimatedSection>

            {/* Visual Diagram */}
            <AnimatedSection delay={0.2}>
              <div className="relative bg-blanco-hueso dark:bg-card rounded-2xl p-8 shadow-brand">
                <div className="space-y-6">
                  {[
                    { icon: Search, label: isEs ? 'Diagnóstico' : 'Diagnosis', color: 'turquesa' },
                    { icon: GitBranch, label: isEs ? 'Visión' : 'Vision', color: 'menta' },
                    { icon: Layers, label: isEs ? 'Iniciativas' : 'Initiatives', color: 'violeta' },
                    { icon: Map, label: isEs ? 'Roadmap' : 'Roadmap', color: 'turquesa' }
                  ].map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4"
                    >
                      <div className={`w-12 h-12 ${colorClasses[step.color as keyof typeof colorClasses].bg} rounded-xl flex items-center justify-center`}>
                        <step.icon className={`w-6 h-6 ${colorClasses[step.color as keyof typeof colorClasses].text}`} />
                      </div>
                      <div className="flex-1 h-1 bg-gris-arena/20 rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          transition={{ duration: 0.8, delay: idx * 0.2 }}
                          viewport={{ once: true }}
                          className={`h-full ${colorClasses[step.color as keyof typeof colorClasses].bg.replace('/10', '')} rounded-full`}
                        />
                      </div>
                      <span className="text-azul-marino dark:text-white font-medium">{step.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* =====================================================
          PARA QUIÉN ES SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Cuándo necesitas estrategia digital formal?' : 'When do you need formal digital strategy?'}
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
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <span className="text-2xl font-bold text-azul-marino dark:text-white">{item.number}</span>
                      </div>
                      <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <item.icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
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
          8 COMPONENTES SECTION - Accordion Visual
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '8 componentes de estrategia digital Alternative' : '8 components of Alternative digital strategy'}
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-4">
            {components.map((component, idx) => {
              const colors = colorClasses[component.color as keyof typeof colorClasses];
              const isOpen = openComponent === idx;
              
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  className="bg-blanco-hueso dark:bg-card rounded-2xl border border-gris-arena/20 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenComponent(isOpen ? null : idx)}
                    className="w-full p-6 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <span className="text-lg font-bold text-azul-marino dark:text-white">{component.number}</span>
                      </div>
                      <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <component.icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-azul-marino dark:text-white group-hover:text-turquesa transition-colors">
                        {component.title}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-4"
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
                    <div className="px-6 pb-6 space-y-3">
                      <p className="text-foreground/70 leading-relaxed">
                        {component.description}
                      </p>
                      <div className="flex items-start gap-2 pt-2 border-t border-gris-arena/20">
                        <span className={`${colors.badge} font-medium text-sm px-2 py-1 rounded`}>
                          {isEs ? 'Entregable:' : 'Deliverable:'}
                        </span>
                        <span className="text-foreground/60 text-sm">{component.deliverable}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESO DE TRABAJO - Timeline Horizontal
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Cómo desarrollamos tu estrategia digital' : 'How we develop your digital strategy'}
            </h2>
          </AnimatedSection>

          {/* Timeline - Desktop */}
          <div className="hidden lg:block relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-turquesa via-menta to-violeta -translate-y-1/2" />
            
            <div className="grid grid-cols-4 gap-8 relative">
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
                      <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <phase.icon className={`w-8 h-8 ${colors.text}`} />
                      </div>
                      <div className="bg-white dark:bg-background p-6 rounded-2xl shadow-brand">
                        <div className="text-turquesa text-sm font-medium mb-2">{phase.duration}</div>
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
              {isEs ? 'DURACIÓN TOTAL: 6-10 semanas' : 'TOTAL DURATION: 6-10 weeks'}
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
                  <p className="text-white/70">{benefit.label}</p>
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
            <div className="bg-turquesa/10 rounded-3xl p-8 lg:p-12 overflow-hidden relative">
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
                      {isEs ? 'Cadena retail desarrolla estrategia digital 3 años' : 'Retail chain develops 3-year digital strategy'}
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
                          ? 'Cadena de retail (25 tiendas, $50M revenue, 400 empleados)'
                          : 'Retail chain (25 stores, $50M revenue, 400 employees)'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Situación' : 'Situation'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'E-commerce creciendo y amenazando tiendas físicas. Operación muy manual (inventarios, compras, ventas). Sin visibilidad consolidada entre tiendas. Junta directiva presionando por "transformación digital" pero sin claridad de QUÉ hacer exactamente. Presupuesto aprobado: $1.5M en 3 años (pero solo si hay plan sólido).'
                          : 'E-commerce growing and threatening physical stores. Very manual operation (inventories, purchases, sales). No consolidated visibility between stores. Board pressuring for "digital transformation" but without clarity on WHAT to do exactly. Approved budget: $1.5M over 3 years (but only if there\'s solid plan).'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-foreground/70 mb-3">
                        {isEs 
                          ? 'Estrategia digital completa en 8 semanas:'
                          : 'Complete digital strategy in 8 weeks:'}
                      </p>
                      <ul className="space-y-2 text-foreground/70 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Diagnóstico (Semanas 1-2): Madurez digital: Nivel 1.8 de 5 (muy bajo). Gaps críticos: Sin e-commerce, inventario manual, sin datos consolidados, sin CRM' : 'Diagnosis (Weeks 1-2): Digital maturity: Level 1.8 of 5 (very low). Critical gaps: No e-commerce, manual inventory, no consolidated data, no CRM'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Estrategia (Semanas 3-6): Visión digital 3 años: Omnicanal (online + tiendas integradas), inventario tiempo real, decisiones basadas en datos. 24 iniciativas identificadas. Priorizadas en 3 olas' : 'Strategy (Weeks 3-6): 3-year digital vision: Omnichannel (online + integrated stores), real-time inventory, data-driven decisions. 24 initiatives identified. Prioritized in 3 waves'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Business Cases (Semanas 7-8): Top 8 iniciativas con ROI calculado. ROI consolidado 3 años: 180%' : 'Business Cases (Weeks 7-8): Top 8 initiatives with calculated ROI. Consolidated 3-year ROI: 180%'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-azul-marino dark:text-white mb-4">
                      {isEs ? 'Roadmap de 3 Olas' : '3-Wave Roadmap'}
                    </h4>
                    <div className="space-y-4 mb-6">
                      {[
                        { wave: isEs ? 'Ola 1 (Año 1 - $400K)' : 'Wave 1 (Year 1 - $400K)', items: ['E-commerce básico', 'Sistema de inventario unificado', 'Dashboard Power BI', 'CRM básico'] },
                        { wave: isEs ? 'Ola 2 (Año 2 - $600K)' : 'Wave 2 (Year 2 - $600K)', items: ['Omnicanal', 'ERP para retail', 'Automatización reabastecimiento', 'Analytics avanzado'] },
                        { wave: isEs ? 'Ola 3 (Año 3 - $500K)' : 'Wave 3 (Year 3 - $500K)', items: ['App móvil', 'Programa de lealtad', 'Personalización IA', 'Transformación cultural'] }
                      ].map((wave, idx) => (
                        <div key={idx} className="bg-white dark:bg-background p-4 rounded-xl border border-turquesa/20">
                          <div className="font-semibold text-azul-marino dark:text-white mb-2">{wave.wave}</div>
                          <ul className="space-y-1 text-sm text-foreground/70">
                            {wave.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-turquesa rounded-full" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: '15%', label: isEs ? 'E-commerce ventas' : 'E-commerce sales', sub: isEs ? '0% → 15%' : '0% → 15%' },
                        { value: '100%', label: isEs ? 'Visibilidad inventario' : 'Inventory visibility', sub: isEs ? 'Tiempo real' : 'Real time' },
                        { value: '80%', label: isEs ? 'Decisiones basadas en datos' : 'Data-driven decisions', sub: isEs ? '<10% → 80%' : '<10% → 80%' },
                        { value: '140%', label: isEs ? 'ROI Año 1' : 'Year 1 ROI', sub: isEs ? 'Superó proyección' : 'Exceeded projection' }
                      ].map((stat, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          className="bg-white dark:bg-background p-4 rounded-xl shadow-brand text-center"
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
                  </div>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                  {isEs 
                    ? '"Estrategia digital de Alternative nos dio claridad que no teníamos. Junta aprobó presupuesto porque vio plan sólido con ROI claro, no solo \'necesitamos tecnología\'."'
                    : '"Alternative\'s digital strategy gave us clarity we didn\'t have. Board approved budget because they saw solid plan with clear ROI, not just \'we need technology\'."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— CEO</span>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* =====================================================
          MADUREZ DIGITAL FRAMEWORK SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Los 5 niveles de madurez digital' : 'The 5 levels of digital maturity'}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              {isEs 
                ? '¿En qué nivel está tu empresa? Alternative te ayuda a avanzar 1-2 niveles en 12-24 meses.'
                : 'What level is your company at? Alternative helps you advance 1-2 levels in 12-24 months.'}
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-4">
            {maturityLevels.map((level, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-background p-6 rounded-2xl shadow-brand border-l-4 border-turquesa"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-turquesa/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-turquesa">{level.level}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                    {isEs ? 'NIVEL' : 'LEVEL'} {level.level}: {level.title}
                  </h3>
                </div>
                <p className="text-foreground/70 leading-relaxed">
                  {level.description}
                </p>
              </motion.div>
            ))}
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
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-turquesa/10 rounded-full blur-2xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs ? '¿Listo para desarrollar tu estrategia digital?' : 'Ready to develop your digital strategy?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Consulta de 30 minutos. Evaluamos situación actual y determinamos si estrategia digital completa es apropiada para tu caso.'
                  : '30-minute consultation. We evaluate current situation and determine if complete digital strategy is appropriate for your case.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Evaluación preliminar de madurez digital' : 'Preliminary digital maturity assessment',
                  isEs ? 'Identificación de desafíos digitales críticos' : 'Identification of critical digital challenges',
                  isEs ? 'Recomendación: estrategia completa vs iniciativas puntuales' : 'Recommendation: complete strategy vs specific initiatives',
                  isEs ? 'Alcance y timeline de desarrollo de estrategia' : 'Scope and timeline for strategy development',
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
                    {isEs ? 'Desarrollar Estrategia Digital' : 'Develop Digital Strategy'}
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

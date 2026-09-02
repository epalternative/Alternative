'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import { faqs as faqData } from '@/lib/content/faqs/servicios--desarrollo-tecnologia--consultoria-tecnologica';
import { localizeFaqs } from '@/lib/content/faqs';
import {
  Target,
  ArrowRight,
  ChevronDown,
  DollarSign,
  AlertTriangle,
  Building2 as Building,
  TrendingUp,
  CheckCircle2,
  Building2,
  Phone,
  Sparkles,
  Shield,
  Clock,
  Layers,
  Search,
  Calendar,
  Monitor,
  BookOpen,
  Users,
  Code,
  Zap,
  Database,
  Cloud,
  Brain,
  FileText,
  BarChart3,
  Award,
  GitBranch
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

export default function ConsultoriaTecnologicaPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Desarrollo & Tecnología' : 'Development & Technology', href: `/${locale}/servicios/desarrollo-tecnologia` },
    { label: isEs ? 'Consultoría Tecnológica' : 'Technology Consulting', href: null }
  ];

  const forWho = [
    {
      icon: DollarSign,
      title: isEs ? 'Inversión tecnológica significativa en evaluación' : 'Significant technology investment under evaluation',
      description: isEs
        ? 'Considerando inversión $100K+ en tecnología (ERP, CRM, plataforma). Decisión equivocada es muy costosa. Necesitas asesoría objetiva antes de comprometer.'
        : 'Considering $100K+ investment in technology (ERP, CRM, platform). Wrong decision is very costly. You need objective advisory before committing.',
      color: 'turquesa'
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'Múltiples opciones sin claridad de cuál elegir' : 'Multiple options without clarity on which to choose',
      description: isEs
        ? '5 vendors presentaron (SAP, Oracle, Microsoft, etc.). Todas prometen lo mismo. No sabes cómo evaluar objetivamente ni cuál es mejor para tu caso.'
        : '5 vendors presented (SAP, Oracle, Microsoft, etc.). All promise the same. You don\'t know how to evaluate objectively or which is best for your case.',
      color: 'menta'
    },
    {
      icon: Building,
      title: isEs ? 'Proyecto complejo sin claridad de arquitectura' : 'Complex project without architecture clarity',
      description: isEs
        ? 'Proyecto tecnológico grande (transformación digital, nueva plataforma) sin claridad de arquitectura técnica, tecnologías a usar, approach de implementación.'
        : 'Large technology project (digital transformation, new platform) without clarity on technical architecture, technologies to use, implementation approach.',
      color: 'violeta'
    },
    {
      icon: Target,
      title: isEs ? 'Decisión build vs buy sin análisis riguroso' : 'Build vs buy decision without rigorous analysis',
      description: isEs
        ? 'Debatiendo si desarrollar custom vs comprar software comercial. Necesitas análisis objetivo de TCO (Total Cost of Ownership), riesgos, pros/cons.'
        : 'Debating whether to develop custom vs buy commercial software. You need objective analysis of TCO (Total Cost of Ownership), risks, pros/cons.',
      color: 'turquesa'
    },
    {
      icon: GitBranch,
      title: isEs ? 'Sin roadmap tecnológico claro' : 'No clear technology roadmap',
      description: isEs
        ? 'Múltiples iniciativas tecnológicas sin secuencia lógica. No está claro qué hacer primero, qué después, cómo priorizar, presupuesto requerido.'
        : 'Multiple technology initiatives without logical sequence. Not clear what to do first, what after, how to prioritize, required budget.',
      color: 'menta'
    },
    {
      icon: Users,
      title: isEs ? 'Nuevo CTO/CIO necesita evaluación de landscape actual' : 'New CTO/CIO needs current landscape evaluation',
      description: isEs
        ? 'Nuevo líder tecnológico asumiendo. Necesita diagnóstico objetivo de situación tecnológica actual, gaps, oportunidades, recomendaciones.'
        : 'New technology leader assuming. Needs objective diagnosis of current technology situation, gaps, opportunities, recommendations.',
      color: 'violeta'
    }
  ];

  const consultingServices = [
    {
      title: isEs ? 'ARQUITECTURA DE SOLUCIONES' : 'SOLUTION ARCHITECTURE',
      description: isEs
        ? 'Diseño de arquitectura técnica completa para proyecto o plataforma: componentes, tecnologías, integraciones, infraestructura, seguridad.'
        : 'Complete technical architecture design for project or platform: components, technologies, integrations, infrastructure, security.',
      deliverable: isEs
        ? ['Diagrama de arquitectura de alto nivel', 'Stack tecnológico recomendado con justificación', 'Arquitectura de datos', 'Plan de seguridad y escalabilidad', 'Estimación de costos de infraestructura']
        : ['High-level architecture diagram', 'Recommended technology stack with justification', 'Data architecture', 'Security and scalability plan', 'Infrastructure cost estimation'],
      when: isEs
        ? 'Antes de iniciar proyecto tecnológico mayor, para asegurar arquitectura robusta y escalable.'
        : 'Before starting major technology project, to ensure robust and scalable architecture.',
      icon: Layers,
      color: 'turquesa'
    },
    {
      title: isEs ? 'SELECCIÓN DE TECNOLOGÍAS (BUILD VS BUY)' : 'TECHNOLOGY SELECTION (BUILD VS BUY)',
      description: isEs
        ? 'Análisis riguroso de opciones tecnológicas: comparación de software comercial vs desarrollo custom, evaluación de vendors, análisis TCO.'
        : 'Rigorous analysis of technology options: commercial software vs custom development comparison, vendor evaluation, TCO analysis.',
      deliverable: isEs
        ? ['Comparación detallada de opciones (matriz de evaluación)', 'Análisis TCO 5 años (Total Cost of Ownership)', 'Recomendación justificada con pros/cons', 'Plan de implementación preliminar']
        : ['Detailed option comparison (evaluation matrix)', '5-year TCO analysis (Total Cost of Ownership)', 'Justified recommendation with pros/cons', 'Preliminary implementation plan'],
      when: isEs
        ? 'Antes de comprometer inversión significativa en tecnología, para asegurar decisión óptima.'
        : 'Before committing significant investment in technology, to ensure optimal decision.',
      icon: Target,
      color: 'menta'
    },
    {
      title: isEs ? 'EVALUACIÓN Y SELECCIÓN DE VENDORS' : 'VENDOR EVALUATION AND SELECTION',
      description: isEs
        ? 'Proceso estructurado de evaluación de vendors tecnológicos: RFP, demos, evaluación técnica, negociación de contratos.'
        : 'Structured process of technology vendor evaluation: RFP, demos, technical evaluation, contract negotiation.',
      deliverable: isEs
        ? ['RFP (Request for Proposal) estructurado', 'Matriz de evaluación con criterios ponderados', 'Evaluación técnica de propuestas', 'Recomendación de vendor con análisis', 'Apoyo en negociación de contrato']
        : ['Structured RFP (Request for Proposal)', 'Evaluation matrix with weighted criteria', 'Technical evaluation of proposals', 'Vendor recommendation with analysis', 'Support in contract negotiation'],
      when: isEs
        ? 'Al evaluar ERP, CRM, plataformas enterprise donde hay 5+ vendors viables.'
        : 'When evaluating ERP, CRM, enterprise platforms where there are 5+ viable vendors.',
      icon: Award,
      color: 'violeta'
    },
    {
      title: isEs ? 'ROADMAP TECNOLÓGICO' : 'TECHNOLOGY ROADMAP',
      description: isEs
        ? 'Plan estratégico de tecnología 2-3 años: iniciativas priorizadas, secuencia lógica, presupuesto estimado, quick wins identificados.'
        : '2-3 year strategic technology plan: prioritized initiatives, logical sequence, estimated budget, identified quick wins.',
      deliverable: isEs
        ? ['Roadmap visual de iniciativas (timeline)', 'Priorización basada en impacto vs esfuerzo', 'Presupuesto estimado por iniciativa', 'Interdependencias identificadas', 'Business case preliminar de iniciativas top']
        : ['Visual roadmap of initiatives (timeline)', 'Prioritization based on impact vs effort', 'Estimated budget per initiative', 'Identified interdependencies', 'Preliminary business case of top initiatives'],
      when: isEs
        ? 'Al inicio de año fiscal, nuevo liderazgo tecnológico, o después de diagnóstico que identificó múltiples gaps.'
        : 'At start of fiscal year, new technology leadership, or after diagnosis that identified multiple gaps.',
      icon: GitBranch,
      color: 'turquesa'
    },
    {
      title: isEs ? 'DIAGNÓSTICO TECNOLÓGICO (IT AUDIT)' : 'TECHNOLOGY DIAGNOSIS (IT AUDIT)',
      description: isEs
        ? 'Evaluación completa de landscape tecnológico actual: aplicaciones, infraestructura, seguridad, procesos IT, capacidades, gaps.'
        : 'Complete evaluation of current technology landscape: applications, infrastructure, security, IT processes, capabilities, gaps.',
      deliverable: isEs
        ? ['Inventario de aplicaciones e infraestructura', 'Evaluación de arquitectura actual', 'Identificación de gaps y riesgos', 'Recomendaciones priorizadas', 'Roadmap de modernización']
        : ['Application and infrastructure inventory', 'Current architecture evaluation', 'Gap and risk identification', 'Prioritized recommendations', 'Modernization roadmap'],
      when: isEs
        ? 'Nuevo CTO/CIO asumiendo, preparación para transformación digital, o preocupación sobre "deuda técnica" acumulada.'
        : 'New CTO/CIO assuming, preparation for digital transformation, or concern about accumulated "technical debt".',
      icon: Search,
      color: 'menta'
    }
  ];

  const processPhases = [
    {
      phase: isEs ? 'DESCUBRIMIENTO' : 'DISCOVERY',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Entrevistas con stakeholders clave (CTO, líderes negocio, IT), Revisión de documentación existente, Entendimiento de contexto de negocio y objetivos, Definición de alcance y criterios de éxito, Identificación de restricciones (presupuesto, timing, políticas)'
        : 'Interviews with key stakeholders (CTO, business leaders, IT), Review of existing documentation, Understanding of business context and objectives, Scope and success criteria definition, Identification of constraints (budget, timing, policies)',
      icon: Search,
      deliverable: isEs ? 'Documento de contexto y alcance acordado' : 'Agreed context and scope document',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'ANÁLISIS Y EVALUACIÓN' : 'ANALYSIS AND EVALUATION',
      duration: isEs ? '2-4 semanas' : '2-4 weeks',
      description: isEs
        ? 'Investigación profunda de opciones/tecnologías, Benchmarking de mejores prácticas, Análisis técnico detallado, Análisis financiero (TCO, ROI), Evaluación de riesgos, Desarrollo de opciones/alternativas'
        : 'Deep research of options/technologies, Best practices benchmarking, Detailed technical analysis, Financial analysis (TCO, ROI), Risk evaluation, Development of options/alternatives',
      icon: BarChart3,
      deliverable: isEs ? 'Análisis completo con hallazgos' : 'Complete analysis with findings',
      color: 'menta'
    },
    {
      phase: isEs ? 'RECOMENDACIONES' : 'RECOMMENDATIONS',
      duration: isEs ? '1 semana' : '1 week',
      description: isEs
        ? 'Síntesis de análisis en recomendaciones accionables, Priorización de opciones, Desarrollo de roadmap de implementación, Business case de recomendación, Preparación de presentación ejecutiva'
        : 'Synthesis of analysis into actionable recommendations, Option prioritization, Implementation roadmap development, Recommendation business case, Executive presentation preparation',
      icon: Target,
      deliverable: isEs ? 'Documento de recomendaciones + presentación' : 'Recommendations document + presentation',
      color: 'violeta'
    },
    {
      phase: isEs ? 'PRESENTACIÓN Y APOYO' : 'PRESENTATION AND SUPPORT',
      duration: isEs ? '1 semana' : '1 week',
      description: isEs
        ? 'Presentación a liderazgo/junta, Q&A y refinamiento basado en feedback, Apoyo en toma de decisión, (Opcional) Apoyo en RFP o negociación con vendors, (Opcional) Acompañamiento en implementación'
        : 'Presentation to leadership/board, Q&A and refinement based on feedback, Support in decision making, (Optional) Support in RFP or vendor negotiation, (Optional) Accompaniment in implementation',
      icon: Users,
      deliverable: isEs ? 'Recomendaciones aprobadas + plan de acción' : 'Approved recommendations + action plan',
      color: 'turquesa'
    }
  ];

  const includes = [
    {
      title: isEs ? 'Análisis y Research' : 'Analysis and Research',
      icon: Search,
      items: isEs
        ? ['Research profundo de tecnologías/opciones', 'Benchmarking de mejores prácticas', 'Análisis técnico detallado', 'Evaluación de capacidades de vendors', 'Análisis de referencias (casos de éxito/fracaso)']
        : ['Deep research of technologies/options', 'Best practices benchmarking', 'Detailed technical analysis', 'Vendor capability evaluation', 'Reference analysis (success/failure cases)'],
      color: 'turquesa'
    },
    {
      title: isEs ? 'Evaluación Financiera' : 'Financial Evaluation',
      icon: BarChart3,
      items: isEs
        ? ['TCO (Total Cost of Ownership) 5 años', 'Análisis ROI y payback period', 'Comparación de costos entre opciones', 'Costos ocultos identificados', 'Análisis de riesgo financiero']
        : ['TCO (Total Cost of Ownership) 5 years', 'ROI and payback period analysis', 'Cost comparison between options', 'Identified hidden costs', 'Financial risk analysis'],
      color: 'menta'
    },
    {
      title: isEs ? 'Recomendaciones' : 'Recommendations',
      icon: Target,
      items: isEs
        ? ['Opciones evaluadas objetivamente', 'Recomendación justificada con evidencia', 'Pros/cons de cada alternativa', 'Plan de implementación preliminar', 'Roadmap de ejecución']
        : ['Objectively evaluated options', 'Evidence-justified recommendation', 'Pros/cons of each alternative', 'Preliminary implementation plan', 'Execution roadmap'],
      color: 'violeta'
    },
    {
      title: isEs ? 'Documentación' : 'Documentation',
      icon: BookOpen,
      items: isEs
        ? ['Documento completo de consultoría', 'Resumen ejecutivo', 'Presentación ejecutiva', 'Matrices de evaluación', 'Business cases']
        : ['Complete consulting document', 'Executive summary', 'Executive presentation', 'Evaluation matrices', 'Business cases'],
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '100%', label: isEs ? 'Objetividad (no vendemos tecnología específica)' : 'Objectivity (we don\'t sell specific technology)', icon: Target },
    { value: 'Expertise', label: isEs ? '15+ años experiencia en arquitectura de soluciones' : '15+ years experience in solution architecture', icon: Brain },
    { value: 'Evita', label: isEs ? 'Inversiones equivocadas ($100K-$500K desperdiciados)' : 'Wrong investments ($100K-$500K wasted)', icon: Shield },
    { value: 'Acelera', label: isEs ? 'Decisiones que tomarían 6 meses en 6 semanas' : 'Decisions that would take 6 months in 6 weeks', icon: Clock },
    { value: 'Riguroso', label: isEs ? 'Análisis basado en datos, no opiniones' : 'Data-based analysis, not opinions', icon: BarChart3 },
    { value: 'ROI', label: isEs ? 'Consultoría típicamente se paga sola evitando 1 error' : 'Consulting typically pays for itself avoiding 1 error', icon: TrendingUp }
  ];

  const consultingVsVendors = [
    { 
      aspect: isEs ? 'Objetividad' : 'Objectivity',
      consultant: isEs ? 'Alta (no vendemos tecnología específica)' : 'High (we don\'t sell specific technology)',
      vendor: isEs ? 'Baja (venden SU solución)' : 'Low (they sell THEIR solution)'
    },
    { 
      aspect: isEs ? 'Opciones evaluadas' : 'Options evaluated',
      consultant: isEs ? 'Múltiples (5-10 opciones)' : 'Multiple (5-10 options)',
      vendor: isEs ? 'Solo la suya' : 'Only theirs'
    },
    { 
      aspect: isEs ? 'Análisis TCO' : 'TCO analysis',
      consultant: isEs ? 'Riguroso e imparcial' : 'Rigorous and impartial',
      vendor: isEs ? 'Optimista (minimiza costos ocultos)' : 'Optimistic (minimizes hidden costs)'
    },
    { 
      aspect: isEs ? 'Recomendación' : 'Recommendation',
      consultant: isEs ? 'Lo mejor para tu caso' : 'Best for your case',
      vendor: isEs ? 'Su producto (siempre)' : 'Their product (always)'
    },
    { 
      aspect: isEs ? 'Conflicto de interés' : 'Conflict of interest',
      consultant: isEs ? 'Ninguno' : 'None',
      vendor: isEs ? 'Alto (comisión por venta)' : 'High (commission per sale)'
    },
    { 
      aspect: isEs ? 'Expertise multi-vendor' : 'Multi-vendor expertise',
      consultant: isEs ? 'Sí (experiencia con todos)' : 'Yes (experience with all)',
      vendor: isEs ? 'No (solo su producto)' : 'No (only their product)'
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
        currentService="desarrollo-tecnologia"
      />

      {/* =====================================================
          HERO SECTION - Unique Design with Roadmap/Architecture
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        {/* Background Pattern - Strategic Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(108, 196, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(108, 196, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
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
                    {isEs ? 'Consultoría Tecnológica' : 'Technology Consulting'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Desarrollo & Tecnología' : 'Development & Technology'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Asesoría estratégica para decisiones tecnológicas críticas'
                  : 'Strategic advisory for critical technology decisions'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Consultoría especializada en arquitectura de soluciones, selección de tecnologías, evaluación de vendors, roadmap tecnológico, decisiones build vs buy. Evita inversiones tecnológicas equivocadas con asesoría objetiva de expertos.'
                  : 'Specialized consulting in solution architecture, technology selection, vendor evaluation, technology roadmap, build vs buy decisions. Avoid wrong technology investments with objective expert advisory.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Solicita Consultoría Tecnológica' : 'Request Technology Consulting'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/recursos`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Descarga guía de arquitectura de soluciones' : 'Download solution architecture guide'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '30+', label: isEs ? 'consultorías tecnológicas' : 'technology consultancies' },
                  { value: 'Arquitecturas', label: isEs ? 'diseñadas por expertos' : 'designed by experts' },
                  { icon: true, label: isEs ? 'Decisiones basadas en análisis riguroso' : 'Decisions based on rigorous analysis' }
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

            {/* Right Visual - Roadmap/Architecture Floating */}
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
                  {/* Roadmap Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-turquesa" />
                    <div className="w-3 h-3 rounded-full bg-menta" />
                    <div className="w-3 h-3 rounded-full bg-violeta" />
                    <span className="ml-auto text-white/40 text-sm">
                      {isEs ? 'Roadmap Estratégico' : 'Strategic Roadmap'}
                    </span>
                  </div>

                  {/* Strategic Phases */}
                  <div className="space-y-3">
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

                  {/* Strategic Pillars */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    {[
                      { icon: Target, label: isEs ? 'Priorización' : 'Prioritization', color: 'turquesa' },
                      { icon: TrendingUp, label: isEs ? 'ROI' : 'ROI', color: 'menta' },
                      { icon: Zap, label: isEs ? 'Ejecución' : 'Execution', color: 'violeta' },
                      { icon: Award, label: isEs ? 'Valor' : 'Value', color: 'turquesa' }
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
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-turquesa rounded-2xl p-4 shadow-xl"
                >
                  <Brain className="w-8 h-8 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUÉ ES CONSULTORÍA TECNOLÓGICA SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs ? 'Consultoría: el "qué" y "cómo" antes del "hacer"' : 'Consulting: the "what" and "how" before the "do"'}
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs 
                    ? 'Consultoría tecnológica es asesoría estratégica especializada para tomar decisiones tecnológicas críticas: ¿Qué arquitectura de solución necesitamos? ¿Compramos software comercial o desarrollamos custom? ¿Qué tecnologías usar? ¿Qué vendor elegir entre 5 opciones? ¿Cómo estructurar nuestro roadmap tecnológico 3 años? Son decisiones de inversión significativa donde error es costoso.'
                    : 'Technology consulting is specialized strategic advisory to make critical technology decisions: What solution architecture do we need? Do we buy commercial software or develop custom? What technologies to use? Which vendor to choose among 5 options? How to structure our 3-year technology roadmap? These are significant investment decisions where error is costly.'}
                </p>
                <p>
                  {isEs 
                    ? 'El problema que resuelve: empresas enfrentan decisiones tecnológicas complejas sin expertise interno necesario. CTO/CIO debe decidir entre 10 opciones con información incompleta, presión de vendors, y consecuencias de equivocarse (dinero desperdiciado, años perdidos, operación afectada). Consultor tecnológico aporta: expertise especializado, experiencia en múltiples implementaciones, objetividad (no vendemos tecnología específica), metodología estructurada de evaluación.'
                    : 'The problem it solves: companies face complex technology decisions without necessary internal expertise. CTO/CIO must decide among 10 options with incomplete information, vendor pressure, and consequences of being wrong (wasted money, lost years, affected operation). Technology consultant provides: specialized expertise, experience in multiple implementations, objectivity (we don\'t sell specific technology), structured evaluation methodology.'}
                </p>
                <p>
                  {isEs 
                    ? 'Diferencia con vendors: Vendors (SAP, Salesforce, Microsoft) venden su solución. Consultores tecnológicos recomendamos lo mejor para TU caso específico, sin sesgo comercial. Diferencia con desarrollo: desarrollo ejecuta; consultoría define QUÉ ejecutar y CÓMO. Frecuentemente secuencia es: (1) Consultoría define estrategia, (2) Desarrollo ejecuta, (3) Soporte mantiene.'
                    : 'Difference with vendors: Vendors (SAP, Salesforce, Microsoft) sell their solution. Technology consultants we recommend what\'s best for YOUR specific case, without commercial bias. Difference with development: development executes; consulting defines WHAT to execute and HOW. Frequently sequence is: (1) Consulting defines strategy, (2) Development executes, (3) Support maintains.'}
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
              {isEs ? '¿Cuándo necesitas consultoría tecnológica?' : 'When do you need technology consulting?'}
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
          SERVICIOS DE CONSULTORÍA SECTION - 5 Cards
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '5 servicios de consultoría tecnológica' : '5 technology consulting services'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="space-y-6">
            {consultingServices.map((service, idx) => {
              const colors = colorClasses[service.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <div className="bg-blanco-hueso dark:bg-card p-8 rounded-2xl shadow-brand border border-gris-arena/20">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <service.icon className={`w-7 h-7 ${colors.text}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-azul-marino dark:text-white mb-2">
                          {service.title}
                        </h3>
                        <p className="text-foreground/70 mb-3 leading-relaxed">
                          {service.description}
                        </p>
                        <div className={`${colors.badge} text-xs font-medium px-3 py-1 rounded inline-block mb-3`}>
                          {isEs ? 'Cuándo:' : 'When:'} {service.when}
                        </div>
                        <div>
                          <div className={`${colors.text} font-semibold text-xs mb-2`}>
                            {isEs ? 'Entregable:' : 'Deliverable:'}
                          </div>
                          <ul className="space-y-1">
                            {service.deliverable.map((item, itemIdx) => (
                              <li key={itemIdx} className="text-foreground/60 text-sm flex items-start gap-2">
                                <div className={`w-1.5 h-1.5 ${colors.bg.replace('/10', '')} rounded-full mt-1.5 flex-shrink-0`} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          PROCESO DE CONSULTORÍA - Timeline 4 Fases
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Metodología de consultoría tecnológica' : 'Technology consulting methodology'}
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
              {isEs ? 'DURACIÓN TOTAL: 4-8 semanas típicamente' : 'TOTAL DURATION: 4-8 weeks typically'}
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
                      {isEs ? 'Consultoría evita inversión $350K en ERP equivocado' : 'Consulting avoids $350K investment in wrong ERP'}
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
                          ? 'Empresa manufacturera (200 empleados, $30M revenue)'
                          : 'Manufacturing company (200 employees, $30M revenue)'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Situación' : 'Situation'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'CEO convencido de que necesitaban SAP Business One ($200K implementación + $50K/año licencias). Presión de vendor SAP con 5 demos, promesas de "transformación digital". Junta directiva escéptica pero CEO empujando fuerte. CFO pidió segunda opinión objetiva antes de aprobar $350K (3 años).'
                          : 'CEO convinced they needed SAP Business One ($200K implementation + $50K/year licenses). SAP vendor pressure with 5 demos, "digital transformation" promises. Board skeptical but CEO pushing hard. CFO requested objective second opinion before approving $350K (3 years).'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solicitud a Alternative' : 'Request to Alternative'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Consultoría para validar si SAP Business One es opción correcta, o si hay alternativas mejores. Presupuesto consultoría: $15K.'
                          : 'Consulting to validate if SAP Business One is correct option, or if there are better alternatives. Consulting budget: $15K.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Proceso de Consultoría (6 semanas)' : 'Consulting Process (6 weeks)'}
                      </h4>
                      <div className="space-y-3 text-foreground/70 text-sm">
                        <div>
                          <strong className="text-azul-marino dark:text-white">{isEs ? 'Semana 1-2: Discovery' : 'Week 1-2: Discovery'}</strong>
                          <p className="mt-1">{isEs ? 'Entrevistas: CEO, CFO, COO, Director IT, Gerente Operaciones. Mapeo de procesos actuales y pain points. Definición de requisitos reales (vs lo que vendor prometió).' : 'Interviews: CEO, CFO, COO, IT Director, Operations Manager. Mapping of current processes and pain points. Definition of real requirements (vs what vendor promised).'}</p>
                        </div>
                        <div>
                          <strong className="text-azul-marino dark:text-white">{isEs ? 'Semana 3-4: Evaluación de Opciones' : 'Week 3-4: Option Evaluation'}</strong>
                          <p className="mt-1">{isEs ? 'Evaluamos 5 opciones: SAP Business One, NetSuite, Odoo, Microsoft Dynamics 365 Business Central, Desarrollo Custom. Criterios: Fit funcional, TCO 5 años, Complejidad implementación, Flexibilidad, Soporte local, Riesgo vendor lock-in.' : 'We evaluated 5 options: SAP Business One, NetSuite, Odoo, Microsoft Dynamics 365 Business Central, Custom Development. Criteria: Functional fit, 5-year TCO, Implementation complexity, Flexibility, Local support, Vendor lock-in risk.'}</p>
                        </div>
                        <div>
                          <strong className="text-azul-marino dark:text-white">{isEs ? 'Semana 5: Análisis TCO' : 'Week 5: TCO Analysis'}</strong>
                          <p className="mt-1">{isEs ? 'SAP: TCO 5 años $530K (Fit 70%). NetSuite: TCO 5 años $340K (Fit 85%). Odoo: TCO 5 años $160K (Fit 90%).' : 'SAP: 5-year TCO $530K (Fit 70%). NetSuite: 5-year TCO $340K (Fit 85%). Odoo: 5-year TCO $160K (Fit 90%).'}</p>
                        </div>
                        <div>
                          <strong className="text-azul-marino dark:text-white">{isEs ? 'Semana 6: Recomendaciones' : 'Week 6: Recommendations'}</strong>
                          <p className="mt-1">{isEs ? 'Hallazgos: SAP sobrepasado para necesidad real (60% funcionalidades no usarían), Vendor overselling, Odoo fit superior con TCO 70% menor. Recomendación: Odoo Community Edition con customizaciones específicas.' : 'Findings: SAP overkill for real need (60% features wouldn\'t use), Vendor overselling, Odoo superior fit with 70% lower TCO. Recommendation: Odoo Community Edition with specific customizations.'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-azul-marino dark:text-white mb-4">
                      {isEs ? 'Resultados' : 'Results'}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { value: '$370K', label: isEs ? 'Inversión evitada' : 'Investment avoided', sub: isEs ? 'Diferencia SAP vs Odoo' : 'SAP vs Odoo difference' },
                        { value: '25X', label: isEs ? 'Consultoría pagada' : 'Consulting paid', sub: isEs ? '$15K evitó $370K' : '$15K avoided $370K' },
                        { value: 'Odoo', label: isEs ? 'Implementado' : 'Implemented', sub: isEs ? '4 meses, $80K' : '4 months, $80K' },
                        { value: '90%', label: isEs ? 'Satisfacción' : 'Satisfaction', sub: isEs ? 'Cubre necesidades' : 'Covers needs' },
                        { value: 'Flexible', label: isEs ? 'Open source' : 'Open source', sub: isEs ? 'Sin vendor lock-in' : 'No vendor lock-in' }
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
                          ? 'Sin consultoría objetiva, hubieran implementado SAP porque "es SAP, debe ser bueno". $370K desperdiciados en sobrecapacidad e inflexibilidad.'
                          : 'Without objective consulting, they would have implemented SAP because "it\'s SAP, must be good". $370K wasted on overcapacity and inflexibility.'}
                      </p>
                    </div>
                  </div>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                  {isEs 
                    ? '"Consultoría de Alternative nos ahorró $370K en 5 años. Odoo con 70% menos costo hace más que lo que SAP hubiera hecho. Mejor inversión: $15K consultoría."'
                    : '"Alternative consulting saved us $370K in 5 years. Odoo with 70% less cost does more than what SAP would have done. Best investment: $15K consulting."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— {isEs ? 'CFO' : 'CFO'}</span>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* =====================================================
          CONSULTORÍA VS VENDORS SECTION - Tabla Comparativa
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Consultor independiente vs vendor tecnológico?' : 'Independent consultant vs technology vendor?'}
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white dark:bg-background rounded-2xl p-8 shadow-brand overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-4 text-foreground/60 font-medium bg-turquesa/10 
                                   border-b-2 border-turquesa/30 rounded-tl-lg">
                      {isEs ? 'Aspecto' : 'Aspect'}
                    </th>
                    <th className="text-left py-4 px-4 text-foreground/60 font-medium bg-menta/10 
                                   border-b-2 border-menta/30">
                      {isEs ? 'Consultor Independiente (Alternative)' : 'Independent Consultant (Alternative)'}
                    </th>
                    <th className="text-left py-4 px-4 text-foreground/60 font-medium bg-violeta/10 
                                   border-b-2 border-violeta/30 rounded-tr-lg">
                      {isEs ? 'Vendor Tecnológico (SAP, Salesforce, etc)' : 'Technology Vendor (SAP, Salesforce, etc)'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {consultingVsVendors.map((row, idx) => (
                    <tr key={idx} className={`border-b border-gris-arena/20 hover:bg-blanco-hueso/50 
                                              dark:hover:bg-card/50 transition-colors
                                              ${idx % 2 === 0 ? 'bg-white' : 'bg-blanco-hueso/30'}
                                              ${idx === consultingVsVendors.length - 1 ? 'border-b-0' : ''}`}>
                      <td className="py-4 px-4 text-azul-marino dark:text-white font-medium">
                        {row.aspect}
                      </td>
                      <td className="py-4 px-4 text-foreground/70">
                        {row.consultant}
                      </td>
                      <td className="py-4 px-4 text-foreground/70">
                        {row.vendor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-menta/10 p-6 rounded-2xl border border-menta/20">
                <h4 className="font-semibold text-azul-marino dark:text-white mb-3">
                  {isEs ? 'Cuándo usar consultor independiente:' : 'When to use independent consultant:'}
                </h4>
                <ul className="space-y-2 text-foreground/70 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Inversión significativa' : 'Significant investment'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Múltiples opciones viables' : 'Multiple viable options'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Necesitas objetividad sin sesgo comercial' : 'You need objectivity without commercial bias'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Decisión crítica donde error es muy costoso' : 'Critical decision where error is very costly'}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-turquesa/10 p-6 rounded-2xl border border-turquesa/20">
                <h4 className="font-semibold text-azul-marino dark:text-white mb-3">
                  {isEs ? 'Cuándo confiar en vendor:' : 'When to trust vendor:'}
                </h4>
                <ul className="space-y-2 text-foreground/70 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Ya decidiste la tecnología específica' : 'You already decided specific technology'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Solo necesitas implementación, no decisión' : 'You only need implementation, not decision'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Vendor tiene monopolio en tu industria (no hay alternativas)' : 'Vendor has monopoly in your industry (no alternatives)'}</span>
                  </li>
                </ul>
              </div>
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
                {isEs ? '¿Necesitas asesoría para decisión tecnológica crítica?' : 'Do you need advisory for critical technology decision?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Consulta inicial gratuita de 30 minutos. Entendemos tu situación y determinamos si consultoría tecnológica es apropiada.'
                  : 'Free initial 30-minute consultation. We understand your situation and determine if technology consulting is appropriate.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Evaluación de situación tecnológica actual' : 'Evaluation of current technology situation',
                  isEs ? 'Clarificación de necesidad y objetivos' : 'Clarification of need and objectives',
                  isEs ? 'Identificación de opciones preliminares' : 'Identification of preliminary options',
                  isEs ? 'Recomendación de alcance de consultoría' : 'Consulting scope recommendation',
                  isEs ? 'Propuesta de servicios' : 'Service proposal'
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
                    {isEs ? 'Solicitar Consultoría Tecnológica' : 'Request Technology Consulting'}
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

'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import {
  PenTool,
  ArrowRight,
  ChevronDown,
  FileText,
  Users,
  Building2,
  Settings,
  BarChart3,
  Target,
  Shield,
  Award,
  Layers,
  Search,
  Play,
  BookOpen,
  Phone,
  CheckCircle2,
  XCircle,
  Briefcase,
  Scale,
  Rocket,
  Monitor,
  Clock,
  TrendingUp,
  FileCheck
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

export default function DisenoProcesosPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Optimización de Procesos' : 'Process Optimization', href: `/${locale}/servicios/optimizacion-procesos` },
    { label: isEs ? 'Diseño de Procesos' : 'Process Design', href: null }
  ];

  // =====================================================
  // CONTENT DATA
  // =====================================================

  const problems = [
    {
      icon: XCircle,
      title: isEs ? 'Procesos inexistentes o desorganizados' : 'Non-existent or disorganized processes',
      description: isEs
        ? 'Operaciones basadas en "costumbres" sin documentación. Cada persona hace las cosas diferente. Imposible identificar problemas reales.'
        : 'Operations based on "customs" without documentation. Each person does things differently. Impossible to identify real problems.'
    },
    {
      icon: Layers,
      title: isEs ? 'Falta de estandarización entre equipos' : 'Lack of standardization between teams',
      description: isEs
        ? 'Lo que funciona en una ubicación no se replica en otra. Inconsistencia en calidad y tiempos entre áreas.'
        : 'What works in one location is not replicated in another. Inconsistency in quality and times between areas.'
    },
    {
      icon: Users,
      title: isEs ? 'Conocimiento en cabeza de personas clave' : 'Knowledge in key people\'s heads',
      description: isEs
        ? 'Si una persona se va, se lleva el conocimiento. Alto riesgo operacional. Onboarding toma meses sin documentación.'
        : 'If a person leaves, they take the knowledge. High operational risk. Onboarding takes months without documentation.'
    },
    {
      icon: Rocket,
      title: isEs ? 'Imposibilidad de escalar o certificarse' : 'Inability to scale or certify',
      description: isEs
        ? 'Quieres abrir sucursales pero no sabes cómo replicar. Necesitas ISO 9001 pero no tienes procesos documentados. ERP sin procesos definidos = fracaso.'
        : 'You want to open branches but don\'t know how to replicate. You need ISO 9001 but don\'t have documented processes. ERP without defined processes = failure.'
    }
  ];

  const methodology = [
    {
      step: 1,
      title: isEs ? 'LEVANTAMIENTO AS-IS' : 'AS-IS MAPPING',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Entendemos cómo funciona realmente hoy. Entrevistas, observación, mapeo visual del flujo actual.'
        : 'We understand how it really works today. Interviews, observation, visual mapping of current flow.',
      icon: Search,
      color: 'turquesa'
    },
    {
      step: 2,
      title: isEs ? 'ANÁLISIS DE BRECHAS' : 'GAP ANALYSIS',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Identificamos desperdicios, cuellos de botella, puntos de falla. Cuantificamos impacto.'
        : 'We identify waste, bottlenecks, failure points. We quantify impact.',
      icon: BarChart3,
      color: 'menta'
    },
    {
      step: 3,
      title: isEs ? 'DISEÑO TO-BE' : 'TO-BE DESIGN',
      duration: isEs ? '2-3 semanas' : '2-3 weeks',
      description: isEs
        ? 'Diseñamos proceso optimizado. Eliminamos pasos sin valor, clarificamos roles, establecemos controles.'
        : 'We design optimized process. We eliminate non-value steps, clarify roles, establish controls.',
      icon: PenTool,
      color: 'violeta'
    },
    {
      step: 4,
      title: isEs ? 'DOCUMENTACIÓN' : 'DOCUMENTATION',
      duration: isEs ? '2-3 semanas' : '2-3 weeks',
      description: isEs
        ? 'Generamos manuales, procedimientos, instructivos, diagramas BPMN, fichas de proceso, matrices RACI.'
        : 'We generate manuals, procedures, instructions, BPMN diagrams, process sheets, RACI matrices.',
      icon: FileText,
      color: 'turquesa'
    },
    {
      step: 5,
      title: isEs ? 'IMPLEMENTACIÓN' : 'IMPLEMENTATION',
      duration: isEs ? '4-6 semanas' : '4-6 weeks',
      description: isEs
        ? 'Capacitamos equipos, acompañamos adopción, auditamos, ajustamos basados en feedback.'
        : 'We train teams, accompany adoption, audit, adjust based on feedback.',
      icon: Play,
      color: 'menta'
    }
  ];

  const includes = [
    {
      title: isEs ? 'Análisis y Diseño' : 'Analysis & Design',
      icon: Search,
      items: isEs
        ? ['Inventario completo de procesos', 'Mapas AS-IS (actual) y TO-BE (optimizado)', 'Análisis de brechas y desperdicios', 'Plan de implementación']
        : ['Complete process inventory', 'AS-IS (current) and TO-BE (optimized) maps', 'Gap and waste analysis', 'Implementation plan'],
      color: 'turquesa'
    },
    {
      title: isEs ? 'Documentación Formal' : 'Formal Documentation',
      icon: FileText,
      items: isEs
        ? ['Manuales de procesos detallados', 'Procedimientos operativos estándar (SOP)', 'Instructivos de trabajo', 'Fichas de proceso', 'Diagramas BPMN', 'Matrices RACI']
        : ['Detailed process manuals', 'Standard Operating Procedures (SOP)', 'Work instructions', 'Process sheets', 'BPMN diagrams', 'RACI matrices'],
      color: 'menta'
    },
    {
      title: isEs ? 'Implementación' : 'Implementation',
      icon: Play,
      items: isEs
        ? ['Capacitación a equipos', 'Acompañamiento 30-60 días', 'Auditorías de adopción', 'Ajustes basados en feedback']
        : ['Team training', '30-60 day accompaniment', 'Adoption audits', 'Feedback-based adjustments'],
      color: 'violeta'
    },
    {
      title: isEs ? 'Adicional' : 'Additional',
      icon: FileCheck,
      items: isEs
        ? ['Manual de funciones por proceso', 'Formatos y plantillas operativas', 'Documentación editable (Word, Visio, Excel)']
        : ['Process function manual', 'Operational forms and templates', 'Editable documentation (Word, Visio, Excel)'],
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '100%', label: isEs ? 'Estandarización de procesos críticos' : 'Standardization of critical processes', icon: Layers },
    { value: '30-50%', label: isEs ? 'Reducción en tiempo de onboarding' : 'Reduction in onboarding time', icon: Clock },
    { value: 'ISO 9001', label: isEs ? 'Preparación completa para certificación' : 'Complete certification preparation', icon: Shield },
    { value: '∞', label: isEs ? 'Escalabilidad sin pérdida de calidad' : 'Scalability without quality loss', icon: Rocket },
    { value: '15-25%', label: isEs ? 'Identificación de ahorros' : 'Savings identification', icon: TrendingUp },
    { value: '✓', label: isEs ? 'Fundamento sólido para automatización' : 'Solid foundation for automation', icon: Monitor }
  ];

  const profiles = [
    {
      icon: Scale,
      title: isEs ? 'Certificación ISO 9001' : 'ISO 9001 Certification',
      description: isEs
        ? 'Necesitas certificarte para licitaciones o clientes corporativos. Sin documentación formal no pasas auditoría Stage 1.'
        : 'You need to certify for tenders or corporate clients. Without formal documentation you won\'t pass Stage 1 audit.',
      color: 'turquesa'
    },
    {
      icon: Rocket,
      title: isEs ? 'Escalamiento de operaciones' : 'Operations Scaling',
      description: isEs
        ? 'Abrir sucursales, franquiciar, crecer rápido. Sin procesos estandarizados cada ubicación "inventa" su forma.'
        : 'Open branches, franchise, grow fast. Without standardized processes each location "invents" its way.',
      color: 'menta'
    },
    {
      icon: Users,
      title: isEs ? 'Alta rotación o dependencia de personas clave' : 'High turnover or key person dependency',
      description: isEs
        ? 'Conocimiento institucional se pierde. Onboarding toma meses. Diseño captura conocimiento.'
        : 'Institutional knowledge is lost. Onboarding takes months. Design captures knowledge.',
      color: 'violeta'
    },
    {
      icon: Monitor,
      title: isEs ? 'Implementación de ERP próxima' : 'Upcoming ERP Implementation',
      description: isEs
        ? 'Implementar ERP sin procesos diseñados = causa #1 de fracaso. Primero diseña, luego tecnología.'
        : 'Implementing ERP without designed processes = #1 cause of failure. First design, then technology.',
      color: 'turquesa'
    }
  ];

  const faqs = [
    {
      question: isEs ? '¿Cómo determinan el alcance de diseño?' : 'How do you determine the design scope?',
      answer: isEs
        ? 'Varía según: cantidad de procesos, complejidad (# departamentos involucrados), nivel de documentación requerido (básico vs ISO), capacitación necesaria. Diagnóstico inicial dimensiona esfuerzo y presenta propuesta detallada.'
        : 'It varies according to: number of processes, complexity (# departments involved), documentation level required (basic vs ISO), training needed. Initial diagnosis sizes effort and presents detailed proposal.'
    },
    {
      question: isEs ? '¿Qué incluye un manual de procesos?' : 'What does a process manual include?',
      answer: isEs
        ? 'Objetivo, alcance, roles (RACI), descripción paso a paso, diagrama de flujo, entradas/salidas, documentos, KPIs, controles de calidad. Todo en formato editable.'
        : 'Objective, scope, roles (RACI), step-by-step description, flowchart, inputs/outputs, documents, KPIs, quality controls. All in editable format.'
    },
    {
      question: isEs ? '¿Necesito software especializado?' : 'Do I need specialized software?',
      answer: isEs
        ? 'No necesariamente. Word, Visio o PowerPoint son suficientes inicialmente. Para gestión continua existen herramientas BPM (Bizagi, Signavio). Entregamos en formatos estándar editables.'
        : 'Not necessarily. Word, Visio or PowerPoint are sufficient initially. For continuous management there are BPM tools (Bizagi, Signavio). We deliver in editable standard formats.'
    },
    {
      question: isEs ? '¿Cómo aseguran que procesos se implementen realmente?' : 'How do you ensure processes are actually implemented?',
      answer: isEs
        ? 'Involucramos ejecutores desde diseño, implementación gradual con quick wins, capacitación hands-on, auditorías de adopción a 30-60-90 días con ajustes basados en feedback.'
        : 'We involve executors from design, gradual implementation with quick wins, hands-on training, adoption audits at 30-60-90 days with feedback-based adjustments.'
    },
    {
      question: isEs ? '¿Puedo usar documentación para ISO 9001?' : 'Can I use documentation for ISO 9001?',
      answer: isEs
        ? 'Sí. Nuestra documentación cumple requisitos de "información documentada" de ISO 9001:2015. Clientes la usan como base para auditorías de certificación.'
        : 'Yes. Our documentation meets ISO 9001:2015 "documented information" requirements. Clients use it as a base for certification audits.'
    },
    {
      question: isEs ? '¿Incluyen perfiles de puesto?' : 'Do you include job profiles?',
      answer: isEs
        ? 'Incluimos Manual de Funciones por Proceso (matriz RACI: quién hace qué en el flujo). Diferente de perfiles de RR.HH. (competencias, educación). Nuestro enfoque define roles desde procesos de negocio.'
        : 'We include Process Function Manual (RACI matrix: who does what in the flow). Different from HR profiles (competencies, education). Our approach defines roles from business processes.'
    }
  ];

  const colorClasses = {
    turquesa: { bg: 'bg-turquesa/10', text: 'text-turquesa', border: 'border-turquesa/20', solid: 'bg-turquesa' },
    menta: { bg: 'bg-menta/10', text: 'text-menta', border: 'border-menta/20', solid: 'bg-menta' },
    violeta: { bg: 'bg-violeta/10', text: 'text-violeta', border: 'border-violeta/20', solid: 'bg-violeta' }
  };

  return (
    <>
      {/* Reading Progress Indicator */}
      <ReadingProgress />

      {/* Service Sidebar */}
      <ServiceSidebar 
        locale={locale} 
        currentService="optimizacion-procesos"
      />

      {/* =====================================================
          HERO SECTION
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[10%] w-40 h-40 bg-violeta/5 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[5%] w-32 h-32 bg-turquesa/5 rounded-full blur-xl"
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
                    <span className="text-violeta font-medium">{crumb.label}</span>
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
                <div className="w-16 h-16 bg-violeta/20 rounded-2xl flex items-center justify-center
                                border border-violeta/30">
                  <PenTool className="w-8 h-8 text-violeta" />
                </div>
                <div>
                  <span className="text-violeta text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Diseño de Procesos Empresariales' : 'Business Process Design'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Optimización de Procesos' : 'Process Optimization'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Diseñamos procesos escalables que impulsan crecimiento sostenible'
                  : 'We design scalable processes that drive sustainable growth'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Diseño y rediseño de procesos con metodología estructurada. Procesos documentados, estandarizados y optimizados para escalabilidad, certificación ISO y eficiencia operativa.'
                  : 'Process design and redesign with structured methodology. Documented, standardized, and optimized processes for scalability, ISO certification, and operational efficiency.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-violeta text-white 
                             font-semibold px-6 py-3 rounded-lg hover:bg-lavanda 
                             transition-all duration-300 shadow-lg shadow-violeta/20 group"
                >
                  {isEs ? 'Evalúa tu Madurez de Procesos' : 'Evaluate Your Process Maturity'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/recursos`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Descarga plantilla de mapeo' : 'Download mapping template'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '50+', label: isEs ? 'procesos diseñados' : 'processes designed' },
                  { value: 'ISO 9001', label: isEs ? 'especialistas' : 'specialists' },
                  { value: '25-40%', label: isEs ? 'reducción costos' : 'cost reduction' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-violeta font-bold">{stat.value}</span>
                    <span className="text-white/60 text-sm">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual - Process Flow */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <div className="text-center mb-6">
                  <h3 className="text-white font-semibold text-lg mb-2">
                    AS-IS → TO-BE
                  </h3>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Transformación de procesos' : 'Process transformation'}
                  </p>
                </div>
                
                {/* Before/After Visual */}
                <div className="grid grid-cols-2 gap-4">
                  {/* AS-IS */}
                  <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                    <div className="text-red-400 text-sm font-medium mb-3">AS-IS</div>
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ width: 0 }}
                          animate={{ width: `${60 + Math.random() * 40}%` }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="h-2 bg-red-500/30 rounded"
                        />
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-red-400/60">
                      {isEs ? '❌ Desorganizado' : '❌ Disorganized'}
                    </div>
                  </div>
                  
                  {/* TO-BE */}
                  <div className="bg-turquesa/10 rounded-xl p-4 border border-turquesa/20">
                    <div className="text-turquesa text-sm font-medium mb-3">TO-BE</div>
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                          className="h-2 bg-turquesa/40 rounded"
                        />
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-turquesa/60">
                      {isEs ? '✓ Optimizado' : '✓ Optimized'}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center my-4">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-violeta"
                  >
                    <ArrowRight className="w-8 h-8" />
                  </motion.div>
                </div>

                {/* Result */}
                <div className="bg-violeta/10 rounded-xl p-4 border border-violeta/20 text-center">
                  <div className="text-violeta font-medium mb-1">
                    {isEs ? 'Resultado' : 'Result'}
                  </div>
                  <div className="text-white/80 text-sm">
                    {isEs ? 'Documentado • Estandarizado • Escalable' : 'Documented • Standardized • Scalable'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT IS PROCESS DESIGN SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-violeta/10 text-violeta 
                               rounded-full text-sm font-medium mb-4">
                {isEs ? '¿Qué es?' : 'What is it?'}
              </span>
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs 
                  ? 'Diseño estructurado vs procesos informales'
                  : 'Structured design vs informal processes'}
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="space-y-6 text-foreground/70 leading-relaxed">
                <p className="text-lg">
                  {isEs 
                    ? 'Diseño de procesos es crear procesos nuevos desde cero o rediseñar completamente procesos existentes con metodología estructurada. Incluye: mapeo, análisis, diseño optimizado, documentación formal, roles definidos e implementación.'
                    : 'Process design is creating new processes from scratch or completely redesigning existing processes with structured methodology. Includes: mapping, analysis, optimized design, formal documentation, defined roles, and implementation.'}
                </p>
                <p>
                  <strong className="text-azul-marino dark:text-white">
                    {isEs ? 'Diferencia clave:' : 'Key difference:'}
                  </strong>{' '}
                  {isEs 
                    ? 'No es solo dibujar diagramas. Es diseñar procesos que realmente funcionan, documentar pragmáticamente (no burocráticamente), y asegurar adopción del equipo.'
                    : 'It\'s not just drawing diagrams. It\'s designing processes that actually work, documenting pragmatically (not bureaucratically), and ensuring team adoption.'}
                </p>
                <p>
                  <strong className="text-azul-marino dark:text-white">
                    {isEs ? 'Cuándo lo necesitas:' : 'When you need it:'}
                  </strong>{' '}
                  {isEs 
                    ? 'Procesos inexistentes o desorganizados, necesidad de certificación ISO 9001, escalamiento de operaciones (nuevas sucursales), alta rotación de personal, implementación de ERP próxima.'
                    : 'Non-existent or disorganized processes, need for ISO 9001 certification, operations scaling (new branches), high staff turnover, upcoming ERP implementation.'}
                </p>
              </div>
            </AnimatedSection>

            {/* Visual indicator */}
            <AnimatedSection delay={0.2} className="mt-8">
              <div className="bg-violeta/10 rounded-2xl p-6 border border-violeta/20 text-center">
                <p className="text-violeta font-medium">
                  {isEs 
                    ? '📐 Incluye diseño nuevo + rediseño/reingeniería de existentes'
                    : '📐 Includes new design + redesign/reengineering of existing'}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROBLEM SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs 
                ? '¿Cuándo diseño formal de procesos es crítico?'
                : 'When is formal process design critical?'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {problems.map((problem, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-background p-6 rounded-2xl border border-gris-arena/20 
                             hover:shadow-brand transition-all duration-300 h-full"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-500/10 rounded-xl 
                                    flex items-center justify-center">
                      <problem.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-2">
                        ❌ {problem.title}
                      </h3>
                      <p className="text-foreground/70 text-sm leading-relaxed">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          METHODOLOGY SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-violeta/10 text-violeta 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Metodología' : 'Methodology'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Cómo diseñamos procesos que funcionan' : 'How we design processes that work'}
            </h2>
          </AnimatedSection>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-turquesa via-menta to-violeta hidden md:block" />

              <div className="space-y-8">
                {methodology.map((step, idx) => {
                  const colors = colorClasses[step.color as keyof typeof colorClasses];
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="relative flex gap-6"
                    >
                      {/* Step number circle */}
                      <div className={`flex-shrink-0 w-16 h-16 ${colors.solid} rounded-2xl 
                                      flex items-center justify-center text-white font-bold text-xl
                                      shadow-lg z-10`}>
                        {step.step}
                      </div>

                      {/* Content */}
                      <motion.div
                        whileHover={{ y: -3 }}
                        className="flex-1 bg-blanco-hueso dark:bg-card rounded-2xl p-6 
                                   border border-gris-arena/20 hover:shadow-brand transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className={`font-semibold ${colors.text}`}>
                            {step.title}
                          </h3>
                          <span className="text-sm text-foreground/60 bg-white dark:bg-background 
                                         px-3 py-1 rounded-full">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-foreground/70 leading-relaxed">
                          {step.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT'S INCLUDED SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Entregables' : 'Deliverables'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Qué incluye nuestro servicio' : 'What our service includes'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {includes.map((item, idx) => {
              const colors = colorClasses[item.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-white dark:bg-background p-8 rounded-2xl shadow-brand 
                                hover:shadow-brand-lg transition-all duration-300
                                border-t-4 ${colors.border.replace('/20', '')}`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 ${colors.bg} rounded-xl 
                                      flex items-center justify-center`}>
                        <item.icon className={`w-7 h-7 ${colors.text}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                        {item.title}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {item.items.map((listItem, listIdx) => (
                        <li key={listIdx} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                          <span className="text-foreground/70">{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          BENEFITS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-azul-marino">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              {isEs ? 'Beneficios de diseñar procesos' : 'Benefits of process design'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 
                             hover:bg-white/10 transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 bg-violeta/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-violeta" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-violeta mb-2">
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
          CASE STUDY SECTION - HIDDEN FOR VALIDATION
          ===================================================== */}
      {false && (
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-blanco-hueso dark:bg-card rounded-3xl p-8 lg:p-12 overflow-hidden relative">
              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-violeta/5 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-violeta/20 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-violeta" />
                  </div>
                  <div>
                    <span className="text-violeta font-medium text-sm uppercase tracking-wider">
                      {isEs ? 'Caso de Éxito' : 'Success Story'}
                    </span>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                      {isEs 
                        ? 'Manufactura prepara certificación ISO 9001'
                        : 'Manufacturing prepares ISO 9001 certification'}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left - Description */}
                  <div>
                    <div className="mb-4">
                      <p className="text-sm text-foreground/60 mb-2">
                        {isEs ? 'Empresa de empaques • 80 empleados' : 'Packaging company • 80 employees'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Desafío' : 'Challenge'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Cliente corporativo requería ISO 9001 para continuar relación (60% ingresos). 6 meses de plazo. Procesos completamente informales, sin documentación.'
                          : 'Corporate client required ISO 9001 to continue relationship (60% revenue). 6-month deadline. Completely informal processes, no documentation.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución' : 'Solution'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Levantamiento de 12 procesos críticos, diseño optimizado, documentación completa (12 manuales, 40+ procedimientos), implementación y capacitación en 12 semanas.'
                          : '12 critical processes mapping, optimized design, complete documentation (12 manuals, 40+ procedures), implementation and training in 12 weeks.'}
                      </p>
                    </div>

                    <blockquote className="border-l-4 border-violeta pl-4 italic text-foreground/70">
                      {isEs 
                        ? '"ISO 9001 nos hizo más eficientes, no más burocráticos. Hoy cualquier operador sigue el proceso estándar sin depender del gerente."'
                        : '"ISO 9001 made us more efficient, not more bureaucratic. Today any operator follows the standard process without depending on the manager."'}
                      <span className="block mt-2 text-sm text-violeta not-italic font-medium">
                        — {isEs ? 'Gerente General' : 'General Manager'}
                      </span>
                    </blockquote>
                  </div>

                  {/* Right - Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '5.5', label: isEs ? 'meses' : 'months', sub: isEs ? 'certificación lograda' : 'certification achieved' },
                      { value: '0', label: isEs ? 'no conformidades' : 'non-conformities', sub: isEs ? 'mayores en auditoría' : 'major in audit' },
                      { value: '$45K', label: isEs ? 'ahorros/año' : 'savings/year', sub: isEs ? 'por eliminación retrabajos' : 'by eliminating rework' },
                      { value: '66%', label: isEs ? 'reducción' : 'reduction', sub: isEs ? 'onboarding: 6→2 semanas' : 'onboarding: 6→2 weeks' },
                      { value: '3', label: isEs ? 'años' : 'years', sub: isEs ? 'contrato renovado' : 'contract renewed' },
                      { value: '12', label: isEs ? 'manuales' : 'manuals', sub: isEs ? '40+ procedimientos' : '40+ procedures' }
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white dark:bg-background p-4 rounded-2xl shadow-brand text-center"
                      >
                        <div className="text-2xl font-bold text-violeta mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm font-medium text-azul-marino dark:text-white">
                          {stat.label}
                        </div>
                        <div className="text-xs text-foreground/50">{stat.sub}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* =====================================================
          WHO IS IT FOR SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '4 situaciones donde diseño de procesos es crítico' : '4 situations where process design is critical'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {profiles.map((profile, idx) => {
              const colors = colorClasses[profile.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`bg-white dark:bg-background p-8 rounded-2xl shadow-brand 
                                hover:shadow-brand-lg transition-all duration-300 h-full
                                border-l-4 ${colors.border.replace('/20', '')}`}
                  >
                    <div className={`w-14 h-14 ${colors.bg} rounded-2xl 
                                    flex items-center justify-center mb-6`}>
                      <profile.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                      {profile.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {profile.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          FAQ SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
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
      <section className="py-20 lg:py-28 bg-violeta relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-turquesa/10 rounded-full blur-2xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs ? '¿Listo para diseñar procesos escalables?' : 'Ready to design scalable processes?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Diagnóstico de 30 minutos. Analizamos madurez de tus procesos y estimamos esfuerzo y timeline.'
                  : '30-minute diagnosis. We analyze your process maturity and estimate effort and timeline.'}
              </p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Diagnóstico de madurez de procesos' : 'Process maturity diagnosis',
                  isEs ? 'Identificación de procesos críticos' : 'Identification of critical processes',
                  isEs ? 'Estimación de esfuerzo y timeline' : 'Effort and timeline estimation',
                  isEs ? '3 recomendaciones inmediatas' : '3 immediate recommendations'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/${locale}/contacto`}
                    className="inline-flex items-center gap-3 bg-white text-violeta 
                               font-semibold px-8 py-4 rounded-lg hover:bg-menta hover:text-azul-marino
                               transition-all duration-300 shadow-lg group"
                  >
                    {isEs ? 'Solicitar Diagnóstico' : 'Request Diagnosis'}
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

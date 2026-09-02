'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import {
  Cpu,
  ArrowRight,
  ChevronDown,
  Laptop,
  RefreshCw,
  Users,
  BarChart3,
  Target,
  TrendingUp,
  CheckCircle2,
  Building2,
  Phone,
  AlertTriangle,
  Zap,
  FileText,
  Database,
  Sparkles,
  Shield,
  Clock,
  XCircle
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

export default function TransformacionDigitalPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // =====================================================
  // CONTENT DATA
  // =====================================================

  const problems = [
    {
      icon: Laptop,
      title: isEs ? 'Tecnología sin estrategia de negocio' : 'Technology without business strategy',
      description: isEs 
        ? 'Compran CRM, ERP, BI sin entender QUÉ problema de negocio resuelven. Resultado: software costoso subutilizado, sin ROI demostrable.'
        : 'They buy CRM, ERP, BI without understanding WHAT business problem they solve. Result: expensive underutilized software, no demonstrable ROI.'
    },
    {
      icon: RefreshCw,
      title: isEs ? 'Digitalizar procesos malos' : 'Digitizing bad processes',
      description: isEs
        ? 'Automatizan procesos ineficientes existentes. Resultado: ineficiencia automatizada más rápida. Primero optimiza, luego digitaliza.'
        : 'They automate existing inefficient processes. Result: faster automated inefficiency. First optimize, then digitize.'
    },
    {
      icon: Users,
      title: isEs ? 'Ignorar gestión del cambio' : 'Ignoring change management',
      description: isEs
        ? 'Implementan tecnología sin preparar a la gente. Resistencia masiva, adopción baja. Tecnología perfecta que nadie usa.'
        : 'They implement technology without preparing people. Massive resistance, low adoption. Perfect technology that no one uses.'
    },
    {
      icon: BarChart3,
      title: isEs ? 'No medir impacto de negocio' : 'Not measuring business impact',
      description: isEs
        ? 'Lanzan "iniciativas digitales" sin KPIs claros ni ROI medible. No saben si transformación realmente generó valor o fue gasto sin retorno.'
        : 'They launch "digital initiatives" without clear KPIs or measurable ROI. They don\'t know if transformation really generated value or was expense without return.'
    }
  ];

  const services = [
    {
      icon: Target,
      title: isEs ? 'Estrategia Digital' : 'Digital Strategy',
      description: isEs
        ? 'Desarrollo de hoja de ruta digital alineada a objetivos de negocio. Definimos DÓNDE invertir, QUÉ tecnologías priorizar, CÓMO generar valor medible.'
        : 'Development of digital roadmap aligned to business objectives. We define WHERE to invest, WHAT technologies to prioritize, HOW to generate measurable value.',
      forWho: isEs
        ? 'Empresas iniciando transformación sin claridad de por dónde empezar, organizaciones con múltiples iniciativas digitales descoordinadas'
        : 'Companies starting transformation without clarity on where to start, organizations with multiple uncoordinated digital initiatives',
      result: isEs
        ? 'Estrategia digital 2-3 años + roadmap de implementación + business cases de iniciativas prioritarias'
        : '2-3 year digital strategy + implementation roadmap + business cases for priority initiatives',
      href: `/${locale}/servicios/transformacion-digital/estrategia-digital`,
      color: 'turquesa'
    },
    {
      icon: Zap,
      title: isEs ? 'Digitalización de Procesos' : 'Process Digitization',
      description: isEs
        ? 'Optimización y automatización de procesos de negocio con tecnología. RPA, workflows digitales, integraciones, eliminación de papel.'
        : 'Optimization and automation of business processes with technology. RPA, digital workflows, integrations, paper elimination.',
      forWho: isEs
        ? 'Empresas con procesos manuales intensivos, organizaciones con sistemas desconectados, necesidad de eficiencia operacional'
        : 'Companies with intensive manual processes, organizations with disconnected systems, need for operational efficiency',
      result: isEs
        ? 'Procesos digitalizados + 40-60% reducción en tiempos + eliminación de trabajo manual repetitivo'
        : 'Digitized processes + 40-60% time reduction + elimination of repetitive manual work',
      href: `/${locale}/servicios/transformacion-digital/digitalizacion-procesos`,
      color: 'menta'
    },
    {
      icon: Users,
      title: isEs ? 'Change Management' : 'Change Management',
      description: isEs
        ? 'Gestión del cambio organizacional para asegurar adopción de tecnología y nuevas formas de trabajo. Comunicación, capacitación, gestión de resistencias.'
        : 'Organizational change management to ensure technology adoption and new ways of working. Communication, training, resistance management.',
      forWho: isEs
        ? 'Proyectos de transformación complejos, organizaciones con alta resistencia al cambio, culturas tradicionales'
        : 'Complex transformation projects, organizations with high resistance to change, traditional cultures',
      result: isEs
        ? '80%+ adopción de nuevas tecnologías + resistencia gestionada efectivamente + cultura digital fortalecida'
        : '80%+ adoption of new technologies + effectively managed resistance + strengthened digital culture',
      href: `/${locale}/servicios/transformacion-digital/change-management`,
      color: 'violeta'
    },
    {
      icon: BarChart3,
      title: isEs ? 'Análisis de Datos' : 'Data Analysis',
      description: isEs
        ? 'Implementación de capacidades de análisis de datos (BI, dashboards, analytics). Decisiones basadas en datos, visibilidad en tiempo real.'
        : 'Implementation of data analysis capabilities (BI, dashboards, analytics). Data-driven decisions, real-time visibility.',
      forWho: isEs
        ? 'Empresas con datos dispersos sin análisis, organizaciones que deciden por intuición vs datos, necesidad de visibilidad ejecutiva'
        : 'Companies with scattered data without analysis, organizations that decide by intuition vs data, need for executive visibility',
      result: isEs
        ? 'Dashboards ejecutivos operando + decisiones basadas en datos + visibilidad tiempo real de negocio'
        : 'Operating executive dashboards + data-driven decisions + real-time business visibility',
      href: `/${locale}/servicios/transformacion-digital/analisis-datos`,
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '40-60%', label: isEs ? 'Reducción en tiempos de procesos digitalizados' : 'Reduction in digitized process times', icon: Clock },
    { value: '30-50%', label: isEs ? 'Reducción en costos operacionales' : 'Reduction in operational costs', icon: TrendingUp },
    { value: '80%+', label: isEs ? 'Mejora en disponibilidad de información para decisiones' : 'Improvement in information availability for decisions', icon: Database },
    { value: '6-12', label: isEs ? 'meses ROI Medible' : 'months Measurable ROI', icon: Target },
    { value: '100%', label: isEs ? 'Visibilidad en tiempo real de operaciones' : 'Real-time operations visibility', icon: BarChart3 },
    { value: '85%+', label: isEs ? 'Adopción cuando change management se gestiona bien' : 'Adoption when change management is well managed', icon: Users }
  ];

  const faqs = [
    {
      question: isEs ? '¿Cómo determinan alcance y costo de transformación digital?' : 'How do you determine scope and cost of digital transformation?',
      answer: isEs
        ? 'Transformación digital varía enormemente según: tamaño de organización, madurez digital actual, complejidad de procesos, sistemas legacy existentes, cultura organizacional, urgencia. Realizamos evaluación de madurez digital gratuita que diagnostica estado actual, identifica oportunidades prioritarias, desarrolla roadmap con ROI proyectado y presenta propuesta por fases.'
        : 'Digital transformation varies enormously according to: organization size, current digital maturity, process complexity, existing legacy systems, organizational culture, urgency. We conduct a free digital maturity assessment that diagnoses current state, identifies priority opportunities, develops roadmap with projected ROI and presents proposal by phases.'
    },
    {
      question: isEs ? '¿Por dónde empezar transformación digital?' : 'Where to start digital transformation?',
      answer: isEs
        ? 'Recomendamos enfoque por olas con quick wins tempranos: Ola 1 (primeros 3-6 meses): Iniciativas de alto impacto y bajo esfuerzo (ej: digitalizar proceso manual crítico, dashboard ejecutivo). Genera momentum y credibilidad. Ola 2 (meses 6-12): Iniciativas de impacto medio y mayor complejidad (ej: implementar CRM, integrar sistemas). Ola 3 (año 2+): Transformación profunda (ej: nuevos modelos de negocio digital). Nunca "big bang"; siempre iterativo y incremental.'
        : 'We recommend a wave approach with early quick wins: Wave 1 (first 3-6 months): High impact and low effort initiatives (e.g.: digitize critical manual process, executive dashboard). Generates momentum and credibility. Wave 2 (months 6-12): Medium impact and greater complexity initiatives (e.g.: implement CRM, integrate systems). Wave 3 (year 2+): Deep transformation (e.g.: new digital business models). Never "big bang"; always iterative and incremental.'
    },
    {
      question: isEs ? '¿Alternative provee solo estrategia o también implementa tecnología?' : 'Does Alternative provide only strategy or also implement technology?',
      answer: isEs
        ? 'Ambos. Somos consultora con capacidad de ejecución, no solo PowerPoint. Estrategia: Sí, desarrollamos hoja de ruta digital, business cases, priorizaciones. Implementación: Sí, ejecutamos: digitalización de procesos, implementación de herramientas (CRM, BI, automatización), integraciones, change management. Diferencia vs consultoras grandes: no solo recomendamos; ejecutamos y acompañamos hasta ver resultados. Diferencia vs vendors de software: no vendemos tecnología específica; recomendamos lo mejor para tu caso.'
        : 'Both. We are a consultancy with execution capacity, not just PowerPoint. Strategy: Yes, we develop digital roadmap, business cases, prioritizations. Implementation: Yes, we execute: process digitization, tool implementation (CRM, BI, automation), integrations, change management. Difference vs large consultancies: we don\'t just recommend; we execute and accompany until seeing results. Difference vs software vendors: we don\'t sell specific technology; we recommend the best for your case.'
    },
    {
      question: isEs ? '¿Qué tecnologías recomiendan típicamente?' : 'What technologies do you typically recommend?',
      answer: isEs
        ? 'Depende del caso pero tecnologías comunes en nuestros proyectos: Procesos: RPA (UiPath, Power Automate), workflows (Monday, Asana). Datos/BI: Power BI, Tableau, Google Data Studio. CRM: HubSpot, Salesforce, Zoho. ERP: Para PYMES - Odoo, SAP Business One, Microsoft Dynamics. Cloud: Microsoft Azure, AWS, Google Cloud. Colaboración: Microsoft 365, Google Workspace, Slack. No vendemos licencias ni tenemos compromisos con vendors; recomendación es objetiva según necesidad y presupuesto.'
        : 'Depends on the case but common technologies in our projects: Processes: RPA (UiPath, Power Automate), workflows (Monday, Asana). Data/BI: Power BI, Tableau, Google Data Studio. CRM: HubSpot, Salesforce, Zoho. ERP: For SMEs - Odoo, SAP Business One, Microsoft Dynamics. Cloud: Microsoft Azure, AWS, Google Cloud. Collaboration: Microsoft 365, Google Workspace, Slack. We don\'t sell licenses or have commitments with vendors; recommendation is objective according to need and budget.'
    },
    {
      question: isEs ? '¿Transformación digital aplica a empresas pequeñas o solo grandes?' : 'Does digital transformation apply to small companies or only large ones?',
      answer: isEs
        ? 'Aplica a TODAS, pero alcance varía. PYME (10-50 empleados): Digitalización de procesos críticos, herramientas cloud básicas, dashboards sencillos. Impacto: significativo (eliminan mucho trabajo manual). Mediana (50-250 empleados): Transformación más completa, sistemas integrados, análisis de datos robusto. Grande (250+ empleados): Transformación organizacional completa, cambio cultural profundo, múltiples olas. Evaluamos y proponemos alcance realista según tamaño y presupuesto.'
        : 'Applies to ALL, but scope varies. SME (10-50 employees): Digitization of critical processes, basic cloud tools, simple dashboards. Impact: significant (they eliminate much manual work). Medium (50-250 employees): More complete transformation, integrated systems, robust data analysis. Large (250+ employees): Complete organizational transformation, deep cultural change, multiple waves. We evaluate and propose realistic scope according to size and budget.'
    },
    {
      question: isEs ? '¿Cuánto tiempo toma ver resultados/ROI de transformación digital?' : 'How long does it take to see results/ROI from digital transformation?',
      answer: isEs
        ? 'Quick wins: 1-3 meses (ej: digitalizar proceso manual específico, dashboard inicial). Resultados significativos: 6-12 meses (ej: reducción costos operacionales, mejora en eficiencia medible). ROI positivo: Típicamente 12-18 meses (inversión recuperada + beneficios empiezan a acumularse). Transformación completa: 2-3 años para cambio cultural profundo y adopción total. Importante: trabajamos en sprints con entregables cada 2-4 semanas; no esperamos año completo para mostrar progreso. Transparencia total de avances desde mes 1.'
        : 'Quick wins: 1-3 months (e.g.: digitize specific manual process, initial dashboard). Significant results: 6-12 months (e.g.: operational cost reduction, measurable efficiency improvement). Positive ROI: Typically 12-18 months (investment recovered + benefits begin to accumulate). Complete transformation: 2-3 years for deep cultural change and total adoption. Important: we work in sprints with deliverables every 2-4 weeks; we don\'t wait a full year to show progress. Total transparency of advances from month 1.'
    }
  ];

  const comparisonTable = [
    { 
      aspect: isEs ? 'Definición' : 'Definition',
      digitalizacion: isEs ? 'Automatizar procesos existentes con tecnología' : 'Automate existing processes with technology',
      transformacion: isEs ? 'Cambiar modelo de operación/negocio con tecnología' : 'Change operation/business model with technology'
    },
    { 
      aspect: isEs ? 'Alcance' : 'Scope',
      digitalizacion: isEs ? 'Táctico (procesos específicos)' : 'Tactical (specific processes)',
      transformacion: isEs ? 'Estratégico (toda la organización)' : 'Strategic (entire organization)'
    },
    { 
      aspect: isEs ? 'Cambio' : 'Change',
      digitalizacion: isEs ? 'Incremental' : 'Incremental',
      transformacion: isEs ? 'Fundamental' : 'Fundamental'
    },
    { 
      aspect: isEs ? 'Tecnología' : 'Technology',
      digitalizacion: isEs ? 'Herramienta para eficiencia' : 'Tool for efficiency',
      transformacion: isEs ? 'Habilitador de nuevo modelo' : 'Enabler of new model'
    },
    { 
      aspect: isEs ? 'Procesos' : 'Processes',
      digitalizacion: isEs ? 'Automatiza procesos actuales' : 'Automates current processes',
      transformacion: isEs ? 'Rediseña procesos completamente' : 'Completely redesigns processes'
    },
    { 
      aspect: isEs ? 'Cultura' : 'Culture',
      digitalizacion: isEs ? 'Cambio limitado' : 'Limited change',
      transformacion: isEs ? 'Cambio profundo de cultura' : 'Deep culture change'
    },
    { 
      aspect: isEs ? 'Ejemplo' : 'Example',
      digitalizacion: isEs ? 'Digitalizar formularios en papel' : 'Digitize paper forms',
      transformacion: isEs ? 'Nuevo canal digital de ventas' : 'New digital sales channel'
    },
    { 
      aspect: isEs ? 'Tiempo' : 'Time',
      digitalizacion: isEs ? '3-6 meses' : '3-6 months',
      transformacion: isEs ? '1-3 años' : '1-3 years'
    },
    { 
      aspect: isEs ? 'Riesgo' : 'Risk',
      digitalizacion: isEs ? 'Bajo-Medio' : 'Low-Medium',
      transformacion: isEs ? 'Medio-Alto' : 'Medium-High'
    },
    { 
      aspect: isEs ? 'Impacto' : 'Impact',
      digitalizacion: isEs ? '20-40% mejora eficiencia' : '20-40% efficiency improvement',
      transformacion: isEs ? '2-5X mejora en capacidades' : '2-5X improvement in capabilities'
    }
  ];

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Transformación Digital' : 'Digital Transformation', href: null }
  ];

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
                  <Cpu className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Transformación Digital' : 'Digital Transformation'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Consultoría Empresarial' : 'Business Consulting'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs ? 'Transformación digital con estrategia y ejecución' : 'Digital transformation with strategy and execution'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Consultoría para transformar tu empresa digitalmente: desde estrategia digital hasta implementación de tecnología, digitalización de procesos, gestión del cambio y análisis de datos. Transformación con resultados medibles, no solo tecnología sin propósito.'
                  : 'Consulting to digitally transform your company: from digital strategy to technology implementation, process digitization, change management and data analysis. Transformation with measurable results, not just technology without purpose.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Evalúa tu Madurez Digital' : 'Evaluate Your Digital Maturity'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/casos-exito`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Ver casos de transformación' : 'View transformation cases'}
                </Link>
              </div>

              {/* Stats - Inline Compact */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '15+', label: isEs ? 'transformaciones exitosas' : 'successful transformations' },
                  { value: '6-12', label: isEs ? 'meses ROI medible' : 'months measurable ROI' },
                  { icon: true, label: isEs ? 'Enfoque estratégico + ejecución' : 'Strategic focus + execution' }
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

            {/* Right Visual */}
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
                      {isEs ? 'Dashboard Digital' : 'Digital Dashboard'}
                    </span>
                  </div>

                  {/* Simulated Metrics */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">{isEs ? 'Madurez Digital' : 'Digital Maturity'}</span>
                      <span className="text-turquesa font-bold">+65%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-turquesa to-menta rounded-full"
                      />
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <span className="text-white/60 text-sm">{isEs ? 'Adopción Tecnológica' : 'Technology Adoption'}</span>
                      <span className="text-menta font-bold">+82%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '82%' }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        className="h-full bg-gradient-to-r from-menta to-turquesa rounded-full"
                      />
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <span className="text-white/60 text-sm">{isEs ? 'ROI Transformación' : 'Transformation ROI'}</span>
                      <span className="text-violeta font-bold">+240%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '90%' }}
                        transition={{ duration: 1.5, delay: 0.9 }}
                        className="h-full bg-gradient-to-r from-violeta to-lavanda rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-turquesa rounded-2xl p-4 shadow-xl"
                >
                  <TrendingUp className="w-8 h-8 text-azul-marino" />
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
                ? '¿Por qué 70% de las transformaciones digitales fracasan?'
                : 'Why do 70% of digital transformations fail?'}
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto mb-8">
              {isEs 
                ? 'Transformación digital NO es comprar software o migrar a la nube. Es cambiar cómo opera tu empresa usando tecnología como habilitador. La mayoría fracasa porque: invierte en tecnología sin estrategia clara, no gestiona el cambio organizacional, no mide resultados de negocio, confunde digitalización (automatizar lo existente) con transformación (cambiar el modelo).'
                : 'Digital transformation is NOT buying software or migrating to the cloud. It\'s changing how your company operates using technology as an enabler. Most fail because: they invest in technology without clear strategy, don\'t manage organizational change, don\'t measure business results, confuse digitization (automating existing) with transformation (changing the model).'}
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
                ? 'Alternative transforma con estrategia, no solo tecnología.'
                : 'Alternative transforms with strategy, not just technology.'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          4 SERVICIOS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Servicios' : 'Services'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '4 pilares de transformación digital exitosa' : '4 pillars of successful digital transformation'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => {
              const colorClasses = {
                turquesa: { bg: 'bg-turquesa/10', icon: 'text-turquesa', border: 'border-turquesa/20', badge: 'bg-turquesa/10 text-turquesa' },
                menta: { bg: 'bg-menta/10', icon: 'text-menta', border: 'border-menta/20', badge: 'bg-menta/10 text-menta' },
                violeta: { bg: 'bg-violeta/10', icon: 'text-violeta', border: 'border-violeta/20', badge: 'bg-violeta/10 text-violeta' }
              };
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
                        <service.icon className={`w-8 h-8 ${colors.icon}`} />
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
                      {isEs ? 'Distribuidora transforma operaciones con digitalización' : 'Distributor transforms operations with digitization'}
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
                          ? 'Empresa distribuidora de productos de consumo (250 empleados, 8 centros)'
                          : 'Consumer products distribution company (250 employees, 8 centers)'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Situación Inicial' : 'Initial Situation'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Operación 90% manual: pedidos por teléfono/email, inventarios en Excel, facturación manual, sin visibilidad en tiempo real de inventario entre centros, entregas sin tracking, datos dispersos en 15 Excels diferentes sin consolidación.'
                          : '90% manual operation: orders by phone/email, inventories in Excel, manual billing, no real-time inventory visibility between centers, deliveries without tracking, data scattered in 15 different Excels without consolidation.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-foreground/70 mb-3">
                        {isEs 
                          ? 'Transformación digital en 8 meses con enfoque pragmático:'
                          : 'Digital transformation in 8 months with pragmatic approach:'}
                      </p>
                      <ul className="space-y-2 text-foreground/70">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Mes 1-2: Estrategia Digital - Evaluación de madurez digital (nivel 1.5 de 5), definición de 6 iniciativas prioritarias, business case con ROI proyectado' : 'Month 1-2: Digital Strategy - Digital maturity assessment (level 1.5 of 5), definition of 6 priority initiatives, business case with projected ROI'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Mes 3-5: Digitalización Procesos - Plataforma e-commerce B2B, sistema de gestión de inventario cloud, digitalización de facturación (automatización 80% facturas)' : 'Month 3-5: Process Digitization - B2B e-commerce platform, cloud inventory management system, billing digitization (80% invoice automation)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Mes 6-7: Análisis de Datos - Dashboard Power BI (ventas, inventario, entregas en tiempo real), reportes automatizados, alertas automáticas' : 'Month 6-7: Data Analysis - Power BI Dashboard (sales, inventory, deliveries in real time), automated reports, automatic alerts'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Mes 3-8: Change Management - Capacitación de 250 empleados, champions digitales, comunicación continua, gestión de resistencias' : 'Month 3-8: Change Management - Training of 250 employees, digital champions, continuous communication, resistance management'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Right - Stats */}
                  <div>
                    <h4 className="font-semibold text-azul-marino dark:text-white mb-4">
                      {isEs ? 'Resultados (12 meses post-implementación)' : 'Results (12 months post-implementation)'}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { value: '65%', label: isEs ? 'Pedidos online' : 'Online orders', sub: isEs ? '0% → 65%' : '0% → 65%' },
                        { value: '8 min', label: isEs ? 'Tiempo procesamiento' : 'Processing time', sub: isEs ? '45 min → 8 min' : '45 min → 8 min' },
                        { value: '2%', label: isEs ? 'Errores en pedidos' : 'Order errors', sub: isEs ? '12% → 2%' : '12% → 2%' },
                        { value: '100%', label: isEs ? 'Visibilidad inventario' : 'Inventory visibility', sub: isEs ? 'Tiempo real' : 'Real time' },
                        { value: '80%', label: isEs ? 'Decisiones basadas en datos' : 'Data-driven decisions', sub: isEs ? '<10% → 80%' : '<10% → 80%' },
                        { value: '+18%', label: isEs ? 'Revenue' : 'Revenue', sub: isEs ? 'Mismo equipo' : 'Same team' },
                        { value: '240%', label: isEs ? 'ROI' : 'ROI', sub: isEs ? '12 meses' : '12 months' },
                        { value: '85%', label: isEs ? 'Adopción plataforma' : 'Platform adoption', sub: isEs ? 'Gracias a change management' : 'Thanks to change management' }
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
                  </div>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70 mb-6">
                  {isEs 
                    ? '"Alternative no solo implementó tecnología; nos transformó cómo operamos. Hoy competimos digitalmente con empresas más grandes. Inversión se pagó sola en 10 meses."'
                    : '"Alternative not only implemented technology; they transformed how we operate. Today we compete digitally with larger companies. Investment paid for itself in 10 months."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— {isEs ? 'Gerente General' : 'General Manager'}</span>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* =====================================================
          TRANSFORMACIÓN VS DIGITALIZACIÓN SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Digitalización vs Transformación Digital: entiende la diferencia' : 'Digitization vs Digital Transformation: understand the difference'}
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              {isEs 
                ? 'Digitalización es componente de transformación, no sinónimo. Transformación digital exitosa incluye: estrategia clara, digitalización de procesos, adopción de tecnología (change management), decisiones basadas en datos, y cultura digital.'
                : 'Digitization is a component of transformation, not a synonym. Successful digital transformation includes: clear strategy, process digitization, technology adoption (change management), data-driven decisions, and digital culture.'}
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white dark:bg-background rounded-2xl p-8 shadow-brand overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-4 text-foreground/60 font-medium bg-turquesa/10 
                                   border-b-2 border-turquesa/30 rounded-tl-lg">
                      {isEs ? 'Aspecto' : 'Aspect'}
                    </th>
                    <th className="py-4 px-4 text-center font-semibold bg-menta/10 text-menta 
                                   border-b-2 border-menta/30">
                      {isEs ? 'Digitalización' : 'Digitization'}
                    </th>
                    <th className="py-4 px-4 text-center font-semibold bg-violeta/10 text-violeta 
                                   border-b-2 border-violeta/30 rounded-tr-lg">
                      {isEs ? 'Transformación Digital' : 'Digital Transformation'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, idx) => (
                    <tr key={idx} className={`border-b border-gris-arena/20 hover:bg-blanco-hueso/50 
                                              dark:hover:bg-card/50 transition-colors
                                              ${idx % 2 === 0 ? 'bg-white' : 'bg-blanco-hueso/30'}
                                              ${idx === comparisonTable.length - 1 ? 'border-b-0' : ''}`}>
                      <td className="py-4 px-4 text-azul-marino dark:text-white font-medium">
                        {row.aspect}
                      </td>
                      <td className="py-4 px-4 text-center text-foreground/70">
                        {row.digitalizacion}
                      </td>
                      <td className="py-4 px-4 text-center text-foreground/70">
                        {row.transformacion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-turquesa/10 rounded-full blur-2xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs ? '¿Listo para transformar tu empresa digitalmente?' : 'Ready to digitally transform your company?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Evaluación de madurez digital de 30 minutos. Diagnosticamos situación actual, identificamos oportunidades prioritarias y desarrollamos roadmap de transformación.'
                  : '30-minute digital maturity assessment. We diagnose current situation, identify priority opportunities and develop transformation roadmap.'}
              </p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Evaluación de madurez digital (nivel 1-5)' : 'Digital maturity assessment (level 1-5)',
                  isEs ? 'Identificación de oportunidades de alto impacto' : 'Identification of high-impact opportunities',
                  isEs ? 'Roadmap preliminar de transformación' : 'Preliminary transformation roadmap',
                  isEs ? 'Business case con ROI proyectado' : 'Business case with projected ROI',
                  isEs ? 'Propuesta por fases' : 'Phased proposal'
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
                    {isEs ? 'Evaluar Madurez Digital' : 'Evaluate Digital Maturity'}
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

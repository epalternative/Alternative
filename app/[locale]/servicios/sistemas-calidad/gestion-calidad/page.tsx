'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Award,
  CheckCircle2,
  Phone,
  Building2,
  Users,
  Target,
  Shield,
  Clock,
  BarChart3,
  FileText,
  Settings,
  Briefcase,
  TrendingUp,
  DollarSign,
  RefreshCw,
  AlertTriangle,
  Zap,
  ClipboardCheck,
  Search,
  FileCheck,
  Scale,
  Lightbulb,
  GraduationCap,
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

export default function GestionCalidadPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Sistemas de Calidad' : 'Quality Systems', href: `/${locale}/servicios/sistemas-calidad` },
    { label: isEs ? 'Gestión de Calidad' : 'Quality Management', href: null }
  ];

  // =====================================================
  // CONTENT DATA
  // =====================================================

  // Who is it for
  const targetAudience = [
    {
      icon: Zap,
      title: isEs ? 'Startup / PYME' : 'Startup / SME',
      description: isEs
        ? 'Empresa en crecimiento que necesita estructura de calidad sin la burocracia de ISO 9001 completa.'
        : 'Growing company that needs quality structure without the bureaucracy of full ISO 9001.',
      color: 'turquesa'
    },
    {
      icon: FileText,
      title: isEs ? 'Calidad Informal' : 'Informal Quality',
      description: isEs
        ? 'Tienes procesos pero no están documentados. Necesitas estructura sin certificación formal.'
        : 'You have processes but they\'re not documented. You need structure without formal certification.',
      color: 'menta'
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'ISO Resultó Pesado' : 'ISO Was Too Heavy',
      description: isEs
        ? 'Intentaste ISO 9001 pero resultó demasiado burocrático. Quieres calidad práctica y efectiva.'
        : 'You tried ISO 9001 but it was too bureaucratic. You want practical and effective quality.',
      color: 'violeta'
    },
    {
      icon: Target,
      title: isEs ? 'Preparación Futura' : 'Future Preparation',
      description: isEs
        ? 'Quieres preparar tu empresa para certificación ISO más adelante, pero empezar con algo pragmático.'
        : 'You want to prepare your company for ISO certification later, but start with something pragmatic.',
      color: 'turquesa'
    },
    {
      icon: RefreshCw,
      title: isEs ? 'Mejora Continua' : 'Continuous Improvement',
      description: isEs
        ? 'Buscas cultura de calidad y mejora continua sin el rigor formal de ISO 9001.'
        : 'You seek quality culture and continuous improvement without the formal rigor of ISO 9001.',
      color: 'menta'
    },
    {
      icon: Shield,
      title: isEs ? 'Problemas Recurrentes' : 'Recurring Problems',
      description: isEs
        ? 'Tienes problemas de calidad que se repiten. Necesitas sistema para prevenir y corregir.'
        : 'You have recurring quality problems. You need a system to prevent and correct them.',
      color: 'violeta'
    }
  ];

  // System Components
  const systemComponents = [
    {
      icon: FileCheck,
      title: isEs ? 'Procesos Críticos Documentados' : 'Critical Processes Documented',
      description: isEs
        ? 'Documentación pragmática de procesos clave. Solo lo esencial, sin burocracia innecesaria.'
        : 'Pragmatic documentation of key processes. Only the essential, without unnecessary bureaucracy.',
      color: 'turquesa'
    },
    {
      icon: ClipboardCheck,
      title: isEs ? 'Controles de Calidad' : 'Quality Controls',
      description: isEs
        ? 'Puntos de control definidos en procesos críticos para asegurar calidad consistente.'
        : 'Defined control points in critical processes to ensure consistent quality.',
      color: 'menta'
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'Gestión de No Conformidades' : 'Non-Conformity Management',
      description: isEs
        ? 'Sistema para identificar, registrar, corregir y prevenir problemas de calidad.'
        : 'System to identify, record, correct and prevent quality problems.',
      color: 'violeta'
    },
    {
      icon: BarChart3,
      title: isEs ? 'Indicadores de Calidad (KPIs)' : 'Quality Indicators (KPIs)',
      description: isEs
        ? 'Métricas clave para monitorear desempeño de calidad y tomar decisiones basadas en datos.'
        : 'Key metrics to monitor quality performance and make data-driven decisions.',
      color: 'turquesa'
    },
    {
      icon: RefreshCw,
      title: isEs ? 'Mejora Continua' : 'Continuous Improvement',
      description: isEs
        ? 'Proceso estructurado para identificar oportunidades de mejora y implementar cambios.'
        : 'Structured process to identify improvement opportunities and implement changes.',
      color: 'menta'
    },
    {
      icon: GraduationCap,
      title: isEs ? 'Capacitación en Calidad' : 'Quality Training',
      description: isEs
        ? 'Capacitación del equipo en conceptos de calidad y uso del sistema implementado.'
        : 'Team training in quality concepts and use of the implemented system.',
      color: 'violeta'
    }
  ];

  // Methodology - 5 phases
  const methodology = [
    {
      phase: isEs ? 'FASE 1' : 'PHASE 1',
      title: isEs ? 'Diagnóstico' : 'Diagnosis',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Evaluación de procesos actuales, identificación de problemas de calidad, mapeo de procesos críticos y análisis de brechas.'
        : 'Evaluation of current processes, identification of quality problems, mapping of critical processes and gap analysis.',
      icon: Search,
      color: 'turquesa'
    },
    {
      phase: isEs ? 'FASE 2' : 'PHASE 2',
      title: isEs ? 'Diseño del Sistema' : 'System Design',
      duration: isEs ? '2-3 semanas' : '2-3 weeks',
      description: isEs
        ? 'Diseño de estructura de calidad pragmática: procesos a documentar, controles necesarios, indicadores clave y flujos de trabajo.'
        : 'Design of pragmatic quality structure: processes to document, necessary controls, key indicators and workflows.',
      icon: Settings,
      color: 'menta'
    },
    {
      phase: isEs ? 'FASE 3' : 'PHASE 3',
      title: isEs ? 'Documentación Pragmática' : 'Pragmatic Documentation',
      duration: isEs ? '3-4 semanas' : '3-4 weeks',
      description: isEs
        ? 'Documentación de procesos críticos, procedimientos de control, formatos de registro. Enfoque en utilidad, no en cumplimiento formal.'
        : 'Documentation of critical processes, control procedures, record formats. Focus on utility, not formal compliance.',
      icon: FileText,
      color: 'violeta'
    },
    {
      phase: isEs ? 'FASE 4' : 'PHASE 4',
      title: isEs ? 'Implementación' : 'Implementation',
      duration: isEs ? '4-6 semanas' : '4-6 weeks',
      description: isEs
        ? 'Puesta en marcha del sistema: capacitación del equipo, implementación de controles, establecimiento de indicadores y ajustes según feedback.'
        : 'System launch: team training, control implementation, indicator establishment and adjustments based on feedback.',
      icon: Zap,
      color: 'turquesa'
    },
    {
      phase: isEs ? 'FASE 5' : 'PHASE 5',
      title: isEs ? 'Institucionalización' : 'Institutionalization',
      duration: isEs ? '2-3 semanas' : '2-3 weeks',
      description: isEs
        ? 'Asegurar que el sistema se mantiene: designación de responsables, establecimiento de rutinas de revisión y transferencia de conocimiento.'
        : 'Ensure system sustainability: designation of responsible parties, establishment of review routines and knowledge transfer.',
      icon: Shield,
      color: 'menta'
    }
  ];

  // Benefits stats
  const benefits = [
    {
      stat: '60-80%',
      label: isEs ? 'menos burocracia' : 'less bureaucracy',
      description: isEs ? 'vs ISO 9001 completo' : 'vs full ISO 9001',
      icon: FileText
    },
    {
      stat: '3-4',
      label: isEs ? 'meses implementación' : 'months implementation',
      description: isEs ? 'vs 6-12 meses ISO' : 'vs 6-12 months ISO',
      icon: Clock
    },
    {
      stat: '40-50%',
      label: isEs ? 'reducción problemas' : 'problem reduction',
      description: isEs ? 'calidad consistente' : 'consistent quality',
      icon: TrendingUp
    },
    {
      stat: '100%',
      label: isEs ? 'trazabilidad' : 'traceability',
      description: isEs ? 'procesos críticos' : 'critical processes',
      icon: CheckCircle2
    },
    {
      stat: '70%',
      label: isEs ? 'menor costo' : 'lower cost',
      description: isEs ? 'vs certificación ISO' : 'vs ISO certification',
      icon: DollarSign
    },
    {
      stat: 'Pragmático',
      label: isEs ? 'enfoque' : 'approach',
      description: isEs ? 'solo lo esencial' : 'only essential',
      icon: Target
    }
  ];

  // Comparison table data
  const comparison = [
    {
      aspect: isEs ? 'Documentación' : 'Documentation',
      gestion: isEs ? 'Solo procesos críticos' : 'Only critical processes',
      iso: isEs ? 'Todos los procesos (7 cláusulas)' : 'All processes (7 clauses)',
      recomendacion: 'gestion'
    },
    {
      aspect: isEs ? 'Tiempo Implementación' : 'Implementation Time',
      gestion: isEs ? '3-4 meses' : '3-4 months',
      iso: isEs ? '6-12 meses' : '6-12 months',
      recomendacion: 'gestion'
    },
    {
      aspect: isEs ? 'Costo' : 'Cost',
      gestion: isEs ? '70% menor' : '70% lower',
      iso: isEs ? 'Alto (certificación + auditorías)' : 'High (certification + audits)',
      recomendacion: 'gestion'
    },
    {
      aspect: isEs ? 'Burocracia' : 'Bureaucracy',
      gestion: isEs ? 'Mínima, pragmática' : 'Minimal, pragmatic',
      iso: isEs ? 'Alta, formal' : 'High, formal',
      recomendacion: 'gestion'
    },
    {
      aspect: isEs ? 'Certificación Externa' : 'External Certification',
      gestion: isEs ? 'No requiere' : 'Not required',
      iso: isEs ? 'Requerida (organismo certificador)' : 'Required (certifying body)',
      recomendacion: 'gestion'
    },
    {
      aspect: isEs ? 'Auditorías Externas' : 'External Audits',
      gestion: isEs ? 'Opcionales (internas)' : 'Optional (internal)',
      iso: isEs ? 'Obligatorias anuales' : 'Mandatory annual',
      recomendacion: 'gestion'
    },
    {
      aspect: isEs ? 'Flexibilidad' : 'Flexibility',
      gestion: isEs ? 'Alta, adaptable' : 'High, adaptable',
      iso: isEs ? 'Baja, estricta' : 'Low, strict',
      recomendacion: 'gestion'
    },
    {
      aspect: isEs ? 'Ideal Para' : 'Ideal For',
      gestion: isEs ? 'Startups, PYMEs, crecimiento' : 'Startups, SMEs, growth',
      iso: isEs ? 'Empresas establecidas, reguladas' : 'Established, regulated companies',
      recomendacion: 'ambos'
    }
  ];

  // FAQs
  const faqs = [
    {
      question: isEs 
        ? '¿Cuál es la diferencia entre Gestión de Calidad y certificación ISO 9001?' 
        : 'What\'s the difference between Quality Management and ISO 9001 certification?',
      answer: isEs
        ? 'Gestión de Calidad es un sistema pragmático enfocado en procesos críticos y mejora continua, sin la burocracia de ISO 9001. ISO 9001 requiere documentación completa de todos los procesos, auditorías externas obligatorias y certificación formal. Gestión de Calidad te da estructura y calidad sin el costo y tiempo de certificación.'
        : 'Quality Management is a pragmatic system focused on critical processes and continuous improvement, without the bureaucracy of ISO 9001. ISO 9001 requires complete documentation of all processes, mandatory external audits and formal certification. Quality Management gives you structure and quality without the cost and time of certification.'
    },
    {
      question: isEs 
        ? '¿Puedo migrar de Gestión de Calidad a ISO 9001 después?' 
        : 'Can I migrate from Quality Management to ISO 9001 later?',
      answer: isEs
        ? 'Sí, absolutamente. De hecho, es una excelente estrategia. Empiezas con Gestión de Calidad para establecer bases sólidas sin burocracia, y cuando tu empresa esté lista (más madura, con más recursos, o si un cliente lo requiere), migras a ISO 9001. El trabajo previo facilita significativamente la certificación.'
        : 'Yes, absolutely. In fact, it\'s an excellent strategy. You start with Quality Management to establish solid foundations without bureaucracy, and when your company is ready (more mature, with more resources, or if a client requires it), you migrate to ISO 9001. The previous work significantly facilitates certification.'
    },
    {
      question: isEs 
        ? '¿Qué procesos debo documentar en Gestión de Calidad?' 
        : 'What processes should I document in Quality Management?',
      answer: isEs
        ? 'Solo los procesos críticos que impactan directamente la calidad de tu producto o servicio. Típicamente: proceso de producción/servicio principal, control de calidad, gestión de no conformidades, y procesos de mejora. No documentamos procesos administrativos o de soporte a menos que sean críticos para la calidad.'
        : 'Only the critical processes that directly impact the quality of your product or service. Typically: main production/service process, quality control, non-conformity management, and improvement processes. We don\'t document administrative or support processes unless they\'re critical to quality.'
    },
    {
      question: isEs 
        ? '¿Necesito auditorías externas con Gestión de Calidad?' 
        : 'Do I need external audits with Quality Management?',
      answer: isEs
        ? 'No, no es requerido. Gestión de Calidad incluye auditorías internas opcionales para verificar que el sistema funciona, pero no hay obligación de auditorías externas ni certificación. Esto reduce costos y burocracia significativamente.'
        : 'No, it\'s not required. Quality Management includes optional internal audits to verify the system works, but there\'s no obligation for external audits or certification. This significantly reduces costs and bureaucracy.'
    },
    {
      question: isEs 
        ? '¿Cuánto tiempo toma implementar Gestión de Calidad?' 
        : 'How long does it take to implement Quality Management?',
      answer: isEs
        ? 'Típicamente 3-4 meses desde inicio hasta sistema funcionando. Comparado con 6-12 meses para ISO 9001 completo. La diferencia es que nos enfocamos solo en lo esencial y evitamos documentación innecesaria. El tiempo exacto depende del tamaño de tu empresa y complejidad de procesos.'
        : 'Typically 3-4 months from start to working system. Compared to 6-12 months for full ISO 9001. The difference is we focus only on the essential and avoid unnecessary documentation. Exact time depends on your company size and process complexity.'
    },
    {
      question: isEs 
        ? '¿Gestión de Calidad es suficiente para cumplir requisitos de clientes o licitaciones?' 
        : 'Is Quality Management sufficient to meet client or tender requirements?',
      answer: isEs
        ? 'Depende del requisito específico. Si el cliente o licitación requiere explícitamente certificación ISO 9001, entonces necesitas ISO. Pero muchos clientes solo requieren "sistema de calidad" o "procesos documentados", y Gestión de Calidad cumple perfectamente. Te ayudamos a evaluar tus requisitos específicos.'
        : 'Depends on the specific requirement. If the client or tender explicitly requires ISO 9001 certification, then you need ISO. But many clients only require "quality system" or "documented processes", and Quality Management perfectly meets that. We help you evaluate your specific requirements.'
    }
  ];

  const colorClasses = {
    turquesa: { bg: 'bg-turquesa/10', text: 'text-turquesa', border: 'border-turquesa/20' },
    menta: { bg: 'bg-menta/10', text: 'text-menta', border: 'border-menta/20' },
    violeta: { bg: 'bg-violeta/10', text: 'text-violeta', border: 'border-violeta/20' }
  };

  return (
    <>
      {/* =====================================================
          HERO SECTION
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[10%] w-40 h-40 bg-turquesa/5 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[5%] w-32 h-32 bg-menta/5 rounded-full blur-xl"
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
                  <Settings className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Gestión de Calidad' : 'Quality Management'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Sistemas de Calidad' : 'Quality Systems'}
                  </p>
                </div>
              </div>

              {/* Pragmatic Badge */}
              <div className="inline-flex items-center gap-2 bg-menta/20 border border-menta/40 
                              rounded-full px-4 py-2 mb-4">
                <Zap className="w-4 h-4 text-menta" />
                <span className="text-menta text-sm font-semibold">
                  {isEs ? 'Enfoque Pragmático' : 'Pragmatic Approach'}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Calidad estructurada sin burocracia ISO'
                  : 'Structured quality without ISO bureaucracy'}
              </h1>

              {/* Tagline */}
              <p className="text-xl md:text-2xl text-menta font-medium mb-4">
                {isEs ? 'Solo lo esencial. Máximo impacto.' : 'Only the essential. Maximum impact.'}
              </p>

              {/* Subheadline */}
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Sistema de calidad enfocado en procesos críticos y mejora continua. Sin la complejidad, costo y burocracia de certificación ISO 9001. Ideal para startups, PYMEs y empresas en crecimiento que necesitan calidad estructurada ahora.'
                  : 'Quality system focused on critical processes and continuous improvement. Without the complexity, cost and bureaucracy of ISO 9001 certification. Ideal for startups, SMEs and growing companies that need structured quality now.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Evalúa tu Madurez de Calidad' : 'Evaluate Quality Maturity'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#comparacion"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Comparar con ISO 9001' : 'Compare with ISO 9001'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '3-4', label: isEs ? 'meses' : 'months' },
                  { value: '70%', label: isEs ? 'menor costo' : 'lower cost' },
                  { icon: true, label: isEs ? 'Sin burocracia' : 'No bureaucracy' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    {stat.icon ? (
                      <Zap className="w-4 h-4 text-menta" />
                    ) : (
                      <span className="text-turquesa font-bold">{stat.value}</span>
                    )}
                    <span className="text-white/60 text-sm">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual - Enhanced Quality Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Main Quality Dashboard Card */}
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
                      {isEs ? 'Dashboard de Calidad' : 'Quality Dashboard'}
                    </span>
                  </div>

                  {/* Quality Score */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-menta/20 rounded-full px-4 py-2 mb-3">
                      <Award className="w-5 h-5 text-menta" />
                      <span className="text-menta font-semibold text-sm">
                        {isEs ? 'Sistema Pragmático' : 'Pragmatic System'}
                      </span>
                    </div>
                    <div className="text-5xl font-bold text-turquesa mb-1">94%</div>
                    <p className="text-white/60 text-sm">
                      {isEs ? 'Eficiencia de Calidad' : 'Quality Efficiency'}
                    </p>
                  </div>

                  {/* Quality Metrics */}
                  <div className="space-y-4">
                    {/* Process Documentation */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/60 text-sm flex items-center gap-2">
                          <FileCheck className="w-4 h-4" />
                          {isEs ? 'Procesos Críticos' : 'Critical Processes'}
                        </span>
                        <span className="text-turquesa font-bold">8/8</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-turquesa to-menta rounded-full"
                        />
                      </div>
                    </div>

                    {/* Quality Controls */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/60 text-sm flex items-center gap-2">
                          <ClipboardCheck className="w-4 h-4" />
                          {isEs ? 'Controles Activos' : 'Active Controls'}
                        </span>
                        <span className="text-menta font-bold">12</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '85%' }}
                          transition={{ duration: 1.5, delay: 0.7 }}
                          className="h-full bg-gradient-to-r from-menta to-turquesa rounded-full"
                        />
                      </div>
                    </div>

                    {/* Non-Conformities */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/60 text-sm flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          {isEs ? 'No Conformidades' : 'Non-Conformities'}
                        </span>
                        <span className="text-violeta font-bold">-60%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '40%' }}
                          transition={{ duration: 1.5, delay: 0.9 }}
                          className="h-full bg-gradient-to-r from-violeta to-menta rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quality Pillars */}
                  <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
                    {[
                      { icon: FileCheck, value: '8', label: isEs ? 'Procesos' : 'Processes', color: 'turquesa' },
                      { icon: BarChart3, value: '12', label: isEs ? 'KPIs' : 'KPIs', color: 'menta' },
                      { icon: CheckCircle2, value: '95%', label: isEs ? 'Cumplimiento' : 'Compliance', color: 'violeta' }
                    ].map((pillar, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.1 + idx * 0.1 }}
                        className="bg-white/5 rounded-xl p-3 text-center"
                      >
                        <div className={`w-8 h-8 ${colorClasses[pillar.color as keyof typeof colorClasses].bg} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                          <pillar.icon className={`w-4 h-4 ${colorClasses[pillar.color as keyof typeof colorClasses].text}`} />
                        </div>
                        <div className={`text-lg font-bold ${colorClasses[pillar.color as keyof typeof colorClasses].text} mb-1`}>
                          {pillar.value}
                        </div>
                        <div className="text-xs text-white/60">{pillar.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating Badges */}
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-menta rounded-2xl p-4 shadow-xl z-10"
                >
                  <Zap className="w-8 h-8 text-azul-marino" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-turquesa/80 rounded-xl p-3 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-azul-marino" />
                    <span className="text-azul-marino text-xs font-bold">
                      {isEs ? 'Sin ISO' : 'No ISO'}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT IS QUALITY MANAGEMENT SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? '¿Qué es?' : 'What is it?'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
              {isEs 
                ? 'Gestión de Calidad: Calidad práctica sin burocracia'
                : 'Quality Management: Practical quality without bureaucracy'}
            </h2>
            
            <div className="space-y-4 text-foreground/70 leading-relaxed max-w-4xl">
              <p>
                {isEs 
                  ? 'Gestión de Calidad es un sistema pragmático de calidad enfocado en procesos críticos y mejora continua, sin la complejidad y costo de certificación ISO 9001. A diferencia de ISO 9001 que requiere documentación exhaustiva de todos los procesos y auditorías externas obligatorias, Gestión de Calidad se enfoca solo en lo esencial: procesos que impactan directamente la calidad de tu producto o servicio.'
                  : 'Quality Management is a pragmatic quality system focused on critical processes and continuous improvement, without the complexity and cost of ISO 9001 certification. Unlike ISO 9001 which requires exhaustive documentation of all processes and mandatory external audits, Quality Management focuses only on the essential: processes that directly impact the quality of your product or service.'}
              </p>
              <p>
                {isEs 
                  ? 'El sistema incluye documentación de procesos críticos, controles de calidad, gestión de no conformidades, indicadores clave (KPIs), y procesos de mejora continua. Todo diseñado para ser práctico y útil, no para cumplir requisitos formales. Es ideal para empresas que necesitan estructura de calidad pero no están listas o no necesitan la certificación formal de ISO 9001.'
                  : 'The system includes documentation of critical processes, quality controls, non-conformity management, key indicators (KPIs), and continuous improvement processes. Everything designed to be practical and useful, not to meet formal requirements. It\'s ideal for companies that need quality structure but aren\'t ready or don\'t need the formal ISO 9001 certification.'}
              </p>
              <p>
                <strong className="text-azul-marino dark:text-white">
                  {isEs ? 'Diferencia clave con ISO 9001:' : 'Key difference with ISO 9001:'}
                </strong>{' '}
                {isEs 
                  ? 'ISO 9001 es un marco de referencia internacional con requisitos estrictos y certificación externa obligatoria. Gestión de Calidad toma los principios de calidad de ISO 9001 pero los aplica de forma pragmática, sin burocracia innecesaria. Puedes migrar a ISO 9001 más adelante si lo necesitas, pero muchos clientes encuentran que Gestión de Calidad es suficiente para sus necesidades.'
                  : 'ISO 9001 is an international reference framework with strict requirements and mandatory external certification. Quality Management takes ISO 9001 quality principles but applies them pragmatically, without unnecessary bureaucracy. You can migrate to ISO 9001 later if needed, but many clients find Quality Management sufficient for their needs.'}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          WHO IS IT FOR SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Para Quién' : 'Who is it for'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Para quién es Gestión de Calidad?' : 'Who is Quality Management for?'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetAudience.map((item, idx) => {
              const colors = colorClasses[item.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-white dark:bg-background p-6 rounded-2xl shadow-brand 
                                hover:shadow-brand-lg transition-all duration-300 h-full
                                border-l-4 ${colors.border.replace('/20', '')}`}
                  >
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl 
                                    flex items-center justify-center mb-4`}>
                      <item.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
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
          SYSTEM COMPONENTS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Componentes' : 'Components'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Componentes del Sistema de Calidad' : 'Quality System Components'}
            </h2>
            <p className="text-foreground/70 max-w-3xl mx-auto">
              {isEs 
                ? 'Sistema completo pero pragmático con 6 componentes esenciales para asegurar calidad consistente.'
                : 'Complete but pragmatic system with 6 essential components to ensure consistent quality.'}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemComponents.map((component, idx) => {
              const colors = colorClasses[component.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-blanco-hueso dark:bg-card p-6 rounded-2xl shadow-brand 
                                hover:shadow-brand-lg transition-all duration-300 h-full
                                border ${colors.border}`}
                  >
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl 
                                    flex items-center justify-center mb-4`}>
                      <component.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                      {component.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {component.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          METHODOLOGY SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-violeta/10 text-violeta 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Metodología' : 'Methodology'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Nuestra Metodología en 5 Fases' : 'Our 5-Phase Methodology'}
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-turquesa/20 hidden md:block" />
              
              <div className="space-y-8">
                {methodology.map((phase, idx) => {
                  const colors = colorClasses[phase.color as keyof typeof colorClasses];
                  return (
                    <AnimatedSection key={idx} delay={idx * 0.1}>
                      <motion.div
                        whileHover={{ x: 10 }}
                        className="flex gap-6 items-start"
                      >
                        {/* Timeline marker */}
                        <div className={`relative z-10 w-16 h-16 ${colors.bg} rounded-2xl 
                                        flex items-center justify-center flex-shrink-0
                                        border-2 ${colors.border}`}>
                          <phase.icon className={`w-8 h-8 ${colors.text}`} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 bg-white dark:bg-background p-6 rounded-2xl shadow-brand">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-sm font-bold ${colors.text}`}>
                              {phase.phase}
                            </span>
                            <span className="text-xl font-semibold text-azul-marino dark:text-white">
                              {phase.title}
                            </span>
                            <span className="ml-auto text-sm text-foreground/60">
                              {phase.duration}
                            </span>
                          </div>
                          <p className="text-foreground/70 leading-relaxed">
                            {phase.description}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BENEFITS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-azul-marino">
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
                             hover:bg-white/10 transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-turquesa" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-turquesa mb-2">
                    {benefit.stat}
                  </div>
                  <p className="text-white/80 font-medium mb-1">{benefit.label}</p>
                  <p className="text-white/60 text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          CASE STUDY SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
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
                      {isEs 
                        ? 'Startup tech estructura calidad sin burocracia ISO'
                        : 'Tech startup structures quality without ISO bureaucracy'}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left - Description */}
                  <div>
                    <div className="mb-6">
                      <p className="text-sm text-foreground/60 mb-2">
                        {isEs ? 'Startup de Tecnología • 45 empleados' : 'Technology Startup • 45 employees'}
                      </p>
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Desafío' : 'Challenge'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Startup en crecimiento rápido con problemas de calidad en entregas. Clientes reportaban bugs recurrentes. Necesitaban estructura de calidad pero ISO 9001 era demasiado costoso y burocrático para su etapa. Presupuesto limitado.'
                          : 'Fast-growing startup with quality problems in deliveries. Clients reported recurring bugs. They needed quality structure but ISO 9001 was too expensive and bureaucratic for their stage. Limited budget.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Implementamos Gestión de Calidad enfocada en procesos críticos: desarrollo de software, testing, gestión de bugs, y release management. Documentación pragmática, controles en puntos clave, KPIs de calidad. Sin burocracia ISO.'
                          : 'We implemented Quality Management focused on critical processes: software development, testing, bug management, and release management. Pragmatic documentation, controls at key points, quality KPIs. No ISO bureaucracy.'}
                      </p>
                    </div>

                    <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                      {isEs 
                        ? '"Gestión de Calidad nos dio estructura sin ahogarnos en documentación. En 3 meses teníamos sistema funcionando. Bugs reducidos 60%, clientes más satisfechos, y costo 70% menor que ISO."'
                        : '"Quality Management gave us structure without drowning us in documentation. In 3 months we had a working system. Bugs reduced 60%, more satisfied clients, and 70% lower cost than ISO."'}
                      <span className="block mt-2 text-sm text-turquesa not-italic font-medium">
                        — CTO, Startup Tecnología
                      </span>
                    </blockquote>
                  </div>

                  {/* Right - Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '3', label: isEs ? 'meses' : 'months', sub: isEs ? 'implementación' : 'implementation' },
                      { value: '60%', label: isEs ? 'reducción bugs' : 'bug reduction', sub: isEs ? 'recurrentes' : 'recurring' },
                      { value: '70%', label: isEs ? 'menor costo' : 'lower cost', sub: isEs ? 'vs ISO 9001' : 'vs ISO 9001' },
                      { value: '8', label: isEs ? 'procesos' : 'processes', sub: isEs ? 'documentados' : 'documented' },
                      { value: '12', label: isEs ? 'KPIs' : 'KPIs', sub: isEs ? 'activos' : 'active' },
                      { value: '95%', label: isEs ? 'satisfacción' : 'satisfaction', sub: isEs ? 'clientes' : 'clients' }
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white dark:bg-background p-4 rounded-2xl shadow-brand text-center"
                      >
                        <div className="text-2xl lg:text-3xl font-bold text-turquesa mb-1">
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

      {/* =====================================================
          COMPARISON TABLE SECTION
          ===================================================== */}
      <section id="comparacion" className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Comparativa' : 'Comparison'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Gestión de Calidad vs ISO 9001' : 'Quality Management vs ISO 9001'}
            </h2>
            <p className="text-foreground/70 max-w-3xl mx-auto">
              {isEs 
                ? 'Comparación objetiva para ayudarte a decidir qué enfoque es mejor para tu empresa.'
                : 'Objective comparison to help you decide which approach is better for your company.'}
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white dark:bg-background rounded-2xl shadow-brand overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-3 gap-4 p-6 bg-azul-marino text-white font-semibold">
                <div className="text-sm uppercase tracking-wider">
                  {isEs ? 'Aspecto' : 'Aspect'}
                </div>
                <div className="text-center">
                  {isEs ? 'Gestión de Calidad' : 'Quality Management'}
                </div>
                <div className="text-center">
                  ISO 9001
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gris-arena/20">
                {comparison.map((row, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className={`grid grid-cols-3 gap-4 p-6 hover:bg-blanco-hueso dark:hover:bg-card transition-colors
                                ${row.recomendacion === 'gestion' ? 'bg-turquesa/5' : ''}`}
                  >
                    <div className="font-medium text-azul-marino dark:text-white">
                      {row.aspect}
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-foreground/70">{row.gestion}</span>
                        {row.recomendacion === 'gestion' && (
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0" />
                        )}
                      </div>
                    </div>
                    <div className="text-center text-foreground/70">
                      {row.iso}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recommendation Footer */}
              <div className="p-6 bg-turquesa/10 border-t border-turquesa/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-turquesa" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                      {isEs ? 'Recomendación Alternative' : 'Alternative Recommendation'}
                    </h4>
                    <p className="text-foreground/70 leading-relaxed">
                      {isEs 
                        ? 'Para la mayoría de startups, PYMEs y empresas en crecimiento, recomendamos empezar con Gestión de Calidad. Es más rápido, menos costoso, y te da estructura de calidad sin burocracia. Si más adelante necesitas certificación ISO 9001 (por requisito de cliente o licitación), el trabajo previo facilita significativamente la certificación. Para empresas establecidas o reguladas que requieren certificación, ISO 9001 es la opción correcta.'
                        : 'For most startups, SMEs and growing companies, we recommend starting with Quality Management. It\'s faster, less expensive, and gives you quality structure without bureaucracy. If you later need ISO 9001 certification (due to client requirement or tender), the previous work significantly facilitates certification. For established or regulated companies that require certification, ISO 9001 is the right option.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
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
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                <Settings className="w-5 h-5 text-white" />
                <span className="text-white/90 text-sm font-medium">
                  {isEs ? 'Sistema pragmático disponible' : 'Pragmatic system available'}
                </span>
              </div>
              
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs ? '¿Necesitas estructura de calidad sin burocracia?' : 'Need quality structure without bureaucracy?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Diagnóstico de madurez de calidad gratuito. Evaluamos tu situación actual y te recomendamos si Gestión de Calidad o ISO 9001 es mejor para ti.'
                  : 'Free quality maturity diagnosis. We evaluate your current situation and recommend whether Quality Management or ISO 9001 is better for you.'}
              </p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Evaluación de madurez actual' : 'Current maturity assessment',
                  isEs ? 'Recomendación personalizada' : 'Personalized recommendation',
                  isEs ? 'Roadmap de implementación' : 'Implementation roadmap',
                  isEs ? 'Comparativa de costos' : 'Cost comparison'
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
                    {isEs ? 'Solicitar Diagnóstico de Calidad' : 'Request Quality Diagnosis'}
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

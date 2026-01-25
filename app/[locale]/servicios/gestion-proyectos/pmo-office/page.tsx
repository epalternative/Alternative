'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import {
  Building2,
  ArrowRight,
  ChevronDown,
  Users,
  Target,
  LayoutDashboard,
  GitBranch,
  BarChart3,
  Shield,
  CheckCircle2,
  Phone,
  AlertTriangle,
  Layers,
  Settings,
  Briefcase,
  TrendingUp,
  Eye,
  Scale,
  BookOpen,
  FileCheck,
  Network,
  Handshake,
  Zap,
  Clock
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
  delay?: number;
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

const StaggerContainer = ({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) => (
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

const StaggerItem = ({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) => (
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
  onClick: () => void;
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
      <p className="pb-6 text-foreground/70 leading-relaxed">{answer}</p>
    </motion.div>
  </motion.div>
);

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function PMOOfficePage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    {
      label: isEs ? 'Gestión de Proyectos' : 'Project Management',
      href: `/${locale}/servicios/gestion-proyectos`
    },
    { label: 'PMO Office', href: null }
  ];

  // =====================================================
  // CONTENT DATA
  // =====================================================

  const problems = [
    {
      icon: Eye,
      title: isEs ? 'Falta de visibilidad' : 'Lack of visibility',
      description: isEs
        ? 'No tienes una vista consolidada del estado de todos tus proyectos. Reportes dispersos y desactualizados.'
        : 'You don\'t have a consolidated view of all your projects. Scattered and outdated reports.',
      color: 'turquesa'
    },
    {
      icon: Target,
      title: isEs ? 'Sin priorización clara' : 'No clear prioritization',
      description: isEs
        ? 'Proyectos compiten por recursos sin criterios objetivos. Todo es "urgente" y nada avanza.'
        : 'Projects compete for resources without objective criteria. Everything is "urgent" and nothing moves.',
      color: 'menta'
    },
    {
      icon: GitBranch,
      title: isEs ? 'Metodología inconsistente' : 'Inconsistent methodology',
      description: isEs
        ? 'Cada área o proyecto hace las cosas distinto. Sin estándares, replaneos y retrabajos constantes.'
        : 'Each area or project does things differently. Without standards, constant replanning and rework.',
      color: 'violeta'
    },
    {
      icon: Users,
      title: isEs ? 'Conflictos por recursos' : 'Resource conflicts',
      description: isEs
        ? 'Equipos compartidos sin gobernanza. Retrasos por disputas de prioridad y sobrecarga.'
        : 'Shared teams without governance. Delays from priority disputes and overload.',
      color: 'turquesa'
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'Alta tasa de fracaso' : 'High failure rate',
      description: isEs
        ? 'Proyectos que se retrasan, se cancelan o no entregan valor. Sin aprendizaje sistémico.'
        : 'Projects that delay, get cancelled or don\'t deliver value. No systemic learning.',
      color: 'menta'
    },
    {
      icon: Layers,
      title: isEs ? 'Reportes fragmentados' : 'Fragmented reporting',
      description: isEs
        ? 'Cada gerente reporta distinto. Junta directiva sin un solo dashboard de portafolio.'
        : 'Each manager reports differently. Board without a single portfolio dashboard.',
      color: 'violeta'
    }
  ];

  const pmoIncludes = [
    {
      title: isEs ? 'Governance' : 'Governance',
      icon: Shield,
      description: isEs
        ? 'Comités de decisión, roles (sponsor, PMO, dueños), políticas de aprobación y escalamiento.'
        : 'Decision committees, roles (sponsor, PMO, owners), approval and escalation policies.',
      color: 'turquesa'
    },
    {
      title: isEs ? 'Metodología' : 'Methodology',
      icon: GitBranch,
      description: isEs
        ? 'Estándares de planificación, seguimiento y cierre. Plantillas, guías y capacitación.'
        : 'Planning, tracking and closing standards. Templates, guides and training.',
      color: 'menta'
    },
    {
      title: isEs ? 'Gestión de Portafolio' : 'Portfolio Management',
      icon: BarChart3,
      description: isEs
        ? 'Priorización, balanceo de recursos, seguimiento consolidado y reportes ejecutivos.'
        : 'Prioritization, resource balancing, consolidated tracking and executive reports.',
      color: 'violeta'
    },
    {
      title: isEs ? 'Capacidades' : 'Capabilities',
      icon: Zap,
      description: isEs
        ? 'Herramientas (PMIS), madurez, formación de PMs y mejora continua del PMO.'
        : 'Tools (PMIS), maturity, PM development and continuous PMO improvement.',
      color: 'turquesa'
    }
  ];

  const benefits = [
    {
      stat: '40-60%',
      label: isEs ? 'menor fracaso' : 'less failure',
      description: isEs
        ? 'Proyectos que cumplen alcance, tiempo y presupuesto con PMO estructurado.'
        : 'Projects meeting scope, time and budget with structured PMO.',
      icon: TrendingUp
    },
    {
      stat: '1',
      label: isEs ? 'dashboard único' : 'single dashboard',
      description: isEs
        ? 'Visibilidad ejecutiva en tiempo real del portafolio completo.'
        : 'Real-time executive visibility of the full portfolio.',
      icon: LayoutDashboard
    },
    {
      stat: '100%',
      label: isEs ? 'estándares' : 'standards',
      description: isEs
        ? 'Metodología única en toda la organización.'
        : 'Single methodology across the organization.',
      icon: FileCheck
    },
    {
      stat: '2-4',
      label: isEs ? 'semanas' : 'weeks',
      description: isEs
        ? 'Para tener PMO operativo con Alternative (consultoría o director).'
        : 'To have PMO operational with Alternative (consulting or director).',
      icon: Clock
    }
  ];

  const pmoTypes = [
    {
      name: isEs ? 'Soporte' : 'Supportive',
      icon: Handshake,
      description: isEs
        ? 'PMO que recomienda y asesora. Bajo control. Ideal para madurez inicial.'
        : 'PMO that recommends and advises. Low control. Ideal for initial maturity.',
      color: 'turquesa'
    },
    {
      name: isEs ? 'Control' : 'Controlling',
      icon: Scale,
      description: isEs
        ? 'PMO que define estándares y exige cumplimiento. Reportes obligatorios. Balance control/autonomía.'
        : 'PMO that defines standards and demands compliance. Mandatory reports. Balance control/autonomy.',
      color: 'menta'
    },
    {
      name: isEs ? 'Directivo' : 'Directive',
      icon: Building2,
      description: isEs
        ? 'PMO que gestiona proyectos directamente. Alto control. Para portafolios críticos.'
        : 'PMO that manages projects directly. High control. For critical portfolios.',
      color: 'violeta'
    }
  ];

  const faqs = [
    {
      question: isEs
        ? '¿Cuál es la diferencia entre Consultoría PMO y Director PMO tercerizado?'
        : 'What\'s the difference between PMO Consulting and outsourced PMO Director?',
      answer: isEs
        ? 'Consultoría: te ayudamos a diseñar e implementar un PMO interno; tu equipo lo opera. Director tercerizado: un experto Alternative actúa como Director de PMO en tu organización, operando el PMO día a día. Consultoría es para construir capacidad propia; outsourcing para tener PMO ya sin invertir en contratación.'
        : 'Consulting: we help you design and implement an internal PMO; your team operates it. Outsourced Director: an Alternative expert acts as PMO Director in your organization, operating the PMO day to day. Consulting is for building your own capability; outsourcing for having a PMO without hiring.'
    },
    {
      question: isEs
        ? '¿Cuánto tiempo toma implementar un PMO?'
        : 'How long does it take to implement a PMO?',
      answer: isEs
        ? 'Con consultoría: 2-4 meses para PMO mínimo viable (governance, metodología básica, dashboard). Con director tercerizado: 2-4 semanas para tener PMO operativo. El director llega, se integra y comienza a ejecutar desde el día uno.'
        : 'With consulting: 2-4 months for minimum viable PMO (governance, basic methodology, dashboard). With outsourced director: 2-4 weeks to have operational PMO. The director arrives, integrates and starts executing from day one.'
    },
    {
      question: isEs
        ? '¿PMO es solo para empresas grandes?'
        : 'Is PMO only for large companies?',
      answer: isEs
        ? 'Un PMO estructurado suele tener sentido desde 10-15 proyectos simultáneos o inversión significativa en proyectos. Empresas medianas con 5+ proyectos críticos ya se benefician de un PMO ligero. Evaluamos tu portafolio y recomendamos el enfoque adecuado.'
        : 'A structured PMO usually makes sense from 10-15 simultaneous projects or significant project investment. Mid-size companies with 5+ critical projects already benefit from a light PMO. We evaluate your portfolio and recommend the right approach.'
    },
    {
      question: isEs
        ? '¿Necesito herramientas de software (PMIS)?'
        : 'Do I need software tools (PMIS)?',
      answer: isEs
        ? 'No obligatorio al inicio. Puedes arrancar con Excel/Sheets y plantillas. PMIS (Jira, MS Project, etc.) recomendable cuando tienes muchos proyectos, equipos distribuidos o necesidad de reportes automatizados. Primero governance y metodología, luego herramientas.'
        : 'Not mandatory at the start. You can begin with Excel/Sheets and templates. PMIS (Jira, MS Project, etc.) recommended when you have many projects, distributed teams or need automated reports. First governance and methodology, then tools.'
    },
    {
      question: isEs
        ? '¿El Director PMO trabaja on-site o remoto?'
        : 'Does the PMO Director work on-site or remote?',
      answer: isEs
        ? 'Flexible. Podemos trabajar on-site, híbrido o remoto según tu preferencia. Para arranque e integración con alta gerencia, recomendamos presencia inicial; luego se puede ajustar a híbrido.'
        : 'Flexible. We can work on-site, hybrid or remote per your preference. For kickoff and integration with senior management, we recommend initial presence; then it can shift to hybrid.'
    },
    {
      question: isEs
        ? '¿Qué tipo de PMO me conviene: Soporte, Control o Directivo?'
        : 'What type of PMO suits me: Supportive, Controlling or Directive?',
      answer: isEs
        ? 'Depende de madurez y necesidad. Soporte: equipos ya maduros, solo quieren mejoras. Control: estándares dispares, necesitas homogenizar. Directivo: proyectos críticos, necesitas que el PMO tome las riendas. En el diagnóstico te recomendamos el tipo y nivel adecuados.'
        : 'Depends on maturity and need. Supportive: teams already mature, just want improvements. Controlling: disparate standards, you need to homogenize. Directive: critical projects, you need the PMO to take the reins. In the diagnosis we recommend the right type and level.'
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
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[15%] right-[10%] w-40 h-40 bg-turquesa/5 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[20%] left-[5%] w-32 h-32 bg-menta/5 rounded-full blur-xl"
          />
        </div>

        <div className="container-custom relative z-10 pt-8 pb-16 lg:pb-20">
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
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-turquesa/20 rounded-2xl flex items-center justify-center border border-turquesa/30">
                  <Building2 className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    PMO Office
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Gestión de Proyectos' : 'Project Management'}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-turquesa/10 border border-turquesa/30 rounded-full px-4 py-2 mb-4">
                <LayoutDashboard className="w-4 h-4 text-turquesa" />
                <span className="text-turquesa text-sm font-medium">
                  {isEs ? 'Consultoría · Director PMO' : 'Consulting · PMO Director'}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs
                  ? 'Gobernanza, visibilidad y control de tu portafolio de proyectos'
                  : 'Governance, visibility and control of your project portfolio'}
              </h1>

              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {isEs
                  ? 'Implementa un PMO interno con nuestra consultoría o incorpora un Director PMO tercerizado. Dos modalidades para alinear proyectos con la estrategia, priorizar recursos y reducir el fracaso.'
                  : 'Implement an internal PMO with our consulting or bring in an outsourced PMO Director. Two modalities to align projects with strategy, prioritize resources and reduce failure.'}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto?subject=${encodeURIComponent(isEs ? 'Implementar PMO' : 'Implement PMO')}`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-6 py-3 rounded-lg hover:bg-menta transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Implementa PMO' : 'Implement PMO'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#caso-exito"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-medium px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Ver caso de éxito' : 'View success story'}
                </Link>
                <Link
                  href={`/${locale}/contacto?subject=${encodeURIComponent(isEs ? 'Director PMO' : 'PMO Director')}`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-medium px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Solicita Director PMO' : 'Request PMO Director'}
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '2', label: isEs ? 'modalidades' : 'modalities' },
                  { value: '2-4', label: isEs ? 'semanas PMO operativo' : 'weeks PMO operational' },
                  { icon: true, label: isEs ? 'Consultoría + Outsourcing' : 'Consulting + Outsourcing' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    {stat.icon ? (
                      <LayoutDashboard className="w-4 h-4 text-turquesa" />
                    ) : (
                      <span className="text-turquesa font-bold">{stat.value}</span>
                    )}
                    <span className="text-white/60 text-sm">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual - Dos modalidades */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-turquesa/20 rounded-full px-4 py-2 mb-3">
                    <Building2 className="w-5 h-5 text-turquesa" />
                    <span className="text-turquesa font-semibold">PMO</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {isEs ? 'Dos modalidades' : 'Two modalities'}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Consultoría o Director tercerizado' : 'Consulting or outsourced Director'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: BookOpen,
                      title: isEs ? 'Consultoría' : 'Consulting',
                      sub: isEs ? 'PMO interno' : 'Internal PMO',
                      color: 'turquesa'
                    },
                    {
                      icon: Network,
                      title: isEs ? 'Outsourcing' : 'Outsourcing',
                      sub: isEs ? 'Director PMO' : 'PMO Director',
                      color: 'menta'
                    }
                  ].map((mod, idx) => {
                    const ModIcon = mod.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className={`rounded-xl p-4 border border-white/10 ${
                          mod.color === 'turquesa' ? 'bg-turquesa/10' : 'bg-menta/10'
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                            mod.color === 'turquesa' ? 'bg-turquesa/20' : 'bg-menta/20'
                          }`}
                        >
                          <ModIcon
                            className={`w-6 h-6 ${
                              mod.color === 'turquesa' ? 'text-turquesa' : 'text-menta'
                            }`}
                          />
                        </div>
                        <span className="text-white font-medium text-sm block">{mod.title}</span>
                        <span className="text-white/60 text-xs">{mod.sub}</span>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-turquesa" />
                      <span className="text-white/70 text-sm">
                        {isEs ? 'Governance' : 'Governance'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-menta" />
                      <span className="text-white/70 text-sm">
                        {isEs ? 'Portafolio' : 'Portfolio'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUÉ ES PMO
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
                {isEs ? '¿Qué es un PMO?' : 'What is a PMO?'}
              </span>
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs
                  ? 'Project Management Office: el cerebro de tus proyectos'
                  : 'Project Management Office: the brain of your projects'}
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs
                    ? 'Un PMO (Project Management Office) es la unidad que centraliza la gobernanza, metodología y seguimiento del portafolio de proyectos. Define estándares, prioriza iniciativas, asigna recursos y reporta a la alta dirección.'
                    : 'A PMO (Project Management Office) is the unit that centralizes governance, methodology and portfolio tracking. It defines standards, prioritizes initiatives, allocates resources and reports to senior management.'}
                </p>
                <p>
                  {isEs
                    ? 'Sin PMO, los proyectos suelen gestionarse de forma aislada. Con PMO, tienes visibilidad única, criterios de priorización y capacidad de tomar decisiones basadas en datos.'
                    : 'Without a PMO, projects are often managed in isolation. With a PMO, you have single visibility, prioritization criteria and the ability to make data-driven decisions.'}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-blanco-hueso dark:bg-card rounded-2xl p-6 lg:p-8">
                <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-6 text-center">
                  {isEs ? 'Diagrama organizacional típico' : 'Typical organizational diagram'}
                </h3>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full max-w-xs flex flex-col items-center gap-2 p-4 bg-white dark:bg-background rounded-xl border-2 border-turquesa/20">
                    <Users className="w-8 h-8 text-turquesa" />
                    <span className="text-sm font-semibold text-azul-marino dark:text-white">
                      {isEs ? 'Alta Dirección' : 'Senior Management'}
                    </span>
                  </div>
                  <div className="w-1 h-6 bg-gris-arena/30 rounded" />
                  <div className="w-full max-w-xs flex flex-col items-center gap-2 p-4 bg-turquesa/10 rounded-xl border-2 border-turquesa/30">
                    <LayoutDashboard className="w-8 h-8 text-turquesa" />
                    <span className="text-sm font-semibold text-azul-marino dark:text-white">
                      PMO Office
                    </span>
                    <span className="text-xs text-foreground/60">
                      {isEs ? 'Gobernanza · Metodología · Portafolio' : 'Governance · Methodology · Portfolio'}
                    </span>
                  </div>
                  <div className="w-1 h-6 bg-gris-arena/30 rounded" />
                  <div className="grid grid-cols-3 gap-2 w-full max-w-md">
                    {[
                      isEs ? 'Proyecto A' : 'Project A',
                      isEs ? 'Proyecto B' : 'Project B',
                      isEs ? 'Proyecto C' : 'Project C'
                    ].map((label, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-1 p-3 bg-white dark:bg-background rounded-lg border border-gris-arena/20"
                      >
                        <Briefcase className="w-5 h-5 text-foreground/50" />
                        <span className="text-xs font-medium text-azul-marino dark:text-white">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* =====================================================
          DOS MODALIDADES
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
              {isEs ? 'Cómo trabajamos' : 'How we work'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Dos modalidades' : 'Two modalities'}
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              {isEs
                ? 'Elige entre construir capacidad interna o contar con un Director PMO de Alternative operando en tu organización.'
                : 'Choose between building internal capability or having an Alternative PMO Director operating in your organization.'}
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="relative bg-white dark:bg-background rounded-2xl p-8 lg:p-10 shadow-brand hover:shadow-brand-lg transition-all duration-300 h-full overflow-hidden group"
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-turquesa/10 rounded-lg rotate-12 group-hover:rotate-45 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-turquesa/20 rounded-2xl flex items-center justify-center mb-6">
                    <BookOpen className="w-8 h-8 text-turquesa" />
                  </div>
                  <span className="inline-block px-3 py-1 bg-turquesa/10 text-turquesa text-sm font-semibold rounded-full mb-4">
                    {isEs ? 'Modalidad A' : 'Modality A'}
                  </span>
                  <h3 className="text-2xl font-semibold text-azul-marino dark:text-white mb-4">
                    {isEs ? 'Consultoría: crear PMO interno' : 'Consulting: build internal PMO'}
                  </h3>
                  <p className="text-foreground/70 mb-6 leading-relaxed">
                    {isEs
                      ? 'Te acompañamos para diseñar e implementar un PMO propio. Definimos governance, metodología, plantillas y dashboards. Capacitamos a tu equipo para que lo opere. Ideal si quieres ownership total y capacidad interna a largo plazo.'
                      : 'We accompany you to design and implement your own PMO. We define governance, methodology, templates and dashboards. We train your team to operate it. Ideal if you want total ownership and internal capability long term.'}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      isEs ? 'Diseño de governance y comités' : 'Governance and committee design',
                      isEs ? 'Metodología y estándares' : 'Methodology and standards',
                      isEs ? 'Plantillas y guías' : 'Templates and guides',
                      isEs ? 'Capacitación a tu equipo' : 'Training for your team',
                      isEs ? 'PMO operado por tu organización' : 'PMO operated by your organization'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0" />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${locale}/contacto?subject=${encodeURIComponent(isEs ? 'Consultoría PMO' : 'PMO Consulting')}`}
                    className="inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-6 py-3 rounded-lg hover:bg-menta transition-all duration-300 group/link"
                  >
                    {isEs ? 'Solicitar consultoría PMO' : 'Request PMO consulting'}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                whileHover={{ y: -4 }}
                className="relative bg-white dark:bg-background rounded-2xl p-8 lg:p-10 shadow-brand hover:shadow-brand-lg transition-all duration-300 h-full overflow-hidden group border-2 border-menta/30"
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-menta/10 rounded-lg rotate-12 group-hover:rotate-45 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-menta/20 rounded-2xl flex items-center justify-center mb-6">
                    <Network className="w-8 h-8 text-menta" />
                  </div>
                  <span className="inline-block px-3 py-1 bg-menta/10 text-menta text-sm font-semibold rounded-full mb-4">
                    {isEs ? 'Modalidad B' : 'Modality B'}
                  </span>
                  <h3 className="text-2xl font-semibold text-azul-marino dark:text-white mb-4">
                    {isEs ? 'Outsourcing: Director PMO tercerizado' : 'Outsourcing: outsourced PMO Director'}
                  </h3>
                  <p className="text-foreground/70 mb-6 leading-relaxed">
                    {isEs
                      ? 'Un experto Alternative actúa como Director de PMO en tu empresa. Llega, se integra y opera el PMO día a día: governance, priorización, reportes, seguimiento. Sin contratación ni curva de aprendizaje. Resultados en 2-4 semanas.'
                      : 'An Alternative expert acts as PMO Director in your company. They arrive, integrate and operate the PMO day to day: governance, prioritization, reports, tracking. No hiring or learning curve. Results in 2-4 weeks.'}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      isEs ? 'Director PMO dedicado' : 'Dedicated PMO Director',
                      isEs ? 'Operación día a día' : 'Day-to-day operation',
                      isEs ? 'Integración en 2-4 semanas' : 'Integration in 2-4 weeks',
                      isEs ? 'Sin proceso de contratación' : 'No hiring process',
                      isEs ? 'Flexibilidad de duración' : 'Duration flexibility'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0" />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${locale}/contacto?subject=${encodeURIComponent(isEs ? 'Director PMO' : 'PMO Director')}`}
                    className="inline-flex items-center gap-2 bg-menta text-azul-marino font-semibold px-6 py-3 rounded-lg hover:bg-turquesa hover:text-white transition-all duration-300 group/link"
                  >
                    {isEs ? 'Solicitar Director PMO' : 'Request PMO Director'}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROBLEMA QUE RESUELVE
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
              {isEs ? 'El problema' : 'The problem'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Problemas que resuelve un PMO' : 'Problems a PMO solves'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((p, idx) => {
              const colors = colorClasses[p.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-blanco-hueso dark:bg-card p-6 rounded-2xl shadow-brand hover:shadow-brand-lg transition-all duration-300 h-full border-l-4 ${colors.border.replace('/20', '')}`}
                  >
                    <div
                      className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}
                    >
                      <p.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                      {p.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">{p.description}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          QUÉ INCLUYE PMO COMPLETO
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
              {isEs ? 'Alcance' : 'Scope'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Qué incluye un PMO completo' : 'What a full PMO includes'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {pmoIncludes.map((item, idx) => {
              const colors = colorClasses[item.color as keyof typeof colorClasses];
              const ItemIcon = item.icon;
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-white dark:bg-background p-6 rounded-2xl shadow-brand hover:shadow-brand-lg transition-all duration-300 h-full border-t-4 ${colors.border.replace('/20', '')}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}
                      >
                        <ItemIcon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-foreground/70 leading-relaxed">{item.description}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          BENEFICIOS
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-azul-marino">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              {isEs ? 'Beneficios medibles' : 'Measurable benefits'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => {
              const BenefitIcon = benefit.icon;
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 text-center"
                  >
                    <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <BenefitIcon className="w-7 h-7 text-turquesa" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-turquesa mb-1">
                      {benefit.stat}
                    </div>
                    <div className="text-sm text-white/80 font-medium mb-2">{benefit.label}</div>
                    <p className="text-white/60 text-sm">{benefit.description}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          CASE STUDY
          ===================================================== */}
      <section id="caso-exito" className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-blanco-hueso dark:bg-card rounded-3xl p-8 lg:p-12 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-turquesa/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-turquesa" />
                  </div>
                  <div>
                    <span className="text-turquesa font-medium text-sm uppercase tracking-wider">
                      {isEs ? 'Caso de Éxito' : 'Success Story'}
                    </span>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                      {isEs
                        ? 'Empresa de tecnología implementa PMO'
                        : 'Technology company implements PMO'}
                    </h3>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-6">
                      <p className="text-sm text-foreground/60 mb-2">
                        {isEs ? 'Tecnología • 400 empleados' : 'Technology • 400 employees'}
                      </p>
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Desafío' : 'Challenge'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs
                          ? 'Más de 25 proyectos activos sin visibilidad consolidada. Conflictos por recursos, metodologías distintas por equipo, y junta directiva sin un solo dashboard. Alta rotación de PMs y proyectos retrasados.'
                          : 'Over 25 active projects with no consolidated visibility. Resource conflicts, different methodologies per team, and board without a single dashboard. High PM turnover and delayed projects.'}
                      </p>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución' : 'Solution'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs
                          ? 'Consultoría PMO: diseño de governance, estándares únicos, priorización por valor. Implementación en 3 meses. Director PMO Alternative operando los primeros 6 meses hasta traspaso a equipo interno.'
                          : 'PMO Consulting: governance design, single standards, value-based prioritization. Implementation in 3 months. Alternative PMO Director operating first 6 months until handover to internal team.'}
                      </p>
                    </div>
                    <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                      {isEs
                        ? '"Por fin tenemos un solo lugar donde ver todos los proyectos. La junta toma decisiones con datos, no con intuición."'
                        : '"We finally have one place to see all projects. The board makes decisions with data, not intuition."'}
                      <span className="block mt-2 text-sm text-turquesa not-italic font-medium">
                        — COO, Empresa de Tecnología
                      </span>
                    </blockquote>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        value: '1',
                        label: isEs ? 'dashboard' : 'dashboard',
                        sub: isEs ? 'portafolio único' : 'single portfolio'
                      },
                      {
                        value: '40%',
                        label: isEs ? 'menos retrasos' : 'fewer delays',
                        sub: isEs ? 'primer año' : 'first year'
                      },
                      {
                        value: '100%',
                        label: isEs ? 'estándar' : 'standard',
                        sub: isEs ? 'metodología única' : 'single methodology'
                      },
                      {
                        value: '6',
                        label: isEs ? 'meses' : 'months',
                        sub: isEs ? 'hasta traspaso' : 'to handover'
                      }
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white dark:bg-background p-4 rounded-2xl shadow-brand text-center"
                      >
                        <div className="text-2xl font-bold text-turquesa mb-1">
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
          TIPOS DE PMO
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
              {isEs ? 'Modelos' : 'Models'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Tipos de PMO' : 'Types of PMO'}
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              {isEs
                ? 'El nivel de control y participación del PMO varía según madurez y necesidades. Te ayudamos a elegir el adecuado.'
                : 'PMO control and involvement level varies by maturity and needs. We help you choose the right one.'}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {pmoTypes.map((pmotype, idx) => {
              const colors = colorClasses[pmotype.color as keyof typeof colorClasses];
              const TypeIcon = pmotype.icon;
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-white dark:bg-background p-6 rounded-2xl shadow-brand hover:shadow-brand-lg transition-all duration-300 h-full border-t-4 ${colors.border.replace('/20', '')}`}
                  >
                    <div
                      className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}
                    >
                      <TypeIcon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                      {pmotype.name}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">{pmotype.description}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          FAQ
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
          CTA FINAL
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-violeta relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-turquesa/10 rounded-full blur-2xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                <Building2 className="w-5 h-5 text-white" />
                <span className="text-white/90 text-sm font-medium">
                  {isEs ? 'PMO · Consultoría y Director' : 'PMO · Consulting & Director'}
                </span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs
                  ? '¿Listo para gobernar tu portafolio de proyectos?'
                  : 'Ready to govern your project portfolio?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs
                  ? 'Diagnóstico gratuito: evaluamos tu situación y te recomendamos consultoría PMO o Director tercerizado. Respuesta en 48-72 horas.'
                  : 'Free diagnosis: we evaluate your situation and recommend PMO consulting or outsourced Director. Response in 48-72 hours.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/${locale}/contacto?subject=${encodeURIComponent(isEs ? 'Consultoría PMO' : 'PMO Consulting')}`}
                    className="inline-flex items-center gap-3 bg-white text-violeta font-semibold px-8 py-4 rounded-lg hover:bg-menta hover:text-azul-marino transition-all duration-300 shadow-lg group"
                  >
                    {isEs ? 'Consultoría PMO' : 'PMO Consulting'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/${locale}/contacto?subject=${encodeURIComponent(isEs ? 'Director PMO' : 'PMO Director')}`}
                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white font-medium px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                  >
                    {isEs ? 'Director PMO' : 'PMO Director'}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href="https://wa.me/50769908906"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white font-medium px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
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

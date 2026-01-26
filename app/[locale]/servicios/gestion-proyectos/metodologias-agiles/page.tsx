'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import {
  Zap,
  ArrowRight,
  ChevronDown,
  Users,
  Code,
  Rocket,
  Lightbulb,
  Smartphone,
  RefreshCw,
  Target,
  Clock,
  TrendingUp,
  Award,
  CheckCircle2,
  Phone,
  Calendar,
  LayoutGrid,
  GitBranch,
  MessageSquare,
  BarChart3,
  Building2,
  Timer,
  Repeat,
  ClipboardCheck,
  Layers,
  ArrowUpRight,
  Play,
  Gauge,
  Shield
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

export default function MetodologiasAgilesPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Gestión de Proyectos' : 'Project Management', href: `/${locale}/servicios/gestion-proyectos` },
    { label: isEs ? 'Metodologías Ágiles' : 'Agile Methodologies', href: null }
  ];

  // =====================================================
  // CONTENT DATA
  // =====================================================

  const agileFrameworks = [
    {
      name: 'Scrum',
      icon: Repeat,
      description: isEs
        ? 'Sprints de 2-4 semanas, roles definidos (PO, SM, Dev Team), ceremonias claras. Ideal para desarrollo iterativo.'
        : '2-4 week sprints, defined roles (PO, SM, Dev Team), clear ceremonies. Ideal for iterative development.',
      color: 'turquesa'
    },
    {
      name: 'Kanban',
      icon: LayoutGrid,
      description: isEs
        ? 'Flujo continuo, límites WIP, visualización tablero. Ideal para operaciones y mantenimiento.'
        : 'Continuous flow, WIP limits, board visualization. Ideal for operations and maintenance.',
      color: 'menta'
    },
    {
      name: 'SAFe',
      icon: Layers,
      description: isEs
        ? 'Scaled Agile Framework para empresas grandes. ARTs, PI Planning, múltiples equipos coordinados.'
        : 'Scaled Agile Framework for large enterprises. ARTs, PI Planning, multiple coordinated teams.',
      color: 'violeta'
    },
    {
      name: 'Lean',
      icon: Gauge,
      description: isEs
        ? 'Eliminar desperdicio, entregar valor rápido, mejorar continuamente. Base filosófica de ágil.'
        : 'Eliminate waste, deliver value fast, continuously improve. Philosophical basis of agile.',
      color: 'turquesa'
    }
  ];

  const projectTypes = [
    {
      icon: Code,
      title: isEs ? 'Desarrollo de Software' : 'Software Development',
      description: isEs
        ? 'Apps, plataformas, sistemas internos. Requisitos cambiantes, entregas incrementales.'
        : 'Apps, platforms, internal systems. Changing requirements, incremental deliveries.'
    },
    {
      icon: Rocket,
      title: isEs ? 'Startups y MVPs' : 'Startups & MVPs',
      description: isEs
        ? 'Validar rápido, pivotar según feedback. Time-to-market crítico.'
        : 'Validate quickly, pivot based on feedback. Critical time-to-market.'
    },
    {
      icon: Smartphone,
      title: isEs ? 'Productos Digitales' : 'Digital Products',
      description: isEs
        ? 'Apps móviles, SaaS, e-commerce. Mejora continua basada en métricas.'
        : 'Mobile apps, SaaS, e-commerce. Continuous improvement based on metrics.'
    },
    {
      icon: Lightbulb,
      title: isEs ? 'Innovación' : 'Innovation',
      description: isEs
        ? 'Labs, R&D, nuevos productos. Alta incertidumbre, experimentación rápida.'
        : 'Labs, R&D, new products. High uncertainty, rapid experimentation.'
    },
    {
      icon: RefreshCw,
      title: isEs ? 'Transformación Digital' : 'Digital Transformation',
      description: isEs
        ? 'Modernización de sistemas, adopción de nuevas tecnologías.'
        : 'System modernization, adoption of new technologies.'
    },
    {
      icon: Users,
      title: isEs ? 'Equipos de Producto' : 'Product Teams',
      description: isEs
        ? 'Equipos permanentes que evolucionan productos continuamente.'
        : 'Permanent teams that continuously evolve products.'
    }
  ];

  const scrumMasterProfile = {
    certifications: [
      { name: 'CSM / PSM I-II', description: isEs ? 'Certified Scrum Master o Professional Scrum Master' : 'Certified Scrum Master or Professional Scrum Master' },
      { name: 'SAFe SM / SAFe RTE', description: isEs ? 'Para implementaciones escaladas' : 'For scaled implementations' },
      { name: 'ICAgile / PMI-ACP', description: isEs ? 'Certificaciones complementarias' : 'Complementary certifications' }
    ],
    frameworks: [
      isEs ? 'Scrum (dominio completo del framework)' : 'Scrum (complete framework mastery)',
      isEs ? 'Kanban (flujo, métricas, mejora)' : 'Kanban (flow, metrics, improvement)',
      isEs ? 'SAFe (equipos en contexto enterprise)' : 'SAFe (teams in enterprise context)',
      isEs ? 'XP Practices (TDD, Pair Programming)' : 'XP Practices (TDD, Pair Programming)'
    ],
    tools: [
      'Jira / Azure DevOps / Trello',
      'Confluence / Notion',
      'Miro / Mural',
      isEs ? 'Herramientas de retrospectiva' : 'Retrospective tools'
    ],
    softSkills: [
      isEs ? 'Facilitación de equipos' : 'Team facilitation',
      isEs ? 'Coaching ágil' : 'Agile coaching',
      isEs ? 'Resolución de impedimentos' : 'Impediment resolution',
      isEs ? 'Gestión del cambio' : 'Change management'
    ]
  };

  const timeline = [
    {
      phase: isEs ? 'SEMANA 0-1' : 'WEEK 0-1',
      title: isEs ? 'Setup y Onboarding' : 'Setup & Onboarding',
      icon: Play,
      items: isEs
        ? ['Conocer al equipo y stakeholders', 'Evaluar madurez ágil actual', 'Configurar herramientas (Jira, board)', 'Definir Definition of Done', 'Preparar primer Sprint Planning']
        : ['Meet team and stakeholders', 'Assess current agile maturity', 'Configure tools (Jira, board)', 'Define Definition of Done', 'Prepare first Sprint Planning'],
      color: 'turquesa'
    },
    {
      phase: isEs ? 'SPRINT 1' : 'SPRINT 1',
      title: isEs ? 'Primer Ciclo Completo' : 'First Complete Cycle',
      icon: Repeat,
      items: isEs
        ? ['Sprint Planning colaborativo', 'Daily standups (15 min)', 'Monitorear impedimentos', 'Sprint Review con stakeholders', 'Retrospectiva: qué mejorar']
        : ['Collaborative Sprint Planning', 'Daily standups (15 min)', 'Monitor impediments', 'Sprint Review with stakeholders', 'Retrospective: what to improve'],
      color: 'menta'
    },
    {
      phase: isEs ? 'SPRINTS 2-N' : 'SPRINTS 2-N',
      title: isEs ? 'Mejora Continua' : 'Continuous Improvement',
      icon: TrendingUp,
      items: isEs
        ? ['Refinar backlog continuamente', 'Implementar mejoras de retrospectivas', 'Optimizar velocidad del equipo', 'Métricas: cycle time, velocity, burndown', 'Coaching continuo al equipo']
        : ['Continuously refine backlog', 'Implement retrospective improvements', 'Optimize team velocity', 'Metrics: cycle time, velocity, burndown', 'Continuous team coaching'],
      color: 'violeta'
    }
  ];

  const benefits = [
    {
      stat: '2-4',
      statLabel: isEs ? 'semanas' : 'weeks',
      title: isEs ? 'Entregas Frecuentes' : 'Frequent Deliveries',
      description: isEs
        ? 'Valor entregado cada sprint. No esperas 6 meses para ver resultados.'
        : 'Value delivered every sprint. You don\'t wait 6 months to see results.',
      icon: Calendar
    },
    {
      stat: '40%+',
      statLabel: isEs ? 'reducción' : 'reduction',
      title: isEs ? 'Time-to-Market' : 'Time-to-Market',
      description: isEs
        ? 'Lanzas más rápido que con metodología tradicional.'
        : 'You launch faster than with traditional methodology.',
      icon: Timer
    },
    {
      stat: '85%',
      statLabel: isEs ? 'menos' : 'less',
      title: isEs ? 'Cambios de Última Hora' : 'Last Minute Changes',
      description: isEs
        ? 'Feedback continuo evita sorpresas al final del proyecto.'
        : 'Continuous feedback prevents surprises at the end of the project.',
      icon: MessageSquare
    },
    {
      stat: '3x',
      statLabel: isEs ? 'más' : 'more',
      title: isEs ? 'Satisfacción del Equipo' : 'Team Satisfaction',
      description: isEs
        ? 'Equipos empoderados, con autonomía y propósito claro.'
        : 'Empowered teams, with autonomy and clear purpose.',
      icon: Users
    },
    {
      stat: '90%',
      statLabel: isEs ? 'cumplimiento' : 'compliance',
      title: isEs ? 'Expectativas Alineadas' : 'Aligned Expectations',
      description: isEs
        ? 'Stakeholders ven progreso real cada 2-4 semanas.'
        : 'Stakeholders see real progress every 2-4 weeks.',
      icon: Target
    }
  ];

  const caseStudy = {
    title: isEs ? 'Fintech lanza app móvil en 4 meses' : 'Fintech launches mobile app in 4 months',
    industry: isEs ? 'Fintech • Panamá' : 'Fintech • Panama',
    context: isEs 
      ? 'Startup fintech necesitaba lanzar app de pagos móviles antes que competencia entrara al mercado. Equipo de desarrollo sin experiencia en ágil.'
      : 'Fintech startup needed to launch mobile payments app before competition entered the market. Development team with no agile experience.',
    solution: isEs
      ? 'Scrum Master dedicado desde día 1. Sprints de 2 semanas, releases cada mes, feedback de usuarios beta integrado en backlog.'
      : 'Dedicated Scrum Master from day 1. 2-week sprints, monthly releases, beta user feedback integrated into backlog.',
    quote: isEs
      ? '"El Scrum Master de Alternative transformó cómo trabajamos. Pasamos de caos a entregas predecibles en 3 sprints."'
      : '"Alternative\'s Scrum Master transformed how we work. We went from chaos to predictable deliveries in 3 sprints."',
    quotePerson: 'CTO',
    stats: [
      { value: '4', label: isEs ? 'meses a producción' : 'months to production' },
      { value: '12', label: isEs ? 'sprints completados' : 'sprints completed' },
      { value: '95%', label: isEs ? 'user stories entregadas' : 'user stories delivered' },
      { value: '50K', label: isEs ? 'usuarios en 6 meses' : 'users in 6 months' }
    ]
  };

  const scrumVsKanban = [
    {
      aspect: isEs ? 'Ritmo de trabajo' : 'Work rhythm',
      scrum: isEs ? 'Sprints fijos (2-4 semanas)' : 'Fixed sprints (2-4 weeks)',
      kanban: isEs ? 'Flujo continuo' : 'Continuous flow'
    },
    {
      aspect: isEs ? 'Roles' : 'Roles',
      scrum: isEs ? 'PO, SM, Dev Team definidos' : 'PO, SM, Dev Team defined',
      kanban: isEs ? 'Roles flexibles/existentes' : 'Flexible/existing roles'
    },
    {
      aspect: isEs ? 'Planificación' : 'Planning',
      scrum: isEs ? 'Sprint Planning cada iteración' : 'Sprint Planning each iteration',
      kanban: isEs ? 'Reposición continua del backlog' : 'Continuous backlog replenishment'
    },
    {
      aspect: isEs ? 'Cambios' : 'Changes',
      scrum: isEs ? 'Protegidos durante el sprint' : 'Protected during sprint',
      kanban: isEs ? 'Pueden entrar en cualquier momento' : 'Can enter at any time'
    },
    {
      aspect: isEs ? 'Métricas clave' : 'Key metrics',
      scrum: isEs ? 'Velocity, Burndown' : 'Velocity, Burndown',
      kanban: isEs ? 'Lead Time, Cycle Time, WIP' : 'Lead Time, Cycle Time, WIP'
    },
    {
      aspect: isEs ? 'Ideal para' : 'Ideal for',
      scrum: isEs ? 'Desarrollo de producto' : 'Product development',
      kanban: isEs ? 'Operaciones, soporte, mantenimiento' : 'Operations, support, maintenance'
    }
  ];

  const faqs = [
    {
      question: isEs ? '¿Cuál es la diferencia entre Scrum Master y Project Manager tradicional?' : 'What\'s the difference between Scrum Master and traditional Project Manager?',
      answer: isEs
        ? 'El PM tradicional dirige y asigna tareas. El Scrum Master facilita y remueve impedimentos. El equipo es auto-organizado y toma decisiones técnicas. El SM no es jefe del equipo; es su facilitador y coach. Reporta a la organización sobre adopción ágil, no sobre desempeño individual.'
        : 'The traditional PM directs and assigns tasks. The Scrum Master facilitates and removes impediments. The team is self-organized and makes technical decisions. The SM is not the team\'s boss; they\'re their facilitator and coach. They report to the organization on agile adoption, not individual performance.'
    },
    {
      question: isEs ? '¿Cuánto tiempo necesitamos un Scrum Master externo?' : 'How long do we need an external Scrum Master?',
      answer: isEs
        ? 'Típicamente 3-6 meses para establecer prácticas sólidas. Después opciones: entrenar SM interno, reducir a coaching quincenal, o mantener si el valor lo justifica. Nuestro objetivo es dejar capacidad instalada, no dependencia.'
        : 'Typically 3-6 months to establish solid practices. Then options: train internal SM, reduce to bi-weekly coaching, or maintain if value justifies it. Our goal is to leave installed capacity, not dependency.'
    },
    {
      question: isEs ? '¿Ágil funciona para proyectos no-software?' : 'Does Agile work for non-software projects?',
      answer: isEs
        ? 'Sí, con adaptaciones. Marketing, HR, operaciones usan Kanban exitosamente. Hardware y construcción usan híbridos ágil-waterfall. El principio de entregas incrementales y feedback continuo aplica a casi cualquier trabajo de conocimiento.'
        : 'Yes, with adaptations. Marketing, HR, operations use Kanban successfully. Hardware and construction use agile-waterfall hybrids. The principle of incremental deliveries and continuous feedback applies to almost any knowledge work.'
    },
    {
      question: isEs ? '¿Qué pasa si el equipo ya tiene Project Manager?' : 'What if the team already has a Project Manager?',
      answer: isEs
        ? 'Pueden coexistir. El PM gestiona stakeholders, presupuesto, contratos. El SM facilita al equipo de desarrollo. En transiciones, a veces el PM evoluciona a SM o a Product Owner. Evaluamos caso por caso.'
        : 'They can coexist. The PM manages stakeholders, budget, contracts. The SM facilitates the development team. In transitions, sometimes the PM evolves to SM or Product Owner. We evaluate case by case.'
    },
    {
      question: isEs ? '¿Cómo miden el éxito del Scrum Master?' : 'How do you measure Scrum Master success?',
      answer: isEs
        ? 'Métricas de equipo, no individuales: velocidad sostenible, predictibilidad de entregas, satisfacción del equipo (encuestas), reducción de impedimentos, calidad de retrospectivas, madurez ágil progresiva.'
        : 'Team metrics, not individual: sustainable velocity, delivery predictability, team satisfaction (surveys), impediment reduction, retrospective quality, progressive agile maturity.'
    },
    {
      question: isEs ? '¿Scrum funciona con equipos remotos o híbridos?' : 'Does Scrum work with remote or hybrid teams?',
      answer: isEs
        ? 'Absolutamente. Dailys por video, boards digitales (Jira, Miro), herramientas de retrospectiva virtual. De hecho, Scrum provee estructura que equipos remotos necesitan para coordinarse efectivamente.'
        : 'Absolutely. Dailies by video, digital boards (Jira, Miro), virtual retrospective tools. In fact, Scrum provides structure that remote teams need to coordinate effectively.'
    }
  ];

  const colorClasses = {
    turquesa: { bg: 'bg-turquesa/10', text: 'text-turquesa', border: 'border-turquesa/20' },
    menta: { bg: 'bg-menta/10', text: 'text-menta', border: 'border-menta/20' },
    violeta: { bg: 'bg-violeta/10', text: 'text-violeta', border: 'border-violeta/20' }
  };

  return (
    <>
      {/* Reading Progress Indicator */}
      <ReadingProgress />

      {/* Service Sidebar */}
      <ServiceSidebar 
        locale={locale} 
        currentService="gestion-proyectos"
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
                  <Zap className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Metodologías Ágiles' : 'Agile Methodologies'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Gestión de Proyectos' : 'Project Management'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Scrum Masters y PMs Ágiles para entregar valor más rápido'
                  : 'Scrum Masters and Agile PMs to deliver value faster'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Asignamos Scrum Masters certificados que transforman equipos de desarrollo. Entregas cada 2-4 semanas, feedback continuo, mejora constante. Ideal para proyectos de software, productos digitales e innovación.'
                  : 'We assign certified Scrum Masters who transform development teams. Deliveries every 2-4 weeks, continuous feedback, constant improvement. Ideal for software projects, digital products, and innovation.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Solicitar Scrum Master' : 'Request Scrum Master'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#caso-exito"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Ver caso de éxito' : 'View success story'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '50+', label: isEs ? 'proyectos ágiles' : 'agile projects' },
                  { value: '2-4', label: isEs ? 'semanas por sprint' : 'weeks per sprint' },
                  { icon: true, label: isEs ? 'CSM/PSM certificados' : 'CSM/PSM certified' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    {stat.icon ? (
                      <Award className="w-4 h-4 text-turquesa" />
                    ) : (
                      <span className="text-turquesa font-bold">{stat.value}</span>
                    )}
                    <span className="text-white/60 text-sm">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual - Scrum Board */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold">Sprint Board</h3>
                  <span className="text-turquesa text-sm">Sprint 12</span>
                </div>
                
                {/* Kanban Columns */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { title: 'Backlog', items: 3, color: 'white/10' },
                    { title: 'To Do', items: 4, color: 'turquesa/20' },
                    { title: 'In Progress', items: 2, color: 'menta/20' },
                    { title: 'Done', items: 5, color: 'violeta/20' }
                  ].map((col, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className={`bg-${col.color} rounded-xl p-3`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/80 text-xs font-medium">{col.title}</span>
                        <span className="text-white/40 text-xs">{col.items}</span>
                      </div>
                      <div className="space-y-2">
                        {Array.from({ length: Math.min(col.items, 3) }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-white/10 rounded-lg h-8 w-full"
                          />
                        ))}
                        {col.items > 3 && (
                          <span className="text-white/40 text-xs">+{col.items - 3} more</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Sprint Progress */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/60 text-sm">Sprint Progress</span>
                    <span className="text-turquesa text-sm font-medium">72%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '72%' }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="h-full bg-turquesa rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT ARE AGILE METHODOLOGIES SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                               rounded-full text-sm font-medium mb-4">
                {isEs ? '¿Qué son las Metodologías Ágiles?' : 'What are Agile Methodologies?'}
              </span>
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs 
                  ? 'Entregar valor incremental con feedback continuo'
                  : 'Deliver incremental value with continuous feedback'}
              </h2>
              
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs 
                    ? 'Las metodologías ágiles son un conjunto de marcos de trabajo que priorizan entregas frecuentes, colaboración cercana con el cliente y adaptación al cambio. En lugar de planificar todo por adelantado, trabajas en ciclos cortos (sprints) entregando valor incremental.'
                    : 'Agile methodologies are a set of frameworks that prioritize frequent deliveries, close collaboration with the customer, and adaptation to change. Instead of planning everything upfront, you work in short cycles (sprints) delivering incremental value.'}
                </p>
                <p>
                  <strong className="text-azul-marino dark:text-white">
                    {isEs ? 'El Manifiesto Ágil:' : 'The Agile Manifesto:'}
                  </strong>{' '}
                  {isEs 
                    ? 'Individuos e interacciones sobre procesos y herramientas. Software funcionando sobre documentación extensiva. Colaboración con el cliente sobre negociación contractual. Respuesta al cambio sobre seguir un plan.'
                    : 'Individuals and interactions over processes and tools. Working software over comprehensive documentation. Customer collaboration over contract negotiation. Responding to change over following a plan.'}
                </p>
                <p>
                  <strong className="text-azul-marino dark:text-white">
                    {isEs ? 'Beneficio clave:' : 'Key benefit:'}
                  </strong>{' '}
                  {isEs 
                    ? 'Reduces riesgo dramáticamente. Si algo está mal, lo descubres en 2 semanas, no en 6 meses.'
                    : 'You dramatically reduce risk. If something is wrong, you discover it in 2 weeks, not 6 months.'}
                </p>
              </div>
            </AnimatedSection>

            {/* Agile Frameworks Grid */}
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {agileFrameworks.map((framework, idx) => {
                  const colors = colorClasses[framework.color as keyof typeof colorClasses];
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03, y: -5 }}
                      className={`${colors.bg} rounded-2xl p-5 border ${colors.border}
                                 hover:shadow-brand transition-all duration-300`}
                    >
                      <div className={`w-12 h-12 ${colors.bg} rounded-xl 
                                      flex items-center justify-center mb-3`}>
                        <framework.icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <h4 className={`font-semibold ${colors.text} text-lg mb-2`}>
                        {framework.name}
                      </h4>
                      <p className="text-sm text-foreground/60 leading-relaxed">
                        {framework.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECT TYPES SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs 
                ? '¿Para qué proyectos funciona ágil?'
                : 'What projects does agile work for?'}
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              {isEs
                ? 'Ágil es ideal cuando requisitos pueden cambiar, entregas incrementales son posibles, y feedback temprano tiene valor.'
                : 'Agile is ideal when requirements may change, incremental deliveries are possible, and early feedback has value.'}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectTypes.map((project, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-background p-6 rounded-2xl shadow-brand 
                             hover:shadow-brand-lg transition-all duration-300 h-full"
                >
                  <div className="w-14 h-14 bg-turquesa/10 rounded-xl 
                                  flex items-center justify-center mb-4">
                    <project.icon className="w-7 h-7 text-turquesa" />
                  </div>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          SCRUM MASTER PROFILE SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Perfil de Nuestros Scrum Masters' : 'Our Scrum Masters Profile'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Facilitadores expertos que transforman equipos' : 'Expert facilitators who transform teams'}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Certifications */}
            <AnimatedSection delay={0.1}>
              <div className="bg-blanco-hueso dark:bg-card p-8 rounded-2xl h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center">
                    <Award className="w-7 h-7 text-turquesa" />
                  </div>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                    {isEs ? 'Certificaciones' : 'Certifications'}
                  </h3>
                </div>
                <div className="space-y-4">
                  {scrumMasterProfile.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-azul-marino dark:text-white">{cert.name}</span>
                        <p className="text-sm text-foreground/60">{cert.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Frameworks */}
            <AnimatedSection delay={0.2}>
              <div className="bg-blanco-hueso dark:bg-card p-8 rounded-2xl h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-menta/20 rounded-xl flex items-center justify-center">
                    <GitBranch className="w-7 h-7 text-menta" />
                  </div>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                    {isEs ? 'Frameworks Dominados' : 'Mastered Frameworks'}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {scrumMasterProfile.frameworks.map((framework, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0" />
                      <span className="text-foreground/70">{framework}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Tools */}
            <AnimatedSection delay={0.3}>
              <div className="bg-blanco-hueso dark:bg-card p-8 rounded-2xl h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-violeta/20 rounded-xl flex items-center justify-center">
                    <ClipboardCheck className="w-7 h-7 text-violeta" />
                  </div>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                    {isEs ? 'Herramientas' : 'Tools'}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {scrumMasterProfile.tools.map((tool, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violeta flex-shrink-0" />
                      <span className="text-foreground/70">{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Soft Skills */}
            <AnimatedSection delay={0.4}>
              <div className="bg-blanco-hueso dark:bg-card p-8 rounded-2xl h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center">
                    <Users className="w-7 h-7 text-turquesa" />
                  </div>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                    {isEs ? 'Habilidades Blandas' : 'Soft Skills'}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {scrumMasterProfile.softSkills.map((skill, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0" />
                      <span className="text-foreground/70">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW SCRUM MASTER WORKS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Cómo trabaja el Scrum Master' : 'How the Scrum Master works'}
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            {timeline.map((phase, idx) => {
              const colors = colorClasses[phase.color as keyof typeof colorClasses];
              return (
                <AnimatedSection key={idx} delay={idx * 0.15}>
                  <div className="relative flex gap-6 pb-12 last:pb-0">
                    {/* Timeline Line */}
                    {idx < timeline.length - 1 && (
                      <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gris-arena/20" />
                    )}
                    
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 ${colors.bg} rounded-xl 
                                    flex items-center justify-center border ${colors.border} z-10`}>
                      <phase.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <span className={`text-sm font-medium ${colors.text}`}>
                        {phase.phase}
                      </span>
                      <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                        {phase.title}
                      </h3>
                      <ul className="space-y-2">
                        {phase.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2 text-foreground/70">
                            <ArrowRight className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-1`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
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
              {isEs 
                ? 'Beneficios medibles de trabajar con ágil'
                : 'Measurable benefits of working with agile'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 
                             hover:bg-white/10 transition-all duration-300 h-full"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-turquesa" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-turquesa">{benefit.stat}</div>
                      <div className="text-xs text-white/60">{benefit.statLabel}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
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
      <section id="caso-exito" className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-blanco-hueso dark:bg-card rounded-3xl p-8 lg:p-12 overflow-hidden relative">
              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-turquesa/5 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-turquesa" />
                  </div>
                  <div>
                    <span className="text-turquesa font-medium text-sm uppercase tracking-wider">
                      {isEs ? 'Caso de Éxito' : 'Success Story'}
                    </span>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                      {caseStudy.title}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left - Description */}
                  <div>
                    <p className="text-sm text-foreground/60 mb-4">
                      {caseStudy.industry}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Contexto' : 'Context'}
                      </h4>
                      <p className="text-foreground/70">
                        {caseStudy.context}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución' : 'Solution'}
                      </h4>
                      <p className="text-foreground/70">
                        {caseStudy.solution}
                      </p>
                    </div>

                    <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                      {caseStudy.quote}
                      <span className="block mt-2 text-sm text-turquesa not-italic font-medium">
                        — {caseStudy.quotePerson}
                      </span>
                    </blockquote>
                  </div>

                  {/* Right - Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {caseStudy.stats.map((stat, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white dark:bg-background p-4 rounded-2xl shadow-brand text-center"
                      >
                        <div className="text-2xl font-bold text-turquesa mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-azul-marino dark:text-white font-medium">
                          {stat.label}
                        </div>
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
          SCRUM VS KANBAN SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Scrum vs Kanban: ¿Cuál elegir?' : 'Scrum vs Kanban: Which to choose?'}
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              {isEs
                ? 'Ambos son válidos. La elección depende del tipo de trabajo y contexto.'
                : 'Both are valid. The choice depends on the type of work and context.'}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-background rounded-2xl shadow-brand overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-3 bg-azul-marino">
                  <div className="p-4 text-white/60 font-medium text-sm">
                    {isEs ? 'Aspecto' : 'Aspect'}
                  </div>
                  <div className="p-4 text-turquesa font-semibold text-center">
                    Scrum
                  </div>
                  <div className="p-4 text-menta font-semibold text-center">
                    Kanban
                  </div>
                </div>
                
                {/* Rows */}
                {scrumVsKanban.map((row, idx) => (
                  <div 
                    key={idx} 
                    className={`grid grid-cols-3 border-b border-gris-arena/10 last:border-0
                               ${idx % 2 === 0 ? 'bg-blanco-hueso/50 dark:bg-card/50' : ''}`}
                  >
                    <div className="p-4 font-medium text-azul-marino dark:text-white text-sm">
                      {row.aspect}
                    </div>
                    <div className="p-4 text-foreground/70 text-sm text-center">
                      {row.scrum}
                    </div>
                    <div className="p-4 text-foreground/70 text-sm text-center">
                      {row.kanban}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-turquesa/10 p-6 rounded-2xl border border-turquesa/20"
                >
                  <h4 className="font-semibold text-turquesa mb-2">
                    {isEs ? 'Elige Scrum si...' : 'Choose Scrum if...'}
                  </h4>
                  <p className="text-foreground/70 text-sm">
                    {isEs
                      ? 'Desarrollas producto nuevo, quieres ritmo predecible, necesitas ceremonias estructuradas para alinear al equipo.'
                      : 'You\'re developing a new product, want predictable rhythm, need structured ceremonies to align the team.'}
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-menta/10 p-6 rounded-2xl border border-menta/20"
                >
                  <h4 className="font-semibold text-menta mb-2">
                    {isEs ? 'Elige Kanban si...' : 'Choose Kanban if...'}
                  </h4>
                  <p className="text-foreground/70 text-sm">
                    {isEs
                      ? 'Gestionas soporte/operaciones, trabajo impredecible, necesitas responder a demanda inmediatamente.'
                      : 'You manage support/operations, unpredictable work, need to respond to demand immediately.'}
                  </p>
                </motion.div>
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
              {isEs ? 'Preguntas frecuentes sobre Ágil' : 'Frequently Asked Questions about Agile'}
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
                {isEs ? '¿Listo para acelerar tus entregas?' : 'Ready to accelerate your deliveries?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Agenda una sesión gratuita de 30 minutos. Evaluamos tu contexto y te recomendamos el framework ágil ideal.'
                  : 'Schedule a free 30-minute session. We evaluate your context and recommend the ideal agile framework.'}
              </p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Evaluación de madurez ágil' : 'Agile maturity assessment',
                  isEs ? 'Recomendación de framework' : 'Framework recommendation',
                  isEs ? 'Perfil de Scrum Master ideal' : 'Ideal Scrum Master profile',
                  isEs ? 'Timeline de implementación' : 'Implementation timeline'
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
                    {isEs ? 'Solicitar Scrum Master' : 'Request Scrum Master'}
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

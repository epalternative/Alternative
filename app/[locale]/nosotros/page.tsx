'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ArrowRight,
  Target,
  Shield,
  Zap,
  BookOpen,
  Globe,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Quote,
  Award,
  Building2,
  TrendingUp,
  Layers,
  FolderKanban,
  DollarSign,
  Briefcase,
  Users,
  Star,
  Clock,
  Rocket,
  Sparkles,
  Play,
  ChevronRight,
  GraduationCap,
  BadgeCheck,
  BarChart3,
  Minus,
  Plus,
} from 'lucide-react';
import { Counter } from '@/components/ui/counter';

// =====================================================
// ANIMATION COMPONENTS
// =====================================================

// Animated section wrapper with scroll reveal
const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
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
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation
const StaggerContainer = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Floating element animation
const FloatingElement = ({
  children,
  className = '',
  duration = 4,
  delay = 0,
  y = 15,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  y?: number;
}) => (
  <motion.div
    animate={{
      y: [0, -y, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Magnetic hover effect
const MagneticCard = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `perspective(1000px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transition: 'transform 0.3s ease-out' }}
    >
      {children}
    </motion.div>
  );
};

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function NosotrosPage() {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Parallax scroll for hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Nosotros' : 'About Us', href: null },
  ];

  // Data
  const heroStats = [
    { number: 50, suffix: '+', label: isEs ? 'Proyectos' : 'Projects' },
    { number: 15, suffix: 'M+', label: isEs ? 'Ahorros generados' : 'Savings generated', prefix: '$' },
    { number: 5, suffix: '+', label: isEs ? 'Años de experiencia' : 'Years of experience' },
    { number: 95, suffix: '%', label: isEs ? 'Clientes satisfechos' : 'Satisfied clients' },
  ];

  const values = [
    {
      icon: Target,
      title: isEs ? 'Resultados Medibles' : 'Measurable Results',
      desc: isEs
        ? 'Nuestros proyectos se miden en ROI, ahorros cuantificables y mejoras verificables.'
        : 'Our projects are measured by ROI, quantifiable savings, and verifiable improvements.',
      color: 'turquesa',
    },
    {
      icon: Shield,
      title: isEs ? 'Honestidad Técnica' : 'Technical Honesty',
      desc: isEs
        ? 'Si una solución no es viable, lo decimos desde el día 1. Sin sorpresas ni costos ocultos.'
        : 'If a solution is not viable, we say so from day 1. No surprises or hidden costs.',
      color: 'violeta',
    },
    {
      icon: Zap,
      title: isEs ? 'Pragmatismo Operativo' : 'Operational Pragmatism',
      desc: isEs
        ? 'Diseñamos soluciones que puedes implementar con tus recursos.'
        : 'We design solutions you can implement with your resources.',
      color: 'menta',
    },
    {
      icon: BookOpen,
      title: isEs ? 'Transferencia de Conocimiento' : 'Knowledge Transfer',
      desc: isEs
        ? 'No creamos dependencia. Capacitamos tu equipo para que continúe sin nosotros.'
        : 'We don\'t create dependency. We train your team to continue without us.',
      color: 'turquesa',
    },
    {
      icon: Globe,
      title: isEs ? 'Adaptabilidad Local' : 'Local Adaptability',
      desc: isEs
        ? 'Entendemos el contexto LATAM: cultura, regulaciones, recursos. Adaptamos best practices.'
        : 'We understand the LATAM context: culture, regulations, resources. We adapt best practices.',
      color: 'violeta',
    },
    {
      icon: CheckCircle2,
      title: isEs ? 'Rigor Metodológico' : 'Methodological Rigor',
      desc: isEs
        ? 'Aplicamos estándares PMI, Lean, ISO sin comprometer pragmatismo.'
        : 'We apply PMI, Lean, ISO standards without compromising pragmatism.',
      color: 'menta',
    },
  ];

  const whyAlternative = [
    {
      icon: Award,
      title: isEs ? 'Expertise internacional, precio competitivo' : 'International expertise, competitive price',
      desc: isEs
        ? 'Certificaciones globales (PMP, ISO 9001, MBA) sin la estructura de costos de las Big 4. Misma calidad, 40-60% menos costo.'
        : 'Global certifications (PMP, ISO 9001, MBA) without the Big 4 cost structure. Same quality, 40-60% lower cost.',
      stat: '40-60%',
      statLabel: isEs ? 'menos costo' : 'lower cost',
    },
    {
      icon: Building2,
      title: isEs ? 'Especialización en servicios' : 'Specialization in services',
      desc: isEs
        ? 'Nos especializamos en empresas de SERVICIOS (banca, legal, seguros, tech). Entendemos tus procesos porque hemos optimizado decenas similares.'
        : 'We specialize in SERVICE companies (banking, legal, insurance, tech). We understand your processes because we\'ve optimized dozens of similar ones.',
      stat: '6',
      statLabel: isEs ? 'industrias' : 'industries',
    },
    {
      icon: Rocket,
      title: isEs ? 'Implementación, no solo reportes' : 'Implementation, not just reports',
      desc: isEs
        ? 'No entregamos un PowerPoint para archivar. Acompañamos la implementación hasta resultados medibles.'
        : 'We don\'t deliver a PowerPoint to file away. We accompany implementation until measurable results.',
      stat: '100%',
      statLabel: isEs ? 'implementado' : 'implemented',
    },
    {
      icon: Zap,
      title: isEs ? 'Agilidad y acceso directo' : 'Agility and direct access',
      desc: isEs
        ? 'Estructura boutique sin burocracia. Trabajas con el equipo senior desde día 1.'
        : 'Boutique structure without bureaucracy. You work with the senior team from day 1.',
      stat: '24h',
      statLabel: isEs ? 'respuesta' : 'response',
    },
    {
      icon: Globe,
      title: isEs ? 'Contexto local + metodologías probadas' : 'Local context + proven methodologies',
      desc: isEs
        ? 'Entendemos LATAM (cultura, regulaciones) pero aplicamos metodologías globales (PMI, Lean, ISO).'
        : 'We understand LATAM (culture, regulations) but apply global methodologies (PMI, Lean, ISO).',
      stat: '3',
      statLabel: isEs ? 'países' : 'countries',
    },
    {
      icon: BarChart3,
      title: isEs ? 'Track record comprobado' : 'Proven track record',
      desc: isEs
        ? '50+ proyectos exitosos. $15M+ en ahorros. ROI promedio: 477%. 0 proyectos abandonados.'
        : '50+ successful projects. $15M+ in savings. Average ROI: 477%. 0 abandoned projects.',
      stat: '477%',
      statLabel: 'ROI',
    },
  ];

  const methodology = [
    {
      step: '01',
      title: isEs ? 'Diagnóstico' : 'Diagnosis',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      items: [
        isEs ? 'Análisis situación actual' : 'Current situation analysis',
        isEs ? 'Identificación quick wins' : 'Quick wins identification',
        isEs ? 'Business case con ROI' : 'Business case with ROI',
      ],
      color: 'turquesa',
    },
    {
      step: '02',
      title: isEs ? 'Diseño' : 'Design',
      duration: isEs ? '2-4 semanas' : '2-4 weeks',
      items: [
        isEs ? 'Procesos optimizados' : 'Optimized processes',
        isEs ? 'Plan de implementación' : 'Implementation plan',
        isEs ? 'Gestión del cambio' : 'Change management',
      ],
      color: 'violeta',
    },
    {
      step: '03',
      title: isEs ? 'Implementación' : 'Implementation',
      duration: isEs ? '6-10 semanas' : '6-10 weeks',
      items: [
        isEs ? 'Ejecución de cambios' : 'Execution of changes',
        isEs ? 'Capacitación equipos' : 'Team training',
        isEs ? 'Acompañamiento operativo' : 'Operational support',
      ],
      color: 'menta',
    },
    {
      step: '04',
      title: isEs ? 'Estabilización' : 'Stabilization',
      duration: isEs ? '4-8 semanas' : '4-8 weeks',
      items: [
        isEs ? 'Monitoreo KPIs' : 'KPI monitoring',
        isEs ? 'Ajustes incrementales' : 'Incremental adjustments',
        isEs ? 'Transferencia conocimiento' : 'Knowledge transfer',
      ],
      color: 'turquesa',
    },
  ];

  const testimonials = [
    {
      quote: isEs
        ? 'Alternative redujo nuestros tiempos de proceso de 12 días a 5 días. +35% más volumen procesado.'
        : 'Alternative reduced our process times from 12 days to 5 days. +35% more volume processed.',
      author: isEs ? 'Gerente General' : 'General Manager',
      company: isEs ? 'Institución Financiera' : 'Financial Institution',
      metric: '-58%',
      metricLabel: isEs ? 'tiempo' : 'time',
    },
    {
      quote: isEs
        ? 'ROI de 868% en año 1. Recuperamos 10h/semana de tiempo de socios que ahora es facturable.'
        : '868% ROI in year 1. We recovered 10h/week of partner time that is now billable.',
      author: isEs ? 'Socia Fundadora' : 'Founding Partner',
      company: isEs ? 'Firma de Servicios Profesionales' : 'Professional Services Firm',
      metric: '868%',
      metricLabel: 'ROI',
    },
  ];

  const certifications = [
    { label: 'PMP®', sub: 'Project Management Professional' },
    { label: 'ISO 9001', sub: 'Lead Auditor' },
    { label: 'Lean Six Sigma', sub: 'Green/Black Belt' },
    { label: 'Scrum Master', sub: 'Certified' },
    { label: 'MBA', sub: 'Business Administration' },
  ];

  const faqs = [
    {
      q: isEs ? '¿Trabajan solo con empresas grandes?' : 'Do you only work with large companies?',
      a: isEs
        ? 'No. Atendemos desde empresas de 20 hasta 500+ empleados. Lo importante es compromiso con mejorar.'
        : 'No. We serve companies from 20 to 500+ employees. What matters is commitment to improvement.',
    },
    {
      q: isEs ? '¿Cuánto cuesta un proyecto típico?' : 'How much does a typical project cost?',
      a: isEs
        ? 'Desde $25K (asesoría específica) hasta $250K (transformación integral). Diagnóstico gratuito para estimar.'
        : 'From $25K (specific advisory) to $250K (full transformation). Free diagnosis to estimate.',
    },
    {
      q: isEs ? '¿Cuánto tiempo toma ver resultados?' : 'How long until we see results?',
      a: isEs
        ? 'Quick wins: 2-4 semanas. Transformación completa: 3-6 meses. ROI positivo en 2-4 meses típicamente.'
        : 'Quick wins: 2-4 weeks. Full transformation: 3-6 months. Positive ROI typically in 2-4 months.',
    },
    {
      q: isEs ? '¿Qué industrias atienden?' : 'What industries do you serve?',
      a: isEs
        ? 'Servicios profesionales: banca, legal, seguros, consultoría, tecnología.'
        : 'Professional services: banking, legal, insurance, consulting, technology.',
    },
  ];

  return (
    <>
      {/* =====================================================
          HERO SECTION - Cinematic Entry
          ===================================================== */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] bg-oliva flex items-center overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large floating shapes */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[10%] right-[5%] w-72 h-72 bg-turquesa/10 rounded-3xl blur-2xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, -15, 0],
              rotate: [0, -5, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[15%] left-[8%] w-56 h-56 bg-menta/15 rounded-3xl blur-2xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[40%] left-[40%] w-40 h-40 bg-white/10 rounded-full blur-3xl"
          />

          {/* Geometric shapes - floating */}
          <FloatingElement duration={5} y={20} className="absolute top-[20%] left-[15%]">
            <div className="w-16 h-16 bg-white/10 rounded-xl rotate-12 border border-white/20" />
          </FloatingElement>
          <FloatingElement duration={7} y={15} delay={1} className="absolute top-[60%] right-[12%]">
            <div className="w-12 h-12 bg-turquesa/20 rounded-lg -rotate-6 border border-turquesa/30" />
          </FloatingElement>
          <FloatingElement duration={6} y={18} delay={2} className="absolute bottom-[25%] left-[25%]">
            <div className="w-10 h-10 bg-menta/20 rounded-lg rotate-45 border border-menta/30" />
          </FloatingElement>
          <FloatingElement duration={8} y={12} delay={0.5} className="absolute top-[35%] right-[25%]">
            <div className="w-8 h-8 bg-white/15 rounded-full" />
          </FloatingElement>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.04] bg-grid-hero-subtle" />
        </div>

        {/* Pulsing dots */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-32 left-[10%] w-3 h-3 bg-turquesa rounded-full"
        />
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.3, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          className="absolute top-[50%] left-[5%] w-2 h-2 bg-menta rounded-full"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="absolute top-[30%] right-[8%] w-2.5 h-2.5 bg-white/60 rounded-full"
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container-custom relative z-10 pt-8 pb-20"
        >
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {idx > 0 && <ChevronDown className="w-4 h-4 text-white/50 -rotate-90" />}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-white/70 hover:text-turquesa transition-colors"
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

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 
                           text-white rounded-full text-sm font-medium mb-6
                           border border-white/20 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-turquesa" />
                {isEs ? 'Consultoría de Clase Mundial' : 'World-Class Consulting'}
              </motion.span>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-semibold leading-[1.1] mb-6">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="block"
                >
                  {isEs ? 'Transformamos Empresas' : 'We Transform Companies'}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="block relative"
                >
                  <span className="text-turquesa">
                    {isEs ? 'con Resultados' : 'with Results'}
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="absolute bottom-1 left-0 w-full h-2 bg-turquesa/20 -z-10 origin-left"
                  />
                </motion.span>
              </h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl text-white/85 mb-8 max-w-xl leading-relaxed"
              >
                {isEs
                  ? 'Somos consultores estratégicos especializados en optimización de procesos, gestión de proyectos y transformación digital para el sector de servicios en América Latina.'
                  : 'We are strategic consultants specialized in process optimization, project management and digital transformation for the services sector in Latin America.'}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/${locale}/contacto`}
                    className="inline-flex items-center gap-3 bg-turquesa text-azul-marino 
                               font-semibold px-7 py-4 rounded-xl hover:bg-menta 
                               transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                  >
                    {isEs ? 'Agenda Consulta Gratuita' : 'Schedule Free Consultation'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="#quienes-somos"
                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm 
                               text-white font-medium px-7 py-4 rounded-xl 
                               hover:bg-white/20 transition-all duration-300
                               border border-white/20"
                  >
                    {isEs ? 'Conoce Nuestra Historia' : 'Know Our Story'}
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Stats Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Main floating card */}
              <FloatingElement duration={6} y={15}>
                <div
                  className="relative bg-white/5 backdrop-blur-xl rounded-3xl 
                                p-8 border border-white/10 shadow-2xl"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-turquesa animate-pulse" />
                      <div className="w-3 h-3 rounded-full bg-menta" />
                      <div className="w-3 h-3 rounded-full bg-violeta" />
                    </div>
                    <span className="text-white/50 text-sm font-medium">
                      {isEs ? 'Resultados en Tiempo Real' : 'Real-Time Results'}
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    {heroStats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + i * 0.15 }}
                        className="relative"
                      >
                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                          {stat.prefix}
                          <Counter end={stat.number} suffix={stat.suffix} />
                        </div>
                        <div className="text-sm text-white/60">{stat.label}</div>
                        {/* Progress bar */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ delay: 1.2 + i * 0.1, duration: 1 }}
                          className="mt-2 h-1 bg-turquesa/30 rounded-full overflow-hidden"
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${60 + i * 10}%` }}
                            transition={{ delay: 1.4 + i * 0.1, duration: 0.8 }}
                            className="h-full bg-turquesa rounded-full"
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Certification badges */}
                  <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/10">
                    {['PMP®', 'ISO 9001', 'Six Sigma', 'Scrum'].map((badge, i) => (
                      <motion.span
                        key={badge}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 + i * 0.1 }}
                        className="px-3 py-1.5 bg-white/10 text-white/80 text-xs rounded-full
                                   border border-white/10"
                      >
                        {badge}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </FloatingElement>

              {/* Mini floating cards */}
              <FloatingElement duration={4} y={10} className="absolute -top-4 -left-4 hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, type: 'spring' }}
                  className="bg-turquesa/20 backdrop-blur-xl rounded-2xl p-4 
                                  border border-turquesa/30 shadow-lg"
                >
                  <TrendingUp className="w-8 h-8 text-turquesa" />
                </motion.div>
              </FloatingElement>

              <FloatingElement
                duration={5}
                y={12}
                delay={0.5}
                className="absolute -bottom-6 -right-4 hidden lg:block"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, type: 'spring' }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 
                                  border border-white/20 shadow-lg"
                >
                  <Award className="w-8 h-8 text-menta" />
                </motion.div>
              </FloatingElement>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div
            className="w-6 h-10 border-2 border-white/30 rounded-full 
                          flex justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-turquesa rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          QUIÉNES SOMOS - Visual Storytelling
          ===================================================== */}
      <section
        id="quienes-somos"
        className="py-24 lg:py-32 bg-blanco-hueso dark:bg-background relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-turquesa/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violeta/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Visual */}
            <AnimatedSection className="relative order-2 lg:order-1">
              <div className="relative">
                {/* Main image container */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/images/consulting-session.webp"
                    alt={isEs ? 'Equipo en sesión estratégica' : 'Team in strategy session'}
                    width={600}
                    height={500}
                    className="w-full h-[450px] object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-[#605b51] mix-blend-multiply opacity-40"
                    aria-hidden
                  />

                  {/* Overlay badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="absolute bottom-6 left-6 right-6"
                  >
                    <div
                      className="bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-2xl p-4 
                                    flex items-center gap-4 shadow-xl"
                    >
                      <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-turquesa" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-azul-marino dark:text-white">
                          50+
                        </div>
                        <div className="text-sm text-foreground/60">
                          {isEs ? 'Proyectos exitosos' : 'Successful projects'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating metric cards */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 30 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  viewport={{ once: true }}
                  className="absolute -top-6 -right-6 hidden lg:block"
                >
                  <FloatingElement duration={5} y={10}>
                    <div
                      className="bg-azul-marino text-white rounded-2xl p-5 
                                    shadow-xl border border-white/10"
                    >
                      <div className="text-3xl font-bold mb-1">$15M+</div>
                      <div className="text-sm text-white/70">
                        {isEs ? 'Ahorros para clientes' : 'Client savings'}
                      </div>
                    </div>
                  </FloatingElement>
                </motion.div>

                {/* Decorative shapes */}
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-menta/20 rounded-3xl -rotate-12 -z-10" />
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-turquesa/10 rounded-2xl rotate-6 -z-10" />
              </div>
            </AnimatedSection>

            {/* Right - Content */}
            <AnimatedSection delay={0.2} className="order-1 lg:order-2">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-turquesa/10 
                           text-turquesa rounded-full text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                {isEs ? 'Quiénes Somos' : 'Who We Are'}
              </motion.span>

              <h2 className="text-3xl lg:text-4xl xl:text-5xl text-azul-marino dark:text-white font-semibold mb-6 leading-tight">
                {isEs ? 'Construimos crecimiento con ' : 'We build growth with '}
                <span className="text-turquesa">
                  {isEs ? 'estrategia y resultados' : 'strategy and results'}
                </span>
              </h2>

              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                {isEs
                  ? 'Grupo Alternative es una consultora estratégica con más de 5 años transformando empresas de servicios en Panamá y América Latina.'
                  : 'Grupo Alternative is a strategic consulting firm with over 5 years transforming service companies in Panama and Latin America.'}
              </p>

              <p className="text-foreground/70 mb-8 leading-relaxed">
                {isEs
                  ? 'Nacimos de identificar una necesidad crítica: empresas con desafíos operativos complejos, sin acceso a consultoría de clase mundial a precios razonables. Ocupamos ese espacio intermedio entre las Big 4 y las boutiques locales.'
                  : 'We were born from identifying a critical need: companies with complex operational challenges, without access to world-class consulting at reasonable prices. We occupy that middle ground between the Big 4 and local boutiques.'}
              </p>

              {/* Key differentiators */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  {
                    icon: Award,
                    text: isEs
                      ? 'Metodologías internacionales (PMI, Lean, ISO)'
                      : 'International methodologies (PMI, Lean, ISO)',
                  },
                  {
                    icon: BadgeCheck,
                    text: isEs
                      ? 'Equipo certificado con estándares globales'
                      : 'Team certified to global standards',
                  },
                  {
                    icon: Zap,
                    text: isEs
                      ? 'Estructura ágil y costos competitivos'
                      : 'Agile structure and competitive costs',
                  },
                  {
                    icon: Globe,
                    text: isEs
                      ? 'Conocimiento profundo del contexto LATAM'
                      : 'Deep knowledge of LATAM context',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className="w-10 h-10 bg-turquesa/10 rounded-xl flex items-center justify-center
                                    group-hover:bg-turquesa/20 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-turquesa" />
                    </div>
                    <span className="text-sm font-medium text-azul-marino dark:text-white">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Quote callout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-card rounded-2xl p-6 shadow-brand border border-gris-arena/10"
              >
                <p className="text-foreground/80 font-medium italic leading-relaxed">
                  {isEs
                    ? '"No vendemos reportes que se archivan, implementamos cambios que generan resultados medibles."'
                    : '"We don\'t sell reports to be filed away, we implement changes that generate measurable results."'}
                </p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* =====================================================
          MANIFIESTO - Impactful Quote
          ===================================================== */}
      <section className="py-24 lg:py-32 bg-azul-marino relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute top-[10%] right-[10%] w-40 h-40 border border-white/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-[15%] left-[8%] w-32 h-32 border border-turquesa/20 rounded-full"
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-turquesa/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-violeta/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            {/* Large quote icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block mb-8"
            >
              <div className="w-20 h-20 bg-turquesa/20 rounded-3xl flex items-center justify-center">
                <Quote className="w-10 h-10 text-turquesa" />
              </div>
            </motion.div>

            {/* Quote text with staggered animation */}
            <blockquote className="mb-10">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-relaxed mb-6"
              >
                {isEs
                  ? '"Alternative nació del compromiso de construir organizaciones más eficientes, más humanas y mejor preparadas para liderar el cambio."'
                  : '"Alternative was born from the commitment to build more efficient, more human organizations better prepared to lead change."'}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl text-white/80 leading-relaxed mb-6"
              >
                {isEs
                  ? 'Transformar no es imponer fórmulas genéricas — es escuchar, analizar, acompañar y construir juntos.'
                  : 'Transforming is not imposing generic formulas — it is listening, analyzing, accompanying and building together.'}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="text-lg md:text-xl text-turquesa leading-relaxed"
              >
                {isEs
                  ? 'Cada empresa es única. Nuestro rol es guiar con estrategia, claridad y compromiso hacia resultados que perduren.'
                  : 'Every company is unique. Our role is to guide with strategy, clarity and commitment toward lasting results.'}
              </motion.p>
            </blockquote>

            {/* Author */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4"
            >
              <div className="w-16 h-16 bg-turquesa/20 rounded-full flex items-center justify-center">
                <span className="text-turquesa font-bold text-xl">KG</span>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-lg">Katherine González</div>
                <div className="text-white/60 text-sm">
                  {isEs ? 'Fundadora & CEO, Grupo Alternative' : 'Founder & CEO, Grupo Alternative'}
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          NUESTRO EQUIPO - Credentials Showcase
          ===================================================== */}
      <section className="py-24 lg:py-32 bg-blanco-hueso dark:bg-background relative overflow-hidden">
        <div className="absolute top-20 left-0 w-96 h-96 bg-menta/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 bg-violeta/10 
                             text-violeta rounded-full text-sm font-medium mb-4"
            >
              <GraduationCap className="w-4 h-4" />
              {isEs ? 'Nuestro Equipo' : 'Our Team'}
            </span>
            <h2 className="text-3xl lg:text-4xl text-azul-marino dark:text-white font-semibold mb-4">
              {isEs ? 'Consultores de ' : 'Consultants of '}
              <span className="text-violeta">{isEs ? 'Clase Mundial' : 'World Class'}</span>
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              {isEs
                ? 'La calidad de nuestros consultores es nuestro diferenciador principal. Cada miembro es seleccionado bajo criterios estrictos.'
                : 'The quality of our consultants is our main differentiator. Each member is selected under strict criteria.'}
            </p>
          </AnimatedSection>

          {/* Credentials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: GraduationCap,
                title: isEs ? 'Formación Académica' : 'Academic Background',
                items: isEs
                  ? [
                      'MBAs de universidades reconocidas',
                      'Grados en Ingeniería y Administración',
                      'Formación continua internacional',
                    ]
                  : [
                      'MBAs from recognized universities',
                      'Engineering and Administration degrees',
                      'Ongoing international training',
                    ],
                color: 'turquesa',
              },
              {
                icon: BadgeCheck,
                title: isEs ? 'Certificaciones' : 'Certifications',
                items: ['PMP® Professional', 'ISO 9001 Lead Auditors', 'Lean Six Sigma', 'Scrum Master'],
                color: 'violeta',
              },
              {
                icon: Briefcase,
                title: isEs ? 'Experiencia Sectorial' : 'Sector Experience',
                items: isEs
                  ? ['Banca y servicios financieros', 'Firmas legales', 'Aseguradoras', 'Tecnología']
                  : ['Banking and financial services', 'Law firms', 'Insurance', 'Technology'],
                color: 'menta',
              },
              {
                icon: Globe,
                title: isEs ? 'Competencias' : 'Competencies',
                items: isEs
                  ? [
                      'Español nativo',
                      'Inglés técnico fluido',
                      'Metodologías ágiles',
                      'Change Management',
                    ]
                  : [
                      'Native Spanish',
                      'Fluent technical English',
                      'Agile methodologies',
                      'Change Management',
                    ],
                color: 'turquesa',
              },
            ].map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <MagneticCard
                  className={`bg-white dark:bg-card rounded-2xl p-6 h-full shadow-brand 
                                 border border-gris-arena/10 hover:shadow-xl transition-shadow`}
                >
                  <div
                    className={`w-12 h-12 bg-${block.color}/10 rounded-xl 
                                    flex items-center justify-center mb-4`}
                  >
                    <block.icon className={`w-6 h-6 text-${block.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-4">
                    {block.title}
                  </h3>
                  <ul className="space-y-2">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground/70">
                        <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </MagneticCard>
              </motion.div>
            ))}
          </div>

          {/* Certification badges row */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-brand border border-gris-arena/10">
              <h3 className="text-center text-lg font-semibold text-azul-marino dark:text-white mb-6">
                {isEs ? 'Certificaciones del Equipo' : 'Team Certifications'}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-turquesa/10 rounded-2xl px-6 py-4 text-center border border-turquesa/20
                               hover:bg-turquesa/20 transition-all cursor-default"
                  >
                    <span className="font-bold text-turquesa text-lg block">{cert.label}</span>
                    <span className="text-xs text-foreground/60">{cert.sub}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          VALORES - 3D Card Effects
          ===================================================== */}
      <section className="py-24 lg:py-32 bg-white dark:bg-card relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violeta/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 bg-menta/10 
                             text-oliva rounded-full text-sm font-medium mb-4"
            >
              <Star className="w-4 h-4" />
              {isEs ? 'Lo Que Nos Define' : 'What Defines Us'}
            </span>
            <h2 className="text-3xl lg:text-4xl text-azul-marino dark:text-white font-semibold mb-4">
              {isEs ? 'Nuestros ' : 'Our '}
              <span className="text-oliva">{isEs ? 'Valores' : 'Values'}</span>
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -10, rotateX: 5 }}
                  className="group relative bg-blanco-hueso/50 dark:bg-background/50 rounded-2xl p-8 
                             shadow-brand hover:shadow-xl transition-all duration-500 overflow-hidden
                             border border-gris-arena/10 h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Decorative corner */}
                  <div
                    className={`absolute -top-6 -right-6 w-24 h-24 bg-${value.color}/10 
                                  rounded-2xl rotate-12 group-hover:rotate-45 group-hover:scale-150
                                  transition-all duration-500`}
                  />

                  {/* Glow effect on hover */}
                  <div
                    className={`absolute inset-0 bg-${value.color}/5 opacity-0 
                                  group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 bg-${value.color}/20 rounded-xl 
                                  flex items-center justify-center mb-4
                                  group-hover:scale-110 transition-transform`}
                    >
                      <value.icon className={`w-7 h-7 text-${value.color}`} />
                    </motion.div>
                    <h3
                      className={`text-xl font-semibold text-azul-marino dark:text-white mb-3
                                   group-hover:text-${value.color} transition-colors`}
                    >
                      {value.title}
                    </h3>
                    <p className="text-foreground/70">{value.desc}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          POR QUÉ ALTERNATIVE - Dashboard Style
          ===================================================== */}
      <section className="py-24 lg:py-32 bg-azul-marino relative overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(108,196,212,0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(108,196,212,0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Floating orbs */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-[10%] w-64 h-64 bg-turquesa/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-[5%] w-80 h-80 bg-violeta/10 rounded-full blur-3xl"
        />

        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center mb-16">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-turquesa/20 text-turquesa 
                         rounded-full text-sm font-medium mb-6 border border-turquesa/30"
            >
              <Rocket className="w-4 h-4" />
              {isEs ? 'Por Qué Elegirnos' : 'Why Choose Us'}
            </motion.span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold mb-4">
              {isEs ? 'La Diferencia ' : 'The '}
              <span className="text-turquesa">Alternative</span>
              {!isEs && ' Difference'}
            </h2>
          </AnimatedSection>

          {/* Dashboard Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyAlternative.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6
                           hover:bg-white/10 transition-all duration-500 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-turquesa" />
                  </div>
                  <div className="text-right">
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                      viewport={{ once: true }}
                      className="text-2xl font-bold text-turquesa"
                    >
                      {item.stat}
                    </motion.span>
                    <span className="text-white/50 text-xs block">{item.statLabel}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-turquesa transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALES - Social Proof
          ===================================================== */}
      <section className="py-24 lg:py-32 bg-blanco-hueso dark:bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-turquesa/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 bg-turquesa/10 
                             text-turquesa rounded-full text-sm font-medium mb-4"
            >
              <Star className="w-4 h-4" />
              {isEs ? 'Testimonios' : 'Testimonials'}
            </span>
            <h2 className="text-3xl lg:text-4xl text-azul-marino dark:text-white font-semibold mb-4">
              {isEs ? 'Nos Avalan Nuestros ' : 'Our '}
              <span className="text-turquesa">{isEs ? 'Resultados' : 'Results'}</span>
              {!isEs && ' Speak'}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((test, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative"
              >
                <div
                  className="bg-white dark:bg-card rounded-3xl p-8 shadow-xl 
                                border border-gris-arena/10 h-full"
                >
                  {/* Quote icon */}
                  <Quote className="w-10 h-10 text-turquesa/20 mb-4" />

                  {/* Metric badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                    viewport={{ once: true }}
                    className="absolute -top-4 -right-4 bg-turquesa text-azul-marino 
                               rounded-2xl px-4 py-2 shadow-lg"
                  >
                    <span className="text-2xl font-bold">{test.metric}</span>
                    <span className="text-xs block">{test.metricLabel}</span>
                  </motion.div>

                  <p className="text-foreground/80 text-lg mb-6 italic leading-relaxed">
                    &ldquo;{test.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-azul-marino rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-turquesa" />
                    </div>
                    <div>
                      <div className="font-semibold text-azul-marino dark:text-white">
                        {test.author}
                      </div>
                      <div className="text-sm text-foreground/60">{test.company}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <AnimatedSection delay={0.3} className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={`/${locale}/casos-exito`}
                className="inline-flex items-center gap-3 bg-azul-marino text-white 
                           font-semibold px-8 py-4 rounded-xl hover:bg-turquesa hover:text-azul-marino
                           transition-all duration-300 shadow-brand group"
              >
                {isEs ? 'Ver Casos de Éxito Completos' : 'View Full Success Stories'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          METODOLOGÍA - Timeline Animation
          ===================================================== */}
      <section className="py-24 lg:py-32 bg-white dark:bg-card relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-menta/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 bg-menta/10 
                             text-oliva rounded-full text-sm font-medium mb-4"
            >
              <Layers className="w-4 h-4" />
              {isEs ? 'Cómo Trabajamos' : 'How We Work'}
            </span>
            <h2 className="text-3xl lg:text-4xl text-azul-marino dark:text-white font-semibold mb-4">
              {isEs ? 'Metodología ' : 'Proven '}
              <span className="text-oliva">{isEs ? 'Probada' : 'Methodology'}</span>
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              {isEs
                ? 'Un enfoque sistemático probado en 50+ proyectos para garantizar resultados.'
                : 'A systematic approach proven in 50+ projects to guarantee results.'}
            </p>
          </AnimatedSection>

          {/* Timeline */}
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gris-arena/20 -translate-y-1/2" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {methodology.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Step number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.15, type: 'spring' }}
                    viewport={{ once: true }}
                    className={`w-16 h-16 bg-${step.color} rounded-2xl flex items-center justify-center
                                mb-6 mx-auto lg:mx-0 shadow-lg relative z-10`}
                  >
                    <span className="text-2xl font-bold text-azul-marino">{step.step}</span>
                  </motion.div>

                  <div
                    className="bg-blanco-hueso/50 dark:bg-background/50 rounded-2xl p-6 
                                  border border-gris-arena/10 h-full"
                  >
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <span className={`text-sm text-${step.color} font-medium`}>{step.duration}</span>

                    <ul className="mt-4 space-y-2">
                      {step.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-foreground/70">
                          <ArrowRight className={`w-4 h-4 text-${step.color} flex-shrink-0 mt-0.5`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Result callout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-28 text-center"
          >
            <div
              className="inline-flex items-center gap-4 bg-azul-marino text-white 
                            rounded-2xl px-8 py-4 shadow-xl"
            >
              <Target className="w-8 h-8 text-turquesa" />
              <span className="text-lg font-medium">
                {isEs
                  ? 'Resultado: Sistema sostenible que tu equipo opera autónomamente'
                  : 'Result: Sustainable system your team operates autonomously'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          PRESENCIA REGIONAL - Map Section
          ===================================================== */}
      <section className="py-24 lg:py-32 bg-blanco-hueso dark:bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-turquesa/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 bg-turquesa/10 
                             text-turquesa rounded-full text-sm font-medium mb-4"
            >
              <Globe className="w-4 h-4" />
              {isEs ? 'Presencia Regional' : 'Regional Presence'}
            </span>
            <h2 className="text-3xl lg:text-4xl text-azul-marino dark:text-white font-semibold mb-4">
              {isEs ? 'Operamos en ' : 'We Operate in '}
              <span className="text-turquesa">{isEs ? 'América Latina' : 'Latin America'}</span>
            </h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map visualization */}
            <AnimatedSection>
              <div
                className="relative bg-white dark:bg-card rounded-3xl p-8 shadow-xl 
                              border border-gris-arena/10 overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-turquesa/10 rounded-full blur-2xl" />

                <div className="relative aspect-[4/3] max-h-[400px] w-full">
                  <svg
                    viewBox="0 0 400 320"
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    {/* Background water effect */}
                    <rect width="400" height="320" fill="currentColor" className="text-turquesa/5" rx="16" />
                    
                    {/* Mexico (partial) */}
                    <path
                      d="M 40 30 L 80 25 L 110 35 L 115 50 L 100 70 L 85 85 L 70 95 L 60 90 L 50 75 L 40 50 Z"
                      fill="currentColor"
                      className="text-gris-arena/30"
                    />
                    
                    {/* Guatemala */}
                    <path
                      d="M 70 95 L 85 85 L 95 90 L 100 105 L 90 115 L 75 110 Z"
                      fill="currentColor"
                      className="text-gris-arena/30"
                    />
                    
                    {/* Honduras */}
                    <path
                      d="M 95 90 L 115 85 L 130 95 L 125 110 L 105 115 L 100 105 Z"
                      fill="currentColor"
                      className="text-gris-arena/30"
                    />
                    
                    {/* Nicaragua */}
                    <path
                      d="M 105 115 L 125 110 L 135 125 L 130 145 L 115 150 L 105 135 Z"
                      fill="currentColor"
                      className="text-gris-arena/30"
                    />
                    
                    {/* Costa Rica - Highlighted */}
                    <path
                      d="M 115 150 L 130 145 L 140 160 L 145 180 L 135 190 L 120 180 L 115 165 Z"
                      fill="currentColor"
                      className="text-turquesa/40"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    
                    {/* Panama - Highlighted */}
                    <path
                      d="M 135 190 L 145 180 L 165 175 L 190 185 L 200 200 L 185 210 L 160 205 L 145 200 Z"
                      fill="currentColor"
                      className="text-turquesa/50"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    
                    {/* Colombia - Highlighted */}
                    <path
                      d="M 185 210 L 200 200 L 220 195 L 250 200 L 280 230 L 290 270 L 260 290 L 220 285 L 195 260 L 180 235 Z"
                      fill="currentColor"
                      className="text-turquesa/40"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    
                    {/* Venezuela */}
                    <path
                      d="M 250 200 L 290 180 L 330 185 L 340 210 L 320 235 L 280 230 Z"
                      fill="currentColor"
                      className="text-gris-arena/30"
                    />
                    
                    {/* Ecuador */}
                    <path
                      d="M 180 235 L 195 260 L 185 290 L 165 285 L 160 260 Z"
                      fill="currentColor"
                      className="text-gris-arena/30"
                    />
                    
                    {/* Peru */}
                    <path
                      d="M 165 285 L 185 290 L 195 310 L 160 320 L 140 310 L 145 290 Z"
                      fill="currentColor"
                      className="text-gris-arena/30"
                    />
                    
                    {/* Connection lines between offices */}
                    <motion.path
                      d="M 130 170 Q 150 150 170 195"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="text-turquesa/40"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
                    />
                    <motion.path
                      d="M 170 195 Q 200 180 240 245"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="text-turquesa/40"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: 'loop' }}
                    />

                    {/* Panama marker - Main office */}
                    <g transform="translate(170, 195)">
                      <motion.circle
                        r="25"
                        fill="currentColor"
                        className="text-turquesa/20"
                        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <circle r="12" fill="currentColor" className="text-turquesa" />
                      <circle r="5" fill="white" />
                      {/* Star for main office */}
                      <text x="0" y="1" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">★</text>
                    </g>
                    
                    {/* Costa Rica marker */}
                    <g transform="translate(130, 170)">
                      <motion.circle
                        r="20"
                        fill="currentColor"
                        className="text-turquesa/20"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                      />
                      <circle r="10" fill="currentColor" className="text-turquesa" />
                      <circle r="4" fill="white" />
                    </g>
                    
                    {/* Colombia marker */}
                    <g transform="translate(240, 245)">
                      <motion.circle
                        r="20"
                        fill="currentColor"
                        className="text-turquesa/20"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                      />
                      <circle r="10" fill="currentColor" className="text-turquesa" />
                      <circle r="4" fill="white" />
                    </g>
                    
                    {/* Country labels */}
                    <text x="130" y="158" fill="currentColor" className="text-azul-marino dark:text-white" fontSize="9" fontWeight="600">Costa Rica</text>
                    <text x="175" y="225" fill="currentColor" className="text-azul-marino dark:text-white" fontSize="10" fontWeight="700">PANAMÁ</text>
                    <text x="250" y="260" fill="currentColor" className="text-azul-marino dark:text-white" fontSize="9" fontWeight="600">Colombia</text>
                  </svg>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-gris-arena/20">
                  {['Panamá', 'Costa Rica', 'Colombia'].map((country, i) => (
                    <motion.span
                      key={country}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-azul-marino dark:text-white"
                    >
                      <span className="w-3 h-3 rounded-full bg-turquesa animate-pulse" />
                      {country}
                    </motion.span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Location cards */}
            <AnimatedSection delay={0.2} className="space-y-6">
              <motion.div
                whileHover={{ x: 10 }}
                className="bg-white dark:bg-card rounded-2xl p-6 shadow-brand border border-gris-arena/10
                           flex items-center gap-6"
              >
                <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-turquesa" />
                </div>
                <div>
                  <h3 className="font-semibold text-azul-marino dark:text-white text-lg">
                    {isEs ? 'Oficina Principal' : 'Head Office'}
                  </h3>
                  <p className="text-foreground/70">Ciudad de Panamá, Panamá</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="bg-white dark:bg-card rounded-2xl p-6 shadow-brand border border-gris-arena/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-menta/20 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-oliva" />
                  </div>
                  <h3 className="font-semibold text-azul-marino dark:text-white">
                    {isEs ? 'Operaciones Activas' : 'Active Operations'}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {['Panamá', 'Costa Rica', 'Colombia'].map((country, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground/80">
                      <CheckCircle2 className="w-5 h-5 text-turquesa" />
                      {country}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <p className="text-foreground/60 text-sm italic">
                {isEs
                  ? '✈️ Proyectos completados en toda Centroamérica y Región Andina'
                  : '✈️ Projects completed across Central America and the Andean Region'}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ - Animated Accordion
          ===================================================== */}
      <section className="py-24 lg:py-32 bg-white dark:bg-card relative overflow-hidden">
        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 bg-violeta/10 
                             text-violeta rounded-full text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              {isEs ? 'Preguntas Frecuentes' : 'FAQ'}
            </span>
            <h2 className="text-3xl lg:text-4xl text-azul-marino dark:text-white font-semibold">
              {isEs ? '¿Tienes ' : 'Have '}
              <span className="text-violeta">{isEs ? 'Preguntas' : 'Questions'}?</span>
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-blanco-hueso/50 dark:bg-background/50 rounded-2xl overflow-hidden
                           border border-gris-arena/10 shadow-brand"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left
                             hover:bg-gris-arena/5 transition-colors"
                >
                  <span className="font-semibold text-azul-marino dark:text-white pr-4">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    {openFaq === i ? (
                      <Minus className="w-5 h-5 text-turquesa" />
                    ) : (
                      <Plus className="w-5 h-5 text-turquesa" />
                    )}
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-foreground/70">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA FINAL - Impactful Closing
          ===================================================== */}
      <section className="py-24 lg:py-32 bg-violeta relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute top-[20%] right-[10%] w-48 h-48 border border-white/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-[20%] left-[15%] w-36 h-36 border border-lavanda/20 rounded-full"
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-lavanda/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-turquesa/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>

        {/* Floating shapes */}
        <FloatingElement duration={6} y={20} className="absolute top-[15%] left-[10%] hidden lg:block">
          <div className="w-12 h-12 bg-white/10 rounded-xl rotate-12" />
        </FloatingElement>
        <FloatingElement
          duration={8}
          y={15}
          delay={1}
          className="absolute bottom-[20%] right-[8%] hidden lg:block"
        >
          <div className="w-10 h-10 bg-turquesa/20 rounded-lg -rotate-6" />
        </FloatingElement>

        <div className="container-custom relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              viewport={{ once: true }}
              className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8
                         border border-white/30"
            >
              <Rocket className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">
              {isEs ? '¿Listo para Transformar tu ' : 'Ready to Transform Your '}
              <span className="text-turquesa">{isEs ? 'Organización' : 'Organization'}?</span>
            </h2>

            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              {isEs
                ? 'Agenda una consulta estratégica gratuita de 30 minutos. Sin compromiso, sin costo.'
                : 'Schedule a free 30-minute strategic consultation. No commitment, no cost.'}
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {[
                { icon: CheckCircle2, label: isEs ? 'Sin compromiso' : 'No commitment' },
                { icon: Clock, label: isEs ? '30 minutos' : '30 minutes' },
                {
                  icon: Target,
                  label: isEs ? 'Diagnóstico preliminar' : 'Preliminary diagnosis',
                },
                { icon: Zap, label: isEs ? 'Recomendaciones accionables' : 'Actionable recommendations' },
              ].map((item, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 text-white/80"
                >
                  <item.icon className="w-5 h-5 text-menta" />
                  {item.label}
                </motion.span>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center gap-3 bg-turquesa text-azul-marino 
                           font-semibold px-10 py-5 rounded-xl hover:bg-menta 
                           transition-all duration-300 shadow-xl shadow-turquesa/30 group text-lg"
              >
                {isEs ? 'Agenda Consulta Gratuita' : 'Schedule Free Consultation'}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-white/20"
            >
              <p className="text-white/60 text-sm mb-4">
                {isEs ? 'O contáctanos directamente:' : 'Or contact us directly:'}
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-white/80">
                <a
                  href="mailto:info@grupoalternative.com"
                  className="flex items-center gap-2 hover:text-turquesa transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@grupoalternative.com
                </a>
                <a
                  href="https://wa.me/50769908906"
                  className="flex items-center gap-2 hover:text-turquesa transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +507 6990-8906
                </a>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Ciudad de Panamá
                </span>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import {
  Zap,
  ArrowRight,
  ChevronDown,
  Truck,
  Package,
  Footprints,
  Clock,
  Settings,
  BarChart3,
  XCircle,
  User,
  Target,
  Search,
  Lightbulb,
  Shield,
  Building2,
  Phone,
  CheckCircle2,
  Award,
  Factory,
  Landmark,
  Headphones,
  Boxes,
  TrendingUp,
  Timer,
  RefreshCw,
  BookOpen,
  Wrench
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

export default function LeanSixSigmaPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Optimización de Procesos' : 'Process Optimization', href: `/${locale}/servicios/optimizacion-procesos` },
    { label: 'Lean Six Sigma', href: null }
  ];

  // =====================================================
  // CONTENT DATA
  // =====================================================

  const wastes = [
    {
      icon: Truck,
      title: isEs ? 'TRANSPORTE' : 'TRANSPORT',
      description: isEs 
        ? 'Mover materiales/información más de lo necesario'
        : 'Moving materials/information more than necessary',
      color: 'turquesa'
    },
    {
      icon: Package,
      title: isEs ? 'INVENTARIO' : 'INVENTORY',
      description: isEs 
        ? 'Más inventario del mínimo necesario'
        : 'More inventory than minimum necessary',
      color: 'menta'
    },
    {
      icon: Footprints,
      title: isEs ? 'MOVIMIENTO' : 'MOTION',
      description: isEs 
        ? 'Movimiento físico que no agrega valor'
        : 'Physical movement that adds no value',
      color: 'violeta'
    },
    {
      icon: Clock,
      title: isEs ? 'ESPERA' : 'WAITING',
      description: isEs 
        ? 'Tiempo muerto esperando aprobaciones/materiales'
        : 'Dead time waiting for approvals/materials',
      color: 'turquesa'
    },
    {
      icon: Settings,
      title: isEs ? 'SOBREPROCESAMIENTO' : 'OVERPROCESSING',
      description: isEs 
        ? 'Hacer más de lo que el cliente requiere'
        : 'Doing more than the customer requires',
      color: 'menta'
    },
    {
      icon: BarChart3,
      title: isEs ? 'SOBREPRODUCCIÓN' : 'OVERPRODUCTION',
      description: isEs 
        ? 'Producir más de lo demandado'
        : 'Producing more than demanded',
      color: 'violeta'
    },
    {
      icon: XCircle,
      title: isEs ? 'DEFECTOS' : 'DEFECTS',
      description: isEs 
        ? 'Errores, reprocesos, correcciones'
        : 'Errors, rework, corrections',
      color: 'turquesa'
    },
    {
      icon: User,
      title: isEs ? 'TALENTO SUBUTILIZADO' : 'UNDERUTILIZED TALENT',
      description: isEs 
        ? 'No aprovechar ideas y habilidades del equipo'
        : 'Not leveraging team ideas and skills',
      color: 'menta'
    }
  ];

  const dmaicPhases = [
    {
      phase: 'DEFINE',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs 
        ? 'Definir problema, objetivo, alcance y equipo de proyecto'
        : 'Define problem, objective, scope, and project team',
      icon: Target,
      color: 'turquesa'
    },
    {
      phase: 'MEASURE',
      duration: isEs ? '2-3 semanas' : '2-3 weeks',
      description: isEs 
        ? 'Medir estado actual, recolectar datos, cuantificar desperdicios'
        : 'Measure current state, collect data, quantify waste',
      icon: BarChart3,
      color: 'menta'
    },
    {
      phase: 'ANALYZE',
      duration: isEs ? '2-3 semanas' : '2-3 weeks',
      description: isEs 
        ? 'Identificar causas raíz, validar con datos'
        : 'Identify root causes, validate with data',
      icon: Search,
      color: 'violeta'
    },
    {
      phase: 'IMPROVE',
      duration: isEs ? '3-4 semanas' : '3-4 weeks',
      description: isEs 
        ? 'Diseñar soluciones, pilotear, implementar'
        : 'Design solutions, pilot, implement',
      icon: Lightbulb,
      color: 'turquesa'
    },
    {
      phase: 'CONTROL',
      duration: 'Ongoing',
      description: isEs 
        ? 'Establecer controles, SOPs, auditorías, asegurar sostenibilidad'
        : 'Establish controls, SOPs, audits, ensure sustainability',
      icon: Shield,
      color: 'menta'
    }
  ];

  const includes = [
    {
      title: isEs ? 'Diagnóstico' : 'Diagnosis',
      icon: Search,
      items: isEs
        ? ['Identificación de procesos con mayor oportunidad', 'Cuantificación de desperdicios', 'Priorización por impacto vs esfuerzo', 'Business case con ROI proyectado']
        : ['Identification of processes with greatest opportunity', 'Waste quantification', 'Prioritization by impact vs effort', 'Business case with projected ROI'],
      color: 'turquesa'
    },
    {
      title: isEs ? 'Ejecución DMAIC' : 'DMAIC Execution',
      icon: RefreshCw,
      items: isEs
        ? ['Proyecto estructurado en 5 fases', 'Equipo mixto (consultores + tu personal)', 'Análisis estadístico riguroso', 'Implementación real']
        : ['Project structured in 5 phases', 'Mixed team (consultants + your staff)', 'Rigorous statistical analysis', 'Real implementation'],
      color: 'menta'
    },
    {
      title: isEs ? 'Herramientas Lean' : 'Lean Tools',
      icon: Wrench,
      items: isEs
        ? ['Value Stream Mapping', '5S (organización)', 'Kanban (control visual)', 'Poka-Yoke (a prueba de errores)']
        : ['Value Stream Mapping', '5S (organization)', 'Kanban (visual control)', 'Poka-Yoke (error-proofing)'],
      color: 'violeta'
    },
    {
      title: isEs ? 'Capacitación' : 'Training',
      icon: BookOpen,
      items: isEs
        ? ['Yellow Belt (fundamentos)', 'Green Belt (líderes de proyecto)', 'Coaching durante proyectos', 'Materiales de capacitación']
        : ['Yellow Belt (fundamentals)', 'Green Belt (project leaders)', 'Coaching during projects', 'Training materials'],
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '30-50%', label: isEs ? 'Reducción en desperdicios operacionales' : 'Reduction in operational waste', icon: TrendingUp },
    { value: '40-60%', label: isEs ? 'Mejora en productividad' : 'Improvement in productivity', icon: Zap },
    { value: '50-70%', label: isEs ? 'Reducción en tiempos de ciclo' : 'Reduction in cycle times', icon: Timer },
    { value: '60-80%', label: isEs ? 'Reducción en inventario' : 'Reduction in inventory', icon: Package },
    { value: '70-90%', label: isEs ? 'Reducción en defectos' : 'Reduction in defects', icon: XCircle },
    { value: '15-20', label: isEs ? 'Iniciativas Kaizen anuales ejecutadas internamente' : 'Annual Kaizen initiatives executed internally', icon: RefreshCw }
  ];

  const profiles = [
    {
      title: isEs ? 'Manufactura y Producción' : 'Manufacturing & Production',
      description: isEs
        ? 'Líneas de producción, ensamble, empaque. Reducción 40-60% desperdicios típica.'
        : 'Production lines, assembly, packaging. Typical 40-60% waste reduction.',
      icon: Factory,
      color: 'turquesa'
    },
    {
      title: isEs ? 'Operaciones Bancarias' : 'Banking Operations',
      description: isEs
        ? 'Procesamiento de créditos, back-office. Reducción 30-50% en tiempos de ciclo.'
        : 'Credit processing, back-office. 30-50% reduction in cycle times.',
      icon: Landmark,
      color: 'menta'
    },
    {
      title: 'Contact Centers',
      description: isEs
        ? 'Atención a clientes, soporte técnico. +40% productividad por agente.'
        : 'Customer service, technical support. +40% productivity per agent.',
      icon: Headphones,
      color: 'violeta'
    },
    {
      title: isEs ? 'Logística y Distribución' : 'Logistics & Distribution',
      description: isEs
        ? 'Almacenes, centros de distribución. -30% tiempo de picking, -40% inventario.'
        : 'Warehouses, distribution centers. -30% picking time, -40% inventory.',
      icon: Boxes,
      color: 'turquesa'
    }
  ];

  const faqs = [
    {
      question: isEs ? '¿Cómo determinan el alcance de un proyecto Lean?' : 'How do you determine the scope of a Lean project?',
      answer: isEs
        ? 'Depende de: desperdicios identificados, complejidad del proceso, datos disponibles, alcance de certificación de equipo. Diagnóstico Lean gratuito identifica oportunidades y desarrolla propuesta con ROI proyectado.'
        : 'It depends on: identified waste, process complexity, available data, team certification scope. Free Lean diagnosis identifies opportunities and develops proposal with projected ROI.'
    },
    {
      question: isEs ? '¿Cuál es la diferencia entre Lean y Six Sigma?' : 'What\'s the difference between Lean and Six Sigma?',
      answer: isEs
        ? 'Lean elimina desperdicios (actividades sin valor). Six Sigma reduce variabilidad y defectos. Lean te hace rápido. Six Sigma te hace consistente. Lean Six Sigma combina ambos: eficiencia + calidad.'
        : 'Lean eliminates waste (activities without value). Six Sigma reduces variability and defects. Lean makes you fast. Six Sigma makes you consistent. Lean Six Sigma combines both: efficiency + quality.'
    },
    {
      question: isEs ? '¿Lean Six Sigma es solo para manufactura?' : 'Is Lean Six Sigma only for manufacturing?',
      answer: isEs
        ? 'No. Aunque nació en manufactura, hoy aplica a cualquier proceso repetitivo: banca, call centers, salud, gobierno, servicios profesionales. Si hay proceso repetitivo con desperdicios, Lean puede optimizarlo.'
        : 'No. Although it was born in manufacturing, today it applies to any repetitive process: banking, call centers, healthcare, government, professional services. If there\'s a repetitive process with waste, Lean can optimize it.'
    },
    {
      question: isEs ? '¿Qué significa Black Belt / Green Belt?' : 'What does Black Belt / Green Belt mean?',
      answer: isEs
        ? 'Niveles de certificación Lean Six Sigma. Yellow Belt: fundamentos. Green Belt: líder de proyectos. Black Belt: experto. Master Black Belt: mentor. Capacitamos y certificamos personal clave durante proyectos.'
        : 'Lean Six Sigma certification levels. Yellow Belt: fundamentals. Green Belt: project leader. Black Belt: expert. Master Black Belt: mentor. We train and certify key personnel during projects.'
    },
    {
      question: isEs ? '¿Los operadores se resisten (miedo a perder empleo)?' : 'Do operators resist (fear of job loss)?',
      answer: isEs
        ? 'Lean NO es despedir; es hacer más con lo que tienes. Involucramos operadores desde día 1 en identificar desperdicios porque ellos los conocen mejor. Resistencia baja cuando ven que Lean elimina sus frustraciones diarias.'
        : 'Lean is NOT about firing; it\'s about doing more with what you have. We involve operators from day 1 in identifying waste because they know it best. Resistance drops when they see that Lean eliminates their daily frustrations.'
    },
    {
      question: isEs ? '¿Las mejoras se sostienen?' : 'Do improvements last?',
      answer: isEs
        ? 'Fase Control asegura sostenibilidad: SOPs, controles visuales, auditorías, Green Belts internos capacitados. 80-85% de mejoras se mantienen a 2 años.'
        : 'Control phase ensures sustainability: SOPs, visual controls, audits, trained internal Green Belts. 80-85% of improvements are maintained at 2 years.'
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
            className="absolute top-[15%] right-[10%] w-40 h-40 bg-menta/5 rounded-full blur-xl"
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
                <div className="w-16 h-16 bg-menta/20 rounded-2xl flex items-center justify-center
                                border border-menta/30">
                  <Zap className="w-8 h-8 text-menta" />
                </div>
                <div>
                  <span className="text-menta text-sm font-medium uppercase tracking-wider">
                    Lean Six Sigma
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Optimización de Procesos' : 'Process Optimization'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Elimina desperdicios y mejora eficiencia con Lean Six Sigma'
                  : 'Eliminate waste and improve efficiency with Lean Six Sigma'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Metodología probada para reducir desperdicios y eliminar variabilidad. Resultados: reducción 30-50% en costos, mejora 40%+ en productividad. Equipo certificado Black Belt con experiencia en múltiples industrias.'
                  : 'Proven methodology to reduce waste and eliminate variability. Results: 30-50% cost reduction, 40%+ productivity improvement. Black Belt certified team with experience in multiple industries.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Identifica tus Desperdicios' : 'Identify Your Waste'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#caso-exito"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Ver caso manufactura' : 'View manufacturing case'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '30+', label: isEs ? 'proyectos Lean Six Sigma' : 'Lean Six Sigma projects' },
                  { value: '45%', label: isEs ? 'mejora promedio productividad' : 'avg. productivity improvement' },
                  { icon: true, label: isEs ? 'Consultores Black Belt' : 'Black Belt Consultants' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    {stat.icon ? (
                      <Award className="w-4 h-4 text-menta" />
                    ) : (
                      <span className="text-menta font-bold">{stat.value}</span>
                    )}
                    <span className="text-white/60 text-sm">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual - DMAIC Cycle */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                  <div className="text-center mb-6">
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {isEs ? 'Metodología DMAIC' : 'DMAIC Methodology'}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {isEs ? 'El ciclo probado de mejora' : 'The proven improvement cycle'}
                    </p>
                  </div>
                  
                  {/* DMAIC Visual */}
                  <div className="space-y-3">
                    {dmaicPhases.map((phase, idx) => {
                      const colors = colorClasses[phase.color as keyof typeof colorClasses];
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          className={`${colors.bg} rounded-xl p-4 border ${colors.border} flex items-center gap-4`}
                        >
                          <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                            <phase.icon className={`w-5 h-5 ${colors.text}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className={`font-bold ${colors.text}`}>{phase.phase}</span>
                              <span className="text-xs text-white/50">{phase.duration}</span>
                            </div>
                            <p className="text-xs text-white/60 mt-1">{phase.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-menta rounded-2xl p-4 shadow-xl"
                >
                  <Zap className="w-6 h-6 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT IS LEAN SIX SIGMA SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-menta/10 text-menta 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? '¿Qué es?' : 'What is it?'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
              Lean + Six Sigma = {isEs ? 'Eficiencia + Calidad' : 'Efficiency + Quality'}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <AnimatedSection delay={0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-turquesa/10 rounded-2xl p-8 border border-turquesa/20 h-full"
              >
                <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-7 h-7 text-turquesa" />
                </div>
                <h3 className="text-xl font-bold text-turquesa mb-3">LEAN</h3>
                <p className="text-foreground/70 leading-relaxed">
                  {isEs 
                    ? 'Eliminar desperdicios (actividades que no agregan valor). Origen: Toyota. Objetivo: hacer más con menos, eliminar todo lo que el cliente no valora.'
                    : 'Eliminate waste (activities that add no value). Origin: Toyota. Goal: do more with less, eliminate everything the customer doesn\'t value.'}
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-menta/10 rounded-2xl p-8 border border-menta/20 h-full"
              >
                <div className="w-14 h-14 bg-menta/20 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-menta" />
                </div>
                <h3 className="text-xl font-bold text-menta mb-3">SIX SIGMA</h3>
                <p className="text-foreground/70 leading-relaxed">
                  {isEs 
                    ? 'Reducir variabilidad y defectos. Origen: Motorola. Objetivo: procesos predecibles con mínima variación, calidad consistente.'
                    : 'Reduce variability and defects. Origin: Motorola. Goal: predictable processes with minimal variation, consistent quality.'}
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-violeta/10 rounded-2xl p-8 border border-violeta/20 h-full"
              >
                <div className="w-14 h-14 bg-violeta/20 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-7 h-7 text-violeta" />
                </div>
                <h3 className="text-xl font-bold text-violeta mb-3">LEAN + SIX SIGMA</h3>
                <p className="text-foreground/70 leading-relaxed">
                  {isEs 
                    ? 'Máxima eficiencia (Lean) + Máxima calidad (Six Sigma). Operación rápida, eficiente y confiable.'
                    : 'Maximum efficiency (Lean) + Maximum quality (Six Sigma). Fast, efficient, and reliable operation.'}
                </p>
              </motion.div>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <div className="bg-blanco-hueso dark:bg-card rounded-2xl p-8 text-center">
              <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-4">
                {isEs ? '¿Cuándo usarlo?' : 'When to use it?'}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  isEs ? 'Procesos con alta repetición' : 'High-repetition processes',
                  isEs ? 'Desperdicios evidentes pero no cuantificados' : 'Obvious but unquantified waste',
                  isEs ? 'Alta variabilidad' : 'High variability',
                  isEs ? 'Resultados rápidos (90-120 días)' : 'Quick results (90-120 days)'
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-turquesa/10 
                               text-turquesa rounded-full text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          8 WASTES SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs 
                ? 'Los 8 desperdicios ocultos que destruyen rentabilidad'
                : 'The 8 hidden wastes destroying profitability'}
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              {isEs 
                ? 'Representan típicamente 20-40% de tu costo operacional. Están en todas las empresas pero la mayoría no los ve hasta que alguien externo los señala.'
                : 'They typically represent 20-40% of your operational cost. They\'re in every company but most don\'t see them until someone external points them out.'}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {wastes.map((waste, idx) => {
              const colors = colorClasses[waste.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`bg-white dark:bg-background p-6 rounded-2xl shadow-brand 
                                hover:shadow-brand-lg transition-all duration-300
                                border-t-4 ${colors.border.replace('/20', '')} h-full`}
                  >
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl 
                                    flex items-center justify-center mb-4`}>
                      <waste.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <h3 className={`text-sm font-bold ${colors.text} mb-2`}>
                      {waste.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {waste.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <AnimatedSection className="text-center">
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                         font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                         transition-all duration-300 shadow-lg group"
            >
              {isEs ? 'Calcula tu Desperdicio' : 'Calculate Your Waste'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          DMAIC METHODOLOGY SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-violeta/10 text-violeta 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Metodología' : 'Methodology'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Metodología DMAIC: el ciclo probado de mejora' : 'DMAIC Methodology: the proven improvement cycle'}
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline Line - Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-turquesa via-menta to-violeta -translate-y-1/2" />

            <StaggerContainer className="grid md:grid-cols-5 gap-6">
              {dmaicPhases.map((phase, idx) => {
                const colors = colorClasses[phase.color as keyof typeof colorClasses];
                return (
                  <StaggerItem key={idx}>
                    <motion.div
                      whileHover={{ y: -10 }}
                      className="relative bg-white dark:bg-card p-6 rounded-2xl shadow-brand 
                                 hover:shadow-brand-lg transition-all duration-300"
                    >
                      {/* Phase Number */}
                      <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full 
                                      flex items-center justify-center font-bold text-sm z-10
                                      ${colors.bg.replace('/10', '')} text-azul-marino`}>
                        {idx + 1}
                      </div>

                      <div className="pt-4 text-center">
                        <div className={`w-12 h-12 ${colors.bg} rounded-xl 
                                        flex items-center justify-center mx-auto mb-3`}>
                          <phase.icon className={`w-6 h-6 ${colors.text}`} />
                        </div>

                        <h3 className={`text-lg font-bold ${colors.text} mb-1`}>
                          {phase.phase}
                        </h3>
                        <p className="text-turquesa text-xs font-medium mb-2">{phase.duration}</p>
                        <p className="text-foreground/70 text-sm leading-relaxed">
                          {phase.description}
                        </p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
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
              {isEs ? 'Implementación Completa' : 'Complete Implementation'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Qué incluye' : 'What\'s included'}
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
              {isEs ? 'Resultados típicos' : 'Typical results'}
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
                  <div className="w-14 h-14 bg-menta/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-menta" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-menta mb-2">
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
          CASE STUDY SECTION
          ===================================================== */}
      <section id="caso-exito" className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-blanco-hueso dark:bg-card rounded-3xl p-8 lg:p-12 overflow-hidden relative">
              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-menta/5 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-menta/20 rounded-xl flex items-center justify-center">
                    <Factory className="w-6 h-6 text-menta" />
                  </div>
                  <div>
                    <span className="text-menta font-medium text-sm uppercase tracking-wider">
                      {isEs ? 'Caso de Éxito' : 'Success Story'}
                    </span>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                      {isEs 
                        ? 'Planta manufacturera reduce 45% desperdicios'
                        : 'Manufacturing plant reduces 45% waste'}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left - Description */}
                  <div>
                    <div className="mb-6">
                      <p className="text-sm text-foreground/60 mb-2">
                        {isEs ? '200 empleados • 2 líneas' : '200 employees • 2 lines'}
                      </p>
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Desafío' : 'Challenge'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Planta a 60% de capacidad teórica sin saber por qué. Inventario en proceso de 45 días. Entregas a tiempo solo 65%.'
                          : 'Plant at 60% of theoretical capacity without knowing why. Work-in-process inventory of 45 days. On-time deliveries only 65%.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución' : 'Solution'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Value Stream Mapping, eventos Kaizen, implementación 5S, Kanban, SMED, proyecto DMAIC completo en 12 semanas.'
                          : 'Value Stream Mapping, Kaizen events, 5S implementation, Kanban, SMED, complete DMAIC project in 12 weeks.'}
                      </p>
                    </div>

                    <blockquote className="border-l-4 border-menta pl-4 italic text-foreground/70">
                      {isEs 
                        ? '"Value Stream Mapping reveló 35% de puro desperdicio. Lo más valioso: nuestro equipo aprendió y hoy sigue mejorando sin consultores."'
                        : '"Value Stream Mapping revealed 35% pure waste. Most valuable: our team learned and today continues improving without consultants."'}
                      <span className="block mt-2 text-sm text-menta not-italic font-medium">
                        — {isEs ? 'Gerente de Planta' : 'Plant Manager'}
                      </span>
                    </blockquote>
                  </div>

                  {/* Right - Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '60% → 85%', label: isEs ? 'Capacidad' : 'Capacity', sub: isEs ? 'sin nueva maquinaria' : 'without new machinery' },
                      { value: '45 → 18', label: isEs ? 'Días inventario' : 'Inventory days', sub: isEs ? 'en proceso' : 'work-in-process' },
                      { value: '$220K', label: isEs ? 'Capital liberado' : 'Capital freed', sub: isEs ? 'inventario' : 'inventory' },
                      { value: '65% → 92%', label: isEs ? 'Entregas a tiempo' : 'On-time deliveries', sub: 'OTD' },
                      { value: '+45%', label: isEs ? 'Productividad' : 'Productivity', sub: isEs ? 'por operador' : 'per operator' },
                      { value: '420%', label: 'ROI', sub: isEs ? 'primer año' : 'first year' }
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white dark:bg-background p-4 rounded-2xl shadow-brand text-center"
                      >
                        <div className="text-xl lg:text-2xl font-bold text-menta mb-1">
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
          WHO IS IT FOR SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Para quién es Lean Six Sigma?' : 'Who is Lean Six Sigma for?'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profiles.map((profile, idx) => {
              const colors = colorClasses[profile.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`bg-white dark:bg-background p-6 rounded-2xl shadow-brand 
                                hover:shadow-brand-lg transition-all duration-300 h-full
                                border-t-4 ${colors.border.replace('/20', '')}`}
                  >
                    <div className={`w-14 h-14 ${colors.bg} rounded-2xl 
                                    flex items-center justify-center mb-4`}>
                      <profile.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-2">
                      {profile.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
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
              {isEs ? 'Preguntas frecuentes sobre Lean Six Sigma' : 'Frequently Asked Questions about Lean Six Sigma'}
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
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-menta/10 rounded-full blur-2xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs ? '¿Listo para eliminar desperdicios?' : 'Ready to eliminate waste?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Diagnóstico Lean de 30 minutos. Identificamos los 3 desperdicios más costosos y estimamos ahorro potencial.'
                  : '30-minute Lean diagnosis. We identify the 3 most costly wastes and estimate potential savings.'}
              </p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Análisis de desperdicios evidentes' : 'Analysis of obvious waste',
                  isEs ? 'Proceso con mayor oportunidad' : 'Process with greatest opportunity',
                  isEs ? 'Estimación de ahorros ($)' : 'Savings estimation ($)',
                  isEs ? 'Recomendación Kaizen vs DMAIC' : 'Kaizen vs DMAIC recommendation'
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
                    {isEs ? 'Solicitar Diagnóstico Lean' : 'Request Lean Diagnosis'}
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

'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import {
  Settings,
  ArrowRight,
  RefreshCw,
  Zap,
  PenTool,
  Bot,
  AlertTriangle,
  Clock,
  Repeat,
  TrendingUp,
  CheckCircle2,
  Building2,
  ChevronDown,
  Target,
  BarChart3,
  Users,
  Shield,
  Award,
  Play,
  Phone
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

export default function OptimizacionProcesosPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // =====================================================
  // CONTENT DATA
  // =====================================================

  const problems = [
    {
      icon: Clock,
      title: isEs ? 'Trabajo manual repetitivo' : 'Repetitive manual work',
      description: isEs 
        ? 'Tu equipo pasa horas en tareas que deberían estar automatizadas: copiar datos entre sistemas, consolidar reportes, validar información manualmente.'
        : 'Your team spends hours on tasks that should be automated: copying data between systems, consolidating reports, manually validating information.'
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'Cuellos de botella' : 'Bottlenecks',
      description: isEs
        ? 'Aprobaciones que demoran días, un paso del proceso que acumula todo el trabajo, áreas esperando a otras constantemente.'
        : 'Approvals that take days, one process step that accumulates all work, areas constantly waiting for others.'
    },
    {
      icon: Repeat,
      title: isEs ? 'Reprocesos y errores' : 'Rework and errors',
      description: isEs
        ? 'Hacer las cosas 2-3 veces porque no se hicieron bien la primera. Correcciones, devoluciones, quejas recurrentes.'
        : 'Doing things 2-3 times because they weren\'t done right the first time. Corrections, returns, recurring complaints.'
    },
    {
      icon: TrendingUp,
      title: isEs ? 'Imposibilidad de escalar' : 'Inability to scale',
      description: isEs
        ? 'Cada vez que creces, la operación se vuelve caótica. Procesos informales que funcionaban con 10 personas fallan con 50.'
        : 'Every time you grow, operations become chaotic. Informal processes that worked with 10 people fail with 50.'
    }
  ];

  const services = [
    {
      icon: RefreshCw,
      title: isEs ? 'BPM Empresarial' : 'Business BPM',
      description: isEs
        ? 'Gestión integral y continua de procesos empresariales. Para organizaciones con múltiples procesos interdepartamentales que necesitan gobierno estructurado.'
        : 'Comprehensive and continuous business process management. For organizations with multiple interdepartmental processes that need structured governance.',
      forWho: isEs
        ? 'Empresas medianas-grandes (100+ empleados), multi-geográficas, industrias reguladas'
        : 'Medium-large companies (100+ employees), multi-geographic, regulated industries',
      result: isEs
        ? 'Framework completo de gestión de procesos + visibilidad ejecutiva en tiempo real'
        : 'Complete process management framework + real-time executive visibility',
      href: `/${locale}/servicios/optimizacion-procesos/bpm-empresarial`,
      color: 'turquesa'
    },
    {
      icon: Zap,
      title: 'Lean Six Sigma',
      description: isEs
        ? 'Eliminación sistemática de desperdicios (Lean) y reducción de variabilidad (Six Sigma). Para operaciones con alta repetición donde eficiencia extrema es crítica.'
        : 'Systematic elimination of waste (Lean) and reduction of variability (Six Sigma). For high-repetition operations where extreme efficiency is critical.',
      forWho: isEs
        ? 'Manufactura, logística, operaciones bancarias, contact centers, servicios compartidos'
        : 'Manufacturing, logistics, banking operations, contact centers, shared services',
      result: isEs
        ? 'Reducción 30-50% desperdicios + mejora 40%+ productividad'
        : '30-50% waste reduction + 40%+ productivity improvement',
      href: `/${locale}/servicios/optimizacion-procesos/lean-six-sigma`,
      color: 'menta'
    },
    {
      icon: PenTool,
      title: isEs ? 'Diseño de Procesos' : 'Process Design',
      description: isEs
        ? 'Diseño desde cero o rediseño completo de procesos existentes. Incluye documentación formal, roles definidos y preparación para certificación ISO 9001.'
        : 'Design from scratch or complete redesign of existing processes. Includes formal documentation, defined roles, and ISO 9001 certification preparation.',
      forWho: isEs
        ? 'Empresas preparando certificación ISO, organizaciones escalando, compañías con procesos informales'
        : 'Companies preparing ISO certification, scaling organizations, companies with informal processes',
      result: isEs
        ? 'Procesos documentados, estandarizados y listos para escalar o certificar'
        : 'Documented, standardized processes ready to scale or certify',
      href: `/${locale}/servicios/optimizacion-procesos/diseno-procesos`,
      color: 'violeta'
    },
    {
      icon: Bot,
      title: isEs ? 'Automatización' : 'Automation',
      description: isEs
        ? 'RPA, workflows digitales e integraciones entre sistemas. Eliminamos trabajo manual repetitivo. Regla clave: primero optimizamos, luego automatizamos.'
        : 'RPA, digital workflows, and system integrations. We eliminate repetitive manual work. Key rule: first we optimize, then we automate.',
      forWho: isEs
        ? 'Empresas con procesos ya optimizados, alta volumetría de transacciones, necesidad 24/7'
        : 'Companies with already optimized processes, high transaction volume, 24/7 need',
      result: isEs
        ? 'Reducción 60-80% en tiempo de procesos automatizados'
        : '60-80% reduction in automated process time',
      href: `/${locale}/servicios/optimizacion-procesos/automatizacion-procesos`,
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '25-40%', label: isEs ? 'Reducción en costos operativos' : 'Reduction in operating costs', icon: TrendingUp },
    { value: '30-50%', label: isEs ? 'Mejora en tiempos de ciclo' : 'Improvement in cycle times', icon: Clock },
    { value: '60-80%', label: isEs ? 'Reducción en errores y reprocesos' : 'Reduction in errors and rework', icon: Target },
    { value: '100%', label: isEs ? 'Visibilidad con métricas en tiempo real' : 'Visibility with real-time metrics', icon: BarChart3 },
    { value: '2-3X', label: isEs ? 'Capacidad de escalamiento sin contratar' : 'Scaling capacity without hiring', icon: Users },
    { value: '85%+', label: isEs ? 'Mejoras sostenibles a 2 años' : 'Sustainable improvements at 2 years', icon: Shield }
  ];

  const methodology = [
    {
      phase: isEs ? 'DIAGNÓSTICO' : 'DIAGNOSIS',
      duration: isEs ? '2-3 semanas' : '2-3 weeks',
      description: isEs
        ? 'Identificamos procesos críticos, mapeamos estado actual, cuantificamos desperdicios y oportunidades.'
        : 'We identify critical processes, map current state, quantify waste and opportunities.',
      icon: Target
    },
    {
      phase: isEs ? 'DISEÑO' : 'DESIGN',
      duration: isEs ? '3-4 semanas' : '3-4 weeks',
      description: isEs
        ? 'Diseñamos proceso optimizado, calculamos ROI proyectado, creamos plan de implementación con quick wins.'
        : 'We design optimized process, calculate projected ROI, create implementation plan with quick wins.',
      icon: PenTool
    },
    {
      phase: isEs ? 'IMPLEMENTACIÓN' : 'IMPLEMENTATION',
      duration: isEs ? '4-8 semanas' : '4-8 weeks',
      description: isEs
        ? 'Ejecutamos cambios, capacitamos equipos, acompañamos en piso, ajustamos basados en feedback real.'
        : 'We execute changes, train teams, accompany on-site, adjust based on real feedback.',
      icon: Play
    },
    {
      phase: isEs ? 'SOSTENIBILIDAD' : 'SUSTAINABILITY',
      duration: isEs ? 'Ongoing' : 'Ongoing',
      description: isEs
        ? 'Establecemos controles, monitoreamos KPIs, capacitamos para mejora continua interna sin consultores.'
        : 'We establish controls, monitor KPIs, train for internal continuous improvement without consultants.',
      icon: RefreshCw
    }
  ];

  const faqs = [
    {
      question: isEs ? '¿Cómo determinan el alcance y costo de un proyecto?' : 'How do you determine the scope and cost of a project?',
      answer: isEs
        ? 'Depende de: cantidad de procesos críticos, complejidad (simples vs interdepartamentales), documentación existente, necesidad de automatización y alcance de capacitación. Realizamos diagnóstico inicial gratuito para dimensionar y presentar propuesta personalizada con ROI proyectado.'
        : 'It depends on: number of critical processes, complexity (simple vs interdepartmental), existing documentation, automation needs, and training scope. We conduct a free initial diagnosis to size and present a personalized proposal with projected ROI.'
    },
    {
      question: isEs ? '¿Qué factores influyen en el tiempo de implementación?' : 'What factors influence implementation time?',
      answer: isEs
        ? 'Varía según complejidad de procesos, disponibilidad de stakeholders, madurez actual y cambios organizacionales requeridos. El diagnóstico inicial establece cronograma realista con hitos claros y entregables progresivos.'
        : 'It varies according to process complexity, stakeholder availability, current maturity, and required organizational changes. The initial diagnosis establishes a realistic schedule with clear milestones and progressive deliverables.'
    },
    {
      question: isEs ? '¿Necesito parar operaciones para optimizar?' : 'Do I need to stop operations to optimize?',
      answer: isEs
        ? 'No. Trabajamos en paralelo sin interrumpir el día a día. Implementamos cambios gradualmente en horarios que minimizan impacto. Solo en casos de cambios tecnológicos puede haber ventanas planificadas.'
        : 'No. We work in parallel without interrupting daily operations. We implement changes gradually at times that minimize impact. Only in cases of technological changes may there be planned windows.'
    },
    {
      question: isEs ? '¿Qué tan rápido vemos resultados?' : 'How quickly do we see results?',
      answer: isEs
        ? 'Quick wins en 2-4 semanas (mejoras de alto impacto y bajo esfuerzo). Resultados significativos en 2-3 meses. ROI completo típicamente en 6-12 meses. Beneficios sostenibles que se acumulan año tras año.'
        : 'Quick wins in 2-4 weeks (high impact, low effort improvements). Significant results in 2-3 months. Full ROI typically in 6-12 months. Sustainable benefits that accumulate year after year.'
    },
    {
      question: isEs ? '¿Cómo miden el éxito de la optimización?' : 'How do you measure optimization success?',
      answer: isEs
        ? 'Establecemos KPIs baseline antes de iniciar: tiempo de ciclo, costo por transacción, tasa de error, productividad. Medimos durante y después. Reportamos mejoras cuantificadas: "redujimos tiempo 40%, de 15 a 9 días", no "mejoramos el proceso".'
        : 'We establish baseline KPIs before starting: cycle time, cost per transaction, error rate, productivity. We measure during and after. We report quantified improvements: "we reduced time 40%, from 15 to 9 days", not "we improved the process".'
    },
    {
      question: isEs ? '¿Qué diferencia a Alternative de otras consultoras?' : 'What differentiates Alternative from other consultancies?',
      answer: isEs
        ? 'Implementación real (no solo recomendaciones), transferencia genuina de capacidad, enfoque en ROI medible, experiencia en múltiples industrias LATAM y Caribe. No creamos dependencia: capacitamos a tu equipo para continuar mejorando.'
        : 'Real implementation (not just recommendations), genuine capacity transfer, focus on measurable ROI, experience in multiple LATAM and Caribbean industries. We don\'t create dependency: we train your team to continue improving.'
    }
  ];

  const comparisonTable = [
    { need: isEs ? 'Procesos informales' : 'Informal processes', bpm: false, lean: false, design: true, auto: false },
    { need: isEs ? 'Muchos desperdicios' : 'Many wastes', bpm: false, lean: true, design: false, auto: false },
    { need: isEs ? 'Necesito ISO' : 'Need ISO', bpm: false, lean: false, design: true, auto: false },
    { need: isEs ? 'Gestión continua' : 'Continuous management', bpm: true, lean: false, design: false, auto: false },
    { need: isEs ? 'Trabajo manual' : 'Manual work', bpm: false, lean: false, design: false, auto: true },
  ];

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Optimización de Procesos' : 'Process Optimization', href: null }
  ];

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
          HERO SECTION - Compact Version for Service Pages
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        {/* Background Elements - Subtle */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[8%] w-32 h-32 bg-turquesa/5 rounded-2xl rotate-12"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[5%] w-24 h-24 bg-menta/5 rounded-2xl -rotate-6"
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
                  <Settings className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Servicios' : 'Services'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Consultoría Empresarial' : 'Business Consulting'}
                  </p>
                </div>
              </div>

              {/* Headline - More Compact */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs ? 'Optimización de Procesos' : 'Process Optimization'}
              </h1>

              {/* Tagline */}
              <p className="text-xl md:text-2xl text-turquesa font-medium mb-4">
                {isEs ? 'Reducir costos. Acelerar crecimiento.' : 'Reduce costs. Accelerate growth.'}
              </p>

              {/* Subheadline - Shorter */}
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Eliminamos desperdicios, rediseñamos flujos ineficientes y automatizamos actividades repetitivas. Resultados medibles: reducción 25-40% en costos operativos, mejora 30-50% en tiempos de ciclo.'
                  : 'We eliminate waste, redesign inefficient flows, and automate repetitive activities. Measurable results: 25-40% reduction in operating costs, 30-50% improvement in cycle times.'}
              </p>

              {/* CTAs - Compact */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Evalúa tu Potencial' : 'Evaluate Your Potential'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/casos-exito`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Ver casos de éxito' : 'Success stories'}
                </Link>
              </div>

              {/* Stats - Inline Compact */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '50+', label: isEs ? 'proyectos' : 'projects' },
                  { value: '35%', label: isEs ? 'reducción costos' : 'cost reduction' },
                  { icon: true, label: 'Lean Six Sigma & PMP' }
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
                      {isEs ? 'Dashboard de Procesos' : 'Process Dashboard'}
                    </span>
                  </div>

                  {/* Simulated Metrics */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">{isEs ? 'Eficiencia Operativa' : 'Operational Efficiency'}</span>
                      <span className="text-turquesa font-bold">+42%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-turquesa to-menta rounded-full"
                      />
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <span className="text-white/60 text-sm">{isEs ? 'Reducción de Costos' : 'Cost Reduction'}</span>
                      <span className="text-menta font-bold">-35%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '70%' }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        className="h-full bg-gradient-to-r from-menta to-turquesa rounded-full"
                      />
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <span className="text-white/60 text-sm">{isEs ? 'Tiempo de Ciclo' : 'Cycle Time'}</span>
                      <span className="text-violeta font-bold">-48%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '60%' }}
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
          PROBLEM SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs 
                ? '¿Tu empresa pierde 20-30% de rentabilidad en procesos ineficientes?'
                : 'Is your company losing 20-30% profitability to inefficient processes?'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-6 mb-12">
            {problems.map((problem, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-blanco-hueso dark:bg-card p-8 rounded-2xl border border-gris-arena/20 
                             hover:shadow-brand transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-red-500/10 rounded-xl 
                                    flex items-center justify-center">
                      <problem.icon className="w-7 h-7 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-2">
                        ⚠️ {problem.title}
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
            <p className="text-lg text-turquesa font-medium">
              {isEs 
                ? '¿Identificaste 2 o más? Tu empresa tiene oportunidades significativas de optimización.'
                : 'Did you identify 2 or more? Your company has significant optimization opportunities.'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          SERVICES SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Servicios' : 'Services'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '4 formas de optimizar según tu necesidad' : '4 ways to optimize based on your need'}
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              {isEs 
                ? 'Cada empresa y proceso requiere un enfoque específico. Evaluamos tu situación y recomendamos la solución óptima.'
                : 'Each company and process requires a specific approach. We evaluate your situation and recommend the optimal solution.'}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, idx) => {
              const colorClasses = {
                turquesa: { bg: 'bg-turquesa/10', icon: 'text-turquesa', border: 'border-turquesa/20' },
                menta: { bg: 'bg-menta/10', icon: 'text-menta', border: 'border-menta/20' },
                violeta: { bg: 'bg-violeta/10', icon: 'text-violeta', border: 'border-violeta/20' }
              };
              const colors = colorClasses[service.color as keyof typeof colorClasses];

              return (
                <StaggerItem key={idx}>
                  <Link href={service.href}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className={`group bg-white dark:bg-background p-8 rounded-2xl 
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
                          <span className="text-turquesa font-medium text-sm">
                            {isEs ? 'Para:' : 'For:'}
                          </span>
                          <span className="text-foreground/60 text-sm">{service.forWho}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-menta font-medium text-sm">
                            {isEs ? 'Resultado:' : 'Result:'}
                          </span>
                          <span className="text-foreground/60 text-sm">{service.result}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-turquesa font-medium group-hover:gap-3 transition-all">
                        <span>{isEs ? 'Conocer más' : 'Learn more'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </motion.div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Comparison Table */}
          <AnimatedSection>
            <div className="bg-white dark:bg-background rounded-2xl p-8 shadow-brand overflow-x-auto">
              <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-6 text-center">
                {isEs ? '¿Cuál necesito?' : 'Which do I need?'}
              </h3>
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-4 text-foreground/60 font-medium bg-gris-arena/10 
                                   border-b-2 border-gris-arena/30 rounded-tl-lg">
                      {isEs ? 'Necesidad' : 'Need'}
                    </th>
                    <th className="py-4 px-4 text-center font-semibold bg-turquesa/10 text-turquesa 
                                   border-b-2 border-turquesa/30">
                      <div className="flex flex-col items-center gap-1">
                        <RefreshCw className="w-5 h-5" />
                        <span>BPM</span>
                      </div>
                    </th>
                    <th className="py-4 px-4 text-center font-semibold bg-menta/10 text-menta 
                                   border-b-2 border-menta/30">
                      <div className="flex flex-col items-center gap-1">
                        <Zap className="w-5 h-5" />
                        <span>Lean</span>
                      </div>
                    </th>
                    <th className="py-4 px-4 text-center font-semibold bg-violeta/10 text-violeta 
                                   border-b-2 border-violeta/30">
                      <div className="flex flex-col items-center gap-1">
                        <PenTool className="w-5 h-5" />
                        <span>{isEs ? 'Diseño' : 'Design'}</span>
                      </div>
                    </th>
                    <th className="py-4 px-4 text-center font-semibold bg-lavanda/10 text-violeta 
                                   border-b-2 border-lavanda/30 rounded-tr-lg">
                      <div className="flex flex-col items-center gap-1">
                        <Bot className="w-5 h-5" />
                        <span>{isEs ? 'Auto' : 'Auto'}</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, idx) => (
                    <tr key={idx} className={`border-b border-gris-arena/20 hover:bg-blanco-hueso/50 
                                              dark:hover:bg-card/50 transition-colors
                                              ${idx === comparisonTable.length - 1 ? 'border-b-0' : ''}`}>
                      <td className="py-4 px-4 text-azul-marino dark:text-white font-medium bg-gris-arena/5">
                        {row.need}
                      </td>
                      <td className="py-4 px-4 text-center bg-turquesa/5">
                        {row.bpm && (
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: "spring", delay: idx * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle2 className="w-6 h-6 text-turquesa mx-auto" />
                          </motion.div>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center bg-menta/5">
                        {row.lean && (
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: "spring", delay: idx * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle2 className="w-6 h-6 text-menta mx-auto" />
                          </motion.div>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center bg-violeta/5">
                        {row.design && (
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: "spring", delay: idx * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle2 className="w-6 h-6 text-violeta mx-auto" />
                          </motion.div>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center bg-lavanda/5">
                        {row.auto && (
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: "spring", delay: idx * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle2 className="w-6 h-6 text-violeta mx-auto" />
                          </motion.div>
                        )}
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
          BENEFITS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-azul-marino">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              {isEs ? 'Resultados que nuestros clientes obtienen' : 'Results our clients achieve'}
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
          CASE STUDY SECTION - HIDDEN FOR VALIDATION
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
                      {isEs ? 'Banco regional optimiza procesos de crédito' : 'Regional bank optimizes credit processes'}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left - Description */}
                  <div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Desafío' : 'Challenge'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Proceso de aprobación de créditos PYME extremadamente lento (15-20 días). Clientes frustrados, equipo desmotivado, imposibilidad de crecer en volumen.'
                          : 'Extremely slow SME credit approval process (15-20 days). Frustrated clients, demotivated team, inability to grow in volume.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución' : 'Solution'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Rediseño completo del proceso BPM, automatización de validaciones, eliminación de aprobaciones redundantes, dashboards en tiempo real.'
                          : 'Complete BPM process redesign, validation automation, elimination of redundant approvals, real-time dashboards.'}
                      </p>
                    </div>

                    <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70 mb-6">
                      {isEs 
                        ? '"Alternative no solo optimizó nuestros procesos, nos enseñó a gestionarlos con disciplina. Hoy somos más ágiles y competitivos."'
                        : '"Alternative not only optimized our processes, they taught us to manage them with discipline. Today we are more agile and competitive."'}
                      <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— CFO</span>
                    </blockquote>
                  </div>

                  {/* Right - Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '40%', label: isEs ? 'Reducción en tiempo' : 'Time reduction', sub: '15 → 9 días' },
                      { value: '25%', label: isEs ? 'Aumento productividad' : 'Productivity increase', sub: isEs ? 'del equipo' : 'of the team' },
                      { value: '100%', label: isEs ? 'Cumplimiento SLA' : 'SLA Compliance', sub: isEs ? 'regulatorios' : 'regulatory' },
                      { value: '+26', label: isEs ? 'Puntos NPS' : 'NPS Points', sub: isEs ? 'mejora cliente' : 'client improvement' }
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white dark:bg-background p-6 rounded-2xl shadow-brand text-center"
                      >
                        <div className="text-3xl lg:text-4xl font-bold text-turquesa mb-1">
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

                <div className="mt-8 flex justify-center">
                  <Link
                    href={`/${locale}/casos-exito`}
                    className="inline-flex items-center gap-2 text-turquesa font-medium hover:gap-3 transition-all"
                  >
                    {isEs ? 'Ver caso completo' : 'View full case'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* =====================================================
          METHODOLOGY SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-violeta/10 text-violeta 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Metodología' : 'Methodology'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Cómo optimizamos procesos en 4 fases' : 'How we optimize processes in 4 phases'}
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline Line - Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-turquesa via-menta to-violeta -translate-y-1/2" />

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {methodology.map((phase, idx) => (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="relative bg-white dark:bg-background p-8 rounded-2xl shadow-brand 
                               hover:shadow-brand-lg transition-all duration-300"
                  >
                    {/* Phase Number */}
                    <div className="absolute -top-4 left-8 w-8 h-8 bg-turquesa rounded-full 
                                    flex items-center justify-center text-azul-marino font-bold text-sm z-10">
                      {idx + 1}
                    </div>

                    <div className="pt-4">
                      <div className="w-14 h-14 bg-turquesa/10 rounded-xl 
                                      flex items-center justify-center mb-4">
                        <phase.icon className="w-7 h-7 text-turquesa" />
                      </div>

                      <h3 className="text-lg font-bold text-azul-marino dark:text-white mb-1">
                        {phase.phase}
                      </h3>
                      <p className="text-turquesa text-sm font-medium mb-3">{phase.duration}</p>
                      <p className="text-foreground/70 text-sm leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
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
                {isEs ? '¿Listo para optimizar y reducir costos?' : 'Ready to optimize and reduce costs?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Agenda un diagnóstico gratuito de 30 minutos. Identificamos tus 3 oportunidades de optimización más urgentes y estimamos ahorros potenciales.'
                  : 'Schedule a free 30-minute diagnosis. We identify your 3 most urgent optimization opportunities and estimate potential savings.'}
              </p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Análisis preliminar de procesos críticos' : 'Preliminary analysis of critical processes',
                  isEs ? 'Identificación de desperdicios evidentes' : 'Identification of obvious waste',
                  isEs ? 'Estimación de ahorros potenciales ($)' : 'Estimation of potential savings ($)',
                  isEs ? 'Recomendación de enfoque óptimo' : 'Optimal approach recommendation'
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
                    {isEs ? 'Solicitar Diagnóstico Gratuito' : 'Request Free Diagnosis'}
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

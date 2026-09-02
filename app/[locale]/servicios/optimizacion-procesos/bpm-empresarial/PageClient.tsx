'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import {
  RefreshCw,
  ArrowRight,
  ChevronDown,
  AlertTriangle,
  Eye,
  TrendingUp,
  Users,
  Building2,
  Settings,
  BarChart3,
  Target,
  Shield,
  Award,
  Layers,
  GitBranch,
  Monitor,
  Search,
  Sparkles,
  BookOpen,
  Phone,
  CheckCircle2,
  Globe,
  Briefcase,
  Scale
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

export default function BPMEmpresarialPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Optimización de Procesos' : 'Process Optimization', href: `/${locale}/servicios/optimizacion-procesos` },
    { label: 'BPM Empresarial', href: null }
  ];

  // =====================================================
  // CONTENT DATA
  // =====================================================

  const problems = [
    {
      icon: Layers,
      title: isEs ? 'Múltiples procesos sin coordinación' : 'Multiple processes without coordination',
      description: isEs
        ? '15, 20, 30+ procesos cruzando departamentos. Cada área optimiza su pedazo sin ver el impacto en el proceso completo end-to-end.'
        : '15, 20, 30+ processes crossing departments. Each area optimizes its piece without seeing the impact on the complete end-to-end process.'
    },
    {
      icon: RefreshCw,
      title: isEs ? 'Mejoras que no se sostienen' : 'Improvements that don\'t last',
      description: isEs
        ? 'Haces proyectos de mejora, funcionan 3-6 meses, luego vuelven a como estaban. Sin gobierno, las mejoras mueren.'
        : 'You do improvement projects, they work for 3-6 months, then go back to how they were. Without governance, improvements die.'
    },
    {
      icon: Eye,
      title: isEs ? 'Falta de visibilidad ejecutiva' : 'Lack of executive visibility',
      description: isEs
        ? 'No sabes en tiempo real qué pasa en procesos críticos. Reportes manuales que llegan tarde y desactualizados.'
        : 'You don\'t know in real time what\'s happening in critical processes. Manual reports that arrive late and outdated.'
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'Cambios frecuentes requieren ajustar procesos' : 'Frequent changes require process adjustments',
      description: isEs
        ? 'Nueva regulación, nuevo producto, nueva geografía. Sin BPM, cada ajuste es heroico. Con BPM, adaptas estructuradamente.'
        : 'New regulation, new product, new geography. Without BPM, every adjustment is heroic. With BPM, you adapt structurally.'
    },
    {
      icon: Globe,
      title: isEs ? 'Imposible estandarizar entre ubicaciones' : 'Impossible to standardize across locations',
      description: isEs
        ? 'Cada país, región o línea de negocio hace las cosas diferente. Sin arquitectura de procesos, imposible estandarizar.'
        : 'Each country, region, or business line does things differently. Without process architecture, impossible to standardize.'
    }
  ];

  const bpmCycle = [
    {
      phase: isEs ? 'DISEÑO' : 'DESIGN',
      icon: GitBranch,
      description: isEs
        ? 'Arquitectura de procesos, modelado BPMN, definición de flujos y roles'
        : 'Process architecture, BPMN modeling, flow and role definition',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'IMPLEMENTACIÓN' : 'IMPLEMENTATION',
      icon: Settings,
      description: isEs
        ? 'Ejecutar procesos diseñados, capacitar equipos, establecer políticas'
        : 'Execute designed processes, train teams, establish policies',
      color: 'menta'
    },
    {
      phase: isEs ? 'MONITOREO' : 'MONITORING',
      icon: Monitor,
      description: isEs
        ? 'KPIs por proceso, dashboards en tiempo real, alertas automáticas'
        : 'KPIs per process, real-time dashboards, automatic alerts',
      color: 'violeta'
    },
    {
      phase: isEs ? 'ANÁLISIS' : 'ANALYSIS',
      icon: Search,
      description: isEs
        ? 'Identificar cuellos de botella, variaciones, causas raíz de problemas'
        : 'Identify bottlenecks, variations, root causes of problems',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'MEJORA' : 'IMPROVEMENT',
      icon: Sparkles,
      description: isEs
        ? 'Proyectos de optimización (Lean, Six Sigma), eventos Kaizen'
        : 'Optimization projects (Lean, Six Sigma), Kaizen events',
      color: 'menta'
    },
    {
      phase: isEs ? 'GOBIERNO' : 'GOVERNANCE',
      icon: Shield,
      description: isEs
        ? 'Roles (dueños de proceso, comité BPM), políticas, ciclo de revisión'
        : 'Roles (process owners, BPM committee), policies, review cycle',
      color: 'violeta'
    }
  ];

  const includes = [
    {
      title: isEs ? 'Arquitectura y Diseño' : 'Architecture & Design',
      icon: GitBranch,
      items: isEs
        ? ['Inventario y clasificación de procesos', 'Arquitectura empresarial de procesos', 'Modelado BPMN 2.0 de procesos críticos', 'Roles y responsabilidades (RACI)']
        : ['Process inventory and classification', 'Enterprise process architecture', 'BPMN 2.0 modeling of critical processes', 'Roles and responsibilities (RACI)'],
      color: 'turquesa'
    },
    {
      title: isEs ? 'Gobierno y Operación' : 'Governance & Operation',
      icon: Shield,
      items: isEs
        ? ['Estructura de gobierno (comité, dueños de proceso)', 'Políticas de gestión de procesos', 'KPIs y dashboards de monitoreo', 'Metodología de mejora continua']
        : ['Governance structure (committee, process owners)', 'Process management policies', 'KPIs and monitoring dashboards', 'Continuous improvement methodology'],
      color: 'menta'
    },
    {
      title: isEs ? 'Tecnología (opcional)' : 'Technology (optional)',
      icon: Monitor,
      items: isEs
        ? ['Evaluación y selección de BPMS', 'Implementación de plataforma', 'Configuración de workflows digitales', 'Integraciones con sistemas existentes']
        : ['BPMS evaluation and selection', 'Platform implementation', 'Digital workflow configuration', 'Integrations with existing systems'],
      color: 'violeta'
    },
    {
      title: isEs ? 'Capacitación' : 'Training',
      icon: BookOpen,
      items: isEs
        ? ['Capacitación ejecutiva en BPM', 'Certificación de dueños de proceso', 'Entrenamiento en modelado BPMN', 'Gestión del cambio organizacional']
        : ['Executive BPM training', 'Process owner certification', 'BPMN modeling training', 'Organizational change management'],
      color: 'turquesa'
    }
  ];

  const benefits = [
    {
      title: isEs ? 'Visibilidad Ejecutiva Completa' : 'Complete Executive Visibility',
      description: isEs
        ? 'Dashboards con métricas en tiempo real. Sabes exactamente qué está pasando en procesos críticos.'
        : 'Dashboards with real-time metrics. You know exactly what\'s happening in critical processes.',
      icon: Eye,
      stat: '100%',
      statLabel: isEs ? 'visibilidad' : 'visibility'
    },
    {
      title: isEs ? 'Mejora Continua Sostenible' : 'Sustainable Continuous Improvement',
      description: isEs
        ? 'Tu equipo tiene metodología y herramientas para mejorar continuamente sin consultores externos.'
        : 'Your team has methodology and tools to continuously improve without external consultants.',
      icon: TrendingUp,
      stat: '10-15',
      statLabel: isEs ? 'iniciativas/año' : 'initiatives/year'
    },
    {
      title: isEs ? 'Agilidad ante Cambios' : 'Agility to Changes',
      description: isEs
        ? 'Adaptas procesos estructuradamente en semanas, no meses.'
        : 'You adapt processes structurally in weeks, not months.',
      icon: RefreshCw,
      stat: '6x',
      statLabel: isEs ? 'más rápido' : 'faster'
    },
    {
      title: isEs ? 'Estandarización con Flexibilidad' : 'Standardization with Flexibility',
      description: isEs
        ? '80% de procesos estandarizados, 20% adaptados localmente según necesidad.'
        : '80% of processes standardized, 20% adapted locally as needed.',
      icon: Layers,
      stat: '80/20',
      statLabel: isEs ? 'estándar/local' : 'standard/local'
    },
    {
      title: isEs ? 'Reducción de Costos' : 'Cost Reduction',
      description: isEs
        ? 'Eliminas redundancias, automatizas pasos manuales, reduces tiempos.'
        : 'You eliminate redundancies, automate manual steps, reduce times.',
      icon: BarChart3,
      stat: '25-35%',
      statLabel: isEs ? 'ahorro en 2-3 años' : 'savings in 2-3 years'
    }
  ];

  const profiles = [
    {
      title: isEs ? 'Empresas Medianas-Grandes en Crecimiento' : 'Growing Medium-Large Companies',
      description: isEs
        ? '100+ empleados, múltiples departamentos. Han crecido rápido y gestión informal ya no funciona.'
        : '100+ employees, multiple departments. They have grown fast and informal management no longer works.',
      icon: Building2,
      color: 'turquesa'
    },
    {
      title: isEs ? 'Organizaciones Multi-geográficas' : 'Multi-geographic Organizations',
      description: isEs
        ? 'Operan en 2+ países o líneas de negocio. Cada ubicación hace las cosas diferente, falta estandarización.'
        : 'Operate in 2+ countries or business lines. Each location does things differently, lacking standardization.',
      icon: Globe,
      color: 'menta'
    },
    {
      title: isEs ? 'Industrias Reguladas' : 'Regulated Industries',
      description: isEs
        ? 'Banca, seguros, salud, energía. Regulación estricta requiere trazabilidad y control riguroso.'
        : 'Banking, insurance, health, energy. Strict regulation requires traceability and rigorous control.',
      icon: Scale,
      color: 'violeta'
    }
  ];

  const faqs = [
    {
      question: isEs ? '¿Cómo determinan el alcance de implementación de BPM?' : 'How do you determine the scope of BPM implementation?',
      answer: isEs
        ? 'Evaluamos: cantidad de procesos a gestionar, madurez actual, necesidad de herramientas BPMS, complejidad organizacional (geografías, unidades). Diagnóstico BPM gratuito desarrolla roadmap y propuesta específica.'
        : 'We evaluate: number of processes to manage, current maturity, need for BPMS tools, organizational complexity (geographies, units). Free BPM diagnosis develops roadmap and specific proposal.'
    },
    {
      question: isEs ? '¿Cuál es la diferencia entre BPM y simplemente "mejorar procesos"?' : 'What\'s the difference between BPM and simply "improving processes"?',
      answer: isEs
        ? 'BPM es capacidad organizacional permanente para gestionar procesos continuamente (diseño, ejecución, monitoreo, mejora, gobierno). "Mejorar procesos" es proyecto puntual que termina. Con BPM estableces roles, metodología y cultura de mejora continua sostenible.'
        : 'BPM is a permanent organizational capability to continuously manage processes (design, execution, monitoring, improvement, governance). "Improving processes" is a one-time project that ends. With BPM you establish roles, methodology, and sustainable continuous improvement culture.'
    },
    {
      question: isEs ? '¿Necesito software BPM (BPMS)?' : 'Do I need BPM software (BPMS)?',
      answer: isEs
        ? 'No obligatorio. Puedes empezar con herramientas ofimáticas. BPMS recomendable cuando tienes 20+ procesos, necesitas workflows automatizados o industria regulada requiere trazabilidad estricta. Primero metodología, luego tecnología.'
        : 'Not mandatory. You can start with office tools. BPMS recommended when you have 20+ processes, need automated workflows, or regulated industry requires strict traceability. First methodology, then technology.'
    },
    {
      question: isEs ? '¿Qué es un "dueño de proceso"?' : 'What is a "process owner"?',
      answer: isEs
        ? 'Persona responsable del desempeño end-to-end de un proceso. No ejecuta; gestiona, mejora y responde por resultados. Sin dueños claros, nadie mejora procesos.'
        : 'Person responsible for the end-to-end performance of a process. Doesn\'t execute; manages, improves, and is accountable for results. Without clear owners, no one improves processes.'
    },
    {
      question: isEs ? '¿BPM es solo para empresas grandes?' : 'Is BPM only for large companies?',
      answer: isEs
        ? 'BPM estructurado aplica típicamente desde 100+ empleados. PYMES más pequeñas se benefician de gestión de procesos simplificada. Evaluamos caso por caso según complejidad, no solo tamaño.'
        : 'Structured BPM typically applies from 100+ employees. Smaller SMEs benefit from simplified process management. We evaluate case by case based on complexity, not just size.'
    },
    {
      question: isEs ? '¿BPM se vuelve burocracia excesiva?' : 'Does BPM become excessive bureaucracy?',
      answer: isEs
        ? 'No si se diseña bien. Governance pragmático: comités cortos (1 hora/mes), documentación mínima viable, autonomía de dueños de proceso. Involucramos equipos operativos en diseño para asegurar que es práctico, no burocrático.'
        : 'Not if designed well. Pragmatic governance: short committees (1 hour/month), minimum viable documentation, process owner autonomy. We involve operational teams in design to ensure it\'s practical, not bureaucratic.'
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
                  <RefreshCw className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    Business Process Management
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Optimización de Procesos' : 'Process Optimization'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Gestiona procesos de forma sistemática y sostenible con BPM'
                  : 'Manage processes systematically and sustainably with BPM'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Implementamos Business Process Management para que tu empresa gestione procesos continuamente: diseño, monitoreo, mejora y gobierno estructurado. Ideal para organizaciones con múltiples procesos interdepartamentales complejos.'
                  : 'We implement Business Process Management so your company continuously manages processes: design, monitoring, improvement, and structured governance. Ideal for organizations with multiple complex interdepartmental processes.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Evalúa tu Madurez BPM' : 'Evaluate Your BPM Maturity'}
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
                  { value: '15+', label: isEs ? 'implementaciones BPM' : 'BPM implementations' },
                  { value: '30%', label: isEs ? 'reducción tiempos' : 'time reduction' },
                  { icon: true, label: isEs ? 'Consultores certificados' : 'Certified consultants' }
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

            {/* Right Visual - BPM Cycle Diagram */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-turquesa/20 rounded-full"
                />
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                  <div className="text-center mb-6">
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {isEs ? 'Ciclo BPM' : 'BPM Cycle'}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {isEs ? 'Gestión continua de procesos' : 'Continuous process management'}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {bpmCycle.slice(0, 6).map((phase, idx) => {
                      const colors = colorClasses[phase.color as keyof typeof colorClasses];
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          className={`${colors.bg} rounded-xl p-4 text-center border ${colors.border}`}
                        >
                          <phase.icon className={`w-6 h-6 ${colors.text} mx-auto mb-2`} />
                          <span className={`text-xs font-medium ${colors.text}`}>
                            {phase.phase}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT IS BPM SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                               rounded-full text-sm font-medium mb-4">
                {isEs ? '¿Qué es BPM?' : 'What is BPM?'}
              </span>
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs 
                  ? 'BPM: gestión continua de procesos como activos estratégicos'
                  : 'BPM: continuous management of processes as strategic assets'}
              </h2>
              
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs 
                    ? 'BPM (Business Process Management) es una disciplina que trata los procesos de negocio como activos estratégicos que deben gestionarse continuamente. No es solo mapear procesos una vez; es diseñar, ejecutar, monitorear, analizar y mejorar procesos en ciclo permanente.'
                    : 'BPM (Business Process Management) is a discipline that treats business processes as strategic assets that must be continuously managed. It\'s not just mapping processes once; it\'s designing, executing, monitoring, analyzing, and improving processes in a permanent cycle.'}
                </p>
                <p>
                  <strong className="text-azul-marino dark:text-white">
                    {isEs ? 'Diferencia clave:' : 'Key difference:'}
                  </strong>{' '}
                  {isEs 
                    ? 'BPM no es un proyecto puntual de mejora. Es establecer una capacidad organizacional permanente para gestionar procesos de forma estructurada. Incluye gobierno, roles (dueños de proceso), metodología y herramientas.'
                    : 'BPM is not a one-time improvement project. It\'s establishing a permanent organizational capability to manage processes in a structured way. It includes governance, roles (process owners), methodology, and tools.'}
                </p>
                <p>
                  <strong className="text-azul-marino dark:text-white">
                    {isEs ? 'Cuándo lo necesitas:' : 'When you need it:'}
                  </strong>{' '}
                  {isEs 
                    ? 'Cuando tienes múltiples procesos interdepartamentales, mejoras que no se sostienen en el tiempo, falta de visibilidad ejecutiva, o necesitas estandarizar entre geografías/unidades de negocio.'
                    : 'When you have multiple interdepartmental processes, improvements that don\'t last over time, lack of executive visibility, or need to standardize across geographies/business units.'}
                </p>
              </div>
            </AnimatedSection>

            {/* BPM Cycle Visual */}
            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="bg-blanco-hueso dark:bg-card rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-6 text-center">
                    {isEs ? 'Ciclo de Vida BPM' : 'BPM Life Cycle'}
                  </h3>
                  <div className="relative">
                    {/* Center circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                    w-20 h-20 bg-turquesa/20 rounded-full flex items-center justify-center z-10">
                      <RefreshCw className="w-10 h-10 text-turquesa" />
                    </div>
                    
                    {/* Cycle items */}
                    <div className="grid grid-cols-3 gap-4">
                      {bpmCycle.map((phase, idx) => {
                        const colors = colorClasses[phase.color as keyof typeof colorClasses];
                        return (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className={`${colors.bg} rounded-xl p-4 border ${colors.border}
                                       hover:shadow-brand transition-all duration-300`}
                          >
                            <div className={`w-10 h-10 ${colors.bg} rounded-lg 
                                            flex items-center justify-center mb-3`}>
                              <phase.icon className={`w-5 h-5 ${colors.text}`} />
                            </div>
                            <h4 className={`font-semibold ${colors.text} text-sm mb-1`}>
                              {phase.phase}
                            </h4>
                            <p className="text-xs text-foreground/60 leading-relaxed">
                              {phase.description}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
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
                ? '5 señales de que necesitas BPM estructurado'
                : '5 signs you need structured BPM'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        ⚠️ {problem.title}
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
          WHAT'S INCLUDED SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Implementación Completa' : 'Complete Implementation'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Qué incluye nuestra implementación BPM' : 'What our BPM implementation includes'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {includes.map((item, idx) => {
              const colors = colorClasses[item.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-white dark:bg-card p-8 rounded-2xl shadow-brand 
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
              {isEs 
                ? 'Por qué empresas líderes gestionan con BPM'
                : 'Why leading companies manage with BPM'}
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
          CASE STUDY SECTION - HIDDEN FOR VALIDATION
          ===================================================== */}
      {false && (
      <section id="caso-exito" className="py-20 lg:py-28 bg-white dark:bg-background">
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
                        ? 'Institución financiera multi-país implementa BPM'
                        : 'Multi-country financial institution implements BPM'}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left - Description */}
                  <div>
                    <div className="mb-6">
                      <p className="text-sm text-foreground/60 mb-2">
                        {isEs ? '3 países • 500+ empleados' : '3 countries • 500+ employees'}
                      </p>
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Desafío' : 'Challenge'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Operaciones completamente diferentes en cada país. Imposibilidad de comparar desempeño o replicar mejores prácticas. Gerencia regional sin visibilidad real.'
                          : 'Completely different operations in each country. Inability to compare performance or replicate best practices. Regional management without real visibility.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución' : 'Solution'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Arquitectura empresarial de procesos, modelado de 8 procesos core, estructura de gobierno regional, dashboards Power BI, implementación escalonada en 18 meses.'
                          : 'Enterprise process architecture, 8 core process modeling, regional governance structure, Power BI dashboards, phased implementation over 18 months.'}
                      </p>
                    </div>

                    <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                      {isEs 
                        ? '"BPM nos dio visibilidad en tiempo real y un equipo que mejora procesos continuamente sin depender de consultores."'
                        : '"BPM gave us real-time visibility and a team that continuously improves processes without depending on consultants."'}
                      <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— COO Regional</span>
                    </blockquote>
                  </div>

                  {/* Right - Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '12', label: isEs ? 'procesos core' : 'core processes', sub: isEs ? 'estandarizados' : 'standardized' },
                      { value: '28%', label: isEs ? 'reducción costos' : 'cost reduction', sub: isEs ? 'operacionales' : 'operational' },
                      { value: '35%', label: isEs ? 'reducción tiempo' : 'time reduction', sub: isEs ? 'de ciclo' : 'cycle' },
                      { value: '18', label: isEs ? 'iniciativas' : 'initiatives', sub: isEs ? 'por equipos internos' : 'by internal teams' },
                      { value: 'Nivel 3', label: isEs ? 'madurez BPM' : 'BPM maturity', sub: isEs ? 'desde Nivel 1' : 'from Level 1' },
                      { value: '240%', label: 'ROI', sub: isEs ? 'a 2 años' : 'at 2 years' }
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
      )}

      {/* =====================================================
          WHO IS IT FOR SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Tu empresa está lista para BPM?' : 'Is your company ready for BPM?'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {profiles.map((profile, idx) => {
              const colors = colorClasses[profile.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`bg-white dark:bg-background p-8 rounded-2xl shadow-brand 
                                hover:shadow-brand-lg transition-all duration-300 h-full
                                border-t-4 ${colors.border.replace('/20', '')}`}
                  >
                    <div className={`w-16 h-16 ${colors.bg} rounded-2xl 
                                    flex items-center justify-center mb-6`}>
                      <profile.icon className={`w-8 h-8 ${colors.text}`} />
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
              {isEs ? 'Preguntas frecuentes sobre BPM' : 'Frequently Asked Questions about BPM'}
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
                {isEs ? '¿Listo para implementar BPM?' : 'Ready to implement BPM?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Agenda un diagnóstico BPM de 30 minutos. Evaluamos tu madurez actual y te damos roadmap preliminar.'
                  : 'Schedule a 30-minute BPM diagnosis. We evaluate your current maturity and give you a preliminary roadmap.'}
              </p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Assessment preliminar de madurez' : 'Preliminary maturity assessment',
                  isEs ? 'Identificación de procesos críticos' : 'Identification of critical processes',
                  isEs ? 'Roadmap de implementación' : 'Implementation roadmap',
                  isEs ? 'Estimación de inversión y ROI' : 'Investment and ROI estimation'
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
                    {isEs ? 'Solicitar Diagnóstico BPM' : 'Request BPM Diagnosis'}
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

'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import {
  Bot,
  ArrowRight,
  ChevronDown,
  ClipboardList,
  RefreshCw,
  Plug,
  Clock,
  BarChart3,
  FileText,
  Zap,
  Workflow,
  Link2,
  Brain,
  Search,
  Code,
  BookOpen,
  Monitor,
  Building2,
  Phone,
  CheckCircle2,
  Award,
  AlertTriangle,
  XCircle,
  Timer,
  Users,
  Shield,
  Sparkles,
  Check,
  X
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

export default function AutomatizacionProcesosPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(8).fill(false));
  const isEs = locale === 'es';

  const toggleCheck = (idx: number) => {
    const newChecked = [...checkedItems];
    newChecked[idx] = !newChecked[idx];
    setCheckedItems(newChecked);
  };

  const checkCount = checkedItems.filter(Boolean).length;

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Optimización de Procesos' : 'Process Optimization', href: `/${locale}/servicios/optimizacion-procesos` },
    { label: isEs ? 'Automatización' : 'Automation', href: null }
  ];

  // =====================================================
  // CONTENT DATA
  // =====================================================

  const problems = [
    {
      icon: ClipboardList,
      title: isEs ? 'Copiar datos entre sistemas' : 'Copying data between systems',
      description: isEs 
        ? 'Horas copiando información de correos a Excel, de Excel a ERP, de un sistema a otro. Alto riesgo de error.'
        : 'Hours copying information from emails to Excel, from Excel to ERP, from one system to another. High risk of error.',
      color: 'turquesa'
    },
    {
      icon: RefreshCw,
      title: isEs ? 'Tareas repetitivas con mismo patrón' : 'Repetitive tasks with same pattern',
      description: isEs 
        ? 'Validar 200 facturas con mismo checklist. Procesar 500 solicitudes con mismas reglas. Enviar 100 emails similares.'
        : 'Validate 200 invoices with same checklist. Process 500 requests with same rules. Send 100 similar emails.',
      color: 'menta'
    },
    {
      icon: Plug,
      title: isEs ? 'Sistemas que no se comunican' : 'Systems that don\'t communicate',
      description: isEs 
        ? 'Vendes en un sistema, facturas en otro, contabilizas en otro. Cada venta requiere data entry en 4 sistemas.'
        : 'You sell in one system, invoice in another, account in another. Each sale requires data entry in 4 systems.',
      color: 'violeta'
    },
    {
      icon: Clock,
      title: isEs ? 'Aprobaciones que demoran días' : 'Approvals that take days',
      description: isEs 
        ? 'Solicitudes atrapadas en email de aprobadores ocupados. Proceso de 2 horas se extiende a 5 días por esperas.'
        : 'Requests stuck in emails of busy approvers. 2-hour process extends to 5 days due to waiting.',
      color: 'turquesa'
    },
    {
      icon: BarChart3,
      title: isEs ? 'Generación manual de reportes' : 'Manual report generation',
      description: isEs 
        ? 'Cada lunes generas mismo reporte: abres 6 archivos, copias, calculas, formateas, envías. 3 horas/semana = 156 horas/año.'
        : 'Every Monday you generate same report: open 6 files, copy, calculate, format, send. 3 hours/week = 156 hours/year.',
      color: 'menta'
    },
    {
      icon: FileText,
      title: isEs ? 'Extracción de datos de documentos' : 'Data extraction from documents',
      description: isEs 
        ? '500 facturas en PDF. Alguien las abre una por una, tipea datos. 10 min por factura = 83 horas de trabajo manual.'
        : '500 invoices in PDF. Someone opens them one by one, types data. 10 min per invoice = 83 hours of manual work.',
      color: 'violeta'
    }
  ];

  const automationTypes = [
    {
      icon: Bot,
      title: 'RPA',
      subtitle: 'Robotic Process Automation',
      description: isEs 
        ? '"Robots de software" que imitan acciones humanas en múltiples sistemas sin integración nativa.'
        : '"Software robots" that mimic human actions in multiple systems without native integration.',
      tools: 'UiPath, Power Automate, Automation Anywhere',
      time: isEs ? '6-12 semanas' : '6-12 weeks',
      roi: '200-400%',
      color: 'turquesa'
    },
    {
      icon: Workflow,
      title: isEs ? 'Workflows Digitales' : 'Digital Workflows',
      subtitle: isEs ? 'Flujos automatizados' : 'Automated flows',
      description: isEs 
        ? 'Flujos de aprobación y tareas automatizadas para procesos que requieren intervención humana estructurada.'
        : 'Approval flows and automated tasks for processes that require structured human intervention.',
      tools: 'Power Automate, Nintex, Kissflow',
      time: isEs ? '4-8 semanas' : '4-8 weeks',
      roi: '150-300%',
      color: 'menta'
    },
    {
      icon: Link2,
      title: isEs ? 'Integraciones API' : 'API Integrations',
      subtitle: isEs ? 'Conectar sistemas' : 'Connect systems',
      description: isEs 
        ? 'Conectar sistemas para sincronización automática. Solución permanente y escalable entre aplicaciones.'
        : 'Connect systems for automatic synchronization. Permanent and scalable solution between applications.',
      tools: 'Zapier, APIs custom, iPaaS',
      time: isEs ? '8-16 semanas' : '8-16 weeks',
      roi: '250-500%',
      color: 'violeta'
    },
    {
      icon: Brain,
      title: isEs ? 'Automatización Inteligente' : 'Intelligent Automation',
      subtitle: isEs ? 'Con IA' : 'With AI',
      description: isEs 
        ? 'Con inteligencia artificial para tareas de "juicio". OCR de facturas, chatbots, clasificación automática.'
        : 'With artificial intelligence for "judgment" tasks. Invoice OCR, chatbots, automatic classification.',
      tools: 'Azure AI, OpenAI, Google Cloud Vision',
      time: isEs ? '12-20 semanas' : '12-20 weeks',
      roi: '300-800%',
      color: 'turquesa'
    }
  ];

  const includes = [
    {
      title: isEs ? 'Análisis y Diseño' : 'Analysis & Design',
      icon: Search,
      items: isEs
        ? ['Evaluación de procesos automatizables', 'Cálculo de ROI por proceso', 'Optimización pre-automatización', 'Diseño técnico de solución']
        : ['Evaluation of automatable processes', 'ROI calculation per process', 'Pre-automation optimization', 'Technical solution design'],
      color: 'turquesa'
    },
    {
      title: isEs ? 'Desarrollo e Implementación' : 'Development & Implementation',
      icon: Code,
      items: isEs
        ? ['Desarrollo de bots RPA', 'Configuración de workflows', 'Integraciones API', 'Testing exhaustivo']
        : ['RPA bot development', 'Workflow configuration', 'API integrations', 'Exhaustive testing'],
      color: 'menta'
    },
    {
      title: isEs ? 'Capacitación' : 'Training',
      icon: BookOpen,
      items: isEs
        ? ['Capacitación a usuarios finales', 'Capacitación a equipo IT', 'Manuales de usuario', 'Documentación técnica']
        : ['End user training', 'IT team training', 'User manuals', 'Technical documentation'],
      color: 'violeta'
    },
    {
      title: isEs ? 'Monitoreo y Soporte' : 'Monitoring & Support',
      icon: Monitor,
      items: isEs
        ? ['Dashboard de monitoreo', 'Alertas automáticas', 'Soporte 3 meses incluido', 'Ajustes y optimizaciones']
        : ['Monitoring dashboard', 'Automatic alerts', '3 months support included', 'Adjustments and optimizations'],
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '60-80%', label: isEs ? 'Reducción en tiempo de ejecución' : 'Reduction in execution time', icon: Timer },
    { value: '95%+', label: isEs ? 'Eliminación de errores manuales' : 'Elimination of manual errors', icon: XCircle },
    { value: '30-40%', label: isEs ? 'Capacidad humana liberada para trabajo estratégico' : 'Human capacity freed for strategic work', icon: Users },
    { value: '24/7', label: isEs ? 'Disponibilidad sin costo de horas extras' : 'Availability without overtime cost', icon: Clock },
    { value: '+100%', label: isEs ? 'Volumen procesado sin contratar' : 'Volume processed without hiring', icon: BarChart3 },
    { value: '100%', label: isEs ? 'Trazabilidad y auditoría completa' : 'Complete traceability and audit', icon: Shield }
  ];

  const checklistItems = isEs
    ? [
      '+10 horas/semana en trabajo manual repetitivo',
      'Copias datos entre sistemas constantemente',
      'Procesas +100 transacciones similares por semana',
      'Sistemas que no se comunican',
      'Generas reportes manualmente',
      'Aprobaciones demoran días por esperas',
      'Tasa de error manual +5%',
      'Necesitas procesar fuera de horario laboral'
    ]
    : [
      '+10 hours/week on repetitive manual work',
      'You constantly copy data between systems',
      'You process +100 similar transactions per week',
      'Systems that don\'t communicate',
      'You generate reports manually',
      'Approvals take days due to waiting',
      'Manual error rate +5%',
      'You need to process outside business hours'
    ];

  const faqs = [
    {
      question: isEs ? '¿Cómo determinan el costo de automatización?' : 'How do you determine automation cost?',
      answer: isEs
        ? 'Depende de: tipo de automatización (RPA, workflow, API, IA), cantidad de procesos, complejidad de sistemas, necesidad de optimización previa, licencias de software. Evaluación gratuita calcula ROI específico y presenta opciones.'
        : 'It depends on: type of automation (RPA, workflow, API, AI), number of processes, system complexity, need for prior optimization, software licenses. Free evaluation calculates specific ROI and presents options.'
    },
    {
      question: isEs ? '¿Automatización significa despedir personas?' : 'Does automation mean firing people?',
      answer: isEs
        ? 'No. Liberamos personas de trabajo tedioso para que se enfoquen en alto valor. Clientes típicamente NO despiden; reasignan capacidad a actividades estratégicas o crecen sin contratar proporcionalmente.'
        : 'No. We free people from tedious work so they can focus on high value. Clients typically DON\'T fire; they reassign capacity to strategic activities or grow without hiring proportionally.'
    },
    {
      question: isEs ? '¿Qué pasa si mi proceso cambia?' : 'What happens if my process changes?',
      answer: isEs
        ? 'Bots bien diseñados son resilientes a cambios menores. Cambios significativos requieren ajustes (similar a capacitar empleado). Incluimos soporte post-implementación. Mantenimiento típico: 10-15% costo inicial anual.'
        : 'Well-designed bots are resilient to minor changes. Significant changes require adjustments (similar to training an employee). We include post-implementation support. Typical maintenance: 10-15% initial cost annually.'
    },
    {
      question: isEs ? '¿Puedo automatizar con sistemas viejos (legacy)?' : 'Can I automate with old (legacy) systems?',
      answer: isEs
        ? 'Sí. RPA es ideal para eso. No modifica sistemas; interactúa con interfaz como humano. Hemos automatizado en mainframe de los 80s exitosamente.'
        : 'Yes. RPA is ideal for that. It doesn\'t modify systems; it interacts with the interface like a human. We\'ve successfully automated on 80s mainframes.'
    },
    {
      question: isEs ? '¿Qué tan segura es la automatización?' : 'How secure is automation?',
      answer: isEs
        ? 'Muy segura. Bots con credenciales dedicadas y permisos mínimos, trazabilidad completa, encriptación de datos sensibles, cumplimiento ISO 27001/SOC 2. Frecuentemente MEJORA seguridad vs manejo humano.'
        : 'Very secure. Bots with dedicated credentials and minimum permissions, complete traceability, sensitive data encryption, ISO 27001/SOC 2 compliance. Frequently IMPROVES security vs human handling.'
    },
    {
      question: isEs ? '¿Qué procesos NO automatizar?' : 'What processes NOT to automate?',
      answer: isEs
        ? 'Procesos con juicio complejo o empatía, procesos inestables que cambian constantemente, excepciones >30%, procesos que deben optimizarse primero. Evaluamos caso por caso.'
        : 'Processes with complex judgment or empathy, unstable processes that constantly change, exceptions >30%, processes that must be optimized first. We evaluate case by case.'
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
            className="absolute bottom-[20%] left-[5%] w-32 h-32 bg-violeta/5 rounded-full blur-xl"
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
                  <Bot className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Automatización de Procesos' : 'Process Automation'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Optimización de Procesos' : 'Process Optimization'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Automatiza procesos y libera a tu equipo para trabajo estratégico'
                  : 'Automate processes and free your team for strategic work'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'RPA, workflows digitales e integraciones entre sistemas. Reducción 60-80% en tiempos. Regla de oro: primero optimizamos procesos, luego automatizamos para ROI real.'
                  : 'RPA, digital workflows, and system integrations. 60-80% time reduction. Golden rule: first we optimize processes, then we automate for real ROI.'}
              </p>

              {/* CTAs */}
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
                  href="#roi-calculator"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Calcula ROI de automatización' : 'Calculate automation ROI'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '50+', label: isEs ? 'procesos automatizados' : 'automated processes' },
                  { value: '70%', label: isEs ? 'reducción tiempo manual' : 'manual time reduction' },
                  { icon: true, label: isEs ? 'Partners certificados' : 'Certified partners' }
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

            {/* Right Visual - Automation Flow */}
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
                      {isEs ? 'Flujo de Automatización' : 'Automation Flow'}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {isEs ? 'Bot trabajando 24/7' : 'Bot working 24/7'}
                    </p>
                  </div>
                  
                  {/* Automation Visual */}
                  <div className="space-y-4">
                    {[
                      { step: 1, label: isEs ? 'Recibe datos' : 'Receives data', icon: FileText },
                      { step: 2, label: isEs ? 'Valida información' : 'Validates info', icon: CheckCircle2 },
                      { step: 3, label: isEs ? 'Procesa en sistemas' : 'Processes in systems', icon: RefreshCw },
                      { step: 4, label: isEs ? 'Notifica resultado' : 'Notifies result', icon: Zap }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.15 }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-10 h-10 bg-turquesa/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-turquesa" />
                        </div>
                        <div className="flex-1 bg-white/5 rounded-lg p-3 border border-white/10">
                          <div className="flex items-center justify-between">
                            <span className="text-white/80 text-sm">{item.label}</span>
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.3 }}
                              className="w-2 h-2 bg-turquesa rounded-full"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Status indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-6 flex items-center justify-center gap-2 text-menta text-sm"
                  >
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 bg-menta rounded-full"
                    />
                    {isEs ? 'Procesando automáticamente...' : 'Processing automatically...'}
                  </motion.div>
                </div>
                
                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-turquesa rounded-2xl p-4 shadow-xl"
                >
                  <Bot className="w-6 h-6 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT IS AUTOMATION SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? '¿Qué es?' : 'What is it?'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
              {isEs 
                ? 'Automatización inteligente: liberar personas, no reemplazarlas'
                : 'Intelligent automation: free people, not replace them'}
            </h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <AnimatedSection>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs 
                    ? 'Automatización de procesos es usar tecnología para ejecutar tareas repetitivas sin intervención humana. No es reemplazar personas; es liberar tu equipo de trabajo tedioso para que se enfoquen en actividades de alto valor.'
                    : 'Process automation is using technology to execute repetitive tasks without human intervention. It\'s not replacing people; it\'s freeing your team from tedious work so they can focus on high-value activities.'}
                </p>
                <p className="text-lg font-medium text-azul-marino dark:text-white">
                  {isEs ? '4 tipos que implementamos:' : '4 types we implement:'}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-2">
                      {isEs ? '¿Cuándo automatizar?' : 'When to automate?'}
                    </h3>
                    <p className="text-foreground/70">
                      {isEs 
                        ? 'Después de optimizar. NO automatices proceso malo; tendrás proceso malo más rápido. Primero Lean, luego automatización.'
                        : 'After optimizing. DON\'T automate a bad process; you\'ll have a bad process faster. First Lean, then automation.'}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {automationTypes.map((type, idx) => {
              const colors = colorClasses[type.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-white dark:bg-card p-6 rounded-2xl shadow-brand 
                                hover:shadow-brand-lg transition-all duration-300 h-full
                                border-t-4 ${colors.border.replace('/20', '')}`}
                  >
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl 
                                    flex items-center justify-center mb-4`}>
                      <type.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <h3 className={`text-lg font-bold ${colors.text} mb-1`}>
                      {type.title}
                    </h3>
                    <p className="text-xs text-foreground/50 mb-3">{type.subtitle}</p>
                    <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                      {type.description}
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-foreground/50">{isEs ? 'Tiempo' : 'Time'}:</span>
                        <span className="font-medium text-azul-marino dark:text-white">{type.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/50">ROI:</span>
                        <span className={`font-bold ${colors.text}`}>{type.roi}</span>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          PROBLEM SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs 
                ? '6 señales de que necesitas automatizar'
                : '6 signs you need to automate'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, idx) => {
              const colors = colorClasses[problem.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-background p-6 rounded-2xl shadow-brand 
                               hover:shadow-brand-lg transition-all duration-300 h-full"
                  >
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl 
                                    flex items-center justify-center mb-4`}>
                      <problem.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {problem.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          GOLDEN RULE SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-azul-marino">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              {/* Quote */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-block"
                >
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 lg:p-12">
                    <Sparkles className="w-12 h-12 text-turquesa mx-auto mb-6" />
                    <blockquote className="text-2xl lg:text-3xl font-semibold text-white mb-4 italic">
                      {isEs 
                        ? '"Si automatizas un proceso malo, tienes un proceso malo automatizado más rápido."'
                        : '"If you automate a bad process, you have a bad process automated faster."'}
                    </blockquote>
                    <p className="text-turquesa font-medium">— {isEs ? 'Regla de Oro' : 'Golden Rule'}</p>
                  </div>
                </motion.div>
              </div>

              {/* Correct Order */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  { step: 1, title: isEs ? 'Primero' : 'First', desc: isEs ? 'Optimizar proceso' : 'Optimize process', sub: isEs ? '(eliminar pasos innecesarios)' : '(eliminate unnecessary steps)', icon: Check, color: 'turquesa' },
                  { step: 2, title: isEs ? 'Luego' : 'Then', desc: isEs ? 'Automatizar proceso optimizado' : 'Automate optimized process', sub: '', icon: Check, color: 'menta' },
                  { step: 3, title: isEs ? 'Resultado' : 'Result', desc: isEs ? 'ROI alto, proceso eficiente' : 'High ROI, efficient process', sub: '', icon: Zap, color: 'violeta' }
                ].map((item, idx) => {
                  const colors = colorClasses[item.color as keyof typeof colorClasses];
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
                    >
                      <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <item.icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <p className="text-white/60 text-sm mb-1">{item.title}</p>
                      <h3 className={`font-semibold ${colors.text} mb-1`}>{item.desc}</h3>
                      {item.sub && <p className="text-white/50 text-xs">{item.sub}</p>}
                    </motion.div>
                  );
                })}
              </div>

              {/* Comparison */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-white text-center mb-6">
                  {isEs ? 'Ejemplo comparativo' : 'Comparative example'}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-white/60 text-sm mb-2">{isEs ? 'Proceso original' : 'Original process'}</p>
                    <p className="text-3xl font-bold text-white mb-1">12 {isEs ? 'días' : 'days'}</p>
                    <p className="text-white/50 text-xs">8 {isEs ? 'pasos' : 'steps'}, 5 {isEs ? 'aprobaciones' : 'approvals'}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <X className="w-4 h-4 text-red-400" />
                      <p className="text-red-400 text-sm">{isEs ? 'Mal enfoque' : 'Bad approach'}</p>
                    </div>
                    <p className="text-3xl font-bold text-red-400 mb-1">3 {isEs ? 'días' : 'days'}</p>
                    <p className="text-white/50 text-xs">{isEs ? 'Automatizar tal cual' : 'Automate as-is'}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Check className="w-4 h-4 text-menta" />
                      <p className="text-menta text-sm">{isEs ? 'Enfoque correcto' : 'Correct approach'}</p>
                    </div>
                    <p className="text-3xl font-bold text-menta mb-1">8 {isEs ? 'horas' : 'hours'}</p>
                    <p className="text-white/50 text-xs">5 {isEs ? 'pasos' : 'steps'}, 2 {isEs ? 'aprobaciones' : 'approvals'}</p>
                  </div>
                </div>
                <p className="text-center text-turquesa font-medium mt-6">
                  ROI 5X {isEs ? 'mayor con optimización previa' : 'higher with prior optimization'}
                </p>
              </div>
            </div>
          </AnimatedSection>
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
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Beneficios de automatizar' : 'Benefits of automating'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white dark:bg-background p-8 rounded-2xl shadow-brand 
                             text-center hover:shadow-brand-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-turquesa/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-turquesa" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-turquesa mb-2">
                    {benefit.value}
                  </div>
                  <p className="text-foreground/70">{benefit.label}</p>
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
                        ? 'Banco automatiza procesamiento de créditos PYME'
                        : 'Bank automates SME credit processing'}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left - Description */}
                  <div>
                    <div className="mb-6">
                      <p className="text-sm text-foreground/60 mb-2">
                        {isEs ? 'Área créditos PYME • 25 analistas' : 'SME credit area • 25 analysts'}
                      </p>
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Desafío' : 'Challenge'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Procesamiento 100% manual. Analista procesa 8 solicitudes/día. Tiempo: 3-4 horas manual distribuido en 5-7 días calendario. Capacidad máxima: 200 solicitudes/mes.'
                          : '100% manual processing. Analyst processes 8 requests/day. Time: 3-4 manual hours spread over 5-7 calendar days. Maximum capacity: 200 requests/month.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución' : 'Solution'}
                      </h4>
                      <p className="text-foreground/70 mb-3">
                        {isEs 
                          ? 'Bot RPA + IA que ejecuta automáticamente:'
                          : 'RPA + AI bot that automatically executes:'}
                      </p>
                      <ul className="text-foreground/70 text-sm space-y-1">
                        {(isEs 
                          ? ['Validación de identidad en 3 sistemas', 'Consulta buró de crédito', 'Verificación listas restrictivas', 'Extracción de datos financieros con OCR', 'Cálculo de indicadores', 'Generación de informe preliminar']
                          : ['Identity validation in 3 systems', 'Credit bureau check', 'Restrictive lists verification', 'Financial data extraction with OCR', 'Indicator calculation', 'Preliminary report generation']
                        ).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                      {isEs 
                        ? '"Procesamos casi 3X más con mismo equipo. Analistas más motivados porque se enfocan en análisis real, no en trabajo tedioso."'
                        : '"We process almost 3X more with the same team. Analysts more motivated because they focus on real analysis, not tedious work."'}
                      <span className="block mt-2 text-sm text-turquesa not-italic font-medium">
                        — VP {isEs ? 'Créditos PYME' : 'SME Credit'}
                      </span>
                    </blockquote>
                  </div>

                  {/* Right - Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '3-4h → 45min', label: isEs ? 'Tiempo' : 'Time', sub: isEs ? '(solo revisa excepciones)' : '(only reviews exceptions)' },
                      { value: '+175%', label: isEs ? 'Capacidad' : 'Capacity', sub: '200 → 550/mes' },
                      { value: '7 → 2', label: isEs ? 'Días respuesta' : 'Response days', sub: '' },
                      { value: '8% → 0.5%', label: isEs ? 'Errores' : 'Errors', sub: '' },
                      { value: '-65%', label: isEs ? 'Costo por solicitud' : 'Cost per request', sub: '' },
                      { value: '340%', label: 'ROI', sub: isEs ? 'Payback: 8 meses' : 'Payback: 8 months' }
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white dark:bg-background p-4 rounded-2xl shadow-brand text-center"
                      >
                        <div className="text-xl lg:text-2xl font-bold text-turquesa mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm font-medium text-azul-marino dark:text-white">
                          {stat.label}
                        </div>
                        {stat.sub && <div className="text-xs text-foreground/50">{stat.sub}</div>}
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
          WHO IS IT FOR SECTION (CHECKLIST)
          ===================================================== */}
      <section id="roi-calculator" className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Necesitas automatizar? Test rápido' : 'Do you need to automate? Quick test'}
            </h2>
            <p className="text-foreground/70">
              {isEs ? 'Marca las que apliquen a tu situación:' : 'Check those that apply to your situation:'}
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-background rounded-2xl p-8 shadow-brand">
                <div className="space-y-4 mb-8">
                  {checklistItems.map((item, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => toggleCheck(idx)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300
                                  ${checkedItems[idx] 
                                    ? 'border-turquesa bg-turquesa/5' 
                                    : 'border-gris-arena/20 hover:border-turquesa/50'}`}
                    >
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all
                                      ${checkedItems[idx] 
                                        ? 'border-turquesa bg-turquesa' 
                                        : 'border-gris-arena/40'}`}>
                        {checkedItems[idx] && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <span className={`text-left ${checkedItems[idx] ? 'text-azul-marino dark:text-white' : 'text-foreground/70'}`}>
                        {item}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Result */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-6 rounded-xl text-center ${
                    checkCount >= 7 ? 'bg-red-500/10 border border-red-500/20' :
                    checkCount >= 5 ? 'bg-orange-500/10 border border-orange-500/20' :
                    checkCount >= 3 ? 'bg-turquesa/10 border border-turquesa/20' :
                    'bg-gris-arena/10 border border-gris-arena/20'
                  }`}
                >
                  <p className="text-2xl font-bold text-azul-marino dark:text-white mb-2">
                    {checkCount} / 8 {isEs ? 'marcados' : 'checked'}
                  </p>
                  <p className={`font-medium ${
                    checkCount >= 7 ? 'text-red-500' :
                    checkCount >= 5 ? 'text-orange-500' :
                    checkCount >= 3 ? 'text-turquesa' :
                    'text-foreground/70'
                  }`}>
                    {checkCount >= 7 
                      ? (isEs ? '¡Estás perdiendo mucho dinero!' : 'You\'re losing a lot of money!')
                      : checkCount >= 5 
                        ? (isEs ? 'Automatización debe ser prioridad' : 'Automation should be priority')
                        : checkCount >= 3 
                          ? (isEs ? 'Oportunidad significativa' : 'Significant opportunity')
                          : (isEs ? 'Evalúa casos específicos' : 'Evaluate specific cases')}
                  </p>
                </motion.div>

                {checkCount >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-center"
                  >
                    <Link
                      href={`/${locale}/contacto`}
                      className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                                 font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                                 transition-all duration-300 shadow-lg group"
                    >
                      {isEs ? 'Solicitar Evaluación Gratuita' : 'Request Free Evaluation'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                )}
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
              {isEs ? 'Preguntas frecuentes sobre automatización' : 'Frequently Asked Questions about automation'}
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
                {isEs ? '¿Listo para automatizar y liberar capacidad?' : 'Ready to automate and free capacity?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Evaluación de 30 minutos. Identificamos los 3 procesos con mayor potencial y calculamos ROI estimado.'
                  : '30-minute evaluation. We identify the 3 processes with greatest potential and calculate estimated ROI.'}
              </p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Identificación de procesos automatizables' : 'Identification of automatable processes',
                  isEs ? 'Estimación de horas/año liberables' : 'Estimation of hours/year that can be freed',
                  isEs ? 'Cálculo de ROI preliminar' : 'Preliminary ROI calculation',
                  isEs ? 'Recomendación de tecnología' : 'Technology recommendation'
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
                    className="inline-flex items-center gap-3 bg-white text-violeta 
                               font-semibold px-8 py-4 rounded-lg hover:bg-menta hover:text-azul-marino
                               transition-all duration-300 shadow-lg group"
                  >
                    {isEs ? 'Evaluar Potencial de Automatización' : 'Evaluate Automation Potential'}
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

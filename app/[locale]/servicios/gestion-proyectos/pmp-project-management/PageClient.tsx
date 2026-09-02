'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import { faqs as faqData } from '@/lib/content/faqs/servicios--gestion-proyectos--pmp-project-management';
import { localizeFaqs } from '@/lib/content/faqs';
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
  Calendar,
  ClipboardCheck,
  Layers,
  Cpu,
  Building,
  RefreshCw,
  Scale,
  Globe,
  Lightbulb,
  Headphones,
  Zap,
  UserCheck,
  AlertTriangle
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

export default function PMPProjectManagementPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Gestión de Proyectos' : 'Project Management', href: `/${locale}/servicios/gestion-proyectos` },
    { label: 'Project Managers PMP', href: null }
  ];

  // =====================================================
  // CONTENT DATA
  // =====================================================

  // What is PMP - PMBOK Process Groups
  const processGroups = [
    {
      name: isEs ? 'Inicio' : 'Initiating',
      description: isEs 
        ? 'Definir nuevo proyecto o fase, obtener autorización' 
        : 'Define new project or phase, obtain authorization',
      icon: Lightbulb
    },
    {
      name: isEs ? 'Planificación' : 'Planning',
      description: isEs 
        ? 'Establecer alcance, objetivos, plan de acción' 
        : 'Establish scope, objectives, action plan',
      icon: FileText
    },
    {
      name: isEs ? 'Ejecución' : 'Executing',
      description: isEs 
        ? 'Completar trabajo definido en el plan' 
        : 'Complete work defined in the plan',
      icon: Settings
    },
    {
      name: isEs ? 'Monitoreo y Control' : 'Monitoring & Control',
      description: isEs 
        ? 'Seguir, revisar y regular progreso' 
        : 'Track, review and regulate progress',
      icon: BarChart3
    },
    {
      name: isEs ? 'Cierre' : 'Closing',
      description: isEs 
        ? 'Finalizar todas las actividades formalmente' 
        : 'Formally finalize all activities',
      icon: CheckCircle2
    }
  ];

  // PMBOK Knowledge Areas
  const knowledgeAreas = [
    { name: isEs ? 'Integración' : 'Integration', icon: Layers },
    { name: isEs ? 'Alcance' : 'Scope', icon: Target },
    { name: isEs ? 'Cronograma' : 'Schedule', icon: Calendar },
    { name: isEs ? 'Costos' : 'Cost', icon: DollarSign },
    { name: isEs ? 'Calidad' : 'Quality', icon: Award },
    { name: isEs ? 'Recursos' : 'Resources', icon: Users },
    { name: isEs ? 'Comunicaciones' : 'Communications', icon: Headphones },
    { name: isEs ? 'Riesgos' : 'Risk', icon: AlertTriangle },
    { name: isEs ? 'Adquisiciones' : 'Procurement', icon: Briefcase },
    { name: isEs ? 'Interesados' : 'Stakeholders', icon: UserCheck }
  ];

  // Project types for PMP
  const projectTypes = [
    {
      icon: Cpu,
      title: isEs ? 'Proyectos de Tecnología' : 'Technology Projects',
      description: isEs
        ? 'Implementación ERP, CRM, infraestructura cloud, desarrollo de software a gran escala.'
        : 'ERP, CRM implementation, cloud infrastructure, large-scale software development.',
      color: 'turquesa'
    },
    {
      icon: Building,
      title: isEs ? 'Infraestructura y Construcción' : 'Infrastructure & Construction',
      description: isEs
        ? 'Nuevas instalaciones, expansiones, modernización de plantas, centros de datos.'
        : 'New facilities, expansions, plant modernization, data centers.',
      color: 'menta'
    },
    {
      icon: RefreshCw,
      title: isEs ? 'Transformación Organizacional' : 'Organizational Transformation',
      description: isEs
        ? 'Fusiones, reestructuraciones, cambios de cultura, nuevos modelos de negocio.'
        : 'Mergers, restructuring, culture changes, new business models.',
      color: 'violeta'
    },
    {
      icon: Scale,
      title: isEs ? 'Proyectos Regulados' : 'Regulated Projects',
      description: isEs
        ? 'Cumplimiento normativo, auditorías, certificaciones ISO, SOX, GDPR.'
        : 'Regulatory compliance, audits, ISO, SOX, GDPR certifications.',
      color: 'turquesa'
    },
    {
      icon: DollarSign,
      title: isEs ? 'Alto Presupuesto' : 'High Budget',
      description: isEs
        ? 'Inversiones críticas donde el costo del fracaso es alto. Proyectos de $500K+.'
        : 'Critical investments where the cost of failure is high. $500K+ projects.',
      color: 'menta'
    },
    {
      icon: Globe,
      title: isEs ? 'Multi-Stakeholder' : 'Multi-Stakeholder',
      description: isEs
        ? 'Múltiples departamentos, proveedores, clientes, socios. Gestión política compleja.'
        : 'Multiple departments, vendors, customers, partners. Complex political management.',
      color: 'violeta'
    }
  ];

  // PM Profile checklist
  const pmProfile = [
    {
      category: isEs ? 'Certificación' : 'Certification',
      items: isEs
        ? ['PMP® (Project Management Professional) activo', 'Créditos PDU al día', 'Adherencia al código de ética PMI']
        : ['Active PMP® (Project Management Professional)', 'PDU credits up to date', 'Adherence to PMI code of ethics'],
      icon: Award,
      color: 'turquesa'
    },
    {
      category: isEs ? 'Experiencia' : 'Experience',
      items: isEs
        ? ['5-15 años liderando proyectos', 'Mínimo 4,500 horas dirigiendo proyectos', 'Experiencia en tu industria o similar']
        : ['5-15 years leading projects', 'Minimum 4,500 hours directing projects', 'Experience in your industry or similar'],
      icon: Briefcase,
      color: 'menta'
    },
    {
      category: isEs ? 'Metodología' : 'Methodology',
      items: isEs
        ? ['Dominio de PMBOK® Guide', 'Experiencia con metodologías predictivas y adaptativas', 'Gestión de valor ganado (EVM)']
        : ['Mastery of PMBOK® Guide', 'Experience with predictive and adaptive methodologies', 'Earned Value Management (EVM)'],
      icon: FileText,
      color: 'violeta'
    },
    {
      category: isEs ? 'Herramientas' : 'Tools',
      items: isEs
        ? ['MS Project, Primavera P6, o similar', 'Jira, Azure DevOps para seguimiento', 'Power BI para reportería ejecutiva']
        : ['MS Project, Primavera P6, or similar', 'Jira, Azure DevOps for tracking', 'Power BI for executive reporting'],
      icon: Settings,
      color: 'turquesa'
    },
    {
      category: isEs ? 'Industrias' : 'Industries',
      items: isEs
        ? ['Banca, seguros, retail, manufactura', 'Tecnología, telecomunicaciones', 'Gobierno, construcción, salud']
        : ['Banking, insurance, retail, manufacturing', 'Technology, telecommunications', 'Government, construction, healthcare'],
      icon: Building2,
      color: 'menta'
    }
  ];

  // How PM works - Timeline
  const pmTimeline = [
    {
      phase: isEs ? 'Semana 1' : 'Week 1',
      title: isEs ? 'Integración' : 'Integration',
      description: isEs
        ? 'Onboarding al proyecto y empresa. Revisión de documentación existente. Reuniones con stakeholders clave. Diagnóstico inicial del estado del proyecto.'
        : 'Project and company onboarding. Review of existing documentation. Meetings with key stakeholders. Initial diagnosis of project status.',
      icon: Users,
      color: 'turquesa'
    },
    {
      phase: isEs ? 'Semanas 2-3' : 'Weeks 2-3',
      title: isEs ? 'Planificación' : 'Planning',
      description: isEs
        ? 'Desarrollo o actualización del plan de proyecto. Definición de WBS, cronograma, presupuesto. Plan de riesgos y comunicaciones. Establecimiento de governance.'
        : 'Development or update of project plan. WBS, schedule, budget definition. Risk and communications plan. Governance establishment.',
      icon: FileText,
      color: 'menta'
    },
    {
      phase: isEs ? 'Semana 4+' : 'Week 4+',
      title: isEs ? 'Ejecución y Control' : 'Execution & Control',
      description: isEs
        ? 'Dirección diaria del equipo. Reportes semanales ejecutivos. Gestión de cambios, riesgos, issues. Reuniones de steering committee mensuales.'
        : 'Daily team direction. Weekly executive reports. Change, risk, issue management. Monthly steering committee meetings.',
      icon: Target,
      color: 'violeta'
    }
  ];

  // Benefits stats
  const benefits = [
    {
      stat: '90%+',
      label: isEs ? 'tasa de éxito' : 'success rate',
      description: isEs ? 'Proyectos entregados según objetivos' : 'Projects delivered according to objectives',
      icon: Target
    },
    {
      stat: '85%',
      label: isEs ? 'a tiempo' : 'on time',
      description: isEs ? 'Proyectos completados en fecha' : 'Projects completed on schedule',
      icon: Clock
    },
    {
      stat: '90%',
      label: isEs ? 'en presupuesto' : 'on budget',
      description: isEs ? 'Control riguroso de costos' : 'Rigorous cost control',
      icon: DollarSign
    },
    {
      stat: '3-5',
      label: isEs ? 'días de integración' : 'days integration',
      description: isEs ? 'PM productivo rápidamente' : 'PM productive quickly',
      icon: Zap
    },
    {
      stat: '0%',
      label: isEs ? 'riesgo laboral' : 'labor risk',
      description: isEs ? 'Sin contratación permanente' : 'No permanent hiring',
      icon: Shield
    },
    {
      stat: '15+',
      label: isEs ? 'años de experiencia' : 'years experience',
      description: isEs ? 'Promedio de nuestros PMs' : 'Average of our PMs',
      icon: Award
    }
  ];

  // Alternative vs Others comparison
  const comparison = [
    {
      title: isEs ? 'Alternative PM' : 'Alternative PM',
      items: [
        { text: isEs ? 'Certificación PMP garantizada' : 'Guaranteed PMP certification', positive: true },
        { text: isEs ? 'Respaldo empresarial completo' : 'Full corporate backing', positive: true },
        { text: isEs ? 'Metodología estandarizada' : 'Standardized methodology', positive: true },
        { text: isEs ? 'QA y supervisión incluidos' : 'QA and supervision included', positive: true },
        { text: isEs ? 'Reemplazo sin costo si no funciona' : 'Free replacement if not working', positive: true },
        { text: isEs ? 'Experiencia multi-industria' : 'Multi-industry experience', positive: true }
      ],
      highlighted: true
    },
    {
      title: isEs ? 'Freelancer' : 'Freelancer',
      items: [
        { text: isEs ? 'Certificación variable' : 'Variable certification', positive: false },
        { text: isEs ? 'Sin respaldo institucional' : 'No institutional backing', positive: false },
        { text: isEs ? 'Metodología propia' : 'Own methodology', positive: false },
        { text: isEs ? 'Sin supervisión externa' : 'No external supervision', positive: false },
        { text: isEs ? 'Riesgo de abandono' : 'Risk of abandonment', positive: false },
        { text: isEs ? 'Experiencia limitada' : 'Limited experience', positive: false }
      ],
      highlighted: false
    },
    {
      title: isEs ? 'Contratación Directa' : 'Direct Hire',
      items: [
        { text: isEs ? 'Proceso largo (2-3 meses)' : 'Long process (2-3 months)', positive: false },
        { text: isEs ? 'Costo permanente (salario + beneficios)' : 'Permanent cost (salary + benefits)', positive: false },
        { text: isEs ? 'Riesgo si no es el perfil correcto' : 'Risk if not the right profile', positive: false },
        { text: isEs ? 'Sin flexibilidad post-proyecto' : 'No post-project flexibility', positive: false },
        { text: isEs ? 'Onboarding extenso' : 'Extended onboarding', positive: false },
        { text: isEs ? 'Capacitación por tu cuenta' : 'Training on your own', positive: false }
      ],
      highlighted: false
    },
    {
      title: isEs ? 'Consultoría Grande' : 'Big Consulting',
      items: [
        { text: isEs ? 'Certificación garantizada' : 'Guaranteed certification', positive: true },
        { text: isEs ? 'Metodología robusta' : 'Robust methodology', positive: true },
        { text: isEs ? 'Costos 2-3x más altos' : '2-3x higher costs', positive: false },
        { text: isEs ? 'Rotación de personal' : 'Personnel rotation', positive: false },
        { text: isEs ? 'Menor dedicación individual' : 'Less individual dedication', positive: false },
        { text: isEs ? 'Burocracia contractual' : 'Contractual bureaucracy', positive: false }
      ],
      highlighted: false
    }
  ];

  // FAQs
  const faqs = localizeFaqs(faqData, isEs ? 'es' : 'en');

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
                  <Award className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    Project Managers PMP®
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Gestión de Proyectos' : 'Project Management'}
                  </p>
                </div>
              </div>

              {/* PMP Badge */}
              <div className="inline-flex items-center gap-2 bg-turquesa/10 border border-turquesa/30 
                              rounded-full px-4 py-2 mb-4">
                <Award className="w-4 h-4 text-turquesa" />
                <span className="text-turquesa text-sm font-medium">
                  {isEs ? 'Certificados PMI' : 'PMI Certified'}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Project Managers certificados PMP para tus proyectos críticos'
                  : 'PMP certified Project Managers for your critical projects'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Profesionales con certificación PMP activa, 5-15 años de experiencia, listos para integrarse a tu proyecto en días, no meses. Sin el riesgo de contratación permanente.'
                  : 'Professionals with active PMP certification, 5-15 years of experience, ready to integrate into your project in days, not months. Without the risk of permanent hiring.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Solicitar PM para mi Proyecto' : 'Request PM for my Project'}
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
                  { value: '5-15', label: isEs ? 'años experiencia' : 'years experience' },
                  { value: '90%+', label: isEs ? 'tasa de éxito' : 'success rate' },
                  { icon: true, label: isEs ? 'Certificación PMP activa' : 'Active PMP certification' }
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

            {/* Right Visual - PMBOK Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-turquesa/20 rounded-full px-4 py-2 mb-3">
                      <Award className="w-5 h-5 text-turquesa" />
                      <span className="text-turquesa font-semibold">PMP®</span>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      PMBOK® Guide
                    </h3>
                    <p className="text-white/60 text-sm">
                      {isEs ? '5 Grupos de Procesos' : '5 Process Groups'}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {processGroups.map((group, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10"
                      >
                        <div className="w-10 h-10 bg-turquesa/20 rounded-lg flex items-center justify-center">
                          <group.icon className="w-5 h-5 text-turquesa" />
                        </div>
                        <div>
                          <span className="text-white font-medium text-sm">
                            {group.name}
                          </span>
                          <p className="text-white/50 text-xs">{group.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT IS PMP SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                               rounded-full text-sm font-medium mb-4">
                {isEs ? '¿Qué es PMP?' : 'What is PMP?'}
              </span>
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs 
                  ? 'PMP®: El estándar global de Project Management'
                  : 'PMP®: The global Project Management standard'}
              </h2>
              
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs 
                    ? 'PMP (Project Management Professional) es la certificación más reconocida a nivel mundial para gerentes de proyecto, otorgada por el Project Management Institute (PMI). Valida conocimiento, experiencia y habilidades para liderar proyectos de cualquier industria.'
                    : 'PMP (Project Management Professional) is the most recognized certification worldwide for project managers, granted by the Project Management Institute (PMI). It validates knowledge, experience, and skills to lead projects in any industry.'}
                </p>
                <p>
                  <strong className="text-azul-marino dark:text-white">
                    {isEs ? 'Requisitos para obtenerla:' : 'Requirements to obtain it:'}
                  </strong>{' '}
                  {isEs 
                    ? 'Mínimo 4,500 horas liderando proyectos, 35 horas de educación en project management, y aprobar examen riguroso de 180 preguntas.'
                    : 'Minimum 4,500 hours leading projects, 35 hours of project management education, and passing a rigorous 180-question exam.'}
                </p>
                <p>
                  <strong className="text-azul-marino dark:text-white">
                    {isEs ? 'Basado en PMBOK® Guide:' : 'Based on PMBOK® Guide:'}
                  </strong>{' '}
                  {isEs 
                    ? 'El estándar de PMI que define 5 grupos de procesos y 10 áreas de conocimiento para gestionar proyectos de forma estructurada y repetible.'
                    : 'The PMI standard that defines 5 process groups and 10 knowledge areas to manage projects in a structured and repeatable way.'}
                </p>
              </div>
            </AnimatedSection>

            {/* Knowledge Areas Grid */}
            <AnimatedSection delay={0.2}>
              <div className="bg-blanco-hueso dark:bg-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-4 text-center">
                  {isEs ? '10 Áreas de Conocimiento PMBOK®' : '10 PMBOK® Knowledge Areas'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {knowledgeAreas.map((area, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 bg-white dark:bg-background p-3 rounded-xl 
                                 border border-gris-arena/20 hover:shadow-brand transition-all duration-300"
                    >
                      <div className="w-8 h-8 bg-turquesa/10 rounded-lg flex items-center justify-center">
                        <area.icon className="w-4 h-4 text-turquesa" />
                      </div>
                      <span className="text-sm font-medium text-azul-marino dark:text-white">
                        {area.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
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
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Proyectos Ideales' : 'Ideal Projects'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Para qué proyectos necesitas un PM PMP?' : 'What projects do you need a PMP PM for?'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectTypes.map((type, idx) => {
              const colors = colorClasses[type.color as keyof typeof colorClasses];
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
                      <type.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                      {type.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {type.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          PM PROFILE SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Perfil de Nuestros PMs' : 'Our PMs Profile'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Qué garantizamos en cada PM' : 'What we guarantee in every PM'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pmProfile.map((profile, idx) => {
              const colors = colorClasses[profile.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-white dark:bg-card p-6 rounded-2xl shadow-brand 
                                hover:shadow-brand-lg transition-all duration-300 h-full
                                border-t-4 ${colors.border.replace('/20', '')}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 ${colors.bg} rounded-xl 
                                      flex items-center justify-center`}>
                        <profile.icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-azul-marino dark:text-white">
                        {profile.category}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {profile.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                          <span className="text-foreground/70 text-sm">{item}</span>
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
          HOW PM WORKS - TIMELINE SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Proceso de Trabajo' : 'Work Process'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Cómo trabaja tu PM desde el día 1' : 'How your PM works from day 1'}
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-turquesa/20 hidden md:block" />
              
              <div className="space-y-8">
                {pmTimeline.map((phase, idx) => {
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
              {isEs 
                ? 'Resultados medibles con nuestros PMs'
                : 'Measurable results with our PMs'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 
                             hover:bg-white/10 transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-turquesa" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-turquesa mb-1">{benefit.stat}</div>
                  <div className="text-sm text-white/80 font-medium mb-2">{benefit.label}</div>
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
                        ? 'Implementación ERP en empresa manufacturera'
                        : 'ERP Implementation in manufacturing company'}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left - Description */}
                  <div>
                    <div className="mb-6">
                      <p className="text-sm text-foreground/60 mb-2">
                        {isEs ? 'Industria Manufacturera • 800 empleados' : 'Manufacturing Industry • 800 employees'}
                      </p>
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Desafío' : 'Challenge'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Proyecto de implementación SAP detenido 6 meses. Proveedor y cliente en conflicto. Budget consumido al 70% con solo 30% de avance. Junta directiva considerando cancelar.'
                          : 'SAP implementation project stalled for 6 months. Vendor and client in conflict. 70% budget consumed with only 30% progress. Board considering cancellation.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución' : 'Solution'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'PM PMP senior asignado como recovery manager. Diagnóstico en 5 días, replanificación en 2 semanas. Renegociación de alcance con proveedor. Nueva governance con steering committee semanal.'
                          : 'Senior PMP PM assigned as recovery manager. Diagnosis in 5 days, replanning in 2 weeks. Scope renegotiation with vendor. New governance with weekly steering committee.'}
                      </p>
                    </div>

                    <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                      {isEs 
                        ? '"El PM de Alternative salvó un proyecto que dábamos por perdido. Su metodología y experiencia en recovery fueron clave."'
                        : '"The Alternative PM saved a project we thought was lost. Their methodology and recovery experience were key."'}
                      <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— CIO, Empresa Manufacturera</span>
                    </blockquote>
                  </div>

                  {/* Right - Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '9', label: isEs ? 'meses' : 'months', sub: isEs ? 'hasta go-live' : 'to go-live' },
                      { value: '15%', label: isEs ? 'bajo presupuesto' : 'under budget', sub: isEs ? 'ajustado' : 'adjusted' },
                      { value: '100%', label: isEs ? 'funcionalidad' : 'functionality', sub: isEs ? 'core entregada' : 'core delivered' },
                      { value: '0', label: isEs ? 'incidentes' : 'incidents', sub: isEs ? 'críticos en go-live' : 'critical at go-live' },
                      { value: '95%', label: isEs ? 'adopción' : 'adoption', sub: isEs ? 'usuarios mes 1' : 'users month 1' },
                      { value: '$2M', label: isEs ? 'evitados' : 'avoided', sub: isEs ? 'en pérdidas' : 'in losses' }
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
          ALTERNATIVE VS OTHERS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Comparativa' : 'Comparison'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Alternative vs otras opciones' : 'Alternative vs other options'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {comparison.map((option, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-2xl h-full transition-all duration-300
                              ${option.highlighted 
                                ? 'bg-turquesa/10 border-2 border-turquesa shadow-brand-lg' 
                                : 'bg-white dark:bg-background border border-gris-arena/20 shadow-brand'}`}
                >
                  {option.highlighted && (
                    <div className="inline-block px-3 py-1 bg-turquesa text-azul-marino 
                                    text-xs font-bold rounded-full mb-3">
                      {isEs ? 'RECOMENDADO' : 'RECOMMENDED'}
                    </div>
                  )}
                  <h3 className={`text-lg font-semibold mb-4 
                                  ${option.highlighted ? 'text-turquesa' : 'text-azul-marino dark:text-white'}`}>
                    {option.title}
                  </h3>
                  <ul className="space-y-2">
                    {option.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        {item.positive ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        )}
                        <span className="text-foreground/70 text-sm">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerItem>
            ))}
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
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                <Award className="w-5 h-5 text-white" />
                <span className="text-white/90 text-sm font-medium">
                  {isEs ? 'PMs certificados disponibles' : 'Certified PMs available'}
                </span>
              </div>
              
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs ? '¿Tienes un proyecto crítico?' : 'Do you have a critical project?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Cuéntanos sobre tu proyecto. Te asignamos el PM PMP ideal en 48-72 horas con propuesta de trabajo.'
                  : 'Tell us about your project. We assign the ideal PMP PM in 48-72 hours with a work proposal.'}
              </p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'PM PMP certificado y activo' : 'Certified and active PMP PM',
                  isEs ? 'Integración en 3-5 días' : 'Integration in 3-5 days',
                  isEs ? 'Sin compromiso de largo plazo' : 'No long-term commitment',
                  isEs ? 'Garantía de reemplazo incluida' : 'Replacement guarantee included'
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
                    {isEs ? 'Solicitar PM para mi Proyecto' : 'Request PM for my Project'}
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

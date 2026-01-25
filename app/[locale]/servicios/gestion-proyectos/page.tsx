'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import {
  FolderKanban,
  ArrowRight,
  ChevronDown,
  Briefcase,
  Clock,
  DollarSign,
  AlertTriangle,
  Award,
  Building2,
  Shield,
  BarChart3,
  Users,
  Target,
  RefreshCw,
  CheckCircle2,
  Phone,
  ClipboardList,
  Zap,
  Landmark,
  Lightbulb,
  GraduationCap,
  Handshake,
  TrendingUp,
  Calendar,
  Play,
  FileCheck
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

export default function GestionProyectosPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Gestión de Proyectos' : 'Project Management', href: null }
  ];

  // =====================================================
  // CONTENT DATA
  // =====================================================

  const problems = [
    {
      icon: Briefcase,
      title: isEs ? 'No tienes PM interno con experiencia suficiente' : 'You don\'t have an internal PM with enough experience',
      description: isEs
        ? 'Tu equipo técnico es excelente, pero gestionar proyecto complejo requiere PM certificado con experiencia en múltiples proyectos similares. Entrenar alguien interno tomaría años.'
        : 'Your technical team is excellent, but managing a complex project requires a certified PM with experience in multiple similar projects. Training someone internal would take years.',
      color: 'turquesa'
    },
    {
      icon: Clock,
      title: isEs ? 'Proyecto crítico no puede esperar 6 meses de reclutamiento' : 'Critical project can\'t wait 6 months of recruitment',
      description: isEs
        ? 'Reclutamiento de PM senior toma 3-4 meses. Onboarding otros 2-3 meses. Tu proyecto debe iniciar YA. Necesitas PM listo que se integre en días.'
        : 'Senior PM recruitment takes 3-4 months. Onboarding another 2-3 months. Your project must start NOW. You need a ready PM that integrates in days.',
      color: 'menta'
    },
    {
      icon: DollarSign,
      title: isEs ? 'Contratar PM permanente no se justifica' : 'Hiring permanent PM is not justified',
      description: isEs
        ? 'Proyecto dura 6-12 meses. Contratar PM a planilla permanente con salario $80K-120K/año más beneficios no tiene sentido. Necesitas expertise temporal.'
        : 'Project lasts 6-12 months. Hiring a permanent PM with $80K-120K/year salary plus benefits doesn\'t make sense. You need temporary expertise.',
      color: 'violeta'
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'Proyecto anterior fracasó por PM inexperto' : 'Previous project failed due to inexperienced PM',
      description: isEs
        ? 'Ya tuviste proyecto que falló por PM sin metodología, sin control de alcance, sin gestión de riesgos. No puedes darte el lujo de otro fracaso. Necesitas garantía de expertise.'
        : 'You already had a project that failed due to PM without methodology, no scope control, no risk management. You can\'t afford another failure. You need guaranteed expertise.',
      color: 'turquesa'
    }
  ];

  const services = [
    {
      icon: ClipboardList,
      title: isEs ? 'Project Managers PMP®' : 'PMP® Project Managers',
      description: isEs
        ? 'PMs certificados PMP® (Project Management Institute) para proyectos complejos con alcance definido, metodología tradicional, entornos regulados.'
        : 'PMP® certified PMs (Project Management Institute) for complex projects with defined scope, traditional methodology, regulated environments.',
      expertise: isEs
        ? 'Proyectos de tecnología, infraestructura, transformación, regulados'
        : 'Technology, infrastructure, transformation, regulated projects',
      href: `/${locale}/servicios/gestion-proyectos/pmp-project-management`,
      color: 'turquesa'
    },
    {
      icon: Zap,
      title: isEs ? 'Scrum Masters / PMs Ágiles' : 'Scrum Masters / Agile PMs',
      description: isEs
        ? 'Scrum Masters certificados y PMs con expertise Agile para desarrollo de software, productos digitales, proyectos de innovación.'
        : 'Certified Scrum Masters and PMs with Agile expertise for software development, digital products, innovation projects.',
      expertise: isEs
        ? 'Desarrollo ágil, productos digitales, startups, transformación digital'
        : 'Agile development, digital products, startups, digital transformation',
      href: `/${locale}/servicios/gestion-proyectos/metodologias-agiles`,
      color: 'menta'
    },
    {
      icon: Landmark,
      title: 'PMO Office',
      description: isEs
        ? 'Dos modalidades: (A) Consultoría para crear PMO en tu empresa, o (B) Outsourcing de Director de PMO que asume operación de tu oficina de proyectos.'
        : 'Two modalities: (A) Consulting to create PMO in your company, or (B) PMO Director outsourcing who takes over your project office operations.',
      expertise: isEs
        ? 'Governance, metodología, visibilidad ejecutiva de portafolio'
        : 'Governance, methodology, executive portfolio visibility',
      href: `/${locale}/servicios/gestion-proyectos/pmo-office`,
      color: 'violeta'
    },
    {
      icon: Lightbulb,
      title: isEs ? 'Casos de Negocio' : 'Business Cases',
      description: isEs
        ? 'Consultoría para desarrollar business cases robustos que justifiquen inversión en proyectos ante junta directiva o gerencia.'
        : 'Consulting to develop robust business cases that justify project investment to board of directors or management.',
      expertise: isEs
        ? 'Análisis financiero (ROI, VPN, TIR), evaluación de riesgos, alineación estratégica'
        : 'Financial analysis (ROI, NPV, IRR), risk assessment, strategic alignment',
      href: `/${locale}/servicios/gestion-proyectos/casos-negocio`,
      color: 'turquesa'
    }
  ];

  const guarantees = [
    {
      icon: GraduationCap,
      title: isEs ? 'Certificación Garantizada' : 'Guaranteed Certification',
      description: isEs
        ? 'Todos nuestros PMs: certificados PMP® o Scrum Master vigentes, experiencia mínima 5 años, evaluados técnicamente por Alternative.'
        : 'All our PMs: current PMP® or Scrum Master certified, minimum 5 years experience, technically evaluated by Alternative.'
    },
    {
      icon: Building2,
      title: isEs ? 'Respaldo Empresarial' : 'Corporate Backing',
      description: isEs
        ? 'Si PM se enferma o no puede continuar, Alternative asigna reemplazo inmediato. No quedas desprotegido a mitad de proyecto crítico.'
        : 'If PM gets sick or can\'t continue, Alternative assigns immediate replacement. You\'re not left unprotected mid-critical project.'
    },
    {
      icon: BarChart3,
      title: isEs ? 'Metodología Estandarizada' : 'Standardized Methodology',
      description: isEs
        ? 'PMs trabajan bajo políticas y frameworks de Alternative. Templates, herramientas y mejores prácticas probadas en 50+ proyectos.'
        : 'PMs work under Alternative policies and frameworks. Templates, tools, and best practices proven in 50+ projects.'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: isEs
        ? 'Alternative hace QA del trabajo del PM. Revisión de entregables, métricas de desempeño, aseguramiento de calidad.'
        : 'Alternative does QA of PM work. Deliverable review, performance metrics, quality assurance.'
    },
    {
      icon: RefreshCw,
      title: isEs ? 'Flexibilidad sin Compromiso' : 'Flexibility without Commitment',
      description: isEs
        ? 'Contratas expertise cuando la necesitas. Sin costos de beneficios, vacaciones, liquidación. Escalas o reduces según necesidad.'
        : 'You hire expertise when you need it. No benefits, vacation, or severance costs. Scale up or down as needed.'
    },
    {
      icon: Target,
      title: isEs ? 'Experiencia Multi-Industria' : 'Multi-Industry Experience',
      description: isEs
        ? 'Nuestros PMs han gestionado proyectos en: banca, tecnología, manufactura, retail, salud. Experiencia cross-industry que freelancer no tiene.'
        : 'Our PMs have managed projects in: banking, technology, manufacturing, retail, health. Cross-industry experience a freelancer doesn\'t have.'
    }
  ];

  const benefits = [
    { value: '80-90%', label: isEs ? 'Proyectos completados a tiempo' : 'Projects completed on time', icon: Clock },
    { value: '90%+', label: isEs ? 'Proyectos dentro de presupuesto' : 'Projects within budget', icon: DollarSign },
    { value: isEs ? 'Días' : 'Days', label: isEs ? 'No meses para integrar PM' : 'Not months to integrate PM', icon: Calendar },
    { value: isEs ? 'Cero' : 'Zero', label: isEs ? 'Riesgo de contratación permanente' : 'Permanent hiring risk', icon: Shield },
    { value: '100%', label: isEs ? 'Cobertura garantizada' : 'Guaranteed coverage', icon: CheckCircle2 },
    { value: '15+', label: isEs ? 'Años experiencia promedio' : 'Years average experience', icon: Award }
  ];

  const pmProfile = {
    certifications: isEs
      ? ['PMP® (Project Management Professional) vigente', 'Scrum Master (CSM/PSM) certificado', 'Agile Certified Practitioner (PMI-ACP)', 'PRINCE2 Practitioner']
      : ['Current PMP® (Project Management Professional)', 'Certified Scrum Master (CSM/PSM)', 'Agile Certified Practitioner (PMI-ACP)', 'PRINCE2 Practitioner'],
    experience: isEs
      ? ['Mínimo 5 años gestionando proyectos', 'Portfolio comprobado de proyectos exitosos', 'Experiencia en industria del cliente (deseable)', 'Referencias verificables']
      : ['Minimum 5 years managing projects', 'Proven portfolio of successful projects', 'Experience in client industry (desirable)', 'Verifiable references'],
    skills: isEs
      ? ['Dominio de herramientas (MS Project, Jira, Smartsheet)', 'Comunicación ejecutiva efectiva', 'Gestión de stakeholders complejos', 'Resolución de conflictos']
      : ['Tool mastery (MS Project, Jira, Smartsheet)', 'Effective executive communication', 'Complex stakeholder management', 'Conflict resolution'],
    backing: isEs
      ? ['Evaluación técnica aprobada', 'Adherencia a metodología Alternative', 'QA de entregables', 'Reporte a Gerencia General Alternative']
      : ['Approved technical evaluation', 'Adherence to Alternative methodology', 'Deliverable QA', 'Report to Alternative General Management']
  };

  const methodology = [
    {
      phase: isEs ? 'DIAGNÓSTICO' : 'DIAGNOSIS',
      duration: isEs ? '1-3 días' : '1-3 days',
      description: isEs
        ? 'Entendemos tu proyecto: objetivos, complejidad, industria, stakeholders, urgencia.'
        : 'We understand your project: objectives, complexity, industry, stakeholders, urgency.',
      icon: Target
    },
    {
      phase: isEs ? 'ASIGNACIÓN' : 'ASSIGNMENT',
      duration: isEs ? '2-5 días' : '2-5 days',
      description: isEs
        ? 'Seleccionamos PM con perfil óptimo: certificación apropiada, experiencia en proyectos similares, disponibilidad inmediata.'
        : 'We select PM with optimal profile: appropriate certification, experience in similar projects, immediate availability.',
      icon: Users
    },
    {
      phase: isEs ? 'INTEGRACIÓN' : 'INTEGRATION',
      duration: isEs ? '1 semana' : '1 week',
      description: isEs
        ? 'PM se integra a tu equipo: conoce stakeholders, revisa documentación existente, alinea expectativas.'
        : 'PM integrates to your team: meets stakeholders, reviews existing documentation, aligns expectations.',
      icon: Handshake
    },
    {
      phase: isEs ? 'EJECUCIÓN' : 'EXECUTION',
      duration: isEs ? 'Duración proyecto' : 'Project duration',
      description: isEs
        ? 'PM gestiona proyecto con metodología Alternative. Reportes regulares a ti y a Alternative. QA continuo.'
        : 'PM manages project with Alternative methodology. Regular reports to you and Alternative. Continuous QA.',
      icon: Play
    }
  ];

  const faqs = [
    {
      question: isEs ? '¿Qué ventajas tiene tercerizar PM vs contratar permanente?' : 'What advantages does outsourcing PM have vs hiring permanent?',
      answer: isEs
        ? 'Velocidad (PM listo en días vs meses de reclutamiento), flexibilidad (contratas solo duración del proyecto), expertise garantizada (certificación + experiencia comprobada), sin riesgo de contratación equivocada, costos variables vs fijos permanentes.'
        : 'Speed (PM ready in days vs months of recruitment), flexibility (you hire only for project duration), guaranteed expertise (certification + proven experience), no risk of wrong hire, variable vs permanent fixed costs.'
    },
    {
      question: isEs ? '¿Por qué tercerizar un PM en lugar de capacitar a alguien interno?' : 'Why outsource a PM instead of training someone internal?',
      answer: isEs
        ? 'Capacitar PM interno toma 2-3 años de experiencia real en proyectos complejos más certificación. Para proyecto que inicia en semanas, necesitas expertise ya probada. Tercerizar te da acceso inmediato a PM con 5-15 años experiencia y certificaciones vigentes, sin inversión en capacitación ni riesgo de curva de aprendizaje en proyecto crítico.'
        : 'Training an internal PM takes 2-3 years of real experience in complex projects plus certification. For a project starting in weeks, you need proven expertise. Outsourcing gives you immediate access to PM with 5-15 years experience and current certifications, without training investment or learning curve risk in a critical project.'
    },
    {
      question: isEs ? '¿El PM se adapta a nuestras herramientas o traen las suyas?' : 'Does the PM adapt to our tools or bring their own?',
      answer: isEs
        ? 'Ambos. Nuestros PMs se adaptan a herramientas que tu empresa ya usa (MS Project, Jira, Smartsheet, etc.). Adicionalmente, Alternative provee templates, frameworks y mejores prácticas probadas que el PM puede implementar si tu empresa no tiene estructura formal.'
        : 'Both. Our PMs adapt to tools your company already uses (MS Project, Jira, Smartsheet, etc.). Additionally, Alternative provides templates, frameworks, and proven best practices that the PM can implement if your company doesn\'t have a formal structure.'
    },
    {
      question: isEs ? '¿Cuál es el ROI de tercerizar PM vs tener uno interno permanente?' : 'What is the ROI of outsourcing PM vs having a permanent internal one?',
      answer: isEs
        ? 'PM permanente implica: salario anual completo, beneficios (15-25% adicional), costos de reclutamiento, onboarding 3-6 meses, riesgo si no encaja. Con tercerización pagas solo duración del proyecto, PM productivo desde semana 1, sin costos fijos permanentes. Para proyectos temporales o primeros proyectos de la empresa, ROI de tercerización es significativamente superior.'
        : 'Permanent PM implies: full annual salary, benefits (15-25% additional), recruitment costs, 3-6 month onboarding, risk if they don\'t fit. With outsourcing you pay only for project duration, productive PM from week 1, no permanent fixed costs. For temporary or first company projects, outsourcing ROI is significantly higher.'
    },
    {
      question: isEs ? '¿Alternative hace seguimiento del trabajo del PM o solo lo asignan?' : 'Does Alternative follow up on PM work or just assign them?',
      answer: isEs
        ? 'Hacemos QA continuo. PM reporta semanalmente a Gerencia General Alternative sobre avances, riesgos y blockers. Revisamos entregables críticos (planes, cronogramas, reportes). Aseguramos que PM cumple estándares Alternative y expectativas del cliente. No es "asignar y olvidar".'
        : 'We do continuous QA. PM reports weekly to Alternative General Management on progress, risks, and blockers. We review critical deliverables (plans, schedules, reports). We ensure PM meets Alternative standards and client expectations. It\'s not "assign and forget".'
    },
    {
      question: isEs ? '¿Tienen experiencia en proyectos de mi industria?' : 'Do you have experience in projects in my industry?',
      answer: isEs
        ? 'Nuestros PMs tienen experiencia cross-industry en: banca y servicios financieros, tecnología y telecomunicaciones, manufactura y logística, retail y comercio, salud, energía. Durante diagnóstico inicial identificamos PM con experiencia más relevante a tu industria y tipo de proyecto específico.'
        : 'Our PMs have cross-industry experience in: banking and financial services, technology and telecommunications, manufacturing and logistics, retail and commerce, health, energy. During initial diagnosis we identify PM with most relevant experience to your industry and specific project type.'
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
                  <FolderKanban className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Gestión de Proyectos' : 'Project Management'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Servicios' : 'Services'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Project Managers certificados para tus proyectos críticos'
                  : 'Certified Project Managers for your critical projects'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Tercerización de Project Managers certificados PMP®, Scrum Masters y Directores de PMO. Gestionan tus proyectos con metodología probada, experiencia comprobada y respaldo empresarial. Listos para integrarse a tu equipo en días, no meses.'
                  : 'Outsourcing of PMP® certified Project Managers, Scrum Masters, and PMO Directors. They manage your projects with proven methodology, proven experience, and corporate backing. Ready to integrate into your team in days, not months.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Solicita Project Manager' : 'Request Project Manager'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#servicios"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Conoce nuestros PMs' : 'Meet our PMs'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { icon: true, label: isEs ? 'PMs certificados PMP® y Scrum' : 'PMP® & Scrum certified PMs' },
                  { value: '15+', label: isEs ? 'años experiencia' : 'years experience' },
                  { icon2: true, label: isEs ? 'Respaldo Alternative' : 'Alternative backing' }
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
                    ) : stat.icon2 ? (
                      <Shield className="w-4 h-4 text-turquesa" />
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
                      {isEs ? 'Dashboard de Proyecto' : 'Project Dashboard'}
                    </span>
                  </div>

                  {/* Simulated Project Metrics */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">{isEs ? 'Progreso del Proyecto' : 'Project Progress'}</span>
                      <span className="text-turquesa font-bold">78%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '78%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-turquesa to-menta rounded-full"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-turquesa">12</p>
                        <p className="text-xs text-white/60">{isEs ? 'Hitos completados' : 'Milestones completed'}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-menta">3</p>
                        <p className="text-xs text-white/60">{isEs ? 'En progreso' : 'In progress'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-menta" />
                      <span>{isEs ? 'Dentro de presupuesto' : 'Within budget'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-menta" />
                      <span>{isEs ? 'A tiempo según cronograma' : 'On time per schedule'}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-turquesa rounded-2xl p-4 shadow-xl"
                >
                  <Award className="w-8 h-8 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROBLEM SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs 
                ? '¿Por qué tercerizar tu Project Manager?'
                : 'Why outsource your Project Manager?'}
            </h2>
            <p className="text-foreground/70 max-w-3xl mx-auto">
              {isEs 
                ? 'Contratar un PM permanente es costoso y lento. Reclutamiento toma meses, onboarding otros 3-6 meses, y si no encaja, empiezas de cero. Para proyectos críticos o temporales, necesitas expertise certificada ya, sin riesgo de contratación equivocada.'
                : 'Hiring a permanent PM is costly and slow. Recruitment takes months, onboarding another 3-6 months, and if they don\'t fit, you start over. For critical or temporary projects, you need certified expertise now, without the risk of a wrong hire.'}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {problems.map((problem, idx) => {
              const colors = colorClasses[problem.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-blanco-hueso dark:bg-card p-8 rounded-2xl border border-gris-arena/20 
                               hover:shadow-brand transition-all duration-300 h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-14 h-14 ${colors.bg} rounded-xl 
                                      flex items-center justify-center`}>
                        <problem.icon className={`w-7 h-7 ${colors.text}`} />
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
              );
            })}
          </StaggerContainer>

          <AnimatedSection className="text-center mt-10">
            <p className="text-lg text-turquesa font-medium">
              {isEs 
                ? 'Alternative provee PMs certificados, experimentados y respaldados. Sin riesgo de contratación.'
                : 'Alternative provides certified, experienced, and backed PMs. No hiring risk.'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          SERVICES SECTION
          ===================================================== */}
      <section id="servicios" className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Servicios' : 'Services'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Project Managers especializados según tu necesidad' : 'Specialized Project Managers for your needs'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => {
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
                        <service.icon className={`w-8 h-8 ${colors.text}`} />
                      </div>

                      <h3 className="text-2xl font-semibold text-azul-marino dark:text-white mb-3 
                                     group-hover:text-turquesa transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-foreground/70 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="flex items-start gap-2 mb-6">
                        <span className="text-turquesa font-medium text-sm">
                          {isEs ? 'Expertise:' : 'Expertise:'}
                        </span>
                        <span className="text-foreground/60 text-sm">{service.expertise}</span>
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
        </div>
      </section>

      {/* =====================================================
          WHY ALTERNATIVE SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Garantías que un freelancer no puede ofrecer' : 'Guarantees a freelancer can\'t offer'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guarantees.map((guarantee, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-blanco-hueso dark:bg-card p-6 rounded-2xl border border-gris-arena/20 
                             hover:shadow-brand transition-all duration-300 h-full"
                >
                  <div className="w-12 h-12 bg-turquesa/10 rounded-xl 
                                  flex items-center justify-center mb-4">
                    <guarantee.icon className="w-6 h-6 text-turquesa" />
                  </div>
                  <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-2">
                    {guarantee.title}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {guarantee.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
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
                        ? 'Banco rescata proyecto crítico con PM Alternative'
                        : 'Bank rescues critical project with Alternative PM'}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left - Description */}
                  <div>
                    <div className="mb-6">
                      <p className="text-sm text-foreground/60 mb-2">
                        {isEs ? 'Institución financiera regional' : 'Regional financial institution'}
                      </p>
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Situación' : 'Situation'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Implementación de core bancario ($2M presupuesto) llevaba 8 meses sin avances significativos. PM interno sin experiencia en proyectos de esta magnitud. Riesgo alto de fracaso total.'
                          : 'Core banking implementation ($2M budget) had been going 8 months without significant progress. Internal PM without experience in projects of this magnitude. High risk of total failure.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Asignamos PM certificado PMP® con 10 años experiencia en core bancarios. Integración en 1 semana. Replanning completo del proyecto. Metodología PMP® rigurosa implementada.'
                          : 'We assigned PMP® certified PM with 10 years experience in core banking. Integration in 1 week. Complete project replanning. Rigorous PMP® methodology implemented.'}
                      </p>
                    </div>

                    <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                      {isEs 
                        ? '"Alternative rescató proyecto que parecía perdido. Su PM no solo entregó resultados; nos enseñó cómo gestionar proyectos complejos."'
                        : '"Alternative rescued a project that seemed lost. Their PM not only delivered results; they taught us how to manage complex projects."'}
                      <span className="block mt-2 text-sm text-turquesa not-italic font-medium">
                        — VP {isEs ? 'Tecnología' : 'Technology'}
                      </span>
                    </blockquote>
                  </div>

                  {/* Right - Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: isEs ? 'Rescatado' : 'Rescued', label: isEs ? 'Proyecto' : 'Project', sub: isEs ? 'entregado exitosamente' : 'successfully delivered' },
                      { value: '9', label: isEs ? 'Meses' : 'Months', sub: isEs ? 'hasta go-live' : 'until go-live' },
                      { value: '$2M', label: isEs ? 'Presupuesto' : 'Budget', sub: '100%' },
                      { value: '0', label: isEs ? 'Días downtime' : 'Downtime days', sub: isEs ? 'no planificado' : 'unplanned' }
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
          PM PROFILE SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Perfil de PMs' : 'PM Profile'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Qué garantiza Alternative en cada PM' : 'What Alternative guarantees in each PM'}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: isEs ? 'Certificaciones (mínimo 1)' : 'Certifications (minimum 1)', items: pmProfile.certifications, icon: GraduationCap, color: 'turquesa' },
              { title: isEs ? 'Experiencia' : 'Experience', items: pmProfile.experience, icon: Briefcase, color: 'menta' },
              { title: isEs ? 'Habilidades' : 'Skills', items: pmProfile.skills, icon: TrendingUp, color: 'violeta' },
              { title: isEs ? 'Respaldo Alternative' : 'Alternative Backing', items: pmProfile.backing, icon: Shield, color: 'turquesa' }
            ].map((section, idx) => {
              const colors = colorClasses[section.color as keyof typeof colorClasses];
              return (
                <AnimatedSection key={idx} delay={idx * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-white dark:bg-background p-8 rounded-2xl shadow-brand 
                                hover:shadow-brand-lg transition-all duration-300
                                border-t-4 ${colors.border.replace('/20', '')}`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 ${colors.bg} rounded-xl 
                                      flex items-center justify-center`}>
                        <section.icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                        {section.title}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                          <span className="text-foreground/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          METHODOLOGY SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-violeta/10 text-violeta 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Proceso' : 'Process'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Proceso de asignación de PM' : 'PM Assignment Process'}
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
                    className="relative bg-blanco-hueso dark:bg-card p-8 rounded-2xl shadow-brand 
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
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Preguntas frecuentes' : 'Frequently Asked Questions'}
            </h2>
          </AnimatedSection>

          <AnimatedSection className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-background rounded-2xl p-8 shadow-brand">
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
                {isEs ? '¿Necesitas PM certificado para proyecto crítico?' : 'Need a certified PM for a critical project?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Diagnóstico de 30 minutos. Evaluamos tu proyecto y te presentamos perfil de PM óptimo para tu caso.'
                  : '30-minute diagnosis. We evaluate your project and present the optimal PM profile for your case.'}
              </p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Análisis de complejidad del proyecto' : 'Project complexity analysis',
                  isEs ? 'Perfil recomendado de PM (PMP®/Scrum/PMO)' : 'Recommended PM profile (PMP®/Scrum/PMO)',
                  isEs ? 'Timeline de integración' : 'Integration timeline',
                  isEs ? 'Propuesta personalizada' : 'Personalized proposal'
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
                    {isEs ? 'Solicitar PM Certificado' : 'Request Certified PM'}
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

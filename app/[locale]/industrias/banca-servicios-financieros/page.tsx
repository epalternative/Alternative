'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { IndustrySidebar } from '@/components/ui/industry-sidebar';
import {
  Building2,
  ArrowRight,
  ChevronDown,
  Target,
  Scale,
  CheckCircle2,
  TrendingUp,
  Shield,
  Clock,
  Users,
  FileText,
  AlertTriangle,
  Zap,
  Rocket,
  BarChart3,
  Phone,
  Award,
  Briefcase,
  Globe,
  Lock,
  Sparkles
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
    className="border-b border-turquesa/20 last:border-0"
    initial={false}
  >
    <button
      onClick={onClick}
      className="w-full py-6 flex items-center justify-between text-left group"
    >
      <span className="text-lg font-semibold text-azul-marino group-hover:text-turquesa transition-colors pr-8">
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
      <p className="pb-6 text-azul-marino/70 leading-relaxed">
        {answer}
      </p>
    </motion.div>
  </motion.div>
);

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function BancaServiciosFinancierosPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Industrias' : 'Industries', href: `/${locale}/industrias` },
    { label: isEs ? 'Banca y Servicios Financieros' : 'Banking & Financial Services', href: null }
  ];

  // Stats data
  const stats = [
    { value: '10+', label: isEs ? 'años experiencia sector financiero' : 'years financial sector experience', icon: Clock },
    { value: '15+', label: isEs ? 'proyectos en bancos, cooperativas, aseguradoras' : 'projects in banks, cooperatives, insurers', icon: Briefcase },
    { value: 'ISO 9001', label: isEs ? 'Lead Auditor certificado' : 'Lead Auditor certified', icon: Award },
    { value: 'PMP®', label: isEs ? 'gestión de proyectos complejos' : 'complex project management', icon: Target }
  ];

  // Desafíos del sector
  const desafios = [
    {
      icon: Scale,
      title: isEs ? 'Cumplimiento regulatorio en constante evolución' : 'Evolving regulatory compliance',
      description: isEs 
        ? 'SBP actualiza normativas continuamente (Acuerdos 8-2025, 9-2025). AML/CFT cada vez más estricto. Implementar compliance sin frenar operación es balance crítico.'
        : 'SBP continuously updates regulations (Agreements 8-2025, 9-2025). AML/CFT increasingly strict. Implementing compliance without stopping operations is critical balance.',
      color: 'turquesa'
    },
    {
      icon: TrendingUp,
      title: isEs ? 'Presión por eficiencia vs inversión regulatoria' : 'Efficiency pressure vs regulatory investment',
      description: isEs
        ? 'CFOs enfrentan tensión: reducir costos operativos mientras invierten en cumplimiento, ciberseguridad, resiliencia operativa. ROI de proyectos regulatorios es difícil de justificar.'
        : 'CFOs face tension: reduce operating costs while investing in compliance, cybersecurity, operational resilience. ROI of regulatory projects is difficult to justify.',
      color: 'menta'
    },
    {
      icon: Globe,
      title: isEs ? 'Transformación digital bancaria' : 'Banking digital transformation',
      description: isEs
        ? 'Clientes esperan experiencia digital (onboarding en minutos, banca móvil, pagos instantáneos). Bancos tradicionales compitiendo con fintechs ágiles. Modernizar core bancario sin riesgo operativo.'
        : 'Customers expect digital experience (onboarding in minutes, mobile banking, instant payments). Traditional banks competing with agile fintechs. Modernize core banking without operational risk.',
      color: 'violeta'
    },
    {
      icon: BarChart3,
      title: isEs ? 'Procesos core ineficientes' : 'Inefficient core processes',
      description: isEs
        ? 'Aprobaciones de crédito lentas (días vs horas), conciliaciones manuales, reportería regulatoria con alto trabajo manual. Procesos diseñados hace 20+ años que no escalan.'
        : 'Slow credit approvals (days vs hours), manual reconciliations, regulatory reporting with high manual work. Processes designed 20+ years ago that don\'t scale.',
      color: 'turquesa'
    },
    {
      icon: Shield,
      title: isEs ? 'Ciberseguridad y resiliencia operativa' : 'Cybersecurity and operational resilience',
      description: isEs
        ? 'DORA (Digital Operational Resilience Act) y regulaciones locales exigen resiliencia operativa digital. Instituciones deben demostrar capacidad de operar ante incidentes cibernéticos.'
        : 'DORA (Digital Operational Resilience Act) and local regulations require digital operational resilience. Institutions must demonstrate ability to operate during cyber incidents.',
      color: 'menta'
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'Gestión de proyectos de alto riesgo' : 'High-risk project management',
      description: isEs
        ? 'Proyectos bancarios son complejos: múltiples stakeholders, regulación, sistemas críticos 24/7, bajo margen de error. 60%+ de proyectos de transformación bancaria fallan o se retrasan significativamente.'
        : 'Banking projects are complex: multiple stakeholders, regulation, 24/7 critical systems, low margin of error. 60%+ of banking transformation projects fail or are significantly delayed.',
      color: 'violeta'
    }
  ];

  // Servicios principales
  const servicios = [
    {
      icon: Target,
      title: isEs ? 'Gestión de Proyectos Bancarios' : 'Banking Project Management',
      description: isEs
        ? 'Project Managers PMP® certificados para proyectos críticos bancarios: transformación digital, implementaciones de core bancario, proyectos de cumplimiento regulatorio, migración de plataformas, integración de sistemas.'
        : 'PMP® certified Project Managers for critical banking projects: digital transformation, core banking implementations, regulatory compliance projects, platform migration, system integration.',
      tipos: isEs ? [
        'Implementación de sistemas core bancarios (Temenos, Bantotal, FIS)',
        'Transformación digital (banca móvil, onboarding digital)',
        'Proyectos de cumplimiento SBP',
        'Certificaciones ISO 9001 / ISO 27001',
        'Implementación de soluciones AML/CFT'
      ] : [
        'Core banking system implementation (Temenos, Bantotal, FIS)',
        'Digital transformation (mobile banking, digital onboarding)',
        'SBP compliance projects',
        'ISO 9001 / ISO 27001 certifications',
        'AML/CFT solution implementation'
      ],
      href: `/${locale}/industrias/banca-servicios-financieros/gestion-proyectos-bancarios`,
      color: 'turquesa'
    },
    {
      icon: Scale,
      title: isEs ? 'Cumplimiento Regulatorio SBP' : 'SBP Regulatory Compliance',
      description: isEs
        ? 'Asesoría e implementación para cumplir normativas de Superintendencia de Bancos de Panamá: diseño de políticas y procedimientos alineados a Acuerdos SBP, documentación de procesos core bancarios, preparación para supervisiones.'
        : 'Advisory and implementation to comply with Superintendency of Banks of Panama regulations: design of policies and procedures aligned to SBP Agreements, documentation of core banking processes, preparation for inspections.',
      tipos: isEs ? [
        'Diseño de políticas y procedimientos',
        'Documentación de procesos bancarios',
        'Preparación para supervisiones SBP',
        'Remediación de observaciones regulatorias',
        'Sistemas de control interno'
      ] : [
        'Policy and procedure design',
        'Banking process documentation',
        'SBP inspection preparation',
        'Regulatory observation remediation',
        'Internal control systems'
      ],
      href: `/${locale}/industrias/banca-servicios-financieros/cumplimiento-regulatorio-sbp`,
      color: 'menta'
    },
    {
      icon: CheckCircle2,
      title: isEs ? 'ISO 9001 Sector Financiero' : 'ISO 9001 Financial Sector',
      description: isEs
        ? 'Implementación de sistemas de gestión de calidad ISO 9001:2015 adaptados a instituciones financieras. Documentación de procesos bancarios críticos, controles de calidad, auditorías internas, preparación para certificación.'
        : 'Implementation of ISO 9001:2015 quality management systems adapted to financial institutions. Documentation of critical banking processes, quality controls, internal audits, certification preparation.',
      tipos: isEs ? [
        'Documentación de procesos bancarios',
        'Controles de calidad',
        'Auditorías internas',
        'Preparación para certificación',
        'ISO 9001 Lead Auditor certificado'
      ] : [
        'Banking process documentation',
        'Quality controls',
        'Internal audits',
        'Certification preparation',
        'ISO 9001 Lead Auditor certified'
      ],
      href: `/${locale}/industrias/banca-servicios-financieros/iso-9001-sector-financiero`,
      color: 'violeta'
    }
  ];

  // Otros servicios
  const otrosServicios = [
    {
      title: isEs ? 'Transformación Digital Bancaria' : 'Banking Digital Transformation',
      description: isEs ? 'Estrategia digital, digitalización de procesos core, implementación de canales digitales, análisis de datos para decisiones.' : 'Digital strategy, core process digitization, digital channel implementation, data analysis for decisions.',
      href: `/${locale}/industrias/banca-servicios-financieros/transformacion-digital-bancaria`
    },
    {
      title: isEs ? 'Optimización de Procesos Bancarios' : 'Banking Process Optimization',
      description: isEs ? 'Mapeo y optimización de procesos críticos: aprobación de créditos, onboarding de clientes, conciliaciones, reportería regulatoria.' : 'Mapping and optimization of critical processes: credit approval, customer onboarding, reconciliations, regulatory reporting.'
    },
    {
      title: isEs ? 'Desarrollo de Software Bancario' : 'Banking Software Development',
      description: isEs ? 'Aplicaciones custom para banca, integraciones con core bancario, portales de clientes, herramientas internas.' : 'Custom applications for banking, core banking integrations, customer portals, internal tools.'
    }
  ];

  // Temas específicos
  const temasEspecificos = [
    {
      title: isEs ? 'Cumplimiento Regulatorio SBP' : 'SBP Regulatory Compliance',
      description: isEs ? 'Acuerdos SBP, AML/CFT, políticas y procedimientos, controles internos, preparación para supervisiones.' : 'SBP Agreements, AML/CFT, policies and procedures, internal controls, inspection preparation.',
      href: `/${locale}/industrias/banca-servicios-financieros/cumplimiento-regulatorio-sbp`,
      icon: Scale
    },
    {
      title: isEs ? 'Transformación Digital Bancaria' : 'Banking Digital Transformation',
      description: isEs ? 'Estrategia digital, onboarding digital, banca móvil, core banking modernization, analytics.' : 'Digital strategy, digital onboarding, mobile banking, core banking modernization, analytics.',
      href: `/${locale}/industrias/banca-servicios-financieros/transformacion-digital-bancaria`,
      icon: Rocket
    },
    {
      title: isEs ? 'Gestión de Proyectos Bancarios' : 'Banking Project Management',
      description: isEs ? 'PMs certificados para proyectos financieros complejos, metodología para sector regulado, casos de éxito.' : 'Certified PMs for complex financial projects, methodology for regulated sector, success cases.',
      href: `/${locale}/industrias/banca-servicios-financieros/gestion-proyectos-bancarios`,
      icon: Target
    },
    {
      title: isEs ? 'ISO 9001 Sector Financiero' : 'ISO 9001 Financial Sector',
      description: isEs ? 'Implementación de sistemas de calidad en instituciones financieras, certificación, auditorías internas.' : 'Quality system implementation in financial institutions, certification, internal audits.',
      href: `/${locale}/industrias/banca-servicios-financieros/iso-9001-sector-financiero`,
      icon: CheckCircle2
    }
  ];

  // FAQs
  const faqs = [
    {
      question: isEs ? '¿Alternative tiene experiencia específica en sector financiero o es consultoría genérica?' : 'Does Alternative have specific experience in the financial sector or is it generic consulting?',
      answer: isEs
        ? 'Experiencia específica de 10+ años en bancos, cooperativas y aseguradoras en Panamá y Centroamérica. Conocemos regulación SBP, hemos implementado ISO 9001 en instituciones financieras, gestionado proyectos de core bancario.'
        : 'Specific experience of 10+ years in banks, cooperatives and insurers in Panama and Central America. We know SBP regulation, have implemented ISO 9001 in financial institutions, managed core banking projects.'
    },
    {
      question: isEs ? '¿Cómo aseguran confidencialidad con información financiera sensible?' : 'How do you ensure confidentiality with sensitive financial information?',
      answer: isEs
        ? 'Firmamos NDAs estrictos, cumplimos con normativas de confidencialidad bancaria, información sensible nunca sale de sistemas del cliente, consultores con experiencia en sector regulado (entienden criticidad de confidencialidad). Muchos proyectos bancarios trabajamos en sitio, con accesos controlados, sin sacar información de instalaciones del banco.'
        : 'We sign strict NDAs, comply with banking confidentiality regulations, sensitive information never leaves client systems, consultants with experience in regulated sector (understand confidentiality criticality). Many banking projects we work on-site, with controlled access, without removing information from bank facilities.'
    },
    {
      question: isEs ? '¿Pueden trabajar con sistemas core bancarios (Temenos, Bantotal, FIS)?' : 'Can you work with core banking systems (Temenos, Bantotal, FIS)?',
      answer: isEs
        ? 'Sí. Hemos trabajado en proyectos con Temenos, Bantotal, FIS, Cobis, y core bancarios custom. Integramos soluciones con core existente, documentamos procesos que involucran core bancario, gestionamos proyectos de migración/actualización de core. No somos implementadores certificados de vendors específicos, pero gestionamos proyectos donde estos sistemas son componentes críticos.'
        : 'Yes. We have worked on projects with Temenos, Bantotal, FIS, Cobis, and custom core banking. We integrate solutions with existing core, document processes involving core banking, manage core migration/update projects. We are not certified implementers of specific vendors, but we manage projects where these systems are critical components.'
    },
    {
      question: isEs ? '¿Alternative provee Project Managers solo o también ejecuta proyectos completos?' : 'Does Alternative provide Project Managers only or also execute complete projects?',
      answer: isEs
        ? 'Ambos modelos: (1) PM outsourcing: Proveemos PM certificado que se integra a tu equipo y gestiona proyecto (tú ejecutas con recursos internos o vendor). (2) Proyecto llave en mano: Alternative gestiona Y ejecuta (ej: implementación ISO 9001, desarrollo de software, optimización de procesos). Modelo depende de tu necesidad y capacidades internas.'
        : 'Both models: (1) PM outsourcing: We provide certified PM who integrates into your team and manages project (you execute with internal resources or vendor). (2) Turnkey project: Alternative manages AND executes (e.g.: ISO 9001 implementation, software development, process optimization). Model depends on your need and internal capabilities.'
    }
  ];

  const colorClasses = {
    turquesa: { bg: 'bg-turquesa/10', text: 'text-turquesa', border: 'border-turquesa/20', badge: 'bg-turquesa/10 text-turquesa' },
    menta: { bg: 'bg-menta/10', text: 'text-menta', border: 'border-menta/20', badge: 'bg-menta/10 text-menta' },
    violeta: { bg: 'bg-violeta/10', text: 'text-violeta', border: 'border-violeta/20', badge: 'bg-violeta/10 text-violeta' }
  };

  return (
    <>
      <ReadingProgress />
      <IndustrySidebar locale={locale} currentIndustry="banca-servicios-financieros" />

      {/* =====================================================
          HERO SECTION - Turquesa Background
          ===================================================== */}
      <section className="relative bg-turquesa overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[10%] w-40 h-40 bg-azul-marino/10 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[8%] w-32 h-32 bg-menta/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[50%] right-[20%] w-24 h-24 bg-violeta/10 rounded-full blur-xl"
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
                    <ChevronDown className="w-4 h-4 text-azul-marino/40 -rotate-90" />
                  )}
                  {crumb.href ? (
                    <Link 
                      href={crumb.href}
                      className="text-azul-marino/60 hover:text-azul-marino transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-azul-marino font-medium">{crumb.label}</span>
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
                <div className="w-16 h-16 bg-azul-marino/20 rounded-2xl flex items-center justify-center
                                border border-azul-marino/30">
                  <Building2 className="w-8 h-8 text-azul-marino" />
                </div>
                <div>
                  <span className="text-azul-marino text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Banca y Servicios Financieros' : 'Banking & Financial Services'}
                  </span>
                  <p className="text-azul-marino/60 text-sm">
                    {isEs ? 'Industrias' : 'Industries'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-azul-marino font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Soluciones especializadas para instituciones financieras reguladas'
                  : 'Specialized solutions for regulated financial institutions'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-azul-marino/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Alternative tiene más de 10 años ejecutando proyectos en instituciones financieras en Panamá y Centroamérica. Entendemos las complejidades del sector regulado: cumplimiento estricto de normativas SBP, procesos core bancarios críticos que no pueden fallar, requerimientos de auditoría y trazabilidad.'
                  : 'Alternative has more than 10 years executing projects in financial institutions in Panama and Central America. We understand the complexities of the regulated sector: strict SBP regulation compliance, critical core banking processes that cannot fail, audit and traceability requirements.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-azul-marino text-white 
                             font-semibold px-6 py-3 rounded-lg hover:bg-azul-marino/90 
                             transition-all duration-300 shadow-lg shadow-azul-marino/20 group"
                >
                  {isEs ? 'Solicitar Consultoría' : 'Request Consulting'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/casos-exito`}
                  className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm 
                             text-azul-marino font-medium px-6 py-3 rounded-lg 
                             hover:bg-white transition-all duration-300 border border-azul-marino/20"
                >
                  {isEs ? 'Ver casos de éxito' : 'View success cases'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-azul-marino/20">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <stat.icon className="w-4 h-4 text-azul-marino" />
                    <span className="text-azul-marino font-bold">{stat.value}</span>
                    <span className="text-azul-marino/60 text-sm">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual - Banking Stats Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-azul-marino/20 relative shadow-xl"
                >
                  {/* Panel Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-turquesa" />
                    <div className="w-3 h-3 rounded-full bg-menta" />
                    <div className="w-3 h-3 rounded-full bg-violeta" />
                    <span className="ml-auto text-azul-marino/40 text-sm font-medium">
                      {isEs ? 'Experiencia Sector Financiero' : 'Financial Sector Experience'}
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, idx) => (
                      <motion.div
                        key={idx}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: idx * 0.3 }}
                        className="bg-turquesa/10 rounded-xl p-4 border border-turquesa/20"
                      >
                        <div className="w-10 h-10 bg-azul-marino/10 rounded-lg flex items-center justify-center mb-2">
                          <stat.icon className="w-5 h-5 text-azul-marino" />
                        </div>
                        <div className="text-2xl font-bold text-azul-marino mb-1">{stat.value}</div>
                        <div className="text-xs text-azul-marino/70 leading-tight">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress Indicators */}
                  <div className="mt-6 pt-6 border-t border-azul-marino/10">
                    <div className="space-y-2">
                      {[
                        { label: isEs ? 'Proyectos Completados' : 'Completed Projects', progress: 95, color: 'turquesa' },
                        { label: isEs ? 'Satisfacción Cliente' : 'Client Satisfaction', progress: 98, color: 'menta' },
                        { label: isEs ? 'Cumplimiento SBP' : 'SBP Compliance', progress: 100, color: 'violeta' }
                      ].map((item, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-azul-marino/60 text-xs">{item.label}</span>
                            <span className={`font-bold text-xs ${
                              item.color === 'turquesa' ? 'text-turquesa' :
                              item.color === 'menta' ? 'text-menta' : 'text-violeta'
                            }`}>{item.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-azul-marino/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.progress}%` }}
                              transition={{ duration: 1.5, delay: 0.5 + idx * 0.3 }}
                              className={`h-full ${
                                item.color === 'turquesa' ? 'bg-turquesa' :
                                item.color === 'menta' ? 'bg-menta' : 'bg-violeta'
                              } rounded-full`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-turquesa rounded-2xl p-4 shadow-xl"
                >
                  <Building2 className="w-8 h-8 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECCIÓN 2: POR QUÉ ALTERNATIVE ENTIENDE BANCA
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-6">
              {isEs ? 'Entendemos las particularidades del sector financiero regulado' : 'We understand the particularities of the regulated financial sector'}
            </h2>
            <div className="space-y-4 text-azul-marino/70 leading-relaxed mb-8">
              <p>
                {isEs 
                  ? 'Alternative tiene más de 10 años ejecutando proyectos en instituciones financieras en Panamá y Centroamérica. Entendemos las complejidades del sector regulado: cumplimiento estricto de normativas SBP, procesos core bancarios críticos que no pueden fallar, requerimientos de auditoría y trazabilidad, presión por eficiencia operativa vs inversión en cumplimiento, y la necesidad de equilibrar innovación digital con gestión de riesgos.'
                  : 'Alternative has more than 10 years executing projects in financial institutions in Panama and Central America. We understand the complexities of the regulated sector: strict SBP regulation compliance, critical core banking processes that cannot fail, audit and traceability requirements, pressure for operational efficiency vs compliance investment, and the need to balance digital innovation with risk management.'}
              </p>
              <p>
                {isEs 
                  ? 'Katherine González, CEO de Alternative, es ISO 9001 Lead Auditor certificada y PMP®, con experiencia directa implementando sistemas de calidad en bancos, gestionando proyectos de transformación digital bancaria, y asesorando en cumplimiento de regulaciones de la Superintendencia de Bancos de Panamá. No somos consultores genéricos aplicando metodologías estándar; conocemos íntimamente los desafíos específicos que CFOs, CTOs y COOs de instituciones financieras enfrentan diariamente.'
                  : 'Katherine González, CEO of Alternative, is ISO 9001 Lead Auditor certified and PMP®, with direct experience implementing quality systems in banks, managing banking digital transformation projects, and advising on compliance with Superintendency of Banks of Panama regulations. We are not generic consultants applying standard methodologies; we intimately know the specific challenges that CFOs, CTOs and COOs of financial institutions face daily.'}
              </p>
            </div>

            {/* Stats Grid */}
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-turquesa/10 rounded-2xl p-6 border border-turquesa/20 text-center"
                  >
                    <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-7 h-7 text-turquesa" />
                    </div>
                    <div className="text-3xl font-bold text-turquesa mb-2">{stat.value}</div>
                    <div className="text-sm text-azul-marino/70">{stat.label}</div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          SECCIÓN 3: DESAFÍOS DEL SECTOR FINANCIERO
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-turquesa/5">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-4">
              {isEs ? 'Desafíos críticos de instituciones financieras en 2025' : 'Critical challenges of financial institutions in 2025'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {desafios.map((desafio, idx) => {
              const colors = colorClasses[desafio.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl p-8 shadow-brand 
                               hover:shadow-brand-lg transition-all duration-300 border border-gris-arena/20"
                  >
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <desafio.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-azul-marino mb-3">
                      {desafio.title}
                    </h3>
                    <p className="text-azul-marino/70 text-sm leading-relaxed">
                      {desafio.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          SECCIÓN 4: NUESTROS SERVICIOS PARA BANCA
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-4">
              {isEs ? 'Cómo Alternative apoya a instituciones financieras' : 'How Alternative supports financial institutions'}
            </h2>
          </AnimatedSection>

          {/* 3 Cards Principales */}
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {servicios.map((servicio, idx) => {
              const colors = colorClasses[servicio.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="group relative bg-white rounded-2xl p-8 shadow-brand 
                               hover:shadow-brand-lg transition-all duration-300 border border-gris-arena/20
                               overflow-hidden h-full flex flex-col"
                  >
                    {/* Elemento decorativo */}
                    <div className={`absolute -top-4 -right-4 w-24 h-24 ${colors.bg} rounded-lg rotate-12 
                                    group-hover:rotate-45 transition-transform duration-500`} />
                    
                    <div className="relative z-10 flex-1">
                      <div className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                        <servicio.icon className={`w-8 h-8 ${colors.text}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-azul-marino mb-3">
                        {servicio.title}
                      </h3>
                      <p className="text-azul-marino/70 mb-4 text-sm leading-relaxed">
                        {servicio.description}
                      </p>
                      <div className="mb-4">
                        <div className={`${colors.text} font-semibold text-xs mb-2`}>
                          {isEs ? 'Tipos de proyectos que gestionamos:' : 'Types of projects we manage:'}
                        </div>
                        <ul className="space-y-1">
                          {servicio.tipos.map((tipo, tipoIdx) => (
                            <li key={tipoIdx} className="text-azul-marino/60 text-sm flex items-start gap-2">
                              <div className={`w-1.5 h-1.5 ${colors.bg.replace('/10', '')} rounded-full mt-1.5 flex-shrink-0`} />
                              {tipo}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link
                        href={servicio.href}
                        className="inline-flex items-center gap-2 text-turquesa font-medium text-sm 
                                 hover:text-azul-marino transition-colors mt-auto"
                      >
                        {isEs ? 'Conoce más' : 'Learn more'}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Otros Servicios */}
          <AnimatedSection>
            <div className="bg-turquesa/5 rounded-2xl p-8 border border-turquesa/20">
              <h3 className="text-xl font-semibold text-azul-marino mb-4">
                {isEs ? 'Otros Servicios Relevantes:' : 'Other Relevant Services:'}
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {otrosServicios.map((servicio, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 border border-turquesa/20">
                    <h4 className="font-semibold text-azul-marino mb-2 text-sm">
                      {servicio.title}
                    </h4>
                    <p className="text-azul-marino/70 text-xs">
                      {servicio.description}
                    </p>
                    {servicio.href && (
                      <Link
                        href={servicio.href}
                        className="inline-flex items-center gap-1 text-turquesa text-xs font-medium mt-2 
                                 hover:text-azul-marino transition-colors"
                      >
                        {isEs ? 'Ver más' : 'Learn more'}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          SECCIÓN 5: CASO DE ÉXITO - HIDDEN FOR VALIDATION
          ===================================================== */}
      {false && (
      <section className="py-20 lg:py-32 bg-blanco-hueso">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-white rounded-3xl p-8 lg:p-12 overflow-hidden relative shadow-brand-lg">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-turquesa" />
                  </div>
                  <div>
                    <span className="text-turquesa font-medium text-sm uppercase tracking-wider">
                      {isEs ? 'Caso de Éxito' : 'Success Story'}
                    </span>
                    <h3 className="text-xl font-semibold text-azul-marino">
                      {isEs ? 'Banco certifica ISO 9001 en 7 meses para cumplir SBP' : 'Bank certifies ISO 9001 in 7 months to comply with SBP'}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino mb-2">
                        {isEs ? 'Cliente' : 'Client'}
                      </h4>
                      <p className="text-azul-marino/70">
                        {isEs 
                          ? 'Banco regional en Panamá (5 sucursales, 180 empleados)'
                          : 'Regional bank in Panama (5 branches, 180 employees)'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino mb-2">
                        {isEs ? 'Desafío' : 'Challenge'}
                      </h4>
                      <p className="text-azul-marino/70">
                        {isEs 
                          ? 'Superintendencia de Bancos observó deficiencias en documentación de procesos y controles internos durante supervisión. Recomendación SBP: implementar sistema de gestión de calidad certificable. Banco tenía 12 meses para demostrar mejoras. Sin experiencia previa en ISO 9001. Procesos bancarios operando pero 90% no documentados formalmente.'
                          : 'Superintendency of Banks observed deficiencies in process documentation and internal controls during inspection. SBP recommendation: implement certifiable quality management system. Bank had 12 months to demonstrate improvements. No previous ISO 9001 experience. Banking processes operating but 90% not formally documented.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-azul-marino/70 mb-3">
                        {isEs 
                          ? 'Implementación acelerada de ISO 9001:2015 enfocada en procesos core bancarios en 7 meses:'
                          : 'Accelerated ISO 9001:2015 implementation focused on core banking processes in 7 months:'}
                      </p>
                      <ul className="space-y-2 text-azul-marino/70 text-sm">
                        {[
                          isEs ? 'Mes 1-2: Mapeo de 18 procesos bancarios críticos, identificación de gaps vs ISO 9001, diseño de sistema de gestión de calidad' : 'Month 1-2: Mapping of 18 critical banking processes, gap identification vs ISO 9001, quality management system design',
                          isEs ? 'Mes 3-5: Documentación de procedimientos bancarios, implementación de controles de calidad, capacitación a 180 empleados, auditorías internas preparatorias' : 'Month 3-5: Banking procedure documentation, quality control implementation, training to 180 employees, preparatory internal audits',
                          isEs ? 'Mes 6-7: Corrección de no conformidades, auditoría interna completa, auditoría de certificación (organismo externo)' : 'Month 6-7: Non-conformity correction, complete internal audit, certification audit (external body)'
                        ].map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-azul-marino mb-4">
                      {isEs ? 'Resultados' : 'Results'}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { value: '✅', label: isEs ? 'Certificación ISO 9001:2015 lograda en 7 meses' : 'ISO 9001:2015 certification achieved in 7 months' },
                        { value: '18', label: isEs ? 'procesos bancarios documentados' : 'banking processes documented' },
                        { value: '✅', label: isEs ? 'Observaciones SBP cerradas' : 'SBP observations closed' },
                        { value: '-40%', label: isEs ? 'Errores en procesos críticos' : 'Errors in critical processes' },
                        { value: '-60%', label: isEs ? 'Tiempo respuesta auditorías SBP' : 'SBP audit response time' },
                        { value: '✅', label: isEs ? 'Eficiencia operativa mejorada' : 'Operational efficiency improved' }
                      ].map((stat, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          className="bg-turquesa/10 rounded-xl p-4 text-center border border-turquesa/20"
                        >
                          <div className="text-2xl font-bold text-turquesa mb-1">
                            {stat.value}
                          </div>
                          <div className="text-xs text-azul-marino/70">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <blockquote className="border-l-4 border-turquesa pl-4 italic text-azul-marino/70">
                      {isEs 
                        ? '"Alternative nos ayudó a certificar ISO 9001 en 7 meses para cumplir con SBP. Project Manager gestionó todo mientras nosotros operábamos el banco. Observaciones cerradas, procesos documentados."'
                        : '"Alternative helped us certify ISO 9001 in 7 months to comply with SBP. Project Manager managed everything while we operated the bank. Observations closed, processes documented."'}
                      <span className="block mt-2 text-sm text-turquesa not-italic font-medium">
                        — {isEs ? 'Gerente General' : 'General Manager'}
                      </span>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* =====================================================
          SECCIÓN 6: EXPLORA TEMAS ESPECÍFICOS
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-4">
              {isEs ? 'Profundiza en temas específicos del sector financiero' : 'Dive deeper into specific financial sector topics'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {temasEspecificos.map((tema, idx) => (
              <StaggerItem key={idx}>
                <Link href={tema.href}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl p-6 shadow-brand hover:shadow-brand-lg 
                               transition-all duration-300 border border-gris-arena/20 h-full
                               group"
                  >
                    <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                      <tema.icon className="w-6 h-6 text-turquesa" />
                    </div>
                    <h3 className="text-lg font-semibold text-azul-marino mb-2 group-hover:text-turquesa transition-colors">
                      {tema.title}
                    </h3>
                    <p className="text-azul-marino/70 text-sm mb-4">
                      {tema.description}
                    </p>
                    <div className="flex items-center gap-2 text-turquesa font-medium text-sm">
                      <span>{isEs ? 'Ver más' : 'Learn more'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          SECCIÓN 7: FAQS SECTOR FINANCIERO
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-turquesa/5">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-4">
              {isEs ? 'Preguntas frecuentes' : 'Frequently Asked Questions'}
            </h2>
          </AnimatedSection>

          <AnimatedSection className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-brand">
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
          SECCIÓN 8: CTA FINAL
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-violeta relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-turquesa/10 rounded-full blur-2xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs ? '¿Tu institución financiera necesita apoyo especializado?' : 'Does your financial institution need specialized support?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Diagnóstico gratuito de 30 minutos. Evaluamos tu situación específica y recomendamos solución apropiada.'
                  : 'Free 30-minute diagnosis. We evaluate your specific situation and recommend appropriate solution.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Evaluación de desafío específico (cumplimiento, proyecto, eficiencia)' : 'Evaluation of specific challenge (compliance, project, efficiency)',
                  isEs ? 'Recomendación de servicio apropiado' : 'Appropriate service recommendation',
                  isEs ? 'Casos de éxito relevantes en sector financiero' : 'Relevant success cases in financial sector',
                  isEs ? 'Propuesta preliminar de trabajo' : 'Preliminary work proposal'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/${locale}/contacto`}
                    className="inline-flex items-center gap-3 bg-turquesa text-azul-marino 
                               font-semibold px-8 py-4 rounded-lg hover:bg-menta 
                               transition-all duration-300 shadow-lg group"
                  >
                    {isEs ? 'Solicitar Diagnóstico Sector Financiero' : 'Request Financial Sector Diagnosis'}
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

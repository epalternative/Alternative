'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { IndustrySidebar } from '@/components/ui/industry-sidebar';
import { faqs as faqData } from '@/lib/content/faqs/industrias--salud-farmaceutica';
import { localizeFaqs } from '@/lib/content/faqs';
import {
  Heart,
  ArrowRight,
  ChevronDown,
  Target,
  CheckCircle2,
  Scale,
  Clock,
  Users,
  FileText,
  AlertTriangle,
  Phone,
  Award,
  Briefcase,
  TrendingUp,
  Building2,
  Shield,
  Zap,
  Activity
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

export default function SaludFarmaceuticaPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Industrias' : 'Industries', href: `/${locale}/industrias` },
    { label: isEs ? 'Salud y Farmacéutica' : 'Healthcare & Pharma', href: null }
  ];

  // Stats data
  const stats = [
    { value: '15+', label: isEs ? 'proyectos sector salud' : 'healthcare sector projects', icon: Briefcase },
    { value: 'ISO 9001', label: isEs ? '/ 13485 especializados' : '/ 13485 specialized', icon: Award },
    { value: '100%', label: isEs ? 'Cumplimiento regulatorio sanitario' : 'Sanitary regulatory compliance', icon: Shield },
    { value: 'PMP®', label: isEs ? 'PMs entornos críticos' : 'PMs in critical environments', icon: Target }
  ];

  // Desafíos del sector
  const desafios = [
    {
      icon: Shield,
      title: isEs ? 'Cumplimiento regulatorio sanitario estricto' : 'Strict sanitary regulatory compliance',
      description: isEs
        ? 'Normativas de Ministerio de Salud, buenas prácticas (BPM, BPD, BPA), certificaciones obligatorias, auditorías regulares. No cumplir = sanciones severas o cierre operaciones.'
        : 'Ministry of Health regulations, good practices (GMP, GDP, GSP), mandatory certifications, regular audits. Non-compliance = severe sanctions or operation closure.',
      color: 'turquesa'
    },
    {
      icon: CheckCircle2,
      title: isEs ? 'Trazabilidad completa obligatoria' : 'Mandatory complete traceability',
      description: isEs
        ? 'Medicamentos, dispositivos médicos, historias clínicas requieren trazabilidad 100%: lotes, vencimientos, cadena de custodia, registros. Crítico para recalls y responsabilidad.'
        : 'Medications, medical devices, clinical records require 100% traceability: batches, expirations, chain of custody, records. Critical for recalls and liability.',
      color: 'menta'
    },
    {
      icon: Activity,
      title: isEs ? 'Operaciones 24/7 sin margen de error' : '24/7 operations with no margin for error',
      description: isEs
        ? 'Hospitales/clínicas operan continuamente. Errores médicos o farmacéuticos tienen consecuencias graves (vidas en riesgo). Procesos deben ser robustos y a prueba de fallas.'
        : 'Hospitals/clinics operate continuously. Medical or pharmaceutical errors have serious consequences (lives at risk). Processes must be robust and fail-safe.',
      color: 'violeta'
    },
    {
      icon: TrendingUp,
      title: isEs ? 'Presión por eficiencia vs calidad de atención' : 'Efficiency pressure vs quality of care',
      description: isEs
        ? 'Sistemas de salud con presión de costos pero calidad de atención no puede sacrificarse. Balance difícil: optimizar operaciones sin afectar seguridad del paciente.'
        : 'Health systems with cost pressure but quality of care cannot be sacrificed. Difficult balance: optimize operations without affecting patient safety.',
      color: 'turquesa'
    },
    {
      icon: FileText,
      title: isEs ? 'Documentación exhaustiva requerida' : 'Exhaustive documentation required',
      description: isEs
        ? 'Reguladores requieren documentación detallada: protocolos, procedimientos, registros, auditorías. Sin documentación adecuada, institución no puede operar o certificar.'
        : 'Regulators require detailed documentation: protocols, procedures, records, audits. Without adequate documentation, institution cannot operate or certify.',
      color: 'menta'
    },
    {
      icon: Zap,
      title: isEs ? 'Gestión de inventarios críticos' : 'Critical inventory management',
      description: isEs
        ? 'Medicamentos con vencimientos, cadena de frío para vacunas/biológicos, control de estupefacientes, gestión FEFO (First Expired, First Out). Errores generan desperdicios o riesgos.'
        : 'Medications with expirations, cold chain for vaccines/biologicals, controlled substances management, FEFO (First Expired, First Out) management. Errors generate waste or risks.',
      color: 'violeta'
    }
  ];

  // Servicios principales
  const servicios = [
    {
      icon: Target,
      title: isEs ? 'Gestión de Proyectos en Salud' : 'Healthcare Project Management',
      description: isEs
        ? 'Project Managers PMP® certificados para proyectos críticos en instituciones de salud y farmacéuticas: expansión de instalaciones (nuevas clínicas, quirófanos), implementación de sistemas de información hospitalaria (HIS, PACS, RIS), proyectos de certificación, modernización de laboratorios.'
        : 'PMP® certified Project Managers for critical projects in healthcare and pharmaceutical institutions: facility expansion (new clinics, operating rooms), hospital information system implementation (HIS, PACS, RIS), certification projects, laboratory modernization.',
      tipos: isEs ? [
        'Expansión de Instalaciones Médicas (construcción/remodelación clínicas, hospitales, quirófanos)',
        'Implementación de Sistemas de Información (HIS, historia clínica electrónica, PACS, RIS, farmacia)',
        'Proyectos de Certificación (ISO 9001, ISO 13485, acreditaciones hospitalarias, cumplimiento BPM)',
        'Optimización de Procesos Clínicos (flujos de pacientes, tiempos de espera, procesos quirúrgicos)'
      ] : [
        'Medical Facility Expansion (construction/renovation of clinics, hospitals, operating rooms)',
        'Information System Implementation (HIS, electronic health records, PACS, RIS, pharmacy)',
        'Certification Projects (ISO 9001, ISO 13485, hospital accreditations, GMP compliance)',
        'Clinical Process Optimization (patient flows, wait times, surgical processes)'
      ],
      color: 'turquesa'
    },
    {
      icon: CheckCircle2,
      title: isEs ? 'ISO 9001 / ISO 13485 Sector Salud' : 'ISO 9001 / ISO 13485 Healthcare Sector',
      description: isEs
        ? 'Implementación de sistemas de gestión de calidad para instituciones de salud (ISO 9001) y empresas de dispositivos médicos (ISO 13485). Documentación de procesos clínicos y administrativos, controles de calidad, preparación para certificación.'
        : 'Quality management system implementation for healthcare institutions (ISO 9001) and medical device companies (ISO 13485). Clinical and administrative process documentation, quality controls, certification preparation.',
      tipos: isEs ? [
        'ISO 9001 para Clínicas/Hospitales: Documentación procesos clínicos, administrativos, control calidad atención, gestión quejas, auditorías internas',
        'ISO 13485 para Dispositivos Médicos: Requisitos específicos, gestión riesgos producto, trazabilidad completa, vigilancia post-comercialización'
      ] : [
        'ISO 9001 for Clinics/Hospitals: Clinical and administrative process documentation, care quality control, complaint management, internal audits',
        'ISO 13485 for Medical Devices: Specific requirements, product risk management, complete traceability, post-market surveillance'
      ],
      color: 'menta'
    },
    {
      icon: Scale,
      title: isEs ? 'Cumplimiento Regulatorio Sanitario' : 'Sanitary Regulatory Compliance',
      description: isEs
        ? 'Asesoría e implementación para cumplir normativas sanitarias: buenas prácticas de manufactura (BPM) farmacéuticas, buenas prácticas de distribución (BPD), buenas prácticas de almacenamiento (BPA), preparación para inspecciones regulatorias.'
        : 'Advisory and implementation to comply with sanitary regulations: good manufacturing practices (GMP) for pharmaceuticals, good distribution practices (GDP), good storage practices (GSP), preparation for regulatory inspections.',
      tipos: isEs ? [
        'Políticas y procedimientos alineados a normativa sanitaria',
        'Trazabilidad de medicamentos/dispositivos',
        'Control de cadena de frío',
        'Gestión de estupefacientes y psicotrópicos',
        'Farmacovigilancia',
        'Preparación para inspecciones Ministerio Salud'
      ] : [
        'Policies and procedures aligned to sanitary regulations',
        'Medication/device traceability',
        'Cold chain control',
        'Controlled substances and psychotropics management',
        'Pharmacovigilance',
        'Ministry of Health inspection preparation'
      ],
      color: 'violeta'
    }
  ];

  // FAQs
  const faqs = localizeFaqs(faqData, isEs ? 'es' : 'en');

  const colorClasses = {
    turquesa: { bg: 'bg-turquesa/10', text: 'text-turquesa', border: 'border-turquesa/20', badge: 'bg-turquesa/10 text-turquesa' },
    menta: { bg: 'bg-menta/10', text: 'text-menta', border: 'border-menta/20', badge: 'bg-menta/10 text-menta' },
    violeta: { bg: 'bg-violeta/10', text: 'text-violeta', border: 'border-violeta/20', badge: 'bg-violeta/10 text-violeta' }
  };

  return (
    <>
      <ReadingProgress />
      <IndustrySidebar locale={locale} currentIndustry="salud-farmaceutica" />

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
                  <Heart className="w-8 h-8 text-azul-marino" />
                </div>
                <div>
                  <span className="text-azul-marino text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Salud y Farmacéutica' : 'Healthcare & Pharma'}
                  </span>
                  <p className="text-azul-marino/60 text-sm">
                    {isEs ? 'Industrias' : 'Industries'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-azul-marino font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Consultoría para sector salud: calidad y cumplimiento regulatorio'
                  : 'Healthcare sector consulting: quality and regulatory compliance'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-azul-marino/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Gestión de proyectos en instituciones de salud, implementación de sistemas de calidad, cumplimiento regulatorio sanitario, optimización de procesos clínicos y administrativos. PMs certificados con experiencia en entornos altamente regulados.'
                  : 'Project management in healthcare institutions, quality system implementation, sanitary regulatory compliance, clinical and administrative process optimization. Certified PMs with experience in highly regulated environments.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-azul-marino text-white 
                             font-semibold px-6 py-3 rounded-lg hover:bg-azul-marino/90 
                             transition-all duration-300 shadow-lg shadow-azul-marino/20 group"
                >
                  {isEs ? 'Solicita Consultoría en Salud' : 'Request Healthcare Consulting'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/casos-exito`}
                  className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm 
                             text-azul-marino font-medium px-6 py-3 rounded-lg 
                             hover:bg-white transition-all duration-300 border border-azul-marino/20"
                >
                  {isEs ? 'Ver casos sector salud' : 'View healthcare cases'}
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

            {/* Right Visual - Healthcare Stats Panel */}
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
                      {isEs ? 'Sector Salud' : 'Healthcare Sector'}
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
                        { label: isEs ? 'Certificaciones ISO' : 'ISO Certifications', progress: 100, color: 'menta' },
                        { label: isEs ? 'Cumplimiento Regulatorio' : 'Regulatory Compliance', progress: 100, color: 'violeta' }
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
                  <Heart className="w-8 h-8 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECCIÓN 2: POR QUÉ ALTERNATIVE ENTIENDE SECTOR SALUD
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-6">
              {isEs ? 'Entendemos las particularidades del sector salud regulado' : 'We understand the particularities of the regulated healthcare sector'}
            </h2>
            <div className="space-y-4 text-azul-marino/70 leading-relaxed mb-8">
              <p>
                {isEs 
                  ? 'Sector salud y farmacéutico opera bajo regulación estricta: normativas sanitarias de Ministerio de Salud, buenas prácticas de manufactura (BPM) para farmacéuticas, certificaciones de calidad obligatorias, trazabilidad completa de productos/procesos, auditorías regulatorias frecuentes, responsabilidad crítica (errores afectan vidas). Instituciones de salud y empresas farmacéuticas necesitan balance entre calidad/seguridad (no negociable) y eficiencia operativa.'
                  : 'Healthcare and pharmaceutical sector operates under strict regulation: Ministry of Health sanitary regulations, good manufacturing practices (GMP) for pharmaceuticals, mandatory quality certifications, complete product/process traceability, frequent regulatory audits, critical responsibility (errors affect lives). Healthcare institutions and pharmaceutical companies need balance between quality/safety (non-negotiable) and operational efficiency.'}
              </p>
              <p>
                {isEs 
                  ? 'Alternative ha gestionado proyectos en clínicas, hospitales, distribuidoras farmacéuticas y laboratorios: implementación de sistemas de gestión de calidad ISO 9001 / ISO 13485 (dispositivos médicos), preparación para certificaciones BPM, optimización de procesos clínicos y administrativos, gestión de proyectos de expansión/modernización. Entendemos criticidad de trazabilidad, documentación exhaustiva requerida por reguladores, necesidad de operar 24/7 sin afectar atención de pacientes.'
                  : 'Alternative has managed projects in clinics, hospitals, pharmaceutical distributors and laboratories: ISO 9001 / ISO 13485 (medical devices) quality management system implementation, GMP certification preparation, clinical and administrative process optimization, expansion/modernization project management. We understand traceability criticality, exhaustive documentation required by regulators, need to operate 24/7 without affecting patient care.'}
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
          SECCIÓN 3: DESAFÍOS DEL SECTOR SALUD
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-turquesa/5">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-4">
              {isEs ? 'Desafíos críticos del sector salud y farmacéutico' : 'Critical challenges of healthcare and pharmaceutical sector'}
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
          SECCIÓN 4: NUESTROS SERVICIOS PARA SALUD
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-4">
              {isEs ? 'Cómo Alternative apoya a instituciones de salud y farmacéuticas' : 'How Alternative supports healthcare and pharmaceutical institutions'}
            </h2>
          </AnimatedSection>

          {/* 3 Cards Principales */}
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                          {idx === 0 ? (isEs ? 'Tipos de proyectos que gestionamos:' : 'Types of projects we manage:') :
                           idx === 1 ? (isEs ? 'Áreas de implementación:' : 'Implementation areas:') :
                           (isEs ? 'Áreas de cumplimiento:' : 'Compliance areas:')}
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
                        href={`/${locale}/contacto`}
                        className="inline-flex items-center gap-2 text-turquesa font-medium text-sm 
                                 hover:text-azul-marino transition-colors mt-auto"
                      >
                        {idx === 0 ? (isEs ? 'Solicita PM para Proyecto de Salud' : 'Request PM for Healthcare Project') :
                         idx === 1 ? (isEs ? 'Ver ISO 9001 / ISO 13485' : 'View ISO 9001 / ISO 13485') :
                         (isEs ? 'Ver Cumplimiento Regulatorio' : 'View Regulatory Compliance')}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          SECCIÓN 5: CASO DE ÉXITO
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-white rounded-3xl p-8 lg:p-12 overflow-hidden relative shadow-brand-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa font-medium text-sm uppercase tracking-wider">
                    {isEs ? 'Caso de Éxito' : 'Success Story'}
                  </span>
                  <h3 className="text-xl font-semibold text-azul-marino">
                    {isEs ? 'Clínica certifica ISO 9001 y mejora satisfacción pacientes 42%' : 'Clinic certifies ISO 9001 and improves patient satisfaction 42%'}
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
                        ? 'Clínica privada multiservicio (80 camas, 200 empleados, 8 especialidades médicas)'
                        : 'Private multiservice clinic (80 beds, 200 employees, 8 medical specialties)'}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-azul-marino mb-2">
                      {isEs ? 'Situación' : 'Situation'}
                    </h4>
                    <p className="text-azul-marino/70">
                      {isEs 
                        ? 'Clínica con crecimiento acelerado últimos 5 años (40 → 80 camas) pero procesos operativos no escalaron: cada especialidad operaba diferente (sin estandarización), quejas de pacientes aumentando (tiempos de espera, coordinación entre especialidades), procesos administrativos ineficientes (admisión, facturación), procesos clínicos no documentados formalmente. Dirección decidió: "necesitamos estructurar operación con ISO 9001 antes de seguir creciendo."'
                        : 'Clinic with accelerated growth last 5 years (40 → 80 beds) but operational processes didn\'t scale: each specialty operated differently (no standardization), increasing patient complaints (wait times, coordination between specialties), inefficient administrative processes (admission, billing), clinical processes not formally documented. Management decided: "we need to structure operation with ISO 9001 before continuing to grow."'}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-azul-marino mb-2">
                      {isEs ? 'Objetivo' : 'Objective'}
                    </h4>
                    <p className="text-azul-marino/70">
                      {isEs 
                        ? 'Implementar ISO 9001 para estandarizar procesos clínicos y administrativos, mejorar calidad de atención, reducir quejas de pacientes.'
                        : 'Implement ISO 9001 to standardize clinical and administrative processes, improve care quality, reduce patient complaints.'}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-azul-marino mb-2">
                      {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                    </h4>
                    <p className="text-azul-marino/70 mb-3">
                      {isEs 
                        ? 'Implementación ISO 9001 en 8 meses (PM Alternative):'
                        : 'ISO 9001 implementation in 8 months (Alternative PM):'}
                    </p>
                    <div className="space-y-3 text-sm">
                      {[
                        { mes: isEs ? 'Mes 1-2' : 'Month 1-2', accion: isEs ? 'Diagnóstico y Diseño - Mapeo de procesos clínicos (8 especialidades), mapeo de procesos administrativos, diseño de sistema de gestión de calidad adaptado a clínica' : 'Diagnosis and Design - Mapping of clinical processes (8 specialties), mapping of administrative processes, quality management system design adapted to clinic' },
                        { mes: isEs ? 'Mes 3-6' : 'Month 3-6', accion: isEs ? 'Documentación e Implementación - Documentamos 15 procesos clínicos principales, protocolos de atención por especialidad, procedimientos administrativos, sistema de gestión de quejas estructurado, capacitación a 200 empleados' : 'Documentation and Implementation - We documented 15 main clinical processes, care protocols by specialty, administrative procedures, structured complaint management system, training to 200 employees' },
                        { mes: isEs ? 'Mes 7-8' : 'Month 7-8', accion: isEs ? 'Auditorías y Certificación - Auditorías internas preparatorias, corrección de no conformidades, auditoría de certificación (organismo externo), certificación ISO 9001:2015 lograda' : 'Audits and Certification - Preparatory internal audits, non-conformity correction, certification audit (external body), ISO 9001:2015 certification achieved' }
                      ].map((fase, idx) => (
                        <div key={idx} className="bg-turquesa/5 rounded-xl p-3 border border-turquesa/20">
                          <div className="text-turquesa font-bold text-xs mb-1">{fase.mes}</div>
                          <div className="text-azul-marino/70 text-xs">{fase.accion}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-azul-marino mb-4">
                    {isEs ? 'Resultados (12 meses post-certificación)' : 'Results (12 months post-certification)'}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { value: '+42%', label: isEs ? 'Satisfacción pacientes (NPS)' : 'Patient satisfaction (NPS)', sub: isEs ? '48 → 68' : '48 → 68' },
                      { value: '-65%', label: isEs ? 'Quejas' : 'Complaints', sub: '' },
                      { value: '-44%', label: isEs ? 'Tiempos espera consulta' : 'Consultation wait times', sub: isEs ? '45 min → 25 min' : '45 min → 25 min' },
                      { value: '-47%', label: isEs ? 'Tiempos espera cirugía' : 'Surgery wait times', sub: isEs ? '15 días → 8 días' : '15 days → 8 days' },
                      { value: '-40%', label: isEs ? 'Eventos adversos' : 'Adverse events', sub: '' },
                      { value: '+30%', label: isEs ? 'Eficiencia administrativa' : 'Administrative efficiency', sub: '' },
                      { value: '$1.5M', label: isEs ? 'Convenios corporativos adicionales' : 'Additional corporate agreements', sub: '' }
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="bg-turquesa/10 rounded-xl p-4 text-center border border-turquesa/20"
                      >
                        <div className="text-2xl font-bold text-turquesa mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs font-medium text-azul-marino">
                          {stat.label}
                        </div>
                        <div className="text-xs text-azul-marino/50">{stat.sub}</div>
                      </motion.div>
                    ))}
                  </div>

                  <blockquote className="border-l-4 border-turquesa pl-4 italic text-azul-marino/70">
                    {isEs 
                      ? '"ISO 9001 estructuró nuestra operación. Satisfacción pacientes 42% mejor, quejas 65% menos. Procesos estandarizados permiten escalar sin caos."'
                      : '"ISO 9001 structured our operation. Patient satisfaction 42% better, complaints 65% less. Standardized processes allow scaling without chaos."'}
                    <span className="block mt-2 text-sm text-turquesa not-italic font-medium">
                      — {isEs ? 'Director Médico' : 'Medical Director'}
                    </span>
                  </blockquote>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          SECCIÓN 6: FAQS
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
          SECCIÓN 7: CTA FINAL
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
                {isEs ? '¿Tu institución de salud necesita certificación o mejora de calidad?' : 'Does your healthcare institution need certification or quality improvement?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Evaluación gratuita de 30 minutos. Analizamos situación actual y recomendamos proyecto apropiado (ISO, BPM, optimización).'
                  : 'Free 30-minute evaluation. We analyze current situation and recommend appropriate project (ISO, GMP, optimization).'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Evaluación de madurez de calidad actual' : 'Current quality maturity evaluation',
                  isEs ? 'Identificación de gaps regulatorios' : 'Regulatory gap identification',
                  isEs ? 'Recomendación de certificación apropiada' : 'Appropriate certification recommendation',
                  isEs ? 'Estimación de timeline y costo' : 'Timeline and cost estimation',
                  isEs ? 'Propuesta de implementación' : 'Implementation proposal'
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
                    {isEs ? 'Solicitar Evaluación Sector Salud' : 'Request Healthcare Sector Evaluation'}
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

'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import {
  Award,
  ArrowRight,
  ChevronDown,
  FileCheck,
  ClipboardCheck,
  Search,
  CheckCircle2,
  Shield,
  BarChart3,
  Settings,
  TrendingUp,
  Users,
  Building2,
  Target,
  Clock,
  AlertTriangle,
  RefreshCw,
  Zap,
  Scale,
  Globe,
  Briefcase,
  Phone,
  Landmark,
  Heart,
  Utensils,
  Zap as Energy,
  Truck
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

export default function SistemasCalidadPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Sistemas de Calidad' : 'Quality Systems', href: null }
  ];

  // =====================================================
  // CONTENT DATA
  // =====================================================

  const problems = [
    {
      icon: Briefcase,
      title: isEs ? 'Cliente/licitación requiere ISO 9001' : 'Client/tender requires ISO 9001',
      description: isEs
        ? 'Tu cliente principal o licitación pública exige certificación ISO 9001 como requisito. Sin ella, pierdes oportunidad comercial o cliente existente.'
        : 'Your main client or public tender requires ISO 9001 certification as a requirement. Without it, you lose commercial opportunity or existing client.',
      color: 'turquesa'
    },
    {
      icon: Scale,
      title: isEs ? 'Industria regulada requiere sistema formal' : 'Regulated industry requires formal system',
      description: isEs
        ? 'Tu industria (banca, salud, alimentos, energía) exige sistema de calidad documentado y auditado. No es opcional, es requisito regulatorio.'
        : 'Your industry (banking, health, food, energy) requires documented and audited quality system. It\'s not optional, it\'s a regulatory requirement.',
      color: 'menta'
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'Calidad inconsistente genera quejas' : 'Inconsistent quality generates complaints',
      description: isEs
        ? 'Quejas recurrentes de clientes, productos/servicios que varían en calidad, falta de estandarización. Necesitas sistema que garantice consistencia.'
        : 'Recurring customer complaints, products/services that vary in quality, lack of standardization. You need a system that guarantees consistency.',
      color: 'violeta'
    },
    {
      icon: TrendingUp,
      title: isEs ? 'Empresa escalando necesita estandarización' : 'Scaling company needs standardization',
      description: isEs
        ? 'Estás creciendo pero procesos informales no escalan. Necesitas documentación, controles y sistema de calidad que soporte crecimiento sostenible.'
        : 'You\'re growing but informal processes don\'t scale. You need documentation, controls, and quality system that supports sustainable growth.',
      color: 'turquesa'
    }
  ];

  const services = [
    {
      icon: FileCheck,
      title: isEs ? 'Implementación ISO 9001' : 'ISO 9001 Implementation',
      description: isEs
        ? 'Implementación completa del sistema de calidad ISO 9001:2015 desde cero. Documentación, capacitación, auditorías internas y preparación para certificación.'
        : 'Complete implementation of ISO 9001:2015 quality system from scratch. Documentation, training, internal audits, and certification preparation.',
      href: `/${locale}/servicios/sistemas-calidad/implementacion-iso-9001`,
      color: 'turquesa'
    },
    {
      icon: Search,
      title: isEs ? 'Auditoría de Calidad' : 'Quality Audit',
      description: isEs
        ? 'Auditorías internas completas, auditorías enfocadas por proceso y auditorías de seguimiento. Detectamos no conformidades antes de certificación externa.'
        : 'Complete internal audits, process-focused audits, and follow-up audits. We detect non-conformities before external certification.',
      href: `/${locale}/servicios/sistemas-calidad/auditoria-calidad`,
      color: 'menta'
    },
    {
      icon: Award,
      title: isEs ? 'Certificación ISO' : 'ISO Certification',
      description: isEs
        ? 'Acompañamiento completo desde implementación hasta certificación. Incluye preparación, selección de organismo certificador y apoyo en auditoría de certificación.'
        : 'Complete support from implementation to certification. Includes preparation, certifying body selection, and support in certification audit.',
      href: `/${locale}/servicios/sistemas-calidad/certificacion-iso`,
      color: 'violeta'
    },
    {
      icon: Settings,
      title: isEs ? 'Gestión de Calidad' : 'Quality Management',
      description: isEs
        ? 'Sistema de calidad pragmático sin burocracia ISO completa. Para empresas que necesitan calidad estructurada pero sin requisitos formales de certificación.'
        : 'Pragmatic quality system without full ISO bureaucracy. For companies that need structured quality but without formal certification requirements.',
      href: `/${locale}/servicios/sistemas-calidad/gestion-calidad`,
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '20-30%', label: isEs ? 'Reducción en no conformidades' : 'Reduction in non-conformities', icon: Target },
    { value: '50%+', label: isEs ? 'Reducción en quejas de clientes' : 'Reduction in customer complaints', icon: AlertTriangle },
    { value: '100%', label: isEs ? 'Trazabilidad de procesos' : 'Process traceability', icon: CheckCircle2 },
    { value: '4-8', label: isEs ? 'Meses hasta certificación' : 'Months to certification', icon: Clock },
    { value: '85%+', label: isEs ? 'Aprobación primera auditoría' : 'First audit approval', icon: Award },
    { value: '20+', label: isEs ? 'Certificaciones exitosas' : 'Successful certifications', icon: Shield }
  ];

  const caseStudy = {
    industry: isEs ? 'Manufactura' : 'Manufacturing',
    title: isEs ? 'Manufacturera logra ISO 9001 para retener cliente clave' : 'Manufacturer achieves ISO 9001 to retain key client',
    challenge: isEs
      ? 'Cliente principal (40% de ventas) exigió certificación ISO 9001 o cancelaría contrato. Empresa sin experiencia previa en sistemas de calidad formales. Plazo: 6 meses.'
      : 'Main client (40% of sales) required ISO 9001 certification or would cancel contract. Company with no previous experience in formal quality systems. Deadline: 6 months.',
    solution: isEs
      ? 'Implementación completa ISO 9001:2015 con Alternative. Documentación de 12 procesos críticos, capacitación a 45 empleados, 3 auditorías internas, corrección de no conformidades. Preparación exhaustiva para auditoría de certificación.'
      : 'Complete ISO 9001:2015 implementation with Alternative. Documentation of 12 critical processes, training for 45 employees, 3 internal audits, non-conformity correction. Exhaustive preparation for certification audit.',
    results: [
      { value: '5.5', label: isEs ? 'Meses' : 'Months', sub: isEs ? 'hasta certificación' : 'to certification' },
      { value: '0', label: isEs ? 'No conformidades mayores' : 'Major non-conformities', sub: isEs ? 'en auditoría' : 'in audit' },
      { value: '$45K', label: isEs ? 'Ahorros anuales' : 'Annual savings', sub: isEs ? 'por reducción errores' : 'from error reduction' },
      { value: '100%', label: isEs ? 'Cliente retenido' : 'Client retained', sub: isEs ? 'contrato renovado' : 'contract renewed' }
    ],
    quote: isEs
      ? '"Alternative no solo nos certificó, nos transformó. Hoy tenemos procesos claros, calidad consistente y capacidad de escalar. El cliente no solo renovó, aumentó volumen 30%."'
      : '"Alternative not only certified us, they transformed us. Today we have clear processes, consistent quality, and ability to scale. The client not only renewed, increased volume 30%."',
    author: isEs ? 'Gerente General' : 'General Manager'
  };

  const sectors = [
    { icon: Landmark, title: isEs ? 'Banca' : 'Banking', description: isEs ? 'Cumplimiento regulatorio SBP, ISO 9001 para servicios financieros' : 'SBP regulatory compliance, ISO 9001 for financial services' },
    { icon: Building2, title: isEs ? 'Manufactura' : 'Manufacturing', description: isEs ? 'ISO 9001 para producción, control de calidad industrial' : 'ISO 9001 for production, industrial quality control' },
    { icon: Heart, title: isEs ? 'Salud' : 'Healthcare', description: isEs ? 'Sistemas de calidad para servicios de salud, cumplimiento regulatorio' : 'Quality systems for healthcare services, regulatory compliance' },
    { icon: Utensils, title: isEs ? 'Alimentos' : 'Food', description: isEs ? 'ISO 9001 + HACCP, seguridad alimentaria, trazabilidad' : 'ISO 9001 + HACCP, food safety, traceability' },
    { icon: Energy, title: isEs ? 'Energía' : 'Energy', description: isEs ? 'Sistemas de calidad para utilities, cumplimiento sectorial' : 'Quality systems for utilities, sector compliance' },
    { icon: Truck, title: isEs ? 'Logística' : 'Logistics', description: isEs ? 'ISO 9001 para operaciones logísticas, gestión de cadena de suministro' : 'ISO 9001 for logistics operations, supply chain management' }
  ];

  const faqs = [
    {
      question: isEs ? '¿Cuánto tiempo toma implementar ISO 9001 desde cero?' : 'How long does it take to implement ISO 9001 from scratch?',
      answer: isEs
        ? 'Depende del tamaño y complejidad de la empresa. Típicamente: PYME (20-50 empleados) 4-6 meses, empresa mediana (50-200 empleados) 6-8 meses, empresa grande (200+ empleados) 8-12 meses. El tiempo incluye documentación, implementación operativa, auditorías internas y corrección de no conformidades antes de certificación.'
        : 'Depends on company size and complexity. Typically: SME (20-50 employees) 4-6 months, medium company (50-200 employees) 6-8 months, large company (200+ employees) 8-12 months. Time includes documentation, operational implementation, internal audits, and non-conformity correction before certification.'
    },
    {
      question: isEs ? '¿Qué diferencia hay entre implementación ISO y certificación ISO?' : 'What\'s the difference between ISO implementation and ISO certification?',
      answer: isEs
        ? 'Implementación es el trabajo interno: documentar procesos, capacitar personal, implementar controles, hacer auditorías internas. Certificación es el proceso externo: organismo certificador (como SGS, Bureau Veritas) audita tu sistema y emite certificado oficial si cumples requisitos. Alternative hace implementación completa y te acompaña en certificación.'
        : 'Implementation is internal work: document processes, train staff, implement controls, conduct internal audits. Certification is external process: certifying body (like SGS, Bureau Veritas) audits your system and issues official certificate if you meet requirements. Alternative does complete implementation and supports you in certification.'
    },
    {
      question: isEs ? '¿Necesito certificación ISO o solo gestión de calidad?' : 'Do I need ISO certification or just quality management?',
      answer: isEs
        ? 'Si cliente/licitación exige certificado ISO, necesitas certificación completa. Si solo necesitas calidad estructurada sin requisito formal, gestión de calidad pragmática es suficiente. En diagnóstico inicial evaluamos tu necesidad específica y recomendamos enfoque óptimo.'
        : 'If client/tender requires ISO certificate, you need complete certification. If you only need structured quality without formal requirement, pragmatic quality management is sufficient. In initial diagnosis we evaluate your specific need and recommend optimal approach.'
    },
    {
      question: isEs ? '¿Qué pasa si no paso la auditoría de certificación?' : 'What happens if I don\'t pass the certification audit?',
      answer: isEs
        ? 'Si hay no conformidades menores, tienes plazo (típicamente 90 días) para corregirlas y auditoría de seguimiento. Si hay no conformidades mayores, debes corregir y nueva auditoría completa. Alternative prepara exhaustivamente para minimizar riesgo: 85%+ de nuestros clientes aprueban primera auditoría. Si no apruebas, te acompañamos en corrección sin costo adicional hasta aprobar.'
        : 'If there are minor non-conformities, you have deadline (typically 90 days) to correct them and follow-up audit. If there are major non-conformities, you must correct and new complete audit. Alternative prepares exhaustively to minimize risk: 85%+ of our clients approve first audit. If you don\'t approve, we support you in correction at no additional cost until approval.'
    },
    {
      question: isEs ? '¿Cuánto cuesta certificación ISO 9001?' : 'How much does ISO 9001 certification cost?',
      answer: isEs
        ? 'Costo tiene dos componentes: (1) Implementación con Alternative: depende de tamaño empresa y procesos, típicamente $15K-50K. (2) Certificación con organismo externo: $3K-10K/año (auditoría inicial + renovación anual). Alternative te ayuda a seleccionar organismo certificador objetivo y negociar mejores tarifas. Incluimos estimación detallada en diagnóstico inicial.'
        : 'Cost has two components: (1) Implementation with Alternative: depends on company size and processes, typically $15K-50K. (2) Certification with external body: $3K-10K/year (initial audit + annual renewal). Alternative helps you select objective certifying body and negotiate better rates. We include detailed estimate in initial diagnosis.'
    },
    {
      question: isEs ? '¿Mantengo certificación después de implementación?' : 'Do I maintain certification after implementation?',
      answer: isEs
        ? 'Sí. Certificación ISO requiere mantenimiento: auditorías de vigilancia anuales del organismo certificador, auditorías internas periódicas, revisión de gestión, mejora continua. Alternative te capacita para mantener sistema internamente. Opcionalmente ofrecemos servicio de mantenimiento continuo con auditorías internas y preparación para auditorías de vigilancia.'
        : 'Yes. ISO certification requires maintenance: annual surveillance audits by certifying body, periodic internal audits, management review, continuous improvement. Alternative trains you to maintain system internally. Optionally we offer continuous maintenance service with internal audits and preparation for surveillance audits.'
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
        currentService="sistemas-calidad"
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
                    {isEs ? 'Sistemas de Calidad' : 'Quality Systems'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Servicios' : 'Services'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Sistemas de calidad alineados a marcos de referencia internacionales'
                  : 'Quality systems aligned to international reference frameworks'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Implementación, auditoría y certificación ISO 9001. Especializados en sector bancario, manufactura y servicios con requisitos regulatorios estrictos. Certificación en 4-8 meses con 85%+ aprobación primera auditoría.'
                  : 'ISO 9001 implementation, audit, and certification. Specialized in banking, manufacturing, and services with strict regulatory requirements. Certification in 4-8 months with 85%+ first audit approval.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Evalúa tu Madurez de Calidad' : 'Evaluate Your Quality Maturity'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#casos-exito"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Ver casos de certificación' : 'View certification cases'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { icon: true, label: isEs ? 'ISO 9001 Lead Auditor certificados' : 'ISO 9001 Lead Auditor certified' },
                  { value: '20+', label: isEs ? 'certificaciones exitosas' : 'successful certifications' },
                  { icon2: true, label: isEs ? '85%+ aprobación primera auditoría' : '85%+ first audit approval' }
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
                      <CheckCircle2 className="w-4 h-4 text-turquesa" />
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
                      {isEs ? 'Sistema de Calidad' : 'Quality System'}
                    </span>
                  </div>

                  {/* Simulated Quality Metrics */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">{isEs ? 'Madurez del Sistema' : 'System Maturity'}</span>
                      <span className="text-turquesa font-bold">92%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '92%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-turquesa to-menta rounded-full"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-turquesa">20+</p>
                        <p className="text-xs text-white/60">{isEs ? 'Certificaciones' : 'Certifications'}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-menta">85%</p>
                        <p className="text-xs text-white/60">{isEs ? 'Aprobación' : 'Approval'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-menta" />
                      <span>{isEs ? 'ISO 9001:2015' : 'ISO 9001:2015'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-menta" />
                      <span>{isEs ? 'Lead Auditor certificado' : 'Lead Auditor certified'}</span>
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
                ? '¿Por qué necesitas un sistema de calidad formal?'
                : 'Why do you need a formal quality system?'}
            </h2>
            <p className="text-foreground/70 max-w-3xl mx-auto">
              {isEs 
                ? 'Sin sistema de calidad estructurado, pierdes oportunidades comerciales, enfrentas riesgos regulatorios y calidad inconsistente afecta tu reputación. Un sistema formal te da ventaja competitiva y capacidad de escalar.'
                : 'Without a structured quality system, you lose commercial opportunities, face regulatory risks, and inconsistent quality affects your reputation. A formal system gives you competitive advantage and ability to scale.'}
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
                ? 'Alternative implementa sistemas de calidad que resuelven estos problemas con metodología probada y resultados medibles.'
                : 'Alternative implements quality systems that solve these problems with proven methodology and measurable results.'}
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
              {isEs ? 'Nuestros 4 servicios de sistemas de calidad' : 'Our 4 quality systems services'}
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

                      <p className="text-foreground/70 mb-6 leading-relaxed">
                        {service.description}
                      </p>

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
          CASE STUDY SECTION - HIDDEN FOR VALIDATION
          ===================================================== */}
      {false && (
      <section id="casos-exito" className="py-20 lg:py-28 bg-white dark:bg-background">
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
                      {caseStudy.title}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left - Description */}
                  <div>
                    <div className="mb-6">
                      <p className="text-sm text-foreground/60 mb-2">
                        {caseStudy.industry}
                      </p>
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Desafío' : 'Challenge'}
                      </h4>
                      <p className="text-foreground/70">
                        {caseStudy.challenge}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-foreground/70">
                        {caseStudy.solution}
                      </p>
                    </div>

                    <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                      {caseStudy.quote}
                      <span className="block mt-2 text-sm text-turquesa not-italic font-medium">
                        — {caseStudy.author}
                      </span>
                    </blockquote>
                  </div>

                  {/* Right - Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {caseStudy.results.map((stat, idx) => (
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
      )}

      {/* =====================================================
          ISO 9001 BRIEF SECTION - Redesigned
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          {/* Header */}
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-violeta/10 text-violeta 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'ISO 9001' : 'ISO 9001'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Qué es ISO 9001?' : 'What is ISO 9001?'}
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              {isEs
                ? 'La norma internacional más reconocida para sistemas de gestión de calidad'
                : 'The most recognized international standard for quality management systems'}
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left - Main content */}
            <AnimatedSection>
              <div className="bg-white dark:bg-background rounded-2xl p-8 shadow-brand h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-violeta/10 rounded-xl flex items-center justify-center">
                    <Award className="w-7 h-7 text-violeta" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                      ISO 9001:2015
                    </h3>
                    <p className="text-foreground/60 text-sm">{isEs ? 'Versión actual' : 'Current version'}</p>
                  </div>
                </div>
                
                <p className="text-foreground/70 leading-relaxed mb-6">
                  {isEs
                    ? 'Establece requisitos para que una organización demuestre su capacidad de proporcionar productos y servicios que cumplan con requisitos legales y regulatorios, así como con las necesidades de clientes.'
                    : 'Establishes requirements for an organization to demonstrate its ability to provide products and services that meet legal and regulatory requirements, as well as customer needs.'}
                </p>

                {/* Key Requirements */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-azul-marino dark:text-white">
                    {isEs ? 'Requisitos clave:' : 'Key requirements:'}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      isEs ? 'Documentación de procesos' : 'Process documentation',
                      isEs ? 'Gestión de riesgos' : 'Risk management',
                      isEs ? 'Auditorías internas' : 'Internal audits',
                      isEs ? 'Mejora continua' : 'Continuous improvement',
                    ].map((req, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0" />
                        <span className="text-sm text-foreground/70">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right - 7 Principles */}
            <AnimatedSection delay={0.2}>
              <div className="bg-azul-marino rounded-2xl p-8 text-white">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-turquesa/20 rounded-lg flex items-center justify-center text-turquesa font-bold">
                    7
                  </span>
                  {isEs ? 'Principios Fundamentales' : 'Fundamental Principles'}
                </h3>
                
                <div className="space-y-3">
                  {[
                    { icon: Users, label: isEs ? 'Enfoque al cliente' : 'Customer focus' },
                    { icon: Target, label: isEs ? 'Liderazgo' : 'Leadership' },
                    { icon: Users, label: isEs ? 'Compromiso de las personas' : 'People engagement' },
                    { icon: Settings, label: isEs ? 'Enfoque a procesos' : 'Process approach' },
                    { icon: RefreshCw, label: isEs ? 'Mejora continua' : 'Continuous improvement' },
                    { icon: BarChart3, label: isEs ? 'Decisiones basadas en evidencia' : 'Evidence-based decisions' },
                    { icon: Briefcase, label: isEs ? 'Gestión de relaciones' : 'Relationship management' },
                  ].map((principle, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg 
                                 hover:bg-white/10 transition-colors cursor-default"
                    >
                      <div className="w-8 h-8 bg-turquesa/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <principle.icon className="w-4 h-4 text-turquesa" />
                      </div>
                      <span className="text-white/90 text-sm font-medium">{principle.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Bottom - Benefits banner */}
          <AnimatedSection delay={0.3} className="mt-8">
            <div className="bg-gradient-to-r from-turquesa to-menta rounded-2xl p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-azul-marino font-semibold text-lg">
                      {isEs ? '¿Por qué certificarse?' : 'Why get certified?'}
                    </h4>
                    <p className="text-azul-marino/70 text-sm">
                      {isEs 
                        ? 'Genera confianza en clientes, reguladores y stakeholders'
                        : 'Builds trust with customers, regulators and stakeholders'}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/${locale}/servicios/sistemas-calidad/implementacion-iso-9001`}
                  className="inline-flex items-center gap-2 bg-azul-marino text-white 
                             font-semibold px-6 py-3 rounded-lg hover:bg-azul-marino/90 
                             transition-all duration-300 group whitespace-nowrap"
                >
                  {isEs ? 'Ver Implementación ISO 9001' : 'View ISO 9001 Implementation'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          SECTORS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-menta/10 text-menta 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Sectores' : 'Sectors'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Sectores que atendemos' : 'Sectors we serve'}
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              {isEs 
                ? 'Experiencia comprobada en industrias con requisitos regulatorios estrictos y necesidad de sistemas de calidad robustos.'
                : 'Proven experience in industries with strict regulatory requirements and need for robust quality systems.'}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-blanco-hueso dark:bg-card p-6 rounded-2xl border border-gris-arena/20 
                             hover:shadow-brand transition-all duration-300 h-full"
                >
                  <div className="w-12 h-12 bg-turquesa/10 rounded-xl 
                                  flex items-center justify-center mb-4">
                    <sector.icon className="w-6 h-6 text-turquesa" />
                  </div>
                  <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-2">
                    {sector.title}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {sector.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
                {isEs ? '¿Listo para implementar sistema de calidad?' : 'Ready to implement a quality system?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Diagnóstico gratuito de madurez de calidad. Evaluamos tu situación actual, identificamos brechas y te presentamos roadmap personalizado hacia certificación ISO 9001.'
                  : 'Free quality maturity diagnosis. We evaluate your current situation, identify gaps, and present personalized roadmap to ISO 9001 certification.'}
              </p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Evaluación de madurez actual' : 'Current maturity assessment',
                  isEs ? 'Identificación de brechas vs ISO 9001' : 'Gap identification vs ISO 9001',
                  isEs ? 'Roadmap personalizado de implementación' : 'Personalized implementation roadmap',
                  isEs ? 'Estimación de tiempo y costo' : 'Time and cost estimation'
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
                    {isEs ? 'Solicitar Diagnóstico de Calidad' : 'Request Quality Diagnosis'}
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

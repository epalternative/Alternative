'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Award,
  CheckCircle2,
  Phone,
  Building2,
  Target,
  Shield,
  Clock,
  FileCheck,
  ClipboardCheck,
  Users,
  TrendingUp,
  Globe,
  Briefcase,
  RefreshCw,
  Layers,
  Building
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
  delay?: number;
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
  onClick: () => void;
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
      <p className="pb-6 text-foreground/70 leading-relaxed">{answer}</p>
    </motion.div>
  </motion.div>
);

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function CertificacionISOPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Sistemas de Calidad' : 'Quality Systems', href: `/${locale}/servicios/sistemas-calidad` },
    { label: isEs ? 'Certificación ISO' : 'ISO Certification', href: null }
  ];

  const colorClasses = {
    turquesa: { bg: 'bg-turquesa/10', text: 'text-turquesa', border: 'border-turquesa/20' },
    menta: { bg: 'bg-menta/10', text: 'text-menta', border: 'border-menta/20' },
    violeta: { bg: 'bg-violeta/10', text: 'text-violeta', border: 'border-violeta/20' }
  };

  // Para Quién Es - Grid 2x3
  const forWho = [
    {
      icon: Target,
      title: isEs ? 'Objetivo específico de certificado' : 'Specific certification goal',
      description: isEs
        ? 'Tu cliente, licitación o regulador exige certificación ISO 9001. Necesitas el certificado, no solo mejorar procesos.'
        : 'Your client, tender or regulator requires ISO 9001 certification. You need the certificate, not just process improvement.',
      color: 'turquesa'
    },
    {
      icon: RefreshCw,
      title: isEs ? 'Intentaste antes y no lograste' : 'You tried before and didn\'t achieve it',
      description: isEs
        ? 'Auditorías previas con no conformidades mayores, plazos incumplidos o consultor que abandonó. Buscas un partner que te lleve hasta el certificado.'
        : 'Previous audits with major nonconformities, missed deadlines or consultant who left. You want a partner that takes you to certification.',
      color: 'menta'
    },
    {
      icon: FileCheck,
      title: isEs ? 'Sin experiencia previa en ISO' : 'No prior ISO experience',
      description: isEs
        ? 'Nunca has implementado un sistema de gestión. Necesitas guía completa desde cero hasta certificación.'
        : 'You\'ve never implemented a management system. You need complete guidance from scratch to certification.',
      color: 'violeta'
    },
    {
      icon: TrendingUp,
      title: isEs ? 'Ventaja competitiva' : 'Competitive advantage',
      description: isEs
        ? 'Diferenciarte en licitaciones, acceso a clientes que exigen ISO, o mejorar imagen de marca con certificación reconocida.'
        : 'Differentiate in tenders, access clients that require ISO, or improve brand image with recognized certification.',
      color: 'turquesa'
    },
    {
      icon: Globe,
      title: isEs ? 'Expansión internacional' : 'International expansion',
      description: isEs
        ? 'Entrar a mercados o proveedores que exigen ISO 9001. Certificación facilita comercio y alianzas globales.'
        : 'Enter markets or suppliers that require ISO 9001. Certification facilitates trade and global partnerships.',
      color: 'menta'
    },
    {
      icon: Users,
      title: isEs ? 'Compromiso gerencial con calidad' : 'Management commitment to quality',
      description: isEs
        ? 'La dirección quiere calidad formal y certificada. Disponibilidad de recursos y voluntad de cumplir requisitos.'
        : 'Management wants formal, certified quality. Resource availability and willingness to meet requirements.',
      color: 'violeta'
    }
  ];

  // Proceso Completo - 3 etapas con sub-fases
  const processStages = [
    {
      stage: isEs ? 'Etapa 1' : 'Stage 1',
      title: isEs ? 'Trabajo con Alternative' : 'Work with Alternative',
      duration: isEs ? '4-8 meses' : '4-8 months',
      icon: Layers,
      color: 'turquesa',
      subPhases: [
        isEs ? 'Diagnóstico y diseño del sistema' : 'Diagnosis and system design',
        isEs ? 'Documentación (manual, procedimientos, formatos)' : 'Documentation (manual, procedures, forms)',
        isEs ? 'Implementación operativa y capacitación' : 'Operational implementation and training',
        isEs ? 'Auditorías internas y corrección de NC' : 'Internal audits and NC correction'
      ]
    },
    {
      stage: isEs ? 'Etapa 2' : 'Stage 2',
      title: isEs ? 'Auditoría de Certificación' : 'Certification Audit',
      duration: isEs ? '1-2 meses' : '1-2 months',
      icon: ClipboardCheck,
      color: 'menta',
      subPhases: [
        isEs ? 'Stage 1 (revisión documental) con organismo certificador' : 'Stage 1 (document review) with certification body',
        isEs ? 'Stage 2 (auditoría en sitio) – evaluación de implementación' : 'Stage 2 (on-site audit) – implementation assessment'
      ]
    },
    {
      stage: isEs ? 'Etapa 3' : 'Stage 3',
      title: isEs ? 'Certificación y Mantenimiento' : 'Certification and Maintenance',
      duration: isEs ? 'Vigilancia anual, re-certificación 3 años' : 'Annual surveillance, 3-year recertification',
      icon: Award,
      color: 'violeta',
      subPhases: [
        isEs ? 'Emisión del certificado ISO 9001' : 'ISO 9001 certificate issuance',
        isEs ? 'Auditorías de vigilancia anuales' : 'Annual surveillance audits',
        isEs ? 'Re-certificación al cabo de 3 años' : 'Recertification after 3 years'
      ]
    }
  ];

  // Qué Incluye - Grid 2x2
  const includes = [
    {
      icon: FileCheck,
      title: isEs ? 'Implementación Completa' : 'Full Implementation',
      description: isEs
        ? 'Sistema de gestión diseñado, documentado e implementado según ISO 9001:2015.'
        : 'Management system designed, documented and implemented per ISO 9001:2015.',
      color: 'turquesa'
    },
    {
      icon: ClipboardCheck,
      title: isEs ? 'Auditorías Internas' : 'Internal Audits',
      description: isEs
        ? 'Ejecución de auditorías internas y gestión de no conformidades antes de la certificación.'
        : 'Execution of internal audits and nonconformity management before certification.',
      color: 'menta'
    },
    {
      icon: Target,
      title: isEs ? 'Preparación para Certificación' : 'Certification Preparation',
      description: isEs
        ? 'Pre-auditoría, cierre de brechas y preparación de equipo para Stage 1 y Stage 2.'
        : 'Pre-audit, gap closure and team preparation for Stage 1 and Stage 2.',
      color: 'violeta'
    },
    {
      icon: Users,
      title: isEs ? 'Acompañamiento en Auditoría' : 'Audit Support',
      description: isEs
        ? 'Presencia de consultor Alternative durante auditoría de certificación para apoyo y cierre de hallazgos.'
        : 'Alternative consultant presence during certification audit for support and finding closure.',
      color: 'turquesa'
    }
  ];

  // Beneficios - Stats
  const benefits = [
    { value: '4-8', label: isEs ? 'meses hasta certificación' : 'months to certification', icon: Clock },
    { value: '85%+', label: isEs ? 'aprobación primera auditoría' : 'first audit approval', icon: Award },
    { value: '20+', label: isEs ? 'certificaciones exitosas' : 'successful certifications', icon: CheckCircle2 },
    { value: '100%', label: isEs ? 'trazabilidad documental' : 'document traceability', icon: FileCheck },
    { value: '0', label: isEs ? 'sorpresas en auditoría' : 'audit surprises', sub: isEs ? 'preparación rigurosa' : 'rigorous prep', icon: Shield }
  ];

  // Organismos Certificadores
  const certBodies = [
    { name: 'BSI', desc: isEs ? 'British Standards Institution – líder global, amplia red.' : 'British Standards Institution – global leader, wide network.' },
    { name: 'Bureau Veritas', desc: isEs ? 'Multinacional con presencia en Latinoamérica.' : 'Multinational with presence in Latin America.' },
    { name: 'SGS', desc: isEs ? 'Servicios de inspección y certificación mundial.' : 'Worldwide inspection and certification services.' },
    { name: 'DNV', desc: isEs ? 'Certificación técnica y marítima reconocida.' : 'Recognized technical and maritime certification.' },
    { name: 'TÜV', desc: isEs ? 'Organismos TÜV (p. ej. TÜV Rheinland) – prestigio en industria.' : 'TÜV bodies (e.g. TÜV Rheinland) – industry prestige.' }
  ];

  const faqs = [
    {
      question: isEs
        ? '¿Cuánto tiempo toma obtener la certificación ISO 9001?'
        : 'How long does it take to obtain ISO 9001 certification?',
      answer: isEs
        ? 'Típicamente 4-8 meses desde el inicio del trabajo con Alternative hasta la auditoría de certificación, según tamaño de la organización, madurez previa y alcance. Incluye implementación, auditorías internas, corrección de no conformidades y preparación para Stage 1 y Stage 2.'
        : 'Typically 4-8 months from start of work with Alternative until the certification audit, depending on organization size, prior maturity and scope. Includes implementation, internal audits, nonconformity correction and preparation for Stage 1 and Stage 2.'
    },
    {
      question: isEs
        ? '¿Qué diferencia hay entre implementación y certificación ISO?'
        : 'What is the difference between ISO implementation and certification?',
      answer: isEs
        ? 'Implementación es diseñar, documentar y operar el sistema de gestión según ISO 9001. Certificación es que un organismo acreditado (independiente) audite tu sistema y emita el certificado. Alternative te lleva de cero a implementación y te prepara para la auditoría de certificación; el organismo certificador realiza la auditoría y emite el certificado.'
        : 'Implementation is designing, documenting and operating the management system per ISO 9001. Certification is an accredited (independent) body auditing your system and issuing the certificate. Alternative takes you from zero to implementation and prepares you for the certification audit; the certification body conducts the audit and issues the certificate.'
    },
    {
      question: isEs
        ? '¿Alternative elige el organismo certificador por nosotros?'
        : 'Does Alternative choose the certification body for us?',
      answer: isEs
        ? 'No. La selección del organismo certificador es decisión del cliente para mantener independencia y objetividad. Alternative te orienta sobre organismos reconocidos (BSI, Bureau Veritas, SGS, DNV, TÜV, etc.), criterios de selección y proceso de cotización. Recomendamos obtener al menos 2-3 cotizaciones.'
        : 'No. Selecting the certification body is the client\'s decision to maintain independence and objectivity. Alternative guides you on recognized bodies (BSI, Bureau Veritas, SGS, DNV, TÜV, etc.), selection criteria and quotation process. We recommend obtaining at least 2-3 quotes.'
    },
    {
      question: isEs
        ? '¿Qué pasa si tenemos no conformidades en la auditoría de certificación?'
        : 'What if we have nonconformities in the certification audit?',
      answer: isEs
        ? 'No conformidades menores se cierran con evidencia antes de emitir el certificado (plazo según organismo). Mayores implican que no se emite el certificado hasta corregir y que el organismo verifique. Con Alternative, más del 85% de nuestros clientes aprueban en la primera auditoría gracias a preparación rigurosa, auditorías internas previas y pre-auditoría.'
        : 'Minor nonconformities are closed with evidence before certificate issuance (deadline per body). Major ones mean no certificate until corrected and verified by the body. With Alternative, over 85% of our clients pass the first audit thanks to rigorous preparation, prior internal audits and pre-audit.'
    },
    {
      question: isEs
        ? '¿El certificado ISO 9001 tiene vigencia?'
        : 'Does the ISO 9001 certificate expire?',
      answer: isEs
        ? 'Sí. El certificado típicamente se emite por 3 años. Hay auditorías de vigilancia anuales (años 1 y 2) y una auditoría de re-certificación en el año 3. Si se cumplen los requisitos, se renueva el certificado por otros 3 años. Alternative puede apoyarte en mantenimiento post-certificación y preparación para vigilancia y re-certificación.'
        : 'Yes. The certificate is typically issued for 3 years. There are annual surveillance audits (years 1 and 2) and a recertification audit in year 3. If requirements are met, the certificate is renewed for another 3 years. Alternative can support you with post-certification maintenance and preparation for surveillance and recertification.'
    },
    {
      question: isEs
        ? '¿Podemos certificarnos si ya intentamos antes y no logramos?'
        : 'Can we get certified if we tried before and didn\'t achieve it?',
      answer: isEs
        ? 'Sí. Es un escenario frecuente. Revisamos qué falló (documentación incompleta, implementación débil, no conformidades no resueltas, organismo inadecuado) y armamos un plan para cerrar brechas y llegar a certificación. Nuestra metodología y experiencia en 20+ certificaciones nos permiten rescatar proyectos que parecían estancados.'
        : 'Yes. It\'s a common scenario. We review what failed (incomplete documentation, weak implementation, unresolved nonconformities, unsuitable body) and build a plan to close gaps and reach certification. Our methodology and experience in 20+ certifications allow us to rescue projects that seemed stalled.'
    }
  ];

  return (
    <>
      {/* =====================================================
          HERO SECTION
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[15%] right-[10%] w-40 h-40 bg-turquesa/5 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[20%] left-[5%] w-32 h-32 bg-menta/5 rounded-full blur-xl"
          />
        </div>

        <div className="container-custom relative z-10 pt-8 pb-16 lg:pb-20">
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-turquesa/20 rounded-2xl flex items-center justify-center border border-turquesa/30">
                  <Award className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Certificación ISO' : 'ISO Certification'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Sistemas de Calidad' : 'Quality Systems'}
                  </p>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs
                  ? 'De cero al certificado ISO 9001 con acompañamiento completo'
                  : 'From zero to ISO 9001 certificate with full support'}
              </h1>

              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {isEs
                  ? 'Implementación del sistema de gestión, auditorías internas, preparación para certificación y acompañamiento en la auditoría del organismo. Más del 85% de nuestros clientes aprueban en la primera auditoría. 4-8 meses hasta el certificado.'
                  : 'Management system implementation, internal audits, certification preparation and support during the certification body audit. Over 85% of our clients pass the first audit. 4-8 months to certificate.'}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-6 py-3 rounded-lg hover:bg-menta transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Solicitar Certificación ISO' : 'Request ISO Certification'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#caso-exito"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-medium px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Ver caso de éxito' : 'View success story'}
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '4-8', label: isEs ? 'meses hasta certificación' : 'months to certification' },
                  { value: '85%+', label: isEs ? 'aprobación primera auditoría' : 'first audit approval' },
                  { value: '20+', label: isEs ? 'certificaciones exitosas' : 'successful certifications' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-turquesa font-bold">{stat.value}</span>
                    <span className="text-white/60 text-sm">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-turquesa/20 rounded-full px-4 py-2 mb-3">
                    <Award className="w-5 h-5 text-turquesa" />
                    <span className="text-turquesa font-semibold">ISO 9001:2015</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {isEs ? 'Proceso de Certificación' : 'Certification Process'}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {isEs ? '3 etapas hasta el certificado' : '3 stages to certificate'}
                  </p>
                </div>
                <div className="space-y-3">
                  {processStages.map((s, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.15 }}
                      className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10"
                    >
                      <div className="w-10 h-10 bg-turquesa/20 rounded-lg flex items-center justify-center">
                        <s.icon className="w-5 h-5 text-turquesa" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-white font-medium text-sm block">{s.title}</span>
                        <span className="text-white/50 text-xs">{s.duration}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUÉ ES CERTIFICACIÓN ISO
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <div className="max-w-3xl">
            <AnimatedSection>
              <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
                {isEs ? '¿Qué es?' : 'What is it?'}
              </span>
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs ? 'Qué es la Certificación ISO' : 'What is ISO Certification'}
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs
                    ? 'La certificación ISO 9001 es el resultado de una auditoría realizada por un organismo de certificación acreditado e independiente. Ese organismo verifica que tu sistema de gestión de la calidad cumple con los requisitos de la norma ISO 9001:2015 y emite un certificado con validez internacional.'
                    : 'ISO 9001 certification is the result of an audit by an accredited, independent certification body. That body verifies that your quality management system meets ISO 9001:2015 requirements and issues an internationally recognized certificate.'}
                </p>
                <p>
                  {isEs
                    ? 'No basta con implementar procesos o tener documentación: debe existir evidencia objetiva de que el sistema está operando, se revisa por la dirección y mejora de forma continua. La certificación diferencia a quienes “tienen ISO” solo en papel de quienes demuestran conformidad ante un tercero.'
                    : 'Implementing processes or having documentation is not enough: there must be objective evidence that the system is operating, reviewed by management and improving continually. Certification differentiates those who "have ISO" only on paper from those who demonstrate conformity to a third party.'}
                </p>
                <p>
                  {isEs
                    ? 'Alternative te acompaña desde el diseño e implementación del sistema hasta la preparación y el apoyo durante la auditoría de certificación. El organismo certificador (BSI, Bureau Veritas, SGS, etc.) es quien audita y emite el certificado; nosotros te llevamos listo para aprobar.'
                    : 'Alternative supports you from system design and implementation through preparation and support during the certification audit. The certification body (BSI, Bureau Veritas, SGS, etc.) conducts the audit and issues the certificate; we get you ready to pass.'}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* =====================================================
          PARA QUIÉN ES
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
              {isEs ? 'Para quién es' : 'Who it\'s for'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Para quién es el servicio de Certificación ISO?' : 'Who is the ISO Certification service for?'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forWho.map((item, idx) => {
              const colors = colorClasses[item.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-white dark:bg-background p-6 rounded-2xl shadow-brand hover:shadow-brand-lg transition-all duration-300 h-full border-l-4 ${colors.border.replace('/20', '')}`}
                  >
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <item.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">{item.description}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          PROCESO COMPLETO DE CERTIFICACIÓN - 3 ETAPAS
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-violeta/10 text-violeta rounded-full text-sm font-medium mb-4">
              {isEs ? 'Proceso' : 'Process'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Proceso completo de certificación' : 'Full certification process'}
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-turquesa/20 hidden md:block" />
              <div className="space-y-12">
                {processStages.map((stage, idx) => {
                  const colors = colorClasses[stage.color as keyof typeof colorClasses];
                  return (
                    <AnimatedSection key={idx} delay={idx * 0.1}>
                      <motion.div whileHover={{ x: 6 }} className="flex gap-6 items-start">
                        <div
                          className={`relative z-10 w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center flex-shrink-0 border-2 ${colors.border}`}
                        >
                          <stage.icon className={`w-8 h-8 ${colors.text}`} />
                        </div>
                        <div className="flex-1 bg-blanco-hueso dark:bg-card p-6 rounded-2xl shadow-brand">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className={`text-sm font-bold ${colors.text}`}>{stage.stage}</span>
                            <span className="text-xl font-semibold text-azul-marino dark:text-white">
                              {stage.title}
                            </span>
                            <span className="text-foreground/60 text-sm">{stage.duration}</span>
                          </div>
                          <ul className="space-y-2">
                            {stage.subPhases.map((sub, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                                <span className="text-foreground/70 text-sm">{sub}</span>
                              </li>
                            ))}
                          </ul>
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
          QUÉ INCLUYE
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
              {isEs ? 'Servicio completo' : 'Full service'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Qué incluye el servicio completo' : 'What the full service includes'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {includes.map((item, idx) => {
              const colors = colorClasses[item.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-white dark:bg-background p-6 rounded-2xl shadow-brand hover:shadow-brand-lg transition-all duration-300 h-full border ${colors.border}`}
                  >
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <item.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">{item.description}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          BENEFICIOS
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-azul-marino">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              {isEs ? 'Beneficios medibles' : 'Measurable benefits'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {benefits.map((b, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <b.icon className="w-7 h-7 text-turquesa" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-turquesa mb-1">{b.value}</div>
                  <div className="text-sm text-white/80 font-medium">{b.label}</div>
                  {b.sub && <div className="text-xs text-white/60 mt-1">{b.sub}</div>}
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          CASO DE ÉXITO - Banco ISO 9001 SBP
          ===================================================== */}
      <section id="caso-exito" className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-blanco-hueso dark:bg-card rounded-3xl p-8 lg:p-12 overflow-hidden relative">
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
                        ? 'Banco certifica ISO 9001 en 7 meses para cumplir SBP'
                        : 'Bank certifies ISO 9001 in 7 months to comply with SBP'}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-6">
                      <p className="text-sm text-foreground/60 mb-2">
                        {isEs ? 'Institución financiera • Supervisión Bancaria' : 'Financial institution • Banking supervision'}
                      </p>
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Situación' : 'Situation'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs
                          ? 'La Superintendencia de Bancos (SBP) exigía sistema de gestión de calidad certificado ISO 9001 como parte de cumplimiento normativo. El banco no tenía experiencia previa en ISO. Plazo ajustado para demostrar avance.'
                          : 'The Banking Superintendency (SBP) required a certified ISO 9001 quality management system as part of regulatory compliance. The bank had no prior ISO experience. Tight deadline to show progress.'}
                      </p>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs
                          ? 'Implementación completa desde cero: diagnóstico, diseño, documentación, capacitación y auditorías internas. Preparación exhaustiva para Stage 1 y Stage 2. Acompañamiento durante la auditoría de certificación con organismo acreditado.'
                          : 'Full implementation from scratch: diagnosis, design, documentation, training and internal audits. Exhaustive preparation for Stage 1 and Stage 2. Support during certification audit with accredited body.'}
                      </p>
                    </div>
                    <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                      {isEs
                        ? '"Alternative nos llevó de cero al certificado en 7 meses. Cumplimos con SBP y hoy nuestro sistema de calidad es una ventaja competitiva."'
                        : '"Alternative took us from zero to certificate in 7 months. We complied with SBP and today our quality system is a competitive advantage."'}
                      <span className="block mt-2 text-sm text-turquesa not-italic font-medium">
                        — {isEs ? 'Gerente de Calidad' : 'Quality Manager'}
                      </span>
                    </blockquote>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '7', label: isEs ? 'meses' : 'months', sub: isEs ? 'hasta certificado' : 'to certificate' },
                      { value: '0', label: isEs ? 'NC mayores' : 'major NCs', sub: isEs ? 'en auditoría' : 'in audit' },
                      { value: '100%', label: isEs ? 'cumplimiento SBP' : 'SBP compliance', sub: '' },
                      { value: '1', label: isEs ? 'auditoría' : 'audit', sub: isEs ? 'aprobación directa' : 'direct pass' }
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

      {/* =====================================================
          ORGANISMOS CERTIFICADORES
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
              {isEs ? 'Organismos certificadores' : 'Certification bodies'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Organismos certificadores que recomendamos' : 'Certification bodies we recommend'}
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              {isEs
                ? 'La selección del organismo es decisión tuya. Te orientamos sobre opciones reconocidas, criterios de elegibilidad y cómo cotizar. Recomendación objetiva, sin comisiones ni vinculación.'
                : 'Selecting the body is your decision. We guide you on recognized options, eligibility criteria and how to get quotes. Objective recommendation, no commissions or ties.'}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certBodies.map((body, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-4 bg-white dark:bg-background p-6 rounded-2xl shadow-brand border border-gris-arena/20"
                >
                  <div className="w-12 h-12 bg-turquesa/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building className="w-6 h-6 text-turquesa" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-azul-marino dark:text-white mb-1">{body.name}</h3>
                    <p className="text-foreground/70 text-sm">{body.desc}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          FAQ
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
          CTA FINAL
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-violeta relative overflow-hidden">
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
                  {isEs ? 'Diagnóstico de madurez de calidad' : 'Quality maturity diagnosis'}
                </span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs ? '¿Listo para tu certificación ISO 9001?' : 'Ready for your ISO 9001 certification?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs
                  ? 'Evaluamos tu situación actual, estimamos plazo hasta certificación y te presentamos una propuesta. Sin compromiso.'
                  : 'We assess your current situation, estimate time to certification and present a proposal. No commitment.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Diagnóstico de madurez inicial' : 'Initial maturity diagnosis',
                  isEs ? 'Estimación de plazo y alcance' : 'Timeline and scope estimate',
                  isEs ? 'Propuesta de servicio completo' : 'Full service proposal',
                  isEs ? 'Orientación sobre organismos certificadores' : 'Guidance on certification bodies'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/${locale}/contacto`}
                    className="inline-flex items-center gap-3 bg-white text-violeta font-semibold px-8 py-4 rounded-lg hover:bg-menta hover:text-azul-marino transition-all duration-300 shadow-lg group"
                  >
                    {isEs ? 'Solicitar Certificación ISO' : 'Request ISO Certification'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href="https://wa.me/50769908906"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white font-medium px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
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

'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import {
  ArrowRight,
  ChevronDown,
  Award,
  CheckCircle2,
  Phone,
  Building2,
  Users,
  Target,
  Clock,
  FileText,
  Settings,
  Briefcase,
  TrendingUp,
  DollarSign,
  Calendar,
  ClipboardCheck,
  RefreshCw,
  AlertTriangle,
  Shield,
  BarChart3,
  FileCheck,
  Search,
  Zap,
  Scale,
  Globe,
  TrendingDown
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

export default function ImplementacionISO9001Page() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [openRequirement, setOpenRequirement] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Sistemas de Calidad' : 'Quality Systems', href: `/${locale}/servicios/sistemas-calidad` },
    { label: isEs ? 'Implementación ISO 9001' : 'ISO 9001 Implementation', href: null }
  ];

  // =====================================================
  // CONTENT DATA
  // =====================================================

  // For Whom section - Compact descriptions
  const forWhom = [
    {
      icon: Briefcase,
      title: isEs ? 'Cliente exige certificación' : 'Client requires certification',
      description: isEs
        ? 'Tu cliente principal exige ISO 9001 para continuar la relación comercial.'
        : 'Your main client requires ISO 9001 to continue the business relationship.',
      color: 'turquesa'
    },
    {
      icon: Scale,
      title: isEs ? 'Industria regulada' : 'Regulated industry',
      description: isEs
        ? 'Sectores bancario, farmacéutico, alimentos o energía con requisitos regulatorios.'
        : 'Banking, pharmaceutical, food or energy sectors with regulatory requirements.',
      color: 'menta'
    },
    {
      icon: Globe,
      title: isEs ? 'Expansión internacional' : 'International expansion',
      description: isEs
        ? 'ISO 9001 facilita entrada a mercados internacionales con reconocimiento global.'
        : 'ISO 9001 facilitates entry to international markets with global recognition.',
      color: 'violeta'
    },
    {
      icon: TrendingUp,
      title: isEs ? 'Empresa en crecimiento' : 'Growing company',
      description: isEs
        ? 'Necesitas estandarizar operaciones para mantener calidad mientras escalas.'
        : 'You need to standardize operations to maintain quality while scaling.',
      color: 'turquesa'
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'Sistema informal' : 'Informal system',
      description: isEs
        ? 'Procesos no documentados generan inconsistencias. Necesitas sistema formal.'
        : 'Undocumented processes create inconsistencies. You need a formal system.',
      color: 'menta'
    },
    {
      icon: Target,
      title: isEs ? 'Licitaciones' : 'Tenders',
      description: isEs
        ? 'Certificación ISO 9001 es valorada en licitaciones públicas y privadas.'
        : 'ISO 9001 certification is valued in public and private tenders.',
      color: 'violeta'
    }
  ];

  // Methodology - 7 phases (compact descriptions)
  const methodology = [
    {
      phase: isEs ? 'FASE 1' : 'PHASE 1',
      title: isEs ? 'Diagnóstico Inicial' : 'Initial Diagnosis',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Evaluación del estado actual, brechas vs ISO 9001:2015 y plan de implementación.'
        : 'Current state evaluation, gaps vs ISO 9001:2015 and implementation plan.',
      icon: Search,
      color: 'turquesa'
    },
    {
      phase: isEs ? 'FASE 2' : 'PHASE 2',
      title: isEs ? 'Diseño del Sistema' : 'System Design',
      duration: isEs ? '2-3 semanas' : '2-3 weeks',
      description: isEs
        ? 'Arquitectura del SGC, procesos, responsabilidades y KPIs de calidad.'
        : 'QMS architecture, processes, responsibilities and quality KPIs.',
      icon: Settings,
      color: 'menta'
    },
    {
      phase: isEs ? 'FASE 3' : 'PHASE 3',
      title: isEs ? 'Documentación' : 'Documentation',
      duration: isEs ? '4-6 semanas' : '4-6 weeks',
      description: isEs
        ? 'Manual de calidad, procedimientos e instrucciones alineados a ISO 9001:2015.'
        : 'Quality manual, procedures and instructions aligned to ISO 9001:2015.',
      icon: FileText,
      color: 'violeta'
    },
    {
      phase: isEs ? 'FASE 4' : 'PHASE 4',
      title: isEs ? 'Implementación' : 'Implementation',
      duration: isEs ? '6-8 semanas' : '6-8 weeks',
      description: isEs
        ? 'Capacitación, controles de calidad y ajustes según feedback operativo.'
        : 'Training, quality controls and adjustments based on operational feedback.',
      icon: Zap,
      color: 'turquesa'
    },
    {
      phase: isEs ? 'FASE 5' : 'PHASE 5',
      title: isEs ? 'Auditoría Interna' : 'Internal Audit',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Auditoría por auditores certificados e identificación de no conformidades.'
        : 'Audit by certified auditors and non-conformity identification.',
      icon: ClipboardCheck,
      color: 'menta'
    },
    {
      phase: isEs ? 'FASE 6' : 'PHASE 6',
      title: isEs ? 'Correcciones' : 'Corrections',
      duration: isEs ? '2-4 semanas' : '2-4 weeks',
      description: isEs
        ? 'Acciones correctivas y preparación final para certificación.'
        : 'Corrective actions and final preparation for certification.',
      icon: RefreshCw,
      color: 'violeta'
    },
    {
      phase: isEs ? 'FASE 7' : 'PHASE 7',
      title: isEs ? 'Certificación' : 'Certification',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Simulación de auditoría y acompañamiento durante Stage 1 y Stage 2.'
        : 'Audit simulation and support during Stage 1 and Stage 2.',
      icon: Award,
      color: 'turquesa'
    }
  ];

  // What's Included
  const whatsIncluded = [
    {
      icon: FileText,
      title: isEs ? 'Documentación Completa' : 'Complete Documentation',
      description: isEs
        ? 'Manual de calidad, procedimientos, instrucciones de trabajo, formatos. Todo alineado a ISO 9001:2015 y adaptado a tu empresa.'
        : 'Quality manual, procedures, work instructions, forms. All aligned to ISO 9001:2015 and adapted to your company.',
      color: 'turquesa'
    },
    {
      icon: Users,
      title: isEs ? 'Capacitación' : 'Training',
      description: isEs
        ? 'Capacitación a todo el personal en procesos, controles de calidad, y uso del sistema. Transferencia de conocimiento para operación autónoma.'
        : 'Training for all staff on processes, quality controls, and system use. Knowledge transfer for autonomous operation.',
      color: 'menta'
    },
    {
      icon: ClipboardCheck,
      title: isEs ? 'Auditorías Internas' : 'Internal Audits',
      description: isEs
        ? 'Auditorías internas por auditores certificados ISO 9001 Lead Auditor. Identificación de no conformidades y plan de acciones correctivas.'
        : 'Internal audits by ISO 9001 Lead Auditor certified auditors. Non-conformity identification and corrective action plan.',
      color: 'violeta'
    },
    {
      icon: Shield,
      title: isEs ? 'Acompañamiento' : 'Support',
      description: isEs
        ? 'Acompañamiento durante toda la implementación. Reuniones regulares, resolución de dudas, ajustes según necesidades. Hasta certificación exitosa.'
        : 'Support throughout implementation. Regular meetings, question resolution, adjustments as needed. Until successful certification.',
      color: 'turquesa'
    }
  ];

  // Benefits stats
  const benefits = [
    {
      stat: '4-8',
      label: isEs ? 'meses' : 'months',
      description: isEs ? 'hasta certificación' : 'until certification',
      icon: Clock
    },
    {
      stat: '85%+',
      label: isEs ? 'aprobación' : 'approval',
      description: isEs ? 'primera auditoría' : 'first audit',
      icon: Award
    },
    {
      stat: '20-30%',
      label: isEs ? 'reducción' : 'reduction',
      description: isEs ? 'no conformidades' : 'non-conformities',
      icon: TrendingDown
    },
    {
      stat: '100%',
      label: isEs ? 'trazabilidad' : 'traceability',
      description: isEs ? 'procesos documentados' : 'documented processes',
      icon: FileCheck
    },
    {
      stat: '50%+',
      label: isEs ? 'reducción' : 'reduction',
      description: isEs ? 'quejas de clientes' : 'customer complaints',
      icon: BarChart3
    },
    {
      stat: '0',
      label: isEs ? 'riesgo' : 'risk',
      description: isEs ? 'pérdida de certificación' : 'certification loss',
      icon: Shield
    }
  ];

  // ISO 9001:2015 Requirements (Clauses 4-10)
  const isoRequirements = [
    {
      clause: '4',
      title: isEs ? 'Contexto de la Organización' : 'Context of the Organization',
      description: isEs
        ? 'Determinación de partes interesadas, alcance del sistema, procesos y su interacción. Comprensión de necesidades y expectativas.'
        : 'Determination of interested parties, system scope, processes and their interaction. Understanding of needs and expectations.',
      items: isEs
        ? ['Identificación de partes interesadas', 'Alcance del sistema de gestión de calidad', 'Procesos y sus interacciones']
        : ['Identification of interested parties', 'Quality management system scope', 'Processes and their interactions']
    },
    {
      clause: '5',
      title: isEs ? 'Liderazgo' : 'Leadership',
      description: isEs
        ? 'Compromiso de la dirección, política de calidad, roles, responsabilidades y autoridades. Cultura de calidad desde la alta dirección.'
        : 'Top management commitment, quality policy, roles, responsibilities and authorities. Quality culture from top management.',
      items: isEs
        ? ['Política de calidad', 'Roles y responsabilidades', 'Compromiso de la dirección']
        : ['Quality policy', 'Roles and responsibilities', 'Top management commitment']
    },
    {
      clause: '6',
      title: isEs ? 'Planificación' : 'Planning',
      description: isEs
        ? 'Riesgos y oportunidades, objetivos de calidad, planificación de cambios. Enfoque basado en riesgos para gestión proactiva.'
        : 'Risks and opportunities, quality objectives, change planning. Risk-based approach for proactive management.',
      items: isEs
        ? ['Acciones para riesgos y oportunidades', 'Objetivos de calidad', 'Planificación de cambios']
        : ['Actions for risks and opportunities', 'Quality objectives', 'Change planning']
    },
    {
      clause: '7',
      title: isEs ? 'Soporte' : 'Support',
      description: isEs
        ? 'Recursos, competencia, conciencia, comunicación, información documentada. Infraestructura y ambiente de trabajo adecuados.'
        : 'Resources, competence, awareness, communication, documented information. Adequate infrastructure and work environment.',
      items: isEs
        ? ['Recursos necesarios', 'Competencia del personal', 'Información documentada']
        : ['Necessary resources', 'Personnel competence', 'Documented information']
    },
    {
      clause: '8',
      title: isEs ? 'Operación' : 'Operation',
      description: isEs
        ? 'Planificación y control operacional, requisitos para productos y servicios, diseño y desarrollo, control de proveedores, producción y prestación del servicio, liberación de productos y servicios, control de no conformidades.'
        : 'Operational planning and control, requirements for products and services, design and development, supplier control, production and service provision, release of products and services, control of non-conformities.',
      items: isEs
        ? ['Planificación operacional', 'Control de proveedores', 'Control de no conformidades']
        : ['Operational planning', 'Supplier control', 'Control of non-conformities']
    },
    {
      clause: '9',
      title: isEs ? 'Evaluación del Desempeño' : 'Performance Evaluation',
      description: isEs
        ? 'Monitoreo, medición, análisis y evaluación. Auditoría interna, revisión por la dirección. Indicadores de calidad y mejora continua.'
        : 'Monitoring, measurement, analysis and evaluation. Internal audit, management review. Quality indicators and continuous improvement.',
      items: isEs
        ? ['Monitoreo y medición', 'Auditoría interna', 'Revisión por la dirección']
        : ['Monitoring and measurement', 'Internal audit', 'Management review']
    },
    {
      clause: '10',
      title: isEs ? 'Mejora' : 'Improvement',
      description: isEs
        ? 'No conformidades y acciones correctivas, mejora continua. Cultura de mejora permanente y aprendizaje organizacional.'
        : 'Non-conformities and corrective actions, continuous improvement. Culture of permanent improvement and organizational learning.',
      items: isEs
        ? ['No conformidades', 'Acciones correctivas', 'Mejora continua']
        : ['Non-conformities', 'Corrective actions', 'Continuous improvement']
    }
  ];

  // FAQs - Compact answers
  const faqs = [
    {
      question: isEs 
        ? '¿Cuánto tiempo toma implementar ISO 9001?' 
        : 'How long does it take to implement ISO 9001?',
      answer: isEs
        ? 'Típicamente 4-8 meses. Empresas pequeñas: 4-5 meses. Empresas medianas: 6-8 meses. Incluye implementación, auditorías internas y preparación para certificación.'
        : 'Typically 4-8 months. Small companies: 4-5 months. Medium companies: 6-8 months. Includes implementation, internal audits and certification preparation.'
    },
    {
      question: isEs 
        ? '¿Diferencia entre implementación y certificación?' 
        : 'Difference between implementation and certification?',
      answer: isEs
        ? 'Implementación es el proceso interno para diseñar y operar el sistema. Certificación es la evaluación externa que verifica cumplimiento y otorga el certificado. Alternative te acompaña en ambos.'
        : 'Implementation is the internal process to design and operate the system. Certification is the external evaluation that verifies compliance and grants the certificate. Alternative supports you in both.'
    },
    {
      question: isEs 
        ? '¿Necesito procesos perfectos para empezar?' 
        : 'Do I need perfect processes to start?',
      answer: isEs
        ? 'No. ISO 9001 requiere procesos documentados y en mejora continua, no perfectos. Documentamos lo que funciona y mejoramos lo que no.'
        : 'No. ISO 9001 requires documented processes with continuous improvement, not perfect ones. We document what works and improve what doesn\'t.'
    },
    {
      question: isEs 
        ? '¿Qué pasa si no paso la auditoría?' 
        : 'What if I don\'t pass the audit?',
      answer: isEs
        ? 'Con no conformidades menores, tienes 30-90 días para corregir. Con Alternative, 85%+ pasan la primera auditoría gracias a auditorías internas rigurosas previas.'
        : 'With minor non-conformities, you have 30-90 days to correct. With Alternative, 85%+ pass the first audit thanks to rigorous prior internal audits.'
    },
    {
      question: isEs 
        ? '¿Cuánto cuesta implementar ISO 9001?' 
        : 'How much does ISO 9001 implementation cost?',
      answer: isEs
        ? 'Depende del tamaño y complejidad. Incluye consultoría, documentación, capacitación y auditorías. Solicita cotización personalizada con diagnóstico gratuito.'
        : 'Depends on size and complexity. Includes consulting, documentation, training and audits. Request personalized quote with free diagnosis.'
    },
    {
      question: isEs 
        ? '¿Hay mantenimiento post-certificación?' 
        : 'Is there post-certification maintenance?',
      answer: isEs
        ? 'Sí. Auditorías internas anuales, revisión por dirección y mejora continua. Re-certificación cada 3 años. Alternative ofrece acompañamiento post-certificación.'
        : 'Yes. Annual internal audits, management review and continuous improvement. Re-certification every 3 years. Alternative offers post-certification support.'
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
                    {isEs ? 'Implementación ISO 9001' : 'ISO 9001 Implementation'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Sistemas de Calidad' : 'Quality Systems'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Implementación ISO 9001:2015 completa y certificable'
                  : 'Complete and certifiable ISO 9001:2015 implementation'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Implementamos sistemas de gestión de calidad ISO 9001:2015 desde cero. Metodología probada en 7 fases, documentación completa, capacitación, auditorías internas. Hasta certificación exitosa en 4-8 meses.'
                  : 'We implement ISO 9001:2015 quality management systems from scratch. Proven methodology in 7 phases, complete documentation, training, internal audits. Until successful certification in 4-8 months.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Solicitar Implementación' : 'Request Implementation'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#metodologia"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Ver metodología' : 'View methodology'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '4-8', label: isEs ? 'meses hasta certificación' : 'months to certification' },
                  { value: '85%+', label: isEs ? 'aprobación primera auditoría' : 'first audit approval' },
                  { icon: true, label: isEs ? 'Metodología probada' : 'Proven methodology' }
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
                      ISO 9001:2015
                    </span>
                  </div>

                  {/* Simulated ISO Process */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">{isEs ? 'Progreso Implementación' : 'Implementation Progress'}</span>
                      <span className="text-turquesa font-bold">75%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-turquesa to-menta rounded-full"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-turquesa">7</p>
                        <p className="text-xs text-white/60">{isEs ? 'Fases completadas' : 'Phases completed'}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-menta">0</p>
                        <p className="text-xs text-white/60">{isEs ? 'No conformidades' : 'Non-conformities'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-menta" />
                      <span>{isEs ? 'Sistema operativo' : 'System operational'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-menta" />
                      <span>{isEs ? 'Listo para certificación' : 'Ready for certification'}</span>
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
          WHAT IS ISO 9001 IMPLEMENTATION SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                               rounded-full text-sm font-medium mb-4">
                {isEs ? '¿Qué es?' : 'What is it?'}
              </span>
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs 
                  ? 'Implementación ISO 9001:2015'
                  : 'ISO 9001:2015 Implementation'}
              </h2>
              
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs 
                    ? 'Implementación ISO 9001 es el proceso de diseñar, documentar y operar un sistema de gestión de calidad (SGC) que cumple con los requisitos de la norma ISO 9001:2015. No es solo documentación: es transformar tu operación para que procesos estén controlados, medidos, y en mejora continua.'
                    : 'ISO 9001 implementation is the process of designing, documenting and operating a quality management system (QMS) that meets ISO 9001:2015 requirements. It\'s not just documentation: it\'s transforming your operation so processes are controlled, measured, and continuously improving.'}
                </p>
                <p>
                  <strong className="text-azul-marino dark:text-white">
                    {isEs ? 'Diferencia con certificación:' : 'Difference with certification:'}
                  </strong>{' '}
                  {isEs 
                    ? 'Implementación es el trabajo interno que haces con Alternative para tener el sistema funcionando. Certificación es la evaluación externa por un organismo certificador que verifica cumplimiento y otorga el certificado. Implementación es necesaria antes de certificación.'
                    : 'Implementation is the internal work you do with Alternative to have the system running. Certification is the external evaluation by a certification body that verifies compliance and grants the certificate. Implementation is necessary before certification.'}
                </p>
                <p>
                  <strong className="text-azul-marino dark:text-white">
                    {isEs ? 'Enfoque Alternative:' : 'Alternative approach:'}
                  </strong>{' '}
                  {isEs 
                    ? 'No implementamos burocracia. Implementamos sistemas pragmáticos que agregan valor real: procesos documentados que tu equipo usa, controles de calidad que previenen problemas, indicadores que guían decisiones. El sistema debe funcionar para tu empresa, no tu empresa para el sistema.'
                    : 'We don\'t implement bureaucracy. We implement pragmatic systems that add real value: documented processes your team uses, quality controls that prevent problems, indicators that guide decisions. The system must work for your company, not your company for the system.'}
                </p>
              </div>
            </AnimatedSection>

            {/* ISO 9001 Principles Visual */}
            <AnimatedSection delay={0.2}>
              <div className="bg-blanco-hueso dark:bg-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-4 text-center">
                  {isEs ? 'Principios ISO 9001:2015' : 'ISO 9001:2015 Principles'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: isEs ? 'Enfoque al cliente' : 'Customer focus', icon: Users },
                    { name: isEs ? 'Liderazgo' : 'Leadership', icon: Target },
                    { name: isEs ? 'Compromiso personas' : 'People engagement', icon: Users },
                    { name: isEs ? 'Enfoque procesos' : 'Process approach', icon: Settings },
                    { name: isEs ? 'Mejora continua' : 'Continuous improvement', icon: RefreshCw },
                    { name: isEs ? 'Decisiones basadas datos' : 'Evidence-based decisions', icon: BarChart3 },
                    { name: isEs ? 'Gestión relaciones' : 'Relationship management', icon: Briefcase }
                  ].map((principle, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 bg-white dark:bg-background p-3 rounded-xl 
                                 border border-gris-arena/20 hover:shadow-brand transition-all duration-300"
                    >
                      <div className="w-8 h-8 bg-turquesa/10 rounded-lg flex items-center justify-center">
                        <principle.icon className="w-4 h-4 text-turquesa" />
                      </div>
                      <span className="text-sm font-medium text-azul-marino dark:text-white">
                        {principle.name}
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
          FOR WHOM SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Para Quién Es' : 'Who Is It For'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Necesitas implementar ISO 9001?' : 'Do you need to implement ISO 9001?'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forWhom.map((item, idx) => {
              const colors = colorClasses[item.color as keyof typeof colorClasses];
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
                      <item.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          METHODOLOGY SECTION - 7 PHASES
          ===================================================== */}
      <section id="metodologia" className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-violeta/10 text-violeta 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Metodología' : 'Methodology'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Nuestra Metodología en 7 Fases' : 'Our Methodology in 7 Phases'}
            </h2>
            <p className="text-foreground/70 max-w-3xl mx-auto">
              {isEs 
                ? 'Proceso estructurado y probado que te lleva desde diagnóstico inicial hasta certificación exitosa. Cada fase tiene entregables claros y criterios de éxito definidos.'
                : 'Structured and proven process that takes you from initial diagnosis to successful certification. Each phase has clear deliverables and defined success criteria.'}
            </p>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line - Desktop */}
              <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-turquesa via-menta to-violeta" />
              
              <div className="space-y-8">
                {methodology.map((phase, idx) => {
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
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-azul-marino rounded-full 
                                          flex items-center justify-center text-white text-xs font-bold">
                            {idx + 1}
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 bg-blanco-hueso dark:bg-card p-6 rounded-2xl shadow-brand">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-sm font-bold ${colors.text}`}>
                              {phase.phase}
                            </span>
                            <span className="text-xl font-semibold text-azul-marino dark:text-white">
                              {phase.title}
                            </span>
                            <span className="ml-auto text-sm text-foreground/60">
                              {phase.duration}
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
          WHAT'S INCLUDED SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Qué Incluye' : 'What\'s Included'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Todo lo necesario para certificación exitosa' : 'Everything needed for successful certification'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {whatsIncluded.map((item, idx) => {
              const colors = colorClasses[item.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`bg-white dark:bg-background p-8 rounded-2xl shadow-brand 
                                hover:shadow-brand-lg transition-all duration-300
                                border ${colors.border} h-full`}
                  >
                    <div className={`w-16 h-16 ${colors.bg} rounded-2xl 
                                    flex items-center justify-center mb-6
                                    group-hover:scale-110 transition-transform`}>
                      <item.icon className={`w-8 h-8 ${colors.text}`} />
                    </div>

                    <h3 className="text-2xl font-semibold text-azul-marino dark:text-white mb-3">
                      {item.title}
                    </h3>

                    <p className="text-foreground/70 leading-relaxed">
                      {item.description}
                    </p>
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
                    {benefit.stat}
                  </div>
                  <div className="text-white/80 font-medium mb-1">{benefit.label}</div>
                  <p className="text-white/60 text-sm">{benefit.description}</p>
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
                        ? 'Empresa logística implementa ISO 9001 en 6 meses'
                        : 'Logistics company implements ISO 9001 in 6 months'}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left - Description */}
                  <div>
                    <div className="mb-6">
                      <p className="text-sm text-foreground/60 mb-2">
                        {isEs ? 'Empresa de Logística • 120 empleados' : 'Logistics Company • 120 employees'}
                      </p>
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Desafío' : 'Challenge'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Cliente principal (retail internacional) exigió certificación ISO 9001 como requisito para renovar contrato de $2M anual. Tenían 6 meses para certificarse o perderían el cliente. Procesos operativos existían pero no documentados. Calidad inconsistente generaba quejas frecuentes.'
                          : 'Main client (international retail) required ISO 9001 certification as requirement to renew $2M annual contract. They had 6 months to certify or lose the client. Operational processes existed but not documented. Inconsistent quality generated frequent complaints.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Implementación acelerada en 6 meses siguiendo metodología de 7 fases. Documentación pragmática enfocada en procesos críticos. Capacitación intensiva al personal. Auditorías internas rigurosas. Corrección proactiva de no conformidades. Certificación exitosa en tiempo récord.'
                          : 'Accelerated implementation in 6 months following 7-phase methodology. Pragmatic documentation focused on critical processes. Intensive staff training. Rigorous internal audits. Proactive non-conformity correction. Successful certification in record time.'}
                      </p>
                    </div>

                    <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                      {isEs 
                        ? '"Alternative no solo nos ayudó a certificarnos; transformó nuestra operación. Procesos documentados, controles de calidad, indicadores. Hoy tenemos calidad consistente y cero quejas del cliente principal."'
                        : '"Alternative not only helped us certify; they transformed our operation. Documented processes, quality controls, indicators. Today we have consistent quality and zero complaints from the main client."'}
                      <span className="block mt-2 text-sm text-turquesa not-italic font-medium">
                        — {isEs ? 'Gerente General' : 'General Manager'}, {isEs ? 'Empresa Logística' : 'Logistics Company'}
                      </span>
                    </blockquote>
                  </div>

                  {/* Right - Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '6', label: isEs ? 'meses' : 'months', sub: isEs ? 'hasta certificación' : 'to certification' },
                      { value: '0', label: isEs ? 'no conformidades' : 'non-conformities', sub: isEs ? 'mayores en auditoría' : 'major in audit' },
                      { value: '100%', label: isEs ? 'procesos' : 'processes', sub: isEs ? 'documentados' : 'documented' },
                      { value: '$2M', label: isEs ? 'contrato' : 'contract', sub: isEs ? 'retenido' : 'retained' },
                      { value: '0', label: isEs ? 'quejas' : 'complaints', sub: isEs ? 'cliente principal' : 'main client' },
                      { value: '95%', label: isEs ? 'satisfacción' : 'satisfaction', sub: isEs ? 'personal capacitado' : 'trained staff' }
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
      )}

      {/* =====================================================
          ISO 9001:2015 REQUIREMENTS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Requisitos ISO 9001:2015' : 'ISO 9001:2015 Requirements'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Estructura de la Norma (Cláusulas 4-10)' : 'Standard Structure (Clauses 4-10)'}
            </h2>
            <p className="text-foreground/70 max-w-3xl mx-auto">
              {isEs 
                ? 'ISO 9001:2015 está estructurada en 10 cláusulas. Las cláusulas 4-10 definen los requisitos del sistema de gestión de calidad que debes implementar.'
                : 'ISO 9001:2015 is structured in 10 clauses. Clauses 4-10 define the quality management system requirements you must implement.'}
            </p>
          </AnimatedSection>

          <AnimatedSection className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-background rounded-2xl p-8 shadow-brand">
              {isoRequirements.map((req, idx) => (
                <motion.div 
                  key={idx}
                  className="border-b border-gris-arena/20 last:border-0"
                  initial={false}
                >
                  <button
                    onClick={() => setOpenRequirement(openRequirement === idx ? null : idx)}
                    className="w-full py-6 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-turquesa/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-turquesa font-bold text-lg">{req.clause}</span>
                      </div>
                      <div className="text-left">
                        <span className="text-lg font-semibold text-azul-marino dark:text-white group-hover:text-turquesa transition-colors block">
                          {req.title}
                        </span>
                        <p className="text-sm text-foreground/60 mt-1">{req.description}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: openRequirement === idx ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-4"
                    >
                      <ChevronDown className="w-5 h-5 text-turquesa" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: openRequirement === idx ? 'auto' : 0,
                      opacity: openRequirement === idx ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-20">
                      <ul className="space-y-2">
                        {req.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/70 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
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
                  {isEs ? 'Implementación certificable' : 'Certifiable implementation'}
                </span>
              </div>
              
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs ? '¿Necesitas certificar ISO 9001?' : 'Do you need to certify ISO 9001?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Diagnóstico gratuito de 30 minutos. Evaluamos tu situación actual, identificamos brechas vs ISO 9001:2015, y te presentamos plan de implementación personalizado con timeline y presupuesto.'
                  : 'Free 30-minute diagnosis. We evaluate your current situation, identify gaps vs ISO 9001:2015, and present a personalized implementation plan with timeline and budget.'}
              </p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Evaluación de brechas vs ISO 9001:2015' : 'Gap assessment vs ISO 9001:2015',
                  isEs ? 'Plan de implementación personalizado' : 'Personalized implementation plan',
                  isEs ? 'Timeline realista (4-8 meses)' : 'Realistic timeline (4-8 months)',
                  isEs ? 'Presupuesto detallado sin sorpresas' : 'Detailed budget with no surprises'
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

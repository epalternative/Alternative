'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { IndustrySidebar } from '@/components/ui/industry-sidebar';
import {
  Landmark,
  ArrowRight,
  ChevronDown,
  Target,
  Settings,
  CheckCircle2,
  Clock,
  Users,
  FileText,
  AlertTriangle,
  Phone,
  Award,
  Briefcase,
  TrendingUp,
  Building2,
  Globe,
  Zap
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

export default function GobiernoSectorPublicoPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Industrias' : 'Industries', href: `/${locale}/industrias` },
    { label: isEs ? 'Gobierno y Sector Público' : 'Government & Public Sector', href: null }
  ];

  // Stats data
  const stats = [
    { value: '15+', label: isEs ? 'proyectos sector público' : 'public sector projects', icon: Briefcase },
    { value: 'PMP®', label: isEs ? 'PMs experiencia gubernamental' : 'PMs with government experience', icon: Target },
    { value: '100%', label: isEs ? 'Transparencia documentación completa' : 'Full transparency documentation', icon: FileText },
    { value: 'ISO 9001', label: isEs ? 'modernización del Estado' : 'State modernization', icon: Award }
  ];

  // Desafíos del sector
  const desafios = [
    {
      icon: FileText,
      title: isEs ? 'Procesos administrativos lentos y burocráticos' : 'Slow and bureaucratic administrative processes',
      description: isEs
        ? 'Trámites ciudadanos que toman semanas o meses, flujos de aprobación con múltiples niveles, documentación excesiva, procesos diseñados hace décadas sin modernización.'
        : 'Citizen procedures that take weeks or months, approval flows with multiple levels, excessive documentation, processes designed decades ago without modernization.',
      color: 'turquesa'
    },
    {
      icon: TrendingUp,
      title: isEs ? 'Presión por eficiencia con recursos limitados' : 'Efficiency pressure with limited resources',
      description: isEs
        ? 'Presupuestos fiscales restringidos, necesidad de hacer más con menos, reducir costos operativos sin afectar calidad de servicio público.'
        : 'Restricted fiscal budgets, need to do more with less, reduce operating costs without affecting public service quality.',
      color: 'menta'
    },
    {
      icon: Users,
      title: isEs ? 'Alta rotación de personal por cambios políticos' : 'High staff turnover due to political changes',
      description: isEs
        ? 'Cambios de administración (cada 4-5 años) generan rotación en posiciones clave. Proyectos quedan inconclusos o pierden momentum. Falta de continuidad institucional.'
        : 'Administration changes (every 4-5 years) generate turnover in key positions. Projects remain incomplete or lose momentum. Lack of institutional continuity.',
      color: 'violeta'
    },
    {
      icon: Globe,
      title: isEs ? 'Coordinación entre múltiples entidades' : 'Coordination between multiple entities',
      description: isEs
        ? 'Proyectos interinstitucionales requieren coordinación entre ministerios, municipalidades, autoridades. Sin mecanismos efectivos de coordinación, proyectos se atascan.'
        : 'Inter-institutional projects require coordination between ministries, municipalities, authorities. Without effective coordination mechanisms, projects get stuck.',
      color: 'turquesa'
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'Escrutinio público y transparencia obligatoria' : 'Public scrutiny and mandatory transparency',
      description: isEs
        ? 'Proyectos gubernamentales bajo escrutinio de medios, contraloría, ciudadanía. Necesidad de transparencia total, documentación exhaustiva, justificación de decisiones.'
        : 'Government projects under scrutiny from media, comptroller, citizens. Need for total transparency, exhaustive documentation, decision justification.',
      color: 'menta'
    },
    {
      icon: Clock,
      title: isEs ? 'Ejecución presupuestaria anual estricta' : 'Strict annual budget execution',
      description: isEs
        ? 'Presupuesto aprobado debe ejecutarse en año fiscal. Proyectos que no ejecutan presupuesto a tiempo pierden recursos (no arrastran a siguiente año). Presión por entregar en plazo.'
        : 'Approved budget must be executed in fiscal year. Projects that don\'t execute budget on time lose resources (don\'t carry over to next year). Pressure to deliver on deadline.',
      color: 'violeta'
    }
  ];

  // Servicios principales
  const servicios = [
    {
      icon: Target,
      title: isEs ? 'Gestión de Proyectos Públicos' : 'Public Project Management',
      description: isEs
        ? 'Project Managers PMP® certificados para gestionar proyectos públicos complejos: modernización de servicios ciudadanos, implementación de sistemas de información, infraestructura pública, proyectos de mejora de procesos.'
        : 'PMP® certified Project Managers to manage complex public projects: citizen service modernization, information system implementation, public infrastructure, process improvement projects.',
      tipos: isEs ? [
        'Modernización de Servicios Ciudadanos (digitalización de trámites, portales ciudadanos, gobierno electrónico)',
        'Implementación de Sistemas de Información (ERP gubernamental, gestión documental, SIGEF)',
        'Proyectos de Infraestructura (construcción/remodelación edificios públicos, infraestructura vial)',
        'Proyectos de Mejora de Procesos (optimización administrativa, eliminación de burocracia)'
      ] : [
        'Citizen Service Modernization (procedure digitization, citizen portals, e-government)',
        'Information System Implementation (government ERP, document management, SIGEF)',
        'Infrastructure Projects (public building construction/renovation, road infrastructure)',
        'Process Improvement Projects (administrative optimization, bureaucracy elimination)'
      ],
      color: 'turquesa'
    },
    {
      icon: Settings,
      title: isEs ? 'Optimización de Procesos Gubernamentales' : 'Government Process Optimization',
      description: isEs
        ? 'Mapeo y optimización de procesos administrativos gubernamentales para reducir tiempos de trámites, eliminar burocracia innecesaria, mejorar satisfacción ciudadana. Implementación de mejora continua en entidades públicas.'
        : 'Mapping and optimization of government administrative processes to reduce procedure times, eliminate unnecessary bureaucracy, improve citizen satisfaction. Continuous improvement implementation in public entities.',
      tipos: isEs ? [
        'Trámites ciudadanos (permisos, licencias, certificados)',
        'Procesos de contratación pública',
        'Procesos de gestión financiera y presupuestaria',
        'Procesos de recursos humanos',
        'Atención al ciudadano'
      ] : [
        'Citizen procedures (permits, licenses, certificates)',
        'Public procurement processes',
        'Financial and budget management processes',
        'Human resources processes',
        'Citizen service'
      ],
      resultados: isEs ? 'Reducción 40-60% tiempo de trámites, eliminación 30-50% pasos innecesarios, mejora satisfacción ciudadana 35-50%.' : '40-60% reduction in procedure times, elimination of 30-50% unnecessary steps, 35-50% improvement in citizen satisfaction.',
      color: 'menta'
    },
    {
      icon: CheckCircle2,
      title: isEs ? 'Sistemas de Calidad para Gobierno' : 'Quality Systems for Government',
      description: isEs
        ? 'Implementación de sistemas de gestión de calidad ISO 9001 en entidades gubernamentales. Estandarización de procesos, mejora de calidad de servicios públicos, preparación para certificación. Modernización del Estado con enfoque en calidad.'
        : 'ISO 9001 quality management system implementation in government entities. Process standardization, public service quality improvement, certification preparation. State modernization with quality focus.',
      beneficios: isEs ? [
        'Estandariza servicios públicos (calidad consistente)',
        'Reduce tiempos de trámites (procesos optimizados)',
        'Mejora satisfacción ciudadana (servicios predecibles)',
        'Demuestra compromiso con calidad y transparencia',
        'Facilita auditorías de contraloría (procesos documentados)'
      ] : [
        'Standardizes public services (consistent quality)',
        'Reduces procedure times (optimized processes)',
        'Improves citizen satisfaction (predictable services)',
        'Demonstrates commitment to quality and transparency',
        'Facilitates comptroller audits (documented processes)'
      ],
      color: 'violeta'
    }
  ];

  // FAQs
  const faqs = [
    {
      question: isEs ? '¿Alternative puede participar en licitaciones públicas?' : 'Can Alternative participate in public tenders?',
      answer: isEs
        ? 'Sí, Alternative participa en procesos de contratación pública bajo normativas locales. Tenemos experiencia presentando propuestas técnicas y económicas, cumpliendo requisitos documentales, y ejecutando contratos públicos. Si entidad requiere licitación, acompañamos en diseño de términos de referencia y participamos formalmente. También trabajamos bajo contratación directa (menor cuantía) cuando aplica según normativas locales.'
        : 'Yes, Alternative participates in public procurement processes under local regulations. We have experience presenting technical and economic proposals, meeting documentary requirements, and executing public contracts. If entity requires tender, we support in terms of reference design and participate formally. We also work under direct contracting (lower amount) when applicable according to local regulations.'
    },
    {
      question: isEs ? '¿Cómo Alternative maneja cambios de administración en medio de proyecto?' : 'How does Alternative handle administration changes during project?',
      answer: isEs
        ? 'Cambios políticos son realidad del sector público. Estrategia: (1) Documentación exhaustiva: Todo decisiones/avances documentados (facilita transición), (2) Enfoque técnico: Proyecto justificado técnicamente (trasciende cambios políticos), (3) Flexibilidad: Adaptamos alcance si nueva administración prioriza diferente, (4) Continuidad: PM Alternative mantiene continuidad institucional (conocimiento no se pierde). Experiencia: 70% proyectos sobreviven cambios de administración con ajustes menores.'
        : 'Political changes are reality of public sector. Strategy: (1) Exhaustive documentation: All decisions/advances documented (facilitates transition), (2) Technical approach: Project technically justified (transcends political changes), (3) Flexibility: We adapt scope if new administration prioritizes differently, (4) Continuity: Alternative PM maintains institutional continuity (knowledge not lost). Experience: 70% of projects survive administration changes with minor adjustments.'
    },
    {
      question: isEs ? '¿Proyectos gubernamentales son más lentos que privados?' : 'Are government projects slower than private ones?',
      answer: isEs
        ? 'Típicamente sí, pero no necesariamente. Factores que ralentizan: Procedimientos de contratación pública (meses), aprobaciones múltiples niveles, coordinación interinstitucional compleja. Cómo Alternative acelera: PM gestionando proactivamente aprobaciones, coordinando stakeholders efectivamente, anticipando cuellos de botella burocráticos. Proyecto privado equivalente: 6 meses. Proyecto gubernamental bien gestionado: 8-10 meses. Sin gestión: 18-24 meses.'
        : 'Typically yes, but not necessarily. Factors that slow down: Public procurement procedures (months), multiple level approvals, complex inter-institutional coordination. How Alternative accelerates: PM proactively managing approvals, effectively coordinating stakeholders, anticipating bureaucratic bottlenecks. Equivalent private project: 6 months. Well-managed government project: 8-10 months. Without management: 18-24 months.'
    },
    {
      question: isEs ? '¿Entidades públicas pueden permitirse consultoría externa?' : 'Can public entities afford external consulting?',
      answer: isEs
        ? 'Sí, cuando retorno justifica inversión. Análisis: Municipalidad invierte $80K en optimización. Ahorro: 40% eficiencia funcionarios en productividad + mejora satisfacción ciudadana (intangible pero valioso). ROI: 150%+ primer año. Financiamiento: Presupuesto operativo, cooperación internacional, préstamos multilaterales (BID, Banco Mundial frecuentemente financian modernización del Estado). Consultoría es inversión, no gasto.'
        : 'Yes, when return justifies investment. Analysis: Municipality invests $80K in optimization. Savings: 40% employee efficiency in productivity + improved citizen satisfaction (intangible but valuable). ROI: 150%+ first year. Financing: Operating budget, international cooperation, multilateral loans (IDB, World Bank frequently finance state modernization). Consulting is investment, not expense.'
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
      <IndustrySidebar locale={locale} currentIndustry="gobierno-sector-publico" />

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
                  <Landmark className="w-8 h-8 text-azul-marino" />
                </div>
                <div>
                  <span className="text-azul-marino text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Gobierno y Sector Público' : 'Government & Public Sector'}
                  </span>
                  <p className="text-azul-marino/60 text-sm">
                    {isEs ? 'Industrias' : 'Industries'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-azul-marino font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Consultoría para entidades gubernamentales: gestión de proyectos y modernización'
                  : 'Consulting for government entities: project management and modernization'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-azul-marino/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Gestión de proyectos públicos complejos, optimización de procesos gubernamentales, implementación de sistemas de calidad, modernización de servicios públicos. PMs certificados con experiencia en contratación pública y normativas gubernamentales.'
                  : 'Complex public project management, government process optimization, quality system implementation, public service modernization. Certified PMs with experience in public procurement and government regulations.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-azul-marino text-white 
                             font-semibold px-6 py-3 rounded-lg hover:bg-azul-marino/90 
                             transition-all duration-300 shadow-lg shadow-azul-marino/20 group"
                >
                  {isEs ? 'Solicita PM para Proyecto Público' : 'Request PM for Public Project'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/casos-exito`}
                  className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm 
                             text-azul-marino font-medium px-6 py-3 rounded-lg 
                             hover:bg-white transition-all duration-300 border border-azul-marino/20"
                >
                  {isEs ? 'Ver casos sector público' : 'View public sector cases'}
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

            {/* Right Visual - Government Stats Panel */}
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
                      {isEs ? 'Sector Público' : 'Public Sector'}
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
                        { label: isEs ? 'Satisfacción Cliente' : 'Client Satisfaction', progress: 92, color: 'menta' },
                        { label: isEs ? 'Transparencia' : 'Transparency', progress: 100, color: 'violeta' }
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
                  <Landmark className="w-8 h-8 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECCIÓN 2: POR QUÉ ALTERNATIVE ENTIENDE SECTOR PÚBLICO
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-6">
              {isEs ? 'Entendemos las particularidades del sector gubernamental' : 'We understand the particularities of the government sector'}
            </h2>
            <div className="space-y-4 text-azul-marino/70 leading-relaxed mb-8">
              <p>
                {isEs 
                  ? 'Entidades gubernamentales operan con desafíos únicos: procedimientos de contratación pública estrictos, presupuestos fiscales con ejecución anual rigurosa, múltiples stakeholders políticos y técnicos, alta rotación de personal por cambios de administración, escrutinio público y transparencia obligatoria, necesidad de servir al ciudadano eficientemente con recursos limitados. Proyectos gubernamentales frecuentemente se retrasan o fracasan por complejidad de coordinación y falta de gestión especializada.'
                  : 'Government entities operate with unique challenges: strict public procurement procedures, fiscal budgets with rigorous annual execution, multiple political and technical stakeholders, high staff turnover due to administration changes, public scrutiny and mandatory transparency, need to serve citizens efficiently with limited resources. Government projects frequently delay or fail due to coordination complexity and lack of specialized management.'}
              </p>
              <p>
                {isEs 
                  ? 'Alternative ha gestionado proyectos en entidades públicas: modernización de servicios ciudadanos, implementación de sistemas de gestión, optimización de procesos administrativos, proyectos de infraestructura pública. Entendemos procedimientos de contratación pública (licitaciones), normativas de transparencia, necesidad de documentación exhaustiva, coordinación con múltiples niveles jerárquicos, y presión por ejecución presupuestaria dentro de año fiscal.'
                  : 'Alternative has managed projects in public entities: citizen service modernization, management system implementation, administrative process optimization, public infrastructure projects. We understand public procurement procedures (tenders), transparency regulations, need for exhaustive documentation, coordination with multiple hierarchical levels, and pressure for budget execution within fiscal year.'}
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
          SECCIÓN 3: DESAFÍOS DEL SECTOR PÚBLICO
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-turquesa/5">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-4">
              {isEs ? 'Desafíos críticos de entidades gubernamentales' : 'Critical challenges of government entities'}
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
          SECCIÓN 4: NUESTROS SERVICIOS PARA GOBIERNO
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-4">
              {isEs ? 'Cómo Alternative apoya a entidades gubernamentales' : 'How Alternative supports government entities'}
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
                        {servicio.tipos && (
                          <>
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
                          </>
                        )}
                        {servicio.resultados && (
                          <div className="mt-3">
                            <div className={`${colors.text} font-semibold text-xs mb-1`}>
                              {isEs ? 'Resultados típicos:' : 'Typical results:'}
                            </div>
                            <p className="text-azul-marino/70 text-xs">{servicio.resultados}</p>
                          </div>
                        )}
                        {servicio.beneficios && (
                          <div className="mt-3">
                            <div className={`${colors.text} font-semibold text-xs mb-2`}>
                              {isEs ? 'Por qué ISO 9001 en gobierno:' : 'Why ISO 9001 in government:'}
                            </div>
                            <ul className="space-y-1">
                              {servicio.beneficios.map((beneficio, beneficioIdx) => (
                                <li key={beneficioIdx} className="text-azul-marino/60 text-sm flex items-start gap-2">
                                  <div className={`w-1.5 h-1.5 ${colors.bg.replace('/10', '')} rounded-full mt-1.5 flex-shrink-0`} />
                                  {beneficio}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <Link
                        href={`/${locale}/contacto`}
                        className="inline-flex items-center gap-2 text-turquesa font-medium text-sm 
                                 hover:text-azul-marino transition-colors mt-auto"
                      >
                        {idx === 0 ? (isEs ? 'Solicita PM para Proyecto Gubernamental' : 'Request PM for Government Project') :
                         idx === 1 ? (isEs ? 'Ver Optimización de Procesos' : 'View Process Optimization') :
                         (isEs ? 'Ver ISO 9001' : 'View ISO 9001')}
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
          SECCIÓN 5: CASO DE ÉXITO - HIDDEN FOR VALIDATION
          ===================================================== */}
      {false && (
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
                    {isEs ? 'Municipalidad reduce tiempos de trámites 55% con optimización + digitalización' : 'Municipality reduces procedure times 55% with optimization + digitization'}
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
                        ? 'Municipalidad mediana (150K habitantes, 200 funcionarios)'
                        : 'Medium municipality (150K inhabitants, 200 employees)'}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-azul-marino mb-2">
                      {isEs ? 'Situación' : 'Situation'}
                    </h4>
                    <p className="text-azul-marino/70">
                      {isEs 
                        ? 'Municipalidad con procesos administrativos obsoletos: trámites ciudadanos tomando semanas (permisos construcción 45 días, licencias comerciales 30 días), quejas ciudadanas aumentando, procesos 95% en papel, múltiples visitas presenciales requeridas, sin visibilidad de estado de trámites. Nuevo alcalde con mandato de modernización: "ciudadanos merecen servicios eficientes."'
                        : 'Municipality with obsolete administrative processes: citizen procedures taking weeks (construction permits 45 days, commercial licenses 30 days), increasing citizen complaints, 95% paper processes, multiple in-person visits required, no visibility of procedure status. New mayor with modernization mandate: "citizens deserve efficient services."'}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-azul-marino mb-2">
                      {isEs ? 'Objetivo' : 'Objective'}
                    </h4>
                    <p className="text-azul-marino/70">
                      {isEs 
                        ? 'Reducir tiempos de trámites 50%+ mediante optimización de procesos + digitalización de servicios.'
                        : 'Reduce procedure times 50%+ through process optimization + service digitization.'}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-azul-marino mb-2">
                      {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                    </h4>
                    <p className="text-azul-marino/70 mb-3">
                      {isEs 
                        ? 'Proyecto de modernización (8 meses, PM Alternative):'
                        : 'Modernization project (8 months, Alternative PM):'}
                    </p>
                    <div className="space-y-3 text-sm">
                      {[
                        { mes: isEs ? 'Mes 1-2' : 'Month 1-2', accion: isEs ? 'Diagnóstico - Mapeo de 12 trámites más frecuentes, análisis de tiempos y cuellos de botella, identificación de pasos innecesarios' : 'Diagnosis - Mapping of 12 most frequent procedures, time and bottleneck analysis, identification of unnecessary steps' },
                        { mes: isEs ? 'Mes 3-5' : 'Month 3-5', accion: isEs ? 'Optimización + Diseño Digital - Re-diseño de 12 procesos optimizados, diseño de portal ciudadano digital, flujos de aprobación digitales' : 'Optimization + Digital Design - Re-design of 12 optimized processes, digital citizen portal design, digital approval flows' },
                        { mes: isEs ? 'Mes 6-7' : 'Month 6-7', accion: isEs ? 'Implementación - Portal ciudadano lanzado, sistema de gestión documental implementado, workflows digitales configurados, capacitación a 200 funcionarios' : 'Implementation - Citizen portal launched, document management system implemented, digital workflows configured, training to 200 employees' },
                        { mes: isEs ? 'Mes 8' : 'Month 8', accion: isEs ? 'Go-live y acompañamiento - Lanzamiento con campaña comunicación ciudadana, soporte intensivo primeras semanas, ajustes basados en uso real' : 'Go-live and support - Launch with citizen communication campaign, intensive support first weeks, adjustments based on real usage' }
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
                    {isEs ? 'Resultados (6 meses post-implementación)' : 'Results (6 months post-implementation)'}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { value: '-55%', label: isEs ? 'Tiempo promedio trámites' : 'Average procedure time', sub: isEs ? '35 días → 16 días' : '35 days → 16 days' },
                      { value: '-60%', label: isEs ? 'Permisos construcción' : 'Construction permits', sub: isEs ? '45 días → 18 días' : '45 days → 18 days' },
                      { value: '-60%', label: isEs ? 'Licencias comerciales' : 'Commercial licenses', sub: isEs ? '30 días → 12 días' : '30 days → 12 days' },
                      { value: '-80%', label: isEs ? 'Visitas presenciales' : 'In-person visits', sub: isEs ? '3-5 → 0-1' : '3-5 → 0-1' },
                      { value: '65%', label: isEs ? 'Trámites online' : 'Online procedures', sub: isEs ? '0% → 65%' : '0% → 65%' },
                      { value: '78%', label: isEs ? 'Satisfacción ciudadana' : 'Citizen satisfaction', sub: isEs ? '42% → 78%' : '42% → 78%' },
                      { value: '-70%', label: isEs ? 'Quejas' : 'Complaints', sub: '' },
                      { value: '+40%', label: isEs ? 'Eficiencia funcionarios' : 'Employee efficiency', sub: '' }
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
                      ? '"Modernización transformó municipalidad. Trámites 55% más rápidos, ciudadanos felices (78% satisfacción), funcionarios más eficientes. Cumplimos promesa de modernizar."'
                      : '"Modernization transformed municipality. Procedures 55% faster, happy citizens (78% satisfaction), more efficient employees. We fulfilled modernization promise."'}
                    <span className="block mt-2 text-sm text-turquesa not-italic font-medium">
                      — {isEs ? 'Alcalde Municipal' : 'Municipal Mayor'}
                    </span>
                  </blockquote>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

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
                {isEs ? '¿Tu entidad pública necesita modernización o gestión de proyectos?' : 'Does your public entity need modernization or project management?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Evaluación gratuita de 30 minutos. Analizamos situación actual y recomendamos proyecto apropiado de modernización.'
                  : 'Free 30-minute evaluation. We analyze current situation and recommend appropriate modernization project.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Evaluación de procesos administrativos actuales' : 'Evaluation of current administrative processes',
                  isEs ? 'Identificación de oportunidades de mejora' : 'Identification of improvement opportunities',
                  isEs ? 'Recomendación de proyecto (optimización, digitalización, PM)' : 'Project recommendation (optimization, digitization, PM)',
                  isEs ? 'Estimación de timeline y costo' : 'Timeline and cost estimation',
                  isEs ? 'Propuesta técnica preliminar' : 'Preliminary technical proposal'
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
                    {isEs ? 'Solicitar Evaluación para Sector Público' : 'Request Public Sector Evaluation'}
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

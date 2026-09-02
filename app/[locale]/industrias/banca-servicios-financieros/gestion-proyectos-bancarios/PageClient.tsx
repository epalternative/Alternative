'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import {
  Target,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Clock,
  Users,
  Shield,
  FileText,
  Building2,
  Phone,
  Rocket,
  Settings,
  Database,
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

export default function GestionProyectosBancariosPage() {
  const locale = useLocale();
  const isEs = locale === 'es';

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Industrias' : 'Industries', href: `/${locale}/industrias` },
    { label: isEs ? 'Banca y Servicios Financieros' : 'Banking & Financial Services', href: `/${locale}/industrias/banca-servicios-financieros` },
    { label: isEs ? 'Gestión de Proyectos Bancarios' : 'Banking Project Management', href: null }
  ];

  const tiposProyectos = [
    {
      title: isEs ? 'Implementaciones de Core Bancario' : 'Core Banking Implementations',
      description: isEs
        ? 'Migración o actualización de sistemas core. Coordinación con vendor, gestión de testing exhaustivo, migración de datos, cutover planificado para minimizar downtime, rollback plan si problemas.'
        : 'Core system migration or update. Vendor coordination, exhaustive testing management, data migration, planned cutover to minimize downtime, rollback plan if problems.',
      duration: isEs ? '6-18 meses' : '6-18 months',
      budget: isEs ? '$500K-$3M' : '$500K-$3M',
      icon: Database
    },
    {
      title: isEs ? 'Transformación Digital Bancaria' : 'Banking Digital Transformation',
      description: isEs
        ? 'Implementación de banca móvil, onboarding digital de clientes, pagos instantáneos, APIs para fintech partners. Coordinación entre IT, negocio, UX, seguridad.'
        : 'Mobile banking implementation, digital customer onboarding, instant payments, APIs for fintech partners. Coordination between IT, business, UX, security.',
      duration: isEs ? '4-12 meses' : '4-12 months',
      budget: isEs ? 'Variable' : 'Variable',
      icon: Rocket
    },
    {
      title: isEs ? 'Proyectos de Cumplimiento Regulatorio' : 'Regulatory Compliance Projects',
      description: isEs
        ? 'Implementación de sistemas AML/CFT, controles internos para cumplir Acuerdos SBP, preparación para supervisiones, remediación de observaciones regulatorias.'
        : 'AML/CFT system implementation, internal controls to comply with SBP Agreements, inspection preparation, regulatory observation remediation.',
      duration: isEs ? '3-9 meses' : '3-9 months',
      budget: isEs ? 'Variable' : 'Variable',
      icon: Shield
    },
    {
      title: isEs ? 'Certificaciones ISO (9001, 27001)' : 'ISO Certifications (9001, 27001)',
      description: isEs
        ? 'Gestión de proyectos de certificación: diagnóstico, diseño de sistema, documentación, implementación, auditorías internas, preparación para certificación.'
        : 'Certification project management: diagnosis, system design, documentation, implementation, internal audits, certification preparation.',
      duration: isEs ? '6-12 meses' : '6-12 months',
      budget: isEs ? 'Variable' : 'Variable',
      icon: CheckCircle2
    },
    {
      title: isEs ? 'Integraciones y Desarrollo de Software' : 'Integrations and Software Development',
      description: isEs
        ? 'Integración de sistemas (core + CRM + canales digitales), desarrollo de herramientas internas bancarias, portales de clientes.'
        : 'System integration (core + CRM + digital channels), internal banking tool development, customer portals.',
      duration: isEs ? '3-8 meses' : '3-8 months',
      budget: isEs ? 'Variable' : 'Variable',
      icon: Settings
    }
  ];

  return (
    <>
      <ReadingProgress />

      {/* HERO SECTION */}
      <section className="relative bg-turquesa overflow-hidden">
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
        </div>

        <div className="container-custom relative z-10 pt-8 pb-16 lg:pb-20">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {idx > 0 && <ChevronDown className="w-4 h-4 text-azul-marino/40 -rotate-90" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="text-azul-marino/60 hover:text-azul-marino transition-colors">
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
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-azul-marino/20 rounded-2xl flex items-center justify-center border border-azul-marino/30">
                  <Target className="w-8 h-8 text-azul-marino" />
                </div>
                <div>
                  <span className="text-azul-marino text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Gestión de Proyectos Bancarios' : 'Banking Project Management'}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl text-azul-marino font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Project Managers certificados para proyectos críticos en instituciones financieras'
                  : 'Certified Project Managers for critical projects in financial institutions'}
              </h1>

              <p className="text-lg md:text-xl text-azul-marino/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'PMs PMP® con experiencia específica en sector bancario regulado. Gestionamos proyectos de transformación digital, implementaciones de core bancario, cumplimiento regulatorio, certificaciones. Metodología probada para proyectos 24/7 donde falla no es opción.'
                  : 'PMP® PMs with specific experience in regulated banking sector. We manage digital transformation projects, core banking implementations, regulatory compliance, certifications. Proven methodology for 24/7 projects where failure is not an option.'}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-azul-marino text-white font-semibold px-6 py-3 rounded-lg hover:bg-azul-marino/90 transition-all duration-300 shadow-lg shadow-azul-marino/20 group"
                >
                  {isEs ? 'Solicita PM para tu Proyecto Bancario' : 'Request PM for your Banking Project'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Right Visual - PM Panel */}
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
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-turquesa" />
                    <div className="w-3 h-3 rounded-full bg-menta" />
                    <div className="w-3 h-3 rounded-full bg-violeta" />
                    <span className="ml-auto text-azul-marino/40 text-sm font-medium">
                      {isEs ? 'PM Certificado' : 'Certified PM'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: isEs ? 'PMP® Certificado' : 'PMP® Certified', icon: Target, value: '100%' },
                      { label: isEs ? 'Experiencia Banca' : 'Banking Experience', icon: Clock, value: '10+ años' },
                      { label: isEs ? 'Proyectos Exitosos' : 'Successful Projects', icon: CheckCircle2, value: '95%' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-turquesa/10 rounded-xl p-4 border border-turquesa/20">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <item.icon className="w-5 h-5 text-azul-marino" />
                            <span className="text-sm text-azul-marino/70">{item.label}</span>
                          </div>
                          <span className="text-lg font-bold text-azul-marino">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-turquesa rounded-2xl p-4 shadow-xl"
                >
                  <Target className="w-8 h-8 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-4xl mx-auto">
            <p className="text-lg text-azul-marino/70 leading-relaxed">
              {isEs 
                ? 'Proyectos bancarios son únicos en complejidad: sistemas críticos operando 24/7, múltiples stakeholders (negocio, IT, riesgos, cumplimiento, auditoría), regulación estricta de SBP, presión por no afectar servicio al cliente, ventanas de implementación limitadas (madrugadas, fines de semana). 60% de proyectos de transformación bancaria fallan o se retrasan significativamente por falta de gestión especializada. Alternative provee Project Managers PMP® certificados con experiencia específica en sector financiero que entienden estas complejidades y gestionan proyectos críticos exitosamente.'
                : 'Banking projects are unique in complexity: critical systems operating 24/7, multiple stakeholders (business, IT, risks, compliance, audit), strict SBP regulation, pressure not to affect customer service, limited implementation windows (early mornings, weekends). 60% of banking transformation projects fail or are significantly delayed due to lack of specialized management. Alternative provides PMP® certified Project Managers with specific experience in financial sector who understand these complexities and successfully manage critical projects.'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CÓMO ALTERNATIVE AYUDA */}
      <section className="py-20 lg:py-32 bg-turquesa/5">
        <div className="container-custom">
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-4">
              {isEs ? 'Qué incluye nuestro servicio de gestión de proyectos bancarios' : 'What our banking project management service includes'}
            </h2>
          </AnimatedSection>

          {/* Project Managers Certificados */}
          <AnimatedSection className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-brand border border-gris-arena/20">
              <h3 className="text-2xl font-semibold text-azul-marino mb-6">
                {isEs ? 'PROJECT MANAGERS CERTIFICADOS PARA BANCA' : 'CERTIFIED PROJECT MANAGERS FOR BANKING'}
              </h3>
              <p className="text-azul-marino/70 mb-6">
                {isEs ? 'Proveemos PMs con perfil específico:' : 'We provide PMs with specific profile:'}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  isEs ? 'Certificación PMP® (Project Management Professional del PMI)' : 'PMP® certification (Project Management Professional from PMI)',
                  isEs ? 'Experiencia en sector financiero regulado (3-10+ años en proyectos bancarios)' : 'Experience in regulated financial sector (3-10+ years in banking projects)',
                  isEs ? 'Conocimiento de regulación SBP y compliance bancario' : 'Knowledge of SBP regulation and banking compliance',
                  isEs ? 'Experiencia en sistemas core (Temenos, Bantotal, FIS, Cobis)' : 'Experience with core systems (Temenos, Bantotal, FIS, Cobis)',
                  isEs ? 'Gestión de riesgos operacionales en entornos 24/7' : 'Operational risk management in 24/7 environments'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span className="text-azul-marino/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Tipos de Proyectos */}
          <AnimatedSection className="mb-12">
            <h3 className="text-2xl font-semibold text-azul-marino mb-6">
              {isEs ? 'TIPOS DE PROYECTOS QUE GESTIONAMOS' : 'TYPES OF PROJECTS WE MANAGE'}
            </h3>
            <StaggerContainer className="space-y-6">
              {tiposProyectos.map((proyecto, idx) => (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="bg-white rounded-2xl p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300 border border-gris-arena/20"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <proyecto.icon className="w-7 h-7 text-turquesa" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-azul-marino mb-2">
                          {proyecto.title}
                        </h4>
                        <p className="text-azul-marino/70 mb-4">
                          {proyecto.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-turquesa">
                            <Clock className="w-4 h-4" />
                            <span className="text-azul-marino/70">{proyecto.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-turquesa">
                            <Zap className="w-4 h-4" />
                            <span className="text-azul-marino/70">{isEs ? 'Presupuesto:' : 'Budget:'} {proyecto.budget}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatedSection>

          {/* Metodología */}
          <AnimatedSection>
            <div className="bg-white rounded-2xl p-8 shadow-brand border border-gris-arena/20">
              <h3 className="text-2xl font-semibold text-azul-marino mb-6">
                {isEs ? 'METODOLOGÍA DE GESTIÓN' : 'MANAGEMENT METHODOLOGY'}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: isEs ? 'Planificación Rigurosa' : 'Rigorous Planning',
                    items: [
                      isEs ? 'Alcance claramente definido con stakeholders' : 'Clearly defined scope with stakeholders',
                      isEs ? 'Cronograma realista con buffers para imprevistos bancarios' : 'Realistic schedule with buffers for banking contingencies',
                      isEs ? 'Identificación temprana de riesgos (regulatorios, operacionales, técnicos)' : 'Early risk identification (regulatory, operational, technical)',
                      isEs ? 'Plan de comunicación multinivel (ejecutivo, gerencial, operativo)' : 'Multi-level communication plan (executive, managerial, operational)'
                    ]
                  },
                  {
                    title: isEs ? 'Ejecución Disciplinada' : 'Disciplined Execution',
                    items: [
                      isEs ? 'Reuniones de seguimiento semanales con steering committee' : 'Weekly follow-up meetings with steering committee',
                      isEs ? 'Gestión proactiva de riesgos e issues' : 'Proactive risk and issue management',
                      isEs ? 'Control de cambios estricto (change control board)' : 'Strict change control (change control board)',
                      isEs ? 'Coordinación con operaciones para ventanas de implementación' : 'Coordination with operations for implementation windows'
                    ]
                  },
                  {
                    title: isEs ? 'Enfoque en Cumplimiento' : 'Compliance Focus',
                    items: [
                      isEs ? 'Documentación exhaustiva (requerida por auditoría y SBP)' : 'Exhaustive documentation (required by audit and SBP)',
                      isEs ? 'Trazabilidad completa de decisiones' : 'Complete decision traceability',
                      isEs ? 'Gestión de aprobaciones formales' : 'Formal approval management',
                      isEs ? 'Testing riguroso antes de go-live' : 'Rigorous testing before go-live'
                    ]
                  }
                ].map((metodo, idx) => (
                  <div key={idx} className="bg-turquesa/5 rounded-xl p-6 border border-turquesa/20">
                    <h4 className="font-semibold text-azul-marino mb-4">{metodo.title}</h4>
                    <ul className="space-y-2">
                      {metodo.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0 mt-0.5" />
                          <span className="text-azul-marino/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CASO DE ÉXITO - HIDDEN FOR VALIDATION */}
      {false && (
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-blanco-hueso rounded-3xl p-8 lg:p-12 overflow-hidden relative shadow-brand-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa font-medium text-sm uppercase tracking-wider">
                    {isEs ? 'Caso de Éxito' : 'Success Story'}
                  </span>
                  <h3 className="text-xl font-semibold text-azul-marino">
                    {isEs ? 'PM Alternative rescata implementación core bancario de $2M' : 'Alternative PM rescues $2M core banking implementation'}
                  </h3>
                </div>
              </div>

              <div className="space-y-6 text-azul-marino/70">
                <div>
                  <h4 className="font-semibold text-azul-marino mb-2">{isEs ? 'Situación' : 'Situation'}</h4>
                  <p>
                    {isEs 
                      ? 'Banco mediano implementando nuevo core bancario (Temenos). Proyecto liderado por gerente IT interno sin experiencia en proyectos de esta magnitud. A mes 8 de 12: proyecto 4 meses atrasado, presupuesto excedido 30%, testing incompleto, equipo desmotivado, vendor amenazando con clausulas contractuales. Junta directiva escaló a CEO: "rescaten este proyecto o cancelamos (perdiendo $800K ya invertidos)."'
                      : 'Medium bank implementing new core banking (Temenos). Project led by internal IT manager without experience in projects of this magnitude. At month 8 of 12: project 4 months delayed, budget exceeded 30%, incomplete testing, demotivated team, vendor threatening with contractual clauses. Board escalated to CEO: "rescue this project or we cancel (losing $800K already invested)."'}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-azul-marino mb-2">{isEs ? 'Solución Alternative' : 'Alternative Solution'}</h4>
                  <p className="mb-3">
                    {isEs 
                      ? 'CEO contrató PM Senior PMP® de Alternative para rescate del proyecto:'
                      : 'CEO hired Alternative Senior PMP® PM for project rescue:'}
                  </p>
                  <ul className="space-y-2 text-sm">
                    {[
                      isEs ? 'Semana 1-2: Diagnóstico rápido - Identificó problemas raíz: alcance mal definido, cambios no controlados, testing insuficiente, falta de coordinación vendor-banco' : 'Week 1-2: Quick diagnosis - Identified root problems: poorly defined scope, uncontrolled changes, insufficient testing, lack of vendor-bank coordination',
                      isEs ? 'Mes 1-4: Re-planificación y ejecución - Re-definió alcance con sponsor, implementó change control riguroso, aceleró testing con plan intensivo, negoció con vendor extensión 3 meses sin penalidad' : 'Month 1-4: Re-planning and execution - Re-defined scope with sponsor, implemented rigorous change control, accelerated testing with intensive plan, negotiated 3-month extension with vendor without penalty'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-azul-marino mb-2">{isEs ? 'Resultado' : 'Result'}</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { value: '✅', label: isEs ? 'Proyecto completado en 4 meses adicionales (total 16 vs 12 original)' : 'Project completed in 4 additional months (total 16 vs 12 original)' },
                      { value: '✅', label: isEs ? 'Go-live exitoso sin afectar operación bancaria' : 'Successful go-live without affecting banking operations' },
                      { value: '+20%', label: isEs ? 'Presupuesto final: +20% vs +30% que iba (contuvo sangrado)' : 'Final budget: +20% vs +30% it was going (contained bleeding)' },
                      { value: '✅', label: isEs ? 'Sistema operando establemente post go-live' : 'System operating stably post go-live' }
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-4 border border-turquesa/20">
                        <div className="text-2xl font-bold text-turquesa mb-1">{stat.value}</div>
                        <div className="text-sm text-azul-marino/70">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-azul-marino/70">
                  {isEs 
                    ? '"PM de Alternative rescató proyecto que iba a fracasar. Tomó control, ejecutó disciplinadamente, entregó. $2M de inversión salvados."'
                    : '"Alternative PM rescued project that was going to fail. Took control, executed disciplined, delivered. $2M investment saved."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— CEO</span>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* CTA FINAL */}
      <section className="py-20 lg:py-32 bg-violeta relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-turquesa/10 rounded-full blur-2xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs ? '¿Tu proyecto bancario necesita PM certificado?' : 'Does your banking project need a certified PM?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Evaluación gratuita de 30 minutos. Analizamos tu proyecto (alcance, complejidad, riesgos) y recomendamos perfil de PM apropiado.'
                  : 'Free 30-minute evaluation. We analyze your project (scope, complexity, risks) and recommend appropriate PM profile.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Evaluación de complejidad del proyecto' : 'Project complexity evaluation',
                  isEs ? 'Perfil de PM recomendado (senior, nivel medio)' : 'Recommended PM profile (senior, mid-level)',
                  isEs ? 'Modelo de trabajo (tiempo completo, part-time)' : 'Work model (full-time, part-time)',
                  isEs ? 'Duración estimada y costo' : 'Estimated duration and cost',
                  isEs ? 'CVs de PMs disponibles' : 'Available PM CVs'
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
                    className="inline-flex items-center gap-3 bg-turquesa text-azul-marino font-semibold px-8 py-4 rounded-lg hover:bg-menta transition-all duration-300 shadow-lg group"
                  >
                    {isEs ? 'Solicitar PM Bancario' : 'Request Banking PM'}
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

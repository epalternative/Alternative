'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Shield,
  Building2,
  Phone,
  FileText,
  Users,
  Clock,
  Target,
  TrendingUp,
  TrendingDown,
  Award
} from 'lucide-react';

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

export default function ISO9001SectorFinancieroPage() {
  const locale = useLocale();
  const isEs = locale === 'es';

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Industrias' : 'Industries', href: `/${locale}/industrias` },
    { label: isEs ? 'Banca y Servicios Financieros' : 'Banking & Financial Services', href: `/${locale}/industrias/banca-servicios-financieros` },
    { label: isEs ? 'ISO 9001 Sector Financiero' : 'ISO 9001 Financial Sector', href: null }
  ];

  const beneficios = [
    {
      icon: Shield,
      title: isEs ? 'Facilita Cumplimiento Regulatorio' : 'Facilitates Regulatory Compliance',
      description: isEs
        ? 'SBP requiere procesos documentados, controles operativos, auditorías internas. ISO 9001 estructura exactamente esto. Instituciones certificadas responden supervisiones SBP más rápido (evidencia ya organizada).'
        : 'SBP requires documented processes, operational controls, internal audits. ISO 9001 structures exactly this. Certified institutions respond to SBP inspections faster (evidence already organized).'
    },
    {
      icon: TrendingDown,
      title: isEs ? 'Reduce Riesgos Operacionales' : 'Reduces Operational Risks',
      description: isEs
        ? 'Procesos estandarizados y controlados = menos errores operativos. Errores en procesos bancarios (transferencias incorrectas, cálculos erróneos) tienen impacto financiero y regulatorio significativo.'
        : 'Standardized and controlled processes = fewer operational errors. Errors in banking processes (incorrect transfers, erroneous calculations) have significant financial and regulatory impact.'
    },
    {
      icon: TrendingUp,
      title: isEs ? 'Mejora Eficiencia Operativa' : 'Improves Operational Efficiency',
      description: isEs
        ? 'Mapeo y optimización de procesos identifica desperdicios, trabajo manual innecesario, duplicaciones. Instituciones reportan mejoras 20-40% en eficiencia post-implementación ISO.'
        : 'Process mapping and optimization identifies waste, unnecessary manual work, duplications. Institutions report 20-40% efficiency improvements post-ISO implementation.'
    },
    {
      icon: Award,
      title: isEs ? 'Ventaja Competitiva' : 'Competitive Advantage',
      description: isEs
        ? 'ISO 9001 es diferenciador en licitaciones corporativas (gobiernos, grandes empresas requieren certificación de proveedores). Demuestra compromiso con calidad y mejora continua.'
        : 'ISO 9001 is differentiator in corporate tenders (governments, large companies require supplier certification). Demonstrates commitment to quality and continuous improvement.'
    },
    {
      icon: Target,
      title: isEs ? 'Prepara para Otras Certificaciones' : 'Prepares for Other Certifications',
      description: isEs
        ? 'ISO 9001 es base para otras ISO relevantes: ISO 27001 (seguridad información), ISO 22301 (continuidad de negocio). Sistema de gestión ISO 9001 facilita agregar estas certificaciones.'
        : 'ISO 9001 is base for other relevant ISOs: ISO 27001 (information security), ISO 22301 (business continuity). ISO 9001 management system facilitates adding these certifications.'
    }
  ];

  const procesosCore = [
    isEs ? 'Apertura y administración de cuentas' : 'Account opening and administration',
    isEs ? 'Aprobación y desembolso de créditos' : 'Credit approval and disbursement',
    isEs ? 'Captación de depósitos' : 'Deposit taking',
    isEs ? 'Tesorería y mesa de dinero' : 'Treasury and money desk',
    isEs ? 'Servicios de pago (transferencias, remesas)' : 'Payment services (transfers, remittances)',
    isEs ? 'Atención al cliente / call center' : 'Customer service / call center',
    isEs ? 'Gestión de reclamos' : 'Complaint management',
    isEs ? 'Conciliaciones' : 'Reconciliations',
    isEs ? 'Reportería regulatoria a SBP' : 'Regulatory reporting to SBP',
    isEs ? 'Auditoría interna' : 'Internal audit',
    isEs ? 'Gestión de riesgos operacionales' : 'Operational risk management'
  ];

  const fases = [
    {
      fase: isEs ? 'Fase 1: Diagnóstico' : 'Phase 1: Diagnosis',
      duration: isEs ? '4 semanas' : '4 weeks',
      description: isEs
        ? 'Gap analysis vs ISO 9001:2015. Identificamos qué tiene la institución vs qué requiere norma. Definimos alcance de certificación (toda institución o procesos específicos).'
        : 'Gap analysis vs ISO 9001:2015. We identify what institution has vs what standard requires. We define certification scope (entire institution or specific processes).',
      icon: FileText
    },
    {
      fase: isEs ? 'Fase 2: Diseño del Sistema' : 'Phase 2: System Design',
      duration: isEs ? '6 semanas' : '6 weeks',
      description: isEs
        ? 'Diseñamos sistema de gestión de calidad: política de calidad, objetivos de calidad, mapeo de procesos, identificación de riesgos y oportunidades, matriz de responsabilidades.'
        : 'We design quality management system: quality policy, quality objectives, process mapping, risk and opportunity identification, responsibility matrix.',
      icon: Target
    },
    {
      fase: isEs ? 'Fase 3: Documentación' : 'Phase 3: Documentation',
      duration: isEs ? '8 semanas' : '8 weeks',
      description: isEs
        ? 'Documentación de procesos según ISO: manual de calidad (opcional), procedimientos operativos, instructivos de trabajo, registros/formatos. Documentación adaptada a realidad bancaria (no templates genéricos).'
        : 'Process documentation according to ISO: quality manual (optional), operational procedures, work instructions, records/forms. Documentation adapted to banking reality (not generic templates).',
      icon: FileText
    },
    {
      fase: isEs ? 'Fase 4: Implementación Operativa' : 'Phase 4: Operational Implementation',
      duration: isEs ? '12 semanas' : '12 weeks',
      description: isEs
        ? 'Capacitación a todo el personal en sistema de calidad. Implementación de procedimientos en operación diaria. Generación de registros (evidencia de operación).'
        : 'Training to all staff on quality system. Procedure implementation in daily operations. Record generation (operation evidence).',
      icon: Users
    },
    {
      fase: isEs ? 'Fase 5: Auditorías Internas' : 'Phase 5: Internal Audits',
      duration: isEs ? '4 semanas' : '4 weeks',
      description: isEs
        ? 'Formación de auditores internos. Ejecución de auditorías internas. Identificación y corrección de no conformidades.'
        : 'Internal auditor training. Internal audit execution. Non-conformity identification and correction.',
      icon: Shield
    },
    {
      fase: isEs ? 'Fase 6: Auditoría de Certificación' : 'Phase 6: Certification Audit',
      duration: isEs ? '4 semanas' : '4 weeks',
      description: isEs
        ? 'Preparación para auditoría de organismo certificador (Stage 1 + Stage 2). Acompañamiento durante auditoría. Corrección de no conformidades si las hay.'
        : 'Preparation for certifying body audit (Stage 1 + Stage 2). Support during audit. Non-conformity correction if any.',
      icon: Award
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
                  <CheckCircle2 className="w-8 h-8 text-azul-marino" />
                </div>
                <div>
                  <span className="text-azul-marino text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'ISO 9001 Sector Financiero' : 'ISO 9001 Financial Sector'}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl text-azul-marino font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Implementación de ISO 9001 para instituciones financieras reguladas'
                  : 'ISO 9001 implementation for regulated financial institutions'}
              </h1>

              <p className="text-lg md:text-xl text-azul-marino/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Sistemas de gestión de calidad ISO 9001:2015 adaptados a procesos bancarios. Documentación de procesos core, controles de calidad, auditorías internas, preparación para certificación. ISO 9001 Lead Auditor certificado en equipo Alternative.'
                  : 'ISO 9001:2015 quality management systems adapted to banking processes. Core process documentation, quality controls, internal audits, certification preparation. ISO 9001 Lead Auditor certified in Alternative team.'}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-azul-marino text-white font-semibold px-6 py-3 rounded-lg hover:bg-azul-marino/90 transition-all duration-300 shadow-lg shadow-azul-marino/20 group"
                >
                  {isEs ? 'Solicita Implementación ISO 9001 Bancario' : 'Request Banking ISO 9001 Implementation'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Right Visual - ISO 9001 Panel */}
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
                      {isEs ? 'ISO 9001:2015' : 'ISO 9001:2015'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: isEs ? 'Lead Auditor' : 'Lead Auditor', icon: Award, value: 'Certificado' },
                      { label: isEs ? 'Procesos Documentados' : 'Processes Documented', icon: FileText, value: '100%' },
                      { label: isEs ? 'Certificación' : 'Certification', icon: CheckCircle2, value: '6-9 meses' }
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
                  <CheckCircle2 className="w-8 h-8 text-azul-marino" />
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
                ? 'ISO 9001 en instituciones financieras va más allá de certificación por prestigio; es herramienta estratégica para demostrar madurez de procesos ante Superintendencia de Bancos, facilitar cumplimiento regulatorio (procesos documentados y controlados), reducir riesgos operacionales, y mejorar eficiencia operativa. Muchas instituciones inician ISO 9001 por recomendación u observación de SBP, otras por ventaja competitiva en licitaciones corporativas, y algunas por necesidad interna de estructurar procesos que crecieron de forma desordenada. Alternative implementa ISO 9001 específicamente adaptado a sector financiero: entendemos procesos bancarios críticos, regulación SBP, y requerimientos de auditoría. Katherine González, CEO de Alternative, es ISO 9001 Lead Auditor certificada con experiencia directa certificando instituciones financieras.'
                : 'ISO 9001 in financial institutions goes beyond certification for prestige; it is strategic tool to demonstrate process maturity to Superintendency of Banks, facilitate regulatory compliance (documented and controlled processes), reduce operational risks, and improve operational efficiency. Many institutions start ISO 9001 due to SBP recommendation or observation, others for competitive advantage in corporate tenders, and some for internal need to structure processes that grew disorderly. Alternative implements ISO 9001 specifically adapted to financial sector: we understand critical banking processes, SBP regulation, and audit requirements. Katherine González, CEO of Alternative, is ISO 9001 Lead Auditor certified with direct experience certifying financial institutions.'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* POR QUÉ ISO 9001 */}
      <section className="py-20 lg:py-32 bg-turquesa/5">
        <div className="container-custom">
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-4">
              {isEs ? 'Por qué ISO 9001 en sector financiero' : 'Why ISO 9001 in financial sector'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficios.map((beneficio, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300 border border-gris-arena/20"
                >
                  <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                    <beneficio.icon className="w-7 h-7 text-turquesa" />
                  </div>
                  <h3 className="text-lg font-semibold text-azul-marino mb-3">
                    {beneficio.title}
                  </h3>
                  <p className="text-azul-marino/70 text-sm leading-relaxed">
                    {beneficio.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ALCANCE TÍPICO */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-6">
              {isEs ? 'Alcance típico en instituciones financieras' : 'Typical scope in financial institutions'}
            </h2>
            <div className="bg-turquesa/5 rounded-2xl p-8 border border-turquesa/20">
              <h3 className="text-xl font-semibold text-azul-marino mb-4">
                {isEs ? 'Procesos core bancarios que documentamos:' : 'Core banking processes we document:'}
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {procesosCore.map((proceso, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span className="text-azul-marino/70">{proceso}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* METODOLOGÍA */}
      <section className="py-20 lg:py-32 bg-turquesa/5">
        <div className="container-custom">
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-4">
              {isEs ? 'Metodología de implementación' : 'Implementation methodology'}
            </h2>
            <p className="text-lg text-azul-marino/70 mb-8">
              {isEs 
                ? 'Duración total: 6-9 meses típicamente según tamaño y complejidad de institución.'
                : 'Total duration: 6-9 months typically according to institution size and complexity.'}
            </p>
          </AnimatedSection>

          {/* Timeline Desktop */}
          <div className="hidden lg:block relative mb-8">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-turquesa via-menta to-violeta -translate-y-1/2" />
            <div className="grid grid-cols-6 gap-4 relative">
              {fases.map((fase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-turquesa rounded-full border-4 border-white z-10" />
                  <div className="pt-8">
                    <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <fase.icon className="w-6 h-6 text-turquesa" />
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-brand">
                      <div className="text-turquesa text-xs font-medium mb-1">{fase.duration}</div>
                      <h3 className="text-sm font-bold text-azul-marino mb-2">{fase.fase}</h3>
                      <p className="text-azul-marino/70 text-xs leading-relaxed line-clamp-3">{fase.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet - Vertical Stack */}
          <div className="lg:hidden space-y-6">
            {fases.map((fase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-brand border-l-4 border-turquesa"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <fase.icon className="w-6 h-6 text-turquesa" />
                  </div>
                  <div className="flex-1">
                    <div className="text-turquesa text-sm font-medium mb-1">{fase.duration}</div>
                    <h3 className="text-lg font-bold text-azul-marino mb-2">{fase.fase}</h3>
                    <p className="text-azul-marino/70 text-sm leading-relaxed">{fase.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CASO DE ÉXITO */}
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
                    {isEs ? 'Cooperativa certifica ISO 9001 en 8 meses y mejora eficiencia 35%' : 'Cooperative certifies ISO 9001 in 8 months and improves efficiency 35%'}
                  </h3>
                </div>
              </div>

              <div className="space-y-6 text-azul-marino/70">
                <div>
                  <h4 className="font-semibold text-azul-marino mb-2">{isEs ? 'Situación' : 'Situation'}</h4>
                  <p>
                    {isEs 
                      ? 'Cooperativa de ahorro y crédito (5,000 socios, 80 empleados, 3 sucursales) con procesos informales. Crecimiento acelerado (duplicaron tamaño en 3 años) hizo que procesos colapsaran: cada sucursal operaba diferente, errores frecuentes en aprobaciones de crédito, quejas de socios aumentando, auditoría interna débil.'
                      : 'Savings and credit cooperative (5,000 members, 80 employees, 3 branches) with informal processes. Accelerated growth (doubled size in 3 years) made processes collapse: each branch operated differently, frequent errors in credit approvals, increasing member complaints, weak internal audit.'}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-azul-marino mb-2">{isEs ? 'Solución Alternative' : 'Alternative Solution'}</h4>
                  <p className="mb-3">
                    {isEs 
                      ? 'Implementación ISO 9001 en 8 meses:'
                      : 'ISO 9001 implementation in 8 months:'}
                  </p>
                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    {[
                      {
                        mes: isEs ? 'Mes 1-2' : 'Month 1-2',
                        accion: isEs ? 'Diagnóstico y diseño - Gap analysis, diseño de sistema adaptado, definición de alcance: 12 procesos core' : 'Diagnosis and design - Gap analysis, adapted system design, scope definition: 12 core processes'
                      },
                      {
                        mes: isEs ? 'Mes 3-5' : 'Month 3-5',
                        accion: isEs ? 'Documentación - Talleres con dueños de proceso, documentación de 12 procesos críticos, estandarización entre 3 sucursales' : 'Documentation - Workshops with process owners, documentation of 12 critical processes, standardization across 3 branches'
                      },
                      {
                        mes: isEs ? 'Mes 6' : 'Month 6',
                        accion: isEs ? 'Implementación - Capacitación a 80 empleados, go-live con procesos documentados, acompañamiento intensivo' : 'Implementation - Training to 80 employees, go-live with documented processes, intensive support'
                      },
                      {
                        mes: isEs ? 'Mes 7-8' : 'Month 7-8',
                        accion: isEs ? 'Auditorías y certificación - Formación de auditores internos, auditorías internas, auditoría de certificación, corrección de no conformidades' : 'Audits and certification - Internal auditor training, internal audits, certification audit, non-conformity correction'
                      }
                    ].map((fase, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-4 border border-turquesa/20">
                        <div className="text-turquesa font-bold mb-2">{fase.mes}</div>
                        <div className="text-sm text-azul-marino/70">{fase.accion}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-azul-marino mb-2">{isEs ? 'Resultados (12 meses post-certificación)' : 'Results (12 months post-certification)'}</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { value: '-60%', label: isEs ? 'Errores operativos' : 'Operational errors' },
                      { value: '5→2 días', label: isEs ? 'Tiempo aprobación créditos' : 'Credit approval time' },
                      { value: '-45%', label: isEs ? 'Quejas de socios' : 'Member complaints' },
                      { value: '+35%', label: isEs ? 'Eficiencia operativa' : 'Operational efficiency' },
                      { value: '-70%', label: isEs ? 'Tiempo respuesta auditorías' : 'Audit response time' },
                      { value: '✅', label: isEs ? 'Procesos listos para escalar' : 'Processes ready to scale' }
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-4 border border-turquesa/20 text-center">
                        <div className="text-2xl font-bold text-turquesa mb-1">{stat.value}</div>
                        <div className="text-xs text-azul-marino/70">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-azul-marino/70">
                  {isEs 
                    ? '"ISO 9001 estructuró nuestros procesos. Eficiencia 35% mejor, errores 60% menos. Alternative gestionó implementación en 8 meses sin afectar operación."'
                    : '"ISO 9001 structured our processes. 35% better efficiency, 60% fewer errors. Alternative managed implementation in 8 months without affecting operations."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">
                    — {isEs ? 'Gerente General, Cooperativa' : 'General Manager, Cooperative'}
                  </span>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

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
                {isEs ? '¿Tu institución financiera necesita ISO 9001?' : 'Does your financial institution need ISO 9001?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Evaluación gratuita de 30 minutos. Diagnosticamos madurez de procesos actual y recomendamos alcance apropiado de ISO 9001.'
                  : 'Free 30-minute evaluation. We diagnose current process maturity and recommend appropriate ISO 9001 scope.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Gap analysis preliminar vs ISO 9001' : 'Preliminary gap analysis vs ISO 9001',
                  isEs ? 'Recomendación de alcance de certificación' : 'Certification scope recommendation',
                  isEs ? 'Estimación de duración y esfuerzo' : 'Duration and effort estimation',
                  isEs ? 'Timeline y costo de implementación' : 'Implementation timeline and cost',
                  isEs ? 'Propuesta de proyecto' : 'Project proposal'
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
                    {isEs ? 'Solicitar Evaluación ISO 9001' : 'Request ISO 9001 Evaluation'}
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

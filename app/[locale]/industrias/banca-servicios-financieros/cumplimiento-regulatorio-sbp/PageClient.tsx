'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import {
  Scale,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  FileText,
  Shield,
  Building2,
  Phone,
  AlertTriangle,
  Users,
  Clock
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

export default function CumplimientoRegulatorioSBPage() {
  const locale = useLocale();
  const isEs = locale === 'es';

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Industrias' : 'Industries', href: `/${locale}/industrias` },
    { label: isEs ? 'Banca y Servicios Financieros' : 'Banking & Financial Services', href: `/${locale}/industrias/banca-servicios-financieros` },
    { label: isEs ? 'Cumplimiento Regulatorio SBP' : 'SBP Regulatory Compliance', href: null }
  ];

  const servicios = [
    {
      icon: FileText,
      title: isEs ? 'Diseño e Implementación de Políticas y Procedimientos' : 'Policy and Procedure Design and Implementation',
      description: isEs
        ? 'Desarrollamos políticas corporativas y procedimientos operativos alineados a Acuerdos SBP específicos: gobierno corporativo, gestión de riesgos operacionales, controles internos, gestión de cumplimiento, continuidad de negocio, seguridad de información.'
        : 'We develop corporate policies and operational procedures aligned to specific SBP Agreements: corporate governance, operational risk management, internal controls, compliance management, business continuity, information security.',
      entregables: isEs ? [
        'Manual de políticas corporativas',
        'Procedimientos operativos por proceso crítico',
        'Matrices de riesgos y controles',
        'Planes de acción para implementación'
      ] : [
        'Corporate policy manual',
        'Operational procedures by critical process',
        'Risk and control matrices',
        'Implementation action plans'
      ]
    },
    {
      icon: FileText,
      title: isEs ? 'Documentación de Procesos Bancarios' : 'Banking Process Documentation',
      description: isEs
        ? 'Mapeo y documentación formal de procesos core bancarios: aprobación de créditos, apertura de cuentas, tesorería, conciliaciones, reportería regulatoria, AML/CFT. Documentación con nivel de detalle que SBP requiere: narrativas, diagramas de flujo, matrices RACI, controles implementados.'
        : 'Mapping and formal documentation of core banking processes: credit approval, account opening, treasury, reconciliations, regulatory reporting, AML/CFT. Documentation with level of detail SBP requires: narratives, flow diagrams, RACI matrices, implemented controls.',
      entregables: isEs ? [
        'Narrativas de procesos',
        'Diagramas de flujo',
        'Matrices RACI',
        'Documentación de controles'
      ] : [
        'Process narratives',
        'Flow diagrams',
        'RACI matrices',
        'Control documentation'
      ]
    },
    {
      icon: Shield,
      title: isEs ? 'Preparación para Supervisiones SBP' : 'SBP Inspection Preparation',
      description: isEs
        ? 'Pre-auditorías internas que simulan supervisión SBP. Identificamos gaps que supervisores encontrarían. Preparamos evidencia documental que SBP requiere. Capacitamos a equipo en cómo responder a requerimientos de supervisores.'
        : 'Internal pre-audits that simulate SBP inspection. We identify gaps that inspectors would find. We prepare documentary evidence that SBP requires. We train team on how to respond to inspector requirements.',
      entregables: isEs ? [
        'Pre-auditoría interna',
        'Identificación de gaps',
        'Preparación de evidencia',
        'Capacitación al equipo'
      ] : [
        'Internal pre-audit',
        'Gap identification',
        'Evidence preparation',
        'Team training'
      ]
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'Remediación de Observaciones Regulatorias' : 'Regulatory Observation Remediation',
      description: isEs
        ? 'Análisis de observaciones emitidas por SBP. Diseño de plan de remediación con acciones correctivas específicas. Implementación de controles para cerrar gaps identificados. Preparación de evidencia para cierre de observaciones.'
        : 'Analysis of observations issued by SBP. Remediation plan design with specific corrective actions. Control implementation to close identified gaps. Evidence preparation for observation closure.',
      entregables: isEs ? [
        'Análisis de observaciones',
        'Plan de remediación',
        'Implementación de controles',
        'Evidencia para cierre'
      ] : [
        'Observation analysis',
        'Remediation plan',
        'Control implementation',
        'Closure evidence'
      ]
    },
    {
      icon: Shield,
      title: isEs ? 'Sistemas de Control Interno' : 'Internal Control Systems',
      description: isEs
        ? 'Diseño e implementación de marcos de control interno alineados a COSO: ambiente de control, evaluación de riesgos, actividades de control, información y comunicación, monitoreo. Desarrollamos matriz de controles clave, pruebas de efectividad, remediación de deficiencias.'
        : 'Design and implementation of internal control frameworks aligned to COSO: control environment, risk assessment, control activities, information and communication, monitoring. We develop key control matrix, effectiveness testing, deficiency remediation.',
      entregables: isEs ? [
        'Marco de control interno',
        'Matriz de controles clave',
        'Pruebas de efectividad',
        'Remediación de deficiencias'
      ] : [
        'Internal control framework',
        'Key control matrix',
        'Effectiveness testing',
        'Deficiency remediation'
      ]
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
                  <Scale className="w-8 h-8 text-azul-marino" />
                </div>
                <div>
                  <span className="text-azul-marino text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Cumplimiento Regulatorio SBP' : 'SBP Regulatory Compliance'}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl text-azul-marino font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Asesoría e implementación para cumplir normativas de la Superintendencia de Bancos'
                  : 'Advisory and implementation to comply with Superintendency of Banks regulations'}
              </h1>

              <p className="text-lg md:text-xl text-azul-marino/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Implementación de políticas, procedimientos y controles internos alineados a Acuerdos SBP. Preparación para supervisiones, remediación de observaciones, documentación de procesos bancarios. Conocimiento profundo de regulación local panameña.'
                  : 'Implementation of policies, procedures and internal controls aligned to SBP Agreements. Inspection preparation, observation remediation, banking process documentation. Deep knowledge of Panamanian local regulation.'}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-azul-marino text-white font-semibold px-6 py-3 rounded-lg hover:bg-azul-marino/90 transition-all duration-300 shadow-lg shadow-azul-marino/20 group"
                >
                  {isEs ? 'Solicita Asesoría en Cumplimiento SBP' : 'Request SBP Compliance Advisory'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Right Visual - Compliance Panel */}
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
                      {isEs ? 'Cumplimiento SBP' : 'SBP Compliance'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: isEs ? 'Acuerdos SBP' : 'SBP Agreements', icon: FileText, value: '100%' },
                      { label: isEs ? 'Observaciones Cerradas' : 'Observations Closed', icon: CheckCircle2, value: '95%' },
                      { label: isEs ? 'Procesos Documentados' : 'Processes Documented', icon: Shield, value: '100%' }
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
                  <Scale className="w-8 h-8 text-azul-marino" />
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
                ? 'Cumplir regulación de la Superintendencia de Bancos de Panamá es obligación no negociable pero consumidora intensiva de recursos. CFOs y COOs de instituciones financieras enfrentan desafío constante: implementar compliance sin frenar operación, sin burocracia excesiva, y demostrando a SBP que controles son efectivos (no solo documentos en gaveta). Alternative ayuda a instituciones financieras a cumplir regulación SBP eficientemente: diseñamos e implementamos sistemas de cumplimiento pragmáticos, preparamos para supervisiones, remediamos observaciones, y documentamos procesos de forma que auditoría interna, auditoría externa y SBP acepten sin objeciones.'
                : 'Complying with Superintendency of Banks of Panama regulation is non-negotiable obligation but resource-intensive. CFOs and COOs of financial institutions face constant challenge: implement compliance without stopping operations, without excessive bureaucracy, and demonstrating to SBP that controls are effective (not just documents in drawer). Alternative helps financial institutions comply with SBP regulation efficiently: we design and implement pragmatic compliance systems, prepare for inspections, remediate observations, and document processes so that internal audit, external audit and SBP accept without objections.'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CÓMO ALTERNATIVE AYUDA */}
      <section className="py-20 lg:py-32 bg-turquesa/5">
        <div className="container-custom">
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-4">
              {isEs ? 'Servicios de cumplimiento regulatorio para instituciones financieras' : 'Regulatory compliance services for financial institutions'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="space-y-8">
            {servicios.map((servicio, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-white rounded-2xl p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300 border border-gris-arena/20"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <servicio.icon className="w-7 h-7 text-turquesa" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-azul-marino mb-3">
                        {servicio.title}
                      </h3>
                      <p className="text-azul-marino/70 mb-4">
                        {servicio.description}
                      </p>
                      <div>
                        <div className="text-turquesa font-semibold text-sm mb-2">
                          {isEs ? 'Entregables típicos:' : 'Typical deliverables:'}
                        </div>
                        <ul className="space-y-1">
                          {servicio.entregables.map((entregable, entregableIdx) => (
                            <li key={entregableIdx} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0 mt-0.5" />
                              <span className="text-azul-marino/70">{entregable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
                    {isEs ? 'Remediación de observaciones SBP en 6 meses evita sanción' : 'SBP observation remediation in 6 months avoids sanction'}
                  </h3>
                </div>
              </div>

              <div className="space-y-6 text-azul-marino/70">
                <div>
                  <h4 className="font-semibold text-azul-marino mb-2">{isEs ? 'Situación' : 'Situation'}</h4>
                  <p>
                    {isEs 
                      ? 'Cooperativa de ahorro y crédito recibió supervisión extraordinaria SBP. Resultado: 15 observaciones (8 mayores, 7 menores) en áreas críticas: deficiencias en políticas de crédito, procesos no documentados, controles internos débiles, gestión de riesgos operacionales insuficiente. SBP dio plazo 6 meses para remediar observaciones mayores o enfrentaría sanciones (multas, restricción de crecimiento).'
                      : 'Savings and credit cooperative received extraordinary SBP inspection. Result: 15 observations (8 major, 7 minor) in critical areas: credit policy deficiencies, undocumented processes, weak internal controls, insufficient operational risk management. SBP gave 6-month deadline to remediate major observations or face sanctions (fines, growth restriction).'}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-azul-marino mb-2">{isEs ? 'Desafío' : 'Challenge'}</h4>
                  <p>
                    {isEs 
                      ? 'Cooperativa (120 empleados) no tenía capacidad interna para remediar 15 observaciones en 6 meses mientras operaba. Gerente General necesitaba apoyo externo especializado urgentemente.'
                      : 'Cooperative (120 employees) did not have internal capacity to remediate 15 observations in 6 months while operating. General Manager needed urgent specialized external support.'}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-azul-marino mb-2">{isEs ? 'Solución Alternative' : 'Alternative Solution'}</h4>
                  <p className="mb-3">
                    {isEs 
                      ? 'Proyecto de remediación acelerada (6 meses):'
                      : 'Accelerated remediation project (6 months):'}
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    {[
                      {
                        mes: isEs ? 'Mes 1' : 'Month 1',
                        accion: isEs ? 'Análisis y planificación - Análisis detallado de cada observación, plan de remediación con 42 acciones correctivas, asignación de responsables internos' : 'Analysis and planning - Detailed analysis of each observation, remediation plan with 42 corrective actions, assignment of internal responsible parties'
                      },
                      {
                        mes: isEs ? 'Mes 2-5' : 'Month 2-5',
                        accion: isEs ? 'Implementación - Políticas de crédito rediseñadas, 12 procesos core documentados, controles internos implementados, sistema de gestión de riesgos operacionales diseñado, capacitación a 120 empleados' : 'Implementation - Redesigned credit policies, 12 core processes documented, internal controls implemented, operational risk management system designed, training to 120 employees'
                      },
                      {
                        mes: isEs ? 'Mes 6' : 'Month 6',
                        accion: isEs ? 'Preparación evidencia y cierre - Recopilación de evidencia de implementación, preparación de respuesta formal a SBP, simulación de validación' : 'Evidence preparation and closure - Collection of implementation evidence, preparation of formal response to SBP, validation simulation'
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
                  <h4 className="font-semibold text-azul-marino mb-2">{isEs ? 'Resultado' : 'Result'}</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { value: '15', label: isEs ? 'observaciones presentadas a SBP para cierre' : 'observations presented to SBP for closure' },
                      { value: '14/15', label: isEs ? 'observaciones cerradas por SBP' : 'observations closed by SBP' },
                      { value: '✅', label: isEs ? 'Cooperativa evitó sanciones regulatorias' : 'Cooperative avoided regulatory sanctions' },
                      { value: '✅', label: isEs ? 'Sistema de cumplimiento robusto implementado' : 'Robust compliance system implemented' }
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-4 border border-turquesa/20 text-center">
                        <div className="text-2xl font-bold text-turquesa mb-1">{stat.value}</div>
                        <div className="text-sm text-azul-marino/70">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-azul-marino/70">
                  {isEs 
                    ? '"Alternative nos salvó de sanción SBP. Remediamos 15 observaciones en 6 meses con su gestión. Ahora tenemos compliance robusto."'
                    : '"Alternative saved us from SBP sanction. We remediated 15 observations in 6 months with their management. Now we have robust compliance."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">
                    — {isEs ? 'Gerente General, Cooperativa' : 'General Manager, Cooperative'}
                  </span>
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
                {isEs ? '¿Tu institución necesita apoyo en cumplimiento SBP?' : 'Does your institution need SBP compliance support?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Evaluación gratuita de 30 minutos. Revisamos tu situación de cumplimiento actual y recomendamos acciones prioritarias.'
                  : 'Free 30-minute evaluation. We review your current compliance situation and recommend priority actions.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Evaluación de madurez de cumplimiento' : 'Compliance maturity evaluation',
                  isEs ? 'Identificación de gaps vs regulación SBP' : 'Gap identification vs SBP regulation',
                  isEs ? 'Recomendación de servicios apropiados' : 'Appropriate service recommendation',
                  isEs ? 'Estimación de esfuerzo y timeline' : 'Effort and timeline estimation',
                  isEs ? 'Propuesta de trabajo' : 'Work proposal'
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
                    {isEs ? 'Solicitar Evaluación de Cumplimiento SBP' : 'Request SBP Compliance Evaluation'}
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

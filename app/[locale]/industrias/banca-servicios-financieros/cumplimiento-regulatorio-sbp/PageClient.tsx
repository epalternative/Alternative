'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { faqs as faqData } from '@/lib/content/faqs/industrias--banca-servicios-financieros--cumplimiento-regulatorio-sbp';
import { localizeFaqs } from '@/lib/content/faqs';
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
  <motion.div className="border-b border-turquesa/20 last:border-0" initial={false}>
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
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <p className="pb-6 text-azul-marino/70 leading-relaxed">{answer}</p>
    </motion.div>
  </motion.div>
);

export default function CumplimientoRegulatorioSBPage() {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const faqs = localizeFaqs(faqData, isEs ? 'es' : 'en');

  // Acuerdos verificados contra el PDF oficial de la SBP antes de citarlos:
  // - Acuerdo 005-2011 (20 sep 2011), Gobierno Corporativo
  //   https://www.superbancos.gob.pa/documentos/leyes_y_regulaciones/acuerdos/2011/Acuerdo_5-2011.pdf
  // - Acuerdo 011-2018 (11 sep 2018), Riesgo Operativo
  //   https://www.superbancos.gob.pa/documentos/leyes_y_regulaciones/acuerdos/2018/Acuerdo_11-2018.pdf
  const normativa = [
    {
      norma: isEs ? 'Acuerdo 011-2018' : 'Agreement 011-2018',
      materia: isEs ? 'Riesgo operativo · 11 de septiembre de 2018' : 'Operational risk · September 11, 2018',
      implicacion: isEs
        ? 'Establece que la gestión del riesgo operativo debe incluir identificación, medición, mitigación, monitoreo y control. El punto que más hallazgos genera no es la identificación, sino el monitoreo: hay que poder demostrar que las acciones de mitigación se cerraron dentro de los plazos definidos, con evidencia y no con actas genéricas.'
        : 'It establishes that operational risk management must include identification, measurement, mitigation, monitoring and control. The point that generates the most findings is not identification but monitoring: you must be able to demonstrate that mitigation actions were closed within the defined timeframes, with evidence rather than generic minutes.',
    },
    {
      norma: isEs ? 'Acuerdo 005-2011' : 'Agreement 005-2011',
      materia: isEs ? 'Gobierno corporativo · 20 de septiembre de 2011' : 'Corporate governance · September 20, 2011',
      implicacion: isEs
        ? 'Actualiza las disposiciones sobre gobierno corporativo. En términos operativos define quién responde por qué: composición de comités, líneas de reporte y responsabilidades de la junta directiva. Un marco de control interno sin esa estructura detrás no sobrevive a la primera revisión, por bien redactado que esté.'
        : 'It updates the corporate governance provisions. In operational terms it defines who answers for what: committee composition, reporting lines and board responsibilities. An internal control framework without that structure behind it does not survive the first review, however well drafted.',
    },
  ];

  const metodologia = [
    {
      titulo: isEs ? 'Diagnóstico de brechas' : 'Gap assessment',
      detalle: isEs
        ? 'Comparamos lo que la entidad hace hoy contra lo que el marco regulatorio exige poder demostrar. El resultado no es una lista de documentos faltantes, sino un mapa de controles: cuáles existen y operan, cuáles existen en papel pero nadie ejecuta, y cuáles no existen.'
        : 'We compare what the institution does today against what the regulatory framework requires you to be able to demonstrate. The output is not a list of missing documents but a control map: which ones exist and operate, which exist on paper but nobody executes, and which do not exist.',
    },
    {
      titulo: isEs ? 'Priorización por criticidad' : 'Prioritization by criticality',
      detalle: isEs
        ? 'No se documenta todo a la vez. Se ordena por dos criterios: qué revisa primero un supervisor y dónde una falla golpea al cliente o al balance. Ese orden es el que permite mostrar avance real en los primeros meses en lugar de un frente abierto en todas partes.'
        : 'You do not document everything at once. Work is ordered by two criteria: what an inspector reviews first and where a failure hits the customer or the balance sheet. That order is what allows showing real progress in the first months instead of an open front everywhere.',
    },
    {
      titulo: isEs ? 'Diseño de gobierno y roles' : 'Governance and role design',
      detalle: isEs
        ? 'Antes de escribir procedimientos se define quién decide, quién ejecuta y quién revisa. Comités, líneas de reporte y dueños de proceso. Sin esta capa, la documentación posterior se convierte en un ejercicio de redacción sin efecto sobre la operación.'
        : 'Before writing procedures we define who decides, who executes and who reviews. Committees, reporting lines and process owners. Without this layer, the documentation that follows becomes a drafting exercise with no effect on operations.',
    },
    {
      titulo: isEs ? 'Documentación con nivel de evidencia' : 'Documentation at evidence level',
      detalle: isEs
        ? 'Narrativas, diagramas de flujo, matrices RACI y matrices de riesgos y controles. El criterio de calidad no es la extensión sino si un tercero puede seguir el proceso y verificar que el control operó, con registros que existan de verdad.'
        : 'Narratives, flow diagrams, RACI matrices and risk and control matrices. The quality criterion is not length but whether a third party can follow the process and verify that the control operated, with records that genuinely exist.',
    },
    {
      titulo: isEs ? 'Pre-auditoría interna' : 'Internal pre-audit',
      detalle: isEs
        ? 'Simulamos el enfoque de una supervisión sobre los procesos ya documentados. El objetivo es encontrar los hallazgos antes de que los encuentre el supervisor, cuando todavía hay margen para corregirlos sin plazo encima.'
        : 'We simulate the approach of an inspection over the already documented processes. The goal is to find the findings before the inspector does, while there is still room to correct them without a deadline overhead.',
    },
    {
      titulo: isEs ? 'Cierre y transferencia' : 'Closure and handover',
      detalle: isEs
        ? 'Preparación de la evidencia de cierre y capacitación al equipo en cómo responder un requerimiento: qué mostrar, dónde está y qué no conviene improvisar. El sistema tiene que quedar operando sin nosotros.'
        : 'Preparation of closure evidence and training for the team on how to answer a request: what to show, where it is and what should not be improvised. The system has to keep running without us.',
    },
  ];

  const relacionados = [
    { tipo: isEs ? 'Industria' : 'Industry', titulo: isEs ? 'Banca y Servicios Financieros' : 'Banking & Financial Services', href: `/${locale}/industrias/banca-servicios-financieros` },
    { tipo: isEs ? 'Servicio' : 'Service', titulo: isEs ? 'Optimización de Procesos' : 'Process Optimization', href: `/${locale}/servicios/optimizacion-procesos` },
    { tipo: 'Blog', titulo: isEs ? 'Qué es BPM: guía completa' : 'What is BPM: complete guide', href: `/${locale}/blog/que-es-bpm-business-process-management-guia-completa` },
  ];

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


      {/* QUÉ EXIGE LA NORMATIVA */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-6">
              {isEs ? 'Qué exige la normativa, en concreto' : 'What the regulation requires, specifically'}
            </h2>
            <p className="text-lg text-azul-marino/70 leading-relaxed mb-6">
              {isEs
                ? 'La mayoría de los proyectos de cumplimiento se atascan por la misma razón: se aborda la norma como un listado de documentos que entregar, y no como un conjunto de capacidades que hay que poder demostrar en funcionamiento. La diferencia se nota en la primera supervisión.'
                : 'Most compliance projects stall for the same reason: the regulation is treated as a list of documents to deliver rather than a set of capabilities you must be able to demonstrate in operation. The difference shows at the first inspection.'}
            </p>
          </AnimatedSection>

          <StaggerContainer className="max-w-4xl mx-auto space-y-6">
            {normativa.map((item, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-blanco-hueso rounded-2xl p-8 border border-gris-arena/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Scale className="w-6 h-6 text-turquesa" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-azul-marino mb-1">{item.norma}</h3>
                      <p className="text-sm text-turquesa font-medium mb-3">{item.materia}</p>
                      <p className="text-azul-marino/70 leading-relaxed">{item.implicacion}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* METODOLOGÍA */}
      <section className="py-20 lg:py-32 bg-turquesa/5">
        <div className="container-custom">
          <AnimatedSection className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-6">
              {isEs ? 'Cómo lo abordamos' : 'How we approach it'}
            </h2>
            <p className="text-lg text-azul-marino/70 leading-relaxed">
              {isEs
                ? 'El orden importa. Documentar antes de entender qué controles existen produce manuales que nadie reconoce como propios y que no resisten una revisión.'
                : 'Order matters. Documenting before understanding which controls exist produces manuals nobody recognizes as their own and that do not survive a review.'}
            </p>
          </AnimatedSection>

          <StaggerContainer className="max-w-4xl mx-auto space-y-4">
            {metodologia.map((paso, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-white rounded-2xl p-6 shadow-brand border border-gris-arena/20 flex items-start gap-5">
                  <div className="w-10 h-10 bg-violeta/15 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-violeta font-semibold">{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-azul-marino mb-2">{paso.titulo}</h3>
                    <p className="text-azul-marino/70 leading-relaxed">{paso.detalle}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino">
              {isEs ? 'Preguntas frecuentes' : 'Frequently asked questions'}
            </h2>
          </AnimatedSection>

          <AnimatedSection className="max-w-3xl mx-auto">
            <div className="bg-blanco-hueso rounded-2xl p-8">
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

      {/* ENLACES RELACIONADOS */}
      <section className="py-16 bg-blanco-hueso">
        <div className="container-custom">
          <AnimatedSection className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-azul-marino mb-6">
              {isEs ? 'Seguir leyendo' : 'Keep reading'}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relacionados.map((rel) => (
                <Link
                  key={rel.href}
                  href={rel.href}
                  className="bg-white rounded-xl p-6 border border-gris-arena/20 hover:border-turquesa hover:shadow-brand transition-all duration-300 group"
                >
                  <p className="text-sm text-turquesa font-medium mb-2">{rel.tipo}</p>
                  <p className="text-azul-marino font-semibold group-hover:text-turquesa transition-colors inline-flex items-center gap-2">
                    {rel.titulo}
                    <ArrowRight className="w-4 h-4" />
                  </p>
                </Link>
              ))}
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

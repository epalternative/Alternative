'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import {
  FileText,
  ArrowRight,
  ChevronDown,
  BarChart3,
  DollarSign,
  Target,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Phone,
  Search,
  Layers,
  Shield,
  Presentation,
  Check,
  Calendar,
  BookOpen,
  Lightbulb,
  PieChart,
  Building2,
  Users,
  Briefcase,
  Scale,
  Zap,
} from 'lucide-react';

// =====================================================
// ANIMATION COMPONENTS
// =====================================================

const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
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

const StaggerContainer = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
  onClick,
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
        opacity: isOpen ? 1 : 0,
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

export default function CasosNegocioPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(8).fill(false)
  );
  const isEs = locale === 'es';

  const toggleCheck = (idx: number) => {
    const newChecked = [...checkedItems];
    newChecked[idx] = !newChecked[idx];
    setCheckedItems(newChecked);
  };

  const checkCount = checkedItems.filter(Boolean).length;

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    {
      label: isEs ? 'Gestión de Proyectos' : 'Project Management',
      href: `/${locale}/servicios/gestion-proyectos`,
    },
    {
      label: isEs ? 'Casos de Negocio' : 'Business Cases',
      href: null,
    },
  ];

  const colorClasses = {
    turquesa: {
      bg: 'bg-turquesa/10',
      text: 'text-turquesa',
      border: 'border-turquesa/20',
    },
    menta: { bg: 'bg-menta/10', text: 'text-menta', border: 'border-menta/20' },
    violeta: {
      bg: 'bg-violeta/10',
      text: 'text-violeta',
      border: 'border-violeta/20',
    },
  };

  // Problem grid 2x2
  const problems = [
    {
      icon: DollarSign,
      title: isEs ? 'Inversión significativa' : 'Significant investment',
      description: isEs
        ? 'Proyectos de $200K, $500K o más. Necesitas justificar el gasto ante la junta o accionistas con números sólidos.'
        : 'Projects of $200K, $500K or more. You need to justify the expense to the board or shareholders with solid numbers.',
      color: 'turquesa',
    },
    {
      icon: Layers,
      title: isEs ? 'Proyectos compitiendo' : 'Projects competing',
      description: isEs
        ? 'Varias iniciativas compiten por presupuesto limitado. Sin business case claro, la priorización es política, no estratégica.'
        : 'Multiple initiatives compete for limited budget. Without a clear business case, prioritization is political, not strategic.',
      color: 'menta',
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'Escepticismo en junta' : 'Board skepticism',
      description: isEs
        ? 'La junta directiva cuestiona ROI, riesgos o alineación estratégica. Necesitas un documento ejecutivo que responda objeciones.'
        : 'The board questions ROI, risks or strategic alignment. You need an executive document that addresses objections.',
      color: 'violeta',
    },
    {
      icon: Building2,
      title: isEs ? 'Financiamiento externo' : 'External financing',
      description: isEs
        ? 'Bancos, inversionistas o fondos exigen business case riguroso. Sin él, no hay aprobación de crédito o capital.'
        : 'Banks, investors or funds require a rigorous business case. Without it, no credit or capital approval.',
      color: 'turquesa',
    },
  ];

  // Qué incluye - 7 items, grid 2x3
  const includes = [
    {
      icon: Search,
      title: isEs ? 'Análisis de situación actual' : 'Current situation analysis',
      description: isEs
        ? 'Contexto, dolor actual, oportunidades y restricciones. Baseline de indicadores.'
        : 'Context, current pain, opportunities and constraints. Baseline of indicators.',
      color: 'turquesa',
    },
    {
      icon: Layers,
      title: isEs ? 'Alternativas evaluadas' : 'Alternatives evaluated',
      description: isEs
        ? 'Opción cero (no hacer nada), alternativas consideradas y recomendación justificada.'
        : 'Zero option (do nothing), alternatives considered and justified recommendation.',
      color: 'menta',
    },
    {
      icon: PieChart,
      title: isEs ? 'Análisis financiero' : 'Financial analysis',
      description: isEs
        ? 'ROI, VPN, TIR, payback, sensibilidad. Proyecciones conservadoras y escenarios.'
        : 'ROI, NPV, IRR, payback, sensitivity. Conservative projections and scenarios.',
      color: 'violeta',
    },
    {
      icon: Shield,
      title: isEs ? 'Riesgos y mitigaciones' : 'Risks and mitigations',
      description: isEs
        ? 'Identificación de riesgos clave, probabilidad, impacto y plan de mitigación.'
        : 'Identification of key risks, probability, impact and mitigation plan.',
      color: 'turquesa',
    },
    {
      icon: Target,
      title: isEs ? 'Alineación estratégica' : 'Strategic alignment',
      description: isEs
        ? 'Vinculación con objetivos corporativos, OKRs o plan estratégico.'
        : 'Link to corporate objectives, OKRs or strategic plan.',
      color: 'menta',
    },
    {
      icon: Calendar,
      title: isEs ? 'Plan de implementación' : 'Implementation plan',
      description: isEs
        ? 'Fases, hitos, dependencias, recursos y cronograma de alto nivel.'
        : 'Phases, milestones, dependencies, resources and high-level schedule.',
      color: 'violeta',
    },
    {
      icon: Presentation,
      title: isEs ? 'Presentación ejecutiva' : 'Executive presentation',
      description: isEs
        ? 'Deck listo para junta o comité: síntesis, recomendación y apoyo a la decisión.'
        : 'Board or committee-ready deck: synthesis, recommendation and decision support.',
      color: 'turquesa',
    },
  ];

  // Benefits stats
  const benefits = [
    {
      stat: '80%+',
      label: isEs ? 'tasa de aprobación' : 'approval rate',
      description: isEs
        ? 'Business cases elaborados por Alternative aprobados por juntas'
        : 'Business cases developed by Alternative approved by boards',
      icon: CheckCircle2,
    },
    {
      stat: '3–5X',
      label: isEs ? 'probabilidad de aprobación' : 'approval probability',
      description: isEs
        ? 'Vs. propuestas sin business case estructurado'
        : 'Vs. proposals without structured business case',
      icon: TrendingUp,
    },
    {
      stat: '20+',
      label: isEs ? 'business cases' : 'business cases',
      description: isEs
        ? 'Elaborados en los últimos años para clientes'
        : 'Developed in recent years for clients',
      icon: FileText,
    },
    {
      stat: 'ROI',
      label: isEs ? 'riguroso' : 'rigorous',
      description: isEs
        ? 'Análisis financiero con estándares corporativos'
        : 'Financial analysis with corporate standards',
      icon: BarChart3,
    },
  ];

  // Work process timeline - 4 phases
  const processPhases = [
    {
      phase: '1',
      title: isEs ? 'Discovery' : 'Discovery',
      description: isEs
        ? 'Entendemos el proyecto, stakeholders, restricciones y criterios de decisión. Definimos alcance del business case.'
        : 'We understand the project, stakeholders, constraints and decision criteria. We define business case scope.',
      icon: Search,
      color: 'turquesa',
    },
    {
      phase: '2',
      title: isEs ? 'Análisis' : 'Analysis',
      description: isEs
        ? 'Recolección de datos, modelado financiero, evaluación de alternativas, análisis de riesgos y sensibilidad.'
        : 'Data collection, financial modeling, alternative evaluation, risk and sensitivity analysis.',
      icon: BarChart3,
      color: 'menta',
    },
    {
      phase: '3',
      title: isEs ? 'Documentación' : 'Documentation',
      description: isEs
        ? 'Redacción del business case completo: narrativa, tablas, gráficos. Revisión y afinación con el sponsor.'
        : 'Drafting of complete business case: narrative, tables, charts. Review and refinement with sponsor.',
      icon: FileText,
      color: 'violeta',
    },
    {
      phase: '4',
      title: isEs ? 'Presentación' : 'Presentation',
      description: isEs
        ? 'Deck ejecutivo, ensayo de presentación si se requiere, y apoyo durante la junta o comité de aprobación.'
        : 'Executive deck, presentation rehearsal if required, and support during board or approval committee.',
      icon: Presentation,
      color: 'turquesa',
    },
  ];

  // Financial analysis table
  const financialTerms = [
    {
      term: 'ROI',
      termEs: 'ROI',
      description: isEs
        ? 'Retorno sobre la inversión. (Beneficios - Costos) / Costos × 100. Mide rentabilidad relativa.'
        : 'Return on investment. (Benefits - Costs) / Costs × 100. Measures relative profitability.',
    },
    {
      term: 'VPN',
      termEs: 'VPN',
      description: isEs
        ? 'Valor presente neto. Flujos futuros descontados menos inversión inicial. VPN > 0 indica viabilidad económica.'
        : 'Net present value. Discounted future flows minus initial investment. NPV > 0 indicates economic viability.',
    },
    {
      term: 'TIR',
      termEs: 'TIR',
      description: isEs
        ? 'Tasa interna de retorno. Tasa de descuento que iguala VPN a cero. Se compara con costo de capital.'
        : 'Internal rate of return. Discount rate that sets NPV to zero. Compared to cost of capital.',
    },
    {
      term: 'Payback',
      termEs: 'Payback',
      description: isEs
        ? 'Tiempo para recuperar la inversión inicial con los flujos del proyecto. Payback simple o descontado.'
        : 'Time to recover initial investment with project flows. Simple or discounted payback.',
    },
    {
      term: 'Sensibilidad',
      termEs: 'Sensibilidad',
      description: isEs
        ? 'Análisis de qué pasa si cambian variables clave (ventas, costos, plazos). Identifica riesgos financieros.'
        : 'Analysis of what happens if key variables change (sales, costs, timelines). Identifies financial risks.',
    },
  ];

  // Checklist - Cuándo necesitas business case
  const checklistItems = isEs
    ? [
        'Inversión significativa (ej. ERP, transformación digital, infraestructura)',
        'Múltiples proyectos compitiendo por el mismo presupuesto',
        'Junta directiva o comité escéptico con la iniciativa',
        'Financiamiento externo (banco, inversionistas, fondos)',
        'Implementación de sistema crítico (ERP, CRM, BI)',
        'Transformación digital o cambio de modelo de negocio',
        'Nuevo producto, expansión o adquisición',
        'Requieres aprobación formal de comité de inversiones',
      ]
    : [
        'Significant investment (e.g. ERP, digital transformation, infrastructure)',
        'Multiple projects competing for the same budget',
        'Board or committee skeptical about the initiative',
        'External financing (bank, investors, funds)',
        'Critical system implementation (ERP, CRM, BI)',
        'Digital transformation or business model change',
        'New product, expansion or acquisition',
        'You need formal investment committee approval',
      ];

  const faqs = [
    {
      question: isEs
        ? '¿Cuánto tarda desarrollar un business case?'
        : 'How long does it take to develop a business case?',
      answer: isEs
        ? 'Depende del alcance y disponibilidad de datos. Típicamente 2-4 semanas para un business case completo: discovery 3-5 días, análisis 1-2 semanas, documentación y revisión 1 semana. Para iniciativas más simples, podemos entregar en 1-2 semanas.'
        : 'It depends on scope and data availability. Typically 2-4 weeks for a complete business case: discovery 3-5 days, analysis 1-2 weeks, documentation and review 1 week. For simpler initiatives, we can deliver in 1-2 weeks.',
    },
    {
      question: isEs
        ? '¿Incluyen el modelo financiero en Excel o solo el documento?'
        : 'Do you include the financial model in Excel or just the document?',
      answer: isEs
        ? 'Sí. Entregamos el business case en Word/PDF y el modelo financiero en Excel (o Google Sheets) para que tu equipo pueda ajustar supuestos, escenarios y mantenerlo vivo. La propiedad intelectual es del cliente.'
        : 'Yes. We deliver the business case in Word/PDF and the financial model in Excel (or Google Sheets) so your team can adjust assumptions, scenarios and keep it alive. Intellectual property belongs to the client.',
    },
    {
      question: isEs
        ? '¿Pueden presentar el business case ante nuestra junta?'
        : 'Can you present the business case to our board?',
      answer: isEs
        ? 'Sí, si lo solicitas. Preparamos el deck ejecutivo y uno de nuestros consultores puede acompañar la presentación, responder preguntas técnicas o de metodología, y apoyar al sponsor durante la junta. Suele ser valioso cuando hay escepticismo o preguntas difíciles.'
        : 'Yes, if you request it. We prepare the executive deck and one of our consultants can join the presentation, answer technical or methodology questions, and support the sponsor during the board meeting. It is often valuable when there is skepticism or tough questions.',
    },
    {
      question: isEs
        ? '¿Qué industrias han apoyado con business cases?'
        : 'What industries have you supported with business cases?',
      answer: isEs
        ? 'Banca, seguros, retail, manufactura, tecnología, telecomunicaciones, salud, gobierno y servicios profesionales. El rigor del análisis es transversal; adaptamos el lenguaje y los indicadores al sector del cliente.'
        : 'Banking, insurance, retail, manufacturing, technology, telecommunications, healthcare, government and professional services. The rigor of the analysis is transversal; we adapt the language and indicators to the client\'s sector.',
    },
    {
      question: isEs
        ? '¿El business case garantiza la aprobación?'
        : 'Does the business case guarantee approval?',
      answer: isEs
        ? 'No. Un business case bien hecho aumenta sustancialmente la probabilidad de aprobación al presentar argumentos claros, números rigurosos y riesgos explícitos. La decisión final siempre es de la junta o comité. Lo que sí garantizamos es que la decisión se tome con información de calidad.'
        : 'No. A well-done business case substantially increases the probability of approval by presenting clear arguments, rigorous numbers and explicit risks. The final decision is always the board\'s or committee\'s. What we do guarantee is that the decision is made with quality information.',
    },
    {
      question: isEs
        ? '¿Cómo se cobra un business case?'
        : 'How is a business case charged?',
      answer: isEs
        ? 'Por proyecto fijo según alcance acordado. Incluye discovery, análisis, documentación y una ronda de revisiones. Presentación en junta y rondas adicionales de ajuste se cotizan por separado si se requieren. No hay costos ocultos.'
        : 'Fixed per project according to agreed scope. Includes discovery, analysis, documentation and one round of revisions. Board presentation and additional adjustment rounds are quoted separately if required. No hidden costs.',
    },
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
                    <span className="text-turquesa font-medium">
                      {crumb.label}
                    </span>
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
                  <FileText className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Casos de Negocio' : 'Business Cases'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Gestión de Proyectos' : 'Project Management'}
                  </p>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs
                  ? 'Business cases que convencen a tu junta y desbloquean inversiones'
                  : 'Business cases that convince your board and unlock investments'}
              </h1>

              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {isEs
                  ? 'Elaboramos casos de negocio rigurosos con análisis financiero (ROI, VPN, TIR, payback), alternativas evaluadas y presentación ejecutiva. Para que tus proyectos críticos obtengan la aprobación que merecen.'
                  : 'We develop rigorous business cases with financial analysis (ROI, NPV, IRR, payback), alternatives evaluated and executive presentation. So your critical projects get the approval they deserve.'}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-6 py-3 rounded-lg hover:bg-menta transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Solicitar Business Case' : 'Request Business Case'}
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
                  {
                    value: '20+',
                    label: isEs ? 'business cases elaborados' : 'business cases developed',
                  },
                  {
                    value: 'ROI',
                    label: isEs ? 'riguroso' : 'rigorous',
                  },
                  {
                    icon: true,
                    label: isEs ? 'Presentación ejecutiva' : 'Executive presentation',
                  },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    {stat.icon ? (
                      <Presentation className="w-4 h-4 text-turquesa" />
                    ) : (
                      <span className="text-turquesa font-bold">{stat.value}</span>
                    )}
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
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {isEs ? 'Componentes del Business Case' : 'Business Case Components'}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {isEs
                      ? 'Análisis, financiero y narrativa'
                      : 'Analysis, financial and narrative'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Search, label: isEs ? 'Situación' : 'Situation', c: 'turquesa' },
                    { icon: Layers, label: isEs ? 'Alternativas' : 'Alternatives', c: 'menta' },
                    { icon: PieChart, label: 'ROI / VPN / TIR', c: 'violeta' },
                    { icon: Presentation, label: isEs ? 'Presentación' : 'Presentation', c: 'turquesa' },
                  ].map((item, idx) => {
                    const c = colorClasses[item.c as keyof typeof colorClasses];
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className={`${c.bg} rounded-xl p-4 flex items-center gap-3 border ${c.border}`}
                      >
                        <item.icon className={`w-6 h-6 ${c.text}`} />
                        <span className={`text-sm font-medium ${c.text}`}>
                          {item.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUÉ ES CASO DE NEGOCIO
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
                {isEs ? '¿Qué es un Caso de Negocio?' : 'What is a Business Case?'}
              </span>
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs
                  ? 'Documento que justifica una inversión con datos y argumentos'
                  : 'Document that justifies an investment with data and arguments'}
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs
                    ? 'Un caso de negocio (business case) es un documento ejecutivo que presenta la situación actual, las alternativas consideradas, el análisis financiero (ROI, VPN, TIR, payback) y la recomendación. Su objetivo es apoyar la decisión de invertir —o no— en un proyecto, con información rigurosa que responda las preguntas de la junta directiva, comités de inversión o financiadores.'
                    : 'A business case is an executive document that presents the current situation, alternatives considered, financial analysis (ROI, NPV, IRR, payback) and the recommendation. Its purpose is to support the decision to invest —or not— in a project, with rigorous information that answers the questions of the board, investment committees or funders.'}
                </p>
                <p>
                  <strong className="text-azul-marino dark:text-white">
                    {isEs ? 'Cuándo lo necesitas:' : 'When you need it:'}
                  </strong>{' '}
                  {isEs
                    ? 'Cuando la inversión es significativa, varios proyectos compiten por presupuesto, la junta es escéptica, o necesitas financiamiento externo. Un business case bien hecho multiplica la probabilidad de aprobación.'
                    : 'When the investment is significant, several projects compete for budget, the board is skeptical, or you need external financing. A well-done business case multiplies the probability of approval.'}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="bg-blanco-hueso dark:bg-card rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-6 text-center">
                  {isEs ? 'Diagrama de componentes' : 'Component diagram'}
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: BookOpen, t: isEs ? 'Situación actual' : 'Current situation', c: 'turquesa' },
                    { icon: Lightbulb, t: isEs ? 'Alternativas' : 'Alternatives', c: 'menta' },
                    { icon: BarChart3, t: isEs ? 'Análisis financiero' : 'Financial analysis', c: 'violeta' },
                    { icon: Shield, t: isEs ? 'Riesgos' : 'Risks', c: 'turquesa' },
                    { icon: Target, t: isEs ? 'Alineación estratégica' : 'Strategic alignment', c: 'menta' },
                    { icon: Presentation, t: isEs ? 'Presentación ejecutiva' : 'Executive presentation', c: 'violeta' },
                  ].map((item, idx) => {
                    const c = colorClasses[item.c as keyof typeof colorClasses];
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-4 p-4 rounded-xl ${c.bg} border ${c.border}`}
                      >
                        <item.icon className={`w-6 h-6 ${c.text}`} />
                        <span className={`font-medium ${c.text}`}>{item.t}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROBLEMA QUE RESUELVE - Grid 2x2
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs
                ? 'Problema que resuelve un business case'
                : 'Problem a business case solves'}
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {problems.map((p, idx) => {
              const c = colorClasses[p.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-background p-6 rounded-2xl border border-gris-arena/20 hover:shadow-brand transition-all duration-300 h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <p.icon className={`w-6 h-6 ${c.text}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-2">
                          {p.title}
                        </h3>
                        <p className="text-foreground/70 text-sm leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          QUÉ INCLUYE - Grid 2x3 + 1
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
              {isEs ? 'Alcance' : 'Scope'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Qué incluye nuestro business case' : 'What our business case includes'}
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includes.map((item, idx) => {
              const c = colorClasses[item.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-white dark:bg-card p-6 rounded-2xl shadow-brand hover:shadow-brand-lg transition-all duration-300 border-t-4 ${c.border.replace('/20', '')} h-full`}
                  >
                    <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <item.icon className={`w-6 h-6 ${c.text}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
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
          BENEFICIOS - Stats
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-azul-marino">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              {isEs ? 'Beneficios medibles' : 'Measurable benefits'}
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <b.icon className="w-6 h-6 text-turquesa" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-turquesa mb-1">
                    {b.stat}
                  </div>
                  <div className="text-sm text-white/80 font-medium mb-2">
                    {b.label}
                  </div>
                  <p className="text-white/60 text-sm">{b.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          CASO DE ÉXITO - ERP junta escéptica
          ===================================================== */}
      <section id="caso-exito" className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-white dark:bg-background rounded-3xl p-8 lg:p-12 overflow-hidden relative shadow-brand">
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
                        ? 'Business case ERP convence a junta escéptica'
                        : 'ERP business case convinces skeptical board'}
                    </h3>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-6">
                      <p className="text-sm text-foreground/60 mb-2">
                        {isEs
                          ? 'Retail • 1.200 empleados • Inversión ERP $2.5M'
                          : 'Retail • 1,200 employees • ERP investment $2.5M'}
                      </p>
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Desafío' : 'Challenge'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs
                          ? 'La junta había rechazado dos intentos previos de implementar ERP por falta de claridad en ROI y riesgos. El CIO necesitaba un business case impecable que respondiera objeciones y mostrara escenarios conservadores y sensibilidad.'
                          : 'The board had rejected two previous ERP implementation attempts due to lack of ROI clarity and risks. The CIO needed an impeccable business case that addressed objections and showed conservative scenarios and sensitivity.'}
                      </p>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución' : 'Solution'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs
                          ? 'Alternative desarrolló el business case completo: análisis de situación, tres alternativas (no hacer nada, ERP A, ERP B), modelo financiero con ROI 18%, payback 4.2 años, VPN positivo en todos los escenarios de sensibilidad. Documento ejecutivo y deck para junta. Consultor acompañó la presentación.'
                          : 'Alternative developed the complete business case: situation analysis, three alternatives (do nothing, ERP A, ERP B), financial model with 18% ROI, 4.2-year payback, positive NPV in all sensitivity scenarios. Executive document and board deck. Consultant supported the presentation.'}
                      </p>
                    </div>
                    <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                      {isEs
                        ? '"Por primera vez la junta tuvo números claros y riesgos explícitos. Aprobaron por unanimidad. El business case de Alternative fue la diferencia."'
                        : '"For the first time the board had clear numbers and explicit risks. They approved unanimously. Alternative\'s business case made the difference."'}
                      <span className="block mt-2 text-sm text-turquesa not-italic font-medium">
                        — CIO, Retail
                      </span>
                    </blockquote>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        value: 'Unanimidad',
                        label: isEs ? 'aprobación junta' : 'board approval',
                      },
                      { value: '18%', label: 'ROI', sub: isEs ? 'conservador' : 'conservative' },
                      {
                        value: '4.2',
                        label: isEs ? 'años payback' : 'years payback',
                      },
                      {
                        value: '3',
                        label: isEs ? 'alternativas' : 'alternatives',
                        sub: isEs ? 'evaluadas' : 'evaluated',
                      },
                      {
                        value: '100%',
                        label: isEs ? 'escenarios' : 'scenarios',
                        sub: isEs ? 'VPN positivo' : 'positive NPV',
                      },
                      {
                        value: '1',
                        label: isEs ? 'presentación' : 'presentation',
                        sub: isEs ? 'en junta' : 'at board',
                      },
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="bg-blanco-hueso dark:bg-card p-4 rounded-2xl shadow-brand text-center"
                      >
                        <div className="text-xl lg:text-2xl font-bold text-turquesa mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm font-medium text-azul-marino dark:text-white">
                          {stat.label}
                        </div>
                        {stat.sub && (
                          <div className="text-xs text-foreground/50">{stat.sub}</div>
                        )}
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
          CUÁNDO NECESITAS BUSINESS CASE - Checklist interactivo
          ===================================================== */}
      <section id="checklist-business-case" className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs
                ? '¿Cuándo necesitas un business case? Test rápido'
                : 'When do you need a business case? Quick test'}
            </h2>
            <p className="text-foreground/70">
              {isEs
                ? 'Marca las que apliquen a tu situación:'
                : 'Check those that apply to your situation:'}
            </p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="max-w-2xl mx-auto">
              <div className="bg-blanco-hueso dark:bg-card rounded-2xl p-8 shadow-brand">
                <div className="space-y-4 mb-8">
                  {checklistItems.map((item, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => toggleCheck(idx)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        checkedItems[idx]
                          ? 'border-turquesa bg-turquesa/5'
                          : 'border-gris-arena/20 hover:border-turquesa/50'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                          checkedItems[idx]
                            ? 'border-turquesa bg-turquesa'
                            : 'border-gris-arena/40'
                        }`}
                      >
                        {checkedItems[idx] && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span
                        className={`${
                          checkedItems[idx]
                            ? 'text-azul-marino dark:text-white font-medium'
                            : 'text-foreground/70'
                        }`}
                      >
                        {item}
                      </span>
                    </motion.button>
                  ))}
                </div>
                <motion.div
                  initial={false}
                  animate={{ opacity: 1 }}
                  className={`p-6 rounded-xl text-center ${
                    checkCount >= 6
                      ? 'bg-violeta/10 border border-violeta/20'
                      : checkCount >= 4
                        ? 'bg-turquesa/10 border border-turquesa/20'
                        : checkCount >= 2
                          ? 'bg-menta/10 border border-menta/20'
                          : 'bg-gris-arena/10 border border-gris-arena/20'
                  }`}
                >
                  <p className="text-2xl font-bold text-azul-marino dark:text-white mb-2">
                    {checkCount} / 8 {isEs ? 'marcados' : 'checked'}
                  </p>
                  <p
                    className={`font-medium ${
                      checkCount >= 6
                        ? 'text-violeta'
                        : checkCount >= 4
                          ? 'text-turquesa'
                          : checkCount >= 2
                            ? 'text-oliva'
                            : 'text-foreground/70'
                    }`}
                  >
                    {checkCount >= 6
                      ? isEs
                        ? 'Un business case es muy recomendable'
                        : 'A business case is highly recommended'
                      : checkCount >= 4
                        ? isEs
                          ? 'Un business case te ayudará a aprobar'
                          : 'A business case will help you get approval'
                        : checkCount >= 2
                          ? isEs
                            ? 'Considera un business case'
                            : 'Consider a business case'
                          : isEs
                            ? 'Evalúa si tu proyecto lo requiere'
                            : 'Evaluate if your project requires it'}
                  </p>
                </motion.div>
                {checkCount >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-center"
                  >
                    <Link
                      href={`/${locale}/contacto`}
                      className="inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-6 py-3 rounded-lg hover:bg-menta transition-all duration-300 shadow-lg group"
                    >
                      {isEs ? 'Solicitar Business Case' : 'Request Business Case'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          ANÁLISIS FINANCIERO - Tabla ROI, VPN, TIR, Payback, Sensibilidad
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
              {isEs ? 'Metodología' : 'Methodology'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Análisis financiero que incluimos' : 'Financial analysis we include'}
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              {isEs
                ? 'Cada business case utiliza estos indicadores estándar para comparar alternativas y sustentar la recomendación.'
                : 'Each business case uses these standard indicators to compare alternatives and support the recommendation.'}
            </p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-background rounded-2xl shadow-brand overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gris-arena/20 bg-turquesa/5">
                        <th className="h-12 px-4 text-left align-middle font-semibold text-azul-marino dark:text-white">
                          {isEs ? 'Indicador' : 'Indicator'}
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-semibold text-azul-marino dark:text-white">
                          {isEs ? 'Descripción' : 'Description'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {financialTerms.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gris-arena/10 hover:bg-blanco-hueso/50 dark:hover:bg-turquesa/5 transition-colors"
                        >
                          <td className="px-4 py-4 align-top font-medium text-turquesa">
                            {isEs ? row.termEs : row.term}
                          </td>
                          <td className="px-4 py-4 text-foreground/70 leading-relaxed">
                            {row.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          PROCESO DE TRABAJO - Timeline 4 fases
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
              {isEs ? 'Proceso' : 'Process'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Proceso de trabajo en 4 fases' : '4-phase work process'}
            </h2>
          </AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-turquesa/20 hidden md:block" />
              <div className="space-y-8">
                {processPhases.map((phase, idx) => {
                  const c = colorClasses[phase.color as keyof typeof colorClasses];
                  return (
                    <AnimatedSection key={idx} delay={idx * 0.1}>
                      <motion.div
                        whileHover={{ x: 10 }}
                        className="flex gap-6 items-start"
                      >
                        <div
                          className={`relative z-10 w-16 h-16 ${c.bg} rounded-2xl flex items-center justify-center flex-shrink-0 border-2 ${c.border}`}
                        >
                          <phase.icon className={`w-8 h-8 ${c.text}`} />
                        </div>
                        <div className="flex-1 bg-blanco-hueso dark:bg-card p-6 rounded-2xl shadow-brand">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-sm font-bold ${c.text}`}>
                              {isEs ? 'Fase' : 'Phase'} {phase.phase}
                            </span>
                            <span className="text-xl font-semibold text-azul-marino dark:text-white">
                              {phase.title}
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
          FAQ
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs
                ? 'Preguntas frecuentes sobre business cases'
                : 'Frequently asked questions about business cases'}
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
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs
                  ? '¿Listo para que tu proyecto tenga un business case de nivel junta?'
                  : 'Ready for your project to have a board-level business case?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs
                  ? 'Cuéntanos tu iniciativa. Te proponemos alcance, cronograma y tarifa para un business case riguroso que desbloquee la aprobación.'
                  : 'Tell us about your initiative. We propose scope, schedule and fee for a rigorous business case that unlocks approval.'}
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Análisis financiero (ROI, VPN, TIR, payback)' : 'Financial analysis (ROI, NPV, IRR, payback)',
                  isEs ? 'Alternativas evaluadas y recomendación' : 'Alternatives evaluated and recommendation',
                  isEs ? 'Documento ejecutivo + modelo Excel' : 'Executive document + Excel model',
                  isEs ? 'Presentación para junta si la necesitas' : 'Board presentation if you need it',
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
                    {isEs ? 'Solicitar Propuesta de Business Case' : 'Request Business Case Proposal'}
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

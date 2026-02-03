'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import {
  BarChart3,
  ArrowRight,
  ChevronDown,
  Database,
  TrendingUp,
  CheckCircle2,
  Building2,
  Phone,
  FileText,
  Users,
  Shield,
  Sparkles,
  Clock,
  Search,
  Target,
  Award,
  AlertTriangle,
  Eye,
  Brain,
  Layers,
  Zap,
  Monitor,
  BookOpen,
  Globe,
  Code,
  Calendar
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

export default function AnalisisDatosPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Transformación Digital' : 'Digital Transformation', href: `/${locale}/servicios/transformacion-digital` },
    { label: isEs ? 'Análisis de Datos' : 'Data Analysis', href: null }
  ];

  const forWho = [
    {
      icon: Database,
      title: isEs ? 'Datos dispersos en múltiples sistemas' : 'Data scattered across multiple systems',
      description: isEs
        ? 'Ventas en un sistema, finanzas en otro, inventario en Excel. Nadie tiene vista consolidada. Imposible responder "¿cuál es mi producto más rentable?"'
        : 'Sales in one system, finance in another, inventory in Excel. No one has consolidated view. Impossible to answer "what is my most profitable product?"',
      color: 'turquesa'
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'Decisiones por intuición vs datos objetivos' : 'Decisions by intuition vs objective data',
      description: isEs
        ? 'Gerencia decide basada en "sentimiento" o experiencia porque no tiene datos accesibles para analizar. Riesgo alto de decisiones equivocadas.'
        : 'Management decides based on "feeling" or experience because they don\'t have accessible data to analyze. High risk of wrong decisions.',
      color: 'menta'
    },
    {
      icon: Clock,
      title: isEs ? 'Reportes manuales que llegan tarde' : 'Manual reports that arrive late',
      description: isEs
        ? 'Alguien dedica 8 horas cada semana consolidando datos en Excel. Reporte llega 5 días tarde y ya está desactualizado para decisión.'
        : 'Someone dedicates 8 hours each week consolidating data in Excel. Report arrives 5 days late and is already outdated for decision.',
      color: 'violeta'
    },
    {
      icon: Eye,
      title: isEs ? 'Falta de visibilidad ejecutiva en tiempo real' : 'Lack of real-time executive visibility',
      description: isEs
        ? 'CEO/CFO/COO no saben estado real del negocio hasta cierre mensual. No pueden reaccionar a tiempo a problemas o oportunidades.'
        : 'CEO/CFO/COO don\'t know real business state until monthly close. They can\'t react in time to problems or opportunities.',
      color: 'turquesa'
    },
    {
      icon: TrendingUp,
      title: isEs ? 'Necesidad de análisis más sofisticado' : 'Need for more sophisticated analysis',
      description: isEs
        ? 'Quieres identificar tendencias, patrones, correlaciones. Análisis descriptivo ("qué pasó") y predictivo ("qué pasará").'
        : 'You want to identify trends, patterns, correlations. Descriptive analysis ("what happened") and predictive ("what will happen").',
      color: 'menta'
    },
    {
      icon: Award,
      title: isEs ? 'Competencia más data-driven tiene ventaja' : 'More data-driven competition has advantage',
      description: isEs
        ? 'Competidores toman decisiones más rápidas y acertadas porque tienen mejor información. Necesitas cerrar brecha.'
        : 'Competitors make faster and more accurate decisions because they have better information. You need to close gap.',
      color: 'violeta'
    }
  ];

  const analysisLevels = [
    {
      level: '1',
      title: isEs ? 'DESCRIPTIVO' : 'DESCRIPTIVE',
      question: isEs ? '¿Qué pasó?' : 'What happened?',
      description: isEs
        ? 'Reportes y dashboards que muestran QUÉ está pasando o pasó. KPIs actuales, históricos, comparaciones.'
        : 'Reports and dashboards showing WHAT is happening or happened. Current, historical KPIs, comparisons.',
      examples: isEs
        ? ['Dashboard de ventas (mes actual vs mes anterior)', 'Reporte de top 10 clientes', 'Ventas por producto, región, vendedor', 'Estado de inventario actual']
        : ['Sales dashboard (current month vs previous month)', 'Top 10 clients report', 'Sales by product, region, seller', 'Current inventory status'],
      tools: isEs ? 'Power BI, Tableau, Google Data Studio, Excel avanzado' : 'Power BI, Tableau, Google Data Studio, Advanced Excel',
      complexity: isEs ? 'Baja-Media' : 'Low-Medium',
      color: 'turquesa'
    },
    {
      level: '2',
      title: isEs ? 'DIAGNÓSTICO' : 'DIAGNOSTIC',
      question: isEs ? '¿Por qué pasó?' : 'Why did it happen?',
      description: isEs
        ? 'Análisis de causas raíz. Drill-down para entender drivers de resultados. Correlaciones.'
        : 'Root cause analysis. Drill-down to understand result drivers. Correlations.',
      examples: isEs
        ? ['¿Por qué ventas bajaron 15%? (análisis por canal, producto, temporalidad)', '¿Qué productos tienen mayor tasa de devolución y por qué?', '¿Cuáles clientes están en riesgo de churn?']
        : ['Why did sales drop 15%? (analysis by channel, product, temporality)', 'What products have highest return rate and why?', 'Which clients are at churn risk?'],
      tools: isEs ? 'Power BI con DAX avanzado, Tableau, SQL para análisis ad-hoc' : 'Power BI with advanced DAX, Tableau, SQL for ad-hoc analysis',
      complexity: isEs ? 'Media' : 'Medium',
      color: 'menta'
    },
    {
      level: '3',
      title: isEs ? 'PREDICTIVO' : 'PREDICTIVE',
      question: isEs ? '¿Qué pasará?' : 'What will happen?',
      description: isEs
        ? 'Modelos estadísticos y machine learning para predecir comportamientos futuros.'
        : 'Statistical models and machine learning to predict future behaviors.',
      examples: isEs
        ? ['Forecast de ventas próximos 3 meses', 'Predicción de demanda por producto', 'Clientes con mayor probabilidad de comprar (lead scoring)', 'Detección temprana de fraude']
        : ['Sales forecast next 3 months', 'Demand prediction by product', 'Clients with highest purchase probability (lead scoring)', 'Early fraud detection'],
      tools: isEs ? 'Python/R, Azure ML, Power BI con modelos predictivos' : 'Python/R, Azure ML, Power BI with predictive models',
      complexity: isEs ? 'Media-Alta' : 'Medium-High',
      color: 'violeta'
    },
    {
      level: '4',
      title: isEs ? 'PRESCRIPTIVO' : 'PRESCRIPTIVE',
      question: isEs ? '¿Qué debo hacer?' : 'What should I do?',
      description: isEs
        ? 'Recomendaciones automatizadas de acciones basadas en datos y objetivos de negocio.'
        : 'Automated action recommendations based on data and business objectives.',
      examples: isEs
        ? ['Optimización de pricing dinámico', 'Recomendación de productos a cliente (Amazon style)', 'Asignación óptima de recursos', 'Optimización de rutas de distribución']
        : ['Dynamic pricing optimization', 'Product recommendation to client (Amazon style)', 'Optimal resource allocation', 'Distribution route optimization'],
      tools: isEs ? 'Python/R con algoritmos de optimización, Azure ML, herramientas especializadas' : 'Python/R with optimization algorithms, Azure ML, specialized tools',
      complexity: isEs ? 'Alta' : 'High',
      color: 'turquesa'
    }
  ];

  const processPhases = [
    {
      phase: isEs ? 'DISCOVERY Y DEFINICIÓN' : 'DISCOVERY AND DEFINITION',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Identificación de fuentes de datos (sistemas, bases, Excels), Entendimiento de preguntas de negocio críticas, Definición de KPIs y métricas prioritarias, Análisis de calidad de datos actual, Definición de audiencias (quién usa qué dashboard)'
        : 'Identification of data sources (systems, databases, Excels), Understanding of critical business questions, Definition of KPIs and priority metrics, Analysis of current data quality, Definition of audiences (who uses which dashboard)',
      icon: Search,
      deliverable: isEs ? 'Inventario de datos + lista de KPIs + wireframes de dashboards' : 'Data inventory + KPI list + dashboard wireframes',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'DISEÑO DE ARQUITECTURA' : 'ARCHITECTURE DESIGN',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Diseño de arquitectura de datos (ETL, data warehouse/lake), Modelo dimensional de datos (tablas de hechos y dimensiones), Diseño de dashboards (mockups visuales), Selección de herramienta BI apropiada, Plan de gobernanza de datos'
        : 'Data architecture design (ETL, data warehouse/lake), Dimensional data model (fact and dimension tables), Dashboard design (visual mockups), Selection of appropriate BI tool, Data governance plan',
      icon: Layers,
      deliverable: isEs ? 'Arquitectura de datos + diseño de dashboards aprobados' : 'Data architecture + approved dashboard designs',
      color: 'menta'
    },
    {
      phase: isEs ? 'DESARROLLO' : 'DEVELOPMENT',
      duration: isEs ? '3-6 semanas' : '3-6 weeks',
      description: isEs
        ? 'Construcción de ETL (extracción, transformación, carga de datos), Modelado de datos en herramienta BI, Desarrollo de dashboards interactivos, Creación de reportes automatizados, Testing exhaustivo de cálculos y visualizaciones'
        : 'ETL construction (extraction, transformation, data loading), Data modeling in BI tool, Interactive dashboard development, Automated report creation, Exhaustive testing of calculations and visualizations',
      icon: Code,
      deliverable: isEs ? 'Dashboards y reportes funcionando con datos reales' : 'Dashboards and reports working with real data',
      color: 'violeta'
    },
    {
      phase: isEs ? 'DESPLIEGUE Y CAPACITACIÓN' : 'DEPLOYMENT AND TRAINING',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Despliegue de dashboards a usuarios finales, Capacitación por rol (ejecutivos, gerencia media, analistas), Documentación de uso de dashboards, Configuración de alertas y suscripciones automáticas, Soporte intensivo primeras semanas'
        : 'Dashboard deployment to end users, Training by role (executives, middle management, analysts), Dashboard usage documentation, Alert and automatic subscription configuration, Intensive support first weeks',
      icon: Users,
      deliverable: isEs ? 'Usuarios capacitados usando dashboards activamente' : 'Trained users actively using dashboards',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'OPTIMIZACIÓN Y GOBERNANZA' : 'OPTIMIZATION AND GOVERNANCE',
      duration: isEs ? 'Ongoing' : 'Ongoing',
      description: isEs
        ? 'Monitoreo de uso de dashboards (qué se usa, qué no), Ajustes basados en feedback de usuarios, Nuevos KPIs o dashboards según necesidad, Actualización de datos (frecuencia, fuentes), Gobernanza de datos (calidad, accesos)'
        : 'Dashboard usage monitoring (what\'s used, what\'s not), Adjustments based on user feedback, New KPIs or dashboards as needed, Data updates (frequency, sources), Data governance (quality, access)',
      icon: Monitor,
      deliverable: isEs ? 'BI operando y evolucionando continuamente' : 'BI operating and evolving continuously',
      color: 'menta'
    }
  ];

  const includes = [
    {
      title: isEs ? 'Arquitectura y Desarrollo' : 'Architecture and Development',
      icon: Layers,
      items: isEs
        ? ['Diseño de arquitectura de datos', 'Construcción de ETL (consolidación de datos)', 'Modelado dimensional de datos', 'Desarrollo de dashboards ejecutivos', 'Reportes automatizados', 'Configuración de alertas']
        : ['Data architecture design', 'ETL construction (data consolidation)', 'Dimensional data modeling', 'Executive dashboard development', 'Automated reports', 'Alert configuration'],
      color: 'turquesa'
    },
    {
      title: isEs ? 'Dashboards Típicos' : 'Typical Dashboards',
      icon: BarChart3,
      items: isEs
        ? ['Dashboard ejecutivo (KPIs corporativos)', 'Dashboard financiero (P&L, flujo de caja, márgenes)', 'Dashboard comercial (ventas, pipeline, clientes)', 'Dashboard operacional (producción, inventario, entregas)', 'Dashboards específicos según industria']
        : ['Executive dashboard (corporate KPIs)', 'Financial dashboard (P&L, cash flow, margins)', 'Commercial dashboard (sales, pipeline, clients)', 'Operational dashboard (production, inventory, deliveries)', 'Industry-specific dashboards'],
      color: 'menta'
    },
    {
      title: isEs ? 'Capacitación' : 'Training',
      icon: BookOpen,
      items: isEs
        ? ['Capacitación a ejecutivos (interpretación de dashboards)', 'Capacitación a analistas (creación de reportes)', 'Documentación de dashboards', 'Videos tutoriales', 'Sesiones Q&A']
        : ['Executive training (dashboard interpretation)', 'Analyst training (report creation)', 'Dashboard documentation', 'Tutorial videos', 'Q&A sessions'],
      color: 'violeta'
    },
    {
      title: isEs ? 'Soporte y Gobernanza' : 'Support and Governance',
      icon: Shield,
      items: isEs
        ? ['Soporte 3-6 meses post-implementación', 'Actualizaciones de dashboards según necesidad', 'Gobernanza de datos (calidad, accesos)', 'Monitoreo de uso y optimización']
        : ['3-6 months post-implementation support', 'Dashboard updates as needed', 'Data governance (quality, access)', 'Usage monitoring and optimization'],
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '100%', label: isEs ? 'Visibilidad consolidada de KPIs críticos' : 'Consolidated visibility of critical KPIs', icon: Eye },
    { value: '80%+', label: isEs ? 'Decisiones basadas en datos (vs intuición)' : 'Data-driven decisions (vs intuition)', icon: Brain },
    { value: '8-12', label: isEs ? 'horas/semana Tiempo liberado de reportes manuales' : 'hours/week Time freed from manual reports', icon: Clock },
    { value: 'Tiempo real', label: isEs ? 'Acceso a información actualizada' : 'Access to updated information', icon: Zap },
    { value: '6-12', label: isEs ? 'semanas Implementación de BI completo' : 'weeks Complete BI implementation', icon: Calendar },
    { value: 'ROI', label: isEs ? 'Positivo en 6-12 meses (decisiones mejores + tiempo ahorrado)' : 'Positive in 6-12 months (better decisions + time saved)', icon: TrendingUp }
  ];

  const biTools = [
    {
      tool: 'Power BI',
      bestFor: isEs ? 'PYMES-Grandes, ecosistema Microsoft' : 'SMEs-Large, Microsoft ecosystem',
      advantages: isEs ? 'Costo-efectivo, integración Office 365, potente' : 'Cost-effective, Office 365 integration, powerful',
      considerations: isEs ? 'Curva aprendizaje media' : 'Medium learning curve',
      color: 'turquesa'
    },
    {
      tool: 'Tableau',
      bestFor: isEs ? 'Grandes empresas, análisis complejo' : 'Large companies, complex analysis',
      advantages: isEs ? 'Visualizaciones sofisticadas, altamente flexible' : 'Sophisticated visualizations, highly flexible',
      considerations: isEs ? 'Más costoso que Power BI' : 'More expensive than Power BI',
      color: 'menta'
    },
    {
      tool: 'Google Data Studio',
      bestFor: isEs ? 'Startups, presupuesto limitado' : 'Startups, limited budget',
      advantages: isEs ? 'Gratuito, integración Google ecosystem' : 'Free, Google ecosystem integration',
      considerations: isEs ? 'Menos potente que Power BI/Tableau' : 'Less powerful than Power BI/Tableau',
      color: 'violeta'
    },
    {
      tool: 'Qlik Sense',
      bestFor: isEs ? 'Empresas grandes, análisis asociativo' : 'Large companies, associative analysis',
      advantages: isEs ? 'Motor asociativo único, escalable' : 'Unique associative engine, scalable',
      considerations: isEs ? 'Costoso, implementación compleja' : 'Expensive, complex implementation',
      color: 'turquesa'
    },
    {
      tool: 'Looker',
      bestFor: isEs ? 'Tech companies, equipos técnicos' : 'Tech companies, technical teams',
      advantages: isEs ? 'Basado en código (LookML), flexible' : 'Code-based (LookML), flexible',
      considerations: isEs ? 'Requiere equipo técnico fuerte' : 'Requires strong technical team',
      color: 'menta'
    }
  ];

  const faqs = [
    {
      question: isEs ? '¿Cómo determinan alcance y costo de implementación de BI?' : 'How do you determine scope and cost of BI implementation?',
      answer: isEs
        ? 'Depende de: cantidad de fuentes de datos a consolidar, complejidad de transformaciones requeridas, número de dashboards/reportes, frecuencia de actualización (tiempo real vs diario), usuarios simultáneos, necesidad de análisis predictivo. Proyecto pequeño (1-2 fuentes, 3-5 dashboards). Proyecto mediano (3-5 fuentes, 8-12 dashboards). Proyecto grande (5+ fuentes, 15+ dashboards, predictivo). Evaluamos en diagnóstico inicial y presentamos opciones por fases.'
        : 'Depends on: number of data sources to consolidate, complexity of required transformations, number of dashboards/reports, update frequency (real-time vs daily), simultaneous users, need for predictive analysis. Small project (1-2 sources, 3-5 dashboards). Medium project (3-5 sources, 8-12 dashboards). Large project (5+ sources, 15+ dashboards, predictive). We evaluate in initial diagnosis and present options by phases.'
    },
    {
      question: isEs ? '¿Necesito Data Warehouse o puedo conectar directamente a sistemas?' : 'Do I need Data Warehouse or can I connect directly to systems?',
      answer: isEs
        ? 'Conexión directa: Funciona para análisis simples, pocas fuentes, datos limpios. Ventaja: más rápido de implementar. Data Warehouse: Recomendable cuando: múltiples fuentes, datos sucios que necesitan limpieza, análisis histórico (sistemas operacionales no guardan historia), necesidad de cálculos complejos, alto volumen de consultas. Mayoría de proyectos medianos-grandes se benefician de DW ligero (puede ser Azure SQL, Snowflake, o hasta base relacional simple). Evaluamos y recomendamos según caso.'
        : 'Direct connection: Works for simple analysis, few sources, clean data. Advantage: faster to implement. Data Warehouse: Recommended when: multiple sources, dirty data needing cleaning, historical analysis (operational systems don\'t keep history), need for complex calculations, high query volume. Most medium-large projects benefit from light DW (can be Azure SQL, Snowflake, or even simple relational database). We evaluate and recommend according to case.'
    },
    {
      question: isEs ? '¿Alternative solo implementa dashboards o también ejecuta análisis?' : 'Does Alternative only implement dashboards or also execute analysis?',
      answer: isEs
        ? 'Ambos modelos: (1) Implementación de capacidad BI: Desarrollamos dashboards, capacitamos tu equipo, ellos ejecutan análisis ongoing. (2) Análisis como servicio: Alternative ejecuta análisis periódicos y entrega insights (ej: análisis mensual de rentabilidad con recomendaciones). Modelo 1 es más común (capacidad interna sostenible). Modelo 2 para empresas sin analista interno. También ofrecemos híbrido: implementamos + acompañamiento analítico primeros 6 meses.'
        : 'Both models: (1) BI capability implementation: We develop dashboards, train your team, they execute ongoing analysis. (2) Analysis as service: Alternative executes periodic analysis and delivers insights (e.g.: monthly profitability analysis with recommendations). Model 1 is more common (sustainable internal capability). Model 2 for companies without internal analyst. We also offer hybrid: we implement + analytical accompaniment first 6 months.'
    },
    {
      question: isEs ? '¿Qué tan actualizada estará la información en dashboards?' : 'How updated will information be in dashboards?',
      answer: isEs
        ? 'Depende de necesidad y viabilidad técnica: Tiempo real: Dashboards actualizados cada pocos segundos (ej: monitoreo de producción, operaciones call center). Requiere conexiones directas o streaming. Cerca de tiempo real: Cada 15-30 minutos (ej: ventas retail). Diario: Actualización nocturna (mayoría de casos). Semanal/Mensual: Para análisis históricos o fuentes que solo actualizan periódicamente. Balanceamos necesidad de negocio vs complejidad técnica y costo. Mayoría de clientes operan felizmente con actualización diaria nocturna.'
        : 'Depends on need and technical viability: Real-time: Dashboards updated every few seconds (e.g.: production monitoring, call center operations). Requires direct connections or streaming. Near real-time: Every 15-30 minutes (e.g.: retail sales). Daily: Nightly update (majority of cases). Weekly/Monthly: For historical analysis or sources that only update periodically. We balance business need vs technical complexity and cost. Majority of clients operate happily with nightly daily update.'
    },
    {
      question: isEs ? '¿Puedo agregar nuevos dashboards después de implementación inicial?' : 'Can I add new dashboards after initial implementation?',
      answer: isEs
        ? 'Sí, absolutamente. Recomendamos enfoque iterativo: Fase 1 (inicial): Dashboards core más críticos (típicamente 5-8). Fase 2 (3-6 meses después): Nuevos dashboards según necesidades que surgieron. Fase 3 (ongoing): Evolución continua. Razones: (1) Aprendizaje de uso genera nuevas necesidades, (2) Presupuesto se distribuye en fases, (3) Cambio incremental es más manejable. Arquitectura de datos se diseña flexible desde inicio para facilitar expansión bajo costo adicional.'
        : 'Yes, absolutely. We recommend iterative approach: Phase 1 (initial): Most critical core dashboards (typically 5-8). Phase 2 (3-6 months later): New dashboards according to needs that arose. Phase 3 (ongoing): Continuous evolution. Reasons: (1) Usage learning generates new needs, (2) Budget distributed in phases, (3) Incremental change is more manageable. Data architecture designed flexible from start to facilitate expansion at low additional cost.'
    },
    {
      question: isEs ? '¿Alternative puede capacitar a mi equipo para que ellos creen reportes?' : 'Can Alternative train my team so they create reports?',
      answer: isEs
        ? 'Sí, ofrecemos capacitación en dos niveles: (1) Power User: Para analistas o usuarios técnicos que crearán nuevos reportes y dashboards. Curso 16-24 horas (teoría + práctica con datos reales de la empresa). Incluye: conceptos de modelado de datos, DAX/cálculos, mejores prácticas de visualización. (2) Usuario final: Para ejecutivos y gerencia que USAN dashboards pero no los crean. Curso 4-8 horas enfocado en interpretación y uso. Objetivo: autonomía para que tu equipo pueda crear nuevos reportes sin Alternative (sostenibilidad).'
        : 'Yes, we offer training at two levels: (1) Power User: For analysts or technical users who will create new reports and dashboards. 16-24 hour course (theory + practice with real company data). Includes: data modeling concepts, DAX/calculations, visualization best practices. (2) End user: For executives and management who USE dashboards but don\'t create them. 4-8 hour course focused on interpretation and use. Objective: autonomy so your team can create new reports without Alternative (sustainability).'
    }
  ];

  const colorClasses = {
    turquesa: { bg: 'bg-turquesa/10', text: 'text-turquesa', border: 'border-turquesa/20', badge: 'bg-turquesa/10 text-turquesa' },
    menta: { bg: 'bg-menta/10', text: 'text-menta', border: 'border-menta/20', badge: 'bg-menta/10 text-menta' },
    violeta: { bg: 'bg-violeta/10', text: 'text-violeta', border: 'border-violeta/20', badge: 'bg-violeta/10 text-violeta' }
  };

  return (
    <>
      {/* Reading Progress Indicator */}
      <ReadingProgress />

      {/* Service Sidebar */}
      <ServiceSidebar 
        locale={locale} 
        currentService="transformacion-digital"
      />

      {/* =====================================================
          HERO SECTION - Unique Design with Dashboard Mockup
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(108, 196, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(108, 196, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[10%] w-40 h-40 bg-turquesa/10 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[8%] w-32 h-32 bg-menta/10 rounded-full blur-2xl"
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
                  <BarChart3 className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Análisis de Datos' : 'Data Analysis'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Transformación Digital' : 'Digital Transformation'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Decisiones basadas en datos con dashboards y analytics'
                  : 'Data-driven decisions with dashboards and analytics'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Implementación de capacidades de Business Intelligence y análisis de datos: consolidación de datos dispersos, dashboards ejecutivos en tiempo real, reportes automatizados, analytics predictivo. Transforma datos en insights accionables para tomar mejores decisiones.'
                  : 'Implementation of Business Intelligence and data analysis capabilities: consolidation of scattered data, real-time executive dashboards, automated reports, predictive analytics. Transform data into actionable insights to make better decisions.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Implementa Business Intelligence' : 'Implement Business Intelligence'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/recursos`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Ver dashboards de ejemplo' : 'View example dashboards'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '30+', label: isEs ? 'dashboards implementados' : 'dashboards implemented' },
                  { value: '80%+', label: isEs ? 'decisiones basadas en datos' : 'data-driven decisions' },
                  { icon: true, label: isEs ? 'Visibilidad tiempo real de negocio' : 'Real-time business visibility' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    {stat.icon ? (
                      <Sparkles className="w-4 h-4 text-turquesa" />
                    ) : (
                      <span className="text-turquesa font-bold">{stat.value}</span>
                    )}
                    <span className="text-white/60 text-sm">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual - Dashboard Mockup Floating */}
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
                  {/* Dashboard Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-turquesa" />
                    <div className="w-3 h-3 rounded-full bg-menta" />
                    <div className="w-3 h-3 rounded-full bg-violeta" />
                    <span className="ml-auto text-white/40 text-sm">
                      {isEs ? 'Dashboard Ejecutivo' : 'Executive Dashboard'}
                    </span>
                  </div>

                  {/* Dashboard Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {[
                      { label: isEs ? 'Ventas' : 'Sales', value: '$2.4M', change: '+12%', color: 'turquesa' },
                      { label: isEs ? 'Margen' : 'Margin', value: '28%', change: '+4%', color: 'menta' },
                      { label: isEs ? 'Clientes' : 'Clients', value: '1,240', change: '+8%', color: 'violeta' },
                      { label: isEs ? 'ROI' : 'ROI', value: '240%', change: '+15%', color: 'turquesa' }
                    ].map((metric, idx) => (
                      <div key={idx} className="bg-white/5 rounded-xl p-4">
                        <div className="text-white/60 text-xs mb-1">{metric.label}</div>
                        <div className="text-2xl font-bold text-turquesa mb-1">{metric.value}</div>
                        <div className="text-menta text-xs">↑ {metric.change}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart Area */}
                  <div className="h-32 bg-white/5 rounded-xl flex items-end justify-around gap-2 p-4">
                    {[60, 75, 65, 85, 70, 90, 80].map((height, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                        className="w-8 bg-gradient-to-t from-turquesa to-menta rounded-t"
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-turquesa rounded-2xl p-4 shadow-xl"
                >
                  <TrendingUp className="w-8 h-8 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUÉ ES ANÁLISIS DE DATOS SECTION - 3 Pasos Visuales
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'De datos dispersos a insights accionables' : 'From scattered data to actionable insights'}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              {
                number: '1',
                title: isEs ? 'Identificar y consolidar' : 'Identify and consolidate',
                description: isEs ? 'Fuentes de datos (ERP, CRM, Excel, bases de datos)' : 'Data sources (ERP, CRM, Excel, databases)',
                icon: Database,
                color: 'turquesa'
              },
              {
                number: '2',
                title: isEs ? 'Modelar y visualizar' : 'Model and visualize',
                description: isEs ? 'Estructura analítica, dashboards, reportes' : 'Analytical structure, dashboards, reports',
                icon: BarChart3,
                color: 'menta'
              },
              {
                number: '3',
                title: isEs ? 'Analizar y decidir' : 'Analyze and decide',
                description: isEs ? 'Insights accionables, decisiones basadas en datos' : 'Actionable insights, data-driven decisions',
                icon: Brain,
                color: 'violeta'
              }
            ].map((step, idx) => {
              const colors = colorClasses[step.color as keyof typeof colorClasses];
              return (
                <AnimatedSection key={idx} delay={idx * 0.1}>
                  <div className="bg-blanco-hueso dark:bg-card p-8 rounded-2xl shadow-brand text-center border border-gris-arena/20 relative">
                    {idx < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-turquesa to-menta z-10" />
                    )}
                    <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-3xl font-bold text-azul-marino dark:text-white">{step.number}</span>
                    </div>
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <step.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-foreground/70 text-sm">
                      {step.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection>
            <div className="bg-turquesa/10 border-l-4 border-turquesa rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-turquesa flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-2">
                    {isEs ? 'Problema que resuelve' : 'Problem it solves'}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {isEs 
                      ? 'Empresas tienen datos pero no información. Datos atrapados en silos (cada sistema, cada Excel). Gerencia decide por intuición porque no tiene visibilidad real. Reportes manuales que llegan tarde y desactualizados. Análisis de datos consolida, visualiza y hace accesible la información crítica.'
                      : 'Companies have data but not information. Data trapped in silos (each system, each Excel). Management decides by intuition because they don\'t have real visibility. Manual reports that arrive late and outdated. Data analysis consolidates, visualizes and makes critical information accessible.'}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          PARA QUIÉN ES SECTION - Grid 2x3 con Problemas
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Cuándo análisis de datos es crítico?' : 'When is data analysis critical?'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forWho.map((item, idx) => {
              const colors = colorClasses[item.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-background p-8 rounded-2xl shadow-brand 
                               hover:shadow-brand-lg transition-all duration-300 border border-gris-arena/20"
                  >
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <item.icon className={`w-7 h-7 ${colors.text}`} />
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
          4 NIVELES SECTION - Cards Progresivos
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '4 niveles de análisis de datos según madurez' : '4 levels of data analysis according to maturity'}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              {isEs 
                ? 'Recomendación Alternative: Iniciamos con Descriptivo (quick wins, fundamentos), luego evolucionamos a Diagnóstico y Predictivo según madurez y necesidad.'
                : 'Alternative recommendation: We start with Descriptive (quick wins, fundamentals), then evolve to Diagnostic and Predictive according to maturity and need.'}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analysisLevels.map((level, idx) => {
              const colors = colorClasses[level.color as keyof typeof colorClasses];
              return (
                <AnimatedSection key={idx} delay={idx * 0.1}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-blanco-hueso dark:bg-card p-6 rounded-2xl shadow-brand border-2 border-gris-arena/20 h-full relative overflow-hidden"
                  >
                    {/* Level Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center`}>
                        <span className="text-lg font-bold text-azul-marino dark:text-white">{level.level}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-azul-marino dark:text-white mb-1">
                        {level.title}
                      </h3>
                      <p className={`${colors.text} font-semibold text-sm mb-3`}>
                        {level.question}
                      </p>
                      <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
                        {level.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className={`${colors.text} font-semibold text-xs mb-2`}>
                          {isEs ? 'Ejemplos:' : 'Examples:'}
                        </div>
                        <ul className="space-y-1">
                          {level.examples.slice(0, 2).map((example, exIdx) => (
                            <li key={exIdx} className="text-foreground/60 text-xs flex items-start gap-1">
                              <div className={`w-1.5 h-1.5 ${colors.bg.replace('/10', '')} rounded-full mt-1.5 flex-shrink-0`} />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-gris-arena/20">
                        <div className={`${colors.text} font-semibold text-xs mb-1`}>
                          {isEs ? 'Herramientas:' : 'Tools:'}
                        </div>
                        <p className="text-foreground/60 text-xs">{level.tools}</p>
                      </div>

                      <div className={`${colors.badge} text-xs font-medium px-2 py-1 rounded inline-block`}>
                        {isEs ? 'Complejidad:' : 'Complexity:'} {level.complexity}
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESO DE IMPLEMENTACIÓN - Timeline 5 Fases
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Cómo implementamos Business Intelligence' : 'How we implement Business Intelligence'}
            </h2>
          </AnimatedSection>

          {/* Timeline - Desktop */}
          <div className="hidden lg:block relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-turquesa via-menta to-violeta -translate-y-1/2" />
            
            <div className="grid grid-cols-5 gap-6 relative">
              {processPhases.map((phase, idx) => {
                const colors = colorClasses[phase.color as keyof typeof colorClasses];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-turquesa rounded-full border-4 border-white dark:border-background z-10" />
                    <div className="pt-8">
                      <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <phase.icon className={`w-7 h-7 ${colors.text}`} />
                      </div>
                      <div className="bg-white dark:bg-background p-5 rounded-2xl shadow-brand">
                        <div className="text-turquesa text-xs font-medium mb-2">{phase.duration}</div>
                        <h3 className="text-base font-bold text-azul-marino dark:text-white mb-2">
                          {phase.phase}
                        </h3>
                        <p className="text-foreground/70 text-xs mb-2 leading-relaxed">
                          {phase.description}
                        </p>
                        <div className="text-xs text-turquesa font-medium">
                          {phase.deliverable}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet - Vertical Stack */}
          <div className="lg:hidden space-y-6">
            {processPhases.map((phase, idx) => {
              const colors = colorClasses[phase.color as keyof typeof colorClasses];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-background p-6 rounded-2xl shadow-brand border-l-4 border-turquesa"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <phase.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-turquesa text-sm font-medium mb-1">{phase.duration}</div>
                      <h3 className="text-lg font-bold text-azul-marino dark:text-white mb-2">
                        {phase.phase}
                      </h3>
                      <p className="text-foreground/70 text-sm mb-3 leading-relaxed">
                        {phase.description}
                      </p>
                      <div className="text-xs text-turquesa font-medium">
                        {phase.deliverable}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <AnimatedSection className="text-center mt-12">
            <p className="text-lg text-turquesa font-semibold">
              {isEs ? 'DURACIÓN TOTAL: 6-12 semanas para implementación inicial' : 'TOTAL DURATION: 6-12 weeks for initial implementation'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          QUÉ INCLUYE SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Qué incluye' : 'What\'s included'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {includes.map((item, idx) => {
              const colors = colorClasses[item.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <div className="bg-blanco-hueso dark:bg-card p-8 rounded-2xl shadow-brand border border-gris-arena/20">
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <item.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-4">
                      {item.title}
                    </h3>
                    <ul className="space-y-2">
                      {item.items.map((listItem, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                          <span className="text-foreground/70 text-sm">{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          BENEFICIOS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-azul-marino">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              {isEs ? 'Beneficios' : 'Benefits'}
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
                  <p className="text-white/70 text-sm">{benefit.label}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          CASO DE ÉXITO SECTION - HIDDEN FOR VALIDATION
          ===================================================== */}
      {false && (
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-blanco-hueso dark:bg-card rounded-3xl p-8 lg:p-12 overflow-hidden relative">
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
                      {isEs ? 'Cadena retail implementa BI y mejora márgenes 4%' : 'Retail chain implements BI and improves margins 4%'}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Cliente' : 'Client'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Cadena de 18 tiendas de retail (productos electrónicos, $40M revenue)'
                          : 'Chain of 18 retail stores (electronics, $40M revenue)'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Situación' : 'Situation'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Datos dispersos: ventas en sistema POS, inventario en Excel por tienda, finanzas en QuickBooks, sin consolidación. Gerencia tomaba decisiones de compra basada en "feeling" sobre qué productos vender. Reportes manuales 1 vez/mes (gerente regional dedicaba 2 días consolidando). No sabían qué productos/tiendas eran realmente rentables.'
                          : 'Scattered data: sales in POS system, inventory in Excel per store, finance in QuickBooks, no consolidation. Management made purchase decisions based on "feeling" about which products to sell. Manual reports once/month (regional manager dedicated 2 days consolidating). They didn\'t know which products/stores were really profitable.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-foreground/70 mb-3">
                        {isEs 
                          ? 'Implementación de BI en Power BI (10 semanas):'
                          : 'BI implementation in Power BI (10 weeks):'}
                      </p>
                      <ul className="space-y-2 text-foreground/70 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'ETL automático noche: extrae datos de POS (18 tiendas), inventario, finanzas' : 'Automatic nightly ETL: extracts data from POS (18 stores), inventory, finance'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Data warehouse en Azure SQL Database' : 'Data warehouse in Azure SQL Database'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Modelo dimensional: ventas, inventario, productos, tiendas, tiempo' : 'Dimensional model: sales, inventory, products, stores, time'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Dashboards: Ejecutivo, Comercial, Operacional, Financiero' : 'Dashboards: Executive, Commercial, Operational, Financial'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-azul-marino dark:text-white mb-4">
                      {isEs ? 'Insights Descubiertos (primeros 30 días)' : 'Insights Discovered (first 30 days)'}
                    </h4>
                    <div className="space-y-3 mb-6">
                      {[
                        { insight: isEs ? '35% de ventas eran productos de margen <10% (no rentables)' : '35% of sales were products with margin <10% (not profitable)', color: 'red' },
                        { insight: isEs ? 'Tienda X tenía 80% de stock-outs de productos top (perdían ventas)' : 'Store X had 80% stock-outs of top products (lost sales)', color: 'orange' },
                        { insight: isEs ? 'Tienda Y tenía $150K inventario de productos de baja rotación' : 'Store Y had $150K inventory of low rotation products', color: 'orange' },
                        { insight: isEs ? 'Categoría Z tenía margen 40% vs 25% promedio (oportunidad no vista)' : 'Category Z had 40% margin vs 25% average (unseen opportunity)', color: 'green' }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-background p-4 rounded-xl border border-gris-arena/20">
                          <div className="flex items-start gap-2">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              item.color === 'red' ? 'bg-red-500' : 
                              item.color === 'orange' ? 'bg-orange-500' : 
                              'bg-green-500'
                            }`} />
                            <p className="text-foreground/70 text-sm">{item.insight}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h4 className="font-semibold text-azul-marino dark:text-white mb-4">
                      {isEs ? 'Resultados (6 meses post-implementación)' : 'Results (6 months post-implementation)'}
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: '28%', label: isEs ? 'Margen bruto' : 'Gross margin', sub: isEs ? '24% → 28%' : '24% → 28%' },
                        { value: '$1.6M', label: isEs ? 'Ganancia adicional' : 'Additional profit', sub: isEs ? 'Anual' : 'Annual' },
                        { value: '-70%', label: isEs ? 'Stock-outs' : 'Stock-outs', sub: isEs ? 'Alertas automáticas' : 'Automatic alerts' },
                        { value: '450%', label: isEs ? 'ROI del BI' : 'BI ROI', sub: isEs ? 'Primer año' : 'First year' }
                      ].map((stat, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          className="bg-white dark:bg-background p-4 rounded-xl shadow-brand text-center"
                        >
                          <div className="text-2xl font-bold text-turquesa mb-1">
                            {stat.value}
                          </div>
                          <div className="text-xs font-medium text-azul-marino dark:text-white">
                            {stat.label}
                          </div>
                          <div className="text-xs text-foreground/50">{stat.sub}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-turquesa/10 p-4 rounded-xl border border-turquesa/20 mb-6">
                  <p className="text-sm text-foreground/70">
                    <strong className="text-azul-marino dark:text-white">{isEs ? 'Factor crítico de éxito:' : 'Critical success factor:'}</strong>{' '}
                    {isEs 
                      ? 'No solo implementar dashboards; actuar sobre insights descubiertos.'
                      : 'Not just implementing dashboards; acting on discovered insights.'}
                  </p>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                  {isEs 
                    ? '"BI nos mostró que estábamos dejando $1.6M en la mesa sin saberlo. Ahora tomamos decisiones con data real, no intuición."'
                    : '"BI showed us we were leaving $1.6M on the table without knowing it. Now we make decisions with real data, not intuition."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— CEO</span>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* =====================================================
          HERRAMIENTAS BI - Tabla Comparativa
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Herramientas de Business Intelligence que implementamos' : 'Business Intelligence tools we implement'}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              {isEs 
                ? 'Recomendación Alternative: No vendemos herramientas; recomendamos objetivamente según: presupuesto, complejidad de análisis, ecosistema tecnológico existente, capacidades internas. Más común: Power BI (80% de proyectos) por balance precio/capacidad/facilidad.'
                : 'Alternative recommendation: We don\'t sell tools; we recommend objectively according to: budget, analysis complexity, existing technological ecosystem, internal capabilities. Most common: Power BI (80% of projects) for price/capacity/ease balance.'}
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white dark:bg-background rounded-2xl p-8 shadow-brand overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-4 text-foreground/60 font-medium bg-turquesa/10 
                                   border-b-2 border-turquesa/30 rounded-tl-lg">
                      {isEs ? 'Herramienta' : 'Tool'}
                    </th>
                    <th className="text-left py-4 px-4 text-foreground/60 font-medium bg-menta/10 
                                   border-b-2 border-menta/30">
                      {isEs ? 'Mejor Para' : 'Best For'}
                    </th>
                    <th className="text-left py-4 px-4 text-foreground/60 font-medium bg-violeta/10 
                                   border-b-2 border-violeta/30">
                      {isEs ? 'Ventajas' : 'Advantages'}
                    </th>
                    <th className="text-left py-4 px-4 text-foreground/60 font-medium bg-turquesa/10 
                                   border-b-2 border-turquesa/30 rounded-tr-lg">
                      {isEs ? 'Consideraciones' : 'Considerations'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {biTools.map((tool, idx) => {
                    const colors = colorClasses[tool.color as keyof typeof colorClasses];
                    return (
                      <tr key={idx} className={`border-b border-gris-arena/20 hover:bg-blanco-hueso/50 
                                                dark:hover:bg-card/50 transition-colors
                                                ${idx % 2 === 0 ? 'bg-white' : 'bg-blanco-hueso/30'}
                                                ${idx === biTools.length - 1 ? 'border-b-0' : ''}`}>
                        <td className="py-4 px-4">
                          <span className="text-azul-marino dark:text-white font-semibold">{tool.tool}</span>
                        </td>
                        <td className="py-4 px-4 text-foreground/70">
                          {tool.bestFor}
                        </td>
                        <td className="py-4 px-4 text-foreground/70">
                          {tool.advantages}
                        </td>
                        <td className="py-4 px-4 text-foreground/70">
                          {tool.considerations}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          FAQ SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
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
      <section className="py-20 lg:py-32 bg-violeta relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-turquesa/10 rounded-full blur-2xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs ? '¿Listo para decisiones basadas en datos?' : 'Ready for data-driven decisions?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Evaluación de 30 minutos. Identificamos fuentes de datos críticas, definimos KPIs prioritarios y desarrollamos propuesta de BI.'
                  : '30-minute evaluation. We identify critical data sources, define priority KPIs and develop BI proposal.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Inventario de fuentes de datos' : 'Data source inventory',
                  isEs ? 'Identificación de KPIs críticos' : 'Identification of critical KPIs',
                  isEs ? 'Mockups preliminares de dashboards' : 'Preliminary dashboard mockups',
                  isEs ? 'Recomendación de herramienta BI' : 'BI tool recommendation',
                  isEs ? 'Propuesta de implementación por fases' : 'Phased implementation proposal'
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
                    {isEs ? 'Implementar Business Intelligence' : 'Implement Business Intelligence'}
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

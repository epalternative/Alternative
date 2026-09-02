'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { IndustrySidebar } from '@/components/ui/industry-sidebar';
import {
  Factory,
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
  Shield,
  Zap,
  Package,
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

export default function ManufacturaLogisticaPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Industrias' : 'Industries', href: `/${locale}/industrias` },
    { label: isEs ? 'Manufactura y Logística' : 'Manufacturing & Logistics', href: null }
  ];

  // Stats data
  const stats = [
    { value: '20+', label: isEs ? 'proyectos manufactura y logística' : 'manufacturing and logistics projects', icon: Briefcase },
    { value: 'Lean', label: isEs ? '& Six Sigma certificados' : '& Six Sigma certified', icon: Award },
    { value: 'ISO 9001', label: isEs ? 'especialización manufactura' : 'manufacturing specialization', icon: CheckCircle2 },
    { value: 'PMP®', label: isEs ? 'PMs proyectos industriales' : 'PMs for industrial projects', icon: Target }
  ];

  // Desafíos del sector
  const desafios = [
    {
      icon: TrendingDown,
      title: isEs ? 'Presión por reducción de costos operativos' : 'Pressure to reduce operating costs',
      description: isEs
        ? 'Márgenes comprimiéndose por competencia global y aumento de costos. Necesidad de optimizar cada punto del proceso: mano de obra, materia prima, energía, desperdicios, logística.'
        : 'Margins compressing due to global competition and rising costs. Need to optimize every point of process: labor, raw materials, energy, waste, logistics.',
      color: 'turquesa'
    },
    {
      icon: TrendingUp,
      title: isEs ? 'Eficiencia de producción subóptima' : 'Suboptimal production efficiency',
      description: isEs
        ? 'OEE (Overall Equipment Effectiveness) típicamente 50-65% vs 85%+ clase mundial. Pérdidas por: downtime de maquinaria, cambios de producto lentos, defectos de calidad, micro-paradas.'
        : 'OEE (Overall Equipment Effectiveness) typically 50-65% vs 85%+ world class. Losses from: machinery downtime, slow product changes, quality defects, micro-stops.',
      color: 'menta'
    },
    {
      icon: Zap,
      title: isEs ? 'Desperdicios en procesos (8 desperdicios Lean)' : 'Process waste (8 Lean wastes)',
      description: isEs
        ? 'Sobreproducción, esperas, transporte innecesario, sobreprocesamiento, inventario excesivo, movimientos innecesarios, defectos, talento subutilizado. Desperdicios representan 20-40% del costo.'
        : 'Overproduction, waiting, unnecessary transport, overprocessing, excessive inventory, unnecessary movements, defects, underutilized talent. Waste represents 20-40% of cost.',
      color: 'violeta'
    },
    {
      icon: CheckCircle2,
      title: isEs ? 'Control de calidad inconsistente' : 'Inconsistent quality control',
      description: isEs
        ? 'Defectos de calidad generan: retrabajo (costo), scrap (desperdicio material), devoluciones de clientes (costo + reputación). Necesidad de sistemas de control estadístico de calidad (SPC).'
        : 'Quality defects generate: rework (cost), scrap (material waste), customer returns (cost + reputation). Need for statistical process control (SPC) systems.',
      color: 'turquesa'
    },
    {
      icon: Package,
      title: isEs ? 'Gestión de inventarios compleja' : 'Complex inventory management',
      description: isEs
        ? 'Balance difícil: suficiente inventario para no parar producción vs exceso de capital inmovilizado. Gestión de lotes, vencimientos (farmacéutica, alimentos), FIFO/FEFO, trazabilidad.'
        : 'Difficult balance: sufficient inventory to not stop production vs excess immobilized capital. Batch management, expirations (pharmaceutical, food), FIFO/FEFO, traceability.',
      color: 'menta'
    },
    {
      icon: Building2,
      title: isEs ? 'Logística y cadena de suministro ineficiente' : 'Inefficient logistics and supply chain',
      description: isEs
        ? 'Entregas tardías a clientes, costos logísticos altos, rutas no optimizadas, visibilidad limitada de inventario en tránsito, problemas con proveedores.'
        : 'Late deliveries to customers, high logistics costs, unoptimized routes, limited visibility of in-transit inventory, supplier problems.',
      color: 'violeta'
    }
  ];

  // Servicios principales
  const servicios = [
    {
      icon: Target,
      title: isEs ? 'Gestión de Proyectos Industriales' : 'Industrial Project Management',
      description: isEs
        ? 'Project Managers PMP® certificados para proyectos complejos en plantas de manufactura y operaciones logísticas: expansión de capacidad, implementación de nuevas líneas de producción, proyectos de automatización, implementación de sistemas MES/ERP, mudanzas de planta, proyectos de mejora continua.'
        : 'PMP® certified Project Managers for complex projects in manufacturing plants and logistics operations: capacity expansion, new production line implementation, automation projects, MES/ERP system implementation, plant relocations, continuous improvement projects.',
      tipos: isEs ? [
        'Expansión de Capacidad (ampliación de planta, nuevas líneas, centros de distribución)',
        'Automatización e Industria 4.0 (robots, sistemas MES, IoT, integración de sistemas)',
        'Implementación de ERP/MES/WMS (SAP, Oracle, sistemas de gestión)',
        'Proyectos de Mejora Continua (Kaizen, Lean Six Sigma)',
        'Certificaciones y Cumplimiento (ISO 9001, ISO 14001, ISO 45001, BPM, HACCP)'
      ] : [
        'Capacity Expansion (plant expansion, new lines, distribution centers)',
        'Automation and Industry 4.0 (robots, MES systems, IoT, system integration)',
        'ERP/MES/WMS Implementation (SAP, Oracle, management systems)',
        'Continuous Improvement Projects (Kaizen, Lean Six Sigma)',
        'Certifications and Compliance (ISO 9001, ISO 14001, ISO 45001, GMP, HACCP)'
      ],
      color: 'turquesa'
    },
    {
      icon: Settings,
      title: isEs ? 'Optimización Lean Manufacturing' : 'Lean Manufacturing Optimization',
      description: isEs
        ? 'Implementación de metodologías Lean Manufacturing y Six Sigma para eliminar desperdicios, mejorar eficiencia, reducir costos, mejorar calidad. Consultores Lean certificados con experiencia en plantas industriales.'
        : 'Implementation of Lean Manufacturing and Six Sigma methodologies to eliminate waste, improve efficiency, reduce costs, improve quality. Certified Lean consultants with experience in industrial plants.',
      herramientas: isEs ? [
        'VSM (Value Stream Mapping): Mapeo de flujo de valor para identificar desperdicios',
        '5S: Organización y limpieza sistemática (aumenta eficiencia 10-20%)',
        'Kanban: Sistema pull para gestión de inventarios (reduce WIP 40-60%)',
        'SMED: Reducción de tiempos de cambio de producto (objetivo: <10 min)',
        'TPM (Total Productive Maintenance): Mantenimiento productivo total',
        'Kaizen: Mejora continua con eventos estructurados'
      ] : [
        'VSM (Value Stream Mapping): Value flow mapping to identify waste',
        '5S: Systematic organization and cleaning (increases efficiency 10-20%)',
        'Kanban: Pull system for inventory management (reduces WIP 40-60%)',
        'SMED: Product change time reduction (target: <10 min)',
        'TPM (Total Productive Maintenance): Total productive maintenance',
        'Kaizen: Continuous improvement with structured events'
      ],
      resultados: isEs ? 'Reducción costos operativos: 20-35% | Mejora OEE: +15-25 puntos | Reducción inventario WIP: 40-60% | Reducción lead time: 30-50% | Mejora productividad: 20-40%' : 'Operating cost reduction: 20-35% | OEE improvement: +15-25 points | WIP inventory reduction: 40-60% | Lead time reduction: 30-50% | Productivity improvement: 20-40%',
      color: 'menta'
    },
    {
      icon: CheckCircle2,
      title: isEs ? 'ISO 9001 Manufactura' : 'ISO 9001 Manufacturing',
      description: isEs
        ? 'Implementación de sistemas de gestión de calidad ISO 9001:2015 para manufactura. Documentación de procesos de producción, controles de calidad, trazabilidad, gestión de no conformidades, auditorías internas.'
        : 'ISO 9001:2015 quality management system implementation for manufacturing. Production process documentation, quality controls, traceability, non-conformity management, internal audits.',
      beneficios: isEs ? [
        'Estandariza procesos de producción (reduce variabilidad)',
        'Asegura trazabilidad completa (crítico para recalls)',
        'Mejora control de calidad (reduce defectos 30-50%)',
        'Requisito de clientes corporativos / licitaciones',
        'Base para otras ISO (14001 ambiental, 45001 seguridad)'
      ] : [
        'Standardizes production processes (reduces variability)',
        'Ensures complete traceability (critical for recalls)',
        'Improves quality control (reduces defects 30-50%)',
        'Requirement of corporate clients / tenders',
        'Base for other ISOs (14001 environmental, 45001 safety)'
      ],
      alcance: isEs ? 'Procesos de producción, control de calidad, gestión de inventarios, mantenimiento, compras, diseño de productos (si aplica), gestión de proveedores, almacenamiento y despacho.' : 'Production processes, quality control, inventory management, maintenance, purchasing, product design (if applicable), supplier management, storage and dispatch.',
      color: 'violeta'
    }
  ];

  // FAQs
  const faqs = [
    {
      question: isEs ? '¿Lean Manufacturing funciona en plantas pequeñas o solo grandes?' : 'Does Lean Manufacturing work in small plants or only large ones?',
      answer: isEs
        ? 'Lean aplica a cualquier tamaño: Planta pequeña (20 empleados, 1 línea) hasta grande (500+ empleados, 10+ líneas). Principios Lean son universales: eliminar desperdicios, flujo continuo, mejora continua. Diferencia: Escala de proyecto y complejidad. Planta pequeña: proyecto Lean 3-4 meses, mejoras 15-25%. Planta grande: proyecto 8-12 meses, mejoras 20-35%. ROI positivo en ambos casos (payback típico 6-18 meses).'
        : 'Lean applies to any size: Small plant (20 employees, 1 line) to large (500+ employees, 10+ lines). Lean principles are universal: eliminate waste, continuous flow, continuous improvement. Difference: Project scale and complexity. Small plant: Lean project 3-4 months, improvements 15-25%. Large plant: project 8-12 months, improvements 20-35%. Positive ROI in both cases (typical payback 6-18 months).'
    },
    {
      question: isEs ? '¿Implementación Lean requiere parar producción?' : 'Does Lean implementation require stopping production?',
      answer: isEs
        ? 'No. Lean se implementa con planta operando. Metodología: (1) Diagnóstico: Sin parar, observamos operación, (2) Eventos Kaizen: Workshops 2-3 días con equipo (línea puede seguir con resto), (3) Cambios: Implementamos en turnos de mantenimiento o fin de semana, (4) Re-layout: Si necesario, en parada anual programada. Objetivo es mejorar mientras produces, no parar 3 meses para optimizar.'
        : 'No. Lean is implemented with plant operating. Methodology: (1) Diagnosis: Without stopping, we observe operation, (2) Kaizen Events: 2-3 day workshops with team (line can continue with rest), (3) Changes: We implement during maintenance shifts or weekend, (4) Re-layout: If necessary, during scheduled annual shutdown. Objective is to improve while producing, not stop 3 months to optimize.'
    },
    {
      question: isEs ? '¿ISO 9001 en manufactura es burocracia o realmente ayuda?' : 'Is ISO 9001 in manufacturing bureaucracy or does it really help?',
      answer: isEs
        ? 'Bien implementado, ayuda significativamente: Documenta procesos (reduce variabilidad operador a operador), estandariza controles de calidad (menos defectos), asegura trazabilidad (crítico para recalls/auditorías), facilita training de nuevos operadores (procedimientos claros). Mal implementado: Puede generar burocracia si exceso de documentación innecesaria. Alternative diseña ISO pragmático: documenta lo esencial, controles que agregan valor. 90% manufactureras reportan ISO como beneficio neto después de 18 meses.'
        : 'Well implemented, helps significantly: Documents processes (reduces operator-to-operator variability), standardizes quality controls (fewer defects), ensures traceability (critical for recalls/audits), facilitates training of new operators (clear procedures). Poorly implemented: Can generate bureaucracy if excess unnecessary documentation. Alternative designs pragmatic ISO: documents essential, controls that add value. 90% of manufacturers report ISO as net benefit after 18 months.'
    },
    {
      question: isEs ? '¿Alternative tiene experiencia en industrias específicas (alimentos, farmacéutica, metalmecánica)?' : 'Does Alternative have experience in specific industries (food, pharmaceutical, metalworking)?',
      answer: isEs
        ? 'Experiencia en múltiples verticales manufactura: alimentos y bebidas, farmacéutica, plásticos, metalmecánica, textil, electrónica. Aunque procesos específicos difieren, principios Lean y ISO aplican universalmente. Para industrias reguladas (farmacéutica BPM, alimentos HACCP), tenemos experiencia en cumplimiento adicional a ISO 9001. Si manufactura muy específica, curva aprendizaje inicial de particularidades técnicas pero metodología comprobada.'
        : 'Experience in multiple manufacturing verticals: food and beverages, pharmaceutical, plastics, metalworking, textile, electronics. Although specific processes differ, Lean and ISO principles apply universally. For regulated industries (pharmaceutical GMP, food HACCP), we have experience in additional compliance beyond ISO 9001. If very specific manufacturing, initial learning curve of technical particularities but proven methodology.'
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
      <IndustrySidebar locale={locale} currentIndustry="manufactura-logistica" />

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
                  <Factory className="w-8 h-8 text-azul-marino" />
                </div>
                <div>
                  <span className="text-azul-marino text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Manufactura y Logística' : 'Manufacturing & Logistics'}
                  </span>
                  <p className="text-azul-marino/60 text-sm">
                    {isEs ? 'Industrias' : 'Industries'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-azul-marino font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Consultoría para manufactura: eficiencia operativa y sistemas de calidad'
                  : 'Manufacturing consulting: operational efficiency and quality systems'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-azul-marino/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Gestión de proyectos industriales, optimización Lean Manufacturing, Six Sigma, ISO 9001 para manufactura, digitalización de operaciones. PMs certificados con experiencia en plantas de producción y operaciones logísticas complejas.'
                  : 'Industrial project management, Lean Manufacturing optimization, Six Sigma, ISO 9001 for manufacturing, operations digitization. Certified PMs with experience in production plants and complex logistics operations.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-azul-marino text-white 
                             font-semibold px-6 py-3 rounded-lg hover:bg-azul-marino/90 
                             transition-all duration-300 shadow-lg shadow-azul-marino/20 group"
                >
                  {isEs ? 'Solicita PM o Consultoría Lean' : 'Request PM or Lean Consulting'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/casos-exito`}
                  className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm 
                             text-azul-marino font-medium px-6 py-3 rounded-lg 
                             hover:bg-white transition-all duration-300 border border-azul-marino/20"
                >
                  {isEs ? 'Ver casos manufactura' : 'View manufacturing cases'}
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

            {/* Right Visual - Manufacturing Stats Panel */}
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
                      {isEs ? 'Manufactura' : 'Manufacturing'}
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
                        { label: isEs ? 'Mejora OEE' : 'OEE Improvement', progress: 88, color: 'menta' },
                        { label: isEs ? 'Reducción Costos' : 'Cost Reduction', progress: 92, color: 'violeta' }
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
                  <Factory className="w-8 h-8 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECCIÓN 2: POR QUÉ ALTERNATIVE ENTIENDE MANUFACTURA
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-6">
              {isEs ? 'Entendemos los desafíos de la producción industrial' : 'We understand the challenges of industrial production'}
            </h2>
            <div className="space-y-4 text-azul-marino/70 leading-relaxed mb-8">
              <p>
                {isEs 
                  ? 'Manufactura y logística enfrentan presión constante: reducir costos sin sacrificar calidad, mejorar eficiencia de producción, minimizar desperdicios, cumplir entregas a tiempo, gestionar cadena de suministro compleja, mantener estándares de calidad estrictos. Márgenes se comprimen por competencia global y aumento de costos de materia prima. Empresas que no optimizan continuamente pierden competitividad.'
                  : 'Manufacturing and logistics face constant pressure: reduce costs without sacrificing quality, improve production efficiency, minimize waste, meet deliveries on time, manage complex supply chain, maintain strict quality standards. Margins compress due to global competition and rising raw material costs. Companies that don\'t continuously optimize lose competitiveness.'}
              </p>
              <p>
                {isEs 
                  ? 'Alternative tiene experiencia implementando mejoras operativas en plantas de manufactura y centros de distribución: optimización Lean (eliminación de desperdicios, reducción de tiempos de ciclo), Six Sigma para reducción de defectos, ISO 9001 para estandarización de procesos de producción, gestión de proyectos de expansión de capacidad, implementación de sistemas MES/WMS. Entendemos operaciones 24/7, restricciones de producción, gestión de inventarios (materia prima, WIP, producto terminado), y necesidad de trazabilidad completa para calidad y cumplimiento.'
                  : 'Alternative has experience implementing operational improvements in manufacturing plants and distribution centers: Lean optimization (waste elimination, cycle time reduction), Six Sigma for defect reduction, ISO 9001 for production process standardization, capacity expansion project management, MES/WMS system implementation. We understand 24/7 operations, production constraints, inventory management (raw materials, WIP, finished product), and need for complete traceability for quality and compliance.'}
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
          SECCIÓN 3: DESAFÍOS DE MANUFACTURA Y LOGÍSTICA
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-turquesa/5">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-4">
              {isEs ? 'Desafíos críticos del sector industrial' : 'Critical challenges of the industrial sector'}
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
          SECCIÓN 4: NUESTROS SERVICIOS PARA MANUFACTURA
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-4">
              {isEs ? 'Cómo Alternative apoya a empresas de manufactura y logística' : 'How Alternative supports manufacturing and logistics companies'}
            </h2>
          </AnimatedSection>

          {/* 3 Cards Principales */}
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        {servicio.herramientas && (
                          <>
                            <div className={`${colors.text} font-semibold text-xs mb-2`}>
                              {isEs ? 'Herramientas Lean que implementamos:' : 'Lean tools we implement:'}
                            </div>
                            <ul className="space-y-1">
                              {servicio.herramientas.map((herramienta, herramientaIdx) => (
                                <li key={herramientaIdx} className="text-azul-marino/60 text-sm flex items-start gap-2">
                                  <div className={`w-1.5 h-1.5 ${colors.bg.replace('/10', '')} rounded-full mt-1.5 flex-shrink-0`} />
                                  {herramienta}
                                </li>
                              ))}
                            </ul>
                            {servicio.resultados && (
                              <div className="mt-3">
                                <div className={`${colors.text} font-semibold text-xs mb-1`}>
                                  {isEs ? 'Resultados típicos Lean:' : 'Typical Lean results:'}
                                </div>
                                <p className="text-azul-marino/70 text-xs">{servicio.resultados}</p>
                              </div>
                            )}
                          </>
                        )}
                        {servicio.beneficios && (
                          <>
                            <div className={`${colors.text} font-semibold text-xs mb-2`}>
                              {isEs ? 'Por qué ISO 9001 en manufactura:' : 'Why ISO 9001 in manufacturing:'}
                            </div>
                            <ul className="space-y-1">
                              {servicio.beneficios.map((beneficio, beneficioIdx) => (
                                <li key={beneficioIdx} className="text-azul-marino/60 text-sm flex items-start gap-2">
                                  <div className={`w-1.5 h-1.5 ${colors.bg.replace('/10', '')} rounded-full mt-1.5 flex-shrink-0`} />
                                  {beneficio}
                                </li>
                              ))}
                            </ul>
                            {servicio.alcance && (
                              <div className="mt-3">
                                <div className={`${colors.text} font-semibold text-xs mb-1`}>
                                  {isEs ? 'Alcance típico manufactura:' : 'Typical manufacturing scope:'}
                                </div>
                                <p className="text-azul-marino/70 text-xs">{servicio.alcance}</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <Link
                        href={`/${locale}/contacto`}
                        className="inline-flex items-center gap-2 text-turquesa font-medium text-sm 
                                 hover:text-azul-marino transition-colors mt-auto"
                      >
                        {idx === 0 ? (isEs ? 'Solicita PM para Proyecto Industrial' : 'Request PM for Industrial Project') :
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
                    {isEs ? 'Manufacturera reduce costos 28% con Lean Manufacturing + ISO 9001' : 'Manufacturer reduces costs 28% with Lean Manufacturing + ISO 9001'}
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
                        ? 'Empresa manufacturera de componentes plásticos (150 empleados, 3 líneas de producción, $12M revenue)'
                        : 'Plastic component manufacturing company (150 employees, 3 production lines, $12M revenue)'}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-azul-marino mb-2">
                      {isEs ? 'Situación' : 'Situation'}
                    </h4>
                    <p className="text-azul-marino/70">
                      {isEs 
                        ? 'Planta operando con márgenes bajos (EBITDA 8%) por ineficiencias operativas. Problemas identificados: OEE 52% (vs 85% benchmark), cambios de producto tomando 4 horas (línea parada), inventario WIP excesivo ($800K inmovilizados), defectos de calidad 8% (retrabajo + scrap), layout de planta ineficiente (transporte innecesario), procesos no documentados formalmente.'
                        : 'Plant operating with low margins (EBITDA 8%) due to operational inefficiencies. Identified problems: OEE 52% (vs 85% benchmark), product changes taking 4 hours (line stopped), excessive WIP inventory ($800K immobilized), quality defects 8% (rework + scrap), inefficient plant layout (unnecessary transport), processes not formally documented.'}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-azul-marino mb-2">
                      {isEs ? 'Objetivo' : 'Objective'}
                    </h4>
                    <p className="text-azul-marino/70">
                      {isEs 
                        ? 'Mejorar eficiencia operativa y reducir costos 20%+ mediante Lean Manufacturing + ISO 9001.'
                        : 'Improve operational efficiency and reduce costs 20%+ through Lean Manufacturing + ISO 9001.'}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-azul-marino mb-2">
                      {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                    </h4>
                    <p className="text-azul-marino/70 mb-3">
                      {isEs 
                        ? 'Proyecto dual (10 meses): Lean + ISO 9001'
                        : 'Dual project (10 months): Lean + ISO 9001'}
                    </p>
                    <div className="space-y-3 text-sm">
                      {[
                        { fase: isEs ? 'Fase 1: Diagnóstico Lean' : 'Phase 1: Lean Diagnosis', mes: isEs ? 'Mes 1' : 'Month 1', accion: isEs ? 'VSM de 3 productos principales, análisis de OEE detallado, identificación de 8 desperdicios Lean, análisis de layout de planta' : 'VSM of 3 main products, detailed OEE analysis, identification of 8 Lean wastes, plant layout analysis' },
                        { fase: isEs ? 'Fase 2: Implementación Lean' : 'Phase 2: Lean Implementation', mes: isEs ? 'Mes 2-6' : 'Month 2-6', accion: isEs ? '5S completo, SMED (4 horas → 45 min), Kanban (inventario WIP -55%), re-layout (transporte -60%), TPM (downtime -40%), 8 eventos Kaizen' : 'Complete 5S, SMED (4 hours → 45 min), Kanban (WIP inventory -55%), re-layout (transport -60%), TPM (downtime -40%), 8 Kaizen events' },
                        { fase: isEs ? 'Fase 3: ISO 9001' : 'Phase 3: ISO 9001', mes: isEs ? 'Mes 4-10' : 'Month 4-10', accion: isEs ? 'Documentación de procesos de producción, procedimientos de control de calidad (SPC), trazabilidad de lotes completa, auditorías internas, certificación ISO 9001 lograda' : 'Production process documentation, quality control procedures (SPC), complete batch traceability, internal audits, ISO 9001 certification achieved' }
                      ].map((fase, idx) => (
                        <div key={idx} className="bg-turquesa/5 rounded-xl p-3 border border-turquesa/20">
                          <div className="text-turquesa font-bold text-xs mb-1">{fase.fase} - {fase.mes}</div>
                          <div className="text-azul-marino/70 text-xs">{fase.accion}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-azul-marino mb-4">
                    {isEs ? 'Resultados (12 meses post-proyecto)' : 'Results (12 months post-project)'}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { value: '-28%', label: isEs ? 'Costos operativos' : 'Operating costs', sub: isEs ? 'vs objetivo 20%' : 'vs 20% target' },
                      { value: '78%', label: isEs ? 'OEE' : 'OEE', sub: isEs ? '52% → 78% (+26 puntos)' : '52% → 78% (+26 points)' },
                      { value: '-81%', label: isEs ? 'Cambios de producto' : 'Product changes', sub: isEs ? '4 horas → 45 min' : '4 hours → 45 min' },
                      { value: '-55%', label: isEs ? 'Inventario WIP' : 'WIP inventory', sub: isEs ? '$800K → $360K' : '$800K → $360K' },
                      { value: '-69%', label: isEs ? 'Defectos de calidad' : 'Quality defects', sub: isEs ? '8% → 2.5%' : '8% → 2.5%' },
                      { value: '-50%', label: isEs ? 'Lead time' : 'Lead time', sub: isEs ? '4 semanas → 2 semanas' : '4 weeks → 2 weeks' },
                      { value: '+35%', label: isEs ? 'Productividad' : 'Productivity', sub: isEs ? 'output por empleado' : 'output per employee' },
                      { value: '18%', label: isEs ? 'Margen EBITDA' : 'EBITDA margin', sub: isEs ? '8% → 18% (+10 puntos)' : '8% → 18% (+10 points)' },
                      { value: '$2M', label: isEs ? 'Clientes grandes ganados' : 'Large clients won', sub: isEs ? 'con ISO 9001' : 'with ISO 9001' }
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

                  <div className="bg-turquesa/10 p-4 rounded-xl border border-turquesa/20 mb-6">
                    <p className="text-sm text-azul-marino/70">
                      <strong className="text-azul-marino">{isEs ? 'ROI:' : 'ROI:'}</strong>{' '}
                      {isEs 
                        ? 'Inversión proyecto: $120K. Ahorro anual: $3.4M (28% de $12M). ROI: 2,733% primer año.'
                        : 'Project investment: $120K. Annual savings: $3.4M (28% of $12M). ROI: 2,733% first year.'}
                    </p>
                  </div>

                  <blockquote className="border-l-4 border-turquesa pl-4 italic text-azul-marino/70">
                    {isEs 
                      ? '"Lean + ISO 9001 transformaron nuestra planta. 28% reducción de costos, OEE de 52% a 78%, margen duplicó. Mejor inversión en 20 años de operar."'
                      : '"Lean + ISO 9001 transformed our plant. 28% cost reduction, OEE from 52% to 78%, margin doubled. Best investment in 20 years of operation."'}
                    <span className="block mt-2 text-sm text-turquesa not-italic font-medium">
                      — {isEs ? 'Gerente General' : 'General Manager'}
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
                {isEs ? '¿Tu planta necesita mejorar eficiencia operativa?' : 'Does your plant need to improve operational efficiency?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Evaluación Lean gratuita de 30 minutos. Revisamos operación, identificamos desperdicios principales y estimamos potencial de mejora.'
                  : 'Free 30-minute Lean evaluation. We review operation, identify main waste and estimate improvement potential.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Evaluación preliminar de eficiencia' : 'Preliminary efficiency evaluation',
                  isEs ? 'Identificación de desperdicios principales' : 'Main waste identification',
                  isEs ? 'Estimación de potencial de mejora (% costos)' : 'Improvement potential estimation (% costs)',
                  isEs ? 'Recomendación de proyecto Lean' : 'Lean project recommendation',
                  isEs ? 'Propuesta de optimización' : 'Optimization proposal'
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
                    {isEs ? 'Solicitar Evaluación Lean' : 'Request Lean Evaluation'}
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

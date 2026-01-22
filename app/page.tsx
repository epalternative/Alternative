'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { Counter } from '@/components/ui/counter';
import {
  Target,
  Settings,
  Cpu,
  Award,
  ArrowRight,
  CheckCircle2,
  Search,
  Lightbulb,
  Rocket,
  LineChart,
  Quote,
  Monitor,
  Code,
  FolderKanban,
  TrendingUp,
  Users,
  Clock,
  Shield,
  Zap,
  ArrowUpRight,
  Star,
  ChevronRight,
  X,
  Check,
  Building2,
  Factory,
  ShoppingCart,
  Laptop,
  GraduationCap,
  BarChart3,
  FileCheck,
  Cog,
  Download,
  Calculator,
  FileText,
  BadgeCheck,
  Globe,
  Timer
} from 'lucide-react';

// Animated section wrapper
const AnimatedSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation
const StaggerContainer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function HomePage() {
  const { language } = useI18n();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Trust badges
  const trustBadges = [
    { icon: BadgeCheck, label: 'PMP® Certified' },
    { icon: FileCheck, label: 'ISO 9001 Lead Auditor' },
    { icon: GraduationCap, label: 'MBA' },
    { icon: Clock, label: '15+ años experiencia' },
  ];

  // Problems and Solutions
  const problems = [
    {
      title: language === 'es' ? 'Procesos ineficientes que elevan costos' : 'Inefficient processes raising costs',
      desc: language === 'es' 
        ? 'Operaciones manuales repetitivas, cuellos de botella ocultos, desperdicios que nadie puede cuantificar. Cada día perdido es dinero que se evapora.'
        : 'Repetitive manual operations, hidden bottlenecks, unquantified waste. Every lost day is evaporating money.',
    },
    {
      title: language === 'es' ? 'Proyectos que se retrasan o fracasan' : 'Projects that delay or fail',
      desc: language === 'es'
        ? 'Sin metodología clara, con alcance descontrolado, equipos desalineados y cronogramas irreales. El 70% de proyectos fallan por mala gestión.'
        : 'No clear methodology, scope creep, misaligned teams, unrealistic timelines. 70% of projects fail due to poor management.',
    },
    {
      title: language === 'es' ? 'Necesidad urgente de certificación ISO 9001' : 'Urgent need for ISO 9001 certification',
      desc: language === 'es'
        ? 'Cumplimiento regulatorio para licitaciones, clientes corporativos exigentes, o requisitos del sector bancario. Sin certificación, pierdes oportunidades.'
        : 'Regulatory compliance for bids, demanding corporate clients, banking sector requirements. Without certification, you lose opportunities.',
    },
    {
      title: language === 'es' ? 'Transformación digital sin resultados' : 'Digital transformation without results',
      desc: language === 'es'
        ? 'Implementaste software, pero los procesos siguen igual de lentos. La tecnología sin rediseño de procesos solo automatiza la ineficiencia.'
        : 'You implemented software, but processes are still slow. Technology without process redesign only automates inefficiency.',
    },
  ];

  const solutions = [
    {
      title: language === 'es' ? 'Reducimos costos operativos entre 25-40%' : 'We reduce operational costs by 25-40%',
      desc: language === 'es'
        ? 'Mapeo completo AS-IS/TO-BE, eliminación de desperdicios, automatización estratégica. Metodologías BPM y Lean Six Sigma con resultados medibles en 90 días.'
        : 'Complete AS-IS/TO-BE mapping, waste elimination, strategic automation. BPM and Lean Six Sigma methodologies with measurable results in 90 days.',
    },
    {
      title: language === 'es' ? 'Proyectos exitosos con metodologías comprobadas' : 'Successful projects with proven methodologies',
      desc: language === 'es'
        ? 'PMP, Agile/Scrum, PMO estructurado. Planificación realista, seguimiento estricto, gestión de riesgos proactiva. Tus proyectos terminan a tiempo y en presupuesto.'
        : 'PMP, Agile/Scrum, structured PMO. Realistic planning, strict monitoring, proactive risk management. Your projects finish on time and on budget.',
    },
    {
      title: language === 'es' ? 'Certificaciones ISO 9001 en tiempo récord' : 'ISO 9001 certifications in record time',
      desc: language === 'es'
        ? 'Implementación completa, auditoría interna y acompañamiento hasta certificación. Conocemos los requisitos del sector bancario, manufactura y servicios.'
        : 'Complete implementation, internal audit and support until certification. We know the requirements for banking, manufacturing and services sectors.',
    },
    {
      title: language === 'es' ? 'Transformación digital con ROI comprobado' : 'Digital transformation with proven ROI',
      desc: language === 'es'
        ? 'Primero optimizamos procesos, luego digitalizamos. Roadmap claro, priorización basada en impacto, gestión del cambio. Tecnología que realmente transforma.'
        : 'First we optimize processes, then we digitalize. Clear roadmap, impact-based prioritization, change management. Technology that truly transforms.',
    },
  ];

  // Services - 6 services
  const services = [
    { 
      icon: Settings, 
      title: language === 'es' ? 'Optimización de Procesos' : 'Process Optimization', 
      desc: language === 'es' ? 'BPM, Lean Six Sigma, automatización y mapeo de procesos. Reducimos costos operativos y eliminamos desperdicios con metodologías probadas.' : 'BPM, Lean Six Sigma, automation and process mapping. We reduce operational costs and eliminate waste with proven methodologies.',
      tags: ['BPM', 'Lean Six Sigma', 'RPA', 'AS-IS / TO-BE'],
      href: '/services/process-consulting', 
      color: 'bg-menta'
    },
    { 
      icon: FolderKanban, 
      title: language === 'es' ? 'Gestión de Proyectos' : 'Project Management', 
      desc: language === 'es' ? 'PMP Project Management, metodologías ágiles y PMO Office. Proyectos que terminan a tiempo, en presupuesto y con los resultados esperados.' : 'PMP Project Management, agile methodologies and PMO Office. Projects that finish on time, on budget and with expected results.',
      tags: ['PMP®', 'Scrum/Kanban', 'PMO Office', 'Auditoría'],
      href: '/services/project-consulting', 
      color: 'bg-violeta'
    },
    { 
      icon: Award, 
      title: language === 'es' ? 'Sistemas de Calidad ISO 9001' : 'ISO 9001 Quality Systems', 
      desc: language === 'es' ? 'Implementación, auditoría y certificación ISO 9001. Especializados en sector bancario, financiero y manufactura con requisitos regulatorios estrictos.' : 'ISO 9001 implementation, audit and certification. Specialized in banking, financial and manufacturing sectors with strict regulatory requirements.',
      tags: ['ISO 9001', 'Auditoría Interna', 'Certificación', 'Sector Financiero'],
      href: '/services/quality-consulting', 
      color: 'bg-turquesa'
    },
    { 
      icon: Cpu, 
      title: language === 'es' ? 'Transformación Digital' : 'Digital Transformation', 
      desc: language === 'es' ? 'Roadmap de transformación, automatización inteligente y adopción tecnológica. Primero optimizamos procesos, luego digitalizamos para ROI real.' : 'Transformation roadmap, intelligent automation and technology adoption. First we optimize processes, then digitalize for real ROI.',
      tags: ['Roadmap', 'Change Management', 'Automatización', 'Adopción'],
      href: '/services/it-consulting', 
      color: 'bg-lavanda'
    },
    { 
      icon: Target, 
      title: language === 'es' ? 'Consultoría Estratégica' : 'Strategic Consulting', 
      desc: language === 'es' ? 'Diagnóstico organizacional, priorización estratégica y planes de ejecución. Te ayudamos a identificar qué optimizar primero para máximo impacto.' : 'Organizational diagnosis, strategic prioritization and execution plans. We help you identify what to optimize first for maximum impact.',
      tags: ['Diagnóstico', 'Análisis de Brechas', 'Priorización', 'Roadmap'],
      href: '/business-consultants', 
      color: 'bg-oliva'
    },
    { 
      icon: Code, 
      title: language === 'es' ? 'Desarrollo de Software' : 'Software Development', 
      desc: language === 'es' ? 'Soluciones internas, portales corporativos y automatización custom. Cuando tu proceso optimizado requiere una herramienta que no existe en el mercado.' : 'Internal solutions, corporate portals and custom automation. When your optimized process requires a tool that doesn\'t exist in the market.',
      tags: ['Apps Internas', 'Portales', 'APIs', 'Automatización'],
      href: '/services/software-development', 
      color: 'bg-gris-arena',
      isComplementary: true
    },
  ];

  // Industries
  const industries = [
    {
      icon: Building2,
      title: language === 'es' ? 'Banca y Servicios Financieros' : 'Banking & Financial Services',
      desc: language === 'es' ? 'Cumplimiento regulatorio SBP, optimización de procesos core, ISO 9001 para instituciones financieras.' : 'SBP regulatory compliance, core process optimization, ISO 9001 for financial institutions.',
      challenges: language === 'es' 
        ? ['Acuerdos SBP 8-2025 y 9-2025', 'ALA/CFT compliance', 'Eficiencia operacional', 'Resiliencia digital (DORA)']
        : ['SBP Agreements 8-2025 and 9-2025', 'AML/CFT compliance', 'Operational efficiency', 'Digital resilience (DORA)'],
      href: '/services/quality-consulting',
    },
    {
      icon: Factory,
      title: language === 'es' ? 'Manufactura y Logística' : 'Manufacturing & Logistics',
      desc: language === 'es' ? 'Optimización de cadena de suministro, reducción de tiempos de ciclo, Lean Manufacturing.' : 'Supply chain optimization, cycle time reduction, Lean Manufacturing.',
      challenges: language === 'es'
        ? ['Desperdicios en producción', 'Inventarios descontrolados', 'Tiempos de entrega', 'Calidad y trazabilidad']
        : ['Production waste', 'Uncontrolled inventory', 'Delivery times', 'Quality and traceability'],
      href: '/services/process-consulting',
    },
    {
      icon: ShoppingCart,
      title: language === 'es' ? 'Retail y Comercio' : 'Retail & Commerce',
      desc: language === 'es' ? 'Eficiencia operacional en tiendas, optimización de inventarios, experiencia de cliente mejorada.' : 'Store operational efficiency, inventory optimization, improved customer experience.',
      challenges: language === 'es'
        ? ['Rotación de inventario', 'Experiencia omnicanal', 'Múltiples sucursales', 'Márgenes bajo presión']
        : ['Inventory turnover', 'Omnichannel experience', 'Multiple branches', 'Margins under pressure'],
      href: '/services/process-consulting',
    },
    {
      icon: Laptop,
      title: language === 'es' ? 'Tecnología y Telecomunicaciones' : 'Technology & Telecommunications',
      desc: language === 'es' ? 'Escalamiento operacional, gobierno de proyectos tecnológicos, procesos ágiles.' : 'Operational scaling, technology project governance, agile processes.',
      challenges: language === 'es'
        ? ['Escalar sin perder agilidad', 'Gobierno de proyectos', 'Time-to-market', 'Deuda técnica']
        : ['Scale without losing agility', 'Project governance', 'Time-to-market', 'Technical debt'],
      href: '/services/project-consulting',
    },
  ];

  // Why us differentiators
  const differentiators = [
    {
      icon: GraduationCap,
      title: language === 'es' ? 'Certificaciones y Expertise de Clase Mundial' : 'World-Class Certifications & Expertise',
      desc: language === 'es'
        ? 'Katherine González, nuestra CEO: MBA, PMP® certificada por PMI, ISO 9001 Lead Auditor. 15+ años liderando transformaciones en banca, manufactura, tecnología y retail.'
        : 'Katherine González, our CEO: MBA, PMI certified PMP®, ISO 9001 Lead Auditor. 15+ years leading transformations in banking, manufacturing, technology and retail.',
      stat: '15+ años | 50+ proyectos',
    },
    {
      icon: BarChart3,
      title: language === 'es' ? 'Metodologías Probadas, Resultados Medibles' : 'Proven Methodologies, Measurable Results',
      desc: language === 'es'
        ? 'No vendemos teoría. Aplicamos BPM, Lean Six Sigma, PMP y Agile con disciplina. Cada proyecto tiene métricas claras: reducción de costos, tiempo de ciclo, calidad.'
        : 'We don\'t sell theory. We apply BPM, Lean Six Sigma, PMP and Agile with discipline. Every project has clear metrics: cost reduction, cycle time, quality.',
      stat: '35% reducción costos',
    },
    {
      icon: Zap,
      title: language === 'es' ? 'Expertise Big Four, Agilidad Boutique' : 'Big Four Expertise, Boutique Agility',
      desc: language === 'es'
        ? 'Conocemos las metodologías de las grandes consultoras, pero sin su burocracia ni precios prohibitivos. Respuesta rápida, equipos dedicados, atención directa de socios.'
        : 'We know big consulting methodologies, but without their bureaucracy or prohibitive prices. Fast response, dedicated teams, direct partner attention.',
      stat: '90 días implementación',
    },
    {
      icon: Globe,
      title: language === 'es' ? 'Conocimiento del Mercado Panameño' : 'Panamanian Market Knowledge',
      desc: language === 'es'
        ? 'Entendemos la Superintendencia de Bancos de Panamá, la realidad del mercado local, los desafíos de operar en LATAM. Soluciones adaptadas a tu contexto.'
        : 'We understand Panama\'s Banking Superintendency, local market reality, LATAM operational challenges. Solutions adapted to your context.',
      stat: '100% cumplimiento SBP',
    },
  ];

  // Case studies / Success stories
  const caseStudies = [
    {
      industry: language === 'es' ? 'Banca' : 'Banking',
      title: language === 'es' ? 'Banco Regional Panamá' : 'Regional Bank Panama',
      challenge: language === 'es' 
        ? 'Procesos de aprobación de créditos lentos (15-20 días), incumplimiento de tiempos SLA, alto costo operacional.'
        : 'Slow credit approval processes (15-20 days), SLA non-compliance, high operational cost.',
      results: [
        { value: '40%', label: language === 'es' ? 'Reducción tiempo aprobación' : 'Approval time reduction' },
        { value: '25%', label: language === 'es' ? 'Aumento productividad' : 'Productivity increase' },
        { value: '100%', label: language === 'es' ? 'Cumplimiento SBP' : 'SBP Compliance' },
      ],
      testimonial: language === 'es' 
        ? 'Grupo Alternative no solo optimizó nuestros procesos, nos enseñó a gestionarlos. Hoy somos un banco más ágil.'
        : 'Grupo Alternative not only optimized our processes, they taught us to manage them. Today we are a more agile bank.',
      author: 'CFO, Banco Regional',
      color: 'border-turquesa',
    },
    {
      industry: language === 'es' ? 'Manufactura' : 'Manufacturing',
      title: language === 'es' ? 'Empresa Manufactura' : 'Manufacturing Company',
      challenge: language === 'es'
        ? 'Inventarios descontrolados, tiempos de entrega inconsistentes (60% a tiempo), desperdicios no cuantificados.'
        : 'Uncontrolled inventory, inconsistent delivery times (60% on time), unquantified waste.',
      results: [
        { value: '30%', label: language === 'es' ? 'Reducción inventario' : 'Inventory reduction' },
        { value: '92%', label: language === 'es' ? 'Entregas a tiempo' : 'On-time deliveries' },
        { value: '$180K', label: language === 'es' ? 'Ahorros anuales' : 'Annual savings' },
      ],
      testimonial: language === 'es'
        ? 'Redujimos costos que ni sabíamos que existían. El ROI se pagó en 4 meses.'
        : 'We reduced costs we didn\'t even know existed. The ROI paid for itself in 4 months.',
      author: 'COO, Industrial Plus',
      color: 'border-menta',
    },
    {
      industry: language === 'es' ? 'Tecnología' : 'Technology',
      title: language === 'es' ? 'Empresa Tecnología' : 'Technology Company',
      challenge: language === 'es'
        ? 'Proyectos sin metodología estándar, 70% con retrasos, equipos desalineados, clientes insatisfechos.'
        : 'Projects without standard methodology, 70% delayed, misaligned teams, dissatisfied customers.',
      results: [
        { value: '85%', label: language === 'es' ? 'Proyectos a tiempo' : 'On-time projects' },
        { value: '50%', label: language === 'es' ? 'Reducción retrabajo' : 'Rework reduction' },
        { value: '4.5/5', label: language === 'es' ? 'Satisfacción cliente' : 'Customer satisfaction' },
      ],
      testimonial: language === 'es'
        ? 'Ahora tenemos un PMO que realmente agrega valor, no solo reportes que nadie lee.'
        : 'Now we have a PMO that truly adds value, not just reports that nobody reads.',
      author: 'CTO, TechCorp',
      color: 'border-violeta',
    },
  ];

  // Testimonials
  const testimonials = [
    { 
      name: 'Juan Carlos Méndez', 
      role: 'CFO, Banco Lafise Panamá', 
      quote: language === 'es' 
        ? 'Grupo Alternative transformó completamente nuestra operación. En 6 meses redujimos costos en 32% y cumplimos certificación ISO 9001. Katherine y su equipo no solo consultan, te enseñan a ser autosuficiente.'
        : 'Grupo Alternative completely transformed our operation. In 6 months we reduced costs by 32% and achieved ISO 9001 certification. Katherine and her team don\'t just consult, they teach you to be self-sufficient.',
      badge: 'Banca | ISO 9001'
    },
    { 
      name: 'María Fernández', 
      role: 'CTO, TechPanama', 
      quote: language === 'es'
        ? 'Teníamos 15 proyectos corriendo simultáneamente, todos atrasados. Implementaron un PMO estructurado y hoy el 85% termina a tiempo. Game changer para nuestra empresa.'
        : 'We had 15 projects running simultaneously, all delayed. They implemented a structured PMO and today 85% finish on time. Game changer for our company.',
      badge: 'Tecnología | PMO'
    },
    { 
      name: 'Roberto Castillo', 
      role: 'COO, LogiServ', 
      quote: language === 'es'
        ? 'Escéptico al inicio, pero los resultados hablan solos: 40% menos tiempo en procesos de crédito. Nuestros clientes lo notan, nuestro equipo está más motivado.'
        : 'Skeptical at first, but the results speak for themselves: 40% less time in credit processes. Our customers notice it, our team is more motivated.',
      badge: 'Banca | BPM'
    },
    { 
      name: 'Laura Gómez', 
      role: 'CEO, Industrial Plus', 
      quote: language === 'es'
        ? 'Iban a implementar un ERP sin arreglar procesos. Alternative nos detuvo, optimizó primero, luego digitalizó. Nos ahorraron $200K en software que no necesitábamos.'
        : 'They were going to implement an ERP without fixing processes. Alternative stopped us, optimized first, then digitalized. They saved us $200K in software we didn\'t need.',
      badge: 'Manufactura | Transformación Digital'
    },
  ];

  // Resources / Lead magnets
  const resources = [
    {
      icon: FileCheck,
      title: language === 'es' ? 'Checklist Cumplimiento SBP 2025' : 'SBP Compliance Checklist 2025',
      desc: language === 'es'
        ? 'Checklist completo de los Acuerdos SBP 8-2025 y 9-2025. Verifica si tu institución cumple con los nuevos requisitos regulatorios.'
        : 'Complete checklist for SBP Agreements 8-2025 and 9-2025. Verify if your institution complies with new regulatory requirements.',
      format: 'PDF (6 páginas)',
      benefit: language === 'es' ? 'Evita sanciones regulatorias' : 'Avoid regulatory sanctions',
    },
    {
      icon: FileText,
      title: language === 'es' ? 'Guía Implementación ISO 9001' : 'ISO 9001 Implementation Guide',
      desc: language === 'es'
        ? 'Paso a paso para implementar ISO 9001 en tu empresa. Incluye plantillas de documentos obligatorios y timeline realista.'
        : 'Step by step to implement ISO 9001 in your company. Includes mandatory document templates and realistic timeline.',
      format: 'PDF + Excel',
      benefit: language === 'es' ? 'Acelera tu certificación 3-6 meses' : 'Accelerate your certification 3-6 months',
    },
    {
      icon: Calculator,
      title: language === 'es' ? 'Calculadora ROI en Procesos' : 'Process ROI Calculator',
      desc: language === 'es'
        ? 'Herramienta interactiva para calcular el costo real de tus procesos ineficientes. Identifica dónde están los mayores desperdicios.'
        : 'Interactive tool to calculate the real cost of your inefficient processes. Identify where the biggest wastes are.',
      format: language === 'es' ? 'Herramienta Web' : 'Web Tool',
      benefit: language === 'es' ? 'Cuantifica ahorros en 5 min' : 'Quantify savings in 5 min',
    },
  ];

  // Process phases
  const phases = [
    { icon: Search, title: language === 'es' ? 'Diagnóstico' : 'Diagnosis', desc: language === 'es' ? 'Analizamos tu situación actual e identificamos oportunidades' : 'We analyze your current situation and identify opportunities', num: '01' },
    { icon: Lightbulb, title: language === 'es' ? 'Estrategia' : 'Strategy', desc: language === 'es' ? 'Diseñamos un plan personalizado para tus objetivos' : 'We design a customized plan for your goals', num: '02' },
    { icon: Rocket, title: language === 'es' ? 'Implementación' : 'Implementation', desc: language === 'es' ? 'Ejecutamos con acompañamiento continuo y experto' : 'We execute with continuous expert support', num: '03' },
    { icon: LineChart, title: language === 'es' ? 'Seguimiento' : 'Follow-up', desc: language === 'es' ? 'Medimos resultados y optimizamos continuamente' : 'We measure results and continuously optimize', num: '04' },
  ];

  return (
    <>
      {/* ============ HERO SECTION ============ */}
      <section ref={heroRef} className="relative min-h-screen bg-azul-marino overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        {/* Floating Geometric Elements */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[15%] left-[5%] w-3 h-3 bg-turquesa rounded-full animate-pulse" />
          <div className="absolute top-[25%] right-[8%] w-4 h-4 bg-menta rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-[30%] left-[10%] w-2 h-2 bg-violeta rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-[60%] right-[15%] w-3 h-3 bg-lavanda rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
        </motion.div>

        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-turquesa/20 border border-turquesa/30 rounded-full px-4 py-2 mb-6"
              >
                <Star className="w-4 h-4 text-turquesa fill-turquesa" />
                <span className="text-turquesa text-sm font-medium">
                  {language === 'es' ? 'Consultoría Empresarial en Panamá' : 'Business Consulting in Panama'}
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-white mb-6 leading-[1.1]"
              >
                {language === 'es' ? (
                  <>Optimizamos tus operaciones para que tu empresa <span className="text-turquesa">crezca más rápido</span></>
                ) : (
                  <>We optimize your operations so your business <span className="text-turquesa">grows faster</span></>
                )}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg text-white/70 mb-8 max-w-xl leading-relaxed"
              >
                {language === 'es' 
                  ? 'Consultoría empresarial en optimización de procesos, gestión de proyectos y transformación digital. Certificados PMP®, ISO 9001 Lead Auditor y MBA. Clientes en banca, manufactura, retail y tecnología.'
                  : 'Business consulting in process optimization, project management and digital transformation. PMP®, ISO 9001 Lead Auditor and MBA certified. Clients in banking, manufacturing, retail and technology.'}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <Link 
                  href="/contact"
                  className="group inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-5 py-3 rounded-lg hover:bg-menta transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-turquesa/20 text-sm"
                >
                  {language === 'es' ? 'Diagnóstico Gratuito' : 'Free Diagnosis'}
                  <span className="bg-azul-marino/20 text-azul-marino text-xs font-medium px-2 py-0.5 rounded-full">15 min</span>
                </Link>
                <Link 
                  href="#services"
                  className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium px-5 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 text-sm"
                >
                  {language === 'es' ? 'Nuestros servicios' : 'Our services'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-wrap gap-4"
              >
                {trustBadges.map((badge, idx) => {
                  const Icon = badge.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                      <Icon className="w-4 h-4 text-turquesa" />
                      <span className="text-white/80 text-sm font-medium">{badge.label}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right Content - Image Grid */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                {/* Main Image */}
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/images/hero-meeting.jpg"
                      alt={language === 'es' ? 'Consultoría empresarial' : 'Business consulting'}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-azul-marino/20" />
                  </div>
                </div>
                
                {/* Floating Secondary Image */}
                <motion.div 
                  className="absolute -bottom-8 -left-8 w-48 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-azul-marino z-20"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/images/hero-tech.jpg"
                    alt={language === 'es' ? 'Katherine González CEO' : 'Katherine González CEO'}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Stats Card */}
                <motion.div 
                  className="absolute -top-4 -right-4 bg-white dark:bg-card rounded-2xl p-4 shadow-xl z-20"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-turquesa" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-azul-marino dark:text-white">50+</p>
                      <p className="text-xs text-foreground/60">{language === 'es' ? 'Proyectos Exitosos' : 'Successful Projects'}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Second Stats Card */}
                <motion.div 
                  className="absolute bottom-4 right-8 bg-azul-marino text-white rounded-2xl px-4 py-3 shadow-xl z-20"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <p className="text-lg font-bold">35%</p>
                  <p className="text-xs text-white/70">{language === 'es' ? 'Reducción costos promedio' : 'Avg cost reduction'}</p>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-4 right-8 w-20 h-20 bg-menta/30 rounded-xl -rotate-12 -z-10" />
                <div className="absolute top-8 -left-4 w-16 h-16 bg-violeta/30 rounded-xl rotate-12 -z-10" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-blanco-hueso dark:fill-background"/>
          </svg>
        </div>
      </section>

      {/* ============ PROBLEM → SOLUTION SECTION ============ */}
      <section className="py-24 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block text-violeta font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? 'Desafíos y Soluciones' : 'Challenges & Solutions'}
              </span>
              <h2 className="text-4xl lg:text-5xl font-semibold text-azul-marino dark:text-white mb-6">
                {language === 'es' ? '¿Tu empresa enfrenta estos desafíos operacionales?' : 'Is your company facing these operational challenges?'}
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Problems Column */}
            <AnimatedSection delay={0.1}>
              <div className="bg-white dark:bg-card rounded-3xl p-8 shadow-brand h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                    {language === 'es' ? 'Problemas Comunes' : 'Common Problems'}
                  </h3>
                </div>
                <div className="space-y-6">
                  {problems.map((problem, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mt-1">
                        <X className="w-3 h-3 text-red-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-azul-marino dark:text-white mb-1">{problem.title}</h4>
                        <p className="text-sm text-foreground/60 leading-relaxed">{problem.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Solutions Column */}
            <AnimatedSection delay={0.2}>
              <div className="bg-turquesa/10 dark:bg-turquesa/5 border-2 border-turquesa/30 rounded-3xl p-8 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-turquesa/20 rounded-xl flex items-center justify-center">
                    <Check className="w-5 h-5 text-turquesa" />
                  </div>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                    {language === 'es' ? 'Nuestras Soluciones' : 'Our Solutions'}
                  </h3>
                </div>
                <div className="space-y-6">
                  {solutions.map((solution, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-turquesa/20 rounded-full flex items-center justify-center mt-1">
                        <Check className="w-3 h-3 text-turquesa" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-azul-marino dark:text-white mb-1">{solution.title}</h4>
                        <p className="text-sm text-foreground/60 leading-relaxed">{solution.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* CTA */}
          <AnimatedSection delay={0.3}>
            <div className="mt-12 text-center">
              <p className="text-foreground/70 mb-4">
                {language === 'es' ? '¿Identificaste 2 o más desafíos?' : 'Did you identify 2 or more challenges?'}
              </p>
              <Link 
                href="/contact"
                className="group inline-flex items-center gap-3 bg-turquesa text-azul-marino font-semibold px-7 py-4 rounded-xl hover:bg-menta transition-all duration-300 hover:-translate-y-1"
              >
                {language === 'es' ? 'Agenda un diagnóstico gratuito de 15 minutos' : 'Schedule a free 15-minute diagnosis'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ SERVICES SECTION ============ */}
      <section id="services" className="py-24 bg-azul-marino relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        
        <div className="container-custom relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block text-menta font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? 'Nuestros Servicios' : 'Our Services'}
              </span>
              <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-4">
                {language === 'es' ? 'Nuestros servicios de consultoría empresarial' : 'Our business consulting services'}
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                {language === 'es' 
                  ? 'Soluciones integrales para optimizar tu operación, desde el diagnóstico hasta la implementación'
                  : 'Comprehensive solutions to optimize your operation, from diagnosis to implementation'}
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <StaggerItem key={idx}>
                  <Link href={service.href}>
                    <div className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 h-full ${service.isComplementary ? 'opacity-80' : ''}`}>
                      {service.isComplementary && (
                        <span className="inline-block text-xs bg-white/10 text-white/60 px-2 py-1 rounded-full mb-4">
                          {language === 'es' ? 'Servicio complementario' : 'Complementary service'}
                        </span>
                      )}
                      <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-azul-marino" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-turquesa transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-white/60 mb-4 leading-relaxed text-sm">
                        {service.desc}
                      </p>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.tags.map((tag, tagIdx) => (
                          <span key={tagIdx} className="text-xs bg-white/10 text-white/70 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-turquesa font-medium">
                        <span className="text-sm">{language === 'es' ? 'Ver más' : 'Learn more'}</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ============ INDUSTRIES SECTION ============ */}
      <section className="py-24 bg-white dark:bg-card/50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block text-oliva font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? 'Industrias' : 'Industries'}
              </span>
              <h2 className="text-4xl lg:text-5xl font-semibold text-azul-marino dark:text-white mb-4">
                {language === 'es' ? 'Experiencia comprobada en sectores regulados' : 'Proven experience in regulated sectors'}
              </h2>
              <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                {language === 'es'
                  ? 'Entendemos los desafíos específicos de tu industria y adaptamos nuestras soluciones a tus requisitos'
                  : 'We understand your industry\'s specific challenges and adapt our solutions to your requirements'}
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, idx) => {
              const Icon = industry.icon;
              return (
                <StaggerItem key={idx}>
                  <Link href={industry.href}>
                    <div className="group bg-blanco-hueso dark:bg-secondary rounded-2xl p-6 hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-2 h-full">
                      <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-turquesa/30 transition-colors">
                        <Icon className="w-7 h-7 text-turquesa" />
                      </div>
                      <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-2 group-hover:text-turquesa transition-colors">
                        {industry.title}
                      </h3>
                      <p className="text-sm text-foreground/60 mb-4 leading-relaxed">
                        {industry.desc}
                      </p>
                      <div className="space-y-2">
                        {industry.challenges.slice(0, 3).map((challenge, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-2 text-xs text-foreground/50">
                            <div className="w-1 h-1 bg-turquesa rounded-full" />
                            {challenge}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-turquesa font-medium mt-4 text-sm">
                        <span>{language === 'es' ? 'Ver soluciones' : 'View solutions'}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <AnimatedSection delay={0.3}>
            <p className="text-center text-foreground/60 mt-10 text-sm">
              {language === 'es' 
                ? '¿Tu industria no está aquí? Trabajamos con todos los sectores. Lo importante es el problema y el impacto que podemos generar.'
                : 'Is your industry not here? We work with all sectors. What matters is the problem and the impact we can generate.'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ WHY US SECTION ============ */}
      <section className="py-24 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block text-violeta font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? 'Por Qué Elegirnos' : 'Why Choose Us'}
              </span>
              <h2 className="text-4xl lg:text-5xl font-semibold text-azul-marino dark:text-white mb-4">
                {language === 'es' ? 'Por qué empresas líderes confían en nosotros' : 'Why leading companies trust us'}
              </h2>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {differentiators.map((diff, idx) => {
              const Icon = diff.icon;
              return (
                <StaggerItem key={idx}>
                  <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-7 h-7 text-turquesa" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-2">{diff.title}</h3>
                        <p className="text-foreground/60 leading-relaxed">{diff.desc}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gris-arena/20">
                      <span className="inline-block bg-turquesa/10 text-turquesa font-semibold text-sm px-4 py-2 rounded-full">
                        {diff.stat}
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* CEO Quote */}
          <AnimatedSection delay={0.4}>
            <div className="mt-16 bg-azul-marino rounded-3xl p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-turquesa/10 rounded-bl-[200px]" />
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-turquesa/20 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-turquesa">KG</span>
                  </div>
                </div>
                <div>
                  <Quote className="w-10 h-10 text-turquesa/40 mb-4" />
                  <p className="text-xl lg:text-2xl text-white font-medium leading-relaxed mb-4">
                    {language === 'es'
                      ? '"En 15 años he aprendido que los problemas más costosos de las empresas NO son tecnológicos. Son de procesos. Y los procesos se arreglan con metodología, disciplina y personas comprometidas."'
                      : '"In 15 years I\'ve learned that the most costly business problems are NOT technological. They\'re about processes. And processes are fixed with methodology, discipline and committed people."'}
                  </p>
                  <div>
                    <p className="text-white font-semibold">Katherine González</p>
                    <p className="text-white/60 text-sm">MBA, PMP®, ISO 9001 Lead Auditor — CEO, Grupo Alternative</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ CASE STUDIES / SUCCESS STORIES ============ */}
      <section className="py-24 bg-white dark:bg-card/50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block text-menta font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? 'Casos de Éxito' : 'Success Stories'}
              </span>
              <h2 className="text-4xl lg:text-5xl font-semibold text-azul-marino dark:text-white mb-4">
                {language === 'es' ? 'Resultados reales para empresas reales' : 'Real results for real companies'}
              </h2>
              <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                {language === 'es'
                  ? 'Casos de éxito con métricas comprobadas y testimoniales de clientes'
                  : 'Success cases with proven metrics and customer testimonials'}
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, idx) => (
              <StaggerItem key={idx}>
                <div className={`bg-blanco-hueso dark:bg-secondary rounded-2xl p-8 border-t-4 ${caseStudy.color} h-full flex flex-col`}>
                  <span className="inline-block text-xs font-semibold text-turquesa bg-turquesa/10 px-3 py-1 rounded-full mb-4 self-start">
                    {caseStudy.industry}
                  </span>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">{caseStudy.title}</h3>
                  <p className="text-sm text-foreground/60 mb-6 leading-relaxed">{caseStudy.challenge}</p>
                  
                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {caseStudy.results.map((result, rIdx) => (
                      <div key={rIdx} className="text-center">
                        <p className="text-2xl font-bold text-turquesa">{result.value}</p>
                        <p className="text-xs text-foreground/50">{result.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial */}
                  <div className="mt-auto pt-6 border-t border-gris-arena/20">
                    <p className="text-sm text-foreground/70 italic mb-3">&ldquo;{caseStudy.testimonial}&rdquo;</p>
                    <p className="text-sm font-semibold text-azul-marino dark:text-white">— {caseStudy.author}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection delay={0.3}>
            <div className="mt-12 text-center">
              <Link 
                href="/success-stories"
                className="group inline-flex items-center gap-3 bg-turquesa text-azul-marino font-semibold px-7 py-4 rounded-xl hover:bg-menta transition-all duration-300 hover:-translate-y-1"
              >
                {language === 'es' ? '¿Quieres resultados como estos?' : 'Want results like these?'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ RESOURCES SECTION ============ */}
      <section className="py-24 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block text-oliva font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? 'Recursos Gratuitos' : 'Free Resources'}
              </span>
              <h2 className="text-4xl lg:text-5xl font-semibold text-azul-marino dark:text-white mb-4">
                {language === 'es' ? 'Recursos gratuitos para optimizar tu empresa' : 'Free resources to optimize your company'}
              </h2>
              <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                {language === 'es'
                  ? 'Guías, checklists y herramientas descargables sin costo. Empieza a generar valor antes de hablar con nosotros.'
                  : 'Free downloadable guides, checklists and tools. Start generating value before talking to us.'}
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, idx) => {
              const Icon = resource.icon;
              return (
                <StaggerItem key={idx}>
                  <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                    <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-turquesa" />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">{resource.title}</h3>
                    <p className="text-foreground/60 mb-4 leading-relaxed text-sm flex-grow">{resource.desc}</p>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-foreground/50">{resource.format}</span>
                      <span className="text-turquesa font-medium">{resource.benefit}</span>
                    </div>
                    <button className="w-full group flex items-center justify-center gap-2 bg-turquesa/10 text-turquesa font-semibold py-3 rounded-xl hover:bg-turquesa hover:text-azul-marino transition-all duration-300">
                      <Download className="w-5 h-5" />
                      {language === 'es' ? 'Descargar gratis' : 'Download free'}
                    </button>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ============ TESTIMONIALS SECTION ============ */}
      <section className="py-24 bg-azul-marino relative overflow-hidden">
        <div className="container-custom relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block text-menta font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? 'Testimonios' : 'Testimonials'}
              </span>
              <h2 className="text-4xl lg:text-5xl font-semibold text-white">
                {language === 'es' ? 'Lo que dicen nuestros clientes' : 'What our clients say'}
              </h2>
            </div>
          </AnimatedSection>

          {/* Featured Testimonial */}
          <AnimatedSection delay={0.2}>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 lg:p-12">
                <Quote className="w-14 h-14 text-turquesa/40 mb-6" />
                <p className="text-2xl lg:text-3xl text-white font-medium leading-relaxed mb-8">
                  &ldquo;{testimonials[0].quote}&rdquo;
                </p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-menta rounded-full flex items-center justify-center">
                      <span className="text-azul-marino font-bold text-xl">
                        {testimonials[0].name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg">{testimonials[0].name}</h4>
                      <p className="text-white/60">{testimonials[0].role}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-white/10 text-white/70 px-3 py-1 rounded-full">{testimonials[0].badge}</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Other Testimonials */}
          <StaggerContainer className="grid md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
            {testimonials.slice(1).map((testimonial, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
                  <p className="text-white/80 mb-4 italic text-sm leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-turquesa/30 rounded-full flex items-center justify-center">
                      <span className="text-turquesa font-semibold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-sm">{testimonial.name}</h4>
                      <p className="text-white/50 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                  <span className="inline-block mt-4 text-xs bg-white/10 text-white/60 px-2 py-1 rounded-full">{testimonial.badge}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============ PROCESS SECTION ============ */}
      <section className="py-24 bg-white dark:bg-card/50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block text-oliva font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? 'Cómo Trabajamos' : 'How We Work'}
              </span>
              <h2 className="text-4xl lg:text-5xl font-semibold text-azul-marino dark:text-white mb-6">
                {language === 'es' ? 'Nuestro Proceso' : 'Our Process'}
              </h2>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {phases.map((phase, idx) => {
              const Icon = phase.icon;
              return (
                <StaggerItem key={idx}>
                  <div className="relative">
                    {/* Connector */}
                    {idx < phases.length - 1 && (
                      <div className="hidden lg:block absolute top-12 left-[60%] w-full h-px bg-gris-arena/50" />
                    )}
                    <div className="bg-blanco-hueso dark:bg-secondary rounded-2xl p-8 hover:shadow-brand-md transition-all duration-300 hover:-translate-y-1">
                      <div className="text-5xl font-bold text-turquesa/20 mb-4">{phase.num}</div>
                      <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-turquesa" />
                      </div>
                      <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                        {phase.title}
                      </h3>
                      <p className="text-foreground/60 text-sm leading-relaxed">
                        {phase.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ============ CTA FINAL SECTION ============ */}
      <section className="py-24 bg-blanco-hueso dark:bg-background relative overflow-hidden">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-violeta rounded-3xl p-12 lg:p-16 relative overflow-hidden">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-bl-[200px]" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-azul-marino/20 rounded-tr-[150px]" />
              
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6">
                    {language === 'es' 
                      ? '¿Listo para optimizar tu empresa?' 
                      : 'Ready to optimize your company?'}
                  </h2>
                  <p className="text-xl text-white/80 mb-6">
                    {language === 'es'
                      ? 'Agenda un diagnóstico gratuito de 15 minutos. Sin compromiso, sin presentaciones de venta.'
                      : 'Schedule a free 15-minute diagnosis. No commitment, no sales pitches.'}
                  </p>
                  <div className="space-y-3">
                    {[
                      language === 'es' ? 'Identificación de tu desafío más crítico' : 'Identification of your most critical challenge',
                      language === 'es' ? 'Cuantificación del impacto en tu operación' : 'Quantification of impact on your operation',
                      language === 'es' ? '3 recomendaciones accionables inmediatas' : '3 immediate actionable recommendations',
                      language === 'es' ? 'Roadmap preliminar de solución' : 'Preliminary solution roadmap',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0" />
                        <span className="text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Link 
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-3 bg-white text-violeta font-semibold px-8 py-5 rounded-xl hover:bg-menta transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-lg"
                  >
                    {language === 'es' ? 'Solicitar Diagnóstico Gratuito' : 'Request Free Diagnosis'}
                    <Timer className="w-5 h-5" />
                  </Link>
                  <p className="text-center text-white/60 text-sm">
                    {language === 'es' 
                      ? 'Más de 50 empresas han empezado con este diagnóstico gratuito. Promedio de satisfacción: 4.9/5'
                      : 'More than 50 companies have started with this free diagnosis. Average satisfaction: 4.9/5'}
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <Link 
                      href="/success-stories"
                      className="inline-flex items-center gap-2 text-white font-medium hover:text-menta transition-colors"
                    >
                      {language === 'es' ? 'Ver Casos de Éxito' : 'View Success Stories'}
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

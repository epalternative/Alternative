'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { Counter } from '@/components/ui/counter';
import {
  Target,
  Settings,
  Cpu,
  Award,
  ArrowRight,
  CheckCircle2,
  Quote,
  Code,
  FolderKanban,
  TrendingUp,
  Clock,
  Zap,
  Star,
  X,
  Check,
  Building2,
  Factory,
  ShoppingCart,
  Laptop,
  GraduationCap,
  BarChart3,
  BadgeCheck,
  Handshake
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

export default function Home() {
  const { language } = useI18n();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    industria: '',
    desafio: '',
    horario: ''
  });

  // Services data
  const services = [
    {
      icon: Settings,
      title: 'Optimización de Procesos',
      description: 'BPM empresarial, Lean Six Sigma y diseño de procesos. Reducimos costos operativos entre 25-40% con metodologías probadas y resultados medibles.',
      includes: ['BPM empresarial', 'Lean Six Sigma', 'Diseño y rediseño de procesos', 'Automatización de procesos'],
      benefit: 'Operaciones más eficientes y rentables',
      href: '/servicios/optimizacion-procesos',
      color: 'bg-turquesa/10'
    },
    {
      icon: FolderKanban,
      title: 'Gestión de Proyectos',
      description: 'PMP Project Management, metodologías ágiles y PMO Office. Proyectos que terminan a tiempo, en presupuesto y generan el valor esperado por el negocio.',
      includes: ['PMP® Project Management', 'Metodologías Ágiles (Scrum/Kanban)', 'PMO Office (governance)', 'Casos de negocio y viabilidad'],
      benefit: 'Proyectos predecibles y exitosos',
      href: '/servicios/gestion-proyectos',
      color: 'bg-azul-marino/5'
    },
    {
      icon: Award,
      title: 'Sistemas de Calidad',
      description: 'Implementación, auditoría y gestión de sistemas de calidad basados en ISO 9001 y otros marcos de referencia. Especializados en sectores regulados como banca y manufactura.',
      includes: ['Implementación de sistemas de calidad', 'Auditoría y mejora continua', 'Alineación con ISO 9001', 'Gestión de calidad sostenible'],
      benefit: 'Calidad estructurada y sostenible',
      href: '/servicios/sistemas-calidad',
      color: 'bg-menta/10'
    },
    {
      icon: Cpu,
      title: 'Transformación Digital',
      description: 'Roadmap de transformación, automatización inteligente y habilitación tecnológica. Primero optimizamos procesos, luego digitalizamos para asegurar ROI real y sostenible.',
      includes: ['Estrategia de transformación digital', 'Automatización inteligente', 'Desarrollo de software a medida', 'Infraestructura IT'],
      benefit: 'Digitalización con impacto medible',
      href: '/servicios/transformacion-digital',
      color: 'bg-turquesa/5'
    },
    {
      icon: Target,
      title: 'Consultoría Estratégica',
      description: 'Diagnóstico organizacional, estudios de viabilidad y desarrollo de RFP. Identificamos qué optimizar primero para generar máximo impacto empresarial.',
      includes: ['Diagnóstico organizacional', 'Estudios de viabilidad', 'Desarrollo de RFP estratégicos', 'Roadmaps de ejecución'],
      benefit: 'Decisiones basadas en datos',
      href: '/servicios/consultoria-estrategica',
      color: 'bg-gris-arena/20'
    },
    {
      icon: Code,
      title: 'Desarrollo & Tecnología',
      description: 'Soluciones de software a medida, portales corporativos y soporte de infraestructura. Para cuando tu proceso optimizado necesita tecnología específica que no existe en el mercado.',
      includes: ['Aplicaciones a medida', 'Portales corporativos', 'Integraciones API', 'Soporte de infraestructura IT'],
      benefit: 'Soluciones tecnológicas adaptadas',
      href: '/servicios/desarrollo-tecnologia',
      badge: 'Servicios complementarios',
      color: 'bg-blanco-hueso'
    }
  ];

  // Industries data
  const industries = [
    {
      icon: Building2,
      title: 'Banca y Servicios Financieros',
      description: 'Cumplimiento regulatorio, optimización de procesos core, sistemas de calidad para instituciones financieras, transformación digital bancaria y resiliencia operativa.',
      challenges: ['Cumplimiento regulatorio estricto', 'Eficiencia operacional bajo presión de costos', 'Transformación digital con seguridad', 'Gestión de riesgos operacionales'],
      solutions: ['Optimización de procesos de crédito', 'Implementación de sistemas de calidad', 'Automatización de operaciones bancarias', 'Compliance y auditoría regulatoria'],
      href: '/industrias/banca-servicios-financieros'
    },
    {
      icon: Factory,
      title: 'Manufactura y Logística',
      description: 'Optimización de cadena de suministro, reducción de tiempos de ciclo, implementación de sistemas de calidad y mejora continua con Lean Manufacturing.',
      challenges: ['Desperdicios en línea de producción', 'Inventarios descontrolados', 'Tiempos de entrega inconsistentes', 'Trazabilidad y calidad'],
      solutions: ['Lean Manufacturing y Six Sigma', 'Optimización de cadena de suministro', 'Sistemas de calidad ISO 9001', 'Automatización de planta'],
      href: '/industrias/manufactura-logistica'
    },
    {
      icon: ShoppingCart,
      title: 'Retail y Comercio',
      description: 'Eficiencia operacional en puntos de venta, optimización de inventarios, experiencia de cliente mejorada y procesos escalables para múltiples sucursales.',
      challenges: ['Rotación de inventario eficiente', 'Experiencia cliente consistente', 'Operación de múltiples ubicaciones', 'Márgenes bajo presión competitiva'],
      solutions: ['Optimización de procesos comerciales', 'Sistemas de gestión de inventario', 'Estandarización multi-sucursal', 'Transformación digital retail'],
      href: '/industrias/retail-comercio'
    },
    {
      icon: Laptop,
      title: 'Tecnología y Telecomunicaciones',
      description: 'Escalamiento operacional, gobierno de proyectos tecnológicos, procesos ágiles y gestión de portafolios de productos digitales.',
      challenges: ['Escalar sin perder agilidad', 'Gobierno de múltiples proyectos simultáneos', 'Time-to-market competitivo', 'Calidad y deuda técnica'],
      solutions: ['PMO estructurado', 'Metodologías ágiles a escala', 'Optimización de procesos de desarrollo', 'Gestión de portafolio de proyectos'],
      href: '/industrias/tecnologia-telecomunicaciones'
    }
  ];

  // Success cases data
  const successCases = [
    {
      industry: 'Banca y Servicios Financieros',
      title: 'Institución Financiera Regional',
      challenge: 'Procesos de aprobación de créditos excesivamente lentos (15-20 días promedio), incumplimiento de SLA internos, alto costo operacional por gestión manual y múltiples aprobaciones innecesarias.',
      solution: 'Rediseño completo del proceso de crédito bajo metodología BPM, automatización de validaciones repetitivas, eliminación de aprobaciones redundantes, capacitación de equipos y tableros de control en tiempo real.',
      results: [
        { metric: '40%', label: 'Reducción tiempo aprobación' },
        { metric: '25%', label: 'Aumento productividad' },
        { metric: '100%', label: 'Cumplimiento SLA' }
      ],
      testimonial: 'Alternative no solo optimizó nuestros procesos, nos enseñó a gestionarlos con disciplina. Hoy somos una institución más ágil y competitiva, y lo más importante: lo mantenemos internamente.',
      author: 'CFO, Institución Financiera Regional'
    },
    {
      industry: 'Manufactura y Logística',
      title: 'Empresa de Manufactura y Logística',
      challenge: 'Inventarios descontrolados sin visibilidad real, tiempos de entrega inconsistentes (solo 60% a tiempo), desperdicios no cuantificados en línea de producción, falta de sistema de calidad documentado.',
      solution: 'Implementación de Lean Manufacturing, mapeo completo de cadena de valor, sistema Kanban para control de inventario, capacitación en mejora continua y acompañamiento para implementación de sistema de calidad ISO 9001.',
      results: [
        { metric: '30%', label: 'Reducción inventario' },
        { metric: '92%', label: 'Entregas a tiempo' },
        { metric: '$180K', label: 'Ahorros anuales' }
      ],
      testimonial: 'Identificamos y eliminamos desperdicios que ni sabíamos que existían. El ROI de la consultoría se recuperó en 4 meses, y seguimos mejorando con las herramientas que nos dejaron.',
      author: 'COO, Empresa de Manufactura'
    },
    {
      industry: 'Tecnología',
      title: 'Empresa de Tecnología (PMO Implementation)',
      challenge: 'Múltiples proyectos sin metodología estándar, 70% con retrasos significativos, equipos trabajando en silos, clientes insatisfechos con tiempos de entrega, falta de visibilidad ejecutiva del portafolio.',
      solution: 'Implementación de PMO Office estructurado, adopción de marcos Scrum y Kanban para proyectos ágiles, capacitación PMP para líderes de proyecto, dashboards ejecutivos de seguimiento y priorización de portafolio.',
      results: [
        { metric: '85%', label: 'Proyectos a tiempo' },
        { metric: '50%', label: 'Reducción retrabajo' },
        { metric: '4.5/5', label: 'Satisfacción cliente' }
      ],
      testimonial: 'Pasamos de no saber qué estaba pasando en nuestros proyectos, a tener un PMO que realmente agrega valor estratégico, no solo reportes que nadie lee.',
      author: 'CTO, Empresa de Tecnología'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: 'Alternative transformó completamente nuestra operación crediticia. En 6 meses redujimos costos en 32% y estructuramos un sistema de calidad robusto. El equipo no solo consultó, nos capacitó para ser autosuficientes.',
      author: 'Juan Carlos Méndez',
      role: 'CFO, Institución Financiera Regional',
      badge: 'Banca | Optimización de Procesos',
      initials: 'JC'
    },
    {
      quote: 'Teníamos 15 proyectos corriendo simultáneamente, todos con retrasos. Implementaron un PMO estructurado y hoy el 85% termina a tiempo. Cambió completamente nuestra capacidad de ejecución.',
      author: 'María Fernández',
      role: 'CTO, Empresa de Tecnología',
      badge: 'Tecnología | PMO',
      initials: 'MF'
    },
    {
      quote: 'Era escéptico al inicio sobre consultoría, pero los resultados son innegables: 40% menos tiempo en procesos operativos clave. Nuestros clientes lo notan, nuestro equipo está más motivado y productivo.',
      author: 'Roberto Castillo',
      role: 'COO, Banco Regional',
      badge: 'Banca | BPM',
      initials: 'RC'
    },
    {
      quote: 'Íbamos a implementar un ERP costoso sin arreglar nuestros procesos primero. Alternative nos detuvo, optimizó procesos, y luego sí digitalizamos. Nos ahorraron más de $200,000 en software que no necesitábamos.',
      author: 'Laura Gómez',
      role: 'CEO, Empresa de Manufactura',
      badge: 'Manufactura | Transformación Digital',
      initials: 'LG'
    },
    {
      quote: 'El enfoque de transferencia de conocimiento es real. No solo nos dejaron procesos optimizados, nos capacitaron para continuar mejorando sin depender de consultores externos.',
      author: 'Carlos Ramírez',
      role: 'Gerente de Operaciones, Empresa de Retail',
      badge: 'Retail | Lean Six Sigma',
      initials: 'CR'
    }
  ];

  // Why Alternative differentiators
  const differentiators = [
    {
      icon: GraduationCap,
      title: 'Equipo Certificado con Expertise Internacional',
      description: 'Equipo multidisciplinario con certificaciones PMP®, ISO 9001 Lead Auditor, Lean Six Sigma y MBA. 15+ años liderando transformaciones empresariales en banca, manufactura, tecnología y retail en Latinoamérica y el Caribe.',
      stat: '15+ años | 50+ proyectos exitosos'
    },
    {
      icon: BarChart3,
      title: 'Metodologías Probadas, Resultados Medibles',
      description: 'No vendemos teoría. Aplicamos BPM, Lean Six Sigma, PMP y marcos de calidad con disciplina rigurosa. Cada proyecto tiene métricas claras: reducción de costos, tiempo de ciclo, calidad, satisfacción. Nuestros clientes promedian 35% de reducción de costos operativos.',
      stat: '35% reducción de costos promedio'
    },
    {
      icon: Zap,
      title: 'Expertise de Gran Consultoría, Agilidad de Boutique',
      description: 'Conocemos las metodologías de las grandes consultoras internacionales, pero sin su burocracia ni precios prohibitivos. Respuesta rápida, equipos dedicados, atención directa de socios. Implementaciones efectivas en 90 días, no en 12 meses.',
      stat: '90 días promedio de implementación'
    },
    {
      icon: Handshake,
      title: 'Enfoque Práctico y Transferencia de Conocimiento',
      description: 'No creamos dependencia. Nuestro objetivo es que tu equipo se apropie de las metodologías y continúe mejorando después de nuestra intervención. Consultoría con transferencia genuina de capacidades internas.',
      stat: '100% clientes continúan mejora continua'
    }
  ];

  return (
    <>
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative min-h-screen bg-azul-marino overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-turquesa/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-menta/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-turquesa/5 rounded-full" />
        </div>

        {/* Floating dots */}
        <div className="absolute top-32 left-[10%] w-2 h-2 bg-turquesa rounded-full animate-pulse" />
        <div className="absolute top-[60%] left-[5%] w-3 h-3 bg-menta/60 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-[40%] right-[8%] w-2 h-2 bg-turquesa/80 rounded-full animate-pulse delay-500" />

        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 lg:order-1"
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-turquesa/20 backdrop-blur-sm border border-turquesa/30 text-turquesa px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <Star className="w-4 h-4" />
                Consultoría Empresarial
              </motion.div>

              {/* H1 */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-4">
                Consultoría empresarial que genera{' '}
                <span className="text-turquesa">
                  resultados medibles
                </span>
              </h1>

              {/* Tagline */}
              <p className="text-turquesa font-medium text-lg mb-4">
                Impulsamos tu empresa estratégicamente
              </p>

              {/* Subheadline */}
              <p className="text-lg text-white/70 mb-8 max-w-xl">
                Consultoría especializada en optimización de procesos, gestión de proyectos y sistemas de calidad. Equipo certificado en PMP®, ISO 9001 Lead Auditor y Lean Six Sigma. Experiencia comprobada en banca, manufactura, retail y tecnología en Latinoamérica y el Caribe.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  href="/contacto"
                  className="group inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-5 py-3 rounded-lg hover:bg-menta transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-turquesa/20 text-sm"
                >
                  Solicita Diagnóstico Gratuito
                  <span className="bg-azul-marino/20 px-2 py-0.5 rounded text-xs">15 min</span>
                </Link>
                <Link
                  href="#services"
                  className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium px-5 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 text-sm"
                >
                  Conoce nuestros servicios
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: BadgeCheck, text: 'Equipo PMP® Certified' },
                  { icon: Award, text: 'ISO 9001 Lead Auditors' },
                  { icon: TrendingUp, text: 'Lean Six Sigma Certified' },
                  { icon: Clock, text: '15+ años de experiencia' }
                ].map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-lg">
                    <badge.icon className="w-4 h-4 text-turquesa" />
                    <span className="text-white/80 text-sm">{badge.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right content - Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative">
                {/* Main image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero-meeting.jpg"
                    alt="Consultoría empresarial Alternative"
                    width={600}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-azul-marino/30" />
                </div>

                {/* Team photo overlay - floating */}
                <motion.div 
                  className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl overflow-hidden border-4 border-azul-marino shadow-xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/images/team-working.jpg"
                    alt="Equipo Alternative"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Stats overlay - floating */}
                <motion.div 
                  className="absolute top-6 -right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-turquesa/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-turquesa" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        <Counter end={50} suffix="+" />
                      </p>
                      <p className="text-white/60 text-sm">Proyectos Exitosos</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute bottom-16 -right-4 bg-turquesa rounded-xl p-4 shadow-xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <p className="text-2xl font-bold text-azul-marino">35%</p>
                  <p className="text-azul-marino/70 text-sm">Reducción costos promedio</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-blanco-hueso dark:text-background"/>
          </svg>
        </div>
      </section>

      {/* ===================== PROBLEMA → SOLUCIÓN ===================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
              Desafíos y Soluciones
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              ¿Tu empresa enfrenta estos desafíos operacionales?
            </h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Problems Column */}
            <AnimatedSection delay={0.1}>
              <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-brand h-full border-l-4 border-red-400">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                    <X className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white">Problemas Comunes</h3>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      title: 'Procesos ineficientes que elevan costos',
                      desc: 'Operaciones manuales repetitivas, cuellos de botella ocultos, desperdicios no cuantificados. Cada día de ineficiencia representa dinero que tu empresa pierde sin poder medirlo.'
                    },
                    {
                      title: 'Proyectos sin metodología que fracasan',
                      desc: 'Alcance descontrolado, equipos desalineados, cronogramas irreales. El 70% de los proyectos fracasan por falta de metodología estructurada, no por falta de presupuesto o talento.'
                    },
                    {
                      title: 'Sistemas de calidad inexistentes o desactualizados',
                      desc: 'Sin procesos documentados para licitaciones, clientes corporativos exigentes, o cumplimiento regulatorio. La falta de estructura de calidad cierra puertas de negocio.'
                    },
                    {
                      title: 'Transformación digital sin impacto real',
                      desc: 'Implementaste tecnología, pero los procesos siguen igual de lentos. Sin optimización previa, la tecnología solo automatiza la ineficiencia existente.'
                    }
                  ].map((problem, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <X className="w-4 h-4 text-red-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-azul-marino dark:text-white mb-1">{problem.title}</h4>
                        <p className="text-foreground/60 text-sm">{problem.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Solutions Column */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-brand h-full border-l-4 border-turquesa">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center">
                    <Check className="w-6 h-6 text-turquesa" />
                  </div>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white">Nuestras Soluciones</h3>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      title: 'Reducimos costos operativos entre 25-40%',
                      desc: 'Mapeo completo de procesos actuales, identificación de desperdicios, rediseño optimizado y automatización estratégica. Metodologías BPM y Lean Six Sigma con resultados medibles en 90 días.'
                    },
                    {
                      title: 'Proyectos exitosos con estándares globales',
                      desc: 'Gestión bajo marcos PMP y metodologías ágiles (Scrum/Kanban). Planificación realista, seguimiento riguroso, gestión proactiva de riesgos. Tus proyectos terminan a tiempo, en presupuesto y generan el valor esperado.'
                    },
                    {
                      title: 'Sistemas de calidad alineados a estándares internacionales',
                      desc: 'Implementación de sistemas de gestión de calidad bajo ISO 9001 u otros marcos de referencia. Procesos documentados, auditorías estructuradas, mejora continua sostenible. Ideal para sectores regulados como banca y manufactura.'
                    },
                    {
                      title: 'Transformación digital con ROI comprobado',
                      desc: 'Primero optimizamos procesos, luego digitalizamos. Roadmap claro, priorización basada en impacto, gestión del cambio organizacional y adopción real. Tecnología que realmente transforma operaciones.'
                    }
                  ].map((solution, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-8 h-8 bg-turquesa/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-turquesa" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-azul-marino dark:text-white mb-1">{solution.title}</h4>
                        <p className="text-foreground/60 text-sm">{solution.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* CTA */}
          <AnimatedSection delay={0.3} className="mt-12 text-center">
            <p className="text-foreground/60 mb-4">¿Identificaste 2 o más desafíos?</p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 text-turquesa font-semibold hover:text-menta transition-colors"
            >
              Agenda un diagnóstico gratuito de 15 minutos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ===================== SERVICIOS ===================== */}
      <section id="services" className="py-20 lg:py-32 bg-white dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
              Nuestros Servicios
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              Nuestros servicios de consultoría empresarial
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Soluciones integrales para optimizar tu operación, desde el diagnóstico estratégico hasta la implementación completa
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <StaggerItem key={idx}>
                <Link href={service.href}>
                  <div className={`group relative ${service.color} rounded-2xl p-6 h-full border border-gris-arena/20 hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1`}>
                    {service.badge && (
                      <span className="absolute top-4 right-4 px-2 py-1 bg-turquesa/20 text-turquesa text-xs font-medium rounded-full">
                        {service.badge}
                      </span>
                    )}
                    <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                      <service.icon className="w-7 h-7 text-turquesa" />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-foreground/60 text-sm mb-4">
                      {service.description}
                    </p>
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {service.includes.map((item, i) => (
                          <span key={i} className="text-xs bg-white/60 dark:bg-white/10 px-2 py-1 rounded-full text-foreground/70">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-turquesa font-medium mb-4">
                      <CheckCircle2 className="w-4 h-4 inline mr-1" />
                      {service.benefit}
                    </p>
                    <div className="flex items-center gap-2 text-turquesa font-medium text-sm group-hover:gap-3 transition-all">
                      <span>Ver más</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===================== INDUSTRIAS ===================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
              Industrias
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              Experiencia comprobada en sectores de alta complejidad
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Entendemos los desafíos específicos de tu industria y adaptamos nuestras soluciones a tus requisitos regulatorios y operacionales particulares
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {industries.map((industry, idx) => (
              <StaggerItem key={idx}>
                <Link href={industry.href}>
                  <div className="group bg-white dark:bg-card rounded-2xl p-6 shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <industry.icon className="w-7 h-7 text-turquesa" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-2">
                          {industry.title}
                        </h3>
                        <p className="text-foreground/60 text-sm">
                          {industry.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs font-medium text-foreground/40 uppercase tracking-wider mb-2">Desafíos</p>
                        <ul className="space-y-1">
                          {industry.challenges.slice(0, 3).map((c, i) => (
                            <li key={i} className="text-sm text-foreground/60 flex items-start gap-1">
                              <span className="text-red-400 mt-1">•</span>
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground/40 uppercase tracking-wider mb-2">Soluciones</p>
                        <ul className="space-y-1">
                          {industry.solutions.slice(0, 3).map((s, i) => (
                            <li key={i} className="text-sm text-foreground/60 flex items-start gap-1">
                              <span className="text-turquesa mt-1">•</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-turquesa font-medium text-sm group-hover:gap-3 transition-all">
                      <span>Ver soluciones</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection delay={0.3} className="mt-12 text-center">
            <p className="text-foreground/60 mb-4">
              ¿Tu industria no aparece aquí? Trabajamos con empresas de todos los sectores. Lo importante es el desafío y el impacto que podemos generar juntos.
            </p>
            <Link
              href="/industrias"
              className="inline-flex items-center gap-2 text-turquesa font-semibold hover:text-menta transition-colors"
            >
              Ver todas las industrias
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ===================== POR QUÉ ALTERNATIVE ===================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
              Por Qué Elegirnos
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white">
              Por qué empresas líderes en LATAM y el Caribe confían en Alternative
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-6 mb-16">
            {differentiators.map((diff, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-blanco-hueso dark:bg-card rounded-2xl p-6 h-full border border-gris-arena/20">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <diff.icon className="w-7 h-7 text-turquesa" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-2">
                        {diff.title}
                      </h3>
                      <p className="text-foreground/60 text-sm mb-3">
                        {diff.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gris-arena/20">
                    <span className="text-turquesa font-semibold text-sm">{diff.stat}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Katherine Quote */}
          <AnimatedSection delay={0.3}>
            <div className="bg-azul-marino rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-turquesa flex-shrink-0 bg-turquesa/20 flex items-center justify-center">
                <span className="text-turquesa font-bold text-3xl lg:text-4xl">KG</span>
              </div>
              <div className="flex-1">
                <Quote className="w-10 h-10 text-turquesa/30 mb-4" />
                <p className="text-white/90 text-lg lg:text-xl italic mb-4">
                  &quot;En 15 años he aprendido que los problemas más costosos de las empresas NO son tecnológicos. Son de procesos mal diseñados, equipos desalineados y falta de metodología. Y eso se soluciona con disciplina, datos y personas comprometidas.&quot;
                </p>
                <div>
                  <p className="text-white font-semibold">Katherine González</p>
                  <p className="text-white/60 text-sm">PMP®, ISO 9001 Lead Auditor — CEO, Alternative</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===================== CASOS DE ÉXITO ===================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium mb-4">
              Casos de Éxito
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              Resultados reales para empresas reales
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Casos de éxito con métricas comprobadas y testimoniales de clientes verificados
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid lg:grid-cols-3 gap-6">
            {successCases.map((caso, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-brand h-full flex flex-col">
                  <span className="inline-block px-3 py-1 bg-turquesa/10 text-turquesa text-xs font-medium rounded-full mb-4 self-start">
                    {caso.industry}
                  </span>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                    {caso.title}
                  </h3>
                  <p className="text-foreground/60 text-sm mb-4 flex-1">
                    {caso.challenge}
                  </p>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {caso.results.map((r, i) => (
                      <div key={i} className="text-center p-2 bg-blanco-hueso dark:bg-background rounded-lg">
                        <p className="text-lg font-bold text-turquesa">{r.metric}</p>
                        <p className="text-xs text-foreground/60">{r.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-gris-arena/20">
                    <p className="text-foreground/70 text-sm italic mb-2">&quot;{caso.testimonial}&quot;</p>
                    <p className="text-foreground/50 text-xs">— {caso.author}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection delay={0.3} className="mt-12 text-center">
            <Link
              href="/casos-exito"
              className="inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-6 py-3 rounded-xl hover:bg-menta transition-all"
            >
              ¿Quieres resultados como estos en tu empresa?
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>


      {/* ===================== TESTIMONIALES ===================== */}
      <section className="py-20 lg:py-32 bg-azul-marino">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/20 text-turquesa rounded-full text-sm font-medium mb-4">
              Testimonios
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Testimoniales verificados de ejecutivos que han trabajado con Alternative
            </p>
          </AnimatedSection>

          {/* Featured testimonial */}
          <AnimatedSection delay={0.1} className="mb-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10">
              <Quote className="w-12 h-12 text-turquesa/30 mb-6" />
              <p className="text-white/90 text-xl lg:text-2xl mb-8 leading-relaxed">
                &quot;{testimonials[0].quote}&quot;
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-turquesa/20 rounded-full flex items-center justify-center text-turquesa font-bold text-lg">
                    {testimonials[0].initials}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonials[0].author}</h4>
                    <p className="text-white/60 text-sm">{testimonials[0].role}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-turquesa/20 text-turquesa text-sm rounded-full">
                  {testimonials[0].badge}
                </span>
              </div>
            </div>
          </AnimatedSection>

          {/* Other testimonials */}
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.slice(1).map((test, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full">
                  <p className="text-white/80 text-sm mb-4">&quot;{test.quote}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-turquesa/20 rounded-full flex items-center justify-center text-turquesa font-bold text-sm">
                      {test.initials}
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm">{test.author}</h4>
                      <p className="text-white/50 text-xs">{test.role}</p>
                    </div>
                  </div>
                  <span className="inline-block mt-3 px-2 py-1 bg-turquesa/10 text-turquesa text-xs rounded-full">
                    {test.badge}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>


      {/* ===================== CTA FINAL ===================== */}
      <section className="py-20 lg:py-32 bg-violeta relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large blob top right */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          {/* Medium blob bottom left */}
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-azul-marino/40 rounded-full blur-2xl" />
          {/* Small accent blob */}
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-turquesa/10 rounded-full blur-3xl" />
          {/* Curved shape overlay */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 rounded-l-[100px]" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left content */}
            <AnimatedSection>
              <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
                ¿Listo para optimizar tu empresa?
              </h2>
              <p className="text-white/70 mb-8">
                Agenda un diagnóstico gratuito de 15 minutos. Sin compromiso, sin presentaciones comerciales. Solo identificamos tus oportunidades de mejora más urgentes y te damos recomendaciones accionables.
              </p>

              <div className="mb-8">
                <p className="text-turquesa font-medium mb-4">En 15 minutos cubrimos:</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Identificación de tu desafío operacional más crítico',
                    'Cuantificación preliminar del impacto en tu negocio',
                    '3 recomendaciones accionables inmediatas',
                    'Roadmap preliminar de solución (si aplica)'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <p className="text-white/60 text-sm">
                  &quot;Más de 50 empresas en LATAM han iniciado con este diagnóstico gratuito. Satisfacción promedio: <strong className="text-turquesa">4.9/5</strong>&quot;
                </p>
              </div>
            </AnimatedSection>

            {/* Right content - Form */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-2xl">
                <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-6">
                  Solicita tu diagnóstico gratuito
                </h3>
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-1">Nombre completo*</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gris-arena/30 focus:border-turquesa focus:ring-2 focus:ring-turquesa/20 outline-none transition-all bg-white dark:bg-background"
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-1">Email corporativo*</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-gris-arena/30 focus:border-turquesa focus:ring-2 focus:ring-turquesa/20 outline-none transition-all bg-white dark:bg-background"
                        placeholder="tu@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-1">Teléfono (WhatsApp)*</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl border border-gris-arena/30 focus:border-turquesa focus:ring-2 focus:ring-turquesa/20 outline-none transition-all bg-white dark:bg-background"
                        placeholder="+507 XXXX-XXXX"
                        value={formData.telefono}
                        onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-1">Empresa*</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gris-arena/30 focus:border-turquesa focus:ring-2 focus:ring-turquesa/20 outline-none transition-all bg-white dark:bg-background"
                        placeholder="Nombre de tu empresa"
                        value={formData.empresa}
                        onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="industria-select" className="block text-sm font-medium text-foreground/70 mb-1">Industria*</label>
                    <select
                      id="industria-select"
                      title="Selecciona tu industria"
                      className="w-full px-4 py-3 rounded-xl border border-gris-arena/30 focus:border-turquesa focus:ring-2 focus:ring-turquesa/20 outline-none transition-all bg-white dark:bg-background text-foreground"
                      value={formData.industria}
                      onChange={(e) => setFormData({...formData, industria: e.target.value})}
                    >
                      <option value="">Selecciona tu industria</option>
                      <option value="banca">Banca y Servicios Financieros</option>
                      <option value="manufactura">Manufactura y Logística</option>
                      <option value="retail">Retail y Comercio</option>
                      <option value="tecnologia">Tecnología y Telecomunicaciones</option>
                      <option value="servicios">Servicios Profesionales</option>
                      <option value="gobierno">Gobierno y Sector Público</option>
                      <option value="salud">Salud y Farmacéutica</option>
                      <option value="energia">Energía y Utilities</option>
                      <option value="otra">Otra</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1">¿Cuál es tu mayor desafío operacional?*</label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border border-gris-arena/30 focus:border-turquesa focus:ring-2 focus:ring-turquesa/20 outline-none transition-all bg-white dark:bg-background resize-none"
                      rows={3}
                      placeholder="Describe brevemente tu situación actual..."
                      maxLength={250}
                      value={formData.desafio}
                      onChange={(e) => setFormData({...formData, desafio: e.target.value})}
                    />
                    <p className="text-xs text-foreground/40 mt-1">{formData.desafio.length}/250 caracteres</p>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-turquesa text-azul-marino font-semibold px-6 py-4 rounded-xl hover:bg-menta transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    Solicitar Diagnóstico Gratuito
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
                <p className="text-center text-foreground/50 text-sm mt-4">
                  ¿Prefieres WhatsApp? Escríbenos: <a href="https://wa.me/50769908906" className="text-turquesa hover:underline">+507 6990-8906</a>
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

    </>
  );
}

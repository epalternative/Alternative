'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { IndustrySidebar } from '@/components/ui/industry-sidebar';
import { faqs as faqData } from '@/lib/content/faqs/industrias--servicios-profesionales';
import { localizeFaqs } from '@/lib/content/faqs';
import {
  ArrowRight,
  ChevronDown,
  Target,
  CheckCircle2,
  Settings,
  Phone,
  DollarSign,
  FolderKanban,
  BookOpen,
  LayoutDashboard,
  Clock,
  Sparkles,
  Briefcase,
  TrendingUp,
} from 'lucide-react';

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

const StaggerContainer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
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

const StaggerItem = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
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
  <motion.div className="border-b border-gris-arena/20 last:border-0" initial={false}>
    <button
      onClick={onClick}
      className="w-full py-6 flex items-center justify-between text-left group"
    >
      <span className="text-lg font-semibold text-azul-marino dark:text-white group-hover:text-turquesa transition-colors pr-8">
        {question}
      </span>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
        <ChevronDown className="w-5 h-5 text-turquesa" />
      </motion.div>
    </button>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <p className="pb-6 text-foreground/70 leading-relaxed">{answer}</p>
    </motion.div>
  </motion.div>
);

export default function ServiciosProfesionalesPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Industrias' : 'Industries', href: `/${locale}/industrias` },
    { label: isEs ? 'Servicios Profesionales' : 'Professional Services', href: null },
  ];

  const desafios = [
    {
      icon: Clock,
      title: 'Gestión de utilización de consultores',
      desc: 'Utilización óptima 65–75%. Muy baja (&lt;60%): margen se deteriora. Muy alta (&gt;85%): burnout, falta de tiempo para desarrollo de negocio. Balance difícil.',
    },
    {
      icon: DollarSign,
      title: 'Rentabilidad por cliente/proyecto variable',
      desc: 'Algunos clientes/proyectos altamente rentables (margen 40%+), otros marginales o pérdida (scope creep, horas no facturables). Sin análisis riguroso, firmas no saben dónde ganan o pierden.',
    },
    {
      icon: FolderKanban,
      title: 'Proyectos sin gestión estructurada',
      desc: 'Consultores senior gestionan proyectos sin metodología formal. Riesgo: retrasos, scope creep, clientes insatisfechos, margen erosionado. Necesidad de PM dedicado o metodología estandarizada.',
    },
    {
      icon: BookOpen,
      title: 'Conocimiento atrapado en cabezas de partners',
      desc: 'Metodologías, templates, know-how en socios senior. Dificulta escalar (contratar consultores junior efectivos) y genera dependencia de personas clave.',
    },
    {
      icon: Settings,
      title: 'Procesos operativos ineficientes',
      desc: 'Trabajo administrativo no facturable consumiendo 20–30% tiempo: propuestas, facturación, timesheet, reportes. Oportunidad de automatizar y optimizar.',
    },
    {
      icon: LayoutDashboard,
      title: 'Falta de herramientas de gestión integradas',
      desc: 'Gestión de proyectos en Excel, timesheet en otro sistema, facturación en contabilidad. Sin visibilidad consolidada de utilización, rentabilidad, pipeline.',
    },
  ];

  const faqs = localizeFaqs(faqData, 'es');

  const contactSubject = isEs ? 'PM o Consultoría Servicios Profesionales' : 'PM or Consulting Professional Services';
  const contactUrl = `/${locale}/contacto?subject=${encodeURIComponent(contactSubject)}`;

  return (
    <>
      <ReadingProgress />
      <IndustrySidebar locale={locale} currentIndustry="servicios-profesionales" />

      {/* HERO - Turquesa */}
      <section className="relative bg-turquesa overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[15%] right-[10%] w-40 h-40 bg-azul-marino/10 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-[20%] left-[8%] w-32 h-32 bg-menta/10 rounded-full blur-2xl animate-float-slow" />
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
                  {idx > 0 && <ChevronDown className="w-4 h-4 text-azul-marino/50 -rotate-90" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="text-azul-marino/70 hover:text-azul-marino transition-colors">
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-azul-marino/10 text-azul-marino rounded-full text-sm font-medium uppercase tracking-wider mb-6">
                Servicios Profesionales
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-azul-marino font-semibold leading-tight mb-4">
                {isEs
                  ? 'Consultoría para firmas de servicios: gestión de proyectos y eficiencia'
                  : 'Consulting for professional services firms: project management and efficiency'}
              </h1>
              <p className="text-lg md:text-xl text-azul-marino/80 mb-8 leading-relaxed">
                {isEs
                  ? 'Gestión de proyectos complejos, optimización de operaciones, sistemas de calidad, herramientas tecnológicas. PMs certificados que entienden economía de servicios profesionales: facturación por hora, gestión de utilización, rentabilidad por cliente/proyecto.'
                  : 'Complex project management, operations optimization, quality systems and technology tooling. Certified project managers who understand the economics of professional services: hourly billing, utilization management and profitability per client and project.'}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={contactUrl}
                  className="inline-flex items-center gap-2 bg-azul-marino text-white font-semibold px-6 py-3 rounded-lg hover:bg-azul-marino/90 transition-all duration-300 shadow-lg group"
                >
                  Solicita PM o Consultoría
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/casos-exito`}
                  className="inline-flex items-center gap-2 border-2 border-azul-marino text-azul-marino font-medium px-6 py-3 rounded-lg hover:bg-azul-marino/10 transition-all duration-300"
                >
                  Ver casos servicios profesionales
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-azul-marino/20">
                {[
                  { value: 'PMs para firmas profesionales', icon: Target },
                  { value: 'Optimización de utilización', icon: TrendingUp },
                  { value: '20+ proyectos servicios', icon: Sparkles },
                ].map((s, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <s.icon className="w-4 h-4 text-azul-marino" />
                    <span className="text-azul-marino/70 text-sm">{s.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual - Servicios · Profesionales Animated */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-azul-marino/10 backdrop-blur-xl rounded-3xl p-8 border border-azul-marino/20 relative"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-turquesa" />
                    <div className="w-3 h-3 rounded-full bg-menta" />
                    <div className="w-3 h-3 rounded-full bg-violeta" />
                    <span className="ml-auto text-azul-marino/60 text-sm font-medium">
                      Servicios · Profesionales
                    </span>
                  </div>
                  <div className="space-y-3 font-mono text-xs">
                    {[
                      { label: 'Utilización', progress: 72, color: 'turquesa' },
                      { label: 'Rentabilidad', progress: 85, color: 'menta' },
                      { label: 'Proyectos', progress: 90, color: 'violeta' },
                      { label: 'Metodologías', progress: 88, color: 'turquesa' },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-azul-marino/80">{item.label}</span>
                          <span
                            className={`font-bold ${
                              item.color === 'turquesa' ? 'text-turquesa' : item.color === 'menta' ? 'text-menta' : 'text-violeta'
                            }`}
                          >
                            {item.progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-azul-marino/20 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ duration: 1.5, delay: 0.5 + idx * 0.3 }}
                            className={`h-full rounded-full ${
                              item.color === 'turquesa' ? 'bg-turquesa' : item.color === 'menta' ? 'bg-menta' : 'bg-violeta'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {['Consultoría', 'Legal', 'Ingeniería'].map((channel, idx) => (
                      <motion.div
                        key={idx}
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                        className="bg-azul-marino/10 rounded-lg p-2 text-center border border-azul-marino/10"
                      >
                        <span className="text-azul-marino/90 text-xs font-medium">{channel}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-azul-marino rounded-2xl p-4 shadow-xl"
                >
                  <Briefcase className="w-8 h-8 text-turquesa" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* POR QUÉ ALTERNATIVE */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
              Entendemos la dinámica de firmas de servicios profesionales
            </h2>
          </AnimatedSection>
          <AnimatedSection className="max-w-4xl mx-auto mb-12">
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                Empresas de servicios profesionales (consultorías, firmas legales, contabilidad y auditoría, arquitectura
                e ingeniería, agencias) operan con modelo específico: personal es el activo principal, facturación por
                hora o proyecto, margen depende de utilización, rentabilidad varía por cliente/proyecto, gestión de
                conocimiento y metodologías es crítica. Presión por optimizar utilización (60–80% óptimo), reducir
                trabajo no facturable y escalar sin contratar proporcionalmente.
              </p>
              <p>
                Alternative es firma de servicios profesionales que ayuda a otras firmas: entendemos desafíos de gestionar
                proyectos cliente complejos, equilibrar utilización vs desarrollo de propuestas, documentar metodologías
                para escalabilidad, implementar herramientas de gestión de proyectos y tiempo, y optimizar procesos para
                mejorar márgenes. Hemos implementado ISO 9001 en firmas profesionales, gestionado proyectos complejos
                multi-stakeholder y optimizado operaciones en consultorías, firmas legales y de ingeniería.
              </p>
            </div>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              '20+ proyectos en servicios profesionales',
              'PMs PMP® gestión de proyectos cliente',
              'ISO 9001 metodologías estandarizadas',
              'Optimización utilización + rentabilidad',
            ].map((stat, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-turquesa/10 rounded-2xl p-6 border border-turquesa/20 shadow-brand text-center">
                  <p className="text-azul-marino dark:text-white font-semibold text-sm">{stat}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* DESAFÍOS */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              Desafíos críticos de firmas de servicios profesionales
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {desafios.map((d, idx) => {
              const Icon = d.icon;
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-background p-8 rounded-2xl shadow-brand hover:shadow-brand-lg transition-all duration-300 border border-gris-arena/20 h-full"
                  >
                    <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-turquesa" />
                    </div>
                    <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-2">{d.title}</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">{d.desc}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="py-20 lg:py-32 bg-turquesa/10">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              Cómo Alternative apoya a empresas de servicios profesionales
            </h2>
          </AnimatedSection>

          <AnimatedSection className="mb-8">
            <div className="bg-white dark:bg-background rounded-2xl p-8 lg:p-10 shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 border border-turquesa/20 overflow-hidden group">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center">
                  <Target className="w-7 h-7 text-turquesa" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                    Gestión de proyectos complejos
                  </h3>
                  <p className="text-foreground/60 text-sm">PMs PMP® para proyectos cliente o internos de alta complejidad</p>
                </div>
              </div>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Project Managers PMP® certificados para gestionar proyectos cliente de alta complejidad o proyectos
                internos críticos. PM se integra a tu firma y gestiona con metodología estructurada, liberando a
                consultores senior para trabajo facturable.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  {
                    title: 'Proyectos cliente complejos',
                    sub: 'Legal (due diligence $50M), auditoría multinacional 6 meses, implementación ERP. PM gestiona cronograma, equipos, cliente, reporte a partners.',
                  },
                  {
                    title: 'Proyectos internos de firma',
                    sub: 'Implementación software de proyectos, migración oficina, ISO 9001, fusión. PM gestiona mientras consultores se enfocan en clientes.',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-turquesa/10 rounded-xl p-4 border border-turquesa/20">
                    <h4 className="font-semibold text-azul-marino dark:text-white text-sm mb-1">{item.title}</h4>
                    <p className="text-foreground/60 text-xs">{item.sub}</p>
                  </div>
                ))}
              </div>
              <p className="text-foreground/70 text-sm mb-6">
                <strong className="text-azul-marino dark:text-white">Ventaja de PM outsourcing:</strong> Consultores
                senior liberados de trabajo PM. Arbitraje de tarifa mejora rentabilidad. PM con expertise en gestión,
                consultores en su dominio.
              </p>
              <Link
                href={contactUrl}
                className="inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-6 py-3 rounded-lg hover:bg-menta transition-all duration-300 shadow-glow-turquesa"
              >
                Solicita PM para Proyectos Complejos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedSection delay={0.1}>
              <div className="bg-white dark:bg-background rounded-2xl p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 border border-gris-arena/20 h-full flex flex-col">
                <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                  <Settings className="w-7 h-7 text-turquesa" />
                </div>
                <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                  Optimización de operaciones
                </h3>
                <p className="text-foreground/70 mb-4 flex-1">
                  Optimización de procesos operativos: ventas (propuestas), onboarding, proyectos, facturación, tiempo,
                  conocimiento. Reducir trabajo no facturable, mejorar utilización, escalar eficientemente.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-foreground/70">
                  {[
                    'Propuestas: templates, biblioteca reutilizable, workflow. 20h → 8h.',
                    'Gestión de proyectos: metodología, templates, Asana/Monday/MS Project.',
                    'Timesheet y facturación: automatización, reglas, análisis realizado vs presupuestado.',
                    'Gestión de conocimiento: metodologías, repositorio, onboarding junior.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/servicios/optimizacion-procesos`}
                  className="inline-flex items-center gap-2 text-turquesa font-semibold hover:gap-3 transition-all"
                >
                  Ver Optimización de Procesos
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-background rounded-2xl p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 border border-gris-arena/20 h-full flex flex-col">
                <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7 text-turquesa" />
                </div>
                <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                  Sistemas de calidad ISO 9001
                </h3>
                <p className="text-foreground/70 mb-4 flex-1">
                  Implementación de ISO 9001 para firmas de servicios profesionales. Estandariza metodologías, documenta
                  procesos, asegura calidad consistente, facilita escalamiento. ISO 9001 Lead Auditor en Alternative.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-foreground/70">
                  {[
                    'Estandariza metodologías (junior ejecuta consistentemente)',
                    'Documenta know-how (no atrapado en cabezas)',
                    'Diferenciación (licitaciones, clientes corporativos)',
                    'Mejora calidad de entregas (menos retrabajo)',
                    'Facilita escalamiento (procesos claros para contratar)',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/servicios/sistemas-calidad/implementacion-iso-9001`}
                  className="inline-flex items-center gap-2 text-turquesa font-semibold hover:gap-3 transition-all"
                >
                  Ver ISO 9001
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CASO DE ÉXITO - HIDDEN FOR VALIDATION */}
      {false && (
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-blanco-hueso dark:bg-card rounded-2xl p-8 lg:p-12 shadow-brand border-l-4 border-turquesa overflow-hidden">
              <h2 className="text-2xl lg:text-3xl font-semibold text-azul-marino dark:text-white mb-6">
                Caso: Firma de ingeniería mejora margen 12% con optimización + ISO 9001
              </h2>
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-foreground/70 mb-2">
                    <strong className="text-azul-marino dark:text-white">Cliente:</strong> Firma de ingeniería civil (50
                    consultores, 15 partners, $8M revenue anual).
                  </p>
                  <p className="text-foreground/70 mb-4">
                    <strong className="text-azul-marino dark:text-white">Situación:</strong> Crecimiento 20 → 50
                    consultores pero margen erosionado: EBITDA 25% → 18%. Utilización 70% → 58%, scope creep, procesos
                    ad-hoc, junior poco productivos, trabajo admin 25% tiempo.
                  </p>
                  <p className="text-foreground/70">
                    <strong className="text-azul-marino dark:text-white">Objetivo:</strong> Recuperar margen 25%+ con
                    optimización operativa y estandarización.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-azul-marino dark:text-white mb-3">Solución (9 meses)</h4>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    <li>Mes 1: Diagnóstico utilización, proyectos no rentables, procesos, tiempo no facturable.</li>
                    <li>Mes 2–4: Monday.com, timesheet+facturación automatizados, templates propuestas (20h→7h), control de cambios, dashboard utilización/rentabilidad.</li>
                    <li>Mes 5–9: Documentación metodologías, procedimientos, capacitación 50 consultores, auditorías internas, certificación ISO 9001.</li>
                  </ul>
                  <h4 className="font-semibold text-azul-marino dark:text-white mt-4 mb-2">Factor crítico</h4>
                  <p className="text-sm text-foreground/70">
                    Combinación optimización + ISO. Solo optimización ~6–7%; ISO sumó 5–6% vía escalabilidad y diferenciación.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { v: '30%', l: 'Margen EBITDA (+12 pts)' },
                  { v: '72%', l: 'Utilización' },
                  { v: '$960K', l: 'Mejora anual margen' },
                  { v: '1.030%', l: 'ROI primer año' },
                ].map((s, i) => (
                  <div key={i} className="bg-turquesa/10 rounded-xl p-4 border border-turquesa/20 text-center">
                    <p className="text-turquesa font-bold">{s.v}</p>
                    <p className="text-foreground/60 text-xs">{s.l}</p>
                  </div>
                ))}
              </div>
              <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                &ldquo;Optimización + ISO 9001 mejoraron margen 12 puntos. Consultores 72% utilización, procesos
                estandarizados, ganamos licitaciones por ISO. Mejor inversión que hicimos.&rdquo;
                <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— Managing Partner</span>
              </blockquote>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* FAQ */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              Preguntas frecuentes
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
                ¿Tu firma profesional necesita optimizar operaciones?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Evaluación gratuita de 30 minutos. Analizamos utilización, rentabilidad y procesos operativos.
                Identificamos oportunidades de mejora.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  'Análisis preliminar de utilización',
                  'Identificación de trabajo no facturable',
                  'Evaluación de madurez de procesos',
                  'Recomendaciones prioritarias',
                  'Propuesta de optimización',
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
                    href={contactUrl}
                    className="inline-flex items-center gap-3 bg-turquesa text-azul-marino font-semibold px-8 py-4 rounded-lg hover:bg-menta transition-all duration-300 shadow-glow-turquesa group"
                  >
                    Solicitar Evaluación Operativa
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

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  ArrowRight,
  Target,
  Shield,
  Zap,
  BookOpen,
  Globe,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Quote,
  Award,
  Building2,
  TrendingUp,
  Layers,
  FolderKanban,
  DollarSign,
  Briefcase,
} from 'lucide-react';
import { SectionTitle } from '@/components/ui/section-title';

const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function NosotrosPage() {
  const locale = useLocale();
  const isEs = locale === 'es';

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Nosotros' : 'About Us', href: null },
  ];

  return (
    <div className="min-h-screen">
      {/* ========== HERO (Oliva - marca) ========== */}
      <section className="relative bg-oliva overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[10%] right-[5%] w-64 h-64 bg-turquesa/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[10%] left-[10%] w-48 h-48 bg-menta/10 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 opacity-[0.04] bg-grid-hero-subtle" />
        </div>

        <div className="container-custom relative z-10 pt-8 pb-20 lg:pb-28">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {idx > 0 && (
                    <ChevronDown className="w-4 h-4 text-white/50 -rotate-90" />
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-white/70 hover:text-turquesa transition-colors"
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-6">
                {isEs
                  ? 'Transformamos empresas de servicios con estrategia, metodología y resultados'
                  : 'We transform service companies with strategy, methodology and results'}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                {isEs
                  ? 'Somos consultores estratégicos especializados en optimización de procesos, gestión de proyectos y transformación digital para el sector de servicios en América Latina.'
                  : 'We are strategic consultants specialized in process optimization, project management and digital transformation for the services sector in Latin America.'}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-brand-lg"
            >
              <Image
                src="/images/consulting-session.webp"
                alt={isEs ? 'Equipo en sesión estratégica' : 'Team in strategy session'}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0 bg-[#605b51] mix-blend-multiply opacity-40"
                aria-hidden
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </section>

      {/* ========== QUIÉNES SOMOS ========== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-background relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Columna izquierda: visual con fondo oliva + tema procesos (nosotros) */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7 }}
              className="relative order-2 lg:order-1 min-h-[320px] md:min-h-[400px] rounded-2xl overflow-hidden bg-oliva/90 dark:bg-oliva/80"
            >
              {/* Gradiente sobre oliva: oliva suave → menta muy sutil */}
              <div className="absolute inset-0 bg-gradient-to-br from-oliva via-oliva/95 to-menta/20 dark:from-oliva/95 dark:via-oliva/90 dark:to-menta/10" />
              <div className="absolute inset-0 bg-grid-hero-subtle opacity-[0.06]" />
              {/* Blurs sobre oliva (tonos que combinan) */}
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[15%] right-[10%] w-48 h-48 bg-turquesa/15 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-[20%] left-[8%] w-40 h-40 bg-menta/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[35%] left-[30%] w-28 h-28 bg-white/10 rounded-full blur-2xl"
              />
              {/* Formas tipo “procesos”: pasos / bloques */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute top-[10%] left-[10%] w-20 h-20 md:w-28 md:h-28 bg-white/15 rounded-2xl rotate-6 border border-white/20"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="absolute top-[38%] right-[12%] w-16 h-16 md:w-24 md:h-24 bg-turquesa/25 rounded-xl -rotate-6 border border-turquesa/30"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-[22%] left-[15%] w-14 h-14 md:w-20 md:h-20 bg-menta/30 rounded-xl rotate-12 border border-menta/30"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                className="absolute bottom-[12%] right-[22%] w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-lg -rotate-12 border border-white/25"
              />
              {/* Flujo de procesos: 4 pasos con flechas (Diagnóstico → Diseño → Implementación → Resultado) */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute inset-0 flex items-center justify-center p-6"
              >
                <svg viewBox="0 0 200 72" className="w-full max-w-[280px] md:max-w-[320px] text-white/90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  {/* Paso 1 */}
                  <circle cx="28" cy="36" r="14" stroke="currentColor" strokeWidth="2" fill="rgba(255,255,255,0.1)" />
                  <text x="28" y="40" textAnchor="middle" className="svg-step-text fill-current">1</text>
                  {/* Flecha */}
                  <path d="M 44 36 L 58 36 M 54 32 L 58 36 L 54 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Paso 2 */}
                  <circle cx="72" cy="36" r="14" stroke="currentColor" strokeWidth="2" fill="rgba(255,255,255,0.1)" />
                  <text x="72" y="40" textAnchor="middle" className="svg-step-text fill-current">2</text>
                  <path d="M 88 36 L 102 36 M 98 32 L 102 36 L 98 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Paso 3 */}
                  <circle cx="116" cy="36" r="14" stroke="currentColor" strokeWidth="2" fill="rgba(255,255,255,0.1)" />
                  <text x="116" y="40" textAnchor="middle" className="svg-step-text fill-current">3</text>
                  <path d="M 132 36 L 146 36 M 142 32 L 146 36 L 142 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Paso 4 */}
                  <circle cx="172" cy="36" r="14" stroke="currentColor" strokeWidth="2" fill="rgba(108,196,212,0.3)" />
                  <text x="172" y="40" textAnchor="middle" className="svg-step-text fill-current">4</text>
                </svg>
              </motion.div>
            </motion.div>

            {/* Columna derecha: texto (esquema de la referencia) */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="order-1 lg:order-2 space-y-6"
            >
              <span className="inline-block text-turquesa text-sm font-semibold uppercase tracking-widest">
                {isEs ? 'Quiénes somos' : 'Who we are'}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-heading font-semibold text-azul-marino dark:text-white leading-tight">
                {isEs ? 'Construimos crecimiento con estrategia y resultados' : 'We build growth with strategy and results'}
              </h2>
              <p className="text-body-lg text-foreground/80 leading-relaxed">
                {isEs
                  ? 'Grupo Alternative es una consultora estratégica con más de 5 años transformando empresas de servicios en Panamá y América Latina.'
                  : 'Grupo Alternative is a strategic consulting firm with over 5 years transforming service companies in Panama and Latin America.'}
              </p>
              <p className="text-body text-foreground/70 leading-relaxed">
                {isEs
                  ? 'Nacimos de identificar una necesidad crítica en el mercado: empresas medianas y grandes con desafíos operativos complejos, pero sin acceso a consultoría de clase mundial a precios razonables.'
                  : 'We were born from identifying a critical need in the market: mid-size and large companies with complex operational challenges, but without access to world-class consulting at reasonable prices.'}
              </p>
              <ul className="space-y-3">
                {[
                  { icon: Award, text: isEs ? 'Metodologías de nivel internacional (PMI, Lean, ISO)' : 'International-level methodologies (PMI, Lean, ISO)' },
                  { icon: Shield, text: isEs ? 'Equipo certificado con estándares globales' : 'Team certified to global standards' },
                  { icon: TrendingUp, text: isEs ? 'Estructura ágil y costos competitivos' : 'Agile structure and competitive costs' },
                  { icon: Globe, text: isEs ? 'Conocimiento profundo del contexto LATAM' : 'Deep knowledge of LATAM context' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-turquesa" />
                    </div>
                    <span className="text-body font-medium text-azul-marino dark:text-white">{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <a
                  href="#nuestro-equipo"
                  className="inline-flex items-center gap-2 text-azul-marino dark:text-turquesa font-semibold hover:text-turquesa dark:hover:text-menta transition-colors"
                >
                  {isEs ? 'Conoce a nuestro equipo' : 'Meet our team'}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Card estadística abajo (como en la referencia) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 lg:mt-16 flex flex-wrap gap-6 justify-center lg:justify-start"
          >
            <div className="inline-flex items-center gap-6 rounded-2xl bg-azul-marino dark:bg-azul-marino/95 px-8 py-6 text-white shadow-brand">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                <FolderKanban className="w-7 h-7 text-turquesa" />
              </div>
              <div>
                <span className="block text-3xl md:text-4xl font-bold">50+</span>
                <span className="text-body-sm text-white/80">{isEs ? 'Proyectos de transformación' : 'Transformation projects'}</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-6 rounded-2xl bg-azul-marino dark:bg-azul-marino/95 px-8 py-6 text-white shadow-brand">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-turquesa" />
              </div>
              <div>
                <span className="block text-3xl md:text-4xl font-bold">$15M+</span>
                <span className="text-body-sm text-white/80">{isEs ? 'Ahorros para clientes' : 'Savings for clients'}</span>
              </div>
            </div>
          </motion.div>

          {/* Cierre: una frase (debajo del bloque principal) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 rounded-2xl bg-white dark:bg-card p-8 md:p-10 border border-gris-arena/10 shadow-brand"
          >
            <p className="text-body-lg md:text-xl text-azul-marino dark:text-blanco-hueso font-medium leading-relaxed text-center max-w-3xl mx-auto">
              {isEs
                ? 'Hoy, Alternative es reconocida por combinar rigor metodológico con pragmatismo operativo: no vendemos reportes que se archivan, implementamos cambios que generan resultados medibles.'
                : 'Today, Alternative is recognized for combining methodological rigor with operational pragmatism: we do not sell reports to be filed away; we implement changes that generate measurable results.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== MANIFIESTO / FRASE FUNDADORA ========== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-card relative overflow-hidden">
        <div className="absolute top-20 right-[10%] w-32 h-32 bg-turquesa/10 rounded-2xl rotate-12 animate-float-slow" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Quote className="w-12 h-12 text-turquesa/30 mx-auto mb-6" aria-hidden />
            <blockquote className="text-xl md:text-2xl lg:text-3xl text-azul-marino dark:text-blanco-hueso font-medium leading-relaxed mb-8">
              {isEs ? (
                <>
                  &ldquo;Alternative nació del compromiso de construir organizaciones más eficientes, más humanas y mejor preparadas para liderar el cambio.
                  <br className="my-4" />
                  Transformar no es imponer fórmulas genéricas — es escuchar, analizar, acompañar y construir juntos.
                  <br className="my-4" />
                  Cada empresa es única. Nuestro rol es guiar con estrategia, claridad y compromiso hacia resultados que perduren.&rdquo;
                </>
              ) : (
                <>
                  &ldquo;Alternative was born from the commitment to build more efficient, more human organizations better prepared to lead change.
                  <br className="my-4" />
                  Transforming is not imposing generic formulas — it is listening, analyzing, accompanying and building together.
                  <br className="my-4" />
                  Every company is unique. Our role is to guide with strategy, clarity and commitment toward lasting results.&rdquo;
                </>
              )}
            </blockquote>
            <footer className="text-body-lg text-foreground/80">
              <cite className="not-italic font-semibold text-azul-marino dark:text-white">
                — Katherine González
              </cite>
              <p className="text-body-sm text-foreground/60 mt-1">
                {isEs ? 'Fundadora & CEO, Grupo Alternative' : 'Founder & CEO, Grupo Alternative'}
              </p>
            </footer>
          </motion.div>
        </div>
      </section>

      {/* ========== NUESTRO EQUIPO ========== */}
      <section id="nuestro-equipo" className="py-20 lg:py-28 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <SectionTitle
            title={isEs ? 'Nuestro equipo' : 'Our team'}
            subtitle={
              isEs
                ? 'En Alternative, la calidad de nuestros consultores es nuestro diferenciador principal.'
                : 'At Alternative, the quality of our consultants is our main differentiator.'
            }
          />

          {/* 2 columnas: izquierda = intro + cuadros, derecha = cierre */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Columna 1: intro + 4 cuadros */}
            <AnimatedSection className="space-y-8" delay={0.1}>
              <p className="text-body-lg text-foreground/80">
                {isEs
                  ? 'Cada miembro del equipo es seleccionado bajo criterios estrictos de formación, certificaciones y experiencia comprobada:'
                  : 'Each team member is selected under strict criteria of education, certifications and proven experience:'}
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    title: isEs ? 'Formación académica' : 'Academic background',
                    items: isEs
                      ? ['MBAs de universidades reconocidas', 'Grados en Ingeniería, Administración, Tecnología', 'Formación continua en metodologías internacionales']
                      : ['MBAs from recognized universities', 'Degrees in Engineering, Administration, Technology', 'Ongoing training in international methodologies'],
                  },
                  {
                    title: isEs ? 'Certificaciones profesionales' : 'Professional certifications',
                    items: isEs
                      ? ['PMP® (Project Management Professional)', 'ISO 9001 Lead Auditors', 'Lean Six Sigma (Green Belt / Black Belt)', 'Scrum Master / Product Owner', 'ITIL, COBIT (cuando aplica)']
                      : ['PMP® (Project Management Professional)', 'ISO 9001 Lead Auditors', 'Lean Six Sigma (Green Belt / Black Belt)', 'Scrum Master / Product Owner', 'ITIL, COBIT (when applicable)'],
                  },
                  {
                    title: isEs ? 'Experiencia sectorial' : 'Sector experience',
                    items: isEs
                      ? ['Banca y servicios financieros', 'Firmas legales y servicios profesionales', 'Aseguradoras', 'Empresas de tecnología', 'Consultoría estratégica']
                      : ['Banking and financial services', 'Law firms and professional services', 'Insurance', 'Technology companies', 'Strategic consulting'],
                  },
                  {
                    title: isEs ? 'Competencias idiomáticas' : 'Language skills',
                    items: isEs ? ['Español (todos)', 'Inglés técnico fluido'] : ['Spanish (all)', 'Fluent technical English'],
                  },
                ].map((block, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
                    className="bg-white dark:bg-card rounded-2xl p-6 shadow-brand border border-gris-arena/10"
                  >
                    <h3 className="text-subheading font-semibold text-azul-marino dark:text-white mb-4">
                      {block.title}
                    </h3>
                    <ul className="space-y-2 text-foreground/80 text-body-sm">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Columna 2: cuadro azul + imagen abajo del cuadro */}
            <AnimatedSection className="space-y-6 lg:space-y-8" delay={0.2}>
              <div className="relative rounded-2xl bg-azul-marino dark:bg-azul-marino/95 p-8 md:p-10 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-turquesa/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <p className="relative z-10 text-body-lg md:text-xl leading-relaxed">
                  {isEs
                    ? 'Este estándar de selección garantiza que nuestros clientes reciban consultoría de nivel internacional con conocimiento local.'
                    : 'This selection standard ensures our clients receive international-level consulting with local knowledge.'}
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-video w-full min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]">
                <Image
                  src="/images/team-working.jpg"
                  alt={isEs ? 'Equipo en sesión de trabajo' : 'Team in work session'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 bg-[#605b51] mix-blend-multiply opacity-50"
                  aria-hidden
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ========== LO QUE NOS DEFINE (Valores) ========== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-card">
        <div className="container-custom">
          <SectionTitle
            title={isEs ? 'Lo que nos define' : 'What defines us'}
            subtitle={isEs ? 'Nuestros valores' : 'Our values'}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: isEs ? 'Resultados medibles' : 'Measurable results',
                desc: isEs
                  ? 'Nuestros proyectos se miden en ROI, ahorros cuantificables y mejoras verificables.'
                  : 'Our projects are measured in ROI, quantifiable savings and verifiable improvements.',
              },
              {
                icon: Shield,
                title: isEs ? 'Honestidad técnica' : 'Technical honesty',
                desc: isEs
                  ? 'Si una solución no es viable, lo decimos desde el día 1. Sin sorpresas ni costos ocultos.'
                  : 'If a solution is not viable, we say so from day 1. No surprises or hidden costs.',
              },
              {
                icon: Zap,
                title: isEs ? 'Pragmatismo operativo' : 'Operational pragmatism',
                desc: isEs
                  ? 'Diseñamos soluciones que puedes implementar con tus recursos.'
                  : 'We design solutions you can implement with your resources.',
              },
              {
                icon: BookOpen,
                title: isEs ? 'Transferencia de conocimiento' : 'Knowledge transfer',
                desc: isEs
                  ? 'No creamos dependencia. Capacitamos tu equipo para que continúe sin nosotros.'
                  : 'We do not create dependency. We train your team so it continues without us.',
              },
              {
                icon: Globe,
                title: isEs ? 'Adaptabilidad local' : 'Local adaptability',
                desc: isEs
                  ? 'Entendemos el contexto LATAM: cultura, regulaciones, recursos. Adaptamos best practices.'
                  : 'We understand LATAM context: culture, regulations, resources. We adapt best practices.',
              },
              {
                icon: CheckCircle2,
                title: isEs ? 'Rigor metodológico' : 'Methodological rigor',
                desc: isEs
                  ? 'Aplicamos estándares PMI, Lean, ISO sin comprometer pragmatismo.'
                  : 'We apply PMI, Lean, ISO standards without compromising pragmatism.',
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group relative bg-blanco-hueso/50 dark:bg-background/50 rounded-2xl p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-turquesa/10 rounded-2xl rotate-12 group-hover:rotate-45 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                    <v.icon className="w-7 h-7 text-turquesa" />
                  </div>
                  <h3 className="text-subheading font-semibold text-azul-marino dark:text-white mb-2">
                    {v.title}
                  </h3>
                  <p className="text-body text-foreground/70">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== POR QUÉ ELEGIR ALTERNATIVE ========== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <SectionTitle
            title={isEs ? 'Por qué elegir Alternative' : 'Why choose Alternative'}
          />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                n: 1,
                title: isEs ? 'Expertise internacional, precio competitivo' : 'International expertise, competitive price',
                desc: isEs
                  ? 'Equipo con certificaciones de nivel global (PMP, ISO 9001, MBA) sin la estructura de costos de las grandes consultoras. Misma calidad, 40-60% menos costo.'
                  : 'Team with global-level certifications (PMP, ISO 9001, MBA) without the cost structure of large consultancies. Same quality, 40-60% lower cost.',
              },
              {
                n: 2,
                title: isEs ? 'Especialización en servicios' : 'Specialization in services',
                desc: isEs
                  ? 'Nos especializamos en empresas de SERVICIOS (banca, legal, seguros, consultoría, tech). Entendemos tus procesos porque hemos optimizado decenas similares.'
                  : 'We specialize in SERVICE companies (banking, legal, insurance, consulting, tech). We understand your processes because we have optimized dozens of similar ones.',
              },
              {
                n: 3,
                title: isEs ? 'Implementación, no solo reportes' : 'Implementation, not just reports',
                desc: isEs
                  ? 'No entregamos un PowerPoint de 200 páginas para archivar. Acompañamos la IMPLEMENTACIÓN hasta que los cambios generen resultados medibles. Nuestro éxito se mide en tu ROI.'
                  : 'We do not deliver a 200-page PowerPoint to file away. We accompany IMPLEMENTATION until changes generate measurable results. Our success is measured in your ROI.',
              },
              {
                n: 4,
                title: isEs ? 'Agilidad y acceso directo' : 'Agility and direct access',
                desc: isEs
                  ? 'Estructura boutique sin capas de burocracia. Trabajas con el equipo senior desde día 1. Decisiones en horas, no semanas.'
                  : 'Boutique structure without layers of bureaucracy. You work with the senior team from day 1. Decisions in hours, not weeks.',
              },
              {
                n: 5,
                title: isEs ? 'Contexto local + metodologías probadas' : 'Local context + proven methodologies',
                desc: isEs
                  ? 'Entendemos las realidades de LATAM (cultura, regulaciones, recursos limitados) pero aplicamos metodologías probadas globalmente (PMI, Lean, ISO).'
                  : 'We understand LATAM realities (culture, regulations, limited resources) but apply globally proven methodologies (PMI, Lean, ISO).',
              },
              {
                n: 6,
                title: isEs ? 'Track record comprobado' : 'Proven track record',
                desc: isEs
                  ? '50+ proyectos completados exitosamente. $15M+ en ahorros generados para clientes. ROI promedio: 477%. 95% de clientes nos recomiendan. 0 proyectos abandonados.'
                  : '50+ projects completed successfully. $15M+ in savings generated for clients. Average ROI: 477%. 95% of clients recommend us. 0 abandoned projects.',
              },
            ].map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-card rounded-2xl p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 border border-gris-arena/10"
              >
                <span className="inline-flex w-10 h-10 bg-turquesa/20 text-turquesa rounded-xl items-center justify-center font-bold text-lg mb-4">
                  {r.n}
                </span>
                <h3 className="text-subheading font-semibold text-azul-marino dark:text-white mb-3">
                  {r.title}
                </h3>
                <p className="text-body text-foreground/70">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CLIENTES Y TESTIMONIALES ========== */}
      <section className="py-20 lg:py-28 bg-azul-marino">
        <div className="container-custom">
          <SectionTitle
            title={isEs ? 'Nos avalan nuestros resultados' : 'Our results speak for us'}
            light
          />
          <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
            {isEs
              ? 'Hemos trabajado con instituciones líderes en:'
              : 'We have worked with leading institutions in:'}
          </p>
          <p className="text-center text-white/60 text-body-sm mb-12">
            {isEs
              ? 'Banca • Legal • Seguros • Tecnología • Consultoría'
              : 'Banking • Legal • Insurance • Technology • Consulting'}
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <p className="text-body text-white/90 mb-6 italic">
                &ldquo;{isEs
                  ? 'Alternative redujo nuestros tiempos de proceso de 12 días a 5 días. +35% más volumen procesado.'
                  : 'Alternative reduced our process times from 12 days to 5 days. +35% more volume processed.'}&rdquo;
              </p>
              <p className="text-body-sm text-white font-semibold">
                — {isEs ? 'Gerente General, Institución Financiera' : 'General Manager, Financial Institution'}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <p className="text-body text-white/90 mb-6 italic">
                &ldquo;{isEs
                  ? 'ROI de 868% en año 1. Recuperamos 10h/semana de tiempo de socios que ahora es facturable.'
                  : '868% ROI in year 1. We recovered 10h/week of partner time that is now billable.'}&rdquo;
              </p>
              <p className="text-body-sm text-white font-semibold">
                — {isEs ? 'Socia Fundadora, Firma de Servicios Profesionales' : 'Founding Partner, Professional Services Firm'}
              </p>
            </motion.div>
          </div>
          <div className="text-center">
            <Link
              href={`/${locale}/casos-exito`}
              className="inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-6 py-3 rounded-lg hover:bg-menta transition-all duration-300 shadow-glow-turquesa"
            >
              {isEs ? 'Ver casos de éxito completos' : 'View full success cases'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== CERTIFICACIONES Y MEMBRESÍAS ========== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-card">
        <div className="container-custom">
          <SectionTitle
            title={isEs ? 'Certificaciones y afiliaciones profesionales' : 'Professional certifications and affiliations'}
            subtitle={
              isEs
                ? 'Nuestro equipo mantiene certificaciones de estándares internacionales y participa en comunidades profesionales.'
                : 'Our team maintains certifications from international standards and participates in professional communities.'
            }
          />
          <AnimatedSection className="space-y-12" delay={0.1}>
            <div>
              <h3 className="text-subheading font-semibold text-azul-marino dark:text-white mb-6">
                {isEs ? 'Certificaciones del equipo' : 'Team certifications'}
              </h3>
              <div className="flex flex-wrap gap-6">
                {[
                  { label: 'PMP®', sub: isEs ? 'Project Management Professional' : 'Project Management Professional' },
                  { label: 'ISO 9001', sub: isEs ? 'Lead Auditor ISO 9001:2015' : 'Lead Auditor ISO 9001:2015' },
                  { label: 'Lean Six Sigma', sub: isEs ? 'Green Belt / Black Belt' : 'Green Belt / Black Belt' },
                  { label: 'Scrum Master', sub: isEs ? 'Certified' : 'Certified' },
                  { label: 'MBA', sub: isEs ? 'Master of Business Admin.' : 'Master of Business Admin.' },
                ].map((b, i) => (
                  <div
                    key={i}
                    className="bg-turquesa/10 rounded-2xl px-6 py-4 border border-turquesa/20 min-w-[140px] text-center"
                  >
                    <span className="font-bold text-turquesa text-lg">{b.label}</span>
                    <p className="text-body-sm text-foreground/70 mt-1">{b.sub}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-subheading font-semibold text-azul-marino dark:text-white mb-6">
                {isEs ? 'Miembros activos de' : 'Active members of'}
              </h3>
              <div className="flex flex-wrap gap-6">
                <div className="bg-azul-marino/5 rounded-2xl px-6 py-4 border border-azul-marino/10">
                  <span className="font-semibold text-azul-marino dark:text-white">PMI</span>
                  <p className="text-body-sm text-foreground/70 mt-1">
                    {isEs ? 'Project Management Institute - Capítulo Panamá' : 'Project Management Institute - Panama Chapter'}
                  </p>
                </div>
                <div className="bg-azul-marino/5 rounded-2xl px-6 py-4 border border-azul-marino/10">
                  <span className="font-semibold text-azul-marino dark:text-white">Women in Tech</span>
                  <p className="text-body-sm text-foreground/70 mt-1">
                    {isEs ? 'Women in Technology - Panama Chapter' : 'Women in Technology - Panama Chapter'}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== PRESENCIA REGIONAL ========== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-turquesa/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="container-custom relative z-10">
          <SectionTitle
            title={isEs ? 'Operamos en América Latina' : 'We operate in Latin America'}
            subtitle={
              isEs
                ? 'Proyectos completados en toda Centroamérica y Región Andina.'
                : 'Projects completed across Central America and the Andean Region.'
            }
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Mapa visual: Centroamérica + Colombia con marcadores */}
            <AnimatedSection delay={0.1} className="order-2 lg:order-1">
              <div className="relative rounded-2xl bg-white dark:bg-card p-6 md:p-8 shadow-brand border border-gris-arena/10 overflow-hidden">
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-turquesa/10 rounded-full blur-2xl" />
                <div className="relative aspect-[4/3] max-h-[340px] w-full">
                  <svg
                    viewBox="0 0 400 320"
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    {/* Fondo suave del continente (simplificado) */}
                    <path
                      d="M 80 40 L 120 50 L 140 90 L 130 160 L 150 220 L 180 280 L 280 260 L 320 200 L 300 120 L 260 80 L 200 50 L 140 30 L 80 40 Z"
                      fill="currentColor"
                      className="text-turquesa/10 dark:text-turquesa/15"
                    />
                    {/* Centroamérica (estilizado) */}
                    <path
                      d="M 140 35 L 180 45 L 195 85 L 190 140 L 200 200 L 220 250 L 200 270 L 160 260 L 140 220 L 130 160 L 135 100 L 140 35 Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-turquesa/20 dark:text-turquesa/25"
                    />
                    {/* Colombia (estilizado) */}
                    <path
                      d="M 200 250 L 260 240 L 300 200 L 310 150 L 280 100 L 240 120 L 220 180 L 200 250 Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-turquesa/20 dark:text-turquesa/25"
                    />
                    {/* Marcador Panamá */}
                    <g transform="translate(185, 215)">
                      <circle r="14" fill="currentColor" className="text-turquesa" />
                      <circle r="6" fill="white" />
                    </g>
                    {/* Marcador Costa Rica */}
                    <g transform="translate(165, 155)">
                      <circle r="12" fill="currentColor" className="text-turquesa" />
                      <circle r="5" fill="white" />
                    </g>
                    {/* Marcador Colombia */}
                    <g transform="translate(265, 175)">
                      <circle r="12" fill="currentColor" className="text-turquesa" />
                      <circle r="5" fill="white" />
                    </g>
                  </svg>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-gris-arena/20">
                  <span className="inline-flex items-center gap-2 text-body-sm font-medium text-azul-marino dark:text-white">
                    <span className="w-2.5 h-2.5 rounded-full bg-turquesa" /> Panamá
                  </span>
                  <span className="inline-flex items-center gap-2 text-body-sm font-medium text-azul-marino dark:text-white">
                    <span className="w-2.5 h-2.5 rounded-full bg-turquesa" /> Costa Rica
                  </span>
                  <span className="inline-flex items-center gap-2 text-body-sm font-medium text-azul-marino dark:text-white">
                    <span className="w-2.5 h-2.5 rounded-full bg-turquesa" /> Colombia
                  </span>
                </div>
              </div>
            </AnimatedSection>

            {/* Contenido: oficina + operaciones */}
            <AnimatedSection className="space-y-8 order-1 lg:order-2" delay={0.2}>
              <div className="rounded-2xl bg-white dark:bg-card p-6 md:p-8 shadow-brand border border-gris-arena/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-turquesa" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-azul-marino dark:text-white mb-1">
                      {isEs ? 'Oficina principal' : 'Head office'}
                    </h3>
                    <p className="text-foreground/80 text-body-lg">Ciudad de Panamá, Panamá</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-white dark:bg-card p-6 md:p-8 shadow-brand border border-gris-arena/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-turquesa" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-azul-marino dark:text-white mb-3">
                      {isEs ? 'Operaciones activas' : 'Active operations'}
                    </h3>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0" />
                        Panamá
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0" />
                        Costa Rica
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0" />
                        Colombia
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ========== CÓMO TRABAJAMOS ========== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-card">
        <div className="container-custom">
          <SectionTitle
            title={isEs ? 'Cómo trabajamos' : 'How we work'}
            subtitle={
              isEs
                ? 'Metodología probada en 50+ proyectos'
                : 'Methodology proven in 50+ projects'
            }
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                n: '1',
                title: isEs ? 'Diagnóstico (1-2 semanas)' : 'Diagnosis (1-2 weeks)',
                items: [
                  isEs ? 'Análisis situación actual' : 'Current situation analysis',
                  isEs ? 'Identificación quick wins' : 'Quick wins identification',
                  isEs ? 'Business case con ROI proyectado' : 'Business case with projected ROI',
                ],
              },
              {
                n: '2',
                title: isEs ? 'Diseño (2-4 semanas)' : 'Design (2-4 weeks)',
                items: [
                  isEs ? 'Procesos optimizados' : 'Optimized processes',
                  isEs ? 'Plan de implementación' : 'Implementation plan',
                  isEs ? 'Gestión del cambio' : 'Change management',
                ],
              },
              {
                n: '3',
                title: isEs ? 'Implementación (6-10 semanas)' : 'Implementation (6-10 weeks)',
                items: [
                  isEs ? 'Ejecución de cambios' : 'Execution of changes',
                  isEs ? 'Capacitación equipos' : 'Team training',
                  isEs ? 'Acompañamiento operativo' : 'Operational support',
                ],
              },
              {
                n: '4',
                title: isEs ? 'Estabilización (4-8 semanas)' : 'Stabilization (4-8 weeks)',
                items: [
                  isEs ? 'Monitoreo KPIs' : 'KPI monitoring',
                  isEs ? 'Ajustes incrementales' : 'Incremental adjustments',
                  isEs ? 'Transferencia conocimiento' : 'Knowledge transfer',
                ],
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-blanco-hueso/50 dark:bg-background/50 rounded-2xl p-8 shadow-brand border border-gris-arena/10"
              >
                <span className="inline-flex w-12 h-12 bg-turquesa/20 text-turquesa rounded-xl items-center justify-center font-bold text-xl mb-4">
                  {step.n}
                </span>
                <h3 className="text-subheading font-semibold text-azul-marino dark:text-white mb-4">
                  {step.title}
                </h3>
                <ul className="space-y-2 text-body-sm text-foreground/80">
                  {step.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-turquesa flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <p className="text-center mt-12 text-body-lg font-medium text-azul-marino dark:text-white">
            {isEs
              ? 'Resultado: Sistema sostenible que tu equipo opera autónomamente'
              : 'Result: Sustainable system that your team operates autonomously'}
          </p>
        </div>
      </section>

      {/* ========== CTA PRINCIPAL ========== */}
      <section className="py-20 lg:py-28 bg-violeta">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6"
          >
            {isEs ? '¿Listo para transformar tu organización?' : 'Ready to transform your organization?'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            {isEs
              ? 'Agenda una consulta estratégica gratuita de 30 min para identificar oportunidades de mejora en tu empresa'
              : 'Schedule a free 30-minute strategic consultation to identify improvement opportunities in your company'}
          </motion.p>
          <ul className="flex flex-wrap justify-center gap-6 mb-10 text-white/90 text-body">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-menta" />
              {isEs ? 'Sin compromiso' : 'No commitment'}
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-menta" />
              {isEs ? 'Sin costo' : 'No cost'}
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-menta" />
              {isEs ? 'Diagnóstico preliminar' : 'Preliminary diagnosis'}
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-menta" />
              {isEs ? 'Recomendaciones accionables' : 'Actionable recommendations'}
            </li>
          </ul>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-8 py-4 rounded-lg hover:bg-menta transition-all duration-300 shadow-glow-turquesa"
            >
              {isEs ? 'Agenda consulta gratuita' : 'Schedule free consultation'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
          <p className="mt-12 text-white/80 text-body-sm">
            {isEs ? 'O contáctanos directamente:' : 'Or contact us directly:'}
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-4 text-white/90 text-body-sm">
            <a href="mailto:info@grupoalternative.com" className="flex items-center gap-2 hover:text-turquesa transition-colors">
              <Mail className="w-4 h-4" />
              info@grupoalternative.com
            </a>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +507 [Teléfono]
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Ciudad de Panamá, Panamá
            </span>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <SectionTitle title={isEs ? 'Preguntas frecuentes' : 'Frequently asked questions'} />
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: isEs ? '¿Trabajan solo con empresas grandes?' : 'Do you only work with large companies?',
                a: isEs
                  ? 'No. Atendemos desde empresas de 20 hasta 500+ empleados. Lo importante es compromiso con mejorar.'
                  : 'No. We serve companies from 20 to 500+ employees. What matters is commitment to improvement.',
              },
              {
                q: isEs ? '¿Cuánto cuesta un proyecto típico?' : 'How much does a typical project cost?',
                a: isEs
                  ? 'Desde $25K (asesoría específica) hasta $250K (transformación integral). Diagnóstico gratuito para estimar.'
                  : 'From $25K (specific advisory) to $250K (full transformation). Free diagnosis to estimate.',
              },
              {
                q: isEs ? '¿Cuánto tiempo toma ver resultados?' : 'How long until we see results?',
                a: isEs
                  ? 'Quick wins: 2-4 semanas. Transformación completa: 3-6 meses. ROI positivo en 2-4 meses típicamente.'
                  : 'Quick wins: 2-4 weeks. Full transformation: 3-6 months. Positive ROI typically in 2-4 months.',
              },
              {
                q: isEs ? '¿Qué industrias atienden?' : 'What industries do you serve?',
                a: isEs
                  ? 'Servicios profesionales: banca, legal, seguros, consultoría, tecnología.'
                  : 'Professional services: banking, legal, insurance, consulting, technology.',
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-card rounded-2xl p-8 shadow-brand border border-gris-arena/10"
              >
                <h3 className="text-subheading font-semibold text-azul-marino dark:text-white mb-3">
                  {faq.q}
                </h3>
                <p className="text-body text-foreground/70">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { IndustrySidebar } from '@/components/ui/industry-sidebar';
import { faqs as faqData } from '@/lib/content/faqs/industrias--tecnologia-telecomunicaciones';
import { localizeFaqs } from '@/lib/content/faqs';
import {
  ArrowRight,
  ChevronDown,
  Target,
  CheckCircle2,
  Phone,
  DollarSign,
  Rocket,
  Users,
  RefreshCw,
  Scale,
  Code,
  Link2,
  Laptop,
  Zap,
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

export default function TecnologiaTelecomunicacionesPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Industrias' : 'Industries', href: `/${locale}/industrias` },
    { label: isEs ? 'Tecnología y Telecomunicaciones' : 'Technology & Telecom', href: null },
  ];

  const desafios = [
    {
      icon: Rocket,
      title: 'Time-to-market acelerado',
      desc: 'Presión por lanzar productos/features rápido antes que competencia. Sprints cortos, releases frecuentes. Gestión de priorización constante del backlog.',
    },
    {
      icon: Users,
      title: 'Gestión de equipos de desarrollo distribuidos',
      desc: 'Desarrolladores remotos en múltiples zonas horarias. Coordinación de dailies, sprint planning, retros. Herramientas colaborativas (Jira, Slack, GitHub).',
    },
    {
      icon: RefreshCw,
      title: 'Pivotes estratégicos frecuentes',
      desc: 'Startups tech pivotan 2–3 veces antes de encontrar product-market fit. Proyectos deben adaptarse rápido a cambios de dirección estratégica.',
    },
    {
      icon: Scale,
      title: 'Balance velocidad vs calidad técnica',
      desc: 'Presión por entregar rápido vs mantener calidad de código. Deuda técnica que se acumula. Testing automatizado, CI/CD, code reviews.',
    },
    {
      icon: DollarSign,
      title: 'Fundraising y presión inversionistas',
      desc: 'Startups con runway limitado (12–18 meses). Necesidad de demostrar tracción a inversionistas. Proyectos con milestones alineados a rondas de inversión.',
    },
    {
      icon: Target,
      title: 'Escalabilidad técnica',
      desc: 'Plataformas que crecen 10X en usuarios en meses. Arquitectura que debe escalar sin refactoring completo. Performance, disponibilidad, costos de infraestructura.',
    },
  ];

  const faqs = localizeFaqs(faqData, 'es');

  const contactSubject = isEs ? 'Scrum Master o PM Tech' : 'Scrum Master or Tech PM';
  const contactUrl = `/${locale}/contacto?subject=${encodeURIComponent(contactSubject)}`;

  return (
    <>
      <ReadingProgress />
      <IndustrySidebar locale={locale} currentIndustry="tecnologia-telecomunicaciones" />

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
                Sector Tecnología y Telecomunicaciones
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-azul-marino font-semibold leading-tight mb-4">
                {isEs
                  ? 'Consultoría para empresas tech: gestión de proyectos ágiles y desarrollo'
                  : 'Consulting for tech companies: agile project management and development'}
              </h1>
              <p className="text-lg md:text-xl text-azul-marino/80 mb-8 leading-relaxed">
                {isEs
                  ? 'Scrum Masters certificados, Project Managers para implementaciones tecnológicas, desarrollo de software, integración de sistemas. 15+ años gestionando proyectos tech complejos con metodologías ágiles.'
                  : 'Certified Scrum Masters, project managers for technology rollouts, software development and system integration. 15+ years managing complex tech projects with agile methodologies.'}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={contactUrl}
                  className="inline-flex items-center gap-2 bg-azul-marino text-white font-semibold px-6 py-3 rounded-lg hover:bg-azul-marino/90 transition-all duration-300 shadow-glow-turquesa group"
                >
                  Solicita Scrum Master o PM
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/casos-exito`}
                  className="inline-flex items-center gap-2 border-2 border-azul-marino text-azul-marino font-medium px-6 py-3 rounded-lg hover:bg-azul-marino/10 transition-all duration-300"
                >
                  Ver casos tech
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-azul-marino/20">
                {[
                  { value: 'Scrum Masters / PMs certificados', icon: Target },
                  { value: 'Metodologías ágiles', icon: Zap },
                  { value: 'Desarrollo de software', icon: Code },
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

            {/* Right Visual - Tech · Telecomunicaciones Animated */}
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
                      Tech · Telecomunicaciones
                    </span>
                  </div>
                  <div className="space-y-3 font-mono text-xs">
                    {[
                      { label: 'Velocity', progress: 40, color: 'turquesa' },
                      { label: 'Sprints', progress: 100, color: 'menta' },
                      { label: 'Stack moderno', progress: 95, color: 'violeta' },
                      { label: 'Agilidad', progress: 90, color: 'turquesa' },
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
                    {['Scrum', 'Kanban', 'SaaS'].map((channel, idx) => (
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
                  <Laptop className="w-8 h-8 text-turquesa" />
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
              Entendemos la dinámica de empresas tecnológicas
            </h2>
          </AnimatedSection>
          <AnimatedSection className="max-w-4xl mx-auto mb-12">
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                Empresas de tecnología y telecomunicaciones operan con dinámicas únicas: ciclos de desarrollo cortos
                (sprints de 2 semanas), necesidad de lanzar productos rápido al mercado (time-to-market crítico),
                equipos distribuidos, metodologías ágiles (Scrum, Kanban), pivotes estratégicos frecuentes, presión por
                innovación continua. Proyectos waterfall no funcionan; se requiere agilidad, iteración rápida y
                adaptación constante.
              </p>
              <p>
                Alternative provee Scrum Masters certificados y Project Managers con experiencia en empresas tech:
                entendemos lenguaje de developers, hemos gestionado sprints, lanzamientos SaaS, implementaciones de
                plataformas y desarrollo de software con equipos distribuidos. No somos consultores tradicionales
                aplicando PMI rígido; somos gestores ágiles que entienden cultura tech.
              </p>
            </div>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              '25+ proyectos en empresas tech',
              'Scrum Masters certificados (CSM/PSM)',
              'Desarrollo ágil Scrum, Kanban, SAFe',
              'Stack moderno React, Node.js, Python, Cloud',
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
              Desafíos críticos de empresas tecnológicas
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
              Cómo Alternative apoya a empresas tecnológicas
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
                    Scrum Masters y PMs ágiles
                  </h3>
                  <p className="text-foreground/60 text-sm">CSM/PSM para equipos de desarrollo · PM para proyectos tech mayores</p>
                </div>
              </div>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Scrum Masters certificados (CSM/PSM) para liderar equipos ágiles: facilitamos dailies, sprint planning,
                reviews, retrospectivas, gestionamos backlog con Product Owner, removemos impediments, coaching en
                prácticas ágiles. Project Managers para proyectos tech mayores: implementaciones de plataformas,
                lanzamientos SaaS, migraciones a cloud, integraciones complejas.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-turquesa/10 rounded-xl p-4 border border-turquesa/20">
                  <h4 className="font-semibold text-azul-marino dark:text-white text-sm mb-2">Perfil SMs/PMs</h4>
                  <ul className="space-y-1 text-xs text-foreground/70">
                    <li>• Certificaciones: CSM, PSM, SAFe, PMP®</li>
                    <li>• 3–10+ años en empresas tech</li>
                    <li>• Conocimiento técnico (arquitectura, stack, Git)</li>
                    <li>• Jira, Confluence, Azure DevOps, GitHub Projects</li>
                  </ul>
                </div>
                <div className="bg-turquesa/10 rounded-xl p-4 border border-turquesa/20">
                  <h4 className="font-semibold text-azul-marino dark:text-white text-sm mb-2">Tipos de proyectos</h4>
                  <ul className="space-y-1 text-xs text-foreground/70">
                    <li>• Productos SaaS (sprints continuos)</li>
                    <li>• MVPs en startups</li>
                    <li>• Implementación de plataformas</li>
                    <li>• Migración a cloud (AWS, Azure, GCP)</li>
                    <li>• APIs y microservicios</li>
                  </ul>
                </div>
              </div>
              <p className="text-foreground/70 text-sm mb-6">
                <strong className="text-azul-marino dark:text-white">SM/PM outsourcing:</strong> Disponibilidad
                inmediata, expertise probado, costo ~50% menor que permanente, flexibilidad (termina proyecto, termina
                contrato), sin curva de aprendizaje.
              </p>
              <Link
                href={contactUrl}
                className="inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-6 py-3 rounded-lg hover:bg-menta transition-all duration-300 shadow-glow-turquesa"
              >
                Solicita Scrum Master / PM Ágil
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedSection delay={0.1}>
              <div className="bg-white dark:bg-background rounded-2xl p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 border border-gris-arena/20 h-full flex flex-col">
                <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                  <Code className="w-7 h-7 text-turquesa" />
                </div>
                <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                  Desarrollo de software
                </h3>
                <p className="text-foreground/70 mb-4 flex-1">
                  Desarrollo a medida, aplicaciones web/móviles, plataformas SaaS, APIs, integraciones. Stack moderno:
                  React, Node.js, Python, .NET Core, React Native, Flutter. Metodología ágil con entregas iterativas.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-foreground/70">
                  {[
                    'MVP para startups (4–6 meses)',
                    'Producto SaaS completo',
                    'Apps móviles iOS/Android',
                    'Plataformas backoffice',
                    'APIs y microservicios',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/servicios/desarrollo-tecnologia/desarrollo-software`}
                  className="inline-flex items-center gap-2 text-turquesa font-semibold hover:gap-3 transition-all"
                >
                  Ver Desarrollo de Software
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-background rounded-2xl p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 border border-gris-arena/20 h-full flex flex-col">
                <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                  <Link2 className="w-7 h-7 text-turquesa" />
                </div>
                <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                  Integración de sistemas
                </h3>
                <p className="text-foreground/70 mb-4 flex-1">
                  Integración vía APIs, middleware, webhooks. Conectamos CRMs, ERPs, herramientas de marketing,
                  analytics. Automatizamos flujos entre aplicaciones.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-foreground/70">
                  {[
                    'Integración API entre plataformas',
                    'Webhooks para eventos en tiempo real',
                    'ETL para consolidación de datos',
                    'Automatización de workflows entre sistemas',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/servicios/desarrollo-tecnologia/integracion-sistemas`}
                  className="inline-flex items-center gap-2 text-turquesa font-semibold hover:gap-3 transition-all"
                >
                  Ver Integración de Sistemas
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
                Caso: Scrum Master rescata lanzamiento de SaaS con 3 meses de retraso
              </h2>
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-foreground/70 mb-2">
                    <strong className="text-azul-marino dark:text-white">Cliente:</strong> Startup SaaS (plataforma de
                    gestión de proyectos, 12 empleados, pre-Serie A).
                  </p>
                  <p className="text-foreground/70 mb-4">
                    <strong className="text-azul-marino dark:text-white">Situación:</strong> Runway de 9 meses para
                    lanzar MVP y levantar Serie A. Equipo de 5 developers sin SM: sprints caóticos, sin planning claro,
                    dailies irregulares, backlog desorganizado, sin definition of done, bloqueos sin resolución.
                    Producto 3 meses atrasado. CEO: &ldquo;developers trabajan pero no entregan.&rdquo;
                  </p>
                  <p className="text-foreground/70">
                    <strong className="text-azul-marino dark:text-white">Problema raíz:</strong> Sin SM, sin proceso
                    estructurado. PO (CEO) cambiaba prioridades mid-sprint. Developers acumulando deuda técnica.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-azul-marino dark:text-white mb-3">Solución (SM Alternative, 3 meses)</h4>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    <li><strong>Sem 1–2:</strong> Ceremonies Scrum, backlog re-organizado, DoD y AC, sprints 2 semanas.</li>
                    <li><strong>Mes 1:</strong> Estabilización, impediments (CEO mid-sprint, falta staging) resueltos.</li>
                    <li><strong>Mes 2:</strong> Velocity 40 story points/sprint, deuda técnica 20% tiempo/sprint.</li>
                    <li><strong>Mes 3:</strong> MVP feature-complete, testing, lanzamiento 50 usuarios beta, demo inversionistas.</li>
                  </ul>
                  <h4 className="font-semibold text-azul-marino dark:text-white mt-4 mb-2">Factor crítico</h4>
                  <p className="text-sm text-foreground/70">
                    SM estructuró caos en proceso ágil disciplinado. Sin SM, startup hubiera colapsado por entregar
                    tarde sin fundraising.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { v: '3X', l: 'Velocity (15 → 40 pts/sprint)' },
                  { v: '100%', l: 'Predictibilidad sprints' },
                  { v: 'MVP a tiempo', l: '1 mes antes de runway' },
                  { v: 'Serie A $2M', l: 'Levantada con MVP' },
                ].map((s, i) => (
                  <div key={i} className="bg-turquesa/10 rounded-xl p-4 border border-turquesa/20 text-center">
                    <p className="text-turquesa font-bold">{s.v}</p>
                    <p className="text-foreground/60 text-xs">{s.l}</p>
                  </div>
                ))}
              </div>
              <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                &ldquo;Scrum Master de Alternative nos salvó. Estructuró caos, equipo 3X más productivo, lanzamos MVP a
                tiempo, levantamos Serie A.&rdquo;
                <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— CEO, Startup SaaS</span>
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
                ¿Tu empresa tech necesita Scrum Master o PM?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Evaluación gratuita de 30 minutos. Analizamos tu proyecto/equipo y recomendamos perfil apropiado (SM vs
                PM, senior vs mid-level).
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  'Evaluación de necesidad (SM vs PM)',
                  'Recomendación de perfil apropiado',
                  'CVs de SMs/PMs disponibles',
                  'Modelo de trabajo y costo',
                  'Propuesta de servicios',
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
                    Solicitar Scrum Master / PM
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

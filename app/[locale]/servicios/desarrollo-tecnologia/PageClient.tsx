'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import { faqs as faqData } from '@/lib/content/faqs/servicios--desarrollo-tecnologia';
import { localizeFaqs } from '@/lib/content/faqs';
import {
  Code,
  ArrowRight,
  ChevronDown,
  Wrench,
  Plug,
  Rocket,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Building2,
  Phone,
  AlertTriangle,
  Zap,
  FileText,
  Database,
  Sparkles,
  Shield,
  Clock,
  XCircle,
  Laptop,
  Smartphone,
  Network,
  Target,
  Layers,
  Server,
  Cloud,
  GitBranch
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

export default function DesarrolloTecnologiaPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // =====================================================
  // CONTENT DATA
  // =====================================================

  const problems = [
    {
      icon: Wrench,
      title: isEs ? 'Procesos únicos que software comercial no soporta' : 'Unique processes that commercial software doesn\'t support',
      description: isEs 
        ? 'Tu operación tiene flujos específicos que ningún software estándar maneja. Adaptar tu proceso al software (vs software a tu proceso) destruye tu diferenciación.'
        : 'Your operation has specific flows that no standard software handles. Adapting your process to software (vs software to your process) destroys your differentiation.'
    },
    {
      icon: Plug,
      title: isEs ? 'Sistemas que necesitan integrarse de forma compleja' : 'Systems that need complex integration',
      description: isEs
        ? 'Tienes 5-10 sistemas que deben hablar entre sí de formas que integraciones pre-hechas no soportan. Necesitas solución custom de integración.'
        : 'You have 5-10 systems that must communicate with each other in ways that pre-made integrations don\'t support. You need custom integration solution.'
    },
    {
      icon: Rocket,
      title: isEs ? 'Innovación tecnológica como ventaja competitiva' : 'Technological innovation as competitive advantage',
      description: isEs
        ? 'Tu diferenciación está en tecnología propietaria: algoritmos, experiencia de usuario única, automatización específica. No puedes comprar esto off-the-shelf.'
        : 'Your differentiation is in proprietary technology: algorithms, unique user experience, specific automation. You can\'t buy this off-the-shelf.'
    },
    {
      icon: DollarSign,
      title: isEs ? 'Software comercial es prohibitivamente caro o inflexible' : 'Commercial software is prohibitively expensive or inflexible',
      description: isEs
        ? 'Licencias de $100K+ anuales para usar 20% de funcionalidades. O vendor no permite customizaciones críticas. Desarrollo custom es más económico y flexible.'
        : 'Licenses of $100K+ annually to use 20% of features. Or vendor doesn\'t allow critical customizations. Custom development is more economical and flexible.'
    }
  ];

  const services = [
    {
      icon: Code,
      title: isEs ? 'Desarrollo de Software' : 'Software Development',
      description: isEs
        ? 'Desarrollo de software a medida: aplicaciones de escritorio, sistemas empresariales, herramientas internas. Tecnología diseñada específicamente para tus procesos y necesidades.'
        : 'Custom software development: desktop applications, enterprise systems, internal tools. Technology designed specifically for your processes and needs.',
      forWho: isEs
        ? 'Empresas con procesos únicos, necesidad de automatización específica, sistemas legacy que necesitan reemplazo'
        : 'Companies with unique processes, need for specific automation, legacy systems that need replacement',
      result: isEs
        ? 'Software custom operando + código fuente + documentación + capacitación'
        : 'Operating custom software + source code + documentation + training',
      href: `/${locale}/servicios/desarrollo-tecnologia/desarrollo-software`,
      color: 'turquesa'
    },
    {
      icon: Smartphone,
      title: isEs ? 'Aplicaciones Web y Móviles' : 'Web and Mobile Applications',
      description: isEs
        ? 'Desarrollo de aplicaciones web responsivas y apps móviles nativas (iOS/Android). Presencia digital, portales de clientes, herramientas de campo.'
        : 'Development of responsive web applications and native mobile apps (iOS/Android). Digital presence, client portals, field tools.',
      forWho: isEs
        ? 'Empresas que necesitan presencia web moderna, apps móviles para clientes/empleados, portales de autoservicio'
        : 'Companies that need modern web presence, mobile apps for clients/employees, self-service portals',
      result: isEs
        ? 'App web/móvil publicada + backend API + panel de administración'
        : 'Published web/mobile app + backend API + admin panel',
      href: `/${locale}/servicios/desarrollo-tecnologia/aplicaciones-web-moviles`,
      color: 'menta'
    },
    {
      icon: Network,
      title: isEs ? 'Integración de Sistemas' : 'System Integration',
      description: isEs
        ? 'Integración entre sistemas empresariales existentes: APIs, middleware, sincronización de datos. Elimina islas de información y trabajo manual de copiar datos.'
        : 'Integration between existing enterprise systems: APIs, middleware, data synchronization. Eliminates information silos and manual data copying work.',
      forWho: isEs
        ? 'Empresas con múltiples sistemas desconectados, necesidad de flujos automatizados entre aplicaciones'
        : 'Companies with multiple disconnected systems, need for automated flows between applications',
      result: isEs
        ? 'Sistemas integrados + flujos automatizados + sincronización de datos en tiempo real'
        : 'Integrated systems + automated flows + real-time data synchronization',
      href: `/${locale}/servicios/desarrollo-tecnologia/integracion-sistemas`,
      color: 'violeta'
    },
    {
      icon: Target,
      title: isEs ? 'Consultoría Tecnológica' : 'Technology Consulting',
      description: isEs
        ? 'Asesoría estratégica en decisiones tecnológicas: arquitectura de soluciones, selección de tecnologías, evaluación de vendors, roadmap tecnológico.'
        : 'Strategic advisory on technology decisions: solution architecture, technology selection, vendor evaluation, technology roadmap.',
      forWho: isEs
        ? 'Empresas evaluando inversiones tecnológicas mayores, necesidad de arquitectura robusta, decisiones build vs buy'
        : 'Companies evaluating major technology investments, need for robust architecture, build vs buy decisions',
      result: isEs
        ? 'Arquitectura de solución diseñada + recomendaciones tecnológicas + roadmap de implementación'
        : 'Designed solution architecture + technology recommendations + implementation roadmap',
      href: `/${locale}/servicios/desarrollo-tecnologia/consultoria-tecnologica`,
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '100%', label: isEs ? 'Adaptado a tus procesos específicos' : 'Adapted to your specific processes', icon: Code },
    { value: 'Propiedad', label: isEs ? 'Código fuente y solución son tuyos' : 'Source code and solution are yours', icon: Shield },
    { value: 'Integración', label: isEs ? 'Con tus sistemas existentes' : 'With your existing systems', icon: Plug },
    { value: 'Escalable', label: isEs ? 'Crece con tu negocio' : 'Grows with your business', icon: TrendingUp },
    { value: 'Soporte', label: isEs ? 'Mantenimiento y evolución continua' : 'Continuous maintenance and evolution', icon: Clock },
    { value: 'ROI', label: isEs ? 'Típicamente positivo en 12-24 meses' : 'Typically positive in 12-24 months', icon: Target }
  ];

  const techStack = {
    backend: [
      { name: '.NET Core / C#', icon: Code },
      { name: 'Node.js / Express', icon: Code },
      { name: 'Python / Django', icon: Code },
      { name: 'Java / Spring Boot', icon: Code },
      { name: 'PHP / Laravel', icon: Code }
    ],
    frontend: [
      { name: 'React / Next.js', icon: Code },
      { name: 'Angular', icon: Code },
      { name: 'Vue.js', icon: Code },
      { name: 'HTML5 / CSS3 / JavaScript', icon: Code }
    ],
    mobile: [
      { name: 'React Native (iOS + Android)', icon: Smartphone },
      { name: 'Flutter', icon: Smartphone },
      { name: 'Swift (iOS nativo)', icon: Smartphone },
      { name: 'Kotlin (Android nativo)', icon: Smartphone }
    ],
    databases: [
      { name: 'SQL Server', icon: Database },
      { name: 'PostgreSQL', icon: Database },
      { name: 'MySQL', icon: Database },
      { name: 'MongoDB', icon: Database },
      { name: 'Firebase', icon: Database }
    ],
    cloud: [
      { name: 'Microsoft Azure', icon: Cloud },
      { name: 'AWS (Amazon Web Services)', icon: Cloud },
      { name: 'Google Cloud Platform', icon: Cloud },
      { name: 'Docker / Kubernetes', icon: Server },
      { name: 'CI/CD (Azure DevOps, GitHub Actions)', icon: GitBranch }
    ],
    integrations: [
      { name: 'REST APIs', icon: Network },
      { name: 'GraphQL', icon: Network },
      { name: 'Webhooks', icon: Network },
      { name: 'SOAP / XML', icon: Network },
      { name: 'Message Queues (RabbitMQ)', icon: Network }
    ]
  };

  const faqs = localizeFaqs(faqData, isEs ? 'es' : 'en');

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Desarrollo & Tecnología' : 'Development & Technology', href: null }
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
        currentService="desarrollo-tecnologia"
      />

      {/* =====================================================
          HERO SECTION
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        {/* Background Elements - Subtle */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[8%] w-32 h-32 bg-turquesa/10 rounded-2xl rotate-12"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[5%] w-24 h-24 bg-menta/10 rounded-2xl -rotate-6"
          />
        </div>

        <div className="container-custom relative z-10 pt-8 pb-16 lg:pb-20">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center gap-2 text-sm">
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
                  <Code className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Desarrollo & Tecnología' : 'Development & Technology'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Servicios Tecnológicos' : 'Technology Services'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs ? 'Soluciones tecnológicas a medida para tu negocio' : 'Custom technology solutions for your business'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Desarrollo de software custom, aplicaciones web y móviles, integración de sistemas, consultoría tecnológica. Tecnología diseñada para resolver problemas específicos de tu negocio, no soluciones genéricas que no encajan.'
                  : 'Custom software development, web and mobile applications, system integration, technology consulting. Technology designed to solve specific problems of your business, not generic solutions that don\'t fit.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Desarrolla tu Solución' : 'Develop Your Solution'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/casos-exito`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Ver proyectos tecnológicos' : 'View technology projects'}
                </Link>
              </div>

              {/* Stats - Inline Compact */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '40+', label: isEs ? 'proyectos de desarrollo completados' : 'development projects completed' },
                  { value: 'Stack', label: isEs ? 'tecnológico moderno' : 'modern technology stack' },
                  { icon: true, label: isEs ? 'Enfoque en resultados de negocio' : 'Focus on business results' }
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

            {/* Right Visual - Tech Stack */}
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
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-turquesa" />
                    <div className="w-3 h-3 rounded-full bg-menta" />
                    <div className="w-3 h-3 rounded-full bg-violeta" />
                    <span className="ml-auto text-white/40 text-sm">
                      {isEs ? 'Stack Tecnológico' : 'Technology Stack'}
                    </span>
                  </div>

                  {/* Tech Icons Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { icon: Code, label: 'Backend', color: 'turquesa' },
                      { icon: Code, label: 'Frontend', color: 'menta' },
                      { icon: Smartphone, label: 'Mobile', color: 'violeta' },
                      { icon: Database, label: 'Database', color: 'turquesa' },
                      { icon: Cloud, label: 'Cloud', color: 'menta' },
                      { icon: Network, label: 'APIs', color: 'violeta' }
                    ].map((tech, idx) => {
                      const colors = colorClasses[tech.color as keyof typeof colorClasses];
                      return (
                        <motion.div
                          key={idx}
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                          className={`${colors.bg} rounded-xl p-4 text-center`}
                        >
                          <tech.icon className={`w-6 h-6 ${colors.text} mx-auto mb-2`} />
                          <span className="text-white/70 text-xs">{tech.label}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-turquesa rounded-2xl p-4 shadow-xl"
                >
                  <Code className="w-8 h-8 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EL PROBLEMA SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs 
                ? '¿Por qué desarrollo custom vs software comercial?'
                : 'Why custom development vs commercial software?'}
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto mb-8">
              {isEs 
                ? 'Software comercial (off-the-shelf) funciona para necesidades estándar: contabilidad, nómina, CRM básico. Pero cuando tu operación tiene particularidades únicas, procesos específicos de tu industria, o ventaja competitiva basada en tecnología, software genérico no es suficiente. Necesitas desarrollo a medida.'
                : 'Commercial software (off-the-shelf) works for standard needs: accounting, payroll, basic CRM. But when your operation has unique particularities, industry-specific processes, or technology-based competitive advantage, generic software isn\'t enough. You need custom development.'}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-6 mb-8">
            {problems.map((problem, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-background p-8 rounded-2xl shadow-brand 
                             hover:shadow-brand-lg transition-all duration-300 border border-gris-arena/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-turquesa/20 rounded-xl 
                                    flex items-center justify-center">
                      <problem.icon className="w-7 h-7 text-turquesa" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-2">
                        {problem.title}
                      </h3>
                      <p className="text-foreground/70 leading-relaxed">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection className="text-center">
            <p className="text-lg text-turquesa font-semibold">
              {isEs 
                ? 'Alternative desarrolla tecnología que resuelve TU problema específico.'
                : 'Alternative develops technology that solves YOUR specific problem.'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          4 SERVICIOS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Servicios' : 'Services'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '4 servicios de desarrollo y tecnología' : '4 development and technology services'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => {
              const colors = colorClasses[service.color as keyof typeof colorClasses];

              return (
                <StaggerItem key={idx}>
                  <Link href={service.href}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className={`group bg-blanco-hueso dark:bg-card p-8 rounded-2xl 
                                  shadow-brand hover:shadow-brand-lg transition-all duration-300
                                  border ${colors.border} h-full`}
                    >
                      <div className={`w-16 h-16 ${colors.bg} rounded-2xl 
                                      flex items-center justify-center mb-6
                                      group-hover:scale-110 transition-transform`}>
                        <service.icon className={`w-8 h-8 ${colors.text}`} />
                      </div>

                      <h3 className="text-2xl font-semibold text-azul-marino dark:text-white mb-3 
                                     group-hover:text-turquesa transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-foreground/70 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-2">
                          <span className={`${colors.badge} font-medium text-sm px-2 py-1 rounded`}>
                            {isEs ? 'Para quién:' : 'For whom:'}
                          </span>
                          <span className="text-foreground/60 text-sm flex-1">{service.forWho}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className={`${colors.badge} font-medium text-sm px-2 py-1 rounded`}>
                            {isEs ? 'Resultado típico:' : 'Typical result:'}
                          </span>
                          <span className="text-foreground/60 text-sm flex-1">{service.result}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-turquesa font-medium group-hover:gap-3 transition-all">
                        <span>{isEs ? 'Conoce más' : 'Learn more'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </motion.div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          BENEFICIOS MEDIBLES SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-azul-marino">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              {isEs ? 'Beneficios medibles' : 'Measurable benefits'}
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
                  <p className="text-white/70">{benefit.label}</p>
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
              {/* Decorative Element */}
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
                      {isEs ? 'Desarrollamos sistema que automatiza 80% de procesos de distribuidora' : 'We develop system that automates 80% of distributor processes'}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Left - Description */}
                  <div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Cliente' : 'Client'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Distribuidora de productos farmacéuticos (180 empleados, 3,000 clientes, 15,000 SKUs)'
                          : 'Pharmaceutical products distributor (180 employees, 3,000 clients, 15,000 SKUs)'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Situación' : 'Situation'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Operación 95% manual: pedidos por teléfono/WhatsApp transcritos a Excel, inventario actualizado manualmente, facturación en sistema antiguo sin integración, picking en papel, despacho sin tracking. Crecimiento acelerado haciendo proceso insostenible. Evaluaron SAP Business One ($200K+ implementación) pero muy costoso y genérico.'
                          : '95% manual operation: orders by phone/WhatsApp transcribed to Excel, inventory manually updated, billing in old system without integration, picking on paper, dispatch without tracking. Accelerated growth making process unsustainable. They evaluated SAP Business One ($200K+ implementation) but too expensive and generic.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-foreground/70 mb-3">
                        {isEs 
                          ? 'Sistema custom desarrollado en 6 meses ($85K vs $200K+ SAP):'
                          : 'Custom system developed in 6 months ($85K vs $200K+ SAP):'}
                      </p>
                      <ul className="space-y-2 text-foreground/70 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Portal B2B de Pedidos (Web) - Clientes hacen pedidos online 24/7, catálogo con disponibilidad en tiempo real, pricing personalizado' : 'B2B Order Portal (Web) - Clients make orders online 24/7, catalog with real-time availability, personalized pricing'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Sistema de Gestión de Inventario - Control por lote y vencimiento, alertas automáticas, trazabilidad completa' : 'Inventory Management System - Lot and expiration control, automatic alerts, complete traceability'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Módulo de Facturación Integrado - Genera facturas automáticamente, integración con QuickBooks, facturación electrónica SRI' : 'Integrated Billing Module - Automatically generates invoices, QuickBooks integration, SRI electronic billing'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'App Móvil para Picking y Despacho - Picking guiado, escaneo de códigos, tracking de entregas' : 'Mobile App for Picking and Dispatch - Guided picking, barcode scanning, delivery tracking'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Dashboard Gerencial (BI integrado) - Ventas en tiempo real, inventario y rotación, márgenes por producto' : 'Management Dashboard (integrated BI) - Real-time sales, inventory and rotation, margins by product'}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Stack Tecnológico' : 'Technology Stack'}
                      </h4>
                      <p className="text-foreground/70 text-sm">
                        {isEs 
                          ? 'Backend: .NET Core + SQL Server | Frontend Web: React | App Móvil: React Native (iOS + Android) | Hosting: Azure Cloud'
                          : 'Backend: .NET Core + SQL Server | Web Frontend: React | Mobile App: React Native (iOS + Android) | Hosting: Azure Cloud'}
                      </p>
                    </div>
                  </div>

                  {/* Right - Stats */}
                  <div>
                    <h4 className="font-semibold text-azul-marino dark:text-white mb-4">
                      {isEs ? 'Resultados (12 meses post-implementación)' : 'Results (12 months post-implementation)'}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { value: '70%', label: isEs ? 'Pedidos online' : 'Online orders', sub: isEs ? '0% → 70%' : '0% → 70%' },
                        { value: '3 min', label: isEs ? 'Tiempo procesamiento' : 'Processing time', sub: isEs ? '25 min → 3 min' : '25 min → 3 min' },
                        { value: '0.5%', label: isEs ? 'Errores picking' : 'Picking errors', sub: isEs ? '8% → 0.5%' : '8% → 0.5%' },
                        { value: '100%', label: isEs ? 'Visibilidad inventario' : 'Inventory visibility', sub: isEs ? 'Tiempo real' : 'Real time' },
                        { value: 'Automática', label: isEs ? 'Facturación' : 'Billing', sub: isEs ? '2 horas/día → automática' : '2 hours/day → automatic' },
                        { value: '+60%', label: isEs ? 'Capacidad operativa' : 'Operational capacity', sub: isEs ? 'Sin contratar' : 'Without hiring' },
                        { value: '180%', label: isEs ? 'ROI' : 'ROI', sub: isEs ? 'Primer año' : 'First year' },
                        { value: '$115K', label: isEs ? 'Ahorro vs SAP' : 'Savings vs SAP', sub: isEs ? 'En implementación' : 'In implementation' }
                      ].map((stat, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          className="bg-white dark:bg-background p-4 rounded-2xl shadow-brand text-center"
                        >
                          <div className="text-2xl lg:text-3xl font-bold text-turquesa mb-1">
                            {stat.value}
                          </div>
                          <div className="text-xs font-medium text-azul-marino dark:text-white">
                            {stat.label}
                          </div>
                          <div className="text-xs text-foreground/50">{stat.sub}</div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-turquesa/10 p-4 rounded-xl border border-turquesa/20 mb-6">
                      <p className="text-sm text-foreground/70">
                        <strong className="text-azul-marino dark:text-white">{isEs ? 'Propiedad:' : 'Ownership:'}</strong>{' '}
                        {isEs 
                          ? 'Cliente es dueño del código fuente. Alternative provee soporte/mantenimiento pero sistema es propiedad del cliente.'
                          : 'Client owns the source code. Alternative provides support/maintenance but system is client property.'}
                      </p>
                    </div>
                  </div>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                  {isEs 
                    ? '"Sistema custom nos costó 40% de SAP y hace exactamente lo que necesitamos. Automatizamos 80% de operación. Capacidad operativa 60% mayor sin contratar."'
                    : '"Custom system cost us 40% of SAP and does exactly what we need. We automated 80% of operation. 60% greater operational capacity without hiring."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— {isEs ? 'Gerente General' : 'General Manager'}</span>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* =====================================================
          STACK TECNOLÓGICO SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Tecnologías con las que trabajamos' : 'Technologies we work with'}
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              {isEs 
                ? 'Seleccionamos stack apropiado según: requisitos del proyecto, escalabilidad necesaria, presupuesto, capacidades internas del cliente.'
                : 'We select appropriate stack according to: project requirements, necessary scalability, budget, client internal capabilities.'}
            </p>
          </AnimatedSection>

          <StaggerContainer className="space-y-8">
            {Object.entries(techStack).map(([category, items], catIdx) => (
              <StaggerItem key={catIdx}>
                <div className="bg-white dark:bg-background rounded-2xl p-6 shadow-brand">
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-4 capitalize">
                    {isEs 
                      ? category === 'backend' ? 'Backend' :
                        category === 'frontend' ? 'Frontend' :
                        category === 'mobile' ? 'Móvil' :
                        category === 'databases' ? 'Bases de Datos' :
                        category === 'cloud' ? 'Cloud & DevOps' :
                        'Integraciones'
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-blanco-hueso/50 dark:bg-card rounded-lg">
                        <item.icon className="w-5 h-5 text-turquesa flex-shrink-0" />
                        <span className="text-foreground/70 text-sm">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-turquesa/10 rounded-full blur-2xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs ? '¿Tu negocio necesita solución tecnológica a medida?' : 'Does your business need a custom technology solution?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Discovery session gratuita de 30 minutos. Entendemos tu necesidad, evaluamos factibilidad y desarrollamos propuesta preliminar.'
                  : 'Free 30-minute discovery session. We understand your need, evaluate feasibility and develop preliminary proposal.'}
              </p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Entendimiento de problema de negocio' : 'Understanding of business problem',
                  isEs ? 'Evaluación de requisitos funcionales' : 'Evaluation of functional requirements',
                  isEs ? 'Estimación preliminar de alcance' : 'Preliminary scope estimation',
                  isEs ? 'Recomendación de tecnologías' : 'Technology recommendation',
                  isEs ? 'Propuesta de proyecto (costo, tiempo, fases)' : 'Project proposal (cost, time, phases)'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/${locale}/contacto`}
                    className="inline-flex items-center gap-3 bg-turquesa text-azul-marino 
                               font-semibold px-8 py-4 rounded-lg hover:bg-menta 
                               transition-all duration-300 shadow-lg group"
                  >
                    {isEs ? 'Solicitar Discovery Session' : 'Request Discovery Session'}
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

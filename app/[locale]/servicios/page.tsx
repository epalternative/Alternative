'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Award, 
  FolderKanban, 
  Cpu, 
  Target, 
  Code, 
  ArrowRight,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  Zap
} from 'lucide-react';

// Animation components
const AnimatedSection = ({ children, className = '', delay = 0 }: { 
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

const services = [
  { 
    icon: Settings, 
    title: 'Optimización de Procesos', 
    titleEn: 'Process Optimization', 
    href: '/servicios/optimizacion-procesos',
    description: 'BPM, Lean Six Sigma y automatización para reducir costos 25-40%',
    descriptionEn: 'BPM, Lean Six Sigma and automation to reduce costs 25-40%',
    color: 'turquesa',
    stat: '35%',
    statLabel: 'reducción promedio',
    statLabelEn: 'average reduction'
  },
  { 
    icon: Award, 
    title: 'Sistemas de Calidad', 
    titleEn: 'Quality Systems', 
    href: '/servicios/sistemas-calidad',
    description: 'ISO 9001, auditorías y mejora continua para sectores regulados',
    descriptionEn: 'ISO 9001, audits and continuous improvement for regulated sectors',
    color: 'menta',
    stat: '100%',
    statLabel: 'cumplimiento',
    statLabelEn: 'compliance'
  },
  { 
    icon: FolderKanban, 
    title: 'Gestión de Proyectos', 
    titleEn: 'Project Management', 
    href: '/servicios/gestion-proyectos',
    description: 'PMP®, metodologías ágiles y PMO para proyectos exitosos',
    descriptionEn: 'PMP®, agile methodologies and PMO for successful projects',
    color: 'violeta',
    stat: '85%',
    statLabel: 'a tiempo',
    statLabelEn: 'on time'
  },
  { 
    icon: Cpu, 
    title: 'Transformación Digital', 
    titleEn: 'Digital Transformation', 
    href: '/servicios/transformacion-digital',
    description: 'Roadmaps digitales, automatización inteligente y adopción tecnológica',
    descriptionEn: 'Digital roadmaps, intelligent automation and technology adoption',
    color: 'turquesa',
    stat: '3x',
    statLabel: 'ROI promedio',
    statLabelEn: 'average ROI'
  },
  { 
    icon: Target, 
    title: 'Consultoría Estratégica', 
    titleEn: 'Strategic Consulting', 
    href: '/servicios/consultoria-estrategica',
    description: 'Diagnóstico organizacional, estudios de viabilidad y roadmaps',
    descriptionEn: 'Organizational diagnosis, feasibility studies and roadmaps',
    color: 'menta',
    stat: '50+',
    statLabel: 'diagnósticos',
    statLabelEn: 'diagnostics'
  },
  { 
    icon: Code, 
    title: 'Desarrollo & Tecnología', 
    titleEn: 'Development & Technology', 
    href: '/servicios/desarrollo-tecnologia',
    description: 'Software a medida, portales corporativos e integraciones API',
    descriptionEn: 'Custom software, corporate portals and API integrations',
    color: 'violeta',
    stat: '24/7',
    statLabel: 'soporte',
    statLabelEn: 'support'
  },
];

const colorClasses = {
  turquesa: {
    bg: 'bg-turquesa/10',
    bgHover: 'group-hover:bg-turquesa/20',
    text: 'text-turquesa',
    border: 'border-turquesa/20',
    glow: 'shadow-turquesa/20',
    gradient: 'from-turquesa to-menta'
  },
  menta: {
    bg: 'bg-menta/10',
    bgHover: 'group-hover:bg-menta/20',
    text: 'text-menta',
    border: 'border-menta/20',
    glow: 'shadow-menta/20',
    gradient: 'from-menta to-turquesa'
  },
  violeta: {
    bg: 'bg-violeta/10',
    bgHover: 'group-hover:bg-violeta/20',
    text: 'text-violeta',
    border: 'border-violeta/20',
    glow: 'shadow-violeta/20',
    gradient: 'from-violeta to-lavanda'
  }
};

export default function ServiciosPage() {
  const locale = useLocale();
  const isEs = locale === 'es';

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: null }
  ];

  return (
    <>
      {/* =====================================================
          HERO SECTION
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] right-[5%] w-64 h-64 bg-turquesa/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] left-[10%] w-48 h-48 bg-violeta/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[40%] left-[50%] w-32 h-32 bg-menta/5 rounded-full blur-2xl"
          />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(108,196,212,0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(108,196,212,0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="container-custom relative z-10 pt-8 pb-20 lg:pb-28">
          {/* Breadcrumb */}
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

          {/* Hero Content */}
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-14 h-14 bg-turquesa/20 rounded-2xl flex items-center justify-center
                              border border-turquesa/30">
                <Sparkles className="w-7 h-7 text-turquesa" />
              </div>
              <div>
                <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                  {isEs ? 'Consultoría Empresarial' : 'Business Consulting'}
                </span>
                <p className="text-white/60 text-sm">
                  {isEs ? 'Soluciones integrales' : 'Comprehensive solutions'}
                </p>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl text-white font-semibold leading-tight mb-6"
            >
              {isEs ? 'Nuestros ' : 'Our '}
              <span className="relative inline-block">
                <span className="text-turquesa">{isEs ? 'Servicios' : 'Services'}</span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute bottom-1 left-0 right-0 h-2 bg-turquesa/20 -z-10 origin-left"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/80 mb-10 max-w-2xl leading-relaxed"
            >
              {isEs 
                ? '6 áreas de especialización para transformar tu operación. Desde el diagnóstico estratégico hasta la implementación completa, con resultados medibles.'
                : '6 areas of expertise to transform your operation. From strategic diagnosis to complete implementation, with measurable results.'}
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-8 pt-8 border-t border-white/10"
            >
              {[
                { icon: TrendingUp, value: '35%', label: isEs ? 'Reducción de costos' : 'Cost reduction' },
                { icon: Clock, value: '90', label: isEs ? 'Días promedio' : 'Days average' },
                { icon: Users, value: '50+', label: isEs ? 'Proyectos exitosos' : 'Successful projects' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-turquesa/10 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-turquesa" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-turquesa/60" />
        </motion.div>
      </section>

      {/* =====================================================
          SERVICES GRID
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-background relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-turquesa/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violeta/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              {isEs ? '6 Áreas de Especialización' : '6 Areas of Expertise'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Elige el servicio que ' : 'Choose the service that '}
              <span className="text-turquesa">{isEs ? 'necesitas' : 'you need'}</span>
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              {isEs 
                ? 'Cada área está diseñada para resolver desafíos específicos. Haz clic en cualquier servicio para conocer más.'
                : 'Each area is designed to solve specific challenges. Click on any service to learn more.'}
            </p>
          </AnimatedSection>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon;
              const colors = colorClasses[service.color as keyof typeof colorClasses];
              
              return (
                <motion.div
                  key={service.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/${locale}${service.href}`}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative bg-white dark:bg-card p-8 rounded-2xl 
                                  shadow-brand hover:shadow-xl transition-all duration-300
                                  border border-transparent hover:${colors.border}
                                  overflow-hidden h-full`}
                    >
                      {/* Decorative corner element */}
                      <div className={`absolute -top-6 -right-6 w-24 h-24 ${colors.bg} 
                                      rounded-2xl rotate-12 opacity-50
                                      group-hover:rotate-45 group-hover:scale-150 
                                      transition-all duration-500`} />
                      
                      {/* Gradient line at top */}
                      <div className={`absolute top-0 left-0 right-0 h-1 
                                      bg-gradient-to-r ${colors.gradient} 
                                      opacity-0 group-hover:opacity-100 transition-opacity`} />

                      <div className="relative z-10">
                        {/* Icon with stat */}
                        <div className="flex items-start justify-between mb-6">
                          <motion.div 
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                            className={`w-16 h-16 ${colors.bg} ${colors.bgHover} 
                                        rounded-2xl flex items-center justify-center
                                        transition-colors duration-300`}
                          >
                            <Icon className={`w-8 h-8 ${colors.text}`} />
                          </motion.div>
                          
                          {/* Stat Badge */}
                          <div className={`px-3 py-1.5 ${colors.bg} rounded-full`}>
                            <span className={`text-lg font-bold ${colors.text}`}>
                              {service.stat}
                            </span>
                            <span className="text-xs text-foreground/60 ml-1">
                              {isEs ? service.statLabel : service.statLabelEn}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className={`text-xl font-semibold text-azul-marino dark:text-white mb-3
                                       group-hover:${colors.text} transition-colors`}>
                          {isEs ? service.title : service.titleEn}
                        </h3>

                        {/* Description */}
                        <p className="text-foreground/60 text-sm mb-6 leading-relaxed">
                          {isEs ? service.description : service.descriptionEn}
                        </p>

                        {/* CTA */}
                        <div className={`flex items-center gap-2 ${colors.text} font-medium text-sm`}>
                          <span>{isEs ? 'Explorar servicio' : 'Explore service'}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-violeta relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] right-[10%] w-40 h-40 border border-white/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[20%] left-[15%] w-32 h-32 border border-lavanda/20 rounded-full"
          />
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-lavanda/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-turquesa/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                viewport={{ once: true }}
                className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8
                           border border-white/30"
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-6">
                {isEs ? '¿No sabes por dónde empezar?' : "Don't know where to start?"}
              </h2>

              <p className="text-xl text-white/80 mb-10 leading-relaxed">
                {isEs 
                  ? 'Agenda un diagnóstico gratuito de 15 minutos. Identificamos tus oportunidades de mejora y te recomendamos el servicio adecuado.'
                  : 'Schedule a free 15-minute diagnosis. We identify your improvement opportunities and recommend the right service.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/${locale}/contacto`}
                    className="inline-flex items-center gap-3 bg-white text-violeta 
                               font-semibold px-8 py-4 rounded-xl hover:bg-menta hover:text-azul-marino
                               transition-all duration-300 shadow-lg shadow-black/20 group"
                  >
                    {isEs ? 'Solicitar Diagnóstico Gratuito' : 'Request Free Diagnosis'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-white/20"
              >
                {[
                  { icon: Clock, label: isEs ? '15 min de tu tiempo' : '15 min of your time' },
                  { icon: CheckCircle2, label: isEs ? 'Sin compromiso' : 'No commitment' },
                  { icon: TrendingUp, label: isEs ? 'Recomendaciones accionables' : 'Actionable recommendations' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-white/80">
                    <item.icon className="w-4 h-4 text-menta" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

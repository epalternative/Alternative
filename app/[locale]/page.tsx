'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
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
  Zap,
  Star,
  GraduationCap,
  BarChart3,
  BadgeCheck,
  Handshake,
  Rocket,
  Users,
  Factory,
  Laptop,
  Building2,
  Shield
} from 'lucide-react';

// =====================================================
// ANIMATION COMPONENTS
// =====================================================

// Animated section wrapper with scroll reveal
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
const StaggerContainer = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string 
}) => {
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

const StaggerItem = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string 
}) => (
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

// Floating element animation
const FloatingElement = ({ 
  children, 
  className = '',
  duration = 4,
  delay = 0,
  y = 15
}: { 
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  y?: number;
}) => (
  <motion.div
    animate={{ 
      y: [0, -y, 0]
    }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function Home() {
  const locale = useLocale();
  const tHero = useTranslations('hero');
  const tAbout = useTranslations('about');
  const tServices = useTranslations('services');
  const tWhyUs = useTranslations('whyUs');
  const tCases = useTranslations('cases');
  const tTestimonials = useTranslations('testimonials');
  const tCta = useTranslations('cta');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    industria: '',
    desafio: '',
  });

  // Parallax scroll for hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // =====================================================
  // DATA
  // =====================================================

  const services = [
    {
      icon: Settings,
      title: tServices('items.processOptimization.title'),
      description: tServices('items.processOptimization.description'),
      iconBg: 'bg-turquesa/20',
      iconColor: 'text-turquesa',
      decorBg: 'bg-turquesa/10',
      href: `/${locale}/servicios/optimizacion-procesos`
    },
    {
      icon: Cpu,
      title: tServices('items.digitalTransformation.title'),
      description: tServices('items.digitalTransformation.description'),
      iconBg: 'bg-menta/20',
      iconColor: 'text-menta',
      decorBg: 'bg-menta/10',
      href: `/${locale}/servicios/transformacion-digital`
    },
    {
      icon: FolderKanban,
      title: tServices('items.projectManagement.title'),
      description: tServices('items.projectManagement.description'),
      iconBg: 'bg-violeta/20',
      iconColor: 'text-violeta',
      decorBg: 'bg-violeta/10',
      href: `/${locale}/servicios/gestion-proyectos`
    },
    {
      icon: Target,
      title: tServices('items.qualitySystems.title'),
      description: tServices('items.qualitySystems.description'),
      iconBg: 'bg-turquesa/20',
      iconColor: 'text-turquesa',
      decorBg: 'bg-turquesa/10',
      href: `/${locale}/servicios/sistemas-calidad`
    },
    {
      icon: Code,
      title: tServices('items.technologyDevelopment.title'),
      description: tServices('items.technologyDevelopment.description'),
      iconBg: 'bg-menta/20',
      iconColor: 'text-menta',
      decorBg: 'bg-menta/10',
      href: `/${locale}/servicios/desarrollo-tecnologia`
    },
    {
      icon: Award,
      title: tServices('items.strategicConsulting.title'),
      description: tServices('items.strategicConsulting.description'),
      iconBg: 'bg-violeta/20',
      iconColor: 'text-violeta',
      decorBg: 'bg-violeta/10',
      href: `/${locale}/servicios/consultoria-estrategica`
    }
  ];


  const values = [
    { 
      icon: Handshake, 
      title: tAbout('values.commitment.title'), 
      desc: tAbout('values.commitment.description') 
    },
    { 
      icon: Zap, 
      title: tAbout('values.innovation.title'), 
      desc: tAbout('values.innovation.description') 
    },
    { 
      icon: BadgeCheck, 
      title: tAbout('values.trust.title'), 
      desc: tAbout('values.trust.description') 
    }
  ];

  const testimonials = [
    {
      quote: tTestimonials('items.item1.quote'),
      author: 'Juan Carlos Méndez',
      role: tTestimonials('items.item1.role'),
      badge: tTestimonials('items.item1.badge'),
      initials: 'JC'
    },
    {
      quote: tTestimonials('items.item2.quote'),
      author: 'María Fernández',
      role: tTestimonials('items.item2.role'),
      badge: tTestimonials('items.item2.badge'),
      initials: 'MF'
    },
    {
      quote: tTestimonials('items.item3.quote'),
      author: 'Roberto Castillo',
      role: tTestimonials('items.item3.role'),
      badge: tTestimonials('items.item3.badge'),
      initials: 'RC'
    },
    {
      quote: tTestimonials('items.item4.quote'),
      author: 'Laura Gómez',
      role: tTestimonials('items.item4.role'),
      badge: tTestimonials('items.item4.badge'),
      initials: 'LG'
    },
    {
      quote: tTestimonials('items.item5.quote'),
      author: 'Carlos Ramírez',
      role: tTestimonials('items.item5.role'),
      badge: tTestimonials('items.item5.badge'),
      initials: 'CR'
    }
  ];


  return (
    <>
      {/* =====================================================
          HERO SECTION - Primera Impresión Impactante
          ===================================================== */}
      <section 
        ref={heroRef}
        className="relative min-h-screen bg-azul-marino flex items-center overflow-hidden"
      >
        {/* Background Elements - Floating Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large shape - top right */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [12, 20, 12]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[10%] w-40 h-40 
                       bg-turquesa/10 rounded-2xl rotate-12 blur-sm"
          />
          
          {/* Medium shape - left center */}
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              x: [0, 10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[45%] left-[8%] w-32 h-32 
                       bg-menta/10 rounded-2xl -rotate-6"
          />
          
          {/* Small shape - bottom right */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [45, 55, 45]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[30%] right-[25%] w-24 h-24 
                       bg-violeta/10 rounded-2xl rotate-45"
          />

          {/* Gradient orb */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-turquesa/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-menta/10 rounded-full blur-3xl" />
        </div>
        
        {/* Floating dots */}
        <div className="absolute top-32 left-[10%] w-2 h-2 bg-turquesa rounded-full animate-pulse" />
        <motion.div 
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute top-[60%] left-[5%] w-3 h-3 bg-menta/60 rounded-full" 
        />
        <motion.div 
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className="absolute top-[40%] right-[8%] w-2 h-2 bg-turquesa/80 rounded-full" 
        />

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="container-custom relative z-10 pt-32 pb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
              <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badge */}
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-turquesa/20 
                           text-turquesa rounded-full text-sm font-medium mb-6
                           border border-turquesa/30 backdrop-blur-sm"
              >
                <Star className="w-4 h-4" />
                ✨ {tHero('badge')}
              </motion.span>
              
              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
                             text-white font-semibold leading-tight mb-6">
                <span className="block">{tHero('title')}</span>
                <span className="relative inline-block">
                  <span className="relative z-10 text-turquesa">
                    {tHero('titleHighlight')}
                  </span>
                  {/* Decorative underline */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute bottom-2 left-0 right-0 h-3 
                               bg-turquesa/20 -z-0 origin-left"
                  />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
                {tHero('description')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
              <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                <Link 
                    href={`/${locale}/contacto`}
                    className="inline-flex items-center gap-3 bg-turquesa text-azul-marino 
                               font-semibold px-8 py-4 rounded-lg hover:bg-menta 
                               transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                  >
                    {tHero('cta.primary')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                <Link 
                    href="#services"
                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm 
                               text-white font-medium px-8 py-4 rounded-lg 
                               hover:bg-white/20 transition-all duration-300
                               border border-white/20"
                  >
                    {tHero('cta.secondary')}
                </Link>
              </motion.div>
            </div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap gap-8 pt-8 border-t border-white/10"
              >
                {[
                  { number: 500, suffix: '+', label: 'Proyectos Completados' },
                  { number: 98, suffix: '%', label: 'Satisfacción del Cliente' },
                  { number: 15, suffix: '+', label: 'Años de Experiencia' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold text-turquesa mb-1">
                      <Counter end={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-white/60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Right Column - Visual */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main floating card */}
                <FloatingElement duration={6} y={20}>
                  <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl 
                                  p-8 border border-white/10 shadow-2xl">
                    {/* Window dots */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-3 h-3 rounded-full bg-turquesa" />
                      <div className="w-3 h-3 rounded-full bg-menta" />
                      <div className="w-3 h-3 rounded-full bg-violeta" />
                </div>
                
                    {/* Progress bars */}
                    {[80, 95, 70, 60].map((width, i) => (
                <motion.div 
                        key={i}
                        initial={{ width: 0 }}
                        animate={{ width: `${width}%` }}
                        transition={{ delay: 1 + i * 0.2, duration: 0.8 }}
                        className="h-4 bg-turquesa/20 rounded-full overflow-hidden mb-3"
                      >
                        <div className="h-full bg-turquesa rounded-full" />
                </motion.div>
                    ))}
                  </div>
                </FloatingElement>
                
                {/* Mini floating cards */}
                <FloatingElement 
                  duration={4} 
                  y={10} 
                  className="absolute -top-8 -right-8"
                >
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 
                                  border border-white/10 shadow-lg">
                    <div className="w-12 h-12 bg-turquesa/20 rounded-xl 
                                    flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-turquesa" />
                    </div>
                    </div>
                </FloatingElement>
                
                <FloatingElement 
                  duration={5} 
                  y={12} 
                  delay={0.5}
                  className="absolute -bottom-4 -left-8"
                >
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 
                                  border border-white/10 shadow-lg">
                    <div className="w-12 h-12 bg-violeta/20 rounded-xl 
                                    flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-violeta" />
                    </div>
                  </div>
                </FloatingElement>
              </div>
              
              {/* Certification Badges - Vertical stack with fade in/out */}
              <div className="mt-8 flex flex-col gap-3 items-end">
                {[
                  { icon: CheckCircle2, label: 'Equipo PMP® Certified' },
                  { icon: Shield, label: 'ISO 9001 Lead Auditors' },
                  { icon: Award, label: 'Lean Six Sigma Certified' }
                ].map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: [0, 1, 1, 0],
                      x: [20, 0, 0, -20]
                    }}
                    transition={{ 
                      delay: i * 3,
                      duration: 9,
                      times: [0, 0.1, 0.9, 1],
                      repeat: Infinity,
                      repeatDelay: 0
                    }}
                    className="flex items-center gap-2 px-4 py-2 
                               bg-white/10 backdrop-blur-sm rounded-full
                               border border-white/20 text-white/90 text-sm"
                  >
                    <cert.icon className="w-4 h-4 text-turquesa" />
                    <span>{cert.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full 
                          flex justify-center pt-2">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-turquesa rounded-full" 
            />
                    </div>
        </motion.div>
      </section>

      {/* =====================================================
          SOBRE NOSOTROS - Credibilidad y Confianza
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-card">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Image */}
            <AnimatedSection>
              <div className="relative">
                {/* Main image */}
                <div className="relative rounded-2xl overflow-hidden shadow-brand-lg">
                      <Image
                        src="/images/consulting-session.webp"
                    alt="Equipo Alternative en sesión de consultoría"
                    width={600}
                    height={500}
                    className="w-full h-[500px] object-cover"
                  />
                  {/* Overlay as per brand guide */}
                  <div className="absolute inset-0 bg-[#605b51] 
                                  mix-blend-multiply opacity-40" />
                </div>
                
                {/* Floating metric card */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-8 -right-8 bg-white dark:bg-card rounded-2xl 
                             p-6 shadow-brand-lg border border-gris-arena/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-turquesa/20 rounded-xl 
                                    flex items-center justify-center">
                      <Star className="w-8 h-8 text-turquesa" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-azul-marino dark:text-white">
                        4.9/5
                      </div>
                      <div className="text-sm text-foreground/60">
                        Calificación Promedio
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Decorative element */}
                <div className="absolute -top-6 -left-6 w-24 h-24 
                                bg-menta/20 rounded-2xl -rotate-6 -z-10" />
              </div>
            </AnimatedSection>

            {/* Right Column - Content */}
            <AnimatedSection delay={0.2}>
              <span className="inline-block px-4 py-2 bg-turquesa/10 
                               text-turquesa rounded-full text-sm 
                               font-medium mb-4">
                {tAbout('badge')}
              </span>
              
              <h2 className="text-3xl lg:text-4xl text-azul-marino dark:text-white font-semibold mb-6">
                {tAbout('title')}{' '}
                <span className="text-turquesa">{tAbout('titleHighlight')}</span>
              </h2>
              
              <p className="text-foreground/70 mb-6 leading-relaxed">
                {tAbout('description1')}
              </p>
              
              <p className="text-foreground/70 mb-8 leading-relaxed">
                {tAbout('description2')}
              </p>
              
              {/* Values */}
              <div className="space-y-4 mb-8">
                {values.map((valor, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-turquesa/10 
                                    rounded-xl flex items-center justify-center">
                      <valor.icon className="w-6 h-6 text-turquesa" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-1">
                        {valor.title}
                      </h4>
                      <p className="text-sm text-foreground/60">
                        {valor.desc}
                      </p>
                  </div>
                  </motion.div>
                ))}
              </div>

              <Link 
                href={`/${locale}/nosotros`}
                className="inline-flex items-center gap-2 bg-azul-marino text-white 
                           font-semibold px-6 py-3 rounded-lg hover:bg-azul-marino/90 
                           transition-all duration-300 group"
              >
                {tAbout('cta')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>
            
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICIOS - Grid Interactivo
          ===================================================== */}
      <section id="services" className="py-20 lg:py-32 bg-blanco-hueso dark:bg-background relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute top-20 right-0 w-96 h-96 
                        bg-turquesa/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedSection>
              <span className="inline-block px-4 py-2 bg-turquesa/10 
                               text-turquesa rounded-full text-sm font-medium mb-4">
                {tServices('badge')}
              </span>
            </AnimatedSection>
            
            <AnimatedSection delay={0.1}>
              <h2 className="text-3xl lg:text-4xl text-azul-marino dark:text-white font-semibold mb-4">
                {tServices('title')}{' '}
                <span className="text-turquesa">{tServices('titleHighlight')}</span>
              </h2>
          </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-foreground/70">
                {tServices('subtitle')}
              </p>
            </AnimatedSection>
                  </div>

          {/* Services Grid */}
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <Link href={service.href}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group relative bg-white dark:bg-card rounded-2xl p-8 
                               shadow-brand hover:shadow-brand-lg 
                               transition-all duration-300 overflow-hidden cursor-pointer
                               border border-gris-arena/10 h-full"
                  >
                    {/* Decorative element */}
                    <div className={`absolute -top-4 -right-4 w-24 h-24 
                                    ${service.decorBg} rounded-lg rotate-12 
                                    group-hover:rotate-45 group-hover:scale-110
                                    transition-all duration-500`} />
                    
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className={`w-14 h-14 ${service.iconBg} rounded-xl 
                                      flex items-center justify-center mb-4
                                      group-hover:scale-110 transition-transform`}>
                        <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                </div>
                      
                      {/* Content */}
                      <h3 className="text-xl text-azul-marino dark:text-white font-semibold mb-3 
                                     group-hover:text-turquesa transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-foreground/70 mb-4">
                        {service.description}
                      </p>
                      
                      {/* Link */}
                      <div className="flex items-center text-turquesa font-medium 
                                      text-sm group-hover:gap-2 transition-all">
                        <span>Saber más</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          {/* CTA */}
          <AnimatedSection delay={0.4} className="text-center mt-12">
            <Link
              href={`/${locale}/servicios`}
              className="inline-flex items-center gap-2 bg-azul-marino text-white 
                         font-semibold px-8 py-4 rounded-lg hover:bg-azul-marino/90 
                         transition-all duration-300 shadow-brand"
            >
              Ver Todos los Servicios
              <ArrowRight className="w-5 h-5" />
            </Link>
            </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          POR QUÉ ELEGIRNOS - Diseño Dashboard con Indicadores
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-azul-marino relative overflow-hidden">
        {/* Grid pattern background */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(108,196,212,0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(108,196,212,0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Floating orbs */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[10%] w-64 h-64 bg-turquesa/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-[5%] w-80 h-80 bg-violeta/10 rounded-full blur-3xl"
        />

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-block px-5 py-2 bg-turquesa/20 text-turquesa 
                         rounded-full text-sm font-medium mb-6 border border-turquesa/30"
            >
              {tWhyUs('badge')}
            </motion.span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold mb-4">
              {tWhyUs('title')}{' '}
              <span className="text-turquesa">{tWhyUs('titleHighlight')}</span>
            </h2>
            
            <p className="text-white/60 max-w-2xl mx-auto">
              {tWhyUs('subtitle')}
            </p>
          </AnimatedSection>

          {/* Dashboard Layout */}
          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Large Gauge - Years of Experience */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-4 relative group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full
                              hover:bg-white/10 transition-all duration-500">
                {/* Circular Gauge */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  {/* Outer ring */}
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(108,196,212,0.2)"
                      strokeWidth="8"
                    />
                    {/* Animated progress circle */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#gaugeGradient1)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      initial={{ strokeDashoffset: 283 }}
                      whileInView={{ strokeDashoffset: 283 * 0.15 }}
                      transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />
                    <defs>
                      <linearGradient id="gaugeGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6cc4d4" />
                        <stop offset="100%" stopColor="#cbe6b1" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                      className="text-5xl font-bold text-white"
                    >
                      15+
                    </motion.span>
                    <span className="text-turquesa text-sm font-medium">años</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl text-white font-semibold mb-2">
                    Experiencia Comprobada
                  </h3>
                  <p className="text-white/50 text-sm">
                    Liderando transformaciones en LATAM y el Caribe
                  </p>
                </div>
                
                {/* Decorative badges */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {['PMP®', 'ISO 9001', 'Six Sigma'].map((badge, i) => (
                    <motion.span
                      key={badge}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="px-3 py-1 bg-turquesa/10 text-turquesa text-xs rounded-full
                                 border border-turquesa/20"
                    >
                      {badge}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right side - Stacked metrics */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Horizontal bar - Cost Reduction */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6
                           hover:bg-white/10 transition-all duration-500 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violeta/20 rounded-xl flex items-center justify-center
                                    group-hover:bg-violeta/30 transition-colors">
                      <TrendingUp className="w-6 h-6 text-violeta" />
                    </div>
                    <div>
                      <h3 className="text-lg text-white font-semibold">Reducción de Costos</h3>
                      <p className="text-white/50 text-sm">Promedio en proyectos de optimización</p>
                    </div>
                  </div>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-violeta"
                  >
                    35%
                  </motion.span>
                </div>
                
                {/* Animated bar */}
                <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '35%' }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="absolute inset-y-0 left-0 bg-violeta rounded-full"
                  />
                  {/* Animated glow */}
                  <motion.div
                    initial={{ left: '-10%' }}
                    animate={{ left: '110%' }}
                    transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                    className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </div>
              </motion.div>

              {/* Two column layout */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Speed metric */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6
                             hover:bg-white/10 transition-all duration-500 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      {/* Mini speedometer */}
                      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="rgba(203,230,177,0.2)"
                          strokeWidth="6"
                          strokeDasharray="188"
                          strokeDashoffset="62"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#cbe6b1"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray="188"
                          initial={{ strokeDashoffset: 188 }}
                          whileInView={{ strokeDashoffset: 90 }}
                          transition={{ duration: 1.5, delay: 0.4 }}
                          viewport={{ once: true }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-menta" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-menta block"
                      >
                        90 días
                      </motion.span>
                      <h3 className="text-white font-semibold mb-1">Implementación Rápida</h3>
                      <p className="text-white/50 text-xs">
                        Sin burocracia. Resultados en semanas, no meses.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Success rate */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6
                             hover:bg-white/10 transition-all duration-500 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="rgba(108,196,212,0.2)"
                          strokeWidth="6"
                          strokeDasharray="251"
                          strokeDashoffset="0"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#6cc4d4"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray="251"
                          initial={{ strokeDashoffset: 251 }}
                          whileInView={{ strokeDashoffset: 0 }}
                          transition={{ duration: 2, delay: 0.5 }}
                          viewport={{ once: true }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Users className="w-6 h-6 text-turquesa" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-turquesa block"
                      >
                        100%
                      </motion.span>
                      <h3 className="text-white font-semibold mb-1">Transferencia Real</h3>
                      <p className="text-white/50 text-xs">
                        Tu equipo aprende. No creamos dependencia.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Projects counter */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6
                           hover:bg-white/10 transition-all duration-500"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-turquesa" />
                    </div>
                    <div>
                      <h3 className="text-lg text-white font-semibold">Proyectos Exitosos</h3>
                      <p className="text-white/50 text-sm">En banca, manufactura, retail y tecnología</p>
                    </div>
                  </div>
                  
                  {/* Animated counter */}
                  <div className="flex items-baseline gap-2">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, type: "spring" }}
                      viewport={{ once: true }}
                      className="text-5xl font-bold text-turquesa"
                    >
                      50+
                    </motion.span>
                    
                    {/* Mini chart dots */}
                    <div className="flex items-end gap-1 h-8">
                      {[40, 60, 45, 70, 55, 80, 65, 90].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                          viewport={{ once: true }}
                          className="w-1.5 bg-turquesa/40 rounded-full"
                          style={{ minHeight: 4 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CASOS DE ÉXITO - Diseño Compacto
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-background relative overflow-hidden">
        <div className="container-custom relative z-10">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-12">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-block px-5 py-2 bg-turquesa/10 text-turquesa 
                         rounded-full text-sm font-medium mb-6 border border-turquesa/20"
            >
              {tCases('badge')}
            </motion.span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-azul-marino dark:text-white font-semibold mb-4">
              {tCases('title')}{' '}
              <span className="text-turquesa">{tCases('titleHighlight')}</span>
            </h2>
          </AnimatedSection>

          {/* Case Studies Grid - Compact */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Case 1 - Banca */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-white dark:bg-card rounded-2xl overflow-hidden shadow-brand 
                              hover:shadow-brand-lg transition-all duration-500 h-full
                              border border-gris-arena/10">
                {/* Header with color */}
                <div className="bg-azul-marino p-6 relative overflow-hidden">
                  {/* Decorative element */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-10 -right-10 w-32 h-32 bg-turquesa/10 rounded-full"
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-5 h-5 text-turquesa" />
                      <span className="text-turquesa text-sm font-medium">Banca</span>
                    </div>
                    
                    {/* Main Metric */}
                    <div className="flex items-baseline gap-2">
                      <motion.span
                        initial={{ scale: 0.5 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        viewport={{ once: true }}
                        className="text-5xl font-bold text-white"
                      >
                        40%
                      </motion.span>
                      <TrendingUp className="w-5 h-5 text-menta" />
                    </div>
                    <p className="text-white/70 text-sm mt-1">reducción tiempo aprobación</p>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-3
                                 group-hover:text-turquesa transition-colors">
                    Institución Financiera Regional
                  </h3>
                  
                  <p className="text-foreground/60 text-sm mb-4 leading-relaxed">
                    Optimización de procesos de crédito con BPM. Reducimos el tiempo de 15 a 9 días 
                    y logramos 100% cumplimiento de SLA.
                  </p>
                  
                  {/* Mini metrics */}
                  <div className="flex gap-4 mb-4">
                    <div className="text-center">
                      <span className="text-xl font-bold text-turquesa">25%</span>
                      <p className="text-xs text-foreground/50">+productividad</p>
                    </div>
                    <div className="text-center">
                      <span className="text-xl font-bold text-menta">100%</span>
                      <p className="text-xs text-foreground/50">SLA cumplido</p>
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-xs text-foreground/50 italic border-l-2 border-turquesa/30 pl-3">
                    &ldquo;Nos enseñaron a gestionar con disciplina. Hoy somos más ágiles.&rdquo;
                    <span className="block mt-1 not-italic text-foreground/40">— CFO</span>
                  </blockquote>
                </div>
              </div>
            </motion.div>

            {/* Case 2 - Manufactura */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-white dark:bg-card rounded-2xl overflow-hidden shadow-brand 
                              hover:shadow-brand-lg transition-all duration-500 h-full
                              border border-gris-arena/10">
                <div className="bg-violeta p-6 relative overflow-hidden">
                  <motion.div
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Factory className="w-5 h-5 text-menta" />
                      <span className="text-menta text-sm font-medium">Manufactura</span>
                    </div>
                    
                    <div className="flex items-baseline gap-2">
                      <motion.span
                        initial={{ scale: 0.5 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        viewport={{ once: true }}
                        className="text-5xl font-bold text-white"
                      >
                        $180K
                      </motion.span>
                    </div>
                    <p className="text-white/70 text-sm mt-1">ahorros anuales</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-3
                                 group-hover:text-violeta transition-colors">
                    Empresa de Manufactura y Logística
                  </h3>
                  
                  <p className="text-foreground/60 text-sm mb-4 leading-relaxed">
                    Lean Manufacturing + ISO 9001. Entregas a tiempo subieron del 60% al 92% 
                    con reducción del 30% en inventario.
                  </p>
                  
                  <div className="flex gap-4 mb-4">
                    <div className="text-center">
                      <span className="text-xl font-bold text-violeta">92%</span>
                      <p className="text-xs text-foreground/50">a tiempo</p>
                    </div>
                    <div className="text-center">
                      <span className="text-xl font-bold text-menta">30%</span>
                      <p className="text-xs text-foreground/50">-inventario</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-xs text-foreground/50 italic border-l-2 border-violeta/30 pl-3">
                    &ldquo;El ROI se recuperó en 4 meses. Seguimos mejorando.&rdquo;
                    <span className="block mt-1 not-italic text-foreground/40">— COO</span>
                  </blockquote>
                </div>
              </div>
            </motion.div>

            {/* Case 3 - Tecnología */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-white dark:bg-card rounded-2xl overflow-hidden shadow-brand 
                              hover:shadow-brand-lg transition-all duration-500 h-full
                              border border-gris-arena/10">
                <div className="bg-oliva p-6 relative overflow-hidden">
                  <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-10 -right-10 w-32 h-32 bg-menta/20 rounded-full"
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Laptop className="w-5 h-5 text-menta" />
                      <span className="text-menta text-sm font-medium">Tecnología</span>
                    </div>
                    
                    <div className="flex items-baseline gap-2">
                      <motion.span
                        initial={{ scale: 0.5 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        viewport={{ once: true }}
                        className="text-5xl font-bold text-white"
                      >
                        85%
                      </motion.span>
                      <TrendingUp className="w-5 h-5 text-turquesa" />
                    </div>
                    <p className="text-white/70 text-sm mt-1">proyectos a tiempo</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-3
                                 group-hover:text-oliva transition-colors">
                    Empresa de Tecnología (PMO)
                  </h3>
                  
                  <p className="text-foreground/60 text-sm mb-4 leading-relaxed">
                    PMO + Scrum/Kanban. Proyectos a tiempo pasaron del 30% al 85% con 50% menos retrabajo.
                  </p>
                  
                  <div className="flex gap-4 mb-4">
                    <div className="text-center">
                      <span className="text-xl font-bold text-oliva">50%</span>
                      <p className="text-xs text-foreground/50">-retrabajo</p>
                    </div>
                    <div className="text-center">
                      <span className="text-xl font-bold text-turquesa">4.5/5</span>
                      <p className="text-xs text-foreground/50">satisfacción</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-xs text-foreground/50 italic border-l-2 border-menta/50 pl-3">
                    &ldquo;Ahora tenemos un PMO que agrega valor estratégico real.&rdquo;
                    <span className="block mt-1 not-italic text-foreground/40">— CTO</span>
                  </blockquote>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <AnimatedSection delay={0.2} className="text-center mt-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={`/${locale}/casos-exito`}
                className="inline-flex items-center gap-3 bg-azul-marino text-white 
                           font-semibold px-8 py-4 rounded-full hover:bg-turquesa hover:text-azul-marino
                           transition-all duration-300 shadow-brand group"
              >
                ¿Quieres resultados como estos?
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALES - Social Proof
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-azul-marino">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/20 text-turquesa rounded-full text-sm font-medium mb-4">
              {tTestimonials('badge')}
              </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              {tTestimonials('title')}{' '}
              <span className="text-turquesa">{tTestimonials('titleHighlight')}</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              {tTestimonials('subtitle')}
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

          {/* Client Logos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-white/10"
          >
            <p className="text-center text-white/50 text-sm mb-8">
              Empresas que confían en nosotros
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-14 bg-white/10 rounded-lg flex items-center justify-center
                             hover:bg-white/20 transition-all duration-300 cursor-pointer
                             border border-white/5"
                >
                  <span className="text-white/30 text-xs font-medium">Logo {i}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          CTA FINAL - Violeta (según manual)
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-violeta relative overflow-hidden">
        {/* Background decorative shape - curved element on the right side behind the form */}
        <div className="absolute top-0 right-0 bottom-0 w-1/2 lg:w-[55%] pointer-events-none">
          {/* Main curved shape */}
          <div className="absolute inset-0 bg-white/5 rounded-l-[80px] lg:rounded-l-[120px]" />
          
          {/* Blur orbs for depth */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-turquesa/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-menta/10 rounded-full blur-2xl" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left content */}
            <AnimatedSection>
              <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
                {tCta('title')}
                </h2>
              <p className="text-white/70 mb-8">
                {tCta('subtitle')}
              </p>

              <div className="mb-8">
                <p className="text-turquesa font-medium mb-4">{tCta('benefits.title')}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    tCta('benefits.item1'),
                    tCta('benefits.item2'),
                    tCta('benefits.item3'),
                    tCta('benefits.item4')
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
                  {tCta('trust')}
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

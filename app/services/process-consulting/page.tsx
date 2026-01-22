'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import {
  Settings,
  CheckCircle2,
  ArrowRight,
  Search,
  FileText,
  Cog,
  BarChart3,
  Award,
  Monitor,
  TrendingUp,
  Layers
} from 'lucide-react';

const AnimatedSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function ProcessConsultingPage() {
  const { language } = useI18n();

  const benefits = [
    language === 'es' ? 'Reducción de costos operativos' : 'Reduced operational costs',
    language === 'es' ? 'Mayor productividad del equipo' : 'Increased team productivity',
    language === 'es' ? 'Eliminación de cuellos de botella' : 'Elimination of bottlenecks',
    language === 'es' ? 'Procesos estandarizados y documentados' : 'Standardized and documented processes',
    language === 'es' ? 'Mejor experiencia del cliente' : 'Better customer experience',
    language === 'es' ? 'Decisiones basadas en datos' : 'Data-driven decisions',
  ];

  const phases = [
    { num: '01', icon: Search, title: language === 'es' ? 'Diagnóstico' : 'Diagnosis', desc: language === 'es' ? 'Mapeamos y analizamos tus procesos actuales identificando ineficiencias' : 'We map and analyze your current processes identifying inefficiencies' },
    { num: '02', icon: FileText, title: language === 'es' ? 'Diseño' : 'Design', desc: language === 'es' ? 'Rediseñamos los procesos con mejoras prácticas y medibles' : 'We redesign processes with practical and measurable improvements' },
    { num: '03', icon: Cog, title: language === 'es' ? 'Implementación' : 'Implementation', desc: language === 'es' ? 'Ejecutamos los cambios con acompañamiento y capacitación' : 'We execute changes with support and training' },
    { num: '04', icon: BarChart3, title: language === 'es' ? 'Seguimiento' : 'Follow-up', desc: language === 'es' ? 'Monitoreamos indicadores y optimizamos continuamente' : 'We monitor indicators and continuously optimize' },
  ];

  const relatedServices = [
    { icon: Award, title: language === 'es' ? 'Consultoría de Calidad' : 'Quality Consulting', href: '/services/quality-consulting' },
    { icon: Monitor, title: language === 'es' ? 'Consultoría de TI' : 'IT Consulting', href: '/services/it-consulting' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-azul-marino overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="absolute top-20 right-[10%] w-20 h-20 bg-menta/20 rounded-xl rotate-12" />
        <div className="absolute bottom-20 left-[5%] w-16 h-16 bg-turquesa/20 rounded-xl -rotate-6" />
        
        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-menta/20 border border-menta/30 rounded-full px-4 py-2 mb-6"
            >
              <Settings className="w-4 h-4 text-menta" />
              <span className="text-menta text-sm font-medium">
                {language === 'es' ? 'Consultoría de Procesos' : 'Process Consulting'}
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight"
            >
              {language === 'es' 
                ? <>Optimiza tus <span className="text-menta">Procesos</span> para Máxima Eficiencia</>
                : <>Optimize Your <span className="text-menta">Processes</span> for Maximum Efficiency</>}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-white/70 mb-8"
            >
              {language === 'es'
                ? 'Transformamos tus operaciones eliminando ineficiencias y creando flujos de trabajo que impulsan resultados.'
                : 'We transform your operations by eliminating inefficiencies and creating workflows that drive results.'}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link 
                href="/contact"
                className="group inline-flex items-center gap-3 bg-menta text-azul-marino font-semibold px-7 py-4 rounded-xl hover:bg-turquesa transition-all duration-300"
              >
                {language === 'es' ? 'Solicita un Diagnóstico' : 'Request a Diagnosis'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 65C1200 70 1320 70 1380 70L1440 70V100H0Z" className="fill-blanco-hueso dark:fill-background"/>
          </svg>
        </div>
      </section>

      {/* What Is Section */}
      <section className="py-24 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-block text-menta font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? '¿Qué es?' : 'What is it?'}
              </span>
              <h2 className="text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {language === 'es' ? 'Consultoría de Procesos' : 'Process Consulting'}
              </h2>
              <p className="text-lg text-foreground/70 mb-6">
                {language === 'es'
                  ? 'La consultoría de procesos es un servicio especializado que analiza, diseña y optimiza los flujos de trabajo de tu organización para maximizar la eficiencia y reducir costos.'
                  : 'Process consulting is a specialized service that analyzes, designs, and optimizes your organization\'s workflows to maximize efficiency and reduce costs.'}
              </p>
              <p className="text-foreground/60 mb-8">
                {language === 'es'
                  ? 'Nuestro enfoque combina metodologías probadas con tecnología para transformar la manera en que tu empresa opera, generando resultados medibles y sostenibles.'
                  : 'Our approach combines proven methodologies with technology to transform the way your company operates, generating measurable and sustainable results.'}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0" />
                    <span className="text-foreground/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/images/hero-strategy.jpg"
                      alt={language === 'es' ? 'Optimización de procesos' : 'Process optimization'}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-menta rounded-xl -z-10" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 bg-white dark:bg-card/50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block text-turquesa font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? 'Metodología' : 'Methodology'}
              </span>
              <h2 className="text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {language === 'es' ? 'Nuestro Proceso' : 'Our Process'}
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, idx) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  {idx < phases.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-[60%] w-full h-px bg-gris-arena/50" />
                  )}
                  <div className="bg-blanco-hueso dark:bg-secondary rounded-2xl p-8 hover:shadow-brand-md transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="text-5xl font-bold text-menta/30 mb-4">{phase.num}</div>
                    <div className="w-12 h-12 bg-menta/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-menta" />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">{phase.title}</h3>
                    <p className="text-foreground/60 text-sm">{phase.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-24 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-azul-marino dark:text-white">
                {language === 'es' ? 'Servicios Relacionados' : 'Related Services'}
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {relatedServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link href={service.href}>
                    <div className="group bg-white dark:bg-card rounded-2xl p-6 shadow-brand hover:shadow-brand-md transition-all duration-300 flex items-center gap-4">
                      <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center group-hover:bg-turquesa/30 transition-colors">
                        <Icon className="w-6 h-6 text-turquesa" />
                      </div>
                      <span className="font-semibold text-azul-marino dark:text-white group-hover:text-turquesa transition-colors">{service.title}</span>
                      <ArrowRight className="w-5 h-5 text-foreground/40 ml-auto group-hover:text-turquesa group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-menta">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-6">
                {language === 'es' ? '¿Listo para Optimizar tus Procesos?' : 'Ready to Optimize Your Processes?'}
              </h2>
              <p className="text-azul-marino/70 mb-8">
                {language === 'es'
                  ? 'Solicita un diagnóstico gratuito y descubre cómo podemos ayudarte a mejorar tu operación.'
                  : 'Request a free diagnosis and discover how we can help you improve your operation.'}
              </p>
              <Link 
                href="/contact"
                className="group inline-flex items-center gap-3 bg-azul-marino text-white font-semibold px-8 py-4 rounded-xl hover:bg-azul-marino/90 transition-all duration-300"
              >
                {language === 'es' ? 'Agenda tu Consulta' : 'Schedule Your Consultation'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import {
  Monitor,
  CheckCircle2,
  ArrowRight,
  Search,
  Map,
  Boxes,
  Shield,
  Code,
  FolderKanban
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

export default function ITConsultingPage() {
  const { language } = useI18n();

  const benefits = [
    language === 'es' ? 'Roadmap tecnológico alineado' : 'Aligned technology roadmap',
    language === 'es' ? 'Optimización de inversiones TI' : 'IT investment optimization',
    language === 'es' ? 'Ciberseguridad fortalecida' : 'Strengthened cybersecurity',
    language === 'es' ? 'Infraestructura escalable' : 'Scalable infrastructure',
    language === 'es' ? 'Transformación digital efectiva' : 'Effective digital transformation',
    language === 'es' ? 'Soporte y mantenimiento continuo' : 'Continuous support and maintenance',
  ];

  const phases = [
    { num: '01', icon: Search, title: language === 'es' ? 'Auditoría TI' : 'IT Audit', desc: language === 'es' ? 'Evaluamos tu infraestructura y sistemas actuales' : 'We evaluate your current infrastructure and systems' },
    { num: '02', icon: Map, title: language === 'es' ? 'Roadmap' : 'Roadmap', desc: language === 'es' ? 'Diseñamos la hoja de ruta tecnológica estratégica' : 'We design the strategic technology roadmap' },
    { num: '03', icon: Boxes, title: language === 'es' ? 'Solución' : 'Solution', desc: language === 'es' ? 'Seleccionamos e implementamos las mejores soluciones' : 'We select and implement the best solutions' },
    { num: '04', icon: Shield, title: language === 'es' ? 'Gobierno TI' : 'IT Governance', desc: language === 'es' ? 'Establecemos políticas y mejores prácticas' : 'We establish policies and best practices' },
  ];

  const relatedServices = [
    { icon: Code, title: language === 'es' ? 'Desarrollo de Software' : 'Software Development', href: '/services/software-development' },
    { icon: FolderKanban, title: language === 'es' ? 'Consultoría de Proyectos' : 'Project Consulting', href: '/services/project-consulting' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-azul-marino overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="absolute top-20 right-[10%] w-20 h-20 bg-lavanda/20 rounded-xl rotate-12" />
        <div className="absolute bottom-20 left-[5%] w-16 h-16 bg-turquesa/20 rounded-xl -rotate-6" />
        
        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-lavanda/20 border border-lavanda/30 rounded-full px-4 py-2 mb-6"
            >
              <Monitor className="w-4 h-4 text-lavanda" />
              <span className="text-lavanda text-sm font-medium">
                {language === 'es' ? 'Consultoría de TI' : 'IT Consulting'}
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight"
            >
              {language === 'es' 
                ? <><span className="text-lavanda">Tecnología</span> Alineada con tu Estrategia</>
                : <><span className="text-lavanda">Technology</span> Aligned with Your Strategy</>}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-white/70 mb-8"
            >
              {language === 'es'
                ? 'Transformamos tu infraestructura tecnológica para potenciar tu competitividad y eficiencia operativa.'
                : 'We transform your technology infrastructure to boost your competitiveness and operational efficiency.'}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link 
                href="/contact"
                className="group inline-flex items-center gap-3 bg-lavanda text-azul-marino font-semibold px-7 py-4 rounded-xl hover:bg-turquesa transition-all duration-300"
              >
                {language === 'es' ? 'Solicita una Auditoría' : 'Request an Audit'}
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
              <span className="inline-block text-lavanda font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? '¿Qué es?' : 'What is it?'}
              </span>
              <h2 className="text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {language === 'es' ? 'Consultoría de TI' : 'IT Consulting'}
              </h2>
              <p className="text-lg text-foreground/70 mb-6">
                {language === 'es'
                  ? 'La consultoría de TI te ayuda a alinear tu estrategia tecnológica con los objetivos del negocio, optimizando inversiones y maximizando el valor de la tecnología.'
                  : 'IT consulting helps you align your technology strategy with business objectives, optimizing investments and maximizing technology value.'}
              </p>
              <p className="text-foreground/60 mb-8">
                {language === 'es'
                  ? 'Desde auditorías de infraestructura hasta transformación digital completa, nuestro equipo te guía en cada paso del camino tecnológico.'
                  : 'From infrastructure audits to complete digital transformation, our team guides you every step of the technology journey.'}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lavanda flex-shrink-0" />
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
                      src="/images/hero-tech.jpg"
                      alt={language === 'es' ? 'Consultoría tecnológica' : 'Technology consulting'}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-lavanda rounded-xl -z-10" />
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
                {language === 'es' ? 'Nuestro Enfoque' : 'Our Approach'}
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
                    <div className="text-5xl font-bold text-lavanda/30 mb-4">{phase.num}</div>
                    <div className="w-12 h-12 bg-lavanda/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-lavanda" />
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
                      <div className="w-12 h-12 bg-lavanda/20 rounded-xl flex items-center justify-center group-hover:bg-lavanda/30 transition-colors">
                        <Icon className="w-6 h-6 text-lavanda" />
                      </div>
                      <span className="font-semibold text-azul-marino dark:text-white group-hover:text-lavanda transition-colors">{service.title}</span>
                      <ArrowRight className="w-5 h-5 text-foreground/40 ml-auto group-hover:text-lavanda group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-lavanda">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-6">
                {language === 'es' ? '¿Listo para tu Transformación Digital?' : 'Ready for Your Digital Transformation?'}
              </h2>
              <p className="text-azul-marino/70 mb-8">
                {language === 'es'
                  ? 'Solicita una auditoría gratuita y descubre cómo optimizar tu tecnología.'
                  : 'Request a free audit and discover how to optimize your technology.'}
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

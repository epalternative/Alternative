'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import {
  Award,
  CheckCircle2,
  ArrowRight,
  ClipboardCheck,
  FileCheck,
  Shield,
  Target,
  Settings,
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

export default function QualityConsultingPage() {
  const { language } = useI18n();

  const benefits = [
    language === 'es' ? 'Certificaciones ISO y estándares internacionales' : 'ISO certifications and international standards',
    language === 'es' ? 'Reducción de defectos y reprocesos' : 'Reduction of defects and rework',
    language === 'es' ? 'Mayor satisfacción del cliente' : 'Higher customer satisfaction',
    language === 'es' ? 'Cultura de mejora continua' : 'Culture of continuous improvement',
    language === 'es' ? 'Cumplimiento normativo garantizado' : 'Guaranteed regulatory compliance',
    language === 'es' ? 'Ventaja competitiva sostenible' : 'Sustainable competitive advantage',
  ];

  const phases = [
    { num: '01', icon: ClipboardCheck, title: language === 'es' ? 'Evaluación' : 'Assessment', desc: language === 'es' ? 'Analizamos tu sistema de calidad actual e identificamos brechas' : 'We analyze your current quality system and identify gaps' },
    { num: '02', icon: FileCheck, title: language === 'es' ? 'Diseño SGC' : 'QMS Design', desc: language === 'es' ? 'Desarrollamos el sistema de gestión de calidad adecuado' : 'We develop the appropriate quality management system' },
    { num: '03', icon: Shield, title: language === 'es' ? 'Implementación' : 'Implementation', desc: language === 'es' ? 'Ejecutamos con capacitación y documentación completa' : 'We execute with training and complete documentation' },
    { num: '04', icon: Target, title: language === 'es' ? 'Certificación' : 'Certification', desc: language === 'es' ? 'Te acompañamos en el proceso de auditoría y certificación' : 'We accompany you through the audit and certification process' },
  ];

  const relatedServices = [
    { icon: Settings, title: language === 'es' ? 'Consultoría de Procesos' : 'Process Consulting', href: '/services/process-consulting' },
    { icon: FolderKanban, title: language === 'es' ? 'Consultoría de Proyectos' : 'Project Consulting', href: '/services/project-consulting' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-azul-marino overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="absolute top-20 right-[10%] w-20 h-20 bg-turquesa/20 rounded-xl rotate-12" />
        <div className="absolute bottom-20 left-[5%] w-16 h-16 bg-menta/20 rounded-xl -rotate-6" />
        
        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-turquesa/20 border border-turquesa/30 rounded-full px-4 py-2 mb-6"
            >
              <Award className="w-4 h-4 text-turquesa" />
              <span className="text-turquesa text-sm font-medium">
                {language === 'es' ? 'Consultoría de Calidad' : 'Quality Consulting'}
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight"
            >
              {language === 'es' 
                ? <>Estándares de <span className="text-turquesa">Calidad</span> que Generan Confianza</>
                : <><span className="text-turquesa">Quality</span> Standards that Build Trust</>}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-white/70 mb-8"
            >
              {language === 'es'
                ? 'Implementamos sistemas de gestión de calidad que aseguran la excelencia operativa y el cumplimiento de estándares internacionales.'
                : 'We implement quality management systems that ensure operational excellence and compliance with international standards.'}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link 
                href="/contact"
                className="group inline-flex items-center gap-3 bg-turquesa text-azul-marino font-semibold px-7 py-4 rounded-xl hover:bg-menta transition-all duration-300"
              >
                {language === 'es' ? 'Solicita una Evaluación' : 'Request an Assessment'}
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
              <span className="inline-block text-turquesa font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? '¿Qué es?' : 'What is it?'}
              </span>
              <h2 className="text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {language === 'es' ? 'Consultoría de Calidad' : 'Quality Consulting'}
              </h2>
              <p className="text-lg text-foreground/70 mb-6">
                {language === 'es'
                  ? 'La consultoría de calidad te ayuda a implementar sistemas y procesos que garantizan productos y servicios de excelencia, cumpliendo con estándares internacionales como ISO 9001.'
                  : 'Quality consulting helps you implement systems and processes that guarantee excellent products and services, complying with international standards like ISO 9001.'}
              </p>
              <p className="text-foreground/60 mb-8">
                {language === 'es'
                  ? 'Nuestro enfoque va más allá de la certificación: creamos una cultura de calidad que permea toda la organización.'
                  : 'Our approach goes beyond certification: we create a quality culture that permeates the entire organization.'}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0" />
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
                      src="/images/success-handshake.jpg"
                      alt={language === 'es' ? 'Certificación de calidad' : 'Quality certification'}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-turquesa rounded-xl -z-10" />
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
              <span className="inline-block text-violeta font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? 'Metodología' : 'Methodology'}
              </span>
              <h2 className="text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {language === 'es' ? 'Camino a la Certificación' : 'Path to Certification'}
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
                    <div className="text-5xl font-bold text-turquesa/30 mb-4">{phase.num}</div>
                    <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-turquesa" />
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
      <section className="py-24 bg-turquesa">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-6">
                {language === 'es' ? '¿Listo para Certificar tu Calidad?' : 'Ready to Certify Your Quality?'}
              </h2>
              <p className="text-azul-marino/70 mb-8">
                {language === 'es'
                  ? 'Solicita una evaluación gratuita y conoce el camino hacia la certificación de tu empresa.'
                  : 'Request a free assessment and discover the path to your company\'s certification.'}
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

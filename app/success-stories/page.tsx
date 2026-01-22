'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { Counter } from '@/components/ui/counter';
import {
  ArrowRight,
  Settings,
  Award,
  Monitor,
  Code,
  TrendingUp,
  Building2,
  Factory,
  ShoppingBag,
  Stethoscope
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

export default function SuccessStoriesPage() {
  const { language } = useI18n();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: language === 'es' ? 'Todos' : 'All' },
    { id: 'process', label: language === 'es' ? 'Procesos' : 'Process' },
    { id: 'quality', label: language === 'es' ? 'Calidad' : 'Quality' },
    { id: 'it', label: 'TI / IT' },
    { id: 'software', label: 'Software' },
  ];

  const projects = [
    {
      id: 1,
      category: 'process',
      icon: Factory,
      industry: language === 'es' ? 'Manufactura' : 'Manufacturing',
      title: language === 'es' ? 'Optimización de Línea de Producción' : 'Production Line Optimization',
      summary: language === 'es' 
        ? 'Rediseñamos los procesos de producción de una fábrica, reduciendo tiempos de ciclo y aumentando la productividad.'
        : 'We redesigned a factory\'s production processes, reducing cycle times and increasing productivity.',
      results: [{ value: 35, suffix: '%', label: language === 'es' ? 'Reducción de Tiempo' : 'Time Reduction' }, { value: 28, suffix: '%', label: language === 'es' ? 'Aumento Productividad' : 'Productivity Increase' }],
      image: '/images/team-working.jpg'
    },
    {
      id: 2,
      category: 'quality',
      icon: Building2,
      industry: language === 'es' ? 'Servicios Financieros' : 'Financial Services',
      title: language === 'es' ? 'Certificación ISO 9001' : 'ISO 9001 Certification',
      summary: language === 'es'
        ? 'Implementamos un sistema de gestión de calidad que llevó a la certificación exitosa en tiempo récord.'
        : 'We implemented a quality management system that led to successful certification in record time.',
      results: [{ value: 100, suffix: '%', label: language === 'es' ? 'Certificación Exitosa' : 'Successful Certification' }, { value: 6, suffix: ' meses', label: language === 'es' ? 'Tiempo de Implementación' : 'Implementation Time' }],
      image: '/images/success-handshake.jpg'
    },
    {
      id: 3,
      category: 'it',
      icon: ShoppingBag,
      industry: language === 'es' ? 'Retail' : 'Retail',
      title: language === 'es' ? 'Transformación Digital Integral' : 'Comprehensive Digital Transformation',
      summary: language === 'es'
        ? 'Migramos toda la infraestructura tecnológica a la nube y modernizamos los sistemas de punto de venta.'
        : 'We migrated the entire technology infrastructure to the cloud and modernized point-of-sale systems.',
      results: [{ value: 45, suffix: '%', label: language === 'es' ? 'Reducción Costos TI' : 'IT Cost Reduction' }, { value: 99.9, suffix: '%', label: language === 'es' ? 'Uptime' : 'Uptime' }],
      image: '/images/hero-tech.jpg'
    },
    {
      id: 4,
      category: 'software',
      icon: Stethoscope,
      industry: language === 'es' ? 'Salud' : 'Healthcare',
      title: language === 'es' ? 'Sistema de Gestión de Pacientes' : 'Patient Management System',
      summary: language === 'es'
        ? 'Desarrollamos un sistema integral de gestión de pacientes que mejoró significativamente la atención clínica.'
        : 'We developed a comprehensive patient management system that significantly improved clinical care.',
      results: [{ value: 50, suffix: '%', label: language === 'es' ? 'Menos Tiempo Admin' : 'Less Admin Time' }, { value: 40, suffix: '%', label: language === 'es' ? 'Más Pacientes Atendidos' : 'More Patients Served' }],
      image: '/images/consulting-session.jpg'
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-azul-marino overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="absolute top-20 right-[10%] w-20 h-20 bg-turquesa/20 rounded-xl rotate-12" />
        <div className="absolute bottom-20 left-[5%] w-16 h-16 bg-menta/20 rounded-xl -rotate-6" />
        
        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-turquesa font-semibold text-sm uppercase tracking-wider mb-4"
            >
              {language === 'es' ? 'Proyectos Exitosos' : 'Success Stories'}
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6"
            >
              {language === 'es' 
                ? <>Proyectos que <span className="text-turquesa">Transforman</span> Empresas</>
                : <>Projects that <span className="text-turquesa">Transform</span> Businesses</>}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-white/70"
            >
              {language === 'es'
                ? 'Conoce cómo hemos ayudado a empresas como la tuya a alcanzar sus objetivos.'
                : 'Learn how we have helped companies like yours achieve their goals.'}
            </motion.p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 65C1200 70 1320 70 1380 70L1440 70V100H0Z" className="fill-blanco-hueso dark:fill-background"/>
          </svg>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-blanco-hueso dark:bg-background border-b border-gris-arena/20">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-azul-marino text-white'
                    : 'bg-white dark:bg-card text-foreground/70 hover:bg-beige dark:hover:bg-secondary'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-card rounded-3xl overflow-hidden shadow-brand hover:shadow-brand-lg transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-azul-marino/30" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                        <Icon className="w-4 h-4 text-azul-marino" />
                        <span className="text-sm font-medium text-azul-marino">{project.industry}</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-azul-marino dark:text-white mb-4">
                      {project.title}
                    </h3>
                    <p className="text-foreground/60 mb-6">
                      {project.summary}
                    </p>
                    
                    {/* Results */}
                    <div className="flex gap-8 mb-6">
                      {project.results.map((result, ridx) => (
                        <div key={ridx}>
                          <div className="text-3xl font-bold text-turquesa">
                            <Counter end={result.value} suffix={result.suffix} duration={2} />
                          </div>
                          <p className="text-sm text-foreground/60">{result.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
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
                {language === 'es' ? '¿Quieres Resultados Similares?' : 'Want Similar Results?'}
              </h2>
              <p className="text-azul-marino/70 mb-8">
                {language === 'es'
                  ? 'Hablemos sobre cómo podemos ayudar a tu empresa a alcanzar sus objetivos.'
                  : 'Let\'s talk about how we can help your company achieve its goals.'}
              </p>
              <Link 
                href="/contact"
                className="group inline-flex items-center gap-3 bg-azul-marino text-white font-semibold px-8 py-4 rounded-xl hover:bg-azul-marino/90 transition-all duration-300"
              >
                {language === 'es' ? 'Comienza tu Proyecto' : 'Start Your Project'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

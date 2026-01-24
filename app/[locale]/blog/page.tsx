'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useLocale } from 'next-intl';
import {
  Search,
  ArrowRight,
  Clock,
  Bell,
  FileText,
  Settings,
  Award,
  FolderKanban,
  Monitor,
  Code
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

export default function BlogPage() {
  const language = useLocale();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: language === 'es' ? 'Todos' : 'All', icon: FileText },
    { id: 'process', label: language === 'es' ? 'Procesos' : 'Process', icon: Settings },
    { id: 'quality', label: language === 'es' ? 'Calidad' : 'Quality', icon: Award },
    { id: 'projects', label: language === 'es' ? 'Proyectos' : 'Projects', icon: FolderKanban },
    { id: 'it', label: 'TI / IT', icon: Monitor },
    { id: 'software', label: 'Software', icon: Code },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(language === 'es' ? '¡Gracias por suscribirte! Te notificaremos cuando publiquemos nuevo contenido.' : 'Thanks for subscribing! We\'ll notify you when we publish new content.');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-azul-marino overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="absolute top-20 right-[10%] w-20 h-20 bg-turquesa/20 rounded-xl rotate-12" />
        <div className="absolute bottom-20 left-[5%] w-16 h-16 bg-lavanda/20 rounded-xl -rotate-6" />
        
        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-lavanda font-semibold text-sm uppercase tracking-wider mb-4"
            >
              Blog
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6"
            >
              {language === 'es' 
                ? <>Insights y <span className="text-lavanda">Tendencias</span> en Consultoría</>
                : <>Insights and <span className="text-lavanda">Trends</span> in Consulting</>}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-white/70"
            >
              {language === 'es'
                ? 'Artículos, guías y recursos para impulsar tu empresa.'
                : 'Articles, guides, and resources to boost your business.'}
            </motion.p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 65C1200 70 1320 70 1380 70L1440 70V100H0Z" className="fill-blanco-hueso dark:fill-background"/>
          </svg>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-12 bg-blanco-hueso dark:bg-background border-b border-gris-arena/20">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                type="text"
                placeholder={language === 'es' ? 'Buscar artículos...' : 'Search articles...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-card border border-gris-arena/30 dark:border-white/10 rounded-xl focus:outline-none focus:border-turquesa"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                      activeFilter === filter.id
                        ? 'bg-azul-marino text-white'
                        : 'bg-white dark:bg-card text-foreground/70 hover:bg-beige dark:hover:bg-secondary'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="py-24 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 bg-lavanda/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Clock className="w-12 h-12 text-lavanda" />
              </div>
              <h2 className="text-3xl font-semibold text-azul-marino dark:text-white mb-4">
                {language === 'es' ? 'Contenido en Desarrollo' : 'Content Coming Soon'}
              </h2>
              <p className="text-foreground/60 mb-8">
                {language === 'es'
                  ? 'Estamos preparando artículos de valor sobre consultoría estratégica, optimización de procesos, tecnología y más. Suscríbete para ser el primero en conocerlos.'
                  : 'We are preparing valuable articles on strategic consulting, process optimization, technology and more. Subscribe to be the first to know.'}
              </p>

              {/* Placeholder Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white dark:bg-card rounded-2xl p-6 border border-gris-arena/20 dark:border-white/10">
                    <div className="aspect-video bg-beige dark:bg-secondary rounded-xl mb-4 animate-pulse" />
                    <div className="h-4 bg-beige dark:bg-secondary rounded mb-3 animate-pulse" />
                    <div className="h-3 bg-beige dark:bg-secondary rounded w-2/3 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-lavanda">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-xl mx-auto text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Bell className="w-8 h-8 text-azul-marino" />
              </div>
              <h2 className="text-3xl font-semibold text-azul-marino mb-4">
                {language === 'es' ? 'Suscríbete al Newsletter' : 'Subscribe to Newsletter'}
              </h2>
              <p className="text-azul-marino/70 mb-8">
                {language === 'es'
                  ? 'Recibe los mejores artículos sobre consultoría y estrategia empresarial directamente en tu correo.'
                  : 'Receive the best articles on consulting and business strategy directly in your inbox.'}
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder={language === 'es' ? 'Tu correo electrónico' : 'Your email address'}
                  className="flex-1 px-5 py-4 bg-white border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-azul-marino"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 bg-azul-marino text-white font-semibold px-8 py-4 rounded-xl hover:bg-azul-marino/90 transition-all duration-300"
                >
                  {language === 'es' ? 'Suscribir' : 'Subscribe'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

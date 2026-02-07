'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Target,
  ArrowRight,
  ChevronDown,
  Sparkles,
  TrendingUp,
  BarChart3,
  GitBranch,
  Award
} from 'lucide-react';

interface ConsultoriaEstrategicaHeroProps {
  locale: string;
}

export default function ConsultoriaEstrategicaHero({ locale }: ConsultoriaEstrategicaHeroProps) {
  const isEs = locale === 'es';

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Consultoría Estratégica' : 'Strategic Consulting', href: null }
  ];

  const colorClasses = {
    turquesa: { bg: 'bg-turquesa/10', text: 'text-turquesa', border: 'border-turquesa/20', badge: 'bg-turquesa/10 text-turquesa' },
    menta: { bg: 'bg-menta/10', text: 'text-menta', border: 'border-menta/20', badge: 'bg-menta/10 text-menta' },
    violeta: { bg: 'bg-violeta/10', text: 'text-violeta', border: 'border-violeta/20', badge: 'bg-violeta/10 text-violeta' }
  };

  return (
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
                <Target className="w-8 h-8 text-turquesa" />
              </div>
              <div>
                <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                  {isEs ? 'Consultoría Estratégica' : 'Strategic Consulting'}
                </span>
                <p className="text-white/60 text-sm">
                  {isEs ? 'Consultoría Empresarial' : 'Business Consulting'}
                </p>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
              {isEs ? 'Estrategia clara que impulsa crecimiento sostenible' : 'Clear strategy that drives sustainable growth'}
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              {isEs 
                ? 'Consultoría estratégica para empresas que necesitan claridad de rumbo: planificación estratégica, diagnóstico organizacional, diseño de estructura organizacional. Estrategia ejecutable que alinea equipos y genera resultados medibles, no PowerPoint que queda en gavetas.'
                : 'Strategic consulting for companies that need direction clarity: strategic planning, organizational diagnosis, organizational structure design. Executable strategy that aligns teams and generates measurable results, not PowerPoint that stays in drawers.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                           font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                           transition-all duration-300 shadow-lg shadow-turquesa/20 group"
              >
                {isEs ? 'Desarrolla tu Estrategia' : 'Develop Your Strategy'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                           text-white font-medium px-6 py-3 rounded-lg 
                           hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                {isEs ? 'Diagnóstico organizacional gratuito' : 'Free organizational diagnosis'}
              </Link>
            </div>

            {/* Stats - Inline Compact */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
              {[
                { value: '25+', label: isEs ? 'planes estratégicos desarrollados' : 'strategic plans developed' },
                { value: 'Ejecutable', label: isEs ? 'estrategia, no teórica' : 'strategy, not theoretical' },
                { icon: true, label: isEs ? 'Enfoque en resultados medibles' : 'Focus on measurable results' }
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

          {/* Right Visual - Strategic Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main Card */}
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
                    {isEs ? 'Roadmap Estratégico' : 'Strategic Roadmap'}
                  </span>
                </div>

                {/* Strategic Objectives Visualization */}
                <div className="space-y-4">
                  {[
                    { label: isEs ? 'Objetivo Financiero' : 'Financial Objective', progress: 85, color: 'turquesa' },
                    { label: isEs ? 'Objetivo Cliente' : 'Client Objective', progress: 75, color: 'menta' },
                    { label: isEs ? 'Objetivo Procesos' : 'Process Objective', progress: 70, color: 'violeta' },
                    { label: isEs ? 'Objetivo Aprendizaje' : 'Learning Objective', progress: 65, color: 'turquesa' }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-white/60 text-sm">{item.label}</span>
                        <span className={`font-bold text-sm ${
                          item.color === 'turquesa' ? 'text-turquesa' :
                          item.color === 'menta' ? 'text-menta' : 'text-violeta'
                        }`}>{item.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 1.5, delay: 0.5 + idx * 0.3 }}
                          className={`h-full ${
                            item.color === 'turquesa' ? 'bg-turquesa' :
                            item.color === 'menta' ? 'bg-menta' : 'bg-violeta'
                          } rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Strategic Pillars */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {[
                    { icon: Target, label: isEs ? 'Visión' : 'Vision', color: 'turquesa' },
                    { icon: TrendingUp, label: isEs ? 'Objetivos' : 'Objectives', color: 'menta' },
                    { icon: BarChart3, label: isEs ? 'KPIs' : 'KPIs', color: 'violeta' },
                    { icon: GitBranch, label: isEs ? 'Ejecución' : 'Execution', color: 'turquesa' }
                  ].map((pillar, idx) => {
                    const Icon = pillar.icon;
                    const colors = colorClasses[pillar.color as keyof typeof colorClasses];
                    return (
                      <motion.div
                        key={idx}
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                        className={`${colors.bg} rounded-xl p-4 text-center`}
                      >
                        <Icon className={`w-6 h-6 ${colors.text} mx-auto mb-2`} />
                        <span className="text-white/70 text-xs">{pillar.label}</span>
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
                <Award className="w-8 h-8 text-azul-marino" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

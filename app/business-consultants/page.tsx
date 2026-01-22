'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { Counter } from '@/components/ui/counter';
import {
  Target,
  TrendingUp,
  Users,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Settings,
  Shield,
  Zap,
  Award,
  Clock
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

const StaggerContainer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function BusinessConsultantsPage() {
  const { t, language } = useI18n();

  const problems = [
    { icon: TrendingUp, title: language === 'es' ? 'Crecimiento Estancado' : 'Stagnant Growth', desc: language === 'es' ? 'Tu empresa no crece al ritmo esperado y necesitas nuevas estrategias' : 'Your company is not growing at the expected pace and needs new strategies' },
    { icon: Settings, title: language === 'es' ? 'Procesos Ineficientes' : 'Inefficient Processes', desc: language === 'es' ? 'Los procesos actuales generan pérdidas de tiempo y recursos' : 'Current processes cause time and resource losses' },
    { icon: Users, title: language === 'es' ? 'Desalineación de Equipos' : 'Team Misalignment', desc: language === 'es' ? 'Los equipos no trabajan hacia los mismos objetivos estratégicos' : 'Teams are not working toward the same strategic objectives' },
    { icon: BarChart3, title: language === 'es' ? 'Falta de Métricas' : 'Lack of Metrics', desc: language === 'es' ? 'No tienes visibilidad clara del rendimiento de tu negocio' : "You don't have clear visibility into your business performance" },
  ];

  const approach = [
    { num: '01', title: language === 'es' ? 'Análisis Profundo' : 'Deep Analysis', desc: language === 'es' ? 'Evaluamos tu situación actual con métodos probados' : 'We evaluate your current situation with proven methods' },
    { num: '02', title: language === 'es' ? 'Plan Personalizado' : 'Custom Plan', desc: language === 'es' ? 'Diseñamos estrategias únicas para tu contexto' : 'We design unique strategies for your context' },
    { num: '03', title: language === 'es' ? 'Implementación Guiada' : 'Guided Implementation', desc: language === 'es' ? 'Te acompañamos en cada paso del proceso' : 'We accompany you every step of the way' },
    { num: '04', title: language === 'es' ? 'Resultados Medibles' : 'Measurable Results', desc: language === 'es' ? 'Garantizamos métricas claras de éxito' : 'We guarantee clear success metrics' },
  ];

  const results = [
    { value: 40, suffix: '%', label: language === 'es' ? 'Aumento en Eficiencia' : 'Efficiency Increase' },
    { value: 60, suffix: '%', label: language === 'es' ? 'Reducción de Costos' : 'Cost Reduction' },
    { value: 3, suffix: 'x', label: language === 'es' ? 'ROI Promedio' : 'Average ROI' },
    { value: 98, suffix: '%', label: language === 'es' ? 'Clientes Satisfechos' : 'Satisfied Clients' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-azul-marino overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-[10%] w-20 h-20 bg-turquesa/20 rounded-xl rotate-12" />
        <div className="absolute bottom-20 left-[5%] w-16 h-16 bg-menta/20 rounded-xl -rotate-6" />
        
        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block text-turquesa font-semibold text-sm uppercase tracking-wider mb-4"
              >
                {language === 'es' ? 'Consultores de Empresas' : 'Business Consultants'}
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight"
              >
                {language === 'es' 
                  ? <>Consultores con <span className="text-turquesa">Enfoque Estratégico</span></>
                  : <>Consultants with <span className="text-turquesa">Strategic Focus</span></>}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-white/70 mb-8 max-w-lg"
              >
                {language === 'es'
                  ? 'Transformamos empresas a través de estrategias personalizadas que generan resultados tangibles y sostenibles.'
                  : 'We transform businesses through personalized strategies that generate tangible and sustainable results.'}
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
                  {language === 'es' ? 'Solicita una Consulta' : 'Request a Consultation'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/consulting-session.jpg"
                    alt={language === 'es' ? 'Sesión de consultoría' : 'Consulting session'}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              
              {/* Floating card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-card rounded-2xl p-5 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-menta rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-azul-marino" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-azul-marino dark:text-white">15+</p>
                    <p className="text-xs text-foreground/60">{language === 'es' ? 'Años de Experiencia' : 'Years Experience'}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 65C1200 70 1320 70 1380 70L1440 70V100H0Z" className="fill-blanco-hueso dark:fill-background"/>
          </svg>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-24 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block text-violeta font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? 'Desafíos Comunes' : 'Common Challenges'}
              </span>
              <h2 className="text-4xl lg:text-5xl font-semibold text-azul-marino dark:text-white mb-6">
                {language === 'es' ? 'Problemas que Resolvemos' : 'Problems We Solve'}
              </h2>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, idx) => {
              const Icon = problem.icon;
              return (
                <StaggerItem key={idx}>
                  <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-2 border border-gris-arena/20 dark:border-white/10 h-full">
                    <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-turquesa" />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">{problem.title}</h3>
                    <p className="text-foreground/60">{problem.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-24 bg-white dark:bg-card/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-block text-oliva font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? 'Nuestro Enfoque' : 'Our Approach'}
              </span>
              <h2 className="text-4xl lg:text-5xl font-semibold text-azul-marino dark:text-white mb-6">
                {language === 'es' ? 'Metodología Probada' : 'Proven Methodology'}
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                {language === 'es'
                  ? 'Aplicamos un enfoque sistemático y personalizado que garantiza resultados medibles para tu empresa.'
                  : 'We apply a systematic and personalized approach that guarantees measurable results for your company.'}
              </p>
              
              <div className="space-y-6">
                {approach.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-turquesa font-bold">{step.num}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-1">{step.title}</h4>
                      <p className="text-foreground/60 text-sm">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src="/images/team-working.jpg"
                      alt={language === 'es' ? 'Equipo trabajando' : 'Team working'}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-menta rounded-xl -z-10" />
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-turquesa/30 rounded-xl -z-10" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-turquesa">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((stat, idx) => (
              <StaggerItem key={idx}>
                <div className="text-center">
                  <div className="text-5xl lg:text-6xl font-bold text-azul-marino mb-2">
                    <Counter end={stat.value} suffix={stat.suffix} duration={2} />
                  </div>
                  <p className="text-azul-marino/80 font-medium">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-azul-marino rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-turquesa/10 rounded-bl-[200px]" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-menta/10 rounded-tr-[150px]" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-6">
                  {language === 'es' 
                    ? '¿Listo para Transformar tu Empresa?'
                    : 'Ready to Transform Your Business?'}
                </h2>
                <p className="text-white/70 mb-8">
                  {language === 'es'
                    ? 'Agenda una sesión estratégica gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos.'
                    : 'Schedule a free strategy session and discover how we can help you achieve your goals.'}
                </p>
                <Link 
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-turquesa text-azul-marino font-semibold px-8 py-4 rounded-xl hover:bg-menta transition-all duration-300"
                >
                  {language === 'es' ? 'Comienza Ahora' : 'Start Now'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

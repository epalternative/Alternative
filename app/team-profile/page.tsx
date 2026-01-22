'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import {
  ArrowRight,
  HeartHandshake,
  Lightbulb,
  Shield,
  Award,
  Linkedin,
  CheckCircle2
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

export default function TeamProfilePage() {
  const { language } = useI18n();

  const values = [
    { icon: HeartHandshake, title: language === 'es' ? 'Compromiso' : 'Commitment', desc: language === 'es' ? 'Acompañamos a nuestros clientes en todo el proceso' : 'We accompany our clients throughout the process', color: 'bg-menta' },
    { icon: Lightbulb, title: language === 'es' ? 'Innovación' : 'Innovation', desc: language === 'es' ? 'Buscamos soluciones prácticas y efectivas' : 'We seek practical and effective solutions', color: 'bg-turquesa' },
    { icon: Shield, title: language === 'es' ? 'Confianza' : 'Trust', desc: language === 'es' ? 'Construimos relaciones basadas en transparencia' : 'We build relationships based on transparency', color: 'bg-violeta' },
    { icon: Award, title: language === 'es' ? 'Excelencia' : 'Excellence', desc: language === 'es' ? 'Buscamos la máxima calidad en cada proyecto' : 'We seek the highest quality in every project', color: 'bg-lavanda' },
  ];

  const team = [
    { name: 'Carlos Martínez', role: language === 'es' ? 'Director General' : 'Managing Director', bio: language === 'es' ? 'Más de 20 años de experiencia en consultoría estratégica y transformación empresarial.' : 'Over 20 years of experience in strategic consulting and business transformation.', image: '/logo_22.jpeg' },
    { name: 'Ana Rodríguez', role: language === 'es' ? 'Directora de Operaciones' : 'Operations Director', bio: language === 'es' ? 'Especialista en optimización de procesos y gestión de calidad con certificaciones ISO.' : 'Specialist in process optimization and quality management with ISO certifications.', image: '/logo_23.jpeg' },
    { name: 'Roberto Silva', role: language === 'es' ? 'Director de Tecnología' : 'Technology Director', bio: language === 'es' ? 'Líder en transformación digital y arquitectura de soluciones empresariales.' : 'Leader in digital transformation and enterprise solutions architecture.', image: '/logo_24.jpeg' },
    { name: 'María Gómez', role: language === 'es' ? 'Gerente de Proyectos' : 'Project Manager', bio: language === 'es' ? 'Certificada PMP con amplia experiencia en gestión de proyectos complejos.' : 'PMP certified with extensive experience in complex project management.', image: '/logo_25.jpeg' },
  ];

  const credentials = [
    'ISO 9001 Lead Auditor',
    'PMP - Project Management Professional',
    'ITIL Foundation',
    'Scrum Master Certified',
    'Six Sigma Green Belt',
    'AWS Solutions Architect',
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-azul-marino overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="absolute top-20 right-[10%] w-20 h-20 bg-menta/20 rounded-xl rotate-12" />
        <div className="absolute bottom-20 left-[5%] w-16 h-16 bg-violeta/20 rounded-xl -rotate-6" />
        
        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-menta font-semibold text-sm uppercase tracking-wider mb-4"
            >
              {language === 'es' ? 'Nuestro Equipo' : 'Our Team'}
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6"
            >
              {language === 'es' 
                ? <>Expertos <span className="text-menta">Comprometidos</span> con tu Éxito</>
                : <>Experts <span className="text-menta">Committed</span> to Your Success</>}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-white/70"
            >
              {language === 'es'
                ? 'Un equipo de profesionales apasionados por impulsar el crecimiento de tu empresa.'
                : 'A team of professionals passionate about driving your company\'s growth.'}
            </motion.p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 65C1200 70 1320 70 1380 70L1440 70V100H0Z" className="fill-blanco-hueso dark:fill-background"/>
          </svg>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block text-turquesa font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? 'Nuestros Valores' : 'Our Values'}
              </span>
              <h2 className="text-4xl font-semibold text-azul-marino dark:text-white">
                {language === 'es' ? 'Lo Que Nos Define' : 'What Defines Us'}
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-card rounded-2xl p-8 shadow-brand hover:shadow-brand-md transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  <div className={`w-14 h-14 ${value.color} rounded-xl flex items-center justify-center mx-auto mb-5`}>
                    <Icon className="w-7 h-7 text-azul-marino" />
                  </div>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">{value.title}</h3>
                  <p className="text-foreground/60">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white dark:bg-card/50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block text-violeta font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? 'Conoce al Equipo' : 'Meet the Team'}
              </span>
              <h2 className="text-4xl font-semibold text-azul-marino dark:text-white">
                {language === 'es' ? 'Nuestros Líderes' : 'Our Leaders'}
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative mb-6 rounded-2xl overflow-hidden aspect-[3/4]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-azul-marino/0 group-hover:bg-azul-marino/40 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                    <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-azul-marino hover:bg-turquesa transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-1">{member.name}</h3>
                <p className="text-turquesa font-medium text-sm mb-3">{member.role}</p>
                <p className="text-foreground/60 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-24 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-block text-oliva font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'es' ? 'Credenciales' : 'Credentials'}
              </span>
              <h2 className="text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {language === 'es' ? 'Certificaciones y Expertise' : 'Certifications & Expertise'}
              </h2>
              <p className="text-foreground/70 mb-8">
                {language === 'es'
                  ? 'Nuestro equipo cuenta con certificaciones reconocidas internacionalmente que garantizan la calidad de nuestros servicios.'
                  : 'Our team holds internationally recognized certifications that guarantee the quality of our services.'}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {credentials.map((credential, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-oliva flex-shrink-0" />
                    <span className="text-foreground/80">{credential}</span>
                  </div>
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
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-oliva rounded-xl -z-10" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-violeta">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-6">
                {language === 'es' ? '¿Listo para Conocernos?' : 'Ready to Meet Us?'}
              </h2>
              <p className="text-white/70 mb-8">
                {language === 'es'
                  ? 'Agenda una reunión con nuestro equipo y descubre cómo podemos ayudarte.'
                  : 'Schedule a meeting with our team and discover how we can help you.'}
              </p>
              <Link 
                href="/contact"
                className="group inline-flex items-center gap-3 bg-white text-violeta font-semibold px-8 py-4 rounded-xl hover:bg-menta hover:text-azul-marino transition-all duration-300"
              >
                {language === 'es' ? 'Agenda una Reunión' : 'Schedule a Meeting'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

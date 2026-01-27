'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import {
  Rocket,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Building2,
  Phone,
  Zap,
  Globe,
  Shield,
  BarChart3,
  Users,
  CreditCard,
  Smartphone
} from 'lucide-react';

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
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerContainer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function TransformacionDigitalBancariaPage() {
  const locale = useLocale();
  const isEs = locale === 'es';

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Industrias' : 'Industries', href: `/${locale}/industrias` },
    { label: isEs ? 'Banca y Servicios Financieros' : 'Banking & Financial Services', href: `/${locale}/industrias/banca-servicios-financieros` },
    { label: isEs ? 'Transformación Digital Bancaria' : 'Banking Digital Transformation', href: null }
  ];

  const tiposProyectos = [
    {
      icon: Users,
      title: isEs ? 'Onboarding Digital de Clientes' : 'Digital Customer Onboarding',
      description: isEs
        ? 'Apertura de cuentas 100% digital sin visitar sucursal. Integración con validación de identidad (OCR de cédula, biometría facial, validación AML), firma digital, activación inmediata de cuenta.'
        : '100% digital account opening without visiting branch. Integration with identity validation (ID OCR, facial biometrics, AML validation), digital signature, immediate account activation.',
      duration: isEs ? '4-8 meses' : '4-8 months',
      reto: isEs ? 'Cumplir KYC regulatorio en proceso digital' : 'Comply with regulatory KYC in digital process'
    },
    {
      icon: Smartphone,
      title: isEs ? 'Banca Móvil / Internet Banking' : 'Mobile Banking / Internet Banking',
      description: isEs
        ? 'Desarrollo o actualización de app móvil y web banking. Funcionalidades: consultas, transferencias, pagos de servicios, inversiones, solicitudes de crédito. Integración con core bancario.'
        : 'Mobile app and web banking development or update. Features: inquiries, transfers, bill payments, investments, loan applications. Core banking integration.',
      duration: isEs ? '6-12 meses' : '6-12 months',
      reto: isEs ? 'Enfoque en UX/seguridad' : 'Focus on UX/security'
    },
    {
      icon: Zap,
      title: isEs ? 'Pagos Instantáneos' : 'Instant Payments',
      description: isEs
        ? 'Implementación de ACH Instantáneo, transferencias peer-to-peer, QR payments. Integración con infraestructura nacional de pagos.'
        : 'ACH Instant implementation, peer-to-peer transfers, QR payments. Integration with national payment infrastructure.',
      duration: isEs ? '3-6 meses' : '3-6 months',
      reto: isEs ? 'Integración con infraestructura de pagos' : 'Payment infrastructure integration'
    },
    {
      icon: BarChart3,
      title: isEs ? 'Digitalización de Procesos Core' : 'Core Process Digitization',
      description: isEs
        ? 'Automatizar procesos que hoy son manuales: aprobaciones de crédito con scoring automático, conciliaciones automáticas, reportería regulatoria automatizada.'
        : 'Automate processes that are currently manual: credit approvals with automatic scoring, automatic reconciliations, automated regulatory reporting.',
      duration: isEs ? '4-8 meses' : '4-8 months',
      reto: isEs ? 'Automatización sin perder control' : 'Automation without losing control'
    },
    {
      icon: Globe,
      title: isEs ? 'APIs Bancarias y Open Banking' : 'Banking APIs and Open Banking',
      description: isEs
        ? 'Desarrollo de APIs para ecosistema fintech: APIs de pagos, APIs de información de cuentas, integración con partners.'
        : 'API development for fintech ecosystem: payment APIs, account information APIs, partner integration.',
      duration: isEs ? '3-6 meses' : '3-6 months',
      reto: isEs ? 'Seguridad y estándares' : 'Security and standards'
    }
  ];

  return (
    <>
      <ReadingProgress />

      {/* HERO SECTION */}
      <section className="relative bg-turquesa overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[10%] w-40 h-40 bg-azul-marino/10 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[8%] w-32 h-32 bg-menta/20 rounded-full blur-2xl"
          />
        </div>

        <div className="container-custom relative z-10 pt-8 pb-16 lg:pb-20">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {idx > 0 && <ChevronDown className="w-4 h-4 text-azul-marino/40 -rotate-90" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="text-azul-marino/60 hover:text-azul-marino transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-azul-marino font-medium">{crumb.label}</span>
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
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-azul-marino/20 rounded-2xl flex items-center justify-center border border-azul-marino/30">
                  <Rocket className="w-8 h-8 text-azul-marino" />
                </div>
                <div>
                  <span className="text-azul-marino text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Transformación Digital Bancaria' : 'Banking Digital Transformation'}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl text-azul-marino font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Estrategia y ejecución de proyectos de transformación digital para bancos'
                  : 'Strategy and execution of digital transformation projects for banks'}
              </h1>

              <p className="text-lg md:text-xl text-azul-marino/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Gestión de proyectos digitales bancarios: banca móvil, onboarding digital, pagos instantáneos, digitalización de procesos core. PM certificados + consultores especializados que entienden balance entre innovación digital y gestión de riesgos financieros.'
                  : 'Banking digital project management: mobile banking, digital onboarding, instant payments, core process digitization. Certified PMs + specialized consultants who understand balance between digital innovation and financial risk management.'}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-azul-marino text-white font-semibold px-6 py-3 rounded-lg hover:bg-azul-marino/90 transition-all duration-300 shadow-lg shadow-azul-marino/20 group"
                >
                  {isEs ? 'Solicita Consultoría en Digital Bancario' : 'Request Banking Digital Consulting'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Right Visual - Digital Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-azul-marino/20 relative shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-turquesa" />
                    <div className="w-3 h-3 rounded-full bg-menta" />
                    <div className="w-3 h-3 rounded-full bg-violeta" />
                    <span className="ml-auto text-azul-marino/40 text-sm font-medium">
                      {isEs ? 'Digital Banking' : 'Digital Banking'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: isEs ? 'Onboarding Digital' : 'Digital Onboarding', icon: Users, value: '8 min' },
                      { label: isEs ? 'Banca Móvil' : 'Mobile Banking', icon: Smartphone, value: '100%' },
                      { label: isEs ? 'Pagos Instantáneos' : 'Instant Payments', icon: Zap, value: '24/7' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-turquesa/10 rounded-xl p-4 border border-turquesa/20">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <item.icon className="w-5 h-5 text-azul-marino" />
                            <span className="text-sm text-azul-marino/70">{item.label}</span>
                          </div>
                          <span className="text-lg font-bold text-azul-marino">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-turquesa rounded-2xl p-4 shadow-xl"
                >
                  <Rocket className="w-8 h-8 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-4xl mx-auto">
            <p className="text-lg text-azul-marino/70 leading-relaxed">
              {isEs 
                ? 'Transformación digital en banca no es opcional; es supervivencia. Clientes esperan experiencia digital comparable a fintechs: abrir cuenta en 5 minutos desde móvil, transferir instantáneamente, consultar saldo con biometría. Bancos tradicionales enfrentan desafío: modernizar tecnología legacy de 20+ años, digitalizar procesos diseñados para papel, competir con fintechs ágiles, todo mientras mantienen operación 24/7 sin riesgo y cumplen regulación estricta. Alternative gestiona proyectos de transformación digital bancaria exitosamente: combinamos gestión de proyectos disciplinada (PMs PMP®) con expertise en tecnologías digitales y conocimiento profundo de operación bancaria regulada.'
                : 'Digital transformation in banking is not optional; it is survival. Customers expect digital experience comparable to fintechs: open account in 5 minutes from mobile, transfer instantly, check balance with biometrics. Traditional banks face challenge: modernize 20+ year legacy technology, digitize processes designed for paper, compete with agile fintechs, all while maintaining 24/7 risk-free operation and complying with strict regulation. Alternative successfully manages banking digital transformation projects: we combine disciplined project management (PMP® PMs) with digital technology expertise and deep knowledge of regulated banking operations.'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CÓMO ALTERNATIVE AYUDA */}
      <section className="py-20 lg:py-32 bg-turquesa/5">
        <div className="container-custom">
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino mb-4">
              {isEs ? 'Servicios de transformación digital para instituciones financieras' : 'Digital transformation services for financial institutions'}
            </h2>
          </AnimatedSection>

          {/* Estrategia Digital */}
          <AnimatedSection className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-brand border border-gris-arena/20">
              <h3 className="text-2xl font-semibold text-azul-marino mb-6">
                {isEs ? 'ESTRATEGIA DIGITAL BANCARIA' : 'BANKING DIGITAL STRATEGY'}
              </h3>
              <p className="text-azul-marino/70 mb-6">
                {isEs 
                  ? 'Desarrollo de estrategia digital 2-3 años: evaluación de madurez digital actual, identificación de iniciativas prioritarias (onboarding, canales digitales, pagos, analytics), roadmap de implementación, business cases de iniciativas top, estimación de inversión requerida.'
                  : '2-3 year digital strategy development: current digital maturity evaluation, priority initiative identification (onboarding, digital channels, payments, analytics), implementation roadmap, top initiative business cases, required investment estimation.'}
              </p>
              <div>
                <div className="text-turquesa font-semibold text-sm mb-3">
                  {isEs ? 'Entregables:' : 'Deliverables:'}
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    isEs ? 'Evaluación de madurez digital (benchmark vs competencia)' : 'Digital maturity evaluation (benchmark vs competition)',
                    isEs ? 'Estrategia digital con visión y objetivos' : 'Digital strategy with vision and objectives',
                    isEs ? 'Roadmap de iniciativas priorizadas' : 'Prioritized initiative roadmap',
                    isEs ? 'Business cases con ROI estimado' : 'Business cases with estimated ROI',
                    isEs ? 'Arquitectura tecnológica de alto nivel' : 'High-level technology architecture'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0 mt-0.5" />
                      <span className="text-azul-marino/70 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Tipos de Proyectos */}
          <AnimatedSection className="mb-12">
            <h3 className="text-2xl font-semibold text-azul-marino mb-6">
              {isEs ? 'GESTIÓN DE PROYECTOS DIGITALES BANCARIOS' : 'BANKING DIGITAL PROJECT MANAGEMENT'}
            </h3>
            <StaggerContainer className="space-y-6">
              {tiposProyectos.map((proyecto, idx) => (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="bg-white rounded-2xl p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300 border border-gris-arena/20"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <proyecto.icon className="w-7 h-7 text-turquesa" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-azul-marino mb-2">
                          {proyecto.title}
                        </h4>
                        <p className="text-azul-marino/70 mb-4">
                          {proyecto.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-turquesa">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-azul-marino/70">{isEs ? 'Duración:' : 'Duration:'} {proyecto.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-turquesa">
                            <Shield className="w-4 h-4" />
                            <span className="text-azul-marino/70">{isEs ? 'Reto:' : 'Challenge:'} {proyecto.reto}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatedSection>

          {/* Gestión de Riesgos */}
          <AnimatedSection>
            <div className="bg-white rounded-2xl p-8 shadow-brand border border-gris-arena/20">
              <h3 className="text-2xl font-semibold text-azul-marino mb-6">
                {isEs ? 'GESTIÓN DE RIESGOS DIGITALES' : 'DIGITAL RISK MANAGEMENT'}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: isEs ? 'Seguridad y Ciberseguridad' : 'Security and Cybersecurity',
                    items: [
                      isEs ? 'Diseño con seguridad desde inicio (security by design)' : 'Design with security from start (security by design)',
                      isEs ? 'Testing de penetración' : 'Penetration testing',
                      isEs ? 'Cumplimiento de estándares (PCI-DSS para pagos)' : 'Standard compliance (PCI-DSS for payments)',
                      isEs ? 'Gestión de vulnerabilidades' : 'Vulnerability management'
                    ]
                  },
                  {
                    title: isEs ? 'Continuidad Operacional' : 'Operational Continuity',
                    items: [
                      isEs ? 'Plan de rollback si proyecto falla en producción' : 'Rollback plan if project fails in production',
                      isEs ? 'Ambientes de contingencia' : 'Contingency environments',
                      isEs ? 'Testing de alta disponibilidad' : 'High availability testing',
                      isEs ? 'Monitoreo 24/7 post go-live' : '24/7 monitoring post go-live'
                    ]
                  },
                  {
                    title: isEs ? 'Cumplimiento Regulatorio' : 'Regulatory Compliance',
                    items: [
                      isEs ? 'KYC digital cumpliendo regulación SBP' : 'Digital KYC complying with SBP regulation',
                      isEs ? 'Almacenamiento de evidencia' : 'Evidence storage',
                      isEs ? 'Reportería regulatoria desde canales digitales' : 'Regulatory reporting from digital channels'
                    ]
                  },
                  {
                    title: isEs ? 'Gestión del Cambio' : 'Change Management',
                    items: [
                      isEs ? 'Capacitación a personal bancario (call center, sucursales)' : 'Banking staff training (call center, branches)',
                      isEs ? 'Comunicación a clientes de nuevas funcionalidades' : 'Customer communication of new features',
                      isEs ? 'Soporte intensivo post-lanzamiento' : 'Intensive post-launch support'
                    ]
                  }
                ].map((riesgo, idx) => (
                  <div key={idx} className="bg-turquesa/5 rounded-xl p-6 border border-turquesa/20">
                    <h4 className="font-semibold text-azul-marino mb-4">{riesgo.title}</h4>
                    <ul className="space-y-2">
                      {riesgo.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0 mt-0.5" />
                          <span className="text-azul-marino/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CASO DE ÉXITO */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-blanco-hueso rounded-3xl p-8 lg:p-12 overflow-hidden relative shadow-brand-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa font-medium text-sm uppercase tracking-wider">
                    {isEs ? 'Caso de Éxito' : 'Success Story'}
                  </span>
                  <h3 className="text-xl font-semibold text-azul-marino">
                    {isEs ? 'Banco lanza onboarding digital y adquiere 40% de clientes nuevos por canal digital' : 'Bank launches digital onboarding and acquires 40% of new customers through digital channel'}
                  </h3>
                </div>
              </div>

              <div className="space-y-6 text-azul-marino/70">
                <div>
                  <h4 className="font-semibold text-azul-marino mb-2">{isEs ? 'Situación' : 'Situation'}</h4>
                  <p>
                    {isEs 
                      ? 'Banco regional (8 sucursales) con proceso de apertura de cuentas 100% presencial: cliente visita sucursal con documentos físicos, ejecutivo ingresa datos manualmente, proceso toma 45-60 minutos, cliente regresa días después por tarjeta. Competencia (fintechs y bancos digitales) ofreciendo apertura en 5 minutos desde móvil. Banco perdiendo clientes jóvenes (18-35 años) que no quieren ir a sucursal.'
                      : 'Regional bank (8 branches) with 100% in-person account opening process: customer visits branch with physical documents, executive manually enters data, process takes 45-60 minutes, customer returns days later for card. Competition (fintechs and digital banks) offering opening in 5 minutes from mobile. Bank losing young customers (18-35 years) who don\'t want to go to branch.'}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-azul-marino mb-2">{isEs ? 'Objetivo' : 'Objective'}</h4>
                  <p>
                    {isEs 
                      ? 'Lanzar onboarding digital: apertura de cuenta 100% online sin visitar sucursal, en menos de 10 minutos, cumpliendo regulación KYC de SBP.'
                      : 'Launch digital onboarding: 100% online account opening without visiting branch, in less than 10 minutes, complying with SBP KYC regulation.'}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-azul-marino mb-2">{isEs ? 'Solución Alternative' : 'Alternative Solution'}</h4>
                  <p className="mb-3">
                    {isEs 
                      ? 'Proyecto de 7 meses (PM Alternative + equipo desarrollo):'
                      : '7-month project (Alternative PM + development team):'}
                  </p>
                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    {[
                      {
                        mes: isEs ? 'Mes 1-2' : 'Month 1-2',
                        accion: isEs ? 'Diseño de solución - Arquitectura, integración OCR/biometría, UX/UI, validación legal/cumplimiento' : 'Solution design - Architecture, OCR/biometrics integration, UX/UI, legal/compliance validation'
                      },
                      {
                        mes: isEs ? 'Mes 3-5' : 'Month 3-5',
                        accion: isEs ? 'Desarrollo - App móvil + web, backend integrado, firma digital, tarjeta virtual' : 'Development - Mobile app + web, integrated backend, digital signature, virtual card'
                      },
                      {
                        mes: isEs ? 'Mes 6' : 'Month 6',
                        accion: isEs ? 'Testing y piloto - Testing exhaustivo, piloto con 50 clientes internos' : 'Testing and pilot - Exhaustive testing, pilot with 50 internal customers'
                      },
                      {
                        mes: isEs ? 'Mes 7' : 'Month 7',
                        accion: isEs ? 'Lanzamiento - Go-live con campaña digital, monitoreo intensivo' : 'Launch - Go-live with digital campaign, intensive monitoring'
                      }
                    ].map((fase, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-4 border border-turquesa/20">
                        <div className="text-turquesa font-bold mb-2">{fase.mes}</div>
                        <div className="text-sm text-azul-marino/70">{fase.accion}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-azul-marino mb-2">{isEs ? 'Resultados (6 meses post-lanzamiento)' : 'Results (6 months post-launch)'}</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { value: '1,200', label: isEs ? 'cuentas abiertas por canal digital (40% de cuentas nuevas)' : 'accounts opened through digital channel (40% of new accounts)' },
                      { value: '8 min', label: isEs ? 'Tiempo apertura (vs 60 min presencial)' : 'Opening time (vs 60 min in-person)' },
                      { value: '28 años', label: isEs ? 'Edad promedio clientes digitales (vs 42 años presencial)' : 'Average age digital customers (vs 42 years in-person)' },
                      { value: '78', label: isEs ? 'NPS (vs 45 presencial)' : 'NPS (vs 45 in-person)' },
                      { value: '-60%', label: isEs ? 'Costo adquisición (sin personal sucursal)' : 'Acquisition cost (without branch staff)' },
                      { value: '✅', label: isEs ? 'Competitividad: Recuperaron cuota de mercado jóvenes' : 'Competitiveness: Recovered young market share' }
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-4 border border-turquesa/20 text-center">
                        <div className="text-2xl font-bold text-turquesa mb-1">{stat.value}</div>
                        <div className="text-xs text-azul-marino/70">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-azul-marino/70">
                  {isEs 
                    ? '"Onboarding digital nos hizo competitivos vs fintechs. 40% de clientes nuevos ya no van a sucursal. Proyecto gestionado impecablemente por Alternative."'
                    : '"Digital onboarding made us competitive vs fintechs. 40% of new customers no longer go to branch. Project impeccably managed by Alternative."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">
                    — {isEs ? 'Gerente de Innovación Digital' : 'Digital Innovation Manager'}
                  </span>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 lg:py-32 bg-violeta relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-turquesa/10 rounded-full blur-2xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs ? '¿Tu banco necesita acelerar transformación digital?' : 'Does your bank need to accelerate digital transformation?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Consulta gratuita de 30 minutos. Evaluamos madurez digital actual y recomendamos iniciativas prioritarias con mayor ROI.'
                  : 'Free 30-minute consultation. We evaluate current digital maturity and recommend priority initiatives with highest ROI.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Evaluación de madurez digital (benchmark)' : 'Digital maturity evaluation (benchmark)',
                  isEs ? 'Identificación de iniciativas prioritarias' : 'Priority initiative identification',
                  isEs ? 'Estimación de inversión y timeline' : 'Investment and timeline estimation',
                  isEs ? 'Casos de éxito relevantes' : 'Relevant success cases',
                  isEs ? 'Propuesta de proyecto' : 'Project proposal'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/${locale}/contacto`}
                    className="inline-flex items-center gap-3 bg-turquesa text-azul-marino font-semibold px-8 py-4 rounded-lg hover:bg-menta transition-all duration-300 shadow-lg group"
                  >
                    {isEs ? 'Solicitar Consultoría Digital Bancaria' : 'Request Banking Digital Consulting'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href="https://wa.me/50769908906"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white font-medium px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                  >
                    <Phone className="w-5 h-5" />
                    WhatsApp
                  </a>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

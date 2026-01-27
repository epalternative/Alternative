'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { IndustrySidebar } from '@/components/ui/industry-sidebar';
import {
  ArrowRight,
  ChevronDown,
  Target,
  ShoppingBag,
  Link2,
  CheckCircle2,
  Phone,
  ShoppingCart,
  Package,
  DollarSign,
  BarChart3,
  Zap,
  Users,
  Sparkles,
  Layers,
} from 'lucide-react';

const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
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
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <motion.div className="border-b border-gris-arena/20 last:border-0" initial={false}>
    <button
      onClick={onClick}
      className="w-full py-6 flex items-center justify-between text-left group"
    >
      <span className="text-lg font-semibold text-azul-marino dark:text-white group-hover:text-turquesa transition-colors pr-8">
        {question}
      </span>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
        <ChevronDown className="w-5 h-5 text-turquesa" />
      </motion.div>
    </button>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <p className="pb-6 text-foreground/70 leading-relaxed">{answer}</p>
    </motion.div>
  </motion.div>
);

export default function RetailComercioPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Industrias' : 'Industries', href: `/${locale}/industrias` },
    { label: isEs ? 'Retail y Comercio' : 'Retail & Commerce', href: null },
  ];

  const desafios = [
    {
      icon: ShoppingCart,
      title: 'Omnicanalidad: integrar físico + digital',
      desc: 'Clientes compran online/recogen tienda, compran tienda/envío a casa, ven inventario web antes de visitar tienda. Sistemas (POS, e-commerce, inventario) deben estar integrados en tiempo real.',
    },
    {
      icon: Package,
      title: 'Gestión de inventario multicanal',
      desc: 'Inventario compartido entre tiendas + e-commerce. Visibilidad en tiempo real crítica (evitar vender producto sin stock). Logística inversa (devoluciones de cualquier canal).',
    },
    {
      icon: DollarSign,
      title: 'Márgenes bajo presión',
      desc: 'Competencia con Amazon/marketplaces baja precios. Necesidad de optimizar costos operativos: procesos eficientes, reducir merma, automatizar trabajo manual.',
    },
    {
      icon: BarChart3,
      title: 'Datos de clientes dispersos',
      desc: 'Compras en tienda física, compras online, interacciones redes sociales. Sin visión 360° de cliente. Oportunidad: análisis de datos para personalización, fidelización, cross-selling.',
    },
    {
      icon: Zap,
      title: 'Time-to-market de promociones',
      desc: 'Black Friday, Cyber Monday, campañas estacionales requieren lanzar promociones rápidamente. Sistemas lentos pierden ventana de oportunidad.',
    },
    {
      icon: Users,
      title: 'Experiencia de cliente vs eficiencia operativa',
      desc: 'Balance difícil: experiencia excepcional (personal dedicado, inventario amplio) vs eficiencia (reducir personal, optimizar inventario). Digitalización ayuda a balancear.',
    },
  ];

  const faqs = [
    {
      question: '¿Build vs buy para e-commerce: desarrollar custom o usar Shopify/WooCommerce?',
      answer:
        'Plataforma comercial (Shopify, WooCommerce, Magento) cuando: Catálogo estándar (<10K SKUs), funcionalidades estándar, presupuesto moderado, lanzamiento rápido (3-6 meses). Desarrollo custom cuando: Procesos muy específicos, catálogo masivo con complejidad (50K+ SKUs con variantes complejas), integraciones complejas con sistemas legacy, presupuesto permite. Recomendación Alternative: 80% casos Shopify Plus o similar es suficiente y más rápido.',
    },
    {
      question: '¿Cómo manejan integración con inventario de tiendas físicas?',
      answer:
        'Integración crítica para omnicanalidad. Opciones: (1) API directa entre e-commerce y ERP/sistema inventario (tiempo real), (2) Sincronización periódica cada 15-30 min (near real-time, suficiente para mayoría). Desafío: Reservas de inventario (cliente agrega a carrito pero no compra por 15 min). Implementamos lógica de reserva temporal + liberación automática. Testing exhaustivo para evitar overselling (vender producto sin stock).',
    },
    {
      question: '¿Alternative solo gestiona proyecto o también desarrolla e-commerce?',
      answer:
        'Ambos modelos: (1) Solo PM: Gestionamos proyecto, cliente/vendor desarrolla plataforma. Coordinamos entre stakeholders, vendors, equipos internos. (2) PM + desarrollo: Alternative gestiona Y desarrolla plataforma completa (más común). Ventaja: un solo proveedor responsable (no coordinación entre PM externo y developer externo). Cliente decide según capacidades internas.',
    },
    {
      question: '¿Qué hacer con tiendas físicas al lanzar e-commerce? ¿Canibalizan ventas?',
      answer:
        'Preocupación común de retailers tradicionales. Realidad: E-commerce expande mercado (alcanza clientes que no visitan tienda física por distancia/tiempo) + captura ventas que irían a competencia online. Canibalización: Existe (10-20% ventas online son de clientes que hubieran comprado en tienda) pero crecimiento total compensa con creces. Estrategia omnicanal mitiga: click & collect incentiva visita a tienda (cross-selling adicional), tiendas como showrooms, personal tienda comisiona por ventas online generadas.',
    },
  ];

  const contactSubject = isEs ? 'PM Proyecto Retail' : 'Retail PM Project';
  const contactUrl = `/${locale}/contacto?subject=${encodeURIComponent(contactSubject)}`;

  return (
    <>
      <ReadingProgress />
      <IndustrySidebar locale={locale} currentIndustry="retail-comercio" />

      {/* HERO - Turquesa */}
      <section className="relative bg-turquesa overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] right-[10%] w-40 h-40 bg-azul-marino/10 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-[20%] left-[8%] w-32 h-32 bg-menta/10 rounded-full blur-2xl animate-float-slow" />
          <div className="absolute top-[55%] right-[25%] w-24 h-24 bg-violeta/10 rounded-2xl rotate-12 animate-float" />
        </div>

        <div className="container-custom relative z-10 pt-8 pb-16 lg:pb-20">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
            aria-label="Breadcrumb"
          >
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {idx > 0 && <ChevronDown className="w-4 h-4 text-azul-marino/50 -rotate-90" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="text-azul-marino/70 hover:text-azul-marino transition-colors">
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-azul-marino/10 text-azul-marino rounded-full text-sm font-medium uppercase tracking-wider mb-6">
                Sector Retail y Comercio
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-azul-marino font-semibold leading-tight mb-4">
                Consultoría para retail: transformación digital y omnicanalidad
              </h1>
              <p className="text-lg md:text-xl text-azul-marino/80 mb-8 leading-relaxed">
                Gestión de proyectos de transformación digital retail, e-commerce, integración omnicanal, optimización
                de operaciones. PMs certificados que entienden la complejidad de operar tiendas físicas + canales
                digitales simultáneamente.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={contactUrl}
                  className="inline-flex items-center gap-2 bg-azul-marino text-white font-semibold px-6 py-3 rounded-lg hover:bg-azul-marino/90 transition-all duration-300 shadow-lg group"
                >
                  Solicita PM para Proyecto Retail
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/casos-exito`}
                  className="inline-flex items-center gap-2 border-2 border-azul-marino text-azul-marino font-medium px-6 py-3 rounded-lg hover:bg-azul-marino/10 transition-all duration-300"
                >
                  Ver casos retail
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-azul-marino/20">
                {[
                  { value: 'Transformación digital retail', icon: Sparkles },
                  { value: 'E-commerce + omnicanalidad', icon: ShoppingBag },
                  { value: '15+ proyectos retail', icon: Layers },
                ].map((s, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <s.icon className="w-4 h-4 text-azul-marino" />
                    <span className="text-azul-marino/70 text-sm">{s.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual - Retail / Omnicanal Animated */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-azul-marino/10 backdrop-blur-xl rounded-3xl p-8 border border-azul-marino/20 relative"
                >
                  {/* Window Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-turquesa" />
                    <div className="w-3 h-3 rounded-full bg-menta" />
                    <div className="w-3 h-3 rounded-full bg-violeta" />
                    <span className="ml-auto text-azul-marino/60 text-sm font-medium">
                      Retail · Omnicanal
                    </span>
                  </div>

                  {/* Metrics / Progress */}
                  <div className="space-y-3 font-mono text-xs">
                    {[
                      { label: 'E-commerce', progress: 100, color: 'turquesa' },
                      { label: 'Omnicanalidad', progress: 95, color: 'menta' },
                      { label: 'Inventario unificado', progress: 90, color: 'violeta' },
                      { label: 'Transformación digital', progress: 85, color: 'turquesa' },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-azul-marino/80">{item.label}</span>
                          <span
                            className={`font-bold ${
                              item.color === 'turquesa'
                                ? 'text-turquesa'
                                : item.color === 'menta'
                                  ? 'text-menta'
                                  : 'text-violeta'
                            }`}
                          >
                            {item.progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-azul-marino/20 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ duration: 1.5, delay: 0.5 + idx * 0.3 }}
                            className={`h-full rounded-full ${
                              item.color === 'turquesa'
                                ? 'bg-turquesa'
                                : item.color === 'menta'
                                  ? 'bg-menta'
                                  : 'bg-violeta'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Canales */}
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {['Tienda', 'Web', 'Móvil'].map((channel, idx) => (
                      <motion.div
                        key={idx}
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                        className="bg-azul-marino/10 rounded-lg p-2 text-center border border-azul-marino/10"
                      >
                        <span className="text-azul-marino/90 text-xs font-medium">{channel}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-azul-marino rounded-2xl p-4 shadow-xl"
                >
                  <ShoppingCart className="w-8 h-8 text-turquesa" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* POR QUÉ ALTERNATIVE */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
              Entendemos los desafíos del comercio moderno
            </h2>
          </AnimatedSection>
          <AnimatedSection className="max-w-4xl mx-auto mb-12">
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                Retail atraviesa transformación sin precedentes: clientes esperan experiencia omnicanal fluida (comprar
                online/recoger en tienda, ver inventario en tiempo real, devolver en cualquier canal), competencia con
                marketplaces (Amazon, Mercado Libre), presión por reducir márgenes, necesidad de digitalizar operaciones
                que tradicionalmente eran 100% físicas. Retailers que no se digitalizan pierden cuota de mercado
                aceleradamente.
              </p>
              <p>
                Alternative ha gestionado proyectos de transformación digital en cadenas retail: implementación de
                e-commerce integrado con tiendas físicas, sistemas de gestión de inventario omnicanal, digitalización de
                procesos de compras y logística, herramientas de análisis de datos de clientes. Entendemos complejidad
                de operar múltiples canales (físico + web + móvil + marketplaces), gestionar inventario entre canales, y
                equilibrar experiencia de cliente con eficiencia operativa.
              </p>
            </div>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              '15+ proyectos en retail/comercio',
              'Omnicanalidad físico + digital',
              'E-commerce plataformas integradas',
              'PMs PMP® especializados retail',
            ].map((stat, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-turquesa/10 rounded-2xl p-6 border border-turquesa/20 shadow-brand text-center">
                  <p className="text-azul-marino dark:text-white font-semibold text-sm">{stat}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* DESAFÍOS */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              Desafíos críticos del retail moderno
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {desafios.map((d, idx) => {
              const Icon = d.icon;
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-background p-8 rounded-2xl shadow-brand hover:shadow-brand-lg transition-all duration-300 border border-gris-arena/20 h-full"
                  >
                    <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-turquesa" />
                    </div>
                    <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-2">{d.title}</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">{d.desc}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* SERVICIOS PARA RETAIL */}
      <section className="py-20 lg:py-32 bg-turquesa/10">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              Cómo Alternative apoya a empresas de retail
            </h2>
          </AnimatedSection>

          <AnimatedSection className="mb-8">
            <div className="bg-white dark:bg-background rounded-2xl p-8 lg:p-10 shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 border border-turquesa/20 overflow-hidden group">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center">
                  <Target className="w-7 h-7 text-turquesa" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                    Gestión de proyectos de transformación digital
                  </h3>
                  <p className="text-foreground/60 text-sm">PMs PMP® para e-commerce, omnicanalidad, POS, CRM retail</p>
                </div>
              </div>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Project Managers PMP® certificados para gestionar proyectos complejos de transformación digital retail:
                implementación de e-commerce, integración omnicanal, modernización de sistemas POS, digitalización de
                procesos, implementación de CRM retail.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  {
                    title: 'Implementación de E-commerce',
                    sub: 'Plataforma integrada con tiendas, pasarela pagos, logística. Lanzamiento 4-8 meses.',
                  },
                  {
                    title: 'Omnicanalidad (físico + digital)',
                    sub: 'Click & Collect, Ship from Store, Endless Aisle, devoluciones omnicanal. 6-12 meses.',
                  },
                  { title: 'Modernización de POS', sub: 'POS cloud, integración e-commerce e inventario. Rollout multi-tienda.' },
                  {
                    title: 'Implementación de CRM Retail',
                    sub: 'Fidelización, lealtad, personalización. Visión 360° con POS + e-commerce.',
                  },
                  {
                    title: 'Análisis de Datos / BI Retail',
                    sub: 'Dashboards ventas, comportamiento clientes, forecasting, optimización inventario.',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-turquesa/10 rounded-xl p-4 border border-turquesa/20">
                    <h4 className="font-semibold text-azul-marino dark:text-white text-sm mb-1">{item.title}</h4>
                    <p className="text-foreground/60 text-xs">{item.sub}</p>
                  </div>
                ))}
              </div>
              <p className="text-foreground/70 text-sm mb-6">
                <strong className="text-azul-marino dark:text-white">Por qué PM especializado retail:</strong> Múltiples
                stakeholders (tiendas, HQ, vendors), implementación en tiendas operando, temporadas críticas (evitar
                go-lives en Black Friday), integración de múltiples sistemas legacy.
              </p>
              <Link
                href={contactUrl}
                className="inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-6 py-3 rounded-lg hover:bg-menta transition-all duration-300 shadow-glow-turquesa"
              >
                Solicita PM para Transformación Digital Retail
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedSection delay={0.1}>
              <div className="bg-white dark:bg-background rounded-2xl p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 border border-gris-arena/20 h-full flex flex-col">
                <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                  <ShoppingBag className="w-7 h-7 text-turquesa" />
                </div>
                <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                  Desarrollo de E-commerce
                </h3>
                <p className="text-foreground/70 mb-4 flex-1">
                  Desarrollo de plataformas e-commerce a medida o implementación de Shopify Plus, WooCommerce, Magento.
                  UX/UI para conversión, integración inventario/ERP, pasarela de pagos, logística.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-foreground/70">
                  {[
                    'Plataforma responsive (web + móvil)',
                    'Catálogo, búsqueda, filtros, carrito y checkout',
                    'Integración pasarelas (Stripe, PayPal)',
                    'Inventario en tiempo real',
                    'Panel de administración',
                    'Logística y tracking',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/servicios/desarrollo-tecnologia/aplicaciones-web-moviles`}
                  className="inline-flex items-center gap-2 text-turquesa font-semibold hover:gap-3 transition-all"
                >
                  Ver Desarrollo de E-commerce
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-background rounded-2xl p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 border border-gris-arena/20 h-full flex flex-col">
                <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                  <Link2 className="w-7 h-7 text-turquesa" />
                </div>
                <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                  Integración de sistemas retail
                </h3>
                <p className="text-foreground/70 mb-4 flex-1">
                  Integración entre POS + E-commerce + ERP + CRM + Marketplaces (Amazon, Mercado Libre). Sincronización
                  inventario en tiempo real, consolidación de ventas, flujos automatizados.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-foreground/70">
                  {[
                    'Venta en POS actualiza inventario e-commerce al instante',
                    'Venta en e-commerce crea orden en ERP automáticamente',
                    'Cliente nuevo en tienda se registra en CRM',
                    'Productos sincronizados con marketplaces',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-turquesa flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/servicios/desarrollo-tecnologia/integracion-sistemas`}
                  className="inline-flex items-center gap-2 text-turquesa font-semibold hover:gap-3 transition-all"
                >
                  Ver Integración de Sistemas
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CASO DE ÉXITO */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-blanco-hueso dark:bg-card rounded-2xl p-8 lg:p-12 shadow-brand border-l-4 border-turquesa overflow-hidden">
              <h2 className="text-2xl lg:text-3xl font-semibold text-azul-marino dark:text-white mb-6">
                Caso: Cadena retail lanza e-commerce y logra 25% de ventas online en 12 meses
              </h2>
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-foreground/70 mb-2">
                    <strong className="text-azul-marino dark:text-white">Cliente:</strong> Cadena de retail de productos
                    electrónicos (18 tiendas, $40M revenue anual).
                  </p>
                  <p className="text-foreground/70 mb-4">
                    <strong className="text-azul-marino dark:text-white">Situación:</strong> Sin e-commerce. Competencia
                    (Amazon, marketplaces) capturando clientes. Ventas estancadas (+2% anual). Sin equipo digital ni
                    plataforma.
                  </p>
                  <p className="text-foreground/70">
                    <strong className="text-azul-marino dark:text-white">Objetivo:</strong> Lanzar e-commerce integrado
                    con tiendas en 6 meses. Meta: 15-20% ventas vía online en 12 meses.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-azul-marino dark:text-white mb-3">Solución (6 meses)</h4>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    <li>Mes 1-2: Planificación, Shopify Plus, UX/UI, omnicanal, integración ERP.</li>
                    <li>Mes 3-4: Storefront, 2.500 SKUs, ERP + Stripe + logística.</li>
                    <li>Mes 5: Testing, piloto soft launch.</li>
                    <li>Mes 6: Go-live, campaña digital, capacitación tiendas.</li>
                  </ul>
                  <h4 className="font-semibold text-azul-marino dark:text-white mt-4 mb-2">Funcionalidades clave</h4>
                  <p className="text-sm text-foreground/70">
                    Inventario en tiempo real por tienda • Click & Collect • Ship from Store • Programa de lealtad
                    físico + online.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { v: '$10M', l: 'Ventas online (25% total)' },
                  { v: '+25%', l: 'Crecimiento total' },
                  { v: '8.000', l: 'Nuevos clientes digitales' },
                  { v: '240%', l: 'ROI primer año' },
                ].map((s, i) => (
                  <div key={i} className="bg-turquesa/10 rounded-xl p-4 border border-turquesa/20 text-center">
                    <p className="text-turquesa font-bold">{s.v}</p>
                    <p className="text-foreground/60 text-xs">{s.l}</p>
                  </div>
                ))}
              </div>
              <p className="text-foreground/70 text-sm mb-4">
                <strong className="text-azul-marino dark:text-white">Factor crítico:</strong> PM gestionó múltiples
                workstreams (desarrollo, integraciones, logística, capacitación) y aseguró lanzamiento en 6 meses sin
                retrasos.
              </p>
              <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                &ldquo;E-commerce nos transformó. 25% de ventas online en 12 meses. PM de Alternative gestionó lanzamiento
                impecable en 6 meses, sin retrasos.&rdquo;
                <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— CEO</span>
              </blockquote>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              Preguntas frecuentes
            </h2>
          </AnimatedSection>
          <AnimatedSection className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-background rounded-2xl p-8 shadow-brand">
              {faqs.map((faq, idx) => (
                <FAQItem
                  key={idx}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === idx}
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                />
              ))}
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
                ¿Tu retail necesita transformación digital?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Evaluación gratuita de 30 minutos. Analizamos situación actual (canales, sistemas) y recomendamos
                roadmap de transformación digital.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  'Evaluación de madurez digital retail',
                  'Identificación de iniciativas prioritarias',
                  'Recomendación build vs buy (plataformas)',
                  'Estimación de timeline y costo',
                  'Propuesta de proyecto',
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
                    href={contactUrl}
                    className="inline-flex items-center gap-3 bg-turquesa text-azul-marino font-semibold px-8 py-4 rounded-lg hover:bg-menta transition-all duration-300 shadow-glow-turquesa group"
                  >
                    Solicitar Evaluación Digital Retail
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

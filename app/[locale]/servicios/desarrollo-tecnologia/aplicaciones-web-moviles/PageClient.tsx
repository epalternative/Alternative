'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import { faqs as faqData } from '@/lib/content/faqs/servicios--desarrollo-tecnologia--aplicaciones-web-moviles';
import { localizeFaqs } from '@/lib/content/faqs';
import {
  Smartphone,
  ArrowRight,
  ChevronDown,
  Globe,
  ShoppingCart,
  Target,
  TrendingUp,
  CheckCircle2,
  Building2,
  Phone,
  AlertTriangle,
  FileText,
  Sparkles,
  Shield,
  Clock,
  Award,
  Laptop,
  Layers,
  Search,
  Calendar,
  Monitor,
  BookOpen,
  Users,
  Code,
  Zap,
  Database,
  Cloud,
  Network,
  BarChart3,
  Rocket
} from 'lucide-react';

// =====================================================
// ANIMATION COMPONENTS
// =====================================================

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

// =====================================================
// FAQ COMPONENT
// =====================================================

const FAQItem = ({ 
  question, 
  answer, 
  isOpen, 
  onClick 
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void 
}) => (
  <motion.div 
    className="border-b border-gris-arena/20 last:border-0"
    initial={false}
  >
    <button
      onClick={onClick}
      className="w-full py-6 flex items-center justify-between text-left group"
    >
      <span className="text-lg font-semibold text-azul-marino dark:text-white group-hover:text-turquesa transition-colors pr-8">
        {question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0"
      >
        <ChevronDown className="w-5 h-5 text-turquesa" />
      </motion.div>
    </button>
    <motion.div
      initial={false}
      animate={{ 
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <p className="pb-6 text-foreground/70 leading-relaxed">
        {answer}
      </p>
    </motion.div>
  </motion.div>
);

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function AplicacionesWebMovilesPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Desarrollo & Tecnología' : 'Development & Technology', href: `/${locale}/servicios/desarrollo-tecnologia` },
    { label: isEs ? 'Aplicaciones Web y Móviles' : 'Web and Mobile Applications', href: null }
  ];

  const forWho = [
    {
      icon: Globe,
      title: isEs ? 'Presencia digital moderna para clientes' : 'Modern digital presence for clients',
      description: isEs
        ? 'Website corporativo actual está desactualizado (10+ años), no es responsive (móvil), carga lento. Necesitas presencia profesional moderna.'
        : 'Current corporate website is outdated (10+ years), not responsive (mobile), loads slowly. You need modern professional presence.',
      color: 'turquesa'
    },
    {
      icon: Smartphone,
      title: isEs ? 'Portal de autoservicio para clientes' : 'Self-service portal for clients',
      description: isEs
        ? 'Clientes llaman/escriben para consultas simples (saldos, facturas, estado de pedidos). Portal self-service reduce carga operativa 40-60%.'
        : 'Clients call/write for simple queries (balances, invoices, order status). Self-service portal reduces operational load 40-60%.',
      color: 'menta'
    },
    {
      icon: Target,
      title: isEs ? 'App móvil para equipo de campo' : 'Mobile app for field team',
      description: isEs
        ? 'Vendedores, técnicos, repartidores trabajando fuera de oficina. Necesitan app móvil para: captura de pedidos, reportes de servicio, tracking.'
        : 'Salespeople, technicians, delivery personnel working outside office. They need mobile app for: order capture, service reports, tracking.',
      color: 'violeta'
    },
    {
      icon: ShoppingCart,
      title: isEs ? 'E-commerce o marketplace' : 'E-commerce or marketplace',
      description: isEs
        ? 'Vender productos/servicios online. Canal digital que opera 24/7 sin vendedor humano. B2C (consumidor final) o B2B (empresas).'
        : 'Sell products/services online. Digital channel that operates 24/7 without human salesperson. B2C (end consumer) or B2B (businesses).',
      color: 'turquesa'
    },
    {
      icon: Rocket,
      title: isEs ? 'Plataforma digital que ES tu producto' : 'Digital platform that IS your product',
      description: isEs
        ? 'Startup o empresa digital donde app ES el negocio. No herramienta de apoyo; es el producto principal que vendes o monetizas.'
        : 'Startup or digital company where app IS the business. Not support tool; it\'s the main product you sell or monetize.',
      color: 'menta'
    },
    {
      icon: BarChart3,
      title: isEs ? 'App interna con datos en tiempo real' : 'Internal app with real-time data',
      description: isEs
        ? 'Ejecutivos/gerentes necesitan acceso móvil a dashboards, KPIs, aprobaciones. App complementa sistema empresarial con acceso móvil.'
        : 'Executives/managers need mobile access to dashboards, KPIs, approvals. App complements enterprise system with mobile access.',
      color: 'violeta'
    }
  ];

  const appTypes = [
    {
      title: isEs ? 'APLICACIONES WEB RESPONSIVAS' : 'RESPONSIVE WEB APPLICATIONS',
      description: isEs
        ? 'Sitio web que se adapta perfectamente a cualquier dispositivo (desktop, tablet, móvil). Funciona en navegador, no requiere descarga.'
        : 'Website that adapts perfectly to any device (desktop, tablet, mobile). Works in browser, doesn\'t require download.',
      technologies: isEs ? 'React, Angular, Vue.js, Next.js' : 'React, Angular, Vue.js, Next.js',
      advantages: isEs
        ? ['Un solo código para todos los dispositivos', 'Sin aprobación de App Store/Play Store', 'Actualizaciones instantáneas', 'Costo menor que apps nativas']
        : ['Single code for all devices', 'No App Store/Play Store approval', 'Instant updates', 'Lower cost than native apps'],
      examples: isEs
        ? ['Portal de clientes con login', 'Plataforma SaaS', 'E-commerce web', 'Dashboard ejecutivo web']
        : ['Client portal with login', 'SaaS platform', 'Web e-commerce', 'Executive web dashboard'],
      icon: Globe,
      color: 'turquesa'
    },
    {
      title: isEs ? 'APLICACIONES MÓVILES NATIVAS' : 'NATIVE MOBILE APPLICATIONS',
      description: isEs
        ? 'Apps desarrolladas específicamente para iOS (Swift) o Android (Kotlin). Mejor performance y acceso a funcionalidades del dispositivo.'
        : 'Apps developed specifically for iOS (Swift) or Android (Kotlin). Better performance and access to device features.',
      technologies: isEs ? 'Swift (iOS), Kotlin (Android)' : 'Swift (iOS), Kotlin (Android)',
      advantages: isEs
        ? ['Máximo performance', 'Acceso completo a hardware (cámara, GPS, sensores)', 'Experiencia UX óptima por plataforma', 'Funciona offline']
        : ['Maximum performance', 'Complete access to hardware (camera, GPS, sensors)', 'Optimal UX experience per platform', 'Works offline'],
      examples: isEs
        ? ['App de delivery con GPS', 'App de ventas con captura de firmas', 'App bancaria con biometría', 'App de salud con sensores']
        : ['Delivery app with GPS', 'Sales app with signature capture', 'Banking app with biometrics', 'Health app with sensors'],
      icon: Smartphone,
      color: 'menta'
    },
    {
      title: isEs ? 'APLICACIONES CROSS-PLATFORM' : 'CROSS-PLATFORM APPLICATIONS',
      description: isEs
        ? 'Un solo código base genera apps para iOS + Android simultáneamente. Balance entre costo y performance.'
        : 'Single codebase generates apps for iOS + Android simultaneously. Balance between cost and performance.',
      technologies: isEs ? 'React Native, Flutter' : 'React Native, Flutter',
      advantages: isEs
        ? ['Costo 40% menor que 2 apps nativas', 'Time-to-market más rápido', 'Código compartido entre plataformas', 'Performance cercano a nativo']
        : ['40% lower cost than 2 native apps', 'Faster time-to-market', 'Shared code between platforms', 'Near-native performance'],
      examples: isEs
        ? ['App de e-commerce multicanal', 'App de servicios profesionales', 'App de gestión de tareas', 'App de comunicación interna']
        : ['Multi-channel e-commerce app', 'Professional services app', 'Task management app', 'Internal communication app'],
      icon: Smartphone,
      color: 'violeta'
    },
    {
      title: isEs ? 'PROGRESSIVE WEB APPS (PWA)' : 'PROGRESSIVE WEB APPS (PWA)',
      description: isEs
        ? 'Web app que se comporta como app nativa: funciona offline, se puede "instalar" en home screen, notificaciones push.'
        : 'Web app that behaves like native app: works offline, can be "installed" on home screen, push notifications.',
      technologies: isEs ? 'React + Service Workers, PWA capabilities' : 'React + Service Workers, PWA capabilities',
      advantages: isEs
        ? ['No requiere App Store/Play Store', 'Actualizaciones automáticas', 'Funciona offline', 'Costo menor que app nativa']
        : ['No App Store/Play Store required', 'Automatic updates', 'Works offline', 'Lower cost than native app'],
      examples: isEs
        ? ['Portal de noticias con offline', 'App de ventas de campo', 'Herramienta de productividad', 'Catálogo de productos offline']
        : ['News portal with offline', 'Field sales app', 'Productivity tool', 'Offline product catalog'],
      icon: Globe,
      color: 'turquesa'
    },
    {
      title: isEs ? 'E-COMMERCE / MARKETPLACE' : 'E-COMMERCE / MARKETPLACE',
      description: isEs
        ? 'Plataforma de comercio electrónico con carrito de compras, pasarela de pagos, gestión de inventario, logística.'
        : 'E-commerce platform with shopping cart, payment gateway, inventory management, logistics.',
      technologies: isEs ? 'React/Next.js + Stripe/PayPal + APIs logística' : 'React/Next.js + Stripe/PayPal + logistics APIs',
      advantages: isEs
        ? ['Canal de ventas 24/7', 'Alcance geográfico ampliado', 'Reducción costo de ventas', 'Datos de comportamiento de clientes']
        : ['24/7 sales channel', 'Expanded geographic reach', 'Sales cost reduction', 'Client behavior data'],
      examples: isEs
        ? ['Tienda online B2C', 'Marketplace B2B', 'Suscripciones/membresías', 'Productos digitales']
        : ['B2C online store', 'B2B marketplace', 'Subscriptions/memberships', 'Digital products'],
      icon: ShoppingCart,
      color: 'menta'
    }
  ];

  const processPhases = [
    {
      phase: isEs ? 'DISCOVERY Y UX' : 'DISCOVERY AND UX',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Definición de audiencia target y user personas, Mapeo de user journeys principales, Wireframes de pantallas clave, Arquitectura de información, Definición de funcionalidades core'
        : 'Target audience and user personas definition, Main user journeys mapping, Key screen wireframes, Information architecture, Core features definition',
      icon: Search,
      deliverable: isEs ? 'Wireframes + user flows + requisitos funcionales' : 'Wireframes + user flows + functional requirements',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'DISEÑO UI' : 'UI DESIGN',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Diseño visual de interfaz (UI), Paleta de colores y tipografía, Componentes y elementos visuales, Diseño responsivo (desktop, tablet, móvil), Prototipo interactivo (Figma/Adobe XD)'
        : 'Visual interface design (UI), Color palette and typography, Components and visual elements, Responsive design (desktop, tablet, mobile), Interactive prototype (Figma/Adobe XD)',
      icon: Layers,
      deliverable: isEs ? 'Diseños en alta fidelidad + prototipo clickeable' : 'High-fidelity designs + clickable prototype',
      color: 'menta'
    },
    {
      phase: isEs ? 'DESARROLLO FRONTEND' : 'FRONTEND DEVELOPMENT',
      duration: isEs ? '4-8 semanas' : '4-8 weeks',
      description: isEs
        ? 'Desarrollo de interfaces según diseños, Componentes reutilizables, Animaciones y transiciones, Responsividad y cross-browser, Integración con APIs backend'
        : 'Interface development according to designs, Reusable components, Animations and transitions, Responsiveness and cross-browser, Backend API integration',
      icon: Code,
      deliverable: isEs ? 'Frontend funcionando consumiendo APIs' : 'Working frontend consuming APIs',
      color: 'violeta'
    },
    {
      phase: isEs ? 'DESARROLLO BACKEND' : 'BACKEND DEVELOPMENT',
      duration: isEs ? '4-8 semanas, paralelo' : '4-8 weeks, parallel',
      description: isEs
        ? 'APIs REST o GraphQL, Base de datos diseñada y optimizada, Lógica de negocio, Autenticación y autorización, Integraciones con servicios externos'
        : 'REST or GraphQL APIs, Designed and optimized database, Business logic, Authentication and authorization, External service integrations',
      icon: Database,
      deliverable: isEs ? 'Backend con APIs documentadas' : 'Backend with documented APIs',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'TESTING Y QA' : 'TESTING AND QA',
      duration: isEs ? '2-3 semanas' : '2-3 weeks',
      description: isEs
        ? 'Testing funcional en múltiples dispositivos, Testing de performance y carga, Testing de seguridad, Testing de usabilidad con usuarios reales, Corrección de bugs'
        : 'Functional testing on multiple devices, Performance and load testing, Security testing, Usability testing with real users, Bug fixes',
      icon: Shield,
      deliverable: isEs ? 'App validada y lista para lanzamiento' : 'Validated app ready for launch',
      color: 'menta'
    },
    {
      phase: isEs ? 'LANZAMIENTO Y MONITOREO' : 'LAUNCH AND MONITORING',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Despliegue en servidores productivos, Publicación en App Store/Play Store (si móvil), Configuración de analytics (Google Analytics, Firebase), Monitoreo de errores (Sentry, Crashlytics), Soporte post-lanzamiento'
        : 'Deployment on production servers, Publication in App Store/Play Store (if mobile), Analytics configuration (Google Analytics, Firebase), Error monitoring (Sentry, Crashlytics), Post-launch support',
      icon: Monitor,
      deliverable: isEs ? 'App en producción + monitoreo activo' : 'App in production + active monitoring',
      color: 'violeta'
    }
  ];

  const includes = [
    {
      title: isEs ? 'Diseño UX/UI' : 'UX/UI Design',
      icon: Layers,
      items: isEs
        ? ['Research de usuarios y user personas', 'Wireframes de todas las pantallas', 'Diseño visual profesional (UI)', 'Prototipo interactivo', 'Guía de estilo y design system']
        : ['User research and user personas', 'Wireframes of all screens', 'Professional visual design (UI)', 'Interactive prototype', 'Style guide and design system'],
      color: 'turquesa'
    },
    {
      title: isEs ? 'Desarrollo' : 'Development',
      icon: Code,
      items: isEs
        ? ['Frontend responsive (web) o nativo/cross-platform (móvil)', 'Backend con APIs RESTful o GraphQL', 'Base de datos optimizada', 'Integraciones (pagos, mapas, notificaciones)', 'Panel de administración']
        : ['Responsive frontend (web) or native/cross-platform (mobile)', 'Backend with RESTful or GraphQL APIs', 'Optimized database', 'Integrations (payments, maps, notifications)', 'Admin panel'],
      color: 'menta'
    },
    {
      title: isEs ? 'Infraestructura' : 'Infrastructure',
      icon: Cloud,
      items: isEs
        ? ['Hosting en cloud (AWS/Azure/Google Cloud)', 'CDN para performance global', 'SSL/seguridad', 'Backups automáticos', 'Escalabilidad automática']
        : ['Cloud hosting (AWS/Azure/Google Cloud)', 'CDN for global performance', 'SSL/security', 'Automatic backups', 'Automatic scalability'],
      color: 'violeta'
    },
    {
      title: isEs ? 'Lanzamiento y Soporte' : 'Launch and Support',
      icon: Monitor,
      items: isEs
        ? ['Testing exhaustivo multi-dispositivo', 'Publicación en App Stores (iOS/Android)', 'Analytics configurado', 'Soporte 3 meses post-lanzamiento', 'Capacitación de administradores']
        : ['Exhaustive multi-device testing', 'Publication in App Stores (iOS/Android)', 'Analytics configured', '3 months post-launch support', 'Administrator training'],
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '100%', label: isEs ? 'Responsive en todos los dispositivos' : 'Responsive on all devices', icon: Smartphone },
    { value: 'Professional', label: isEs ? 'Diseño UX/UI de calidad' : 'Quality UX/UI design', icon: Layers },
    { value: 'Escalable', label: isEs ? 'Soporta crecimiento de usuarios' : 'Supports user growth', icon: TrendingUp },
    { value: 'Rápida', label: isEs ? 'Performance optimizada (<2s carga)' : 'Optimized performance (<2s load)', icon: Zap },
    { value: 'Segura', label: isEs ? 'SSL, encriptación, best practices' : 'SSL, encryption, best practices', icon: Shield },
    { value: 'Medible', label: isEs ? 'Analytics integrado desde día 1' : 'Analytics integrated from day 1', icon: BarChart3 }
  ];

  const nativeVsCross = [
    { 
      aspect: isEs ? 'Performance' : 'Performance',
      native: isEs ? 'Máximo (100%)' : 'Maximum (100%)',
      cross: isEs ? 'Alto (90-95%)' : 'High (90-95%)'
    },
    { 
      aspect: isEs ? 'UX por plataforma' : 'UX per platform',
      native: isEs ? 'Perfecta' : 'Perfect',
      cross: isEs ? 'Muy buena' : 'Very good'
    },
    { 
      aspect: isEs ? 'Costo desarrollo' : 'Development cost',
      native: isEs ? 'Alto (2 apps separadas)' : 'High (2 separate apps)',
      cross: isEs ? 'Medio (1 código base)' : 'Medium (1 codebase)'
    },
    { 
      aspect: isEs ? 'Time to market' : 'Time to market',
      native: isEs ? 'Más lento (2 equipos)' : 'Slower (2 teams)',
      cross: isEs ? 'Más rápido (1 equipo)' : 'Faster (1 team)'
    },
    { 
      aspect: isEs ? 'Acceso a hardware' : 'Hardware access',
      native: isEs ? 'Completo' : 'Complete',
      cross: isEs ? 'Alto (95% funcionalidades)' : 'High (95% features)'
    },
    { 
      aspect: isEs ? 'Mantenimiento' : 'Maintenance',
      native: isEs ? '2 códigos separados' : '2 separate codes',
      cross: isEs ? '1 código base' : '1 codebase'
    },
    { 
      aspect: isEs ? 'Costo ongoing' : 'Ongoing cost',
      native: isEs ? 'Mayor' : 'Higher',
      cross: isEs ? 'Menor' : 'Lower'
    },
    { 
      aspect: isEs ? 'Mejor para' : 'Best for',
      native: isEs ? 'Apps complejas, gaming, AR/VR' : 'Complex apps, gaming, AR/VR',
      cross: isEs ? 'Mayoría de apps empresariales' : 'Most enterprise apps'
    }
  ];

  const faqs = localizeFaqs(faqData, isEs ? 'es' : 'en');

  const colorClasses = {
    turquesa: { bg: 'bg-turquesa/10', text: 'text-turquesa', border: 'border-turquesa/20', badge: 'bg-turquesa/10 text-turquesa' },
    menta: { bg: 'bg-menta/10', text: 'text-menta', border: 'border-menta/20', badge: 'bg-menta/10 text-menta' },
    violeta: { bg: 'bg-violeta/10', text: 'text-violeta', border: 'border-violeta/20', badge: 'bg-violeta/10 text-violeta' }
  };

  return (
    <>
      {/* Reading Progress Indicator */}
      <ReadingProgress />

      {/* Service Sidebar */}
      <ServiceSidebar 
        locale={locale} 
        currentService="desarrollo-tecnologia"
      />

      {/* =====================================================
          HERO SECTION - Unique Design with App Mockup
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        {/* Background Pattern - Mobile Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(108, 196, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(108, 196, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }} />
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[10%] w-40 h-40 bg-turquesa/10 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[8%] w-32 h-32 bg-menta/10 rounded-full blur-2xl"
          />
        </div>

        <div className="container-custom relative z-10 pt-8 pb-16 lg:pb-20">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
            aria-label="Breadcrumb"
          >
            <ol className="flex flex-wrap items-center gap-2 text-sm">
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
                  <Smartphone className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Aplicaciones Web y Móviles' : 'Web and Mobile Applications'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Desarrollo & Tecnología' : 'Development & Technology'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Apps web y móviles que conectan tu negocio con clientes'
                  : 'Web and mobile apps that connect your business with clients'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Desarrollo de aplicaciones web responsivas, apps móviles nativas (iOS/Android) y PWAs. Portales de clientes, apps de campo para empleados, e-commerce, plataformas digitales. Presencia digital moderna que genera engagement y resultados.'
                  : 'Development of responsive web applications, native mobile apps (iOS/Android) and PWAs. Client portals, field apps for employees, e-commerce, digital platforms. Modern digital presence that generates engagement and results.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Desarrolla tu App' : 'Develop Your App'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/casos-exito`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Ver portfolio de apps' : 'View app portfolio'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '25+', label: isEs ? 'apps web/móviles desarrolladas' : 'web/mobile apps developed' },
                  { value: 'iOS + Android', label: isEs ? '+ Web' : '+ Web' },
                  { icon: true, label: isEs ? 'UX/UI diseñado profesionalmente' : 'Professionally designed UX/UI' }
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

            {/* Right Visual - App Mockup Floating */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative"
                >
                  {/* Phone Frame */}
                  <div className="bg-azul-marino rounded-3xl p-2 mx-auto" style={{ width: '200px' }}>
                    <div className="bg-white rounded-2xl p-4 h-64 flex flex-col">
                      {/* App Header */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-turquesa/20 rounded-lg flex items-center justify-center">
                          <Smartphone className="w-4 h-4 text-turquesa" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-azul-marino/20 rounded w-20 mb-1" />
                          <div className="h-1 bg-azul-marino/10 rounded w-16" />
                        </div>
                      </div>

                      {/* App Content */}
                      <div className="flex-1 space-y-2">
                        {[1, 2, 3].map((idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-turquesa/20 rounded-lg" />
                            <div className="flex-1 space-y-1">
                              <div className="h-2 bg-azul-marino/20 rounded w-full" />
                              <div className="h-1 bg-azul-marino/10 rounded w-3/4" />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Nav */}
                      <div className="flex justify-around mt-4 pt-4 border-t border-azul-marino/10">
                        {[1, 2, 3, 4].map((idx) => (
                          <div key={idx} className="w-6 h-6 bg-turquesa/20 rounded" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Platform Badges */}
                  <div className="flex justify-center gap-3 mt-6">
                    {['iOS', 'Android', 'Web'].map((platform, idx) => (
                      <motion.div
                        key={idx}
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                        className="bg-white/5 rounded-lg px-3 py-1"
                      >
                        <span className="text-white/70 text-xs">{platform}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-turquesa rounded-2xl p-4 shadow-xl"
                >
                  <Smartphone className="w-8 h-8 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUÉ DESARROLLAMOS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs ? 'De portales web a apps móviles nativas' : 'From web portals to native mobile apps'}
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs 
                    ? 'Desarrollamos aplicaciones digitales modernas que usuarios acceden desde navegadores web (Chrome, Safari) o apps móviles descargables (App Store, Google Play). Incluye: sitios web corporativos avanzados, portales de clientes con funcionalidades complejas, e-commerce, apps móviles para clientes o empleados, Progressive Web Apps (PWAs).'
                    : 'We develop modern digital applications that users access from web browsers (Chrome, Safari) or downloadable mobile apps (App Store, Google Play). Includes: advanced corporate websites, client portals with complex features, e-commerce, mobile apps for clients or employees, Progressive Web Apps (PWAs).'}
                </p>
                <p>
                  {isEs 
                    ? 'Diferencia con desarrollo de software empresarial: Software empresarial (hijo 1) típicamente es para uso interno, gestión de operaciones, usuarios limitados. Apps web/móviles son para audiencias amplias: clientes, público general, equipos de campo. Priorizan experiencia de usuario (UX/UI), diseño atractivo, performance, accesibilidad desde cualquier dispositivo.'
                    : 'Difference with enterprise software development: Enterprise software (child 1) is typically for internal use, operations management, limited users. Web/mobile apps are for broad audiences: clients, general public, field teams. They prioritize user experience (UX/UI), attractive design, performance, accessibility from any device.'}
                </p>
                <p>
                  {isEs 
                    ? 'Stack moderno: Utilizamos frameworks JavaScript modernos (React, Angular, Vue), desarrollo móvil nativo (Swift/Kotlin) o cross-platform (React Native, Flutter), backends API-first (Node.js, .NET Core), infraestructura cloud escalable. Resultado: apps rápidas, responsivas, con experiencia de usuario profesional.'
                    : 'Modern stack: We use modern JavaScript frameworks (React, Angular, Vue), native mobile development (Swift/Kotlin) or cross-platform (React Native, Flutter), API-first backends (Node.js, .NET Core), scalable cloud infrastructure. Result: fast, responsive apps with professional user experience.'}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          PARA QUIÉN ES SECTION - Grid 2x3
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Cuándo necesitas app web o móvil?' : 'When do you need web or mobile app?'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forWho.map((item, idx) => {
              const colors = colorClasses[item.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-background p-8 rounded-2xl shadow-brand 
                               hover:shadow-brand-lg transition-all duration-300 border border-gris-arena/20"
                  >
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <item.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          TIPOS DE APLICACIONES SECTION - 5 Cards
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '5 tipos de apps web/móviles que desarrollamos' : '5 types of web/mobile apps we develop'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="space-y-6">
            {appTypes.map((type, idx) => {
              const colors = colorClasses[type.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <div className="bg-blanco-hueso dark:bg-card p-8 rounded-2xl shadow-brand border border-gris-arena/20">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <type.icon className={`w-7 h-7 ${colors.text}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-azul-marino dark:text-white mb-2">
                          {type.title}
                        </h3>
                        <p className="text-foreground/70 mb-3 leading-relaxed">
                          {type.description}
                        </p>
                        <div className={`${colors.badge} text-xs font-medium px-3 py-1 rounded inline-block mb-3`}>
                          {isEs ? 'Tecnologías:' : 'Technologies:'} {type.technologies}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <div className={`${colors.text} font-semibold text-xs mb-2`}>
                              {isEs ? 'Ventajas:' : 'Advantages:'}
                            </div>
                            <ul className="space-y-1">
                              {type.advantages.map((adv, advIdx) => (
                                <li key={advIdx} className="text-foreground/60 text-sm flex items-start gap-2">
                                  <CheckCircle2 className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                                  {adv}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className={`${colors.text} font-semibold text-xs mb-2`}>
                              {isEs ? 'Ejemplos:' : 'Examples:'}
                            </div>
                            <ul className="space-y-1">
                              {type.examples.map((example, exIdx) => (
                                <li key={exIdx} className="text-foreground/60 text-sm flex items-start gap-2">
                                  <div className={`w-1.5 h-1.5 ${colors.bg.replace('/10', '')} rounded-full mt-1.5 flex-shrink-0`} />
                                  {example}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          PROCESO DE DESARROLLO - Timeline 6 Fases
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Cómo desarrollamos tu app web/móvil' : 'How we develop your web/mobile app'}
            </h2>
          </AnimatedSection>

          {/* Timeline - Desktop */}
          <div className="hidden lg:block relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-turquesa via-menta to-violeta -translate-y-1/2" />
            
            <div className="grid grid-cols-6 gap-4 relative">
              {processPhases.map((phase, idx) => {
                const colors = colorClasses[phase.color as keyof typeof colorClasses];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-turquesa rounded-full border-4 border-white dark:border-background z-10" />
                    <div className="pt-8">
                      <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <phase.icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <div className="bg-white dark:bg-background p-4 rounded-2xl shadow-brand">
                        <div className="text-turquesa text-xs font-medium mb-1">{phase.duration}</div>
                        <h3 className="text-sm font-bold text-azul-marino dark:text-white mb-2">
                          {phase.phase}
                        </h3>
                        <p className="text-foreground/70 text-xs mb-2 leading-relaxed line-clamp-3">
                          {phase.description}
                        </p>
                        <div className="text-xs text-turquesa font-medium">
                          {phase.deliverable}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet - Vertical Stack */}
          <div className="lg:hidden space-y-6">
            {processPhases.map((phase, idx) => {
              const colors = colorClasses[phase.color as keyof typeof colorClasses];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-background p-6 rounded-2xl shadow-brand border-l-4 border-turquesa"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <phase.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-turquesa text-sm font-medium mb-1">{phase.duration}</div>
                      <h3 className="text-lg font-bold text-azul-marino dark:text-white mb-2">
                        {phase.phase}
                      </h3>
                      <p className="text-foreground/70 text-sm mb-3 leading-relaxed">
                        {phase.description}
                      </p>
                      <div className="text-xs text-turquesa font-medium">
                        {phase.deliverable}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <AnimatedSection className="text-center mt-12">
            <p className="text-lg text-turquesa font-semibold">
              {isEs ? 'DURACIÓN TOTAL: 3-5 meses típicamente' : 'TOTAL DURATION: 3-5 months typically'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          QUÉ INCLUYE SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Qué incluye' : 'What\'s included'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {includes.map((item, idx) => {
              const colors = colorClasses[item.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <div className="bg-blanco-hueso dark:bg-card p-8 rounded-2xl shadow-brand border border-gris-arena/20">
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <item.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-4">
                      {item.title}
                    </h3>
                    <ul className="space-y-2">
                      {item.items.map((listItem, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                          <span className="text-foreground/70 text-sm">{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          BENEFICIOS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-azul-marino">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              {isEs ? 'Beneficios' : 'Benefits'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 
                             text-center hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-turquesa" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-turquesa mb-2">
                    {benefit.value}
                  </div>
                  <p className="text-white/70 text-sm">{benefit.label}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          CASO DE ÉXITO SECTION - HIDDEN FOR VALIDATION
          ===================================================== */}
      {false && (
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-blanco-hueso dark:bg-card rounded-3xl p-8 lg:p-12 overflow-hidden relative">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-turquesa" />
                  </div>
                  <div>
                    <span className="text-turquesa font-medium text-sm uppercase tracking-wider">
                      {isEs ? 'Caso de Éxito' : 'Success Story'}
                    </span>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                      {isEs ? 'App móvil de pedidos aumenta ventas 45%' : 'Mobile order app increases sales 45%'}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Cliente' : 'Client'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Distribuidora de alimentos (250 clientes, 60 vendedores)'
                          : 'Food distributor (250 clients, 60 salespeople)'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Situación' : 'Situation'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Vendedores de campo tomaban pedidos en papel, los transcribían a Excel al regresar a oficina (fin del día). Proceso lento: cliente espera 24-48 horas confirmación de pedido. Errores frecuentes en transcripción (8-12% pedidos con error). Vendedores sin visibilidad de inventario en campo (prometen productos sin stock).'
                          : 'Field salespeople took orders on paper, transcribed them to Excel when returning to office (end of day). Slow process: client waits 24-48 hours for order confirmation. Frequent transcription errors (8-12% orders with error). Salespeople without inventory visibility in field (promise products without stock).'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-foreground/70 mb-3">
                        {isEs 
                          ? 'App móvil desarrollada en 4 meses:'
                          : 'Mobile app developed in 4 months:'}
                      </p>
                      <ul className="space-y-2 text-foreground/70 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Catálogo de Productos - 2,000 SKUs con fotos, disponibilidad tiempo real, precios personalizados' : 'Product Catalog - 2,000 SKUs with photos, real-time availability, personalized prices'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Toma de Pedidos - Búsqueda rápida, carrito intuitivo, sugerencias basadas en historial' : 'Order Taking - Quick search, intuitive cart, suggestions based on history'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Información de Cliente - Historial, saldo pendiente, productos más comprados' : 'Client Information - History, pending balance, most purchased products'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Modo Offline - App funciona sin internet, sincroniza cuando vuelve conectividad' : 'Offline Mode - App works without internet, syncs when connectivity returns'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Firma Digital - Cliente firma pedido en tablet/móvil, evidencia digital' : 'Digital Signature - Client signs order on tablet/mobile, digital evidence'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Dashboard de Vendedor - Ventas del día/mes, meta vs real, comisiones' : 'Salesperson Dashboard - Day/month sales, goal vs actual, commissions'}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Tecnología' : 'Technology'}
                      </h4>
                      <p className="text-foreground/70 text-sm">
                        {isEs 
                          ? 'React Native (iOS + Android con un código base) | Integración: App integrada con ERP existente vía APIs'
                          : 'React Native (iOS + Android with one codebase) | Integration: App integrated with existing ERP via APIs'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-azul-marino dark:text-white mb-4">
                      {isEs ? 'Resultados (9 meses post-lanzamiento)' : 'Results (9 months post-launch)'}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { value: '97%', label: isEs ? 'Adopción' : 'Adoption', sub: isEs ? '58 de 60 vendedores' : '58 of 60 salespeople' },
                        { value: '90%', label: isEs ? 'Pedidos digitales' : 'Digital orders', sub: isEs ? '0% → 90%' : '0% → 90%' },
                        { value: 'Instantáneo', label: isEs ? 'Confirmación' : 'Confirmation', sub: isEs ? '24-48h → instantáneo' : '24-48h → instant' },
                        { value: '1.5%', label: isEs ? 'Errores pedidos' : 'Order errors', sub: isEs ? '10% → 1.5%' : '10% → 1.5%' },
                        { value: '+50%', label: isEs ? 'Pedidos/vendedor/día' : 'Orders/salesperson/day', sub: isEs ? '8 → 12' : '8 → 12' },
                        { value: '+45%', label: isEs ? 'Ventas totales' : 'Total sales', sub: isEs ? '9 meses' : '9 months' },
                        { value: '+35%', label: isEs ? 'Satisfacción clientes' : 'Client satisfaction', sub: isEs ? 'Confirmación rápida' : 'Fast confirmation' },
                        { value: '320%', label: isEs ? 'ROI' : 'ROI', sub: isEs ? 'Primer año' : 'First year' }
                      ].map((stat, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          className="bg-white dark:bg-background p-4 rounded-2xl shadow-brand text-center"
                        >
                          <div className="text-2xl font-bold text-turquesa mb-1">
                            {stat.value}
                          </div>
                          <div className="text-xs font-medium text-azul-marino dark:text-white">
                            {stat.label}
                          </div>
                          <div className="text-xs text-foreground/50">{stat.sub}</div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-turquesa/10 p-4 rounded-xl border border-turquesa/20 mb-6">
                      <p className="text-sm text-foreground/70">
                        <strong className="text-azul-marino dark:text-white">{isEs ? 'Factor Crítico:' : 'Critical Factor:'}</strong>{' '}
                        {isEs 
                          ? 'Modo offline fue esencial. Vendedores visitan zonas rurales sin señal celular confiable. Sin offline, app no hubiera funcionado.'
                          : 'Offline mode was essential. Salespeople visit rural areas without reliable cell signal. Without offline, app wouldn\'t have worked.'}
                      </p>
                    </div>

                    <div className="bg-menta/10 p-4 rounded-xl border border-menta/20">
                      <p className="text-sm text-foreground/70">
                        <strong className="text-azul-marino dark:text-white">{isEs ? 'Inversión:' : 'Investment:'}</strong>{' '}
                        {isEs 
                          ? 'Desarrollo app: $45K | Tablets para vendedores: $18K (60 tablets Android) | Total: $63K | ROI: 320% primer año'
                          : 'App development: $45K | Tablets for salespeople: $18K (60 Android tablets) | Total: $63K | ROI: 320% first year'}
                      </p>
                    </div>
                  </div>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                  {isEs 
                    ? '"App móvil transformó fuerza de ventas. Pedidos instantáneos, cero errores, vendedores más productivos. Ventas 45% arriba en 9 meses."'
                    : '"Mobile app transformed sales force. Instant orders, zero errors, more productive salespeople. Sales 45% up in 9 months."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— {isEs ? 'Gerente Comercial' : 'Commercial Manager'}</span>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* =====================================================
          NATIVA VS CROSS-PLATFORM SECTION - Tabla Comparativa
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿App nativa o cross-platform para tu proyecto?' : 'Native or cross-platform app for your project?'}
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white dark:bg-background rounded-2xl p-8 shadow-brand overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-4 text-foreground/60 font-medium bg-turquesa/10 
                                   border-b-2 border-turquesa/30 rounded-tl-lg">
                      {isEs ? 'Factor' : 'Factor'}
                    </th>
                    <th className="text-left py-4 px-4 text-foreground/60 font-medium bg-menta/10 
                                   border-b-2 border-menta/30">
                      {isEs ? 'Nativa (Swift + Kotlin)' : 'Native (Swift + Kotlin)'}
                    </th>
                    <th className="text-left py-4 px-4 text-foreground/60 font-medium bg-violeta/10 
                                   border-b-2 border-violeta/30 rounded-tr-lg">
                      {isEs ? 'Cross-Platform (React Native/Flutter)' : 'Cross-Platform (React Native/Flutter)'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nativeVsCross.map((row, idx) => (
                    <tr key={idx} className={`border-b border-gris-arena/20 hover:bg-blanco-hueso/50 
                                              dark:hover:bg-card/50 transition-colors
                                              ${idx % 2 === 0 ? 'bg-white' : 'bg-blanco-hueso/30'}
                                              ${idx === nativeVsCross.length - 1 ? 'border-b-0' : ''}`}>
                      <td className="py-4 px-4 text-azul-marino dark:text-white font-medium">
                        {row.aspect}
                      </td>
                      <td className="py-4 px-4 text-foreground/70">
                        {row.native}
                      </td>
                      <td className="py-4 px-4 text-foreground/70">
                        {row.cross}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-menta/10 p-6 rounded-2xl border border-menta/20">
                <h4 className="font-semibold text-azul-marino dark:text-white mb-3">
                  {isEs ? 'Elige Nativa si:' : 'Choose Native if:'}
                </h4>
                <ul className="space-y-2 text-foreground/70 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Performance crítico (gaming, video, AR)' : 'Critical performance (gaming, video, AR)'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Necesitas funcionalidades cutting-edge del OS' : 'You need cutting-edge OS features'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Presupuesto permite' : 'Budget allows'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Solo 1 plataforma (iOS o Android únicamente)' : 'Only 1 platform (iOS or Android only)'}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-turquesa/10 p-6 rounded-2xl border border-turquesa/20">
                <h4 className="font-semibold text-azul-marino dark:text-white mb-3">
                  {isEs ? 'Elige Cross-Platform si:' : 'Choose Cross-Platform if:'}
                </h4>
                <ul className="space-y-2 text-foreground/70 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'App empresarial estándar' : 'Standard enterprise app'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Presupuesto moderado' : 'Moderate budget'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Necesitas iOS + Android' : 'You need iOS + Android'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Time-to-market es crítico' : 'Time-to-market is critical'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-6 text-center">
            <p className="text-lg text-turquesa font-semibold">
              {isEs 
                ? 'Nuestra experiencia: 70% de proyectos usan React Native (cross-platform), 30% nativos. React Native cubre 90% de casos de uso perfectamente a 50% del costo.'
                : 'Our experience: 70% of projects use React Native (cross-platform), 30% native. React Native covers 90% of use cases perfectly at 50% of cost.'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          FAQ SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Preguntas frecuentes' : 'Frequently Asked Questions'}
            </h2>
          </AnimatedSection>

          <AnimatedSection className="max-w-3xl mx-auto">
            <div className="bg-blanco-hueso dark:bg-card rounded-2xl p-8">
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

      {/* =====================================================
          CTA FINAL SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-violeta relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-turquesa/10 rounded-full blur-2xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs ? '¿Listo para desarrollar tu app web o móvil?' : 'Ready to develop your web or mobile app?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Discovery session gratuita de 30 minutos. Entendemos tu visión, definimos alcance y estimamos inversión.'
                  : 'Free 30-minute discovery session. We understand your vision, define scope and estimate investment.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Definición de audiencia target y objetivos' : 'Target audience and objectives definition',
                  isEs ? 'Wireframes preliminares de pantallas clave' : 'Preliminary wireframes of key screens',
                  isEs ? 'Recomendación tecnológica (nativa vs cross-platform)' : 'Technology recommendation (native vs cross-platform)',
                  isEs ? 'Estimación de alcance, costo y timeline' : 'Scope, cost and timeline estimation',
                  isEs ? 'Roadmap de lanzamiento' : 'Launch roadmap'
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
                    className="inline-flex items-center gap-3 bg-turquesa text-azul-marino 
                               font-semibold px-8 py-4 rounded-lg hover:bg-menta 
                               transition-all duration-300 shadow-lg group"
                  >
                    {isEs ? 'Desarrollar App Web/Móvil' : 'Develop Web/Mobile App'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href="https://wa.me/50769908906"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm 
                               text-white font-medium px-8 py-4 rounded-lg 
                               hover:bg-white/20 transition-all duration-300 border border-white/20"
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

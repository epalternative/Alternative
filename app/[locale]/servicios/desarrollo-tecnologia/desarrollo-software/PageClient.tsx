'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import {
  Code,
  ArrowRight,
  ChevronDown,
  Wrench,
  Database,
  BarChart3,
  Zap,
  Rocket,
  TrendingUp,
  CheckCircle2,
  Building2,
  Phone,
  AlertTriangle,
  FileText,
  Sparkles,
  Shield,
  Clock,
  Target,
  Laptop,
  Layers,
  Search,
  Calendar,
  Monitor,
  BookOpen,
  Users,
  Settings,
  GitBranch,
  Server,
  RefreshCw,
  Plug
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

export default function DesarrolloSoftwarePage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Desarrollo & Tecnología' : 'Development & Technology', href: `/${locale}/servicios/desarrollo-tecnologia` },
    { label: isEs ? 'Desarrollo de Software' : 'Software Development', href: null }
  ];

  const forWho = [
    {
      icon: Wrench,
      title: isEs ? 'Procesos operativos únicos de tu industria' : 'Unique operational processes of your industry',
      description: isEs
        ? 'Tu operación tiene flujos específicos que ningún software estándar maneja. ERP genérico no soporta particularidades críticas de tu negocio.'
        : 'Your operation has specific flows that no standard software handles. Generic ERP doesn\'t support critical particularities of your business.',
      color: 'turquesa'
    },
    {
      icon: Database,
      title: isEs ? 'Gestión de información compleja o regulada' : 'Complex or regulated information management',
      description: isEs
        ? 'Manejas datos con reglas de negocio complejas, trazabilidad estricta, cumplimiento regulatorio específico que software genérico no soporta.'
        : 'You handle data with complex business rules, strict traceability, specific regulatory compliance that generic software doesn\'t support.',
      color: 'menta'
    },
    {
      icon: Zap,
      title: isEs ? 'Automatización de procesos internos repetitivos' : 'Automation of repetitive internal processes',
      description: isEs
        ? 'Procesos manuales que consumen tiempo: consolidación de datos, generación de reportes, flujos de aprobación, cálculos complejos.'
        : 'Manual processes that consume time: data consolidation, report generation, approval flows, complex calculations.',
      color: 'violeta'
    },
    {
      icon: Rocket,
      title: isEs ? 'Software es tu producto o ventaja competitiva' : 'Software is your product or competitive advantage',
      description: isEs
        ? 'Tu diferenciación está en tecnología propietaria: algoritmos, experiencia única, plataforma digital que es tu core business.'
        : 'Your differentiation is in proprietary technology: algorithms, unique experience, digital platform that is your core business.',
      color: 'turquesa'
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'Software comercial es prohibitivo o inflexible' : 'Commercial software is prohibitive or inflexible',
      description: isEs
        ? 'Licencias de $100K+ anuales para usar 30% de funcionalidades. O vendor no permite customizaciones críticas para tu operación.'
        : 'Licenses of $100K+ annually to use 30% of features. Or vendor doesn\'t allow critical customizations for your operation.',
      color: 'menta'
    },
    {
      icon: RefreshCw,
      title: isEs ? 'Reemplazo de sistemas legacy obsoletos' : 'Replacement of obsolete legacy systems',
      description: isEs
        ? 'Sistema antiguo (15+ años) que nadie mantiene, tecnología obsoleta, pero es crítico para operación. Necesitas modernizar.'
        : 'Old system (15+ years) that no one maintains, obsolete technology, but is critical for operation. You need to modernize.',
      color: 'violeta'
    }
  ];

  const softwareTypes = [
    {
      title: isEs ? 'SISTEMAS DE GESTIÓN EMPRESARIAL (ERP/ERM)' : 'ENTERPRISE MANAGEMENT SYSTEMS (ERP/ERM)',
      description: isEs
        ? 'Software que gestiona operaciones core del negocio: ventas, inventario, compras, finanzas, producción, logística.'
        : 'Software that manages core business operations: sales, inventory, purchases, finance, production, logistics.',
      when: isEs
        ? 'Industria muy específica (distribución farmacéutica, manufactura por lotes, servicios especializados) donde ERPs genéricos no encajan.'
        : 'Very specific industry (pharmaceutical distribution, batch manufacturing, specialized services) where generic ERPs don\'t fit.',
      examples: isEs
        ? ['Sistema de gestión para distribuidora con rutas optimizadas', 'ERP para manufactura con control de lotes/vencimientos', 'Sistema para empresa de servicios con billing complejo']
        : ['Management system for distributor with optimized routes', 'ERP for manufacturing with lot/expiration control', 'System for service company with complex billing'],
      icon: Settings,
      color: 'turquesa'
    },
    {
      title: isEs ? 'APLICACIONES DE GESTIÓN OPERACIONAL' : 'OPERATIONAL MANAGEMENT APPLICATIONS',
      description: isEs
        ? 'Herramientas para gestionar operaciones específicas: producción, logística, mantenimiento, proyectos, recursos.'
        : 'Tools to manage specific operations: production, logistics, maintenance, projects, resources.',
      when: isEs
        ? 'Proceso operacional muy particular que no se mapea a software estándar.'
        : 'Very particular operational process that doesn\'t map to standard software.',
      examples: isEs
        ? ['Sistema de gestión de flota con tracking GPS', 'Aplicación de mantenimiento predictivo de maquinaria', 'Herramienta de planificación de producción', 'Sistema de gestión de proyectos con facturación']
        : ['Fleet management system with GPS tracking', 'Predictive machinery maintenance application', 'Production planning tool', 'Project management system with billing'],
      icon: Settings,
      color: 'menta'
    },
    {
      title: isEs ? 'SISTEMAS DE INFORMACIÓN GERENCIAL (MIS)' : 'MANAGEMENT INFORMATION SYSTEMS (MIS)',
      description: isEs
        ? 'Plataformas que consolidan datos de múltiples fuentes para análisis, reportes y toma de decisiones.'
        : 'Platforms that consolidate data from multiple sources for analysis, reports and decision making.',
      when: isEs
        ? 'Necesitas consolidar data de sistemas heterogéneos con lógica de negocio específica que BI genérico no maneja.'
        : 'You need to consolidate data from heterogeneous systems with specific business logic that generic BI doesn\'t handle.',
      examples: isEs
        ? ['Dashboard gerencial consolidando 5+ sistemas', 'Plataforma de análisis de rentabilidad por cliente/producto', 'Sistema de reportería regulatoria automatizada']
        : ['Management dashboard consolidating 5+ systems', 'Profitability analysis platform by client/product', 'Automated regulatory reporting system'],
      icon: BarChart3,
      color: 'violeta'
    },
    {
      title: isEs ? 'HERRAMIENTAS INTERNAS DE PRODUCTIVIDAD' : 'INTERNAL PRODUCTIVITY TOOLS',
      description: isEs
        ? 'Aplicaciones que automatizan tareas internas: cálculos, validaciones, workflows, generación de documentos.'
        : 'Applications that automate internal tasks: calculations, validations, workflows, document generation.',
      when: isEs
        ? 'Proceso manual repetitivo que consume horas/semana y tiene reglas de negocio específicas.'
        : 'Repetitive manual process that consumes hours/week and has specific business rules.',
      examples: isEs
        ? ['Herramienta de cotización con pricing complejo', 'Sistema de aprobaciones con workflows personalizados', 'Generador automático de contratos/documentos', 'Calculadora de comisiones con reglas específicas']
        : ['Quotation tool with complex pricing', 'Approval system with customized workflows', 'Automatic contract/document generator', 'Commission calculator with specific rules'],
      icon: Zap,
      color: 'turquesa'
    },
    {
      title: isEs ? 'PLATAFORMAS DIGITALES (CORE BUSINESS)' : 'DIGITAL PLATFORMS (CORE BUSINESS)',
      description: isEs
        ? 'Software que ES tu producto o servicio principal. Tu negocio depende completamente de esta tecnología.'
        : 'Software that IS your main product or service. Your business depends completely on this technology.',
      when: isEs
        ? 'Eres empresa tech o digital-first donde plataforma es tu diferenciador.'
        : 'You are a tech or digital-first company where platform is your differentiator.',
      examples: isEs
        ? ['Plataforma SaaS para industria específica', 'Marketplace vertical (B2B o B2C)', 'Sistema de gestión de clientes para nicho', 'Portal de servicios digitales']
        : ['SaaS platform for specific industry', 'Vertical marketplace (B2B or B2C)', 'Client management system for niche', 'Digital services portal'],
      icon: Rocket,
      color: 'menta'
    }
  ];

  const processPhases = [
    {
      phase: isEs ? 'DISCOVERY Y REQUISITOS' : 'DISCOVERY AND REQUIREMENTS',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Entrevistas con stakeholders clave, Mapeo de procesos actuales (as-is), Identificación de pain points y requisitos, Casos de uso principales, Definición de usuarios y roles'
        : 'Interviews with key stakeholders, Mapping of current processes (as-is), Identification of pain points and requirements, Main use cases, Definition of users and roles',
      icon: Search,
      deliverable: isEs ? 'Documento de requisitos funcionales + casos de uso' : 'Functional requirements document + use cases',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'DISEÑO DE SOLUCIÓN' : 'SOLUTION DESIGN',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Arquitectura de software (componentes, integraciones), Diseño de base de datos, Wireframes de interfaces principales, Selección de stack tecnológico, Estimación detallada de esfuerzo'
        : 'Software architecture (components, integrations), Database design, Main interface wireframes, Technology stack selection, Detailed effort estimation',
      icon: Layers,
      deliverable: isEs ? 'Documento de diseño técnico + wireframes + propuesta final' : 'Technical design document + wireframes + final proposal',
      color: 'menta'
    },
    {
      phase: isEs ? 'DESARROLLO ITERATIVO' : 'ITERATIVE DEVELOPMENT',
      duration: isEs ? '8-20 semanas' : '8-20 weeks',
      description: isEs
        ? 'Metodología: Sprints de 2-3 semanas. Cada Sprint incluye: Desarrollo de funcionalidades priorizadas, Testing interno continuo, Demo al cliente al final del sprint, Feedback y ajustes para siguiente sprint'
        : 'Methodology: 2-3 week sprints. Each Sprint includes: Development of prioritized features, Continuous internal testing, Client demo at end of sprint, Feedback and adjustments for next sprint',
      icon: Code,
      deliverable: isEs ? 'Sistema funcionando con funcionalidades core completadas' : 'System working with core features completed',
      color: 'violeta'
    },
    {
      phase: isEs ? 'TESTING Y QA' : 'TESTING AND QA',
      duration: isEs ? '2-3 semanas' : '2-3 weeks',
      description: isEs
        ? 'Testing funcional exhaustivo, Testing de integración con sistemas existentes, Testing de carga/performance, Testing de seguridad, UAT (User Acceptance Testing) con usuarios reales'
        : 'Exhaustive functional testing, Integration testing with existing systems, Load/performance testing, Security testing, UAT (User Acceptance Testing) with real users',
      icon: Shield,
      deliverable: isEs ? 'Sistema validado y aprobado por cliente' : 'System validated and approved by client',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'DESPLIEGUE Y CAPACITACIÓN' : 'DEPLOYMENT AND TRAINING',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Despliegue en ambiente productivo, Migración de datos (si aplica), Capacitación a usuarios finales, Capacitación a administradores, Documentación de usuario'
        : 'Deployment in production environment, Data migration (if applicable), End user training, Administrator training, User documentation',
      icon: Users,
      deliverable: isEs ? 'Sistema en producción + usuarios capacitados' : 'System in production + trained users',
      color: 'menta'
    },
    {
      phase: isEs ? 'SOPORTE POST-LANZAMIENTO' : 'POST-LAUNCH SUPPORT',
      duration: isEs ? '3-6 meses' : '3-6 months',
      description: isEs
        ? 'Soporte intensivo primeras semanas, Corrección de bugs, Ajustes basados en uso real, Optimizaciones de performance, Nuevas funcionalidades menores'
        : 'Intensive support first weeks, Bug fixes, Adjustments based on real usage, Performance optimizations, Minor new features',
      icon: Monitor,
      deliverable: isEs ? 'Sistema estable y maduro' : 'Stable and mature system',
      color: 'violeta'
    }
  ];

  const includes = [
    {
      title: isEs ? 'Desarrollo' : 'Development',
      icon: Code,
      items: isEs
        ? ['Código fuente completo (propiedad del cliente)', 'Base de datos diseñada y optimizada', 'Interfaces de usuario responsivas', 'Integraciones con sistemas existentes', 'APIs para extensiones futuras']
        : ['Complete source code (client property)', 'Designed and optimized database', 'Responsive user interfaces', 'Integrations with existing systems', 'APIs for future extensions'],
      color: 'turquesa'
    },
    {
      title: isEs ? 'Infraestructura' : 'Infrastructure',
      icon: Server,
      items: isEs
        ? ['Hosting en cloud (Azure/AWS) configurado', 'Seguridad (SSL, encriptación, backups)', 'Escalabilidad para crecimiento', 'Monitoreo y alertas', 'Disaster recovery']
        : ['Cloud hosting (Azure/AWS) configured', 'Security (SSL, encryption, backups)', 'Scalability for growth', 'Monitoring and alerts', 'Disaster recovery'],
      color: 'menta'
    },
    {
      title: isEs ? 'Capacitación y Documentación' : 'Training and Documentation',
      icon: BookOpen,
      items: isEs
        ? ['Capacitación a usuarios finales', 'Capacitación a administradores/IT', 'Manual de usuario', 'Documentación técnica', 'Videos tutoriales']
        : ['End user training', 'Administrator/IT training', 'User manual', 'Technical documentation', 'Tutorial videos'],
      color: 'violeta'
    },
    {
      title: isEs ? 'Soporte' : 'Support',
      icon: Shield,
      items: isEs
        ? ['Garantía de 3-6 meses post-lanzamiento', 'Corrección de bugs sin costo', 'Soporte técnico vía email/teléfono', 'Ajustes menores basados en uso', 'Opción de contrato de soporte ongoing']
        : ['3-6 month post-launch warranty', 'Bug fixes at no cost', 'Technical support via email/phone', 'Minor adjustments based on usage', 'Option for ongoing support contract'],
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '100%', label: isEs ? 'Adaptado a tus procesos específicos' : 'Adapted to your specific processes', icon: Code },
    { value: 'Propiedad', label: isEs ? 'Código fuente es tuyo completamente' : 'Source code is completely yours', icon: Shield },
    { value: 'Escalable', label: isEs ? 'Crece con tu negocio sin límites' : 'Grows with your business without limits', icon: TrendingUp },
    { value: 'Integrable', label: isEs ? 'Con cualquier sistema que tengas' : 'With any system you have', icon: Plug },
    { value: 'Mantenible', label: isEs ? 'Soporte continuo disponible' : 'Continuous support available', icon: Clock },
    { value: 'ROI', label: isEs ? 'Típico 150-300% en 18-24 meses' : 'Typical 150-300% in 18-24 months', icon: Target }
  ];

  const buildVsBuy = [
    { 
      aspect: isEs ? 'Adaptación' : 'Adaptation',
      custom: isEs ? '100% adaptado a tu proceso' : '100% adapted to your process',
      commercial: isEs ? '60-80% fit, debes adaptar proceso' : '60-80% fit, you must adapt process'
    },
    { 
      aspect: isEs ? 'Costo inicial' : 'Initial cost',
      custom: isEs ? 'Mayor' : 'Higher',
      commercial: isEs ? 'Menor' : 'Lower'
    },
    { 
      aspect: isEs ? 'Costo anual' : 'Annual cost',
      custom: isEs ? 'Bajo (solo soporte)' : 'Low (support only)',
      commercial: isEs ? 'Alto (licencias anuales)' : 'High (annual licenses)'
    },
    { 
      aspect: isEs ? 'Tiempo implementación' : 'Implementation time',
      custom: isEs ? '3-6 meses' : '3-6 months',
      commercial: isEs ? '1-4 meses' : '1-4 months'
    },
    { 
      aspect: isEs ? 'Propiedad' : 'Ownership',
      custom: isEs ? 'Tuyo (código + datos)' : 'Yours (code + data)',
      commercial: isEs ? 'Del vendor (dependencia)' : 'Vendor\'s (dependency)'
    },
    { 
      aspect: isEs ? 'Customización' : 'Customization',
      custom: isEs ? 'Ilimitada' : 'Unlimited',
      commercial: isEs ? 'Limitada o costosa' : 'Limited or expensive'
    },
    { 
      aspect: isEs ? 'Soporte' : 'Support',
      custom: isEs ? 'Continuo con proveedor o interno' : 'Continuous with provider or internal',
      commercial: isEs ? 'Dependes del vendor' : 'You depend on vendor'
    },
    { 
      aspect: isEs ? 'Escalabilidad' : 'Scalability',
      custom: isEs ? 'Ilimitada' : 'Unlimited',
      commercial: isEs ? 'Según planes del vendor' : 'According to vendor plans'
    },
    { 
      aspect: isEs ? 'Riesgo vendor' : 'Vendor risk',
      custom: isEs ? 'Ninguno (es tuyo)' : 'None (it\'s yours)',
      commercial: isEs ? 'Alto (vendor discontinúa, sube precios)' : 'High (vendor discontinues, raises prices)'
    }
  ];

  const faqs = [
    {
      question: isEs ? '¿Cuánto cuesta realmente desarrollar software custom?' : 'How much does it really cost to develop custom software?',
      answer: isEs
        ? 'Rangos típicos según complejidad: Software simple (1-2 módulos, <20 pantallas, usuarios limitados): $25K-$50K. Software mediano (3-5 módulos, integración con 2-3 sistemas, <100 usuarios): $50K-$120K. Software complejo (5+ módulos, integraciones múltiples, >100 usuarios, alta transaccionalidad): $120K-$300K+. Factores que influyen: cantidad de funcionalidades, integraciones, usuarios concurrentes, seguridad/cumplimiento, móvil adicional a web, complejidad de lógica de negocio. Hacemos discovery y estimamos con precisión antes de ejecución.'
        : 'Typical ranges according to complexity: Simple software (1-2 modules, <20 screens, limited users): $25K-$50K. Medium software (3-5 modules, integration with 2-3 systems, <100 users): $50K-$120K. Complex software (5+ modules, multiple integrations, >100 users, high transactionality): $120K-$300K+. Factors that influence: number of features, integrations, concurrent users, security/compliance, mobile in addition to web, business logic complexity. We do discovery and estimate accurately before execution.'
    },
    {
      question: isEs ? '¿Metodología ágil vs cascada: qué significa en la práctica?' : 'Agile vs waterfall methodology: what does it mean in practice?',
      answer: isEs
        ? 'Ágil (nuestra preferencia): Desarrollamos en sprints de 2-3 semanas. Cada sprint entrega funcionalidades funcionando que puedes ver y probar. Puedes ajustar prioridades entre sprints. Ventaja: flexibilidad, ves progreso constante, reduces riesgo (si algo no va bien, lo detectas temprano). Cascada: Definimos TODO upfront, desarrollamos 6 meses, entregas al final. Riesgo: si requisitos cambiaron o había mal entendidos, los descubres al final. Usamos cascada solo cuando cliente prefiere o contrato gubernamental lo requiere. 90% de proyectos son ágiles.'
        : 'Agile (our preference): We develop in 2-3 week sprints. Each sprint delivers working features you can see and test. You can adjust priorities between sprints. Advantage: flexibility, you see constant progress, reduce risk (if something goes wrong, you detect it early). Waterfall: We define EVERYTHING upfront, develop 6 months, deliver at end. Risk: if requirements changed or there were misunderstandings, you discover them at end. We use waterfall only when client prefers or government contract requires it. 90% of projects are agile.'
    },
    {
      question: isEs ? '¿Qué pasa si mis requisitos cambian durante desarrollo?' : 'What happens if my requirements change during development?',
      answer: isEs
        ? 'En metodología ágil, cambios son esperados y manejables. Cambios menores (ajustar formulario, cambiar validación): Se incorporan en sprint actual o siguiente sin costo adicional. Cambios significativos (nuevo módulo, nueva integración): Evaluamos impacto en tiempo/costo, presentamos opciones (agregar al scope con ajuste de presupuesto, o diferir a fase 2). Cambios mayores (cambio fundamental de concepto): Puede requerir re-estimación del proyecto. Transparencia total: siempre comunicamos impacto de cambios ANTES de ejecutar.'
        : 'In agile methodology, changes are expected and manageable. Minor changes (adjust form, change validation): Incorporated in current or next sprint at no additional cost. Significant changes (new module, new integration): We evaluate impact on time/cost, present options (add to scope with budget adjustment, or defer to phase 2). Major changes (fundamental concept change): May require project re-estimation. Total transparency: we always communicate impact of changes BEFORE executing.'
    },
    {
      question: isEs ? '¿Alternative mantiene el código rehén o cliente es dueño?' : 'Does Alternative hold code hostage or is client owner?',
      answer: isEs
        ? 'Cliente es dueño 100% del código fuente desde día 1. Al finalizar proyecto entregamos: código fuente completo, acceso a repositorio GitHub/Azure DevOps, base de datos con scripts, documentación técnica. Cliente puede: (1) Contratar Alternative para soporte ongoing (típico), (2) Contratar otro proveedor, (3) Mantener internamente si tiene desarrolladores. No hay lock-in. Diferencia vs muchos vendors que retienen código y cliente queda dependiente.'
        : 'Client owns 100% of source code from day 1. Upon project completion we deliver: complete source code, GitHub/Azure DevOps repository access, database with scripts, technical documentation. Client can: (1) Hire Alternative for ongoing support (typical), (2) Hire another provider, (3) Maintain internally if they have developers. No lock-in. Difference vs many vendors that retain code and client becomes dependent.'
    },
    {
      question: isEs ? '¿Puedo ver el sistema mientras se desarrolla o solo al final?' : 'Can I see the system while it\'s being developed or only at the end?',
      answer: isEs
        ? 'Ves progreso cada 2-3 semanas (cada sprint). Al final de cada sprint: (1) Demo en vivo de funcionalidades completadas (15-30 min), (2) Puedes probar en ambiente de testing, (3) Damos feedback sobre qué viene en siguiente sprint, (4) Tú priorizas qué es más importante siguiente. Nunca esperamos 6 meses para mostrarte algo. Si algo no te gusta, lo ajustamos en siguiente sprint. Transparencia y feedback continuo son clave de ágil.'
        : 'You see progress every 2-3 weeks (each sprint). At end of each sprint: (1) Live demo of completed features (15-30 min), (2) You can test in testing environment, (3) We give feedback on what\'s coming in next sprint, (4) You prioritize what\'s most important next. We never wait 6 months to show you something. If you don\'t like something, we adjust it in next sprint. Transparency and continuous feedback are key to agile.'
    },
    {
      question: isEs ? '¿Qué sucede después del lanzamiento? ¿Soporte incluido?' : 'What happens after launch? Is support included?',
      answer: isEs
        ? 'Garantía post-lanzamiento: 3-6 meses incluidos (según proyecto). Cubre: corrección de bugs, ajustes basados en uso real, soporte a usuarios. Después de garantía: Tres opciones: (1) Contrato de soporte Alternative: Mantenimiento, actualizaciones menores, soporte técnico, nuevas funcionalidades negociadas separadamente. (2) Soporte puntual: Pagas por hora según necesites (sin contrato). (3) Mantén internamente: Si tienes desarrolladores (tienes código fuente). Mayoría de clientes (80%) continúan con contrato de soporte Alternative por continuidad y conocimiento del sistema.'
        : 'Post-launch warranty: 3-6 months included (according to project). Covers: bug fixes, adjustments based on real usage, user support. After warranty: Three options: (1) Alternative support contract: Maintenance, minor updates, technical support, new features negotiated separately. (2) On-demand support: Pay per hour as needed (no contract). (3) Maintain internally: If you have developers (you have source code). Majority of clients (80%) continue with Alternative support contract for continuity and system knowledge.'
    }
  ];

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
          HERO SECTION - Unique Design with Code/Architecture
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        {/* Background Pattern - Code Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(108, 196, 212, 0.1) 2px, rgba(108, 196, 212, 0.1) 4px)
            `
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
                  <Code className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Desarrollo de Software' : 'Software Development'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Desarrollo & Tecnología' : 'Development & Technology'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Software a medida que resuelve problemas específicos de tu negocio'
                  : 'Custom software that solves specific problems of your business'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Desarrollo de software custom para automatizar procesos, gestionar operaciones complejas, manejar información crítica. Soluciones diseñadas específicamente para tus flujos de trabajo, no software genérico que debes adaptar.'
                  : 'Custom software development to automate processes, manage complex operations, handle critical information. Solutions designed specifically for your workflows, not generic software you must adapt.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Desarrolla tu Software' : 'Develop Your Software'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/casos-exito`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Ver proyectos de software' : 'View software projects'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '30+', label: isEs ? 'sistemas desarrollados' : 'systems developed' },
                  { value: 'Código', label: isEs ? 'fuente propiedad del cliente' : 'source code client property' },
                  { icon: true, label: isEs ? 'Metodología ágil con entregas iterativas' : 'Agile methodology with iterative deliveries' }
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

            {/* Right Visual - Code/Architecture Floating */}
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
                  className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative"
                >
                  {/* Code Window Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-turquesa" />
                    <div className="w-3 h-3 rounded-full bg-menta" />
                    <div className="w-3 h-3 rounded-full bg-violeta" />
                    <span className="ml-auto text-white/40 text-sm">
                      {isEs ? 'Arquitectura de Software' : 'Software Architecture'}
                    </span>
                  </div>

                  {/* Code Blocks Visualization */}
                  <div className="space-y-3 font-mono text-xs">
                    {[
                      { label: isEs ? 'Backend API' : 'Backend API', progress: 100, color: 'turquesa' },
                      { label: isEs ? 'Base de Datos' : 'Database', progress: 95, color: 'menta' },
                      { label: isEs ? 'Frontend UI' : 'Frontend UI', progress: 90, color: 'violeta' },
                      { label: isEs ? 'Integraciones' : 'Integrations', progress: 85, color: 'turquesa' }
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white/60">{item.label}</span>
                          <span className={`font-bold ${
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

                  {/* Architecture Layers */}
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {['UI', 'API', 'DB'].map((layer, idx) => (
                      <motion.div
                        key={idx}
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                        className="bg-white/5 rounded-lg p-2 text-center"
                      >
                        <span className="text-white/70 text-xs">{layer}</span>
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
                  <Code className="w-8 h-8 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUÉ ES DESARROLLO DE SOFTWARE CUSTOM SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs ? 'Software custom: tecnología diseñada para TU proceso' : 'Custom software: technology designed for YOUR process'}
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs 
                    ? 'Desarrollo de software custom es crear aplicaciones o sistemas desde cero diseñados específicamente para resolver problemas únicos de tu negocio. A diferencia de software comercial (SAP, Salesforce, QuickBooks) que sirve a múltiples empresas con procesos estándar, software custom se construye para tus flujos de trabajo específicos, tu industria particular, tus reglas de negocio únicas.'
                    : 'Custom software development is creating applications or systems from scratch specifically designed to solve unique problems of your business. Unlike commercial software (SAP, Salesforce, QuickBooks) that serves multiple companies with standard processes, custom software is built for your specific workflows, your particular industry, your unique business rules.'}
                </p>
                <p>
                  {isEs 
                    ? 'Casos típicos de uso: sistemas de gestión empresarial adaptados a industria específica (distribución, manufactura, servicios), herramientas internas para automatizar procesos complejos, aplicaciones para gestionar información propietaria o regulada, plataformas que son el core de tu negocio (si eres empresa tech).'
                    : 'Typical use cases: enterprise management systems adapted to specific industry (distribution, manufacturing, services), internal tools to automate complex processes, applications to manage proprietary or regulated information, platforms that are the core of your business (if you are a tech company).'}
                </p>
                <p>
                  {isEs 
                    ? 'Ventaja principal: Software hace exactamente lo que necesitas, no debes adaptar tu proceso al software. Desventaja: Costo y tiempo de desarrollo mayor que comprar licencia off-the-shelf. Cuándo justifica: Cuando tu diferenciación está en proceso único, cuando software comercial no existe para tu nicho, o cuando customizaciones a software comercial costarían más que desarrollo desde cero.'
                    : 'Main advantage: Software does exactly what you need, you don\'t have to adapt your process to software. Disadvantage: Development cost and time greater than buying off-the-shelf license. When it justifies: When your differentiation is in unique process, when commercial software doesn\'t exist for your niche, or when customizations to commercial software would cost more than development from scratch.'}
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
              {isEs ? '¿Cuándo desarrollo de software custom es la solución?' : 'When is custom software development the solution?'}
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
          TIPOS DE SOFTWARE SECTION - 5 Cards
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '5 tipos de software custom según necesidad' : '5 types of custom software according to need'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="space-y-6">
            {softwareTypes.map((type, idx) => {
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
                          {isEs ? 'Cuándo desarrollarlo custom:' : 'When to develop custom:'}
                        </div>
                        <p className="text-foreground/70 text-sm mb-4">
                          {type.when}
                        </p>
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
              {isEs ? 'Metodología ágil de desarrollo Alternative' : 'Alternative agile development methodology'}
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
              {isEs ? 'DURACIÓN TOTAL: 3-6 meses típicamente según complejidad' : 'TOTAL DURATION: 3-6 months typically according to complexity'}
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
                      {isEs ? 'Sistema custom reemplaza 5 Excels y reduce errores 95%' : 'Custom system replaces 5 Excels and reduces errors 95%'}
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
                          ? 'Empresa de logística de carga (120 empleados, 500 camiones, 2,000 clientes)'
                          : 'Cargo logistics company (120 employees, 500 trucks, 2,000 clients)'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Situación' : 'Situation'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Operación gestionada en 5 Excels masivos: Excel 1 (viajes programados), Excel 2 (camiones y disponibilidad), Excel 3 (facturación), Excel 4 (liquidación a transportistas), Excel 5 (comisiones vendedores). 3 personas dedicadas full-time a actualizar Excels. Errores frecuentes: doble asignación de camión, cálculos erróneos de facturación, pérdida de data por corrupción de archivo.'
                          : 'Operation managed in 5 massive Excels: Excel 1 (scheduled trips), Excel 2 (trucks and availability), Excel 3 (billing), Excel 4 (carrier settlement), Excel 5 (sales commissions). 3 people dedicated full-time to updating Excels. Frequent errors: double truck assignment, erroneous billing calculations, data loss due to file corruption.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Evaluación de Alternativas' : 'Alternative Evaluation'}
                      </h4>
                      <p className="text-foreground/70 mb-3">
                        {isEs 
                          ? 'TMS comercial (Transportation Management System): $80K implementación + $30K/año licencias. Muy genérico, no manejaba particularidades (subcontratación, comisiones complejas). Desarrollo custom: $65K inversión única, 100% adaptado.'
                          : 'Commercial TMS (Transportation Management System): $80K implementation + $30K/year licenses. Very generic, didn\'t handle particularities (subcontracting, complex commissions). Custom development: $65K one-time investment, 100% adapted.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-foreground/70 mb-3">
                        {isEs 
                          ? 'Sistema de Gestión de Transporte custom en 5 meses:'
                          : 'Custom Transportation Management System in 5 months:'}
                      </p>
                      <ul className="space-y-2 text-foreground/70 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Gestión de Viajes - Programación, asignación inteligente, tracking de estado' : 'Trip Management - Scheduling, intelligent assignment, status tracking'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Gestión de Flota - Disponibilidad tiempo real, mantenimientos, performance' : 'Fleet Management - Real-time availability, maintenance, performance'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Facturación Automática - Genera facturas desde viajes, cálculo automático, facturación electrónica' : 'Automatic Billing - Generates invoices from trips, automatic calculation, electronic billing'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Liquidación a Transportistas - Cálculo automático, descuentos, histórico' : 'Carrier Settlement - Automatic calculation, discounts, history'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Comisiones de Vendedores - Cálculo automático según reglas complejas, dashboard' : 'Sales Commissions - Automatic calculation according to complex rules, dashboard'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Reportes Gerenciales - Rentabilidad por ruta/cliente, utilización de flota, proyecciones' : 'Management Reports - Profitability by route/client, fleet utilization, projections'}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Stack Tecnológico' : 'Technology Stack'}
                      </h4>
                      <p className="text-foreground/70 text-sm">
                        {isEs 
                          ? 'Backend: .NET Core + SQL Server | Frontend: Angular | Hosting: Azure App Service | Integración: API REST con sistema contable'
                          : 'Backend: .NET Core + SQL Server | Frontend: Angular | Hosting: Azure App Service | Integration: REST API with accounting system'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-azul-marino dark:text-white mb-4">
                      {isEs ? 'Resultados (12 meses post-implementación)' : 'Results (12 months post-implementation)'}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { value: '0', label: isEs ? 'Excels masivos' : 'Massive Excels', sub: isEs ? '5 → 0' : '5 → 0' },
                        { value: '0.5%', label: isEs ? 'Errores asignación' : 'Assignment errors', sub: isEs ? '12% → 0.5%' : '12% → 0.5%' },
                        { value: 'Automática', label: isEs ? 'Facturación' : 'Billing', sub: isEs ? '2 días/mes → automática' : '2 days/month → automatic' },
                        { value: 'Automática', label: isEs ? 'Liquidación' : 'Settlement', sub: isEs ? '3 días/mes → automática' : '3 days/month → automatic' },
                        { value: 'Automático', label: isEs ? 'Cálculo comisiones' : 'Commission calculation', sub: isEs ? '1 día/mes → automático' : '1 day/month → automatic' },
                        { value: '100%', label: isEs ? 'Visibilidad operativa' : 'Operational visibility', sub: isEs ? 'Tiempo real' : 'Real time' },
                        { value: '-95%', label: isEs ? 'Errores facturación' : 'Billing errors', sub: '' },
                        { value: '220%', label: isEs ? 'ROI' : 'ROI', sub: isEs ? '18 meses' : '18 months' }
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
                        <strong className="text-azul-marino dark:text-white">{isEs ? 'Propiedad y Mantenimiento:' : 'Ownership and Maintenance:'}</strong>{' '}
                        {isEs 
                          ? 'Cliente dueño del código. Alternative provee soporte 12 meses ($800/mes), luego cliente puede: continuar con Alternative, contratar otro proveedor, o mantener internamente.'
                          : 'Client owns code. Alternative provides 12 months support ($800/month), then client can: continue with Alternative, hire another provider, or maintain internally.'}
                      </p>
                    </div>
                  </div>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                  {isEs 
                    ? '"Sistema custom nos costó menos que TMS comercial, hace exactamente lo que necesitamos y eliminó 95% de errores. Los 5 Excels eran una bomba de tiempo."'
                    : '"Custom system cost us less than commercial TMS, does exactly what we need and eliminated 95% of errors. The 5 Excels were a time bomb."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— {isEs ? 'Gerente de Operaciones' : 'Operations Manager'}</span>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* =====================================================
          BUILD VS BUY SECTION - Tabla Comparativa
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Desarrollar custom vs comprar software comercial?' : 'Develop custom vs buy commercial software?'}
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
                      {isEs ? 'Desarrollo Custom' : 'Custom Development'}
                    </th>
                    <th className="text-left py-4 px-4 text-foreground/60 font-medium bg-violeta/10 
                                   border-b-2 border-violeta/30 rounded-tr-lg">
                      {isEs ? 'Software Comercial' : 'Commercial Software'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {buildVsBuy.map((row, idx) => (
                    <tr key={idx} className={`border-b border-gris-arena/20 hover:bg-blanco-hueso/50 
                                              dark:hover:bg-card/50 transition-colors
                                              ${idx % 2 === 0 ? 'bg-white' : 'bg-blanco-hueso/30'}
                                              ${idx === buildVsBuy.length - 1 ? 'border-b-0' : ''}`}>
                      <td className="py-4 px-4 text-azul-marino dark:text-white font-medium">
                        {row.aspect}
                      </td>
                      <td className="py-4 px-4 text-foreground/70">
                        {row.custom}
                      </td>
                      <td className="py-4 px-4 text-foreground/70">
                        {row.commercial}
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
                  {isEs ? 'Compra software comercial si:' : 'Buy commercial software if:'}
                </h4>
                <ul className="space-y-2 text-foreground/70 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Proceso es estándar (contabilidad, CRM básico)' : 'Process is standard (accounting, basic CRM)'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Presupuesto inicial limitado' : 'Limited initial budget'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Necesitas solución en 1-2 meses' : 'You need solution in 1-2 months'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Múltiples vendors tienen soluciones probadas' : 'Multiple vendors have proven solutions'}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-turquesa/10 p-6 rounded-2xl border border-turquesa/20">
                <h4 className="font-semibold text-azul-marino dark:text-white mb-3">
                  {isEs ? 'Desarrolla custom si:' : 'Develop custom if:'}
                </h4>
                <ul className="space-y-2 text-foreground/70 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Proceso es único/diferenciador' : 'Process is unique/differentiator'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Software comercial no existe para tu nicho' : 'Commercial software doesn\'t exist for your niche'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Necesitas customizaciones profundas (costaría más que custom)' : 'You need deep customizations (would cost more than custom)'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Tu diferenciación está en tecnología' : 'Your differentiation is in technology'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Presupuesto permite' : 'Budget allows'}</span>
                  </li>
                </ul>
              </div>
            </div>
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
                {isEs ? '¿Tu negocio necesita software a medida?' : 'Does your business need custom software?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Discovery session gratuita de 30 minutos. Entendemos tu necesidad, evaluamos factibilidad técnica y desarrollamos estimación preliminar.'
                  : 'Free 30-minute discovery session. We understand your need, evaluate technical feasibility and develop preliminary estimation.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Entendimiento de problema de negocio' : 'Understanding of business problem',
                  isEs ? 'Mapeo de requisitos funcionales principales' : 'Mapping of main functional requirements',
                  isEs ? 'Evaluación de integraciones necesarias' : 'Evaluation of necessary integrations',
                  isEs ? 'Estimación preliminar de alcance y costo' : 'Preliminary scope and cost estimation',
                  isEs ? 'Recomendación build vs buy' : 'Build vs buy recommendation'
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
                    {isEs ? 'Solicitar Discovery Session' : 'Request Discovery Session'}
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

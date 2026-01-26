'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import {
  Network,
  ArrowRight,
  ChevronDown,
  FileText,
  AlertTriangle,
  Clock,
  TrendingUp,
  CheckCircle2,
  Building2,
  Phone,
  Sparkles,
  Shield,
  Target,
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
  Plug,
  GitBranch,
  RefreshCw,
  BarChart3,
  Settings
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

export default function IntegracionSistemasPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Desarrollo & Tecnología' : 'Development & Technology', href: `/${locale}/servicios/desarrollo-tecnologia` },
    { label: isEs ? 'Integración de Sistemas' : 'System Integration', href: null }
  ];

  const forWho = [
    {
      icon: FileText,
      title: isEs ? 'Trabajo manual copiando datos entre sistemas' : 'Manual work copying data between systems',
      description: isEs
        ? 'Empleados dedicando horas/semana transcribiendo información de un sistema a otro: ventas de CRM a ERP, pedidos de e-commerce a sistema de envíos.'
        : 'Employees dedicating hours/week transcribing information from one system to another: sales from CRM to ERP, orders from e-commerce to shipping system.',
      color: 'turquesa'
    },
    {
      icon: RefreshCw,
      title: isEs ? 'Datos inconsistentes entre sistemas' : 'Inconsistent data between systems',
      description: isEs
        ? 'Cliente tiene email diferente en CRM vs sistema de facturación. Inventario en e-commerce no coincide con ERP. Una fuente de verdad no existe.'
        : 'Client has different email in CRM vs billing system. Inventory in e-commerce doesn\'t match ERP. Single source of truth doesn\'t exist.',
      color: 'menta'
    },
    {
      icon: Clock,
      title: isEs ? 'Procesos lentos por esperas entre sistemas' : 'Slow processes due to waits between systems',
      description: isEs
        ? 'Venta requiere crear cliente en 3 sistemas manualmente antes de facturar. Proceso de 5 minutos toma 2 días por esperas.'
        : 'Sale requires creating client in 3 systems manually before billing. 5-minute process takes 2 days due to waits.',
      color: 'violeta'
    },
    {
      icon: BarChart3,
      title: isEs ? 'Sin visibilidad consolidada de información' : 'No consolidated information visibility',
      description: isEs
        ? 'Necesitas reporte que cruza datos de ventas (CRM) + finanzas (contabilidad) + operaciones (ERP). Alguien consolida manualmente en Excel.'
        : 'You need report that crosses sales data (CRM) + finance (accounting) + operations (ERP). Someone consolidates manually in Excel.',
      color: 'turquesa'
    },
    {
      icon: Zap,
      title: isEs ? 'Implementaste nuevo sistema que debe integrarse' : 'You implemented new system that must integrate',
      description: isEs
        ? 'Acabas de implementar CRM/ERP/e-commerce nuevo que debe conectarse con sistemas existentes para operar efectivamente.'
        : 'You just implemented new CRM/ERP/e-commerce that must connect with existing systems to operate effectively.',
      color: 'menta'
    },
    {
      icon: TrendingUp,
      title: isEs ? 'Escalando y trabajo manual no es sostenible' : 'Scaling and manual work is not sustainable',
      description: isEs
        ? 'Volumen de transacciones creciendo 50%+ anual. Personas copiando datos ya no dan abasto. Necesitas automatizar.'
        : 'Transaction volume growing 50%+ annually. People copying data can no longer keep up. You need to automate.',
      color: 'violeta'
    }
  ];

  const integrationTypes = [
    {
      title: isEs ? 'INTEGRACIÓN API REST' : 'REST API INTEGRATION',
      description: isEs
        ? 'Conexión directa entre sistemas vía APIs RESTful. Sistema A envía/recibe datos de sistema B en tiempo real o near-real-time.'
        : 'Direct connection between systems via RESTful APIs. System A sends/receives data from system B in real-time or near-real-time.',
      when: isEs
        ? 'Aplicaciones modernas con APIs documentadas, necesidad de tiempo real, transacciones bidireccionales.'
        : 'Modern applications with documented APIs, need for real-time, bidirectional transactions.',
      examples: isEs
        ? ['E-commerce → ERP (venta crea orden automáticamente)', 'CRM → Sistema facturación (cliente nuevo se replica)', 'App móvil → Backend (sincronización de datos)']
        : ['E-commerce → ERP (sale creates order automatically)', 'CRM → Billing system (new client replicates)', 'Mobile app → Backend (data synchronization)'],
      advantage: isEs ? 'Tiempo real, robusto, escalable' : 'Real-time, robust, scalable',
      icon: Network,
      color: 'turquesa'
    },
    {
      title: isEs ? 'MIDDLEWARE / iPaaS' : 'MIDDLEWARE / iPaaS',
      description: isEs
        ? 'Plataforma intermedia que orquesta flujos entre múltiples sistemas. Actúa como "director de orquesta" de integraciones.'
        : 'Intermediate platform that orchestrates flows between multiple systems. Acts as "conductor" of integrations.',
      tools: isEs ? 'MuleSoft, Dell Boomi, Azure Logic Apps, Zapier (low-code)' : 'MuleSoft, Dell Boomi, Azure Logic Apps, Zapier (low-code)',
      when: isEs
        ? 'Múltiples sistemas que necesitan integrarse (5+ aplicaciones), flujos complejos con lógica de negocio, transformaciones de datos.'
        : 'Multiple systems that need integration (5+ applications), complex flows with business logic, data transformations.',
      examples: isEs
        ? ['Flujo completo: Lead en web → CRM → Email marketing → ERP → Contabilidad', 'Sincronización maestros: Cliente actualizado en sistema 1 replica a sistemas 2-5']
        : ['Complete flow: Lead on web → CRM → Email marketing → ERP → Accounting', 'Master sync: Client updated in system 1 replicates to systems 2-5'],
      advantage: isEs ? 'Centraliza lógica de integración, reutilizable, visual' : 'Centralizes integration logic, reusable, visual',
      icon: Layers,
      color: 'menta'
    },
    {
      title: isEs ? 'ETL (EXTRACT, TRANSFORM, LOAD)' : 'ETL (EXTRACT, TRANSFORM, LOAD)',
      description: isEs
        ? 'Extracción periódica de datos de sistemas fuente, transformación/limpieza, carga en sistema destino o data warehouse.'
        : 'Periodic extraction of data from source systems, transformation/cleaning, load into destination system or data warehouse.',
      when: isEs
        ? 'Sincronización batch (no tiempo real), consolidación de datos para BI/analytics, migración de datos entre sistemas.'
        : 'Batch synchronization (not real-time), data consolidation for BI/analytics, data migration between systems.',
      examples: isEs
        ? ['Consolidar ventas de 5 sistemas en data warehouse para BI', 'Sincronización nocturna de inventario entre sucursales', 'Migración de datos de sistema viejo a nuevo']
        : ['Consolidate sales from 5 systems in data warehouse for BI', 'Nightly inventory synchronization between branches', 'Data migration from old system to new'],
      advantage: isEs ? 'Maneja grandes volúmenes, transformaciones complejas' : 'Handles large volumes, complex transformations',
      icon: Database,
      color: 'violeta'
    },
    {
      title: isEs ? 'WEBHOOKS / EVENTOS' : 'WEBHOOKS / EVENTS',
      description: isEs
        ? 'Sistema A notifica a sistema B automáticamente cuando ocurre evento específico. Push de información (vs pull periódico).'
        : 'System A notifies system B automatically when specific event occurs. Information push (vs periodic pull).',
      when: isEs
        ? 'Reaccionar a eventos en tiempo real, arquitecturas event-driven, notificaciones.'
        : 'React to events in real-time, event-driven architectures, notifications.',
      examples: isEs
        ? ['Stripe notifica cuando pago se completa → sistema activa servicio', 'GitHub notifica cuando hay commit → CI/CD pipeline se activa', 'Formulario web enviado → notificación a CRM + email']
        : ['Stripe notifies when payment completes → system activates service', 'GitHub notifies when there\'s commit → CI/CD pipeline activates', 'Web form submitted → notification to CRM + email'],
      advantage: isEs ? 'Real-time, eficiente (solo cuando hay evento)' : 'Real-time, efficient (only when there\'s event)',
      icon: Zap,
      color: 'turquesa'
    },
    {
      title: isEs ? 'RPA PARA INTEGRACIÓN' : 'RPA FOR INTEGRATION',
      description: isEs
        ? 'Bot de software que imita acciones humanas para "integrar" sistemas sin APIs: abre aplicación, extrae datos, ingresa en otro sistema.'
        : 'Software bot that mimics human actions to "integrate" systems without APIs: opens application, extracts data, enters in another system.',
      when: isEs
        ? 'Sistemas legacy sin APIs, solución temporal mientras se desarrolla integración real, bajo volumen transaccional.'
        : 'Legacy systems without APIs, temporary solution while real integration is developed, low transaction volume.',
      examples: isEs
        ? ['Bot extrae datos de sistema AS/400, los ingresa en sistema moderno', 'Bot procesa PDFs de facturas, extrae data, ingresa en contabilidad']
        : ['Bot extracts data from AS/400 system, enters it in modern system', 'Bot processes invoice PDFs, extracts data, enters in accounting'],
      advantage: isEs ? 'Funciona con cualquier sistema (incluso legacy), implementación rápida' : 'Works with any system (even legacy), quick implementation',
      disadvantage: isEs ? 'Frágil (si UI cambia, bot se rompe), no escalable' : 'Fragile (if UI changes, bot breaks), not scalable',
      icon: Zap,
      color: 'menta'
    }
  ];

  const processPhases = [
    {
      phase: isEs ? 'ARQUITECTURA DE INTEGRACIÓN' : 'INTEGRATION ARCHITECTURE',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Mapeo de sistemas existentes y flujos actuales, Identificación de puntos de integración críticos, Evaluación de APIs disponibles (documentación, capacidades), Diseño de arquitectura de integración, Selección de tecnologías (APIs directas, middleware, ETL)'
        : 'Mapping of existing systems and current flows, Identification of critical integration points, Evaluation of available APIs (documentation, capabilities), Integration architecture design, Technology selection (direct APIs, middleware, ETL)',
      icon: Layers,
      deliverable: isEs ? 'Arquitectura de integración + diagrama de flujos' : 'Integration architecture + flow diagram',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'DESARROLLO DE CONECTORES' : 'CONNECTOR DEVELOPMENT',
      duration: isEs ? '2-6 semanas' : '2-6 weeks',
      description: isEs
        ? 'Desarrollo de APIs si sistemas no las tienen, Configuración de conectores pre-built (si existen), Desarrollo custom de integraciones, Mapeo de campos entre sistemas, Lógica de transformación de datos'
        : 'API development if systems don\'t have them, Pre-built connector configuration (if they exist), Custom integration development, Field mapping between systems, Data transformation logic',
      icon: Code,
      deliverable: isEs ? 'Conectores desarrollados y testeados en ambiente dev' : 'Connectors developed and tested in dev environment',
      color: 'menta'
    },
    {
      phase: isEs ? 'LÓGICA DE NEGOCIO' : 'BUSINESS LOGIC',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Reglas de negocio de sincronización, Manejo de excepciones y errores, Validaciones de datos, Flujos de aprobación (si aplica), Logging y auditoría'
        : 'Synchronization business rules, Exception and error handling, Data validations, Approval flows (if applicable), Logging and auditing',
      icon: Settings,
      deliverable: isEs ? 'Lógica de negocio implementada' : 'Business logic implemented',
      color: 'violeta'
    },
    {
      phase: isEs ? 'TESTING Y VALIDACIÓN' : 'TESTING AND VALIDATION',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Testing de flujos completos end-to-end, Testing de volumen (cargas altas), Testing de excepciones (qué pasa si sistema destino está caído), Validación con usuarios clave, Ajustes basados en testing'
        : 'End-to-end complete flow testing, Volume testing (high loads), Exception testing (what happens if destination system is down), Validation with key users, Adjustments based on testing',
      icon: Shield,
      deliverable: isEs ? 'Integración validada y lista para producción' : 'Integration validated and ready for production',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'DESPLIEGUE Y MONITOREO' : 'DEPLOYMENT AND MONITORING',
      duration: isEs ? '1 semana' : '1 week',
      description: isEs
        ? 'Despliegue en ambiente productivo, Migración de datos históricos (si aplica), Configuración de monitoreo y alertas, Capacitación a equipo IT del cliente, Soporte intensivo primeras semanas'
        : 'Deployment in production environment, Historical data migration (if applicable), Monitoring and alerts configuration, Client IT team training, Intensive support first weeks',
      icon: Monitor,
      deliverable: isEs ? 'Integración operando en producción con monitoreo' : 'Integration operating in production with monitoring',
      color: 'menta'
    }
  ];

  const includes = [
    {
      title: isEs ? 'Análisis y Diseño' : 'Analysis and Design',
      icon: Search,
      items: isEs
        ? ['Mapeo de sistemas y flujos actuales', 'Arquitectura de integración diseñada', 'Evaluación de APIs y capacidades técnicas', 'Diseño de mapeo de datos', 'Estrategia de manejo de errores']
        : ['Mapping of systems and current flows', 'Designed integration architecture', 'API and technical capabilities evaluation', 'Data mapping design', 'Error handling strategy'],
      color: 'turquesa'
    },
    {
      title: isEs ? 'Desarrollo' : 'Development',
      icon: Code,
      items: isEs
        ? ['Conectores custom desarrollados', 'Lógica de transformación de datos', 'Validaciones y reglas de negocio', 'Manejo de excepciones', 'APIs creadas si sistemas no las tienen']
        : ['Custom connectors developed', 'Data transformation logic', 'Validations and business rules', 'Exception handling', 'APIs created if systems don\'t have them'],
      color: 'menta'
    },
    {
      title: isEs ? 'Infraestructura' : 'Infrastructure',
      icon: Cloud,
      items: isEs
        ? ['Middleware configurado (si aplica)', 'Ambiente de integración seguro', 'Logging y auditoría completa', 'Monitoreo con alertas automáticas', 'Backups y disaster recovery']
        : ['Middleware configured (if applicable)', 'Secure integration environment', 'Complete logging and auditing', 'Monitoring with automatic alerts', 'Backups and disaster recovery'],
      color: 'violeta'
    },
    {
      title: isEs ? 'Documentación y Soporte' : 'Documentation and Support',
      icon: BookOpen,
      items: isEs
        ? ['Documentación técnica completa', 'Diagramas de flujos de integración', 'Capacitación a equipo IT', 'Soporte 3 meses post-implementación', 'Ajustes basados en operación real']
        : ['Complete technical documentation', 'Integration flow diagrams', 'IT team training', '3 months post-implementation support', 'Adjustments based on real operation'],
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '80-95%', label: isEs ? 'Eliminación de trabajo manual de copiar datos' : 'Elimination of manual data copying work', icon: Zap },
    { value: '100%', label: isEs ? 'Sincronización de datos entre sistemas' : 'Data synchronization between systems', icon: RefreshCw },
    { value: 'Real-time', label: isEs ? 'Flujos automatizados instantáneos' : 'Instant automated flows', icon: Clock },
    { value: '95%+', label: isEs ? 'Reducción de errores humanos' : 'Reduction of human errors', icon: Shield },
    { value: '60%+', label: isEs ? 'Reducción en tiempo de procesos' : 'Reduction in process time', icon: TrendingUp },
    { value: 'Escalable', label: isEs ? 'Maneja 10X volumen sin contratar personas' : 'Handles 10X volume without hiring people', icon: Target }
  ];

  const integrationVsReplacement = [
    { 
      aspect: isEs ? 'Costo inicial' : 'Initial cost',
      integration: isEs ? 'Menor' : 'Lower',
      replacement: isEs ? 'Mayor' : 'Higher'
    },
    { 
      aspect: isEs ? 'Tiempo implementación' : 'Implementation time',
      integration: isEs ? '2-4 meses' : '2-4 months',
      replacement: isEs ? '6-18 meses' : '6-18 months'
    },
    { 
      aspect: isEs ? 'Riesgo' : 'Risk',
      integration: isEs ? 'Bajo (sistemas siguen igual)' : 'Low (systems remain same)',
      replacement: isEs ? 'Alto (cambio completo)' : 'High (complete change)'
    },
    { 
      aspect: isEs ? 'Disrupción operativa' : 'Operational disruption',
      integration: isEs ? 'Mínima' : 'Minimal',
      replacement: isEs ? 'Significativa' : 'Significant'
    },
    { 
      aspect: isEs ? 'Curva aprendizaje' : 'Learning curve',
      integration: isEs ? 'Ninguna (sistemas iguales)' : 'None (systems same)',
      replacement: isEs ? 'Alta (sistema nuevo)' : 'High (new system)'
    },
    { 
      aspect: isEs ? 'Best-of-breed' : 'Best-of-breed',
      integration: isEs ? 'Sí (mejor herramienta por función)' : 'Yes (best tool per function)',
      replacement: isEs ? 'No (suite única)' : 'No (single suite)'
    },
    { 
      aspect: isEs ? 'Complejidad IT' : 'IT complexity',
      integration: isEs ? 'Mayor (múltiples sistemas)' : 'Higher (multiple systems)',
      replacement: isEs ? 'Menor (un sistema)' : 'Lower (one system)'
    },
    { 
      aspect: isEs ? 'Vendor lock-in' : 'Vendor lock-in',
      integration: isEs ? 'Bajo (puedes cambiar piezas)' : 'Low (you can change pieces)',
      replacement: isEs ? 'Alto (todo con un vendor)' : 'High (everything with one vendor)'
    }
  ];

  const faqs = [
    {
      question: isEs ? '¿Cuánto cuesta integrar dos sistemas?' : 'How much does it cost to integrate two systems?',
      answer: isEs
        ? 'Depende de complejidad de integración: Integración simple (2 sistemas modernos con APIs documentadas, flujo unidireccional): $15K-$30K. Integración media (2-3 sistemas, flujos bidireccionales, transformación de datos): $30K-$60K. Integración compleja (5+ sistemas, lógica de negocio compleja, manejo de excepciones sofisticado): $60K-$120K+. Factores: calidad de APIs, volumen transaccional, tiempo real vs batch, manejo de errores. Evaluamos y estimamos con precisión.'
        : 'Depends on integration complexity: Simple integration (2 modern systems with documented APIs, unidirectional flow): $15K-$30K. Medium integration (2-3 systems, bidirectional flows, data transformation): $30K-$60K. Complex integration (5+ systems, complex business logic, sophisticated exception handling): $60K-$120K+. Factors: API quality, transaction volume, real-time vs batch, error handling. We evaluate and estimate accurately.'
    },
    {
      question: isEs ? '¿Integraciones funcionan en tiempo real o hay delay?' : 'Do integrations work in real-time or is there delay?',
      answer: isEs
        ? 'Depende de diseño y necesidad: Tiempo real (<1 segundo): Webhooks + APIs REST. Ej: venta en e-commerce actualiza inventario instantáneamente. Near real-time (minutos): Polling periódico cada 5-15 min. Batch (horas): ETL que corre cada noche. Más común para consolidación de datos no urgentes. Recomendación: Balance entre necesidad de negocio y complejidad técnica. No todo necesita ser tiempo real; batch nocturno suficiente para muchos casos (60% integraciones).'
        : 'Depends on design and need: Real-time (<1 second): Webhooks + REST APIs. E.g.: sale in e-commerce updates inventory instantly. Near real-time (minutes): Periodic polling every 5-15 min. Batch (hours): ETL that runs each night. More common for non-urgent data consolidation. Recommendation: Balance between business need and technical complexity. Not everything needs to be real-time; nightly batch sufficient for many cases (60% integrations).'
    },
    {
      question: isEs ? '¿Qué pasa si un sistema actualiza su API y rompe integración?' : 'What happens if a system updates its API and breaks integration?',
      answer: isEs
        ? 'Prevención: Integraciones bien diseñadas usan versionado de APIs (api.com/v1 vs /v2), contratos claros, testing automatizado. Cuando ocurre: Monitoreo detecta falla inmediatamente, alertas automáticas, equipo Alternative responde. Contrato de soporte incluye: Actualizaciones cuando vendors cambian APIs (común 1-2 veces/año por sistema). Sin soporte: Cliente asume riesgo de mantener. Por eso 90% de clientes contratan soporte ongoing según complejidad.'
        : 'Prevention: Well-designed integrations use API versioning (api.com/v1 vs /v2), clear contracts, automated testing. When it occurs: Monitoring detects failure immediately, automatic alerts, Alternative team responds. Support contract includes: Updates when vendors change APIs (common 1-2 times/year per system). Without support: Client assumes maintenance risk. That\'s why 90% of clients hire ongoing support according to complexity.'
    },
    {
      question: isEs ? '¿Alternative usa herramientas low-code como Zapier o desarrollo custom?' : 'Does Alternative use low-code tools like Zapier or custom development?',
      answer: isEs
        ? 'Ambos según caso: Zapier/Make (low-code) cuando: integraciones simples, bajo volumen (<10K transacciones/mes), presupuesto limitado, no crítico si falla ocasionalmente. Desarrollo custom cuando: alto volumen, lógica compleja, criticidad alta (no puede fallar), necesidad de control total, transformaciones complejas. Nuestra experiencia: 30% proyectos usan low-code, 70% custom. Low-code tiene límites: 10K transacciones/mes, integraciones simples, menos control.'
        : 'Both according to case: Zapier/Make (low-code) when: simple integrations, low volume (<10K transactions/month), limited budget, not critical if fails occasionally. Custom development when: high volume, complex logic, high criticality (cannot fail), need for total control, complex transformations. Our experience: 30% of projects use low-code, 70% custom. Low-code has limits: 10K transactions/month, simple integrations, less control.'
    },
    {
      question: isEs ? '¿Integración requiere modificar sistemas existentes?' : 'Does integration require modifying existing systems?',
      answer: isEs
        ? 'Idealmente no. Integraciones bien diseñadas son "no invasivas": se conectan vía APIs sin tocar código de sistemas. Excepción: Sistemas sin APIs necesitan: (1) Desarrollo de API custom (capa intermedia), o (2) RPA (bot que usa interfaz), o (3) Acceso directo a base de datos (menos ideal, riesgoso). Sistemas modernos (Salesforce, NetSuite, HubSpot, QuickBooks Online) tienen APIs robustas. Sistemas legacy (AS/400, Progress, FoxPro) requieren trabajo adicional.'
        : 'Ideally no. Well-designed integrations are "non-invasive": connect via APIs without touching system code. Exception: Systems without APIs need: (1) Custom API development (intermediate layer), or (2) RPA (bot that uses interface), or (3) Direct database access (less ideal, risky). Modern systems (Salesforce, NetSuite, HubSpot, QuickBooks Online) have robust APIs. Legacy systems (AS/400, Progress, FoxPro) require additional work.'
    },
    {
      question: isEs ? '¿Cómo aseguran que datos sensibles están protegidos en integraciones?' : 'How do you ensure sensitive data is protected in integrations?',
      answer: isEs
        ? 'Seguridad por capas: (1) Encriptación: Datos en tránsito encriptados (SSL/TLS), credenciales en reposo encriptadas. (2) Autenticación: OAuth 2.0 (estándar seguro), API keys rotadas, no contraseñas en código. (3) Mínimo privilegio: Integraciones solo acceden a datos necesarios, no acceso completo a sistemas. (4) Auditoría: Logs completos de qué datos se accedieron cuándo. (5) Cumplimiento: Diseñamos alineados a GDPR, SOC 2, ISO 27001 según industria. Integraciones Alternative son tan o más seguras que acceso manual.'
        : 'Security by layers: (1) Encryption: Data in transit encrypted (SSL/TLS), credentials at rest encrypted. (2) Authentication: OAuth 2.0 (secure standard), rotated API keys, no passwords in code. (3) Minimum privilege: Integrations only access necessary data, not complete system access. (4) Auditing: Complete logs of what data was accessed when. (5) Compliance: We design aligned to GDPR, SOC 2, ISO 27001 according to industry. Alternative integrations are as or more secure than manual access.'
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
          HERO SECTION - Unique Design with Systems Diagram
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        {/* Background Pattern - Connection Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(108, 196, 212, 0.1) 20px, rgba(108, 196, 212, 0.1) 22px),
              repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(108, 196, 212, 0.1) 20px, rgba(108, 196, 212, 0.1) 22px)
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
                  <Network className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Integración de Sistemas' : 'System Integration'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Desarrollo & Tecnología' : 'Development & Technology'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Conecta tus sistemas y elimina trabajo manual'
                  : 'Connect your systems and eliminate manual work'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Integración entre sistemas empresariales existentes: APIs, middleware, sincronización de datos, automatización de flujos. Elimina islas de información, reduce trabajo manual de copiar datos entre sistemas y habilita flujos automatizados end-to-end.'
                  : 'Integration between existing enterprise systems: APIs, middleware, data synchronization, flow automation. Eliminates information silos, reduces manual work of copying data between systems and enables end-to-end automated flows.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Integra tus Sistemas' : 'Integrate Your Systems'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/recursos`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Evalúa tu arquitectura de integración' : 'Evaluate your integration architecture'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '40+', label: isEs ? 'integraciones implementadas' : 'integrations implemented' },
                  { value: '80%+', label: isEs ? 'reducción trabajo manual' : 'manual work reduction' },
                  { icon: true, label: isEs ? 'Sincronización tiempo real' : 'Real-time synchronization' }
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

            {/* Right Visual - Systems Diagram Floating */}
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
                  {/* Systems Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {['CRM', 'ERP', 'E-com', 'Contab', 'RRHH', 'BI'].map((system, idx) => (
                      <motion.div
                        key={idx}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                        className="bg-turquesa/20 rounded-xl p-3 text-center"
                      >
                        <div className="w-8 h-8 bg-turquesa/30 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <Network className="w-4 h-4 text-turquesa" />
                        </div>
                        <span className="text-white/70 text-xs">{system}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Connection Lines */}
                  <div className="relative h-20 mb-4">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 80">
                      {[
                        { from: { x: 30, y: 0 }, to: { x: 100, y: 40 } },
                        { from: { x: 100, y: 0 }, to: { x: 100, y: 40 } },
                        { from: { x: 170, y: 0 }, to: { x: 100, y: 40 } },
                        { from: { x: 30, y: 80 }, to: { x: 100, y: 40 } },
                        { from: { x: 100, y: 80 }, to: { x: 100, y: 40 } },
                        { from: { x: 170, y: 80 }, to: { x: 100, y: 40 } }
                      ].map((line, idx) => (
                        <motion.line
                          key={idx}
                          x1={line.from.x}
                          y1={line.from.y}
                          x2={line.to.x}
                          y2={line.to.y}
                          stroke="rgba(108, 196, 212, 0.5)"
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, delay: 0.5 + idx * 0.1, repeat: Infinity, repeatDelay: 2 }}
                        />
                      ))}
                      <circle cx="100" cy="40" r="8" fill="rgba(108, 196, 212, 0.8)" />
                    </svg>
                  </div>

                  {/* Integration Hub */}
                  <div className="bg-turquesa/30 rounded-xl p-4 text-center">
                    <Plug className="w-6 h-6 text-turquesa mx-auto mb-2" />
                    <span className="text-white/80 text-xs font-medium">
                      {isEs ? 'Hub de Integración' : 'Integration Hub'}
                    </span>
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-turquesa rounded-2xl p-4 shadow-xl"
                >
                  <Plug className="w-8 h-8 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUÉ ES INTEGRACIÓN DE SISTEMAS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs ? 'Integración: hacer que tus sistemas hablen entre sí' : 'Integration: making your systems talk to each other'}
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs 
                    ? 'Integración de sistemas es conectar aplicaciones empresariales diferentes para que compartan datos y activen acciones automáticamente sin intervención humana. Ejemplos: venta en e-commerce actualiza inventario en ERP automáticamente, nuevo cliente en CRM crea cuenta en sistema de facturación, empleado aprobado en RRHH obtiene acceso a todos los sistemas corporativos.'
                    : 'System integration is connecting different enterprise applications so they share data and trigger actions automatically without human intervention. Examples: sale in e-commerce updates inventory in ERP automatically, new client in CRM creates account in billing system, approved employee in HR gets access to all corporate systems.'}
                </p>
                <p>
                  {isEs 
                    ? 'El problema que resuelve: empresas típicamente tienen 5-15 sistemas diferentes (ERP, CRM, contabilidad, e-commerce, marketing, RRHH, BI) que operan como islas independientes. Personas copian datos manualmente entre sistemas (error-prone, lento, no escalable). Información crítica atrapada en silos sin visibilidad consolidada.'
                    : 'The problem it solves: companies typically have 5-15 different systems (ERP, CRM, accounting, e-commerce, marketing, HR, BI) that operate as independent islands. People copy data manually between systems (error-prone, slow, not scalable). Critical information trapped in silos without consolidated visibility.'}
                </p>
                <p>
                  {isEs 
                    ? 'Solución: Integraciones vía APIs (comunicación directa entre sistemas), middleware (capa intermedia que orquesta flujos), ETL (extracción, transformación, carga de datos), webhooks (notificaciones automáticas de eventos). Resultado: flujos automatizados, sincronización de datos en tiempo real o near-real-time, eliminación de trabajo manual repetitivo.'
                    : 'Solution: Integrations via APIs (direct communication between systems), middleware (intermediate layer that orchestrates flows), ETL (extraction, transformation, data loading), webhooks (automatic event notifications). Result: automated flows, real-time or near-real-time data synchronization, elimination of repetitive manual work.'}
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
              {isEs ? '¿Cuándo necesitas integrar tus sistemas?' : 'When do you need to integrate your systems?'}
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
          TIPOS DE INTEGRACIÓN SECTION - 5 Cards
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '5 tipos de integración según necesidad' : '5 types of integration according to need'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="space-y-6">
            {integrationTypes.map((type, idx) => {
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
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <div className={`${colors.badge} text-xs font-medium px-3 py-1 rounded inline-block mb-2`}>
                              {isEs ? 'Cuándo usarlo:' : 'When to use:'}
                            </div>
                            <p className="text-foreground/70 text-sm mb-3">
                              {type.when}
                            </p>
                            {type.tools && (
                              <div className="mb-3">
                                <div className={`${colors.text} font-semibold text-xs mb-1`}>
                                  {isEs ? 'Herramientas:' : 'Tools:'}
                                </div>
                                <p className="text-foreground/60 text-xs">{type.tools}</p>
                              </div>
                            )}
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
                            <div className={`${colors.badge} text-xs font-medium px-2 py-1 rounded inline-block mt-3`}>
                              {type.advantage}
                            </div>
                            {type.disadvantage && (
                              <div className="text-xs text-foreground/50 mt-1">
                                {isEs ? 'Desventaja:' : 'Disadvantage:'} {type.disadvantage}
                              </div>
                            )}
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
          PROCESO DE INTEGRACIÓN - Timeline 5 Fases
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Cómo implementamos integraciones' : 'How we implement integrations'}
            </h2>
          </AnimatedSection>

          {/* Timeline - Desktop */}
          <div className="hidden lg:block relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-turquesa via-menta to-violeta -translate-y-1/2" />
            
            <div className="grid grid-cols-5 gap-4 relative">
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
                        <p className="text-foreground/70 text-xs mb-2 leading-relaxed line-clamp-4">
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
              {isEs ? 'DURACIÓN TOTAL: 6-12 semanas típicamente según complejidad' : 'TOTAL DURATION: 6-12 weeks typically according to complexity'}
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
          CASO DE ÉXITO SECTION
          ===================================================== */}
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
                      {isEs ? 'Integración elimina 25 horas/semana de trabajo manual' : 'Integration eliminates 25 hours/week of manual work'}
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
                          ? 'Empresa de servicios profesionales (100 empleados, 500 clientes activos)'
                          : 'Professional services company (100 employees, 500 active clients)'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Situación' : 'Situation'}
                      </h4>
                      <p className="text-foreground/70 mb-3">
                        {isEs 
                          ? 'Operaban con 5 sistemas desconectados:'
                          : 'They operated with 5 disconnected systems:'}
                      </p>
                      <ul className="space-y-2 text-foreground/70 text-sm mb-4">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'CRM (Salesforce): Oportunidades y pipeline' : 'CRM (Salesforce): Opportunities and pipeline'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'ERP (NetSuite): Proyectos y facturación' : 'ERP (NetSuite): Projects and billing'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Contabilidad (QuickBooks): Contabilidad y pagos' : 'Accounting (QuickBooks): Accounting and payments'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'RRHH (BambooHR): Empleados y timesheets' : 'HR (BambooHR): Employees and timesheets'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Project Management (Asana): Gestión de proyectos' : 'Project Management (Asana): Project management'}</span>
                        </li>
                      </ul>
                      <p className="text-foreground/70 text-sm">
                        <strong>{isEs ? 'Trabajo Manual Semanal:' : 'Weekly Manual Work:'}</strong>{' '}
                        {isEs 
                          ? '15 horas copiar clientes CRM→ERP, 5 horas conciliar facturas, 3 horas exportar timesheets, 2 horas actualizar proyectos. Total: 25 horas/semana.'
                          : '15 hours copy clients CRM→ERP, 5 hours reconcile invoices, 3 hours export timesheets, 2 hours update projects. Total: 25 hours/week.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-foreground/70 mb-3 text-sm">
                        {isEs 
                          ? 'Integración completa de 5 sistemas en 10 semanas:'
                          : 'Complete integration of 5 systems in 10 weeks:'}
                      </p>
                      <ul className="space-y-2 text-foreground/70 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span><strong>{isEs ? 'CRM → ERP:' : 'CRM → ERP:'}</strong> {isEs ? 'Oportunidad ganada → Cliente + Proyecto creados automáticamente (tiempo real)' : 'Won opportunity → Client + Project created automatically (real-time)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span><strong>{isEs ? 'ERP ↔ Contabilidad:' : 'ERP ↔ Accounting:'}</strong> {isEs ? 'Factura en NetSuite → QuickBooks. Pago → Actualiza NetSuite (tiempo real)' : 'Invoice in NetSuite → QuickBooks. Payment → Updates NetSuite (real-time)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span><strong>{isEs ? 'RRHH → ERP:' : 'HR → ERP:'}</strong> {isEs ? 'Timesheets aprobados → Horas cargadas a proyectos automáticamente (diaria)' : 'Approved timesheets → Hours charged to projects automatically (daily)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span><strong>{isEs ? 'Project Management ↔ ERP:' : 'Project Management ↔ ERP:'}</strong> {isEs ? 'Tareas completadas → Actualiza % avance proyecto (tiempo real)' : 'Completed tasks → Updates project % progress (real-time)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span><strong>{isEs ? 'BI Consolidado:' : 'Consolidated BI:'}</strong> {isEs ? 'ETL nocturno → Data warehouse → Dashboard Power BI con rentabilidad por proyecto' : 'Nightly ETL → Data warehouse → Power BI Dashboard with profitability by project'}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Arquitectura' : 'Architecture'}
                      </h4>
                      <p className="text-foreground/70 text-sm">
                        {isEs 
                          ? 'Azure Logic Apps como middleware orquestando integraciones. Monitoreo centralizado con alertas automáticas si integración falla.'
                          : 'Azure Logic Apps as middleware orchestrating integrations. Centralized monitoring with automatic alerts if integration fails.'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-azul-marino dark:text-white mb-4">
                      {isEs ? 'Resultados (6 meses post-implementación)' : 'Results (6 months post-implementation)'}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { value: '2h', label: isEs ? 'Trabajo manual' : 'Manual work', sub: isEs ? '25h → 2h' : '25h → 2h' },
                        { value: '0.5%', label: isEs ? 'Errores integración' : 'Integration errors', sub: isEs ? '12% → 0.5%' : '12% → 0.5%' },
                        { value: 'Real-time', label: isEs ? 'Lag información' : 'Information lag', sub: isEs ? '24-48h → tiempo real' : '24-48h → real-time' },
                        { value: '100%', label: isEs ? 'Visibilidad rentabilidad' : 'Profitability visibility', sub: isEs ? 'Dashboard BI' : 'BI Dashboard' },
                        { value: '+40%', label: isEs ? 'Capacidad operativa' : 'Operational capacity', sub: isEs ? 'Sin contratar' : 'Without hiring' },
                        { value: '$40K', label: isEs ? 'Costo evitado' : 'Cost avoided', sub: isEs ? 'No contratar persona' : 'No hiring person' },
                        { value: '280%', label: isEs ? 'ROI' : 'ROI', sub: isEs ? 'Primer año' : 'First year' }
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
                        <strong className="text-azul-marino dark:text-white">{isEs ? 'Inversión:' : 'Investment:'}</strong>{' '}
                        {isEs 
                          ? 'Integración: $55K | Ahorro anual: 25 horas/semana × 50 semanas × $30/hora = $37.5K + capacidad adicional + eliminación errores | Payback: 18 meses'
                          : 'Integration: $55K | Annual savings: 25 hours/week × 50 weeks × $30/hour = $37.5K + additional capacity + error elimination | Payback: 18 months'}
                      </p>
                    </div>

                    <div className="bg-menta/10 p-4 rounded-xl border border-menta/20">
                      <p className="text-sm text-foreground/70">
                        <strong className="text-azul-marino dark:text-white">{isEs ? 'Mantenimiento:' : 'Maintenance:'}</strong>{' '}
                        {isEs 
                          ? 'Cliente contrata soporte $800/mes: monitoreo, ajustes cuando sistemas actualizan APIs, nuevas integraciones según necesidad.'
                          : 'Client hires $800/month support: monitoring, adjustments when systems update APIs, new integrations as needed.'}
                      </p>
                    </div>
                  </div>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                  {isEs 
                    ? '"Integración liberó 25 horas semanales que dedicábamos a copiar datos. Ahora sistemas hablan solos, cero errores, información en tiempo real. Mejor inversión tecnológica que hemos hecho."'
                    : '"Integration freed 25 weekly hours we dedicated to copying data. Now systems talk alone, zero errors, real-time information. Best technology investment we\'ve made."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— {isEs ? 'COO' : 'COO'}</span>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          INTEGRACIÓN VS REEMPLAZO SECTION - Tabla Comparativa
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Integrar sistemas existentes vs reemplazar con uno unificado?' : 'Integrate existing systems vs replace with unified one?'}
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
                      {isEs ? 'Integrar Existentes' : 'Integrate Existing'}
                    </th>
                    <th className="text-left py-4 px-4 text-foreground/60 font-medium bg-violeta/10 
                                   border-b-2 border-violeta/30 rounded-tr-lg">
                      {isEs ? 'Reemplazar con Sistema Unificado' : 'Replace with Unified System'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {integrationVsReplacement.map((row, idx) => (
                    <tr key={idx} className={`border-b border-gris-arena/20 hover:bg-blanco-hueso/50 
                                              dark:hover:bg-card/50 transition-colors
                                              ${idx % 2 === 0 ? 'bg-white' : 'bg-blanco-hueso/30'}
                                              ${idx === integrationVsReplacement.length - 1 ? 'border-b-0' : ''}`}>
                      <td className="py-4 px-4 text-azul-marino dark:text-white font-medium">
                        {row.aspect}
                      </td>
                      <td className="py-4 px-4 text-foreground/70">
                        {row.integration}
                      </td>
                      <td className="py-4 px-4 text-foreground/70">
                        {row.replacement}
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
                  {isEs ? 'Integra cuando:' : 'Integrate when:'}
                </h4>
                <ul className="space-y-2 text-foreground/70 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Sistemas actuales funcionan bien individualmente' : 'Current systems work well individually'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'No justifica costo/riesgo de reemplazo completo' : 'Doesn\'t justify cost/risk of complete replacement'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Best-of-breed es importante (mejor CRM + mejor ERP vs suite única mediocre)' : 'Best-of-breed is important (best CRM + best ERP vs mediocre single suite)'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Presupuesto limitado' : 'Limited budget'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Riesgo operativo de cambio completo es muy alto' : 'Operational risk of complete change is very high'}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-turquesa/10 p-6 rounded-2xl border border-turquesa/20">
                <h4 className="font-semibold text-azul-marino dark:text-white mb-3">
                  {isEs ? 'Reemplaza cuando:' : 'Replace when:'}
                </h4>
                <ul className="space-y-2 text-foreground/70 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Sistemas actuales son obsoletos/insostenibles' : 'Current systems are obsolete/unsustainable'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Complejidad de integrar 10+ sistemas es prohibitiva' : 'Complexity of integrating 10+ systems is prohibitive'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Necesitas capabilities que solo suite unificada provee' : 'You need capabilities that only unified suite provides'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Estrategia es simplificar landscape tecnológico' : 'Strategy is to simplify technology landscape'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                    <span>{isEs ? 'Presupuesto permite' : 'Budget allows'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-6 text-center">
            <p className="text-lg text-turquesa font-semibold">
              {isEs 
                ? 'Enfoque híbrido (común): Core en sistema unificado (ERP) + mejores herramientas especializadas integradas (CRM especializado, BI avanzado).'
                : 'Hybrid approach (common): Core in unified system (ERP) + best specialized tools integrated (specialized CRM, advanced BI).'}
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
                {isEs ? '¿Tus sistemas necesitan integrarse?' : 'Do your systems need integration?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Evaluación gratuita de 30 minutos. Mapeamos tus sistemas, identificamos puntos de integración críticos y estimamos solución.'
                  : 'Free 30-minute evaluation. We map your systems, identify critical integration points and estimate solution.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Mapeo de sistemas actuales y flujos manuales' : 'Mapping of current systems and manual flows',
                  isEs ? 'Identificación de puntos de integración prioritarios' : 'Identification of priority integration points',
                  isEs ? 'Evaluación de APIs y factibilidad técnica' : 'API evaluation and technical feasibility',
                  isEs ? 'Arquitectura de integración preliminar' : 'Preliminary integration architecture',
                  isEs ? 'Estimación de costo y timeline' : 'Cost and timeline estimation'
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
                    {isEs ? 'Integrar Sistemas' : 'Integrate Systems'}
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

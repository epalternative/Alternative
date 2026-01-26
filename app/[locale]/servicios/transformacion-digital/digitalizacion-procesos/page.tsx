'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import {
  Zap,
  ArrowRight,
  ChevronDown,
  Bot,
  Workflow,
  Plug,
  Brain,
  Clock,
  TrendingUp,
  CheckCircle2,
  Building2,
  Phone,
  FileText,
  BarChart3,
  Users,
  Shield,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  Search,
  Target,
  Award,
  Check,
  XCircle,
  Timer,
  Code,
  Monitor,
  Calendar
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

export default function DigitalizacionProcesosPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Transformación Digital' : 'Digital Transformation', href: `/${locale}/servicios/transformacion-digital` },
    { label: isEs ? 'Digitalización de Procesos' : 'Process Digitization', href: null }
  ];

  const forWho = [
    {
      icon: FileText,
      title: isEs ? 'Procesos manuales intensivos que consumen tiempo' : 'Time-consuming intensive manual processes',
      description: isEs
        ? 'Equipos dedicando 20-40% de tiempo en tareas manuales repetitivas: copiar datos entre sistemas, generar reportes manualmente, procesar formularios en papel.'
        : 'Teams dedicating 20-40% of time on repetitive manual tasks: copying data between systems, manually generating reports, processing paper forms.',
      color: 'turquesa'
    },
    {
      icon: RefreshCw,
      title: isEs ? 'Trabajo repetitivo con mismo patrón siempre' : 'Repetitive work with same pattern always',
      description: isEs
        ? 'Procesos que se ejecutan decenas o cientos de veces con mismo flujo: procesamiento de facturas, aprobaciones, validaciones, generación de documentos.'
        : 'Processes executed dozens or hundreds of times with same flow: invoice processing, approvals, validations, document generation.',
      color: 'menta'
    },
    {
      icon: Plug,
      title: isEs ? 'Sistemas que no se comunican entre sí' : 'Systems that don\'t communicate with each other',
      description: isEs
        ? 'Datos atrapados en silos. Personas copiando información manualmente entre sistemas (CRM → ERP → Contabilidad). Alto riesgo de error.'
        : 'Data trapped in silos. People manually copying information between systems (CRM → ERP → Accounting). High error risk.',
      color: 'violeta'
    },
    {
      icon: Clock,
      title: isEs ? 'Aprobaciones que demoran días por esperas' : 'Approvals that take days due to waits',
      description: isEs
        ? 'Procesos atrapados en bandejas de email esperando aprobación. Tarea de 30 minutos que toma 5 días por esperas.'
        : 'Processes trapped in email inboxes waiting for approval. 30-minute task that takes 5 days due to waits.',
      color: 'turquesa'
    },
    {
      icon: FileText,
      title: isEs ? 'Procesos en papel que deben eliminarse' : 'Paper processes that must be eliminated',
      description: isEs
        ? 'Formularios físicos, archivos en carpetas, documentos que se pierden. Necesidad de trazabilidad digital y acceso remoto.'
        : 'Physical forms, files in folders, documents that get lost. Need for digital traceability and remote access.',
      color: 'menta'
    },
    {
      icon: TrendingUp,
      title: isEs ? 'Necesidad de escalar sin contratar proporcionalmente' : 'Need to scale without hiring proportionally',
      description: isEs
        ? 'Negocio creciendo pero no puedes contratar 10 personas más. Automatización permite procesar 2-3X volumen con mismo equipo.'
        : 'Business growing but you can\'t hire 10 more people. Automation allows processing 2-3X volume with same team.',
      color: 'violeta'
    }
  ];

  const technologies = [
    {
      icon: Bot,
      title: isEs ? 'RPA (Robotic Process Automation)' : 'RPA (Robotic Process Automation)',
      what: isEs ? 'Bots de software que imitan acciones humanas: abrir aplicaciones, copiar datos, tipear, hacer clicks, leer documentos.' : 'Software bots that mimic human actions: open applications, copy data, type, click, read documents.',
      when: isEs ? 'Tareas repetitivas en múltiples sistemas sin APIs, sistemas legacy que no se pueden integrar, procesos con reglas claras y predecibles.' : 'Repetitive tasks in multiple systems without APIs, legacy systems that can\'t be integrated, processes with clear and predictable rules.',
      tools: isEs ? 'UiPath, Power Automate, Automation Anywhere, Blue Prism' : 'UiPath, Power Automate, Automation Anywhere, Blue Prism',
      example: isEs ? 'Bot que extrae datos de facturas en PDF, las ingresa en sistema contable, y envía email de confirmación. Sin intervención humana.' : 'Bot that extracts data from PDF invoices, enters them in accounting system, and sends confirmation email. No human intervention.',
      roi: isEs ? 'ROI típico: 200-400% primer año' : 'Typical ROI: 200-400% first year',
      color: 'turquesa'
    },
    {
      icon: Workflow,
      title: isEs ? 'Workflows Digitales' : 'Digital Workflows',
      what: isEs ? 'Flujos de aprobación y tareas automatizadas donde sistema mueve trabajo entre personas según reglas de negocio.' : 'Approval flows and automated tasks where system moves work between people according to business rules.',
      when: isEs ? 'Procesos de aprobación, tareas secuenciales entre departamentos, solicitudes que requieren intervención humana estructurada.' : 'Approval processes, sequential tasks between departments, requests requiring structured human intervention.',
      tools: isEs ? 'Power Automate, Nintex, K2, Monday.com workflows' : 'Power Automate, Nintex, K2, Monday.com workflows',
      example: isEs ? 'Solicitud de compra que automáticamente se enruta a gerente apropiado según monto, si aprueba va a finanzas, si rechaza regresa a solicitante. Notificaciones automáticas.' : 'Purchase request that automatically routes to appropriate manager according to amount, if approved goes to finance, if rejected returns to requester. Automatic notifications.',
      roi: isEs ? 'ROI típico: 150-300% primer año' : 'Typical ROI: 150-300% first year',
      color: 'menta'
    },
    {
      icon: Plug,
      title: isEs ? 'Integraciones API' : 'API Integrations',
      what: isEs ? 'Conexiones directas entre sistemas para sincronización automática de datos sin intervención humana.' : 'Direct connections between systems for automatic data synchronization without human intervention.',
      when: isEs ? 'Solución permanente entre aplicaciones modernas con APIs, alto volumen de transacciones, necesidad de tiempo real.' : 'Permanent solution between modern applications with APIs, high transaction volume, need for real-time.',
      tools: isEs ? 'APIs nativas, Zapier, Make (Integromat), MuleSoft, Dell Boomi' : 'Native APIs, Zapier, Make (Integromat), MuleSoft, Dell Boomi',
      example: isEs ? 'Venta en e-commerce automáticamente crea orden en ERP, actualiza inventario, genera factura en sistema contable. Todo en tiempo real.' : 'E-commerce sale automatically creates order in ERP, updates inventory, generates invoice in accounting system. Everything in real-time.',
      roi: isEs ? 'ROI típico: 250-500% (más sostenible que RPA)' : 'Typical ROI: 250-500% (more sustainable than RPA)',
      color: 'violeta'
    },
    {
      icon: Brain,
      title: isEs ? 'OCR + IA (Automatización Inteligente)' : 'OCR + AI (Intelligent Automation)',
      what: isEs ? 'Reconocimiento óptico de caracteres + inteligencia artificial para extraer y clasificar información de documentos.' : 'Optical character recognition + artificial intelligence to extract and classify information from documents.',
      when: isEs ? 'Procesar facturas/recibos/contratos en papel o PDF, clasificar documentos automáticamente, extraer datos no estructurados.' : 'Process invoices/receipts/contracts on paper or PDF, automatically classify documents, extract unstructured data.',
      tools: isEs ? 'Azure Form Recognizer, Google Cloud Vision, ABBYY, UiPath Document Understanding' : 'Azure Form Recognizer, Google Cloud Vision, ABBYY, UiPath Document Understanding',
      example: isEs ? 'Sistema que recibe 500 facturas en PDF, extrae automáticamente proveedor/monto/fecha, clasifica por tipo, e ingresa en contabilidad. 95%+ precisión.' : 'System that receives 500 PDF invoices, automatically extracts vendor/amount/date, classifies by type, and enters in accounting. 95%+ accuracy.',
      roi: isEs ? 'ROI típico: 300-800% (elimina trabajo muy manual)' : 'Typical ROI: 300-800% (eliminates very manual work)',
      color: 'turquesa'
    }
  ];

  const processPhases = [
    {
      phase: isEs ? 'IDENTIFICACIÓN Y PRIORIZACIÓN' : 'IDENTIFICATION AND PRIORITIZATION',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Identificación de procesos automatizables, Cálculo de horas/año consumidas por proceso, Estimación de complejidad técnica, ROI preliminar de cada proceso, Priorización (matriz impacto vs esfuerzo)'
        : 'Identification of automatable processes, Calculation of hours/year consumed per process, Technical complexity estimation, Preliminary ROI per process, Prioritization (impact vs effort matrix)',
      icon: Search,
      deliverable: isEs ? 'Lista priorizada de procesos a digitalizar + ROI proyectado' : 'Prioritized list of processes to digitize + projected ROI',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'OPTIMIZACIÓN PRE-AUTOMATIZACIÓN' : 'PRE-AUTOMATION OPTIMIZATION',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Mapeo detallado de proceso actual (as-is), Identificación de desperdicios y pasos innecesarios, Rediseño optimizado del proceso (to-be), Validación de proceso optimizado con stakeholders'
        : 'Detailed mapping of current process (as-is), Identification of waste and unnecessary steps, Optimized process redesign (to-be), Validation of optimized process with stakeholders',
      icon: Target,
      deliverable: isEs ? 'Proceso optimizado listo para automatizar' : 'Optimized process ready to automate',
      color: 'menta',
      critical: isEs ? 'Crítico: No automatizar antes de optimizar' : 'Critical: Don\'t automate before optimizing'
    },
    {
      phase: isEs ? 'DESARROLLO DE AUTOMATIZACIÓN' : 'AUTOMATION DEVELOPMENT',
      duration: isEs ? '2-6 semanas' : '2-6 weeks',
      description: isEs
        ? 'Desarrollo de bot RPA o workflow digital, Configuración de integraciones, Testing exhaustivo con casos reales, Ajustes basados en pruebas, Documentación técnica'
        : 'Development of RPA bot or digital workflow, Integration configuration, Exhaustive testing with real cases, Adjustments based on tests, Technical documentation',
      icon: Code,
      deliverable: isEs ? 'Automatización funcionando en ambiente de pruebas' : 'Automation working in test environment',
      color: 'violeta'
    },
    {
      phase: isEs ? 'IMPLEMENTACIÓN Y CAPACITACIÓN' : 'IMPLEMENTATION AND TRAINING',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Despliegue en ambiente productivo, Capacitación de usuarios finales, Monitoreo intensivo primeros días, Ajustes según feedback operativo'
        : 'Deployment in production environment, End-user training, Intensive monitoring first days, Adjustments according to operational feedback',
      icon: Users,
      deliverable: isEs ? 'Proceso automatizado operando en producción' : 'Automated process operating in production',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'MONITOREO Y OPTIMIZACIÓN' : 'MONITORING AND OPTIMIZATION',
      duration: isEs ? 'Ongoing' : 'Ongoing',
      description: isEs
        ? 'Dashboard de métricas del bot/proceso, Monitoreo de errores y excepciones, Optimizaciones incrementales, Soporte técnico continuo (3-6 meses)'
        : 'Bot/process metrics dashboard, Error and exception monitoring, Incremental optimizations, Continuous technical support (3-6 months)',
      icon: Monitor,
      deliverable: isEs ? 'Proceso estable + métricas de desempeño' : 'Stable process + performance metrics',
      color: 'menta'
    }
  ];

  const topProcesses = [
    { process: isEs ? 'Procesamiento de facturas' : 'Invoice processing', description: isEs ? 'Recibir, validar, aprobar e ingresar facturas en contabilidad. Alto volumen, reglas claras.' : 'Receive, validate, approve and enter invoices in accounting. High volume, clear rules.' },
    { process: isEs ? 'Onboarding de clientes/empleados' : 'Client/employee onboarding', description: isEs ? 'Recolectar datos, crear cuentas, enviar accesos, capacitaciones. Múltiples sistemas.' : 'Collect data, create accounts, send access, training. Multiple systems.' },
    { process: isEs ? 'Conciliaciones bancarias' : 'Bank reconciliations', description: isEs ? 'Cruzar transacciones bancarias con registros contables. Trabajo tedioso manual.' : 'Cross bank transactions with accounting records. Tedious manual work.' },
    { process: isEs ? 'Generación de reportes' : 'Report generation', description: isEs ? 'Extraer datos de múltiples fuentes, consolidar, formatear, distribuir. Diario/semanal.' : 'Extract data from multiple sources, consolidate, format, distribute. Daily/weekly.' },
    { process: isEs ? 'Procesamiento de órdenes de compra' : 'Purchase order processing', description: isEs ? 'Recibir solicitud, validar presupuesto, aprobar, crear PO, enviar a proveedor.' : 'Receive request, validate budget, approve, create PO, send to supplier.' },
    { process: isEs ? 'Actualización de inventarios' : 'Inventory updates', description: isEs ? 'Sincronizar inventario entre tiendas, e-commerce, almacén. Crítico para retail.' : 'Synchronize inventory between stores, e-commerce, warehouse. Critical for retail.' },
    { process: isEs ? 'Procesamiento de solicitudes (créditos, reclamos)' : 'Request processing (credits, claims)', description: isEs ? 'Alto volumen, validaciones en sistemas, decisiones basadas en reglas.' : 'High volume, system validations, rule-based decisions.' },
    { process: isEs ? 'Aprobaciones de gastos' : 'Expense approvals', description: isEs ? 'Validar recibos, verificar política, aprobar según jerarquía, reembolsar.' : 'Validate receipts, verify policy, approve according to hierarchy, reimburse.' },
    { process: isEs ? 'Migración de datos entre sistemas' : 'Data migration between systems', description: isEs ? 'Al implementar nuevo sistema, migrar miles de registros de sistema viejo.' : 'When implementing new system, migrate thousands of records from old system.' },
    { process: isEs ? 'Atención de solicitudes simples' : 'Simple request handling', description: isEs ? 'Chatbots que resuelven preguntas frecuentes o ejecutan acciones simples (reset password, consultar saldo).' : 'Chatbots that resolve frequent questions or execute simple actions (reset password, check balance).' }
  ];

  const includes = [
    {
      title: isEs ? 'Análisis y Optimización' : 'Analysis and Optimization',
      icon: Search,
      items: isEs
        ? ['Identificación de procesos automatizables', 'Cálculo de ROI por proceso', 'Optimización de proceso antes de automatizar', 'Diseño de solución técnica']
        : ['Identification of automatable processes', 'ROI calculation per process', 'Process optimization before automating', 'Technical solution design'],
      color: 'turquesa'
    },
    {
      title: isEs ? 'Desarrollo e Implementación' : 'Development and Implementation',
      icon: Code,
      items: isEs
        ? ['Desarrollo de bots RPA o workflows', 'Configuración de integraciones', 'Testing exhaustivo', 'Despliegue en producción', 'Documentación técnica']
        : ['Development of RPA bots or workflows', 'Integration configuration', 'Exhaustive testing', 'Production deployment', 'Technical documentation'],
      color: 'menta'
    },
    {
      title: isEs ? 'Capacitación' : 'Training',
      icon: Users,
      items: isEs
        ? ['Capacitación a usuarios finales', 'Capacitación a equipo IT (mantenimiento)', 'Manuales de usuario', 'Videos tutoriales']
        : ['End-user training', 'IT team training (maintenance)', 'User manuals', 'Tutorial videos'],
      color: 'violeta'
    },
    {
      title: isEs ? 'Monitoreo y Soporte' : 'Monitoring and Support',
      icon: Monitor,
      items: isEs
        ? ['Dashboard de monitoreo', 'Alertas automáticas de errores', 'Soporte 3-6 meses incluido', 'Ajustes y optimizaciones']
        : ['Monitoring dashboard', 'Automatic error alerts', '3-6 months support included', 'Adjustments and optimizations'],
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '40-60%', label: isEs ? 'Reducción en tiempo de ejecución de procesos' : 'Reduction in process execution time', icon: Clock },
    { value: '95%+', label: isEs ? 'Eliminación de errores manuales' : 'Elimination of manual errors', icon: CheckCircle2 },
    { value: '30-40%', label: isEs ? 'Capacidad humana liberada para trabajo estratégico' : 'Human capacity freed for strategic work', icon: Users },
    { value: '24/7', label: isEs ? 'Disponibilidad sin costo de horas extras' : 'Availability without overtime cost', icon: Timer },
    { value: '200-400%', label: isEs ? 'ROI típico primer año' : 'Typical first year ROI', icon: TrendingUp },
    { value: '4-10', label: isEs ? 'semanas Implementación por proceso' : 'weeks Implementation per process', icon: Calendar }
  ];

  const faqs = [
    {
      question: isEs ? '¿Cómo determinan qué procesos automatizar primero?' : 'How do you determine which processes to automate first?',
      answer: isEs
        ? 'Priorizamos por ROI: (Ahorro anual - Costo de automatización) / Costo de automatización. Factores: (1) Volumen: Procesos que se ejecutan 50+ veces/mes tienen mayor ROI. (2) Tiempo consumido: Procesos que toman 10+ horas/semana del equipo. (3) Complejidad técnica: Procesos simples con reglas claras se automatizan más rápido. (4) Errores: Procesos con alta tasa de error humano. (5) Impacto negocio: Cuellos de botella críticos. Matriz impacto vs esfuerzo identifica quick wins.'
        : 'We prioritize by ROI: (Annual savings - Automation cost) / Automation cost. Factors: (1) Volume: Processes executed 50+ times/month have higher ROI. (2) Time consumed: Processes taking 10+ hours/week from team. (3) Technical complexity: Simple processes with clear rules automate faster. (4) Errors: Processes with high human error rate. (5) Business impact: Critical bottlenecks. Impact vs effort matrix identifies quick wins.'
    },
    {
      question: isEs ? '¿Qué pasa si el proceso cambia después de automatizar?' : 'What happens if the process changes after automating?',
      answer: isEs
        ? 'Automatizaciones bien diseñadas son resilientes a cambios menores. Cambios significativos requieren ajustes (similar a capacitar empleado cuando proceso cambia). Incluimos soporte post-implementación para ajustes sin costo. Mantenimiento anual típico: 10-15% costo inicial (muy inferior a costo de personas ejecutando manual). Procesos muy inestables (cambian semanalmente) NO se deben automatizar hasta estabilizar.'
        : 'Well-designed automations are resilient to minor changes. Significant changes require adjustments (similar to training employee when process changes). We include post-implementation support for adjustments at no cost. Typical annual maintenance: 10-15% initial cost (much lower than cost of people executing manually). Very unstable processes (change weekly) should NOT be automated until stabilized.'
    },
    {
      question: isEs ? '¿RPA reemplaza necesidad de integrar sistemas correctamente?' : 'Does RPA replace need to properly integrate systems?',
      answer: isEs
        ? 'RPA es solución táctica rápida (semanas) cuando integración nativa no es viable: sistemas legacy sin APIs, costo/tiempo de integración prohibitivo, solución temporal mientras migras a nuevo sistema. Integración API es solución estratégica permanente (meses) cuando: alto volumen transaccional, tiempo real crítico, aplicaciones modernas con APIs, solución de largo plazo. Frecuentemente combinamos: RPA para quick wins inmediatos, luego integraciones API para solución sostenible.'
        : 'RPA is quick tactical solution (weeks) when native integration isn\'t viable: legacy systems without APIs, prohibitive integration cost/time, temporary solution while migrating to new system. API integration is permanent strategic solution (months) when: high transactional volume, critical real-time, modern applications with APIs, long-term solution. We frequently combine: RPA for immediate quick wins, then API integrations for sustainable solution.'
    },
    {
      question: isEs ? '¿Qué tan segura es automatización con acceso a sistemas críticos?' : 'How secure is automation with access to critical systems?',
      answer: isEs
        ? 'Muy segura si se implementa correctamente: (1) Credenciales dedicadas: Bot tiene credenciales propias con permisos mínimos necesarios, no comparte contraseñas humanas. (2) Trazabilidad: Toda actividad del bot queda registrada en logs auditables. (3) Encriptación: Datos sensibles encriptados en tránsito y reposo. (4) Cumplimiento: Diseñamos automatizaciones alineadas a ISO 27001, SOC 2, regulaciones. De hecho, bots frecuentemente SON MÁS seguros que humanos: no cometen errores, siguen procedimientos exactamente, todo es auditable.'
        : 'Very secure if implemented correctly: (1) Dedicated credentials: Bot has own credentials with minimum necessary permissions, doesn\'t share human passwords. (2) Traceability: All bot activity is recorded in auditable logs. (3) Encryption: Sensitive data encrypted in transit and at rest. (4) Compliance: We design automations aligned to ISO 27001, SOC 2, regulations. In fact, bots are frequently MORE secure than humans: they don\'t make errors, follow procedures exactly, everything is auditable.'
    },
    {
      question: isEs ? '¿Puedo automatizar aunque tenga sistemas antiguos (legacy)?' : 'Can I automate even if I have old (legacy) systems?',
      answer: isEs
        ? 'Sí, RPA es ideal precisamente para eso. RPA no requiere modificar sistemas existentes ni acceso a código/base de datos; bot interactúa con interfaz de usuario como lo haría persona. Hemos automatizado exitosamente en: mainframes de los 80s, sistemas AS/400, aplicaciones cliente-servidor antiguas, sistemas propietarios sin APIs, aplicaciones escritorio viejas. Si persona puede hacerlo manualmente, bot puede hacerlo automatizado.'
        : 'Yes, RPA is ideal precisely for that. RPA doesn\'t require modifying existing systems or access to code/database; bot interacts with user interface as person would. We\'ve successfully automated in: 80s mainframes, AS/400 systems, old client-server applications, proprietary systems without APIs, old desktop applications. If person can do it manually, bot can do it automated.'
    },
    {
      question: isEs ? '¿Qué procesos NO se deben automatizar?' : 'What processes should NOT be automated?',
      answer: isEs
        ? 'Evitar automatizar: (1) Procesos con juicio complejo: Decisiones que requieren intuición, empatía, negociación. (2) Procesos altamente inestables: Cambian cada semana, automatización requiere ajustes constantes. (3) Procesos con excepciones >30%: Si mayoría de casos son "especiales", automatización no es eficiente. (4) Procesos mal diseñados: Primero optimiza, luego automatiza. (5) Procesos regulados sin trazabilidad clara: Donde auditoría manual es crítica. Durante evaluación identificamos qué debe optimizarse antes de automatizar y qué es bueno candidato.'
        : 'Avoid automating: (1) Processes with complex judgment: Decisions requiring intuition, empathy, negotiation. (2) Highly unstable processes: Change every week, automation requires constant adjustments. (3) Processes with >30% exceptions: If majority of cases are "special", automation isn\'t efficient. (4) Poorly designed processes: First optimize, then automate. (5) Regulated processes without clear traceability: Where manual audit is critical. During evaluation we identify what must be optimized before automating and what is good candidate.'
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
        currentService="transformacion-digital"
      />

      {/* =====================================================
          HERO SECTION - Unique Design with Bot/RPA Floating
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        {/* Background Pattern - Workflow Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(108, 196, 212, 0.1) 10px, rgba(108, 196, 212, 0.1) 20px)`
          }} />
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
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
                  <Zap className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Digitalización de Procesos' : 'Process Digitization'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Transformación Digital' : 'Digital Transformation'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Automatiza procesos y elimina trabajo manual repetitivo'
                  : 'Automate processes and eliminate repetitive manual work'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Optimización y automatización de procesos de negocio con tecnología: RPA (bots de software), workflows digitales, integraciones entre sistemas, eliminación de papel. Reducción 40-60% en tiempos de procesos y liberación de capacidad humana para trabajo estratégico.'
                  : 'Optimization and automation of business processes with technology: RPA (software bots), digital workflows, system integrations, paper elimination. 40-60% reduction in process times and freeing of human capacity for strategic work.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Digitaliza tus Procesos' : 'Digitize Your Processes'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/recursos`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Calcula tu potencial de ahorro' : 'Calculate your savings potential'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '50+', label: isEs ? 'procesos digitalizados' : 'digitized processes' },
                  { value: '40-60%', label: isEs ? 'reducción en tiempos' : 'time reduction' },
                  { icon: true, label: isEs ? 'ROI típico 200-400% primer año' : 'Typical ROI 200-400% first year' }
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

            {/* Right Visual - Bot/RPA Floating */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative"
                >
                  {/* Bot Icon Large */}
                  <div className="flex justify-center mb-6">
                    <div className="w-32 h-32 bg-turquesa/20 rounded-3xl flex items-center justify-center">
                      <Bot className="w-20 h-20 text-turquesa" />
                    </div>
                  </div>

                  {/* Process Flow Visualization */}
                  <div className="space-y-3">
                    {[
                      { label: isEs ? 'Proceso Manual' : 'Manual Process', progress: 30, color: 'red' },
                      { label: isEs ? 'Automatización' : 'Automation', progress: 100, color: 'turquesa' }
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white/60 text-sm">{item.label}</span>
                          <span className="text-turquesa font-bold text-sm">{item.progress}%</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ duration: 1.5, delay: 0.5 + idx * 0.3 }}
                            className={`h-full ${item.color === 'turquesa' ? 'bg-turquesa' : 'bg-red-500'} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Floating Badge */}
                  <motion.div
                    animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-6 -right-6 bg-turquesa rounded-2xl p-4 shadow-xl"
                  >
                    <Zap className="w-8 h-8 text-azul-marino" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUÉ ES DIGITALIZACIÓN SECTION - 3 Columnas Visuales
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Digitalización: de manual a digital y automatizado' : 'Digitization: from manual to digital and automated'}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                number: '1',
                title: isEs ? 'Mapear proceso actual' : 'Map current process',
                description: isEs ? 'Entendemos cómo funciona hoy (as-is)' : 'We understand how it works today (as-is)',
                icon: Search,
                color: 'turquesa'
              },
              {
                number: '2',
                title: isEs ? 'Optimizar eliminando pasos innecesarios' : 'Optimize by eliminating unnecessary steps',
                description: isEs ? 'Rediseñamos proceso (to-be optimizado)' : 'We redesign process (optimized to-be)',
                icon: Target,
                color: 'menta'
              },
              {
                number: '3',
                title: isEs ? 'Digitalizar con tecnología apropiada' : 'Digitize with appropriate technology',
                description: isEs ? 'RPA, workflows, integraciones' : 'RPA, workflows, integrations',
                icon: Zap,
                color: 'violeta'
              }
            ].map((step, idx) => {
              const colors = colorClasses[step.color as keyof typeof colorClasses];
              return (
                <AnimatedSection key={idx} delay={idx * 0.1}>
                  <div className="bg-blanco-hueso dark:bg-card p-8 rounded-2xl shadow-brand text-center border border-gris-arena/20">
                    <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-3xl font-bold text-azul-marino dark:text-white">{step.number}</span>
                    </div>
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <step.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-foreground/70 text-sm">
                      {step.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Regla de Oro */}
          <AnimatedSection>
            <div className="bg-turquesa/10 border-l-4 border-turquesa rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-turquesa flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-2">
                    {isEs ? 'Regla de oro' : 'Golden rule'}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {isEs 
                      ? 'No digitalices proceso malo. Primero optimiza (elimina desperdicios, simplifica flujo), luego digitaliza. Si automatizas ineficiencia, tendrás ineficiencia automatizada más rápida sin valor real.'
                      : 'Don\'t digitize bad process. First optimize (eliminate waste, simplify flow), then digitize. If you automate inefficiency, you\'ll have faster automated inefficiency without real value.'}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          PARA QUIÉN ES SECTION - Grid 2x3 con Iconos Grandes
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Cuándo digitalizar procesos es crítico?' : 'When is digitizing processes critical?'}
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
                               hover:shadow-brand-lg transition-all duration-300 border border-gris-arena/20 text-center"
                  >
                    <div className={`w-20 h-20 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <item.icon className={`w-10 h-10 ${colors.text}`} />
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
          4 TECNOLOGÍAS SECTION - Cards Horizontales
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '4 tecnologías según tipo de proceso' : '4 technologies according to process type'}
            </h2>
          </AnimatedSection>

          <div className="space-y-8">
            {technologies.map((tech, idx) => {
              const colors = colorClasses[tech.color as keyof typeof colorClasses];
              return (
                <AnimatedSection key={idx} delay={idx * 0.1}>
                  <div className="bg-blanco-hueso dark:bg-card rounded-2xl p-8 shadow-brand border border-gris-arena/20">
                    <div className="grid lg:grid-cols-[120px_1fr] gap-6">
                      {/* Icon */}
                      <div className={`w-28 h-28 ${colors.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <tech.icon className={`w-14 h-14 ${colors.text}`} />
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-2xl font-semibold text-azul-marino dark:text-white">
                            {tech.title}
                          </h3>
                          <span className={`${colors.badge} font-semibold text-sm px-3 py-1 rounded-full`}>
                            {tech.roi}
                          </span>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`${colors.text} font-semibold text-sm`}>
                                {isEs ? '¿Qué es?' : 'What is it?'}
                              </span>
                            </div>
                            <p className="text-foreground/70 text-sm">{tech.what}</p>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`${colors.text} font-semibold text-sm`}>
                                {isEs ? '¿Cuándo usarlo?' : 'When to use it?'}
                              </span>
                            </div>
                            <p className="text-foreground/70 text-sm">{tech.when}</p>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`${colors.text} font-semibold text-sm`}>
                                {isEs ? 'Herramientas:' : 'Tools:'}
                              </span>
                            </div>
                            <p className="text-foreground/70 text-sm">{tech.tools}</p>
                          </div>

                          <div className="bg-white dark:bg-background p-4 rounded-xl border border-gris-arena/20">
                            <div className="flex items-center gap-2 mb-1">
                              <Sparkles className={`w-4 h-4 ${colors.text}`} />
                              <span className={`${colors.text} font-semibold text-sm`}>
                                {isEs ? 'Ejemplo:' : 'Example:'}
                              </span>
                            </div>
                            <p className="text-foreground/70 text-sm">{tech.example}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESO DE DIGITALIZACIÓN - Timeline Vertical
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Cómo digitalizamos tus procesos' : 'How we digitize your processes'}
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical Line - Desktop */}
              <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-turquesa via-menta to-violeta" />

              <div className="space-y-8">
                {processPhases.map((phase, idx) => {
                  const colors = colorClasses[phase.color as keyof typeof colorClasses];
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      {/* Timeline Dot */}
                      <div className="hidden lg:block absolute left-8 -translate-x-1/2 w-4 h-4 bg-turquesa rounded-full border-4 border-white dark:border-background z-10" />

                      <div className="lg:pl-20">
                        <div className="bg-white dark:bg-background p-6 rounded-2xl shadow-brand border-l-4 border-turquesa">
                          <div className="flex items-start gap-4 mb-4">
                            <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                              <phase.icon className={`w-6 h-6 ${colors.text}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-bold text-azul-marino dark:text-white">
                                  {phase.phase}
                                </h3>
                                <span className={`${colors.badge} text-xs font-medium px-2 py-1 rounded`}>
                                  {phase.duration}
                                </span>
                              </div>
                              {phase.critical && (
                                <div className="mb-2">
                                  <span className="text-orange-500 text-xs font-semibold bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded">
                                    ⚠️ {phase.critical}
                                  </span>
                                </div>
                              )}
                              <p className="text-foreground/70 text-sm mb-3 leading-relaxed">
                                {phase.description}
                              </p>
                              <div className="text-xs text-turquesa font-medium">
                                {phase.deliverable}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <AnimatedSection className="text-center mt-12">
              <p className="text-lg text-turquesa font-semibold">
                {isEs ? 'DURACIÓN POR PROCESO: 4-10 semanas según complejidad' : 'DURATION PER PROCESS: 4-10 weeks depending on complexity'}
              </p>
            </AnimatedSection>
          </div>
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
                  <p className="text-white/70">{benefit.label}</p>
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
                      {isEs ? 'Aseguradora digitaliza procesamiento de reclamaciones' : 'Insurer digitizes claims processing'}
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
                          ? 'Aseguradora de autos (operación regional, 5,000 reclamaciones/mes)'
                          : 'Auto insurer (regional operation, 5,000 claims/month)'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Situación' : 'Situation'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Procesamiento de reclamaciones 100% manual: analista recibe email con documentos (fotos del accidente, formulario, factura taller), verifica cobertura en sistema de pólizas, calcula monto aprobado, ingresa en sistema de pagos, envía email al cliente. Tiempo: 45-60 min por reclamación. 25 analistas dedicados full-time.'
                          : '100% manual claims processing: analyst receives email with documents (accident photos, form, shop invoice), verifies coverage in policy system, calculates approved amount, enters in payment system, sends email to client. Time: 45-60 min per claim. 25 analysts dedicated full-time.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-foreground/70 mb-3">
                        {isEs 
                          ? 'Automatización inteligente en 12 semanas:'
                          : 'Intelligent automation in 12 weeks:'}
                      </p>
                      <ul className="space-y-2 text-foreground/70 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'OCR + IA: Extrae datos de formularios y fotos automáticamente' : 'OCR + AI: Automatically extracts data from forms and photos'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'RPA: Bot consulta sistema de pólizas, valida cobertura, calcula monto' : 'RPA: Bot consults policy system, validates coverage, calculates amount'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Integración API: Envía pago aprobado a sistema de pagos' : 'API Integration: Sends approved payment to payment system'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Workflow digital: Casos complejos se enrutan a analista humano' : 'Digital workflow: Complex cases routed to human analyst'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-azul-marino dark:text-white mb-4">
                      {isEs ? 'Resultados (6 meses post-implementación)' : 'Results (6 months post-implementation)'}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { value: '70%', label: isEs ? 'Reclamaciones automáticas' : 'Automatic claims', sub: isEs ? 'Sin analista' : 'No analyst' },
                        { value: '8 min', label: isEs ? 'Tiempo promedio' : 'Average time', sub: isEs ? '45 min → 8 min' : '45 min → 8 min' },
                        { value: '8,500', label: isEs ? 'Capacidad/mes' : 'Capacity/month', sub: isEs ? '5,000 → 8,500' : '5,000 → 8,500' },
                        { value: '0.5%', label: isEs ? 'Errores' : 'Errors', sub: isEs ? '8% → 0.5%' : '8% → 0.5%' },
                        { value: '1 día', label: isEs ? 'Tiempo respuesta' : 'Response time', sub: isEs ? '5-7 días → 1 día' : '5-7 days → 1 day' },
                        { value: '4.4/5', label: isEs ? 'CSAT' : 'CSAT', sub: isEs ? '3.1 → 4.4' : '3.1 → 4.4' },
                        { value: '380%', label: isEs ? 'ROI' : 'ROI', sub: isEs ? 'Primer año' : 'First year' },
                        { value: '$400K', label: isEs ? 'Costo evitado' : 'Cost avoided', sub: isEs ? 'No contratar 10 analistas' : 'Don\'t hire 10 analysts' }
                      ].map((stat, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          className="bg-white dark:bg-background p-4 rounded-xl shadow-brand text-center"
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
                    <div className="bg-turquesa/10 p-4 rounded-xl border border-turquesa/20">
                      <p className="text-sm text-foreground/70">
                        {isEs 
                          ? 'Uso de capacidad liberada: Analistas reasignados a casos complejos y fraudes (mayor valor). NO se despidió a nadie.'
                          : 'Use of freed capacity: Analysts reassigned to complex cases and fraud (higher value). NO one was fired.'}
                      </p>
                    </div>
                  </div>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                  {isEs 
                    ? '"Automatización nos permitió crecer 70% en volumen sin contratar. Analistas se enfocan en casos complejos que requieren juicio humano, no trabajo repetitivo."'
                    : '"Automation allowed us to grow 70% in volume without hiring. Analysts focus on complex cases requiring human judgment, not repetitive work."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— {isEs ? 'VP Operaciones' : 'VP Operations'}</span>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          TOP 10 PROCESOS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Top 10 procesos con mayor ROI de automatización' : 'Top 10 processes with highest automation ROI'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-4">
            {topProcesses.map((item, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="bg-white dark:bg-background p-6 rounded-2xl shadow-brand border border-gris-arena/20 flex items-start gap-4"
                >
                  <Check className="w-6 h-6 text-turquesa flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-azul-marino dark:text-white mb-1">
                      {item.process}
                    </h3>
                    <p className="text-foreground/70 text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
                {isEs ? '¿Listo para digitalizar y automatizar procesos?' : 'Ready to digitize and automate processes?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Evaluación de 30 minutos. Identificamos procesos con mayor potencial de automatización y calculamos ROI preliminar.'
                  : '30-minute evaluation. We identify processes with greatest automation potential and calculate preliminary ROI.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Identificación de procesos automatizables' : 'Identification of automatable processes',
                  isEs ? 'Estimación de horas/año liberables' : 'Estimation of hours/year freeable',
                  isEs ? 'Cálculo de ROI preliminar' : 'Preliminary ROI calculation',
                  isEs ? 'Recomendación de tecnología apropiada' : 'Recommendation of appropriate technology',
                  isEs ? 'Propuesta de automatización' : 'Automation proposal'
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
                    {isEs ? 'Evaluar Potencial de Automatización' : 'Evaluate Automation Potential'}
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

'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import {
  Building2,
  ArrowRight,
  ChevronDown,
  TrendingUp,
  AlertTriangle,
  FileText,
  Users,
  Zap,
  CheckCircle2,
  Phone,
  Sparkles,
  Shield,
  Clock,
  Target,
  Layers,
  BarChart3,
  Search,
  GitBranch,
  RefreshCw,
  Award,
  Network
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

export default function DisenoOrganizacionalPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Consultoría Estratégica' : 'Strategic Consulting', href: `/${locale}/servicios/consultoria-estrategica` },
    { label: isEs ? 'Diseño Organizacional' : 'Organizational Design', href: null }
  ];

  const forWho = [
    {
      icon: TrendingUp,
      title: isEs ? 'Empresa escalando rápidamente' : 'Company scaling rapidly',
      description: isEs
        ? 'Crecimiento acelerado (duplicar tamaño en 2 años). Estructura informal que funcionaba con 30 personas colapsa con 100+. Necesitas profesionalizar.'
        : 'Accelerated growth (doubling size in 2 years). Informal structure that worked with 30 people collapses with 100+. You need to professionalize.',
      color: 'turquesa'
    },
    {
      icon: Network,
      title: isEs ? 'Silos departamentales disfuncionales' : 'Dysfunctional departmental silos',
      description: isEs
        ? 'Áreas operan como feudos independientes. Falta colaboración, se "lanzan problemas sobre la pared", objetivos departamentales desalineados de objetivos corporativos.'
        : 'Areas operate as independent fiefdoms. Lack of collaboration, problems "thrown over the wall", departmental objectives misaligned from corporate objectives.',
      color: 'menta'
    },
    {
      icon: Target,
      title: isEs ? 'Estrategia cambió pero estructura no' : 'Strategy changed but structure didn\'t',
      description: isEs
        ? 'Nueva estrategia (nuevos productos, mercados, modelo de negocio) pero organigrama sigue igual. Estructura frena ejecución de nueva estrategia.'
        : 'New strategy (new products, markets, business model) but organizational chart remains same. Structure hinders new strategy execution.',
      color: 'violeta'
    },
    {
      icon: Users,
      title: isEs ? 'Roles y responsabilidades confusos' : 'Confusing roles and responsibilities',
      description: isEs
        ? '"No está claro quién hace qué", decisiones atrapadas porque nadie tiene ownership, duplicación de esfuerzos, trabajo cayendo en grietas.'
        : '"It\'s not clear who does what", decisions stuck because no one has ownership, effort duplication, work falling in gaps.',
      color: 'turquesa'
    },
    {
      icon: RefreshCw,
      title: isEs ? 'Post-fusión o adquisición' : 'Post-merger or acquisition',
      description: isEs
        ? 'Integrando dos empresas con estructuras diferentes. Necesitas estructura unificada que capture sinergias y elimine duplicaciones.'
        : 'Integrating two companies with different structures. You need unified structure that captures synergies and eliminates duplications.',
      color: 'menta'
    },
    {
      icon: Layers,
      title: isEs ? 'Estructura jerárquica excesiva' : 'Excessive hierarchical structure',
      description: isEs
        ? 'Demasiados niveles jerárquicos (7+ niveles). Decisiones lentas, burocracia, distancia entre CEO y operación. Necesitas aplanar.'
        : 'Too many hierarchical levels (7+ levels). Slow decisions, bureaucracy, distance between CEO and operation. You need to flatten.',
      color: 'violeta'
    }
  ];

  const designPrinciples = [
    {
      title: isEs ? 'ALINEACIÓN CON ESTRATEGIA' : 'ALIGNMENT WITH STRATEGY',
      description: isEs
        ? 'Estructura debe habilitar ejecución de estrategia. Si estrategia es "expansión geográfica", estructura debe reflejarlo (organizarte por geografías). Si estrategia es "excelencia en productos", estructura por líneas de producto.'
        : 'Structure must enable strategy execution. If strategy is "geographic expansion", structure must reflect it (organize by geographies). If strategy is "product excellence", structure by product lines.',
      icon: Target,
      color: 'turquesa'
    },
    {
      title: isEs ? 'CLARIDAD DE ROLES Y OWNERSHIP' : 'ROLE AND OWNERSHIP CLARITY',
      description: isEs
        ? 'Cada rol debe tener propósito claro, responsabilidades definidas y ownership de resultados específicos. Ambigüedad genera conflicto y trabajo cayendo en grietas.'
        : 'Each role must have clear purpose, defined responsibilities and ownership of specific results. Ambiguity generates conflict and work falling in gaps.',
      icon: FileText,
      color: 'menta'
    },
    {
      title: isEs ? 'SPAN OF CONTROL APROPIADO' : 'APPROPRIATE SPAN OF CONTROL',
      description: isEs
        ? 'Gerentes con 3-10 reportes directos típicamente (depende de complejidad). Muy pocos (<3): micromanagement. Muy muchos (>12): falta de supervisión. Balance según contexto.'
        : 'Managers with 3-10 direct reports typically (depends on complexity). Too few (<3): micromanagement. Too many (>12): lack of supervision. Balance according to context.',
      icon: Users,
      color: 'violeta'
    },
    {
      title: isEs ? 'NIVELES JERÁRQUICOS MÍNIMOS' : 'MINIMUM HIERARCHICAL LEVELS',
      description: isEs
        ? 'Estructura plana (4-6 niveles) es preferible a estructura alta (8+ niveles). Menos niveles = decisiones más rápidas, mejor comunicación, menos burocracia.'
        : 'Flat structure (4-6 levels) is preferable to tall structure (8+ levels). Fewer levels = faster decisions, better communication, less bureaucracy.',
      icon: Layers,
      color: 'turquesa'
    },
    {
      title: isEs ? 'MECANISMOS DE INTEGRACIÓN' : 'INTEGRATION MECHANISMS',
      description: isEs
        ? 'En estructuras con especialización, necesitas mecanismos para integrar: comités cross-funcionales, roles integradores (ej: Product Manager), procesos estructurados de colaboración.'
        : 'In structures with specialization, you need mechanisms to integrate: cross-functional committees, integrator roles (e.g.: Product Manager), structured collaboration processes.',
      icon: Network,
      color: 'menta'
    },
    {
      title: isEs ? 'FLEXIBILIDAD Y ADAPTABILIDAD' : 'FLEXIBILITY AND ADAPTABILITY',
      description: isEs
        ? 'Estructura debe ser estable pero no rígida. Capacidad de adaptarse a cambios de mercado o estrategia sin reestructuración completa cada año.'
        : 'Structure must be stable but not rigid. Capacity to adapt to market or strategy changes without complete restructuring every year.',
      icon: RefreshCw,
      color: 'violeta'
    }
  ];

  const structureTypes = [
    {
      title: isEs ? 'FUNCIONAL' : 'FUNCTIONAL',
      description: isEs
        ? 'Agrupación por función (Ventas, Operaciones, Finanzas, RRHH)'
        : 'Grouping by function (Sales, Operations, Finance, HR)',
      pros: isEs
        ? ['Especialización', 'Eficiencia funcional', 'Economías de escala']
        : ['Specialization', 'Functional efficiency', 'Economies of scale'],
      cons: isEs
        ? ['Silos', 'Difícil coordinación cross-funcional', 'Foco en función vs cliente']
        : ['Silos', 'Difficult cross-functional coordination', 'Focus on function vs customer'],
      bestFor: isEs
        ? 'Empresas pequeñas-medianas, producto/mercado único, operaciones estables'
        : 'Small-medium companies, single product/market, stable operations',
      icon: Building2,
      color: 'turquesa'
    },
    {
      title: isEs ? 'DIVISIONAL (POR PRODUCTO)' : 'DIVISIONAL (BY PRODUCT)',
      description: isEs
        ? 'Agrupación por línea de producto o unidad de negocio'
        : 'Grouping by product line or business unit',
      pros: isEs
        ? ['Foco en producto', 'Autonomía', 'Accountability de P&L', 'Agilidad']
        : ['Product focus', 'Autonomy', 'P&L accountability', 'Agility'],
      cons: isEs
        ? ['Duplicación de funciones', 'Economías de escala menores']
        : ['Function duplication', 'Lower economies of scale'],
      bestFor: isEs
        ? 'Empresas multi-producto, productos con dinámicas diferentes'
        : 'Multi-product companies, products with different dynamics',
      icon: Layers,
      color: 'menta'
    },
    {
      title: isEs ? 'GEOGRÁFICA' : 'GEOGRAPHIC',
      description: isEs
        ? 'Agrupación por región/país'
        : 'Grouping by region/country',
      pros: isEs
        ? ['Proximidad a mercados locales', 'Adaptación regional', 'Accountability geográfico']
        : ['Proximity to local markets', 'Regional adaptation', 'Geographic accountability'],
      cons: isEs
        ? ['Duplicación funcional', 'Difícil estandarización global']
        : ['Functional duplication', 'Difficult global standardization'],
      bestFor: isEs
        ? 'Empresas multi-país, regulaciones locales diferentes'
        : 'Multi-country companies, different local regulations',
      icon: Network,
      color: 'violeta'
    },
    {
      title: isEs ? 'MATRICIAL' : 'MATRIX',
      description: isEs
        ? 'Doble línea de reporte (ej: funcional + producto, o geografía + funcional)'
        : 'Dual reporting line (e.g.: functional + product, or geography + functional)',
      pros: isEs
        ? ['Balancea múltiples dimensiones', 'Flexibilidad', 'Compartir recursos']
        : ['Balances multiple dimensions', 'Flexibility', 'Resource sharing'],
      cons: isEs
        ? ['Complejidad', 'Conflicto de prioridades', 'Confusión de reporte']
        : ['Complexity', 'Priority conflict', 'Reporting confusion'],
      bestFor: isEs
        ? 'Empresas grandes, complejas, donde balancear múltiples dimensiones es crítico'
        : 'Large, complex companies where balancing multiple dimensions is critical',
      icon: GitBranch,
      color: 'turquesa'
    },
    {
      title: isEs ? 'HÍBRIDA' : 'HYBRID',
      description: isEs
        ? 'Combinación de modelos (ej: funcional en HQ + geográfico en regiones)'
        : 'Combination of models (e.g.: functional at HQ + geographic in regions)',
      pros: isEs
        ? ['Adapta diseño a necesidades específicas de cada parte']
        : ['Adapts design to specific needs of each part'],
      cons: isEs
        ? ['Puede generar inconsistencia si mal diseñada']
        : ['Can generate inconsistency if poorly designed'],
      bestFor: isEs
        ? 'Empresas que necesitan flexibilidad según área/región'
        : 'Companies that need flexibility according to area/region',
      icon: Building2,
      color: 'menta'
    }
  ];

  const processPhases = [
    {
      phase: isEs ? 'DIAGNÓSTICO Y CONTEXTO' : 'DIAGNOSIS AND CONTEXT',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Revisión de estrategia y objetivos de negocio. Análisis de estructura actual (organigrama, spans, niveles). Entrevistas con liderazgo sobre disfunciones actuales. Benchmarking de estructuras en industria. Identificación de principios de diseño críticos.'
        : 'Review of strategy and business objectives. Current structure analysis (organizational chart, spans, levels). Leadership interviews on current dysfunctions. Industry structure benchmarking. Critical design principles identification.',
      icon: Search,
      deliverable: isEs ? 'Diagnóstico de estructura actual + principios de diseño' : 'Current structure diagnosis + design principles',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'DISEÑO DE ESTRUCTURA' : 'STRUCTURE DESIGN',
      duration: isEs ? '2-3 semanas' : '2-3 weeks',
      description: isEs
        ? 'Desarrollo de 2-3 opciones de estructura (modelos alternativos). Definición de áreas/departamentos principales. Niveles jerárquicos y spans of control. Líneas de reporte. Análisis pros/cons de cada opción. Validación con CEO/liderazgo.'
        : 'Development of 2-3 structure options (alternative models). Main areas/departments definition. Hierarchical levels and spans of control. Reporting lines. Pros/cons analysis of each option. Validation with CEO/leadership.',
      icon: Layers,
      deliverable: isEs ? 'Opciones de estructura con recomendación' : 'Structure options with recommendation',
      color: 'menta'
    },
    {
      phase: isEs ? 'DEFINICIÓN DE ROLES Y GOVERNANCE' : 'ROLE AND GOVERNANCE DEFINITION',
      duration: isEs ? '2-3 semanas' : '2-3 weeks',
      description: isEs
        ? 'Perfiles de puesto de roles clave (top 15-25 posiciones). Matriz RACI de responsabilidades críticas. Diseño de comités y procesos de governance. Procesos de toma de decisiones. Mecanismos de coordinación cross-funcional.'
        : 'Job profiles of key roles (top 15-25 positions). RACI matrix of critical responsibilities. Committees and governance processes design. Decision-making processes. Cross-functional coordination mechanisms.',
      icon: FileText,
      deliverable: isEs ? 'Perfiles de puesto + governance model' : 'Job profiles + governance model',
      color: 'violeta'
    },
    {
      phase: isEs ? 'PLAN DE TRANSICIÓN' : 'TRANSITION PLAN',
      duration: isEs ? '1-2 semanas' : '1-2 weeks',
      description: isEs
        ? 'Mapeo de personas actuales a nueva estructura. Identificación de gaps de talento (roles sin persona, personas sin rol). Plan de reclutamiento para roles nuevos. Plan de comunicación de cambio. Timeline de transición (big bang vs gradual).'
        : 'Mapping of current people to new structure. Talent gap identification (roles without person, people without role). Recruitment plan for new roles. Change communication plan. Transition timeline (big bang vs gradual).',
      icon: GitBranch,
      deliverable: isEs ? 'Plan de transición detallado' : 'Detailed transition plan',
      color: 'turquesa'
    },
    {
      phase: isEs ? 'IMPLEMENTACIÓN Y ACOMPAÑAMIENTO' : 'IMPLEMENTATION AND SUPPORT',
      duration: isEs ? '1-3 meses' : '1-3 months',
      description: isEs
        ? 'Comunicación de nueva estructura a organización. Acompañamiento en transición. Coaching a líderes en nuevos roles. Ajustes basados en feedback operativo. Monitoreo de efectividad de nueva estructura.'
        : 'Communication of new structure to organization. Transition support. Coaching leaders in new roles. Adjustments based on operational feedback. New structure effectiveness monitoring.',
      icon: Users,
      deliverable: isEs ? 'Estructura implementada y funcionando' : 'Structure implemented and functioning',
      color: 'menta'
    }
  ];

  const includes = [
    {
      title: isEs ? 'Análisis y Diseño' : 'Analysis and Design',
      icon: Search,
      items: isEs
        ? ['Diagnóstico de estructura actual', 'Benchmarking de mejores prácticas', '2-3 opciones de estructura con pros/cons', 'Organigrama detallado de estructura recomendada', 'Análisis de impacto de cambio']
        : ['Current structure diagnosis', 'Best practices benchmarking', '2-3 structure options with pros/cons', 'Detailed organizational chart of recommended structure', 'Change impact analysis'],
      color: 'turquesa'
    },
    {
      title: isEs ? 'Roles y Responsabilidades' : 'Roles and Responsibilities',
      icon: FileText,
      items: isEs
        ? ['Perfiles de puesto de top 15-25 roles', 'Matriz RACI de responsabilidades críticas', 'Definición de comités y governance', 'Procesos de toma de decisiones', 'Job descriptions actualizadas']
        : ['Job profiles of top 15-25 roles', 'RACI matrix of critical responsibilities', 'Committees and governance definition', 'Decision-making processes', 'Updated job descriptions'],
      color: 'menta'
    },
    {
      title: isEs ? 'Plan de Transición' : 'Transition Plan',
      icon: GitBranch,
      items: isEs
        ? ['Mapeo de personas a nueva estructura', 'Identificación de gaps de talento', 'Plan de reclutamiento de roles nuevos', 'Timeline de transición', 'Plan de comunicación del cambio']
        : ['People mapping to new structure', 'Talent gap identification', 'Recruitment plan for new roles', 'Transition timeline', 'Change communication plan'],
      color: 'violeta'
    },
    {
      title: isEs ? 'Implementación' : 'Implementation',
      icon: Users,
      items: isEs
        ? ['Comunicación a organización', 'Acompañamiento en transición (1-3 meses)', 'Coaching de líderes en nuevos roles', 'Ajustes basados en operación real', 'Monitoreo de efectividad']
        : ['Organization communication', 'Transition support (1-3 months)', 'Leaders coaching in new roles', 'Adjustments based on real operation', 'Effectiveness monitoring'],
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '100%', label: isEs ? 'Alineación estructura con estrategia' : 'Structure alignment with strategy', icon: Target },
    { value: '30-50%', label: isEs ? 'Reducción de silos y fricción' : 'Reduction of silos and friction', icon: Network },
    { value: '25%+', label: isEs ? 'Mejora en velocidad de decisiones' : 'Improvement in decision speed', icon: Zap },
    { value: 'Claridad', label: isEs ? 'Roles y responsabilidades definidos' : 'Defined roles and responsibilities', icon: FileText },
    { value: '6-10', label: isEs ? 'semanas Diseño completo de estructura' : 'weeks Complete structure design', icon: Clock },
    { value: 'Ownership', label: isEs ? 'Accountability clara de resultados' : 'Clear accountability of results', icon: Award }
  ];

  const faqs = [
    {
      question: isEs ? '¿Cómo determinan estructura apropiada para mi empresa?' : 'How do you determine appropriate structure for my company?',
      answer: isEs
        ? 'No hay fórmula única. Evaluamos múltiples factores: (1) Estrategia: ¿Diferenciación por producto, geografía, cliente? Estructura debe reflejar dimensión estratégica crítica. (2) Tamaño: <50 empleados: funcional simple. 50-500: funcional o divisional. 500+: matricial o híbrida. (3) Complejidad: Producto único simple vs multi-producto complejo. (4) Mercado: Local vs multi-país. (5) Cultura: Algunas culturas manejan bien matricial, otras no. Diseñamos 2-3 opciones y recomendamos óptima según contexto.'
        : 'There\'s no unique formula. We evaluate multiple factors: (1) Strategy: Differentiation by product, geography, customer? Structure must reflect critical strategic dimension. (2) Size: <50 employees: simple functional. 50-500: functional or divisional. 500+: matrix or hybrid. (3) Complexity: Single simple product vs multi-product complex. (4) Market: Local vs multi-country. (5) Culture: Some cultures handle matrix well, others don\'t. We design 2-3 options and recommend optimal according to context.'
    },
    {
      question: isEs ? '¿Rediseño implica despidos o solo reorganización?' : 'Does redesign imply layoffs or just reorganization?',
      answer: isEs
        ? 'Depende de situación. Tres escenarios comunes: (1) Crecimiento (80% casos): Rediseño para escalar. Roles nuevos, promociones, reclutamiento. Nadie sale. (2) Optimización (15% casos): Eliminar duplicaciones, aplanar niveles. Puede implicar reducción moderada (5-10%) o reasignaciones. (3) Crisis/turnaround (5% casos): Reestructuración con reducción significativa. Alternative diseña estructura óptima independiente de consideración de personas; luego cliente decide qué hacer con gaps/excesos de talento.'
        : 'Depends on situation. Three common scenarios: (1) Growth (80% of cases): Redesign to scale. New roles, promotions, recruitment. No one leaves. (2) Optimization (15% of cases): Eliminate duplications, flatten levels. May imply moderate reduction (5-10%) or reassignments. (3) Crisis/turnaround (5% of cases): Restructuring with significant reduction. Alternative designs optimal structure independent of people consideration; then client decides what to do with talent gaps/excesses.'
    },
    {
      question: isEs ? '¿Cuánto tiempo toma la transición a nueva estructura?' : 'How long does transition to new structure take?',
      answer: isEs
        ? 'Comunicación y anuncio: 1 día (día D). Transición operativa completa: 1-6 meses según complejidad. Cambios simples (ajustar reportes, mover personas entre áreas): 1-2 meses. Cambios complejos (crear divisiones nuevas, contratar 20 personas, integrar sistemas): 4-6 meses. Adaptación cultural completa: 6-12 meses. Error común: anunciar estructura nueva y esperar que funcione inmediatamente. Requiere acompañamiento intensivo primeros 3 meses (clarificar roles, resolver conflictos, ajustar según realidad).'
        : 'Communication and announcement: 1 day (day D). Complete operational transition: 1-6 months according to complexity. Simple changes (adjust reports, move people between areas): 1-2 months. Complex changes (create new divisions, hire 20 people, integrate systems): 4-6 months. Complete cultural adaptation: 6-12 months. Common error: announce new structure and expect it to work immediately. Requires intensive support first 3 months (clarify roles, resolve conflicts, adjust according to reality).'
    },
    {
      question: isEs ? '¿Alternative solo diseña o también gestiona el cambio de estructura?' : 'Does Alternative only design or also manage structure change?',
      answer: isEs
        ? 'Ofrecemos ambos según necesidad: (1) Solo diseño: Diseñamos estructura, entregamos plan de transición, cliente ejecuta. (2) Diseño + implementación: Diseñamos Y acompañamos transición 1-3 meses. Facilitamos comunicación, coaching de líderes, resolución de conflictos, ajustes operativos. Modelo 2 tiene significativamente mayor tasa de éxito (estructura realmente funciona vs estructura bien diseñada mal implementada).'
        : 'We offer both according to need: (1) Design only: We design structure, deliver transition plan, client executes. (2) Design + implementation: We design AND support transition 1-3 months. We facilitate communication, leaders coaching, conflict resolution, operational adjustments. Model 2 has significantly higher success rate (structure really works vs well-designed structure poorly implemented).'
    },
    {
      question: isEs ? '¿Qué hacer con líderes que pierden personas en rediseño?' : 'What to do with leaders who lose people in redesign?',
      answer: isEs
        ? 'Situación común: VP tenía 80 reportes, nueva estructura tiene 30. Opciones: (1) Redefinir rol: VP estratégico (menos operativo), (2) Promoción lateral: VP a rol especializado de mayor valor, (3) Salida negociada: Si no hay fit en nueva estructura. Crítico: Comunicación honesta temprana. Sorpresas generan resistencia masiva. Involucramos líderes en co-diseño de estructura cuando posible (ownership).'
        : 'Common situation: VP had 80 reports, new structure has 30. Options: (1) Redefine role: Strategic VP (less operational), (2) Lateral promotion: VP to specialized role of greater value, (3) Negotiated exit: If no fit in new structure. Critical: Early honest communication. Surprises generate massive resistance. We involve leaders in structure co-design when possible (ownership).'
    },
    {
      question: isEs ? '¿Cada cuánto tiempo debo revisar/actualizar estructura?' : 'How often should I review/update structure?',
      answer: isEs
        ? 'Revisión menor: Anual. Ajustes incrementales (reasignaciones, nuevos roles). Revisión mayor: Cada 3-5 años o cuando cambio significativo lo amerita: estrategia cambia dramáticamente, empresa duplica tamaño, fusión/adquisición, nueva línea de negocio, disfunciones graves. Señal de que necesitas revisión: Fricción significativa, decisiones lentas, silos, falta de claridad de roles. Estructura debe ser estable pero no rígida. Cambiar estructura cada año genera caos; mantenerla 10 años sin revisar genera obsolescencia.'
        : 'Minor review: Annually. Incremental adjustments (reassignments, new roles). Major review: Every 3-5 years or when significant change warrants it: strategy changes dramatically, company doubles size, merger/acquisition, new business line, serious dysfunctions. Signal that you need review: Significant friction, slow decisions, silos, lack of role clarity. Structure must be stable but not rigid. Changing structure every year generates chaos; maintaining it 10 years without review generates obsolescence.'
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
        currentService="consultoria-estrategica"
      />

      {/* =====================================================
          HERO SECTION - Unique Design with Organizational Chart
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        {/* Background Pattern - Organizational Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(108, 196, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(108, 196, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
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
                  <Building2 className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Diseño Organizacional' : 'Organizational Design'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Consultoría Estratégica' : 'Strategic Consulting'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Estructura organizacional alineada a tu estrategia'
                  : 'Organizational structure aligned to your strategy'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Diseño o rediseño de estructura organizacional: organigrama optimizado, definición de roles y responsabilidades, procesos de governance, modelo operativo. Estructura que habilita ejecución estratégica y elimina silos disfuncionales.'
                  : 'Design or redesign of organizational structure: optimized organizational chart, role and responsibility definition, governance processes, operating model. Structure that enables strategic execution and eliminates dysfunctional silos.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Rediseña tu Estructura' : 'Redesign Your Structure'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/recursos`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Descarga guía de diseño organizacional' : 'Download organizational design guide'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '20+', label: isEs ? 'estructuras organizacionales diseñadas' : 'organizational structures designed' },
                  { value: 'Alineación', label: isEs ? 'estrategia-estructura' : 'strategy-structure' },
                  { icon: true, label: isEs ? 'Reducción de silos y duplicaciones' : 'Reduction of silos and duplications' }
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

            {/* Right Visual - Organizational Chart Floating */}
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
                  {/* Org Chart Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-turquesa" />
                    <div className="w-3 h-3 rounded-full bg-menta" />
                    <div className="w-3 h-3 rounded-full bg-violeta" />
                    <span className="ml-auto text-white/40 text-sm">
                      {isEs ? 'Organigrama' : 'Organizational Chart'}
                    </span>
                  </div>

                  {/* Org Chart Visualization */}
                  <div className="space-y-3">
                    {/* CEO Level */}
                    <div className="bg-turquesa/20 rounded-xl p-3 text-center">
                      <Building2 className="w-6 h-6 text-turquesa mx-auto mb-1" />
                      <span className="text-white/70 text-xs">{isEs ? 'CEO' : 'CEO'}</span>
                    </div>

                    {/* Connection Line */}
                    <div className="flex justify-center">
                      <div className="w-0.5 h-4 bg-turquesa/30" />
                    </div>

                    {/* Management Level */}
                    <div className="grid grid-cols-3 gap-2">
                      {['VP 1', 'VP 2', 'VP 3'].map((vp, idx) => (
                        <motion.div
                          key={idx}
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                          className="bg-menta/20 rounded-lg p-2 text-center"
                        >
                          <Users className="w-4 h-4 text-menta mx-auto mb-1" />
                          <span className="text-white/60 text-xs">{vp}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Connection Lines */}
                    <div className="flex justify-around px-4">
                      {[0, 1, 2].map((idx) => (
                        <div key={idx} className="w-0.5 h-3 bg-menta/20" />
                      ))}
                    </div>

                    {/* Team Level */}
                    <div className="grid grid-cols-6 gap-1">
                      {[1, 2, 3, 4, 5, 6].map((team, idx) => (
                        <motion.div
                          key={idx}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                          className="bg-violeta/20 rounded p-1.5 text-center"
                        >
                          <div className="w-2 h-2 bg-violeta rounded-full mx-auto" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-turquesa rounded-2xl p-4 shadow-xl"
                >
                  <Layers className="w-8 h-8 text-azul-marino" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUÉ ES DISEÑO ORGANIZACIONAL SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs ? 'Diseño organizacional: arquitectura de tu empresa' : 'Organizational design: your company\'s architecture'}
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs 
                    ? 'Diseño organizacional es el proceso estructurado de definir o rediseñar la arquitectura de la organización: estructura (organigrama, niveles jerárquicos, agrupación de áreas), roles y responsabilidades, procesos de toma de decisiones, mecanismos de coordinación, modelo operativo. Es cómo organizas personas y recursos para ejecutar estrategia efectivamente.'
                    : 'Organizational design is the structured process of defining or redesigning organization architecture: structure (organizational chart, hierarchical levels, area grouping), roles and responsibilities, decision-making processes, coordination mechanisms, operating model. It\'s how you organize people and resources to execute strategy effectively.'}
                </p>
                <p>
                  {isEs 
                    ? 'Un diseño organizacional robusto incluye: organigrama con líneas de reporte claras, definición de roles críticos (perfiles de puesto), matriz RACI de responsabilidades, procesos de governance (comités, reuniones, decisiones), modelo de colaboración entre áreas, plan de transición de estructura actual a nueva.'
                    : 'A robust organizational design includes: organizational chart with clear reporting lines, critical role definition (job profiles), RACI responsibility matrix, governance processes (committees, meetings, decisions), inter-area collaboration model, transition plan from current to new structure.'}
                </p>
                <p>
                  {isEs 
                    ? 'Principio fundamental: "La estructura sigue a la estrategia" (Chandler). Primero defines QUÉ quieres lograr (estrategia), luego diseñas CÓMO organizarte para lograrlo (estructura). Estructura desalineada de estrategia genera fricción, silos, ineficiencia e incapacidad de ejecutar.'
                    : 'Fundamental principle: "Structure follows strategy" (Chandler). First you define WHAT you want to achieve (strategy), then you design HOW to organize to achieve it (structure). Structure misaligned from strategy generates friction, silos, inefficiency and inability to execute.'}
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
              {isEs ? '¿Cuándo necesitas rediseñar tu estructura?' : 'When do you need to redesign your structure?'}
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
          PRINCIPIOS DE DISEÑO SECTION - 6 Cards
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '6 principios de diseño organizacional efectivo' : '6 principles of effective organizational design'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designPrinciples.map((principle, idx) => {
              const colors = colorClasses[principle.color as keyof typeof colorClasses];
              const Icon = principle.icon;
              return (
                <StaggerItem key={idx}>
                  <div className="bg-blanco-hueso dark:bg-card p-8 rounded-2xl shadow-brand border border-gris-arena/20">
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-bold text-azul-marino dark:text-white mb-3">
                      {principle.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          TIPOS DE ESTRUCTURAS SECTION - 5 Cards con Pros/Cons
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '5 tipos de estructura organizacional' : '5 types of organizational structure'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="space-y-6">
            {structureTypes.map((structure, idx) => {
              const colors = colorClasses[structure.color as keyof typeof colorClasses];
              const Icon = structure.icon;
              return (
                <StaggerItem key={idx}>
                  <div className="bg-white dark:bg-background p-8 rounded-2xl shadow-brand border border-gris-arena/20">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-7 h-7 ${colors.text}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-azul-marino dark:text-white mb-2">
                          {structure.title}
                        </h3>
                        <p className="text-foreground/70 mb-4 text-sm">
                          {structure.description}
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <div className={`${colors.text} font-semibold text-xs mb-2`}>
                              {isEs ? 'Pros:' : 'Pros:'}
                            </div>
                            <ul className="space-y-1">
                              {structure.pros.map((pro, proIdx) => (
                                <li key={proIdx} className="text-foreground/60 text-sm flex items-start gap-2">
                                  <CheckCircle2 className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-foreground/60 font-semibold text-xs mb-2">
                              {isEs ? 'Contras:' : 'Cons:'}
                            </div>
                            <ul className="space-y-1">
                              {structure.cons.map((con, conIdx) => (
                                <li key={conIdx} className="text-foreground/60 text-sm flex items-start gap-2">
                                  <AlertTriangle className="w-4 h-4 text-foreground/40 flex-shrink-0 mt-0.5" />
                                  {con}
                                </li>
                              ))}
                            </ul>
                            <div className={`${colors.badge} text-xs font-medium px-2 py-1 rounded inline-block mt-3`}>
                              {isEs ? 'Mejor para:' : 'Best for:'} {structure.bestFor}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <AnimatedSection className="mt-8 text-center">
            <p className="text-lg text-turquesa font-semibold">
              {isEs 
                ? 'Conclusión: No hay estructura "correcta" universal. Depende de estrategia, tamaño, industria, mercado.'
                : 'Conclusion: There\'s no universal "correct" structure. Depends on strategy, size, industry, market.'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          PROCESO DE DISEÑO - Timeline 5 Fases
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Cómo diseñamos tu estructura organizacional' : 'How we design your organizational structure'}
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
                      <div className="bg-blanco-hueso dark:bg-card p-4 rounded-2xl shadow-brand">
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
                  className="bg-blanco-hueso dark:bg-card p-6 rounded-2xl shadow-brand border-l-4 border-turquesa"
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
              {isEs ? 'DURACIÓN TOTAL: 6-10 semanas diseño + 1-3 meses implementación' : 'TOTAL DURATION: 6-10 weeks design + 1-3 months implementation'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          QUÉ INCLUYE SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
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
                  <div className="bg-white dark:bg-background p-8 rounded-2xl shadow-brand border border-gris-arena/20">
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
                      {isEs ? 'Empresa tech rediseña estructura y acelera lanzamientos 40%' : 'Tech company redesigns structure and accelerates launches 40%'}
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
                          ? 'Empresa de desarrollo de software (SaaS, 150 empleados, $20M ARR)'
                          : 'Software development company (SaaS, 150 employees, $20M ARR)'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Situación' : 'Situation'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Crecimiento explosivo: 40 → 150 empleados en 2 años. Estructura funcional simple que funcionaba con 40 personas generando caos con 150. Producto único → 3 productos diferentes con clientes distintos. Estructura funcional tradicional (Engineering, Product, Sales, Marketing) no funcionaba para múltiples productos.'
                          : 'Explosive growth: 40 → 150 employees in 2 years. Simple functional structure that worked with 40 people generating chaos with 150. Single product → 3 different products with different clients. Traditional functional structure (Engineering, Product, Sales, Marketing) didn\'t work for multiple products.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Problemas Críticos' : 'Critical Problems'}
                      </h4>
                      <ul className="space-y-2 text-foreground/70 text-sm">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Lanzamientos lentos: 12-18 meses por producto nuevo (vs 6-8 meses competencia)' : 'Slow launches: 12-18 months per new product (vs 6-8 months competition)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Silos masivos: Engineering sin hablar con Product, Product sin entender Sales' : 'Massive silos: Engineering not talking with Product, Product not understanding Sales'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Falta de ownership: Nadie "dueño" de resultado de producto específico' : 'Lack of ownership: No one "owner" of specific product result'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Decisiones atrapadas: Todo requiere aprobación CEO (cuello de botella)' : 'Stuck decisions: Everything requires CEO approval (bottleneck)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                          <span>{isEs ? '3 productos compitiendo: Por mismos ingenieros sin priorización clara' : '3 products competing: For same engineers without clear prioritization'}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución Alternative' : 'Alternative Solution'}
                      </h4>
                      <p className="text-foreground/70 mb-3 text-sm">
                        {isEs 
                          ? 'Rediseño organizacional completo en 8 semanas:'
                          : 'Complete organizational redesign in 8 weeks:'}
                      </p>
                      <div className="space-y-3 text-foreground/70 text-sm">
                        <div>
                          <strong className="text-azul-marino dark:text-white">{isEs ? 'Estructura Anterior (Funcional):' : 'Previous Structure (Functional):'}</strong>
                          <p className="mt-1 font-mono text-xs">{isEs ? 'CEO → VP Engineering (80) | VP Product (15) | VP Sales (30) | VP Marketing (15) | CFO+Ops (10)' : 'CEO → VP Engineering (80) | VP Product (15) | VP Sales (30) | VP Marketing (15) | CFO+Ops (10)'}</p>
                          <p className="mt-1">{isEs ? 'Problema: Decisiones de producto requieren coordinación de 4 VPs. Nadie tiene ownership end-to-end de un producto.' : 'Problem: Product decisions require coordination of 4 VPs. No one has end-to-end ownership of a product.'}</p>
                        </div>
                        <div>
                          <strong className="text-azul-marino dark:text-white">{isEs ? 'Nueva Estructura (Divisional por Producto):' : 'New Structure (Divisional by Product):'}</strong>
                          <p className="mt-1 font-mono text-xs">{isEs ? 'CEO → GM Producto A (50) | GM Producto B (40) | GM Producto C (35) | Funciones Corporativas (25)' : 'CEO → GM Product A (50) | GM Product B (40) | GM Product C (35) | Corporate Functions (25)'}</p>
                          <p className="mt-1">{isEs ? 'Cambios: 3 GMs con P&L ownership. Equipos dedicados por producto. Decisiones descentralizadas. Funciones corporativas proveen servicios.' : 'Changes: 3 GMs with P&L ownership. Dedicated teams per product. Decentralized decisions. Corporate functions provide services.'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-azul-marino dark:text-white mb-4">
                      {isEs ? 'Resultados (12 meses post-rediseño)' : 'Results (12 months post-redesign)'}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { value: '6-8', label: isEs ? 'meses Lanzamiento' : 'months Launch', sub: isEs ? '12-18 → 6-8' : '12-18 → 6-8' },
                        { value: '3-5', label: isEs ? 'días Decisiones' : 'days Decisions', sub: isEs ? '3-4 semanas → 3-5 días' : '3-4 weeks → 3-5 days' },
                        { value: '100%', label: isEs ? 'Accountability' : 'Accountability', sub: isEs ? 'Claro dueño por producto' : 'Clear owner per product' },
                        { value: '-70%', label: isEs ? 'Fricción entre áreas' : 'Friction between areas', sub: isEs ? 'Equipos integrados' : 'Integrated teams' },
                        { value: '40%', label: isEs ? 'CEO liberado' : 'CEO freed', sub: isEs ? '60h → 40h/semana' : '60h → 40h/week' },
                        { value: '+60%', label: isEs ? 'ARR' : 'ARR', sub: isEs ? '$20M → $32M' : '$20M → $32M' },
                        { value: '81%', label: isEs ? 'Satisfacción empleados' : 'Employee satisfaction', sub: isEs ? '62% → 81%' : '62% → 81%' }
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
                        <strong className="text-azul-marino dark:text-white">{isEs ? 'Desafíos de Transición:' : 'Transition Challenges:'}</strong>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-turquesa flex-shrink-0 mt-0.5" />
                            <span>{isEs ? 'VPs funcionales inicialmente resistentes (pérdida de "imperio")' : 'Functional VPs initially resistant (loss of "empire")'}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-turquesa flex-shrink-0 mt-0.5" />
                            <span>{isEs ? '3 meses adaptación hasta que modelo funcionó fluidamente' : '3 months adaptation until model worked fluidly'}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-turquesa flex-shrink-0 mt-0.5" />
                            <span>{isEs ? 'Algunos ingenieros preferían funcional (se fueron, ok)' : 'Some engineers preferred functional (they left, ok)'}</span>
                          </li>
                        </ul>
                      </p>
                    </div>

                    <div className="bg-menta/10 p-4 rounded-xl border border-menta/20">
                      <p className="text-sm text-foreground/70">
                        <strong className="text-azul-marino dark:text-white">{isEs ? 'Factor Crítico:' : 'Critical Factor:'}</strong>{' '}
                        {isEs 
                          ? 'Estructura divisional por producto solo funciona cuando productos son suficientemente diferentes y mercado justifica equipos dedicados. Si productos muy similares, funcional es mejor.'
                          : 'Divisional structure by product only works when products are sufficiently different and market justifies dedicated teams. If products very similar, functional is better.'}
                      </p>
                    </div>
                  </div>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                  {isEs 
                    ? '"Estructura funcional nos frenaba. Rediseño por producto nos dio agilidad de startup con recursos de scale-up. Lanzamientos 40% más rápidos cambiaron el juego."'
                    : '"Functional structure was holding us back. Product redesign gave us startup agility with scale-up resources. 40% faster launches changed the game."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— {isEs ? 'CEO' : 'CEO'}</span>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =====================================================
          FAQ SECTION
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Preguntas frecuentes' : 'Frequently Asked Questions'}
            </h2>
          </AnimatedSection>

          <AnimatedSection className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-background rounded-2xl p-8">
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
                {isEs ? '¿Tu estructura organizacional necesita rediseño?' : 'Does your organizational structure need redesign?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Evaluación de 30 minutos. Analizamos estructura actual, identificamos disfunciones y recomendamos si rediseño es apropiado.'
                  : '30-minute evaluation. We analyze current structure, identify dysfunctions and recommend if redesign is appropriate.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Revisión de organigrama actual' : 'Current organizational chart review',
                  isEs ? 'Identificación de disfunciones estructurales' : 'Structural dysfunction identification',
                  isEs ? 'Evaluación de alineación estrategia-estructura' : 'Strategy-structure alignment evaluation',
                  isEs ? 'Recomendación de tipo de estructura apropiado' : 'Appropriate structure type recommendation',
                  isEs ? 'Propuesta de rediseño organizacional' : 'Organizational redesign proposal'
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
                    {isEs ? 'Rediseñar Estructura Organizacional' : 'Redesign Organizational Structure'}
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

'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import { faqs as faqData } from '@/lib/content/faqs/servicios--transformacion-digital--change-management';
import { localizeFaqs } from '@/lib/content/faqs';
import {
  Users,
  ArrowRight,
  ChevronDown,
  RefreshCw,
  MessageSquare,
  BookOpen,
  Award,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Building2,
  Phone,
  Target,
  Shield,
  Sparkles,
  Clock,
  BarChart3,
  XCircle,
  Eye,
  Zap,
  Heart,
  Brain,
  FileText
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

export default function ChangeManagementPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [openPillar, setOpenPillar] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Transformación Digital' : 'Digital Transformation', href: `/${locale}/servicios/transformacion-digital` },
    { label: isEs ? 'Change Management' : 'Change Management', href: null }
  ];

  const forWho = [
    {
      icon: RefreshCw,
      title: isEs ? 'Transformación digital compleja con cambio profundo' : 'Complex digital transformation with deep change',
      description: isEs
        ? 'No solo implementar herramienta; cambiar formas de trabajo, procesos, flujos de decisión. Impacta muchas personas y roles.'
        : 'Not just implementing tool; changing ways of working, processes, decision flows. Impacts many people and roles.',
      color: 'turquesa'
    },
    {
      icon: Users,
      title: isEs ? 'Cultura tradicional resistente a tecnología' : 'Traditional culture resistant to technology',
      description: isEs
        ? 'Organización con cultura conservadora, promedio de edad alto, historia de proyectos fallidos que generaron escepticismo.'
        : 'Organization with conservative culture, high average age, history of failed projects that generated skepticism.',
      color: 'menta'
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'Proyectos previos fracasaron por resistencia humana' : 'Previous projects failed due to human resistance',
      description: isEs
        ? 'Implementaste tecnología antes pero nadie la usó. Sistema quedó subutilizado. Necesitas asegurar que esta vez sea diferente.'
        : 'You implemented technology before but no one used it. System remained underutilized. You need to ensure this time is different.',
      color: 'violeta'
    },
    {
      icon: Building2,
      title: isEs ? 'Cambio afecta a 50+ personas' : 'Change affects 50+ people',
      description: isEs
        ? 'Mientras más personas impactadas, más crítico es change management estructurado. Cambio en 5 personas puede gestionarse informalmente; en 100+ requiere programa formal.'
        : 'The more people impacted, the more critical structured change management is. Change in 5 people can be managed informally; in 100+ requires formal program.',
      color: 'turquesa'
    },
    {
      icon: Target,
      title: isEs ? 'Alta visibilidad ejecutiva del proyecto' : 'High executive visibility of project',
      description: isEs
        ? 'Proyecto estratégico con junta directiva/CEO vigilando. Fracaso no es opción. Change management reduce riesgo de no adopción.'
        : 'Strategic project with board/CEO watching. Failure is not an option. Change management reduces risk of non-adoption.',
      color: 'menta'
    },
    {
      icon: Shield,
      title: isEs ? 'Industrias altamente reguladas o sindicalizadas' : 'Highly regulated or unionized industries',
      description: isEs
        ? 'Banca, salud, manufactura con sindicatos donde cambio enfrenta barreras adicionales: regulación, negociación colectiva, procesos rígidos.'
        : 'Banking, health, manufacturing with unions where change faces additional barriers: regulation, collective bargaining, rigid processes.',
      color: 'violeta'
    }
  ];

  const pillars = [
    {
      number: '1',
      icon: Users,
      title: isEs ? 'Análisis de Stakeholders e Impacto' : 'Stakeholder and Impact Analysis',
      description: isEs
        ? 'Mapeo de todos los stakeholders afectados por el cambio, Análisis de impacto por grupo (alto/medio/bajo), Identificación de influenciadores clave y resistentes, Nivel de poder vs nivel de apoyo (matriz de stakeholders)'
        : 'Mapping of all stakeholders affected by change, Impact analysis by group (high/medium/low), Identification of key influencers and resisters, Level of power vs level of support (stakeholder matrix)',
      deliverable: isEs ? 'Stakeholder map + análisis de impacto por grupo' : 'Stakeholder map + impact analysis by group',
      color: 'turquesa'
    },
    {
      number: '2',
      icon: MessageSquare,
      title: isEs ? 'Estrategia de Comunicación' : 'Communication Strategy',
      description: isEs
        ? 'Desarrollo de narrativa del cambio (por qué, qué, cómo), Plan de comunicaciones multinivel (CEO, gerencia media, operativo), Calendario de comunicaciones (antes, durante, después), Mensajes clave por audiencia, Canales apropiados (town halls, emails, intranet, WhatsApp)'
        : 'Development of change narrative (why, what, how), Multilevel communications plan (CEO, middle management, operational), Communications calendar (before, during, after), Key messages per audience, Appropriate channels (town halls, emails, intranet, WhatsApp)',
      deliverable: isEs ? 'Plan de comunicaciones completo + templates de mensajes' : 'Complete communications plan + message templates',
      color: 'menta'
    },
    {
      number: '3',
      icon: BookOpen,
      title: isEs ? 'Plan de Capacitación' : 'Training Plan',
      description: isEs
        ? 'Análisis de necesidades de capacitación por rol, Diseño de programa de capacitación multinivel, Desarrollo de materiales (manuales, videos, guías rápidas), Capacitación de capacitadores (train-the-trainer), Sesiones hands-on (práctica real con sistemas)'
        : 'Analysis of training needs by role, Multilevel training program design, Material development (manuals, videos, quick guides), Trainer training (train-the-trainer), Hands-on sessions (real practice with systems)',
      deliverable: isEs ? 'Programa de capacitación + materiales + certificación de completado' : 'Training program + materials + completion certification',
      color: 'violeta'
    },
    {
      number: '4',
      icon: Award,
      title: isEs ? 'Red de Champions del Cambio' : 'Change Champions Network',
      description: isEs
        ? 'Identificación de champions por departamento/ubicación, Reclutamiento y capacitación intensiva de champions, Empowerment para ser evangelizadores del cambio, Reuniones periódicas de champions (reporte, soporte)'
        : 'Identification of champions by department/location, Intensive champion recruitment and training, Empowerment to be change evangelizers, Periodic champion meetings (reporting, support)',
      deliverable: isEs ? 'Red de 5-15 champions activos según tamaño' : 'Network of 5-15 active champions according to size',
      color: 'turquesa'
    },
    {
      number: '5',
      icon: AlertTriangle,
      title: isEs ? 'Gestión de Resistencias' : 'Resistance Management',
      description: isEs
        ? 'Identificación proactiva de fuentes de resistencia, Análisis de causas raíz (miedo, falta de info, pérdida de poder), Estrategias diferenciadas por tipo de resistencia, One-on-ones con resistentes clave, Ajustes al proyecto basados en feedback legítimo'
        : 'Proactive identification of resistance sources, Root cause analysis (fear, lack of info, loss of power), Differentiated strategies by resistance type, One-on-ones with key resisters, Project adjustments based on legitimate feedback',
      deliverable: isEs ? 'Plan de gestión de resistencias' : 'Resistance management plan',
      color: 'menta'
    },
    {
      number: '6',
      icon: BarChart3,
      title: isEs ? 'Métricas de Adopción' : 'Adoption Metrics',
      description: isEs
        ? 'Definición de KPIs de adopción (uso de sistema, completitud de tareas), Dashboard de seguimiento de adopción, Encuestas de pulso (satisfacción, confianza), Identificación de grupos rezagados, Intervenciones correctivas según data'
        : 'Definition of adoption KPIs (system use, task completion), Adoption tracking dashboard, Pulse surveys (satisfaction, confidence), Identification of lagging groups, Corrective interventions according to data',
      deliverable: isEs ? 'Dashboard de adopción + reportes semanales' : 'Adoption dashboard + weekly reports',
      color: 'violeta'
    },
    {
      number: '7',
      icon: Sparkles,
      title: isEs ? 'Celebración y Refuerzo' : 'Celebration and Reinforcement',
      description: isEs
        ? 'Identificación y celebración de quick wins tempranos, Reconocimiento público de early adopters y champions, Historias de éxito comunicadas ampliamente, Refuerzo continuo de nuevos comportamientos'
        : 'Identification and celebration of early quick wins, Public recognition of early adopters and champions, Success stories communicated widely, Continuous reinforcement of new behaviors',
      deliverable: isEs ? 'Plan de celebraciones + comunicaciones de wins' : 'Celebration plan + win communications',
      color: 'turquesa'
    }
  ];

  const adkarStages = [
    {
      letter: 'A',
      stage: isEs ? 'AWARENESS (Conciencia)' : 'AWARENESS (Awareness)',
      what: isEs ? 'Persona entiende POR QUÉ cambio es necesario' : 'Person understands WHY change is necessary',
      how: isEs ? 'Comunicación clara de razones de negocio, consecuencias de no cambiar' : 'Clear communication of business reasons, consequences of not changing',
      success: isEs ? 'Persona puede articular por qué cambio es importante' : 'Person can articulate why change is important',
      color: 'turquesa'
    },
    {
      letter: 'D',
      stage: isEs ? 'DESIRE (Deseo)' : 'DESIRE (Desire)',
      what: isEs ? 'Persona QUIERE participar y apoyar el cambio' : 'Person WANTS to participate and support change',
      how: isEs ? 'WIIFM (What\'s In It For Me), abordar preocupaciones, involucrar en diseño' : 'WIIFM (What\'s In It For Me), address concerns, involve in design',
      success: isEs ? 'Persona expresa disposición a cambiar' : 'Person expresses willingness to change',
      color: 'menta'
    },
    {
      letter: 'K',
      stage: isEs ? 'KNOWLEDGE (Conocimiento)' : 'KNOWLEDGE (Knowledge)',
      what: isEs ? 'Persona SABE cómo cambiar' : 'Person KNOWS how to change',
      how: isEs ? 'Capacitación efectiva, materiales de referencia, mentoring' : 'Effective training, reference materials, mentoring',
      success: isEs ? 'Persona puede ejecutar nuevas tareas correctamente' : 'Person can execute new tasks correctly',
      color: 'violeta'
    },
    {
      letter: 'A',
      stage: isEs ? 'ABILITY (Habilidad)' : 'ABILITY (Ability)',
      what: isEs ? 'Persona PUEDE ejecutar cambio en la práctica' : 'Person CAN execute change in practice',
      how: isEs ? 'Práctica hands-on, coaching, soporte durante transición' : 'Hands-on practice, coaching, support during transition',
      success: isEs ? 'Persona ejecuta competentemente sin ayuda' : 'Person executes competently without help',
      color: 'turquesa'
    },
    {
      letter: 'R',
      stage: isEs ? 'REINFORCEMENT (Refuerzo)' : 'REINFORCEMENT (Reinforcement)',
      what: isEs ? 'Cambio se sostiene en el tiempo' : 'Change is sustained over time',
      how: isEs ? 'Reconocimiento, consecuencias de no adoptar, métricas visibles' : 'Recognition, consequences of not adopting, visible metrics',
      success: isEs ? 'Nuevos comportamientos son "el nuevo normal"' : 'New behaviors are "the new normal"',
      color: 'menta'
    }
  ];

  const resistanceTypes = [
    {
      type: isEs ? 'Por falta de información' : 'Due to lack of information',
      cause: isEs ? 'No entienden por qué cambia' : 'They don\'t understand why it changes',
      strategy: isEs ? 'Comunicación clara y frecuente del caso de negocio' : 'Clear and frequent communication of business case',
      icon: MessageSquare,
      color: 'turquesa'
    },
    {
      type: isEs ? 'Por miedo a lo desconocido' : 'Due to fear of unknown',
      cause: isEs ? 'Ansiedad sobre capacidad de adaptarse' : 'Anxiety about ability to adapt',
      strategy: isEs ? 'Capacitación estructurada + soporte intensivo' : 'Structured training + intensive support',
      icon: Heart,
      color: 'menta'
    },
    {
      type: isEs ? 'Por pérdida de control' : 'Due to loss of control',
      cause: isEs ? 'Cambio impuesto sin consultar' : 'Change imposed without consulting',
      strategy: isEs ? 'Involucrar en diseño, pedir feedback, ajustar según input' : 'Involve in design, ask for feedback, adjust according to input',
      icon: Shield,
      color: 'violeta'
    },
    {
      type: isEs ? 'Por pérdida de estatus' : 'Due to loss of status',
      cause: isEs ? 'Nueva tecnología elimina su "expertise" único' : 'New technology eliminates their unique "expertise"',
      strategy: isEs ? 'Reposicionar como experto en nuevo sistema, rol de mentor' : 'Reposition as expert in new system, mentor role',
      icon: Award,
      color: 'turquesa'
    },
    {
      type: isEs ? 'Por carga de trabajo' : 'Due to workload',
      cause: isEs ? 'Ya están saturados, cambio es "más trabajo"' : 'They\'re already saturated, change is "more work"',
      strategy: isEs ? 'Mostrar que cambio REDUCE trabajo a mediano plazo, quick wins' : 'Show that change REDUCES work in medium term, quick wins',
      icon: Clock,
      color: 'menta'
    },
    {
      type: isEs ? 'Por desconfianza' : 'Due to distrust',
      cause: isEs ? 'Proyectos previos fallaron, escepticismo' : 'Previous projects failed, skepticism',
      strategy: isEs ? 'Transparencia total, entregar wins tempranos, cumplir promesas' : 'Total transparency, deliver early wins, keep promises',
      icon: Eye,
      color: 'violeta'
    },
    {
      type: isEs ? 'Por desacuerdo legítimo' : 'Due to legitimate disagreement',
      cause: isEs ? 'Creen que cambio es mala decisión' : 'They believe change is bad decision',
      strategy: isEs ? 'Escuchar genuinamente, ajustar si crítica es válida' : 'Listen genuinely, adjust if criticism is valid',
      icon: Brain,
      color: 'turquesa'
    }
  ];

  const includes = [
    {
      title: isEs ? 'Estrategia y Planificación' : 'Strategy and Planning',
      icon: Target,
      items: isEs
        ? ['Análisis de stakeholders e impacto', 'Estrategia de change management', 'Plan de comunicaciones', 'Plan de capacitación', 'Identificación de riesgos de adopción']
        : ['Stakeholder and impact analysis', 'Change management strategy', 'Communications plan', 'Training plan', 'Adoption risk identification'],
      color: 'turquesa'
    },
    {
      title: isEs ? 'Ejecución' : 'Execution',
      icon: Zap,
      items: isEs
        ? ['Comunicaciones ejecutivas y operativas', 'Capacitación multinivel', 'Reclutamiento y activación de champions', 'Gestión de resistencias', 'Coaching de líderes de cambio']
        : ['Executive and operational communications', 'Multilevel training', 'Champion recruitment and activation', 'Resistance management', 'Change leader coaching'],
      color: 'menta'
    },
    {
      title: isEs ? 'Materiales' : 'Materials',
      icon: FileText,
      items: isEs
        ? ['Templates de comunicaciones', 'Manuales de usuario', 'Videos tutoriales', 'Guías rápidas (cheat sheets)', 'FAQs actualizadas']
        : ['Communication templates', 'User manuals', 'Tutorial videos', 'Quick guides (cheat sheets)', 'Updated FAQs'],
      color: 'violeta'
    },
    {
      title: isEs ? 'Monitoreo' : 'Monitoring',
      icon: BarChart3,
      items: isEs
        ? ['Dashboard de adopción', 'Encuestas de pulso', 'Reportes semanales a steering committee', 'Identificación de grupos rezagados', 'Ajustes basados en métricas']
        : ['Adoption dashboard', 'Pulse surveys', 'Weekly reports to steering committee', 'Identification of lagging groups', 'Adjustments based on metrics'],
      color: 'turquesa'
    }
  ];

  const benefits = [
    { value: '80%+', label: isEs ? 'Adopción de nueva tecnología (vs 30-40% sin change management)' : 'Adoption of new technology (vs 30-40% without change management)', icon: TrendingUp },
    { value: '60%', label: isEs ? 'Reducción en tiempo hasta competencia' : 'Reduction in time to competence', icon: Clock },
    { value: '50%+', label: isEs ? 'Reducción en resistencia activa' : 'Reduction in active resistance', icon: XCircle },
    { value: '85%+', label: isEs ? 'Satisfacción de usuarios post-implementación' : 'User satisfaction post-implementation', icon: Heart },
    { value: '70%', label: isEs ? 'Reducción en llamadas a help desk (capacitación efectiva)' : 'Reduction in help desk calls (effective training)', icon: Phone },
    { value: '90%+', label: isEs ? 'Sostenibilidad del cambio a 12 meses' : 'Change sustainability at 12 months', icon: Shield }
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
        currentService="transformacion-digital"
      />

      {/* =====================================================
          HERO SECTION - Unique Design with Concentric Circles
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        {/* Concentric Circles Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-turquesa/20 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-2 border-menta/20 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-violeta/20 rounded-full"
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
                  <Users className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Change Management' : 'Change Management'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Transformación Digital' : 'Digital Transformation'}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Gestión del cambio que asegura adopción de tecnología'
                  : 'Change management that ensures technology adoption'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Gestión estructurada del cambio organizacional para transformaciones digitales: comunicación estratégica, capacitación efectiva, gestión de resistencias, construcción de cultura digital. Aseguramos que tecnología implementada realmente se use y genere valor.'
                  : 'Structured organizational change management for digital transformations: strategic communication, effective training, resistance management, digital culture building. We ensure implemented technology is actually used and generates value.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Gestiona tu Cambio Organizacional' : 'Manage Your Organizational Change'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/recursos`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Descarga guía de change management' : 'Download change management guide'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '80%+', label: isEs ? 'adopción de nuevas tecnologías' : 'adoption of new technologies' },
                  { value: '✓', label: isEs ? 'Resistencia gestionada efectivamente' : 'Resistance effectively managed' },
                  { icon: true, label: isEs ? 'Cultura digital fortalecida' : 'Strengthened digital culture' }
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

            {/* Right Visual - Team Collaboration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
                >
                  {/* Team Icons */}
                  <div className="flex justify-center items-center gap-4 mb-6">
                    {[Users, MessageSquare, BookOpen, Award].map((Icon, idx) => (
                      <motion.div
                        key={idx}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                        className="w-16 h-16 bg-turquesa/20 rounded-2xl flex items-center justify-center"
                      >
                        <Icon className="w-8 h-8 text-turquesa" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Adoption Metrics */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">{isEs ? 'Adopción Tecnológica' : 'Technology Adoption'}</span>
                      <span className="text-turquesa font-bold">85%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-turquesa to-menta rounded-full"
                      />
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <span className="text-white/60 text-sm">{isEs ? 'Satisfacción Usuarios' : 'User Satisfaction'}</span>
                      <span className="text-menta font-bold">88%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '88%' }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        className="h-full bg-gradient-to-r from-menta to-turquesa rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUÉ ES CHANGE MANAGEMENT SECTION - Texto + Diagrama ADKAR
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs ? 'Change management: el lado humano de la transformación' : 'Change management: the human side of transformation'}
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs 
                    ? 'Change management es la disciplina estructurada de preparar, equipar y apoyar a las personas para adoptar exitosamente cambios organizacionales. En transformación digital, es asegurar que personas realmente usen nueva tecnología, adopten nuevas formas de trabajo y cambien comportamientos necesarios para éxito.'
                    : 'Change management is the structured discipline of preparing, equipping and supporting people to successfully adopt organizational changes. In digital transformation, it\'s ensuring people actually use new technology, adopt new ways of working and change behaviors necessary for success.'}
                </p>
                <p>
                  {isEs 
                    ? 'Un programa de change management robusto incluye: análisis de stakeholders e impacto del cambio, estrategia de comunicación multinivel, plan de capacitación diferenciado por rol, identificación y gestión de resistencias, red de champions del cambio, métricas de adopción, celebración de wins tempranos.'
                    : 'A robust change management program includes: stakeholder and change impact analysis, multilevel communication strategy, role-differentiated training plan, identification and management of resistance, change champions network, adoption metrics, celebration of early wins.'}
                </p>
                <p>
                  {isEs 
                    ? 'Por qué es crítico: 70% de transformaciones digitales fracasan no por tecnología sino por falla en gestión del cambio. Tecnología perfecta que nadie usa no genera valor. Sin change management: resistencia masiva, adopción baja, retorno a formas viejas, inversión desperdiciada.'
                    : 'Why it\'s critical: 70% of digital transformations fail not due to technology but due to failure in change management. Perfect technology that no one uses doesn\'t generate value. Without change management: massive resistance, low adoption, return to old ways, wasted investment.'}
                </p>
              </div>
            </AnimatedSection>

            {/* ADKAR Diagram - Circular */}
            <AnimatedSection delay={0.2}>
              <div className="relative bg-blanco-hueso dark:bg-card rounded-2xl p-8 shadow-brand">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  {/* Circular Background */}
                  <div className="absolute inset-0 rounded-full border-4 border-turquesa/20" />
                  
                  {/* ADKAR Stages in Circle */}
                  {adkarStages.map((stage, idx) => {
                    const angle = (idx * 360) / adkarStages.length - 90; // Start at top
                    const radius = 140;
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    const colors = colorClasses[stage.color as keyof typeof colorClasses];
                    
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="absolute"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <div className={`w-20 h-20 ${colors.bg} rounded-full flex flex-col items-center justify-center border-2 border-turquesa/30`}>
                          <span className="text-2xl font-bold text-azul-marino dark:text-white">{stage.letter}</span>
                          <span className="text-xs text-turquesa font-medium">{idx + 1}</span>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-24 h-24 bg-turquesa/20 rounded-full flex items-center justify-center border-4 border-turquesa">
                      <Users className="w-12 h-12 text-turquesa" />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* =====================================================
          PARA QUIÉN ES SECTION - Grid 2x3 con Emojis/Iconos
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Cuándo change management es crítico?' : 'When is change management critical?'}
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
                               hover:shadow-brand-lg transition-all duration-300 border-2 border-gris-arena/20"
                    style={{ borderColor: item.color === 'turquesa' ? 'rgba(108, 196, 212, 0.3)' : item.color === 'menta' ? 'rgba(203, 230, 177, 0.3)' : 'rgba(122, 105, 224, 0.3)' }}
                  >
                    <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <item.icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-2 text-center">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed text-center">
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
          7 PILARES SECTION - Accordion con Colores
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '7 pilares de gestión del cambio exitosa' : '7 pillars of successful change management'}
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-4">
            {pillars.map((pillar, idx) => {
              const colors = colorClasses[pillar.color as keyof typeof colorClasses];
              const isOpen = openPillar === idx;
              
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  className="bg-blanco-hueso dark:bg-card rounded-2xl border-2 border-gris-arena/20 overflow-hidden"
                  style={{ borderColor: pillar.color === 'turquesa' ? 'rgba(108, 196, 212, 0.3)' : pillar.color === 'menta' ? 'rgba(203, 230, 177, 0.3)' : 'rgba(122, 105, 224, 0.3)' }}
                >
                  <button
                    onClick={() => setOpenPillar(isOpen ? null : idx)}
                    className="w-full p-6 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <span className="text-xl font-bold text-azul-marino dark:text-white">{pillar.number}</span>
                      </div>
                      <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <pillar.icon className={`w-7 h-7 ${colors.text}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-azul-marino dark:text-white group-hover:text-turquesa transition-colors">
                        {pillar.title}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-4"
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
                    <div className="px-6 pb-6 space-y-3">
                      <p className="text-foreground/70 leading-relaxed">
                        {pillar.description}
                      </p>
                      <div className="flex items-start gap-2 pt-2 border-t border-gris-arena/20">
                        <span className={`${colors.badge} font-medium text-sm px-2 py-1 rounded`}>
                          {isEs ? 'Entregable:' : 'Deliverable:'}
                        </span>
                        <span className="text-foreground/60 text-sm">{pillar.deliverable}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          METODOLOGÍA ADKAR - Timeline Circular Detallado
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Metodología ADKAR de change management' : 'ADKAR change management methodology'}
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              {isEs 
                ? 'Usamos modelo ADKAR (Prosci), metodología probada globalmente para gestionar cambio individual y organizacional. ADKAR son 5 etapas que cada persona debe atravesar para adoptar cambio exitosamente.'
                : 'We use ADKAR model (Prosci), globally proven methodology for managing individual and organizational change. ADKAR are 5 stages that each person must go through to successfully adopt change.'}
            </p>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-6">
              {adkarStages.map((stage, idx) => {
                const colors = colorClasses[stage.color as keyof typeof colorClasses];
                return (
                  <AnimatedSection key={idx} delay={idx * 0.1}>
                    <div className="bg-white dark:bg-background p-6 rounded-2xl shadow-brand border-2 border-gris-arena/20 text-center">
                      <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <span className="text-3xl font-bold text-azul-marino dark:text-white">{stage.letter}</span>
                      </div>
                      <h3 className="text-lg font-bold text-azul-marino dark:text-white mb-3">
                        {stage.stage}
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className={`${colors.text} font-semibold mb-1`}>
                            {isEs ? 'Qué:' : 'What:'}
                          </div>
                          <p className="text-foreground/70">{stage.what}</p>
                        </div>
                        <div>
                          <div className={`${colors.text} font-semibold mb-1`}>
                            {isEs ? 'Cómo:' : 'How:'}
                          </div>
                          <p className="text-foreground/70">{stage.how}</p>
                        </div>
                        <div className="bg-blanco-hueso dark:bg-card p-3 rounded-xl">
                          <div className={`${colors.text} font-semibold mb-1 text-xs`}>
                            {isEs ? 'Señal de éxito:' : 'Success signal:'}
                          </div>
                          <p className="text-foreground/70 text-xs">{stage.success}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection className="text-center mt-8">
              <div className="bg-turquesa/10 border border-turquesa/20 rounded-2xl p-6">
                <p className="text-foreground/70">
                  {isEs 
                    ? 'Aplicación: Evaluamos en qué etapa ADKAR está cada grupo de stakeholders y diseñamos intervenciones específicas para moverlos a siguiente etapa.'
                    : 'Application: We evaluate which ADKAR stage each stakeholder group is at and design specific interventions to move them to next stage.'}
                </p>
              </div>
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
                      {isEs ? 'Banco implementa CRM con 85% adopción en 3 meses' : 'Bank implements CRM with 85% adoption in 3 months'}
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
                          ? 'Banco regional (15 sucursales, 200 empleados, 80 ejecutivos de cuenta)'
                          : 'Regional bank (15 branches, 200 employees, 80 account executives)'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Proyecto' : 'Project'}
                      </h4>
                      <p className="text-foreground/70">
                        {isEs 
                          ? 'Implementación de Salesforce CRM para fuerza de ventas. Antes: información de clientes en Excels personales de cada ejecutivo, sin visibilidad gerencial, imposibilidad de colaborar entre sucursales.'
                          : 'Salesforce CRM implementation for sales force. Before: client information in personal Excels of each executive, no management visibility, impossibility of collaboration between branches.'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Desafío de Change Management' : 'Change Management Challenge'}
                      </h4>
                      <ul className="space-y-2 text-foreground/70 text-sm">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Cultura tradicional: Ejecutivos promedio 45 años, 15+ años en banco' : 'Traditional culture: Executives average 45 years, 15+ years at bank'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Resistencia anticipada: "Excel funciona bien para mí hace 10 años"' : 'Anticipated resistance: "Excel works well for me for 10 years"'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Miedo a transparencia: Gerencia vería su pipeline real (bueno y malo)' : 'Fear of transparency: Management would see their real pipeline (good and bad)'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span>{isEs ? 'Historia negativa: Proyecto CRM anterior fracasó hace 5 años (solo 20% adoptaron)' : 'Negative history: Previous CRM project failed 5 years ago (only 20% adopted)'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-azul-marino dark:text-white mb-4">
                      {isEs ? 'Solución Alternative - Timeline de 4 Meses' : 'Alternative Solution - 4 Month Timeline'}
                    </h4>
                    <div className="space-y-4 mb-6">
                      {[
                        { phase: isEs ? 'Pre-Lanzamiento (Mes 1-2)' : 'Pre-Launch (Month 1-2)', items: ['Comunicación desde CEO', 'Stakeholder analysis', 'Champions reclutados', 'WIIFM comunicado'] },
                        { phase: isEs ? 'Lanzamiento (Mes 3)' : 'Launch (Month 3)', items: ['Capacitación diferenciada', 'Buddy system', 'Soporte intensivo'] },
                        { phase: isEs ? 'Post-Lanzamiento (Mes 4)' : 'Post-Launch (Month 4)', items: ['Métricas visibles', 'Quick wins comunicados', 'One-on-ones con resistentes', 'Ajustes al sistema'] }
                      ].map((phase, idx) => (
                        <div key={idx} className="bg-white dark:bg-background p-4 rounded-xl border border-turquesa/20">
                          <div className="font-semibold text-azul-marino dark:text-white mb-2">{phase.phase}</div>
                          <ul className="space-y-1 text-sm text-foreground/70">
                            {phase.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-turquesa rounded-full" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: '85%', label: isEs ? 'Adopción activa' : 'Active adoption', sub: isEs ? 'vs 20% proyecto anterior' : 'vs 20% previous project' },
                        { value: '100%', label: isEs ? 'Datos en CRM' : 'Data in CRM', sub: isEs ? 'vs Excels privados' : 'vs private Excels' },
                        { value: '78%', label: isEs ? 'Satisfacción' : 'Satisfaction', sub: isEs ? 'Ejecutivos satisfechos' : 'Satisfied executives' },
                        { value: '15', label: isEs ? 'Referrals' : 'Referrals', sub: isEs ? 'Entre ejecutivos' : 'Between executives' }
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
                  </div>
                </div>

                <div className="bg-turquesa/10 p-4 rounded-xl border border-turquesa/20 mb-6">
                  <p className="text-sm text-foreground/70">
                    <strong className="text-azul-marino dark:text-white">{isEs ? 'Factor crítico de éxito:' : 'Critical success factor:'}</strong>{' '}
                    {isEs 
                      ? 'Change management no fue "agregado después"; fue diseñado en paralelo con implementación técnica desde día 1.'
                      : 'Change management wasn\'t "added after"; it was designed in parallel with technical implementation from day 1.'}
                  </p>
                </div>

                <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                  {isEs 
                    ? '"Proyecto CRM anterior fracasó porque solo entrenamos técnicamente. Esta vez, Alternative gestionó el lado humano. 85% adopción es prueba que funciona."'
                    : '"Previous CRM project failed because we only trained technically. This time, Alternative managed the human side. 85% adoption is proof it works."'}
                  <span className="block mt-2 text-sm text-turquesa not-italic font-medium">— {isEs ? 'VP Comercial' : 'VP Commercial'}</span>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* =====================================================
          TIPOS DE RESISTENCIA - Tabla Visual
          ===================================================== */}
      <section className="py-20 lg:py-32 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Tipos de resistencia y cómo gestionarlas' : 'Types of resistance and how to manage them'}
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white dark:bg-background rounded-2xl p-8 shadow-brand overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-4 text-foreground/60 font-medium bg-turquesa/10 
                                   border-b-2 border-turquesa/30 rounded-tl-lg">
                      {isEs ? 'Tipo de Resistencia' : 'Resistance Type'}
                    </th>
                    <th className="text-left py-4 px-4 text-foreground/60 font-medium bg-menta/10 
                                   border-b-2 border-menta/30">
                      {isEs ? 'Causa Raíz' : 'Root Cause'}
                    </th>
                    <th className="text-left py-4 px-4 text-foreground/60 font-medium bg-violeta/10 
                                   border-b-2 border-violeta/30 rounded-tr-lg">
                      {isEs ? 'Estrategia de Gestión' : 'Management Strategy'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resistanceTypes.map((row, idx) => {
                    const colors = colorClasses[row.color as keyof typeof colorClasses];
                    return (
                      <tr key={idx} className={`border-b border-gris-arena/20 hover:bg-blanco-hueso/50 
                                                dark:hover:bg-card/50 transition-colors
                                                ${idx % 2 === 0 ? 'bg-white' : 'bg-blanco-hueso/30'}
                                                ${idx === resistanceTypes.length - 1 ? 'border-b-0' : ''}`}>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <row.icon className={`w-5 h-5 ${colors.text}`} />
                            </div>
                            <span className="text-azul-marino dark:text-white font-medium">{row.type}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-foreground/70">
                          {row.cause}
                        </td>
                        <td className="py-4 px-4 text-foreground/70">
                          {row.strategy}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center mt-8">
            <div className="bg-turquesa/10 border border-turquesa/20 rounded-2xl p-6 max-w-3xl mx-auto">
              <p className="text-foreground/70">
                {isEs 
                  ? 'Conclusión: Resistencia no es irracionalidad. Frecuentemente indica problemas reales. Escuchar y abordar causas raíz, no solo "convencer".'
                  : 'Conclusion: Resistance is not irrationality. It frequently indicates real problems. Listen and address root causes, not just "convince".'}
              </p>
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
                {isEs ? '¿Tu transformación necesita gestión del cambio?' : 'Does your transformation need change management?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Evaluación de 30 minutos. Analizamos complejidad del cambio y recomendamos nivel apropiado de change management.'
                  : '30-minute evaluation. We analyze change complexity and recommend appropriate change management level.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Análisis de complejidad del cambio' : 'Analysis of change complexity',
                  isEs ? 'Evaluación de riesgos de adopción' : 'Adoption risk assessment',
                  isEs ? 'Identificación de stakeholders críticos' : 'Identification of critical stakeholders',
                  isEs ? 'Recomendación de programa de change management' : 'Change management program recommendation',
                  isEs ? 'Propuesta de servicios' : 'Service proposal'
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
                    {isEs ? 'Evaluar Necesidad de Change Management' : 'Evaluate Change Management Need'}
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

'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { ServiceSidebar } from '@/components/ui/service-sidebar';
import { faqs as faqData } from '@/lib/content/faqs/servicios--sistemas-calidad--auditoria-calidad';
import { localizeFaqs } from '@/lib/content/faqs';
import {
  ArrowRight,
  ChevronDown,
  Award,
  CheckCircle2,
  Phone,
  Building2,
  Users,
  Target,
  Shield,
  Clock,
  BarChart3,
  FileText,
  Settings,
  Briefcase,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  ClipboardCheck,
  Search,
  AlertTriangle,
  RefreshCw,
  Zap,
  FileCheck,
  Eye,
  CheckSquare,
  XCircle,
  AlertCircle,
  BookOpen,
  UserCheck,
  Building,
  Scale
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

export default function AuditoriaCalidadPage() {
  const locale = useLocale();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Breadcrumb data
  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Servicios' : 'Services', href: `/${locale}/servicios` },
    { label: isEs ? 'Sistemas de Calidad' : 'Quality Systems', href: `/${locale}/servicios/sistemas-calidad` },
    { label: isEs ? 'Auditoría de Calidad' : 'Quality Audit', href: null }
  ];

  // =====================================================
  // CONTENT DATA
  // =====================================================

  // Para Quién Es
  const paraQuienEs = [
    {
      icon: Award,
      title: isEs ? 'Empresa certificada necesita auditorías internas' : 'Certified company needs internal audits',
      description: isEs
        ? 'ISO 9001 requiere auditorías internas anuales. Necesitas auditor independiente que evalúe eficacia del sistema.'
        : 'ISO 9001 requires annual internal audits. You need an independent auditor to evaluate system effectiveness.',
      color: 'turquesa'
    },
    {
      icon: Target,
      title: isEs ? 'Preparación para certificación' : 'Preparation for certification',
      description: isEs
        ? 'Antes de auditoría de certificación, necesitas auditoría interna completa que identifique y corrija no conformidades.'
        : 'Before certification audit, you need a complete internal audit that identifies and corrects non-conformities.',
      color: 'menta'
    },
    {
      icon: Search,
      title: isEs ? 'Diagnóstico de eficacia del sistema' : 'System effectiveness diagnosis',
      description: isEs
        ? 'Tu sistema de calidad existe pero no sabes si funciona bien. Necesitas evaluación objetiva de un auditor experto.'
        : 'Your quality system exists but you don\'t know if it works well. You need objective evaluation from an expert auditor.',
      color: 'violeta'
    },
    {
      icon: AlertTriangle,
      title: isEs ? 'Detectar problemas antes de auditoría externa' : 'Detect problems before external audit',
      description: isEs
        ? 'Auditoría externa próxima y quieres asegurar que no habrá sorpresas. Auditoría interna previa es esencial.'
        : 'External audit coming and you want to ensure no surprises. Prior internal audit is essential.',
      color: 'turquesa'
    },
    {
      icon: RefreshCw,
      title: isEs ? 'Auditoría de seguimiento' : 'Follow-up audit',
      description: isEs
        ? 'Tuviste no conformidades en auditoría anterior. Necesitas verificar que las acciones correctivas fueron efectivas.'
        : 'You had non-conformities in previous audit. You need to verify that corrective actions were effective.',
      color: 'menta'
    },
    {
      icon: Building2,
      title: isEs ? 'Evaluación de proveedores' : 'Supplier evaluation',
      description: isEs
        ? 'Necesitas auditar proveedores críticos para asegurar que cumplen con tus requisitos de calidad.'
        : 'You need to audit critical suppliers to ensure they meet your quality requirements.',
      color: 'violeta'
    }
  ];

  // Tipos de Auditoría
  const tiposAuditoria = [
    {
      icon: FileCheck,
      title: isEs ? 'Auditoría Interna Completa' : 'Complete Internal Audit',
      description: isEs
        ? 'Evaluación exhaustiva de todo el sistema de calidad según ISO 9001:2015. Revisa todas las cláusulas y procesos.'
        : 'Comprehensive evaluation of the entire quality system according to ISO 9001:2015. Reviews all clauses and processes.',
      features: isEs
        ? ['Revisión de todas las cláusulas ISO 9001', 'Evaluación de procesos críticos', 'Reporte detallado de hallazgos', 'Plan de acción correctiva']
        : ['Review of all ISO 9001 clauses', 'Critical process evaluation', 'Detailed findings report', 'Corrective action plan'],
      color: 'turquesa'
    },
    {
      icon: Target,
      title: isEs ? 'Auditoría Enfocada (por proceso)' : 'Focused Audit (by process)',
      description: isEs
        ? 'Auditoría específica de uno o varios procesos críticos. Ideal cuando necesitas evaluación profunda de áreas específicas.'
        : 'Specific audit of one or several critical processes. Ideal when you need deep evaluation of specific areas.',
      features: isEs
        ? ['Enfoque en procesos seleccionados', 'Análisis detallado de eficacia', 'Identificación de mejoras específicas', 'Menor tiempo y costo']
        : ['Focus on selected processes', 'Detailed effectiveness analysis', 'Identification of specific improvements', 'Less time and cost'],
      color: 'menta'
    },
    {
      icon: RefreshCw,
      title: isEs ? 'Auditoría de Seguimiento' : 'Follow-up Audit',
      description: isEs
        ? 'Verificación de que las acciones correctivas implementadas resolvieron las no conformidades identificadas previamente.'
        : 'Verification that implemented corrective actions resolved previously identified non-conformities.',
      features: isEs
        ? ['Verificación de acciones correctivas', 'Validación de cierre de NC', 'Confirmación de mejoras', 'Reporte de seguimiento']
        : ['Verification of corrective actions', 'Validation of NC closure', 'Confirmation of improvements', 'Follow-up report'],
      color: 'violeta'
    }
  ];

  // Metodología de Auditoría - 5 fases
  const metodologia = [
    {
      phase: isEs ? 'Fase 1' : 'Phase 1',
      title: isEs ? 'Planificación' : 'Planning',
      description: isEs
        ? 'Revisión de documentación del sistema de calidad. Definición de alcance, objetivos y criterios de auditoría. Preparación de checklist y plan de auditoría. Coordinación con áreas a auditar.'
        : 'Review of quality system documentation. Definition of scope, objectives and audit criteria. Preparation of checklist and audit plan. Coordination with areas to audit.',
      icon: FileText,
      color: 'turquesa',
      duration: isEs ? '1-2 semanas' : '1-2 weeks'
    },
    {
      phase: isEs ? 'Fase 2' : 'Phase 2',
      title: isEs ? 'Reunión de Apertura' : 'Opening Meeting',
      description: isEs
        ? 'Presentación del equipo auditor y metodología. Confirmación de alcance y cronograma. Establecimiento de canales de comunicación y expectativas.'
        : 'Presentation of audit team and methodology. Confirmation of scope and schedule. Establishment of communication channels and expectations.',
      icon: Users,
      color: 'menta',
      duration: isEs ? '1 día' : '1 day'
    },
    {
      phase: isEs ? 'Fase 3' : 'Phase 3',
      title: isEs ? 'Ejecución' : 'Execution',
      description: isEs
        ? 'Recopilación de evidencia mediante entrevistas, revisión de registros y observación de procesos. Identificación de no conformidades, oportunidades de mejora y buenas prácticas.'
        : 'Evidence collection through interviews, record review and process observation. Identification of non-conformities, improvement opportunities and best practices.',
      icon: Search,
      color: 'violeta',
      duration: isEs ? '3-7 días' : '3-7 days'
    },
    {
      phase: isEs ? 'Fase 4' : 'Phase 4',
      title: isEs ? 'Reunión de Cierre' : 'Closing Meeting',
      description: isEs
        ? 'Presentación de hallazgos preliminares. Discusión de no conformidades identificadas. Confirmación de hechos y oportunidades de mejora.'
        : 'Presentation of preliminary findings. Discussion of identified non-conformities. Confirmation of facts and improvement opportunities.',
      icon: CheckCircle2,
      color: 'turquesa',
      duration: isEs ? '1 día' : '1 day'
    },
    {
      phase: isEs ? 'Fase 5' : 'Phase 5',
      title: isEs ? 'Reporte Final' : 'Final Report',
      description: isEs
        ? 'Elaboración de reporte detallado con hallazgos, no conformidades clasificadas (mayores/menores), oportunidades de mejora y plan de acción recomendado. Entrega y presentación del reporte.'
        : 'Preparation of detailed report with findings, classified non-conformities (major/minor), improvement opportunities and recommended action plan. Delivery and presentation of report.',
      icon: FileCheck,
      color: 'menta',
      duration: isEs ? '3-5 días' : '3-5 days'
    }
  ];

  // Qué Incluye
  const queIncluye = [
    {
      icon: FileText,
      title: isEs ? 'Preparación' : 'Preparation',
      description: isEs
        ? 'Revisión de documentación, definición de alcance, preparación de checklist y plan de auditoría personalizado.'
        : 'Documentation review, scope definition, checklist preparation and customized audit plan.',
      color: 'turquesa'
    },
    {
      icon: Search,
      title: isEs ? 'Ejecución' : 'Execution',
      description: isEs
        ? 'Auditoría en campo con entrevistas, revisión de registros, observación de procesos y recopilación de evidencia objetiva.'
        : 'Field audit with interviews, record review, process observation and objective evidence collection.',
      color: 'menta'
    },
    {
      icon: ClipboardCheck,
      title: isEs ? 'Reporte' : 'Report',
      description: isEs
        ? 'Reporte detallado con hallazgos, no conformidades clasificadas, oportunidades de mejora y recomendaciones accionables.'
        : 'Detailed report with findings, classified non-conformities, improvement opportunities and actionable recommendations.',
      color: 'violeta'
    },
    {
      icon: Target,
      title: isEs ? 'Plan de Acción' : 'Action Plan',
      description: isEs
        ? 'Plan de acción correctiva priorizado con responsables, fechas y seguimiento para cierre de no conformidades.'
        : 'Prioritized corrective action plan with responsible parties, dates and follow-up for non-conformity closure.',
      color: 'turquesa'
    }
  ];

  // Tipos de No Conformidades
  const noConformidades = {
    mayor: {
      title: isEs ? 'No Conformidad Mayor' : 'Major Non-Conformity',
      icon: XCircle,
      color: 'red',
      description: isEs
        ? 'Ausencia o falla total de un requisito del sistema de calidad. Impacto significativo en la capacidad de proporcionar productos/servicios conformes.'
        : 'Absence or total failure of a quality system requirement. Significant impact on ability to provide conforming products/services.',
      ejemplos: isEs
        ? [
            'Ausencia completa de un proceso requerido por ISO 9001',
            'Sistema de gestión documental no implementado',
            'Falta de auditorías internas por más de 2 años',
            'Ausencia de revisión por la dirección',
            'Proceso crítico sin documentación ni controles'
          ]
        : [
            'Complete absence of a process required by ISO 9001',
            'Document management system not implemented',
            'Lack of internal audits for more than 2 years',
            'Absence of management review',
            'Critical process without documentation or controls'
          ]
    },
    menor: {
      title: isEs ? 'No Conformidad Menor' : 'Minor Non-Conformity',
      icon: AlertCircle,
      color: 'orange',
      description: isEs
        ? 'Falla parcial o inconsistencia en el cumplimiento de un requisito. No compromete la capacidad del sistema pero requiere corrección.'
        : 'Partial failure or inconsistency in meeting a requirement. Does not compromise system capability but requires correction.',
      ejemplos: isEs
        ? [
            'Registro incompleto en un proceso documentado',
            'Falta de firma en un documento de control',
            'Versión desactualizada de un procedimiento',
            'Indicador de calidad sin análisis de tendencias',
            'Capacitación registrada pero sin evidencia de efectividad'
          ]
        : [
            'Incomplete record in a documented process',
            'Missing signature on a control document',
            'Outdated version of a procedure',
            'Quality indicator without trend analysis',
            'Training recorded but without evidence of effectiveness'
          ]
    }
  };

  // Beneficios
  const beneficios = [
    {
      stat: '50+',
      label: isEs ? 'auditorías ejecutadas' : 'audits executed',
      description: isEs ? 'Experiencia comprobada en múltiples industrias' : 'Proven experience in multiple industries',
      icon: Award
    },
    {
      stat: '85%+',
      label: isEs ? 'aprobación primera auditoría' : 'first audit approval',
      description: isEs ? 'Empresas preparadas por nosotros' : 'Companies prepared by us',
      icon: CheckCircle2
    },
    {
      stat: '30-50%',
      label: isEs ? 'reducción no conformidades' : 'reduction in non-conformities',
      description: isEs ? 'Después de auditoría y acciones correctivas' : 'After audit and corrective actions',
      icon: TrendingDown
    },
    {
      stat: '100%',
      label: isEs ? 'trazabilidad' : 'traceability',
      description: isEs ? 'De todos los hallazgos y acciones' : 'Of all findings and actions',
      icon: FileCheck
    },
    {
      stat: '2-4',
      label: isEs ? 'semanas' : 'weeks',
      description: isEs ? 'Tiempo típico de auditoría completa' : 'Typical time for complete audit',
      icon: Clock
    },
    {
      stat: 'ISO 9001',
      label: isEs ? 'Lead Auditor' : 'Lead Auditor',
      description: isEs ? 'Auditores certificados' : 'Certified auditors',
      icon: Shield
    }
  ];

  // Caso de Éxito
  const casoExito = {
    industria: isEs ? 'Manufactura' : 'Manufacturing',
    titulo: isEs 
      ? 'Auditoría interna evita 8 no conformidades mayores antes de certificación'
      : 'Internal audit prevents 8 major non-conformities before certification',
    desafio: isEs
      ? 'Empresa manufacturera con 200 empleados necesitaba certificación ISO 9001 para retener cliente clave. Tenían sistema de calidad implementado pero nunca habían tenido auditoría externa. Auditoría de certificación programada en 3 meses.'
      : 'Manufacturing company with 200 employees needed ISO 9001 certification to retain key client. They had quality system implemented but had never had external audit. Certification audit scheduled in 3 months.',
    solucion: isEs
      ? 'Realizamos auditoría interna completa según ISO 9001:2015. Identificamos 8 no conformidades mayores y 12 menores. Desarrollamos plan de acción correctiva priorizado. Acompañamos implementación de correcciones durante 6 semanas.'
      : 'We conducted complete internal audit according to ISO 9001:2015. Identified 8 major and 12 minor non-conformities. Developed prioritized corrective action plan. Accompanied implementation of corrections for 6 weeks.',
    resultados: [
      { value: '0', label: isEs ? 'NC mayores' : 'Major NCs', sub: isEs ? 'en auditoría certificación' : 'in certification audit' },
      { value: '2', label: isEs ? 'NC menores' : 'Minor NCs', sub: isEs ? 'solo observaciones' : 'only observations' },
      { value: '100%', label: isEs ? 'aprobación' : 'approval', sub: isEs ? 'primera auditoría' : 'first audit' },
      { value: '6', label: isEs ? 'semanas' : 'weeks', sub: isEs ? 'hasta certificación' : 'to certification' },
      { value: '$25K', label: isEs ? 'ahorrados' : 'saved', sub: isEs ? 'en retrabajo' : 'in rework' },
      { value: '1', label: isEs ? 'cliente' : 'client', sub: isEs ? 'retenido' : 'retained' }
    ],
    testimonio: isEs
      ? '"La auditoría interna de Alternative fue clave. Identificaron problemas que habrían causado el rechazo en la certificación. Con sus correcciones, aprobamos en la primera auditoría."'
      : '"Alternative\'s internal audit was key. They identified problems that would have caused rejection in certification. With their corrections, we passed on the first audit."',
    autor: isEs ? '— Gerente de Calidad, Empresa Manufacturera' : '— Quality Manager, Manufacturing Company'
  };

  // FAQs
  const faqs = localizeFaqs(faqData, isEs ? 'es' : 'en');

  const colorClasses = {
    turquesa: { bg: 'bg-turquesa/10', text: 'text-turquesa', border: 'border-turquesa/20' },
    menta: { bg: 'bg-menta/10', text: 'text-menta', border: 'border-menta/20' },
    violeta: { bg: 'bg-violeta/10', text: 'text-violeta', border: 'border-violeta/20' }
  };

  return (
    <>
      {/* Reading Progress Indicator */}
      <ReadingProgress />

      {/* Service Sidebar */}
      <ServiceSidebar 
        locale={locale} 
        currentService="sistemas-calidad"
      />

      {/* =====================================================
          HERO SECTION
          ===================================================== */}
      <section className="relative bg-azul-marino overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[10%] w-40 h-40 bg-turquesa/5 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[5%] w-32 h-32 bg-menta/5 rounded-full blur-xl"
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
                  <Search className="w-8 h-8 text-turquesa" />
                </div>
                <div>
                  <span className="text-turquesa text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Auditoría de Calidad' : 'Quality Audit'}
                  </span>
                  <p className="text-white/60 text-sm">
                    {isEs ? 'Sistemas de Calidad' : 'Quality Systems'}
                  </p>
                </div>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-turquesa/10 border border-turquesa/30 
                              rounded-full px-4 py-2 mb-4">
                <Award className="w-4 h-4 text-turquesa" />
                <span className="text-turquesa text-sm font-medium">
                  {isEs ? 'ISO 9001 Lead Auditor Certificados' : 'ISO 9001 Lead Auditor Certified'}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight mb-4">
                {isEs 
                  ? 'Auditoría de calidad que identifica y corrige problemas antes de certificación'
                  : 'Quality audit that identifies and corrects problems before certification'}
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {isEs 
                  ? 'Auditores certificados ISO 9001 Lead Auditor con experiencia en múltiples industrias. Auditorías internas completas, enfocadas o de seguimiento que preparan tu empresa para certificación exitosa.'
                  : 'ISO 9001 Lead Auditor certified auditors with experience in multiple industries. Complete, focused or follow-up internal audits that prepare your company for successful certification.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 bg-turquesa text-azul-marino 
                             font-semibold px-6 py-3 rounded-lg hover:bg-menta 
                             transition-all duration-300 shadow-lg shadow-turquesa/20 group"
                >
                  {isEs ? 'Solicitar Auditoría' : 'Request Audit'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#caso-exito"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             text-white font-medium px-6 py-3 rounded-lg 
                             hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {isEs ? 'Ver caso de éxito' : 'View success story'}
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-white/10">
                {[
                  { value: '50+', label: isEs ? 'auditorías ejecutadas' : 'audits executed' },
                  { value: 'ISO 9001', label: isEs ? 'Lead Auditor certificados' : 'Lead Auditor certified' },
                  { value: '85%+', label: isEs ? 'aprobación primera auditoría' : 'first audit approval' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-turquesa font-bold">{stat.value}</span>
                    <span className="text-white/60 text-sm">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-turquesa/20 rounded-full px-4 py-2 mb-3">
                      <Search className="w-5 h-5 text-turquesa" />
                      <span className="text-turquesa font-semibold">{isEs ? 'Auditoría' : 'Audit'}</span>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {isEs ? 'Tipos de Auditoría' : 'Types of Audit'}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: FileCheck, name: isEs ? 'Auditoría Completa' : 'Complete Audit' },
                      { icon: Target, name: isEs ? 'Auditoría Enfocada' : 'Focused Audit' },
                      { icon: RefreshCw, name: isEs ? 'Auditoría Seguimiento' : 'Follow-up Audit' }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10"
                      >
                        <div className="w-10 h-10 bg-turquesa/20 rounded-lg flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-turquesa" />
                        </div>
                        <span className="text-white font-medium text-sm">
                          {item.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT IS AUDITORÍA SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                               rounded-full text-sm font-medium mb-4">
                {isEs ? '¿Qué es Auditoría de Calidad?' : 'What is Quality Audit?'}
              </span>
              <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-6">
                {isEs 
                  ? 'Evaluación sistemática e independiente de tu sistema de calidad'
                  : 'Systematic and independent evaluation of your quality system'}
              </h2>
              
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  {isEs 
                    ? 'Una auditoría de calidad es una evaluación sistemática, independiente y documentada de tu sistema de gestión de calidad para determinar si las actividades y resultados relacionados cumplen con los requisitos planificados, y si estos requisitos se implementan de manera efectiva y son adecuados para alcanzar los objetivos de calidad.'
                    : 'A quality audit is a systematic, independent and documented evaluation of your quality management system to determine whether related activities and results meet planned requirements, and whether these requirements are effectively implemented and adequate to achieve quality objectives.'}
                </p>
                <p>
                  <strong className="text-azul-marino dark:text-white">
                    {isEs ? 'Tipos de auditoría:' : 'Types of audit:'}
                  </strong>{' '}
                  {isEs 
                    ? 'Auditoría interna (realizada por personal independiente para evaluación y mejora), auditoría de segunda parte (evaluación de proveedores) y auditoría de tercera parte (realizada por organismo certificador para certificación ISO).'
                    : 'Internal audit (performed by independent personnel for evaluation and improvement), second-party audit (supplier evaluation) and third-party audit (performed by certification body for ISO certification).'}
                </p>
                <p>
                  <strong className="text-azul-marino dark:text-white">
                    {isEs ? 'Objetivo principal:' : 'Main objective:'}
                  </strong>{' '}
                  {isEs 
                    ? 'Identificar no conformidades, oportunidades de mejora y verificar la eficacia del sistema de calidad antes de una auditoría externa de certificación, minimizando riesgos y asegurando aprobación en primera auditoría.'
                    : 'Identify non-conformities, improvement opportunities and verify quality system effectiveness before external certification audit, minimizing risks and ensuring first audit approval.'}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* =====================================================
          PARA QUIÉN ES SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Para Quién Es' : 'Who Is It For'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? '¿Cuándo necesitas una auditoría de calidad?' : 'When do you need a quality audit?'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paraQuienEs.map((item, idx) => {
              const colors = colorClasses[item.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-white dark:bg-background p-6 rounded-2xl shadow-brand 
                                hover:shadow-brand-lg transition-all duration-300 h-full
                                border-l-4 ${colors.border.replace('/20', '')}`}
                  >
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl 
                                    flex items-center justify-center mb-4`}>
                      <item.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
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
          TIPOS DE AUDITORÍA SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Tipos de Auditoría' : 'Types of Audit'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Servicios de auditoría que ofrecemos' : 'Audit services we offer'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {tiposAuditoria.map((tipo, idx) => {
              const colors = colorClasses[tipo.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-white dark:bg-card p-6 rounded-2xl shadow-brand 
                                hover:shadow-brand-lg transition-all duration-300 h-full
                                border-t-4 ${colors.border.replace('/20', '')}`}
                  >
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl 
                                    flex items-center justify-center mb-4`}>
                      <tipo.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                      {tipo.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed mb-4">
                      {tipo.description}
                    </p>
                    <ul className="space-y-2">
                      {tipo.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                          <span className="text-foreground/70 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          METODOLOGÍA SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Nuestra Metodología' : 'Our Methodology'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Proceso de auditoría en 5 fases' : '5-phase audit process'}
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-turquesa/20 hidden md:block" />
              
              <div className="space-y-8">
                {metodologia.map((fase, idx) => {
                  const colors = colorClasses[fase.color as keyof typeof colorClasses];
                  return (
                    <AnimatedSection key={idx} delay={idx * 0.1}>
                      <motion.div
                        whileHover={{ x: 10 }}
                        className="flex gap-6 items-start"
                      >
                        {/* Timeline marker */}
                        <div className={`relative z-10 w-16 h-16 ${colors.bg} rounded-2xl 
                                        flex items-center justify-center flex-shrink-0
                                        border-2 ${colors.border}`}>
                          <fase.icon className={`w-8 h-8 ${colors.text}`} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 bg-white dark:bg-background p-6 rounded-2xl shadow-brand">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-sm font-bold ${colors.text}`}>
                              {fase.phase}
                            </span>
                            <span className="text-xl font-semibold text-azul-marino dark:text-white">
                              {fase.title}
                            </span>
                            <span className="text-sm text-foreground/50 ml-auto">
                              {fase.duration}
                            </span>
                          </div>
                          <p className="text-foreground/70 leading-relaxed">
                            {fase.description}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUÉ INCLUYE SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Qué Incluye' : 'What\'s Included'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Servicio completo de auditoría' : 'Complete audit service'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {queIncluye.map((item, idx) => {
              const colors = colorClasses[item.color as keyof typeof colorClasses];
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-white dark:bg-card p-6 rounded-2xl shadow-brand 
                                hover:shadow-brand-lg transition-all duration-300 h-full
                                border-l-4 ${colors.border.replace('/20', '')}`}
                  >
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl 
                                    flex items-center justify-center mb-4`}>
                      <item.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
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
          NO CONFORMIDADES SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa 
                             rounded-full text-sm font-medium mb-4">
              {isEs ? 'Tipos de No Conformidades' : 'Types of Non-Conformities'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white mb-4">
              {isEs ? 'Clasificación de hallazgos' : 'Findings classification'}
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              {isEs
                ? 'Las no conformidades se clasifican según su impacto en la capacidad del sistema de calidad para cumplir con los requisitos.'
                : 'Non-conformities are classified according to their impact on the quality system\'s ability to meet requirements.'}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* No Conformidad Mayor */}
            <AnimatedSection>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-background p-6 rounded-2xl shadow-brand border-2 border-red-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <noConformidades.mayor.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                    {noConformidades.mayor.title}
                  </h3>
                </div>
                <p className="text-foreground/70 mb-4 leading-relaxed">
                  {noConformidades.mayor.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-azul-marino dark:text-white mb-2">
                    {isEs ? 'Ejemplos:' : 'Examples:'}
                  </p>
                  {noConformidades.mayor.ejemplos.map((ejemplo, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70 text-sm">{ejemplo}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>

            {/* No Conformidad Menor */}
            <AnimatedSection delay={0.2}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-background p-6 rounded-2xl shadow-brand border-2 border-orange-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <noConformidades.menor.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-azul-marino dark:text-white">
                    {noConformidades.menor.title}
                  </h3>
                </div>
                <p className="text-foreground/70 mb-4 leading-relaxed">
                  {noConformidades.menor.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-azul-marino dark:text-white mb-2">
                    {isEs ? 'Ejemplos:' : 'Examples:'}
                  </p>
                  {noConformidades.menor.ejemplos.map((ejemplo, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70 text-sm">{ejemplo}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* =====================================================
          BENEFICIOS SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-azul-marino">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              {isEs 
                ? 'Resultados medibles de nuestras auditorías'
                : 'Measurable results from our audits'}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficios.map((benefit, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 
                             hover:bg-white/10 transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-turquesa" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-turquesa mb-1">{benefit.stat}</div>
                  <div className="text-sm text-white/80 font-medium mb-2">{benefit.label}</div>
                  <p className="text-white/60 text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          CASE STUDY SECTION - HIDDEN FOR VALIDATION
          ===================================================== */}
      {false && (
      <section id="caso-exito" className="py-20 lg:py-28 bg-white dark:bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="bg-blanco-hueso dark:bg-card rounded-3xl p-8 lg:p-12 overflow-hidden relative">
              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-turquesa/5 rounded-full blur-3xl" />

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
                      {casoExito.titulo}
                    </h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left - Description */}
                  <div>
                    <div className="mb-6">
                      <p className="text-sm text-foreground/60 mb-2">
                        {casoExito.industria} • {isEs ? '200 empleados' : '200 employees'}
                      </p>
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Desafío' : 'Challenge'}
                      </h4>
                      <p className="text-foreground/70">
                        {casoExito.desafio}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-azul-marino dark:text-white mb-2">
                        {isEs ? 'Solución' : 'Solution'}
                      </h4>
                      <p className="text-foreground/70">
                        {casoExito.solucion}
                      </p>
                    </div>

                    <blockquote className="border-l-4 border-turquesa pl-4 italic text-foreground/70">
                      {casoExito.testimonio}
                      <span className="block mt-2 text-sm text-turquesa not-italic font-medium">{casoExito.autor}</span>
                    </blockquote>
                  </div>

                  {/* Right - Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {casoExito.resultados.map((stat, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white dark:bg-background p-4 rounded-2xl shadow-brand text-center"
                      >
                        <div className="text-2xl font-bold text-turquesa mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm font-medium text-azul-marino dark:text-white">
                          {stat.label}
                        </div>
                        <div className="text-xs text-foreground/50">{stat.sub}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* =====================================================
          FAQ SECTION
          ===================================================== */}
      <section className="py-20 lg:py-28 bg-blanco-hueso dark:bg-card">
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
      <section className="py-20 lg:py-28 bg-violeta relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-turquesa/10 rounded-full blur-2xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                <Search className="w-5 h-5 text-white" />
                <span className="text-white/90 text-sm font-medium">
                  {isEs ? 'Auditores disponibles' : 'Auditors available'}
                </span>
              </div>
              
              <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-6">
                {isEs ? '¿Necesitas una auditoría de calidad?' : 'Do you need a quality audit?'}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isEs 
                  ? 'Cuéntanos sobre tu necesidad. Te asignamos un auditor ISO 9001 Lead Auditor certificado en 48-72 horas con propuesta de trabajo.'
                  : 'Tell us about your need. We assign a certified ISO 9001 Lead Auditor in 48-72 hours with a work proposal.'}
              </p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
                {[
                  isEs ? 'Auditor ISO 9001 Lead Auditor certificado' : 'ISO 9001 Lead Auditor certified',
                  isEs ? 'Auditoría en 2-4 semanas' : 'Audit in 2-4 weeks',
                  isEs ? 'Reporte detallado con plan de acción' : 'Detailed report with action plan',
                  isEs ? 'Acompañamiento en correcciones' : 'Support in corrections'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-menta flex-shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/${locale}/contacto`}
                    className="inline-flex items-center gap-3 bg-white text-violeta 
                               font-semibold px-8 py-4 rounded-lg hover:bg-menta hover:text-azul-marino
                               transition-all duration-300 shadow-lg group"
                  >
                    {isEs ? 'Solicitar Auditoría' : 'Request Audit'}
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

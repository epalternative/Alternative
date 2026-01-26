'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Settings,
  Award,
  FolderKanban,
  Cpu,
  Target,
  Code,
  RefreshCw,
  Zap,
  PenTool,
  Bot,
  FileCheck,
  Search,
  Award as AwardIcon,
  Settings as SettingsIcon,
  ClipboardList,
  Calendar,
  GraduationCap,
  Handshake,
  ChevronLeft,
  PanelRightClose,
  PanelRightOpen
} from 'lucide-react';

// Service structure mapping
const serviceStructure = {
  'optimizacion-procesos': {
    title: { es: 'Optimización de Procesos', en: 'Process Optimization' },
    icon: Settings,
    color: 'turquesa',
    subServices: [
      { 
        title: { es: 'BPM Empresarial', en: 'Business BPM' },
        href: 'bpm-empresarial',
        icon: RefreshCw
      },
      { 
        title: { es: 'Lean Six Sigma', en: 'Lean Six Sigma' },
        href: 'lean-six-sigma',
        icon: Zap
      },
      { 
        title: { es: 'Diseño de Procesos', en: 'Process Design' },
        href: 'diseno-procesos',
        icon: PenTool
      },
      { 
        title: { es: 'Automatización', en: 'Automation' },
        href: 'automatizacion-procesos',
        icon: Bot
      }
    ],
    related: ['sistemas-calidad', 'gestion-proyectos']
  },
  'sistemas-calidad': {
    title: { es: 'Sistemas de Calidad', en: 'Quality Systems' },
    icon: Award,
    color: 'menta',
    subServices: [
      { 
        title: { es: 'Implementación ISO 9001', en: 'ISO 9001 Implementation' },
        href: 'implementacion-iso-9001',
        icon: FileCheck
      },
      { 
        title: { es: 'Auditoría de Calidad', en: 'Quality Audit' },
        href: 'auditoria-calidad',
        icon: Search
      },
      { 
        title: { es: 'Certificación ISO', en: 'ISO Certification' },
        href: 'certificacion-iso',
        icon: AwardIcon
      },
      { 
        title: { es: 'Gestión de Calidad', en: 'Quality Management' },
        href: 'gestion-calidad',
        icon: SettingsIcon
      }
    ],
    related: ['optimizacion-procesos', 'gestion-proyectos']
  },
  'gestion-proyectos': {
    title: { es: 'Gestión de Proyectos', en: 'Project Management' },
    icon: FolderKanban,
    color: 'violeta',
    subServices: [
      { 
        title: { es: 'PMP Project Management', en: 'PMP Project Management' },
        href: 'pmp-project-management',
        icon: ClipboardList
      },
      { 
        title: { es: 'Metodologías Ágiles', en: 'Agile Methodologies' },
        href: 'metodologias-agiles',
        icon: Zap
      },
      { 
        title: { es: 'PMO Office', en: 'PMO Office' },
        href: 'pmo-office',
        icon: Calendar
      },
      { 
        title: { es: 'Casos de Negocio', en: 'Business Cases' },
        href: 'casos-negocio',
        icon: Handshake
      }
    ],
    related: ['optimizacion-procesos', 'consultoria-estrategica']
  },
  'transformacion-digital': {
    title: { es: 'Transformación Digital', en: 'Digital Transformation' },
    icon: Cpu,
    color: 'turquesa',
    subServices: [],
    related: ['desarrollo-tecnologia', 'optimizacion-procesos']
  },
  'consultoria-estrategica': {
    title: { es: 'Consultoría Estratégica', en: 'Strategic Consulting' },
    icon: Target,
    color: 'menta',
    subServices: [],
    related: ['gestion-proyectos', 'optimizacion-procesos']
  },
  'desarrollo-tecnologia': {
    title: { es: 'Desarrollo & Tecnología', en: 'Development & Technology' },
    icon: Code,
    color: 'violeta',
    subServices: [],
    related: ['transformacion-digital', 'optimizacion-procesos']
  }
};

const allServices = [
  { slug: 'optimizacion-procesos', title: { es: 'Optimización de Procesos', en: 'Process Optimization' }, icon: Settings, color: 'turquesa' },
  { slug: 'sistemas-calidad', title: { es: 'Sistemas de Calidad', en: 'Quality Systems' }, icon: Award, color: 'menta' },
  { slug: 'gestion-proyectos', title: { es: 'Gestión de Proyectos', en: 'Project Management' }, icon: FolderKanban, color: 'violeta' },
  { slug: 'transformacion-digital', title: { es: 'Transformación Digital', en: 'Digital Transformation' }, icon: Cpu, color: 'turquesa' },
  { slug: 'consultoria-estrategica', title: { es: 'Consultoría Estratégica', en: 'Strategic Consulting' }, icon: Target, color: 'menta' },
  { slug: 'desarrollo-tecnologia', title: { es: 'Desarrollo & Tecnología', en: 'Development & Technology' }, icon: Code, color: 'violeta' }
];

interface ServiceSidebarProps {
  locale: string;
  currentService?: string;
  currentSubService?: string;
}

export function ServiceSidebar({ locale, currentService, currentSubService }: ServiceSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const isEs = locale === 'es';

  // Detect screen size and scroll position
  useEffect(() => {
    const checkScreenSize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      // On desktop, always show sidebar after initial load
      if (desktop) {
        setIsSticky(true);
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // On desktop, show sidebar after scrolling 200px
      // On mobile, only show when isOpen is true
      if (window.innerWidth >= 1024) {
        setIsSticky(scrollPosition > 200);
      }
    };

    checkScreenSize();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkScreenSize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Auto-detect current service from pathname if not provided
  useEffect(() => {
    if (!currentService && pathname) {
      const pathParts = pathname.split('/').filter(Boolean);
      const serviciosIndex = pathParts.indexOf('servicios');
      if (serviciosIndex !== -1 && pathParts[serviciosIndex + 1]) {
        const detectedService = pathParts[serviciosIndex + 1];
        if (serviceStructure[detectedService as keyof typeof serviceStructure]) {
          // currentService will be set via props, but we can use pathname as fallback
        }
      }
    }
  }, [pathname, currentService]);

  const serviceKey = currentService as keyof typeof serviceStructure;
  const service = serviceKey ? serviceStructure[serviceKey] : null;

  if (!service) return null;

  const colorClasses = {
    turquesa: {
      bg: 'bg-turquesa/10',
      text: 'text-turquesa',
      border: 'border-turquesa/20',
      hover: 'hover:bg-turquesa/20',
      active: 'bg-turquesa/20 border-turquesa/30'
    },
    menta: {
      bg: 'bg-menta/10',
      text: 'text-menta',
      border: 'border-menta/20',
      hover: 'hover:bg-menta/20',
      active: 'bg-menta/20 border-menta/30'
    },
    violeta: {
      bg: 'bg-violeta/10',
      text: 'text-violeta',
      border: 'border-violeta/20',
      hover: 'hover:bg-violeta/20',
      active: 'bg-violeta/20 border-violeta/30'
    }
  };

  const colors = colorClasses[service.color as keyof typeof colorClasses];

  // Get related services
  const relatedServices = service.related
    .map(slug => allServices.find(s => s.slug === slug))
    .filter(Boolean) as typeof allServices;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full ${colors.bg} ${colors.border} border-2 shadow-lg flex items-center justify-center ${colors.text} transition-all duration-300`}
        aria-label={isEs ? 'Abrir menú de servicios' : 'Open services menu'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Minimized Button (when sidebar is minimized) */}
      <AnimatePresence>
        {isMinimized && isSticky && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={() => setIsMinimized(false)}
            className={`
              fixed left-4 top-1/2 -translate-y-1/2 z-30
              w-12 h-12 rounded-full
              backdrop-blur-xl bg-white/80 dark:bg-azul-marino/80
              border border-gris-arena/30 shadow-lg
              flex items-center justify-center
              ${colors.text}
              transition-all duration-300
              hover:scale-110 hover:shadow-xl
              ${colors.bg.replace('/10', '/20')}
            `}
            aria-label={isEs ? 'Expandir panel' : 'Expand panel'}
          >
            <PanelRightOpen className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || (isSticky && !isMinimized)) && (
          <motion.aside
            initial={false}
            animate={{ 
              x: 0, 
              opacity: 1
            }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`
              fixed top-0 left-0 
              h-screen lg:h-[calc(100vh-6rem)] lg:top-24
              w-72
              backdrop-blur-xl bg-white/70 dark:bg-azul-marino/70
              border-r border-gris-arena/30
              shadow-xl
              z-30 lg:z-20
              overflow-y-auto
              ${isSticky && !isMinimized ? 'lg:block' : 'lg:hidden'}
              ${isOpen ? 'block' : 'hidden'}
            `}
          >
            <div className="p-6 space-y-8">
              {/* Header with minimize button for desktop */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-azul-marino dark:text-white lg:block hidden">
                  {isEs ? 'Navegación' : 'Navigation'}
                </h3>
                <div className="flex items-center gap-2">
                  {/* Minimize button for desktop */}
                  <button
                    onClick={() => setIsMinimized(true)}
                    className={`hidden lg:flex items-center justify-center w-8 h-8 rounded-lg ${colors.bg} ${colors.text} ${colors.hover} transition-all duration-300 hover:scale-110 hover:shadow-md`}
                    aria-label={isEs ? 'Minimizar panel' : 'Minimize panel'}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {/* Close button for mobile */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`lg:hidden ${colors.text} hover:opacity-70 transition-opacity`}
                    aria-label={isEs ? 'Cerrar menú' : 'Close menu'}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Current Service Link */}
              {currentService && (
                <div>
                  <Link
                    href={`/${locale}/servicios/${currentService}`}
                    className={`flex items-center gap-3 p-4 rounded-xl backdrop-blur-sm ${colors.bg} ${colors.border} border transition-all duration-300 group hover:shadow-lg`}
                  >
                    <service.icon className={`w-5 h-5 ${colors.text}`} />
                    <span className={`font-semibold ${colors.text} group-hover:translate-x-1 transition-transform`}>
                      {service.title[isEs ? 'es' : 'en']}
                    </span>
                  </Link>
                </div>
              )}

              {/* Sub Services */}
              {service.subServices && service.subServices.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-azul-marino/60 dark:text-white/60 uppercase tracking-wider mb-4">
                    {isEs ? 'Subservicios' : 'Sub-services'}
                  </h4>
                  <nav className="space-y-2">
                    {service.subServices.map((sub, idx) => {
                      const isActive = currentSubService === sub.href;
                      const SubIcon = sub.icon;
                      
                      return (
                        <Link
                          key={idx}
                          href={`/${locale}/servicios/${currentService}/${sub.href}`}
                          className={`
                            flex items-center gap-3 p-3 rounded-lg
                            backdrop-blur-sm
                            transition-all duration-300 group
                            ${isActive 
                              ? `${colors.active} ${colors.border} border shadow-md` 
                              : `${colors.hover} ${colors.bg} hover:shadow-md`
                            }
                          `}
                          onClick={() => setIsOpen(false)}
                        >
                          <SubIcon className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                          <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'} text-azul-marino dark:text-white group-hover:translate-x-1 transition-transform`}>
                            {sub.title[isEs ? 'es' : 'en']}
                          </span>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`w-2 h-2 rounded-full ${colors.bg.replace('/10', '')}`}
                            />
                          )}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-azul-marino/60 dark:text-white/60 uppercase tracking-wider mb-4">
                    {isEs ? 'Servicios Relacionados' : 'Related Services'}
                  </h4>
                  <div className="space-y-2">
                    {relatedServices.map((related, idx) => {
                      const RelatedIcon = related.icon;
                      const relatedColors = colorClasses[related.color as keyof typeof colorClasses];
                      
                      return (
                        <Link
                          key={idx}
                          href={`/${locale}/servicios/${related.slug}`}
                          className={`
                            flex items-center gap-3 p-3 rounded-lg
                            backdrop-blur-sm
                            ${relatedColors.bg} ${relatedColors.hover}
                            transition-all duration-300 group
                            hover:shadow-md
                          `}
                          onClick={() => setIsOpen(false)}
                        >
                          <RelatedIcon className={`w-4 h-4 ${relatedColors.text} flex-shrink-0`} />
                          <span className="text-sm font-medium text-azul-marino dark:text-white group-hover:translate-x-1 transition-transform">
                            {related.title[isEs ? 'es' : 'en']}
                          </span>
                          <ArrowRight className={`w-4 h-4 ${relatedColors.text} opacity-0 group-hover:opacity-100 transition-opacity ml-auto`} />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* All Services Link */}
              <div className="pt-4 border-t border-gris-arena/30">
                <Link
                  href={`/${locale}/servicios`}
                  className="flex items-center gap-2 text-sm font-medium text-azul-marino/80 dark:text-white/80 hover:text-turquesa transition-colors group backdrop-blur-sm p-2 rounded-lg hover:bg-white/20 dark:hover:bg-azul-marino/20"
                  onClick={() => setIsOpen(false)}
                >
                  <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  {isEs ? 'Ver todos los servicios' : 'View all services'}
                </Link>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-20"
          />
        )}
      </AnimatePresence>
    </>
  );
}

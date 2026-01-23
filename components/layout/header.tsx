'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  ChevronRight,
  Settings,
  Award,
  FolderKanban,
  Cpu,
  Target,
  Code,
  Globe,
  ArrowRight,
  Building2,
  BookOpen,
  Users,
  FileText,
  Briefcase,
  Sparkles,
  Landmark,
  Factory,
  ShoppingCart,
  Monitor,
  UserCog,
  Building,
  HeartPulse,
  Zap
} from 'lucide-react';

// Mega menu service categories - all 6 categories with their sub-services
const serviceColumns = [
  {
    title: 'OPTIMIZACIÓN DE PROCESOS',
    titleEn: 'PROCESS OPTIMIZATION',
    href: '/servicios/optimizacion-procesos',
    items: [
      { label: 'BPM Empresarial', labelEn: 'Business BPM', desc: 'Business Process Management', descEn: 'Business Process Management', href: '/servicios/optimizacion-procesos/bpm-empresarial' },
      { label: 'Lean Six Sigma', labelEn: 'Lean Six Sigma', desc: 'Reducción de desperdicio', descEn: 'Waste reduction', href: '/servicios/optimizacion-procesos/lean-six-sigma' },
      { label: 'Diseño de Procesos', labelEn: 'Process Design', desc: 'As-Is / To-Be', descEn: 'As-Is / To-Be', href: '/servicios/optimizacion-procesos/diseno-procesos' },
      { label: 'Automatización', labelEn: 'Automation', desc: 'RPA / Workflows', descEn: 'RPA / Workflows', href: '/servicios/optimizacion-procesos/automatizacion-procesos' },
    ],
  },
  {
    title: 'SISTEMAS DE CALIDAD',
    titleEn: 'QUALITY SYSTEMS',
    href: '/servicios/sistemas-calidad',
    items: [
      { label: 'ISO 9001', labelEn: 'ISO 9001', desc: 'Implementación', descEn: 'Implementation', href: '/servicios/sistemas-calidad/implementacion-iso-9001' },
      { label: 'Auditoría de Calidad', labelEn: 'Quality Audit', desc: 'Evaluación integral', descEn: 'Comprehensive evaluation', href: '/servicios/sistemas-calidad/auditoria-calidad' },
      { label: 'Certificación ISO', labelEn: 'ISO Certification', desc: 'Acompañamiento completo', descEn: 'Full support', href: '/servicios/sistemas-calidad/certificacion-iso' },
      { label: 'Gestión de Calidad', labelEn: 'Quality Management', desc: 'Mejora continua', descEn: 'Continuous improvement', href: '/servicios/sistemas-calidad/gestion-calidad' },
    ],
  },
  {
    title: 'GESTIÓN DE PROYECTOS',
    titleEn: 'PROJECT MANAGEMENT',
    href: '/servicios/gestion-proyectos',
    items: [
      { label: 'PMP®', labelEn: 'PMP®', desc: 'Project Management', descEn: 'Project Management', href: '/servicios/gestion-proyectos/pmp-project-management' },
      { label: 'Metodologías Ágiles', labelEn: 'Agile Methodologies', desc: 'Scrum / Kanban', descEn: 'Scrum / Kanban', href: '/servicios/gestion-proyectos/metodologias-agiles' },
      { label: 'PMO Office', labelEn: 'PMO Office', desc: 'Gobernanza y control', descEn: 'Governance & control', href: '/servicios/gestion-proyectos/pmo-office' },
      { label: 'Casos de Negocio', labelEn: 'Business Cases', desc: 'Análisis y viabilidad', descEn: 'Analysis & feasibility', href: '/servicios/gestion-proyectos/casos-negocio' },
    ],
  },
  {
    title: 'TRANSFORMACIÓN DIGITAL',
    titleEn: 'DIGITAL TRANSFORMATION',
    href: '/servicios/transformacion-digital',
    items: [
      { label: 'Estrategia Digital', labelEn: 'Digital Strategy', desc: 'Roadmap tecnológico', descEn: 'Technology roadmap', href: '/servicios/transformacion-digital/estrategia-digital' },
      { label: 'Automatización Inteligente', labelEn: 'Intelligent Automation', desc: 'IA y Machine Learning', descEn: 'AI & Machine Learning', href: '/servicios/transformacion-digital/automatizacion-inteligente' },
      { label: 'Desarrollo de Software', labelEn: 'Software Development', desc: 'Soluciones a medida', descEn: 'Custom solutions', href: '/servicios/transformacion-digital/desarrollo-software' },
      { label: 'Infraestructura IT', labelEn: 'IT Infrastructure', desc: 'Cloud y servidores', descEn: 'Cloud & servers', href: '/servicios/transformacion-digital/infraestructura-it' },
    ],
  },
  {
    title: 'CONSULTORÍA ESTRATÉGICA',
    titleEn: 'STRATEGIC CONSULTING',
    href: '/servicios/consultoria-estrategica',
    items: [
      { label: 'Diagnóstico Organizacional', labelEn: 'Organizational Diagnosis', desc: 'Análisis 360°', descEn: '360° analysis', href: '/servicios/consultoria-estrategica/diagnostico-organizacional' },
      { label: 'Estudios de Viabilidad', labelEn: 'Feasibility Studies', desc: 'ROI y factibilidad', descEn: 'ROI & feasibility', href: '/servicios/consultoria-estrategica/estudios-viabilidad' },
      { label: 'Desarrollo de RFP', labelEn: 'RFP Development', desc: 'Licitaciones', descEn: 'Tenders', href: '/servicios/consultoria-estrategica/desarrollo-rfp' },
    ],
  },
  {
    title: 'DESARROLLO TECNOLOGÍA',
    titleEn: 'TECHNOLOGY DEVELOPMENT',
    href: '/servicios/desarrollo-tecnologia',
    items: [
      { label: 'Aplicaciones a Medida', labelEn: 'Custom Applications', desc: 'Software personalizado', descEn: 'Custom software', href: '/servicios/desarrollo-tecnologia/aplicaciones-medida' },
      { label: 'Portales Corporativos', labelEn: 'Corporate Portals', desc: 'Intranets y extranets', descEn: 'Intranets & extranets', href: '/servicios/desarrollo-tecnologia/portales-corporativos' },
      { label: 'Integraciones API', labelEn: 'API Integrations', desc: 'Conectividad de sistemas', descEn: 'System connectivity', href: '/servicios/desarrollo-tecnologia/integraciones-api' },
      { label: 'Soporte Infraestructura', labelEn: 'Infrastructure Support', desc: 'Mantenimiento IT', descEn: 'IT maintenance', href: '/servicios/desarrollo-tecnologia/soporte-infraestructura' },
    ],
  },
];

// Industries data for mega menu
const industryItems = [
  { 
    label: 'Banca & Servicios Financieros', 
    labelEn: 'Banking & Financial Services',
    desc: 'SBP, cumplimiento, operaciones',
    descEn: 'SBP, compliance, operations',
    href: '/industrias/banca-servicios-financieros',
    icon: Landmark
  },
  { 
    label: 'Manufactura & Logística', 
    labelEn: 'Manufacturing & Logistics',
    desc: 'costos, tiempos, calidad',
    descEn: 'costs, time, quality',
    href: '/industrias/manufactura-logistica',
    icon: Factory
  },
  { 
    label: 'Retail & Comercio', 
    labelEn: 'Retail & Commerce',
    desc: 'experiencia, inventario',
    descEn: 'experience, inventory',
    href: '/industrias/retail-comercio',
    icon: ShoppingCart
  },
  { 
    label: 'Tecnología & Telecom', 
    labelEn: 'Technology & Telecom',
    desc: 'escala, delivery, SLAs',
    descEn: 'scale, delivery, SLAs',
    href: '/industrias/tecnologia-telecomunicaciones',
    icon: Monitor
  },
  { 
    label: 'Servicios Profesionales', 
    labelEn: 'Professional Services',
    desc: 'operación, productividad',
    descEn: 'operation, productivity',
    href: '/industrias/servicios-profesionales',
    icon: UserCog
  },
  { 
    label: 'Gobierno & Sector Público', 
    labelEn: 'Government & Public Sector',
    desc: 'trámites, eficiencia',
    descEn: 'procedures, efficiency',
    href: '/industrias/gobierno-sector-publico',
    icon: Building
  },
  { 
    label: 'Salud & Farmacéutica', 
    labelEn: 'Healthcare & Pharma',
    desc: 'trazabilidad, calidad',
    descEn: 'traceability, quality',
    href: '/industrias/salud-farmaceutica',
    icon: HeartPulse
  },
  { 
    label: 'Energía & Utilities', 
    labelEn: 'Energy & Utilities',
    desc: 'operación, continuidad',
    descEn: 'operation, continuity',
    href: '/industrias/energia-utilities',
    icon: Zap
  },
];

// Keep original categories for mobile and other uses
const serviceCategories = [
  {
    title: 'Optimización de Procesos',
    titleEn: 'Process Optimization',
    href: '/servicios/optimizacion-procesos',
    icon: Settings,
    items: [
      { label: 'BPM empresarial', labelEn: 'Business BPM', href: '/servicios/optimizacion-procesos/bpm-empresarial' },
      { label: 'Lean Six Sigma', labelEn: 'Lean Six Sigma', href: '/servicios/optimizacion-procesos/lean-six-sigma' },
      { label: 'Diseño de procesos', labelEn: 'Process Design', href: '/servicios/optimizacion-procesos/diseno-procesos' },
      { label: 'Automatización', labelEn: 'Automation', href: '/servicios/optimizacion-procesos/automatizacion-procesos' },
    ],
  },
  {
    title: 'Sistemas de Calidad',
    titleEn: 'Quality Systems',
    href: '/servicios/sistemas-calidad',
    icon: Award,
    items: [
      { label: 'Implementación ISO 9001', labelEn: 'ISO 9001 Implementation', href: '/servicios/sistemas-calidad/implementacion-iso-9001' },
      { label: 'Auditoría de calidad', labelEn: 'Quality Audit', href: '/servicios/sistemas-calidad/auditoria-calidad' },
      { label: 'Certificación ISO', labelEn: 'ISO Certification', href: '/servicios/sistemas-calidad/certificacion-iso' },
      { label: 'Gestión de calidad', labelEn: 'Quality Management', href: '/servicios/sistemas-calidad/gestion-calidad' },
    ],
  },
  {
    title: 'Gestión de Proyectos',
    titleEn: 'Project Management',
    href: '/servicios/gestion-proyectos',
    icon: FolderKanban,
    items: [
      { label: 'PMP® Project Management', labelEn: 'PMP® Project Management', href: '/servicios/gestion-proyectos/pmp-project-management' },
      { label: 'Metodologías Ágiles', labelEn: 'Agile Methodologies', href: '/servicios/gestion-proyectos/metodologias-agiles' },
      { label: 'PMO Office', labelEn: 'PMO Office', href: '/servicios/gestion-proyectos/pmo-office' },
      { label: 'Casos de negocio', labelEn: 'Business Cases', href: '/servicios/gestion-proyectos/casos-negocio' },
    ],
  },
  {
    title: 'Transformación Digital',
    titleEn: 'Digital Transformation',
    href: '/servicios/transformacion-digital',
    icon: Cpu,
    items: [
      { label: 'Estrategia digital', labelEn: 'Digital Strategy', href: '/servicios/transformacion-digital/estrategia-digital' },
      { label: 'Automatización inteligente', labelEn: 'Intelligent Automation', href: '/servicios/transformacion-digital/automatizacion-inteligente' },
      { label: 'Desarrollo de software', labelEn: 'Software Development', href: '/servicios/transformacion-digital/desarrollo-software' },
      { label: 'Infraestructura IT', labelEn: 'IT Infrastructure', href: '/servicios/transformacion-digital/infraestructura-it' },
    ],
  },
  {
    title: 'Consultoría Estratégica',
    titleEn: 'Strategic Consulting',
    href: '/servicios/consultoria-estrategica',
    icon: Target,
    items: [
      { label: 'Diagnóstico organizacional', labelEn: 'Organizational Diagnosis', href: '/servicios/consultoria-estrategica/diagnostico-organizacional' },
      { label: 'Estudios de viabilidad', labelEn: 'Feasibility Studies', href: '/servicios/consultoria-estrategica/estudios-viabilidad' },
      { label: 'Desarrollo de RFP', labelEn: 'RFP Development', href: '/servicios/consultoria-estrategica/desarrollo-rfp' },
    ],
  },
  {
    title: 'Desarrollo Tecnología',
    titleEn: 'Technology Development',
    href: '/servicios/desarrollo-tecnologia',
    icon: Code,
    items: [
      { label: 'Aplicaciones a medida', labelEn: 'Custom Applications', href: '/servicios/desarrollo-tecnologia/aplicaciones-medida' },
      { label: 'Portales corporativos', labelEn: 'Corporate Portals', href: '/servicios/desarrollo-tecnologia/portales-corporativos' },
      { label: 'Integraciones API', labelEn: 'API Integrations', href: '/servicios/desarrollo-tecnologia/integraciones-api' },
      { label: 'Soporte infraestructura', labelEn: 'Infrastructure Support', href: '/servicios/desarrollo-tecnologia/soporte-infraestructura' },
    ],
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: language === 'es' ? 'Inicio' : 'Home' },
    { href: '#services', label: language === 'es' ? 'Servicios' : 'Services', hasDropdown: 'services' },
    { href: '/industrias', label: language === 'es' ? 'Industrias' : 'Industries', hasDropdown: 'industries' },
    { href: '/casos-exito', label: language === 'es' ? 'Casos de Éxito' : 'Success Stories', icon: Briefcase },
    { href: '/recursos', label: language === 'es' ? 'Recursos' : 'Resources', icon: BookOpen },
    { href: '/nosotros', label: language === 'es' ? 'Nosotros' : 'About Us', icon: Users },
    { href: '/blog', label: language === 'es' ? 'Blog' : 'Blog', icon: FileText },
  ];

  if (!mounted) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-azul-marino/95 backdrop-blur-md shadow-brand-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                <Image
                  src="/logo_3.jpeg"
                  alt="Alternative Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className={`font-semibold text-xl hidden sm:block transition-colors ${
                isScrolled ? 'text-azul-marino dark:text-white' : 'text-azul-marino dark:text-white'
              }`}>
                Alternative
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                link.hasDropdown ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => {
                      if (link.hasDropdown === 'services') setIsServicesOpen(true);
                      if (link.hasDropdown === 'industries') setIsIndustriesOpen(true);
                    }}
                    onMouseLeave={() => {
                      if (link.hasDropdown === 'services') setIsServicesOpen(false);
                      if (link.hasDropdown === 'industries') setIsIndustriesOpen(false);
                    }}
                  >
                    <button
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all ${
                        isScrolled
                          ? 'text-foreground/70 hover:text-azul-marino dark:hover:text-turquesa hover:bg-beige/50 dark:hover:bg-white/10'
                          : 'text-azul-marino/80 dark:text-white/80 hover:text-azul-marino dark:hover:text-white hover:bg-azul-marino/5 dark:hover:bg-white/10'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        (link.hasDropdown === 'services' && isServicesOpen) || 
                        (link.hasDropdown === 'industries' && isIndustriesOpen) 
                          ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* SERVICES MEGA MENU */}
                    {link.hasDropdown === 'services' && (
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="fixed top-[70px] left-4 right-4 bg-azul-marino rounded-2xl shadow-2xl overflow-hidden border border-white/10 max-h-[calc(100vh-100px)] overflow-y-auto"
                          >
                            {/* Header Section */}
                            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <h3 className="text-white font-semibold text-lg">
                                  {language === 'es' ? 'Servicios' : 'Services'}
                                </h3>
                                <span className="text-white/50 text-sm">
                                  {language === 'es' 
                                    ? 'problema → solución → evidencia → CTA' 
                                    : 'problem → solution → evidence → CTA'}
                                </span>
                              </div>
                              <span className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs text-white/70 font-medium">
                                B2B
                              </span>
                            </div>

                            {/* Content Grid - responsive columns + CTA */}
                            <div className="p-4 flex flex-col lg:flex-row gap-4">
                              {/* Services Grid */}
                              <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-3">
                                {serviceColumns.map((column, colIdx) => (
                                  <div 
                                    key={colIdx} 
                                    className="bg-white/5 rounded-lg p-2.5 border border-white/10"
                                  >
                                    <Link 
                                      href={column.href}
                                      className="text-turquesa font-bold text-xs tracking-wider mb-2 block hover:text-menta transition-colors uppercase"
                                    >
                                      {language === 'es' ? column.title : column.titleEn}
                                    </Link>
                                    <ul className="space-y-1">
                                      {column.items.map((item, itemIdx) => (
                                        <li key={itemIdx}>
                                          <Link
                                            href={item.href}
                                            className="group flex items-center justify-between py-2 px-2 -mx-2 rounded hover:bg-white/10 transition-colors"
                                          >
                                            <span className="text-white text-sm">
                                              <span className="font-medium">{language === 'es' ? item.label : item.labelEn}</span>
                                              <span className="text-white/50 ml-1.5 text-xs">{language === 'es' ? item.desc : item.descEn}</span>
                                            </span>
                                            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-turquesa transition-colors flex-shrink-0 ml-2" />
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>

                              {/* CTA Sidebar */}
                              <div className="w-full lg:w-[200px] bg-white/5 rounded-lg p-4 border border-white/10 flex flex-col">
                                <div className="flex items-center gap-2 mb-3">
                                  <Sparkles className="w-4 h-4 text-turquesa" />
                                  <h4 className="text-white font-semibold text-sm">
                                    {language === 'es' ? '¿Qué necesitas?' : 'What do you need?'}
                                  </h4>
                                </div>
                                <p className="text-white/60 text-xs mb-4 flex-1 leading-relaxed">
                                  {language === 'es' 
                                    ? 'Diagnóstico breve (15–20 min) para ubicar tu cuello de botella.' 
                                    : 'Brief diagnosis (15-20 min) to find your bottleneck.'}
                                </p>
                                <div className="space-y-2">
                                  <Link
                                    href="/contacto"
                                    className="flex items-center justify-center w-full bg-turquesa text-azul-marino font-semibold px-3 py-2.5 rounded-lg hover:bg-menta transition-all text-xs"
                                  >
                                    {language === 'es' ? 'Diagnóstico Gratuito' : 'Free Diagnosis'}
                                  </Link>
                                  <Link
                                    href="/casos-exito"
                                    className="flex items-center justify-center w-full bg-white/10 border border-white/20 text-white font-medium px-3 py-2.5 rounded-lg hover:bg-white/20 transition-all text-xs"
                                  >
                                    {language === 'es' ? 'Ver casos de éxito' : 'Success stories'}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}

                    {/* INDUSTRIES MEGA MENU */}
                    {link.hasDropdown === 'industries' && (
                      <AnimatePresence>
                        {isIndustriesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="fixed top-[70px] left-4 right-4 bg-azul-marino rounded-2xl shadow-2xl overflow-hidden border border-white/10 max-h-[calc(100vh-100px)] overflow-y-auto"
                          >
                            {/* Header Section */}
                            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <h3 className="text-white font-semibold text-lg">
                                  {language === 'es' ? 'Industrias' : 'Industries'}
                                </h3>
                                <span className="text-white/50 text-sm">
                                  {language === 'es' 
                                    ? 'Sector → problemas típicos → soluciones → prueba' 
                                    : 'Sector → typical problems → solutions → proof'}
                                </span>
                              </div>
                              <span className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs text-white/70 font-medium">
                                {language === 'es' ? 'Landing pages' : 'Landing pages'}
                              </span>
                            </div>

                            {/* Industries Grid - responsive columns */}
                            <div className="p-5">
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {industryItems.map((item, idx) => {
                                  const Icon = item.icon;
                                  return (
                                    <Link
                                      key={idx}
                                      href={item.href}
                                      className="group bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors"
                                    >
                                      <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-turquesa/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                          <Icon className="w-5 h-5 text-turquesa" />
                                        </div>
                                        <div>
                                          <span className="text-white font-semibold text-sm block mb-1">
                                            {language === 'es' ? item.label : item.labelEn}
                                          </span>
                                          <span className="text-white/50 text-xs">
                                            {language === 'es' ? item.desc : item.descEn}
                                          </span>
                                        </div>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>

                              {/* Footer message */}
                              <div className="mt-5 pt-4 border-t border-white/10 border-dashed">
                                <p className="text-white/60 text-sm text-center">
                                  {language === 'es' 
                                    ? '¿Tu industria no está? ' 
                                    : "Your industry not listed? "}
                                  <span className="text-white font-medium">
                                    {language === 'es' 
                                      ? 'Trabajamos con todos los sectores.' 
                                      : 'We work with all sectors.'}
                                  </span>
                                  {language === 'es' 
                                    ? ' Lo importante es el problema (tiempo, costo, riesgo, cumplimiento).' 
                                    : ' What matters is the problem (time, cost, risk, compliance).'}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      isScrolled
                        ? 'text-foreground/70 hover:text-azul-marino dark:hover:text-turquesa hover:bg-beige/50 dark:hover:bg-white/10'
                        : 'text-azul-marino/80 dark:text-white/80 hover:text-azul-marino dark:hover:text-white hover:bg-azul-marino/5 dark:hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                  isScrolled
                    ? 'text-foreground/70 hover:text-azul-marino dark:hover:text-turquesa hover:bg-beige/50 dark:hover:bg-white/10'
                    : 'text-azul-marino/80 dark:text-white/80 hover:text-azul-marino dark:hover:text-white hover:bg-azul-marino/5 dark:hover:bg-white/10'
                }`}
                title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-2.5 rounded-lg transition-all ${
                  isScrolled
                    ? 'text-foreground/70 hover:text-azul-marino dark:hover:text-turquesa hover:bg-beige/50 dark:hover:bg-white/10'
                    : 'text-azul-marino/80 dark:text-white/80 hover:text-azul-marino dark:hover:text-white hover:bg-azul-marino/5 dark:hover:bg-white/10'
                }`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* CTA Button - Desktop */}
              <Link
                href="/contacto"
                className="hidden lg:inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-5 py-2.5 rounded-xl hover:bg-menta transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {language === 'es' ? 'Contacto' : 'Contact'}
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2.5 rounded-lg transition-all ${
                  isScrolled
                    ? 'text-foreground/70 hover:text-azul-marino dark:hover:text-turquesa hover:bg-beige/50 dark:hover:bg-white/10'
                    : 'text-azul-marino/80 dark:text-white/80 hover:text-azul-marino dark:hover:text-white hover:bg-azul-marino/5 dark:hover:bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-azul-marino shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                {/* Close Button */}
                <div className="flex justify-end mb-8">
                  <button
                    title="Close Menu"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-foreground/70 hover:bg-beige dark:hover:bg-white/10"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1">
                  {navLinks.map((link) => (
                    link.hasDropdown ? (
                      <div key={link.href}>
                        <button
                          onClick={() => {
                            if (link.hasDropdown === 'services') setIsServicesOpen(!isServicesOpen);
                            if (link.hasDropdown === 'industries') setIsIndustriesOpen(!isIndustriesOpen);
                          }}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-foreground/80 hover:bg-beige dark:hover:bg-white/10 font-medium"
                        >
                          {link.label}
                          <ChevronDown className={`w-5 h-5 transition-transform ${
                            (link.hasDropdown === 'services' && isServicesOpen) || 
                            (link.hasDropdown === 'industries' && isIndustriesOpen) 
                              ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        {/* Services Mobile Dropdown */}
                        {link.hasDropdown === 'services' && (
                          <AnimatePresence>
                            {isServicesOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 py-2 space-y-3">
                                  {serviceCategories.map((category) => {
                                    const Icon = category.icon;
                                    return (
                                      <div key={category.href}>
                                        <Link
                                          href={category.href}
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className="flex items-center gap-2 px-4 py-2 font-medium text-foreground/80"
                                        >
                                          <Icon className="w-4 h-4 text-turquesa" />
                                          {language === 'es' ? category.title : category.titleEn}
                                        </Link>
                                        <div className="pl-10 space-y-1">
                                          {category.items.map((item) => (
                                            <Link
                                              key={item.href}
                                              href={item.href}
                                              onClick={() => setIsMobileMenuOpen(false)}
                                              className="block py-1.5 text-sm text-foreground/60 hover:text-turquesa"
                                            >
                                              {language === 'es' ? item.label : item.labelEn}
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}

                        {/* Industries Mobile Dropdown */}
                        {link.hasDropdown === 'industries' && (
                          <AnimatePresence>
                            {isIndustriesOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 py-2 space-y-1">
                                  {industryItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                      <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 font-medium text-foreground/80"
                                      >
                                        <Icon className="w-4 h-4 text-turquesa" />
                                        {language === 'es' ? item.label : item.labelEn}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 rounded-xl text-foreground/80 hover:bg-beige dark:hover:bg-white/10 font-medium"
                      >
                        {link.label}
                      </Link>
                    )
                  ))}
                </nav>

                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-gris-arena/30 dark:border-white/10">
                  <Link
                    href="/contacto"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-turquesa text-azul-marino font-semibold px-6 py-4 rounded-xl hover:bg-menta transition-all"
                  >
                    {language === 'es' ? 'Contacto' : 'Contact'}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

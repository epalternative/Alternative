'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Menu,
  X,
  ChevronLeft,
  PanelRightOpen,
  Building2,
  Factory,
  ShoppingCart,
  Laptop,
  Briefcase,
  Landmark,
  Heart,
  Zap,
} from 'lucide-react';

const industries = [
  { slug: 'banca-servicios-financieros', title: { es: 'Banca y Servicios Financieros', en: 'Banking & Financial Services' }, icon: Building2 },
  { slug: 'manufactura-logistica', title: { es: 'Manufactura y Logística', en: 'Manufacturing & Logistics' }, icon: Factory },
  { slug: 'retail-comercio', title: { es: 'Retail y Comercio', en: 'Retail & Commerce' }, icon: ShoppingCart },
  { slug: 'tecnologia-telecomunicaciones', title: { es: 'Tecnología y Telecomunicaciones', en: 'Technology & Telecom' }, icon: Laptop },
  { slug: 'servicios-profesionales', title: { es: 'Servicios Profesionales', en: 'Professional Services' }, icon: Briefcase },
  { slug: 'gobierno-sector-publico', title: { es: 'Gobierno y Sector Público', en: 'Government & Public Sector' }, icon: Landmark },
  { slug: 'salud-farmaceutica', title: { es: 'Salud y Farmacéutica', en: 'Healthcare & Pharma' }, icon: Heart },
  { slug: 'energia-utilities', title: { es: 'Energía y Utilities', en: 'Energy & Utilities' }, icon: Zap },
];

interface IndustrySidebarProps {
  locale: string;
  currentIndustry?: string;
}

const colors = {
  bg: 'bg-turquesa/10',
  text: 'text-turquesa',
  border: 'border-turquesa/20',
  hover: 'hover:bg-turquesa/20',
  active: 'bg-turquesa/20 border-turquesa/30',
};

export function IndustrySidebar({ locale, currentIndustry }: IndustrySidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const isEs = locale === 'es';

  const detectedSlug =
    currentIndustry ??
    (() => {
      const match = pathname?.match(/\/industrias\/([^/]+)/);
      return match ? match[1] : null;
    })();

  useEffect(() => {
    const checkScreenSize = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth >= 1024) setIsSticky(true);
    };
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth >= 1024) setIsSticky(window.scrollY > 200);
    };
    checkScreenSize();
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full ${colors.bg} ${colors.border} border-2 shadow-lg flex items-center justify-center ${colors.text} transition-all duration-300`}
        aria-label={isEs ? 'Abrir menú de industrias' : 'Open industries menu'}
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
              bg-turquesa/20
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
            animate={{ x: 0, opacity: 1 }}
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
            <div className="p-6 space-y-6">
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

              <nav className="space-y-2">
                {industries.map((ind) => {
                  const Icon = ind.icon;
                  const isActive = detectedSlug === ind.slug;
                  return (
                    <Link
                      key={ind.slug}
                      href={`/${locale}/industrias/${ind.slug}`}
                      onClick={() => setIsOpen(false)}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg
                        backdrop-blur-sm
                        transition-all duration-300 group
                        ${isActive
                          ? `${colors.active} ${colors.border} border shadow-md`
                          : `${colors.hover} ${colors.bg} hover:shadow-md`
                        }
                      `}
                    >
                      <Icon className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                      <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'} text-azul-marino dark:text-white group-hover:translate-x-1 transition-transform`}>
                        {ind.title[isEs ? 'es' : 'en']}
                      </span>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-turquesa ml-auto"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* All Industries Link */}
              <div className="pt-4 border-t border-gris-arena/30">
                <Link
                  href={`/${locale}/industrias`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium text-azul-marino/80 dark:text-white/80 hover:text-turquesa transition-colors group backdrop-blur-sm p-2 rounded-lg hover:bg-white/20 dark:hover:bg-azul-marino/20"
                >
                  <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  {isEs ? 'Ver todas las industrias' : 'View all industries'}
                </Link>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

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

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
  Settings,
  Award,
  FolderKanban,
  Monitor,
  Code,
  Globe,
  ArrowRight
} from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceLinks = [
    { href: '/services/process-consulting', icon: Settings, label: t?.servicesDropdown?.processConsulting ?? 'Consultoría de Procesos' },
    { href: '/services/quality-consulting', icon: Award, label: t?.servicesDropdown?.qualityConsulting ?? 'Consultoría de Calidad' },
    { href: '/services/project-consulting', icon: FolderKanban, label: t?.servicesDropdown?.projectConsulting ?? 'Consultoría de Proyectos' },
    { href: '/services/it-consulting', icon: Monitor, label: t?.servicesDropdown?.itConsulting ?? 'Consultoría de TI' },
    { href: '/services/software-development', icon: Code, label: t?.servicesDropdown?.softwareDevelopment ?? 'Desarrollo de Software' },
  ];

  const navLinks = [
    { href: '/', label: t?.nav?.home ?? 'Inicio' },
    { href: '/business-consultants', label: t?.nav?.businessConsultants ?? 'Consultores' },
    { href: '#services', label: t?.nav?.services ?? 'Servicios', hasDropdown: true },
    { href: '/success-stories', label: t?.nav?.successStories ?? 'Proyectos' },
    { href: '/team-profile', label: t?.nav?.teamProfile ?? 'Perfil' },
    { href: '/blog', label: t?.nav?.blog ?? 'Blog' },
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
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all ${
                        isScrolled
                          ? 'text-foreground/70 hover:text-azul-marino dark:hover:text-turquesa hover:bg-beige/50 dark:hover:bg-white/10'
                          : 'text-azul-marino/80 dark:text-white/80 hover:text-azul-marino dark:hover:text-white hover:bg-azul-marino/5 dark:hover:bg-white/10'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-card rounded-2xl shadow-brand-lg border border-gris-arena/20 dark:border-white/10 overflow-hidden"
                        >
                          <div className="p-2">
                            {serviceLinks.map((service) => {
                              const Icon = service.icon;
                              return (
                                <Link
                                  key={service.href}
                                  href={service.href}
                                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-beige dark:hover:bg-white/10 transition-colors group"
                                >
                                  <div className="w-10 h-10 bg-turquesa/10 rounded-lg flex items-center justify-center group-hover:bg-turquesa/20 transition-colors">
                                    <Icon className="w-5 h-5 text-turquesa" />
                                  </div>
                                  <span className="text-foreground/80 group-hover:text-azul-marino dark:group-hover:text-white font-medium text-sm">
                                    {service.label}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                href="/contact"
                className="hidden lg:inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-5 py-2.5 rounded-xl hover:bg-menta transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {t?.nav?.contact ?? 'Contacto'}
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
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-azul-marino shadow-2xl"
            >
              <div className="p-6">
                {/* Close Button */}
                <div className="flex justify-end mb-8">
                  <button
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
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-foreground/80 hover:bg-beige dark:hover:bg-white/10 font-medium"
                        >
                          {link.label}
                          <ChevronDown className={`w-5 h-5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-2 space-y-1">
                                {serviceLinks.map((service) => {
                                  const Icon = service.icon;
                                  return (
                                    <Link
                                      key={service.href}
                                      href={service.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-foreground/70 hover:bg-beige dark:hover:bg-white/10"
                                    >
                                      <Icon className="w-5 h-5 text-turquesa" />
                                      <span className="text-sm">{service.label}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
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
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-turquesa text-azul-marino font-semibold px-6 py-4 rounded-xl hover:bg-menta transition-all"
                  >
                    {t?.nav?.contact ?? 'Contacto'}
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

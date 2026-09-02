'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { FileText, Video, BarChart3, Calculator, BookOpen, ArrowRight, ChevronDown } from 'lucide-react';

const resourceCategories = [
  { icon: FileText, title: 'Guías Descargables', titleEn: 'Downloadable Guides', href: '/recursos/guias-descargables' },
  { icon: Video, title: 'Webinars', titleEn: 'Webinars', href: '/recursos/webinars' },
  { icon: BarChart3, title: 'Casos de Estudio', titleEn: 'Case Studies', href: '/recursos/casos-estudio' },
  { icon: Calculator, title: 'Calculadoras', titleEn: 'Calculators', href: '/recursos/calculadoras' },
  { icon: BookOpen, title: 'Centro de Conocimiento', titleEn: 'Knowledge Center', href: '/recursos/centro-conocimiento' },
];

export default function RecursosPage() {
  const locale = useLocale();
  const isEs = locale === 'es';

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Recursos' : 'Resources', href: null },
  ];

  const heroStats = [
    { value: '5', label: isEs ? 'categorías' : 'categories' },
    { value: '100%', label: isEs ? 'gratuito' : 'free' },
    { value: '✓', label: isEs ? 'Guías y calculadoras' : 'Guides & calculators' },
  ];

  return (
    <>
      {/* Hero: fondo violeta, títulos en blanco, texto secundario visible (blanco-hueso con buena opacidad) */}
      <section className="relative bg-violeta overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[20%] right-[8%] w-32 h-32 bg-blanco-hueso/10 rounded-2xl rotate-12"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[20%] left-[5%] w-24 h-24 bg-blanco-hueso/8 rounded-2xl -rotate-6"
          />
        </div>

        <div className="container-custom relative z-10 pt-8 pb-16 lg:pb-20">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {idx > 0 && (
                    <ChevronDown className="w-4 h-4 text-blanco-hueso/60 -rotate-90" />
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-blanco-hueso/85 hover:text-blanco-hueso transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-blanco-hueso font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: icon + category, title, subtitle, stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blanco-hueso/15 rounded-2xl flex items-center justify-center border border-blanco-hueso/25">
                  <BookOpen className="w-8 h-8 text-blanco-hueso" />
                </div>
                <div>
                  <span className="text-blanco-hueso text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Recursos' : 'Resources'}
                  </span>
                  <p className="text-blanco-hueso/90 text-sm">
                    {isEs ? 'Guías, herramientas y contenido' : 'Guides, tools and content'}
                  </p>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl text-blanco-hueso font-semibold leading-tight mb-4">
                {isEs ? 'Recursos' : 'Resources'}
              </h1>

              <p className="text-xl md:text-2xl text-blanco-hueso font-medium mb-4">
                {isEs ? 'Guías, herramientas y contenido gratuito.' : 'Free guides, tools and content.'}
              </p>

              <p className="text-lg md:text-xl text-blanco-hueso/95 mb-8 leading-relaxed">
                {isEs
                  ? 'Optimiza tu empresa con guías descargables, webinars, casos de estudio, calculadoras y nuestro centro de conocimiento.'
                  : 'Optimize your company with downloadable guides, webinars, case studies, calculators and our knowledge center.'}
              </p>

              <Link
                href={`/${locale}/recursos/calculadoras`}
                className="inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-6 py-3 rounded-lg hover:bg-menta transition-all duration-300 shadow-lg shadow-turquesa/20 group mb-8"
              >
                {isEs ? 'Explorar calculadoras' : 'Explore calculators'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-blanco-hueso/25">
                {heroStats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-blanco-hueso font-bold">{stat.value}</span>
                    <span className="text-blanco-hueso/90 text-sm">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: animated card (animación a la derecha del título) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-blanco-hueso/95 backdrop-blur-xl rounded-3xl p-8 border border-blanco-hueso/30 shadow-brand"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-turquesa" />
                  <div className="w-3 h-3 rounded-full bg-menta" />
                  <div className="w-3 h-3 rounded-full bg-violeta" />
                  <span className="ml-auto text-azul-marino/50 text-sm">
                    {isEs ? 'Categorías' : 'Categories'}
                  </span>
                </div>

                <div className="space-y-4">
                  {resourceCategories.slice(0, 4).map((r, idx) => {
                    const Icon = r.icon;
                    const pct = 60 + idx * 10;
                    return (
                      <div key={r.href} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-turquesa" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-azul-marino text-sm font-medium block truncate">
                            {isEs ? r.title : r.titleEn}
                          </span>
                        </div>
                        <div className="h-1.5 w-16 bg-azul-marino/10 rounded-full overflow-hidden flex-shrink-0">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 1, delay: 0.5 + idx * 0.15 }}
                            className="h-full bg-gradient-to-r from-turquesa to-menta rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-azul-marino/10 flex justify-between text-sm">
                  <span className="text-azul-marino/60">{isEs ? 'Todo gratuito' : 'All free'}</span>
                  <span className="text-azul-marino font-semibold">100%</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceCategories.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link key={resource.href} href={`/${locale}${resource.href}`}>
                  <div className="bg-white dark:bg-card p-8 rounded-2xl shadow-brand hover:shadow-brand-lg transition-all hover:-translate-y-1">
                    <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-turquesa" />
                    </div>
                    <h2 className="text-xl font-semibold text-azul-marino dark:text-white mb-2">
                      {isEs ? resource.title : resource.titleEn}
                    </h2>
                    <div className="flex items-center gap-2 text-turquesa font-medium">
                      <span>{isEs ? 'Explorar' : 'Explore'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

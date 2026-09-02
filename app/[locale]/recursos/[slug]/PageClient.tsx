'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { FileText, Video, BarChart3, Calculator, BookOpen, ChevronDown } from 'lucide-react';
import { useParams } from 'next/navigation';

const resourceData: Record<string, { title: string; titleEn: string; icon: typeof FileText }> = {
  'guias-descargables': { title: 'Guías Descargables', titleEn: 'Downloadable Guides', icon: FileText },
  'webinars': { title: 'Webinars', titleEn: 'Webinars', icon: Video },
  'casos-estudio': { title: 'Casos de Estudio', titleEn: 'Case Studies', icon: BarChart3 },
  'calculadoras': { title: 'Calculadoras', titleEn: 'Calculators', icon: Calculator },
  'centro-conocimiento': { title: 'Centro de Conocimiento', titleEn: 'Knowledge Center', icon: BookOpen },
};

export default function ResourcePage() {
  const language = useLocale();
  const params = useParams();
  const slug = params.slug as string;
  const data = resourceData[slug] || { title: slug, titleEn: slug, icon: FileText };
  const Icon = data.icon;
  const isEs = language === 'es';

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${language}` },
    { label: isEs ? 'Recursos' : 'Resources', href: `/${language}/recursos` },
    { label: isEs ? data.title : data.titleEn, href: null },
  ];

  return (
    <>
      {/* Hero: fondo violeta, títulos en blanco-hueso, texto secundario visible (estándar Recursos) */}
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
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {idx > 0 && (
                    <ChevronDown className="w-4 h-4 text-blanco-hueso/60 -rotate-90 flex-shrink-0" />
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="w-16 h-16 bg-blanco-hueso/15 rounded-2xl flex items-center justify-center border border-blanco-hueso/25">
              <Icon className="w-8 h-8 text-blanco-hueso" />
            </div>
            <div>
              <span className="text-blanco-hueso text-sm font-medium uppercase tracking-wider">
                {isEs ? 'Recursos' : 'Resources'}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-blanco-hueso font-semibold leading-tight">
                {isEs ? data.title : data.titleEn}
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <div className="bg-white dark:bg-card rounded-2xl p-12 text-center shadow-brand">
            <p className="text-foreground/70 text-lg">
              {isEs ? 'Contenido en desarrollo...' : 'Content in development...'}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

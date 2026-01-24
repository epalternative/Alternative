'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { FileText, Video, BarChart3, Calculator, BookOpen, ArrowRight } from 'lucide-react';

const resourceCategories = [
  { icon: FileText, title: 'Guías Descargables', titleEn: 'Downloadable Guides', href: '/recursos/guias-descargables' },
  { icon: Video, title: 'Webinars', titleEn: 'Webinars', href: '/recursos/webinars' },
  { icon: BarChart3, title: 'Casos de Estudio', titleEn: 'Case Studies', href: '/recursos/casos-estudio' },
  { icon: Calculator, title: 'Calculadoras', titleEn: 'Calculators', href: '/recursos/calculadoras' },
  { icon: BookOpen, title: 'Centro de Conocimiento', titleEn: 'Knowledge Center', href: '/recursos/centro-conocimiento' },
];

export default function RecursosPage() {
  const language = useLocale();
  
  return (
    <div className="min-h-screen bg-blanco-hueso dark:bg-background py-24">
      <div className="container-custom">
        <h1 className="text-4xl lg:text-5xl font-semibold text-azul-marino dark:text-white mb-8">
          {language === 'es' ? 'Recursos' : 'Resources'}
        </h1>
        <p className="text-lg text-foreground/60 mb-12 max-w-2xl">
          {language === 'es' 
            ? 'Guías, herramientas y contenido gratuito para optimizar tu empresa.'
            : 'Free guides, tools and content to optimize your company.'}
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourceCategories.map((resource) => {
            const Icon = resource.icon;
            return (
              <Link key={resource.href} href={resource.href}>
                <div className="bg-white dark:bg-card p-8 rounded-2xl shadow-brand hover:shadow-brand-lg transition-all hover:-translate-y-1">
                  <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-turquesa" />
                  </div>
                  <h2 className="text-xl font-semibold text-azul-marino dark:text-white mb-2">
                    {language === 'es' ? resource.title : resource.titleEn}
                  </h2>
                  <div className="flex items-center gap-2 text-turquesa font-medium">
                    <span>{language === 'es' ? 'Explorar' : 'Explore'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { FolderKanban, ArrowRight } from 'lucide-react';

const subServices = [
  { title: 'PMP® Project Management', titleEn: 'PMP® Project Management', href: '/servicios/gestion-proyectos/pmp-project-management' },
  { title: 'Metodologías Ágiles', titleEn: 'Agile Methodologies', href: '/servicios/gestion-proyectos/metodologias-agiles' },
  { title: 'PMO Office', titleEn: 'PMO Office', href: '/servicios/gestion-proyectos/pmo-office' },
  { title: 'Casos de Negocio', titleEn: 'Business Cases', href: '/servicios/gestion-proyectos/casos-negocio' },
];

export default function GestionProyectosPage() {
  const language = useLocale();
  
  return (
    <div className="min-h-screen bg-blanco-hueso dark:bg-background py-24">
      <div className="container-custom">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-turquesa/20 rounded-2xl flex items-center justify-center">
            <FolderKanban className="w-8 h-8 text-turquesa" />
          </div>
          <div>
            <p className="text-turquesa font-medium text-sm uppercase tracking-wider">
              {language === 'es' ? 'Servicios' : 'Services'}
            </p>
            <h1 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white">
              {language === 'es' ? 'Gestión de Proyectos' : 'Project Management'}
            </h1>
          </div>
        </div>
        
        <p className="text-lg text-foreground/60 mb-12 max-w-3xl">
          {language === 'es' 
            ? 'PMP Project Management, metodologías ágiles y PMO Office. Proyectos que terminan a tiempo, en presupuesto y generan el valor esperado.'
            : 'PMP Project Management, agile methodologies and PMO Office. Projects that finish on time, on budget and generate expected value.'}
        </p>
        
        <h2 className="text-2xl font-semibold text-azul-marino dark:text-white mb-6">
          {language === 'es' ? 'Servicios incluidos' : 'Included services'}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {subServices.map((service) => (
            <Link key={service.href} href={service.href}>
              <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-brand hover:shadow-brand-lg transition-all hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-2">
                  {language === 'es' ? service.title : service.titleEn}
                </h3>
                <div className="flex items-center gap-2 text-turquesa font-medium">
                  <span>{language === 'es' ? 'Ver más' : 'Learn more'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

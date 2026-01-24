'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Award, ArrowRight } from 'lucide-react';

const subServices = [
  { title: 'Implementación ISO 9001', titleEn: 'ISO 9001 Implementation', href: '/servicios/sistemas-calidad/implementacion-iso-9001' },
  { title: 'Auditoría de Calidad', titleEn: 'Quality Audit', href: '/servicios/sistemas-calidad/auditoria-calidad' },
  { title: 'Certificación ISO', titleEn: 'ISO Certification', href: '/servicios/sistemas-calidad/certificacion-iso' },
  { title: 'Gestión de Calidad', titleEn: 'Quality Management', href: '/servicios/sistemas-calidad/gestion-calidad' },
];

export default function SistemasCalidadPage() {
  const language = useLocale();
  
  return (
    <div className="min-h-screen bg-blanco-hueso dark:bg-background py-24">
      <div className="container-custom">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-turquesa/20 rounded-2xl flex items-center justify-center">
            <Award className="w-8 h-8 text-turquesa" />
          </div>
          <div>
            <p className="text-turquesa font-medium text-sm uppercase tracking-wider">
              {language === 'es' ? 'Servicios' : 'Services'}
            </p>
            <h1 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white">
              {language === 'es' ? 'Sistemas de Calidad' : 'Quality Systems'}
            </h1>
          </div>
        </div>
        
        <p className="text-lg text-foreground/60 mb-12 max-w-3xl">
          {language === 'es' 
            ? 'Implementación, auditoría y certificación ISO 9001. Especializados en sector bancario, financiero y manufactura con requisitos regulatorios estrictos.'
            : 'ISO 9001 implementation, audit and certification. Specialized in banking, financial and manufacturing sectors with strict regulatory requirements.'}
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

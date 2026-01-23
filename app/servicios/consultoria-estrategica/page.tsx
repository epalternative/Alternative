'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { Target, ArrowRight } from 'lucide-react';

const subServices = [
  { title: 'Diagnóstico Organizacional', titleEn: 'Organizational Diagnosis', href: '/servicios/consultoria-estrategica/diagnostico-organizacional' },
  { title: 'Estudios de Viabilidad', titleEn: 'Feasibility Studies', href: '/servicios/consultoria-estrategica/estudios-viabilidad' },
  { title: 'Desarrollo de RFP', titleEn: 'RFP Development', href: '/servicios/consultoria-estrategica/desarrollo-rfp' },
];

export default function ConsultoriaEstrategicaPage() {
  const { language } = useI18n();
  
  return (
    <div className="min-h-screen bg-blanco-hueso dark:bg-background py-24">
      <div className="container-custom">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-turquesa/20 rounded-2xl flex items-center justify-center">
            <Target className="w-8 h-8 text-turquesa" />
          </div>
          <div>
            <p className="text-turquesa font-medium text-sm uppercase tracking-wider">
              {language === 'es' ? 'Servicios' : 'Services'}
            </p>
            <h1 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white">
              {language === 'es' ? 'Consultoría Estratégica' : 'Strategic Consulting'}
            </h1>
          </div>
        </div>
        
        <p className="text-lg text-foreground/60 mb-12 max-w-3xl">
          {language === 'es' 
            ? 'Diagnóstico organizacional, priorización estratégica y planes de ejecución. Te ayudamos a identificar qué optimizar primero para máximo impacto.'
            : 'Organizational diagnosis, strategic prioritization and execution plans. We help you identify what to optimize first for maximum impact.'}
        </p>
        
        <h2 className="text-2xl font-semibold text-azul-marino dark:text-white mb-6">
          {language === 'es' ? 'Servicios incluidos' : 'Included services'}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

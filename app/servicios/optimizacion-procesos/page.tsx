'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { Settings, ArrowRight } from 'lucide-react';

const subServices = [
  { title: 'BPM Empresarial', titleEn: 'Business BPM', href: '/servicios/optimizacion-procesos/bpm-empresarial' },
  { title: 'Lean Six Sigma', titleEn: 'Lean Six Sigma', href: '/servicios/optimizacion-procesos/lean-six-sigma' },
  { title: 'Diseño de Procesos', titleEn: 'Process Design', href: '/servicios/optimizacion-procesos/diseno-procesos' },
  { title: 'Automatización de Procesos', titleEn: 'Process Automation', href: '/servicios/optimizacion-procesos/automatizacion-procesos' },
];

export default function OptimizacionProcesosPage() {
  const { language } = useI18n();
  
  return (
    <div className="min-h-screen bg-blanco-hueso dark:bg-background py-24">
      <div className="container-custom">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-turquesa/20 rounded-2xl flex items-center justify-center">
            <Settings className="w-8 h-8 text-turquesa" />
          </div>
          <div>
            <p className="text-turquesa font-medium text-sm uppercase tracking-wider">
              {language === 'es' ? 'Servicios' : 'Services'}
            </p>
            <h1 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white">
              {language === 'es' ? 'Optimización de Procesos' : 'Process Optimization'}
            </h1>
          </div>
        </div>
        
        <p className="text-lg text-foreground/60 mb-12 max-w-3xl">
          {language === 'es' 
            ? 'BPM empresarial, Lean Six Sigma y diseño de procesos. Reducimos costos operativos entre 25-40% con metodologías probadas y resultados medibles.'
            : 'Business BPM, Lean Six Sigma and process design. We reduce operational costs by 25-40% with proven methodologies and measurable results.'}
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

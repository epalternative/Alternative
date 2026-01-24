'use client';

import { useLocale } from 'next-intl';
import { Settings } from 'lucide-react';
import { useParams } from 'next/navigation';

const subServiceData: Record<string, { title: string; titleEn: string }> = {
  'bpm-empresarial': { title: 'BPM Empresarial', titleEn: 'Business BPM' },
  'lean-six-sigma': { title: 'Lean Six Sigma', titleEn: 'Lean Six Sigma' },
  'diseno-procesos': { title: 'Diseño de Procesos', titleEn: 'Process Design' },
  'automatizacion-procesos': { title: 'Automatización de Procesos', titleEn: 'Process Automation' },
};

export default function SubServicePage() {
  const language = useLocale();
  const params = useParams();
  const slug = params.slug as string;
  const data = subServiceData[slug] || { title: slug, titleEn: slug };
  
  return (
    <div className="min-h-screen bg-blanco-hueso dark:bg-background py-24">
      <div className="container-custom">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-turquesa/20 rounded-2xl flex items-center justify-center">
            <Settings className="w-8 h-8 text-turquesa" />
          </div>
          <div>
            <p className="text-turquesa font-medium text-sm uppercase tracking-wider">
              {language === 'es' ? 'Optimización de Procesos' : 'Process Optimization'}
            </p>
            <h1 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white">
              {language === 'es' ? data.title : data.titleEn}
            </h1>
          </div>
        </div>
        
        <div className="bg-white dark:bg-card rounded-2xl p-12 text-center">
          <p className="text-foreground/60">
            {language === 'es' ? 'Contenido en desarrollo...' : 'Content in development...'}
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useLocale } from 'next-intl';
import { Cpu } from 'lucide-react';
import { useParams } from 'next/navigation';

const subServiceData: Record<string, { title: string; titleEn: string }> = {
  'estrategia-digital': { title: 'Estrategia Digital', titleEn: 'Digital Strategy' },
  'automatizacion-inteligente': { title: 'Automatización Inteligente', titleEn: 'Intelligent Automation' },
  'desarrollo-software': { title: 'Desarrollo de Software', titleEn: 'Software Development' },
  'infraestructura-it': { title: 'Infraestructura IT', titleEn: 'IT Infrastructure' },
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
            <Cpu className="w-8 h-8 text-turquesa" />
          </div>
          <div>
            <p className="text-turquesa font-medium text-sm uppercase tracking-wider">
              {language === 'es' ? 'Transformación Digital' : 'Digital Transformation'}
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

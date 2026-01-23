'use client';

import { useI18n } from '@/lib/i18n/context';
import { FileText, Video, BarChart3, Calculator, BookOpen } from 'lucide-react';
import { useParams } from 'next/navigation';

const resourceData: Record<string, { title: string; titleEn: string; icon: typeof FileText }> = {
  'guias-descargables': { title: 'Guías Descargables', titleEn: 'Downloadable Guides', icon: FileText },
  'webinars': { title: 'Webinars', titleEn: 'Webinars', icon: Video },
  'casos-estudio': { title: 'Casos de Estudio', titleEn: 'Case Studies', icon: BarChart3 },
  'calculadoras': { title: 'Calculadoras', titleEn: 'Calculators', icon: Calculator },
  'centro-conocimiento': { title: 'Centro de Conocimiento', titleEn: 'Knowledge Center', icon: BookOpen },
};

export default function ResourcePage() {
  const { language } = useI18n();
  const params = useParams();
  const slug = params.slug as string;
  const data = resourceData[slug] || { title: slug, titleEn: slug, icon: FileText };
  const Icon = data.icon;
  
  return (
    <div className="min-h-screen bg-blanco-hueso dark:bg-background py-24">
      <div className="container-custom">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-turquesa/20 rounded-2xl flex items-center justify-center">
            <Icon className="w-8 h-8 text-turquesa" />
          </div>
          <div>
            <p className="text-turquesa font-medium text-sm uppercase tracking-wider">
              {language === 'es' ? 'Recursos' : 'Resources'}
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

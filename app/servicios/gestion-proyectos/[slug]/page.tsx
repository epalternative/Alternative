'use client';

import { useI18n } from '@/lib/i18n/context';
import { FolderKanban } from 'lucide-react';
import { useParams } from 'next/navigation';

const subServiceData: Record<string, { title: string; titleEn: string }> = {
  'pmp-project-management': { title: 'PMP® Project Management', titleEn: 'PMP® Project Management' },
  'metodologias-agiles': { title: 'Metodologías Ágiles', titleEn: 'Agile Methodologies' },
  'pmo-office': { title: 'PMO Office', titleEn: 'PMO Office' },
  'casos-negocio': { title: 'Casos de Negocio', titleEn: 'Business Cases' },
};

export default function SubServicePage() {
  const { language } = useI18n();
  const params = useParams();
  const slug = params.slug as string;
  const data = subServiceData[slug] || { title: slug, titleEn: slug };
  
  return (
    <div className="min-h-screen bg-blanco-hueso dark:bg-background py-24">
      <div className="container-custom">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-turquesa/20 rounded-2xl flex items-center justify-center">
            <FolderKanban className="w-8 h-8 text-turquesa" />
          </div>
          <div>
            <p className="text-turquesa font-medium text-sm uppercase tracking-wider">
              {language === 'es' ? 'Gestión de Proyectos' : 'Project Management'}
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

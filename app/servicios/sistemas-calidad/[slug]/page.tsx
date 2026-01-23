'use client';

import { useI18n } from '@/lib/i18n/context';
import { Award } from 'lucide-react';
import { useParams } from 'next/navigation';

const subServiceData: Record<string, { title: string; titleEn: string }> = {
  'implementacion-iso-9001': { title: 'Implementación ISO 9001', titleEn: 'ISO 9001 Implementation' },
  'auditoria-calidad': { title: 'Auditoría de Calidad', titleEn: 'Quality Audit' },
  'certificacion-iso': { title: 'Certificación ISO', titleEn: 'ISO Certification' },
  'gestion-calidad': { title: 'Gestión de Calidad', titleEn: 'Quality Management' },
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
            <Award className="w-8 h-8 text-turquesa" />
          </div>
          <div>
            <p className="text-turquesa font-medium text-sm uppercase tracking-wider">
              {language === 'es' ? 'Sistemas de Calidad' : 'Quality Systems'}
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

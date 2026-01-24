'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Building2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';

const subPageData: Record<string, { title: string; titleEn: string }> = {
  'cumplimiento-regulatorio-sbp': { title: 'Cumplimiento Regulatorio SBP', titleEn: 'SBP Regulatory Compliance' },
  'transformacion-digital-bancaria': { title: 'Transformación Digital Bancaria', titleEn: 'Banking Digital Transformation' },
  'optimizacion-operaciones-bancarias': { title: 'Optimización Operaciones Bancarias', titleEn: 'Banking Operations Optimization' },
  'sistemas-calidad-sector-financiero': { title: 'Sistemas de Calidad Sector Financiero', titleEn: 'Financial Sector Quality Systems' },
};

export default function BankingSubPage() {
  const language = useLocale();
  const params = useParams();
  const subslug = params.subslug as string;
  const data = subPageData[subslug] || { title: subslug, titleEn: subslug };
  
  return (
    <div className="min-h-screen bg-blanco-hueso dark:bg-background py-24">
      <div className="container-custom">
        <div className="flex items-center gap-2 text-sm text-foreground/60 mb-8">
          <Link href="/industrias" className="hover:text-turquesa transition-colors">
            {language === 'es' ? 'Industrias' : 'Industries'}
          </Link>
          <span>/</span>
          <Link href="/industrias/banca-servicios-financieros" className="hover:text-turquesa transition-colors">
            {language === 'es' ? 'Banca y Servicios Financieros' : 'Banking & Financial Services'}
          </Link>
          <span>/</span>
          <span className="text-foreground/80">
            {language === 'es' ? data.title : data.titleEn}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-turquesa/20 rounded-2xl flex items-center justify-center">
            <Building2 className="w-8 h-8 text-turquesa" />
          </div>
          <div>
            <p className="text-turquesa font-medium text-sm uppercase tracking-wider">
              {language === 'es' ? 'Banca y Servicios Financieros' : 'Banking & Financial Services'}
            </p>
            <h1 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white">
              {language === 'es' ? data.title : data.titleEn}
            </h1>
          </div>
        </div>
        
        <div className="bg-white dark:bg-card rounded-2xl p-12 text-center mb-8">
          <p className="text-foreground/60">
            {language === 'es' ? 'Contenido en desarrollo...' : 'Content in development...'}
          </p>
        </div>

        <div className="flex justify-between">
          <Link
            href="/industrias/banca-servicios-financieros"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-turquesa transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'es' ? 'Volver' : 'Back'}
          </Link>
          
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-6 py-3 rounded-xl hover:bg-menta transition-all"
          >
            {language === 'es' ? 'Solicitar información' : 'Request information'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

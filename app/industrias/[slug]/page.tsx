'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { Building2, Factory, ShoppingCart, Laptop, Briefcase, Landmark, Heart, Zap, ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';

const industryData: Record<string, { 
  title: string; 
  titleEn: string; 
  icon: typeof Building2;
  hasSubPages?: boolean;
  subPages?: { title: string; titleEn: string; href: string }[];
}> = {
  'banca-servicios-financieros': { 
    title: 'Banca y Servicios Financieros', 
    titleEn: 'Banking & Financial Services',
    icon: Building2,
    hasSubPages: true,
    subPages: [
      { title: 'Cumplimiento Regulatorio SBP', titleEn: 'SBP Regulatory Compliance', href: '/industrias/banca-servicios-financieros/cumplimiento-regulatorio-sbp' },
      { title: 'Transformación Digital Bancaria', titleEn: 'Banking Digital Transformation', href: '/industrias/banca-servicios-financieros/transformacion-digital-bancaria' },
      { title: 'Optimización Operaciones Bancarias', titleEn: 'Banking Operations Optimization', href: '/industrias/banca-servicios-financieros/optimizacion-operaciones-bancarias' },
      { title: 'Sistemas de Calidad Sector Financiero', titleEn: 'Financial Sector Quality Systems', href: '/industrias/banca-servicios-financieros/sistemas-calidad-sector-financiero' },
    ]
  },
  'manufactura-logistica': { title: 'Manufactura y Logística', titleEn: 'Manufacturing & Logistics', icon: Factory },
  'retail-comercio': { title: 'Retail y Comercio', titleEn: 'Retail & Commerce', icon: ShoppingCart },
  'tecnologia-telecomunicaciones': { title: 'Tecnología y Telecomunicaciones', titleEn: 'Technology & Telecom', icon: Laptop },
  'servicios-profesionales': { title: 'Servicios Profesionales', titleEn: 'Professional Services', icon: Briefcase },
  'gobierno-sector-publico': { title: 'Gobierno y Sector Público', titleEn: 'Government & Public Sector', icon: Landmark },
  'salud-farmaceutica': { title: 'Salud y Farmacéutica', titleEn: 'Healthcare & Pharma', icon: Heart },
  'energia-utilities': { title: 'Energía y Utilities', titleEn: 'Energy & Utilities', icon: Zap },
};

export default function IndustryPage() {
  const { language } = useI18n();
  const params = useParams();
  const slug = params.slug as string;
  const data = industryData[slug] || { title: slug, titleEn: slug, icon: Building2 };
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
              {language === 'es' ? 'Industrias' : 'Industries'}
            </p>
            <h1 className="text-3xl lg:text-4xl font-semibold text-azul-marino dark:text-white">
              {language === 'es' ? data.title : data.titleEn}
            </h1>
          </div>
        </div>
        
        {data.hasSubPages && data.subPages ? (
          <>
            <p className="text-lg text-foreground/60 mb-12 max-w-3xl">
              {language === 'es' 
                ? 'Soluciones especializadas para el sector financiero con enfoque en cumplimiento regulatorio y eficiencia operacional.'
                : 'Specialized solutions for the financial sector with focus on regulatory compliance and operational efficiency.'}
            </p>
            
            <h2 className="text-2xl font-semibold text-azul-marino dark:text-white mb-6">
              {language === 'es' ? 'Soluciones especializadas' : 'Specialized solutions'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {data.subPages.map((subPage) => (
                <Link key={subPage.href} href={subPage.href}>
                  <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-brand hover:shadow-brand-lg transition-all hover:-translate-y-1">
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-2">
                      {language === 'es' ? subPage.title : subPage.titleEn}
                    </h3>
                    <div className="flex items-center gap-2 text-turquesa font-medium">
                      <span>{language === 'es' ? 'Ver más' : 'Learn more'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-card rounded-2xl p-12 text-center">
            <p className="text-foreground/60">
              {language === 'es' ? 'Contenido en desarrollo...' : 'Content in development...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

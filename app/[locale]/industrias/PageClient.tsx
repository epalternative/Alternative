'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Building2, Factory, ShoppingCart, Laptop, Briefcase, Landmark, Heart, Zap, ArrowRight } from 'lucide-react';

const industries = [
  { icon: Building2, title: 'Banca y Servicios Financieros', titleEn: 'Banking & Financial Services', slug: 'banca-servicios-financieros' },
  { icon: Factory, title: 'Manufactura y Logística', titleEn: 'Manufacturing & Logistics', slug: 'manufactura-logistica' },
  { icon: ShoppingCart, title: 'Retail y Comercio', titleEn: 'Retail & Commerce', slug: 'retail-comercio' },
  { icon: Laptop, title: 'Tecnología y Telecomunicaciones', titleEn: 'Technology & Telecom', slug: 'tecnologia-telecomunicaciones' },
  { icon: Briefcase, title: 'Servicios Profesionales', titleEn: 'Professional Services', slug: 'servicios-profesionales' },
  { icon: Landmark, title: 'Gobierno y Sector Público', titleEn: 'Government & Public Sector', slug: 'gobierno-sector-publico' },
  { icon: Heart, title: 'Salud y Farmacéutica', titleEn: 'Healthcare & Pharma', slug: 'salud-farmaceutica' },
  { icon: Zap, title: 'Energía y Utilities', titleEn: 'Energy & Utilities', slug: 'energia-utilities' },
];

export default function IndustriasPage() {
  const language = useLocale();
  const locale = language;
  
  return (
    <div className="min-h-screen bg-blanco-hueso dark:bg-background py-24">
      <div className="container-custom">
        <h1 className="text-4xl lg:text-5xl font-semibold text-azul-marino dark:text-white mb-8">
          {language === 'es' ? 'Industrias' : 'Industries'}
        </h1>
        <p className="text-lg text-foreground/60 mb-12 max-w-2xl">
          {language === 'es' 
            ? 'Experiencia comprobada en sectores regulados y de alta complejidad.'
            : 'Proven experience in regulated and high-complexity sectors.'}
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <Link key={industry.slug} href={`/${locale}/industrias/${industry.slug}`}>
                <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-brand hover:shadow-brand-lg transition-all hover:-translate-y-1 h-full">
                  <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-turquesa" />
                  </div>
                  <h2 className="text-lg font-semibold text-azul-marino dark:text-white mb-2">
                    {language === 'es' ? industry.title : industry.titleEn}
                  </h2>
                  <div className="flex items-center gap-2 text-turquesa font-medium text-sm">
                    <span>{language === 'es' ? 'Ver más' : 'Learn more'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

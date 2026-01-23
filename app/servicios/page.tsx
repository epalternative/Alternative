'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { Settings, Award, FolderKanban, Cpu, Target, Code, ArrowRight } from 'lucide-react';

const services = [
  { icon: Settings, title: 'Optimización de Procesos', titleEn: 'Process Optimization', href: '/servicios/optimizacion-procesos' },
  { icon: Award, title: 'Sistemas de Calidad', titleEn: 'Quality Systems', href: '/servicios/sistemas-calidad' },
  { icon: FolderKanban, title: 'Gestión de Proyectos', titleEn: 'Project Management', href: '/servicios/gestion-proyectos' },
  { icon: Cpu, title: 'Transformación Digital', titleEn: 'Digital Transformation', href: '/servicios/transformacion-digital' },
  { icon: Target, title: 'Consultoría Estratégica', titleEn: 'Strategic Consulting', href: '/servicios/consultoria-estrategica' },
  { icon: Code, title: 'Desarrollo Tecnología', titleEn: 'Technology Development', href: '/servicios/desarrollo-tecnologia' },
];

export default function ServiciosPage() {
  const { language } = useI18n();
  
  return (
    <div className="min-h-screen bg-blanco-hueso dark:bg-background py-24">
      <div className="container-custom">
        <h1 className="text-4xl lg:text-5xl font-semibold text-azul-marino dark:text-white mb-8">
          {language === 'es' ? 'Nuestros Servicios' : 'Our Services'}
        </h1>
        <p className="text-lg text-foreground/60 mb-12 max-w-2xl">
          {language === 'es' 
            ? 'Soluciones integrales de consultoría empresarial para optimizar tu operación.'
            : 'Comprehensive business consulting solutions to optimize your operation.'}
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.href} href={service.href}>
                <div className="bg-white dark:bg-card p-8 rounded-2xl shadow-brand hover:shadow-brand-lg transition-all hover:-translate-y-1">
                  <div className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-turquesa" />
                  </div>
                  <h2 className="text-xl font-semibold text-azul-marino dark:text-white mb-2">
                    {language === 'es' ? service.title : service.titleEn}
                  </h2>
                  <div className="flex items-center gap-2 text-turquesa font-medium">
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

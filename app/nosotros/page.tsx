'use client';

import { useI18n } from '@/lib/i18n/context';
import { Users } from 'lucide-react';

export default function NosotrosPage() {
  const { language } = useI18n();
  
  return (
    <div className="min-h-screen bg-blanco-hueso dark:bg-background py-24">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-turquesa/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-turquesa" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-azul-marino dark:text-white mb-4">
            {language === 'es' ? 'Nosotros' : 'About Us'}
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {language === 'es' 
              ? 'Conoce al equipo detrás de Grupo Alternative.'
              : 'Meet the team behind Grupo Alternative.'}
          </p>
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

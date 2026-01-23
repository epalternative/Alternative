'use client';

import { useI18n } from '@/lib/i18n/context';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactoPage() {
  const { language } = useI18n();
  
  return (
    <div className="min-h-screen bg-blanco-hueso dark:bg-background py-24">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-semibold text-azul-marino dark:text-white mb-4">
            {language === 'es' ? 'Contacto' : 'Contact'}
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {language === 'es' 
              ? 'Agenda un diagnóstico gratuito de 15 minutos.'
              : 'Schedule a free 15-minute diagnosis.'}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-card rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-azul-marino dark:text-white mb-6">
              {language === 'es' ? 'Envíanos un mensaje' : 'Send us a message'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">
                  {language === 'es' ? 'Nombre completo' : 'Full name'}
                </label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gris-arena/30 focus:border-turquesa focus:ring-1 focus:ring-turquesa outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">
                  {language === 'es' ? 'Email corporativo' : 'Corporate email'}
                </label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gris-arena/30 focus:border-turquesa focus:ring-1 focus:ring-turquesa outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">
                  {language === 'es' ? 'Empresa' : 'Company'}
                </label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gris-arena/30 focus:border-turquesa focus:ring-1 focus:ring-turquesa outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">
                  {language === 'es' ? 'Mensaje' : 'Message'}
                </label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gris-arena/30 focus:border-turquesa focus:ring-1 focus:ring-turquesa outline-none transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-turquesa text-azul-marino font-semibold py-4 rounded-xl hover:bg-menta transition-all">
                {language === 'es' ? 'Enviar mensaje' : 'Send message'}
              </button>
            </form>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-card rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-turquesa" />
              </div>
              <div>
                <h3 className="font-semibold text-azul-marino dark:text-white mb-1">Email</h3>
                <p className="text-foreground/60">info@grupoalternative.com</p>
              </div>
            </div>
            <div className="bg-white dark:bg-card rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-turquesa" />
              </div>
              <div>
                <h3 className="font-semibold text-azul-marino dark:text-white mb-1">{language === 'es' ? 'Teléfono' : 'Phone'}</h3>
                <p className="text-foreground/60">+507 6990-8906</p>
              </div>
            </div>
            <div className="bg-white dark:bg-card rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-turquesa" />
              </div>
              <div>
                <h3 className="font-semibold text-azul-marino dark:text-white mb-1">{language === 'es' ? 'Ubicación' : 'Location'}</h3>
                <p className="text-foreground/60">Panamá, Ciudad de Panamá</p>
              </div>
            </div>
            <div className="bg-white dark:bg-card rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-turquesa" />
              </div>
              <div>
                <h3 className="font-semibold text-azul-marino dark:text-white mb-1">{language === 'es' ? 'Horario' : 'Hours'}</h3>
                <p className="text-foreground/60">Lun-Sáb: 08:00 a.m. - 05:00 p.m.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

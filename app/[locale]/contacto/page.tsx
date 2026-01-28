'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-xl border border-gris-arena/30 focus:border-turquesa focus:ring-1 focus:ring-turquesa outline-none transition-all bg-transparent';

export default function ContactoPage() {
  const language = useLocale();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setStatus('loading');

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      fullName: (fd.get('fullName') as string)?.trim() ?? '',
      email: (fd.get('email') as string)?.trim() ?? '',
      phone: (fd.get('phone') as string)?.trim() ?? '',
      company: (fd.get('company') as string)?.trim() ?? '',
      message: (fd.get('message') as string)?.trim() ?? '',
      website: (fd.get('website') as string)?.trim() ?? '',
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string };

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(
          typeof data?.error === 'string' ? data.error : language === 'es' ? 'No se pudo enviar. Intenta de nuevo.' : 'Could not send. Try again.'
        );
        return;
      }
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setErrorMessage(
        language === 'es' ? 'Error de conexión. Verifica tu red e intenta de nuevo.' : 'Connection error. Check your network and try again.'
      );
    }
  }

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

            {status === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-menta/20 border border-oliva/20 text-azul-marino flex items-start gap-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    {language === 'es' ? 'Mensaje enviado correctamente.' : 'Message sent successfully.'}
                  </p>
                  <p className="text-sm mt-1 text-azul-marino/80">
                    {language === 'es' ? 'Te responderemos a la brevedad.' : 'We will reply as soon as possible.'}
                  </p>
                </div>
              </div>
            )}

            {status === 'error' && errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot: oculto, no debe rellenarse */}
              <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground/70 mb-2">
                  {language === 'es' ? 'Nombre completo' : 'Full name'}
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  minLength={2}
                  className={INPUT_CLASS}
                  disabled={status === 'loading'}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-2">
                  {language === 'es' ? 'Email corporativo' : 'Corporate email'}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={INPUT_CLASS}
                  disabled={status === 'loading'}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground/70 mb-2">
                  {language === 'es' ? 'Teléfono' : 'Phone'} ({language === 'es' ? 'opcional' : 'optional'})
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={INPUT_CLASS}
                  disabled={status === 'loading'}
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-foreground/70 mb-2">
                  {language === 'es' ? 'Empresa' : 'Company'} ({language === 'es' ? 'opcional' : 'optional'})
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className={INPUT_CLASS}
                  disabled={status === 'loading'}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-2">
                  {language === 'es' ? 'Mensaje' : 'Message'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  minLength={10}
                  className={`${INPUT_CLASS} resize-none`}
                  disabled={status === 'loading'}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-turquesa text-azul-marino font-semibold py-4 rounded-xl hover:bg-menta transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {language === 'es' ? 'Enviando…' : 'Sending…'}
                  </>
                ) : (
                  language === 'es' ? 'Enviar mensaje' : 'Send message'
                )}
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

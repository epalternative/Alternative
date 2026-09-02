'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle, AlertCircle, ChevronDown, MessageCircle, ArrowRight } from 'lucide-react';

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-xl border border-gris-arena/30 focus:border-turquesa focus:ring-1 focus:ring-turquesa outline-none transition-all bg-white dark:bg-card';

export default function ContactoPage() {
  const language = useLocale();
  const isEs = language === 'es';
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${language}` },
    { label: isEs ? 'Contacto' : 'Contact', href: null },
  ];

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
          typeof data?.error === 'string' ? data.error : isEs ? 'No se pudo enviar. Intenta de nuevo.' : 'Could not send. Try again.'
        );
        return;
      }
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setErrorMessage(
        isEs ? 'Error de conexión. Verifica tu red e intenta de nuevo.' : 'Connection error. Check your network and try again.'
      );
    }
  }

  return (
    <>
      {/* Hero: fondo azul marino, títulos en blanco-hueso, aspecto profesional */}
      <section className="relative bg-azul-marino overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[20%] right-[8%] w-32 h-32 bg-blanco-hueso/10 rounded-2xl rotate-12"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[20%] left-[5%] w-24 h-24 bg-turquesa/10 rounded-2xl -rotate-6"
          />
        </div>

        <div className="container-custom relative z-10 pt-8 pb-16 lg:pb-20">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {idx > 0 && (
                    <ChevronDown className="w-4 h-4 text-blanco-hueso/60 -rotate-90" />
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-blanco-hueso/85 hover:text-blanco-hueso transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-blanco-hueso font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blanco-hueso/15 rounded-2xl flex items-center justify-center border border-blanco-hueso/25">
                  <MessageCircle className="w-8 h-8 text-blanco-hueso" />
                </div>
                <div>
                  <span className="text-blanco-hueso text-sm font-medium uppercase tracking-wider">
                    {isEs ? 'Contacto' : 'Contact'}
                  </span>
                  <p className="text-blanco-hueso/90 text-sm">
                    {isEs ? 'Estamos listos para escucharte' : "We're here to hear from you"}
                  </p>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl text-blanco-hueso font-semibold leading-tight mb-4">
                {isEs ? 'Contacto' : 'Contact'}
              </h1>

              <p className="text-xl md:text-2xl text-blanco-hueso font-medium mb-4">
                {isEs ? 'Agenda un diagnóstico gratuito de 15 minutos.' : 'Schedule a free 15-minute diagnosis.'}
              </p>

              <p className="text-lg md:text-xl text-blanco-hueso/95 mb-8 leading-relaxed">
                {isEs
                  ? 'Cuéntanos tu reto y te proponemos los siguientes pasos. Sin compromiso.'
                  : 'Tell us your challenge and we will propose the next steps. No commitment.'}
              </p>

              <Link
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-6 py-3 rounded-lg hover:bg-menta transition-all duration-300 shadow-lg shadow-turquesa/20 group"
              >
                {isEs ? 'Enviar mensaje' : 'Send message'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Right: tarjeta de contacto resumido */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-blanco-hueso/95 backdrop-blur-xl rounded-3xl p-8 border border-blanco-hueso/20 shadow-brand"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-turquesa" />
                  <div className="w-3 h-3 rounded-full bg-menta" />
                  <span className="ml-auto text-azul-marino/60 text-sm font-medium">
                    {isEs ? 'Datos de contacto' : 'Contact details'}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-turquesa" />
                    </div>
                    <div>
                      <p className="text-azul-marino text-sm font-medium">{isEs ? 'Email' : 'Email'}</p>
                      <p className="text-azul-marino/80 text-sm">info@grupoalternative.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-turquesa" />
                    </div>
                    <div>
                      <p className="text-azul-marino text-sm font-medium">{isEs ? 'Teléfono' : 'Phone'}</p>
                      <p className="text-azul-marino/80 text-sm">+507 6990-8906</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-turquesa" />
                    </div>
                    <div>
                      <p className="text-azul-marino text-sm font-medium">{isEs ? 'Ubicación' : 'Location'}</p>
                      <p className="text-azul-marino/80 text-sm">Panamá, Ciudad de Panamá</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-azul-marino/10 text-center">
                  <p className="text-azul-marino/70 text-sm">
                    Lun–Sáb 08:00 – 17:00
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formulario y datos de contacto */}
      <section id="contact-form" className="scroll-mt-24 py-16 lg:py-24 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-brand">
              <h2 className="text-2xl font-semibold text-azul-marino dark:text-white mb-2">
                {isEs ? 'Envíanos un mensaje' : 'Send us a message'}
              </h2>
              <p className="text-foreground/70 mb-6">
                {isEs ? 'Completa el formulario y te responderemos a la brevedad.' : 'Fill out the form and we will get back to you shortly.'}
              </p>

              {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-menta/20 border border-oliva/20 text-azul-marino flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">
                      {isEs ? 'Mensaje enviado correctamente.' : 'Message sent successfully.'}
                    </p>
                    <p className="text-sm mt-1 text-azul-marino/80">
                      {isEs ? 'Te responderemos a la brevedad.' : 'We will reply as soon as possible.'}
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
                <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                    {isEs ? 'Nombre completo' : 'Full name'}
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
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {isEs ? 'Email corporativo' : 'Corporate email'}
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
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    {isEs ? 'Teléfono' : 'Phone'} ({isEs ? 'opcional' : 'optional'})
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
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    {isEs ? 'Empresa' : 'Company'} ({isEs ? 'opcional' : 'optional'})
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
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {isEs ? 'Mensaje' : 'Message'}
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
                      {isEs ? 'Enviando…' : 'Sending…'}
                    </>
                  ) : (
                    isEs ? 'Enviar mensaje' : 'Send message'
                  )}
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-card rounded-2xl p-6 flex items-start gap-4 shadow-brand">
                <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-turquesa" />
                </div>
                <div>
                  <h3 className="font-semibold text-azul-marino dark:text-white mb-1">Email</h3>
                  <p className="text-foreground/70">info@grupoalternative.com</p>
                </div>
              </div>
              <div className="bg-white dark:bg-card rounded-2xl p-6 flex items-start gap-4 shadow-brand">
                <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-turquesa" />
                </div>
                <div>
                  <h3 className="font-semibold text-azul-marino dark:text-white mb-1">{isEs ? 'Teléfono' : 'Phone'}</h3>
                  <p className="text-foreground/70">+507 6990-8906</p>
                </div>
              </div>
              <div className="bg-white dark:bg-card rounded-2xl p-6 flex items-start gap-4 shadow-brand">
                <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-turquesa" />
                </div>
                <div>
                  <h3 className="font-semibold text-azul-marino dark:text-white mb-1">{isEs ? 'Ubicación' : 'Location'}</h3>
                  <p className="text-foreground/70">Panamá, Ciudad de Panamá</p>
                </div>
              </div>
              <div className="bg-white dark:bg-card rounded-2xl p-6 flex items-start gap-4 shadow-brand">
                <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-turquesa" />
                </div>
                <div>
                  <h3 className="font-semibold text-azul-marino dark:text-white mb-1">{isEs ? 'Horario' : 'Hours'}</h3>
                  <p className="text-foreground/70">Lun-Sáb: 08:00 a.m. - 05:00 p.m.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const AnimatedSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function ContactPage() {
  const { language } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, label: language === 'es' ? 'Dirección' : 'Address', value: 'Panamá, Ciudad de Panamá', href: null },
    { icon: Phone, label: language === 'es' ? 'Teléfono' : 'Phone', value: '+507 6990-8906', href: 'tel:+50769908906' },
    { icon: Mail, label: 'Email', value: 'info@grupoalternative.com', href: 'mailto:info@grupoalternative.com' },
    { icon: Clock, label: language === 'es' ? 'Horario' : 'Schedule', value: language === 'es' ? 'Lun-Sáb: 08:00 a.m. - 05:00 p.m.' : 'Mon-Sat: 08:00 AM - 05:00 PM', href: null },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-azul-marino overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="absolute top-20 right-[10%] w-20 h-20 bg-turquesa/20 rounded-xl rotate-12" />
        <div className="absolute bottom-20 left-[5%] w-16 h-16 bg-menta/20 rounded-xl -rotate-6" />
        
        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-turquesa font-semibold text-sm uppercase tracking-wider mb-4"
            >
              {language === 'es' ? 'Contacto' : 'Contact'}
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6"
            >
              {language === 'es' 
                ? <>Conversemos sobre tu <span className="text-turquesa">Proyecto</span></>
                : <>Let's Talk About Your <span className="text-turquesa">Project</span></>}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-white/70"
            >
              {language === 'es'
                ? 'Estamos listos para ayudarte a alcanzar tus objetivos empresariales.'
                : 'We are ready to help you achieve your business goals.'}
            </motion.p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 65C1200 70 1320 70 1380 70L1440 70V100H0Z" className="fill-blanco-hueso dark:fill-background"/>
          </svg>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <AnimatedSection className="lg:col-span-3">
              <div className="bg-white dark:bg-card rounded-3xl p-8 lg:p-12 shadow-brand">
                <h2 className="text-2xl font-semibold text-azul-marino dark:text-white mb-6">
                  {language === 'es' ? 'Envíanos un Mensaje' : 'Send Us a Message'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-2">
                        {language === 'es' ? 'Nombre *' : 'Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-blanco-hueso dark:bg-secondary border border-gris-arena/30 dark:border-white/10 rounded-xl focus:outline-none focus:border-turquesa transition-colors"
                        placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-blanco-hueso dark:bg-secondary border border-gris-arena/30 dark:border-white/10 rounded-xl focus:outline-none focus:border-turquesa transition-colors"
                        placeholder="email@ejemplo.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-2">
                        {language === 'es' ? 'Teléfono' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-blanco-hueso dark:bg-secondary border border-gris-arena/30 dark:border-white/10 rounded-xl focus:outline-none focus:border-turquesa transition-colors"
                        placeholder="+507 0000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-2">
                        {language === 'es' ? 'Empresa' : 'Company'}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-blanco-hueso dark:bg-secondary border border-gris-arena/30 dark:border-white/10 rounded-xl focus:outline-none focus:border-turquesa transition-colors"
                        placeholder={language === 'es' ? 'Nombre de tu empresa' : 'Your company name'}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-2">
                      {language === 'es' ? 'Mensaje *' : 'Message *'}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-blanco-hueso dark:bg-secondary border border-gris-arena/30 dark:border-white/10 rounded-xl focus:outline-none focus:border-turquesa transition-colors resize-none"
                      placeholder={language === 'es' ? 'Cuéntanos sobre tu proyecto...' : 'Tell us about your project...'}
                    />
                  </div>
                  
                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-2 text-oliva bg-menta/30 p-4 rounded-xl">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>{language === 'es' ? '¡Mensaje enviado con éxito! Te contactaremos pronto.' : 'Message sent successfully! We\'ll contact you soon.'}</span>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-100 dark:bg-red-900/30 p-4 rounded-xl">
                      <AlertCircle className="w-5 h-5" />
                      <span>{language === 'es' ? 'Error al enviar. Por favor intenta de nuevo.' : 'Error sending. Please try again.'}</span>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full inline-flex items-center justify-center gap-3 bg-turquesa text-azul-marino font-semibold px-8 py-4 rounded-xl hover:bg-menta transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting 
                      ? (language === 'es' ? 'Enviando...' : 'Sending...') 
                      : (language === 'es' ? 'Enviar Mensaje' : 'Send Message')}
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </AnimatedSection>
            
            {/* Contact Info */}
            <AnimatedSection delay={0.2} className="lg:col-span-2">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-azul-marino dark:text-white mb-6">
                  {language === 'es' ? 'Información de Contacto' : 'Contact Information'}
                </h2>
                
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex items-start gap-4 bg-white dark:bg-card rounded-2xl p-6 shadow-brand-sm hover:shadow-brand transition-all duration-300">
                      <div className="w-12 h-12 bg-turquesa/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-turquesa" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground/60 mb-1">{info.label}</p>
                        <p className="font-medium text-azul-marino dark:text-white">{info.value}</p>
                      </div>
                    </div>
                  );
                  
                  return info.href ? (
                    <a key={idx} href={info.href} className="block hover:-translate-y-1 transition-transform">
                      {content}
                    </a>
                  ) : (
                    <div key={idx}>{content}</div>
                  );
                })}
                
                {/* Map */}
                <div className="rounded-2xl overflow-hidden shadow-brand h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252230.02028967964!2d-79.62091065!3d9.0811886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8faca8f1dbe80363%3A0xaba25df1f042c10e!2sPanama%20City%2C%20Panama!5e0!3m2!1sen!2s!4v1699900000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

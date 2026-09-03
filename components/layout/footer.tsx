'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { LINKEDIN_URL } from '@/lib/seo';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Linkedin,
  ArrowRight,
  Send
} from 'lucide-react';

export function Footer() {
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) {
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
      return;
    }
    // Simulate subscription success
    setSubscribeStatus('success');
    setEmail('');
    setTimeout(() => setSubscribeStatus('idle'), 3000);
  };

  const quickLinks = [
    { href: `/${locale}`, label: locale === 'es' ? 'Inicio' : 'Home' },
    { href: `/${locale}/nosotros`, label: locale === 'es' ? 'Nosotros' : 'About Us' },
    { href: `/${locale}/casos-exito`, label: locale === 'es' ? 'Casos de Éxito' : 'Success Stories' },
    { href: `/${locale}/recursos`, label: locale === 'es' ? 'Recursos' : 'Resources' },
    { href: `/${locale}/blog`, label: locale === 'es' ? 'Blog' : 'Blog' },
    { href: `/${locale}/contacto`, label: locale === 'es' ? 'Contacto' : 'Contact' },
  ];

  const serviceLinks = [
    { href: `/${locale}/servicios/optimizacion-procesos`, label: locale === 'es' ? 'Optimización de Procesos' : 'Process Optimization' },
    { href: `/${locale}/servicios/sistemas-calidad`, label: locale === 'es' ? 'Sistemas de Calidad' : 'Quality Systems' },
    { href: `/${locale}/servicios/gestion-proyectos`, label: locale === 'es' ? 'Gestión de Proyectos' : 'Project Management' },
    { href: `/${locale}/servicios/transformacion-digital`, label: locale === 'es' ? 'Transformación Digital' : 'Digital Transformation' },
    { href: `/${locale}/servicios/consultoria-estrategica`, label: locale === 'es' ? 'Consultoría Estratégica' : 'Strategic Consulting' },
    { href: `/${locale}/servicios/desarrollo-tecnologia`, label: locale === 'es' ? 'Desarrollo & Tecnología' : 'Development & Technology' },
  ];

  return (
    <footer className="bg-azul-marino relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Main Footer Content */}
      <div className="container-custom relative z-10 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="inline-flex items-center gap-3 mb-6">
              <div className="relative w-48 h-12 rounded-xl overflow-hidden">
                <Image
                  src="/logo_alternative_horizontal_footer.webp"
                  alt="Alternative Logo"
                  fill
                  className="object-contain"
                />
              </div>
               
            </Link>
            <p className="text-white/60 mb-6 leading-relaxed">
              {locale === 'es' 
                ? 'Impulsamos tu empresa estratégicamente con soluciones integrales en consultoría, desarrollo de software e infraestructura tecnológica.'
                : 'We strategically boost your business with comprehensive solutions in consulting, software development, and technological infrastructure.'}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: LINKEDIN_URL, label: 'LinkedIn' },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white/70 hover:bg-turquesa hover:text-azul-marino transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">
              {locale === 'es' ? 'Enlaces Rápidos' : 'Quick Links'}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-turquesa transition-colors inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">
              {locale === 'es' ? 'Servicios' : 'Services'}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-turquesa transition-colors inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">
              {locale === 'es' ? 'Contacto' : 'Contact'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                <span className="text-white/60">
                  Panamá, Ciudad de Panamá
                </span>
              </li>
              <li>
                <a href="tel:+50769908906" className="flex items-center gap-3 text-white/60 hover:text-turquesa transition-colors">
                  <Phone className="w-5 h-5 text-turquesa flex-shrink-0" />
                  +507 6990-8906
                </a>
              </li>
              <li>
                <a href="mailto:info@grupoalternative.com" className="flex items-center gap-3 text-white/60 hover:text-turquesa transition-colors">
                  <Mail className="w-5 h-5 text-turquesa flex-shrink-0" />
                  info@grupoalternative.com
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-turquesa transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-turquesa flex-shrink-0" />
                  LinkedIn
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-turquesa flex-shrink-0 mt-0.5" />
                <span className="text-white/60">
                  {locale === 'es' ? 'Lun-Sáb: 08:00 a.m. - 05:00 p.m.' : 'Mon-Sat: 08:00 AM - 05:00 PM'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10 pt-8 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold text-lg mb-2">
                {locale === 'es' ? 'Suscríbete a Nuestro Newsletter' : 'Subscribe to Our Newsletter'}
              </h4>
              <p className="text-white/60">
                {locale === 'es' 
                  ? 'Recibe insights y tendencias de consultoría directamente en tu correo.'
                  : 'Get consulting insights and trends delivered directly to your inbox.'}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={locale === 'es' ? 'Tu correo electrónico' : 'Your email address'}
                  className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-turquesa w-full lg:w-72"
                />
                <button 
                  onClick={handleSubscribe}
                  className="bg-turquesa text-azul-marino font-semibold px-6 py-3 rounded-xl hover:bg-menta transition-all duration-300 flex items-center gap-2 flex-shrink-0"
                >
                  <Send className="w-5 h-5" />
                  <span className="hidden sm:inline">{locale === 'es' ? 'Suscribir' : 'Subscribe'}</span>
                </button>
              </div>
              {subscribeStatus === 'success' && (
                <p className="text-menta text-sm">{locale === 'es' ? '¡Gracias por suscribirte!' : 'Thanks for subscribing!'}</p>
              )}
              {subscribeStatus === 'error' && (
                <p className="text-red-400 text-sm">{locale === 'es' ? 'Por favor ingresa un email válido' : 'Please enter a valid email'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Grupo Alternative. {locale === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
            </p>
            <p className="text-white/50 text-sm">
              {locale === 'es' ? 'Consultores Tecnológicos Empresariales' : 'Enterprise Technology Consultants'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

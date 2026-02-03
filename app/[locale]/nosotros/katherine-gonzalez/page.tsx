'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';

// Social icon components - accept className for responsive sizing
const XIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ThreadsIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`}>
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068V12c.015-3.503.87-6.347 2.54-8.454C5.893 1.467 8.634.16 12.196.16c3.12.016 5.63 1.013 7.46 2.964 1.682 1.794 2.544 4.18 2.561 7.089l.003.215-.003.173c-.002.144-.005.288-.01.432-.077 2.392-.656 4.39-1.723 5.942-1.198 1.742-2.952 2.789-5.213 3.112-.673.096-1.37.145-2.072.145-1.39 0-2.624-.203-3.67-.603l-.028-.011.028.011c.68.258 1.37.466 2.072.621.73.162 1.47.244 2.2.244 2.74 0 5.023-.888 6.792-2.64 1.63-1.615 2.537-3.78 2.694-6.437.022-.372.033-.747.033-1.123 0-.316-.008-.631-.025-.945-.158-2.97-1.094-5.357-2.784-7.096-1.818-1.87-4.294-2.82-7.361-2.82-3.24 0-5.758 1.158-7.48 3.44C2.74 5.988 1.93 8.67 1.93 12c0 3.358.818 6.029 2.43 7.94 1.51 1.787 3.67 2.696 6.422 2.696.138 0 .277-.002.416-.006.16-.004.32-.011.48-.02.145-.008.29-.018.434-.03.124-.01.247-.022.37-.035 1.955-.22 3.54-1.08 4.712-2.556.956-1.204 1.435-2.791 1.424-4.72-.008-1.465-.331-2.68-.96-3.616-.693-1.032-1.74-1.713-3.113-2.024-.414-.094-.862-.14-1.333-.14-1.39 0-2.513.415-3.34 1.233-.88.87-1.326 2.076-1.326 3.58 0 1.26.352 2.264 1.047 2.984.645.67 1.514 1.008 2.583 1.008.87 0 1.59-.264 2.138-.785.505-.48.762-1.118.762-1.897 0-.579-.176-1.035-.524-1.356-.32-.295-.754-.445-1.29-.445-.354 0-.666.086-.925.257-.227.149-.34.323-.34.518 0 .135.06.253.177.351.088.073.18.13.274.17l.14.054-.128.057c-.31.137-.645.206-.998.206-.547 0-.998-.17-1.34-.504-.372-.365-.56-.884-.56-1.545 0-.873.313-1.58.932-2.1.57-.48 1.307-.725 2.19-.725.984 0 1.808.296 2.45.88.69.627 1.04 1.487 1.04 2.556 0 1.221-.414 2.225-1.232 2.984-.759.705-1.728 1.063-2.88 1.063-1.377 0-2.51-.438-3.366-1.302-.906-.913-1.365-2.186-1.365-3.786 0-1.947.577-3.513 1.716-4.654 1.077-1.08 2.527-1.628 4.31-1.628.626 0 1.222.067 1.775.2 1.728.415 3.058 1.33 3.955 2.72.823 1.275 1.24 2.836 1.24 4.637 0 2.287-.564 4.114-1.678 5.434-1.26 1.493-3.083 2.319-5.417 2.456-.21.012-.42.02-.633.025-.187.004-.375.006-.564.006z" />
  </svg>
);

const InstagramIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedInIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function KatherineGonzalezPage() {
  const locale = useLocale();
  const isEs = locale === 'es';

  const socialLinks = [
    { name: 'X (Twitter)', icon: XIcon, href: '#' },
    { name: 'Threads', icon: ThreadsIcon, href: '#' },
    { name: 'Instagram', icon: InstagramIcon, href: '#' },
    { name: 'LinkedIn', icon: LinkedInIcon, href: 'https://linkedin.com/' },
    { name: 'Email', icon: Mail, href: 'mailto:kgonzalez@grupoalternative.com', isEmail: true },
  ];

  return (
    <section className="relative min-h-screen bg-azul-marino overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/kgfoto.webp"
          alt="Katherine González"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay según manual de marca */}
        <div className="absolute inset-0 bg-[#605b51] mix-blend-multiply opacity-60" />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-azul-marino/90 via-azul-marino/70 to-transparent" />
      </div>

      {/* Decorative geometric elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Square elements as per cursorrules */}
        <motion.div
          animate={{ rotate: [12, 20, 12] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] right-[8%] w-24 h-24 border-2 border-turquesa/20 rounded-2xl"
        />
        <motion.div
          animate={{ rotate: [-6, -15, -6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[20%] left-[5%] w-16 h-16 bg-menta/10 rounded-xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[40%] right-[25%] w-20 h-20 border border-violeta/10 rounded-2xl rotate-45"
        />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{
               backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                                 linear-gradient(to bottom, white 1px, transparent 1px)`,
               backgroundSize: '80px 80px'
             }} 
        />
      </div>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-24 left-6 lg:left-12 z-20"
      >
        <Link
          href={`/${locale}/nosotros`}
          className="inline-flex items-center gap-2 text-white/60 hover:text-turquesa 
                     transition-colors group text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {isEs ? 'Volver' : 'Back'}
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container-custom w-full">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
            {/* Left - Text Content (Centered) */}
            <div className="flex flex-col items-center text-center">
              {/* Title/Role */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-turquesa uppercase tracking-[0.25em] text-sm font-medium mb-6"
              >
                {isEs ? 'Fundadora & CEO' : 'Founder & CEO'}
              </motion.span>

              {/* Name - Large Display */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-semibold leading-[0.95] mb-8"
              >
                Katherine
                <br />
                González
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/70 text-lg leading-relaxed max-w-lg mb-6"
              >
                {isEs
                  ? 'Líder visionaria con más de 15 años transformando organizaciones en Latinoamérica. Especialista en consultoría estratégica, optimización de procesos y transformación digital.'
                  : 'Visionary leader with over 15 years transforming organizations in Latin America. Specialist in strategic consulting, process optimization and digital transformation.'}
              </motion.p>

              {/* Underlined link text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link 
                  href={`/${locale}/contacto`}
                  className="text-white/80 hover:text-turquesa transition-colors underline underline-offset-4"
                >
                  {isEs ? 'Agenda una consulta estratégica' : 'Schedule a strategic consultation'}
                </Link>
              </motion.div>
            </div>

            {/* Right - Social Icons (Large Circular Buttons) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 lg:flex-col lg:gap-5 max-w-xs lg:max-w-none"
            >
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center 
                             shadow-xl transition-all duration-300 border-2
                             ${social.isEmail 
                               ? 'bg-turquesa border-turquesa text-white hover:bg-menta hover:border-menta hover:text-azul-marino' 
                               : 'bg-white border-white/20 text-turquesa hover:bg-turquesa hover:text-white'
                             }`}
                  aria-label={social.name}
                >
                  <social.icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

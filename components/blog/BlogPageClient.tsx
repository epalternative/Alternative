'use client';

import React, { useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import type { BlogPost } from '@/lib/blog';
import {
  Search,
  ArrowRight,
  Bell,
  Clock,
  FileText,
  ChevronRight,
} from 'lucide-react';

const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface BlogPageClientProps {
  initialPosts: BlogPost[];
}

export function BlogPageClient({ initialPosts: posts }: BlogPageClientProps) {
  const locale = useLocale() as 'es' | 'en';
  const t = useTranslations('blog');
  const tCommon = useTranslations('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return Array.from(set).map((cat) => {
      const p = posts.find((x) => x.category === cat);
      return {
        id: cat,
        label: p?.categoryLabel ?? cat,
        labelEn: p?.categoryLabelEn ?? cat,
      };
    });
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let list = posts;
    if (activeCategory !== 'all') list = list.filter((p) => p.category === activeCategory);
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          (locale === 'es' ? p.title : p.titleEn).toLowerCase().includes(q) ||
          (locale === 'es' ? p.excerpt : p.excerptEn).toLowerCase().includes(q)
      );
    }
    return list;
  }, [posts, activeCategory, searchTerm, locale]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      locale === 'es'
        ? '¡Gracias por suscribirte! Te notificaremos cuando publiquemos nuevo contenido.'
        : "Thanks for subscribing! We'll notify you when we publish new content."
    );
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return locale === 'es'
      ? d.toLocaleDateString('es-PA', { day: 'numeric', month: 'long', year: 'numeric' })
      : d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center bg-azul-marino overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        <div className="absolute top-20 right-[10%] w-20 h-20 bg-turquesa/20 rounded-xl rotate-12 animate-float-slow" />
        <div className="absolute bottom-20 left-[5%] w-16 h-16 bg-menta/20 rounded-xl -rotate-6 animate-float" />
        <div className="container-custom relative z-10 pt-28 pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-turquesa font-semibold text-sm uppercase tracking-wider mb-4"
            >
              {t('badge')}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6"
            >
              {t('title')} <span className="text-turquesa">{t('titleHighlight')}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-white/80"
            >
              {t('subtitle')}
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 80L60 70C120 60 240 40 360 30C480 20 600 20 720 25C840 30 960 40 1080 45C1200 50 1320 50 1380 50L1440 50V80H0Z"
              className="fill-blanco-hueso dark:fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Main: grid + sidebar */}
      <section className="py-16 lg:py-24 bg-blanco-hueso dark:bg-background">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-azul-marino/50 dark:text-white/50" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-card border border-gris-arena/30 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquesa/50 focus:border-turquesa text-azul-marino dark:text-white transition-all duration-300"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'bg-turquesa text-azul-marino'
                    : 'bg-white dark:bg-card text-azul-marino/70 dark:text-white/70 hover:bg-turquesa/10 hover:text-turquesa border border-gris-arena/20 dark:border-white/10'
                }`}
              >
                <FileText className="w-4 h-4" />
                {t('allPosts')}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-turquesa text-azul-marino'
                      : 'bg-white dark:bg-card text-azul-marino/70 dark:text-white/70 hover:bg-turquesa/10 hover:text-turquesa border border-gris-arena/20 dark:border-white/10'
                  }`}
                >
                  {locale === 'es' ? cat.label : cat.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <div>
              {filteredPosts.length === 0 ? (
                <AnimatedSection>
                  <div className="bg-white dark:bg-card rounded-2xl p-12 text-center border border-gris-arena/20 dark:border-white/10">
                    <p className="text-azul-marino/70 dark:text-white/70">{t('noResults')}</p>
                  </div>
                </AnimatedSection>
              ) : (
                <motion.div
                  className="grid md:grid-cols-2 gap-8"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.08 },
                    },
                  }}
                >
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.slug}
                      variants={{
                        hidden: { opacity: 0, y: 24 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="group block h-full bg-white dark:bg-card rounded-2xl overflow-hidden shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 border border-gris-arena/10 dark:border-white/5"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden">
                          {post.heroImage ? (
                            <Image
                              src={post.heroImage}
                              alt={locale === 'es' ? (post.heroImageAlt ?? post.title) : (post.heroImageAltEn ?? post.titleEn)}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-turquesa/20 to-violeta/20 flex items-center justify-center">
                              <FileText className="w-16 h-16 text-turquesa/60" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-azul-marino/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="absolute top-4 left-4 px-3 py-1.5 bg-turquesa/90 text-azul-marino text-xs font-semibold rounded-lg">
                            {locale === 'es' ? post.categoryLabel : post.categoryLabelEn}
                          </span>
                          <span className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white/90 text-sm">
                            <Clock className="w-4 h-4" />
                            {t('readingTime', { minutes: post.readingTimeMinutes })}
                          </span>
                        </div>
                        <div className="p-6">
                          <time className="text-body-sm text-azul-marino/60 dark:text-white/60">
                            {t('publishedOn')} {formatDate(post.publishedAt)}
                          </time>
                          <h2 className="mt-2 text-xl font-semibold text-azul-marino dark:text-white group-hover:text-turquesa transition-colors duration-300 line-clamp-2">
                            {locale === 'es' ? post.title : post.titleEn}
                          </h2>
                          <p className="mt-2 text-body text-azul-marino/70 dark:text-white/70 line-clamp-2">
                            {locale === 'es' ? post.excerpt : post.excerptEn}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-2 text-turquesa font-medium text-sm group-hover:gap-3 transition-all duration-300">
                            {tCommon('readMore')}
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </motion.div>
              )}

              {filteredPosts.length > 0 && posts.length <= 3 && (
                <AnimatedSection delay={0.2} className="mt-12 text-center">
                  <p className="text-body-sm text-azul-marino/60 dark:text-white/60">
                    {t('comingSoon')}
                  </p>
                </AnimatedSection>
              )}
            </div>

            <aside className="lg:sticky lg:top-28 h-fit space-y-8">
              <AnimatedSection delay={0.1}>
                <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-brand border border-gris-arena/10 dark:border-white/5">
                  <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-turquesa" />
                    {t('allPosts')}
                  </h3>
                  <ul className="space-y-2">
                    {posts.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/${locale}/blog/${p.slug}`}
                          className="flex items-start gap-2 py-2 px-3 -mx-3 rounded-lg text-azul-marino dark:text-white hover:bg-turquesa/10 hover:text-turquesa transition-colors duration-200 group"
                        >
                          <ChevronRight className="w-4 h-4 mt-0.5 text-turquesa/60 group-hover:text-turquesa shrink-0" />
                          <span className="text-body-sm line-clamp-2">
                            {locale === 'es' ? p.title : p.titleEn}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="bg-violeta rounded-2xl p-6 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <Bell className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t('newsletterTitle')}</h3>
                  <p className="text-white/85 text-sm mb-4">{t('newsletterSubtitle')}</p>
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <input
                      type="email"
                      required
                      placeholder={t('newsletterEmailPlaceholder')}
                      className="w-full px-4 py-3 rounded-lg bg-white/15 border border-white/20 placeholder:text-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                    />
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-white text-violeta font-semibold px-4 py-3 rounded-lg hover:bg-white/90 transition-all duration-300"
                    >
                      {t('newsletterSubmit')}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </AnimatedSection>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

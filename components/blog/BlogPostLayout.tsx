'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { getRelatedPosts, getAllPosts } from '@/lib/blog';
import type { BlogPost } from '@/lib/blog';
import {
  Clock,
  Calendar,
  User,
  Share2,
  Linkedin,
  Twitter,
  Mail,
  FileText,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  List,
  X,
} from 'lucide-react';

export interface TocItem {
  id: string;
  label: string;
  labelEn: string;
  level: 2 | 3; // h2 or h3
}

interface BlogPostLayoutProps {
  post: BlogPost;
  locale: 'es' | 'en';
  tocItems: TocItem[];
  children: React.ReactNode;
}

export function BlogPostLayout({ post, locale, tocItems, children }: BlogPostLayoutProps) {
  const [copied, setCopied] = useState(false);
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const related = getRelatedPosts(post.slug, 3);
  const allPostsByDate = useMemo(
    () => [...getAllPosts()].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    []
  );
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://grupoalternative.com';
  const postUrl = `${baseUrl}/${locale}/blog/${post.slug}`;
  const title = locale === 'es' ? post.title : post.titleEn;
  const shareTitle = encodeURIComponent(title);

  const handleShare = (channel: 'linkedin' | 'twitter' | 'email' | 'copy') => {
    const url = encodeURIComponent(postUrl);
    if (channel === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=600');
    } else if (channel === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${shareTitle}`, '_blank', 'width=600,height=400');
    } else if (channel === 'email') {
      window.location.href = `mailto:?subject=${shareTitle}&body=${postUrl}`;
    } else {
      navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return locale === 'es'
      ? d.toLocaleDateString('es-PA', { day: 'numeric', month: 'long', year: 'numeric' })
      : d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <>
      <ReadingProgress />
      <article className="min-h-screen bg-blanco-hueso dark:bg-background">
        {/* Hero */}
        <header className="relative bg-azul-marino overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>
          <div className="absolute top-20 right-[10%] w-24 h-24 bg-turquesa/20 rounded-xl rotate-12 animate-float-slow" />
          <div className="absolute bottom-20 left-[10%] w-20 h-20 bg-menta/20 rounded-xl -rotate-6 animate-float" />
          <div className="container-custom relative z-10 pt-28 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              {/* Breadcrumb: Inicio > Blog > Categoría */}
              <nav className="mb-6" aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Link
                      href={`/${locale}`}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {locale === 'es' ? 'Inicio' : 'Home'}
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-white/50 -rotate-90 shrink-0" />
                    <Link
                      href={`/${locale}/blog`}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {locale === 'es' ? 'Blog' : 'Blog'}
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-white/50 -rotate-90 shrink-0" />
                    <span className="text-white font-medium">
                      {locale === 'es' ? post.categoryLabel : post.categoryLabelEn}
                    </span>
                  </li>
                </ol>
              </nav>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
                {title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80 text-body-sm">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-turquesa" />
                  {locale === 'es' ? post.author.name : post.author.nameEn}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-turquesa" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-turquesa" />
                  {post.readingTimeMinutes} {locale === 'es' ? 'min lectura' : 'min read'}
                </span>
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full">
              <path
                d="M0 60L48 52C96 44 192 28 288 20C384 12 480 12 576 16C672 20 768 28 864 32C960 36 1056 36 1152 34C1248 32 1344 28 1392 26L1440 24V60H0Z"
                className="fill-blanco-hueso dark:fill-background"
              />
            </svg>
          </div>
        </header>

        {/* Content + Sidebar */}
        <div className="container-custom py-12 lg:py-20 relative">
          <div
            className={`grid gap-12 lg:gap-16 transition-[grid-template-columns] duration-300 ${
              leftPanelOpen ? 'lg:grid-cols-[240px_1fr_280px]' : 'lg:grid-cols-[0_1fr_280px]'
            }`}
          >
            {/* Left: panel artículos (estilo servicios/industrias - limpio, no molesta) */}
            <aside
              className={`hidden lg:block shrink-0 min-w-0 overflow-hidden transition-all duration-300 ${
                leftPanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="lg:sticky lg:top-28 w-[240px]">
                <div className="rounded-xl border border-gris-arena/20 dark:border-white/10 bg-white/80 dark:bg-card/80 backdrop-blur-sm overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gris-arena/15 dark:border-white/10">
                    <span className="text-sm font-medium text-azul-marino dark:text-white">
                      {locale === 'es' ? 'Artículos' : 'Articles'}
                    </span>
                    <button
                      onClick={() => setLeftPanelOpen(false)}
                      className="p-1.5 rounded-md text-azul-marino/50 dark:text-white/50 hover:bg-turquesa/10 hover:text-turquesa transition-colors"
                      aria-label={locale === 'es' ? 'Ocultar panel' : 'Hide panel'}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                  <nav className="p-2 max-h-[55vh] overflow-y-auto" aria-label={locale === 'es' ? 'Listado de artículos del blog' : 'Blog articles list'}>
                    {allPostsByDate.map((p) => {
                      const isCurrent = p.slug === post.slug;
                      return (
                        <Link
                          key={p.slug}
                          href={`/${locale}/blog/${p.slug}`}
                          className={`flex flex-col gap-0.5 py-2.5 px-3 rounded-lg text-sm transition-colors duration-200 ${
                            isCurrent
                              ? 'bg-turquesa/15 text-turquesa font-medium'
                              : 'text-azul-marino/75 dark:text-white/75 hover:bg-gris-arena/15 dark:hover:bg-white/10 hover:text-azul-marino dark:hover:text-white'
                          }`}
                        >
                          <span className="line-clamp-2 leading-snug">{locale === 'es' ? p.title : p.titleEn}</span>
                          <span className="text-xs opacity-70 mt-0.5">
                            {formatDate(p.publishedAt)}
                          </span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="min-w-0">
              {/* Toggle to show left panel when closed */}
              {!leftPanelOpen && (
                <div className="mb-6">
                  <button
                    onClick={() => setLeftPanelOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-card rounded-xl shadow-brand border border-gris-arena/20 dark:border-white/10 text-azul-marino dark:text-white text-sm font-medium hover:bg-turquesa/10 hover:text-turquesa transition-all duration-300"
                    aria-label={locale === 'es' ? 'Mostrar todos los artículos' : 'Show all articles'}
                  >
                    <List className="w-4 h-4" />
                    <ChevronRight className="w-4 h-4" />
                    {locale === 'es' ? 'Ver todos los artículos' : 'View all articles'}
                  </button>
                </div>
              )}
              {post.heroImage && (
                <motion.figure
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative aspect-video rounded-2xl overflow-hidden mb-10 shadow-brand"
                >
                  <Image
                    src={post.heroImage}
                    alt={locale === 'es' ? (post.heroImageAlt ?? post.title) : (post.heroImageAltEn ?? post.titleEn)}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 70vw"
                  />
                </motion.figure>
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {children}
              </motion.div>

              {/* Author box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-16 p-8 bg-white dark:bg-card rounded-2xl border border-gris-arena/20 dark:border-white/10 shadow-brand"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-20 h-20 bg-turquesa/20 rounded-2xl flex items-center justify-center shrink-0">
                    <User className="w-10 h-10 text-turquesa" />
                  </div>
                  <div>
                    <p className="text-body-sm text-turquesa font-medium mb-1">
                      {locale === 'es' ? post.author.role : post.author.roleEn}
                    </p>
                    <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-2">
                      {locale === 'es' ? post.author.name : post.author.nameEn}
                    </h3>
                    {post.author.certifications && (
                      <p className="text-body-sm text-azul-marino/60 dark:text-white/60 mb-3">
                        {post.author.certifications}
                      </p>
                    )}
                    <p className="text-body text-azul-marino/80 dark:text-white/80">
                      {locale === 'es' ? post.author.bio : post.author.bioEn}
                    </p>
                    {post.author.link && (
                      <Link
                        href={post.author.link}
                        className="inline-flex items-center gap-2 mt-4 text-turquesa font-medium hover:text-turquesa/80 transition-colors"
                      >
                        {locale === 'es' ? 'Conoce al equipo' : 'Meet the team'}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Share */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-12 pt-8 border-t border-gris-arena/20 dark:border-white/10"
              >
                <p className="text-body-sm font-medium text-azul-marino dark:text-white mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-turquesa" />
                  {locale === 'es' ? 'Comparte este artículo' : 'Share this article'}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-azul-marino/10 dark:bg-white/10 text-azul-marino dark:text-white rounded-lg hover:bg-turquesa/20 hover:text-turquesa transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-azul-marino/10 dark:bg-white/10 text-azul-marino dark:text-white rounded-lg hover:bg-turquesa/20 hover:text-turquesa transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('email')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-azul-marino/10 dark:bg-white/10 text-azul-marino dark:text-white rounded-lg hover:bg-turquesa/20 hover:text-turquesa transition-all duration-300"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-azul-marino/10 dark:bg-white/10 text-azul-marino dark:text-white rounded-lg hover:bg-turquesa/20 hover:text-turquesa transition-all duration-300"
                    aria-label="Copy link"
                  >
                    {copied ? (locale === 'es' ? '¡Enlace copiado!' : 'Link copied!') : (locale === 'es' ? 'Copiar enlace' : 'Copy link')}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Sidebar: TOC + Related */}
            <aside className="lg:sticky lg:top-28 h-fit space-y-8">
              {tocItems.length > 0 && (
                <nav className="bg-white dark:bg-card rounded-2xl p-6 shadow-brand border border-gris-arena/10 dark:border-white/5">
                  <h3 className="text-sm font-semibold text-azul-marino dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-turquesa" />
                    {locale === 'es' ? 'En este artículo' : 'In this article'}
                  </h3>
                  <ul className="space-y-2">
                    {tocItems.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`block py-2 px-3 -mx-3 rounded-lg text-body-sm text-azul-marino/80 dark:text-white/80 hover:bg-turquesa/10 hover:text-turquesa transition-colors duration-200 ${
                            item.level === 3 ? 'pl-6' : ''
                          }`}
                        >
                          {locale === 'es' ? item.label : item.labelEn}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              {related.length > 0 && (
                <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-brand border border-gris-arena/10 dark:border-white/5">
                  <h3 className="text-sm font-semibold text-azul-marino dark:text-white uppercase tracking-wider mb-4">
                    {locale === 'es' ? 'Artículos relacionados' : 'Related articles'}
                  </h3>
                  <ul className="space-y-4">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/${locale}/blog/${p.slug}`}
                          className="group flex items-start gap-2 text-body-sm text-azul-marino dark:text-white hover:text-turquesa transition-colors duration-200"
                        >
                          <ChevronRight className="w-4 h-4 mt-0.5 text-turquesa/60 group-hover:text-turquesa shrink-0" />
                          <span className="line-clamp-2">{locale === 'es' ? p.title : p.titleEn}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}

/**
 * SEO utilities — single source of truth for URL generation
 * across canonical, hreflang, sitemap, and Open Graph tags.
 */

import type { Metadata } from 'next';
import { getRouteMeta } from '@/lib/seo/routes';

/** Base URL without www and without trailing slash */
export const SITE_URL = 'https://grupoalternative.com';

export type Locale = 'es' | 'en';

/** Ruta de la imagen social por defecto (1200×630). */
export const OG_IMAGE = '/og-image.png';

/**
 * Convierte una ruta de imagen en URL absoluta.
 * Devuelve `src` tal cual si ya es absoluta (p. ej. el CDN de Sanity).
 */
export function absoluteUrl(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  return `${SITE_URL}${src.startsWith('/') ? '' : '/'}${src}`;
}

/**
 * Build a full canonical URL for any page.
 * @param pathname - e.g. "/es/servicios/gestion-proyectos"
 */
export function canonicalUrl(pathname: string): string {
  // Remove trailing slash (except for root)
  const clean = pathname === '/' ? '' : pathname.replace(/\/+$/, '');
  return `${SITE_URL}${clean}`;
}

/**
 * Build hreflang alternates for a given pathname.
 * Swaps the locale prefix while keeping the rest of the path identical.
 */
export function buildAlternates(pathname: string) {
  // Extract the path after the locale prefix: /es/foo/bar → /foo/bar
  const withoutLocale = pathname.replace(/^\/(es|en)/, '') || '';

  return {
    canonical: canonicalUrl(pathname),
    languages: {
      es: canonicalUrl(`/es${withoutLocale}`),
      en: canonicalUrl(`/en${withoutLocale}`),
      'x-default': canonicalUrl(`/es${withoutLocale}`),
    },
  };
}

/**
 * Construye la metadata completa de una página a partir del registro central.
 *
 * El title es absoluto: el layout ya no aplica `template`, así que lo que
 * devuelve esta función es exactamente lo que se emite en `<title>`.
 *
 * @param path   Ruta sin locale, tal como está en `lib/seo/routes.ts` (la home es '').
 * @param locale 'es' | 'en'
 * @throws Si la ruta no está en el registro. Es deliberado: es preferible romper
 *         el build a publicar otra página con metadata duplicada.
 */
export function buildPageMetadata(path: string, locale: Locale): Metadata {
  const route = getRouteMeta(path);

  if (!route) {
    throw new Error(
      `[seo] La ruta "${path}" no está en lib/seo/routes.ts. ` +
        `Añádela al registro (title, description, keyword, breadcrumb, updatedAt) ` +
        `antes de publicarla, o el sitio volvería a emitir metadata duplicada.`
    );
  }

  const title = route.title[locale];
  const description = route.description[locale];
  const pathname = `/${locale}${route.path}`;
  const alternates = buildAlternates(pathname);

  return {
    title,
    description,
    alternates,
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_PA' : 'en_US',
      url: alternates.canonical,
      siteName: 'Grupo Alternative',
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
    robots: route.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

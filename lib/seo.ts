/**
 * SEO utilities — single source of truth for URL generation
 * across canonical, hreflang, sitemap, and Open Graph tags.
 */

/** Base URL without www and without trailing slash */
export const SITE_URL = 'https://grupoalternative.com';

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

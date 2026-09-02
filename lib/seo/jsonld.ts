/**
 * Constructores de datos estructurados (schema.org).
 *
 * Un único punto donde se decide qué schema emite cada tipo de página, para que
 * no vuelva a haber marcado suelto y contradictorio por el árbol.
 */

import { SITE_URL, OG_IMAGE, absoluteUrl } from '@/lib/seo';
import { getRouteMeta, type RouteMeta } from '@/lib/seo/routes';
import { getFaqsForPath } from '@/lib/content/faqs';

export type Locale = 'es' | 'en';

/**
 * Nodo de schema.org serializable.
 *
 * No se usa el tipo `Thing` de `schema-dts`: su union es tan grande que
 * TypeScript falla con "union type that is too complex to represent" al
 * componer el `@graph`. Este tipo mantiene el emisor simple y verificable por
 * el propio `seo-check`, que valida el JSON servido.
 */
export type JsonLdNode = Record<string, unknown>;

/** `@id` estable de la organización; el resto de nodos la referencian. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Datos de contacto tomados del footer (`components/layout/footer.tsx`).
 * TODO_EDWIN: falta la dirección exacta (calle) y los perfiles sociales.
 */
export function buildOrganization(locale: Locale): JsonLdNode[] {
  const org = {
    '@type': 'ProfessionalService',
    '@id': ORGANIZATION_ID,
    name: 'Grupo Alternative',
    url: `${SITE_URL}/${locale}`,
    logo: absoluteUrl('/logo_alternative_horizontal.webp'),
    image: absoluteUrl(OG_IMAGE),
    description:
      locale === 'es'
        ? 'Consultoría en optimización de procesos, sistemas de calidad, gestión de proyectos y transformación digital para empresas en Panamá y LATAM.'
        : 'Consulting in process optimization, quality systems, project management and digital transformation for companies in Panama and LATAM.',
    telephone: '+50769908906',
    email: 'info@grupoalternative.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ciudad de Panamá',
      addressCountry: 'PA',
    },
    areaServed: { '@type': 'Country', name: 'Panamá' },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'https://schema.org/Monday',
          'https://schema.org/Tuesday',
          'https://schema.org/Wednesday',
          'https://schema.org/Thursday',
          'https://schema.org/Friday',
          'https://schema.org/Saturday',
        ],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    founder: {
      '@type': 'Person',
      name: 'Katherine González',
      jobTitle: locale === 'es' ? 'Fundadora y CEO' : 'Founder and CEO',
      url: `${SITE_URL}/${locale}/nosotros/katherine-gonzalez`,
    },
  };

  const site = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/${locale}`,
    name: 'Grupo Alternative',
    inLanguage: locale === 'es' ? 'es-PA' : 'en-US',
    publisher: { '@id': ORGANIZATION_ID },
  };

  return [org, site] as unknown as JsonLdNode[];
}

/** Migas construidas desde los segmentos del path, usando el label del registro. */
function buildBreadcrumb(route: RouteMeta, locale: Locale): JsonLdNode | null {
  if (route.path === '') return null;

  const home = getRouteMeta('');
  const items: { name: string; url: string }[] = [
    { name: home ? home.breadcrumb[locale] : 'Inicio', url: `${SITE_URL}/${locale}` },
  ];

  const segments = route.path.slice(1).split('/');
  let acc = '';
  for (const seg of segments) {
    acc += `/${seg}`;
    const meta = getRouteMeta(acc);
    items.push({
      name: meta ? meta.breadcrumb[locale] : seg,
      url: `${SITE_URL}/${locale}${acc}`,
    });
  }

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** FAQPage a partir de `lib/content/faqs`, si la ruta tiene preguntas. */
function buildFaq(route: RouteMeta, locale: Locale): JsonLdNode | null {
  const faqs = getFaqsForPath(route.path);
  if (!faqs?.length) return null;

  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question[locale],
      acceptedAnswer: { '@type': 'Answer', text: f.answer[locale] },
    })),
  };
}

function buildService(route: RouteMeta, locale: Locale): JsonLdNode {
  return {
    '@type': 'Service',
    name: route.title[locale],
    serviceType: route.keyword[locale],
    description: route.description[locale],
    url: `${SITE_URL}/${locale}${route.path}`,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: { '@type': 'Country', name: 'Panamá' },
  };
}

function buildWebPage(route: RouteMeta, locale: Locale): JsonLdNode {
  return {
    '@type': 'WebPage',
    name: route.title[locale],
    description: route.description[locale],
    url: `${SITE_URL}/${locale}${route.path}`,
    inLanguage: locale === 'es' ? 'es-PA' : 'en-US',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
  };
}

/**
 * Compone el grafo de una página según su `type` en el registro.
 * Devuelve `null` para rutas `noindex` o desconocidas.
 */
export function buildPageJsonLd(path: string, locale: Locale): JsonLdNode[] | null {
  const route = getRouteMeta(path);
  if (!route || route.noindex) return null;

  const nodes: JsonLdNode[] = [];

  const crumb = buildBreadcrumb(route, locale);
  if (crumb) nodes.push(crumb);

  if (route.type === 'service') nodes.push(buildService(route, locale));
  else if (route.type === 'industry') nodes.push(buildWebPage(route, locale));

  const faq = buildFaq(route, locale);
  if (faq) nodes.push(faq);

  return nodes.length ? nodes : null;
}

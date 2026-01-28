/**
 * Blog data layer - structure compatible with future Sanity CMS.
 * Fields match common Sanity document patterns for easy migration.
 */

export type BlogCategory =
  | 'optimizacion-procesos'
  | 'calidad'
  | 'proyectos'
  | 'tecnologia'
  | 'estrategia'
  | 'transformacion-digital';

export interface BlogAuthor {
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  image?: string;
  bio: string;
  bioEn: string;
  certifications?: string;
  link?: string;
}

export interface BlogPost {
  /** URL slug - same in both locales */
  slug: string;
  /** Meta for SEO */
  metaTitle: string;
  metaTitleEn: string;
  metaDescription: string;
  metaDescriptionEn: string;
  /** Display */
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  category: BlogCategory;
  categoryLabel: string;
  categoryLabelEn: string;
  /** Hero image path (optional) */
  heroImage?: string;
  heroImageAlt?: string;
  heroImageAltEn?: string;
  /** Author */
  author: BlogAuthor;
  /** Dates & reading */
  publishedAt: string; // ISO date
  updatedAt?: string;
  readingTimeMinutes: number;
  /** Keywords for internal linking */
  keywords?: string[];
  /** Body from Sanity (Portable Text blocks) – only when fetched from Sanity */
  body?: unknown[];
  bodyEn?: unknown[];
}

/** All blog posts - single source of truth. Add more posts here or replace with Sanity fetch. */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'que-es-bpm-business-process-management-guia-completa',
    metaTitle: 'Qué es BPM: Guía Completa Business Process Management 2026',
    metaTitleEn: 'What is BPM: Complete Business Process Management Guide 2026',
    metaDescription:
      'Descubre qué es BPM, cómo funciona, beneficios reales y cómo implementarlo en tu empresa. Guía completa con casos de éxito y plantillas gratuitas.',
    metaDescriptionEn:
      'Discover what BPM is, how it works, real benefits and how to implement it in your company. Complete guide with success cases and free templates.',
    title: 'Qué es BPM (Business Process Management): Guía Completa 2026',
    titleEn: 'What is BPM (Business Process Management): Complete Guide 2026',
    excerpt:
      'El 70% de las empresas tienen procesos ineficientes que drenan recursos sin saberlo. BPM es la metodología que empresas líderes usan para optimizar operaciones, reducir costos hasta 35% y acelerar crecimiento.',
    excerptEn:
      '70% of companies have inefficient processes that drain resources without knowing it. BPM is the methodology that leading companies use to optimize operations, reduce costs by up to 35% and accelerate growth.',
    category: 'optimizacion-procesos',
    categoryLabel: 'Optimización de Procesos',
    categoryLabelEn: 'Process Optimization',
    heroImage: '/images/consulting-session.webp',
    heroImageAlt: 'Diagrama de flujo de proceso optimizado - BPM',
    heroImageAltEn: 'Optimized process flow diagram - BPM',
    author: {
      name: 'Katherine González',
      nameEn: 'Katherine González',
      role: 'CEO, Grupo Alternative',
      roleEn: 'CEO, Grupo Alternative',
      bio: 'Llevo 15 años ayudando a empresas en LATAM a optimizar procesos. He visto cómo BPM transforma empresas desde adentro—reduciendo costos, acelerando crecimiento y mejorando la calidad de vida de los equipos.',
      bioEn: 'I have 15 years of experience helping companies in LATAM optimize processes. I have seen how BPM transforms companies from within—reducing costs, accelerating growth and improving team quality of life.',
      certifications: 'PMP® | ISO 9001 Lead Auditor | MBA',
      link: '/nosotros',
    },
    publishedAt: '2026-01-15',
    readingTimeMinutes: 15,
    keywords: ['qué es bpm', 'business process management', 'bpm definicion', 'beneficios bpm', 'optimización de procesos'],
  },
  {
    slug: 'caso-exito-banco-regional-40-menos-tiempos-bpm',
    metaTitle: 'Caso Éxito: Banco Redujo 40% Tiempos Procesamiento con BPM',
    metaTitleEn: 'Success Case: Bank Reduced 40% Processing Times with BPM',
    metaDescription:
      'Descubre cómo Banco Regional en Panamá redujo tiempos 40% y costos 35% con BPM. Metodología, resultados medibles y lecciones aprendidas.',
    metaDescriptionEn:
      'Discover how Banco Regional in Panama reduced times by 40% and costs by 35% with BPM. Methodology, measurable results and lessons learned.',
    title: 'Caso de Éxito: Banco Regional — 40% Menos Tiempos con BPM',
    titleEn: 'Success Case: Banco Regional — 40% Less Time with BPM',
    excerpt:
      'Banco Regional en Panamá redujo tiempos de procesamiento de créditos de 12 a 7 días, recortó costos 35% y elevó el NPS de 42 a 68. Metodología BPM en 6 meses.',
    excerptEn:
      'Banco Regional in Panama reduced credit processing times from 12 to 7 days, cut costs by 35% and raised NPS from 42 to 68. BPM methodology in 6 months.',
    category: 'optimizacion-procesos',
    categoryLabel: 'Optimización de Procesos',
    categoryLabelEn: 'Process Optimization',
    heroImage: '/images/consulting-session.webp',
    heroImageAlt: 'Oficinas banco moderno - Caso de éxito BPM',
    heroImageAltEn: 'Modern bank offices - BPM success case',
    author: {
      name: 'Katherine González',
      nameEn: 'Katherine González',
      role: 'CEO, Grupo Alternative',
      roleEn: 'CEO, Grupo Alternative',
      bio: 'Llevo 15 años ayudando a empresas en LATAM a optimizar procesos. He visto cómo BPM transforma empresas desde adentro—reduciendo costos, acelerando crecimiento y mejorando la calidad de vida de los equipos.',
      bioEn: 'I have 15 years of experience helping companies in LATAM optimize processes. I have seen how BPM transforms companies from within—reducing costs, accelerating growth and improving team quality of life.',
      certifications: 'PMP® | ISO 9001 Lead Auditor | MBA',
      link: '/nosotros',
    },
    publishedAt: '2026-01-20',
    readingTimeMinutes: 10,
    keywords: ['caso exito bpm banca', 'optimizacion procesos bancarios', 'reduccion tiempos creditos', 'bpm sector financiero panama'],
  },
];

const SANITY_ENABLED =
  typeof process !== 'undefined' &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_DATASET;

/** Get all posts (sync) - uses static data. For server-side use getAllPostsAsync(). */
export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS;
}

/** Get all posts - from Sanity if configured, else static. Use in server components. */
export async function getAllPostsAsync(): Promise<BlogPost[]> {
  if (SANITY_ENABLED) {
    try {
      const { fetchAllPostsFromSanity } = await import('@/lib/sanity-blog');
      const posts = await fetchAllPostsFromSanity();
      if (posts.length > 0) return posts;
    } catch (_) {
      // fallback to static
    }
  }
  return BLOG_POSTS;
}

/** Get a single post by slug (sync). For server use getPostBySlugAsync(). */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Get a single post by slug - from Sanity if configured, else static. Use in server components. */
export async function getPostBySlugAsync(slug: string): Promise<BlogPost | undefined> {
  if (SANITY_ENABLED) {
    try {
      const { fetchPostBySlugFromSanity } = await import('@/lib/sanity-blog');
      const post = await fetchPostBySlugFromSanity(slug);
      if (post) return post;
    } catch (_) {
      // fallback to static
    }
  }
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Get related posts (same category or recent), excluding current slug */
export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  const others = BLOG_POSTS.filter((p) => p.slug !== currentSlug);
  if (others.length === 0) return [];
  const byCategory = current ? others.filter((p) => p.category === current.category) : [];
  const rest = others.filter((p) => !byCategory.some((b) => b.slug === p.slug));
  return [...byCategory, ...rest].slice(0, limit);
}

/** Get all slugs (sync). For generateStaticParams use getAllSlugsAsync(). */
export function getAllSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

/** Get all slugs - from Sanity if configured, else static. Use in generateStaticParams. */
export async function getAllSlugsAsync(): Promise<string[]> {
  if (SANITY_ENABLED) {
    try {
      const { fetchAllSlugsFromSanity } = await import('@/lib/sanity-blog');
      const slugs = await fetchAllSlugsFromSanity();
      if (slugs.length > 0) return slugs;
    } catch (_) {
      // fallback to static
    }
  }
  return BLOG_POSTS.map((p) => p.slug);
}

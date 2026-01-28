/**
 * Blog data from Sanity CMS. Maps Sanity documents to BlogPost type.
 * Used by lib/blog.ts when NEXT_PUBLIC_SANITY_PROJECT_ID is set.
 */

import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import { postsQuery, postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries';
import type { BlogPost, BlogAuthor, BlogCategory } from './blog';

const builder = imageUrlBuilder(client);

function urlFor(source: { _ref?: string; asset?: { _ref?: string } } | undefined): string | undefined {
  if (!source) return undefined;
  try {
    return builder.image(source).url();
  } catch {
    return undefined;
  }
}

interface SanityAuthor {
  name?: string;
  nameEn?: string;
  role?: string;
  roleEn?: string;
  image?: unknown;
  bio?: string;
  bioEn?: string;
  certifications?: string;
  link?: string;
}

interface SanityCategory {
  category?: string;
  categoryLabel?: string;
  categoryLabelEn?: string;
}

interface SanityPost {
  slug?: string;
  title?: string;
  titleEn?: string;
  excerpt?: string;
  excerptEn?: string;
  metaTitle?: string;
  metaTitleEn?: string;
  metaDescription?: string;
  metaDescriptionEn?: string;
  heroImage?: unknown;
  heroImageAlt?: string;
  heroImageAltEn?: string;
  publishedAt?: string;
  _updatedAt?: string;
  readingTimeMinutes?: number;
  keywords?: string[];
  author?: SanityAuthor;
  category?: SanityCategory;
}

function mapAuthor(a?: SanityAuthor): BlogAuthor {
  if (!a) {
    return {
      name: '',
      nameEn: '',
      role: '',
      roleEn: '',
      bio: '',
      bioEn: '',
    };
  }
  return {
    name: a.name ?? '',
    nameEn: a.nameEn ?? a.name ?? '',
    role: a.role ?? '',
    roleEn: a.roleEn ?? a.role ?? '',
    image: a.image ? urlFor(a.image as Parameters<typeof urlFor>[0]) : undefined,
    bio: a.bio ?? '',
    bioEn: a.bioEn ?? a.bio ?? '',
    certifications: a.certifications,
    link: a.link,
  };
}

function mapSanityPostToBlogPost(doc: SanityPost): BlogPost {
  const categorySlug = (doc.category?.category ?? 'optimizacion-procesos') as BlogCategory;
  return {
    slug: doc.slug ?? '',
    metaTitle: doc.metaTitle ?? doc.title ?? '',
    metaTitleEn: doc.metaTitleEn ?? doc.titleEn ?? doc.title ?? '',
    metaDescription: doc.metaDescription ?? doc.excerpt ?? '',
    metaDescriptionEn: doc.metaDescriptionEn ?? doc.excerptEn ?? doc.excerpt ?? '',
    title: doc.title ?? '',
    titleEn: doc.titleEn ?? doc.title ?? '',
    excerpt: doc.excerpt ?? '',
    excerptEn: doc.excerptEn ?? doc.excerpt ?? '',
    category: categorySlug,
    categoryLabel: doc.category?.categoryLabel ?? '',
    categoryLabelEn: doc.category?.categoryLabelEn ?? '',
    heroImage: doc.heroImage ? urlFor(doc.heroImage as Parameters<typeof urlFor>[0]) : undefined,
    heroImageAlt: doc.heroImageAlt,
    heroImageAltEn: doc.heroImageAltEn,
    author: mapAuthor(doc.author),
    publishedAt: doc.publishedAt ?? new Date().toISOString(),
    updatedAt: doc._updatedAt,
    readingTimeMinutes: doc.readingTimeMinutes ?? 10,
    keywords: doc.keywords,
    body: doc.body,
    bodyEn: doc.bodyEn,
  };
}

export async function fetchAllPostsFromSanity(): Promise<BlogPost[]> {
  const data = await client.fetch<SanityPost[]>(postsQuery);
  if (!Array.isArray(data)) return [];
  return data.map(mapSanityPostToBlogPost).filter((p) => p.slug);
}

export async function fetchPostBySlugFromSanity(slug: string): Promise<BlogPost | undefined> {
  const data = await client.fetch<SanityPost | null>(postBySlugQuery, { slug });
  if (!data?.slug) return undefined;
  return mapSanityPostToBlogPost(data);
}

export async function fetchAllSlugsFromSanity(): Promise<string[]> {
  const data = await client.fetch<string[]>(postSlugsQuery);
  return Array.isArray(data) ? data : [];
}

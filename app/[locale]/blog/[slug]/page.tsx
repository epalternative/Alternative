import { notFound } from 'next/navigation';
import { getPostBySlugAsync, getAllSlugsAsync } from '@/lib/blog';
import type { BlogPost } from '@/lib/blog';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import { BlogPortableText } from '@/components/blog/BlogPortableText';
import { BpmArticleContent, BPM_TOC } from '@/components/blog/contents/BpmArticleContent';
import { BancoRegionalCaseContent, BANCO_REGIONAL_TOC } from '@/components/blog/contents/BancoRegionalCaseContent';
import type { TocItem } from '@/components/blog/BlogPostLayout';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SITE_URL, OG_IMAGE, absoluteUrl } from '@/lib/seo';
import { ORGANIZATION_ID } from '@/lib/seo/jsonld';

function ArticleJsonLd({
  post,
  locale,
  slug,
}: {
  post: BlogPost;
  locale: string;
  slug: string;
}) {
  const baseUrl = SITE_URL;
  const url = `${baseUrl}/${locale}/blog/${slug}`;
  const title = locale === 'en' ? post.titleEn : post.title;
  const description = locale === 'en' ? post.metaDescriptionEn : post.metaDescription;
  const body = (locale === 'en' ? post.bodyEn : post.body) as
    | { children?: { text?: string }[] }[]
    | undefined;

  /**
   * Palabras del cuerpo real (Portable Text de Sanity). Si el post no trae
   * body se omite: es preferible no declarar `wordCount` a publicar el conteo
   * del excerpt, que daria una cifra falsa de ~95 para un articulo largo.
   */
  const wordCount = Array.isArray(body)
    ? body
        .flatMap((b) => b?.children ?? [])
        .map((c) => c?.text ?? '')
        .join(' ')
        .split(/\s+/)
        .filter(Boolean).length || undefined
    : undefined;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    inLanguage: locale === 'en' ? 'en-US' : 'es-PA',
    articleSection: locale === 'en' ? post.categoryLabelEn : post.categoryLabel,
    wordCount,
    keywords: post.keywords?.length ? post.keywords.join(', ') : undefined,
    // `heroImage` puede venir del CDN de Sanity (absoluta) o de /public (relativa).
    image: absoluteUrl(post.heroImage ?? OG_IMAGE),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      '@type': 'Person',
      name: locale === 'en' ? post.author.nameEn : post.author.name,
      url: post.author.link ? `${baseUrl}/${locale}${post.author.link}` : undefined,
    },
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

const BLOG_SLUG_TO_CONTENT: Record<
  string,
  { Toc: TocItem[]; Content: React.ComponentType<{ locale: 'es' | 'en' }> }
> = {
  'que-es-bpm-business-process-management-guia-completa': {
    Toc: BPM_TOC,
    Content: BpmArticleContent,
  },
  'caso-exito-banco-regional-40-menos-tiempos-bpm': {
    Toc: BANCO_REGIONAL_TOC,
    Content: BancoRegionalCaseContent,
  },
};

interface PageProps {
  params: { locale: string; slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = params;
  const post = await getPostBySlugAsync(slug);
  if (!post) return { title: 'Blog | Alternative' };

  const isEn = locale === 'en';
  const title = isEn ? post.metaTitleEn : post.metaTitle;
  const description = isEn ? post.metaDescriptionEn : post.metaDescription;

  const canonical = `${SITE_URL}/${locale}/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${SITE_URL}/es/blog/${slug}`,
        en: `${SITE_URL}/en/blog/${slug}`,
        'x-default': `${SITE_URL}/es/blog/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      locale: locale === 'es' ? 'es_PA' : 'en_US',
      url: canonical,
      siteName: 'Grupo Alternative',
      title,
      description,
      images: [
        {
          url: absoluteUrl(post.heroImage ?? OG_IMAGE),
          alt: (isEn ? post.heroImageAltEn : post.heroImageAlt) ?? title,
        },
      ],
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(post.heroImage ?? OG_IMAGE)],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugsAsync();
  const locales = ['es', 'en'] as const;
  return slugs.flatMap((slug) => locales.map((locale) => ({ locale, slug })));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = params;
  setRequestLocale(locale);
  const post = await getPostBySlugAsync(slug);
  if (!post) notFound();

  const localeTyped = (locale === 'en' ? 'en' : 'es') as 'es' | 'en';
  const contentConfig = BLOG_SLUG_TO_CONTENT[slug];

  if (!contentConfig) {
    // Content from Sanity (body/bodyEn) or fallback
    const bodyContent = localeTyped === 'en' ? post.bodyEn : post.body;
    const hasSanityBody = Array.isArray(bodyContent) && bodyContent.length > 0;

    return (
      <>
        <ArticleJsonLd post={post} locale={locale} slug={slug} />
        <BlogPostLayout post={post} locale={localeTyped} tocItems={[]}>
          {hasSanityBody ? (
            <BlogPortableText value={bodyContent} />
          ) : (
            <div className="blog-prose">
              <p>{localeTyped === 'es' ? post.excerpt : post.excerptEn}</p>
              <p className="text-azul-marino/70 dark:text-white/70">
                {localeTyped === 'es' ? 'Contenido en preparación.' : 'Content coming soon.'}
              </p>
            </div>
          )}
        </BlogPostLayout>
      </>
    );
  }

  const { Toc, Content } = contentConfig;
  return (
    <>
      <ArticleJsonLd post={post} locale={locale} slug={slug} />
      <BlogPostLayout post={post} locale={localeTyped} tocItems={Toc}>
        <Content locale={localeTyped} />
      </BlogPostLayout>
    </>
  );
}

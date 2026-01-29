import { notFound } from 'next/navigation';
import { getPostBySlugAsync, getAllSlugsAsync } from '@/lib/blog';
import type { BlogPost } from '@/lib/blog';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import { BlogPortableText } from '@/components/blog/BlogPortableText';
import { BpmArticleContent, BPM_TOC } from '@/components/blog/contents/BpmArticleContent';
import { BancoRegionalCaseContent, BANCO_REGIONAL_TOC } from '@/components/blog/contents/BancoRegionalCaseContent';
import type { TocItem } from '@/components/blog/BlogPostLayout';
import type { Metadata } from 'next';

function ArticleJsonLd({
  post,
  locale,
  slug,
}: {
  post: BlogPost;
  locale: string;
  slug: string;
}) {
  const baseUrl = 'https://www.grupoalternative.com';
  const url = `${baseUrl}/${locale}/blog/${slug}`;
  const title = locale === 'en' ? post.titleEn : post.title;
  const description = locale === 'en' ? post.metaDescriptionEn : post.metaDescription;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: post.heroImage ? `${baseUrl}${post.heroImage}` : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      '@type': 'Person',
      name: locale === 'en' ? post.author.nameEn : post.author.name,
      url: post.author.link ? `${baseUrl}${post.author.link}` : undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Grupo Alternative',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/logo_alternative_horizontal.webp` },
    },
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

  const baseUrl = 'https://www.grupoalternative.com';
  const path = `/${locale}/blog/${slug}`;
  const canonical = `${baseUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${baseUrl}/es/blog/${slug}`,
        en: `${baseUrl}/en/blog/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      locale: locale === 'es' ? 'es_PA' : 'en_US',
      url: canonical,
      siteName: 'Alternative',
      title,
      description,
      images: post.heroImage ? [{ url: `${baseUrl}${post.heroImage}`, alt: isEn ? post.heroImageAltEn : post.heroImageAlt }] : undefined,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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

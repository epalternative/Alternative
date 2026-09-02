import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { buildPageJsonLd } from '@/lib/seo/jsonld';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAllPostsAsync } from '@/lib/blog';
import { BlogPageClient } from '@/components/blog/BlogPageClient';

const PATH = '/blog';

export function generateMetadata({
  params,
}: {
  params: { locale: 'es' | 'en' };
}): Metadata {
  return buildPageMetadata(PATH, params.locale);
}

export default async function BlogPage({ params }: { params: { locale: 'es' | 'en' } }) {
  setRequestLocale(params.locale);
  const posts = await getAllPostsAsync();
  return (
    <>
      <JsonLd data={buildPageJsonLd(PATH, params.locale)} />
      <BlogPageClient initialPosts={posts} />
    </>
  );
}

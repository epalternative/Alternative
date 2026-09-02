import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { RESOURCE_SLUGS, isResourceSlug } from '@/lib/content/resource-slugs';
import PageClient from './PageClient';

/** Solo se sirven los slugs conocidos; el resto responde 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return (['es', 'en'] as const).flatMap((locale) =>
    RESOURCE_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export default function Page({
  params,
}: {
  params: { locale: 'es' | 'en'; slug: string };
}) {
  if (!isResourceSlug(params.slug)) notFound();
  setRequestLocale(params.locale);
  return <PageClient />;
}

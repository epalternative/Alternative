import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { buildPageJsonLd } from '@/lib/seo/jsonld';
import { JsonLd } from '@/components/seo/JsonLd';
import PageClient from './PageClient';

const PATH = '/servicios/optimizacion-procesos/automatizacion-procesos';

export function generateMetadata({
  params,
}: {
  params: { locale: 'es' | 'en' };
}): Metadata {
  return buildPageMetadata(PATH, params.locale);
}

export default function Page({ params }: { params: { locale: 'es' | 'en' } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <JsonLd data={buildPageJsonLd(PATH, params.locale)} />
      <PageClient />
    </>
  );
}

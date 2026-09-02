import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import PageClient from './PageClient';

const PATH = '/recursos/calculadoras/roi-optimizacion-procesos';

export function generateMetadata({
  params,
}: {
  params: { locale: 'es' | 'en' };
}): Metadata {
  return buildPageMetadata(PATH, params.locale);
}

export default function Page({ params }: { params: { locale: 'es' | 'en' } }) {
  setRequestLocale(params.locale);
  return <PageClient />;
}

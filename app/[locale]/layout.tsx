import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales, Locale } from '@/i18n';
import { ThemeProvider } from '@/components/theme-provider';
import { ConditionalShell } from '@/components/layout/conditional-shell';
import { SITE_URL, OG_IMAGE } from '@/lib/seo';
import { buildOrganization } from '@/lib/seo/jsonld';
import { JsonLd } from '@/components/seo/JsonLd';
import '../globals.css';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

/**
 * Metadata de respaldo del sitio.
 *
 * Cada página aporta su propio `title`, `description`, `alternates` y
 * `openGraph` vía `buildPageMetadata()` (ver `lib/seo.ts`), así que aquí solo
 * queda lo verdaderamente global. Deliberadamente NO hay:
 *   - `title.template`: los titles del registro ya son absolutos.
 *   - `keywords`: Google los ignora desde 2009 y eran idénticos en todo el sitio.
 *   - `headers()`: leerlos convertía todas las rutas en dinámicas.
 */
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isEs = params.locale !== 'en';

  return {
    metadataBase: new URL(SITE_URL),
    title: isEs
      ? 'Consultoría Empresarial en Panamá | Grupo Alternative'
      : 'Business Consulting Firm in Panama | Grupo Alternative',
    description: isEs
      ? 'Consultoría en procesos, calidad, proyectos y transformación digital para empresas en Panamá y LATAM.'
      : 'Consulting in processes, quality, projects and digital transformation for companies in Panama and LATAM.',
    authors: [{ name: 'Grupo Alternative' }],
    openGraph: {
      siteName: 'Grupo Alternative',
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
    },
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Habilita el renderizado estático de este segmento y sus descendientes.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Organization + WebSite: se emiten una sola vez para todo el sitio. */}
        <JsonLd data={buildOrganization(locale as 'es' | 'en')} />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <NextIntlClientProvider messages={messages} locale={locale}>
            <ConditionalShell>{children}</ConditionalShell>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

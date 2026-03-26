import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales, Locale } from '@/i18n';
import { ThemeProvider } from '@/components/theme-provider';
import { ConditionalShell } from '@/components/layout/conditional-shell';
import { SetHtmlLang } from '@/components/layout/set-html-lang';
import { SITE_URL, buildAlternates } from '@/lib/seo';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;

  // Read the actual pathname set by middleware so canonical/hreflang are page-specific
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || `/${locale}`;

  const metadata = {
    es: {
      title: 'Consultoría Empresarial que Genera Resultados | Alternative',
      description: 'Consultoría en optimización de procesos, gestión de proyectos y sistemas de calidad. Equipo certificado PMP®, ISO 9001 Lead Auditor y Lean Six Sigma. Experiencia en LATAM y el Caribe.',
      keywords: 'consultoría empresarial, optimización de procesos, gestión de proyectos, sistemas de calidad, ISO 9001, consultoría BPM, transformación digital',
    },
    en: {
      title: 'Business Consulting that Delivers Results | Alternative',
      description: 'Consulting in process optimization, project management, and quality systems. Team certified in PMP®, ISO 9001 Lead Auditor, and Lean Six Sigma. Experience in LATAM and the Caribbean.',
      keywords: 'business consulting, process optimization, project management, quality systems, ISO 9001, BPM consulting, digital transformation',
    }
  };

  const meta = metadata[locale as keyof typeof metadata] || metadata.es;
  const alternates = buildAlternates(pathname);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.title,
      template: `%s | Alternative`
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: 'Alternative' }],
    alternates,
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_PA' : 'en_US',
      url: alternates.canonical,
      siteName: 'Alternative',
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: `${SITE_URL}/logo_24.webp`,
          width: 1200,
          height: 630,
          alt: 'Alternative - Consultoría Empresarial',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${SITE_URL}/logo_24.webp`],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
    },
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <>
      <SetHtmlLang locale={locale} />
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
    </>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

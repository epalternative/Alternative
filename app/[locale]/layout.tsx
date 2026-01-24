import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales, Locale } from '@/i18n';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  
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

  return {
    metadataBase: new URL('https://grupoalternative.com'),
    title: {
      default: meta.title,
      template: `%s | Alternative`
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: 'Alternative' }],
    alternates: {
      canonical: `https://grupoalternative.com/${locale}`,
      languages: {
        'es': 'https://grupoalternative.com/es',
        'en': 'https://grupoalternative.com/en',
      }
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_PA' : 'en_US',
      url: `https://grupoalternative.com/${locale}`,
      siteName: 'Alternative',
      title: meta.title,
      description: meta.description,
      images: ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/og-image.png'],
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
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Header />
            <main className="pt-16 lg:pt-20">
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

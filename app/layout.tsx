import type { Metadata } from 'next';
import Script from 'next/script';
import { ThemeProvider } from '@/components/theme-provider';
import { I18nProvider } from '@/lib/i18n/context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'https://grupoalternative.com'),
  title: {
    default: 'Consultoría Empresarial en Panamá | Grupo Alternative',
    template: '%s | Grupo Alternative'
  },
  description: 'Consultoría en optimización de procesos, gestión de proyectos y sistemas de calidad ISO 9001. Certificados PMP® e ISO 9001 Lead Auditor. Diagnóstico gratuito. 15+ años transformando empresas en Panamá y LATAM.',
  keywords: ['consultoría empresarial panamá', 'consultoría de procesos', 'gestión de proyectos', 'ISO 9001 Panamá', 'BPM panamá', 'PMP panamá', 'optimización de procesos', 'Lean Six Sigma', 'transformación digital'],
  authors: [{ name: 'Grupo Alternative' }],
  openGraph: {
    title: 'Consultoría Empresarial en Panamá | Grupo Alternative',
    description: 'Consultoría en optimización de procesos, gestión de proyectos y sistemas de calidad ISO 9001. Certificados PMP® e ISO 9001 Lead Auditor. 15+ años transformando empresas.',
    type: 'website',
    locale: 'es_PA',
    alternateLocale: 'en_US',
    url: 'https://grupoalternative.com',
    siteName: 'Grupo Alternative',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consultoría Empresarial en Panamá | Grupo Alternative',
    description: 'Consultoría en optimización de procesos, gestión de proyectos e ISO 9001. PMP® e ISO 9001 Lead Auditor certificados.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://grupoalternative.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Temporarily disabled to debug webpack error */}
        {/* <Script
          src="https://apps.abacus.ai/chatllm/appllm-lib.js"
          strategy="afterInteractive"
        /> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <I18nProvider>
            <Header />
            <main className="pt-16 lg:pt-20">
              {children}
            </main>
            <Footer />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

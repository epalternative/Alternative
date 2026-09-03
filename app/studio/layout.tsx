import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

/**
 * Root layout propio para `/studio`.
 *
 * `/studio` vive fuera de `[locale]`, así que necesita su propio `<html>`/`<body>`:
 * al eliminarse `app/layout.tsx`, cada rama del árbol aporta el suyo.
 */
export const metadata: Metadata = {
  title: 'Sanity Studio',
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}

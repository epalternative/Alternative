import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? SITE_URL),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
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
        {children}
      </body>
    </html>
  );
}

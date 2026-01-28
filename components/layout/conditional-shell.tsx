'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const HELPDESK_PATH = 'helpdesk-it';

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';

  const isLandingWithoutShell = pathname.includes(HELPDESK_PATH);

  if (isLandingWithoutShell) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">{children}</main>
      <Footer />
    </>
  );
}

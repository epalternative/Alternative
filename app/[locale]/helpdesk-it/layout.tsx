import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Helpdesk IT – Alternative',
  description:
    'Reporta incidencias, solicitudes de soporte o requerimientos técnicos. Nuestro equipo dará seguimiento vía correo electrónico.',
  robots: { index: false, follow: true },
};

export default function HelpdeskItLayout({ children }: { children: React.ReactNode }) {
  return children;
}

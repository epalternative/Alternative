import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nosotros - Grupo Alternative | Consultoría Empresarial Panamá',
  description:
    'Más de 5 años transformando empresas en LATAM. Equipo certificado PMP, ISO 9001. Especialistas en procesos, proyectos y transformación digital para servicios profesionales.',
  openGraph: {
    title: 'Nosotros - Grupo Alternative | Consultoría Empresarial Panamá',
    description:
      'Más de 5 años transformando empresas en LATAM. Equipo certificado PMP, ISO 9001. Especialistas en procesos, proyectos y transformación digital para servicios profesionales.',
  },
};

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

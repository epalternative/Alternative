'use client';

import Link from 'next/link';

const STUDIO_URL =
  typeof process.env.NEXT_PUBLIC_SANITY_STUDIO_URL === 'string' &&
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL
    ? process.env.NEXT_PUBLIC_SANITY_STUDIO_URL
    : 'https://grupo-alternative-blog.sanity.studio';

export default function StudioPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted/30 px-4">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Editor del blog (Sanity Studio)</h1>
        <p className="text-muted-foreground">
          El Studio del blog se gestiona en una aplicación separada. Usa el enlace siguiente para
          crear y editar entradas, autores y categorías.
        </p>
        <a
          href={STUDIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Abrir Sanity Studio →
        </a>
        <p className="text-xs text-muted-foreground">
          Si no tienes acceso, pide la URL y una invitación al administrador del proyecto.
        </p>
      </div>
      <Link href="/" className="text-sm text-muted-foreground underline hover:text-foreground">
        Volver al inicio
      </Link>
    </div>
  );
}

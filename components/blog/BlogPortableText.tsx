'use client';

import Link from 'next/link';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';

// Duplicado a proposito de SITE_URL en lib/seo.ts: importar ese modulo desde un
// componente cliente arrastraria el registro completo de rutas al bundle.
const SITE_ORIGIN = 'https://grupoalternative.com';

const builder = imageUrlBuilder(client);

function urlFor(source: unknown): string {
  if (!source || typeof source !== 'object') return '';
  try {
    return builder.image(source as Parameters<typeof builder.image>[0]).url();
  } catch {
    return '';
  }
}

const components: Partial<PortableTextComponents> = {
  block: {
    h2: ({ children }) => <h2 className="text-azul-marino dark:text-white font-semibold text-[1.75rem] mt-10 mb-4 pb-2 border-b-2 border-turquesa/30">{children}</h2>,
    h3: ({ children }) => <h3 className="text-azul-marino dark:text-white font-semibold text-[1.35rem] mt-8 mb-3">{children}</h3>,
    normal: ({ children }) => <p className="mb-5 text-azul-marino/90 dark:text-white/90">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 pl-4 border-l-4 border-turquesa bg-turquesa/10 rounded-r-xl py-2 text-azul-marino dark:text-white italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-2 text-azul-marino/90 dark:text-white/90">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-2 text-azul-marino/90 dark:text-white/90">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="marker:text-turquesa">{children}</li>,
    number: ({ children }) => <li className="marker:text-turquesa">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-azul-marino dark:text-white">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = String(value?.href ?? '');
      const className = 'text-turquesa font-medium hover:underline';

      // Los enlaces del pipeline se guardan absolutos porque el campo href de
      // blockContent es type 'url' y Sanity rechaza las rutas relativas. Aqui
      // se vuelven a reconocer los propios para navegarlos en la misma pestana
      // y con el router de Next, no como si fueran de otro sitio.
      const internalPath = href.startsWith(SITE_ORIGIN)
        ? href.slice(SITE_ORIGIN.length) || '/'
        : href.startsWith('/')
          ? href
          : null;

      if (internalPath) {
        return (
          <Link href={internalPath} className={className}>
            {children}
          </Link>
        );
      }

      // mailto:, tel: y anclas tampoco abren pestana nueva.
      if (!/^https?:\/\//i.test(href)) {
        return (
          <a href={href} className={className}>
            {children}
          </a>
        );
      }

      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const src = urlFor(value);
      if (!src) return null;
      return (
        <figure className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={value?.alt ?? ''}
            className="rounded-xl w-full max-w-2xl mx-auto shadow-brand"
          />
          {value?.caption && (
            <figcaption className="text-sm text-gris-arena dark:text-white/60 mt-2 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

interface BlogPortableTextProps {
  value: unknown[] | null | undefined;
}

export function BlogPortableText({ value }: BlogPortableTextProps) {
  if (!value || !Array.isArray(value) || value.length === 0) return null;
  return (
    <div className="blog-prose">
      <PortableText value={value as PortableTextBlock[]} components={components} />
    </div>
  );
}

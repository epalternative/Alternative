'use client';

import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';

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
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-turquesa font-medium hover:underline"
      >
        {children}
      </a>
    ),
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
      <PortableText value={value} components={components} />
    </div>
  );
}

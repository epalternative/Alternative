import type { JsonLdNode } from '@/lib/seo/jsonld';

/**
 * Server component que emite datos estructurados.
 *
 * Acepta un objeto o un array; si son varios, los envuelve en `@graph` para
 * que compartan un único `@context` y puedan referenciarse entre sí por `@id`.
 */
export function JsonLd({ data }: { data: JsonLdNode | JsonLdNode[] | null }) {
  if (!data || (Array.isArray(data) && data.length === 0)) return null;

  const payload: JsonLdNode = Array.isArray(data)
    ? { '@context': 'https://schema.org', '@graph': data }
    : data;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

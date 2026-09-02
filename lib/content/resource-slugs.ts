/**
 * Categorías de `/recursos` que no tienen carpeta propia en `app/`.
 *
 * Son las cuatro que `/recursos` enlaza. Cualquier otro slug debe dar 404 en
 * lugar de un 200 vacío, así que esta lista alimenta `generateStaticParams` con
 * `dynamicParams = false`.
 *
 * `calculadoras` no está aquí a propósito: tiene su propia carpeta, que en el
 * App Router tiene precedencia sobre la ruta dinámica.
 *
 * Vive fuera de `page.tsx` porque Next solo admite un conjunto cerrado de
 * exports en los archivos de página.
 */
export const RESOURCE_SLUGS = [
  'guias-descargables',
  'webinars',
  'casos-estudio',
  'centro-conocimiento',
] as const;

export type ResourceSlug = (typeof RESOURCE_SLUGS)[number];

export function isResourceSlug(slug: string): slug is ResourceSlug {
  return (RESOURCE_SLUGS as readonly string[]).includes(slug);
}

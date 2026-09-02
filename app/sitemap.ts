import { MetadataRoute } from 'next';
import { getAllPostsAsync } from '@/lib/blog';
import { SITE_URL } from '@/lib/seo';
import { getIndexableRoutes } from '@/lib/seo/routes';

/**
 * Sitemap derivado del registro central: sin listas hardcodeadas que haya que
 * sincronizar a mano con el árbol de `app/`.
 *
 * - `lastModified` sale del `updatedAt` real de cada ruta (o de la fecha del
 *   post), no de `new Date()`.
 * - Las rutas `noindex` quedan fuera.
 * - Las URLs `/en` llevan 0.2 menos de prioridad que su par en español.
 */
function bilingualEntry(
  path: string,
  lastModified: Date,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
): MetadataRoute.Sitemap {
  const languages = {
    es: `${SITE_URL}/es${path}`,
    en: `${SITE_URL}/en${path}`,
    'x-default': `${SITE_URL}/es${path}`,
  };

  const clamp = (n: number) => Math.max(0.1, Math.round(n * 10) / 10);

  return [
    {
      url: `${SITE_URL}/es${path}`,
      lastModified,
      changeFrequency,
      priority: clamp(priority),
      alternates: { languages },
    },
    {
      url: `${SITE_URL}/en${path}`,
      lastModified,
      changeFrequency,
      priority: clamp(priority - 0.2),
      alternates: { languages },
    },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  for (const route of getIndexableRoutes()) {
    routes.push(
      ...bilingualEntry(
        route.path,
        new Date(route.updatedAt),
        route.priority,
        route.changeFrequency
      )
    );
  }

  // Posts del blog: fecha real de publicación o de última modificación.
  const posts = await getAllPostsAsync();
  for (const post of posts) {
    routes.push(
      ...bilingualEntry(
        `/blog/${post.slug}`,
        new Date(post.updatedAt ?? post.publishedAt),
        0.8,
        'monthly'
      )
    );
  }

  return routes;
}

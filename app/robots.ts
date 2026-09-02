import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // `/_next/` ya NO se bloquea: Googlebot necesita el JS y el CSS para
        // renderizar. `/admin/` se elimina porque esa ruta no existe.
        disallow: ['/api/', '/studio', '/es/studio', '/en/studio'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

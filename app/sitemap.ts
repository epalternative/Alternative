import { MetadataRoute } from 'next';
import { getAllSlugsAsync } from '@/lib/blog';
import { SITE_URL } from '@/lib/seo';

/**
 * Helper: create a pair of ES + EN sitemap entries with cross-linked hreflangs + x-default.
 * Both locales share the same slug path (the App Router uses [locale] with identical slugs).
 */
function bilingualEntry(
  path: string,
  opts: { changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }
): MetadataRoute.Sitemap {
  const langs = {
    es: `${SITE_URL}/es${path}`,
    en: `${SITE_URL}/en${path}`,
    'x-default': `${SITE_URL}/es${path}`,
  };
  return [
    { url: `${SITE_URL}/es${path}`, lastModified: new Date(), ...opts, alternates: { languages: langs } },
    { url: `${SITE_URL}/en${path}`, lastModified: new Date(), ...opts, alternates: { languages: langs } },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  // ── Homepage ──
  routes.push(...bilingualEntry('', { changeFrequency: 'weekly', priority: 1 }));

  // ── Main pages (same slug for both locales) ──
  const mainPages = ['servicios', 'industrias', 'casos-exito', 'nosotros', 'blog', 'contacto', 'recursos'];
  mainPages.forEach((page) => {
    routes.push(...bilingualEntry(`/${page}`, { changeFrequency: 'weekly', priority: 0.9 }));
  });

  // ── Services (main categories) ──
  const servicios = [
    'optimizacion-procesos',
    'sistemas-calidad',
    'gestion-proyectos',
    'transformacion-digital',
    'consultoria-estrategica',
    'desarrollo-tecnologia',
  ];
  servicios.forEach((s) => {
    routes.push(...bilingualEntry(`/servicios/${s}`, { changeFrequency: 'weekly', priority: 0.8 }));
  });

  // ── Sub-services ──
  const subServicios: Record<string, string[]> = {
    'optimizacion-procesos': ['bpm-empresarial', 'lean-six-sigma', 'diseno-procesos', 'automatizacion-procesos'],
    'sistemas-calidad': ['implementacion-iso-9001', 'auditoria-calidad', 'certificacion-iso', 'gestion-calidad'],
    'gestion-proyectos': ['pmp-project-management', 'metodologias-agiles', 'pmo-office', 'casos-negocio'],
    'transformacion-digital': ['estrategia-digital', 'change-management', 'digitalizacion-procesos', 'analisis-datos'],
    'consultoria-estrategica': ['diagnostico-organizacional', 'diseno-organizacional', 'planificacion-estrategica'],
    'desarrollo-tecnologia': ['aplicaciones-web-moviles', 'consultoria-tecnologica', 'desarrollo-software', 'integracion-sistemas'],
  };
  Object.entries(subServicios).forEach(([cat, subs]) => {
    subs.forEach((sub) => {
      routes.push(...bilingualEntry(`/servicios/${cat}/${sub}`, { changeFrequency: 'monthly', priority: 0.7 }));
    });
  });

  // ── Industries ──
  const industrias = [
    'banca-servicios-financieros',
    'manufactura-logistica',
    'retail-comercio',
    'tecnologia-telecomunicaciones',
    'servicios-profesionales',
    'gobierno-sector-publico',
    'salud-farmaceutica',
    'energia-utilities',
  ];
  industrias.forEach((ind) => {
    routes.push(...bilingualEntry(`/industrias/${ind}`, { changeFrequency: 'monthly', priority: 0.7 }));
  });

  // ── Calculators (under /recursos) ──
  const calculators = [
    'calculadoras',
    'calculadoras/roi-optimizacion-procesos',
    'calculadoras/madurez-digital',
  ];
  calculators.forEach((calc) => {
    routes.push(...bilingualEntry(`/recursos/${calc}`, { changeFrequency: 'monthly', priority: 0.7 }));
  });

  // ── Blog posts (from Sanity or static) ──
  const blogSlugs = await getAllSlugsAsync();
  blogSlugs.forEach((slug) => {
    routes.push(...bilingualEntry(`/blog/${slug}`, { changeFrequency: 'monthly', priority: 0.8 }));
  });

  return routes;
}

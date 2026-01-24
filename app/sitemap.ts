import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://grupoalternative.com';
  
  // Servicios principales
  const serviciosES = [
    'optimizacion-procesos',
    'sistemas-calidad',
    'gestion-proyectos',
    'transformacion-digital',
    'consultoria-estrategica',
    'desarrollo-tecnologia'
  ];

  // Sub-servicios
  const subServiciosES: Record<string, string[]> = {
    'optimizacion-procesos': ['bpm-empresarial', 'lean-six-sigma', 'diseno-procesos', 'automatizacion-procesos'],
    'sistemas-calidad': ['implementacion-iso-9001', 'auditoria-calidad', 'certificacion-iso', 'gestion-calidad'],
    'gestion-proyectos': ['pmp-project-management', 'metodologias-agiles', 'pmo-office', 'casos-negocio'],
    'transformacion-digital': ['estrategia-digital', 'automatizacion-inteligente', 'desarrollo-software', 'infraestructura-it'],
    'consultoria-estrategica': ['diagnostico-organizacional', 'estudios-viabilidad', 'desarrollo-rfp'],
    'desarrollo-tecnologia': ['aplicaciones-medida', 'portales-corporativos', 'integraciones-api', 'soporte-infraestructura']
  };

  // Industrias
  const industriasES = [
    'banca-servicios-financieros',
    'manufactura-logistica',
    'retail-comercio',
    'tecnologia-telecomunicaciones',
    'servicios-profesionales',
    'gobierno-sector-publico',
    'salud-farmaceutica',
    'energia-utilities'
  ];

  const routes: MetadataRoute.Sitemap = [];

  // Homepage - ambos idiomas
  routes.push({
    url: `${baseUrl}/es`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
    alternates: {
      languages: {
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
      },
    },
  });

  routes.push({
    url: `${baseUrl}/en`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
    alternates: {
      languages: {
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
      },
    },
  });

  // Páginas principales ES
  const mainPagesES = ['servicios', 'industrias', 'casos-exito', 'nosotros', 'blog', 'contacto', 'recursos'];
  const mainPagesEN = ['services', 'industries', 'success-stories', 'about', 'blog', 'contact', 'resources'];

  mainPagesES.forEach((page, index) => {
    routes.push({
      url: `${baseUrl}/es/${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/es/${page}`,
          en: `${baseUrl}/en/${mainPagesEN[index]}`,
        },
      },
    });

    routes.push({
      url: `${baseUrl}/en/${mainPagesEN[index]}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/es/${page}`,
          en: `${baseUrl}/en/${mainPagesEN[index]}`,
        },
      },
    });
  });

  // Servicios principales ES
  serviciosES.forEach((servicio) => {
    routes.push({
      url: `${baseUrl}/es/servicios/${servicio}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Sub-servicios ES
  Object.entries(subServiciosES).forEach(([categoria, subs]) => {
    subs.forEach((sub) => {
      routes.push({
        url: `${baseUrl}/es/servicios/${categoria}/${sub}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  // Industrias ES
  industriasES.forEach((industria) => {
    routes.push({
      url: `${baseUrl}/es/industrias/${industria}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return routes;
}

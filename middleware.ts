import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always' // Siempre incluir /es/ o /en/ en la URL
});

export const config = {
  // Excluir rutas de API, archivos estáticos, y assets
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};

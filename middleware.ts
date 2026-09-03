import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  // next-intl emitia una cabecera Link con hreflang cuyo x-default apuntaba a
  // la ruta sin prefijo (p. ej. /servicios), que siempre redirige. Contradecia
  // al x-default del HTML, que apunta a /es/servicios. El HTML ya lleva los
  // tres hreflang correctos, asi que la cabecera sobra.
  alternateLinks: false,
});

export function middleware(req: NextRequest) {
  // Sanity Studio: servir sin layout de locale (evita pantalla en blanco por ThemeProvider/context)
  if (req.nextUrl.pathname.startsWith('/studio')) {
    return NextResponse.next();
  }

  // El canonical y los hreflang los construye cada página desde
  // `lib/seo/routes.ts`, así que ya no hace falta propagar el pathname.
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

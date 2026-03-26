import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export function middleware(req: NextRequest) {
  // Sanity Studio: servir sin layout de locale (evita pantalla en blanco por ThemeProvider/context)
  if (req.nextUrl.pathname.startsWith('/studio')) {
    return NextResponse.next();
  }

  const response = intlMiddleware(req);

  // Pass the original pathname to layouts/pages so they can build correct canonical/hreflang URLs
  response.headers.set('x-pathname', req.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

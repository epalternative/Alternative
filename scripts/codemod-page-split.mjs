/**
 * Codemod — Fase 1b.
 *
 * Convierte cada `page.tsx` marcado con "use client" en dos archivos:
 *
 *   page.tsx        → server component: exporta `generateMetadata` desde el
 *                     registro central y renderiza el cliente.
 *   PageClient.tsx  → el componente cliente original, sin tocar.
 *
 * Solo actúa sobre las rutas presentes en `lib/seo/routes.ts`. Las rutas
 * dinámicas, `/studio` y `business-consultants` se dejan intactas (las
 * resuelve la Fase 3).
 *
 * Uso:  node scripts/codemod-page-split.mjs [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';

const DRY = process.argv.includes('--dry');
const APP = 'app/[locale]';

// ── Cargar el registro sin depender de TS ─────────────────────
const routesSrc = fs.readFileSync('lib/seo/routes.ts', 'utf8');
const from = routesSrc.indexOf('export const ROUTES: RouteMeta[] = [');
const to = routesSrc.indexOf('\n];', from);
const ROUTES = eval(routesSrc.slice(routesSrc.indexOf('[', from), to + 2));

const isClient = (src) => /^\s*['"]use client['"]/.test(src);

function serverPage(routePath) {
  const literal = routePath === '' ? "''" : `'${routePath}'`;
  return `import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import PageClient from './PageClient';

const PATH = ${literal};

export function generateMetadata({
  params,
}: {
  params: { locale: 'es' | 'en' };
}): Metadata {
  return buildPageMetadata(PATH, params.locale);
}

export default function Page({ params }: { params: { locale: 'es' | 'en' } }) {
  setRequestLocale(params.locale);
  return <PageClient />;
}
`;
}

const done = [];
const skipped = [];

for (const route of ROUTES) {
  const dir = path.join(APP, route.path);
  const pageFile = path.join(dir, 'page.tsx');
  const clientFile = path.join(dir, 'PageClient.tsx');

  if (!fs.existsSync(pageFile)) {
    skipped.push([route.path || '/', 'no existe page.tsx']);
    continue;
  }

  const src = fs.readFileSync(pageFile, 'utf8');

  if (!isClient(src)) {
    skipped.push([route.path || '/', 'ya es server component']);
    continue;
  }
  if (fs.existsSync(clientFile)) {
    skipped.push([route.path || '/', 'PageClient.tsx ya existe']);
    continue;
  }

  if (!DRY) {
    fs.writeFileSync(clientFile, src);
    fs.writeFileSync(pageFile, serverPage(route.path));
  }
  done.push(route.path || '/');
}

console.log(`${DRY ? '[dry-run] ' : ''}divididas: ${done.length}`);
done.forEach((p) => console.log('   ✔', p));
if (skipped.length) {
  console.log(`omitidas: ${skipped.length}`);
  skipped.forEach(([p, why]) => console.log('   –', p, '→', why));
}

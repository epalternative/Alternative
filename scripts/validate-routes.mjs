/**
 * Validación estática del registro `lib/seo/routes.ts`.
 *
 * Comprueba, sin levantar servidor:
 *  - cobertura: el registro cubre exactamente el árbol de `app/[locale]/`
 *  - longitudes: title 50–60, description 140–160
 *  - unicidad: title, description y keyword únicos por idioma
 *
 * Uso:  node scripts/validate-routes.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const src = fs.readFileSync('lib/seo/routes.ts', 'utf8');
const s = src.indexOf('export const ROUTES: RouteMeta[] = [');
const e = src.indexOf('\n];', s);
const ROUTES = eval(src.slice(src.indexOf('[', s), e + 2));

const TITLE = [50, 60];
const DESC = [140, 160];
/** Rutas excluidas del registro a propósito (las resuelve la Fase 3). */
const EXCLUDED = ['/business-consultants'];

let errors = 0;
let warnings = 0;
const err = (m) => { console.log('  ✖ ' + m); errors++; };
/** Un title más corto del objetivo no rompe nada en SERP; uno más largo sí (trunca). */
const warn = (m) => { console.log('  ⚠ ' + m); warnings++; };

// ── Cobertura ─────────────────────────────────────────────────
function walk(d, acc = []) {
  for (const it of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, it.name);
    if (it.isDirectory()) walk(p, acc);
    else if (it.name === 'page.tsx') acc.push(p);
  }
  return acc;
}
const fsRoutes = walk('app/[locale]')
  .map((f) => f.split(path.sep).join('/').replace('app/[locale]', '').replace('/page.tsx', ''))
  .filter((r) => !r.includes('[') && !r.includes('studio'))
  .filter((r) => !EXCLUDED.includes(r));

const reg = new Set(ROUTES.map((r) => r.path));
console.log(`\nCobertura — registro: ${ROUTES.length} · árbol: ${fsRoutes.length}`);
for (const r of fsRoutes) if (!reg.has(r)) err(`falta en el registro: ${r || '/'}`);
for (const r of reg) if (!fsRoutes.includes(r)) err(`sobra en el registro (no existe la página): ${r || '/'}`);

// ── Longitudes ────────────────────────────────────────────────
console.log('\nLongitudes');
for (const r of ROUTES) {
  for (const loc of ['es', 'en']) {
    const t = r.title[loc];
    const d = r.description[loc];
    if (t.length > TITLE[1]) err(`title ${loc} de ${t.length} (máx ${TITLE[1]}, trunca en SERP) · ${r.path || '/'} · "${t}"`);
    else if (t.length < TITLE[0]) warn(`title ${loc} de ${t.length} (objetivo ${TITLE[0]}–${TITLE[1]}) · ${r.path || '/'} · "${t}"`);
    if (d.length < DESC[0] || d.length > DESC[1]) err(`description ${loc} de ${d.length} (${DESC[0]}–${DESC[1]}) · ${r.path || '/'}`);
  }
}

// ── Unicidad ──────────────────────────────────────────────────
console.log('\nUnicidad (title · description · keyword, por idioma)');
for (const field of ['title', 'description', 'keyword']) {
  for (const loc of ['es', 'en']) {
    const seen = new Map();
    for (const r of ROUTES) {
      const v = r[field][loc];
      if (seen.has(v)) err(`${field}.${loc} duplicado: "${v}"\n      → ${seen.get(v) || '/'}  y  ${r.path || '/'}`);
      else seen.set(v, r.path);
    }
  }
}

console.log('\n' + '─'.repeat(60));
if (warnings) console.log(`⚠ ${warnings} aviso(s) — titles por debajo del objetivo, sin impacto en SERP`);
if (errors) { console.log(`✖ ${errors} error(es)`); process.exit(1); }
console.log(`✔ registro válido — ${ROUTES.length} rutas, ${ROUTES.length * 6} campos únicos verificados`);

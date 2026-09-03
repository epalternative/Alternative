/**
 * Codemod — Fase 2.3.
 *
 * Extrae el array `faqs` que vive dentro de cada `PageClient.tsx` a un módulo
 * de datos bilingüe en `lib/content/faqs/`, para que el server component pueda
 * leerlo y emitir `FAQPage` sin importar nada marcado con "use client".
 *
 * El `PageClient.tsx` pasa a importar los datos y localizarlos, de modo que el
 * JSX que los renderiza no cambia (misma UI).
 *
 * Usa el parser de TypeScript, no expresiones regulares.
 *
 * Uso:  node scripts/codemod-extract-faqs.mjs [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const DRY = process.argv.includes('--dry');
const APP = 'app/[locale]';
const OUT_DIR = 'lib/content/faqs';

/** Convierte '/servicios/sistemas-calidad/certificacion-iso' → 'servicios--sistemas-calidad--certificacion-iso' */
const keyFor = (routePath) => (routePath === '' ? 'home' : routePath.slice(1).replace(/\//g, '--'));

function findClients(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) findClients(p, acc);
    else if (e.name === 'PageClient.tsx') acc.push(p);
  }
  return acc;
}

/** Devuelve {es, en} para un valor de propiedad, o null si no se reconoce. */
function bilingual(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return { es: node.text, en: node.text, monolingual: true };
  }
  if (ts.isConditionalExpression(node)) {
    const t = node.whenTrue;
    const f = node.whenFalse;
    const lit = (n) =>
      ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n) ? n.text : null;
    const es = lit(t);
    const en = lit(f);
    if (es !== null && en !== null) return { es, en };
  }
  return null;
}

// Solo se extraen las rutas cuyo JSON-LD llevará FAQPage: `service` e `industry`.
// El resto conserva sus FAQs en el JSX (p. ej. /nosotros, que además usa `q`/`a`).
const routesSrc = fs.readFileSync('lib/seo/routes.ts', 'utf8');
const rs = routesSrc.indexOf('export const ROUTES: RouteMeta[] = [');
const rEnd = routesSrc.indexOf('\n];', rs);
const ROUTES = eval(routesSrc.slice(routesSrc.indexOf('[', rs), rEnd + 2));
const FAQ_TYPES = new Set(['service', 'industry']);
const eligible = new Set(ROUTES.filter((r) => FAQ_TYPES.has(r.type)).map((r) => r.path));

const results = [];
const problems = [];
const skipped = [];

for (const file of findClients(APP).sort()) {
  const rel = file.split(path.sep).join('/');
  const routePath = rel.replace(`${APP}/`, '/').replace('/PageClient.tsx', '').replace(/^\/$/, '');
  const src = fs.readFileSync(file, 'utf8');
  if (!src.includes('const faqs = [')) continue;
  if (!eligible.has(routePath)) { skipped.push([routePath, 'tipo sin FAQPage; FAQs se quedan en el JSX']); continue; }

  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  let decl = null;
  const visit = (node) => {
    if (
      !decl &&
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === 'faqs' &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      decl = node;
      return;
    }
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(sf, visit);

  if (!decl) { problems.push([routePath, 'no se encontró `const faqs = [...]`']); continue; }

  const entries = [];
  let bad = false;
  for (const el of decl.initializer.elements) {
    if (!ts.isObjectLiteralExpression(el)) { bad = true; break; }
    const out = {};
    for (const prop of el.properties) {
      if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) { bad = true; break; }
      // `/nosotros` usa `q`/`a` en lugar de `question`/`answer`.
      const alias = { q: 'question', a: 'answer' };
      const name = alias[prop.name.text] ?? prop.name.text;
      if (name !== 'question' && name !== 'answer') continue;
      const val = bilingual(prop.initializer);
      if (!val) { bad = true; break; }
      out[name] = val;
    }
    if (bad || !out.question || !out.answer) { bad = true; break; }
    entries.push(out);
  }

  if (bad || !entries.length) {
    problems.push([routePath, 'forma no reconocida en algún elemento; se deja intacto']);
    continue;
  }

  // ── Fichero de datos ──
  const key = keyFor(routePath);
  const body =
    `import type { FaqEntry } from '../faqs';\n\n` +
    `/** FAQs de ${routePath || '/'} — extraídas de su PageClient.tsx. */\n` +
    `export const faqs: FaqEntry[] = [\n` +
    entries
      .map(
        (e) =>
          `  {\n` +
          `    question: {\n      es: ${JSON.stringify(e.question.es)},\n      en: ${JSON.stringify(e.question.en)},\n    },\n` +
          `    answer: {\n      es: ${JSON.stringify(e.answer.es)},\n      en: ${JSON.stringify(e.answer.en)},\n    },\n` +
          `  },`
      )
      .join('\n') +
    `\n];\n`;

  // ── Reescritura del PageClient ──
  const start = decl.initializer.getStart(sf);
  const end = decl.initializer.getEnd();
  const condSrc = src.slice(start, end);
  const usesIsEs = /\bisEs\b/.test(condSrc);
  const usesLanguage = /language === 'es'/.test(condSrc);
  const localeExpr = usesIsEs
    ? `isEs ? 'es' : 'en'`
    : usesLanguage
      ? `language === 'es' ? 'es' : 'en'`
      : null;

  if (!localeExpr && entries.some((e) => !e.question.monolingual)) {
    problems.push([routePath, 'no se detectó la variable de idioma']);
    continue;
  }

  const importLine = `import { faqs as faqData } from '@/lib/content/faqs/${key}';\nimport { localizeFaqs } from '@/lib/content/faqs';\n`;
  let next = src.slice(0, start) + `localizeFaqs(faqData, ${localeExpr ?? `'es'`})` + src.slice(end);

  // insertar imports tras el último import existente
  const importRx = /^import .*;$/gm;
  let lastImportEnd = 0;
  for (const m of next.matchAll(importRx)) lastImportEnd = m.index + m[0].length;
  next = next.slice(0, lastImportEnd) + '\n' + importLine.trimEnd() + next.slice(lastImportEnd);

  if (!DRY) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(path.join(OUT_DIR, `${key}.ts`), body);
    fs.writeFileSync(file, next);
  }
  results.push([routePath, key, entries.length]);
}

// ── Índice ──
if (!DRY && results.length) {
  const idx =
    `/**\n * Registro de FAQs por ruta.\n *\n * Datos planos y bilingües: los consume tanto el PageClient (localizados) como\n * el server component que emite el JSON-LD de \`FAQPage\`.\n */\n\n` +
    `export interface FaqEntry {\n  question: { es: string; en: string };\n  answer: { es: string; en: string };\n}\n\n` +
    results.map(([, key]) => `import { faqs as ${key.replace(/[^a-zA-Z0-9]/g, '_')} } from './faqs/${key}';`).join('\n') +
    `\n\n/** Ruta (sin locale) → FAQs. */\nexport const FAQS_BY_PATH: Record<string, FaqEntry[]> = {\n` +
    results.map(([routePath, key]) => `  ${JSON.stringify(routePath)}: ${key.replace(/[^a-zA-Z0-9]/g, '_')},`).join('\n') +
    `\n};\n\n` +
    `/** FAQs de una ruta, o \`undefined\` si no tiene. */\nexport function getFaqsForPath(routePath: string): FaqEntry[] | undefined {\n  return FAQS_BY_PATH[routePath];\n}\n\n` +
    `/** Aplana las FAQs a un idioma, tal como las espera el JSX del cliente. */\nexport function localizeFaqs(\n  entries: FaqEntry[],\n  locale: 'es' | 'en'\n): { question: string; answer: string }[] {\n  return entries.map((e) => ({ question: e.question[locale], answer: e.answer[locale] }));\n}\n`;
  // El registro va aparte: `faqs.ts` no debe importar datos, porque lo
  // consumen los PageClient y arrastraria las FAQs de todo el sitio.
  fs.writeFileSync(path.join('lib/content', 'faqs-registry.ts'), idx);
}

console.log(`${DRY ? '[dry-run] ' : ''}extraídas: ${results.length} páginas`);
for (const [p, k, n] of results) console.log(`   ✔ ${p || '/'}  →  ${k}.ts  (${n} FAQs)`);
if (problems.length) {
  console.log(`\nsin tocar: ${problems.length}`);
  for (const [p, why] of problems) console.log(`   – ${p || '/'} → ${why}`);
}

if (skipped.length) {
  console.log(`
omitidas por tipo: ${skipped.length}`);
  for (const [p, why] of skipped) console.log(`   - ${p || "/"} -> ${why}`);
}

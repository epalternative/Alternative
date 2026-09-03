/**
 * Conteo de palabras del copy de una página.
 *
 * Usa el parser de TypeScript y se queda solo con los literales de texto que
 * llegan al usuario: descarta `className`, rutas, imports y claves técnicas.
 * Para los ternarios `isEs ? A : B` cuenta el lado que corresponda al idioma.
 *
 * Uso:  node scripts/count-words.mjs <fichero.tsx> [es|en]
 */
import fs from 'node:fs';
import ts from 'typescript';

const file = process.argv[2];
const lang = process.argv[3] === 'en' ? 'en' : 'es';
if (!file) {
  console.error('uso: node scripts/count-words.mjs <fichero.tsx> [es|en]');
  process.exit(2);
}

const src = fs.readFileSync(file, 'utf8');
const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

/** Literales que son clases, rutas o claves, no prosa. */
const isNoise = (s) =>
  /^[\w\-/.#@:]+$/.test(s) ||
  /(^|\s)(text-|bg-|flex|grid|rounded|border|w-|h-|px-|py-|mb-|mt-|ml-|mr-|gap-|absolute|relative|hover:|dark:|md:|lg:|xl:|sm:|group|leading-|font-|tracking-|inline|block|opacity|translate|duration|ease|shadow|space-|max-w|min-h|object-|overflow|z-|top-|left-|right-|bottom-|items-|justify-|col-|row-)/.test(s) ||
  !/[aeiouáéíóúàèìòù]/i.test(s);

const texts = [];

function isEsCondition(node) {
  const t = node.getText(sf);
  return /\bisEs\b|language === 'es'|locale === 'es'/.test(t);
}

function visit(node) {
  // Ternario de idioma: quedarse con la rama pedida
  if (ts.isConditionalExpression(node) && isEsCondition(node.condition)) {
    visit(lang === 'es' ? node.whenTrue : node.whenFalse);
    return;
  }
  // Atributos JSX: solo contar los de texto visible
  if (ts.isJsxAttribute(node)) {
    const name = node.name.getText(sf);
    if (!['alt', 'title', 'aria-label', 'placeholder'].includes(name)) return;
  }
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    const v = node.text.trim();
    if (v && !isNoise(v)) texts.push(v);
  }
  if (ts.isJsxText(node)) {
    const v = node.text.replace(/\s+/g, ' ').trim();
    if (v && !isNoise(v)) texts.push(v);
  }
  ts.forEachChild(node, visit);
}
ts.forEachChild(sf, visit);

const words = texts.join(' ').split(/\s+/).filter(Boolean).length;
console.log(`${words}\t${lang}\t${file}`);

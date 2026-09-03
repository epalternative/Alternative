/**
 * Tipo y utilidad de FAQs — **sin dependencias de datos**.
 *
 * Este modulo lo importan los `PageClient.tsx`, asi que no debe importar
 * ningun fichero de `./faqs/`: hacerlo metia las FAQs de las 37 paginas en el
 * bundle de cada una (+58 kB de First Load JS por ruta).
 *
 * El registro completo vive en `./faqs-registry`, que solo usa el servidor.
 */

export interface FaqEntry {
  question: { es: string; en: string };
  answer: { es: string; en: string };
}

/** Aplana las FAQs a un idioma, tal como las espera el JSX del cliente. */
export function localizeFaqs(
  entries: FaqEntry[],
  locale: 'es' | 'en'
): { question: string; answer: string }[] {
  return entries.map((e) => ({ question: e.question[locale], answer: e.answer[locale] }));
}

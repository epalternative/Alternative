/**
 * ROI Calculator: Optimización de Procesos
 * Formulas and recommendation logic per spec.
 */

export type Frecuencia = 'hora' | 'dia' | 'semana' | 'mes' | 'trimestre';

export interface RoiInputs {
  processName?: string;
  frecuencia: Frecuencia;
  volumen: number;
  tiempoMinutos: number;
  personas: number;
  costoHora: number;
  mejoraPct: number; // 0-80, e.g. 30 for 30%
  costoProyecto: number;
}

export interface RoiResults {
  volumenAnual: number;
  tiempoTotalHoras: number;
  costoAnual: number;
  costoPorEjecucion: number;
  tiempoOptimizadoHoras: number;
  costoOptimizado: number;
  ahorroAnual: number;
  reduccionPct: number;
  roi: number;
  paybackMeses: number;
  beneficioAno1: number;
  beneficio3Anos: number;
}

export type RoiRecommendationLevel = 'high' | 'justified' | 'analyze' | 'reevaluate';

export interface RoiRecommendation {
  level: RoiRecommendationLevel;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

const FACTOR_ANUAL: Record<Frecuencia, number> = {
  hora: 2080,   // 52 weeks × 40 h
  dia: 250,     // ~50 weeks × 5 days
  semana: 50,
  mes: 12,
  trimestre: 4,
};

export function computeRoiResults(inputs: RoiInputs): RoiResults {
  const volumenAnual = inputs.volumen * FACTOR_ANUAL[inputs.frecuencia];
  const tiempoTotalHoras = (volumenAnual * inputs.tiempoMinutos * inputs.personas) / 60;
  const costoAnual = tiempoTotalHoras * inputs.costoHora;
  const costoPorEjecucion = volumenAnual > 0 ? costoAnual / volumenAnual : 0;

  const mejoraDecimal = inputs.mejoraPct / 100;
  const tiempoOptimizadoHoras = tiempoTotalHoras * (1 - mejoraDecimal);
  const costoOptimizado = tiempoOptimizadoHoras * inputs.costoHora;
  const ahorroAnual = costoAnual - costoOptimizado;
  const reduccionPct = tiempoTotalHoras > 0
    ? ((tiempoTotalHoras - tiempoOptimizadoHoras) / tiempoTotalHoras) * 100
    : 0;

  const beneficioAno1 = ahorroAnual - inputs.costoProyecto;
  const roi = inputs.costoProyecto > 0 ? (beneficioAno1 / inputs.costoProyecto) * 100 : 0;
  const paybackMeses = ahorroAnual > 0 ? (inputs.costoProyecto / ahorroAnual) * 12 : 0;
  const beneficio3Anos = ahorroAnual * 3 - inputs.costoProyecto;

  return {
    volumenAnual,
    tiempoTotalHoras,
    costoAnual,
    costoPorEjecucion,
    tiempoOptimizadoHoras,
    costoOptimizado,
    ahorroAnual,
    reduccionPct,
    roi,
    paybackMeses,
    beneficioAno1,
    beneficio3Anos,
  };
}

export function getRecommendation(roi: number): RoiRecommendationLevel {
  if (roi > 200) return 'high';
  if (roi >= 100) return 'justified';
  if (roi >= 50) return 'analyze';
  return 'reevaluate';
}

export function getRecommendationContent(
  level: RoiRecommendationLevel,
  t: (key: string, values?: Record<string, string | number>) => string,
  results: RoiResults
): RoiRecommendation {
  const roi = Math.round(results.roi);
  const ahorro = Math.round(results.ahorroAnual);
  const payback = results.paybackMeses.toFixed(1);

  switch (level) {
    case 'high':
      return {
        level: 'high',
        title: t('recommendation.high.title'),
        body: t('recommendation.high.body', { roi, ahorro, payback } as Record<string, string | number>),
        ctaLabel: t('cta.high'),
        ctaHref: '/contacto',
      };
    case 'justified':
      return {
        level: 'justified',
        title: t('recommendation.justified.title'),
        body: t('recommendation.justified.body', { roi, payback, ahorro } as Record<string, string | number>),
        ctaLabel: t('cta.justified'),
        ctaHref: '/contacto',
      };
    case 'analyze':
      return {
        level: 'analyze',
        title: t('recommendation.analyze.title'),
        body: t('recommendation.analyze.body', { roi } as Record<string, string | number>),
        ctaLabel: t('cta.analyze'),
        ctaHref: '/contacto',
      };
    default:
      return {
        level: 'reevaluate',
        title: t('recommendation.reevaluate.title'),
        body: t('recommendation.reevaluate.body', { roi } as Record<string, string | number>),
        ctaLabel: t('cta.reevaluate'),
        ctaHref: '/contacto',
      };
  }
}

export function formatNumber(n: number, decimals = 0): string {
  return new Intl.NumberFormat('es-PA', { maximumFractionDigits: decimals, minimumFractionDigits: decimals }).format(n);
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat('es-PA', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

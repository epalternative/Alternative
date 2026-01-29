/**
 * Digital Maturity Assessment - scoring and recommendations.
 */

import { DIMENSIONS, INDUSTRY_BENCHMARKS } from './madurez-digital-data';

export interface PreliminaryAnswers {
  industry: string;
  role: string;
  companySize: string;
}

export interface QuestionnaireAnswers {
  [questionId: string]: number; // points selected per question id (q1..q20)
}

export interface DimensionScores {
  strategy: number;
  channels: number;
  data: number;
  tech: number;
}

export interface MadurezScores {
  total: number;
  dimensions: DimensionScores;
  level: 'inicial' | 'emergente' | 'avanzado' | 'lider';
  levelKey: string;
  benchmark: number;
  benchmarkDiff: number;
  strongest: { id: string; score: number }[];
  weakest: { id: string; score: number }[];
}

export function calculateDimensionScores(answers: QuestionnaireAnswers): DimensionScores {
  const scores: DimensionScores = { strategy: 0, channels: 0, data: 0, tech: 0 };
  for (const dim of DIMENSIONS) {
    let sum = 0;
    let count = 0;
    for (const q of dim.questions) {
      const pts = answers[q.id];
      if (typeof pts === 'number') {
        sum += pts;
        count++;
      }
    }
    scores[dim.id as keyof DimensionScores] = count > 0 ? Math.round(sum / count) : 0;
  }
  return scores;
}

export function calculateTotalScore(dimensions: DimensionScores): number {
  const sum =
    dimensions.strategy + dimensions.channels + dimensions.data + dimensions.tech;
  return Math.round(sum / 4);
}

export function getMaturityLevel(score: number): { level: MadurezScores['level']; levelKey: string } {
  if (score >= 76) return { level: 'lider', levelKey: 'levels.lider' };
  if (score >= 51) return { level: 'avanzado', levelKey: 'levels.avanzado' };
  if (score >= 26) return { level: 'emergente', levelKey: 'levels.emergente' };
  return { level: 'inicial', levelKey: 'levels.inicial' };
}

export function getBenchmark(industry: string): number {
  return INDUSTRY_BENCHMARKS[industry] ?? 50;
}

export function computeMadurezScores(
  answers: QuestionnaireAnswers,
  industry: string
): MadurezScores {
  const dimensions = calculateDimensionScores(answers);
  const total = calculateTotalScore(dimensions);
  const { level, levelKey } = getMaturityLevel(total);
  const benchmark = getBenchmark(industry);
  const benchmarkDiff = total - benchmark;

  const entries = (Object.entries(dimensions) as [keyof DimensionScores, number][]).map(
    ([id, score]) => ({ id, score })
  );
  const sorted = [...entries].sort((a, b) => a.score - b.score);
  const weakest = sorted.slice(0, 2);
  const strongest = sorted.slice(-2).reverse();

  return {
    total,
    dimensions,
    level,
    levelKey,
    benchmark,
    benchmarkDiff,
    strongest,
    weakest,
  };
}

export function getDimensionNameKey(dimId: string): string {
  const dim = DIMENSIONS.find((d) => d.id === dimId);
  return dim?.nameKey ?? dimId;
}

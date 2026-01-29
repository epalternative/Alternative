'use client';

import { useTranslations } from 'next-intl';

interface MadurezGaugeProps {
  value: number;
  max?: number;
  levelKey: string;
}

const levelColors: Record<string, string> = {
  'levels.inicial': 'stroke-red-500',
  'levels.emergente': 'stroke-orange-500',
  'levels.avanzado': 'stroke-yellow-500',
  'levels.lider': 'stroke-green-500',
};

export function MadurezGauge({ value, max = 100, levelKey }: MadurezGaugeProps) {
  const t = useTranslations('calculators.madurez');
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (pct / 100) * circumference;
  const colorClass = levelColors[levelKey] ?? 'stroke-turquesa';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-40 h-40 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`transition-all duration-700 ${colorClass}`}
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-4xl font-bold text-azul-marino dark:text-white">{value}</span>
        <span className="text-lg text-foreground/70">/100</span>
      </div>
    </div>
  );
}

'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useTranslations } from 'next-intl';
import type { RoiResults } from '@/lib/calculators/roi-optimization';

interface RoiChartProps {
  results: RoiResults;
}

export function RoiChart({ results }: RoiChartProps) {
  const t = useTranslations('calculators.roi');
  const data = [
    { name: t('chart.current'), value: results.costoAnual, fill: 'hsl(var(--destructive))' },
    { name: t('chart.optimized'), value: results.costoOptimizado, fill: 'hsl(var(--chart-2))' },
    { name: t('chart.savings'), value: results.ahorroAnual, fill: 'hsl(173 58% 43%)' },
  ];

  return (
    <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-brand">
      <h3 className="text-lg font-semibold text-azul-marino dark:text-white mb-4">
        {t('chart.title')}
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis type="number" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
            <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
            <Legend />
            <Bar dataKey="value" name={t('chart.costUsd')} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumber, formatCurrency } from '@/lib/calculators/roi-optimization';
import type { RoiResults } from '@/lib/calculators/roi-optimization';

interface RoiResultsCardsProps {
  results: RoiResults;
}

export function RoiResultsCards({ results }: RoiResultsCardsProps) {
  const t = useTranslations('calculators.roi');

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Card 1: Situación actual */}
      <Card className="border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20">
        <CardHeader>
          <CardTitle className="text-lg text-red-800 dark:text-red-200">
            {t('results.currentTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            {t('results.currentTime')}: <strong>{formatNumber(results.tiempoTotalHoras)}</strong>{' '}
            {t('results.hoursYear')}
          </p>
          <p>
            {t('results.currentCost')}: <strong>{formatCurrency(results.costoAnual)}</strong> USD
          </p>
          <p>
            {t('results.costPerExecution')}: <strong>{formatCurrency(results.costoPorEjecucion)}</strong> USD
          </p>
        </CardContent>
      </Card>

      {/* Card 2: Después de optimizar */}
      <Card className="border-green-200 dark:border-green-900/50 bg-green-50/50 dark:bg-green-950/20">
        <CardHeader>
          <CardTitle className="text-lg text-green-800 dark:text-green-200">
            {t('results.optimizedTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            {t('results.optimizedTime')}: <strong>{formatNumber(results.tiempoOptimizadoHoras)}</strong>{' '}
            {t('results.hoursYear')} (↓ {formatNumber(results.reduccionPct)}% {t('results.reduction')})
          </p>
          <p>
            {t('results.optimizedCost')}: <strong>{formatCurrency(results.costoOptimizado)}</strong> USD
          </p>
          <p>
            {t('results.annualSavings')}: <strong>{formatCurrency(results.ahorroAnual)}</strong> USD
          </p>
        </CardContent>
      </Card>

      {/* Card 3: ROI y Payback */}
      <Card className="border-turquesa/50 bg-turquesa/10 dark:bg-turquesa/20">
        <CardHeader>
          <CardTitle className="text-lg text-azul-marino dark:text-white">
            {t('results.roiTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            ROI: <strong>{formatNumber(results.roi)}%</strong>
          </p>
          <p>
            {t('results.payback')}: <strong>{formatNumber(results.paybackMeses, 1)}</strong>{' '}
            {t('results.months')}
          </p>
          <p>
            {t('results.benefitYear1')}: <strong>{formatCurrency(results.beneficioAno1)}</strong> USD
          </p>
          <p>
            {t('results.benefit3Years')}: <strong>{formatCurrency(results.beneficio3Anos)}</strong> USD
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

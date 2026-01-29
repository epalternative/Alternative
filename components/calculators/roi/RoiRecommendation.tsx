'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  getRecommendation,
  getRecommendationContent,
  type RoiResults,
  type RoiInputs,
} from '@/lib/calculators/roi-optimization';

interface RoiRecommendationProps {
  results: RoiResults;
  formState: RoiInputs | null;
}

export function RoiRecommendation({ results, formState }: RoiRecommendationProps) {
  const t = useTranslations('calculators.roi');
  const level = getRecommendation(results.roi);
  const content = getRecommendationContent(level, (key, opts) => t(key, opts), results);

  const variantMap = {
    high: 'primary',
    justified: 'primary',
    analyze: 'secondary',
    reevaluate: 'outline',
  } as const;

  return (
    <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-brand">
      <h3 className="text-xl font-semibold text-azul-marino dark:text-white mb-3">
        {content.title}
      </h3>
      <p className="text-foreground/80 mb-6 whitespace-pre-line">{content.body}</p>
      <Button href={content.ctaHref} variant={variantMap[level]} size="lg">
        {content.ctaLabel}
      </Button>
    </div>
  );
}

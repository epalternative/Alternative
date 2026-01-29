'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MadurezGauge } from '@/components/calculators/madurez/MadurezGauge';
import { MadurezPdfLeadForm } from '@/components/calculators/madurez/MadurezPdfLeadForm';
import { DIMENSIONS } from '@/lib/calculators/madurez-digital-data';
import { getDimensionNameKey } from '@/lib/calculators/madurez-digital';
import type { MadurezScores, PreliminaryAnswers, QuestionnaireAnswers } from '@/lib/calculators/madurez-digital';

interface MadurezResultsDashboardProps {
  scores: MadurezScores;
  preliminary: PreliminaryAnswers;
  answers: QuestionnaireAnswers;
}

export function MadurezResultsDashboard({
  scores,
  preliminary,
  answers,
}: MadurezResultsDashboardProps) {
  const t = useTranslations('calculators.madurez');
  const tHub = useTranslations('calculators.hub');
  const locale = useLocale();
  const isEs = locale === 'es';

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Recursos' : 'Resources', href: `/${locale}/recursos` },
    { label: tHub('heading'), href: `/${locale}/recursos/calculadoras` },
    { label: tHub('madurezTitle'), href: null },
  ];

  return (
    <>
      <nav className="bg-lavanda py-4 border-b border-azul-marino/10" aria-label="Breadcrumb">
        <div className="container-custom">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-2">
                {idx > 0 && (
                  <ChevronDown className="w-4 h-4 text-azul-marino/50 -rotate-90 flex-shrink-0" />
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-azul-marino/70 hover:text-azul-marino transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-azul-marino font-medium">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
      <div className="min-h-screen bg-blanco-hueso dark:bg-background py-16">
        <div className="container-custom max-w-3xl space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-azul-marino dark:text-white mb-4">
            {t('results.title')}
          </h1>
          <MadurezGauge
            value={scores.total}
            levelKey={scores.levelKey}
          />
          <p className="text-xl font-medium text-foreground mt-4">
            {t(scores.levelKey)}
          </p>
          <p className="text-foreground/80 mt-2 max-w-xl mx-auto">
            {t(`results.levelDescription.${scores.level}`)}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('results.breakdownTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(Object.entries(scores.dimensions) as [keyof typeof scores.dimensions, number][]).map(
              ([id, score]) => {
                const dim = DIMENSIONS.find((d) => d.id === id);
                return (
                  <div key={id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>
                        {dim?.emoji} {t(getDimensionNameKey(id))}
                      </span>
                      <span>{score}/100</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                );
              }
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('results.benchmarkTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80">
              {t('results.benchmarkLabel', {
                score: scores.total,
                industry: t(`industry.${preliminary.industry}`),
                benchmark: scores.benchmark,
              })}
            </p>
            {scores.benchmarkDiff > 5 && (
              <p className="text-green-700 dark:text-green-300 mt-2">
                {t('results.benchmarkAbove', { diff: scores.benchmarkDiff })}
              </p>
            )}
            {scores.benchmarkDiff < -5 && (
              <p className="text-orange-700 dark:text-orange-300 mt-2">
                {t('results.benchmarkBelow', { diff: Math.abs(scores.benchmarkDiff) })}
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('results.strengthsTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {scores.strongest.map((s, i) => (
                <p key={s.id}>
                  {i + 1}. {t(getDimensionNameKey(s.id))} ({s.score}/100)
                </p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('results.opportunitiesTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {scores.weakest.map((s, i) => (
                <p key={s.id}>
                  {i + 1}. {t(getDimensionNameKey(s.id))} ({s.score}/100)
                </p>
              ))}
            </CardContent>
          </Card>
        </div>

        <MadurezPdfLeadForm scores={scores} preliminary={preliminary} />

        <div className="text-center">
          <Button href="/contacto" size="lg" className="bg-turquesa text-azul-marino hover:bg-turquesa/90">
            {t('results.cta')}
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}

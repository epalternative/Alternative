'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { DIMENSIONS, getAllQuestionsFlat } from '@/lib/calculators/madurez-digital-data';
import { computeMadurezScores } from '@/lib/calculators/madurez-digital';
import type { PreliminaryAnswers, QuestionnaireAnswers } from '@/lib/calculators/madurez-digital';

const STORAGE_KEY = 'madurez_digital';
const STORAGE_STEP = 'madurez_digital_step';

interface MadurezQuestionnaireFlowProps {
  initialAnswers: QuestionnaireAnswers;
  preliminary: PreliminaryAnswers;
  onComplete: (answers: QuestionnaireAnswers, scores: ReturnType<typeof computeMadurezScores>) => void;
  onBack: () => void;
}

const flatQuestions = getAllQuestionsFlat();

export function MadurezQuestionnaireFlow({
  initialAnswers,
  preliminary,
  onComplete,
  onBack,
}: MadurezQuestionnaireFlowProps) {
  const t = useTranslations('calculators.madurez');
  const tHub = useTranslations('calculators.hub');
  const locale = useLocale();
  const isEs = locale === 'es';
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(initialAnswers);

  const current = flatQuestions[currentStep];
  const dimension = DIMENSIONS.find((d) => d.id === current?.dimensionId);
  const progress = ((currentStep + 1) / flatQuestions.length) * 100;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ preliminary, answers }));
      localStorage.setItem(STORAGE_STEP, 'questionnaire');
    } catch {
      // ignore
    }
  }, [preliminary, answers]);

  const handleNext = () => {
    if (currentStep >= flatQuestions.length - 1) {
      const scores = computeMadurezScores(answers, preliminary.industry);
      onComplete(answers, scores);
      return;
    }
    setCurrentStep((s) => s + 1);
  };

  const handlePrevious = () => {
    if (currentStep <= 0) return;
    setCurrentStep((s) => s - 1);
  };

  const setAnswer = (questionId: string, points: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: points }));
  };

  const currentAnswer = current ? answers[current.question.id] : undefined;
  const canNext = current && (typeof currentAnswer === 'number');

  if (!current) return null;

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
        <div className="container-custom max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-foreground/70 mb-2">
            <span>
              {t('progress.question', { current: currentStep + 1, total: flatQuestions.length })}
            </span>
            <span>
              {dimension?.emoji} {t(dimension?.nameKey ?? '')}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <h2 className="text-xl font-semibold text-azul-marino dark:text-white mb-6">
          {t(current.question.questionKey)}
        </h2>
        <RadioGroup
          value={currentAnswer !== undefined ? String(currentAnswer) : ''}
          onValueChange={(v) => setAnswer(current.question.id, Number(v))}
          className="space-y-3"
        >
          {current.question.options.map((opt) => (
            <label
              key={opt.points}
              className="flex items-start gap-3 p-4 rounded-xl border-2 border-gris-arena/30 hover:border-turquesa/50 cursor-pointer transition-colors has-[:checked]:border-turquesa"
            >
              <RadioGroupItem value={String(opt.points)} id={`${current.question.id}-${opt.points}`} className="mt-1" />
              <span className="text-foreground">
              {(() => {
                const text = t(opt.textKey);
                return text === opt.textKey ? `Option ${opt.points}` : text;
              })()}
            </span>
            </label>
          ))}
        </RadioGroup>

        <div className="flex gap-4 mt-10">
          <Button type="button" variant="outline" onClick={currentStep === 0 ? onBack : handlePrevious}>
            {currentStep === 0 ? t('back') : t('previous')}
          </Button>
          <Button onClick={handleNext} disabled={!canNext}>
            {currentStep >= flatQuestions.length - 1 ? t('finish') : t('next')}
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}

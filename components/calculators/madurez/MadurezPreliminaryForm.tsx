'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PRELIMINARY_QUESTIONS } from '@/lib/calculators/madurez-digital-data';
import type { PreliminaryAnswers } from '@/lib/calculators/madurez-digital';

interface MadurezPreliminaryFormProps {
  defaultValues?: Partial<PreliminaryAnswers>;
  onComplete: (data: PreliminaryAnswers) => void;
  onBack: () => void;
}

export function MadurezPreliminaryForm({
  defaultValues,
  onComplete,
  onBack,
}: MadurezPreliminaryFormProps) {
  const t = useTranslations('calculators.madurez');
  const tHub = useTranslations('calculators.hub');
  const locale = useLocale();
  const isEs = locale === 'es';
  const { register, handleSubmit, watch, setValue } = useForm<PreliminaryAnswers>({
    defaultValues: {
      industry: defaultValues?.industry ?? '',
      role: defaultValues?.role ?? '',
      companySize: defaultValues?.companySize ?? '',
    },
  });

  const industry = watch('industry');
  const role = watch('role');
  const companySize = watch('companySize');
  const canSubmit = industry && role && companySize;

  const onSubmit = (data: PreliminaryAnswers) => {
    onComplete(data);
  };

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
          <Button variant="ghost" onClick={onBack} className="mb-8 text-azul-marino hover:text-azul-marino/80">
            {t('back')}
          </Button>
          <h2 className="text-2xl font-semibold text-azul-marino dark:text-white mb-8">
            {t('preliminary.title')}
          </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {PRELIMINARY_QUESTIONS.map((pq) => (
            <div key={pq.id}>
              <Label className="text-base font-medium text-azul-marino dark:text-white mb-3 block">
                {t(pq.questionKey)}
              </Label>
              <RadioGroup
                value={watch(pq.id as keyof PreliminaryAnswers)}
                onValueChange={(v) => setValue(pq.id as keyof PreliminaryAnswers, v)}
                className="flex flex-col gap-2"
              >
                {pq.options.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gris-arena/30 hover:border-turquesa/50 cursor-pointer transition-colors"
                  >
                    <RadioGroupItem value={opt.value} id={`${pq.id}-${opt.value}`} />
                    <span className="text-foreground">{t(opt.labelKey)}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
          ))}
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onBack}>
              {t('back')}
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              {t('preliminary.cta')}
            </Button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

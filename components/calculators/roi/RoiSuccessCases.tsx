'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Factory, Building2, ShoppingCart } from 'lucide-react';

const cases = [
  { icon: Factory, key: 'case1', industryKey: 'case1Industry', mejora: 65, ahorro: 280, roi: 320 },
  { icon: Building2, key: 'case2', industryKey: 'case2Industry', mejora: 55, ahorro: 180, roi: 240 },
  { icon: ShoppingCart, key: 'case3', industryKey: 'case3Industry', mejora: 40, ahorro: 95, roi: 180 },
];

export function RoiSuccessCases() {
  const t = useTranslations('calculators.roi.cases');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-azul-marino dark:text-white">
        {t('title')}
      </h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {cases.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.key}
              className="bg-white dark:bg-card rounded-xl p-4 shadow-brand border border-gris-arena/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-5 h-5 text-turquesa" />
                <span className="font-medium text-azul-marino dark:text-white">
                  {t(c.industryKey)}
                </span>
              </div>
              <p className="text-sm text-foreground/80">
                {t('mejora')}: {c.mejora}% | {t('ahorro')}: ${c.ahorro}K | ROI: {c.roi}%
              </p>
            </div>
          );
        })}
      </div>
      <Link
        href="/casos-exito"
        className="inline-flex items-center gap-2 text-turquesa font-medium hover:underline"
      >
        {t('link')}
      </Link>
    </div>
  );
}

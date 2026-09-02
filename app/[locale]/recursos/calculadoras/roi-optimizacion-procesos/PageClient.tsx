'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDown, TrendingUp, ArrowRight } from 'lucide-react';
import { RoiCalculatorForm } from '@/components/calculators/roi/RoiCalculatorForm';
import { RoiResultsCards } from '@/components/calculators/roi/RoiResultsCards';
import { RoiChart } from '@/components/calculators/roi/RoiChart';
import { RoiRecommendation } from '@/components/calculators/roi/RoiRecommendation';
import { RoiFaq } from '@/components/calculators/roi/RoiFaq';
import { RoiPdfModal } from '@/components/calculators/roi/RoiPdfModal';
import { RoiSuccessCases } from '@/components/calculators/roi/RoiSuccessCases';
import { useRoiCalculator } from '@/components/calculators/roi/useRoiCalculator';
import { computeRoiResults } from '@/lib/calculators/roi-optimization';

export default function RoiOptimizacionPage() {
  const t = useTranslations('calculators.roi');
  const tHub = useTranslations('calculators.hub');
  const locale = useLocale();
  const isEs = locale === 'es';
  const { formState, results, setResults, resetForm, savedInputs, saveToLocalStorage, onCalculate } = useRoiCalculator();

  const breadcrumbs = [
    { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
    { label: isEs ? 'Recursos' : 'Resources', href: `/${locale}/recursos` },
    { label: tHub('heading'), href: `/${locale}/recursos/calculadoras` },
    { label: t('hero.title'), href: null },
  ];

  const handleCalculate = (inputs: Parameters<typeof computeRoiResults>[0]) => {
    setResults(computeRoiResults(inputs));
    onCalculate(inputs);
  };

  return (
    <>
      {/* Hero: fondo violeta, títulos en blanco-hueso, texto secundario visible (estándar Recursos) */}
      <section className="relative bg-violeta overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[20%] right-[8%] w-32 h-32 bg-blanco-hueso/10 rounded-2xl rotate-12"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[20%] left-[5%] w-24 h-24 bg-blanco-hueso/8 rounded-2xl -rotate-6"
          />
        </div>

        <div className="container-custom relative z-10 pt-8 pb-16 lg:pb-20">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
            aria-label="Breadcrumb"
          >
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {idx > 0 && (
                    <ChevronDown className="w-4 h-4 text-blanco-hueso/60 -rotate-90 flex-shrink-0" />
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-blanco-hueso/85 hover:text-blanco-hueso transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-blanco-hueso font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blanco-hueso/15 rounded-2xl flex items-center justify-center border border-blanco-hueso/25">
                  <TrendingUp className="w-8 h-8 text-blanco-hueso" />
                </div>
                <div>
                  <span className="text-blanco-hueso text-sm font-medium uppercase tracking-wider">
                    {tHub('heading')}
                  </span>
                  <p className="text-blanco-hueso/90 text-sm">
                    ROI · {isEs ? 'Optimización de procesos' : 'Process optimization'}
                  </p>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl text-blanco-hueso font-semibold leading-tight mb-4">
                {t('hero.title')}
              </h1>

              <p className="text-xl md:text-2xl text-blanco-hueso font-medium mb-4">
                {t('hero.subtitle')}
              </p>

              <p className="text-lg md:text-xl text-blanco-hueso/95 mb-8 leading-relaxed">
                {t('hero.description')}
              </p>

              <a
                href="#roi-form"
                className="inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-6 py-3 rounded-lg hover:bg-menta transition-all duration-300 shadow-lg shadow-turquesa/20 group mb-8"
              >
                {t('form.calculateBtn')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-blanco-hueso/25">
                {[
                  { value: '20-30%', label: isEs ? 'costos procesos' : 'process costs' },
                  { value: '100%', label: isEs ? 'gratuito' : 'free' },
                  { value: '✓', label: 'ROI · Payback' },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-blanco-hueso font-bold">{stat.value}</span>
                    <span className="text-blanco-hueso/90 text-sm">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-blanco-hueso/95 backdrop-blur-xl rounded-3xl p-8 border border-blanco-hueso/30 shadow-brand"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-turquesa" />
                  <div className="w-3 h-3 rounded-full bg-menta" />
                  <div className="w-3 h-3 rounded-full bg-violeta" />
                  <span className="ml-auto text-azul-marino/50 text-sm">
                    {isEs ? 'ROI estimado' : 'Estimated ROI'}
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    { label: isEs ? 'Ahorro anual' : 'Annual savings', value: '35%', pct: 85 },
                    { label: isEs ? 'Reducción costos' : 'Cost reduction', value: '-28%', pct: 72 },
                    { label: 'Payback', value: '8-14', pct: 70 },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <span className="text-azul-marino text-sm font-medium block">{item.label}</span>
                      </div>
                      <span className="text-turquesa font-bold text-sm flex-shrink-0">{item.value}</span>
                      <div className="h-1.5 w-16 bg-azul-marino/10 rounded-full overflow-hidden flex-shrink-0">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.pct}%` }}
                          transition={{ duration: 1, delay: 0.5 + idx * 0.15 }}
                          className="h-full bg-gradient-to-r from-turquesa to-menta rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-azul-marino/10 flex justify-between text-sm">
                  <span className="text-azul-marino/60">{isEs ? 'Referencia típica' : 'Typical reference'}</span>
                  <span className="text-azul-marino font-semibold">ROI</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-blanco-hueso dark:bg-background py-16">
        <div className="container-custom max-w-4xl">
        <section id="roi-form" className="scroll-mt-24">
          <RoiCalculatorForm
            defaultValues={savedInputs}
            onCalculate={handleCalculate}
            onReset={resetForm}
            onSave={saveToLocalStorage}
          />
        </section>

        {/* Results */}
        {results && (
          <>
            <section id="roi-results" className="scroll-mt-24 mt-12 space-y-8">
              <RoiResultsCards results={results} />
              <RoiChart results={results} />
              <RoiRecommendation results={results} formState={formState} />
            </section>

            <section className="mt-12 flex flex-wrap gap-4 justify-center">
              <RoiPdfModal results={results} formState={formState} />
            </section>
          </>
        )}

        {/* Success cases */}
        <section className="mt-16">
          <RoiSuccessCases />
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-azul-marino dark:text-white mb-6">
            {t('faq.title')}
          </h2>
          <RoiFaq />
        </section>
      </div>
    </div>
    </>
  );
}

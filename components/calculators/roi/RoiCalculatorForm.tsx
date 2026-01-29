'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import type { RoiInputs, Frecuencia } from '@/lib/calculators/roi-optimization';

const frecuenciaOptions: { value: Frecuencia; labelKey: string }[] = [
  { value: 'hora', labelKey: 'freqHour' },
  { value: 'dia', labelKey: 'freqDay' },
  { value: 'semana', labelKey: 'freqWeek' },
  { value: 'mes', labelKey: 'freqMonth' },
  { value: 'trimestre', labelKey: 'freqQuarter' },
];

const schema = z.object({
  processName: z.string().optional(),
  frecuencia: z.enum(['hora', 'dia', 'semana', 'mes', 'trimestre']),
  volumen: z.number().min(1),
  tiempoMinutos: z.number().min(1),
  personas: z.number().min(1),
  costoHora: z.number().min(0),
  mejoraPct: z.number().min(0).max(80),
  costoProyecto: z.number().min(0),
});

type FormValues = z.infer<typeof schema>;

interface RoiCalculatorFormProps {
  defaultValues?: Partial<RoiInputs>;
  onCalculate: (inputs: RoiInputs) => void;
  onReset: () => void;
  onSave: (inputs: RoiInputs) => void;
}

export function RoiCalculatorForm({
  defaultValues,
  onCalculate,
  onReset,
  onSave,
}: RoiCalculatorFormProps) {
  const t = useTranslations('calculators.roi');
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      processName: defaultValues?.processName ?? '',
      frecuencia: defaultValues?.frecuencia ?? 'mes',
      volumen: defaultValues?.volumen ?? 50,
      tiempoMinutos: defaultValues?.tiempoMinutos ?? 45,
      personas: defaultValues?.personas ?? 3,
      costoHora: defaultValues?.costoHora ?? 25,
      mejoraPct: defaultValues?.mejoraPct ?? 30,
      costoProyecto: defaultValues?.costoProyecto ?? 15000,
    },
  });

  const tiempoMinutos = watch('tiempoMinutos');
  const mejoraPct = watch('mejoraPct');

  const tiempoOptimizadoMin = Math.round(tiempoMinutos * (1 - mejoraPct / 100));

  const onSubmit = (data: FormValues) => {
    onCalculate({
      processName: data.processName,
      frecuencia: data.frecuencia as Frecuencia,
      volumen: Number(data.volumen),
      tiempoMinutos: Number(data.tiempoMinutos),
      personas: Number(data.personas),
      costoHora: Number(data.costoHora),
      mejoraPct: Number(data.mejoraPct),
      costoProyecto: Number(data.costoProyecto),
    });
    const resultsEl = document.getElementById('roi-results');
    resultsEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReset = () => {
    reset({
      processName: '',
      frecuencia: 'mes',
      volumen: 50,
      tiempoMinutos: 45,
      personas: 3,
      costoHora: 25,
      mejoraPct: 30,
      costoProyecto: 15000,
    });
    onReset();
  };

  const handleSave = () => {
    const values = watch();
    onSave({
      processName: values.processName,
      frecuencia: values.frecuencia as Frecuencia,
      volumen: Number(values.volumen),
      tiempoMinutos: Number(values.tiempoMinutos),
      personas: Number(values.personas),
      costoHora: Number(values.costoHora),
      mejoraPct: Number(values.mejoraPct),
      costoProyecto: Number(values.costoProyecto),
    });
  };

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Paso 1 */}
        <section className="bg-white dark:bg-card rounded-2xl p-6 shadow-brand">
          <h2 className="text-lg font-semibold text-azul-marino dark:text-white mb-4">
            {t('form.step1Title')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="processName">{t('form.processName')}</Label>
              <Input
                id="processName"
                placeholder={t('form.processNamePlaceholder')}
                className="mt-1 rounded-xl"
                {...register('processName')}
              />
            </div>
            <div>
              <Label htmlFor="frecuencia">{t('form.frecuencia')}</Label>
              <Select
                value={watch('frecuencia')}
                onValueChange={(v) => setValue('frecuencia', v as Frecuencia)}
              >
                <SelectTrigger className="mt-1 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {frecuenciaOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {t(`form.${opt.labelKey}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="volumen">{t('form.volumen')}</Label>
              <Input
                id="volumen"
                type="number"
                min={1}
                placeholder="50"
                className="mt-1 rounded-xl"
                {...register('volumen', { valueAsNumber: true })}
              />
              <p className="text-xs text-muted-foreground mt-1">{t('form.volumenHelp')}</p>
              {errors.volumen && (
                <p className="text-sm text-red-600">{errors.volumen.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* Paso 2 */}
        <section className="bg-white dark:bg-card rounded-2xl p-6 shadow-brand">
          <h2 className="text-lg font-semibold text-azul-marino dark:text-white mb-4">
            {t('form.step2Title')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="tiempoMinutos">{t('form.tiempoMinutos')}</Label>
              <Input
                id="tiempoMinutos"
                type="number"
                min={1}
                placeholder="45"
                className="mt-1 rounded-xl"
                {...register('tiempoMinutos', { valueAsNumber: true })}
              />
              <p className="text-xs text-muted-foreground mt-1">{t('form.tiempoHelp')}</p>
              {errors.tiempoMinutos && (
                <p className="text-sm text-red-600">{errors.tiempoMinutos.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="personas">{t('form.personas')}</Label>
              <Input
                id="personas"
                type="number"
                min={1}
                placeholder="3"
                className="mt-1 rounded-xl"
                {...register('personas', { valueAsNumber: true })}
              />
              <p className="text-xs text-muted-foreground mt-1">{t('form.personasHelp')}</p>
              {errors.personas && (
                <p className="text-sm text-red-600">{errors.personas.message}</p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <Label htmlFor="costoHora">{t('form.costoHora')}</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    {t('form.costoHoraTooltip')}
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="costoHora"
                type="number"
                min={0}
                step={0.01}
                placeholder="25"
                className="mt-1 rounded-xl"
                {...register('costoHora', { valueAsNumber: true })}
              />
              <p className="text-xs text-muted-foreground mt-1">{t('form.costoHoraHelp')}</p>
              {errors.costoHora && (
                <p className="text-sm text-red-600">{errors.costoHora.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* Paso 3 */}
        <section className="bg-white dark:bg-card rounded-2xl p-6 shadow-brand">
          <h2 className="text-lg font-semibold text-azul-marino dark:text-white mb-4">
            {t('form.step3Title')}
          </h2>
          <div className="space-y-6">
            <div>
              <Label>{t('form.mejoraPct')} ({mejoraPct}%)</Label>
              <Slider
                value={[mejoraPct]}
                onValueChange={([v]) => setValue('mejoraPct', v)}
                min={0}
                max={80}
                step={5}
                className="mt-2"
              />
              <p className="text-sm text-foreground/80 mt-2">
                {t('form.mejoraDynamic', {
                  pct: mejoraPct,
                  newMin: tiempoOptimizadoMin,
                  currentMin: tiempoMinutos,
                })}
              </p>
            </div>
            <div>
              <Label htmlFor="costoProyecto">{t('form.costoProyecto')}</Label>
              <Input
                id="costoProyecto"
                type="number"
                min={0}
                placeholder="15000"
                className="mt-1 rounded-xl"
                {...register('costoProyecto', { valueAsNumber: true })}
              />
              <p className="text-xs text-muted-foreground mt-1">{t('form.costoProyectoHelp')}</p>
              <Link
                href="/contacto"
                className="text-sm text-turquesa font-medium hover:underline mt-1 inline-block"
              >
                {t('form.cotizacionLink')}
              </Link>
              {errors.costoProyecto && (
                <p className="text-sm text-red-600">{errors.costoProyecto.message}</p>
              )}
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button type="submit" size="lg" className="bg-turquesa text-azul-marino hover:bg-turquesa/90">
            {t('form.calculateBtn')}
          </Button>
          <Button type="button" variant="outline" size="lg" onClick={handleSave}>
            {t('form.saveBtn')}
          </Button>
          <Button type="button" variant="ghost" size="lg" onClick={handleReset}>
            {t('form.resetBtn')}
          </Button>
        </div>
      </form>
    </TooltipProvider>
  );
}

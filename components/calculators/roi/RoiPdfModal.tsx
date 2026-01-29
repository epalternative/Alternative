'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';
import {
  getRecommendation,
  getRecommendationContent,
  formatCurrency,
  formatNumber,
  type RoiResults,
  type RoiInputs,
} from '@/lib/calculators/roi-optimization';

interface RoiPdfModalProps {
  results: RoiResults;
  formState: RoiInputs | null;
}

export function RoiPdfModal({ results, formState }: RoiPdfModalProps) {
  const t = useTranslations('calculators.roi');
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generatePdf = async () => {
    if (!email.trim()) {
      setError(t('pdf.emailRequired'));
      return;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email.trim())) {
      setError(t('pdf.emailInvalid'));
      return;
    }
    setError('');
    setLoading(true);
    try {
      const level = getRecommendation(results.roi);
      const rec = getRecommendationContent(level, (key, opts) => t(key, opts as Record<string, string | number>), results);

      // Enviar información por correo
      const emailPayload = {
        email: email.trim(),
        processName: formState?.processName || '',
        frecuencia: formState?.frecuencia || 'dia',
        volumen: formState?.volumen || 0,
        tiempoMinutos: formState?.tiempoMinutos || 0,
        personas: formState?.personas || 0,
        costoHora: formState?.costoHora || 0,
        mejoraPct: formState?.mejoraPct || 0,
        costoProyecto: formState?.costoProyecto || 0,
        costoAnual: results.costoAnual,
        costoOptimizado: results.costoOptimizado,
        ahorroAnual: results.ahorroAnual,
        roi: results.roi,
        paybackMeses: results.paybackMeses,
        beneficioAno1: results.beneficioAno1,
        beneficio3Anos: results.beneficio3Anos,
        recommendationLevel: level,
        recommendationTitle: rec.title,
      };

      const response = await fetch('/api/roi-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailPayload),
      });

      if (!response.ok) {
        console.error('Error al enviar correo:', await response.text());
        // Continuar con la descarga del PDF aunque falle el envío del correo
      }

      // Generar y descargar PDF
      const { jsPDF } = await import('jspdf');
      const { generateRoiOptimizationPdf } = await import('@/lib/pdf/roi-optimization-pdf');
      
      const doc = new jsPDF();

      // Preparar traducciones para el PDF
      const pdfTranslations = {
        title: t('pdf.title'),
        subtitle: t('pdf.subtitle'),
        processName: t('form.processName'),
        currentSituation: 'Situación Actual',
        optimizedScenario: 'Escenario Optimizado',
        benefits: 'Beneficios Proyectados',
        recommendation: 'Recomendación',
        currentCost: t('results.currentCost'),
        optimizedCost: t('results.optimizedCost'),
        annualSavings: t('results.annualSavings'),
        payback: t('results.payback'),
        months: t('results.months'),
        roi: 'ROI',
        volume: t('form.volume'),
        timeSpent: t('form.timePerExecution'),
        people: t('form.peopleInvolved'),
        hourCost: t('form.hourCost'),
        improvement: t('form.expectedImprovement'),
        projectCost: t('form.projectCost'),
        reduction: t('results.reduction'),
        benefit1Year: t('results.benefit1Year'),
        benefit3Years: t('results.benefit3Years'),
        nextSteps: 'Próximos Pasos',
        generatedFor: 'Generado para',
        date: 'Fecha',
        executionsPerYear: t('results.executionsPerYear'),
        hours: 'horas',
      };

      generateRoiOptimizationPdf(doc, {
        email: email.trim(),
        results,
        formState,
        recommendation: {
          level,
          title: rec.title,
          body: rec.body,
        },
        translations: pdfTranslations,
      });

      doc.save(`ROI_Optimizacion_Procesos_${email.replace(/@.*/, '')}.pdf`);
      setOpen(false);
      setEmail('');
    } catch (e) {
      setError(t('pdf.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg">
          <Download className="w-4 h-4" />
          {t('pdf.trigger')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('pdf.dialogTitle')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{t('pdf.dialogDescription')}</p>
          <div>
            <Label htmlFor="pdf-email">Email *</Label>
            <Input
              id="pdf-email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 rounded-xl"
            />
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
          </div>
          <Button onClick={generatePdf} disabled={loading} fullWidth>
            {loading ? t('pdf.generating') : t('pdf.download')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

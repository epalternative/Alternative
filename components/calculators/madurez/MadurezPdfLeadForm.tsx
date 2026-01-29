'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { MadurezScores, PreliminaryAnswers } from '@/lib/calculators/madurez-digital';

interface MadurezPdfLeadFormProps {
  scores: MadurezScores;
  preliminary: PreliminaryAnswers;
}

export function MadurezPdfLeadForm({ scores, preliminary }: MadurezPdfLeadFormProps) {
  const t = useTranslations('calculators.madurez.pdf');
  const tMadurez = useTranslations('calculators.madurez');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim() || !company.trim()) {
      setError(t('required'));
      return;
    }
    setError('');
    setLoading(true);
    
    try {
      // Enviar información por correo
      const emailPayload = {
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        phone: phone.trim(),
        consent,
        industry: preliminary.industry || 'No especificada',
        role: preliminary.role || 'No especificado',
        companySize: preliminary.companySize || 'No especificado',
        totalScore: scores.total,
        level: tMadurez(scores.levelKey),
        dimensionScores: {
          strategy: scores.dimensions.strategy,
          channels: scores.dimensions.channels,
          data: scores.dimensions.data,
          tech: scores.dimensions.tech,
        },
      };

      const response = await fetch('/api/madurez-digital', {
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
      const { generateMadurezDigitalPdf } = await import('@/lib/pdf/madurez-digital-pdf');
      
      const doc = new jsPDF();
      
      // Preparar traducciones para el PDF
      const pdfTranslations = {
        title: t('title'),
        score: t('score'),
        level: t('level'),
        dimensions: t('dimensions'),
        levelText: tMadurez(scores.levelKey),
        industryLabel: tMadurez('preliminary.industry'),
        roleLabel: tMadurez('preliminary.role'),
        companySizeLabel: tMadurez('preliminary.companySize'),
        dimensionStrategy: tMadurez('dimensions.strategy'),
        dimensionChannels: tMadurez('dimensions.channels'),
        dimensionData: tMadurez('dimensions.data'),
        dimensionTech: tMadurez('dimensions.tech'),
        strengthsTitle: tMadurez('results.strengthsTitle'),
        opportunitiesTitle: tMadurez('results.opportunitiesTitle'),
        industryBenchmark: tMadurez('results.benchmarkTitle'),
        generatedFor: 'Generado para',
        date: 'Fecha',
      };
      
      generateMadurezDigitalPdf(doc, {
        name: name.trim(),
        company: company.trim(),
        email: email.trim(),
        phone: phone.trim(),
        scores,
        preliminary,
        translations: pdfTranslations,
      });
      
      doc.save(`Madurez_Digital_${company.replace(/\s/g, '_')}.pdf`);
    } catch {
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-brand">
      <h2 className="text-xl font-semibold text-azul-marino dark:text-white mb-4">
        {t('heading')}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="madurez-email">Email *</Label>
          <Input
            id="madurez-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 rounded-xl"
          />
        </div>
        <div>
          <Label htmlFor="madurez-name">{t('name')} *</Label>
          <Input
            id="madurez-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 rounded-xl"
          />
        </div>
        <div>
          <Label htmlFor="madurez-company">{t('company')} *</Label>
          <Input
            id="madurez-company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 rounded-xl"
          />
        </div>
        <div>
          <Label htmlFor="madurez-phone">{t('phone')}</Label>
          <Input
            id="madurez-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 rounded-xl"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox checked={consent} onCheckedChange={(v) => setConsent(!!v)} />
          <span className="text-sm">{t('consent')}</span>
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? t('generating') : t('download')}
        </Button>
      </form>
    </div>
  );
}

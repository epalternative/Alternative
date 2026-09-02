'use client';

import { useState, useCallback, useEffect } from 'react';
import { MadurezIntro } from '@/components/calculators/madurez/MadurezIntro';
import { MadurezPreliminaryForm } from '@/components/calculators/madurez/MadurezPreliminaryForm';
import { MadurezQuestionnaireFlow } from '@/components/calculators/madurez/MadurezQuestionnaireFlow';
import { MadurezResultsDashboard } from '@/components/calculators/madurez/MadurezResultsDashboard';
import type { PreliminaryAnswers, QuestionnaireAnswers, MadurezScores } from '@/lib/calculators/madurez-digital';

type Step = 'intro' | 'preliminary' | 'questionnaire' | 'results';

const STORAGE_KEY = 'madurez_digital';
const STORAGE_STEP = 'madurez_digital_step';

export default function MadurezDigitalPage() {
  const [step, setStep] = useState<Step>('intro');
  const [preliminary, setPreliminary] = useState<PreliminaryAnswers | null>(null);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});
  const [scores, setScores] = useState<MadurezScores | null>(null);

  const handlePreliminaryComplete = useCallback((data: PreliminaryAnswers) => {
    setPreliminary(data);
    setStep('questionnaire');
  }, []);

  const handleQuestionnaireComplete = useCallback((finalAnswers: QuestionnaireAnswers, finalScores: MadurezScores) => {
    setAnswers(finalAnswers);
    setScores(finalScores);
    setStep('results');
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_STEP);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedStep = localStorage.getItem(STORAGE_STEP);
      if (saved && savedStep && (savedStep === 'preliminary' || savedStep === 'questionnaire')) {
        const parsed = JSON.parse(saved) as { preliminary?: PreliminaryAnswers; answers?: QuestionnaireAnswers };
        if (parsed.preliminary) setPreliminary(parsed.preliminary);
        if (parsed.answers && Object.keys(parsed.answers).length > 0) setAnswers(parsed.answers);
        if (savedStep === 'questionnaire') setStep('questionnaire');
        else if (savedStep === 'preliminary') setStep('preliminary');
      }
    } catch {
      // ignore
    }
  }, []);

  if (step === 'intro') {
    return <MadurezIntro onStart={() => setStep('preliminary')} />;
  }

  if (step === 'preliminary') {
    return (
      <MadurezPreliminaryForm
        defaultValues={preliminary ?? undefined}
        onComplete={handlePreliminaryComplete}
        onBack={() => setStep('intro')}
      />
    );
  }

  if (step === 'questionnaire') {
    return (
      <MadurezQuestionnaireFlow
        initialAnswers={answers}
        preliminary={preliminary!}
        onComplete={handleQuestionnaireComplete}
        onBack={() => setStep('preliminary')}
      />
    );
  }

  return (
    <MadurezResultsDashboard
      scores={scores!}
      preliminary={preliminary!}
      answers={answers}
    />
  );
}

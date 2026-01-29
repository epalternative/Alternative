'use client';

import { useState, useCallback, useEffect } from 'react';
import type { RoiInputs, RoiResults } from '@/lib/calculators/roi-optimization';

const STORAGE_KEY = 'roi_calculator_inputs';

const defaultInputs: Partial<RoiInputs> = {
  frecuencia: 'mes',
  volumen: 50,
  tiempoMinutos: 45,
  personas: 3,
  costoHora: 25,
  mejoraPct: 30,
  costoProyecto: 15000,
};

export function useRoiCalculator() {
  const [results, setResults] = useState<RoiResults | null>(null);
  const [formState, setFormState] = useState<RoiInputs | null>(null);
  const [savedInputs, setSavedInputs] = useState<Partial<RoiInputs>>(defaultInputs);

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<RoiInputs>;
        setSavedInputs((prev) => ({ ...defaultInputs, ...prev, ...parsed }));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleCalculate = useCallback((inputs: RoiInputs) => {
    setFormState(inputs);
    // results are computed in parent and set via setResults
  }, []);

  const resetForm = useCallback(() => {
    setResults(null);
    setFormState(null);
  }, []);

  const saveToLocalStorage = useCallback((inputs: RoiInputs) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
      setSavedInputs(inputs);
    } catch {
      // ignore
    }
  }, []);

  return {
    results,
    setResults,
    formState,
    setFormState,
    resetForm,
    savedInputs,
    saveToLocalStorage,
    onCalculate: handleCalculate,
  };
}

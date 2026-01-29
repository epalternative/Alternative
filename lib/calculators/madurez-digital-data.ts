/**
 * Digital Maturity Assessment - questions and benchmarks.
 * Option points: 0, 25, 50, 75, 100.
 */

export interface PreliminaryOption {
  value: string;
  labelKey: string;
}

export interface QuestionOption {
  textKey: string;
  points: number;
}

export interface DimensionQuestion {
  id: string;
  questionKey: string;
  options: QuestionOption[];
}

export interface Dimension {
  id: string;
  nameKey: string;
  emoji: string;
  questions: DimensionQuestion[];
}

export const PRELIMINARY_QUESTIONS: { id: string; questionKey: string; options: PreliminaryOption[] }[] = [
  {
    id: 'industry',
    questionKey: 'preliminary.industry',
    options: [
      { value: 'banca', labelKey: 'industry.banca' },
      { value: 'tech', labelKey: 'industry.tech' },
      { value: 'retail', labelKey: 'industry.retail' },
      { value: 'manufactura', labelKey: 'industry.manufactura' },
      { value: 'servicios', labelKey: 'industry.servicios' },
      { value: 'salud', labelKey: 'industry.salud' },
      { value: 'gobierno', labelKey: 'industry.gobierno' },
      { value: 'energia', labelKey: 'industry.energia' },
      { value: 'otra', labelKey: 'industry.otra' },
    ],
  },
  {
    id: 'role',
    questionKey: 'preliminary.role',
    options: [
      { value: 'ceo', labelKey: 'role.ceo' },
      { value: 'cto', labelKey: 'role.cto' },
      { value: 'coo', labelKey: 'role.coo' },
      { value: 'cmo', labelKey: 'role.cmo' },
      { value: 'cfo', labelKey: 'role.cfo' },
      { value: 'gerente', labelKey: 'role.gerente' },
      { value: 'otro', labelKey: 'role.otro' },
    ],
  },
  {
    id: 'companySize',
    questionKey: 'preliminary.companySize',
    options: [
      { value: '1-10', labelKey: 'size.1-10' },
      { value: '11-50', labelKey: 'size.11-50' },
      { value: '51-200', labelKey: 'size.51-200' },
      { value: '201-500', labelKey: 'size.201-500' },
      { value: '500+', labelKey: 'size.500+' },
    ],
  },
];

const makeOptions = (questionId: string, points: number[]) =>
  points.map((p, i) => ({ textKey: `questions.${questionId}_op${i}`, points: p }));

export const DIMENSIONS: Dimension[] = [
  {
    id: 'strategy',
    nameKey: 'dimensions.strategy',
    emoji: '🎯',
    questions: [
      { id: 'q1', questionKey: 'questions.q1', options: makeOptions('q1', [0, 25, 50, 75, 100]) },
      { id: 'q2', questionKey: 'questions.q2', options: makeOptions('q2', [0, 25, 50, 75, 100]) },
      { id: 'q3', questionKey: 'questions.q3', options: makeOptions('q3', [0, 25, 50, 75, 100]) },
      { id: 'q4', questionKey: 'questions.q4', options: makeOptions('q4', [0, 25, 50, 75, 100]) },
      { id: 'q5', questionKey: 'questions.q5', options: makeOptions('q5', [0, 25, 50, 75, 100]) },
    ],
  },
  {
    id: 'channels',
    nameKey: 'dimensions.channels',
    emoji: '📱',
    questions: [
      { id: 'q6', questionKey: 'questions.q6', options: makeOptions('q6', [0, 25, 50, 75, 100]) },
      { id: 'q7', questionKey: 'questions.q7', options: makeOptions('q7', [0, 25, 50, 75, 100]) },
      { id: 'q8', questionKey: 'questions.q8', options: makeOptions('q8', [0, 25, 50, 75, 100]) },
      { id: 'q9', questionKey: 'questions.q9', options: makeOptions('q9', [0, 25, 50, 75, 100]) },
      { id: 'q10', questionKey: 'questions.q10', options: makeOptions('q10', [0, 25, 50, 75, 100]) },
    ],
  },
  {
    id: 'data',
    nameKey: 'dimensions.data',
    emoji: '📊',
    questions: [
      { id: 'q11', questionKey: 'questions.q11', options: makeOptions('q11', [0, 25, 50, 75, 100]) },
      { id: 'q12', questionKey: 'questions.q12', options: makeOptions('q12', [0, 25, 50, 75, 100]) },
      { id: 'q13', questionKey: 'questions.q13', options: makeOptions('q13', [0, 25, 50, 75, 100]) },
      { id: 'q14', questionKey: 'questions.q14', options: makeOptions('q14', [0, 25, 50, 75, 100]) },
      { id: 'q15', questionKey: 'questions.q15', options: makeOptions('q15', [0, 25, 50, 75, 100]) },
    ],
  },
  {
    id: 'tech',
    nameKey: 'dimensions.tech',
    emoji: '💻',
    questions: [
      { id: 'q16', questionKey: 'questions.q16', options: makeOptions('q16', [0, 25, 50, 75, 100]) },
      { id: 'q17', questionKey: 'questions.q17', options: makeOptions('q17', [0, 25, 50, 75, 100]) },
      { id: 'q18', questionKey: 'questions.q18', options: makeOptions('q18', [0, 25, 50, 75, 100]) },
      { id: 'q19', questionKey: 'questions.q19', options: makeOptions('q19', [0, 25, 50, 75, 100]) },
      { id: 'q20', questionKey: 'questions.q20', options: makeOptions('q20', [0, 25, 50, 75, 100]) },
    ],
  },
];

export const INDUSTRY_BENCHMARKS: Record<string, number> = {
  banca: 65,
  tech: 72,
  retail: 52,
  manufactura: 45,
  servicios: 48,
  salud: 42,
  gobierno: 35,
  energia: 40,
  otra: 50,
};

export function getAllQuestionsFlat(): { dimensionId: string; question: DimensionQuestion }[] {
  const flat: { dimensionId: string; question: DimensionQuestion }[] = [];
  for (const dim of DIMENSIONS) {
    for (const q of dim.questions) {
      flat.push({ dimensionId: dim.id, question: q });
    }
  }
  return flat;
}

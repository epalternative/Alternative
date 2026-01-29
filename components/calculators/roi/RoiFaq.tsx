'use client';

import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function RoiFaq() {
  const t = useTranslations('calculators.roi.faq');

  const items = [
    { key: 'q1', triggerKey: 'q1Question', contentKey: 'q1Answer' },
    { key: 'q2', triggerKey: 'q2Question', contentKey: 'q2Answer' },
    { key: 'q3', triggerKey: 'q3Question', contentKey: 'q3Answer' },
    { key: 'q4', triggerKey: 'q4Question', contentKey: 'q4Answer' },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.key} value={item.key}>
          <AccordionTrigger className="text-left text-azul-marino dark:text-white">
            {t(item.triggerKey)}
          </AccordionTrigger>
          <AccordionContent className="text-foreground/80">
            {t(item.contentKey)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function Counter({ end, suffix = '', prefix = '', duration = 2000, className = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      const startTime = Date?.now?.();
      const timer = setInterval(() => {
        const elapsed = (Date?.now?.() ?? 0) - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        countRef.current = Math.floor(easeOut * end);
        setCount(countRef.current);

        if (progress >= 1) {
          clearInterval(timer);
          setCount(end);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}

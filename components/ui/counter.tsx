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

/**
 * Contador animado que **nunca** sirve un cero en el HTML.
 *
 * El estado arranca en `end`, así que el render de servidor y el primer render
 * de cliente coinciden (sin hydration mismatch) y los rastreadores, las tarjetas
 * sociales y cualquier cliente sin JS ven la cifra real.
 *
 * La animación solo se arma si al montar el elemento está **fuera** del
 * viewport: en ese caso se resetea a 0 y cuenta hasta `end` cuando entra en
 * pantalla. Si ya es visible al cargar —el caso del hero de la home— se queda
 * en `end` y no anima: preferimos el dato correcto a la animación.
 */
export function Counter({ end, suffix = '', prefix = '', duration = 2000, className = '' }: CounterProps) {
  const [count, setCount] = useState(end);
  const [armed, setArmed] = useState(false);
  const nodeRef = useRef<HTMLSpanElement | null>(null);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  // Une la ref de react-intersection-observer con la nuestra.
  const setRefs = (node: HTMLSpanElement | null) => {
    nodeRef.current = node;
    inViewRef(node);
  };

  // Al montar: si el elemento ya está en pantalla, no animamos nunca.
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const box = node.getBoundingClientRect();
    const visible =
      box.top < (window.innerHeight || document.documentElement.clientHeight) && box.bottom > 0;

    if (!visible) {
      setCount(0);
      setArmed(true);
    }
  }, []);

  // Animación 0 → end, solo para elementos que empezaron fuera del viewport.
  useEffect(() => {
    if (!armed || !inView) return;

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress >= 1) {
        clearInterval(timer);
        setCount(end);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [armed, inView, end, duration]);

  return (
    <span ref={setRefs} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

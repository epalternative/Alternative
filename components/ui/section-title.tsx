'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionTitle({ title, subtitle, centered = true, light = false }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`mb-10 lg:mb-12 ${centered ? 'text-center' : ''}`}
    >
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 ${
          light ? 'text-white' : 'text-azul-marino dark:text-blanco-hueso'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base lg:text-lg max-w-2xl ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-white/80' : 'text-foreground/70'}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

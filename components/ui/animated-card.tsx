'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  onClick?: () => void;
}

export function AnimatedCard({ children, delay = 0, className = '', onClick }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: '0 8px 30px rgba(19, 45, 84, 0.15)' }}
      onClick={onClick}
      className={`bg-card rounded-xl p-6 shadow-brand transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
}

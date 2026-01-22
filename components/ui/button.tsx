'use client';

import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]';

  const variants = {
    primary: 'bg-azul-marino text-white hover:bg-[#1a3d6f] focus:ring-azul-marino dark:bg-turquesa dark:text-azul-marino dark:hover:bg-[#5ab3c4]',
    secondary: 'bg-turquesa text-azul-marino hover:bg-[#5ab3c4] focus:ring-turquesa',
    outline: 'border-2 border-azul-marino text-azul-marino hover:bg-azul-marino hover:text-white focus:ring-azul-marino dark:border-turquesa dark:text-turquesa dark:hover:bg-turquesa dark:hover:text-azul-marino',
    ghost: 'text-azul-marino hover:bg-secondary focus:ring-azul-marino dark:text-blanco-hueso dark:hover:bg-secondary',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:translate-y-0' : '';

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${disabledStyles} ${className}`;

  const content = (
    <>
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={combinedStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={combinedStyles}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
}

export { Button as default };
export type { ButtonProps };

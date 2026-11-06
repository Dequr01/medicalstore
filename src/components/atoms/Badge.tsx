import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'warning' | 'error' | 'outline' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = ''
}) => {
  const variantStyles = {
    primary: 'bg-[#9cf2e8]/30 text-[#005c55] border-[#80d5cb]/40',
    secondary: 'bg-[#6ffbbe]/30 text-[#006c49] border-[#4edea3]/40',
    warning: 'bg-amber-100 text-amber-800 border-amber-300',
    error: 'bg-[#ffdad6] text-[#ba1a1a] border-[#ffdad6]',
    outline: 'bg-transparent text-[#3e4947] border-[#bdc9c6]',
    neutral: 'bg-[#eaedff] text-[#131b2e] border-[#dae2fd]'
  };

  const dotColors = {
    primary: 'bg-[#005c55]',
    secondary: 'bg-[#006c49]',
    warning: 'bg-amber-600',
    error: 'bg-[#ba1a1a]',
    outline: 'bg-[#6e7977]',
    neutral: 'bg-[#131b2e]'
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 leading-tight',
    md: 'text-[12px] px-2.5 py-1 leading-normal'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} animate-pulse`} />}
      {children}
    </span>
  );
};

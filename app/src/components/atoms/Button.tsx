import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer active:scale-[0.97] hover:shadow-sm';

  const variants = {
    primary: 'bg-[#005c55] text-white hover:bg-[#0f766e] hover:shadow-[0_4px_14px_rgba(0,92,85,0.22)] focus:ring-[#005c55]',
    secondary: 'bg-[#0f766e] text-[#a3faef] hover:bg-[#005c55] hover:text-white hover:shadow-[0_4px_14px_rgba(15,118,110,0.22)] focus:ring-[#0f766e]',
    outline: 'border border-[#dae2fd] text-[#131b2e] bg-white hover:border-[#005c55] hover:bg-[#faf8ff] hover:text-[#005c55] focus:ring-[#005c55]',
    ghost: 'text-[#3e4947] hover:text-[#131b2e] hover:bg-[#eaedff]/60 active:bg-[#eaedff] focus:ring-[#005c55]',
    danger: 'bg-[#ba1a1a] text-white hover:bg-[#93000a] hover:shadow-[0_4px_14px_rgba(186,26,26,0.22)] focus:ring-[#ba1a1a]'
  };

  const sizes = {
    sm: 'text-[12px] px-3.5 py-1.5 gap-1.5 rounded-full',
    md: 'text-[13px] px-4 py-2 gap-2 rounded-xl',
    lg: 'text-[14px] px-6 py-2.5 gap-2.5 font-bold rounded-xl'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
      ) : icon && iconPosition === 'left' ? (
        <span className="material-symbols-outlined text-[18px] leading-none transition-transform duration-200 group-hover:scale-110">{icon}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' ? (
        <span className="material-symbols-outlined text-[18px] leading-none transition-transform duration-200 group-hover:scale-110">{icon}</span>
      ) : null}
    </button>
  );
};

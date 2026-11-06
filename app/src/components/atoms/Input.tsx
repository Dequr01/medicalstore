import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-[#3e4947]">
          {label}
        </label>
      )}
      <div className="relative rounded-lg shadow-sm">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="material-symbols-outlined text-[20px] text-[#6e7977]">{icon}</span>
          </div>
        )}
        <input
          id={inputId}
          className={`block w-full rounded-lg border bg-white py-2 text-sm text-[#131b2e] placeholder-[#6e7977] transition-all focus:outline-none focus:ring-2 focus:ring-[#005c55] focus:border-transparent ${
            icon ? 'pl-10' : 'pl-3.5'
          } ${error ? 'border-[#ba1a1a] focus:ring-[#ba1a1a]' : 'border-[#bdc9c6]'} ${className}`}
          {...props}
        />
      </div>
      {error ? (
        <p className="text-xs text-[#ba1a1a] flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">error</span>
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-[#6e7977]">{helperText}</p>
      ) : null}
    </div>
  );
};

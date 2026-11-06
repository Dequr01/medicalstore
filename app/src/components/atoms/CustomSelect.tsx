import React, { useState, useRef, useEffect } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  badge?: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  icon?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  icon,
  className = '',
  size = 'md'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left select-none ${className}`} ref={dropdownRef}>
      {/* Trigger Button with smooth micro-interactions */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-between gap-2.5 rounded-full border border-[#dae2fd] bg-white text-[#131b2e] shadow-2xs transition-all duration-200 ease-out hover:border-[#005c55] hover:bg-[#faf8ff] hover:shadow-xs active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#005c55]/20 ${
          size === 'sm' ? 'py-1 px-3 text-xs' : 'py-1.5 px-4 text-xs font-semibold'
        } ${isOpen ? 'border-[#005c55] ring-2 ring-[#005c55]/15 shadow-sm bg-[#faf8ff]' : ''}`}
      >
        <div className="flex items-center gap-1.5 truncate">
          {icon && (
            <span className="material-symbols-outlined text-[16px] text-[#005c55] transition-transform duration-200 group-hover:scale-110">
              {icon}
            </span>
          )}
          <span className="truncate">{selectedOption?.label}</span>
          {selectedOption?.badge && (
            <span className="ml-1 rounded-full bg-[#9cf2e8]/40 px-1.5 py-0.2 text-[10px] font-bold text-[#005c55]">
              {selectedOption.badge}
            </span>
          )}
        </div>

        {/* Clean rotating chevron with cubic-bezier easing */}
        <span
          className={`material-symbols-outlined text-[18px] text-[#6e7977] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[#005c55] ${
            isOpen ? 'rotate-180 text-[#005c55]' : 'rotate-0'
          }`}
        >
          keyboard_arrow_down
        </span>
      </button>

      {/* Popover Menu with animated scale & fade */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-1.5 min-w-[210px] w-full origin-top-right rounded-2xl border border-[#dae2fd] bg-white/95 p-1.5 shadow-xl backdrop-blur-md transition-all animate-dropdown">
          <div className="space-y-0.5">
            {options.map(option => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`group/opt flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs transition-all duration-150 ${
                    isSelected
                      ? 'bg-[#eaedff] font-bold text-[#005c55]'
                      : 'text-[#3e4947] hover:bg-[#faf8ff] hover:text-[#131b2e] hover:translate-x-0.5'
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected ? (
                    <span className="material-symbols-outlined text-[16px] text-[#005c55]">
                      check
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-[14px] text-transparent group-hover/opt:text-[#005c55]/40 transition-colors">
                      arrow_forward
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { DEMO_CONFIG } from '../../config/demo';

interface WhatsAppButtonProps {
  message?: string;
  variant?: 'pill' | 'full' | 'floating' | 'icon';
  className?: string;
  label?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message = 'Salam, I would like to order medicines from Majeed Pharmacy.',
  variant = 'pill',
  className = '',
  label = 'Order on WhatsApp'
}) => {
  const encodedText = encodeURIComponent(message);
  const href = `https://wa.me/${DEMO_CONFIG.whatsappNumber}?text=${encodedText}`;

  if (variant === 'floating') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 left-6 z-40 sm:hidden flex items-center justify-center w-14 h-14 rounded-full bg-[#006c49] text-white shadow-[0_6px_20px_rgba(0,108,73,0.35)] hover:scale-105 active:scale-95 transition-all duration-200 animate-pulse-subtle ${className}`}
        title="Order on WhatsApp"
      >
        <span className="material-symbols-outlined text-[28px]">chat</span>
      </a>
    );
  }

  if (variant === 'full') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center justify-center gap-2 bg-[#006c49] text-white hover:bg-[#005236] hover:shadow-[0_4px_14px_rgba(0,108,73,0.25)] px-5 py-3 rounded-xl text-sm font-bold transition-all duration-200 active:scale-[0.98] ${className}`}
      >
        <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:scale-110">chat</span>
        <span>{label}</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-1.5 bg-[#006c49] text-white hover:bg-[#005236] hover:shadow-[0_3px_10px_rgba(0,108,73,0.22)] px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 active:scale-[0.97] ${className}`}
    >
      <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:scale-110">chat</span>
      <span>{label}</span>
    </a>
  );
};

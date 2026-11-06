import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/atoms/Button';
import { Badge } from '../../components/atoms/Badge';
import { DEMO_CONFIG } from '../../config/demo';

export const StaffLoginModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { setPortalMode } = useApp();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      // Demo PIN: 1234 or direct bypass
      if (pin === '1234' || pin === '') {
        setPortalMode('clinical');
        setIsVerifying(false);
        onClose();
      } else {
        setIsVerifying(false);
        setError(true);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-sm w-full border border-[#dae2fd] shadow-2xl p-6 space-y-4 animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center space-y-1.5">
          <div className="w-12 h-12 rounded-full bg-[#005c55]/10 text-[#005c55] flex items-center justify-center mx-auto shadow-inner">
            <span className="material-symbols-outlined text-[26px]">local_pharmacy</span>
          </div>
          <h2 className="text-lg font-bold text-[#131b2e]">Dispensary Staff Access</h2>
          <p className="text-xs text-[#6e7977]">
            Authorized pharmacist portal • Registered with {DEMO_CONFIG.pcpRegNo}
          </p>
          <Badge variant="outline" size="sm">Demo PIN: 1234 (or press Enter)</Badge>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              maxLength={4}
              placeholder="••••"
              value={pin}
              onChange={e => {
                setPin(e.target.value);
                setError(false);
              }}
              className="w-full text-center tracking-[0.5em] text-2xl font-mono py-2.5 rounded-2xl border border-[#bdc9c6] focus:ring-2 focus:ring-[#005c55] focus:outline-none transition-all"
              autoFocus
            />
            {error && (
              <p className="text-[11px] text-[#ba1a1a] text-center mt-1.5 font-bold">Invalid PIN. Use 1234 for demo access.</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="md" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit" isLoading={isVerifying} className="flex-1">
              Access Hub
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

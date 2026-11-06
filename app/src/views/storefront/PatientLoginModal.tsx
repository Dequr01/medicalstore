import React, { useState } from 'react';
import { Button } from '../../components/atoms/Button';
import { Badge } from '../../components/atoms/Badge';

interface PatientLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (phone: string) => void;
}

export const PatientLoginModal: React.FC<PatientLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [phone, setPhone] = useState('0300-1234567');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState('4821');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(phone);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-sm w-full border border-[#dae2fd] shadow-2xl p-6 space-y-4 animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center space-y-1.5">
          <div className="w-12 h-12 rounded-full bg-[#005c55]/10 text-[#005c55] flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[26px]">phone_android</span>
          </div>
          <h2 className="text-lg font-bold text-[#131b2e]">Patient Mobile Login</h2>
          <p className="text-xs text-[#6e7977]">
            Sign in with your mobile phone number to quickly reorder prescriptions.
          </p>
          <Badge variant="outline" size="sm">Demo only • No CNIC or password needed</Badge>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                Pakistani Mobile Number:
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="0300-1234567"
                required
                className="w-full text-sm font-semibold rounded-lg border border-[#bdc9c6] p-2.5 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="md" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button variant="primary" size="md" type="submit" className="flex-1">
                Send OTP Code
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-[#faf8ff] p-2.5 rounded-lg border border-[#dae2fd] text-center text-xs">
              <span className="text-[#6e7977] block">Simulated 4-Digit SMS Code sent to:</span>
              <strong className="text-[#131b2e] font-mono">{phone}</strong>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1 text-center">
                Enter 4-Digit OTP Code:
              </label>
              <input
                type="text"
                maxLength={4}
                value={otp}
                onChange={e => setOtp(e.target.value)}
                className="w-full text-center tracking-[0.5em] text-2xl font-mono py-2 rounded-lg border border-[#bdc9c6] focus:ring-2 focus:ring-[#005c55] focus:outline-none"
              />
              <p className="text-[10px] text-center text-[#6e7977] mt-1">Default demo OTP: 4821</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="md" onClick={() => setStep('phone')} className="flex-1">
                Back
              </Button>
              <Button variant="primary" size="md" type="submit" className="flex-1">
                Verify &amp; Sign In
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

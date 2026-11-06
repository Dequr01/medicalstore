import React from 'react';
import { Button } from '../../components/atoms/Button';
import { Badge } from '../../components/atoms/Badge';
import { formatPKR } from '../../config/demo';

interface MockPaymentModalProps {
  isOpen: boolean;
  method: 'jazzcash' | 'easypaisa' | 'card' | 'bank' | null;
  totalPKR: number;
  onClose: () => void;
  onConfirm: () => void;
}

export const MockPaymentModal: React.FC<MockPaymentModalProps> = ({
  isOpen,
  method,
  totalPKR,
  onClose,
  onConfirm
}) => {
  if (!isOpen || !method) return null;

  const titles = {
    jazzcash: 'JazzCash Mobile Account Payment',
    easypaisa: 'Easypaisa Wallet Transfer',
    card: 'Debit / Credit Card Gateway (1Link / PayPak)',
    bank: 'Direct Pakistani Bank Transfer (IBFT)'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-md w-full border border-[#dae2fd] shadow-2xl p-6 space-y-4 animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center space-y-1">
          <Badge variant="outline" size="sm">Demo data • Simulated Payment Screen</Badge>
          <h2 className="text-lg font-bold text-[#131b2e]">{titles[method]}</h2>
          <p className="text-xs text-[#6e7977]">
            This is a simulated screen demonstrating the client checkout flow. No real funds are deducted.
          </p>
        </div>

        <div className="bg-[#faf8ff] p-4 rounded-xl border border-[#dae2fd] text-xs space-y-2">
          <div className="flex justify-between items-center font-bold">
            <span>Payable Amount:</span>
            <span className="text-base text-[#005c55] font-black">{formatPKR(totalPKR)}</span>
          </div>

          {method === 'jazzcash' && (
            <div className="space-y-1 pt-1">
              <label className="block text-[11px] text-[#3e4947]">JazzCash Mobile Number:</label>
              <input type="text" defaultValue="0300-1234567" className="w-full text-xs font-mono p-2 border rounded bg-white" />
              <p className="text-[10px] text-[#6e7977]">MPIN prompt will be simulated upon confirmation.</p>
            </div>
          )}

          {method === 'easypaisa' && (
            <div className="space-y-1 pt-1">
              <label className="block text-[11px] text-[#3e4947]">Easypaisa Mobile Number:</label>
              <input type="text" defaultValue="0345-9876543" className="w-full text-xs font-mono p-2 border rounded bg-white" />
              <p className="text-[10px] text-[#6e7977]">Push approval notification will be simulated.</p>
            </div>
          )}

          {method === 'card' && (
            <div className="space-y-2 pt-1">
              <input type="text" placeholder="Card Number (4000 1234 5678 9010)" defaultValue="4000 1234 5678 9010" className="w-full text-xs font-mono p-2 border rounded bg-white" />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="MM/YY" defaultValue="12/28" className="text-xs font-mono p-2 border rounded bg-white" />
                <input type="password" placeholder="CVV" defaultValue="123" className="text-xs font-mono p-2 border rounded bg-white" />
              </div>
            </div>
          )}

          {method === 'bank' && (
            <div className="space-y-1 text-[11px] text-[#3e4947] pt-1">
              <p><strong>Bank:</strong> Meezan Bank Limited</p>
              <p><strong>Title:</strong> Majeed Pharmacy (Pvt) Ltd</p>
              <p><strong>IBAN:</strong> PK44MEZN000104829104819</p>
              <p className="text-[10px] text-[#6e7977]">Enter transaction ID or screenshot after transfer.</p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="md" onClick={onClose} className="flex-1">
            Back
          </Button>
          <Button variant="primary" size="md" onClick={onConfirm} className="flex-1">
            Simulate Payment Success
          </Button>
        </div>
      </div>
    </div>
  );
};

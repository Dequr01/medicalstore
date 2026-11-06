import React, { useState } from 'react';
import type { ProductItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { WhatsAppButton } from '../atoms/WhatsAppButton';
import { formatPKR } from '../../config/demo';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, t } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [rxUploaded, setRxUploaded] = useState(false);
  const [rxFileName, setRxFileName] = useState<string | null>(null);

  if (!product) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRxFileName(e.target.files[0].name);
      setRxUploaded(true);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, rxUploaded, rxFileName || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full border border-[#dae2fd] shadow-2xl overflow-hidden animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#f2f3ff] bg-[#faf8ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#005c55] text-[22px]">medication</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#005c55]">Medicine Specifications</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#6e7977] hover:text-[#131b2e] hover:bg-[#eaedff]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="flex gap-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-24 h-24 rounded-xl object-cover bg-[#f2f3ff] border border-[#dae2fd] shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                {product.rxRequired ? (
                  <Badge variant="warning" size="sm" dot>{t.rxRequired}</Badge>
                ) : (
                  <Badge variant="secondary" size="sm">Over The Counter (OTC)</Badge>
                )}
                {product.badge && <Badge variant="primary" size="sm">{product.badge}</Badge>}
              </div>
              <h3 className="text-lg font-bold text-[#131b2e] leading-snug">{product.name}</h3>
              <p className="text-xs text-[#006c49] font-medium">{product.genericName}</p>
              <p className="text-xs text-[#6e7977] font-mono mt-0.5">{product.dosage}</p>
            </div>
          </div>

          {/* Expiry Date & Batch Tracking */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-[#faf8ff] rounded-xl border border-[#dae2fd] text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#6e7977] block">Expiry Date:</span>
              <span className="font-bold text-[#131b2e]">{product.expiryDate}</span>
              {product.daysUntilExpiry <= 90 && (
                <span className="block text-[10px] font-bold text-amber-700">Near Expiry (&lt;90 days)</span>
              )}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#6e7977] block">Pharma Batch #:</span>
              <span className="font-mono text-[#005c55] font-bold">{product.batchNumber}</span>
              <span className="block text-[10px] text-[#6e7977]">DRAP verified</span>
            </div>
          </div>

          <p className="text-xs text-[#3e4947] leading-relaxed">
            {product.description}
          </p>

          {/* Task 7: Generic Substitute Options with PKR difference & Pharmacist Note */}
          {product.substitutes && product.substitutes.length > 0 && (
            <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-emerald-700">swap_horiz</span>
                  {t.genericAlternatives}
                </span>
                <span className="text-[10px] bg-white text-emerald-800 border border-emerald-300 font-semibold px-2 py-0.5 rounded-full">
                  Demo data
                </span>
              </div>

              <div className="space-y-1.5">
                {product.substitutes.map(sub => (
                  <div key={sub.name} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-emerald-200 text-xs">
                    <div>
                      <span className="font-bold text-[#131b2e] block">{sub.name}</span>
                      <span className="text-[10px] text-[#6e7977]">{sub.company}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#005c55]">{formatPKR(sub.pricePKR)}</span>
                      <span className="block text-[10px] text-emerald-700 font-bold">
                        Save {formatPKR(sub.savingsPKR)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-emerald-900 font-medium italic pt-1">
                ⚠️ {t.askPharmacistNote}
              </p>
            </div>
          )}

          {/* Task 5: Prescription Slip Attachment Gate */}
          {product.rxRequired && (
            <div className={`p-4 rounded-xl border space-y-2.5 ${rxUploaded ? 'border-emerald-300 bg-emerald-50/70' : 'border-amber-300 bg-amber-50/70'}`}>
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-amber-700">assignment</span>
                  Doctor Prescription Slip Required:
                </label>
                {rxUploaded ? (
                  <Badge variant="secondary" size="sm">Attached</Badge>
                ) : (
                  <Badge variant="warning" size="sm">Required for checkout</Badge>
                )}
              </div>

              {rxUploaded ? (
                <div className="text-xs text-emerald-900 flex items-center justify-between bg-white p-2.5 rounded-lg border border-emerald-200">
                  <span className="truncate">Attached: <strong>{rxFileName}</strong></span>
                  <button onClick={() => setRxUploaded(false)} className="text-[#ba1a1a] underline text-[11px] font-bold">Remove</button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="relative border-2 border-dashed border-amber-300 rounded-lg p-3 text-center bg-white cursor-pointer hover:bg-amber-50 transition-colors">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <span className="material-symbols-outlined text-[24px] text-amber-700 block">add_a_photo</span>
                    <span className="text-xs font-bold text-amber-900">Attach Doctor Slip Photo (or upload in cart)</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-2 border-t border-[#f2f3ff]">
            <span className="text-xs font-bold text-[#131b2e]">Packs / Units:</span>
            <div className="flex items-center border border-[#bdc9c6] rounded-lg bg-[#faf8ff]">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-sm font-bold hover:bg-[#dae2fd] text-[#131b2e]"
              >
                -
              </button>
              <span className="px-4 py-1 text-xs font-bold font-mono">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-sm font-bold hover:bg-[#dae2fd] text-[#131b2e]"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer with WhatsApp Order Button & Add to Cart */}
        <div className="p-4 border-t border-[#f2f3ff] bg-[#faf8ff] flex flex-wrap gap-2.5">
          <WhatsAppButton
            message={`Salam, I want to order ${product.name} (${quantity} pack). Price: ${formatPKR(product.pricePKR * quantity)}`}
            label="Order via WhatsApp"
            className="flex-1"
          />
          <Button
            variant="primary"
            size="md"
            icon="add_shopping_cart"
            onClick={handleAddToCart}
            className="flex-1"
          >
            Add to Cart ({formatPKR(product.pricePKR * quantity)})
          </Button>
        </div>
      </div>
    </div>
  );
};

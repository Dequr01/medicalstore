import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { WhatsAppButton } from '../atoms/WhatsAppButton';
import { formatPKR } from '../../config/demo';

export const CartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    attachRxToItem,
    removeRxFromItem,
    cartSubtotalPKR,
    deliveryFeePKR,
    cartTotalPKR,
    setConsumerRoute,
    hasUnfulfilledRxInCart,
    canCheckout,
    t,
    language
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedItemForRx, setSelectedItemForRx] = React.useState<string | null>(null);

  const isUrdu = language === 'ur';

  if (!isOpen) return null;

  const handleRxFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && selectedItemForRx) {
      attachRxToItem(selectedItemForRx, e.target.files[0].name);
      setSelectedItemForRx(null);
    }
  };

  // WhatsApp order text with item list and total
  const cartSummaryText = `Salam, I would like to order medicines from Majeed Pharmacy:\n${cart
    .map(i => `- ${i.product.name} (x${i.quantity}) - ${formatPKR(i.product.pricePKR * i.quantity)}`)
    .join('\n')}\nSubtotal: ${formatPKR(cartSubtotalPKR)}\nEstimated Total: ${formatPKR(cartTotalPKR)}\nPayment: Cash on Delivery`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* Full-screen Dark Backdrop with fade in */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn" 
        onClick={onClose}
      />

      {/* Hidden file input for uploading Rx inside cart */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleRxFileSelect}
        accept="image/*,.pdf"
        className="hidden"
      />

      {/* Slide-over panel with smooth cubic-bezier side slide */}
      <div className={`fixed inset-y-0 ${isUrdu ? 'left-0' : 'right-0'} z-50 flex h-full max-w-full`}>
        <div 
          className={`w-screen max-w-md h-full bg-white shadow-2xl flex flex-col justify-between border-t-0 border-b-0 ${
            isUrdu ? 'border-r border-[#dae2fd] animate-drawer-left' : 'border-l border-[#dae2fd] animate-drawer-right'
          }`}
          style={{ height: '100vh', maxHeight: '100vh' }}
        >
          {/* Header */}
          <div className="p-4 border-b border-[#dae2fd] bg-[#faf8ff] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#005c55] text-[22px]">shopping_bag</span>
              <h2 className="text-base font-bold text-[#131b2e]">
                {t.cart} ({cart.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#6e7977] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors duration-150 active:scale-90"
              title="Close Cart"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Cart Items List - Scrollable middle body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#faf8ff]/50 min-h-0">
            {cart.length === 0 ? (
              <div className="text-center py-24 space-y-3">
                <span className="material-symbols-outlined text-[54px] text-[#bdc9c6]">shopping_basket</span>
                <p className="text-sm font-bold text-[#131b2e]">
                  {isUrdu ? 'آپ کی ٹوکری خالی ہے' : 'Your cart is currently empty'}
                </p>
                <p className="text-xs text-[#6e7977] max-w-xs mx-auto">
                  {isUrdu ? 'کیٹلاگ سے ادویات شامل کریں' : 'Browse our catalog to add verified medicines or daily healthcare.'}
                </p>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    setConsumerRoute('shop-medicines');
                    onClose();
                  }}
                >
                  {t.shopMedicines}
                </Button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.product.id}
                  className={`p-3.5 rounded-2xl border bg-white shadow-xs space-y-2.5 transition-all duration-200 hover:border-[#005c55]/40 hover:shadow-sm ${
                    item.product.rxRequired && !item.rxSlipUploaded
                      ? 'border-amber-300 ring-1 ring-amber-300/40'
                      : 'border-[#dae2fd]'
                  }`}
                >
                  <div className="flex gap-3 items-center justify-between">
                    {/* Medicine image */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#f2f3ff] border border-[#dae2fd] shrink-0 flex items-center justify-center">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        {item.product.rxRequired ? (
                          <Badge variant="warning" size="sm">Rx</Badge>
                        ) : (
                          <Badge variant="secondary" size="sm">OTC</Badge>
                        )}
                        <span className="text-[10px] text-[#6e7977] font-mono">Exp: {item.product.expiryDate}</span>
                      </div>
                      <h4 className="text-xs font-bold text-[#131b2e] leading-snug truncate">{item.product.name}</h4>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-xs font-black text-[#005c55]">
                          {formatPKR(item.product.pricePKR * item.quantity)}
                        </span>
                        <span className="text-[10px] text-[#6e7977]">
                          ({formatPKR(item.product.pricePKR)} each)
                        </span>
                      </div>
                    </div>

                    {/* Stepper & Delete */}
                    <div className="flex flex-col items-end justify-between h-14 shrink-0">
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#ba1a1a] hover:bg-[#ffdad6]/60 p-1 rounded-full transition-all duration-150 active:scale-90"
                        title="Remove Item"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>

                      <div className="flex items-center border border-[#dae2fd] rounded-full bg-[#faf8ff] text-xs shadow-2xs overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-[#eaedff] text-[#131b2e] font-bold active:scale-90 transition-transform"
                        >
                          -
                        </button>
                        <span className="px-2 font-bold font-mono text-[11px] text-[#131b2e]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-[#eaedff] text-[#131b2e] font-bold active:scale-90 transition-transform"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Prescription Slip Attachment Gate */}
                  {item.product.rxRequired && (
                    <div className="pt-2 border-t border-[#f2f3ff] text-xs">
                      {item.rxSlipUploaded ? (
                        <div className="flex items-center justify-between bg-emerald-50 text-emerald-900 p-2 rounded-xl border border-emerald-200">
                          <span className="flex items-center gap-1.5 truncate text-[11px] font-medium">
                            <span className="material-symbols-outlined text-[16px] text-emerald-700">verified</span>
                            {t.rxAttached}: {item.rxFileName || 'Doctor Slip'}
                          </span>
                          <button
                            onClick={() => removeRxFromItem(item.product.id)}
                            className="text-[#ba1a1a] text-[10px] underline font-bold hover:text-red-800"
                          >
                            {t.removeSlip}
                          </button>
                        </div>
                      ) : (
                        <div className="bg-amber-50 p-2 rounded-xl border border-amber-200 flex items-center justify-between">
                          <span className="text-[11px] text-amber-900 font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-amber-700">error</span>
                            Prescription slip required
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedItemForRx(item.product.id);
                              fileInputRef.current?.click();
                            }}
                            className="bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-xs flex items-center gap-1 active:scale-95 transition-all"
                          >
                            <span className="material-symbols-outlined text-[12px]">add_a_photo</span>
                            Upload Rx
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Fixed Bottom Checkout & WhatsApp Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#dae2fd] bg-white space-y-3.5 shadow-lg shrink-0">
              {/* Warning if any Rx items are unfulfilled */}
              {hasUnfulfilledRxInCart && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-950 flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-amber-700 shrink-0">warning</span>
                  <div>
                    <strong className="block font-bold">Action Required:</strong>
                    <span>{t.prescriptionRequiredCartWarning}</span>
                  </div>
                </div>
              )}

              {/* Financial Breakdown */}
              <div className="space-y-2 text-xs text-[#3e4947] bg-[#faf8ff] p-3.5 rounded-xl border border-[#dae2fd]">
                <div className="flex justify-between items-center">
                  <span>{t.subtotal}</span>
                  <span className="font-bold text-[#131b2e]">{formatPKR(cartSubtotalPKR)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Rider Delivery Charges</span>
                  <span className="font-bold text-[#006c49]">
                    {deliveryFeePKR === 0
                      ? `FREE (${t.freeDeliveryThresholdNote})`
                      : formatPKR(deliveryFeePKR)}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-[#dae2fd] pt-2 font-bold text-sm text-[#131b2e]">
                  <span>{t.totalDue}</span>
                  <span className="text-base text-[#005c55] font-black">{formatPKR(cartTotalPKR)}</span>
                </div>
              </div>

              {/* Action Buttons: Proceed to Checkout or WhatsApp Order */}
              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="lg"
                  icon="shopping_cart_checkout"
                  disabled={!canCheckout}
                  onClick={() => {
                    setConsumerRoute('checkout');
                    onClose();
                  }}
                  className="w-full shadow-md py-3 font-bold rounded-xl"
                >
                  {hasUnfulfilledRxInCart ? 'Attach Prescription to Checkout' : t.proceedToCheckout}
                </Button>

                <WhatsAppButton
                  message={cartSummaryText}
                  variant="full"
                  label="Order this Cart on WhatsApp"
                  className="w-full bg-[#006c49] hover:bg-[#005236]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

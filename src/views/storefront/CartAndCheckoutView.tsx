import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/atoms/Button';
import { Badge } from '../../components/atoms/Badge';
import { WhatsAppButton } from '../../components/atoms/WhatsAppButton';
import { MockPaymentModal } from './MockPaymentModal';
import { DEMO_CONFIG, formatPKR } from '../../config/demo';

export const CartAndCheckoutView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotalPKR,
    deliveryFeePKR,
    cartTotalPKR,
    clearCart,
    setConsumerRoute,
    submitPrescription,
    selectedCityArea,
    setSelectedCityArea,
    // currentAreaFeePKR,
    currentAreaTime,
    canCheckout,
    hasUnfulfilledRxInCart,
    t,
    language
  } = useApp();

  const isUrdu = language === 'ur';

  // const deliverySlot = 'Standard Rider Delivery';
  const [address, setAddress] = useState('House #12, Street 4, Sector B');
  const [phone, setPhone] = useState('0300-1234567');
  const [patientName, setPatientName] = useState('Ali Raza');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'jazzcash' | 'easypaisa' | 'card' | 'bank'>('cod');
  const [mockPaymentModalOpen, setMockPaymentModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const executeOrderPlacement = () => {
    const newOrderNum = `ORD-PK-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(newOrderNum);

    submitPrescription({
      patientName,
      patientPhone: phone,
      cityArea: selectedCityArea,
      medicationName: cart.map(i => `${i.product.name} (x${i.quantity})`).join(', '),
      dosage: 'Customer cart order',
      paymentMode: paymentMethod,
      totalPKR: cartTotalPKR,
      notes: `Order #${newOrderNum}. Address: ${address}, ${selectedCityArea}. Payment: ${paymentMethod.toUpperCase()}`
    });

    clearCart();
    setOrderComplete(true);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!canCheckout) {
      alert('Prescription Required: Please upload your doctor slip for prescription medicines in the cart before placing your order.');
      return;
    }

    // Task 3: If non-COD, show mock payment screen first
    if (paymentMethod !== 'cod') {
      setMockPaymentModalOpen(true);
    } else {
      executeOrderPlacement();
    }
  };

  // WhatsApp checkout message
  const checkoutWhatsAppText = `Salam Majeed Pharmacy! I would like to confirm my order:\n${cart
    .map(i => `- ${i.product.name} (x${i.quantity}) - ${formatPKR(i.product.pricePKR * i.quantity)}`)
    .join('\n')}\nArea: ${selectedCityArea}\nAddress: ${address}\nRecipient: ${patientName} (${phone})\nDelivery Time: ${currentAreaTime}\nTotal: ${formatPKR(cartTotalPKR)}\nPayment: ${paymentMethod.toUpperCase()}`;

  if (orderComplete) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6" dir={isUrdu ? 'rtl' : 'ltr'}>
        <div className="w-16 h-16 rounded-full bg-[#9cf2e8]/40 text-[#005c55] flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-[36px]">check_circle</span>
        </div>
        <h1 className="text-2xl font-black text-[#131b2e]">Order Successfully Confirmed!</h1>
        <p className="text-sm text-[#3e4947] max-w-md mx-auto">
          Order number <span className="font-mono font-bold text-[#005c55]">{orderNumber}</span> has been dispatched to our delivery rider team in {selectedCityArea}.
        </p>

        <div className="p-4 bg-white border border-[#dae2fd] rounded-2xl text-left text-xs space-y-2 shadow-2xs">
          <div className="flex justify-between font-bold border-b border-[#f2f3ff] pb-1.5">
            <span>Payment Mode:</span>
            <span className="text-[#006c49] uppercase">{paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod}</span>
          </div>
          <p><span className="text-[#6e7977]">Recipient:</span> {patientName} ({phone})</p>
          <p><span className="text-[#6e7977]">Delivery Location:</span> {address}, {selectedCityArea}</p>
          <p><span className="text-[#6e7977]">Estimated Arrival:</span> {currentAreaTime}</p>
          <p><span className="text-[#6e7977]">Total Payable to Rider:</span> <strong className="text-[#005c55] text-sm">{formatPKR(cartTotalPKR)}</strong></p>
          <p className="text-[11px] text-[#6e7977]">Our delivery rider will call your phone prior to arrival.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            variant="primary"
            icon="storefront"
            onClick={() => {
              setOrderComplete(false);
              setConsumerRoute('home');
            }}
          >
            Back to Storefront
          </Button>
          <WhatsAppButton
            message={`Salam, I have placed order ${orderNumber}. Please confirm dispatch!`}
            label="Send Order to WhatsApp"
          />
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-5" dir={isUrdu ? 'rtl' : 'ltr'}>
        <span className="material-symbols-outlined text-[56px] text-[#bdc9c6]">remove_shopping_cart</span>
        <h2 className="text-2xl font-bold text-[#131b2e]">{isUrdu ? 'آپ کی ٹوکری خالی ہے' : 'Your Cart is Empty'}</h2>
        <p className="text-xs text-[#6e7977]">
          Add medicines or personal healthcare essentials to complete your order.
        </p>
        <Button
          variant="primary"
          icon="shopping_basket"
          onClick={() => setConsumerRoute('shop-medicines')}
        >
          {t.shopMedicines}
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8" dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* Title */}
      <div className="border-b border-[#dae2fd] pb-5">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" size="md">Local Pakistani Dispensary Delivery</Badge>
          <Badge variant="outline" size="sm">Demo data</Badge>
        </div>
        <h1 className="text-3xl font-extrabold text-[#131b2e] tracking-tight mt-1">
          Review Cart &amp; Complete Checkout
        </h1>
        <p className="text-xs sm:text-sm text-[#3e4947] mt-1">
          Select your destination area, verify prescription attachments, and confirm your order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart items list */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#131b2e] flex items-center justify-between">
              <span>Selected Medicines ({cart.length})</span>
              <span className="text-xs text-[#006c49] font-medium">{t.freeDeliveryThresholdNote}</span>
            </h2>

            <div className="divide-y divide-[#f2f3ff]">
              {cart.map(item => (
                <div key={item.product.id} className="py-3 flex gap-3 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-lg object-cover bg-[#f2f3ff] border border-[#dae2fd]"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#131b2e]">{item.product.name}</h4>
                      <p className="text-[11px] text-[#6e7977] font-mono">{item.product.dosage}</p>
                      <span className="text-xs font-bold text-[#005c55] mt-0.5 block">
                        {formatPKR(item.product.pricePKR * item.quantity)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#bdc9c6] rounded bg-[#faf8ff] text-xs">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="px-2 py-0.5 hover:bg-[#dae2fd] text-[#131b2e]"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 font-bold font-mono">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="px-2 py-0.5 hover:bg-[#dae2fd] text-[#131b2e]"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#ba1a1a] hover:bg-[#ffdad6]/50 p-1 rounded transition-colors"
                      title="Remove Item"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Task 5: Prescription warning in checkout if any are unattached */}
            {hasUnfulfilledRxInCart && (
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-950 flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-amber-700">error</span>
                  One or more prescription (Rx) items need an attached slip.
                </span>
                <span className="text-[11px] font-bold text-amber-800 underline">
                  Attach via Cart Drawer
                </span>
              </div>
            )}
          </div>

          {/* WhatsApp Direct Option on Cart Page */}
          <div className="bg-[#eaedff]/60 rounded-2xl border border-[#dae2fd] p-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#005c55] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Prefer Ordering via WhatsApp?
              </h3>
              <p className="text-xs text-[#3e4947] mt-0.5">
                Send this entire cart directly to our pharmacy helpline number (+92 300 1234567).
              </p>
            </div>
            <WhatsAppButton
              message={checkoutWhatsAppText}
              label="Send Cart on WhatsApp"
            />
          </div>
        </div>

        {/* Checkout Summary Column */}
        <div className="lg:col-span-5">
          <form onSubmit={handlePlaceOrder} className="bg-white rounded-2xl border border-[#dae2fd] p-6 shadow-md space-y-4 sticky top-28">
            <h3 className="text-base font-bold text-[#131b2e] border-b border-[#f2f3ff] pb-3">
              Delivery Area &amp; Payment Details
            </h3>

            {/* Task 6: Area dropdown from DEMO_CONFIG with fee & estimated time */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#131b2e]">{t.selectArea}</label>
                <span className="text-[10px] text-[#005c55] font-bold">Est: {currentAreaTime}</span>
              </div>
              <select
                value={selectedCityArea}
                onChange={e => setSelectedCityArea(e.target.value)}
                className="w-full text-xs rounded-xl border border-[#bdc9c6] p-2.5 bg-white text-[#131b2e] focus:ring-2 focus:ring-[#005c55] focus:outline-none"
              >
                {DEMO_CONFIG.deliveryAreas.map(area => (
                  <option key={area.name} value={area.name}>
                    {area.name} — {formatPKR(area.feePKR)} ({area.estimatedTime})
                  </option>
                ))}
              </select>
              <div className="flex justify-between text-[10px] text-[#6e7977] px-1 pt-0.5">
                <span>5 sample areas</span>
                <span className="font-mono bg-[#eaedff] px-1 rounded">Demo data</span>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#131b2e]">Street Address / House / Flat #:</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
                className="w-full text-xs rounded-xl border border-[#bdc9c6] p-2.5 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
              />
            </div>

            {/* Recipient Details */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#131b2e]">Recipient Name:</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={e => setPatientName(e.target.value)}
                  required
                  className="w-full text-xs rounded-xl border border-[#bdc9c6] p-2.5 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#131b2e]">Phone (Rider Contact):</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className="w-full text-xs rounded-xl border border-[#bdc9c6] p-2.5 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
                />
              </div>
            </div>

            {/* Task 3: Payment Options (COD default, pre-selected) */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#131b2e]">Payment Mode:</label>
                <span className="text-[10px] font-bold text-[#006c49]">Cash on Delivery Default</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'cod', label: 'Cash on Delivery (Pay cash to rider upon arrival)', defaultBadge: 'Default' },
                  { id: 'jazzcash', label: 'JazzCash Mobile Account', defaultBadge: 'Mock payment' },
                  { id: 'easypaisa', label: 'Easypaisa Mobile Wallet', defaultBadge: 'Mock payment' },
                  { id: 'card', label: 'Debit / Credit Card (1Link / Visa / MC)', defaultBadge: 'Mock payment' },
                  { id: 'bank', label: 'Direct Bank Transfer (IBFT)', defaultBadge: 'Mock payment' }
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`py-2 px-3 text-xs rounded-xl border font-semibold flex items-center justify-between text-left transition-all ${
                      paymentMethod === m.id
                        ? 'border-[#005c55] bg-[#eaedff] text-[#005c55] ring-1 ring-[#005c55]'
                        : 'border-[#dae2fd] bg-white text-[#3e4947] hover:bg-[#faf8ff]'
                    }`}
                  >
                    <span>{m.label}</span>
                    <span className="text-[10px] bg-white border border-[#bdc9c6] px-1.5 py-0.5 rounded font-mono">
                      {m.defaultBadge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Totals table with area fee */}
            <div className="space-y-1.5 text-xs text-[#3e4947] border-t border-[#f2f3ff] pt-3">
              <div className="flex justify-between">
                <span>{t.subtotal}</span>
                <span className="font-medium text-[#131b2e]">{formatPKR(cartSubtotalPKR)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.deliveryCharges} ({selectedCityArea.split('(')[0].trim()})</span>
                <span className="font-medium text-[#006c49]">
                  {deliveryFeePKR === 0 ? `FREE (${t.freeDeliveryThresholdNote})` : formatPKR(deliveryFeePKR)}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-[#131b2e] border-t border-[#f2f3ff] pt-2">
                <span>{t.totalDue}</span>
                <span className="text-[#005c55]">{formatPKR(cartTotalPKR)}</span>
              </div>
            </div>

            {/* Task 5: Block Place Order button if Rx items are unfulfilled */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon="check"
              disabled={!canCheckout}
              className="w-full py-3 rounded-xl font-bold"
            >
              {hasUnfulfilledRxInCart
                ? 'Prescription Slip Required to Order'
                : paymentMethod === 'cod'
                ? 'Confirm Order (Pay on Delivery)'
                : 'Proceed with Simulated Payment'}
            </Button>
          </form>
        </div>
      </div>

      {/* Task 3: Mock Payment Screen Dialog */}
      <MockPaymentModal
        isOpen={mockPaymentModalOpen}
        method={paymentMethod !== 'cod' ? paymentMethod : null}
        totalPKR={cartTotalPKR}
        onClose={() => setMockPaymentModalOpen(false)}
        onConfirm={() => {
          setMockPaymentModalOpen(false);
          executeOrderPlacement();
        }}
      />
    </div>
  );
};

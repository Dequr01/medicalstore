import React, { useState } from 'react';
import { Button } from '../../components/atoms/Button';
import { Badge } from '../../components/atoms/Badge';
import { WhatsAppButton } from '../../components/atoms/WhatsAppButton';
import { DEMO_CONFIG } from '../../config/demo';
import { useApp } from '../../context/AppContext';

export const ConsultPharmacistView: React.FC = () => {
  const { language, t } = useApp();
  const isUrdu = language === 'ur';

  const [patientMessage, setPatientMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-10 space-y-8" dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* Title */}
      <div className="border-b border-[#dae2fd] pb-5 text-center space-y-2">
        <div className="flex justify-center items-center gap-2">
          <Badge variant="secondary" dot size="md">{t.pcpTrust}</Badge>
          <span className="text-[10px] bg-[#eaedff] text-[#005c55] font-mono px-2 py-0.5 rounded-full border border-[#dae2fd]">
            Demo data
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#131b2e] tracking-tight">
          {t.pharmacistHelpline}
        </h1>
        <p className="text-sm text-[#3e4947] max-w-xl mx-auto">
          {isUrdu 
            ? 'ادویات کے استعمال، خوراک یا سستے متبادل کے بارے میں فارماسسٹ سے واٹس ایپ پر مفت رہنمائی حاصل کریں۔'
            : `Have questions regarding drug dosages, brand alternatives, or taking your medicine safely? Reach our qualified pharmacist (${DEMO_CONFIG.pcpRegNo}) directly.`}
        </p>
      </div>

      {/* Task 4: WhatsApp Quick Help Card */}
      <div className="bg-[#eaedff]/60 rounded-2xl border border-[#dae2fd] p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#006c49] text-white flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-[28px]">chat</span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#131b2e]">Fastest Response: WhatsApp Pharmacy Helpline</h2>
          <p className="text-xs text-[#3e4947] mt-1 max-w-md mx-auto">
            Connect directly with our dispensary team on WhatsApp ({DEMO_CONFIG.whatsappDisplay}) for quick prescription quotes and dosage counseling.
          </p>
        </div>

        <WhatsAppButton
          message="Salam, I have a question about my medication dosage and availability."
          variant="full"
          label={`Chat with Pharmacist (${DEMO_CONFIG.whatsappDisplay})`}
        />
      </div>

      {/* Callback Request Form */}
      <div className="bg-white rounded-2xl border border-[#dae2fd] p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-[#131b2e]">Or Request a Clinical Phone Callback</h3>
        <p className="text-xs text-[#6e7977]">Leave your phone number and question; our pharmacist will call you during pharmacy hours.</p>

        {sent ? (
          <div className="p-4 rounded-xl bg-[#6ffbbe]/20 border border-[#4edea3]/40 text-xs text-[#006c49] font-medium">
            Thank you! Your inquiry has been submitted. Our supervising pharmacist will call you at {phoneNumber || 'your registered number'}.
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1">Your Contact Phone Number:</label>
              <input
                type="tel"
                placeholder="0300-1234567"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                required
                className="w-full text-xs rounded-lg border border-[#bdc9c6] p-2.5 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1">Your Question or Inquiry:</label>
              <textarea
                rows={3}
                placeholder="e.g. Can I take this medication with food? Do you have generic Lipiget in stock?"
                value={patientMessage}
                onChange={e => setPatientMessage(e.target.value)}
                required
                className="w-full text-xs rounded-lg border border-[#bdc9c6] p-2.5 focus:ring-2 focus:ring-[#005c55] focus:outline-none"
              />
            </div>

            <Button type="submit" variant="primary" size="md" icon="call">
              Request Pharmacist Callback
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import { StaffLoginModal } from '../../views/clinical/StaffLoginModal';
import { DEMO_CONFIG } from '../../config/demo';

export const StorefrontFooter: React.FC = () => {
  const { setConsumerRoute, language, t } = useApp();
  const isUrdu = language === 'ur';
  const [staffModalOpen, setStaffModalOpen] = React.useState(false);

  return (
    <footer className="bg-[#131b2e] text-[#faf8ff] border-t border-[#283044] mt-16" dir={isUrdu ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#005c55] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[20px]">local_pharmacy</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-sans">
                {isUrdu ? DEMO_CONFIG.pharmacyName : 'MAJEED PHARMACY'}
              </span>
            </div>
            <p className="text-xs text-[#bdc9c6] leading-relaxed">
              {isUrdu
                ? 'ڈرگ ریگولیٹری اتھارٹی آف پاکستان (DRAP) کے قوانین کے مطابق مستند ادویات اور فارمیسی کونسل آف پاکستان سے رجسٹرڈ کوالیفائیڈ فارماسسٹ کی زیر نگرانی ترسیل۔'
                : 'Licensed clinical dispensary delivering genuine prescription medicines and health essentials across Lahore and Pakistan.'}
            </p>
            <p className="text-[11px] text-[#bdc9c6]">
              {t.licenseHeader}: {DEMO_CONFIG.drugSaleLicenseNo} • {t.pcpTrust} ({DEMO_CONFIG.pcpRegNo})
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6cf8bb]">
              {isUrdu ? 'خدمات' : 'Customer Services'}
            </h4>
            <ul className="space-y-2 text-xs text-[#bdc9c6]">
              <li>
                <button onClick={() => setConsumerRoute('prescription-refill')} className="hover:text-white transition-colors">
                  {t.uploadPrescription}
                </button>
              </li>
              <li>
                <button onClick={() => setConsumerRoute('shop-medicines')} className="hover:text-white transition-colors">
                  {t.shopMedicines}
                </button>
              </li>
              <li>
                <button onClick={() => setConsumerRoute('consult-pharmacist')} className="hover:text-white transition-colors">
                  {t.pharmacistHelpline}
                </button>
              </li>
            </ul>
          </div>

          {/* WhatsApp Direct */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6cf8bb]">
              {t.orderOnWhatsApp}
            </h4>
            <p className="text-xs text-[#bdc9c6]">
              {isUrdu ? 'نسخہ کی تصویر بھیجیں اور فوری قیمت معلوم کریں:' : 'Snap a slip picture and get an instant quote directly on WhatsApp:'}
            </p>
            <a
              href={`https://wa.me/${DEMO_CONFIG.whatsappNumber}?text=Salam,%20I%20need%20medicine%20quote`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#006c49] text-white px-3.5 py-2 rounded-lg text-xs font-bold hover:bg-[#005236] transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              {DEMO_CONFIG.whatsappDisplay}
            </a>
          </div>

          {/* Discreet Staff Portal Entry */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6cf8bb]">
              {t.staffLogin}
            </h4>
            <p className="text-xs text-[#bdc9c6]">
              Authorized dispensary personnel and on-duty pharmacists only.
            </p>
            <button
              onClick={() => setStaffModalOpen(true)}
              className="text-xs font-semibold text-[#6cf8bb] hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">lock</span>
              Pharmacist Staff Login (Dispensary Hub) ➔
            </button>
          </div>
        </div>

        <div className="border-t border-[#283044] mt-10 pt-6 flex flex-wrap items-center justify-between text-[11px] text-[#bdc9c6] gap-4">
          <p>© {new Date().getFullYear()} {DEMO_CONFIG.pharmacyName} (Private) Limited. All rights reserved.</p>
          <div className="flex gap-4">
            <span>DRAP Registered Stock</span>
            <span>{t.cashOnDelivery}</span>
            <span>{t.pcpTrust}</span>
          </div>
        </div>
      </div>

      <StaffLoginModal isOpen={staffModalOpen} onClose={() => setStaffModalOpen(false)} />
    </footer>
  );
};

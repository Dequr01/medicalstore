import React from 'react';
import { useApp, INITIAL_PRODUCTS } from '../../context/AppContext';
import { Button } from '../../components/atoms/Button';
import { ProductCard } from '../../components/molecules/ProductCard';
import { WhatsAppButton } from '../../components/atoms/WhatsAppButton';
// demo config

export const HomeStorefrontView: React.FC = () => {
  const { setConsumerRoute, language, selectedCityArea, t } = useApp();
  const isUrdu = language === 'ur';

  return (
    <div className="space-y-12 pb-16 relative overflow-hidden" dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* Task 11 Element 1: Soft curved background line behind hero (transform/opacity only) */}
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none overflow-hidden select-none -z-10">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full text-[#dae2fd]/40 fill-none stroke-current opacity-70"
          preserveAspectRatio="none"
        >
          <path
            d="M0,160 C320,300 420,40 720,160 C1020,280 1200,60 1440,200"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="pt-10 pb-12 px-4 lg:px-8 border-b border-[#dae2fd]/50 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#bdc9c6]/60 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#006c49]" />
            <span className="text-xs font-bold text-[#006c49] uppercase tracking-wider">
              {isUrdu ? `سروس دستیاب ہے: ${selectedCityArea}` : `Active Dispensary Delivery: ${selectedCityArea}`}
            </span>
            <span className="text-[10px] bg-[#eaedff] text-[#005c55] font-mono px-1.5 py-0.2 rounded">Demo data</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-[#131b2e] tracking-tight leading-[1.2]">
            {isUrdu 
              ? 'اصلی ادویات، کیش آن ڈیلیوری کے ساتھ آپ کی دہلیز پر'
              : 'Genuine Prescription Medicines Delivered to Your Doorstep'}
          </h1>

          <p className="text-base sm:text-lg text-[#3e4947] max-w-2xl mx-auto leading-relaxed">
            {isUrdu
              ? 'ڈاکٹر کا نسخہ بھیجیں، فارماسسٹ سے تصدیق کروائیں اور محفوظ ترسیل حاصل کریں۔'
              : 'Order your genuine daily medicines, upload doctor prescriptions for verified pharmacist review, and pay via Cash on Delivery.'}
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#dae2fd] shadow-2xs">
              <span className="material-symbols-outlined text-[#005c55] text-[20px]">verified</span>
              <span className="text-xs font-bold text-[#131b2e]">100% Genuine Pharma Stock</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#dae2fd] shadow-2xs">
              <span className="material-symbols-outlined text-[#005c55] text-[20px]">payments</span>
              <span className="text-xs font-bold text-[#131b2e]">Cash on Delivery (COD)</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#dae2fd] shadow-2xs">
              <span className="material-symbols-outlined text-[#005c55] text-[20px]">verified_user</span>
              <span className="text-xs font-bold text-[#131b2e]">{t.pcpTrust}</span>
            </div>
          </div>

          {/* Hero Action Buttons & WhatsApp Button */}
          <div className="flex flex-wrap justify-center items-center gap-3 pt-4">
            <Button
              size="lg"
              variant="primary"
              icon="upload_file"
              onClick={() => setConsumerRoute('prescription-refill')}
            >
              {isUrdu ? 'نسخہ کی تصویر اپ لوڈ کریں' : 'Upload Prescription (Rx)'}
            </Button>
            <WhatsAppButton
              variant="full"
              label={t.orderOnWhatsApp}
            />
          </div>
        </div>
      </section>

      {/* Task 11 Element 2: Soft wave section divider */}
      <div className="w-full h-8 pointer-events-none overflow-hidden select-none my-[-1.5rem]">
        <svg viewBox="0 0 1200 40" className="w-full h-full text-[#dae2fd]/50 fill-none stroke-current" preserveAspectRatio="none">
          <path d="M0,20 Q300,38 600,20 T1200,20" strokeWidth="1.8" />
        </svg>
      </div>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#131b2e]">
              {isUrdu ? 'ادویات کے شعبے' : 'Healthcare Categories'}
            </h2>
            <p className="text-xs text-[#3e4947]">
              {isUrdu ? 'اپنی مطلوبہ دوا تلاش کریں' : 'Select a category to view verified pharmacy formulas'}
            </p>
          </div>
          <button
            onClick={() => setConsumerRoute('shop-medicines')}
            className="text-xs font-bold text-[#005c55] hover:underline flex items-center gap-1"
          >
            {isUrdu ? 'تمام ادویات دیکھیں' : 'View All Medicines'}
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: isUrdu ? 'ڈاکٹری نسخہ والی ادویات (Rx)' : 'Prescription Medicines (Rx)',
              desc: isUrdu ? 'اینٹی بائیوٹکس، شوگر، بلڈ پریشر ادویات' : 'Lipiget, Augmentin, Risek & chronic care formulas',
              icon: 'medication',
              route: 'shop-medicines' as const
            },
            {
              title: isUrdu ? 'عام ادویات (OTC)' : 'Daily Healthcare & OTC',
              desc: isUrdu ? 'پیناڈول، ملٹی وٹامنز، سر درد اور بخار' : 'Panadol, Surbex Z, pain relief & family care',
              icon: 'local_pharmacy',
              route: 'shop-medicines' as const
            },
            {
              title: isUrdu ? 'نسخہ کی تصویر بھیجیں' : 'Snap & Send Prescription',
              desc: isUrdu ? 'واٹس ایپ یا پورٹل پر نسخہ اپ لوڈ کریں' : 'Upload slip for pharmacist review and quote',
              icon: 'add_a_photo',
              route: 'prescription-refill' as const
            }
          ].map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setConsumerRoute(cat.route)}
              className="p-6 rounded-2xl border border-[#dae2fd] bg-white text-left hover:border-[#005c55] hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#005c55]/10 text-[#005c55] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">{cat.icon}</span>
              </div>
              <h3 className="font-bold text-base text-[#131b2e] group-hover:text-[#005c55] transition-colors">{cat.title}</h3>
              <p className="text-xs text-[#6e7977] mt-1">{cat.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Task 11 Element 3: Subtle divider swirl line */}
      <div className="w-full h-8 pointer-events-none overflow-hidden select-none my-[-1rem]">
        <svg viewBox="0 0 1200 30" className="w-full h-full text-[#dae2fd]/40 fill-none stroke-current" preserveAspectRatio="none">
          <path d="M0,15 C400,0 800,30 1200,15" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Featured Medicines Grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#131b2e]">
              {isUrdu ? 'روزمرہ ضروری ادویات' : 'Popular Essential Medicines'}
            </h2>
            <p className="text-xs text-[#3e4947]">
              {isUrdu ? 'تاریخ تنسیخ (Expiry) اور بیچ نمبر کے ساتھ تصدیق شدہ' : 'Verified batch numbers and guaranteed fresh expiry dates'}
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            icon="tune"
            onClick={() => setConsumerRoute('shop-medicines')}
          >
            {isUrdu ? 'تمام دیکھیں' : 'Explore All'}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

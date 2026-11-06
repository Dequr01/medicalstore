import React, { useState } from 'react';
import { useApp, INITIAL_PRODUCTS } from '../../context/AppContext';
import { ProductCard } from '../../components/molecules/ProductCard';
import { SearchBar } from '../../components/molecules/SearchBar';
import { CustomSelect } from '../../components/atoms/CustomSelect';
import { DEMO_CONFIG } from '../../config/demo';

export const ShopMedicinesView: React.FC = () => {
  const { searchQuery, language, t } = useApp();
  const isUrdu = language === 'ur';

  const [filterType, setFilterType] = useState<'all' | 'prescription' | 'otc'>('all');
  const [selectedSort, setSelectedSort] = useState<string>('price-low');
  const [nearExpiryOnly, setNearExpiryOnly] = useState(false);

  const sortOptions = [
    { value: 'price-low', label: t.priceLowHigh },
    { value: 'price-high', label: t.priceHighLow }
  ];

  const filtered = INITIAL_PRODUCTS
    .filter((p) => {
      if (filterType === 'prescription') return p.rxRequired;
      if (filterType === 'otc') return !p.rxRequired;
      return true;
    })
    .filter((p) => {
      if (nearExpiryOnly) return p.daysUntilExpiry <= DEMO_CONFIG.nearExpiryThresholdDays;
      return true;
    })
    .filter((p) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.genericName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (selectedSort === 'price-low') return a.pricePKR - b.pricePKR;
      if (selectedSort === 'price-high') return b.pricePKR - a.pricePKR;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6" dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* Title */}
      <div className="border-b border-[#dae2fd] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold text-[#131b2e] tracking-tight">
                {isUrdu ? 'مستند ادویات کا کیٹلاگ' : 'Verified Medicines & Healthcare Catalog'}
              </h1>
              <span className="text-[10px] bg-[#eaedff] text-[#005c55] font-mono px-2 py-0.5 rounded-full border border-[#dae2fd]">
                Demo data
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#3e4947] mt-1">
              {isUrdu 
                ? 'تمام ادویات ڈرگ ریگولیٹری اتھارٹی آف پاکستان (DRAP) سے رجسٹرڈ ہیں'
                : 'All medicines sourced from licensed pharmaceutical distributors with transparent pricing in PKR.'}
            </p>
          </div>

          <div className="w-full sm:w-80">
            <SearchBar placeholder={isUrdu ? 'دوا تلاش کریں...' : 'Search brand or generic...'} />
          </div>
        </div>
      </div>

      {/* Filter Chips & Custom Clean Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-[#dae2fd] shadow-2xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#6e7977] mr-1">{isUrdu ? 'فلٹر:' : 'Filter:'}</span>
          {(['all', 'prescription', 'otc'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterType === tab
                  ? 'bg-[#005c55] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3e4947] hover:bg-[#dae2fd]'
              }`}
            >
              {tab === 'all' 
                ? t.allMedicines 
                : tab === 'prescription' 
                ? t.prescriptionOnly 
                : t.otcOnly}
            </button>
          ))}

          {/* Near Expiry Toggle Filter */}
          <button
            onClick={() => setNearExpiryOnly(!nearExpiryOnly)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
              nearExpiryOnly
                ? 'bg-amber-600 text-white'
                : 'bg-[#faf8ff] border border-amber-300 text-amber-800 hover:bg-amber-50'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">hourglass_bottom</span>
            <span>{t.filterNearExpiry}</span>
          </button>
        </div>

        {/* Custom Clean Sort By Dropdown */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-semibold text-[#6e7977]">{t.sortBy}</span>
          <CustomSelect
            value={selectedSort}
            onChange={setSelectedSort}
            options={sortOptions}
            icon="swap_vert"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#bdc9c6]">
          <span className="material-symbols-outlined text-[48px] text-[#6e7977] mb-2">medication_liquid</span>
          <h3 className="text-lg font-bold text-[#131b2e]">{isUrdu ? 'کوئی دوا نہیں ملی' : 'No medications found'}</h3>
          <p className="text-xs text-[#6e7977] max-w-sm mx-auto mt-1">
            {isUrdu 
              ? 'اگر مطلوبہ دوا نظر نہ آئے تو نسخہ اپ لوڈ کریں یا واٹس ایپ پر رابطہ کریں۔'
              : `We couldn't find matches for "${searchQuery}". You can upload a doctor slip or message our pharmacist on WhatsApp.`}
          </p>
        </div>
      )}
    </div>
  );
};

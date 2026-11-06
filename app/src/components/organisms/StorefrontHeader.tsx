import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SearchBar } from '../molecules/SearchBar';
import { Button } from '../atoms/Button';
import { CustomSelect } from '../atoms/CustomSelect';
import { WhatsAppButton } from '../atoms/WhatsAppButton';
import { PatientLoginModal } from '../../views/storefront/PatientLoginModal';
import { DEMO_CONFIG } from '../../config/demo';

export const StorefrontHeader: React.FC = () => {
  const {
        setCartDrawerOpen,
    language,
    setLanguage,
    consumerRoute,
    setConsumerRoute,
    cartCount,
    selectedCityArea,
    setSelectedCityArea,
    patientPhone,
    setPatientPhone,
    t
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [patientLoginOpen, setPatientLoginOpen] = useState(false);

  const isUrdu = language === 'ur';

  const navLinks = [
    { label: t.home, route: 'home' as const },
    { label: t.shopMedicines, route: 'shop-medicines' as const },
    { label: t.uploadPrescription, route: 'prescription-refill' as const },
    { label: t.pharmacistHelpline, route: 'consult-pharmacist' as const }
  ];

  const areaOptions = DEMO_CONFIG.deliveryAreas.map(area => ({
    value: area.name,
    label: area.name
  }));

  return (
    <header className="sticky top-0 z-40 bg-[#faf8ff]/95 backdrop-blur-md border-b border-[#dae2fd]/80 shadow-xs" dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* Top Bar: Pakistani Drug Sale License & City Area Selection */}
      <div className="bg-[#eaedff] border-b border-[#dae2fd]/60 px-4 py-1.5 text-xs text-[#3e4947]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 font-semibold text-[#006c49]">
              <span className="w-2 h-2 rounded-full bg-[#006c49]" />
              {t.licenseHeader}: {DEMO_CONFIG.drugSaleLicenseNo}
            </span>
            <span className="text-[10px] bg-white border border-[#bdc9c6] text-[#005c55] font-semibold px-2 py-0.2 rounded-full">
              Demo data
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Custom Clean Delivery Area Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-[#131b2e]">
              <span className="text-[11px] text-[#6e7977]">{t.deliverTo}</span>
              <CustomSelect
                value={selectedCityArea}
                onChange={setSelectedCityArea}
                options={areaOptions}
                icon="location_on"
                size="sm"
              />
            </div>

            {/* Task 9: Patient Mobile Login Button (Mock OTP) */}
            <button
              onClick={() => setPatientLoginOpen(true)}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#005c55] bg-white border border-[#dae2fd] hover:bg-[#eaedff] px-2.5 py-1 rounded-full shadow-2xs"
            >
              <span className="material-symbols-outlined text-[14px]">person</span>
              <span>{patientPhone ? patientPhone : t.patientLogin}</span>
            </button>

            {/* Language Toggle */}
            <div className="flex items-center border border-[#dae2fd] rounded-full bg-white overflow-hidden text-xs font-bold shadow-2xs">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-0.5 transition-colors ${language === 'en' ? 'bg-[#005c55] text-white' : 'text-[#3e4947] hover:bg-[#eaedff]'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('ur')}
                className={`px-2.5 py-0.5 font-urdu transition-colors ${language === 'ur' ? 'bg-[#005c55] text-white' : 'text-[#3e4947] hover:bg-[#eaedff]'}`}
              >
                اردو
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <button
            onClick={() => setConsumerRoute('home')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#005c55] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">local_pharmacy</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#131b2e] block leading-none font-sans">
                {isUrdu ? DEMO_CONFIG.pharmacyName : 'MAJEED PHARMACY'}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#006c49]">
                {isUrdu ? DEMO_CONFIG.pharmacyTaglineUr : DEMO_CONFIG.pharmacyTaglineEn}
              </span>
            </div>
          </button>

          {/* Search bar */}
          <div className="hidden lg:block flex-1 max-w-lg mx-4">
            <SearchBar placeholder={t.searchPlaceholder} />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Task 4: WhatsApp Button in Header */}
            <WhatsAppButton
              variant="pill"
              label={t.orderOnWhatsApp}
              className="hidden sm:inline-flex"
            />

            {/* Fast Upload Rx */}
            <Button
              size="sm"
              variant="secondary"
              icon="upload_file"
              onClick={() => setConsumerRoute('prescription-refill')}
              className="hidden md:inline-flex rounded-full"
            >
              {t.uploadRx}
            </Button>

            {/* Shopping Cart Pill */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="relative p-2 rounded-full text-[#3e4947] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors"
              title="View Cart"
            >
              <span className="material-symbols-outlined text-[26px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#ba1a1a] px-1 text-[11px] font-bold text-white shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#131b2e] hover:bg-[#eaedff]"
            >
              <span className="material-symbols-outlined text-[26px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-2.5 lg:hidden">
          <SearchBar placeholder={t.searchPlaceholder} />
        </div>
      </div>

      {/* Nav Links */}
      <nav className="bg-[#f2f3ff]/80 border-t border-[#dae2fd]/60 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = consumerRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => setConsumerRoute(link.route)}
                  className={`py-2.5 transition-colors border-b-2 ${
                    isActive
                      ? 'border-[#005c55] text-[#005c55] font-bold'
                      : 'border-transparent text-[#3e4947] hover:text-[#131b2e]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-[#006c49] font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">payments</span>
            <span>{t.cashOnDelivery} • {t.freeDeliveryThresholdNote}</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#dae2fd] bg-[#faf8ff] p-4 shadow-lg animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map(link => (
              <button
                key={link.route}
                onClick={() => {
                  setConsumerRoute(link.route);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  consumerRoute === link.route
                    ? 'bg-[#005c55] text-white font-bold'
                    : 'text-[#131b2e] hover:bg-[#eaedff]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <WhatsAppButton
              variant="full"
              label={t.orderOnWhatsApp}
              className="mt-2 text-center"
            />
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      

      {/* Task 9: Patient Mobile Login Modal */}
      <PatientLoginModal
        isOpen={patientLoginOpen}
        onClose={() => setPatientLoginOpen(false)}
        onSuccess={(phone) => setPatientPhone(phone)}
      />
    </header>
  );
};

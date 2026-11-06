import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { StorefrontHeader } from './components/organisms/StorefrontHeader';
import { StorefrontFooter } from './components/organisms/StorefrontFooter';
import { ClinicalSidebar } from './components/organisms/ClinicalSidebar';
import { WhatsAppButton } from './components/atoms/WhatsAppButton';
import { CartDrawer } from './components/molecules/CartDrawer';

// Views
import { HomeStorefrontView } from './views/storefront/HomeStorefrontView';
import { ShopMedicinesView } from './views/storefront/ShopMedicinesView';
import { PrescriptionRefillView } from './views/storefront/PrescriptionRefillView';
import { ConsultPharmacistView } from './views/storefront/ConsultPharmacistView';
import { CartAndCheckoutView } from './views/storefront/CartAndCheckoutView';

// Clinical Operations Views
import { RxVerificationQueueView } from './views/clinical/RxVerificationQueueView';
import { ClinicalOperationsView } from './views/clinical/ClinicalOperationsView';

const MainLayout: React.FC = () => {
  const { portalMode, consumerRoute, clinicalRoute, toastMessage, language, cartDrawerOpen, setCartDrawerOpen } = useApp();
  const isUrdu = language === 'ur';

  return (
    <div className={`min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e] ${isUrdu ? 'font-urdu' : ''}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#131b2e] text-white px-4 py-3 rounded-xl shadow-xl border border-[#283044] animate-bounce">
          <span className="material-symbols-outlined text-[20px] text-[#6cf8bb]">check_circle</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Floating WhatsApp Button on Mobile */}
      {portalMode === 'consumer' && (
        <WhatsAppButton variant="floating" />
      )}

      {/* Global Full-Height Slide-Over Cart Drawer at root level */}
      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />

      {portalMode === 'consumer' ? (
        // Consumer Storefront Layout
        <div className="flex flex-col min-h-screen">
          <StorefrontHeader />
          <main className="flex-1">
            {consumerRoute === 'home' && <HomeStorefrontView />}
            {consumerRoute === 'shop-medicines' && <ShopMedicinesView />}
            {consumerRoute === 'prescription-refill' && <PrescriptionRefillView />}
            {consumerRoute === 'consult-pharmacist' && <ConsultPharmacistView />}
            {(consumerRoute === 'cart' || consumerRoute === 'checkout') && <CartAndCheckoutView />}
          </main>
          <StorefrontFooter />
        </div>
      ) : (
        // Discreet Pharmacist Operating Hub Layout
        <div className="flex min-h-screen bg-[#faf8ff]">
          <ClinicalSidebar />
          <main className="flex-1 overflow-y-auto max-h-screen">
            {clinicalRoute === 'rx-verification' ? (
              <RxVerificationQueueView />
            ) : (
              <ClinicalOperationsView />
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

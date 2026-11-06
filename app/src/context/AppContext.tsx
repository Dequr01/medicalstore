import React, { createContext, useContext, useState } from 'react';
import type { ConsumerRoute, ClinicalRoute, CartItem, ProductItem, PrescriptionSubmission, Language } from '../types';
import { DEMO_CONFIG } from '../config/demo';
import { TRANSLATIONS } from '../locales/translations';

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'med-1',
    name: 'Lipiget (Atorvastatin)',
    genericName: 'Atorvastatin Calcium (Getz Pharma)',
    category: 'prescription',
    dosage: '20mg • 30 Tablets',
    pricePKR: 490,
    originalPricePKR: 550,
    rxRequired: true,
    stock: 140,
    badge: 'Popular Refill',
    rating: 4.9,
    reviewsCount: 312,
    batchNumber: 'LPG-8821',
    expiryDate: '11/2027',
    daysUntilExpiry: 360,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
    description: 'Lipid-lowering agent indicated to reduce elevated total-C, LDL-C, and triglycerides in patients with hypercholesterolemia.',
    substitutes: [
      { name: 'Atorva 20mg (Searle)', company: 'Searle Company', pricePKR: 410, savingsPKR: 80 },
      { name: 'X-Plat 20mg (Hilton)', company: 'Hilton Pharma', pricePKR: 380, savingsPKR: 110 }
    ]
  },
  {
    id: 'med-2',
    name: 'Augmentin Tablets',
    genericName: 'Co-Amoxiclav 1g (GSK Pakistan)',
    category: 'prescription',
    dosage: '1000mg • 14 Tablets',
    pricePKR: 620,
    rxRequired: true,
    stock: 95,
    badge: 'Antibiotic',
    rating: 4.8,
    reviewsCount: 240,
    batchNumber: 'AUG-4019',
    expiryDate: '08/2026',
    daysUntilExpiry: 210,
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&auto=format&fit=crop&q=80',
    description: 'Broad-spectrum antibacterial medication for acute bacterial sinusitis, respiratory infections, and dental abscesses.',
    substitutes: [
      { name: 'Curam 1g (Sandoz/Novartis)', company: 'Novartis PK', pricePKR: 540, savingsPKR: 80 },
      { name: 'Clavomox 1g (Bosch)', company: 'Bosch Pharmaceuticals', pricePKR: 495, savingsPKR: 125 }
    ]
  },
  {
    id: 'med-3',
    name: 'Panadol Extra Tablets',
    genericName: 'Paracetamol 500mg + Caffeine 65mg (Haleon/GSK)',
    category: 'otc',
    dosage: '100 Tablets Box',
    pricePKR: 480,
    rxRequired: false,
    stock: 350,
    badge: 'Fast Pain Relief',
    rating: 4.9,
    reviewsCount: 880,
    batchNumber: 'PDL-9941',
    expiryDate: '12/2028',
    daysUntilExpiry: 520,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
    description: 'Fast and targeted relief from headaches, migraines, backache, toothache, and fever reduction.'
  },
  {
    id: 'med-4',
    name: 'Surbex Z Film-Coated Tablets',
    genericName: 'Zinc + Vitamin B-Complex + Vitamin C (Abbott Pakistan)',
    category: 'otc',
    dosage: '30 Tablets Bottle',
    pricePKR: 395,
    rxRequired: false,
    stock: 210,
    badge: 'Daily Multivitamin',
    rating: 4.8,
    reviewsCount: 420,
    batchNumber: 'SBZ-7714',
    expiryDate: '06/2027',
    daysUntilExpiry: 310,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
    description: 'Essential therapeutic multi-vitamin formula with Zinc and Vitamin C for immune resilience and recovery.'
  },
  {
    id: 'med-5',
    name: 'Risek (Omeprazole)',
    genericName: 'Omeprazole Pellets (Getz Pharma)',
    category: 'prescription',
    dosage: '40mg • 14 Capsules',
    pricePKR: 430,
    rxRequired: true,
    stock: 180,
    badge: 'Acid Reflux / GERD',
    rating: 4.8,
    reviewsCount: 290,
    batchNumber: 'RSK-3190',
    expiryDate: '09/2027',
    daysUntilExpiry: 340,
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&auto=format&fit=crop&q=80',
    description: 'Proton pump inhibitor (PPI) for healing gastric ulcers, GERD, and hypersecretory conditions.',
    substitutes: [
      { name: 'Omega 40mg (Ferozsons)', company: 'Ferozsons Labs', pricePKR: 360, savingsPKR: 70 }
    ]
  },
  {
    id: 'med-6',
    name: 'Cravit (Levofloxacin)',
    genericName: 'Levofloxacin Hemihydrate (Sanofi-Aventis)',
    category: 'prescription',
    dosage: '500mg • 10 Tablets',
    pricePKR: 520,
    rxRequired: true,
    stock: 45,
    badge: 'Near Expiry Special',
    rating: 4.7,
    reviewsCount: 110,
    batchNumber: 'CRV-1029',
    expiryDate: '01/2027',
    daysUntilExpiry: 65,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
    description: 'Fluoroquinolone antibacterial agent prescribed for acute pyelonephritis and respiratory infections.',
    substitutes: [
      { name: 'Leflox 500mg (Getz)', company: 'Getz Pharma', pricePKR: 430, savingsPKR: 90 }
    ]
  }
];

export const INITIAL_PRESCRIPTIONS: PrescriptionSubmission[] = [
  {
    id: 'RX-PK-101',
    patientName: 'Ali Raza',
    patientPhone: '0300-4821940',
    cityArea: 'Gulberg (Phase 1-3), Lahore',
    doctorName: 'Dr. Tariq Mahmood (FCPS Med)',
    doctorPmdc: 'PMDC #18492-P',
    medicationName: 'Lipiget 20mg (1 Box) + Augmentin 1g (1 Pack)',
    dosage: '1 tab daily at night • 1 tab BD for 7 days',
    status: 'pending_review',
    timestamp: '8 mins ago',
    paymentMode: 'cod',
    totalPKR: 1110,
    prescriptionImageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop&q=80',
    notes: 'Prescription uploaded by customer. Confirmed with Dr. PMDC No. #18492-P.'
  },
  {
    id: 'RX-PK-102',
    patientName: 'Farhana Begum',
    patientPhone: '0321-9941028',
    cityArea: 'DHA (Phase 1-6), Lahore',
    doctorName: 'Dr. Ayesha Siddiqui',
    doctorPmdc: 'PMDC #22409-P',
    medicationName: 'Risek 40mg (2 Packs)',
    dosage: '1 cap daily before breakfast',
    status: 'in_dispensing',
    timestamp: '25 mins ago',
    paymentMode: 'jazzcash',
    totalPKR: 860,
    notes: 'Verified via customer phone OTP.'
  }
];

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS.en;
  portalMode: 'consumer' | 'clinical';
  setPortalMode: (mode: 'consumer' | 'clinical') => void;
  consumerRoute: ConsumerRoute;
  setConsumerRoute: (route: ConsumerRoute) => void;
  clinicalRoute: ClinicalRoute;
  setClinicalRoute: (route: ClinicalRoute) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCityArea: string;
  setSelectedCityArea: (area: string) => void;
  currentAreaFeePKR: number;
  currentAreaTime: string;

  cart: CartItem[];
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  addToCart: (product: ProductItem, quantity?: number, rxSlipUploaded?: boolean, rxFileName?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  attachRxToItem: (productId: string, fileName: string) => void;
  removeRxFromItem: (productId: string) => void;
  clearCart: () => void;

  cartSubtotalPKR: number;
  deliveryFeePKR: number;
  cartTotalPKR: number;
  cartCount: number;
  hasUnfulfilledRxInCart: boolean;
  canCheckout: boolean;

  patientPhone: string | null;
  setPatientPhone: (phone: string | null) => void;

  prescriptions: PrescriptionSubmission[];
  submitPrescription: (data: Partial<PrescriptionSubmission>) => void;
  updatePrescriptionStatus: (id: string, status: PrescriptionSubmission['status']) => void;

  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const t = TRANSLATIONS[language];

  const [portalMode, setPortalMode] = useState<'consumer' | 'clinical'>('consumer');
  const [consumerRoute, setConsumerRoute] = useState<ConsumerRoute>('home');
  const [clinicalRoute, setClinicalRoute] = useState<ClinicalRoute>('rx-verification');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCityArea, setSelectedCityArea] = useState<string>(DEMO_CONFIG.deliveryAreas[0].name);
  const [patientPhone, setPatientPhone] = useState<string | null>('0300-4821940');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const areaConfig = DEMO_CONFIG.deliveryAreas.find(a => a.name === selectedCityArea) || DEMO_CONFIG.deliveryAreas[0];
  const currentAreaFeePKR = areaConfig.feePKR;
  const currentAreaTime = areaConfig.estimatedTime;

  const [cart, setCart] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[2], // Panadol Extra
      quantity: 1
    }
  ]);

  const [prescriptions, setPrescriptions] = useState<PrescriptionSubmission[]>(INITIAL_PRESCRIPTIONS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const addToCart = (product: ProductItem, quantity = 1, rxSlipUploaded = false, rxFileName?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { 
                ...item, 
                quantity: item.quantity + quantity, 
                rxSlipUploaded: rxSlipUploaded || item.rxSlipUploaded,
                rxFileName: rxFileName || item.rxFileName
              }
            : item
        );
      }
      return [...prev, { product, quantity, rxSlipUploaded, rxFileName }];
    });
    setCartDrawerOpen(true); // Automatically open the drawer full height from side on add
    showToast(`Added ${product.name} to cart.`);
  };

  const attachRxToItem = (productId: string, fileName: string) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, rxSlipUploaded: true, rxFileName: fileName } : item
      )
    );
    showToast(`Prescription attached for ${fileName}`);
  };

  const removeRxFromItem = (productId: string) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, rxSlipUploaded: false, rxFileName: undefined } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart.');
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartSubtotalPKR = cart.reduce((acc, item) => acc + item.product.pricePKR * item.quantity, 0);
  const deliveryFeePKR = cartSubtotalPKR >= DEMO_CONFIG.freeDeliveryThresholdPKR || cartSubtotalPKR === 0 ? 0 : currentAreaFeePKR;
  const cartTotalPKR = cartSubtotalPKR + deliveryFeePKR;
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const hasUnfulfilledRxInCart = cart.some(item => item.product.rxRequired && !item.rxSlipUploaded);
  const canCheckout = cart.length > 0 && !hasUnfulfilledRxInCart;

  const submitPrescription = (data: Partial<PrescriptionSubmission>) => {
    const newRx: PrescriptionSubmission = {
      id: `RX-PK-${Math.floor(100 + Math.random() * 900)}`,
      patientName: data.patientName || 'Customer',
      patientPhone: data.patientPhone || patientPhone || '0300-0000000',
      cityArea: data.cityArea || selectedCityArea,
      doctorName: data.doctorName || 'Attending Physician',
      doctorPmdc: data.doctorPmdc || 'Doctor PMDC No. Pending Verification',
      medicationName: data.medicationName || 'Prescription Order',
      dosage: data.dosage || 'As prescribed by physician',
      status: 'pending_review',
      timestamp: 'Just now',
      paymentMode: data.paymentMode || 'cod',
      totalPKR: data.totalPKR || cartTotalPKR,
      prescriptionImageUrl: data.prescriptionImageUrl,
      notes: data.notes
    };
    setPrescriptions(prev => [newRx, ...prev]);
    showToast(`Prescription submitted to Majeed Dispensary!`);
  };

  const updatePrescriptionStatus = (id: string, status: PrescriptionSubmission['status']) => {
    setPrescriptions(prev =>
      prev.map(rx => (rx.id === id ? { ...rx, status } : rx))
    );
    showToast(`Prescription ${id} updated to ${status.toUpperCase().replace('_', ' ')}`);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        portalMode,
        setPortalMode,
        consumerRoute,
        setConsumerRoute,
        clinicalRoute,
        setClinicalRoute,
        searchQuery,
        setSearchQuery,
        selectedCityArea,
        setSelectedCityArea,
        currentAreaFeePKR,
        currentAreaTime,
        cart,
        cartDrawerOpen,
        setCartDrawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        attachRxToItem,
        removeRxFromItem,
        clearCart,
        cartSubtotalPKR,
        deliveryFeePKR,
        cartTotalPKR,
        cartCount,
        hasUnfulfilledRxInCart,
        canCheckout,
        patientPhone,
        setPatientPhone,
        prescriptions,
        submitPrescription,
        updatePrescriptionStatus,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

export type PortalMode = 'consumer' | 'clinical';
export type Language = 'en' | 'ur';

export type ConsumerRoute = 
  | 'home'
  | 'shop-medicines'
  | 'prescription-refill'
  | 'consult-pharmacist'
  | 'cart'
  | 'checkout';

export type ClinicalRoute = 
  | 'rx-verification'
  | 'stock-ledger'
  | 'rider-dispatch'
  | 'controlled-register';

export interface ProductItem {
  id: string;
  name: string;
  genericName: string;
  category: 'prescription' | 'otc';
  dosage: string;
  pricePKR: number;
  originalPricePKR?: number;
  rxRequired: boolean;
  stock: number;
  badge?: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  description: string;
  batchNumber: string;
  expiryDate: string;
  daysUntilExpiry: number; // For 90 days near expiry filtering
  substitutes?: {
    name: string;
    company: string;
    pricePKR: number;
    savingsPKR: number;
  }[];
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
  rxSlipUploaded?: boolean;
  rxFileName?: string;
}

export interface PrescriptionSubmission {
  id: string;
  patientName: string;
  patientPhone: string;
  cityArea: string;
  doctorName?: string;
  doctorPmdc?: string;
  medicationName: string;
  dosage?: string;
  status: 'pending_review' | 'verified' | 'in_dispensing' | 'dispatched' | 'completed';
  timestamp: string;
  paymentMode: 'cod' | 'jazzcash' | 'easypaisa' | 'card' | 'bank';
  totalPKR: number;
  prescriptionImageUrl?: string;
  notes?: string;
}

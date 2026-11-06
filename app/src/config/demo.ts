export interface DeliveryAreaConfig {
  name: string;
  feePKR: number;
  estimatedTime: string;
}

export const DEMO_CONFIG = {
  pharmacyName: 'Majeed Pharmacy',
  pharmacyTaglineEn: 'Genuine Medicines & Home Delivery',
  pharmacyTaglineUr: 'مستند ادویات و مفت ہوم ڈیلیوری',
  drugSaleLicenseNo: 'LHR-49102-D (Punjab Health Dept)',
  pcpRegNo: 'PCP-884920 (Pharmacy Council of Pakistan)',
  whatsappNumber: '923001234567',
  whatsappDisplay: '+92 300 1234567',
  currency: 'Rs.',
  freeDeliveryThresholdPKR: 2000,
  nearExpiryThresholdDays: 90,
  defaultDeliveryFeePKR: 150,

  deliveryAreas: [
    { name: 'Gulberg (Phase 1-3), Lahore', feePKR: 100, estimatedTime: '45-60 mins' },
    { name: 'DHA (Phase 1-6), Lahore', feePKR: 150, estimatedTime: '1-2 hours' },
    { name: 'Model Town, Lahore', feePKR: 120, estimatedTime: '45-60 mins' },
    { name: 'Johar Town / Faisal Town, Lahore', feePKR: 180, estimatedTime: '1-2 hours' },
    { name: 'Cantt / Saddar, Lahore', feePKR: 140, estimatedTime: '1 hour' }
  ] as DeliveryAreaConfig[],

  // Phase 2 feature toggles (disabled)
  flags: {
    enablePatientAccountsPhase2: true, // mock OTP login
    enableFullAuditLogsPhase2: false,
    enablePrescriberRegistryPhase2: false,
    enableDetailedSalesReportsPhase2: false
  }
};

export const formatPKR = (amount: number): string => {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
};

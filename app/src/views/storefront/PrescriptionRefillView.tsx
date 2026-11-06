import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { Badge } from '../../components/atoms/Badge';
import { WhatsAppButton } from '../../components/atoms/WhatsAppButton';
import { DEMO_CONFIG } from '../../config/demo';

export const PrescriptionRefillView: React.FC = () => {
  const { submitPrescription, setConsumerRoute, selectedCityArea, setSelectedCityArea, language, t } = useApp();
  const isUrdu = language === 'ur';

  const [patientName, setPatientName] = useState('Ali Raza');
  const [patientPhone, setPatientPhone] = useState('0300-1234567');
  const [doctorName, setDoctorName] = useState('');
  const [medicationNotes, setMedicationNotes] = useState('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file.name);
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setFilePreview(url);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      submitPrescription({
        patientName,
        patientPhone,
        cityArea: selectedCityArea,
        doctorName: doctorName || 'Attending Physician',
        doctorPmdc: 'Doctor PMDC No. Verified',
        medicationName: uploadedFile ? `Prescription Slip (${uploadedFile})` : 'Prescription Order',
        dosage: medicationNotes || 'As prescribed by physician',
        prescriptionImageUrl: filePreview || undefined,
        notes: `Patient Phone: ${patientPhone}. Area: ${selectedCityArea}. Prescription slip attached.`
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-10 space-y-8" dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center items-center gap-2">
          <Badge variant="primary" dot size="md">
            {isUrdu ? 'فارماسسٹ سے براہ راست تصدیق' : 'Direct Qualified Pharmacist Review'}
          </Badge>
          <span className="text-[10px] bg-[#eaedff] text-[#005c55] font-mono px-2 py-0.5 rounded-full border border-[#dae2fd]">
            Demo data
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#131b2e] tracking-tight">
          {isUrdu ? 'ڈاکٹر کے نسخے کی تصویر اپ لوڈ کریں' : "Upload Your Doctor's Prescription Slip"}
        </h1>
        <p className="text-sm text-[#3e4947] max-w-xl mx-auto">
          {isUrdu
            ? 'نسخے کی واضح تصویر بھیجیں۔ ہمارا کوالیفائیڈ فارماسسٹ دوا اور خوراک چیک کر کے آپ کو قیمت اور ترسیل کا وقت بتائے گا۔'
            : `Snap a clear photo of your prescription. Our Pharmacist (${DEMO_CONFIG.pcpRegNo}) will verify the medications and confirm your delivery.`}
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl border border-[#dae2fd] p-8 text-center space-y-5 shadow-sm animate-scaleUp">
          <div className="w-16 h-16 rounded-full bg-[#9cf2e8]/40 text-[#005c55] flex items-center justify-center mx-auto shadow-inner">
            <span className="material-symbols-outlined text-[36px]">verified</span>
          </div>
          <h2 className="text-2xl font-bold text-[#131b2e]">
            {isUrdu ? 'نسخہ موصول ہو گیا ہے!' : 'Prescription Received at Dispensary!'}
          </h2>
          <p className="text-sm text-[#3e4947] max-w-md mx-auto">
            {isUrdu
              ? 'ہمارا فارماسسٹ جلد آپ سے فون یا واٹس ایپ پر رابطہ کرے گا۔'
              : 'Our on-duty pharmacist is reviewing your prescription and will contact you via WhatsApp / Call for confirmation.'}
          </p>

          <div className="p-4 bg-[#faf8ff] rounded-2xl border border-[#dae2fd] max-w-md mx-auto text-left text-xs space-y-2 text-[#131b2e]">
            {filePreview && (
              <div className="mb-2 rounded-xl overflow-hidden border border-[#bdc9c6] bg-white max-h-36 flex items-center justify-center">
                <img src={filePreview} alt="Prescription Thumbnail" className="max-h-36 object-contain" />
              </div>
            )}
            <p><span className="text-[#6e7977]">{t.patientId}:</span> Ali Raza (#PK-8849)</p>
            <p><span className="text-[#6e7977]">Phone:</span> {patientPhone}</p>
            <p><span className="text-[#6e7977]">Area:</span> {selectedCityArea}</p>
            <p><span className="text-[#6e7977]">Verification:</span> <span className="text-amber-800 font-bold">Checking with Doctor PMDC No.</span></p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              variant="primary"
              icon="storefront"
              onClick={() => {
                setSubmitted(false);
                setConsumerRoute('home');
              }}
            >
              {isUrdu ? 'واپس مرکزی صفحہ' : 'Return to Home'}
            </Button>
            <WhatsAppButton
              message={`Salam, I uploaded prescription slip for Ali Raza (${patientPhone}). Please review!`}
              label="Check Status on WhatsApp"
            />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#dae2fd] p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Interactive File Drag and Drop with Live Preview */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#131b2e] uppercase tracking-wider">
                {isUrdu ? 'نسخہ کی تصویر یا پی ڈی ایف (JPG, PNG, PDF) *' : 'Prescription Photo or Slip (JPG, PNG, PDF) *'}
              </label>
              <div className="group border-2 border-dashed border-[#bdc9c6] hover:border-[#005c55] rounded-2xl p-6 text-center bg-[#faf8ff] hover:bg-[#eaedff]/40 transition-all duration-200 cursor-pointer relative overflow-hidden">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  required
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                {filePreview ? (
                  <div className="space-y-2">
                    <div className="max-h-40 mx-auto rounded-xl overflow-hidden border border-[#bdc9c6] bg-white inline-block shadow-xs">
                      <img src={filePreview} alt="Preview" className="max-h-40 object-contain" />
                    </div>
                    <p className="text-xs font-bold text-[#005c55] flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      {uploadedFile} (Click to change)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <span className="material-symbols-outlined text-[44px] text-[#005c55] group-hover:scale-110 transition-transform duration-200">
                      add_a_photo
                    </span>
                    <p className="text-sm font-semibold text-[#131b2e]">
                      {uploadedFile ? `Attached: ${uploadedFile}` : (isUrdu ? 'تصویر منتخب کرنے کے لیے یہاں کلک کریں' : 'Click or tap to snap / upload doctor prescription slip')}
                    </p>
                    <p className="text-xs text-[#6e7977]">
                      {isUrdu ? 'براہ کرم یقینی بنائیں کہ ڈاکٹر کا نام اور ادویات واضح ہوں' : 'Make sure doctor name, PMDC number, and medicine names are clearly readable.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* City Area Selector */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#131b2e]">
                {t.selectArea}
              </label>
              <select
                value={selectedCityArea}
                onChange={e => setSelectedCityArea(e.target.value)}
                className="w-full text-xs rounded-xl border border-[#bdc9c6] p-2.5 bg-white text-[#131b2e] focus:ring-2 focus:ring-[#005c55] focus:outline-none transition-shadow"
              >
                {DEMO_CONFIG.deliveryAreas.map(area => (
                  <option key={area.name} value={area.name}>{area.name}</option>
                ))}
              </select>
            </div>

            {/* Patient & Doctor details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={isUrdu ? 'مریض کا پورا نام' : 'Patient Full Name'}
                value={patientName}
                onChange={e => setPatientName(e.target.value)}
                required
              />
              <Input
                label={isUrdu ? 'فون نمبر (برائے تصدیق و ترسیل)' : 'Contact Phone Number (For Confirmation)'}
                value={patientPhone}
                onChange={e => setPatientPhone(e.target.value)}
                placeholder="0300-1234567"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={isUrdu ? 'ڈاکٹر یا کلینک کا نام (اختیاری)' : 'Doctor / Hospital Name (Optional)'}
                placeholder="e.g. Dr. Tariq, Services Hospital"
                value={doctorName}
                onChange={e => setDoctorName(e.target.value)}
              />
              <Input
                label={isUrdu ? 'ادویات یا خصوصی ہدایات' : 'Medicine Notes or Generic Preference'}
                placeholder="e.g. 1 month supply, please suggest generic if costly"
                value={medicationNotes}
                onChange={e => setMedicationNotes(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon="send"
              isLoading={isSubmitting}
              className="w-full py-3"
            >
              {isUrdu ? 'فارمیسی کو نسخہ بھیجیں' : 'Send Prescription to Pharmacist'}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

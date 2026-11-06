import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/atoms/Badge';
import { Button } from '../../components/atoms/Button';
import { DEMO_CONFIG } from '../../config/demo';

export const RxVerificationQueueView: React.FC = () => {
  const { prescriptions, updatePrescriptionStatus } = useApp();
  const [selectedRxId, setSelectedRxId] = useState<string>(prescriptions[0]?.id || '');
  const [filter, setFilter] = useState<'all' | 'pending'>('pending');

  const selectedRx = prescriptions.find(p => p.id === selectedRxId) || prescriptions[0];

  const filteredList = prescriptions.filter(p => {
    if (filter === 'pending') return p.status === 'pending_review';
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Top Clinical Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dae2fd] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#131b2e]">Dispensary Rx Verification Queue</h1>
            <Badge variant="outline" size="sm">Demo data</Badge>
          </div>
          <p className="text-xs text-[#3e4947] mt-0.5">
            Prescription verification, patient confirmation, and rider handoff • Registered with {DEMO_CONFIG.pcpRegNo}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['pending', 'all'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === f
                  ? 'bg-[#005c55] text-white shadow-xs'
                  : 'bg-white border border-[#bdc9c6] text-[#3e4947] hover:bg-[#eaedff]'
              }`}
            >
              {f === 'pending' ? 'Pending Triage' : `All Records (${prescriptions.length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Queue List */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#3e4947] px-1">
            Prescriptions ({filteredList.length})
          </h3>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredList.map(rx => {
              const isSelected = rx.id === selectedRx?.id;
              return (
                <div
                  key={rx.id}
                  onClick={() => setSelectedRxId(rx.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#005c55] bg-[#eaedff]/70 shadow-xs ring-1 ring-[#005c55]'
                      : 'border-[#dae2fd] bg-[#faf8ff] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-[#131b2e]">{rx.patientName}</span>
                    <span className="text-[10px] font-mono text-[#6e7977]">{rx.timestamp}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#005c55] truncate">{rx.medicationName}</p>
                  <p className="text-[11px] text-[#6e7977]">{rx.cityArea} • Phone: {rx.patientPhone}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#dae2fd]/60">
                    <span className="text-[10px] font-mono font-bold text-[#131b2e]">Rs. {rx.totalPKR} ({rx.paymentMode.toUpperCase()})</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rx.status === 'pending_review'
                          ? 'bg-amber-100 text-amber-800'
                          : rx.status === 'in_dispensing'
                          ? 'bg-[#9cf2e8]/40 text-[#005c55]'
                          : 'bg-[#6ffbbe]/40 text-[#006c49]'
                      }`}
                    >
                      {rx.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Pharmacist Verification Station */}
        {selectedRx && (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#dae2fd] p-6 shadow-sm space-y-6">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-[#f2f3ff] pb-4">
              <div>
                <span className="text-[11px] font-mono text-[#006c49] font-bold block">
                  Reference: {selectedRx.id}
                </span>
                <h2 className="text-xl font-bold text-[#131b2e]">{selectedRx.patientName}</h2>
                <p className="text-xs text-[#6e7977]">Phone: {selectedRx.patientPhone} • Area: {selectedRx.cityArea}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-[#6e7977] block">Triage Status</span>
                <Badge variant={selectedRx.status === 'pending_review' ? 'warning' : 'primary'} dot size="md">
                  {selectedRx.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Uploaded Rx Slip Image View */}
            {selectedRx.prescriptionImageUrl && (
              <div className="border border-[#dae2fd] rounded-xl p-3 bg-[#faf8ff] space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#131b2e]">
                  <span>Uploaded Doctor's Prescription Slip:</span>
                  <a href={selectedRx.prescriptionImageUrl} target="_blank" rel="noreferrer" className="text-[#005c55] hover:underline text-[11px]">
                    Open Full Image ↗
                  </a>
                </div>
                <img
                  src={selectedRx.prescriptionImageUrl}
                  alt="Doctor Prescription Slip"
                  className="max-h-48 w-full object-contain bg-white rounded-lg border border-[#bdc9c6]"
                />
              </div>
            )}

            {/* Doctor PMDC & Med Specs */}
            <div className="grid grid-cols-2 gap-4 bg-[#faf8ff] p-4 rounded-xl border border-[#dae2fd]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#6e7977] block">Prescribing Doctor</span>
                <span className="text-xs font-bold text-[#131b2e]">{selectedRx.doctorName}</span>
                <span className="text-[11px] text-[#006c49] font-mono block">Doctor PMDC No: {selectedRx.doctorPmdc}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#6e7977] block">Payment / Order Total</span>
                <span className="text-sm font-bold text-[#005c55]">Rs. {selectedRx.totalPKR}</span>
                <span className="text-[11px] text-[#6e7977] block">{selectedRx.paymentMode.toUpperCase()}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] uppercase font-bold text-[#6e7977] block">Prescribed Medicines &amp; Notes</span>
                <span className="text-xs text-[#3e4947]">{selectedRx.medicationName} — {selectedRx.notes || 'No special notes.'}</span>
              </div>
            </div>

            {/* Verification Criteria */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#131b2e]">
                Pharmacist Verification Checklist
              </h4>
              <div className="space-y-1.5 text-xs text-[#3e4947]">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#f2f3ff]">
                  <span className="material-symbols-outlined text-[18px] text-[#006c49]">check_circle</span>
                  <span>Doctor PMDC No. &amp; Signature: <strong>Legitimate &amp; Valid</strong></span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#f2f3ff]">
                  <span className="material-symbols-outlined text-[18px] text-[#006c49]">check_circle</span>
                  <span>Patient Contact &amp; Delivery Address: <strong>Confirmed in {selectedRx.cityArea}</strong></span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#f2f3ff]">
                  <span className="material-symbols-outlined text-[18px] text-[#006c49]">check_circle</span>
                  <span>pharmacy stock system Verification: <strong>Fresh DRAP stock allocated</strong></span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#f2f3ff]">
              <Button
                variant="primary"
                icon="verified"
                onClick={() => updatePrescriptionStatus(selectedRx.id, 'in_dispensing')}
                disabled={selectedRx.status === 'in_dispensing' || selectedRx.status === 'dispatched'}
              >
                Approve &amp; Pack Order
              </Button>
              <Button
                variant="secondary"
                icon="two_wheeler"
                onClick={() => updatePrescriptionStatus(selectedRx.id, 'dispatched')}
                disabled={selectedRx.status === 'dispatched'}
              >
                Assign to Pharmacy Bike Rider
              </Button>
              <Button
                variant="outline"
                icon="task_alt"
                onClick={() => updatePrescriptionStatus(selectedRx.id, 'completed')}
              >
                Mark Delivered (Cash Collected)
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp, INITIAL_PRODUCTS } from '../../context/AppContext';
import { Badge } from '../../components/atoms/Badge';
import { Button } from '../../components/atoms/Button';
import { DEMO_CONFIG } from '../../config/demo';

export const ClinicalOperationsView: React.FC = () => {
  const { clinicalRoute } = useApp();
  const [activeTab, setActiveTab] = useState<'stock' | 'riders' | 'controlled'>('stock');
  const [filterNearExpiryOnly, setFilterNearExpiryOnly] = useState(false);

  const currentTab = 
    clinicalRoute === 'stock-ledger' ? 'stock' :
    clinicalRoute === 'rider-dispatch' ? 'riders' :
    clinicalRoute === 'controlled-register' ? 'controlled' : activeTab;

  const filteredMedicines = INITIAL_PRODUCTS.filter(item => {
    if (filterNearExpiryOnly) {
      return item.daysUntilExpiry <= DEMO_CONFIG.nearExpiryThresholdDays;
    }
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dae2fd] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#131b2e]">
              {currentTab === 'stock' && 'Dispensary Stock & Expiry Ledger'}
              {currentTab === 'riders' && 'Delivery Rider Fleet & Transit Status'}
              {currentTab === 'controlled' && 'Controlled Drugs Register (Form 7)'}
            </h1>
            <Badge variant="outline" size="sm">Demo data</Badge>
          </div>
          <p className="text-xs text-[#3e4947] mt-0.5">
            Majeed Pharmacy Central Dispensary Operations • Registered with {DEMO_CONFIG.pcpRegNo}
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setActiveTab('stock')}
            className={`px-3 py-1.5 rounded-lg font-semibold ${currentTab === 'stock' ? 'bg-[#005c55] text-white' : 'bg-white border text-[#3e4947]'}`}
          >
            Stock &amp; Expiry
          </button>
          <button
            onClick={() => setActiveTab('riders')}
            className={`px-3 py-1.5 rounded-lg font-semibold ${currentTab === 'riders' ? 'bg-[#005c55] text-white' : 'bg-white border text-[#3e4947]'}`}
          >
            Rider Fleet
          </button>
          <button
            onClick={() => setActiveTab('controlled')}
            className={`px-3 py-1.5 rounded-lg font-semibold ${currentTab === 'controlled' ? 'bg-[#005c55] text-white' : 'bg-white border text-[#3e4947]'}`}
          >
            Controlled Register
          </button>
        </div>
      </div>

      {/* Task 8: Stock Ledger with exact required columns and near-expiry filter */}
      {currentTab === 'stock' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#dae2fd] shadow-2xs">
            <div>
              <span className="text-xs font-bold text-[#131b2e]">Pharmacy Stock Ledger</span>
              <p className="text-[11px] text-[#6e7977]">Real-time pharmaceutical batch and expiry monitoring</p>
            </div>

            {/* Filter: Near expiry only */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterNearExpiryOnly(!filterNearExpiryOnly)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  filterNearExpiryOnly
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-[#eaedff] text-[#3e4947] hover:bg-[#dae2fd]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">hourglass_bottom</span>
                <span>Near Expiry Filter (&lt;90 days)</span>
                {filterNearExpiryOnly && <span className="bg-white/20 px-1.5 py-0.2 rounded text-[10px]">Active</span>}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#faf8ff] text-[#3e4947] font-bold uppercase text-[10px] border-b border-[#dae2fd]">
                  <tr>
                    <th className="py-2.5 px-3">Item Name</th>
                    <th className="py-2.5 px-3">Batch No.</th>
                    <th className="py-2.5 px-3">Expiry Date</th>
                    <th className="py-2.5 px-3">In-Stock Qty</th>
                    <th className="py-2.5 px-3">Re-order Alert</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f2f3ff]">
                  {filteredMedicines.map(med => {
                    const isNearExpiry = med.daysUntilExpiry <= DEMO_CONFIG.nearExpiryThresholdDays;
                    const isLowStock = med.stock <= 60;
                    return (
                      <tr key={med.id}>
                        <td className="py-3 px-3">
                          <span className="font-bold text-[#131b2e] block">{med.name}</span>
                          <span className="text-[10px] text-[#6e7977]">{med.genericName}</span>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-[#005c55]">{med.batchNumber}</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-[#131b2e]">{med.expiryDate}</span>
                            {isNearExpiry && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                Near Expiry ({med.daysUntilExpiry}d)
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3 font-bold font-mono">
                          {med.stock} Packs
                        </td>
                        <td className="py-3 px-3">
                          {isLowStock ? (
                            <Badge variant="warning" size="sm" dot>Re-order Alert (Stock &lt; 60)</Badge>
                          ) : (
                            <Badge variant="secondary" size="sm">Adequate Stock</Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Rider Dispatch */}
      {currentTab === 'riders' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-[#dae2fd] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#006c49]">Rider Kamran (Active)</span>
                <Badge variant="secondary" size="sm">On Route</Badge>
              </div>
              <p className="text-sm font-bold text-[#131b2e]">Bike: Honda CD70 (#LEG-4820)</p>
              <p className="text-xs text-[#6e7977]">Assigned Area: Gulberg (Phase 1-3)</p>
              <div className="bg-[#faf8ff] p-2.5 rounded border border-[#f2f3ff] text-xs">
                <span className="text-[#6e7977] block text-[10px]">Delivering Order:</span>
                <span className="font-bold text-[#005c55]">ORD-PK-49102 (Rs. 1,110 COD)</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#dae2fd] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#006c49]">Rider Zeeshan (Active)</span>
                <Badge variant="secondary" size="sm">On Route</Badge>
              </div>
              <p className="text-sm font-bold text-[#131b2e]">Bike: Honda 125 (#LEK-9912)</p>
              <p className="text-xs text-[#6e7977]">Assigned Area: DHA (Phase 1-6)</p>
              <div className="bg-[#faf8ff] p-2.5 rounded border border-[#f2f3ff] text-xs">
                <span className="text-[#6e7977] block text-[10px]">Delivering Order:</span>
                <span className="font-bold text-[#005c55]">Prescription Dispatch (Rs. 860)</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#dae2fd] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#6e7977]">Rider Bilal (At Hub)</span>
                <Badge variant="neutral" size="sm">Standby</Badge>
              </div>
              <p className="text-sm font-bold text-[#131b2e]">Bike: Yamaha YBR (#LEM-1049)</p>
              <p className="text-xs text-[#6e7977]">Stationed at Central Dispensary</p>
              <div className="pt-2">
                <Button size="sm" variant="secondary" icon="two_wheeler" className="w-full">
                  Assign Next Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Controlled Drugs Register */}
      {currentTab === 'controlled' && (
        <div className="bg-white rounded-2xl border border-[#dae2fd] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#f2f3ff] pb-3">
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">Prescription Controlled Drugs Register (DRAP Rule / Form 7)</h3>
              <p className="text-xs text-[#6e7977]">Maintained under supervision of Pharmacist {DEMO_CONFIG.pcpRegNo}</p>
            </div>
            <Badge variant="secondary" size="sm">Verified</Badge>
          </div>

          <div className="p-4 bg-[#f2f3ff] rounded-xl text-xs space-y-2 font-mono">
            <p><span className="text-[#6e7977]">Drug Sale License No:</span> {DEMO_CONFIG.drugSaleLicenseNo}</p>
            <p><span className="text-[#6e7977]">Supervising Pharmacist:</span> Dr. Sarah Al-Majeed (PCP Reg #99214)</p>
            <p><span className="text-[#6e7977]">Status:</span> All dispensed prescription records verified with doctor PMDC slips</p>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import type { ClinicalRoute } from '../../types';

export const ClinicalSidebar: React.FC = () => {
  const { clinicalRoute, setClinicalRoute, setPortalMode, prescriptions } = useApp();

  const pendingCount = prescriptions.filter(p => p.status === 'pending_review').length;

  const navItems: { id: ClinicalRoute; label: string; icon: string; count?: number }[] = [
    { id: 'rx-verification', label: 'Rx Verification Queue', icon: 'fact_check', count: pendingCount },
    { id: 'stock-ledger', label: 'Dispensary Stock Ledger', icon: 'inventory_2' }
  ];

  return (
    <aside className="w-64 bg-[#131b2e] text-[#faf8ff] flex flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto border-r border-[#283044]">
      <div>
        {/* Hub Header */}
        <div className="p-4 border-b border-[#283044]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#0f766e] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[22px]">local_pharmacy</span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white leading-tight">
                Majeed Rx Clinical Portal
              </h1>
              <span className="text-[11px] text-[#6cf8bb]">
                Staff Dispensary Workspace
              </span>
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <div className="p-3 space-y-1">
          <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#bdc9c6]">
            Active Operations
          </p>
          {navItems.map(item => {
            const active = clinicalRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setClinicalRoute(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#0f766e] text-white shadow'
                    : 'text-[#eef0ff]/80 hover:text-white hover:bg-[#283044]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[20px] ${active ? 'text-[#a3faef]' : 'text-[#bdc9c6]'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className="bg-[#ba1a1a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Switch to Consumer Storefront Bottom Action */}
      <div className="p-4 border-t border-[#283044] space-y-3 bg-[#131b2e]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#0f766e] text-white flex items-center justify-center font-bold text-xs">
            SA
          </div>
          <div>
            <p className="text-xs font-bold text-white leading-tight">Dr. Sarah Al-Majeed</p>
            <p className="text-[10px] text-[#bdc9c6]">Licensed Pharmacist</p>
          </div>
        </div>

        <button
          onClick={() => setPortalMode('consumer')}
          className="w-full bg-[#faf8ff] text-[#131b2e] hover:bg-white px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px] text-[#005c55]">storefront</span>
          Return to Customer Storefront
        </button>
      </div>
    </aside>
  );
};

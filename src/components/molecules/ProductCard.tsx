import React, { useState } from 'react';
import type { ProductItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { ProductDetailModal } from './ProductDetailModal';
import { formatPKR } from '../../config/demo';

export const ProductCard: React.FC<{ product: ProductItem }> = ({ product }) => {
  const { addToCart, t } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="group relative flex flex-col justify-between rounded-2xl border border-[#dae2fd] bg-white p-4 shadow-2xs hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#005c55]/40">
        <div>
          {/* Top Badges */}
          <div className="flex items-center justify-between gap-2 mb-2">
            {product.rxRequired ? (
              <Badge variant="warning" size="sm" dot>{t.rxRequired}</Badge>
            ) : (
              <Badge variant="secondary" size="sm">OTC</Badge>
            )}
            
            {product.daysUntilExpiry <= 90 && (
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                Near Expiry ({product.daysUntilExpiry}d)
              </span>
            )}

            {product.badge && product.daysUntilExpiry > 90 && (
              <span className="text-[11px] font-semibold text-[#005c55] bg-[#9cf2e8]/30 px-2 py-0.5 rounded-full">
                {product.badge}
              </span>
            )}
          </div>

          {/* Image preview with smooth zoom */}
          <div 
            onClick={() => setModalOpen(true)}
            className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#f2f3ff] mb-3 flex items-center justify-center p-2 cursor-pointer border border-[#dae2fd]/60"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover rounded-lg group-hover:scale-108 transition-transform duration-500 ease-out"
              loading="lazy"
            />
            <div className="absolute top-2 left-2 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur shadow-xs">
              <span className="material-symbols-outlined text-[12px] text-amber-300">verified</span>
              <span>Exp: {product.expiryDate}</span>
            </div>
            <div className="absolute inset-0 bg-[#005c55]/0 group-hover:bg-[#005c55]/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="bg-white/95 text-[#005c55] text-xs font-bold px-3 py-1 rounded-full shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-200 backdrop-blur">
                Quick View
              </span>
            </div>
          </div>

          {/* Title & info */}
          <h3 
            onClick={() => setModalOpen(true)}
            className="font-bold text-base text-[#131b2e] leading-snug group-hover:text-[#005c55] transition-colors duration-200 line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>
          <p className="text-xs text-[#006c49] font-medium mb-1 line-clamp-1">
            {product.genericName}
          </p>
          <p className="text-xs text-[#6e7977] font-mono mb-2">
            {product.dosage} • Batch: {product.batchNumber}
          </p>

          {/* Generic alternative notice if available */}
          {product.substitutes && (
            <div className="mb-2.5 bg-emerald-50 px-2.5 py-1.5 rounded-xl text-[11px] text-emerald-900 border border-emerald-100 flex items-center gap-1.5 font-medium transition-colors hover:bg-emerald-100/60">
              <span className="material-symbols-outlined text-[15px] text-emerald-700">swap_horiz</span>
              <span>Generic available (Save {formatPKR(product.substitutes[0].savingsPKR)})</span>
            </div>
          )}
        </div>

        {/* Pricing and Action */}
        <div className="border-t border-[#f2f3ff] pt-3 flex items-center justify-between mt-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-[#131b2e]">{formatPKR(product.pricePKR)}</span>
              {product.originalPricePKR && (
                <span className="text-xs text-[#6e7977] line-through">{formatPKR(product.originalPricePKR)}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-[#006c49]">Stock: {product.stock} units</span>
              <span className="text-[9px] text-[#6e7977] bg-[#eaedff] px-1 py-0.2 rounded font-mono">Demo data</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {product.rxRequired ? (
              <Button
                size="sm"
                variant="outline"
                icon="upload_file"
                onClick={() => setModalOpen(true)}
              >
                Upload Slip
              </Button>
            ) : (
              <Button
                size="sm"
                variant="primary"
                icon="add_shopping_cart"
                onClick={() => addToCart(product, 1)}
              >
                Add
              </Button>
            )}
          </div>
        </div>
      </div>

      {modalOpen && (
        <ProductDetailModal
          product={product}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

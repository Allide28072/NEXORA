/**
 * NEXORA Digital Marketplace & License Key Delivery
 * Digital assets catalog, checkout simulator, and digital license keys generator.
 */

import React, { useState } from 'react';
import { Database } from '../../lib/database';
import { useApp } from '../../context/AppContext';
import { MarketplaceProduct } from '../../types';
import {
  ShoppingBag,
  Star,
  Download,
  KeyRound,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  X
} from 'lucide-react';

export const MarketplaceViewer: React.FC = () => {
  const { showToast } = useApp();
  const [products] = useState<MarketplaceProduct[]>(() => Database.getMarketplaceProducts());
  const [purchasedItems, setPurchasedItems] = useState<{ id: string; product: MarketplaceProduct; licenseKey: string }[]>([]);
  const [activeReceipt, setActiveReceipt] = useState<{ product: MarketplaceProduct; licenseKey: string } | null>(null);

  const handlePurchase = (product: MarketplaceProduct) => {
    const licenseKey = `NEX-LIC-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const purchase = { id: `pur_${Date.now()}`, product, licenseKey };
    setPurchasedItems((prev) => [purchase, ...prev]);
    setActiveReceipt(purchase);
    Database.addAuditLog('PURCHASE_PRODUCT', 'Marketplace', `Purchased "${product.title}" ($${product.price})`, 'info');
    showToast(`Order confirmed for ${product.title}`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">
            Digital Marketplace & Engineering Assets
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Production-grade cloud blueprints, UI component kits, and automated workflow scripts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
            <span className="text-slate-500">Purchased Items:</span>{' '}
            <span className="text-indigo-400 font-bold tabular-nums">{purchasedItems.length}</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors flex flex-col justify-between"
          >
            <div className="p-5 space-y-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
                  {prod.category}
                </span>
                <div className="flex items-center gap-1 font-mono text-[11px] text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="tabular-nums">{prod.rating}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-100 leading-snug">
                {prod.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                {prod.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>By {prod.authorName}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{prod.downloadsCount} downloads</span>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
              <div className="text-base font-bold text-slate-100 font-mono tabular-nums">
                ${prod.price.toFixed(2)}
              </div>

              <button
                onClick={() => handlePurchase(prod)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Acquire License</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* License Modal */}
      {activeReceipt && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 text-center animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center mx-auto text-indigo-400">
              <KeyRound className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-100">License Activated</h3>
              <p className="text-xs text-slate-400">
                You now possess full enterprise rights for <strong>{activeReceipt.product.title}</strong>.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left font-mono text-xs space-y-2">
              <span className="text-[10px] uppercase text-slate-500 block">Digital License Key:</span>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-indigo-300 font-bold select-all break-all">
                {activeReceipt.licenseKey}
              </div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1 pt-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified in immutable ledger</span>
              </div>
            </div>

            <button
              onClick={() => setActiveReceipt(null)}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

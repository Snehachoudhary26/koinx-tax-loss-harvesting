import React from 'react';
import { Holding, CalculatedGainsBreakdown } from '../types/tax';
import { formatINR, formatCrypto } from '../utils/formatters';
import { CheckCircle2, X, AlertTriangle, ShieldCheck } from 'lucide-react';

interface HarvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedHoldings: Holding[];
  preGains: CalculatedGainsBreakdown;
  postGains: CalculatedGainsBreakdown;
}

export const HarvestModal: React.FC<HarvestModalProps> = ({
  isOpen,
  onClose,
  selectedHoldings,
  preGains,
  postGains,
}) => {
  if (!isOpen) return null;

  const gainDifference = preGains.realisedGains - postGains.realisedGains;
  const isTaxSaved = gainDifference > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">Tax Loss Harvesting Summary</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          
          {isTaxSaved ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Harvesting Optimization Applied</span>
              </div>
              <p className="text-xs mt-1 text-emerald-700">
                Executing this strategy reduces your taxable capital gains by <strong className="font-black text-emerald-800">{formatINR(gainDifference)}</strong>.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
              <div className="flex items-center gap-2 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Notice: Net Gains Not Decreased</span>
              </div>
              <p className="text-xs mt-1 text-amber-700">
                The selected assets include profitable holdings. To maximize tax savings, prioritize loss-making holdings.
              </p>
            </div>
          )}

          {/* Selected Assets List */}
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Selected Assets to Sell ({selectedHoldings.length})
            </span>
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {selectedHoldings.map((h) => (
                <div key={h.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <img src={h.logo} alt={h.coin} className="w-5 h-5 rounded-full" />
                    <span className="font-bold text-slate-900">{h.coin}</span>
                    <span className="text-slate-500">({formatCrypto(h.totalHoldings)})</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">Net Gain Impact</span>
                    <span className={`font-bold ${(h.stcg.gain + h.ltcg.gain) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {formatINR(h.stcg.gain + h.ltcg.gain, true)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Numerical Comparison */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="p-3 rounded-lg bg-slate-50">
              <span className="text-slate-400 block">Pre-Harvest Gains:</span>
              <span className="font-bold text-slate-900 text-sm">{formatINR(preGains.realisedGains)}</span>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
              <span className="text-blue-600 font-medium block">Post-Harvest Gains:</span>
              <span className="font-bold text-blue-900 text-sm">{formatINR(postGains.realisedGains)}</span>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/60 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              alert("Tax Loss Harvesting simulation confirmed! Ready to export or file.");
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
          >
            Confirm & Save Plan
          </button>
        </div>

      </div>
    </div>
  );
};

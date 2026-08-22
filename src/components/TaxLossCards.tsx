import React, { useState } from 'react';
import { CalculatedGainsBreakdown } from '../types/tax';
import { formatCurrency, Currency } from '../utils/formatters';
import { CheckCircle2, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface TaxLossCardsProps {
  preGains: CalculatedGainsBreakdown;
  postGains: CalculatedGainsBreakdown;
  currency: Currency;
}

export const TaxLossCards: React.FC<TaxLossCardsProps> = ({
  preGains,
  postGains,
  currency,
}) => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const isSaving = preGains.realisedGains > postGains.realisedGains;
  const taxSavings = preGains.realisedGains - postGains.realisedGains;

  return (
    <div className="space-y-4 my-6">
      
      {/* Top Header Title with "How it works?" Tooltip */}
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tax Optimisation
          </h1>
          <div className="relative">
            <button
              onClick={() => setShowHowItWorks(!showHowItWorks)}
              onMouseEnter={() => setShowHowItWorks(true)}
              className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-4 flex items-center gap-1"
            >
              How it works?
            </button>

            {/* "How it works" Tooltip Modal matching demo */}
            {showHowItWorks && (
              <div 
                onMouseLeave={() => setShowHowItWorks(false)}
                className="absolute left-0 top-7 z-50 w-80 sm:w-96 p-4 rounded-xl bg-white text-slate-900 shadow-2xl border border-slate-200 text-xs animate-fadeIn"
              >
                <ul className="space-y-2 text-slate-700 list-disc list-inside">
                  <li>See your capital gains for FY 2024-25 in the left card</li>
                  <li>Check boxes for assets you plan on selling to reduce your tax liability</li>
                  <li>Instantly see your updated tax liability in the right card</li>
                </ul>
                <div className="mt-3 pt-2.5 border-t border-slate-100 text-slate-500 font-medium">
                  <strong>Pro tip:</strong> Experiment with different combinations of your holdings to optimize your tax liability.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Important Notes and Disclaimers Banner */}
      <div className="rounded-xl bg-[#121A2A] border border-blue-900/50 overflow-hidden">
        <button
          onClick={() => setShowDisclaimer(!showDisclaimer)}
          className="w-full px-4 py-2.5 flex items-center justify-between text-left text-xs font-semibold text-blue-200 hover:bg-blue-900/20 transition"
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Important Notes And Disclaimers</span>
          </div>
          {showDisclaimer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showDisclaimer && (
          <div className="px-4 pb-3 pt-1 text-xs text-slate-400 border-t border-blue-900/30 space-y-1">
            <p>• Losses realized from selling assets can be utilized to reduce your taxable capital gains according to local jurisdiction rules.</p>
            <p>• Ensure compliance with wash-sale and FIFO/LIFO rules applicable to your tax jurisdiction.</p>
          </div>
        )}
      </div>

      {/* Side-by-Side Cards (Exact Demo UI) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Left Card: Pre Harvesting (Dark) */}
        <div className="rounded-2xl bg-[#121824] border border-slate-800 p-6 text-white shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Pre Harvesting</h2>

            {/* Table layout matching demo */}
            <div className="grid grid-cols-3 gap-2 text-xs font-medium pb-3 border-b border-slate-800/80 text-slate-400">
              <span></span>
              <span className="text-right">Short-term</span>
              <span className="text-right">Long-term</span>
            </div>

            <div className="space-y-3 py-3 text-xs">
              <div className="grid grid-cols-3 gap-2 items-center text-slate-300">
                <span>Profits</span>
                <span className="text-right font-medium">{formatCurrency(preGains.stcgProfits, currency)}</span>
                <span className="text-right font-medium">{formatCurrency(preGains.ltcgProfits, currency)}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 items-center text-slate-300">
                <span>Losses</span>
                <span className="text-right font-medium">{formatCurrency(preGains.stcgLosses, currency)}</span>
                <span className="text-right font-medium">{formatCurrency(preGains.ltcgLosses, currency)}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 items-center text-slate-200 pt-2 border-t border-slate-800/60 font-semibold">
                <span>Net Capital Gains</span>
                <span className="text-right">{formatCurrency(preGains.netStcg, currency)}</span>
                <span className="text-right">{formatCurrency(preGains.netLtcg, currency)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-200">Realised Capital Gains:</span>
            <span className="text-xl font-extrabold text-white tracking-tight">
              {formatCurrency(preGains.realisedGains, currency)}
            </span>
          </div>
        </div>

        {/* 2. Right Card: After Harvesting (Vibrant Blue) */}
        <div className="rounded-2xl bg-[#0066FF] border border-blue-400/40 p-6 text-white shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">After Harvesting</h2>

            {/* Table layout matching demo */}
            <div className="grid grid-cols-3 gap-2 text-xs font-medium pb-3 border-b border-white/20 text-blue-100">
              <span></span>
              <span className="text-right">Short-term</span>
              <span className="text-right">Long-term</span>
            </div>

            <div className="space-y-3 py-3 text-xs">
              <div className="grid grid-cols-3 gap-2 items-center text-white">
                <span>Profits</span>
                <span className="text-right font-medium">{formatCurrency(postGains.stcgProfits, currency)}</span>
                <span className="text-right font-medium">{formatCurrency(postGains.ltcgProfits, currency)}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 items-center text-white">
                <span>Losses</span>
                <span className="text-right font-medium">{formatCurrency(postGains.stcgLosses, currency)}</span>
                <span className="text-right font-medium">{formatCurrency(postGains.ltcgLosses, currency)}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 items-center text-white pt-2 border-t border-white/20 font-semibold">
                <span>Net Capital Gains</span>
                <span className="text-right">{formatCurrency(postGains.netStcg, currency)}</span>
                <span className="text-right">{formatCurrency(postGains.netLtcg, currency)}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
              <span className="text-sm font-bold text-white">Effective Capital Gains:</span>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {formatCurrency(postGains.realisedGains, currency)}
              </span>
            </div>

            {/* Dynamic Savings Alert */}
            {isSaving && (
              <div className="mt-3 p-2.5 rounded-lg bg-emerald-500/25 border border-emerald-300/40 flex items-center gap-2 text-xs font-bold text-white animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>You're going to save {formatCurrency(taxSavings, currency)} in taxable gains!</span>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

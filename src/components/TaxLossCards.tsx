import React from 'react';
import { CalculatedGainsBreakdown } from '../types/tax';
import { formatINR } from '../utils/formatters';
import { TrendingDown, TrendingUp, Sparkles, CheckCircle2, Info } from 'lucide-react';

interface TaxLossCardsProps {
  preGains: CalculatedGainsBreakdown;
  postGains: CalculatedGainsBreakdown;
  selectedCount: number;
}

export const TaxLossCards: React.FC<TaxLossCardsProps> = ({
  preGains,
  postGains,
  selectedCount,
}) => {
  // Savings condition: Pre-harvesting realised gains > Post-harvesting gains
  const isSaving = preGains.realisedGains > postGains.realisedGains;
  const taxSavingsAmount = preGains.realisedGains - postGains.realisedGains;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
      
      {/* 1. Pre-Harvesting Card (Dark Navy / Black Background) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#090D16] text-white p-6 sm:p-7 shadow-xl border border-slate-800">
        
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Baseline Status</span>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Pre-Harvesting Gains
            </h2>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium">
            API Baseline
          </div>
        </div>

        {/* Capital Gains Metrics Breakdown */}
        <div className="grid grid-cols-2 gap-4 my-5">
          
          {/* Short-Term Capital Gains */}
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-slate-300">Short-Term (STCG)</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Profits:</span>
                <span className="text-emerald-400 font-medium">{formatINR(preGains.stcgProfits)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Losses:</span>
                <span className="text-rose-400 font-medium">{formatINR(preGains.stcgLosses)}</span>
              </div>
              <div className="pt-2 border-t border-slate-700/50 flex justify-between font-semibold">
                <span className="text-slate-300">Net STCG:</span>
                <span className={preGains.netStcg >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {formatINR(preGains.netStcg, true)}
                </span>
              </div>
            </div>
          </div>

          {/* Long-Term Capital Gains */}
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-slate-300">Long-Term (LTCG)</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Profits:</span>
                <span className="text-emerald-400 font-medium">{formatINR(preGains.ltcgProfits)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Losses:</span>
                <span className="text-rose-400 font-medium">{formatINR(preGains.ltcgLosses)}</span>
              </div>
              <div className="pt-2 border-t border-slate-700/50 flex justify-between font-semibold">
                <span className="text-slate-300">Net LTCG:</span>
                <span className={preGains.netLtcg >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {formatINR(preGains.netLtcg, true)}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Realised Total Summary Banner */}
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Initial Realised Capital Gains</p>
            <p className="text-2xl font-black text-white mt-0.5 tracking-tight">
              {formatINR(preGains.realisedGains)}
            </p>
          </div>
          <div className="text-right text-xs text-slate-400">
            <p className="font-medium">Net STCG + Net LTCG</p>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              {preGains.netStcg >= 0 ? `+${preGains.netStcg}` : preGains.netStcg} + {preGains.netLtcg}
            </p>
          </div>
        </div>

      </div>

      {/* 2. After-Harvesting Card (Vibrant Blue / Accent Background) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0052FF] to-[#0038B8] text-white p-6 sm:p-7 shadow-xl border border-blue-400/30">
        
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-blue-400/40">
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-100">Live Simulation</span>
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              After Harvesting Gains
            </h2>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs font-semibold backdrop-blur-sm">
            {selectedCount} asset{selectedCount === 1 ? '' : 's'} selected
          </div>
        </div>

        {/* Capital Gains Metrics Breakdown */}
        <div className="grid grid-cols-2 gap-4 my-5">
          
          {/* Short-Term Capital Gains */}
          <div className="p-3.5 rounded-xl bg-black/15 border border-white/15 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-blue-100 mb-2">
              <span className="font-semibold text-white">Short-Term (STCG)</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-blue-100">
                <span>Profits:</span>
                <span className="text-emerald-300 font-medium">{formatINR(postGains.stcgProfits)}</span>
              </div>
              <div className="flex justify-between text-blue-100">
                <span>Losses:</span>
                <span className="text-rose-200 font-medium">{formatINR(postGains.stcgLosses)}</span>
              </div>
              <div className="pt-2 border-t border-white/20 flex justify-between font-bold">
                <span className="text-white">Net STCG:</span>
                <span className={postGains.netStcg >= 0 ? 'text-emerald-300' : 'text-rose-200'}>
                  {formatINR(postGains.netStcg, true)}
                </span>
              </div>
            </div>
          </div>

          {/* Long-Term Capital Gains */}
          <div className="p-3.5 rounded-xl bg-black/15 border border-white/15 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-blue-100 mb-2">
              <span className="font-semibold text-white">Long-Term (LTCG)</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-blue-100">
                <span>Profits:</span>
                <span className="text-emerald-300 font-medium">{formatINR(postGains.ltcgProfits)}</span>
              </div>
              <div className="flex justify-between text-blue-100">
                <span>Losses:</span>
                <span className="text-rose-200 font-medium">{formatINR(postGains.ltcgLosses)}</span>
              </div>
              <div className="pt-2 border-t border-white/20 flex justify-between font-bold">
                <span className="text-white">Net LTCG:</span>
                <span className={postGains.netLtcg >= 0 ? 'text-emerald-300' : 'text-rose-200'}>
                  {formatINR(postGains.netLtcg, true)}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Realised Total Summary Banner */}
        <div className="p-4 rounded-xl bg-black/25 border border-white/20 flex items-center justify-between">
          <div>
            <p className="text-xs text-blue-100 font-medium">New Realised Capital Gains</p>
            <p className="text-2xl font-black text-white mt-0.5 tracking-tight">
              {formatINR(postGains.realisedGains)}
            </p>
          </div>
          <div className="text-right text-xs">
            {preGains.realisedGains !== postGains.realisedGains ? (
              <span className="inline-flex items-center gap-1 font-semibold px-2.5 py-1 rounded-lg bg-white/20 text-white">
                {preGains.realisedGains > postGains.realisedGains ? (
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-300" />
                ) : (
                  <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
                )}
                {formatINR(Math.abs(preGains.realisedGains - postGains.realisedGains))} diff
              </span>
            ) : (
              <span className="text-blue-200">Select assets below to simulate</span>
            )}
          </div>
        </div>

        {/* Dynamic Savings Alert */}
        {isSaving ? (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
              <div>
                <p className="text-xs text-emerald-100 font-semibold uppercase tracking-wider">Tax Savings Alert</p>
                <p className="text-sm font-bold text-white">
                  You're going to save <span className="text-emerald-300 underline font-extrabold">{formatINR(taxSavingsAmount)}</span> in taxable capital gains!
                </p>
              </div>
            </div>
            <div className="hidden sm:block text-right text-xs text-emerald-200 font-medium">
              Tax liability reduced
            </div>
          </div>
        ) : selectedCount > 0 ? (
          <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2 text-xs text-blue-100">
            <Info className="w-4 h-4 shrink-0" />
            <span>Selected assets currently add profits. Select loss-making assets to trigger tax loss savings.</span>
          </div>
        ) : null}

      </div>

    </div>
  );
};

import React from 'react';
import { Holding } from '../types/tax';
import { formatCurrency, formatCrypto, Currency } from '../utils/formatters';

interface HoldingsMobileCardProps {
  holding: Holding;
  isSelected: boolean;
  onToggle: (holding: Holding) => void;
  currency: Currency;
}

export const HoldingsMobileCard: React.FC<HoldingsMobileCardProps> = ({
  holding,
  isSelected,
  onToggle,
  currency,
}) => {
  return (
    <div 
      className={`p-4 rounded-xl border transition-all duration-150 ${
        isSelected 
          ? 'bg-blue-950/40 border-blue-500/80 shadow-md' 
          : 'bg-[#121824] border-slate-800'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle(holding)}
            className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <div className="flex items-center gap-2.5">
            <img 
              src={holding.logo} 
              alt={holding.coinName} 
              className="w-8 h-8 rounded-full bg-slate-800 object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <div className="font-bold text-white text-sm">{holding.coinName}</div>
              <span className="text-xs text-slate-400">{holding.coin}</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 block">Current Price</span>
          <span className="text-sm font-bold text-white">{formatCurrency(holding.currentPrice, currency)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-800 text-xs">
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 block mb-0.5">Short-Term</span>
          <span className={`font-bold text-sm ${holding.stcg.gain >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {formatCurrency(holding.stcg.gain, currency, true)}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            {formatCrypto(holding.stcg.balance, holding.coin)}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 block mb-0.5">Long-Term</span>
          <span className={`font-bold text-sm ${holding.ltcg.gain >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {formatCurrency(holding.ltcg.gain, currency, true)}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            {formatCrypto(holding.ltcg.balance, holding.coin)}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-400">Amount to Sell:</span>
        <span className="font-bold text-white">
          {isSelected ? formatCrypto(holding.totalHoldings, holding.coin) : '—'}
        </span>
      </div>
    </div>
  );
};

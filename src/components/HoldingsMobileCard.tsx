import React from 'react';
import { Holding } from '../types/tax';
import { formatINR, formatCrypto } from '../utils/formatters';

interface HoldingsMobileCardProps {
  holding: Holding;
  isSelected: boolean;
  onToggle: (holding: Holding) => void;
  sellAmount: number;
  onSellAmountChange: (id: string, amount: number) => void;
}

export const HoldingsMobileCard: React.FC<HoldingsMobileCardProps> = ({
  holding,
  isSelected,
  onToggle,
  sellAmount,
  onSellAmountChange,
}) => {
  return (
    <div 
      className={`p-4 rounded-xl border transition-all duration-200 ${
        isSelected 
          ? 'bg-blue-50/70 border-blue-300 shadow-sm' 
          : 'bg-white border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle(holding)}
            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <div className="flex items-center gap-2.5">
            <img 
              src={holding.logo} 
              alt={holding.coinName} 
              className="w-8 h-8 rounded-full bg-slate-100 object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-sm">{holding.coin}</span>
                <span className="text-xs text-slate-500">({holding.coinName})</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Holdings: {formatCrypto(holding.totalHoldings, holding.coin)}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 block">Current Price</span>
          <span className="text-sm font-bold text-slate-900">{formatINR(holding.currentPrice)}</span>
        </div>
      </div>

      {/* Gains Breakdown Grid */}
      <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100 text-xs">
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
          <span className="text-slate-500 block mb-0.5">Short-Term Gain (STCG)</span>
          <span className={`font-bold text-sm ${holding.stcg.gain >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {formatINR(holding.stcg.gain, true)}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            {formatCrypto(holding.stcg.balance, holding.coin)}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
          <span className="text-slate-500 block mb-0.5">Long-Term Gain (LTCG)</span>
          <span className={`font-bold text-sm ${holding.ltcg.gain >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {formatINR(holding.ltcg.gain, true)}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            {formatCrypto(holding.ltcg.balance, holding.coin)}
          </span>
        </div>
      </div>

      {/* Amount to Sell Input */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700">Amount to Sell:</label>
        <div className="relative w-36">
          <input
            type="number"
            disabled={!isSelected}
            value={isSelected ? sellAmount : ''}
            onChange={(e) => onSellAmountChange(holding.id, parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="w-full text-right px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white disabled:bg-slate-100 disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

    </div>
  );
};

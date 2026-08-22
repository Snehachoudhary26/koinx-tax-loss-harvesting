import React from 'react';
import { RefreshCw, ShieldCheck } from 'lucide-react';
import { Currency } from '../utils/formatters';

interface NavbarProps {
  onRefresh: () => void;
  isLoading: boolean;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRefresh,
  isLoading,
  currency,
  onCurrencyChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0E131F] border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
            K
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-white tracking-tight">KoinX</span>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800/80">
              Tax Suite
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Currency Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5 text-xs font-semibold text-slate-300">
            <button
              onClick={() => onCurrencyChange('USD')}
              className={`px-2.5 py-1 rounded-md transition ${currency === 'USD' ? 'bg-blue-600 text-white' : 'hover:text-white'}`}
            >
              $ USD
            </button>
            <button
              onClick={() => onCurrencyChange('INR')}
              className={`px-2.5 py-1 rounded-md transition ${currency === 'INR' ? 'bg-blue-600 text-white' : 'hover:text-white'}`}
            >
              ₹ INR
            </button>
          </div>

          <button 
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white text-xs font-medium transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>

          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-400 text-xs font-medium border border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>FY 2024–25</span>
          </div>
        </div>

      </div>
    </header>
  );
};

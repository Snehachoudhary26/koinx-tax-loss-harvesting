import React from 'react';
import { RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  onRefresh: () => void;
  isLoading: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onRefresh, isLoading }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
            K
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">KoinX</span>
              <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Tax Suite
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Automated Crypto Tax Loss Harvesting</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-medium transition shadow-sm hover:bg-slate-50 disabled:opacity-50"
            title="Reload Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>

          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>FY 2024-25 Ready</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Smart Optimizer</span>
          </div>
        </div>

      </div>
    </header>
  );
};

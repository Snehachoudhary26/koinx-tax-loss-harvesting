import React, { useState, useMemo } from 'react';
import { Holding, SortField, SortOrder, FilterType } from '../types/tax';
import { formatCurrency, formatCrypto, Currency } from '../utils/formatters';
import { HoldingsMobileCard } from './HoldingsMobileCard';
import { ArrowUpDown, Search, Sparkles, Layers } from 'lucide-react';

interface HoldingsTableProps {
  holdings: Holding[];
  selectedHoldings: Holding[];
  onToggleHolding: (holding: Holding) => void;
  onSelectAll: (selected: boolean) => void;
  onQuickSelectLosses: () => void;
  currency: Currency;
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({
  holdings,
  selectedHoldings,
  onToggleHolding,
  onSelectAll,
  onQuickSelectLosses,
  currency,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('coin');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [viewAll, setViewAll] = useState(false);

  const filteredHoldings = useMemo(() => {
    return holdings.filter((item) => {
      const matchesSearch = 
        item.coin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.coinName.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;
      if (filterType === 'losses') return item.stcg.gain < 0 || item.ltcg.gain < 0;
      if (filterType === 'profits') return item.stcg.gain > 0 || item.ltcg.gain > 0;
      return true;
    });
  }, [holdings, searchQuery, filterType]);

  const sortedHoldings = useMemo(() => {
    return [...filteredHoldings].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'coin':
          comparison = a.coin.localeCompare(b.coin);
          break;
        case 'totalHoldings':
          comparison = a.totalHoldings - b.totalHoldings;
          break;
        case 'currentPrice':
          comparison = a.currentPrice - b.currentPrice;
          break;
        case 'stcg':
          comparison = a.stcg.gain - b.stcg.gain;
          break;
        case 'ltcg':
          comparison = a.ltcg.gain - b.ltcg.gain;
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [filteredHoldings, sortField, sortOrder]);

  const displayHoldings = viewAll ? sortedHoldings : sortedHoldings.slice(0, 6);
  const isAllSelected = holdings.length > 0 && selectedHoldings.length === holdings.length;
  const isIndeterminate = selectedHoldings.length > 0 && selectedHoldings.length < holdings.length;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="bg-[#121824] rounded-2xl border border-slate-800 shadow-xl overflow-hidden mb-12">
      
      {/* Table Title & Controls */}
      <div className="p-5 border-b border-slate-800/80 bg-slate-900/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">Holdings</h3>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onQuickSelectLosses}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-950 text-blue-300 border border-blue-800 hover:bg-blue-900 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Select All Losses</span>
          </button>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as FilterType)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-900 text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Assets</option>
            <option value="losses">Losses Only</option>
            <option value="profits">Profits Only</option>
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search coin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-700 bg-slate-900 placeholder-slate-500 text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 w-40 sm:w-52"
            />
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/80 bg-slate-900/60 text-slate-400 text-xs font-medium">
              
              <th className="py-3.5 pl-6 pr-3 w-12 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => el && (el.indeterminate = isIndeterminate)}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </th>

              <th onClick={() => handleSort('coin')} className="py-3.5 px-4 cursor-pointer hover:text-white select-none">
                <div className="flex items-center gap-1.5">
                  <span>Asset</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th onClick={() => handleSort('totalHoldings')} className="py-3.5 px-4 cursor-pointer hover:text-white select-none">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span>Holdings</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-normal">Avg Buy Price</span>
                </div>
              </th>

              <th onClick={() => handleSort('currentPrice')} className="py-3.5 px-4 cursor-pointer hover:text-white select-none">
                <div className="flex items-center gap-1.5">
                  <span>Current Price</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th onClick={() => handleSort('stcg')} className="py-3.5 px-4 cursor-pointer hover:text-white select-none">
                <div className="flex items-center gap-1.5">
                  <span>Short-Term</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th onClick={() => handleSort('ltcg')} className="py-3.5 px-4 cursor-pointer hover:text-white select-none">
                <div className="flex items-center gap-1.5">
                  <span>Long-Term</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th className="py-3.5 pl-4 pr-6 text-right">
                <span>Amount to Sell</span>
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60 text-xs">
            {displayHoldings.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-500">
                  No assets found.
                </td>
              </tr>
            ) : (
              displayHoldings.map((holding) => {
                const isSelected = selectedHoldings.some((item) => item.id === holding.id);

                return (
                  <tr 
                    key={holding.id}
                    className={`transition-colors duration-150 ${
                      isSelected ? 'bg-blue-950/30 hover:bg-blue-950/40' : 'hover:bg-slate-900/40'
                    }`}
                  >
                    <td className="py-4 pl-6 pr-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleHolding(holding)}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={holding.logo}
                          alt={holding.coinName}
                          className="w-7 h-7 rounded-full bg-slate-800 object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div>
                          <div className="font-bold text-white text-sm">
                            {holding.coinName}
                          </div>
                          <div className="text-[11px] text-slate-400 uppercase font-semibold">
                            {holding.coin}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-100">
                        {formatCrypto(holding.totalHoldings, holding.coin)}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {formatCurrency(holding.averageBuyPrice, currency)}/{holding.coin}
                      </div>
                    </td>

                    <td className="py-4 px-4 font-bold text-slate-100">
                      {formatCurrency(holding.currentPrice, currency)}
                    </td>

                    <td className="py-4 px-4">
                      <div className={`font-bold ${holding.stcg.gain >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {formatCurrency(holding.stcg.gain, currency, true)}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {formatCrypto(holding.stcg.balance, holding.coin)}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className={`font-bold ${holding.ltcg.gain >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {formatCurrency(holding.ltcg.gain, currency, true)}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {formatCrypto(holding.ltcg.balance, holding.coin)}
                      </div>
                    </td>

                    <td className="py-4 pl-4 pr-6 text-right">
                      {isSelected ? (
                        <span className="font-semibold text-slate-200">
                          {formatCrypto(holding.totalHoldings, holding.coin)}
                        </span>
                      ) : (
                        <span className="text-slate-500 font-mono">-</span>
                      )}
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden p-4 space-y-3">
        {displayHoldings.map((holding) => {
          const isSelected = selectedHoldings.some((item) => item.id === holding.id);
          return (
            <HoldingsMobileCard
              key={holding.id}
              holding={holding}
              isSelected={isSelected}
              onToggle={onToggleHolding}
              currency={currency}
            />
          );
        })}
      </div>

      {/* Footer Controls */}
      <div className="p-4 sm:p-5 bg-slate-900/70 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={() => setViewAll(!viewAll)}
          className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition flex items-center gap-1.5"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{viewAll ? 'Show Less' : `View All Holdings (${sortedHoldings.length})`}</span>
        </button>

        <span className="text-xs text-slate-400 font-medium">
          {selectedHoldings.length} selected
        </span>
      </div>

    </div>
  );
};

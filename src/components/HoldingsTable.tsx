import React, { useState, useMemo } from 'react';
import { Holding, SortField, SortOrder, FilterType } from '../types/tax';
import { formatINR, formatCrypto } from '../utils/formatters';
import { HoldingsMobileCard } from './HoldingsMobileCard';
import { 
  ArrowUpDown, 
  Search, 
  Filter, 
  CheckSquare, 
  Square, 
  TrendingDown, 
  TrendingUp, 
  Sparkles,
  Layers
} from 'lucide-react';

interface HoldingsTableProps {
  holdings: Holding[];
  selectedHoldings: Holding[];
  onToggleHolding: (holding: Holding) => void;
  onSelectAll: (selected: boolean) => void;
  onQuickSelectLosses: () => void;
  onHarvestClick: () => void;
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({
  holdings,
  selectedHoldings,
  onToggleHolding,
  onSelectAll,
  onQuickSelectLosses,
  onHarvestClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('coin');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [viewAll, setViewAll] = useState(false);
  
  // Track custom sell amounts per holding (initialized to totalHoldings on selection)
  const [sellAmounts, setSellAmounts] = useState<Record<string, number>>({});

  const handleSellAmountChange = (id: string, amount: number) => {
    setSellAmounts((prev) => ({ ...prev, [id]: amount }));
  };

  // Filter and Sort Pipeline
  const filteredHoldings = useMemo(() => {
    return holdings.filter((item) => {
      // Search filter
      const matchesSearch = 
        item.coin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.coinName.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      // P&L filter
      if (filterType === 'losses') {
        return item.stcg.gain < 0 || item.ltcg.gain < 0;
      }
      if (filterType === 'profits') {
        return item.stcg.gain > 0 || item.ltcg.gain > 0;
      }
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

  const displayHoldings = viewAll ? sortedHoldings : sortedHoldings.slice(0, 5);

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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
      
      {/* Table Top Controls & Bar */}
      <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-extrabold text-slate-900">Holdings Portfolio</h3>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-200 text-slate-700">
              {holdings.length} Assets
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Select holding assets to harvest unrealized gains/losses into your final tax computation.
          </p>
        </div>

        {/* Action and Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Quick Select Losses Shortcut */}
          <button
            onClick={onQuickSelectLosses}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Select All Losses</span>
          </button>

          {/* Filter Dropdown */}
          <div className="relative flex items-center">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as FilterType)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm"
            >
              <option value="all">All Assets</option>
              <option value="losses">Loss Making Only</option>
              <option value="profits">Profitable Only</option>
            </select>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search coin (e.g. ETH, BTC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-44 sm:w-56 shadow-sm"
            />
          </div>

        </div>

      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-600 text-[11px] font-bold uppercase tracking-wider">
              
              {/* Checkbox Header */}
              <th className="py-3.5 pl-6 pr-3 w-12 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => el && (el.indeterminate = isIndeterminate)}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </th>

              {/* Asset Column */}
              <th 
                onClick={() => handleSort('coin')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-900 select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>Asset</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              {/* Holdings & Avg Buy Price */}
              <th 
                onClick={() => handleSort('totalHoldings')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-900 select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>Holdings & Avg Buy Price</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              {/* Current Price */}
              <th 
                onClick={() => handleSort('currentPrice')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-900 select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>Current Price</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              {/* Short-Term Gain */}
              <th 
                onClick={() => handleSort('stcg')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-900 select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>Short-Term Gain (STCG)</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              {/* Long-Term Gain */}
              <th 
                onClick={() => handleSort('ltcg')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-900 select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>Long-Term Gain (LTCG)</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>

              {/* Amount to Sell */}
              <th className="py-3.5 pl-4 pr-6 text-right">
                <span>Amount to Sell</span>
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs">
            {displayHoldings.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-400">
                  No assets found matching your search or filter.
                </td>
              </tr>
            ) : (
              displayHoldings.map((holding) => {
                const isSelected = selectedHoldings.some((item) => item.id === holding.id);
                const currentSellAmount = sellAmounts[holding.id] ?? holding.totalHoldings;

                return (
                  <tr 
                    key={holding.id}
                    className={`transition-colors duration-150 ${
                      isSelected ? 'bg-blue-50/60 hover:bg-blue-50' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 pl-6 pr-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleHolding(holding)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>

                    {/* Asset info */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={holding.logo}
                          alt={holding.coinName}
                          className="w-7 h-7 rounded-full bg-slate-100 object-cover shadow-sm"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            {holding.coin}
                            <span className="text-[11px] font-normal text-slate-400 hidden sm:inline">
                              {holding.coinName}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Holdings & Avg Buy Price */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800">
                        {formatCrypto(holding.totalHoldings, holding.coin)}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Avg: {formatINR(holding.averageBuyPrice)}
                      </div>
                    </td>

                    {/* Current Price */}
                    <td className="py-4 px-4 font-bold text-slate-900">
                      {formatINR(holding.currentPrice)}
                    </td>

                    {/* Short-Term Gain */}
                    <td className="py-4 px-4">
                      <div className={`font-bold ${holding.stcg.gain >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {formatINR(holding.stcg.gain, true)}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {formatCrypto(holding.stcg.balance, holding.coin)}
                      </div>
                    </td>

                    {/* Long-Term Gain */}
                    <td className="py-4 px-4">
                      <div className={`font-bold ${holding.ltcg.gain >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {formatINR(holding.ltcg.gain, true)}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {formatCrypto(holding.ltcg.balance, holding.coin)}
                      </div>
                    </td>

                    {/* Amount to Sell */}
                    <td className="py-4 pl-4 pr-6 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <input
                          type="number"
                          disabled={!isSelected}
                          value={isSelected ? currentSellAmount : ''}
                          onChange={(e) => handleSellAmountChange(holding.id, parseFloat(e.target.value) || 0)}
                          placeholder="—"
                          className="w-24 text-right px-2 py-1 font-semibold rounded-md border border-slate-200 bg-white disabled:bg-slate-100 disabled:text-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                        <span className="text-slate-400 text-[11px] font-medium w-8 text-left">
                          {holding.coin}
                        </span>
                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (For small screens) */}
      <div className="lg:hidden p-4 space-y-3">
        {displayHoldings.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            No assets match your search.
          </div>
        ) : (
          displayHoldings.map((holding) => {
            const isSelected = selectedHoldings.some((item) => item.id === holding.id);
            const currentSellAmount = sellAmounts[holding.id] ?? holding.totalHoldings;

            return (
              <HoldingsMobileCard
                key={holding.id}
                holding={holding}
                isSelected={isSelected}
                onToggle={onToggleHolding}
                sellAmount={currentSellAmount}
                onSellAmountChange={handleSellAmountChange}
              />
            );
          })
        )}
      </div>

      {/* Footer Controls: View All toggle + Harvest Action */}
      <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => setViewAll(!viewAll)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{viewAll ? 'Show Less (Top 5)' : `View All Holdings (${sortedHoldings.length})`}</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="text-xs text-slate-500 font-medium">
            {selectedHoldings.length} asset{selectedHoldings.length === 1 ? '' : 's'} selected
          </div>
          <button
            onClick={onHarvestClick}
            disabled={selectedHoldings.length === 0}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Execute Tax Harvesting
          </button>
        </div>
      </div>

    </div>
  );
};

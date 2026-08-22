import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { TaxLossCards } from './components/TaxLossCards';
import { HoldingsTable } from './components/HoldingsTable';
import { SkeletonLoader } from './components/SkeletonLoader';
import { fetchCapitalGains, fetchHoldings } from './services/mockApi';
import { CapitalGainsAPIResponse, Holding } from './types/tax';
import { computePreHarvestingGains, computePostHarvestingGains } from './utils/taxMath';
import { Currency } from './utils/formatters';
import { AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currency, setCurrency] = useState<Currency>('USD');

  const [capitalGainsData, setCapitalGainsData] = useState<CapitalGainsAPIResponse | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [selectedHoldings, setSelectedHoldings] = useState<Holding[]>([]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [gainsRes, holdingsRes] = await Promise.all([
        fetchCapitalGains(),
        fetchHoldings(),
      ]);
      setCapitalGainsData(gainsRes);
      setHoldings(holdingsRes);
      setSelectedHoldings([]);
    } catch (err) {
      setError('Failed to fetch tax and holdings data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const preHarvestGains = useMemo(() => {
    return computePreHarvestingGains(capitalGainsData);
  }, [capitalGainsData]);

  const postHarvestGains = useMemo(() => {
    return computePostHarvestingGains(preHarvestGains, selectedHoldings);
  }, [preHarvestGains, selectedHoldings]);

  const handleToggleHolding = (holding: Holding) => {
    setSelectedHoldings((prev) => {
      const exists = prev.some((item) => item.id === holding.id);
      if (exists) {
        return prev.filter((item) => item.id !== holding.id);
      } else {
        return [...prev, holding];
      }
    });
  };

  const handleSelectAll = (select: boolean) => {
    if (select) {
      setSelectedHoldings([...holdings]);
    } else {
      setSelectedHoldings([]);
    }
  };

  const handleQuickSelectLosses = () => {
    const lossMaking = holdings.filter(
      (h) => h.stcg.gain < 0 || h.ltcg.gain < 0
    );
    setSelectedHoldings(lossMaking);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0E17] text-slate-100">
      <Navbar 
        onRefresh={loadData} 
        isLoading={loading} 
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950 border border-rose-800 text-rose-300 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            <TaxLossCards
              preGains={preHarvestGains}
              postGains={postHarvestGains}
              currency={currency}
            />

            <HoldingsTable
              holdings={holdings}
              selectedHoldings={selectedHoldings}
              onToggleHolding={handleToggleHolding}
              onSelectAll={handleSelectAll}
              onQuickSelectLosses={handleQuickSelectLosses}
              currency={currency}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;

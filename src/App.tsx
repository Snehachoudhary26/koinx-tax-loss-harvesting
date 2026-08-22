import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { TaxLossCards } from './components/TaxLossCards';
import { HoldingsTable } from './components/HoldingsTable';
import { HarvestModal } from './components/HarvestModal';
import { SkeletonLoader } from './components/SkeletonLoader';
import { fetchCapitalGains, fetchHoldings } from './services/mockApi';
import { CapitalGainsAPIResponse, Holding } from './types/tax';
import { computePreHarvestingGains, computePostHarvestingGains } from './utils/taxMath';
import { AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [capitalGainsData, setCapitalGainsData] = useState<CapitalGainsAPIResponse | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [selectedHoldings, setSelectedHoldings] = useState<Holding[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch initial mock data
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
      setSelectedHoldings([]); // Reset selections on refresh
    } catch (err) {
      setError('Failed to fetch tax and holdings data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Compute Financial Math
  const preHarvestGains = useMemo(() => {
    return computePreHarvestingGains(capitalGainsData);
  }, [capitalGainsData]);

  const postHarvestGains = useMemo(() => {
    return computePostHarvestingGains(preHarvestGains, selectedHoldings);
  }, [preHarvestGains, selectedHoldings]);

  // Row selection handler
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

  // Select all handler
  const handleSelectAll = (select: boolean) => {
    if (select) {
      setSelectedHoldings([...holdings]);
    } else {
      setSelectedHoldings([]);
    }
  };

  // Quick select only loss-making assets
  const handleQuickSelectLosses = () => {
    const lossMaking = holdings.filter(
      (h) => h.stcg.gain < 0 || h.ltcg.gain < 0
    );
    setSelectedHoldings(lossMaking);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Navigation */}
      <Navbar onRefresh={loadData} isLoading={loading} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Loading Skeleton vs Actual Dashboard */}
        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            {/* Dashboard Subheader */}
            <div className="mb-4">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Tax Loss Harvesting
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Simulate selling your unrealized crypto losses to reduce your overall capital gains tax liability.
              </p>
            </div>

            {/* Pre & Post Harvesting Comparison Cards */}
            <TaxLossCards
              preGains={preHarvestGains}
              postGains={postHarvestGains}
              selectedCount={selectedHoldings.length}
            />

            {/* Holdings Portfolio Table */}
            <HoldingsTable
              holdings={holdings}
              selectedHoldings={selectedHoldings}
              onToggleHolding={handleToggleHolding}
              onSelectAll={handleSelectAll}
              onQuickSelectLosses={handleQuickSelectLosses}
              onHarvestClick={() => setIsModalOpen(true)}
            />
          </>
        )}

      </main>

      {/* Execution Confirmation Modal */}
      <HarvestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedHoldings={selectedHoldings}
        preGains={preHarvestGains}
        postGains={postHarvestGains}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>KoinX Frontend Assignment — Tax Loss Harvesting Tool</span>
          <span>Designed with React + TypeScript + Tailwind CSS</span>
        </div>
      </footer>
    </div>
  );
};

export default App;

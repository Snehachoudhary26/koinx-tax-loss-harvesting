export interface CapitalGainsSection {
  profits: number;
  losses: number;
}

export interface CapitalGainsAPIResponse {
  capitalGains: {
    stcg: CapitalGainsSection;
    ltcg: CapitalGainsSection;
  };
}

export interface HoldingGainItem {
  gain: number;
  balance: number;
}

export interface Holding {
  id: string;
  coin: string;
  coinName: string;
  logo: string;
  totalHoldings: number;
  averageBuyPrice: number;
  currentPrice: number;
  stcg: HoldingGainItem;
  ltcg: HoldingGainItem;
}

export interface CalculatedGainsBreakdown {
  stcgProfits: number;
  stcgLosses: number;
  netStcg: number;
  ltcgProfits: number;
  ltcgLosses: number;
  netLtcg: number;
  realisedGains: number;
}

export type SortField = 'coin' | 'totalHoldings' | 'currentPrice' | 'stcg' | 'ltcg';
export type SortOrder = 'asc' | 'desc';
export type FilterType = 'all' | 'losses' | 'profits';

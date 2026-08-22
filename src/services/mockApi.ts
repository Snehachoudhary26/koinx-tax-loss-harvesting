import { CapitalGainsAPIResponse, Holding } from '../types/tax';

export const fetchCapitalGains = async (): Promise<CapitalGainsAPIResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        capitalGains: {
          stcg: {
            profits: 4049.48,
            losses: 32127.03,
          },
          ltcg: {
            profits: 0.00,
            losses: 0.00,
          },
        },
      });
    }, 350);
  });
};

export const fetchHoldings = async (): Promise<Holding[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'wbtc',
          coin: 'WBTC',
          coinName: 'Wrapped Bitcoin',
          logo: 'https://assets.coingecko.com/coins/images/7598/standard/wrapped_bitcoin_wbtc.png',
          totalHoldings: 2218.81,
          averageBuyPrice: 92980.19,
          currentPrice: 104390.00,
          stcg: { gain: 25310000, balance: 2218.81 },
          ltcg: { gain: 0, balance: 0 },
        },
        {
          id: 'btc',
          coin: 'BTC',
          coinName: 'Bitcoin',
          logo: 'https://assets.coingecko.com/coins/images/1/standard/bitcoin.png',
          totalHoldings: 1184.12,
          averageBuyPrice: 93072.64,
          currentPrice: 104250.00,
          stcg: { gain: 13240000, balance: 1184.12 },
          ltcg: { gain: 0, balance: 0 },
        },
        {
          id: 'eth',
          coin: 'ETH',
          coinName: 'Ethereum',
          logo: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png',
          totalHoldings: 20028.05,
          averageBuyPrice: 3370.12,
          currentPrice: 2531.06,
          stcg: { gain: -16760000, balance: 20028.05 },
          ltcg: { gain: 0, balance: 0 },
        },
        {
          id: 'matic',
          coin: 'MATIC',
          coinName: 'Polygon',
          logo: 'https://assets.coingecko.com/coins/images/4713/standard/polygon.png',
          totalHoldings: 26038.45,
          averageBuyPrice: 0.13,
          currentPrice: 0.26,
          stcg: { gain: 3348.92, balance: 26038.45 },
          ltcg: { gain: 0, balance: 0 },
        },
        {
          id: 'sol',
          coin: 'SOL',
          coinName: 'Solana',
          logo: 'https://assets.coingecko.com/coins/images/4128/standard/solana.png',
          totalHoldings: 5400.00,
          averageBuyPrice: 195.50,
          currentPrice: 172.30,
          stcg: { gain: -125280.00, balance: 5400.00 },
          ltcg: { gain: 0, balance: 0 },
        },
        {
          id: 'ada',
          coin: 'ADA',
          coinName: 'Cardano',
          logo: 'https://assets.coingecko.com/coins/images/975/standard/cardano.png',
          totalHoldings: 85000.00,
          averageBuyPrice: 0.65,
          currentPrice: 0.52,
          stcg: { gain: -11050.00, balance: 85000.00 },
          ltcg: { gain: 0, balance: 0 },
        }
      ]);
    }, 350);
  });
};

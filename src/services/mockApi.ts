import { CapitalGainsAPIResponse, Holding } from '../types/tax';

/**
 * Mock Capital Gains API
 * Matches exact sample structure:
 * Initial gains: STCG (100 profits, 500 losses), LTCG (1200 profits, 100 losses)
 * Net STCG = -400, Net LTCG = 1100 => Realised Capital Gains = 700
 */
export const fetchCapitalGains = async (): Promise<CapitalGainsAPIResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        capitalGains: {
          stcg: {
            profits: 100,
            losses: 500,
          },
          ltcg: {
            profits: 1200,
            losses: 100,
          },
        },
      });
    }, 450);
  });
};

/**
 * Mock Holdings API
 * Includes realistic crypto holdings (ETH, BTC, SOL, MATIC, ADA, DOT, AVAX, LINK)
 */
export const fetchHoldings = async (): Promise<Holding[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'eth',
          coin: 'ETH',
          coinName: 'Ethereum',
          logo: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png',
          totalHoldings: 2.45,
          averageBuyPrice: 240000,
          currentPrice: 215000,
          stcg: { gain: 500, balance: 1.2 },
          ltcg: { gain: -1000, balance: 1.25 },
        },
        {
          id: 'btc',
          coin: 'BTC',
          coinName: 'Bitcoin',
          logo: 'https://assets.coingecko.com/coins/images/1/standard/bitcoin.png',
          totalHoldings: 0.35,
          averageBuyPrice: 5200000,
          currentPrice: 4850000,
          stcg: { gain: -1200, balance: 0.15 },
          ltcg: { gain: -3500, balance: 0.20 },
        },
        {
          id: 'sol',
          coin: 'SOL',
          coinName: 'Solana',
          logo: 'https://assets.coingecko.com/coins/images/4128/standard/solana.png',
          totalHoldings: 18.5,
          averageBuyPrice: 11200,
          currentPrice: 14800,
          stcg: { gain: 1800, balance: 10.0 },
          ltcg: { gain: 4500, balance: 8.5 },
        },
        {
          id: 'matic',
          coin: 'POL',
          coinName: 'Polygon (POL)',
          logo: 'https://assets.coingecko.com/coins/images/4713/standard/polygon.png',
          totalHoldings: 1250,
          averageBuyPrice: 78.5,
          currentPrice: 42.1,
          stcg: { gain: -850, balance: 600 },
          ltcg: { gain: -2400, balance: 650 },
        },
        {
          id: 'ada',
          coin: 'ADA',
          coinName: 'Cardano',
          logo: 'https://assets.coingecko.com/coins/images/975/standard/cardano.png',
          totalHoldings: 840,
          averageBuyPrice: 45.0,
          currentPrice: 38.2,
          stcg: { gain: -320, balance: 400 },
          ltcg: { gain: -580, balance: 440 },
        },
        {
          id: 'dot',
          coin: 'DOT',
          coinName: 'Polkadot',
          logo: 'https://assets.coingecko.com/coins/images/12171/standard/polkadot.png',
          totalHoldings: 65,
          averageBuyPrice: 620,
          currentPrice: 510,
          stcg: { gain: -450, balance: 30 },
          ltcg: { gain: -1100, balance: 35 },
        },
        {
          id: 'avax',
          coin: 'AVAX',
          coinName: 'Avalanche',
          logo: 'https://assets.coingecko.com/coins/images/12559/standard/Avalanche_Circle_RedWhite_Trans.png',
          totalHoldings: 14.2,
          averageBuyPrice: 2850,
          currentPrice: 2310,
          stcg: { gain: -620, balance: 7.0 },
          ltcg: { gain: -1420, balance: 7.2 },
        },
        {
          id: 'link',
          coin: 'LINK',
          coinName: 'Chainlink',
          logo: 'https://assets.coingecko.com/coins/images/877/standard/chainlink-new-logo.png',
          totalHoldings: 42.0,
          averageBuyPrice: 1150,
          currentPrice: 1420,
          stcg: { gain: 890, balance: 20.0 },
          ltcg: { gain: 1850, balance: 22.0 },
        }
      ]);
    }, 450);
  });
};

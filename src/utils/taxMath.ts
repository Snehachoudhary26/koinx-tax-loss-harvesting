import { CapitalGainsAPIResponse, CalculatedGainsBreakdown, Holding } from '../types/tax';

/**
 * Calculates baseline Pre-Harvesting gains from Capital Gains API
 * Net STCG = STCG Profits - STCG Losses
 * Net LTCG = LTCG Profits - LTCG Losses
 * Realised Gains = Net STCG + Net LTCG
 */
export const computePreHarvestingGains = (
  apiData: CapitalGainsAPIResponse | null
): CalculatedGainsBreakdown => {
  if (!apiData) {
    return {
      stcgProfits: 0,
      stcgLosses: 0,
      netStcg: 0,
      ltcgProfits: 0,
      ltcgLosses: 0,
      netLtcg: 0,
      realisedGains: 0,
    };
  }

  const { stcg, ltcg } = apiData.capitalGains;
  const netStcg = stcg.profits - stcg.losses;
  const netLtcg = ltcg.profits - ltcg.losses;
  const realisedGains = netStcg + netLtcg;

  return {
    stcgProfits: stcg.profits,
    stcgLosses: stcg.losses,
    netStcg,
    ltcgProfits: ltcg.profits,
    ltcgLosses: ltcg.losses,
    netLtcg,
    realisedGains,
  };
};

/**
 * Calculates After-Harvesting gains when holdings are selected
 * Business Rules:
 * For each selected holding:
 * - STCG Gain: if > 0, add to STCG Profits; if < 0, add |gain| to STCG Losses
 * - LTCG Gain: if > 0, add to LTCG Profits; if < 0, add |gain| to LTCG Losses
 */
export const computePostHarvestingGains = (
  preGains: CalculatedGainsBreakdown,
  selectedHoldings: Holding[]
): CalculatedGainsBreakdown => {
  let stcgProfits = preGains.stcgProfits;
  let stcgLosses = preGains.stcgLosses;
  let ltcgProfits = preGains.ltcgProfits;
  let ltcgLosses = preGains.ltcgLosses;

  selectedHoldings.forEach((holding) => {
    // STCG evaluation
    if (holding.stcg.gain > 0) {
      stcgProfits += holding.stcg.gain;
    } else if (holding.stcg.gain < 0) {
      stcgLosses += Math.abs(holding.stcg.gain);
    }

    // LTCG evaluation
    if (holding.ltcg.gain > 0) {
      ltcgProfits += holding.ltcg.gain;
    } else if (holding.ltcg.gain < 0) {
      ltcgLosses += Math.abs(holding.ltcg.gain);
    }
  });

  const netStcg = stcgProfits - stcgLosses;
  const netLtcg = ltcgProfits - ltcgLosses;
  const realisedGains = netStcg + netLtcg;

  return {
    stcgProfits,
    stcgLosses,
    netStcg,
    ltcgProfits,
    ltcgLosses,
    netLtcg,
    realisedGains,
  };
};

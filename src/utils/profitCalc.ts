import { Product } from '../data/mockData';

// Real-time coin values and algorithm paying rates (in BTC per GH/s/day)
// Based on current live scraping stats.
export const ALGORITHM_YIELDS: { [key: string]: { coin: string; payingRateBtc: number } } = {
  'SHA-256': { coin: 'BTC', payingRateBtc: 5.1151e-10 },
  'Blake3': { coin: 'ALPH', payingRateBtc: 3.08e-9 },
  'Scrypt': { coin: 'LTC', payingRateBtc: 3.028e-8 },
  'Kadena': { coin: 'KDA', payingRateBtc: 2.3532e-10 },
  'EtHash': { coin: 'ETC', payingRateBtc: 0.0000067087 },
  'Etchash': { coin: 'ETC', payingRateBtc: 0.0000067087 }
};

const BTC_PRICE_USD = 91381.84;

export const calculateProfit = (product: Product, electricityCost: number) => {
  const algo = product.algorithm;
  const yieldInfo = ALGORITHM_YIELDS[algo] || { coin: product.coins[0] || 'BTC', payingRateBtc: 5.1151e-10 };
  
  // Convert hashrate to GH/s for standard paying rate multiplication
  let hashrateGhs = product.hashrate;
  if (product.hashrateUnit === 'TH/s') {
    hashrateGhs = product.hashrate * 1000;
  } else if (product.hashrateUnit === 'MH/s') {
    hashrateGhs = product.hashrate / 1000;
  } else if (product.hashrateUnit === 'PH/s') {
    hashrateGhs = product.hashrate * 1000000;
  }

  // Daily revenue in USD
  const dailyRevenue = hashrateGhs * yieldInfo.payingRateBtc * BTC_PRICE_USD;
  // Daily power cost in USD
  const dailyPowerCost = (product.power * 24 * electricityCost) / 1000;
  // Net daily profit
  const dailyProfit = dailyRevenue - dailyPowerCost;

  return {
    revenue: dailyRevenue,
    cost: dailyPowerCost,
    profit: dailyProfit
  };
};

export const calculateProfitCustom = (algo: string, defaultCoin: string, hashrate: number, hashrateUnit: string, power: number, electricityCost: number) => {
  const yieldInfo = ALGORITHM_YIELDS[algo] || { coin: defaultCoin, payingRateBtc: 5.1151e-10 };
  
  let hashrateGhs = hashrate;
  if (hashrateUnit === 'TH/s') {
    hashrateGhs = hashrate * 1000;
  } else if (hashrateUnit === 'MH/s') {
    hashrateGhs = hashrate / 1000;
  } else if (hashrateUnit === 'PH/s') {
    hashrateGhs = hashrate * 1000000;
  }

  const dailyRevenue = hashrateGhs * yieldInfo.payingRateBtc * BTC_PRICE_USD;
  const dailyPowerCost = (power * 24 * electricityCost) / 1000;
  const dailyProfit = dailyRevenue - dailyPowerCost;

  return {
    revenue: dailyRevenue,
    cost: dailyPowerCost,
    profit: dailyProfit
  };
};

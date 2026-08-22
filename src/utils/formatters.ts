export type Currency = 'INR' | 'USD';

export const formatCurrency = (
  amount: number, 
  currency: Currency = 'INR', 
  showSign: boolean = false
): string => {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const symbol = currency === 'INR' ? '₹' : '$';

  let formatted: string;
  if (absAmount >= 10000000) {
    formatted = `${(absAmount / 10000000).toFixed(2)}Cr`;
  } else if (absAmount >= 1000000 && currency === 'USD') {
    formatted = `${(absAmount / 1000000).toFixed(2)}M`;
  } else if (absAmount >= 1000 && absAmount >= 100000 && currency === 'USD') {
    formatted = `${(absAmount / 1000).toFixed(2)}K`;
  } else {
    formatted = new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(absAmount);
  }

  if (showSign) {
    if (amount > 0) return `+${symbol}${formatted}`;
    if (amount < 0) return `-${symbol}${formatted}`;
    return `${symbol}${formatted}`;
  }

  return isNegative ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
};

export const formatINR = (amount: number, showSign: boolean = false): string => {
  return formatCurrency(amount, 'INR', showSign);
};

export const formatCrypto = (amount: number, symbol?: string): string => {
  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 4,
    minimumFractionDigits: 2,
  }).format(amount);

  return symbol ? `${formatted} ${symbol}` : formatted;
};

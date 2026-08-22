/**
 * Format numbers into Indian Rupee (INR) currency format
 * Example: 240000 -> ₹2,40,000
 */
export const formatINR = (amount: number, showSign: boolean = false): string => {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(absAmount);

  if (showSign) {
    if (amount > 0) return `+₹${formatted}`;
    if (amount < 0) return `-₹${formatted}`;
    return `₹${formatted}`;
  }

  return isNegative ? `-₹${formatted}` : `₹${formatted}`;
};

/**
 * Format token quantities nicely
 */
export const formatCrypto = (amount: number, symbol?: string): string => {
  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 4,
    minimumFractionDigits: 0,
  }).format(amount);

  return symbol ? `${formatted} ${symbol}` : formatted;
};

import { Provider } from '@/types/provider';

export interface SavingsCalculation {
  currentAnnualCost: number;
  estimatedSavings: number;
  savingsPercentage: number;
  newAnnualCost: number;
  monthlyBreakdown?: {
    month: number;
    savings: number;
  }[];
}

/**
 * Calculate annual savings based on monthly bill and provider discount rate
 */
export function calculateSavings(
  monthlyBill: number,
  discountRate: number,
  provider?: Provider
): SavingsCalculation {
  // Current annual cost
  const currentAnnualCost = monthlyBill * 12;

  // Calculate the discount (as a decimal)
  const discountDecimal = discountRate / 100;

  // Estimated annual savings
  // The discount applies to the credits received, which offset the utility bill
  // So if you get $100 in credits and have a 10% discount, you pay the provider $90
  // and save $10
  const estimatedSavings = currentAnnualCost * discountDecimal;

  // New annual cost after savings
  const newAnnualCost = currentAnnualCost - estimatedSavings;

  // Calculate monthly breakdown
  const monthlyBreakdown = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    savings: estimatedSavings / 12
  }));

  // Add subscription fee if applicable
  let adjustedSavings = estimatedSavings;
  if (provider?.pricing.subscriptionFee) {
    adjustedSavings -= provider.pricing.subscriptionFee * 12;
  }

  return {
    currentAnnualCost,
    estimatedSavings: adjustedSavings,
    savingsPercentage: discountRate,
    newAnnualCost: currentAnnualCost - adjustedSavings,
    monthlyBreakdown
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format percentage for display
 */
export function formatPercentage(percentage: number): string {
  return `${percentage.toFixed(1)}%`;
}

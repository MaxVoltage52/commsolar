import { NextRequest, NextResponse } from 'next/server';
import { getProviderById } from '@/lib/data-access';
import { calculateSavings } from '@/lib/savings-calc';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { monthlyBill, providerId, discountRate } = body;

    if (!monthlyBill || monthlyBill <= 0) {
      return NextResponse.json(
        { success: false, error: 'Valid monthly bill amount is required' },
        { status: 400 }
      );
    }

    let provider = null;
    let effectiveDiscountRate = discountRate || 10; // Default 10% if not specified

    // If provider ID is specified, get the provider details
    if (providerId) {
      provider = await getProviderById(providerId);
      if (provider) {
        effectiveDiscountRate = provider.pricing.discountRate;
      }
    }

    // Calculate savings
    const calculation = calculateSavings(monthlyBill, effectiveDiscountRate, provider || undefined);

    return NextResponse.json({
      success: true,
      calculation,
      provider: provider ? {
        id: provider.id,
        name: provider.name,
        discountRate: provider.pricing.discountRate,
        subscriptionFee: provider.pricing.subscriptionFee,
        contractLength: provider.pricing.contractLength
      } : null
    });
  } catch (error) {
    console.error('Calculate API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { lookupZipCode, getProvidersByZipCode, getStatePolicy } from '@/lib/data-access';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { zipCode } = body;

    if (!zipCode) {
      return NextResponse.json(
        { success: false, error: 'Zip code is required' },
        { status: 400 }
      );
    }

    // Clean zip code (remove spaces, dashes)
    const cleanZip = zipCode.toString().replace(/[^0-9]/g, '').substring(0, 5);

    if (cleanZip.length !== 5) {
      return NextResponse.json(
        { success: false, error: 'Invalid zip code format' },
        { status: 400 }
      );
    }

    // Look up location
    const location = await lookupZipCode(cleanZip);

    if (!location) {
      return NextResponse.json({
        success: true,
        available: false,
        message: `We don't have community solar data for zip code ${cleanZip} yet. Community solar is available in 44 states - check back soon as we're constantly expanding our coverage!`,
        location: null,
        providers: [],
        statePolicy: null
      });
    }

    // Get providers for this zip code
    const providers = await getProvidersByZipCode(cleanZip);

    // Get state policy
    const statePolicy = await getStatePolicy(location.stateCode);

    return NextResponse.json({
      success: true,
      available: providers.length > 0,
      message: providers.length > 0
        ? `Found ${providers.length} community solar provider${providers.length > 1 ? 's' : ''} in your area!`
        : `Community solar is available in ${location.state}, but we don't have specific providers for your area yet.`,
      location,
      providers,
      statePolicy
    });
  } catch (error) {
    console.error('Lookup API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

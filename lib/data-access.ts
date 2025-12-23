import { promises as fs } from 'fs';
import path from 'path';
import { Provider, ProviderData } from '@/types/provider';
import { StatePolicy, ZipMapping, LocationInfo } from '@/types/state';

// Cache for loaded data (in-memory cache for performance)
let zipMappings: ZipMapping | null = null;
let statePolicies: Record<string, StatePolicy> | null = null;
const providerCache: Record<string, ProviderData> = {};

/**
 * Get zip code mappings
 */
export async function getZipMappings(): Promise<ZipMapping> {
  if (zipMappings) return zipMappings;

  const filePath = path.join(process.cwd(), 'data', 'zip-mappings.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  zipMappings = JSON.parse(fileContents);
  return zipMappings as ZipMapping;
}

/**
 * Look up location info by zip code
 */
export async function lookupZipCode(zipCode: string): Promise<LocationInfo | null> {
  const mappings = await getZipMappings();
  const location = mappings[zipCode];

  if (!location) return null;

  return {
    zip: zipCode,
    city: location.city,
    state: location.state,
    stateCode: location.stateCode,
    county: location.county
  };
}

/**
 * Get state policies
 */
export async function getStatePolicies(): Promise<Record<string, StatePolicy>> {
  if (statePolicies) return statePolicies;

  const filePath = path.join(process.cwd(), 'data', 'policies', 'state-policies.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  statePolicies = JSON.parse(fileContents);
  return statePolicies as Record<string, StatePolicy>;
}

/**
 * Get policy for a specific state
 */
export async function getStatePolicy(stateCode: string): Promise<StatePolicy | null> {
  const policies = await getStatePolicies();
  return policies[stateCode] || null;
}

/**
 * Load provider data for a specific state
 */
export async function getProvidersForState(stateCode: string): Promise<ProviderData | null> {
  // Check cache first
  if (providerCache[stateCode]) {
    return providerCache[stateCode];
  }

  // Map state codes to file names
  const stateFileMap: Record<string, string> = {
    'IL': 'illinois.json',
    'NY': 'new-york.json',
    'MA': 'massachusetts.json',
    'MN': 'minnesota.json'
  };

  const fileName = stateFileMap[stateCode];
  if (!fileName) return null;

  try {
    const filePath = path.join(process.cwd(), 'data', 'providers', fileName);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents) as ProviderData;

    // Cache the result
    providerCache[stateCode] = data;

    return data;
  } catch (error) {
    console.error(`Error loading providers for state ${stateCode}:`, error);
    return null;
  }
}

/**
 * Get providers by zip code
 */
export async function getProvidersByZipCode(zipCode: string): Promise<Provider[]> {
  const mappings = await getZipMappings();
  const location = mappings[zipCode];

  if (!location || !location.providers || location.providers.length === 0) {
    return [];
  }

  // Load provider data for the state
  const providerData = await getProvidersForState(location.stateCode);
  if (!providerData) return [];

  // Filter providers that serve this zip code
  const providers = providerData.providers.filter(provider =>
    location.providers.includes(provider.id)
  );

  return providers;
}

/**
 * Get a specific provider by ID
 */
export async function getProviderById(providerId: string, stateCode?: string): Promise<Provider | null> {
  // If state code is provided, only search that state
  if (stateCode) {
    const providerData = await getProvidersForState(stateCode);
    if (!providerData) return null;
    return providerData.providers.find(p => p.id === providerId) || null;
  }

  // Search all states
  const stateCodes = ['IL', 'NY', 'MA', 'MN'];
  for (const code of stateCodes) {
    const providerData = await getProvidersForState(code);
    if (!providerData) continue;

    const provider = providerData.providers.find(p => p.id === providerId);
    if (provider) return provider;
  }

  return null;
}

/**
 * Get all available states
 */
export function getAvailableStates(): { code: string; name: string }[] {
  return [
    { code: 'IL', name: 'Illinois' },
    { code: 'NY', name: 'New York' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MN', name: 'Minnesota' }
  ];
}

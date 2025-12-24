export interface Provider {
  id: string;
  name: string;
  logo?: string;
  states: string[];
  serviceAreas: {
    state: string;
    counties?: string[];
    zipCodes?: string[];
  }[];
  pricing: {
    discountRate: number;           // e.g., 10 = 10% savings off retail rate
    subscriptionFee?: number;        // Monthly subscription fee (if any)
    cancellationFee?: number;        // Fee to cancel contract
    contractLength?: number;         // Contract length in months (0 = no contract)
  };
  features: {
    noUpfrontCost: boolean;
    cancellableAnytime: boolean;
    renewablePercentage: number;     // % of renewable energy (typically 100)
  };
  contactInfo: {
    website: string;
    phone?: string;
    email?: string;
  };
  referralLink?: string;             // Optional referral/affiliate link
  promotion?: {
    description: string;             // e.g., "$200 bill credit"
    expiresAt?: string;              // ISO date string
  };
  lastUpdated: string;               // ISO date string
}

export interface ProviderData {
  state: string;
  stateCode: string;
  lastUpdated: string;
  providers: Provider[];
}

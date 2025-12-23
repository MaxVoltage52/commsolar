export interface StatePolicy {
  state: string;
  stateCode: string;
  hasLegislation: boolean;
  legislationType?: 'enabling' | 'pilot' | 'utility-specific';
  programName?: string;
  description: string;
  keyBenefits: string[];
  eligibility: {
    residentialAllowed: boolean;
    commercialAllowed: boolean;
    lowIncomePrograms: boolean;
  };
  marketSize?: {
    totalProjects: number;
    totalCapacityMW: number;
    subscriberCount?: number;
  };
  resources: {
    title: string;
    url: string;
  }[];
  lastUpdated: string;
}

export interface ZipMapping {
  [zipCode: string]: {
    state: string;
    stateCode: string;
    county?: string;
    city: string;
    providers: string[];             // Array of provider IDs
  };
}

export interface LocationInfo {
  zip: string;
  city: string;
  state: string;
  stateCode: string;
  county?: string;
}

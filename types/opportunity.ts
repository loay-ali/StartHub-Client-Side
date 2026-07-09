export interface InvestmentOpportunity {
  id: string;
  investorName: string;
  investorLogoUrl?: string;
  title: string;
  description: string;
  investmentAmount?: number;       // optional
  currency?: string;                // defaults to 'USD' when amount is present
  applicationDeadline?: string;     // ISO date string, optional
  eligibility: string[];
  contactEmail: string;
  industry?: string;
  createdAt: string;                // ISO date string
}

export type OpportunitySortKey = 'newest' | 'deadline' | 'amount';
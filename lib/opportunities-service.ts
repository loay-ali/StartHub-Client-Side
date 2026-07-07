export type OpportunityType = 'COMPETITION' | 'GRANT' | 'ACCELERATOR' | 'INVESTOR_EVENT';
export type OpportunityStatus = 'UPCOMING' | 'OPEN' | 'CLOSING_SOON' | 'CLOSED';

export interface Opportunity {
  id: string;
  title: string;
  type: OpportunityType;
  description?: string;
  deadline: string;
  status: OpportunityStatus;
  sourceUrl?: string;
  daysLeft: number;
}

interface FetchOpportunitiesParams {
  type?: OpportunityType;
  status?: OpportunityStatus;
}

// Points at the NestJS backend. Set NEXT_PUBLIC_API_URL in .env
// (works for both server and client fetches in the App Router).
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export async function fetchOpportunities(
  params: FetchOpportunitiesParams = {},
): Promise<Opportunity[]> {
  const query = new URLSearchParams();
  if (params.type) query.set('type', params.type);
  if (params.status) query.set('status', params.status);

  const res = await fetch(
    `${API_BASE}/event?${query.toString()}`,
    {
      credentials: 'include',
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to load opportunities');
  }

  return res.json();
}
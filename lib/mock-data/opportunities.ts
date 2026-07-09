import { InvestmentOpportunity } from '@/types/opportunity';

export const MOCK_OPPORTUNITIES: InvestmentOpportunity[] = [
  {
    id: 'opp-001',
    investorName: 'Delta Ventures',
    title: 'Pre-Seed Fund for AI-Native Startups',
    description:
      'Delta Ventures is backing early-stage founders building AI-first products with a clear path to defensibility. Rolling applications, decisions within 3 weeks.',
    investmentAmount: 150000,
    currency: 'USD',
    applicationDeadline: '2026-09-15',
    eligibility: ['Pre-seed or seed stage', 'AI/ML core product', 'At least one technical co-founder'],
    contactEmail: 'invest@deltaventures.io',
    industry: 'AI / SaaS',
    createdAt: '2026-06-01',
  },
  {
    id: 'opp-002',
    investorName: 'Nile Angels Network',
    title: 'MENA Founders Micro-Grant Program',
    description:
      'Non-dilutive micro-grants paired with mentorship for founders building for MENA markets. Open to first-time founders.',
    eligibility: ['Founder based in MENA', 'Company under 18 months old', 'Non-dilutive — no equity taken'],
    contactEmail: 'grants@nileangels.co',
    industry: 'Cross-industry',
    createdAt: '2026-05-20',
    applicationDeadline: '2026-08-01',
  },
  {
    id: 'opp-003',
    investorName: 'Horizon Capital Partners',
    title: 'Series A Growth Fund',
    description:
      'Horizon backs startups with proven product-market fit ready to scale go-to-market. Check sizes flex based on traction.',
    investmentAmount: 2000000,
    currency: 'USD',
    eligibility: ['$50k+ MRR', 'Existing institutional backing', '12+ months of retention data'],
    contactEmail: 'deals@horizoncp.com',
    industry: 'B2B SaaS',
    createdAt: '2026-04-11',
  },
  {
    id: 'opp-004',
    investorName: 'GreenPath Impact Fund',
    title: 'Climate & Sustainability Seed Round',
    description:
      'Backing founders solving climate and sustainability problems with scalable business models.',
    investmentAmount: 300000,
    currency: 'USD',
    applicationDeadline: '2026-07-30',
    eligibility: ['Climate/sustainability focus', 'Seed stage', 'Measurable environmental impact metric'],
    contactEmail: 'apply@greenpathfund.com',
    industry: 'Climate Tech',
    createdAt: '2026-06-18',
  },
  {
    id: 'opp-005',
    investorName: 'Founders Bridge Syndicate',
    title: 'First Check for Solo Founders',
    description:
      'A syndicate of operators writing first checks specifically for solo founders often overlooked by traditional VC.',
    investmentAmount: 75000,
    currency: 'USD',
    eligibility: ['Solo founder', 'Pre-seed', 'Working product or prototype'],
    contactEmail: 'hello@foundersbridge.vc',
    industry: 'Cross-industry',
    createdAt: '2026-03-29',
  },
  {
    id: 'opp-006',
    investorName: 'Atlas Fintech Fund',
    title: 'Fintech Infrastructure Bet',
    description:
      'Atlas invests in the picks-and-shovels layer of fintech — payments rails, compliance tooling, and embedded finance infra.',
    investmentAmount: 500000,
    currency: 'USD',
    applicationDeadline: '2026-10-01',
    eligibility: ['Fintech infrastructure product', 'Regulatory readiness plan', 'Seed to Series A'],
    contactEmail: 'team@atlasfintechfund.com',
    industry: 'Fintech',
    createdAt: '2026-06-25',
  },
];
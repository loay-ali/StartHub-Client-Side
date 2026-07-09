// lib/seed-opportunities.ts

import { Opportunity } from "@/lib/opportunities-service";

export const seedOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Cairo Fintech Hackathon",
    type: "COMPETITION",
    description:
      "Weekend hackathon for early-stage fintech ideas, top 3 teams get seed funding.",
    deadline: new Date(Date.now() + 4 * 86400000).toISOString(),
    status: "OPEN",
    sourceUrl: "https://example.com/cairo-fintech-hackathon",
    daysLeft: 4,
  },
  {
    id: "2",
    title: "MIT Global Startup Pitch",
    type: "COMPETITION",
    description: "Global pitch competition, $50k top prize, no equity taken.",
    deadline: new Date(Date.now() + 12 * 86400000).toISOString(),
    status: "OPEN",
    sourceUrl: "https://example.com/mit-global-pitch",
    daysLeft: 12,
  },
  {
    id: "3",
    title: "EU Deep Tech Grant Round 4",
    type: "GRANT",
    description:
      "Non-dilutive funding up to €200k for deep tech startups.",
    deadline: new Date(Date.now() + 20 * 86400000).toISOString(),
    status: "OPEN",
    sourceUrl: "https://example.com/eu-deeptech-grant",
    daysLeft: 20,
  },
  {
    id: "4",
    title: "World Bank SME Innovation Fund",
    type: "GRANT",
    description:
      "Funding for innovative SMEs in emerging markets.",
    deadline: new Date(Date.now() + 45 * 86400000).toISOString(),
    status: "UPCOMING",
    sourceUrl: "https://example.com/world-bank-sme-fund",
    daysLeft: 45,
  },
  {
    id: "5",
    title: "Y Combinator Fall Batch",
    type: "ACCELERATOR",
    description: "Applications now open.",
    deadline: new Date(Date.now() + 35 * 86400000).toISOString(),
    status: "UPCOMING",
    sourceUrl: "https://example.com/yc-fall-batch",
    daysLeft: 35,
  },
  {
    id: "6",
    title: "Techstars MENA Cohort",
    type: "ACCELERATOR",
    description: "3-month accelerator program.",
    deadline: new Date(Date.now() + 60 * 86400000).toISOString(),
    status: "UPCOMING",
    sourceUrl: "https://example.com/techstars-mena",
    daysLeft: 60,
  },
  {
    id: "7",
    title: "Cairo Angels Demo Night",
    type: "INVESTOR_EVENT",
    description: "Investor showcase.",
    deadline: new Date(Date.now() + 9 * 86400000).toISOString(),
    status: "OPEN",
    sourceUrl: "https://example.com/cairo-angels-demo-night",
    daysLeft: 9,
  },
  {
    id: "8",
    title: "Seedstars World Regional Final",
    type: "COMPETITION",
    description: "Regional final results announced.",
    deadline: new Date(Date.now() - 14 * 86400000).toISOString(),
    status: "CLOSED",
    sourceUrl: "https://example.com/seedstars-regional-final",
    daysLeft: 0,
  },
];
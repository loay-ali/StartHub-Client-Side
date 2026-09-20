// ─── Investor Platform Stats ────────────────────────────────────────────
// Plain data, deliberately separate from the components that render it,
// so every number below can be swapped for a live API/query result later
// without touching InvestorAuthSlider or InvestorPaymentPage.

export interface PlatformStat {
  key: string;
  label: string;
  value: number;
  suffix?: string;
}

// Shown on the investor Login / Register slider.
export const investorAuthStats: PlatformStat[] = [
  { key: "verifiedStartups", label: "Verified Startups", value: 1240, suffix: "+" },
  { key: "investors", label: "Investors", value: 380, suffix: "+" },
  { key: "matches", label: "Matches", value: 2150, suffix: "+" },
  { key: "aiInsights", label: "AI Insights Delivered", value: 9600, suffix: "+" },
];

// Shown on the Investor Payment / membership page.
export const investorPaymentStats: PlatformStat[] = [
  { key: "registeredStartups", label: "Registered Startups", value: 1240, suffix: "+" },
  { key: "activeInvestors", label: "Active Investors", value: 380, suffix: "+" },
  { key: "investmentMatches", label: "Investment Matches", value: 2150, suffix: "+" },
  { key: "successRate", label: "Success Rate", value: 94, suffix: "%" },
];
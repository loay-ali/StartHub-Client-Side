// ─── Investor Membership Plan ───────────────────────────────────────────
// Plain data for the single investor membership plan, kept separate from
// InvestorPaymentPage so price/features/copy can be swapped for a real
// GET /subscriptions/plans?audience=investor response later without
// touching the page markup. There is intentionally only one plan here —
// the payment page has no plan-selection UI.

export interface InvestorPlanFeature {
  key: string;
  label: string;
}

export interface InvestorPlan {
  name: string;
  currency: string;
  price: number;
  billingPeriod: string;
  description: string;
  features: InvestorPlanFeature[];
  note: string;
}

export const investorPlan: InvestorPlan = {
  name: "StarHub Investor Membership",
  currency: "$",
  price: 199,
  billingPeriod: "/month",
  description:
    "One membership, full access to StarHub's investor experience — no tiers, no upsells.",
  features: [
    { key: "deal-flow", label: "AI-matched deal flow tailored to your mandate" },
    { key: "verified", label: "Access to every verified, vetted startup profile" },
    { key: "messaging", label: "Direct messaging with founders once there's mutual interest" },
    { key: "portfolio", label: "Portfolio dashboard with AI-generated momentum signals" },
    { key: "priority-support", label: "Priority support from the StarHub team" },
  ],
  note: "Cancel anytime — no long-term contract.",
};
// ─── Ecosystem Metrics ──────────────────────────────────────────────────
// Single source of truth for every ecosystem-wide number shown on the
// Ecosystem page (hero stat strip + MetricsSection grid). Values below
// are realistic placeholders — swap the array for a fetch/query result
// later without touching any component that consumes it.

export interface EcosystemStat {
  key: "organizations" | "startups" | "investors" | "partnerships" | "matches";
  label: string;
  value: number;
  suffix?: string;
}

export const ecosystemStats: EcosystemStat[] = [
  { key: "organizations", label: "Organizations", value: 480, suffix: "+" },
  { key: "startups", label: "Startups", value: 1240, suffix: "+" },
  { key: "investors", label: "Investors", value: 380, suffix: "+" },
  { key: "partnerships", label: "Partnerships", value: 210, suffix: "+" },
  { key: "matches", label: "Matches", value: 2150, suffix: "+" },
];
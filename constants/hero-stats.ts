import { ecosystemStats, type EcosystemStat } from "./ecosystem-stats";

// The hero surfaces 4 key ecosystem metrics — startups, investors,
// partnerships, and matches — pulled from the single source of truth in
// constants/ecosystem-stats.ts so the sections stay synchronized.
const byKey = (key: EcosystemStat["key"]) =>
  ecosystemStats.find((stat) => stat.key === key) as EcosystemStat;

export const heroStats: EcosystemStat[] = [
  byKey("startups"),
  byKey("investors"),
  byKey("partnerships"),
  byKey("matches"),
];


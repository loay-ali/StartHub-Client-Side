import { ecosystemStats, type EcosystemStat } from "./ecosystem-stats";

// The hero only surfaces 3 of the 5 ecosystem metrics — startups,
// investors, and matches — since those are what a first-time visitor
// cares about most. Pulled from the single source of truth in
// constants/ecosystem-stats.ts so the two sections never disagree.
const byKey = (key: EcosystemStat["key"]) =>
  ecosystemStats.find((stat) => stat.key === key) as EcosystemStat;

export const heroStats: EcosystemStat[] = [
  byKey("startups"),
  byKey("investors"),
  byKey("matches"),
];

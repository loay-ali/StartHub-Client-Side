"use client";

import InvestorSearchFilters from "./InvestorSearchFilters";
import StartupCard from "./StartupCard";

const startups = [
  {
    companyName: "TechNova",
    industry: "Technology",
    description:
      "AI-powered platform helping startups optimize business operations and fundraising.",
    budget: "$500K",
    score: 92,
    stage: "Seed",
  },
  {
    companyName: "GreenEnergy",
    industry: "Energy",
    description:
      "Renewable energy startup focused on sustainable battery technologies.",
    budget: "$1.2M",
    score: 88,
    stage: "Series A",
  },
  {
    companyName: "HealthAI",
    industry: "Healthcare",
    description:
      "AI healthcare diagnostics platform for hospitals and clinics.",
    budget: "$750K",
    score: 95,
    stage: "Growth",
  },
  {
    companyName: "FinPay",
    industry: "Finance",
    description: "Digital payment infrastructure for emerging markets.",
    budget: "$300K",
    score: 84,
    stage: "MVP",
  },
];

export default function InvestorSearchPage() {
  return (
    <div className="mx-auto max-w-[1800px]">
      {/* Hero */}
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-teal-600 to-teal-700 p-10 text-white shadow-xl">
        <h1 className="text-5xl font-extrabold">Discover Startups</h1>

        <p className="mt-4 max-w-3xl text-xl text-teal-100">
          Find promising startups based on industry, budget, business model, and
          investment stage.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[350px_1fr]">
        {/* Filters */}
        <div>
          <InvestorSearchFilters />
        </div>

        {/* Results */}
        <div>
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Search Results</h2>

              <p className="mt-2 text-gray-500">
                {startups.length} startups found
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
            {startups.map((startup) => (
              <StartupCard
                key={startup.companyName}
                companyName={startup.companyName}
                industry={startup.industry}
                description={startup.description}
                budget={startup.budget}
                score={startup.score}
                stage={startup.stage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

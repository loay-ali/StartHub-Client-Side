"use client";

import OpportunityCard from "./OpportunityCard";
import OpportunitySortBar from "./OpportunitySortBar";
import Pagination from "../company/Pagination";
import Link from "next/link";
import { Plus } from "lucide-react";

const opportunities = [
  {
    id: 1,
    title: "Seed Investment Opportunity",
    industry: "Technology",
    budget: 250000,
    deadline: "30 Aug 2026",
    status: "Open" as const,
  },
  {
    id: 2,
    title: "Healthcare Startup Funding",
    industry: "Healthcare",
    budget: 500000,
    deadline: "15 Sep 2026",
    status: "Draft" as const,
  },
  {
    id: 3,
    title: "FinTech Expansion",
    industry: "Finance",
    budget: 1000000,
    deadline: "20 Oct 2026",
    status: "Closed" as const,
  },
];

export default function OpportunityList() {
  return (
    <section className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <OpportunitySortBar totalOpportunities={opportunities.length} />

        <Link
          href="/dashboard/investor/opportunities/add"
          className="flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-800"
        >
          <Plus size={18} />
          Add Opportunity
        </Link>
      </div>

      {/* Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>

      {/* Pagination */}

      <Pagination currentPage={1} totalPages={3} />
    </section>
  );
}

"use client";

import { ArrowUpDown } from "lucide-react";

interface OpportunitySortBarProps {
  totalOpportunities: number;
}

export default function OpportunitySortBar({
  totalOpportunities,
}: OpportunitySortBarProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      {/* Left */}

      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Investment Opportunities
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {totalOpportunities} Opportunities Found
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-3">
        <ArrowUpDown size={18} className="text-slate-500" />

        <select className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100">
          <option>Newest</option>

          <option>Oldest</option>

          <option>Budget (Low → High)</option>

          <option>Budget (High → Low)</option>

          <option>Open</option>

          <option>Closed</option>

          <option>Draft</option>
        </select>
      </div>
    </div>
  );
}

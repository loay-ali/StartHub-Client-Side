"use client";

import { ArrowUpDown } from "lucide-react";

interface CompanySortBarProps {
  totalCompanies: number;
}

export default function CompanySortBar({
  totalCompanies,
}: CompanySortBarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      {/* Results */}

      <div>
        <h2 className="text-lg font-semibold text-slate-900">Companies</h2>

        <p className="mt-1 text-sm text-slate-500">
          {totalCompanies} Companies Found
        </p>
      </div>

      {/* Sort */}

      <div className="flex items-center gap-3">
        <ArrowUpDown size={18} className="text-slate-500" />

        <select className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100">
          <option>Newest</option>
          <option>Oldest</option>
          <option>Budget (Low → High)</option>
          <option>Budget (High → Low)</option>
          <option>Company Name (A-Z)</option>
          <option>Company Name (Z-A)</option>
        </select>
      </div>
    </div>
  );
}

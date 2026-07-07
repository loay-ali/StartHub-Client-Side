"use client";

import { ArrowUpDown } from "lucide-react";

interface FavouriteSortBarProps {
  totalCompanies: number;
}

export default function FavouriteSortBar({
  totalCompanies,
}: FavouriteSortBarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Favourite Companies
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {totalCompanies} Saved Companies
        </p>
      </div>

      <div className="flex items-center gap-3">
        <ArrowUpDown size={18} className="text-slate-500" />

        <select className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100">
          <option>Newest</option>

          <option>Oldest</option>

          <option>Company Name (A-Z)</option>

          <option>Company Name (Z-A)</option>
        </select>
      </div>
    </div>
  );
}

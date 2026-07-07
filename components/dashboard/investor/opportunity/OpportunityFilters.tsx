"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function OpportunityFilters() {
  const [keyword, setKeyword] = useState("");
  const [budget, setBudget] = useState("");
  const [industry, setIndustry] = useState("");

  const clearFilters = () => {
    setKeyword("");
    setBudget("");
    setIndustry("");
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Investment Opportunities
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your published investment opportunities.
        </p>
      </div>

      {/* Filters */}

      <div className="flex flex-wrap items-center gap-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search opportunities..."
          className="h-12 flex-1 min-w-[260px] rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-teal-700 focus:bg-white focus:ring-2 focus:ring-teal-100"
        />

        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Budget"
          className="h-12 w-48 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-teal-700 focus:bg-white focus:ring-2 focus:ring-teal-100"
        />

        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="h-12 w-52 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-teal-700 focus:bg-white focus:ring-2 focus:ring-teal-100"
        >
          <option value="">Industry</option>
          <option>Technology</option>
          <option>Healthcare</option>
          <option>Finance</option>
          <option>Education</option>
          <option>E-Commerce</option>
        </select>

        <button
          onClick={clearFilters}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <X size={18} />
          Clear
        </button>

        <button className="h-12 rounded-xl bg-teal-700 px-8 text-sm font-semibold text-white transition hover:bg-teal-800">
          Apply
        </button>
      </div>
    </section>
  );
}

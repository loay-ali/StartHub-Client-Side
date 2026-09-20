"use client";

import {
  FiDollarSign,
  FiSearch,
  FiTrendingUp,
  FiBriefcase,
} from "react-icons/fi";

export default function InvestorSearchFilters() {
  return (
    <div className="space-y-6">
      {/* Budget */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <FiDollarSign size={22} className="text-teal-700" />

          <h2 className="text-xl font-bold">Investment Budget</h2>
        </div>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Min Budget"
            className="
              w-full
              rounded-xl
              border
              p-4
              outline-none
              focus:border-teal-600
            "
          />

          <input
            type="number"
            placeholder="Max Budget"
            className="
              w-full
              rounded-xl
              border
              p-4
              outline-none
              focus:border-teal-600
            "
          />
        </div>
      </div>

      {/* Industry */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <FiBriefcase size={22} className="text-teal-700" />

          <h2 className="text-xl font-bold">Industry</h2>
        </div>

        <select
          className="
            w-full
            rounded-xl
            border
            p-4
            outline-none
            focus:border-teal-600
          "
        >
          <option>All Industries</option>
          <option>Technology</option>
          <option>Healthcare</option>
          <option>Finance</option>
          <option>Education</option>
          <option>Energy</option>
        </select>
      </div>

      {/* BMC */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <FiTrendingUp size={22} className="text-teal-700" />

          <h2 className="text-xl font-bold">BMC Score</h2>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          defaultValue="70"
          className="w-full"
        />

        <div className="mt-3 text-center text-gray-500">70+</div>
      </div>

      {/* Keywords */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <FiSearch size={22} className="text-teal-700" />

          <h2 className="text-xl font-bold">Keywords</h2>
        </div>

        <input
          type="text"
          placeholder="AI, SaaS, FinTech..."
          className="
            w-full
            rounded-xl
            border
            p-4
            outline-none
            focus:border-teal-600
          "
        />
      </div>

      {/* Stage */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-bold">Startup Stage</h2>

        <div className="space-y-3">
          <label className="flex gap-3">
            <input type="checkbox" />
            Idea
          </label>

          <label className="flex gap-3">
            <input type="checkbox" />
            MVP
          </label>

          <label className="flex gap-3">
            <input type="checkbox" />
            Seed
          </label>

          <label className="flex gap-3">
            <input type="checkbox" />
            Series A
          </label>

          <label className="flex gap-3">
            <input type="checkbox" />
            Growth
          </label>
        </div>
      </div>

      {/* Search Button */}
      <button
        className="
          w-full
          rounded-2xl
          bg-teal-700
          py-4
          text-lg
          font-semibold
          text-white
          transition
          hover:bg-teal-800
        "
      >
        Search Startups
      </button>
    </div>
  );
}

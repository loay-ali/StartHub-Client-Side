"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bot, ChevronDown, X, Check } from "lucide-react";

const industries = [
  "Technology",
  "Healthcare",
  "Education",
  "Finance",
  "E-Commerce",
  "Real Estate",
  "Marketing",
  "Food",
];

export default function CompanyFilters() {
  const [keyword, setKeyword] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");

  const [openIndustry, setOpenIndustry] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenIndustry(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const clearFilters = () => {
    setKeyword("");
    setMinBudget("");
    setMaxBudget("");
    setDate("");
    setLocation("");
    setIndustry("");
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Search Companies</h1>

        <p className="mt-2 text-slate-500">
          Discover startups matching your investment interests.
        </p>
      </div>

      {/* Search */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by company name..."
            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-5 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
          />
        </div>

        <button className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-teal-700 px-8 font-medium text-white transition hover:bg-teal-800">
          <Bot size={20} />
          AI Search
        </button>
      </div>

      {/* Filters */}

      <div className="flex flex-wrap gap-4">
        <input
          type="number"
          value={minBudget}
          onChange={(e) => setMinBudget(e.target.value)}
          placeholder="Min Budget"
          className="h-12 w-44 rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
        />

        <input
          type="number"
          value={maxBudget}
          onChange={(e) => setMaxBudget(e.target.value)}
          placeholder="Max Budget"
          className="h-12 w-44 rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-12 w-44 rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
        />

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="h-12 w-44 rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
        />

        {/* Industry Dropdown */}

        <div className="relative w-56" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpenIndustry(!openIndustry)}
            className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 transition hover:bg-white"
          >
            <span className={industry ? "text-slate-800" : "text-slate-400"}>
              {industry || "Industry"}
            </span>

            <ChevronDown
              size={18}
              className={`transition ${openIndustry ? "rotate-180" : ""}`}
            />
          </button>

          {openIndustry && (
            <div className="absolute left-0 top-14 z-50 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
              {industries.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setIndustry(item);
                    setOpenIndustry(false);
                  }}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-slate-100"
                >
                  {item}

                  {industry === item && (
                    <Check size={16} className="text-teal-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Actions */}
        <div className="ml-auto flex gap-3">
          <button
            type="button"
            onClick={clearFilters}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            <X size={16} />
            Clear
          </button>

          <button
            type="button"
            className="h-12 rounded-xl bg-teal-700 px-8 text-sm font-medium text-white transition hover:bg-teal-800"
          >
            Apply
          </button>
        </div>
      </div>
    </section>
  );
}

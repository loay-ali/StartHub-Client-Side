"use client";

import { useState } from "react";
import { Calendar, Search, X } from "lucide-react";

export default function EventFilters() {
  const [eventDate, setEventDate] = useState("");
  const [organizer, setOrganizer] = useState("");

  const clearFilters = () => {
    setEventDate("");
    setOrganizer("");
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Events</h1>

        <p className="mt-1 text-sm text-slate-500">
          Explore upcoming investment events and networking opportunities.
        </p>
      </div>

      {/* Filters */}

      <div className="flex flex-wrap items-end gap-4">
        {/* Date */}

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-slate-700">
            Event Date
          </label>

          <div className="relative">
            <Calendar
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="h-11 w-56 rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-teal-700 focus:bg-white focus:ring-2 focus:ring-teal-100"
            />
          </div>
        </div>

        {/* Organizer */}

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-slate-700">
            Organizer
          </label>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              placeholder="Company name..."
              className="h-11 w-64 rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-teal-700 focus:bg-white focus:ring-2 focus:ring-teal-100"
            />
          </div>
        </div>

        {/* Actions */}

        <div className="ml-auto flex gap-3">
          <button
            onClick={clearFilters}
            className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            <X size={16} />
            Clear
          </button>

          <button className="h-11 rounded-xl bg-teal-700 px-6 text-sm font-medium text-white transition hover:bg-teal-800">
            Apply
          </button>
        </div>
      </div>
    </section>
  );
}

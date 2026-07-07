"use client";

import { ArrowUpDown } from "lucide-react";

interface EventSortBarProps {
  totalEvents: number;
}

export default function EventSortBar({ totalEvents }: EventSortBarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      {/* Left */}

      <div>
        <h2 className="text-lg font-semibold text-slate-900">Events</h2>

        <p className="mt-1 text-sm text-slate-500">
          {totalEvents} Events Found
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-3">
        <ArrowUpDown size={18} className="text-slate-500" />

        <select className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100">
          <option>Newest</option>
          <option>Oldest</option>
          <option>Incoming</option>
          <option>Finished</option>
          <option>Postponed</option>
          <option>Organizer (A-Z)</option>
        </select>
      </div>
    </div>
  );
}

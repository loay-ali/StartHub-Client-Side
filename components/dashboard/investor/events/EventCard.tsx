"use client";

import Link from "next/link";
import { CalendarDays, MapPin, Building2, ArrowRight } from "lucide-react";

interface EventCardProps {
  event: {
    id: number;
    title: string;
    location: string;
    organizer: string;
    startDate: string;
    endDate?: string;
    status: "Incoming" | "Finished" | "Postponed";
  };
}

export default function EventCard({ event }: EventCardProps) {
  const statusStyle = {
    Incoming: "bg-emerald-100 text-emerald-700",
    Finished: "bg-slate-200 text-slate-700",
    Postponed: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg">
      {/* Header */}

      <div className="flex items-start justify-between p-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {event.title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">{event.organizer}</p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle[event.status]}`}
        >
          {event.status}
        </span>
      </div>

      <div className="border-t border-slate-100" />

      {/* Body */}

      <div className="space-y-4 p-5">
        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="text-teal-700" />

          <div>
            <p className="text-xs text-slate-500">Event Date</p>

            <p className="text-sm font-medium text-slate-900">
              {event.startDate}
            </p>
          </div>
        </div>

        {event.endDate && (
          <div className="flex items-center gap-3">
            <CalendarDays size={18} className="text-teal-700" />

            <div>
              <p className="text-xs text-slate-500">End Date</p>

              <p className="text-sm font-medium text-slate-900">
                {event.endDate}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <MapPin size={18} className="text-teal-700" />

          <div>
            <p className="text-xs text-slate-500">Location</p>

            <p className="text-sm font-medium text-slate-900">
              {event.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Building2 size={18} className="text-teal-700" />

          <div>
            <p className="text-xs text-slate-500">Organizer</p>

            <p className="text-sm font-medium text-slate-900">
              {event.organizer}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="border-t border-slate-100 p-5">
        <Link
          href={`/dashboard/investor/events/${event.id}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-teal-700 py-3 text-sm font-medium text-white transition hover:bg-teal-800"
        >
          View Details
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

"use client";

import { CalendarDays, MapPin, Building2, Clock3 } from "lucide-react";

export default function EventDetails() {
  const event = {
    title: "Startup Investment Summit",
    status: "Incoming",
    location: "Cairo, Egypt",
    organizer: "TechNova",
    startDate: "15 Jul 2026",
    endDate: "16 Jul 2026",
    description:
      "The Startup Investment Summit brings together investors, entrepreneurs, startups, business leaders, and innovators to discover investment opportunities and build valuable partnerships.",
    organizerEmail: "contact@technova.com",
  };

  const statusStyle = {
    Incoming: "bg-emerald-100 text-emerald-700",
    Finished: "bg-slate-200 text-slate-700",
    Postponed: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Hero */}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-500 px-8 py-8 text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold">{event.title}</h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-teal-50">
                Connect with startups, investors and entrepreneurs to explore
                new investment opportunities, networking, and business growth.
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${statusStyle[event.status as keyof typeof statusStyle]}`}
            >
              {event.status}
            </span>
          </div>
        </div>
      </section>

      {/* Information Cards */}

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {/* Location */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
            <MapPin size={18} className="text-teal-700" />
          </div>

          <p className="text-xs text-slate-500">Location</p>

          <h3 className="mt-2 text-base font-semibold text-slate-900">
            {event.location}
          </h3>
        </div>

        {/* Start Date */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
            <CalendarDays size={18} className="text-teal-700" />
          </div>

          <p className="text-xs text-slate-500">Start Date</p>

          <h3 className="mt-2 text-base font-semibold text-slate-900">
            {event.startDate}
          </h3>
        </div>
        {/* End Date */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
            <Clock3 size={18} className="text-teal-700" />
          </div>

          <p className="text-xs text-slate-500">End Date</p>

          <h3 className="mt-2 text-base font-semibold text-slate-900">
            {event.endDate}
          </h3>
        </div>

        {/* Organizer */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
            <Building2 size={18} className="text-teal-700" />
          </div>

          <p className="text-xs text-slate-500">Organizer</p>

          <h3 className="mt-2 text-base font-semibold text-slate-900">
            {event.organizer}
          </h3>
        </div>
      </section>

      {/* About Event */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
            <CalendarDays size={18} className="text-teal-700" />
          </div>

          <h2 className="text-lg font-semibold text-slate-900">About Event</h2>
        </div>

        <p className="text-sm leading-7 text-slate-600">{event.description}</p>
      </section>
      {/* Organizer */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Event Organizer
          </h2>

          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
            Organizer
          </span>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Avatar */}

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-500 text-2xl font-bold text-white shadow-sm">
            {event.organizer.charAt(0)}
          </div>

          {/* Info */}

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">
              {event.organizer}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Official Event Organizer
            </p>

            <p className="mt-3 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {event.organizerEmail}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

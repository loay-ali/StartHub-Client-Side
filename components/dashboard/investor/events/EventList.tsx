"use client";

import EventCard from "./EventCard";
import EventSortBar from "./EventSortBar";
import Pagination from "../company/Pagination";

const events = [
  {
    id: 1,
    title: "Startup Investment Summit",
    location: "Cairo, Egypt",
    organizer: "TechNova",
    startDate: "15 Jul 2026",
    endDate: "16 Jul 2026",
    status: "Incoming" as const,
  },
  {
    id: 2,
    title: "AI Innovation Conference",
    location: "Alexandria, Egypt",
    organizer: "Future AI",
    startDate: "20 Aug 2026",
    endDate: "21 Aug 2026",
    status: "Incoming" as const,
  },
  {
    id: 3,
    title: "FinTech Meetup",
    location: "Dubai, UAE",
    organizer: "FinEdge",
    startDate: "10 Jun 2026",
    endDate: "11 Jun 2026",
    status: "Finished" as const,
  },
  {
    id: 4,
    title: "Healthcare Expo",
    location: "Riyadh, Saudi Arabia",
    organizer: "HealthPlus",
    startDate: "28 Sep 2026",
    status: "Postponed" as const,
  },
];

export default function EventList() {
  return (
    <section className="space-y-6">
      <EventSortBar totalEvents={events.length} />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <Pagination currentPage={1} totalPages={4} />
    </section>
  );
}

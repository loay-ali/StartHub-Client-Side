'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, List } from 'lucide-react';
import EventCard from '@/components/ecosystem/events/EventCard';
import EventsCalendar from '@/components/ecosystem/events/EventsCalendar';
import { MOCK_EVENTS } from '@/lib/mock-data/events';

const VIEW_OPTIONS = [
  { value: 'calendar', label: 'Calendar', icon: CalendarDays },
  { value: 'list', label: 'List', icon: List },
] as const;

type ViewMode = (typeof VIEW_OPTIONS)[number]['value'];

export default function EventsPage() {
  const [view, setView] = useState<ViewMode>('calendar');
  const events = useMemo(
    () => [...MOCK_EVENTS].sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()),
    [],
  );

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold text-[#14b8a6] uppercase tracking-wide mb-2">Ecosystem</p>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">
            Events
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Startup programs, investor sessions, and ecosystem briefings open to the StarHub community.
          </p>
        </div>

        <div className="flex w-full sm:w-auto bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 shadow-sm">
          {VIEW_OPTIONS.map((option) => {
            const Icon = option.icon;
            const active = view === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setView(option.value)}
                aria-pressed={active}
                className={`relative flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap ${
                  active
                    ? 'text-[#14b8a6]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeEventsView"
                    className="absolute inset-0 rounded-xl bg-white dark:bg-slate-950 shadow-sm border border-slate-200/50 dark:border-slate-800/60"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <Icon size={14} className="relative z-10" />
                <span className="relative z-10">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'calendar' ? (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <EventsCalendar events={events} />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
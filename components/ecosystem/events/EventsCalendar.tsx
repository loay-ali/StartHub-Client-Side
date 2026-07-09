'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { EcosystemEvent } from '@/types/event';

interface EventsCalendarProps {
  events: EcosystemEvent[];
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function EventsCalendar({ events }: EventsCalendarProps) {
  const pathname = usePathname();
  const localePrefix = pathname.match(/^\/(ar|en|fr)/)?.[0] || '';
  const [openDateKey, setOpenDateKey] = useState<string | null>(null);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const firstEventDate = events[0] ? new Date(events[0].startsAt) : new Date();
    return startOfMonth(firstEventDate);
  });
  const todayKey = useMemo(() => formatDateKey(new Date()), []);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, EcosystemEvent[]>();
    events.forEach((event) => {
      const key = formatDateKey(new Date(event.startsAt));
      const current = map.get(key) ?? [];
      map.set(key, [...current, event]);
    });
    map.forEach((dayEvents) => {
      dayEvents.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
    });
    return map;
  }, [events]);

  const monthCells = useMemo(() => getMonthCells(visibleMonth), [visibleMonth]);
  const monthLabel = visibleMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm shadow-slate-900/5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <p className="text-xs font-semibold text-[#14b8a6] uppercase tracking-wide">Calendar View</p>
          <h2 id="events-calendar-heading" className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
            {monthLabel}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOpenDateKey(null);
              setVisibleMonth((month) => addMonths(month, -1));
            }}
            aria-label="Previous month"
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => {
              setOpenDateKey(null);
              setVisibleMonth((month) => addMonths(month, 1));
            }}
            aria-label="Next month"
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div role="grid" aria-labelledby="events-calendar-heading" className="p-3 sm:p-4">
        <div className="grid grid-cols-7 gap-1.5 mb-1.5" role="row">
          {WEEKDAYS.map((weekday) => (
            <div key={weekday} role="columnheader" className="py-2 text-center text-[11px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {weekday}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5" role="rowgroup">
          {monthCells.map((date, index) => {
            if (!date) {
              return (
                <div
                  key={`empty-${index}`}
                  role="gridcell"
                  className="min-h-[76px] sm:min-h-[104px] rounded-xl bg-slate-50/60 dark:bg-slate-900/35"
                />
              );
            }

            const key = formatDateKey(date);
            const dayEvents = eventsByDate.get(key) ?? [];
            const hasEvents = dayEvents.length > 0;
            const isOpen = openDateKey === key;
            const isToday = key === todayKey;
            const alignEnd = index % 7 > 4;
            const eventCountLabel = `${dayEvents.length} ${dayEvents.length === 1 ? 'event' : 'events'}`;

            return (
              <div key={key} role="gridcell" className="relative min-h-[76px] sm:min-h-[104px]">
                {hasEvents ? (
                  <div
                    className="relative h-full"
                    onMouseEnter={() => setOpenDateKey(key)}
                    onMouseLeave={() => setOpenDateKey((current) => (current === key ? null : current))}
                    onFocusCapture={() => setOpenDateKey(key)}
                    onBlurCapture={(event) => {
                      const nextFocusedElement = event.relatedTarget instanceof Node ? event.relatedTarget : null;
                      if (!event.currentTarget.contains(nextFocusedElement)) setOpenDateKey(null);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') setOpenDateKey(null);
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDateKey((current) => (current === key ? null : key))}
                      aria-haspopup="dialog"
                      aria-expanded={isOpen}
                      aria-label={`${date.getDate()}, ${eventCountLabel}`}
                      className={`h-full w-full rounded-xl border p-2 text-start transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14b8a6] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                        isToday
                          ? 'border-[#14b8a6]/60 bg-teal-50 dark:bg-teal-950/25'
                          : 'border-teal-200/80 dark:border-teal-900/60 bg-teal-50/70 dark:bg-teal-950/20 hover:bg-teal-50 dark:hover:bg-teal-950/35'
                      }`}
                    >
                      <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{date.getDate()}</span>
                      <span className="mt-2 flex flex-wrap gap-1" aria-hidden="true">
                        {dayEvents.slice(0, 3).map((event) => (
                          <span key={event.id} className="h-1.5 w-1.5 rounded-full bg-[#14b8a6]" />
                        ))}
                        {dayEvents.length > 3 && <span className="text-[10px] font-bold text-[#14b8a6]">+{dayEvents.length - 3}</span>}
                      </span>
                      <span className="mt-1 block text-[11px] font-semibold text-[#0f766e] dark:text-[#5eead4]">
                        {eventCountLabel}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.98 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          role="dialog"
                          aria-label={`Events on ${date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}`}
                          className={`absolute ${alignEnd ? 'end-0' : 'start-0'} top-[calc(100%+8px)] z-30 w-72 max-w-[calc(100vw-3rem)] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-xl shadow-slate-900/15 p-2`}
                        >
                          <div className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                            {eventCountLabel}
                          </div>
                          <div className="space-y-1">
                            {dayEvents.map((event) => (
                              <Link
                                key={event.id}
                                href={`${localePrefix}/ecosystem/events/${event.id}`}
                                className="block rounded-xl px-3 py-2 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14b8a6]"
                              >
                                <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-2">
                                  {event.eventName}
                                </span>
                                <span className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                  <Clock size={12} />
                                  {formatEventTime(event.startsAt)}
                                </span>
                                <span className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                  <MapPin size={12} />
                                  <span className="truncate">{event.location}</span>
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <time
                    dateTime={key}
                    className={`block h-full rounded-xl border border-slate-100 dark:border-slate-800 p-2 text-sm font-semibold ${
                      isToday
                        ? 'text-[#14b8a6] bg-teal-50/60 dark:bg-teal-950/20'
                        : 'text-slate-400 dark:text-slate-600 bg-slate-50/60 dark:bg-slate-900/35'
                    }`}
                  >
                    {date.getDate()}
                  </time>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function getMonthCells(month: Date) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const leadingEmptyCells = firstDay.getDay();
  const totalCells = Math.ceil((leadingEmptyCells + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const day = index - leadingEmptyCells + 1;
    if (day < 1 || day > daysInMonth) return null;
    return new Date(year, monthIndex, day);
  });
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatEventTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}
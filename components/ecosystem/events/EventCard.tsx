'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import { EcosystemEvent } from '@/types/event';

interface EventCardProps {
  event: EcosystemEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const pathname = usePathname();
  const localePrefix = pathname.match(/^\/(ar|en|fr)/)?.[0] || '';
  const detailsHref = `${localePrefix}/ecosystem/events/${event.id}`;
  const startDate = new Date(event.startsAt);
  const dateLabel = startDate.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const timeLabel = formatEventTimeRange(event.startsAt, event.endsAt);

  return (
    <Link href={detailsHref} className="block h-full">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="h-full flex flex-col p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-[#14b8a6]/40 hover:shadow-lg hover:shadow-teal-500/5 transition-all"
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white shadow-sm"
              style={{ backgroundColor: event.organizerLogoColor }}
              aria-hidden="true"
            >
              {event.organizerLogoText}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#14b8a6] uppercase tracking-wide truncate">
                {event.organizerName}
              </p>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5 line-clamp-2">
                {event.eventName}
              </h3>
            </div>
          </div>
          {event.category && (
            <span className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/30 text-[#0f766e] dark:text-[#5eead4] whitespace-nowrap">
              {event.category}
            </span>
          )}
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 flex-1">
          {event.description}
        </p>

        <div className="space-y-2 mb-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="opacity-70" />
            {dateLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="opacity-70" />
            {timeLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={13} className="opacity-70" />
            {event.location}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Event details</span>
          <span className="flex items-center gap-1 text-xs font-semibold text-[#14b8a6]">
            Open <ArrowRight size={13} />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

function formatEventTimeRange(startsAt: string, endsAt?: string) {
  const formatter = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
  const start = formatter.format(new Date(startsAt));
  if (!endsAt) return start;
  return `${start} - ${formatter.format(new Date(endsAt))}`;
}
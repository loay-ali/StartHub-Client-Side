import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft, Building2, Calendar, Clock, ExternalLink, Mail, MapPin, Phone, Trophy } from 'lucide-react';
import { getEventById } from '@/lib/mock-data/events';

interface EventDetailsPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: EventDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = getEventById(id);

  return {
    title: event ? `${event.eventName} - StarHub Events` : 'Event - StarHub',
    description: event?.description ?? 'StarHub ecosystem event details.',
  };
}

export default async function EventDetailsPage({ params }: EventDetailsPageProps) {
  const { locale, id } = await params;
  const localePrefix = `/${locale}`;
  const event = getEventById(id);

  if (!event) notFound();

  const startLabel = formatDateTime(event.startsAt, locale);
  const endLabel = event.endsAt ? formatDateTime(event.endsAt, locale) : null;

  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <Link
        href={`${localePrefix}/ecosystem/events`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-[#14b8a6] transition-colors mb-8"
      >
        <ArrowLeft size={15} />
        Back to Events
      </Link>

      <div
        className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 text-white shadow-lg shadow-slate-900/10 mb-8"
        style={{ background: event.eventBannerTone }}
      >
        <div className="absolute inset-0 bg-slate-950/20" />
        <div className="relative min-h-[240px] p-6 sm:p-8 flex flex-col justify-between gap-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div
                role="img"
                aria-label={`${event.organizerName} logo`}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white ring-1 ring-white/30 shadow-sm"
                style={{ backgroundColor: event.organizerLogoColor }}
              >
                {event.organizerLogoText}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-white/75">Organizer</p>
                <p className="text-sm font-bold truncate">{event.organizerName}</p>
              </div>
            </div>
            {event.category && (
              <span className="shrink-0 text-xs font-bold px-3 py-1 rounded-full bg-white/15 text-white ring-1 ring-white/20">
                {event.category}
              </span>
            )}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-white/70 mb-2">{event.eventBannerLabel}</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight max-w-3xl">
              {event.eventName}
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <InfoTile icon={Building2} label="Organizer" value={event.organizerName} />
        <InfoTile icon={MapPin} label="Location" value={event.location} />
        <InfoTile icon={Calendar} label="Start date and time" value={startLabel} />
        {endLabel && <InfoTile icon={Clock} label="End date and time" value={endLabel} />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">
        <div>
          <div className="mb-8">
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Full event description</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          {event.awards && event.awards.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Awards / Prizes</h2>
              <ul className="space-y-2">
                {event.awards.map((award) => (
                  <li key={award} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Trophy size={16} className="text-[#14b8a6] mt-0.5 shrink-0" />
                    <span>{award}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5">
          <a
            href={event.registerUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-sm font-bold bg-[#14b8a6] text-white hover:bg-[#0f766e] rounded-xl transition-colors"
          >
            Register
            <ExternalLink size={15} />
          </a>

          <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Organizer contact</h2>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {event.contactPerson && <p className="font-semibold text-slate-700 dark:text-slate-200">{event.contactPerson}</p>}
              <a href={`mailto:${event.contactEmail}`} className="flex items-center gap-2 hover:text-[#14b8a6] transition-colors">
                <Mail size={15} className="shrink-0" />
                <span className="break-all">{event.contactEmail}</span>
              </a>
              {event.contactPhone && (
                <a href={`tel:${event.contactPhone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-[#14b8a6] transition-colors">
                  <Phone size={15} className="shrink-0" />
                  <span>{event.contactPhone}</span>
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function InfoTile({ icon: Icon, label, value }: { icon: typeof Building2; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <Icon size={16} className="text-[#14b8a6] shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 break-words">{value}</p>
      </div>
    </div>
  );
}

function formatDateTime(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}
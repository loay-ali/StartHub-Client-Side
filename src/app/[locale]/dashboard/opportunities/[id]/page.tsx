import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Mail, Calendar, Wallet, CheckCircle2 } from 'lucide-react';
import { MOCK_OPPORTUNITIES } from '@/lib/mock-data/opportunities';

interface OpportunityDetailsPageProps {
    params: Promise<{ locale: string; id: string }>;
}

export default async function OpportunityDetailsPage({ params }: OpportunityDetailsPageProps) {
    const { locale, id } = await params;
    const localePrefix = `/${locale}`;

    const opportunity = MOCK_OPPORTUNITIES.find((o) => o.id === id);
    if (!opportunity) notFound();

    const deadlineLabel = opportunity.applicationDeadline
        ? new Date(opportunity.applicationDeadline).toLocaleDateString(undefined, {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
        : null;

    const amountLabel = opportunity.investmentAmount
        ? new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: opportunity.currency ?? 'USD',
            maximumFractionDigits: 0,
        }).format(opportunity.investmentAmount)
        : null;

    return (
        <section className="max-w-3xl mx-auto px-6 py-24">
            <Link
                href={`${localePrefix}/ecosystem/opportunities`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-[#14b8a6] transition-colors mb-8"
            >
                <ArrowLeft size={15} />
                Back to Opportunities
            </Link>

            <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                    <p className="text-xs font-semibold text-[#14b8a6] uppercase tracking-wide">
                        {opportunity.investorName}
                    </p>
                    <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">
                        {opportunity.title}
                    </h1>
                </div>
                {opportunity.industry && (
                    <span className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/30 text-[#0f766e] dark:text-[#5eead4]">
                        {opportunity.industry}
                    </span>
                )}
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed my-6">
                {opportunity.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
                {amountLabel && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800">
                        <Wallet size={16} className="text-[#14b8a6]" />
                        <div>
                            <p className="text-xs text-slate-400">Investment amount</p>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{amountLabel}</p>
                        </div>
                    </div>
                )}
                {deadlineLabel && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800">
                        <Calendar size={16} className="text-[#14b8a6]" />
                        <div>
                            <p className="text-xs text-slate-400">Application deadline</p>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{deadlineLabel}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-8">
                <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Eligibility & Requirements</h2>
                <ul className="space-y-2">
                    {opportunity.eligibility.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <CheckCircle2 size={16} className="text-[#14b8a6] mt-0.5 shrink-0" />
                            <span>{req}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <a
                href={`mailto:${opportunity.contactEmail}`}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold bg-[#14b8a6] text-white hover:bg-[#0f766e] rounded-xl transition-colors"
            >
                <Mail size={15} />
                Contact {opportunity.investorName}
            </a>
        </section>
    );
}
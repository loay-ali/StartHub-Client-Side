'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Calendar, Wallet, ArrowRight } from 'lucide-react';
import { InvestmentOpportunity } from '@/types/opportunity';

interface OpportunityCardProps {
    opportunity: InvestmentOpportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
    const pathname = usePathname();
    const localePrefix = pathname.match(/^\/(ar|en|fr)/)?.[0] || '';
    const detailsHref = `${localePrefix}/ecosystem/opportunities/${opportunity.id}`;

    const deadlineLabel = opportunity.applicationDeadline
        ? new Date(opportunity.applicationDeadline).toLocaleDateString(undefined, {
            month: 'short',
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
        <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="h-full flex flex-col p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-[#14b8a6]/40 hover:shadow-lg hover:shadow-teal-500/5 transition-all"
        >
            <Link
                href={detailsHref}
                className="flex flex-1 flex-col rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14b8a6] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
                <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                        <p className="text-xs font-semibold text-[#14b8a6] uppercase tracking-wide">
                            {opportunity.investorName}
                        </p>
                        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                            {opportunity.title}
                        </h3>
                    </div>
                    {opportunity.industry && (
                        <span className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/30 text-[#0f766e] dark:text-[#5eead4] whitespace-nowrap">
                            {opportunity.industry}
                        </span>
                    )}
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 flex-1">
                    {opportunity.description}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs text-slate-500 dark:text-slate-400">
                    {amountLabel && (
                        <span className="flex items-center gap-1.5">
                            <Wallet size={13} className="opacity-70" />
                            {amountLabel}
                        </span>
                    )}
                    {deadlineLabel && (
                        <span className="flex items-center gap-1.5">
                            <Calendar size={13} className="opacity-70" />
                            Due {deadlineLabel}
                        </span>
                    )}
                </div>

                <div className="mb-4">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Eligibility</p>
                    <ul className="space-y-1">
                        {opportunity.eligibility.slice(0, 2).map((req, i) => (
                            <li key={i} className="text-xs text-slate-500 dark:text-slate-400 flex gap-1.5">
                                <span className="text-[#14b8a6]">{'\u2022'}</span>
                                <span className="line-clamp-1">{req}</span>
                            </li>
                        ))}
                        {opportunity.eligibility.length > 2 && (
                            <li className="text-xs text-slate-400 dark:text-slate-500">
                                +{opportunity.eligibility.length - 2} more
                            </li>
                        )}
                    </ul>
                </div>
            </Link>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <a
                    href={`mailto:${opportunity.contactEmail}`}
                    className="flex min-w-0 items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#14b8a6] transition-colors"
                >
                    <Mail size={13} className="shrink-0" />
                    <span className="truncate max-w-[160px]">{opportunity.contactEmail}</span>
                </a>
                <Link
                    href={detailsHref}
                    className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[#14b8a6] hover:text-[#0f766e] transition-colors"
                >
                    Details <ArrowRight size={13} />
                </Link>
            </div>
        </motion.article>
    );
}
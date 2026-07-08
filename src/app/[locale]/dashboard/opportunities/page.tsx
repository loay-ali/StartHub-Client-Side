'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '@/components/ui/SearchBar';
import SortDropdown, { SortOption } from '@/components/ui/SortDropdown';
import Pagination from '@/components/ui/Pagination';
import OpportunityCard from '@/components/ecosystem/opportunities/OpportunityCard';
import { MOCK_OPPORTUNITIES } from '@/lib/mock-data/opportunities';
import { OpportunitySortKey } from '@/types/opportunity';

const PAGE_SIZE = 6;

const SORT_OPTIONS: SortOption<OpportunitySortKey>[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'deadline', label: 'Deadline soonest' },
  { value: 'amount', label: 'Highest amount' },
];

export default function OpportunitiesPage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<OpportunitySortKey>('newest');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = MOCK_OPPORTUNITIES;

    if (q) {
      list = list.filter((o) =>
        [o.investorName, o.title, o.industry ?? '', ...o.eligibility]
          .join(' ')
          .toLowerCase()
          .includes(q)
      );
    }

    const sorted = [...list];
    if (sort === 'newest') {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sort === 'deadline') {
      sorted.sort((a, b) => {
        if (!a.applicationDeadline) return 1;
        if (!b.applicationDeadline) return -1;
        return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
      });
    } else if (sort === 'amount') {
      sorted.sort((a, b) => (b.investmentAmount ?? 0) - (a.investmentAmount ?? 0));
    }

    return sorted;
  }, [search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <section className="max-w-6xl mx-auto px-6 py-6">
      <div className="mb-8">
        <p className="text-xs font-bold text-[#14b8a6] uppercase tracking-wide mb-2">Ecosystem</p>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">
          Investment Opportunities
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Open funding opportunities from investors active in the StarHub ecosystem.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <SearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          placeholder="Search by investor, industry, or requirement..."
        />
        <SortDropdown
          value={sort}
          options={SORT_OPTIONS}
          onChange={(v) => {
            setSort(v);
            setPage(1);
          }}
        />
      </div>

      {paginated.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {paginated.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 text-slate-400 dark:text-slate-500 text-sm">
          No opportunities match your search.
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
}
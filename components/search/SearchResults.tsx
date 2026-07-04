"use client";

import { useSearch } from "../providers/SearchProvider";
import { categoryIcon } from "@/utils/categoryIcon";
import { motion, AnimatePresence } from "framer-motion";
import type { SearchResult } from "@/src/services/GlobalSearchServie";

interface SearchResultsProps {
  onSelect?: (item: SearchResult) => void;
}

export default function SearchResults({ onSelect }: SearchResultsProps) {
  const { results, loading, activeIndex, query, saveAndClose } = useSearch();

  // Nothing to show while the query is empty
  if (query.trim().length === 0) return null;

  if (loading) {
    return (
      <div className="p-4">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Results
        </div>
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="space-y-3"
        >
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 rounded-xl bg-slate-100" />
          ))}
        </motion.div>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="flex flex-col items-center gap-2 p-8 text-center text-slate-400">
        <span className="text-2xl">🔍</span>
        <p className="font-medium text-slate-600">No results found</p>
        <p className="text-sm">Try a different search term or browse quick actions below.</p>
      </div>
    );
  }

  function handleClick(item: SearchResult) {
    onSelect ? onSelect(item) : saveAndClose(item);
  }

  return (
    <div className="p-4" role="listbox">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Results
      </div>
      <AnimatePresence>
        <div className="space-y-1">
          {results.map((item, index) => {
            const Icon = categoryIcon(item.category);
            const isActive = activeIndex === index;

            return (
              <motion.button
                key={item.id}
                type="button"
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15, delay: index * 0.03 }}
                onClick={() => handleClick(item)}
                role="option"
                aria-selected={isActive}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-150 ${
                  isActive
                    ? "border border-teal-200 bg-teal-50"
                    : "border border-transparent hover:bg-slate-100"
                }`}
              >
                {/* Category icon */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isActive
                      ? "bg-teal-100 text-teal-600"
                      : "bg-slate-100 text-teal-600 group-hover:bg-teal-50"
                  }`}
                >
                  <Icon size={16} />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-slate-900">
                    {item.title}
                  </div>
                  {item.subtitle && (
                    <div className="truncate text-sm text-slate-500">
                      {item.subtitle}
                    </div>
                  )}
                </div>

                {/* Category badge + enter hint */}
                <div className="flex shrink-0 items-center gap-2">
                  <span className="hidden rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:inline-flex">
                    {item.category}
                  </span>
                  {isActive && (
                    <span className="text-xs text-slate-400">↵</span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </AnimatePresence>
    </div>
  );
}
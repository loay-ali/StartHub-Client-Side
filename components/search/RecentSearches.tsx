"use client";

import { FiClock, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useSearch } from "../providers/SearchProvider";
import type { SearchResult } from "@/src/services/GlobalSearchServie";

interface RecentSearchesProps {
  onSelect?: (item: SearchResult) => void;
}

export default function RecentSearches({ onSelect }: RecentSearchesProps) {
  const { recent, query, saveAndClose } = useSearch();

  // Only show recent searches when the user hasn't typed anything
  if (query.trim().length > 0) return null;
  if (!recent.length) return null;

  function handleClick(item: SearchResult) {
    onSelect ? onSelect(item) : saveAndClose(item);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="border-b border-slate-200 p-4"
    >
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Recent Searches
      </h4>

      <div className="space-y-1" role="list">
        {recent.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            role="listitem"
            layout
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.04 }}
            onClick={() => handleClick(item)}
            className="group flex w-full items-center justify-between rounded-xl p-3 transition-all duration-200 hover:bg-slate-100"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors group-hover:bg-teal-50 group-hover:text-teal-600">
                <FiClock size={15} />
              </div>

              <div className="text-left">
                <div className="font-medium text-slate-900">{item.title}</div>
                {item.subtitle && (
                  <div className="text-sm text-slate-500">{item.subtitle}</div>
                )}
              </div>
            </div>

            <FiArrowRight className="text-slate-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-teal-600" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
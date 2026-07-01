"use client";

import type { ElementType } from "react";
import Link from "next/link";
import {
  FiArrowRight,
  FiBarChart2,
  FiBell,
  FiBriefcase,
  FiCheckSquare,
  FiFileText,
  FiSettings,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useSearch } from "../providers/SearchProvider";

const categoryIconMap: Record<string, ElementType> = {
  analytics: FiBarChart2,
  reports: FiFileText,
  tasks: FiCheckSquare,
  employees: FiUsers,
  companies: FiBriefcase,
  notifications: FiBell,
  settings: FiSettings,
};

export default function Suggestions() {
  const { suggestions, query } = useSearch();

  // Hide suggestions while searching
  if (query.trim().length > 0) return null;

  if (!suggestions.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="border-b border-slate-200/70 px-4 pb-4 pt-3"
      aria-labelledby="suggested-heading"
    >
      <div className="mb-3 flex items-center justify-between">
        <h4
          id="suggested-heading"
          className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-400"
        >
          Suggested For You
        </h4>
        <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-semibold text-teal-700">
          Smart picks
        </span>
      </div>

      <div className="space-y-2" role="list">
        {suggestions.map((item, index) => {
          const Icon = categoryIconMap[item.category] ?? FiZap;

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.2,
                delay: index * 0.05,
              }}
            >
              <Link
                href={item.url}
                role="listitem"
                aria-label={`Open ${item.title}`}
                className="group flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white px-3 py-3 shadow-[0_6px_20px_-16px_rgba(15,23,42,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:bg-gradient-to-r hover:from-teal-50/70 hover:to-white"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-teal-600 transition-colors group-hover:bg-teal-100">
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0">
                    <div className="truncate font-semibold text-slate-900">
                      {item.title}
                    </div>

                    {item.subtitle && (
                      <div className="truncate text-sm text-slate-500">
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                </div>

                <div className="ml-3 flex items-center gap-2">
                  <span className="hidden rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400 sm:inline-flex">
                    {item.category}
                  </span>
                  <FiArrowRight className="text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-teal-600" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
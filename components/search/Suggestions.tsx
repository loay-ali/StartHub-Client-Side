"use client";

import Link from "next/link";
import { FiZap, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useSearch } from "../providers/SearchProvider";

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
      className="border-b border-slate-200 p-4"
      aria-labelledby="suggested-heading"
    >
      <h4
        id="suggested-heading"
        className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400"
      >
        Suggested For You
      </h4>

      <div className="space-y-2" role="list">
        {suggestions.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.2,
              delay: index * 0.05,
            }}
            whileHover={{
              scale: 1.01,
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            <Link
              href={item.url}
              role="listitem"
              aria-label={`Open ${item.title}`}
              className="group flex items-center justify-between rounded-xl p-3 transition-all duration-200 hover:bg-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-100">
                  <FiZap size={18} />
                </div>

                <div>
                  <div className="font-medium text-slate-900">
                    {item.title}
                  </div>

                  {item.subtitle && (
                    <div className="text-sm text-slate-500">
                      {item.subtitle}
                    </div>
                  )}
                </div>
              </div>

              <FiArrowRight className="text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-teal-600" />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
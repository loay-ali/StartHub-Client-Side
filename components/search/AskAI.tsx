"use client";

import { motion } from "framer-motion";
import { FiZap, FiArrowRight } from "react-icons/fi";
import { useSearch } from "../providers/SearchProvider";

const aiTriggers = [
  "why",
  "show",
  "find",
  "explain",
  "summarize",
  "analyze",
  "compare",
  "forecast",
  "how",
  "what",
];

export default function AskAI() {
  const { query } = useSearch();

  const shouldShow =
    query.trim().length > 3 &&
    aiTriggers.some((word) =>
      query.toLowerCase().startsWith(word)
    );

  if (!shouldShow) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="border-b border-slate-200 p-4"
    >
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Ask AI
      </div>

      <button className="group flex w-full items-center justify-between rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-4 text-left transition-all duration-200 hover:border-teal-300 hover:shadow-md">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
            <FiZap size={18} />
          </div>

          <div>
            <div className="font-semibold text-slate-900">
              {query}
            </div>

            <div className="mt-1 text-sm text-slate-500">
              Ask StarHub AI to analyze your business data
            </div>
          </div>
        </div>

        <FiArrowRight className="text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-teal-600" />
      </button>
    </motion.div>
  );
}
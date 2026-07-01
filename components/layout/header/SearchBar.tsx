/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import {
  FiSearch,
  FiCommand,
  FiArrowRight,
  FiFileText,
  FiUsers,
  FiCheckSquare,
  FiBarChart2,
  FiBriefcase,
} from "react-icons/fi";
import { useSearch } from "@/components/providers/SearchProvider";
import { AnimatePresence, motion } from "framer-motion";
import QuickActions from "@/components/search/QuickActions";
import Suggestions from "@/components/search/Suggestions";


const quickActions = [
  { title: "Create Task", icon: FiCheckSquare },
  { title: "Generate Report", icon: FiFileText },
  { title: "Invite Employee", icon: FiUsers },
  { title: "Analytics", icon: FiBarChart2 },
  { title: "Companies", icon: FiBriefcase },
];


export default function SearchBar() {
  const {
    open,
    setOpen,
    query,
    setQuery,
    loading,
    results,
    recent,
    suggestions,
    activeIndex,
  } = useSearch();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative flex w-full items-center rounded-xl border border-[#14b8a6]/15 bg-white/60 px-4 py-2.5 backdrop-blur transition-all duration-200 hover:border-[#14b8a6]/40 hover:bg-white"
      >
        <FiSearch className="text-slate-400" />

        <span className="ml-3 flex-1 text-left text-sm text-slate-400">
          Search or ask AI...
        </span>

        <div className="flex items-center gap-1 rounded-lg border bg-slate-50 px-2 py-1 text-xs text-slate-500">
          <FiCommand />
          K
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
            className="mx-auto mt-24 w-[95%] max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-2xl"
          >
              <div className="border-b border-slate-200 p-5">
                <div className="flex items-center gap-3">
                  <FiSearch className="text-slate-400" />

                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search anything or ask AI..."
                    className="w-full bg-transparent text-base outline-none"
                  />
                </div>
              </div>

              <div className="max-h-[520px] overflow-y-auto">
                {query.length > 3 &&
                  (query.includes("?") ||
                    query.toLowerCase().startsWith("why") ||
                    query.toLowerCase().startsWith("show")) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      className="border-b p-4"
                    >
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Ask AI
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex w-full items-center justify-between rounded-2xl border border-[#14b8a6]/20 bg-[#14b8a6]/5 p-4 hover:bg-[#14b8a6]/10">
                        <div>
                          <div className="font-medium">
                            ✨ {query}
                          </div>

                          <div className="text-sm text-slate-500">
                            Generate an AI insight
                          </div>
                        </div>

                        <FiArrowRight />
                      </motion.button>
                    </motion.div>
                  )}

                <div className="p-4">
                  <Suggestions />

                  <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <QuickActions />
                  </div>

                  <div className="space-y-2">
                    {quickActions.map((item) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.title}
                          className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-slate-100 transition"
                        >
                          <Icon className="text-[#14b8a6]" />
                          <span>{item.title}</span>
                        </button>
                      );
                    })}
                  </div>
                  {results.length > 0 && (
                    <div className="border-t border-slate-200">
                      {results.map((item, index) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ backgroundColor: "#F8FAFC" }}
                          className={`flex cursor-pointer items-center justify-between px-5 py-3 ${activeIndex === index ? "bg-teal-50" : ""
                            }`}
                        >
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-slate-500">
                              {item.subtitle}
                            </div>
                          </div>

                          <span className="text-xs uppercase text-slate-400">
                            {item.category}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t p-4 text-xs text-slate-500 flex justify-between">
                  <span>↑ ↓ Navigate</span>
                  <span>Enter Select</span>
                  <span>Esc Close</span>
                </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>


    </>
  );
}





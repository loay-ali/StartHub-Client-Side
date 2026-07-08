"use client";

import { useEffect, useRef } from "react";
import { FiSearch, FiCommand } from "react-icons/fi";
import { useSearch } from "@/components/providers/SearchProvider";
import { AnimatePresence, motion } from "framer-motion";
import { useAIContext } from "@/components/layout/dashboard-layout/DashboardLayout";

import AskAI from "@/components/search/AskAI";
import RecentSearches from "@/components/search/RecentSearches";
import Suggestions from "@/components/search/Suggestions";
import QuickActions from "@/components/search/QuickActions";
import SearchResults from "@/components/search/SearchResults";

export default function SearchBar() {
  const {
    open,
    setOpen,
    query,
    setQuery,
    saveAndClose,
  } = useSearch();

  // AI context is available because SearchBar lives inside DashboardLayout
  // which now wraps the entire layout in AIContext.Provider.
  const ai = useAIContext();

  const inputRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K toggle + Escape close
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

  // Auto-focus the modal input whenever it opens
  useEffect(() => {
    if (open) {
      // Defer so the modal has mounted
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  function handleClose() {
    setOpen(false);
  }

  function handleAskAI() {
    setOpen(false);
    ai.setPurpose?.("");
    ai.toggleAI();
  }

  return (
    <>
      {/* ── Trigger button ──────────────────────────────────────────── */}
      <button
        type="button"
        aria-label="Open search"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="group relative flex w-full items-center rounded-2xl border border-[#14b8a6]/15 bg-white/80 px-3 py-2 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur transition-all duration-200 hover:border-[#14b8a6]/30 hover:bg-white sm:px-4 sm:py-2.5"
      >
        <FiSearch className="h-4 w-4 shrink-0 text-slate-400 sm:h-5 sm:w-5" />

        <span className="ml-2.5 flex-1 text-left text-sm text-slate-400 sm:ml-3 sm:text-[15px]">
          Search or ask AI…
        </span>

        <div className="hidden items-center gap-1 rounded-lg border border-slate-200/80 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-500 sm:flex">
          <FiCommand className="h-3.5 w-3.5" />K
        </div>
      </button>

      {/* ── Modal ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop — click closes the modal */}
            <motion.div
              key="search-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm"
              aria-hidden="true"
              onClick={handleClose}
            />

            {/* Panel */}
            <motion.div
              key="search-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Search"
              initial={{ opacity: 0, scale: 0.96, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed left-1/2 top-20 z-50 w-[95vw] max-w-2xl -translate-x-1/2 overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-2xl"
            >
              {/* Input row */}
              <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
                <FiSearch className="h-5 w-5 shrink-0 text-slate-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search anything or ask AI…"
                  className="min-w-0 flex-1 bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400"
                  aria-label="Search query"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="rounded-lg px-2 py-1 text-xs text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Scrollable body */}
              <div className="max-h-[60vh] overflow-y-auto">
                {/* Ask AI — shown when query looks like a question/command */}
                <AskAI onSelect={handleAskAI} />

                {/* Recent searches — shown when query is empty */}
                <RecentSearches onSelect={saveAndClose} />

                {/* Suggestions — page-contextual, shown when query is empty */}
                <Suggestions />

                {/* Quick actions — shown when query is empty */}
                <QuickActions onSelect={handleClose} />

                {/* Search results — shown when query is non-empty */}
                <SearchResults onSelect={saveAndClose} />
              </div>

              {/* Keyboard hint footer */}
              <div className="flex items-center justify-between border-t border-slate-100 px-5 py-2.5 text-[11px] text-slate-400">
                <span className="flex items-center gap-3">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                </span>
                <span>Esc to close</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
}

export default function Pagination({
  currentPage = 1,
  totalPages = 5,
}: PaginationProps) {
  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row">
      {/* Info */}

      <p className="text-sm text-slate-500">
        Page <span className="font-semibold text-slate-900">{currentPage}</span>{" "}
        of <span className="font-semibold text-slate-900">{totalPages}</span>
      </p>

      {/* Controls */}

      <div className="flex items-center gap-2">
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-100">
          <ChevronLeft size={18} />
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium transition ${
              currentPage === index + 1
                ? "bg-teal-700 text-white"
                : "border border-slate-200 bg-white hover:bg-slate-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-100">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

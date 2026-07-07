"use client";
import { useState } from "react";
import DeleteOpportunityModal from "./DeleteOpportunityModal";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Wallet,
  Pencil,
  Trash2,
} from "lucide-react";

interface OpportunityCardProps {
  opportunity: {
    id: number;
    title: string;
    industry: string;
    budget: number;
    deadline?: string;
    status: "Open" | "Closed" | "Draft";
  };
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const statusStyle = {
    Open: "bg-emerald-100 text-emerald-700",
    Closed: "bg-red-100 text-red-700",
    Draft: "bg-amber-100 text-amber-700",
  };
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl">
      {/* Header */}

      <div className="flex items-start justify-between p-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            {opportunity.title}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <Building2 size={16} className="text-teal-700" />

            {opportunity.industry}
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyle[opportunity.status]
          }`}
        >
          {opportunity.status}
        </span>
      </div>

      <div className="border-t border-slate-100" />

      {/* Body */}

      <div className="space-y-5 p-6">
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-teal-700">
            <Wallet size={18} />

            <span className="text-sm font-medium">Budget</span>
          </div>

          <p className="font-semibold text-slate-900">
            ${opportunity.budget.toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-teal-700">
            <CalendarDays size={18} />

            <span className="text-sm font-medium">Deadline</span>
          </div>

          <p className="font-semibold text-slate-900">
            {opportunity.deadline || "No Deadline"}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100" />

      {/* Footer */}

      <div className="flex items-center justify-between p-6">
        <div className="flex gap-2">
          {/* Edit */}

          <Link
            href={`/dashboard/investor/opportunities/${opportunity.id}/edit`}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-100"
          >
            <Pencil size={18} className="text-teal-700" />
          </Link>

          {/* Delete */}

          <button
            onClick={() => setOpenDelete(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 transition hover:bg-red-50"
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>

        {/* View Details */}

        <Link
          href={`/dashboard/investor/opportunities/${opportunity.id}`}
          className="flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-teal-800 hover:shadow-lg"
        >
          View Details
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
      <DeleteOpportunityModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          setOpenDelete(false);

          // هنا هيكون استدعاء الـ API لاحقًا
          console.log("Opportunity deleted");
        }}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Wallet,
  CalendarDays,
  FileText,
  Pencil,
  Trash2,
  RefreshCcw,
} from "lucide-react";

import DeleteOpportunityModal from "./DeleteOpportunityModal";

export default function OpportunityDetails() {
  const [status, setStatus] = useState("Open");
  const [openDelete, setOpenDelete] = useState(false);

  const opportunity = {
    id: 1,
    title: "Seed Investment Opportunity",
    industry: "Technology",
    budget: 250000,
    deadline: "30 Aug 2026",
    description:
      "We are looking for innovative startups with scalable business models and strong growth potential. This opportunity is designed for ambitious founders seeking seed funding.",

    terms:
      "Applicants must have an MVP, a dedicated team and a clear business strategy.",
  };

  const badgeStyle = {
    Open: "bg-emerald-100 text-emerald-700",
    Closed: "bg-red-100 text-red-700",
    Draft: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      {/* Hero */}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-teal-700 to-emerald-500 px-7 py-7 text-white">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold">{opportunity.title}</h1>

              <p className="mt-2 text-sm text-teal-50">
                Review and manage your published opportunity.
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                badgeStyle[status as keyof typeof badgeStyle]
              }`}
            >
              {status}
            </span>
          </div>
        </div>
      </section>

      {/* Overview */}

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
              <Building2 size={18} className="text-teal-700" />
            </div>

            <div>
              <p className="text-xs text-slate-500">Industry</p>

              <h3 className="text-sm font-semibold text-slate-900">
                {opportunity.industry}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
              <Wallet size={18} className="text-teal-700" />
            </div>

            <div>
              <p className="text-xs text-slate-500">Budget</p>

              <h3 className="text-sm font-semibold text-slate-900">
                ${opportunity.budget.toLocaleString()}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
              <CalendarDays size={18} className="text-teal-700" />
            </div>

            <div>
              <p className="text-xs text-slate-500">Deadline</p>

              <h3 className="text-sm font-semibold text-slate-900">
                {opportunity.deadline}
              </h3>
            </div>
          </div>
        </div>
      </section>
      {/* Description & Terms */}

      <section className="grid gap-4 lg:grid-cols-2">
        {/* Description */}

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
              <FileText size={18} className="text-teal-700" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Description
              </h2>

              <p className="text-xs text-slate-500">Opportunity overview</p>
            </div>
          </div>

          <p className="text-sm leading-7 text-slate-600">
            {opportunity.description}
          </p>
        </div>

        {/* Terms */}

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
              <Building2 size={18} className="text-teal-700" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Application Terms
              </h2>

              <p className="text-xs text-slate-500">Requirements</p>
            </div>
          </div>

          <p className="text-sm leading-7 text-slate-600">
            {opportunity.terms}
          </p>
        </div>
      </section>

      {/* Management */}

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Manage Opportunity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update the opportunity status or modify its information.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Status */}

            <button
              onClick={() =>
                setStatus(
                  status === "Open"
                    ? "Closed"
                    : status === "Closed"
                      ? "Draft"
                      : "Open",
                )
              }
              className="flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-sm font-medium text-teal-700 transition hover:bg-teal-100"
            >
              <RefreshCcw size={16} />
              Change Status
            </button>
            {/* Edit */}

            <Link
              href={`/dashboard/investor/opportunities/${opportunity.id}/edit`}
              className="flex items-center gap-2 rounded-xl border border-teal-700 px-4 py-2.5 text-sm font-medium text-teal-700 transition hover:bg-teal-50"
            >
              <Pencil size={16} />
              Edit
            </Link>

            {/* Delete */}

            <button
              onClick={() => setOpenDelete(true)}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </section>

      {/* Delete Modal */}

      <DeleteOpportunityModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          setOpenDelete(false);

          // TODO: Call Delete API
          console.log("Opportunity deleted");
        }}
      />
    </div>
  );
}

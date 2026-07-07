"use client";

import { useState } from "react";
import Link from "next/link";
interface AddOpportunityProps {
  isEdit?: boolean;
}
export default function AddOpportunity({
  isEdit = false,
}: AddOpportunityProps) {
  const [title, setTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [terms, setTerms] = useState("");

  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}

        <div className="border-b border-slate-200 px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-900">
            {isEdit
              ? "Edit Investment Opportunity"
              : "Add Investment Opportunity"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {isEdit
              ? "Update your investment opportunity."
              : "Create a new investment opportunity for startups."}
          </p>
        </div>

        {/* Form */}

        <div className="space-y-6 p-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Title */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Opportunity Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {/* Industry */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Industry
              </label>

              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
              >
                <option value="">Select Industry</option>
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Education</option>
                <option>E-Commerce</option>
              </select>
            </div>

            {/* Budget */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Budget
              </label>

              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="$0"
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {/* Deadline */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Deadline (Optional)
              </label>

              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
              />
            </div>
          </div>
          {/* Description */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the investment opportunity..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          {/* Application Terms */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Application Terms
            </label>

            <textarea
              rows={5}
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              placeholder="Enter application terms and conditions..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          {/* Actions */}

          <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/dashboard/investor/opportunities"
              className="rounded-xl border border-slate-300 px-6 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Link>

            <button className="rounded-xl bg-teal-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-teal-800">
              {isEdit ? "Save Changes" : "Publish Opportunity"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

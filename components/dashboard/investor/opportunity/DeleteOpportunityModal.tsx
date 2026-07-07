"use client";

import { AlertTriangle } from "lucide-react";

interface DeleteOpportunityModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteOpportunityModal({
  open,
  onClose,
  onConfirm,
}: DeleteOpportunityModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle size={30} className="text-red-600" />
        </div>

        <h2 className="mt-5 text-center text-xl font-bold text-slate-900">
          Delete Opportunity
        </h2>

        <p className="mt-3 text-center text-sm leading-6 text-slate-500">
          Are you sure you want to delete this opportunity? This action cannot
          be undone.
        </p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-300 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 py-3 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

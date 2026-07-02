"use client";

import Link from "next/link";
import { AlertTriangle, LayoutDashboard, RotateCcw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      {/* Icon */}
      <div className="mb-6 rounded-full bg-red-100 p-6">
        <AlertTriangle className="h-16 w-16 text-red-600" />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-slate-900">Dashboard Error</h1>

      {/* Description */}
      <p className="mt-4 max-w-md text-gray-500">
        Something went wrong while loading this dashboard page.
      </p>

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-red-600
            px-6
            py-3
            text-white
            transition
            hover:bg-red-700
          "
        >
          <RotateCcw size={18} />
          Retry
        </button>

        <Link
          href="/dashboard"
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            px-6
            py-3
            transition
            hover:bg-gray-50
          "
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
      </div>

      {error.digest && (
        <p className="mt-8 text-sm text-gray-400">Error ID: {error.digest}</p>
      )}
    </div>
  );
}

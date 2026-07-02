"use client";

import Link from "next/link";
import { LayoutDashboard, SearchX } from "lucide-react";

export default function DashboardNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* Icon */}
      <div className="mb-6 rounded-full bg-teal-50 p-6">
        <SearchX className="h-16 w-16 text-teal-700" />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-slate-900">
        Dashboard Page Not Found
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-md text-gray-500">
        The dashboard page you're looking for doesn't exist or may have been
        moved.
      </p>

      {/* Button */}
      <Link
        href="/dashboard"
        className="
          mt-8
          flex
          items-center
          gap-2
          rounded-xl
          bg-teal-700
          px-6
          py-3
          text-white
          transition-all
          duration-200
          hover:bg-teal-800
          hover:shadow-lg
        "
      >
        <LayoutDashboard size={18} />
        Back to Dashboard
      </Link>
    </div>
  );
}

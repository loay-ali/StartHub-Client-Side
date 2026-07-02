"use client";

import Link from "next/link";
import { House, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* Error Code */}
      <h1 className="text-8xl font-black tracking-tight text-red-600 md:text-9xl">
        500
      </h1>

      {/* Title */}
      <h2 className="mt-4 text-3xl font-bold md:text-4xl">
        Something went wrong
      </h2>

      {/* Description */}
      <p className="mt-4 max-w-lg text-lg text-gray-500">
        An unexpected error occurred while loading this page. Please try again
        or return to the homepage.
      </p>

      {/* Actions */}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {/* Retry */}
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
            transition-all
            duration-200
            hover:bg-red-700
            hover:shadow-lg
          "
        >
          <RotateCcw size={18} />
          Try Again
        </button>

        {/* Home */}
        <Link
          href="/"
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-gray-300
            px-6
            py-3
            transition-all
            duration-200
            hover:bg-gray-50
            hover:shadow-md
          "
        >
          <House size={18} />
          Go Home
        </Link>
      </div>

      {/* Optional error id */}
      {error.digest && (
        <p className="mt-8 text-sm text-gray-400">Error ID: {error.digest}</p>
      )}
    </div>
  );
}

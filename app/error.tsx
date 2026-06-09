"use client";

import { FiRefreshCcw } from "react-icons/fi";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-6xl font-bold text-danger">Oops!</h1>

      <h2 className="mt-4 text-3xl font-semibold text-text-primary">
        Something went wrong
      </h2>

      <p className="mt-3 max-w-md text-text-secondary">
        An unexpected error occurred while loading this page.
      </p>

      <button
        onClick={() => reset()}
        className="mt-8 flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-white transition hover:opacity-90"
      >
        <FiRefreshCcw />
        Try Again
      </button>
    </div>
  );
}

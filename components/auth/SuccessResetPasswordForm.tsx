"use client";

import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

export default function PasswordResetSuccessForm() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-background p-8 text-center shadow-xl">
        <FiCheckCircle size={80} className="mx-auto text-green-500" />

        <h1 className="mt-6 text-3xl font-bold text-text-primary">
          Password Updated
        </h1>

        <p className="mt-3 text-text-secondary">
          Your password has been changed successfully.
        </p>

        <Link
          href="/login"
          className="mt-8 block w-full rounded-xl bg-primary py-3 font-semibold text-white transition hover:opacity-90"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}

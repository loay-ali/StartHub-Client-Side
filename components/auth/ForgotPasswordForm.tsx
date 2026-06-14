"use client";

import Link from "next/link";
import { FiMail } from "react-icons/fi";

export default function ForgotPasswordForm() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-background p-8 shadow-xl">
        <h1 className="text-4xl font-bold text-text-primary">
          Forgot Password
        </h1>

        <p className="mt-3 text-text-secondary">
          Enter your email address and we'll send you a verification code.
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-text-secondary" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 shadow-sm outline-none transition focus:border-primary"
              />
            </div>
          </div>

          <Link
            href="/verify-otp"
            className="block w-full rounded-xl bg-primary py-3 text-center font-semibold text-white transition hover:opacity-90"
          >
            Send Verification Code
          </Link>
        </form>

        <Link
          href="/login"
          className="mt-6 block text-center text-sm font-medium text-primary transition hover:underline"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}

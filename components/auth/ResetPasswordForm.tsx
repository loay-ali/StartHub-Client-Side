"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLock } from "react-icons/fi";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      password: "",
      confirmPassword: "",
    };

    let isValid = true;

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    // TODO: Call Reset Password API

    router.push("/password-reset-success");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-background p-8 shadow-xl">
        <h1 className="text-4xl font-bold text-text-primary">Reset Password</h1>

        <p className="mt-3 text-text-secondary">
          Create a new password for your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              New Password
            </label>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />

              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  if (errors.password) {
                    setErrors((prev) => ({
                      ...prev,
                      password: "",
                    }));
                  }
                }}
                placeholder="Enter new password"
                className={`w-full rounded-xl py-3 pl-12 pr-4 shadow-sm outline-none transition ${
                  errors.password
                    ? "border border-red-500"
                    : "border border-border focus:border-primary"
                }`}
              />
            </div>

            {errors.password && (
              <p className="mt-2 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);

                  if (errors.confirmPassword) {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: "",
                    }));
                  }
                }}
                placeholder="Confirm password"
                className={`w-full rounded-xl py-3 pl-12 pr-4 shadow-sm outline-none transition ${
                  errors.confirmPassword
                    ? "border border-red-500"
                    : "border border-border focus:border-primary"
                }`}
              />
            </div>

            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-3 font-semibold text-white transition hover:opacity-90"
          >
            Reset Password
          </button>
        </form>

        <Link
          href="/login"
          className="mt-6 block text-center text-sm font-medium text-primary hover:underline"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}

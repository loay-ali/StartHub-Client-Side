"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function VerifyOtpForm() {
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [error, setError] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    if (error) {
      setError("");
    }

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const newOtp = ["", "", "", "", "", ""];

    pastedData.split("").forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });

    setOtp(newOtp);

    setError("");

    if (pastedData.length < 6) {
      inputRefs.current[pastedData.length]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);

    setError("");

    inputRefs.current[0]?.focus();

    console.log("Resend Code");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code");

      return;
    }

    setError("");

    console.log("OTP:", code);

    router.push("/reset-password");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-background p-8 shadow-xl">
        <h1 className="text-4xl font-bold text-text-primary">Verify Code</h1>

        <p className="mt-3 text-text-secondary">
          Enter the 6-digit verification code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex justify-between gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className={`h-14 w-14 rounded-xl text-center text-xl font-semibold outline-none transition ${
                  error
                    ? "border border-red-500"
                    : "border border-border focus:border-primary"
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="mt-3 text-center text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={otp.join("").length !== 6}
            className="mt-8 w-full rounded-xl bg-primary py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Verify Code
          </button>
        </form>

        <button
          type="button"
          onClick={handleResend}
          className="mt-4 w-full text-sm font-medium text-primary hover:underline"
        >
          Resend Code
        </button>

        <Link
          href="/forgot-password"
          className="mt-6 block text-center text-sm font-medium text-primary hover:underline"
        >
          Back
        </Link>
      </div>
    </div>
  );
}

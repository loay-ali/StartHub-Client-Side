"use client";
// src/components/investor/InvestorVerifyEmailForm.tsx
//
// Step 2 of the investor registration flow: Register -> Email
// Verification -> Investor Payment. Reuses the same split-panel shell
// as login/register so the branding stays consistent through the flow.
import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import { MailCheck } from "lucide-react";
import styles from "./investor.module.css";

const CODE_LENGTH = 6;

export default function InvestorVerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const next = [...code];
    next[index] = value.slice(-1);
    setCode(next);
    if (error) setError("");

    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (!pasted) return;

    const next = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((digit, i) => { next[i] = digit; });
    setCode(next);
    setError("");
    inputRefs.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  };

  const handleResend = () => {
    setCode(Array(CODE_LENGTH).fill(""));
    setError("");
    inputRefs.current[0]?.focus();
    // Placeholder — wire up to POST /auth/investor/resend-code later.
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const joined = code.join("");

    if (joined.length !== CODE_LENGTH) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setSubmitting(true);

    // Placeholder verification call — wire this up to
    // POST /auth/investor/verify-email once the endpoint is available.
    // On success, continue straight to the membership payment step.
    setTimeout(() => {
      setSubmitting(false);
      router.push("/investor/payment");
    }, 700);
  };

  return (
    <div className={styles.formPanel}>
      <div className={styles.formCard}>
        <span className={styles.formEyebrow}>
          <MailCheck size={11} />
          Verify Your Email
        </span>

        <h1 className={styles.formTitle}>Check your inbox</h1>
        <p className={styles.formSub}>
          {email
            ? <>Enter the 6-digit code we sent to <strong>{email}</strong>.</>
            : "Enter the 6-digit verification code sent to your email."}
        </p>

        <form onSubmit={handleSubmit} className={styles.formFields}>
          <div className={styles.otpRow}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className={`${styles.otpInput} ${error ? styles.otpInputError : ""}`}
              />
            ))}
          </div>

          {error && <span className={styles.formErrorText}>{error}</span>}

          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            disabled={submitting || code.join("").length !== CODE_LENGTH}
          >
            {submitting ? <AiOutlineLoading className="spinner-loading" /> : "Verify & Continue"}
          </button>
        </form>

        <p className={styles.formFootNote}>
          Didn&apos;t get a code?{" "}
          <button type="button" onClick={handleResend} className={styles.formLink} style={{ background: "none", border: "none", cursor: "pointer" }}>
            Resend code
          </button>
        </p>
      </div>
    </div>
  );
}
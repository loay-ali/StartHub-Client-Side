"use client";
// src/components/investor/InvestorLoginForm.tsx
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import { ShieldCheck } from "lucide-react";
import styles from "./investor.module.css";

export default function InvestorLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: typeof errors = {};

    if (!email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address";

    if (!password) next.password = "Password is required";
    else if (password.length < 8) next.password = "Password must be at least 8 characters";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || submitting) return;

    setSubmitting(true);
    setErrors({});

    // Placeholder auth call — wire this up to POST /auth/investor/login
    // once the investor auth endpoint is available.
    setTimeout(() => {
      setSubmitting(false);
      router.push("/dashboard");
    }, 700);
  };

  return (
    <div className={styles.formPanel}>
      <div className={styles.formCard}>
        <span className={styles.formEyebrow}>
          <ShieldCheck size={11} />
          Investor Portal
        </span>

        <h1 className={styles.formTitle}>Welcome back</h1>
        <p className={styles.formSub}>Sign in to review your deal flow and matches.</p>

        {errors.form && <p className={styles.formErrorText} style={{ marginTop: 14 }}>{errors.form}</p>}

        <form onSubmit={handleSubmit} className={styles.formFields}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="investor-login-email">Email</label>
            <input
              id="investor-login-email"
              type="email"
              autoComplete="email"
              placeholder="you@fund.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              className={`${styles.formInput} ${errors.email ? styles.formInputError : ""}`}
            />
            {errors.email && <span className={styles.formErrorText}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="investor-login-password">Password</label>
            <input
              id="investor-login-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              className={`${styles.formInput} ${errors.password ? styles.formInputError : ""}`}
            />
            {errors.password && <span className={styles.formErrorText}>{errors.password}</span>}
          </div>

          <div className={styles.formRow}>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>
            <Link href="/forgot-password" className={styles.formLink}>Forgot password?</Link>
          </div>

          <button type="submit" className={`btn-primary ${styles.formSubmit}`} disabled={submitting}>
            {submitting ? <AiOutlineLoading className="spinner-loading" /> : "Sign In"}
          </button>
        </form>

        <p className={styles.formFootNote}>
          New to StarHub?{" "}
          <Link href="/investor/register" className={styles.formLink}>Create an investor account</Link>
        </p>
      </div>
    </div>
  );
}
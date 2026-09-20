"use client";
// src/components/investor/InvestorRegisterForm.tsx
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import { ShieldCheck } from "lucide-react";
import styles from "./investor.module.css";

type FieldErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function InvestorRegisterForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: FieldErrors = {};

    if (!fullName.trim()) next.fullName = "Full name is required";

    if (!email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address";

    if (!password) next.password = "Password is required";
    else if (password.length < 8) next.password = "Password must be at least 8 characters";

    if (!confirmPassword) next.confirmPassword = "Please confirm your password";
    else if (confirmPassword !== password) next.confirmPassword = "Passwords do not match";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const clearError = (field: keyof FieldErrors) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || submitting) return;

    setSubmitting(true);

    // Placeholder registration call — wire this up to
    // POST /auth/investor/register once the endpoint is available.
    // On success the backend sends a verification email/code and the
    // flow continues at /investor/verify-email.
    setTimeout(() => {
      setSubmitting(false);
      router.push(`/investor/verify-email?email=${encodeURIComponent(email)}`);
    }, 700);
  };

  return (
    <div className={styles.formPanel}>
      <div className={styles.formCard}>
        <span className={styles.formEyebrow}>
          <ShieldCheck size={11} />
          Investor Portal
        </span>

        <h1 className={styles.formTitle}>Create your account</h1>
        <p className={styles.formSub}>Join StarHub to access vetted, AI-matched deal flow.</p>

        <form onSubmit={handleSubmit} className={styles.formFields}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="investor-register-name">Full Name</label>
            <input
              id="investor-register-name"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              value={fullName}
              onChange={(e) => { setFullName(e.target.value); clearError("fullName"); }}
              className={`${styles.formInput} ${errors.fullName ? styles.formInputError : ""}`}
            />
            {errors.fullName && <span className={styles.formErrorText}>{errors.fullName}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="investor-register-email">Email</label>
            <input
              id="investor-register-email"
              type="email"
              autoComplete="email"
              placeholder="you@fund.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
              className={`${styles.formInput} ${errors.email ? styles.formInputError : ""}`}
            />
            {errors.email && <span className={styles.formErrorText}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="investor-register-password">Password</label>
            <input
              id="investor-register-password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearError("password"); }}
              className={`${styles.formInput} ${errors.password ? styles.formInputError : ""}`}
            />
            {errors.password && <span className={styles.formErrorText}>{errors.password}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="investor-register-confirm">Confirm Password</label>
            <input
              id="investor-register-confirm"
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); clearError("confirmPassword"); }}
              className={`${styles.formInput} ${errors.confirmPassword ? styles.formInputError : ""}`}
            />
            {errors.confirmPassword && <span className={styles.formErrorText}>{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className={`btn-primary ${styles.formSubmit}`} disabled={submitting}>
            {submitting ? <AiOutlineLoading className="spinner-loading" /> : "Create Account"}
          </button>
        </form>

        <p className={styles.formFootNote}>
          Already have an account?{" "}
          <Link href="/investor/login" className={styles.formLink}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
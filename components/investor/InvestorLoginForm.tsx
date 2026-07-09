"use client";
// src/components/investor/InvestorLoginForm.tsx
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import { ShieldCheck } from "lucide-react";
import styles from "./investor.module.css";
import { useTranslations } from "next-intl";
import config from "@/constants/config";
import { notificationService } from "@/lib/notifiationSystem";
import { ButtonLoader } from "../preloader/ButtonLoader";

export default function InvestorLoginForm() {
  const router = useRouter();

  const t = useTranslations();

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [emailError,setEmailError] = useState('');
  const [passwordError,setPasswordError] = useState('');

  const [isSubmitting,setIsSubmitting] = useState(false);

  const [isInvalid,setIsInvalid] = useState(false);

  useEffect(() => {
    if( isSubmitting ) {
      setIsInvalid(false);

      if( email == '' ) {
        setEmailError(t('public.auth.email-required'));
        setIsSubmitting(false);
        return;
      }

      if( email.length < 3 ) {
        setEmailError(t('public.auth.email-must-be-more-than-3-characters'));
        setIsSubmitting(false);
        return;
      }

      if( password == '' ) {
        setPasswordError(t('public.auth.password-required'));
        setIsSubmitting(false);
        return;
      }

      if( password.length < 8 ) {
        setPasswordError(t('public.auth.passowrd-must-be-more-than-8-characters'));
        setIsSubmitting(false);
        return;
      }

      fetch(config.apiUrl +'/investor-auth/login',{
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({usernameOrEmail: email, password})
      }).then(res => {
        if( res.status == 401 || res.status == 403 ) {
          setIsInvalid(true);
          notificationService.error("Login failed", "Invalid email or password. Please try again.");
          throw new Error("Invalid login");
        } else if (!res.ok) {
          notificationService.error("Login failed", "An error occurred. Please try again.");
          throw new Error("Login error");
        }
        return res;
      })
      .then(res => {
        if( res ) {
          notificationService.success("Welcome back!", "You have successfully logged in as an investor.");
          router.replace('/dashboard'); // or investor dashboard route
        }
      }).catch(err => {
        console.error(err);
      }).finally(() => {
        setIsSubmitting(false);
      });
    }
  },[isSubmitting]);

  return (
    <div className={styles.formPanel}>
      <div className={styles.formCard}>
        <span className={styles.formEyebrow}>
          <ShieldCheck size={11} />
          
        </span>

        <h1 className={styles.formTitle}>{t('public.login.welcome-back')}</h1>
        <p className="mt-3 text-text-secondary">
          {t('public.login.signin-to-review-your-deal-flow-and-matches')}
        </p>
        <p className={styles.formSub}></p>

        {isInvalid && <p className={styles.formErrorText} style={{ marginTop: 14 }}>
          {emailError ? emailError:passwordError}
        </p>}

        <form className={styles.formFields}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="investor-login-email">Email</label>
            <input
              id="investor-login-email"
              type="email"
              autoComplete="email"
              placeholder="you@fund.com"
              value={email}
              onInput={(e) => {
                setEmail(e.currentTarget.value);
                if (emailError) setEmailError('');
              }}
              className={`${styles.formInput} ${emailError ? styles.formInputError : ""}`}
            />
            {emailError && <span className={styles.formErrorText}>{emailError}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="investor-login-password">Password</label>
            <input
              id="investor-login-password"
              type="password"
              autoComplete="current-password"
              placeholder={t('public.login.enter-your-password')}
              value={password}
              onInput={(e) => {
                setPassword(e.currentTarget.value);
                if (passwordError) setPasswordError('');
              }}
              className={`${styles.formInput} ${passwordError ? styles.formInputError : ""}`}
            />
            {passwordError && <span className={styles.formErrorText}>{passwordError}</span>}
          </div>

          {/*<div className={styles.formRow}>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>
            <Link href="/forgot-password" className={styles.formLink}>Forgot password?</Link>
          </div>*/}

          <button type="button" onClick = {() => setIsSubmitting(true)} className={`flex justify-center items-center btn-primary ${styles.formSubmit}`} disabled={isSubmitting}>
            {isSubmitting ? <ButtonLoader /> : t('public.login.sign-in')}
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
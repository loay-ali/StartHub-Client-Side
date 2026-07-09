/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useTranslations } from 'next-intl';

import config from '@/constants/config';

import { useEffect, useState } from 'react';

import Link from "next/link";
import { AiOutlineLoading } from 'react-icons/ai';
import { FaExclamationCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { notificationService } from "@/lib/notifiationSystem";
import AuthSwitcher from "./AuthSwitcher";

export default function LoginForm() {

  const router = useRouter();

  const t = useTranslations();

  const [isLoggedIn,setIsLoggedIn] = useState<boolean|null>(null);

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [emailError,setEmailError] = useState('');
  const [passwordError,setPasswordError] = useState('');

  const [isInvalid,setIsInvalid] = useState(false);

  const [isLogin,setIsLogin] = useState(false);

  useEffect(() => {
    if( isLoggedIn == null ) {
      fetch(config.apiUrl +'/auth/me',{credentials: 'include'})
        .then(res => {
          if( res.status == 200 ) {
            router.replace('/dashboard');
          }else {
            setIsLoggedIn(false);
          }
        })
    }

    if( isLogin ) {
      setIsInvalid(false);

      if( email == '' ) {
        setEmailError(t('public.auth.email-required'));
        setIsLogin(false);
        return;
      }

      if( email.length < 3 ) {
        setEmailError(t('public.auth.email-must-be-more-than-3-characters'));
        setIsLogin(false);
        return;
      }

      if( password == '' ) {
        setPasswordError(t('public.auth.password-required'));
        setIsLogin(false);
        return;
      }

      if( password.length < 8 ) {
        setPasswordError(t('public.auth.passowrd-must-be-more-than-8-characters'));
        setIsLogin(false);
        return;
      }

      fetch(config.apiUrl +'/auth/login',{
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
      }).then(res => {

        console.log(res);
 
        if( res.status == 401 || res.status == 403 ) {
          setIsInvalid(true);
          notificationService.error("Login failed", "Invalid email or password. Please try again.");
        }else {
          return res.json();
        }
      })
      .then(res => {
        if( res ) {
          notificationService.success("Welcome back!", "You have successfully logged in.");
          router.replace('/dashboard');
        }
      }).catch(err => {
        notificationService.error("Login error", "An unexpected error occurred. Please try again.");
      }).finally(() => {
        setIsLogin(false);
      });
    }
  },[isLogin]);

  return (
    <div className="flex items-center justify-center bg-surface px-6 py-10 pt-28 lg:pt-10" onKeyDown={(event) => {
      if( event.key == 'Enter' ) {
        setIsLogin(true);
      }
    }}>
      <div className="w-full max-w-md">
        <div className="mb-10 flex items-center gap-3"></div>

        <h1 className="text-4xl font-bold text-text-primary">{t('public.login.welcome-back')}</h1>

        <p className="mt-3 text-text-secondary">
          {t('public.login.signin-to-continue-to-your-dashboard')}
        </p>

        {isInvalid ? <p className = 'flex items-center gap-3 text-red-500 text-center'>
          <FaExclamationCircle />
          {t('public.auth.invalid-email-or-password')}
        </p>:''}

        <section className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">{t('dashboard.fields.email')}</label>

            <input
              type="email"
              onInput = {(event) => {
                setEmailError('');
                setEmail(event.currentTarget.value)}}
              placeholder={t('public.login.enter-your-email')}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 shadow-sm outline-none transition focus:border-primary"
            />

            <span className = 'text-red-500 flex gap-2 items-center'>
              {emailError ? <><FaExclamationCircle/>{emailError}</>:''}
            </span>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">{t('dashboard.fields.password')}</label>

            <input
              type="password"
              onInput = {(event) => {
                setPasswordError('');
                setPassword(event.currentTarget.value);
              }}
              placeholder={t('public.login.enter-your-password')}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 shadow-sm outline-none transition focus:border-primary"
            />

            <span className = 'text-red-500 flex gap-2 items-center'>
              {passwordError ? <><FaExclamationCircle/>{passwordError}</>:''}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-border" />
              {t('public.login.remember-me')}
            </label>

            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              {t('public.login.forget-password')}
            </Link>
          </div>

          <button
            onClick = {() => setIsLogin(true)}
            type="submit"
            className="button flex justify-center"
          >
            {! isLogin ? 'Sign In':<AiOutlineLoading className = 'spinner-loading' />}
          </button>

          <section className = 'flex gap-3'>
            <p>{t('public.login.new-here')}</p>
            <Link href = '/register' className = 'button secondary'>{t('public.login.join-now')}</Link>
          </section>

          <AuthSwitcher 
            text="Are you an Investor?" 
            buttonText="Login as Investor" 
            href="/investor/login" 
          />
        </section>
      </div>
    </div>
  );
}

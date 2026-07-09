'use client';

import { useTranslations } from 'next-intl';

import config from '@/constants/config';

import { useEffect, useState } from 'react';

import Link from "next/link";
import { AiOutlineLoading } from 'react-icons/ai';
import { FaExclamationCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { notificationService } from "@/lib/notifiationSystem";

export default function InvestorRegisterForm() {

  const router = useRouter();
  const t = useTranslations();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [ticketMin, setTicketMin] = useState<number | ''>('');
  const [ticketMax, setTicketMax] = useState<number | ''>('');

  const [errors, setErrors] = useState<any>({});
  const [isInvalid, setIsInvalid] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if( isRegistering ) {
      setIsInvalid(false);
      setErrors({});

      let hasError = false;
      let newErrors: any = {};

      if (!fullname || fullname.length < 3) {
        newErrors.fullname = t('public.auth.name-must-be-more-than-3-characters') || 'Name must be at least 3 characters';
        hasError = true;
      }
      if (!email || email.length < 3) {
        newErrors.email = t('public.auth.email-must-be-more-than-3-characters') || 'Invalid email';
        hasError = true;
      }
      if (!password || password.length < 8) {
        newErrors.password = t('public.auth.passowrd-must-be-more-than-8-characters') || 'Password must be at least 8 characters';
        hasError = true;
      }
      if (!country || country.length < 3) {
        newErrors.country = 'Country is required';
        hasError = true;
      }
      if (!state || state.length < 3) {
        newErrors.state = 'State is required';
        hasError = true;
      }

      if (hasError) {
        setErrors(newErrors);
        setIsRegistering(false);
        return;
      }

      const body: any = { fullname, email, password, country, state };
      if (ticketMin !== '') body.ticketMin = Number(ticketMin);
      if (ticketMax !== '') body.ticketMax = Number(ticketMax);

      fetch(config.apiUrl + '/investor-auth/register', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(async res => {
        if (!res.ok) {
          setIsInvalid(true);
          const data = await res.json().catch(() => ({}));
          notificationService.error("Registration failed", data.message || "Please check your information and try again.");
          throw new Error("Registration error");
        }
        return res;
      })
      .then(res => {
        if( res ) {
          notificationService.success("Welcome!", "Your investor account has been successfully created.");
          router.replace('/dashboard'); // or investor dashboard
        }
      }).catch(err => {
        console.error(err);
      }).finally(() => {
        setIsRegistering(false);
      });
    }
  }, [isRegistering]);

  return (
    <div className="flex items-center justify-center bg-surface px-6 py-10" onKeyDown={(event) => {
      if( event.key == 'Enter' ) {
        setIsRegistering(true);
      }
    }}>
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-text-primary">Investor Registration</h1>
        <p className="mt-3 text-text-secondary">Create an account to discover investment opportunities</p>

        {isInvalid ? <p className='flex items-center gap-3 text-red-500 text-center mt-4'>
          <FaExclamationCircle />
          Registration failed. Please check the fields and try again.
        </p> : ''}

        <section className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Full Name</label>
            <input
              type="text"
              onInput={(event) => { setErrors({...errors, fullname: ''}); setFullname(event.currentTarget.value); }}
              placeholder="John Doe"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 shadow-sm outline-none transition focus:border-primary"
            />
            {errors.fullname && <span className='text-red-500 flex gap-2 items-center text-sm mt-1'><FaExclamationCircle/>{errors.fullname}</span>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">{t('dashboard.fields.email')}</label>
            <input
              type="email"
              onInput={(event) => { setErrors({...errors, email: ''}); setEmail(event.currentTarget.value); }}
              placeholder={t('public.login.enter-your-email')}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 shadow-sm outline-none transition focus:border-primary"
            />
            {errors.email && <span className='text-red-500 flex gap-2 items-center text-sm mt-1'><FaExclamationCircle/>{errors.email}</span>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">{t('dashboard.fields.password')}</label>
            <input
              type="password"
              onInput={(event) => { setErrors({...errors, password: ''}); setPassword(event.currentTarget.value); }}
              placeholder={t('public.login.enter-your-password')}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 shadow-sm outline-none transition focus:border-primary"
            />
            {errors.password && <span className='text-red-500 flex gap-2 items-center text-sm mt-1'><FaExclamationCircle/>{errors.password}</span>}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium">Country</label>
              <input
                type="text"
                onInput={(event) => { setErrors({...errors, country: ''}); setCountry(event.currentTarget.value); }}
                placeholder="Country"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 shadow-sm outline-none transition focus:border-primary"
              />
              {errors.country && <span className='text-red-500 flex gap-2 items-center text-sm mt-1'><FaExclamationCircle/>{errors.country}</span>}
            </div>
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium">State</label>
              <input
                type="text"
                onInput={(event) => { setErrors({...errors, state: ''}); setState(event.currentTarget.value); }}
                placeholder="State"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 shadow-sm outline-none transition focus:border-primary"
              />
              {errors.state && <span className='text-red-500 flex gap-2 items-center text-sm mt-1'><FaExclamationCircle/>{errors.state}</span>}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium">Min Ticket (Optional)</label>
              <input
                type="number"
                onInput={(event) => setTicketMin(event.currentTarget.value === '' ? '' : Number(event.currentTarget.value))}
                placeholder="Min Amount"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 shadow-sm outline-none transition focus:border-primary"
              />
            </div>
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium">Max Ticket (Optional)</label>
              <input
                type="number"
                onInput={(event) => setTicketMax(event.currentTarget.value === '' ? '' : Number(event.currentTarget.value))}
                placeholder="Max Amount"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 shadow-sm outline-none transition focus:border-primary"
              />
            </div>
          </div>

          <button
            onClick={() => setIsRegistering(true)}
            type="submit"
            className="button flex justify-center w-full mt-6"
            disabled={isRegistering}
          >
            {!isRegistering ? 'Register' : <AiOutlineLoading className='spinner-loading' />}
          </button>

          <section className='flex gap-3 mt-4'>
            <p>Already have an account?</p>
            <Link href='/investor/login' className='text-primary hover:underline'>Login here</Link>
          </section>
        </section>
      </div>
    </div>
  );
}

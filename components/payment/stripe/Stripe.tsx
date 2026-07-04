'use client';

import {CheckoutElementsProvider} from '@stripe/react-stripe-js/checkout';
import {loadStripe} from '@stripe/stripe-js';

import { useMemo } from 'react';
import CheckoutForm from './CheckoutForm';
import config from '@/constants/config';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_PUBLIC_KEY ?? '');

export default function Stripe({clientSecret}:{clientSecret:string}) {
  return (
    <CheckoutElementsProvider stripe={stripePromise} options={{clientSecret}}>
      <CheckoutForm />
    </CheckoutElementsProvider>
  );
}
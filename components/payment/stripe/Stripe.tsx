'use client';

import {Elements, PaymentElement, useElements} from '@stripe/react-stripe-js';
import {loadStripe, Appearance} from '@stripe/stripe-js';
import { useTranslations } from 'next-intl';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_PUBLIC_KEY ?? '');

export default function Stripe({redirect,paymentIntent,clientSecret}:{redirect:Function,paymentIntent:string,clientSecret:string}) {
  const appearance: Appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#0d9488', // teal-600
      colorBackground: '#ffffff',
      colorText: '#1e293b', // slate-800
      colorDanger: '#ef4444',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '12px',
    },
    rules: {
      '.Input': {
        border: '1px solid #e2e8f0', // slate-200
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        padding: '12px 14px',
      },
      '.Input:focus': {
        border: '1px solid #0d9488', // teal-600
        boxShadow: '0 0 0 1px #0d9488',
      },
      '.Label': {
        fontWeight: '600',
        color: '#475569', // slate-600
        marginBottom: '6px',
        fontSize: '14px',
      }
    }
  };

  return (
    <Elements stripe={stripePromise} options={{clientSecret, appearance}}>
        <CheckoutForm redirect = {redirect} client_secret={clientSecret} paymentIntent = {paymentIntent}/>
    </Elements>
  );
}
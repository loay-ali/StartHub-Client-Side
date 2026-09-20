'use client';

import {Elements, PaymentElement, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useTranslations } from 'next-intl';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_PUBLIC_KEY ?? '');

export default function Stripe({redirect,paymentIntent,clientSecret}:{redirect:Function,paymentIntent:string,clientSecret:string}) {
  return (
    <Elements stripe={stripePromise} options={{clientSecret}}>
        <CheckoutForm redirect = {redirect} client_secret={clientSecret} paymentIntent = {paymentIntent}/>
    </Elements>
  );
}
'use client';

import { ButtonLoader } from '@/components/preloader/ButtonLoader';
import config from '@/constants/config';
import {PaymentElement, useElements,useStripe,CardElement} from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const CheckoutForm = ({redirect,paymentIntent,client_secret}:{redirect:Function,paymentIntent:string,client_secret:string}) => {
  const elements = useElements();
  const stripe = useStripe();

  const t = useTranslations();

  const [pay,setPay] = useState('');

  async function s(e:any) {
    e.preventDefault();

    
    if( ! elements || ! stripe ) return;
    
    const cardEle = elements.getElement(CardElement);
  
    if( !cardEle || typeof cardEle != 'object' ) return;

    const res = await stripe.createToken(cardEle as StripeCardElement);

    setPay(res.token?.id ?? '');
  }

  useEffect(() => {
    if( pay != '' ) {
        fetch(config.apiUrl +'/payments/confirm',{
          credentials: "include",
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentIntent,
            clientSecret: client_secret,
            paymentMethod: pay
          })
        }).then(res => res.status == 200 ? res.json():Promise.reject())
        .then(() => {

        })
        .catch(console.warn)
        .finally(() => setPay(''));
    }
  },[pay]);

  return (
      <form className="w-full max-w-md mx-auto space-y-6" onSubmit={s}>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-4 transition-all hover:border-teal-200/50">
          <CardElement options={{
            hidePostalCode: true,
            style: {
              base: {
                iconColor: '#0d9488', // teal-600
                color: '#1e293b', // slate-800
                fontWeight: '500',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',
                '::placeholder': {
                  color: '#94a3b8', // slate-400
                },
              },
              invalid: {
                iconColor: '#ef4444', // red-500
                color: '#ef4444',
              },
            },
          }}/>
        </div>
        <button 
          type="submit" 
          disabled={!!pay}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {pay ? <ButtonLoader color="white" /> : t('dashboard.common.checkout')}
        </button>
      </form>
  );

};

export default CheckoutForm;
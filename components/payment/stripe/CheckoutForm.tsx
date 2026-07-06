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
      <form className = "w-full max-w-[750px]" onSubmit = {s}>
        <CardElement options = {{
          hidePostalCode: true
        }}/>
        <button type = 'submit' className = 'button flex items-center justify-center'>
          {pay ? <ButtonLoader />:t('dashboard.common.checkout')}
        </button>
      </form>
  );
};

export default CheckoutForm;
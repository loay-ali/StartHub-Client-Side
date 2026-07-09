'use client';

import Link from "next/link";
import PaymentMethods from "./PaymentMethods";

import { BsCreditCard } from "react-icons/bs";
import { useEffect, useState } from "react";
import Stripe from "./stripe/Stripe";
import config from "@/constants/config";

export default function PaymentSection({ redirect, paymentIntent, clientSecret, price, payment, additional = '' }: { redirect: Function, paymentIntent: string, clientSecret: string, additional: string, price: number, payment: 'service' | 'subscription' }) {
    return (
<<<<<<< HEAD
    <section className = 'flex flex-col justify-center items-center gap-10'>
        <strong className = 'text-3xl border-b-1 border-gray-200'>
            {price} USD
        </strong>
        {clientSecret == '' ? (<strong className = 'text-center'>{t('public.register.please-choose-payment-plan')}</strong>):<><Stripe redirect = {redirect} clientSecret = {clientSecret} paymentIntent = {paymentIntent}/></>}
        {/*<button onClick = {() => setConfirmPayment(true)} className = 'button flex items-center justify-center gap-5 max-w-[250px] text-center'>
=======
        <section className='flex flex-col justify-center items-center gap-10'>
            <strong className='text-3xl border-b-1 border-gray-200'>
                {price} USD
            </strong>
            <Stripe redirect={redirect} clientSecret={clientSecret} paymentIntent={paymentIntent} />
            {/*<button onClick = {() => setConfirmPayment(true)} className = 'button flex items-center justify-center gap-5 max-w-[250px] text-center'>
>>>>>>> origin/main
            <BsCreditCard /> Pay Now
        </button>*/}
        </section>
    )
}
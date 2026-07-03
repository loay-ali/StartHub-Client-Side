'use client';

import Link from "next/link";
import PaymentMethods from "./PaymentMethods";

import { BsCreditCard } from "react-icons/bs";
import { useEffect, useState } from "react";
import Stripe from "./stripe/Stripe";
import config from "@/constants/config";

export default function PaymentSection({price,payment,additional=''}:{additional:string,price:number,payment:'service'|'subscription'}) {
    const [confirmPayment,setConfirmPayment] = useState(false);

    const [loading,setLoading] = useState(true);
    const [clientSecret,setClientSecret] = useState('');

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/'+ (payment == 'service' ? 'serviceCheckout/'+ additional:'checkout'))
        }
    },[]);

    return (
    <section className = 'flex flex-col justify-center items-center gap-10'>
        <strong className = 'text-3xl border-b-1 border-gray-200'>
            {price} USD
        </strong>
        <Stripe clientSecret = {clientSecret}/>
        <button onClick = {() => setConfirmPayment(true)} className = 'button flex items-center justify-center gap-5 max-w-[250px] text-center'>
            <BsCreditCard /> Pay Now
        </button>
    </section>
    )
}
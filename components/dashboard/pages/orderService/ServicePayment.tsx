'use client';

import { AiOutlineLoading } from "react-icons/ai";

import PaymentSection from "@/components/payment/Payment";
import config from "@/constants/config";
import { useEffect,useState } from "react";

import { useSearchParams } from "next/navigation";

export default function ServicePayments() {

    const params = useSearchParams();

    if( ! params.get("service") ) {
        return (<>Please Choose a Service</>);
    }

    const [paymentURL,setPaymentURL] = useState('');

    useEffect(() => {
        if( paymentURL == '' ) {
            fetch(config.apiUrl +'/payments/serviceCheckout/'+ params.get('service'),{method: "POST",credentials: 'include'})
                .then(res => {
                    return res.status == 201 ? res.json():Promise.reject()})
                .then(res => {
                    setPaymentURL(res.data.redirectUrl);
                    console.log(paymentURL);
                }).catch(err => {
                    console.log(err);
                })
        }
    },[]);

    if( paymentURL == '' ) {
        return (
        <section className = "p-5 flex justify-center items-center">
            <AiOutlineLoading size = {40} className = "spinner-loading"/>
        </section>
        )
    }

    return (<>
        <PaymentSection price = {50} url = {paymentURL}/>
    </>);
}
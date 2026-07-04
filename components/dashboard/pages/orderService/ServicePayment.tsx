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

    const [paymentData,setPaymentData] = useState({
        client_secret: "",
        price: 0
    });

    useEffect(() => {
        if( paymentData.client_secret == '' ) {
            fetch(config.apiUrl +'/payments/serviceCheckout/'+ params.get('service'),{
                method: "POST",
                credentials: 'include'})
                .then(res => {
                    return res.status == 200 ? res.json():Promise.reject()})
                .then(res => {
                    setPaymentData(res.data);
                }).catch(err => {
                    console.log(err);
                })
        }
    },[]);

    if( paymentData.client_secret == '' ) {
        return (
        <section className = "p-5 flex justify-center items-center">
            <AiOutlineLoading size = {40} className = "spinner-loading"/>
        </section>
        )
    }

    return (<>
        <PaymentSection clientSecret = {paymentData.client_secret} price = {paymentData.price} payment="service" additional=""/>
    </>);
}
'use client';

import { AiOutlineLoading } from "react-icons/ai";

import PaymentSection from "@/components/payment/Payment";
import config from "@/constants/config";
import { useEffect,useState } from "react";

import { useSearchParams } from "next/navigation";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";

import { useRouter } from 'next/navigation';

export default function ServicePayments() {

    const router = useRouter();
    const params = useSearchParams();

    const [loading,setLoading] = useState(true);
    const [once,setOnce] = useState(false);//[edit]

    if( ! params.get("service") ) {
        return (<>Please Choose a Service</>);
    }

    const [paymentData,setPaymentData] = useState({
        paymentIntent: '',
        client_secret: "",
        price: 0
    });

    useEffect(() => {
        if( loading && once == false ) {
            setOnce(true);
            console.count("Inside");
            fetch(config.apiUrl +'/payments/serviceCheckout/'+ params.get('service'),{
                method: "POST",
                credentials: 'include'})
                .then(res => {
                    return res.status == 200 ? res.json():Promise.reject()})
                .then(res => {
                    setPaymentData(res.data);
                }).catch(err => {
                    console.log(err);
                }).finally(() => setLoading(false))
        }
    },[]);

    if( paymentData.client_secret == '' ) {
        return (
        <section className = "p-5 flex justify-center items-center">
            <ButtonLoader size = {30} />
        </section>
        )
    }

    return (<>
        <PaymentSection redirect = {() => router.push('?step=4')}paymentIntent = {paymentData.paymentIntent} clientSecret = {paymentData.client_secret} price = {paymentData.price} payment="service" additional=""/>
    </>);
}
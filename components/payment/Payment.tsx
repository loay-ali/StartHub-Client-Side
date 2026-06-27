'use client';

import Link from "next/link";
import PaymentMethods from "./PaymentMethods";

import { BsCreditCard } from "react-icons/bs";

export default function PaymentSection({url,price}:{price:number,url:string}) {
    return (
    <section className = 'flex flex-col justify-center items-center gap-10'>
        <strong className = 'text-3xl border-b-1 border-gray-200'>
            {price} USD
        </strong>
        <PaymentMethods />
        <Link href = {url} className = 'button flex items-center justify-center gap-5 max-w-[250px] text-center'>
            <BsCreditCard /> Pay Now
        </Link>
    </section>
    )
}
import Link from "next/link";
import PaymentMethods from "./PaymentMethods";

export default function PaymentSection({url,price}:{price:number,url:string}) {
    return (
    <section className = 'flex flex-col justify-center items-center gap-10'>
        <strong>
            {price} USD
        </strong>
        <PaymentMethods />
        <Link replace = {false} href = {url} className = 'button'>
            Pay Now
        </Link>
    </section>
    )
}
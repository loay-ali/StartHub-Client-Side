import Image from "next/image";
import Link from "next/link";

export default async function PaymentMethods() {
    //[edit]->Fetch Payment Methods

    return (
        <section className = 'grid grid-col-3'>
            <Link href = "?payment-method=paymob" className = 'border-2 border-gray-400 rounded-xl p-10 flex justify-center items-center'>
                <img src = "/paymob.png" width = "150" alt = "paymob logo"/>
            </Link>
        </section>
    );
}
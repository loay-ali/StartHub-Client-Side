import Link from "next/link";

import { IoCheckmarkCircle } from "react-icons/io5";

export default function PaymentMethods() {
    //[edit]->Fetch Payment Methods

    return (
        <section className = 'grid grid-col-3 border-b-1 border-gray-200'>
            <Link replace = {false} href = "&payment-method=paymob" className = 'relative border-2 border-blue-500 rounded-xl p-10 flex justify-center items-center'>
                <img src = "/paymob.png" width = "150" alt = "paymob logo"/>
                <IoCheckmarkCircle className = 'absolute top-0 inset-s-0 text-blue-500' size = {30}/>
            </Link>
        </section>
    );
}
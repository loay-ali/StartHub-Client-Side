'use client';

import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { forbidden, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { FiCheckCircle } from "react-icons/fi";
import { PiEmpty } from "react-icons/pi";

export default function OrderPlaced() {
    const params = useSearchParams();

    if( ! params.get('serviceOrderId') ) {
        return forbidden();
    }

    const [loading,setLoading] = useState(true);
    const [status,setStatus] = useState('');

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/service-orders/'+ params.get('serviceOrderId'),{credentials: 'include'})
            .then(res => res.status == 200 ? res.json():Promise.reject())
            .then(() => {
                setStatus('DONE');
            }).catch(() => {
                setStatus("NOT_FOUND")
            })
        }
    },[]);

    if( loading ) {
        return <div className = 'p-5 flex justify-center items-center'>
            <ButtonLoader size = {30} />
        </div>
    }

    return (<section className = 'flex flex-col items-center'>
        {status == 'DONE' && <><FiCheckCircle size={200} color = '#28a745' className = "my-3"/>
        <h3 className = 'text-center text-2xl my-7'>Service Orders Successfully</h3>
        <p className = 'text-center'>
            We'll Send You Updates as Soon as The Service Is Accomplished
        </p></>}

        {status == 'NOT_FOUND' && <><PiEmpty size={200} color = '#dc3545' className = "my-3"/>
        <h3 className = 'text-center text-2xl my-7'>Service Not Found</h3></>}
    </section>);
}
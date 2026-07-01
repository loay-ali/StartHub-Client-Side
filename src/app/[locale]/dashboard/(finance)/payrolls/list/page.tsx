'use client';

import CollectionPage from "@/components/collection/CollectionPage";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { useEffect, useState } from "react";

export default function PayrollList() {
    const [payrolls,setPayrolls] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/payroll',{credentials: 'include'})
                .then(res => res.status == 200 ? res.json():Promise.reject())
                .then(res => {
                    setPayrolls(res);
                }).finally(() => {
                    setLoading(false);
                })
        }
    },[]);

    if( loading ) return <div className = 'p-5 flex items-center justify-center'><ButtonLoader size = {40} /></div>

    return (
        <CollectionPage
            title = "Payrolls"
            data = {payrolls}
            columns = {[
                {key: 'index',label: '#'},
                {key: 'employee',label: "Employee"},
                {key: 'paidAt',label: "Paid At",sortable: true}
            ]} />
    )
}
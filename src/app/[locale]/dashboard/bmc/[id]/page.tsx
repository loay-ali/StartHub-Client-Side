'use client';

import { useEffect, useState } from "react";
import { BMC } from "../list/page";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import BMCComponent from "@/components/bmc/grid";
import config from "@/constants/config";
import { useParams, useRouter } from "next/navigation";

export default function NewBMC() {
    const {id} = useParams();

    if( ! id ) {
        return (<>Invalid ID</>);
    }

    const router = useRouter();

    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);

    const [bmc,setBmc] = useState<BMC>({
        'customer-segments': "",
        'customer-relationships': "",
        'channels': "",
        'revenue-streams': "",
        'key-activities': "",
        'key-resources': "",
        'key-partners': "",
        'cost-structure': "",
        'value-propositions': ""
    });

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/bmc/'+ id,{credentials: "include"})
            .then(res => res.status == 200 ? res.json():Promise.reject())
            .then((res:BMC) => {
                setBmc(res);
            }).catch(err => {
                console.warn(err);
                setError(true);
            }).finally(() => setLoading(false))
        }
    },[]);

    if( loading ) {
        return <div className = 'p-5 flex items-center justify-center'>
            <ButtonLoader size = {30}/>
        </div>
    }

    if( error ) {
        return <>Error Fetching BMC</>
    }

    return (
        <>
            <section className = 'flex items-start gap-5 justify-center'>
                <section className = 'p-5 rounded shadow bg-white'>
                    <h2>
                        New BMC
                    </h2>

                    <BMCComponent bmc = {bmc} updateBmc = {setBmc}/>

                    <h3 className = 'p-2 border-b-1 border-gray-200'>
                        Results
                    </h3>

                    
                </section>
            </section>
        </>
    );
}
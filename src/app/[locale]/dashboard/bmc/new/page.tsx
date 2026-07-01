'use client';

import { useEffect, useState } from "react";
import { BMC } from "../list/page";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import BMCComponent from "@/components/bmc/grid";
import config from "@/constants/config";
import { useRouter } from "next/navigation";

export default function NewBMC() {
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

    const router = useRouter();

    const [saving,setSaving] = useState(false);

    useEffect(() => {
        if( saving ) {
            fetch(config.apiUrl +'/bmc/',{
                credentials: "include",
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(bmc)
            }).then(res => res.status == 201 ? router.push('/dashboard/bmc/list'):Promise.reject())
            .finally(() => {
                setSaving(false);
            })
        }
    },[saving]);

    return (
        <>
            <section className = 'flex items-start gap-5 justify-center'>
                <section className = 'p-5 rounded shadow bg-white'>
                    <h2>
                        New BMC
                    </h2>

                    <BMCComponent bmc = {bmc} updateBmc = {setBmc}/>

                    <button onClick = {() => setSaving(true)} type="button" className = 'button'>
                        {saving ? <ButtonLoader />:<>Analyze</>}
                    </button>
                </section>
            </section>
        </>
    );
}
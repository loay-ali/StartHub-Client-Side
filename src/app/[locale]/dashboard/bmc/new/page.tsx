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
    const [error,setError] = useState('');

    useEffect(() => {
        if( saving ) {
            setError("");
            //@ts-ignore
            if( Object.keys(bmc).filter((inp:string) => bmc[inp] == '').length > 0 ) {
                setError("Please Compelete All The Fields");
                setSaving(false);
            }

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
                <section className = 'p-5 rounded shadow bg-white w-[100vw] max-w-[900px]'>
                    <h2 className = 'flex justify-between p-2'>
                        <strong className = 'text-xl'>New BMC</strong>

                        {error && <span className = 'text-sm text-red-700'>{error}</span>}
                    </h2>

                    {saving ?
                    <div className = 'my-10 flex flex-col gap-10 justify-center items-center'>
                        <strong>Analyzing Your BMC</strong>
                        <ButtonLoader size = {50}/>
                    </div>:
                    <BMCComponent bmc = {bmc} updateBmc = {setBmc}/>}

                    <button onClick = {() => setSaving(true)} type="button" className = 'flex justify-center button'>
                        {saving ? <ButtonLoader />:<>Analyze</>}
                    </button>
                </section>
            </section>
        </>
    );
}
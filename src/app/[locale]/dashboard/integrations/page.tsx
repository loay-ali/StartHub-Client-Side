'use client';

import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Integration = {
    provider: string;
    isConnected: boolean;
    metadata: Record<string,string>;
}

export default function IntegrationsPage() {

    const [loading,setLoading] = useState(true);
    const [integrations,setIntegrations] = useState<Integration[]>([]);

    const [saving,setSaving] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/integrations/client',{credentials: 'include'})
            .then(res => res.status == 200 ? res.json():Promise.reject())
            .then(res => {
                setIntegrations(res);
            }).finally(() => setLoading(false));
        }

        if( saving ) {
            fetch(config.apiUrl +'/integrations/client',{
                credentials: 'include',
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(integrations)
            }).then(res => res.status == 200 ? router.refresh():Promise.reject())
            .finally(() => {
                setSaving(false);
            })
        }
    },[]);

    if( loading ) {
        return <div className = 'p-5 flex items-center justify-center'>
            <ButtonLoader size = {30} />
        </div>
    }

    return (
        <>
        <section className = 'bg-white shadow rounded p-5'>
            <h2>
                Integrations
            </h2>

            {integrations.map(inte => {
                return (
                    <fieldset>
                        <legend className = 'capitalize'>
                            <label className = 'font-bold' htmlFor = {"enable-"+ inte.provider}>{inte.provider}</label>

                            <input
                                onInput = {ele => {
                                    setIntegrations(i => {
                                        const tmpInte = i.find(x => x.provider == inte.provider);
                                        if( tmpInte ) tmpInte.isConnected = ele.currentTarget.checked;
                                        return i;
                                    })
                                }}
                                type="checkbox"
                                id={"enable-"+ inte.provider}
                                defaultChecked={!!inte.isConnected}/>
                        </legend>

                        {Object.entries(inte.metadata).map(([slug,value]:[string,string]) => {
                            return (
                                <div className = 'form-group'>
                                    <label htmlFor={slug}>
                                        <img src = {'/'+ slug +'.png'} width = '100' />
                                    </label>
                                    <input onInput = {ele => {
                                        setIntegrations((i:Integration[]) => {
                                            const tmpInte = i.find(it => it.provider == inte.provider);
                                            if( tmpInte ) tmpInte.metadata[slug] = ele.currentTarget.value;
                                            return i;
                                        })
                                    }} type="text" id={slug} defaultValue = {value} />
                                </div>
                            );
                        })}
                    </fieldset>
                );
            })}

            <button disabled = {saving} onClick = {() => setSaving(true)} type = 'button' className = 'button'>
                {saving ? <ButtonLoader />:<>Save</>}
            </button>
        </section>
        </>
    );
}
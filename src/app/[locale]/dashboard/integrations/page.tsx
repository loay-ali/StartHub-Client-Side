'use client';

import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Integration = {
    provider: string;
    isConnected: boolean;
    metadata: Record<string,string>;
}

export default function IntegrationsPage() {

    const t = useTranslations();

    const [loading,setLoading] = useState(true);
    const [integrations,setIntegrations] = useState<Record<string,Integration>>({});

    const [saving,setSaving] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/integrations/client',{credentials: 'include'})
            .then(res => res.status == 200 ? res.json():Promise.reject())
            .then(res => {
                console.log(res);
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
                body: JSON.stringify(Object.values(integrations))
            }).then(res => {
                console.log(res);
                return res.status == 200 ? router.refresh():Promise.reject()})
            .finally(() => {
                setSaving(false);
            })
        }
    },[saving]);

    if( loading ) {
        return <div className = 'p-5 flex items-center justify-center'>
            <ButtonLoader size = {30} />
        </div>
    }

    return (
        <>
        <section className = 'bg-white shadow rounded p-5 max-w-[750px]'>
            <h2>
                {t('dashboard.sidebar.integrations')}
            </h2>

            {Object.values(integrations).map((inte:Integration) => {
                return (
                    <fieldset key = {inte.provider} className = 'my-2 border-y-2 border-gray-200'>
                        <legend className = 'capitalize flex justify-between items-center w-full'>
                            <label className = 'font-bold' htmlFor = {"enable-"+ inte.provider}>
                                <img src = {'/'+ inte.provider.toLowerCase() +'.png'} width = '100'/>
                            </label>

                            <input
                                onInput = {ele => {
                                    setIntegrations(i => {
                                        i[inte.provider].isConnected = ele.currentTarget?.checked ?? false;
                                        return i;
                                    })
                                }}
                                type="checkbox"
                                id={"enable-"+ inte.provider}
                                defaultChecked={!!inte.isConnected}/>
                        </legend>

                        {Object.entries(inte.metadata).map(([slug,value]:[string,any]) => {
                            return (
                                <div key = {slug} className = 'form-group'>
                                    <label htmlFor={slug}>
                                        {t('dashboard.integrations.'+ slug)}
                                    </label>
                                    <input onInput = {ele => {
                                        setIntegrations(i => {
                                            return {...i,[inte.provider.toLowerCase()]: {...inte,metadata: {...inte.metadata,[slug]: (ele.target as HTMLInputElement).value ?? ''}}};
                                        })
                                    }} type="text" id={inte.provider} defaultValue = {value} />
                                </div>
                            );
                        })}
                    </fieldset>
                );
            })}

            <button disabled = {saving} onClick = {() => setSaving(true)} type = 'button' className = 'flex justify-center button'>
                {saving ? <ButtonLoader />:<>Save</>}
            </button>
        </section>
        </>
    );
}
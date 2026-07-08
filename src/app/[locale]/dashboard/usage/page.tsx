'use client';

import CollectionPage from "@/components/collection/CollectionPage";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsagePage() {
    const params = useSearchParams();
    const currentPage = params.has('p') ? Math.abs(Number(params.get('p'))):1;

    const [logs,setLogs] = useState([]);

    const [loading,setLoading] = useState(true);

    const t = useTranslations();

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/logs?page='+ currentPage,{credentials: 'include'})
            .then(res => res.status == 200 ? res.json():Promise.reject())
            .then(res => {
                setLogs(res);
            }).finally(() => setLoading(false));
        }
    },[loading]);

    if( loading ) {
        return <div className = 'flex items-center justify-center p-5'>
            <ButtonLoader size = {30} />
        </div>;
    }

    return (
        <section className = 'flex items-start gap-5'>
            <CollectionPage
                currentPage={currentPage}
                title = {t('dashboard.usage.all-logs')}
                data = {logs}
                columns={[
                    {key: "index",label: "#"},
                    {key: "title",label: t('dashboard.common.title'),value:(row:any) => {
                        return t('dashboard.usage.'+ row.type);
                    }},
                    {key: "user",label: t('dashboard.users.user'),value: (row:any) => {
                        return row.user?.employee?.fullName ?? '-';
                    }},
                    {key: "tokens",label: t("dashboard.header.tokens"),value: (row:any) => {
                        return row.creditsUsed
                    }},
                    {key: 'createdAt',label: 'Date & Time',value: (row:any) => {
                        const d = new Date(row.createdAt);
                        return d.getFullYear() +' / '+ (d.getMonth() + 1) +' / '+ d.getDate();
                    }}
                ]}/>
        </section>
    );
}
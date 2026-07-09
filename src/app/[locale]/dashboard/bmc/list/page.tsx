'use client';

import CollectionPage from "@/components/collection/CollectionPage";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import AreYouSureWindow from "@/components/window/AreYouSure";
import config from "@/constants/config";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type BMC = {
    ['customer-segments']: "",
    ['customer-relationships']: "",
    ['channels']: "",
    ['revenue-streams']: "",
    ['key-activities']: "",
    ['key-resources']: "",
    ['key-partners']: "",
    ['cost-structure']: "",
    ['value-propositions']: ""
}

export default function BMCList() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [bmcList, setBmcList] = useState<BMC[]>([]);
    const [loading, setLoading] = useState(true);

    const [deleting, setDeleting] = useState('');
    const [confirmDeleting, setConfirmDeleting] = useState(false);

    useEffect(() => {
        if (loading) {
            fetch(config.apiUrl + '/bmc', { credentials: 'include' })
                .then(res => res.status == 200 ? res.json() : Promise.reject())
                .then(res => {
                    setBmcList(res);
                }).finally(() => {
                    setLoading(false);
                })
        }

        if (deleting != '' && confirmDeleting == true) {
            fetch(config.apiUrl + '/bmc/' + deleting, {
                credentials: "include",
                method: "DELETE"
            })
                .then(res => res.status == 200 ? router.refresh() : Promise.reject())
                .finally(() => {
                    setDeleting('');
                    setConfirmDeleting(false);
                })
        }
    }, [confirmDeleting]);

    if (loading) {
        return <div className='p-5 items-cetner justify-center flex'>
            <ButtonLoader size={30} />
        </div>
    }

    return (<>
        {deleting != ''
            && confirmDeleting == false
            && <AreYouSureWindow
                title="Are You Sure ?"
                setWindowState={() => setDeleting('')}
                confirmCallback={() => setConfirmDeleting(true)} />}
        {deleting != '' && confirmDeleting == true ? <ButtonLoader /> : <section className='flex items-start justify-center gap-5'>
            <CollectionPage
                currentPage={1}
                title="BMCs"
                data={bmcList}
                columns={[
                    { key: 'index', label: "#" },
                    { key: 'date', label: "Date" },
                    { key: "ai-score", label: "AI Score" }
                ]}
                onAdd={() => {
                    router.push('/dashboard/bmc/new');
                }}
                onEdit={(row: any) => {
                    router.push('/dashboard/bmc/' + row.id);
                }}
                onDelete={(row: any) => {
                    setDeleting(row.id);
                }} />
        </section>}
    </>);
}
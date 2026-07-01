'use client';

import CollectionPage from "@/components/collection/CollectionPage";
import AreYouSureWindow from "@/components/window/AreYouSure";
import config from "@/constants/config";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { notificationService } from "@/lib/notifiationSystem";

export default function AccountsList() {

    const router = useRouter();

    const [accounts,setAccounts] = useState([]);

    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(false);
    const [isRemoving,setIsRemoving] = useState('');
    const [confirmRemoving,setConfirmRemoving] = useState(false);

    useEffect(() => {
        if( confirmRemoving == true && isRemoving != '' ) {
            fetch(config.apiUrl +'/finance/account/'+ isRemoving,{credentials: 'include',method: 'DELETE'})
                .then(res => {
                    if( res.status == 200 ) {
                        router.refresh();
                    }else {
                        setIsError(true);
                    }
                }).finally(() => {
                    setConfirmRemoving(false);
                    setIsRemoving('');
                });
        }

        if( isLoading ) {
            fetch(config.apiUrl +'/finance/account',{credentials: 'include'})
                .then(res => res.status == 200 ? res.json():Promise.reject())
                .then(res => {
                    setAccounts(res.data);
                }).catch(() => {
                    notificationService.error("Loading failed", "Could not load accounts. Please try again.");
                    setIsError(true);
                })
                .finally(() => setIsLoading(false));
        }
    },[confirmRemoving]);

    if( isError ) {
        notificationService.error("Error", "Something went wrong. Please try again later.");
        return (<>Something Went Wrong</>);
    }

    return (
        <>
            {isRemoving != '' && confirmRemoving == false && <AreYouSureWindow title = "Remove Account ( Will Remove It's Transactions )" confirmCallback={() => {
                setConfirmRemoving(true);
            }} setWindowState={() => {
                setIsRemoving('');
            }}/>}
            <CollectionPage
                isDeleting = {confirmRemoving && isRemoving != ''}
                title = "Accountant Accounts"
                data = {accounts}
                onEdit={(row:any) => {
                    router.replace('/dashboard/accounts/'+ row.id);
                }}
                onDelete={(row:any) => {
                    setIsRemoving(row.id);
                }}
                onAdd={() => router.replace('/dashboard/accounts/new')}
                columns={[
                    {key: 'id',label: "#"},
                    {key: 'account',label: 'Account ID',sortable: true},
                    {key: 'isDebit',label: 'Debit/Credit',sortable: false}
                ]}
                />
        </>
    );
}
'use client';

import {useState,useEffect} from 'react';

import CollectionPage from "@/components/collection/CollectionPage";
import AreYouSureWindow from '@/components/window/AreYouSure';
import config from '@/constants/config';
import { useRouter } from 'next/navigation';

export default function TransactionsList() {
    
    const route = useRouter();

    const [transactions,setTransactions] = useState([]);

    const [isLoading,setIsLoading] = useState(true);

    const [isRemoving,setIsRemoving] = useState('');
    const [confirmRemoving,setConfirmRemoving] = useState(false);
    
    useEffect(() => {
        if( isLoading ) {
            fetch(config.apiUrl +'/finance/transaction',{credentials: 'include'})
                .then(res => res.status == 200 ? res.json():Promise.reject())
                .then(res => {
                    setTransactions(res.data);
                }).finally(() => setIsLoading(false))
        }
    },[confirmRemoving])

    if( isLoading ) {
        return (<section>
            Loading...
        </section>)
    }

    return (<>
        {isRemoving != '' && confirmRemoving == false && <AreYouSureWindow title = "Delete Transaction" setWindowState={() => {
            setConfirmRemoving(false);
            setIsRemoving('');
        }} confirmCallback={() => {
            setConfirmRemoving(true);
        }}/>}
        <CollectionPage
            onAdd={() => {
                route.replace('/dashboard/transactions/new');
            }}
            title = "Transactions"
            data = {transactions}
            columns={[
                {key: 'id',label: '#'},
                {key: "details",label: "Details"},
                {key: "createdAt",label: "Created At",sortable: true}
            ]} />
    </>)
}
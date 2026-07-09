'use client';

import { useState, useEffect } from 'react';
import CollectionPage from "@/components/collection/CollectionPage";
import AreYouSureWindow from '@/components/window/AreYouSure';
import config from '@/constants/config';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TransactionsList() {
    const route = useRouter();
    const searchParams = useSearchParams();
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRemoving, setIsRemoving] = useState('');
    const [confirmRemoving, setConfirmRemoving] = useState(false);

    useEffect(() => {
        if (isLoading) {
            fetch(config.apiUrl + '/finance/transaction', { credentials: 'include' })
                .then(res => res.status === 200 ? res.json() : Promise.reject())
                .then(res => {
                    setTransactions(res.data || []);
                })
                .catch(err => {
                    console.error("Failed to load transactions", err);
                })
                .finally(() => setIsLoading(false));
        }
    }, [isLoading]);

    useEffect(() => {
        if (confirmRemoving && isRemoving !== '') {
            fetch(config.apiUrl + '/finance/transactions/' + isRemoving, {
                credentials: 'include',
                method: 'DELETE'
            })
            .then(res => {
                if (res.status === 200) {
                    setTransactions(prev => prev.filter((t: any) => t.id !== isRemoving));
                } else {
                    console.error("Failed to delete transaction");
                }
            })
            .catch(err => console.error("Error during deletion", err))
            .finally(() => {
                setConfirmRemoving(false);
                setIsRemoving('');
            });
        }
    }, [confirmRemoving, isRemoving]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12 text-text-secondary font-medium">
                Loading transactions...
            </div>
        );
    }

    return (
        <>
            {isRemoving !== '' && !confirmRemoving && (
                <AreYouSureWindow 
                     title="Delete Transaction" 
                     setWindowState={() => {
                         setConfirmRemoving(false);
                         setIsRemoving('');
                     }} 
                     confirmCallback={() => {
                         setConfirmRemoving(true);
                     }}
                />
            )}
            <CollectionPage
                currentPage={searchParams.has('p') ? Math.abs(Number(searchParams.get('p'))):1}
                onAdd={() => {
                    route.replace('/dashboard/transactions/new');
                }}
                onEdit={(row: any) => {
                    route.replace(`/dashboard/transactions/${row.id}`);
                }}
                onDelete={(row: any) => {
                    setIsRemoving(row.id);
                }}
                title="Ledger Transactions"
                data={transactions}
                columns={[
                    { key: 'id', label: '#' },
                    { 
                        key: 'date', 
                        label: 'Date', 
                        sortable: true,
                        value: (row: any) => row.date ? new Date(row.date).toLocaleDateString() : 'N/A'
                    },
                    { key: 'details', label: 'Details / Memo' },
                    {
                        key: 'entities',
                        label: 'Journal Entries (Split)',
                        value: (row: any) => {
                            if (!row.entities || row.entities.length === 0) return <span className="text-text-muted italic">No entries</span>;
                            return (
                                <div className="flex flex-col gap-1.5 max-w-md my-1">
                                    {row.entities.map((ent: any, idx: number) => {
                                        const accountName = ent.account?.slug || `Account #${ent.accountId}`;
                                        return (
                                            <div key={idx} className="flex items-center text-xs">
                                                <span className={`px-2 py-0.5 rounded font-mono font-extrabold text-[9px] w-7 text-center mr-2 border ${
                                                    ent.isDebit 
                                                        ? 'bg-teal-50 text-teal-700 border-teal-200' 
                                                        : 'bg-indigo-50 text-indigo-700 border-indigo-200 ml-4'
                                                }`}>
                                                    {ent.isDebit ? 'DR' : 'CR'}
                                                </span>
                                                <span className="text-text-primary font-medium">{accountName}</span>
                                                <span className="ml-auto text-text-secondary font-mono bg-background px-1.5 py-0.5 rounded border border-border">
                                                    ${ent.amount.toFixed(2)}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        }
                    },
                    {
                        key: 'amount',
                        label: 'Total Value',
                        value: (row: any) => {
                            if (!row.entities || row.entities.length === 0) return '$0.00';
                            const debitsSum = row.entities
                                .filter((ent: any) => ent.isDebit)
                                .reduce((sum: number, ent: any) => sum + ent.amount, 0);
                            return (
                                <span className="font-mono font-bold text-text-primary bg-primary-light/35 px-2.5 py-1 rounded-md text-sm border border-primary-light">
                                    ${debitsSum.toFixed(2)}
                                </span>
                            );
                        }
                    }
                ]} 
            />
        </>
    );
}
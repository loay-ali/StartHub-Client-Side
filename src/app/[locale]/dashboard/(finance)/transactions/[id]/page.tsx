'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import TransactionForm from "@/components/dashboard/pages/finance/TransactionForm";
import config from '@/constants/config';
import { ButtonLoader } from "@/components/preloader/ButtonLoader";

export default function EditTransactionPage() {
    const { id } = useParams();
    const [transaction, setTransaction] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (id) {
            fetch(config.apiUrl + '/finance/transactions/' + id, { credentials: 'include' })
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                    throw new Error("Failed to fetch transaction");
                })
                .then(res => {
                    setTransaction(res.data);
                })
                .catch(err => {
                    console.error(err);
                    setIsError(true);
                })
                .finally(() => setIsLoading(false));
        }
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12">
                <ButtonLoader size={30} />
            </div>
        );
    }

    if (isError || !transaction) {
        return (
            <div className="text-center p-12 text-danger font-bold">
                Transaction not found or could not be retrieved.
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-6">
            <TransactionForm 
                transactionId={id as string} 
                initialData={transaction} 
                isEdit={true} 
            />
        </div>
    );
}

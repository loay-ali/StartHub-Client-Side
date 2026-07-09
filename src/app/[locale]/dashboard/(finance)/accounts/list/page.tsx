'use client';

import CollectionPage from "@/components/collection/CollectionPage";
import AreYouSureWindow from "@/components/window/AreYouSure";
import config from "@/constants/config";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { notificationService } from "@/lib/notifiationSystem";
import { FiBookOpen, FiArrowRight, FiArrowLeft, FiPlus, FiFolder } from "react-icons/fi";

export default function AccountsList() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [accounts, setAccounts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isRemoving, setIsRemoving] = useState('');
    const [confirmRemoving, setConfirmRemoving] = useState(false);

    const loadAccounts = () => {
        setIsLoading(true);
        fetch(config.apiUrl + '/finance/account', { credentials: 'include' })
            .then(res => res.status === 200 ? res.json() : Promise.reject())
            .then(res => {
                setAccounts(res.data || []);
            })
            .catch(() => {
                notificationService.error("Loading failed", "Could not load accounts. Please try again.");
                setIsError(true);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        loadAccounts();
    }, []);

    useEffect(() => {
        if (confirmRemoving && isRemoving !== '') {
            fetch(config.apiUrl + '/finance/account/' + isRemoving, {
                credentials: 'include',
                method: 'DELETE'
            })
            .then(res => {
                if (res.status === 200) {
                    notificationService.success("Account Deleted", "The account has been removed successfully.");
                    loadAccounts();
                } else {
                    notificationService.error("Deletion Failed", "Failed to remove the account. Ensure it has no dependent transactions.");
                }
            })
            .catch(() => {
                notificationService.error("Error", "Something went wrong during deletion.");
            })
            .finally(() => {
                setConfirmRemoving(false);
                setIsRemoving('');
            });
        }
    }, [confirmRemoving, isRemoving]);

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-surface rounded-2xl border border-border">
                <p className="text-text-secondary font-medium mb-4">Something went wrong while loading accounts.</p>
                <button 
                    onClick={loadAccounts} 
                    className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12 text-text-secondary font-medium">
                Loading accounts...
            </div>
        );
    }

    // Stats
    const totalAccounts = accounts.length;
    const debitAccounts = accounts.filter(a => a.isDebit).length;
    const creditAccounts = accounts.filter(a => !a.isDebit).length;

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-text-secondary">Total Accounts</p>
                        <h3 className="text-3xl font-extrabold text-text-primary mt-1">{totalAccounts}</h3>
                    </div>
                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                        <FiBookOpen size={24} />
                    </div>
                </div>

                <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-text-secondary">Debit Nature (Assets/Expenses)</p>
                        <h3 className="text-3xl font-extrabold text-teal-600 mt-1">{debitAccounts}</h3>
                    </div>
                    <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
                        <FiArrowRight size={24} />
                    </div>
                </div>

                <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-text-secondary">Credit Nature (Liabilities/Revenue/Equity)</p>
                        <h3 className="text-3xl font-extrabold text-indigo-600 mt-1">{creditAccounts}</h3>
                    </div>
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                        <FiArrowLeft size={24} />
                    </div>
                </div>
            </div>

            {isRemoving !== '' && !confirmRemoving && (
                <AreYouSureWindow 
                    title="Remove Account (Will Remove Associated Transactions)" 
                    confirmCallback={() => setConfirmRemoving(true)} 
                    setWindowState={() => setIsRemoving('')}
                />
            )}

            <CollectionPage
                currentPage={searchParams.has('p') ? Math.abs(Number(searchParams.get('p'))) : 1}
                isDeleting={confirmRemoving && isRemoving !== ''}
                title="Chart of Accounts"
                data={accounts}
                onEdit={(row: any) => {
                    router.replace('/dashboard/accounts/' + row.id);
                }}
                onDelete={(row: any) => {
                    setIsRemoving(row.id);
                }}
                onAdd={() => router.replace('/dashboard/accounts/new')}
                columns={[
                    {
                        key: 'accountId',
                        label: 'Account Code',
                        sortable: true,
                        value: (row: any) => (
                            <span className="font-mono font-bold text-sm text-text-primary bg-background px-2.5 py-1 rounded border border-border">
                                {row.accountId}
                            </span>
                        )
                    },
                    {
                        key: 'slug',
                        label: 'Account Name',
                        sortable: true,
                        value: (row: any) => (
                            <span className="font-bold text-text-primary">
                                {row.slug}
                            </span>
                        )
                    },
                    {
                        key: 'isDebit',
                        label: 'Nature',
                        sortable: true,
                        value: (row: any) => (
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                row.isDebit 
                                    ? 'bg-teal-50 text-teal-700 border border-teal-200' 
                                    : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                            }`}>
                                {row.isDebit ? 'Debit (DR)' : 'Credit (CR)'}
                            </span>
                        )
                    },
                    {
                        key: 'parent',
                        label: 'Parent Account',
                        sortable: false,
                        value: (row: any) => {
                            if (!row.parent) return <span className="text-text-muted text-xs italic">Top-level Account</span>;
                            return (
                                <div className="flex items-center gap-1.5 text-text-secondary text-xs">
                                    <FiFolder className="opacity-70" />
                                    <span>{row.parent.accountId} - {row.parent.slug}</span>
                                </div>
                            );
                        }
                    }
                ]}
            />
        </div>
    );
}
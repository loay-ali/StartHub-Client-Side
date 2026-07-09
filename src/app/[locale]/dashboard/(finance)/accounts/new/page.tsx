'use client';

import AIHelperButton from "@/components/ai/AIHelperButton";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { notificationService } from "@/lib/notifiationSystem";
import { FiChevronLeft, FiPlus, FiAlertCircle } from "react-icons/fi";

type Account = {
    id: string;
    slug: string;
    accountId: number;
    isDebit: boolean;
    parentId?: string;
}

export default function NewAccount() {
    const router = useRouter();

    const [allAccounts, setAllAccounts] = useState<Account[]>([]);
    const [loadingAccounts, setLoadingAccounts] = useState(true);
    const [account, setAccount] = useState<Partial<Account>>({
        slug: "",
        accountId: undefined,
        isDebit: true,
        parentId: ""
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetch(config.apiUrl + '/finance/account', { credentials: "include" })
            .then(res => res.status === 200 ? res.json() : Promise.reject())
            .then(res => {
                setAllAccounts(res.data || []);
            })
            .catch(err => {
                console.error("Failed to load parent accounts", err);
                notificationService.error("Accounts Error", "Failed to fetch accounts list for parent selection.");
            })
            .finally(() => {
                setLoadingAccounts(false);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!account.slug || account.slug.trim() === "") {
            notificationService.warning("Validation Error", "Please provide a valid account name.");
            return;
        }

        if (account.accountId === undefined || isNaN(account.accountId) || account.accountId <= 0) {
            notificationService.warning("Validation Error", "Please provide a valid unique account code.");
            return;
        }

        setIsSaving(true);

        const payload = {
            id: Number(account.accountId),
            slug: account.slug,
            isDebit: account.isDebit,
            parentAccountID: account.parentId === "" ? undefined : account.parentId
        };

        try {
            const res = await fetch(config.apiUrl + '/finance/account', {
                credentials: 'include',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (res.status === 201) {
                notificationService.success("Account Created", "The new accounting account has been registered.");
                router.push('/dashboard/accounts/list');
            } else {
                const errData = await res.json();
                notificationService.error("Creation Failed", errData.message || "Failed to create account. Make sure account code is unique.");
            }
        } catch (err) {
            console.error("Error creating account", err);
            notificationService.error("Error", "An unexpected error occurred while creating the account.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loadingAccounts) {
        return (
            <div className="flex items-center justify-center p-12 text-text-secondary font-medium">
                <ButtonLoader size={30} />
            </div>
        );
    }

    return (
        <section className='flex items-start'>
            <section className='bg-white shadow p-5 rounded'>
                <h2>
                    Account Page
                </h2>

                <div className='form-group relative'>
                    <label htmlFor="slug">Slug</label>
                    <input type='text' defaultValue={account.slug} onInput={ele => setAccount(account => {
                        account.slug = ele.currentTarget.value;
                        return account;
                    })} />
                    <AIHelperButton purpose="accountSlug" message={{
                        content: "What Do You Need For Account Slug Field ?",
                        actions: [],
                        //@ts-ignore
                        additional: { slug: account.slug }
                    }} />
                </div>
                <button
                    type="button"
                    onClick={() => router.push('/dashboard/accounts/list')}
                    className="px-4 py-2 border border-border rounded-xl text-text-secondary hover:bg-surface-hover transition flex items-center gap-1.5 text-sm font-medium"
                >
                    <FiChevronLeft /> Back to List
                </button>

                {/* Form Card */}
                <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="slug" className="text-sm font-bold text-text-primary">Account Name</label>
                        <input
                            id="slug"
                            type="text"
                            required
                            placeholder="e.g. Accounts Receivable, Cash, Rent Expense"
                            value={account.slug}
                            onChange={e => setAccount(prev => ({ ...prev, slug: e.target.value }))}
                            className="rounded-xl border border-border p-2.5 outline-none focus:border-primary transition font-medium"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="accountId" className="text-sm font-bold text-text-primary">Account Code (Unique Number)</label>
                        <input
                            id="accountId"
                            type="number"
                            required
                            min="1"
                            placeholder="e.g. 1000, 1100, 2000"
                            value={account.accountId ?? ""}
                            onChange={e => setAccount(prev => ({ ...prev, accountId: Number(e.target.value) }))}
                            className="rounded-xl border border-border p-2.5 outline-none focus:border-primary transition font-medium"
                        />
                        <p className="text-xs text-text-muted">Standard convention: Assets 1xxx, Liabilities 2xxx, Equity 3xxx, Revenues 4xxx, Expenses 5xxx.</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-primary">Nature of Balance</label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${account.isDebit
                                    ? 'bg-teal-50/50 border-teal-500/30 text-teal-700 font-semibold'
                                    : 'border-border text-text-secondary hover:bg-surface-hover'
                                }`}>
                                <input
                                    type="radio"
                                    name="isDebit"
                                    checked={account.isDebit === true}
                                    onChange={() => setAccount(prev => ({ ...prev, isDebit: true }))}
                                    className="text-teal-600 focus:ring-teal-500"
                                />
                                <div>
                                    <p className="text-sm">Debit Balance</p>
                                    <p className="text-xs font-normal text-text-muted mt-0.5">Assets, Expenses</p>
                                </div>
                            </label>

                            <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${!account.isDebit
                                    ? 'bg-indigo-50/50 border-indigo-500/30 text-indigo-700 font-semibold'
                                    : 'border-border text-text-secondary hover:bg-surface-hover'
                                }`}>
                                <input
                                    type="radio"
                                    name="isDebit"
                                    checked={account.isDebit === false}
                                    onChange={() => setAccount(prev => ({ ...prev, isDebit: false }))}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <div>
                                    <p className="text-sm">Credit Balance</p>
                                    <p className="text-xs font-normal text-text-muted mt-0.5">Liabilities, Equity, Revenues</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="parentId" className="text-sm font-bold text-text-primary">Parent Account (Optional)</label>
                        <select
                            id="parentId"
                            value={account.parentId}
                            onChange={e => setAccount(prev => ({ ...prev, parentId: e.target.value }))}
                            className="rounded-xl border border-border p-2.5 outline-none focus:border-primary transition font-medium"
                        >
                            <option value="">None (Top-Level Account)</option>
                            {allAccounts.map(acco => (
                                <option key={acco.id} value={acco.id}>
                                    {acco.accountId} - {acco.slug}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-border pt-6">
                        <button
                            type="button"
                            onClick={() => router.push('/dashboard/accounts/list')}
                            className="px-5 py-2.5 border border-border rounded-xl text-text-secondary hover:bg-surface-hover transition duration-200 text-sm font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition duration-200 shadow-sm flex items-center justify-center min-w-[120px]"
                        >
                            {isSaving ? <ButtonLoader size={20} /> : "Create Account"}
                        </button>
                    </div>
                </form>
            </section>
        </section>
    );
}
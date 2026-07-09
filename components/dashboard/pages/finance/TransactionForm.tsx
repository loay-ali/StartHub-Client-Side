'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiPlus, FiTrash2, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import config from '@/constants/config';
import { notificationService } from '@/lib/notifiationSystem';
import AIHelperButton from "@/components/ai/AIHelperButton";

type Account = {
    id: string;
    accountId: number;
    slug: string;
    isDebit: boolean;
};

type JournalLine = {
    accountId: number;
    debit: string;
    credit: string;
};

type TransactionFormProps = {
    transactionId?: string;
    initialData?: {
        id: string;
        date: string;
        details: string;
        entities: {
            accountId: number;
            amount: number;
            isDebit: boolean;
        }[];
    };
    isEdit?: boolean;
};

export default function TransactionForm({ transactionId, initialData, isEdit = false }: TransactionFormProps) {
    const router = useRouter();
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loadingAccounts, setLoadingAccounts] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form states
    const [date, setDate] = useState(() => {
        if (initialData?.date) {
            return new Date(initialData.date).toISOString().split('T')[0];
        }
        return new Date().toISOString().split('T')[0];
    });
    const [details, setDetails] = useState(initialData?.details || '');
    const [lines, setLines] = useState<JournalLine[]>(() => {
        if (initialData?.entities && initialData.entities.length > 0) {
            return initialData.entities.map(ent => ({
                accountId: ent.accountId,
                debit: ent.isDebit ? String(ent.amount) : '',
                credit: ent.isDebit ? '' : String(ent.amount)
            }));
        }
        return [
            { accountId: 0, debit: '', credit: '' },
            { accountId: 0, debit: '', credit: '' }
        ];
    });

    // Fetch account list
    useEffect(() => {
        fetch(config.apiUrl + '/finance/account', { credentials: 'include' })
            .then(res => res.status === 200 ? res.json() : Promise.reject())
            .then(res => {
                setAccounts(res.data || []);
            })
            .catch(err => {
                console.error("Failed to load accounts", err);
                notificationService.error("Accounts Error", "Failed to fetch accounts. Please check your connection.");
            })
            .finally(() => setLoadingAccounts(false));
    }, []);

    // Calculate totals
    const totalDebits = lines.reduce((sum, line) => {
        const val = parseFloat(line.debit);
        return sum + (isNaN(val) ? 0 : val);
    }, 0);

    const totalCredits = lines.reduce((sum, line) => {
        const val = parseFloat(line.credit);
        return sum + (isNaN(val) ? 0 : val);
    }, 0);

    const difference = Math.abs(totalDebits - totalCredits);
    const isBalanced = difference < 0.01 && totalDebits > 0;
    const hasEmptyAccounts = lines.some(line => line.accountId === 0);
    const hasEmptyAmounts = lines.some(line => {
        const d = parseFloat(line.debit);
        const c = parseFloat(line.credit);
        return (isNaN(d) || d <= 0) && (isNaN(c) || c <= 0);
    });

    const isValid = isBalanced && !hasEmptyAccounts && !hasEmptyAmounts;

    // Line Handlers
    const handleLineChange = (index: number, field: keyof JournalLine, value: any) => {
        const newLines = [...lines];
        if (field === 'accountId') {
            newLines[index].accountId = Number(value);
        } else {
            // If typing in debit, clear credit and vice versa
            newLines[index][field] = value;
            if (field === 'debit' && value !== '') {
                newLines[index].credit = '';
            } else if (field === 'credit' && value !== '') {
                newLines[index].debit = '';
            }
        }
        setLines(newLines);
    };

    const addLine = () => {
        setLines([...lines, { accountId: 0, debit: '', credit: '' }]);
    };

    const removeLine = (index: number) => {
        if (lines.length <= 2) {
            notificationService.warning("Required Lines", "A transaction must have at least 2 journal lines.");
            return;
        }
        setLines(lines.filter((_, idx) => idx !== index));
    };

    // Auto-balance feature
    const handleAutoBalance = () => {
        if (difference <= 0) return;
        
        // Find the first line with missing amount or append a new line
        const unbalancedLines = [...lines];
        const lastLineIdx = unbalancedLines.length - 1;
        
        if (totalDebits > totalCredits) {
            // Need credit
            if (unbalancedLines[lastLineIdx].debit === '' && unbalancedLines[lastLineIdx].credit === '') {
                unbalancedLines[lastLineIdx].credit = difference.toFixed(2);
            } else {
                unbalancedLines.push({ accountId: 0, debit: '', credit: difference.toFixed(2) });
            }
        } else {
            // Need debit
            if (unbalancedLines[lastLineIdx].debit === '' && unbalancedLines[lastLineIdx].credit === '') {
                unbalancedLines[lastLineIdx].debit = difference.toFixed(2);
            } else {
                unbalancedLines.push({ accountId: 0, debit: difference.toFixed(2), credit: '' });
            }
        }
        setLines(unbalancedLines);
    };

    // Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;

        setIsSaving(true);

        const payload = {
            createdAt: new Date(date).toISOString(),
            details,
            entities: lines
                .filter(l => l.accountId > 0)
                .map(l => {
                    const isDebit = parseFloat(l.debit) > 0;
                    return {
                        accountId: l.accountId,
                        value: isDebit ? parseFloat(l.debit) : parseFloat(l.credit),
                        isDebit
                    };
                })
        };

        const url = isEdit 
            ? `${config.apiUrl}/finance/transactions/${transactionId}`
            : `${config.apiUrl}/finance/transactions`;

        const method = isEdit ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                credentials: 'include'
            });

            if (res.ok) {
                notificationService.success(
                    isEdit ? "Transaction Updated" : "Transaction Created",
                    isEdit ? "The transaction ledger has been updated successfully." : "The new transaction has been registered successfully."
                );
                router.replace('/dashboard/transactions/list');
            } else {
                const data = await res.json();
                notificationService.error("Saving Failed", data.message || "Failed to save transaction.");
            }
        } catch (err) {
            console.error("Submission error", err);
            notificationService.error("Submission Error", "An error occurred while saving the transaction.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loadingAccounts) {
        return (
            <div className="flex items-center justify-center p-12 text-text-secondary font-medium">
                Loading accounts...
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto pb-12">
            {/* Header Area */}
            <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
                        {isEdit ? 'Edit Journal Entry' : 'New Journal Entry'}
                    </h1>
                    <p className="text-sm text-text-secondary mt-1">
                        Record financial transaction debit and credit adjustments.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => router.replace('/dashboard/transactions/list')}
                        className="px-4 py-2 border border-border rounded-xl text-text-secondary hover:bg-surface-hover transition duration-200 text-sm font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!isValid || isSaving}
                        className={`px-5 py-2 rounded-xl font-medium text-sm flex items-center gap-2 shadow-sm transition duration-200 ${
                            isValid && !isSaving
                                ? 'bg-primary text-white hover:bg-primary-dark cursor-pointer'
                                : 'bg-border text-text-muted cursor-not-allowed'
                        }`}
                    >
                        {isSaving && <AiOutlineLoading3Quarters className="animate-spin text-white" />}
                        {isEdit ? 'Update Entry' : 'Post Entry'}
                    </button>
                </div>
            </div>

            {/* General Information Card */}
            <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 flex flex-col gap-2">
                    <label htmlFor="date" className="text-sm font-bold text-text-primary">
                        Transaction Date
                    </label>
                    <input
                        id="date"
                        type="date"
                        required
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="rounded-xl border border-border p-2.5 outline-none focus:border-primary transition font-medium"
                    />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2 relative">
                    <label htmlFor="details" className="text-sm font-bold text-text-primary">
                        Memo / Description
                    </label>
                    <input
                        id="details"
                        type="text"
                        placeholder="Provide details about the transaction adjustment..."
                        value={details}
                        onChange={e => setDetails(e.target.value)}
                        className="rounded-xl border border-border p-2.5 outline-none focus:border-primary transition font-medium pr-10"
                    />
                    <AIHelperButton purpose="transactionDetails" message={{
                        content: "What do you need for Memo / Description field?",
                        actions: [],
                        //@ts-ignore
                        additional: { details }
                    }} />
                </div>
            </div>

            {/* Journal Entries Grid */}
            <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border bg-background flex items-center justify-between">
                    <h3 className="font-bold text-text-primary">Journal Splits</h3>
                    <button
                        type="button"
                        onClick={addLine}
                        className="flex items-center gap-1.5 text-xs text-primary font-bold border border-primary/20 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition"
                    >
                        <FiPlus /> Add Line
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border">
                        <thead>
                            <tr className="bg-background/50">
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase tracking-wider w-[50%]">
                                    Account
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-text-secondary uppercase tracking-wider w-[20%]">
                                    Debit ($)
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-text-secondary uppercase tracking-wider w-[20%]">
                                    Credit ($)
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-text-secondary uppercase tracking-wider w-[10%]">
                                    Remove
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-surface">
                            {lines.map((line, index) => (
                                <tr key={index} className="hover:bg-surface-hover/30 transition">
                                    <td className="px-6 py-3">
                                        <select
                                            value={line.accountId}
                                            onChange={e => handleLineChange(index, 'accountId', e.target.value)}
                                            className="w-full rounded-xl border border-border p-2 outline-none focus:border-primary text-sm font-medium"
                                        >
                                            <option value={0}>-- Select Account --</option>
                                            {accounts.map(acc => (
                                                <option key={acc.id} value={acc.accountId}>
                                                    {acc.accountId} - {acc.slug} ({acc.isDebit ? 'Asset/Expense' : 'Liability/Equity/Revenue'})
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-3">
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            placeholder="0.00"
                                            value={line.debit}
                                            onChange={e => handleLineChange(index, 'debit', e.target.value)}
                                            className="w-full text-right rounded-xl border border-border p-2 outline-none focus:border-primary font-mono text-sm"
                                        />
                                    </td>
                                    <td className="px-6 py-3">
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            placeholder="0.00"
                                            value={line.credit}
                                            onChange={e => handleLineChange(index, 'credit', e.target.value)}
                                            className="w-full text-right rounded-xl border border-border p-2 outline-none focus:border-primary font-mono text-sm"
                                        />
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        <button
                                            type="button"
                                            onClick={() => removeLine(index)}
                                            className="text-text-muted hover:text-danger hover:bg-danger/5 p-2 rounded-lg transition"
                                            title="Delete Line"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        
                        {/* Summary / Totals Footer */}
                        <tfoot>
                            <tr className="bg-background font-bold text-text-primary border-t-2 border-border">
                                <td className="px-6 py-4 text-sm font-extrabold uppercase">
                                    Totals
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-sm text-teal-700 bg-teal-50/20">
                                    ${totalDebits.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-sm text-indigo-700 bg-indigo-50/20">
                                    ${totalCredits.toFixed(2)}
                                </td>
                                <td className="px-6 py-4"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Balancing & Verification Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border transition duration-300 shadow-sm bg-surface border-border">
                <div className="flex items-start gap-3">
                    {isBalanced ? (
                        <div className="p-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-600">
                            <FiCheck size={20} />
                        </div>
                    ) : (
                        <div className="p-2 rounded-xl bg-warning/10 border border-warning/20 text-warning">
                            <FiAlertCircle size={20} />
                        </div>
                    )}
                    <div>
                        <h4 className="font-extrabold text-sm text-text-primary">
                            {isBalanced ? 'Entry Balanced' : 'Unbalanced Entry'}
                        </h4>
                        <p className="text-xs text-text-secondary mt-0.5">
                            {isBalanced 
                                ? 'The transaction meets double-entry requirements and can be safely posted.' 
                                : `Debits and credits do not balance. Out by $${difference.toFixed(2)}.`
                            }
                        </p>
                    </div>
                </div>

                {!isBalanced && difference > 0 && (
                    <button
                        type="button"
                        onClick={handleAutoBalance}
                        className="px-4 py-2 text-xs font-bold text-warning border border-warning/20 bg-warning/5 hover:bg-warning/10 rounded-xl transition self-start md:self-center"
                    >
                        Auto-Balance Row
                    </button>
                )}
            </div>
        </form>
    );
}

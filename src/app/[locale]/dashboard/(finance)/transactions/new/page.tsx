'use client';

import TransactionForm from "@/components/dashboard/pages/finance/TransactionForm";

export default function NewTransaction() {
    return (
        <div className="container mx-auto p-4 md:p-6">
            <TransactionForm />
        </div>
    );
}
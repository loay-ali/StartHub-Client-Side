'use client';

import TransactionForm from "@/components/dashboard/pages/finance/TransactionForm";
import AISection, { ActionType } from "@/components/ai/section/AISection";
import { BsCashCoin } from "react-icons/bs";

export default function NewTransaction() {
    return (
        <section className='flex gap-5 justify-center items-start flex-wrap max-w-[1200px] m-auto p-4 md:p-6'>
            <section className='w-full max-w-[850px] grow order-[2] md:order-[1]'>
                <TransactionForm />
            </section>
            <AISection
                title="Need Some Guidance?"
                Icon={BsCashCoin}
                initialActions={[
                    { title: "Fill Using AI", action: 'fillTransaction', type: ActionType.CHAT }
                ]}
            />
        </section>
    );
}
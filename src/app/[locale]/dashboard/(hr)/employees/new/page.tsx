'use client';

import AISection, { ActionType } from "@/components/ai/section/AISection";
import { BsPersonPlus } from "react-icons/bs";

export default function NewEmployee() {
    return (
        <section className = 'flex items-start justify-center gap-5 flex-wrap max-w-[1000px] m-auto'>
            <section className = 'bg-white shadow rounded p-5 w-full max-w-[750px] grow order-[2] md:order-[1]'>
                <h2 className='text-2xl'>
                    New Employee
                </h2>
            </section>
            
            <AISection
                title="Need Some Guidance?"
                Icon={BsPersonPlus}
                initialActions={[
                    { title: "Fill Using AI", action: 'fillEmployee', type: ActionType.CHAT }
                ]}
            />
        </section>
    );
}
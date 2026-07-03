'use client';

import { GiArtificialHive } from "react-icons/gi";
import AIWindow from "./window/window";
import { useAIContext } from "../layout/dashboard-layout/DashboardLayout";
import { AIMessage } from "@/types/ai";

export default function AIHelperButton({purpose,message,additional}:{purpose:string,message:AIMessage,additional:Record<string,any>}) {
    const ai = useAIContext();

    return (
        <>
        <button type = 'button' onClick = {() => {
                ai.setPurpose?.(ai.open == false ? purpose:'');
                ai.toggleAI()
                ai.addMessage ? ai.addMessage(''):null;
            }} className = {(purpose == ai.purpose && ai.open ? 'opacity-[1]!':'') +' text-primary inset-s-[calc(100%_-_30px)] bottom-[calc(64%)] opacity-[0.5] rounded-full flex items-center justify-center hover:opacity-[1] transition-opacity absolute h-[30px] w-[30px] shadow p-1 text-white rounded cursor-pointer'}>
            <GiArtificialHive size = {20} color = 'var(--color-primary)' />
        </button>
        </>
    )
}
'use client';

import { Sparkles, X } from "lucide-react";
import { useAIContext } from "../layout/dashboard-layout/DashboardLayout";

export default function AIMainButton({opened,setOpen}:{opened:boolean,setOpen:() => void}) {
    const ai = useAIContext();

    return (
        <button
            type="button"
            aria-label={opened ? "Close AI Assistant" : "Open AI Assistant"}
            onClick={() => {
                ai.setPurpose?.('');
                setOpen();
            }}
            className={
                "fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl " +
                (opened ? "pointer-events-none scale-0 opacity-0" : "scale-100 opacity-100")
            }
        >
            {opened ? <X size={22} /> : <Sparkles size={22} />}
        </button>
    );
}
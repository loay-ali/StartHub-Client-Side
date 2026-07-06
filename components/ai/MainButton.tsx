'use client';

import { Sparkles, X } from "lucide-react";
import { useAIContext } from "../providers/AIProvider";

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
                "fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary " +
                (opened ? "pointer-events-none scale-0 opacity-0" : "scale-100 opacity-100")
            }
        >
            {/* Pulse ring — visible only when panel is closed */}
            {!opened && (
                <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-primary/40 animate-ping motion-reduce:animate-none"
                />
            )}
            <span className="relative z-10">
                {opened ? <X size={22} /> : <Sparkles size={22} />}
            </span>
        </button>
    );
}
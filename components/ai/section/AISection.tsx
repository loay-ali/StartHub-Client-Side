'use client';

import { useAIContext } from "@/components/layout/dashboard-layout/DashboardLayout";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { useRouter } from "next/navigation";
import { ElementType, useEffect, useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export enum ActionType {
    LINK,
    ACTION,
    CHAT
}

export default function AISection({
    Icon,
    title,
    initialActions,
    additional
}:{
    additional?:Record<string,any>,
    Icon:ElementType,
    title:string,
    initialActions: {title:string,type:ActionType,action:Function|string}[]
}) {
        
    const [content,setContent] = useState('');
    const [loading,setLoading] = useState(false);

    const router = useRouter();
    const ai = useAIContext();

    useEffect(() => {
        // Reserved for future data fetching logic if needed
    },[]);

    return (
    <section className="sticky top-[100px] mb-6 flex w-full min-w-[280px] max-w-sm flex-col overflow-hidden rounded-3xl border border-teal-500/20 bg-slate-900 text-white shadow-[0_20px_50px_-12px_rgba(20,184,166,0.25)]">
        
        {/* Ambient Glow Effects */}
        <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500" />
        <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col p-6">
            {/* Header */}
            <header className="mb-6 flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-inner">
                    <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h2 className="text-base font-bold tracking-wide text-white">{title}</h2>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-teal-200/70">
                        <Sparkles className="h-3 w-3" /> AI Assistant
                    </p>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex min-h-[120px] grow flex-col">
                {content === '' && loading === false ? (
                    <div className="flex flex-col gap-2.5">
                        {initialActions.map((a, i) => (
                            <button 
                                key={i}
                                onClick={() => {
                                    setLoading(true);
                                    switch(a.type) {
                                        case ActionType.ACTION:
                                            (a.action as Function)(setContent);
                                            break;
                                        case ActionType.LINK:
                                            router.push(a.action as string);
                                            break;
                                        case ActionType.CHAT:
                                            ai.toggleAI();
                                            ai.setPurpose?.(a.action as string);
                                            setLoading(false);
                                            break;
                                    }
                                }} 
                                type="button" 
                                className="group flex w-full items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-teal-500/30 hover:bg-white/10 hover:shadow-[0_0_15px_-3px_rgba(20,184,166,0.2)]"
                            >
                                <span className="transition-transform duration-300 group-hover:translate-x-1">{a.title}</span>
                                <ArrowRight className="h-4 w-4 text-slate-500 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-teal-400" />
                            </button>
                        ))}
                    </div>
                ) : null}

                {/* Loading State */}
                {loading ? (
                    <div className="flex h-full flex-col items-center justify-center gap-4 py-8">
                        <div className="relative flex h-12 w-12 items-center justify-center">
                            <div className="absolute inset-0 animate-ping rounded-full bg-teal-500/40" />
                            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.5)]">
                                <Sparkles className="h-5 w-5 animate-pulse text-white" />
                            </div>
                        </div>
                        <p className="animate-pulse text-[10px] font-bold uppercase tracking-widest text-teal-300">Generating...</p>
                    </div>
                ) : (
                    content !== '' && (
                        <div 
                            className="custom-scrollbar prose prose-sm prose-invert max-h-[300px] max-w-none overflow-y-auto pr-2 text-slate-300 duration-500 animate-in fade-in slide-in-from-bottom-4 prose-headings:text-white hover:prose-a:text-teal-300 prose-a:text-teal-400"
                            dangerouslySetInnerHTML={{ __html: content }} 
                        />
                    )
                )}
            </div>
        </div>
    </section>
    );
}
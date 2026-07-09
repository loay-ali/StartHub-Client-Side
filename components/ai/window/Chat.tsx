/* eslint-disable @typescript-eslint/no-unsafe-function-type */
'use client';

import Link from "next/link";
import { Bot, Clock3 } from "lucide-react";
import { useEffect, useRef } from "react";

import { ChatData } from "@/types/requests/ai";
import { useAIContext } from "@/components/providers/AIProvider";
import { useTranslations } from "next-intl";

type ChatProps = ChatData & {
    isSending?: boolean;
    onSuggestion?: (text: string) => void;
};

export default function Chat(data: ChatProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    const aiContext = useAIContext();

    // Fixed: the chat never used to scroll to the newest message on its
    // own — this keeps the latest bubble (or the typing indicator) in view.
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [data.messages.length, data.isSending]);

    const isEmpty = data.messages.length === 0 && !data.isSending;

    const t = useTranslations();

    return (
        <section className="min-h-0 flex-1 overflow-y-auto bg-background px-4 py-4">
            {isEmpty && (
                <div className="flex h-full flex-col items-center justify-center gap-4 px-2 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Bot size={22} className="text-primary" />
                    </span>
                    <div>
                        <p className="font-bold text-text-primary">{t('dashboard.ai.ask-your-founder-copilot')}</p>
                        <p className="mt-1 text-sm text-text-secondary">
                            {t('dashboard.ai.body')}
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        {aiContext.suggestions?.map((suggestion) => (
                            <button
                                key={suggestion}
                                type="button"
                                onClick={() => data.onSuggestion?.(suggestion)}
                                className="rounded-xl border-none shadow-sm bg-surface px-3 py-2 text-left text-sm text-text-secondary transition hover:border-primary hover:text-primary"
                            >
                                {t('dashboard.ai.'+ suggestion)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {data.messages.map((msg) => {
                const isUser = msg.role === 'user';

                return (
                    <div key={msg._id} className={"mb-4 flex " + (isUser ? "justify-end" : "justify-start")}>
                        <div className={"flex max-w-[85%] items-end gap-2 " + (isUser ? "flex-row-reverse" : "")}>
                            {!isUser && (
                                <span className="mb-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                                    <Bot size={14} className="text-primary" />
                                </span>
                            )}

                            <div className={"flex flex-col " + (isUser ? "items-end" : "items-start")}>
                                <article
                                    className={
                                        "rounded-2xl px-4 py-2.5 text-sm leading-relaxed " +
                                        (isUser
                                            ? "rounded-br-md bg-primary text-white"
                                            : "rounded-bl-md border-none shadow-sm bg-surface text-text-primary")
                                    }
                                >
                                    <p dangerouslySetInnerHTML={{ __html: msg.content }} />

                                    {msg.actions && msg.actions.length > 0 && (
                                        <div className={"mt-2 flex flex-wrap items-center gap-3 border-t border-white/25 pt-2 " + (isUser ? "border-white/25" : "border-border")}>
                                            {msg.actions.map((action, i) => (
                                                action.type === 'link' ? (
                                                    <Link
                                                        key={i}
                                                        href={action.action.toString()}
                                                        className="text-xs font-semibold underline underline-offset-2"
                                                    >
                                                        {action.text}
                                                    </Link>
                                                ) : (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        onClick={() => (action.action as Function)(action.payload)}
                                                        className="text-xs font-semibold underline underline-offset-2"
                                                    >
                                                        {action.text}
                                                    </button>
                                                )
                                            ))}
                                        </div>
                                    )}
                                </article>

                                {/* Fixed: previously an absolutely-positioned timestamp that
                                    sat at "top: 100%" of the bubble, overlapping the next
                                    message. Now it flows in-line below its own bubble. */}
                                <time className="mt-1 flex items-center gap-1 px-1 text-[11px] text-text-muted">
                                    <Clock3 size={10} />
                                    {msg.datetime}
                                </time>
                            </div>
                        </div>suggestion
                    </div>
                );
            })}

            {data.isSending && (
                <div className="mb-4 flex justify-start">
                    <div className="flex items-end gap-2">
                        <span className="mb-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Bot size={14} className="text-primary" />
                        </span>
                        <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border-none shadow-lg bg-surface px-4 py-3">
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted [animation-delay:-0.3s]" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted [animation-delay:-0.15s]" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted" />
                        </div>
                    </div>
                </div>
            )}

            <div ref={bottomRef} />
        </section>
    );
}
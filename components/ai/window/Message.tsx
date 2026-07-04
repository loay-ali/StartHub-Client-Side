'use client';

import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Message({isSending,sendMessage}:{isSending:boolean,sendMessage:(text:string) => void}) {
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-grow the textarea up to a max height instead of a fixed
    // min-h-[100px] block that stayed the same size whether you'd typed
    // one word or a paragraph.
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }, [value]);

    function handleSend() {
        const trimmed = value.trim();
        if (!trimmed || isSending) return;
        sendMessage(trimmed);
        setValue('');
    }

    return (
        // Fixed: previously the whole textarea was swapped out for a
        // loader while sending, so the input area jumped around and you
        // lost your place. The field now just disables in place; the
        // typing indicator lives in the chat body instead.
        <section className="flex flex-shrink-0 items-end gap-2 border-t border-border bg-surface p-3">
            <textarea
                ref={textareaRef}
                value={value}
                disabled={isSending}
                rows={1}
                placeholder="Ask about your business..."
                className="max-h-[120px] min-h-[40px] flex-1 resize-none rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={(event) => {
                    // Enter sends, Shift+Enter makes a new line.
                    if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        handleSend();
                    }
                }}
            />

            <button
                type="button"
                disabled={isSending || value.trim() === ''}
                onClick={handleSend}
                aria-label="Send message"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
            >
                <Send size={16} />
            </button>
        </section>
    );
}
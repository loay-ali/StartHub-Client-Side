/* eslint-disable @typescript-eslint/no-unsafe-function-type */
'use client';

import { IoCloseOutline } from "react-icons/io5";
import { Sparkles } from "lucide-react";
import Chat from "./Chat";
import Message from './Message';
import { useEffect, useRef, useState } from "react";

import { ChatMessage } from "@/types/requests/ai";
import config from "@/constants/config";

// Turns a purpose slug like "recruitment-jobs" into "Recruitment Jobs"
// for display in the header subtitle.
function humanizePurpose(purpose: string) {
    if (!purpose) return '';
    return purpose
        .split(/[-_]/)
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export default function AIWindow({aiPurpose,open,closeWindow}:{aiPurpose:string,open:boolean,closeWindow:Function}) {

    const [conversationId,setConversationId] = useState('');
    const [messages,setMessages] = useState<ChatMessage[]>([]);

    const [msg,setMsg] = useState('');

    const [isSending,setIsSending] = useState(false);

    const [msgIndex,setMsgIndex] = useState(1000);

    // Tracks the last purpose we already kicked a request off for, so a
    // purpose that stays set (it's never cleared after the fetch settles)
    // doesn't keep re-triggering "chat-for-purpose" every time isSending
    // flips back to false — that previously caused an endless fetch loop.
    const lastHandledPurposeRef = useRef('');

    function getCurrentDateTime() {
        const date = new Date();
        return date.getFullYear() +' / '+ (date.getMonth() + 1) +' / '+ date.getDate() +' '+ date.getHours() +':'+ date.getMinutes();
    }

    // Shared by the composer's send button/Enter key and the empty-state
    // suggestion chips, so both paths push the user bubble and kick off
    // the same request the same way.
    function handleSend(text: string) {
        const trimmed = text.trim();
        if (!trimmed || isSending) return;

        setMsg(trimmed);
        setMessages((msgs: ChatMessage[]) => {
            if (!!msgs.find(ele => ele._id == "msg-" + msgIndex)) return msgs;
            msgs.push({ datetime: getCurrentDateTime(), _id: "msg-" + msgIndex, role: 'user', content: trimmed, actions: [] });
            return msgs;
        });
        setMsgIndex(s => s + 1);
        setIsSending(true);
    }

    // Fires exactly once per distinct, non-empty aiPurpose — not on every
    // render where aiPurpose happens to still be set (it's never cleared
    // after use, so re-running this on every settle previously caused an
    // endless request loop that starved/broke the assistant).
    useEffect(() => {
        if( aiPurpose == '' || aiPurpose == lastHandledPurposeRef.current ) return;

        lastHandledPurposeRef.current = aiPurpose;
        setIsSending(true);

        fetch(config.apiUrl +'/ai/chat-for-purpose/'+ aiPurpose,{
            credentials: "include",
            method: 'post'
        })
        .then(res => res.status == 201 ? res.json():Promise.reject())
        .then(res => {
            if( ! res.data ) return;

            setMessages((msgs: ChatMessage[]) => {
                if( !! msgs.find(ele => ele._id == res.data.request_id) ) return msgs;
                setConversationId(res.data.conversationId ?? '');
                msgs.push({datetime: getCurrentDateTime(),_id: res.data.request_id,role: 'assistant',content: res.data.response, actions: []});
                return msgs;
            });
        }).finally(() => {
            setIsSending(false);
            setMsg('');
        })
    },[aiPurpose]);

    useEffect(() => {
        if(isSending && msg) {
            fetch(config.apiUrl +'/ai/chat',{

                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    msg,
                    conversationId
                })
            })
            .then(res => res.json())
            .then(res => {
                if( ! res.data ) return;

                setMessages((msgs: ChatMessage[]) => {
                    if( !! msgs.find(ele => ele._id == res.data.request_id) ) return msgs;
                    setConversationId(res.data.conversationId ?? '');
                    msgs.push({datetime: getCurrentDateTime(),_id: res.data.request_id,role: 'assistant',content: res.data.response, actions: []});
                    return msgs;
                });
            }).finally(() => {
                setIsSending(false);
                setMsg('');
            })
        }
    },[isSending]);

    return (
    <section
        role="dialog"
        aria-label="AI Assistant"
        aria-hidden={!open}
        className={
            "fixed bottom-5 right-5 z-50 flex h-[600px] w-[380px] max-w-[calc(100vw-2.5rem)] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-border shadow-2xl transition-all duration-300 " +
            (!open ? "pointer-events-none scale-0 opacity-0" : "scale-100 opacity-100")
        }

        style={{backgroundColor:"white", border:"none", height:"75%"}}
    >
        {/* Header */}
        <header className="flex flex-shrink-0 items-center justify-between gap-3 bg-gradient-to-br from-primary to-primary-dark px-5 py-4 text-white">
            <div className="flex min-w-0 items-center gap-3">
                <span className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/15">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-white/20 motion-safe:animate-ping" />
                    <Sparkles size={16} className="relative text-white" />
                </span>
                <div className="min-w-0">
                    <p className="truncate font-bold leading-tight">AI Assistant</p>
                    <p className="flex items-center gap-1.5 truncate text-xs text-white/75">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-300" />
                        {aiPurpose ? humanizePurpose(aiPurpose) : 'Online'}
                    </p>
                </div>
            </div>

            <button
                aria-label="Close AI Assistant"
                className="cursor-pointer rounded-full p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
                type="button"
                onClick={() => closeWindow()}
            >
                <IoCloseOutline size={22} />
            </button>
        </header>

        <Chat messages={messages} conversationId={conversationId} isSending={isSending} onSuggestion={handleSend} />

        <Message isSending={isSending} sendMessage={handleSend} />
    </section>);
}
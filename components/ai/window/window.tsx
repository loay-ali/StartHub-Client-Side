'use client';

import { IoCloseOutline } from "react-icons/io5";
import Chat from "./Chat";
import Message from './Message';
import { useEffect, useState } from "react";

import { ChatMessage } from "@/types/requests/ai";
import config from "@/constants/config";

export default function AIWindow({open,closeWindow}:{open:boolean,closeWindow:Function}) {
    const [conversationId,setConversationId] = useState('');
    const [messages,setMessages] = useState<ChatMessage[]>([]);

    const [msg,setMsg] = useState('');

    const [isSending,setIsSending] = useState(false);

    useEffect(() => {
        if(isSending) {
            fetch(config.apiUrl +'/ai/chat',{
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    msg,
                    conversationId
                })
            })
        }
    },[isSending]);

    return (
    <section className = {"overflow-hidden border-8 border-primary flex flex-col fixed w-[500px] h-[600px] bottom-5 right-5 bg-primary rounded shadow flex flex-col transition-all duration-[0.4s] origin-bottom-right "+ (!open ? 'scale-[0]':'scale-[1]')}>
        <header className = 'bg-white text-primary rounded flex justify-between items-center p-4'>
            <strong>AI Assistant</strong>
            <button className = 'cursor-pointer' type="button" onClick = {() => closeWindow()}>
                <IoCloseOutline size = {20} />
            </button>
        </header>
        <section className = 'grow-1 flex flex-col'>
            <Chat messages={messages} conversationId={conversationId}/>
            <Message sendMessage = {() => setIsSending(true)} setMsg = {setMsg} />
        </section>
        <footer>

        </footer>
    </section>);
}
'use client';

import { IoCloseOutline } from "react-icons/io5";
import Chat from "./Chat";
import Message from './Message';
import { useEffect, useState } from "react";

import { ChatMessage } from "@/types/requests/ai";
import config from "@/constants/config";
import { useAIContext } from "@/components/layout/dashboard-layout/DashboardLayout";

export default function AIWindow({aiPurpose,open,closeWindow}:{aiPurpose:string,open:boolean,closeWindow:Function}) {
    
    const [conversationId,setConversationId] = useState('');
    const [messages,setMessages] = useState<ChatMessage[]>([]);

    const [msg,setMsg] = useState('');

    const [isSending,setIsSending] = useState(false);

    const [msgIndex,setMsgIndex] = useState(1000);
    
    if( aiPurpose != '' && isSending != true ) {
        setIsSending(true);
    }

    function getCurrentDateTime() {
        const date = new Date();
        return date.getFullYear() +' / '+ (date.getMonth() + 1) +' / '+ date.getDate() +' '+ date.getHours() +':'+ date.getMinutes();
    }

    useEffect(() => {

        if( aiPurpose != '' ) {
            fetch(config.apiUrl +'/ai/chat-for-purpose/'+ aiPurpose,{
                credentials: "include",
                method: 'post'
            })
            .then(res => res.status == 201 ? res.json():Promise.reject())
            .then(res => {
                if( ! res.data ) return;

                setMessages((msgs:any[]) => {
                    if( !! msgs.find(ele => ele._id == res.data.request_id) ) return msgs;
                    setConversationId(res.data.conversationId ?? '');
                    msgs.push({datetime: getCurrentDateTime(),_id: res.data.request_id,role: 'assistant',content: res.data.response});
                    return msgs;
                });
            }).finally(() => {
                setIsSending(false);
                setMsg('');
            })
        }else {
            if(isSending) {
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
                .then(res => res.status == 200 ? res.json():Promise.reject())
                .then(res => {
                    if( ! res.data ) return;

                    setMessages((msgs:any[]) => {
                        if( !! msgs.find(ele => ele._id == res.data.request_id) ) return msgs;
                        setConversationId(res.data.conversationId ?? '');
                        msgs.push({datetime: getCurrentDateTime(),_id: res.data.request_id,role: 'assistant',content: res.data.response});
                        return msgs;
                    });
                }).catch(err => {
                    console.warn("Error Accured",err);
                }).finally(() => {
                    console.log("Reached The End");
                    setIsSending(false);
                    setMsg('');
                })
            }
        }
    },[isSending]);

    return (
    <section className = {"overflow-hidden border-8 border-primary flex flex-col fixed w-[500px] h-[600px] bottom-5 right-5 bg-[linear-gradient(to_bottom_right,var(--color-primary),var(--color-primary-dark))] rounded shadow flex flex-col transition-all duration-[0.4s] origin-bottom-right "+ (!open ? 'scale-[0]':'scale-[1]')}>
        <header className = 'bg-white text-primary rounded flex justify-between items-center p-4'>
            <div className = 'flex flex-col'>
                <strong>AI Assistant</strong>
                <span>{aiPurpose}</span>
            </div>

            <button className = 'cursor-pointer' type="button" onClick = {() => closeWindow()}>
                <IoCloseOutline size = {20} />
            </button>
        </header>
        <section className = 'grow-1 flex flex-col'>
            <Chat messages={messages} conversationId={conversationId}/>
            <Message sendMessage = {() => {setMessages((msgs:any[]) => {
                if( !! msgs.find(ele => ele._id == "msg-"+ msgIndex) ) return msgs;
                msgs.push({datetime: getCurrentDateTime(),_id: "msg-"+ msgIndex,role: 'user',content: msg});
                return msgs;
            });
            setMsgIndex(s => s+1);
            setIsSending(true)}} isSending={isSending} setMsg = {setMsg} />
        </section>
        <footer>

        </footer>
    </section>);
}
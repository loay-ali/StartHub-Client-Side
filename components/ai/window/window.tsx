'use client';

import { IoCloseOutline } from "react-icons/io5";
import Chat from "./Chat";
import Message from './Message';

export default function AIWindow({open,closeWindow}:{open:boolean,closeWindow:Function}) {
    return (
    <section className = {"overflow-hidden border-8 border-primary flex flex-col fixed w-[500px] h-[600px] bottom-5 right-5 bg-primary rounded shadow flex flex-col transition-all duration-[0.4s] origin-bottom-right "+ (!open ? 'scale-[0]':'scale-[1]')}>
        <header className = 'bg-white text-primary rounded flex justify-between items-center p-4'>
            <strong>AI Assistant</strong>
            <button className = 'cursor-pointer' type="button" onClick = {() => closeWindow()}>
                <IoCloseOutline size = {20} />
            </button>
        </header>
        <section className = 'grow-1 flex flex-col'>
            <Chat />
            <Message sendMessage={(msg:string) => {
                console.log(msg);
            }}/>
        </section>
        <footer>

        </footer>
    </section>);
}
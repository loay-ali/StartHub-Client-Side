'use client';

import { IoCloseOutline } from "react-icons/io5";
import Chat from "./Chat";
import Message from './Message';

export default function AIWindow({open,closeWindow}:{open:boolean,closeWindow:Function}) {
    return (
    <section className = "flex flex-col fixed w-[500px] h-[600px] bottom-20 right-5 bg-[linear-gradient(to_top_right,#10b0c0,#14b8a6)] rounded shadow flex flex-col">
        <header className = 'flex justify-between items-center p-4 border-b-1 border-blue-50'>
            <strong className = 'text-white'>AI Assistant</strong>
            <button className = 'cursor-pointer' type="button" onClick = {() => closeWindow()}>
                <IoCloseOutline color = "white" size = {20} />
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
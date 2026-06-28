import { useState } from "react"

export default function Message({setMsg,sendMessage}:{setMsg:Function,sendMessage:Function}) {

    return (
    <section className = 'p-2 flex flex-col gap-2 justify-center items-center'>
        <textarea style = {{resize: 'none'}} className = 'border-none p-2 outline-0 bg-white min-h-[100px] border-1 shadow rounded w-full' onInput = {(event:any) => setMsg(event.currentTarget.value)}></textarea>

        <button className = 'rounded p-2 cursor-pointer w-full bg-white text-black' type="button" onClick = {() => {
            sendMessage();
            setMsg('');
        }}>
            Send Message
        </button>
    </section>
    )
}
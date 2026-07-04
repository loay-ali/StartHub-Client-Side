import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import { useState } from "react"

export default function Message({isSending,setMsg,sendMessage}:{isSending:boolean,setMsg:Function,sendMessage:Function}) {

    return (
    <section className = 'border-t-1 border-primary-dark p-2 flex flex-col gap-2 justify-center items-center'>
        {isSending ? <div className = 'p-5'><ButtonLoader color = 'white' size={25}/></div>:<textarea placeholder = "Want To Say Something ?" style = {{resize: 'none'}} className = 'border-none p-2 outline-0 bg-white min-h-[100px] border-1 shadow rounded w-full' onInput = {(event:any) => setMsg(event.target.value)}></textarea>}

        <button disabled = {isSending} className = {(isSending ? "opacity-[0.5]":'') +' rounded p-2 cursor-pointer w-full bg-[linear-gradient(to_bottom_right,#FFF,#BBB)] text-black'} type="button" onClick = {() => {
            sendMessage();
        }}>
            Send Message
        </button>
    </section>
    )
}
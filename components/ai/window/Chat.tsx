import Link from "next/link";
import { FaRegClock } from "react-icons/fa";

import { ChatData } from "@/types/requests/ai";

export default function Chat(data:ChatData) {

    return (
    <section className = 'grow-1 overflow-auto h-[0px]'>
        {data.messages.map(msg => {
            return (
            <div key = {msg._id} className = {'flex justify-'+ (msg.role == 'user' ? "start":"end") +' m-2'}>
                <article className = {(msg.role == 'user' ? "bg-white":"bg-primary-light") +' p-3 px-4 inline-block my-4 mx-2 rounded relative flex-col'}>
                    <p dangerouslySetInnerHTML={{__html: msg.content}}></p>
                    {msg.actions && (<section className = 'p-1 bg-gray-100 rounded flex justify-between items-center gap-2'>
                        {msg.actions.map(action => action.type == 'callback' || action.type == 'api' ? (
                            <button onClick = {() => (action.action as Function)(action.payload)}>
                                {action.text}
                            </button>
                        ):(action.type == 'link' ? (
                            <Link href = {action.action.toString()}>
                                {action.text}
                            </Link>
                        ):null))}
                    </section>)}
                    <time className = 'text-white text-sm font-bold absolute top-[100%] inset-s-1 flex items-center gap-2'>
                        <FaRegClock size = {8}/>{msg.datetime}
                    </time>
                </article>
            </div>);
        })}
    </section>
    )
}
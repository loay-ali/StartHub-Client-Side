'use client';

import { useAIContext } from "@/components/layout/dashboard-layout/DashboardLayout";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { useRouter } from "next/navigation";
import { ElementType, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export enum ActionType {
    LINK,
    ACTION,
    CHAT
}

export default function AISection({
    Icon,
    title,
    initialActions
}:{
    Icon:ElementType,
    title:string,
    initialActions: {title:string,type:ActionType,action:Function|string}[]}) {
        
    const [content,setContent] = useState('');
    const [loading,setLoading] = useState(false);

    const router = useRouter();

    const ai = useAIContext();

    useEffect(() => {
        /*if( loading ) {
            fetch(config.apiUrl + url,{
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then(res => res.status == 201 || res.status == 200 ? res.text():Promise.reject())
            .then(res => {
                setContent(handleResponse ? handleResponse(res):res);
            })
            .catch(err => {
                console.warn(err);
            })
            .finally(() => {
                setLoading(false);
            })
        }*/
    },[]);

    return (
    <section className = 'flex flex-col sticky min-w-[250px] top-[100px] bg-[linear-gradient(to_bottom_right,var(--color-primary),var(--color-primary-dark))] flex flex-col p-5 rounded-[10px] shadow mb-5 text-white'>
        <header className = ' text-white flex items-center justify-start items-center gap-5'>
            {<Icon className = "bg-white rounded-full text-primary h-[30px] w-[30px] p-1" size = {5}/>}
            <h2 className = 'text-center text-lg font-bold'>{title}</h2>
        </header>
        <section className = 'min-w-[100px] p-5 text-white grow'>
            {content == '' && loading == false ? (
                initialActions.map(a => {
                    return <button onClick = {() => {
                        setLoading(true);
                        switch(a.type) {
                            case ActionType.ACTION:
                                (a.action as Function)(setContent);
                            break;

                            case ActionType.LINK:
                                router.push(a.action as string);
                            break;

                            case ActionType.CHAT:
                                ai.toggleAI();
                                ai.setPurpose?.(a.action as string);
                                setLoading(false);
                            break;
                        }
                    }} type = 'button' className = 'button secondary'>
                        {a.title}
                    </button>;
                })
            ):null}
            {loading ? <div className = 'p-5 flex items-center justify-center'><ButtonLoader color = "white" size = {40}/></div>:<div dangerouslySetInnerHTML = {{__html: content }} />}
        </section>
        {/*<footer className = 'flex flex-col justify-around items-center mt-4 border-t-1 border-primary-dark'>
            loading ? null:(<><button className = 'button border-1 border-light'>Save</button>
            <button className = 'button secondary'>Make Changes</button></>)
        </footer>*/}
    </section>
    );
}
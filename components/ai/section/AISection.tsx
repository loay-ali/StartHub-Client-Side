'use client';

import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function AISection({title,url,body,handleResponse}:{handleResponse:Function,title:string,url:string,body:Record<string,string>}) {
    if( ! url ) {
        return <></>
    }

    const [content,setContent] = useState('');
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        if( loading ) {
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
        }
    },[]);

    return (
    <section className = 'flex flex-col sticky top-[100px] bg-[linear-gradient(to_bottom_right,var(--color-primary),var(--color-primary-dark))] flex flex-col p-5 rounded-[10px] shadow mb-5 text-white'>
        <header className = ' text-white flex items-center justify-between'>
            <h2 className = 'text-lg font-bold'>{title}</h2>
        </header>
        <section className = 'min-w-[100px] p-5 text-white grow'>
            {loading ? <div className = 'p-5 flex items-center justify-center'><ButtonLoader size = {30}/></div>:<div dangerouslySetInnerHTML = {{__html: content }} />}
        </section>
        <footer className = 'flex flex-col justify-around items-center mt-4 border-t-1 border-primary-dark'>
            {loading ? null:(<><button className = 'button border-1 border-light'>Save</button>
            <button className = 'button secondary'>Make Changes</button></>)}
        </footer>
    </section>
    );
}
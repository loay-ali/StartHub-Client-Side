'use client';

import { MdClose } from "react-icons/md";

export default function AreYouSureWindow({title,setWindowState,confirmCallback}:{title:string,confirmCallback:Function,setWindowState:Function}) {

    return (
        <section className = 'rounded outline-[100vmax] outline-[#0007] z-[99999] flex flex-col fixed bg-white w-[500px] h-[200px] left-[calc(50%_-_250px)] top-[calc(50%_-_100px)]'>
            <header className = 'border-b-1 border-gray-200 p-4 flex justify-between'>
                <strong>
                    {title}
                </strong>
                <button className = 'cursor-pointer' type="button">
                    <MdClose />
                </button>
            </header>
            <section className = 'flex-1 p-5 text-center'>
                <p>If You Deletion You Can't Access This Record Once Again</p>
            </section>
            <footer className = 'flex justify-around items-center p-3'>
                <button onClick = {() => confirmCallback()} type = 'button' className = 'p-2 text-white rounded shadow bg-red-500 cursor-pointer'>
                    Confirm
                </button>

                <button
                    onClick = {() => setWindowState('')}
                    type = 'button'
                    className = 'p-2 text-white rounded shadow bg-gray-500 cursor-pointer'>
                    Cancel
                </button>
            </footer>
        </section>
    );
}
'use client';

import { GiArtificialHive } from "react-icons/gi";
import AIWindow from "./window/window";

export default function AIButton({open=false}:{open:boolean}) {
    return (
        <>
        <button onClick = {() => {}} className = {(open == true ? "bg-gray-200":"bg-[linear-gradient(to_top_right,#10b0c0,#14b8a6)]") +' absolute bottom-0 right-0 shadow p-1 text-white rounded cursor-pointer'}>
            <GiArtificialHive size = {20} color = {open == true ? '#14b8a6':'white'} />
        </button>
        <AIWindow closeWindow={() => {}}/>
        </>
    )
}
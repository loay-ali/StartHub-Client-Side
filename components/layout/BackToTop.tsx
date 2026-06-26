'use client';

import { body } from "framer-motion/client";
import { AiOutlineToTop } from "react-icons/ai";

export default function() {
return (            <button onClick={e => {
                e.preventDefault();
                document.documentElement.scrollTo({top: 0});
            }} className = 'absolute inset-e-5 top-5 bg-primary p-3 rounded-full text-white opacity-[0.5] hover:opacity-[1] cursor-pointer transition-all'>
                <AiOutlineToTop size = {28}/>
            </button>);
}
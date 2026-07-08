'use client';

import { AiOutlineToTop } from "react-icons/ai";

export default function BackToTop() {
    return (
        <button
            type="button"
            aria-label="Back to top"
            onClick={() => {
                document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="fixed bottom-5 left-5 z-30 bg-primary p-3 rounded-full text-white opacity-50 hover:opacity-100 cursor-pointer transition-opacity shadow-lg"
        >
            <AiOutlineToTop size={20} />
        </button>
    );
}
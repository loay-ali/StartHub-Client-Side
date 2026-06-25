'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuLinks from '@/constants/main-menu';
import { useEffect, useState } from 'react';
import config from '@/constants/config';
import LanguageSwitcher from './header/LanguageSwitcher';

export default function Header() {
    const CURRENT_PATHNAME = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState<any>(null);

    useEffect(() => {
        if (isLoggedIn == null) {
            fetch(config.apiUrl + '/auth/me', { credentials: 'include' })
                .then(res => {
                    if (res.status == 200) {
                        return res.json();
                    } else {
                        setIsLoggedIn(false);
                    }
                }).then(res => {
                    setIsLoggedIn(res);
                })
        }
    }, []);

    return (
        <header className="m-5 fixed w-[92vw] md:w-[85vw] lg:w-[80vw] left-[4vw] md:left-[7.5vw] lg:left-[10vw] top-[20px] rounded-2xl border border-[#14b8a6]/10 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none z-99999 flex items-center justify-between p-3 px-6 transition-all duration-300 hover:border-[#14b8a6]/30">
            <Link href="/" id="identity" className="flex items-center justify-between gap-3">
                <h1>
                    <img src="/starthub.png" className="w-[100px] hover:scale-105 transition-transform duration-300" alt="StarHub Logo" />
                </h1>
            </Link>

            <nav className="flex items-center gap-3 md:gap-6">
                <div className="hidden md:flex items-center gap-6">
                    {MenuLinks.map(ele => (
                        <Link 
                            href={ele.href} 
                            key={ele.slug}
                            className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#14b8a6] dark:hover:text-[#14b8a6] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#14b8a6] hover:after:w-full after:transition-all after:duration-300"
                        >
                            {ele.name}
                        </Link>
                    ))}
                </div>
                
                <div className="hidden md:block h-[20px] w-[1px] bg-slate-200 dark:bg-slate-800"></div>

                <div className="flex items-center gap-2">
                    {isLoggedIn == null || isLoggedIn == false ? (
                        <>
                            <Link href="/login" className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 whitespace-nowrap">
                                Login
                            </Link>
                            <Link href="/register" className="px-4 py-2 text-sm font-bold bg-[#14b8a6] text-white hover:bg-[#0f766e] hover:shadow-[#14b8a6]/20 hover:shadow-md rounded-xl transition-all duration-200 text-center whitespace-nowrap">
                                Join Now
                            </Link>
                        </>
                    ) : (
                        <Link href="/dashboard" className="px-4 py-2 text-sm font-bold bg-[#14b8a6] text-white hover:bg-[#0f766e] hover:shadow-[#14b8a6]/20 hover:shadow-md rounded-xl transition-all duration-200 text-center whitespace-nowrap">
                            Dashboard
                        </Link>
                    )}
                </div>

                <div className="h-[20px] w-[1px] bg-slate-200 dark:bg-slate-800"></div>

                <LanguageSwitcher />
            </nav>
        </header>
    );
}
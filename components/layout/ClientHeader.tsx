'use client';

import Link from 'next/link';

import {useRouter,usePathname} from 'next/navigation';

import { RiLogoutCircleLine } from "react-icons/ri";
import { AiOutlineLoading } from "react-icons/ai";
import { GoChevronDown } from "react-icons/go";

import MenuLinks from '@/constants/main-menu';
import { useEffect, useState } from 'react';
import config from '@/constants/config';
import LanguageSwitcher from './header/LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const CURRENT_PATHNAME = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState<any>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [isLogout,setIsLogout] = useState(false);

    const [openMenu,setOpenMenu] = useState(false);

    const router = useRouter();

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

        if( isLogout ) {
            fetch(config.apiUrl +'/auth/logout',{credentials: 'include',method: "POST"})
                .then(res => res.status == 200 ? (router.refresh()):Promise.reject());
        }
    },[isLogout]);

    function changeLanguage(lang:string) {
        router.replace(CURRENT_PATHNAME.replace(/(ar|en|fr)/,lang));
    }

    return (
    <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="fixed w-[92vw] md:w-[85vw] lg:w-[80vw] left-1/2 -translate-x-1/2 top-[20px] rounded-2xl bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none z-[99999] flex flex-col transition-all duration-500 hover:shadow-[#14b8a6]/5"
        id = 'main-header'>
        <Link href="/" id="identity" className="flex items-center justify-between gap-3">
            <h1>
                <motion.img
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    whileTap={{ scale: 0.95 }}
                    src="/starthub.png"
                    className="w-[120px] transition-transform duration-300"
                    alt="StarHub Logo"  
                />
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

                    <div className="hidden md:flex items-center gap-2">
                        {isLoggedIn == null || isLoggedIn == false ? (
                            <>
                                <Link href="/login" className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 whitespace-nowrap">
                                    Login
                                </Link>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link href="/register" className="px-4 py-2 text-sm font-bold bg-[#14b8a6] text-white hover:bg-[#0f766e] hover:shadow-[#14b8a6]/20 hover:shadow-md rounded-xl transition-all duration-200 text-center whitespace-nowrap">
                                        Join Now
                                    </Link>
                                </motion.div>
                            </>
                        ) : (
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/dashboard" className="px-4 py-2 text-sm font-bold bg-[#14b8a6] text-white hover:bg-[#0f766e] hover:shadow-[#14b8a6]/20 hover:shadow-md rounded-xl transition-all duration-200 text-center whitespace-nowrap">
                                    Dashboard
                                </Link>
                            </motion.div>
                        )}
                    </div>

                    <div className="hidden md:block h-[20px] w-[1px] bg-slate-200 dark:bg-slate-800"></div>

                    <LanguageSwitcher />

                    <button
                        className="md:hidden flex items-center justify-center p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden flex flex-col px-6 pb-6 gap-4 overflow-hidden"
                    >
                        <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-800 my-2"></div>
                        {MenuLinks.map(ele => (
                            <Link
                                href={ele.href}
                                key={ele.slug}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#14b8a6] transition-colors"
                            >
                                {ele.name}
                            </Link>
                        ))}
                        <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-800 my-2"></div>
                        <div className="flex flex-col gap-3">
                            {isLoggedIn == null || isLoggedIn == false ? (
                                <>
                                    <Link onClick={() => setMobileMenuOpen(false)} href="/login" className="py-2 text-sm font-bold text-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all">
                                        Login
                                    </Link>
                                    <Link onClick={() => setMobileMenuOpen(false)} href="/register" className="py-2 text-sm font-bold text-center bg-[#14b8a6] text-white hover:bg-[#0f766e] rounded-xl transition-all">
                                        Join Now
                                    </Link>
                                </>
                            ) : (
                                <Link onClick={() => setMobileMenuOpen(false)} href="/dashboard" className="py-2 text-sm font-bold text-center bg-[#14b8a6] text-white hover:bg-[#0f766e] rounded-xl transition-all">
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
    </motion.header>
    );
}
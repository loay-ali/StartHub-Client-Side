/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuLinks from '@/constants/main-menu';
import { useEffect, useRef, useState } from 'react';
import config from '@/constants/config';
import LanguageSwitcher from './header/LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, X, ArrowRight, LayoutDashboard, LogIn, Sparkles,
    ChevronDown, Rocket, TrendingUp,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

// Login/Join Now both branch into two audiences. Centralized here so the
// desktop dropdown and mobile accordion stay in sync with one source of truth.
const AUDIENCE_OPTIONS = {
    login: [
        { label: 'As a Startup', href: '/login', icon: Rocket },
        { label: 'As an Investor', href: '/investor/login', icon: TrendingUp },
    ],
    join: [
        { label: 'Join as Startup', href: '/register', icon: Rocket },
        { label: 'Join as Investor', href: '/investor/register', icon: TrendingUp },
    ],
} as const;

type MenuKey = keyof typeof AUDIENCE_OPTIONS; // 'login' | 'join'

export default function Header() {
    const CURRENT_PATHNAME = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState<any>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [logoTheme, setLogoTheme] = useState<'dark' | 'light'>('dark');
    // Desktop dropdowns: only one of Login/Join Now open at a time.
    const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
    // Mobile accordion: same idea, inline instead of a floating panel.
    const [mobileExpanded, setMobileExpanded] = useState<MenuKey | null>(null);

    const t = useTranslations();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const authAreaRef = useRef<HTMLDivElement>(null);

    const [overDarkBg, setOverDarkBg] = useState(true); // true = header is over the dark hero


useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 20);

        // Header sits ~20-30px from top; sample the section at that point
        const probeY = 40;
        const sections = document.querySelectorAll<HTMLElement>('[data-header-theme]');

        let activeTheme: 'dark' | 'light' = 'light'; // default once no hero is present (page content is light)

        sections.forEach((el) => {
            const { top, bottom } = el.getBoundingClientRect();
            if (top <= probeY && bottom >= probeY) {
                activeTheme = el.dataset.headerTheme as 'dark' | 'light';
            }
        });

        setLogoTheme(activeTheme);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
    };
}, []);

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
                    if (res) {
                        setIsLoggedIn(res);
                    }
                }).catch(() => {
                    setIsLoggedIn(false);
                });
        }
    }, [isLoggedIn]);

    // Close an open desktop dropdown on outside click or Escape.
    useEffect(() => {
        if (!openMenu) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (authAreaRef.current && !authAreaRef.current.contains(e.target as Node)) {
                setOpenMenu(null);
            }
        };
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpenMenu(null);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [openMenu]);

    // Collapse the mobile accordion whenever the mobile menu itself closes.
    useEffect(() => {
        if (!mobileMenuOpen) setMobileExpanded(null);
    }, [mobileMenuOpen]);

    // Active path helper
    const currentLocale = CURRENT_PATHNAME.match(/^\/(ar|en|fr)/)?.[0] || '';
    const pathWithoutLocale = CURRENT_PATHNAME.replace(/^\/(ar|en|fr)/, '') || '/';
    const normalizedPath = pathWithoutLocale === '' ? '/' : pathWithoutLocale;

    const isActive = (href: string) => {
        if (href === '/') {
            return normalizedPath === '/';
        }
        return normalizedPath.startsWith(href);
    };

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
            className={`fixed left-1/2 -translate-x-1/2 rounded-2xl backdrop-blur-xl z-[99999] flex flex-col transition-all duration-300 ${scrolled
                ? 'w-[90vw] md:w-[80vw] lg:w-[75vw] top-[15px] bg-white/85 dark:bg-slate-950/85 border border-slate-200/40 dark:border-slate-800/40 shadow-lg shadow-teal-500/5'
                : 'w-[92vw] md:w-[85vw] lg:w-[80vw] top-[20px] bg-white/60 dark:bg-slate-950/60 border border-transparent dark:border-transparent'
                }`}
        >
            <div className="flex items-center justify-between p-3 px-6 w-full">
                <Link href="/" id="identity" className="flex items-center justify-between gap-3 rounded-full">
                    <h1>
                        <motion.img
                            whileHover={{ scale: 1.05, rotate: -1 }}
                            whileTap={{ scale: 0.95 }}
                            src={logoTheme === 'dark' ? '/starthub-dark-bg.png' : '/starthub-light-bg.png'}
                            className="h-[32px] w-auto transition-transform duration-300"
                            alt="StarHub Logo"
                        />
                    </h1>
                </Link>

                <nav className="flex items-center gap-3 md:gap-5">
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1">
                        {MenuLinks.map(ele => {
                            const active = isActive(ele.href);
                            return (
                                <Link
                                    href={ele.href}
                                    key={ele.slug}
                                    className={`text-sm font-semibold relative py-2 px-4 transition-colors duration-300 rounded-xl whitespace-nowrap ${active
                                        ? "text-[#14b8a6] font-bold"
                                        : "text-slate-600 dark:text-slate-300 hover:text-[#14b8a6] dark:hover:text-[#14b8a6]"
                                        }`}
                                >
                                    {active && (
                                        <motion.span
                                            layoutId="activeIndicator"
                                            className="absolute inset-0 bg-teal-50 dark:bg-teal-950/30 rounded-xl -z-10 border border-teal-500/10 dark:border-teal-500/5"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    {ele.name}
                                </Link>
                            );
                        })}
            
                        <Link
                            href={'/investor/login'}
                            key={'investor'}
                            className={`text-sm border-2 font-bolder relative py-2 px-4 transition-colors duration-300 rounded-xl whitespace-nowrap ${
                                isActive('/investor') 
                                    ? "text-[#14b8a6] font-bold" 
                                    : "text-slate-600 dark:text-slate-300 hover:text-[#14b8a6] dark:hover:text-[#14b8a6]"
                            }`}
                        >
                            {isActive('/investor/login') && (
                                <motion.span
                                    layoutId="activeIndicator"
                                    className="absolute inset-0 bg-teal-50 dark:bg-teal-950/30 rounded-xl -z-10 border border-teal-500/10 dark:border-teal-500/5"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            {t('public.navigation.investor')}
                        </Link>
                    </div>

                    <div className="hidden md:block h-[20px] w-[1px] bg-slate-200 dark:bg-slate-800"></div>

                    {/* Auth Area */}
                    <div className="hidden md:flex items-center gap-2 min-h-[38px]" ref={authAreaRef}>
                        {isLoggedIn === null ? (
                            <div className="flex items-center gap-2 animate-pulse">
                                <div className="w-[50px] h-[32px] bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                                <div className="w-[70px] h-[32px] bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                            </div>
                        ) : isLoggedIn === false ? (
                            <>
                                {/* Login — choose audience */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setOpenMenu(openMenu === 'login' ? null : 'login')}
                                        aria-haspopup="menu"
                                        aria-expanded={openMenu === 'login'}
                                        className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 whitespace-nowrap flex items-center gap-1.5"
                                    >
                                        <LogIn size={14} className="opacity-75" />
                                        <span>{t('public.login.login')}</span>
                                        <ChevronDown size={13} className={`opacity-60 transition-transform duration-200 ${openMenu === 'login' ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {openMenu === 'login' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                                                transition={{ duration: 0.15, ease: "easeOut" }}
                                                role="menu"
                                                aria-label="Choose how you'd like to log in"
                                                className="absolute right-0 top-[calc(100%+8px)] w-56 p-1.5 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-xl shadow-slate-900/10 origin-top-right"
                                            >
                                                {AUDIENCE_OPTIONS.login.map(opt => (
                                                    <Link
                                                        key={opt.href}
                                                        href={opt.href}
                                                        role="menuitem"
                                                        onClick={() => setOpenMenu(null)}
                                                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950/30 hover:text-[#14b8a6] transition-colors"
                                                    >
                                                        <opt.icon size={15} className="opacity-70" />
                                                        <span>{opt.label}</span>
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Join Now — choose audience */}
                                <div className="relative">
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setOpenMenu(openMenu === 'join' ? null : 'join')}
                                        aria-haspopup="menu"
                                        aria-expanded={openMenu === 'join'}
                                        className="px-4 py-2 text-sm font-bold bg-[#14b8a6] text-white hover:bg-[#0f766e] hover:shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-md rounded-xl transition-all duration-200 text-center whitespace-nowrap flex items-center gap-1.5"
                                    >
                                        <Sparkles size={13} />
                                        <span>{t('public.login.join-now')}</span>
                                        <ChevronDown size={13} className={`opacity-80 transition-transform duration-200 ${openMenu === 'join' ? 'rotate-180' : ''}`} />
                                    </motion.button>

                                    <AnimatePresence>
                                        {openMenu === 'join' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                                                transition={{ duration: 0.15, ease: "easeOut" }}
                                                role="menu"
                                                aria-label="Choose how you'd like to join"
                                                className="absolute right-0 top-[calc(100%+8px)] w-56 p-1.5 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-xl shadow-slate-900/10 origin-top-right"
                                            >
                                                {AUDIENCE_OPTIONS.join.map(opt => (
                                                    <Link
                                                        key={opt.href}
                                                        href={opt.href}
                                                        role="menuitem"
                                                        onClick={() => setOpenMenu(null)}
                                                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950/30 hover:text-[#14b8a6] transition-colors"
                                                    >
                                                        <opt.icon size={15} className="opacity-70" />
                                                        <span>{opt.label}</span>
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        ) : (
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Link href="/dashboard" className="px-4 py-2 text-sm font-bold bg-gradient-to-r from-[#14b8a6] to-[#0f766e] text-white hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] hover:shadow-md rounded-xl transition-all duration-200 text-center whitespace-nowrap flex items-center gap-1.5">
                                    <LayoutDashboard size={14} />
                                    <span>{t('dashboard.sidebar.dashboard')}</span>
                                </Link>
                            </motion.div>
                        )}
                    </div>

                    <div className="hidden md:block h-[20px] w-[1px] bg-slate-200 dark:bg-slate-800"></div>

                    <LanguageSwitcher />

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden flex items-center justify-center p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden flex flex-col px-6 pb-6 gap-3 overflow-hidden bg-white/95 dark:bg-slate-950/95 rounded-b-2xl border-t border-slate-100 dark:border-slate-800/50"
                    >
                        <div className="flex flex-col gap-1.5 pt-2">
                            {MenuLinks.map(ele => {
                                const active = isActive(ele.href);
                                return (
                                    <Link
                                        href={ele.href}
                                        key={ele.slug}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center justify-between text-sm font-semibold p-2.5 rounded-xl transition-all ${active
                                            ? "bg-teal-500/10 text-[#14b8a6] border border-teal-500/10"
                                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-[#14b8a6]"
                                            }`}
                                    >
                                        <span>{ele.name}</span>
                                        {active && <ArrowRight size={14} />}
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="h-[1px] w-full bg-slate-100 dark:bg-slate-800 my-1"></div>
                        <div className="flex flex-col gap-2">
                            {isLoggedIn === null ? (
                                <div className="flex flex-col gap-2 animate-pulse">
                                    <div className="h-[38px] bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                                    <div className="h-[38px] bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                                </div>
                            ) : isLoggedIn === false ? (
                                <>
                                    {/* Login — expandable audience picker */}
                                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => setMobileExpanded(mobileExpanded === 'login' ? null : 'login')}
                                            aria-expanded={mobileExpanded === 'login'}
                                            className="w-full py-2.5 text-sm font-bold text-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5"
                                        >
                                            <LogIn size={14} />
                                            <span>{t('public.login.login')}</span>
                                            <ChevronDown size={14} className={`opacity-60 transition-transform duration-200 ${mobileExpanded === 'login' ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {mobileExpanded === 'login' && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                                    className="overflow-hidden border-t border-slate-200 dark:border-slate-800"
                                                >
                                                    {AUDIENCE_OPTIONS.login.map(opt => (
                                                        <Link
                                                            key={opt.href}
                                                            href={opt.href}
                                                            onClick={() => { setMobileMenuOpen(false); setMobileExpanded(null); }}
                                                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-[#14b8a6] transition-colors"
                                                        >
                                                            <opt.icon size={14} className="opacity-70" />
                                                            <span>{opt.label}</span>
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Join Now — expandable audience picker */}
                                    <div className="rounded-xl overflow-hidden bg-[#14b8a6]">
                                        <button
                                            type="button"
                                            onClick={() => setMobileExpanded(mobileExpanded === 'join' ? null : 'join')}
                                            aria-expanded={mobileExpanded === 'join'}
                                            className="w-full py-2.5 text-sm font-bold text-center text-white flex items-center justify-center gap-1.5"
                                        >
                                            <Sparkles size={13} />
                                            <span>{t('public.login.join-now')}</span>
                                            <ChevronDown size={14} className={`opacity-90 transition-transform duration-200 ${mobileExpanded === 'join' ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {mobileExpanded === 'join' && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                                    className="overflow-hidden border-t border-white/15"
                                                >
                                                    {AUDIENCE_OPTIONS.join.map(opt => (
                                                        <Link
                                                            key={opt.href}
                                                            href={opt.href}
                                                            onClick={() => { setMobileMenuOpen(false); setMobileExpanded(null); }}
                                                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
                                                        >
                                                            <opt.icon size={14} className="opacity-80" />
                                                            <span>{opt.label}</span>
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </>
                            ) : (
                                <Link onClick={() => setMobileMenuOpen(false)} href="/dashboard" className="py-2.5 text-sm font-bold text-center bg-[#14b8a6] text-white hover:bg-[#0f766e] rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm">
                                    <LayoutDashboard size={14} />
                                    <span>{t('dashboard.sidebar.dashboard')}</span>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

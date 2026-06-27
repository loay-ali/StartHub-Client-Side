'use client';

import Link from 'next/link';

import {useRouter,usePathname} from 'next/navigation';

import { RiLogoutCircleLine } from "react-icons/ri";
import { AiOutlineLoading } from "react-icons/ai";
import { GoChevronDown } from "react-icons/go";

import MenuLinks from '@/constants/main-menu';
import { useEffect, useState } from 'react';
import config from '@/constants/config';

export default function Header() {

    const router = useRouter();
    const CURRENT_PATHNAME = usePathname();

    const [isLoggedIn,setIsLoggedIn] = useState<any>(null);

    const [isLogout,setIsLogout] = useState(false);

    const [openMenu,setOpenMenu] = useState(false);

    useEffect(() => {
        if( isLoggedIn == null ) {
            fetch(config.apiUrl +'/auth/me',{credentials: 'include'})
                .then(res => {
                    if( res.status == 200 ) {
                        return res.json();
                    }else {
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
    <header id = 'main-header' className = 'm-5 fixed w-[80vw] left-[10vw] top-[20px] rounded shadow z-99999 flex items-center justify-between p-3 bg-white '>
        <Link href = '/' id = 'identity' className='flex items-center justify-between gap-3'>
            <h1><img src = '/starthub.png' className = 'w-[100px]'/></h1>
        </Link>

        <nav className = 'flex items-center justify-between gap-5 mx-5'>
            {MenuLinks.map(ele => {
                return (
            <Link href = {ele.href} key = {ele.slug}>
                {ele.name}
            </Link>)
            })}
            
            <div className = 'h-[25px] w-[1px] bg-black'></div>

            {isLoggedIn == null || isLoggedIn == false ? (<>
            <Link href = '/register' className = 'button secondary'>
                Join Now
            </Link>
            <Link href = '/login'>
                Login
            </Link>
            </>):(
            <div className = 'group relative'>
                <button
                    onClick = {() => setOpenMenu(s => !s)}
                    className = 'p-1 text-sm flex items-center justify-center gap-5 cursor-pointer'>
                    {isLoggedIn.email}
                    <GoChevronDown size = {20} />
                </button>
                <div className = {'shadow text-center bg-white p-5 absolute gap-5 top-[calc(100%_+_12px)] left-0 w-full '+ (openMenu ? "flex flex-col":"hidden")}>
                    <Link href = "/dashboard" className = 'button px-4 cursor-pointer'>
                        Dashboard
                    </Link>
                    <button className = 'cursor-pointer bg-white! text-red-500! border-1 border-red-500 button flex items-center justify-center gap-5' onClick = {() => setIsLogout(true)}>
                        {isLogout ? (<><AiOutlineLoading className = 'spinner-loading'/></>):(<><RiLogoutCircleLine /></>)} Logout
                    </button>
                </div>
            </div>
            )}

            <div className = 'h-[25px] w-[1px] bg-black'></div>

            <select defaultValue = {CURRENT_PATHNAME.match(/(ar|fr|en)/)?.at(0)} onChange = {(newVal) => changeLanguage(newVal.target.value)}>
                <option value = 'en'>en</option>
                <option value = 'ar'>ar</option>
                <option value = 'fr'>fr</option>
            </select>
        </nav>
    </header>
    );
}
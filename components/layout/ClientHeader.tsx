'use client';

import Link from 'next/link';

import {useRouter,usePathname} from 'next/navigation';

import MenuLinks from '@/constants/main-menu';
import { useEffect, useState } from 'react';
import config from '@/constants/config';

export default function Header() {

    const router = useRouter();
    const CURRENT_PATHNAME = usePathname();

    const [isLoggedIn,setIsLoggedIn] = useState<any>(null);

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
    },[]);

    function changeLanguage(lang:string) {
        router.replace(CURRENT_PATHNAME.replace(/(ar|en|fr)/,lang));
    }

    return (
    <header className = 'm-5 fixed w-[80vw] left-[10vw] top-[20px] rounded shadow z-9 flex items-center justify-between p-3 bg-white '>
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
            </>):(<>
                <Link href = "/dashboard" className = 'button px-4 cursor-pointer'>
                    Dashboard
                </Link>
            </>)}

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
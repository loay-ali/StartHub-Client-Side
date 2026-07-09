"use client";

import { useEffect, useState } from "react";


import { useRouter,useParams } from "next/navigation";
import config from "@/constants/config";
import { notificationService } from "@/lib/notifiationSystem";
import { useTranslations } from "next-intl";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";

export default function VerifyEmail() {
    const router = useRouter();
    const {verifyToken} = useParams();

    if( ! verifyToken ) {
        return (<>Error Verifing</>)
    }

    const [verifing,setVerifing] = useState(true);

    const t = useTranslations();

    useEffect(() => {
        if( verifing ) {
            fetch(config.apiUrl +'/auth/verify-email',{
                credentials: 'include',
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({verifyCode: verifyToken})
            }).then(res => res.status == 200 || res.status == 201 ? (router.push('/login')):setVerifing(false))
        }
    },[]);

    useEffect(() => {
        if (!verifing) {
            notificationService.info(t('public.register.email-verified'), t('public.register.your-email-address-has-been-verified-successfull'));
        }
    }, [verifing]);

    if( verifing ) {
        return <div className = 'p-5 flex justify-center items-center'>
            <ButtonLoader size = {30} />
        </div>
    }

    return (
        <div className="p-5 text-center">
            {t('public.register.email-verified')}
        </div>
    );
}
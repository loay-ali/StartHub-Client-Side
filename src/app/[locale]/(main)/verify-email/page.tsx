"use client";

import { useEffect, useState } from "react";


import { useRouter,useParams } from "next/navigation";
import config from "@/constants/config";

export default function VerifyEmail() {
    const router = useRouter();
    const {verifyToken} = useParams();

    if( ! verifyToken ) {
        return (<>Error Verifing</>)
    }

    const [verifing,setVerifing] = useState(true);

    useEffect(() => {
        if( verifing ) {
            fetch(config.apiUrl +'/auth/verify-email',{
                credentials: 'include',
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({verifyCode: verifyToken})
            }).then(res => res.status == 200 ? (router.push('/dashboard')):setVerifing(false))
        }
    },[]);

    return <>Verified Successfully</>
}
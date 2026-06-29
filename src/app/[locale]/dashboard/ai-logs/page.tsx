'use client';

import CollectionPage from "@/components/collection/CollectionPage";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { useEffect, useState } from "react";

export default function AILogsPage() {
    const [logs,setLogs] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/logs',{credentials: 'include'})
                .then(res => res.status == 200 ? res.json():Promise.reject())
                .then(res => {
                    setLogs(res);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    },[]);

    if( loading ) return <div className = 'flex items-center justify-center p-5'><ButtonLoader size = {30}/></div>

    return (
        <CollectionPage 
            title = "Logs"
            data = {logs}
            columns={[
                {key: 'index',label: "#"},
                {key: 'user',label: "User"},
                {key: 'reason',label: "Usage Reason"},
                {key: 'tokens',label: "Tokens Used",sortable: true},
                {key: 'createdAt',label: 'Date & Time',sortable: true}
            ]}/>
    );
}
'use client';

import CollectionPage from "@/components/collection/CollectionPage";
import config from "@/constants/config";
import Notification from "@/types/requests/notification";
import { useEffect, useState } from "react";

import { AiOutlineLoading } from "react-icons/ai";

import { useParams, useSearchParams } from "next/navigation";

export default function NotificationsList() {

    const [notifications,setNotifications] = useState<Notification[]>([]);
    const [loading,setLoading] = useState(true);

    const router = useParams();
    const searchParams = useSearchParams();

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/user/notifications',{credentials: 'include'})
            .then(res => res.status == 200 ? res.json():Promise.reject())
            .then(res => {
                setNotifications(res.data);
            }).finally(() => {
                setLoading(false);
            });

            fetch(config.apiUrl +'/user/checkNotifications',{
                credentials: 'include',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    where: "list",
                    lastIndex: 0
                })
            })
        }
    },[]);

    if( loading ) {
        return <div className = 'p-5 flex justify-center items-center'><AiOutlineLoading className = 'spinner-loading' /></div>
    }

    return (
    <CollectionPage
        currentPage={searchParams.has('p') ? Math.abs(Number(searchParams.get('p'))):1}
        title = "Notifications"
        data = {notifications}
        columns = {[
            {key: "id",label: "#"},
            {key: "title",label: "Title"},
            {key: "content",label: "Content"},
            {key: "type",label: "Type"},
            {key: "created_at",label: "Date"}
        ]}/>
    );
}
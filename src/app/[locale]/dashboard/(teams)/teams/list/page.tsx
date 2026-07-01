'use client';

import CollectionPage from "@/components/collection/CollectionPage";
import config from "@/constants/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TeamsList() {
    const router = useRouter();

    const [teams,setTeams] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/teams',{credentials: 'include'})
                .then(res => res.status == 200 ? res.json():Promise.reject())
                .then(res => {
                    setTeams(res);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    },[]);

    return (
    <section className = 'flex items-start gap-5'>
        <CollectionPage
            title = "Teams List"
            data = {teams}
            columns={[
                {key: "index",label: "#"},
                {key: "name",label: "Team"},
                {key: 'members',label: "Members",sortable: true}
            ]}
            onAdd={() => {
                router.push('/dashboard/teams/new');
            }}/>
    </section>)
}
'use client';

import CollectionPage from "@/components/collection/CollectionPage";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import AreYouSureWindow from "@/components/window/AreYouSure";
import config from "@/constants/config";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TeamsList() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [teams,setTeams] = useState([]);
    const [loading,setLoading] = useState(true);

    const [deleting,setDeleting] = useState('');
    const [confirmDeleting,setConfirmDeleting] = useState(false);

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

        if( confirmDeleting && deleting != '' ) {
            fetch(config.apiUrl +'/teams/'+ deleting,{
                credentials: 'include',
                method: "DELETE",
            }).then(res => {
                if( res.status == 200 ) {
                    router.refresh();
                }
            })
            .catch(err => {
                console.warn(err);
            }).finally(() => {
                setDeleting('');
                setConfirmDeleting(false);
            })
        }
    },[confirmDeleting]);

    return (
    <section className = 'flex items-start gap-5'>
        {deleting != ''
        && confirmDeleting == false
        && <AreYouSureWindow
            title = "Are you sure ?"
            setWindowState={() => setDeleting('')}
            confirmCallback={() => setConfirmDeleting(true)}/>}
        {deleting != '' && confirmDeleting == true ?
            <div className = 'p-5 flex items-center justify-center'>
                <ButtonLoader size = {30}/>
            </div>:
            <CollectionPage
                currentPage={searchParams.has('p') ? Math.abs(Number(searchParams.get('p'))):1}
                title = "Teams List"
                data = {teams}
                columns={[
                    {key: "index",label: "#"},
                    {key: "name",label: "Team"},
                    {key: 'members',label: "Members",sortable: true}
                ]}
                onAdd={() => {
                    router.push('/dashboard/teams/new');
                }}
                onDelete={(row:any) => {
                    setDeleting(row.id);
                }}/>}
    </section>)
}
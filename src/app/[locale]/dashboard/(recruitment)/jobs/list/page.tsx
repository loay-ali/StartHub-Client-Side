'use client';

import CollectionPage from "@/components/collection/CollectionPage";
import AreYouSureWindow from "@/components/window/AreYouSure";
import config from "@/constants/config";
import Job from "@/types/requests/jobs";

import {redirect,useRouter} from 'next/navigation';
import { useEffect, useState } from "react";
import { notificationService } from "@/lib/notifiationSystem";

export default function JobsList() {
    const [jobs,setJobs] = useState([{title: "Job Title",description: "Description",role: 'CEO',workspaceModel: "Some Model",timeModel: "parttime"}]);

    const [isRemoving,setIsRemoving] = useState('');
    const [confirmRemoving,setConfirmRemoving] = useState(false);

    const [isLoading,setIsLoading] = useState(false);
    const [isError,setIsError] = useState(false);
    
    const router = useRouter();

    useEffect(() => {
        /*if(isLoading) {
            fetch(config.apiUrl +'/jobs',{credentials: 'include'})
                .then(res => res.json())
                .then(res => {
                    setJobs(res);
                })
            .catch(() => {
                setIsError(true);
            }).finally(() => {
                setIsLoading(false);
            });
        }*/

        if(isRemoving != '' && confirmRemoving) {
            fetch(config.apiUrl +'/jobs/'+ isRemoving,{
                credentials: 'include',
                method: 'DELETE'
            })
            .then(res => {
                if( res.status == 200 ) {
                    notificationService.success("Job deleted", "The job post has been removed successfully.");
                    router.refresh();
                } else {
                    notificationService.error("Delete failed", "Could not delete the job. Please try again.");
                }
            })
            .catch(() => {
                notificationService.error("Network error", "Could not reach the server. Check your connection.");
            })
            .finally(() => {
                setIsRemoving('');
                setConfirmRemoving(false);
            });
        }
    },[isLoading,confirmRemoving]);

    if( isError ) {
        notificationService.error("Loading failed", "Something went wrong while loading data.");
        return (<section className = 'flex flex-col justify-center items-center gap-5'>
            <strong className = "text-2xl text-center">Something Went Wrong</strong>
            <button type = 'button' className = 'button' onClick = {() => {
                router.refresh();
            }}>
                Refresh
            </button>
        </section>);
    }

    return (
    <>
    {isRemoving != '' && confirmRemoving == false && <AreYouSureWindow confirmCallback = {() => {
        setConfirmRemoving(true);
    }} setWindowState = {setIsRemoving} title = "Delete a Job Post"/>}
    <CollectionPage
        title = "Jobs List"
        data = {jobs}
        columns = {[
            {key: "id",label: "#"},
            {key: "title",label: "Title",sortable: true},
            {key: "candidates",label: "Candidates",sortable: true},
            {key: "status",label: "Status",sortable: true}
        ]}
        onAdd={() => {
            redirect('/dashboard/jobs/new');
        }}
        onEdit={(row:any) => {
            redirect('/dashboard/jobs/'+ row.id);
        }}
        onDelete={(row:any) => {
            setIsRemoving(row.id);
        }}
        isDeleting = {isRemoving != '' && confirmRemoving}/>
        </>);
}
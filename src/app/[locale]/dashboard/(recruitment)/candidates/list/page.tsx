'use client';

import { AiOutlineLoading } from "react-icons/ai";
import { MdReportGmailerrorred } from "react-icons/md";
import { LuRefreshCcw } from "react-icons/lu";

import CollectionPage from '@/components/collection/CollectionPage';
import AreYouSureWindow from '@/components/window/AreYouSure';

import {useRouter} from 'next/navigation';
import { useEffect, useState } from 'react';
import config from "@/constants/config";
import { notificationService } from "@/lib/notifiationSystem";

export default async function CandidatesList() {
    const router = useRouter();

    const [candidates,setCandidates] = useState([]);

    const [isDeleting,setIsDeleting] = useState('');
    const [confirmRemoving,setConfirmRemoving] = useState(false);

    const [isLoading,setIsLoading] = useState(true);
    const [hasError,setHasError] = useState(false);

    useEffect(() => {

        if( isLoading == true ) {
            fetch(config.apiUrl +'/candidates',{
                credentials: 'include'})
            .then(res => res.json())
            .then(res => {
                setCandidates(res);
                setIsLoading(false);
            })
            .catch(() => {
                notificationService.error("Loading failed", "Could not load candidates. Please try again.");
                setHasError(true);
                setIsLoading(false);
            })
        }

    },[isLoading]);

    if( isLoading == true || hasError == true ) {
        return (
        <section className = 'flex justify-center items-center p-5'>
            {isLoading ? (
                <AiOutlineLoading size = {20} className = 'spinner-loading' />
            ):(
                <>
                    <MdReportGmailerrorred size = {20} className = 'spinner-loading' color = "#dc3545"/>
                    <strong>Something Went Wrong</strong>

                    <button type = 'button' onClick = {() => {
                        router.refresh();
                    }}>
                        
                    </button>
                </>
            )}
        </section>
        );
    }

    return (
    <>
    <CollectionPage
        onAdd={() => router.replace('/dashboard/candidates/new')}
        onEdit={(row:{id:string}) => router.replace('/dashboard/candidates/'+ row.id)}
        onDelete={(row:{id:string}) => {
            setIsDeleting(row.id);
        }}
        title = "Candiates"
        data = {candidates}
        columns = {[
        ]}/>
    {isDeleting != '' && confirmRemoving == false && <AreYouSureWindow confirmCallback = {() => {
        setConfirmRemoving(true);
    }}  setWindowState = {setIsDeleting} title = "You Really Want To Delete The Candidate ?" />}
    </>);
}
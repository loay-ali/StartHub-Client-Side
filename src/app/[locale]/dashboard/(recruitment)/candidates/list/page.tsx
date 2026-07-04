'use client';

import CollectionPage from '@/components/collection/CollectionPage';
import AreYouSureWindow from '@/components/window/AreYouSure';

import {forbidden, useRouter} from 'next/navigation';
import { useEffect, useState } from 'react';
import config from "@/constants/config";
import { notificationService } from "@/lib/notifiationSystem";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import AISection, { ActionType } from "@/components/ai/section/AISection";
import { Bot } from "lucide-react";

export default function CandidatesList() {
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

        if( isDeleting != '' && confirmRemoving == true ) {
            fetch(config.apiUrl +'/candidates/'+ isDeleting,{
                credentials: 'include',
                method: 'DELETE'
            }).then(() => {
                router.refresh();
            })
        }

    },[confirmRemoving]);

    if( isLoading == true ) {
        return (<div className = 'p-5 flex justify-center items-center'>
            <ButtonLoader size = {30}/>
        </div>)
    }

    if( hasError ) {
        return forbidden();
    }

    return (
    <section className = 'flex items-start gap-5 justify-center mx-auto max-w-[1200px]'>
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
        <AISection 
            Icon = {Bot}
            title = "Need Help ?"
            initialActions={[
                {title: "Filter Candidates",action: "filterCandidates",type: ActionType.CHAT}
            ]}/>
    </section>);
}
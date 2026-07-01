'use client';

import CollectionPage from '@/components/collection/CollectionPage';
import config from '@/constants/config';
import Interview from '@/types/requests/interview';
import { redirect } from 'next/navigation';

import { useState,useEffect } from 'react';
import { RiOilFill } from 'react-icons/ri';
import { notificationService } from "@/lib/notifiationSystem";

export default function InterviewsList() {

    const [interviews,setInterviews] = useState<Interview[]>([]);

    const [isLoading,setIsLoading] = useState(false);
    const [isRemoving,setIsRemoving] = useState('');
    const [isError,setIsError] = useState(false);

    useEffect(() => {
        if( isLoading ) {
            fetch(config.apiUrl +'/interviews',{credentials: 'include'})
                .then(res => res.json())
                .then(res => {
                    setInterviews(res);
                })
                .catch(() => {
                    notificationService.error("Loading failed", "Could not load interviews. Please try again.");
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }

        if( isRemoving != '' ) {

        }
    },[isLoading,isRemoving]);

    return (
        <CollectionPage
            title = "Interviews List"
            data = {interviews}
            columns={[
                {key: 'id',label: "#",sortable: false},
                {key: 'candidate',label: "Candidate",sortable: true},
                {key: 'job',label: "Job",sortable: true}
            ]}
            onAdd={() => {
                redirect('/dashboard/interviews/new');
            }}
            onDelete={(row:{id:string}) => {
                setIsRemoving(row.id);
            }}
            onEdit={(row:{id:string}) => {
                redirect('/dashboard/interviews/'+ row.id);
            }}/>)
}
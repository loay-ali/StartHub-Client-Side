'use client';

import CollectionPage from '@/components/collection/CollectionPage';
import config from '@/constants/config';
import Interview from '@/types/requests/interview';
import { redirect } from 'next/navigation';

import { useState,useEffect } from 'react';
import { RiOilFill } from 'react-icons/ri';
import { notificationService } from "@/lib/notifiationSystem";

import {forbidden} from 'next/navigation';
import AISection, { ActionType } from '@/components/ai/section/AISection';
import { Bot } from 'lucide-react';
import AreYouSureWindow from '@/components/window/AreYouSure';
import { ButtonLoader } from '@/components/preloader/ButtonLoader';
import { useTranslations } from 'next-intl';

export default function InterviewsList() {

    const [interviews,setInterviews] = useState<Interview[]>([]);

    const [isLoading,setIsLoading] = useState(false);
    
    const [isRemoving,setIsRemoving] = useState('');
    const [confirmRemoving,setConfirmRemoving] = useState(false);

    const [isError,setIsError] = useState(false);

    const t = useTranslations();

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

    if( isError ) return forbidden();

    return (
        <section className = 'flex items-start gap-5 max-w-[750px] mx-auto'>
            {isRemoving != '' && confirmRemoving == false && <AreYouSureWindow
            title = "Are You Sure ?" confirmCallback={() => setConfirmRemoving(true)}
            setWindowState={() => setIsRemoving('')}/>}
            {isRemoving != '' && confirmRemoving == true ? (
            <div className = 'p-5 flex justify-center items-center'>
                <ButtonLoader size = {30}/>
            </div>
            ):(
            <CollectionPage
                title = {t('dashboard.interviews.interviews-list')}
                data = {interviews as any}
                columns={[
                    {key: 'id',label: "#",sortable: false},
                    {key: 'candidate',label: t("dashboard.candidate.candidate"),sortable: true},
                    {key: 'job',label: t('dashboard.job.job'),sortable: true}
                ]}
                onAdd={() => {
                    redirect('/dashboard/interviews/new');
                }}
                onDelete={(row:{id:string}) => {
                    setIsRemoving(row.id);
                }}
                onEdit={(row:{id:string}) => {
                    redirect('/dashboard/interviews/'+ row.id);
                }}/>)}
            <AISection
                Icon = {Bot}
                title = "Do You Need Help ?"
                initialActions={[
                    {title: "Create Interview Using AI",type: ActionType.CHAT,action: "createInterview"}
                ]}/>
        </section>)
}
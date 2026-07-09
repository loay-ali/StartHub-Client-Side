'use client';

import CollectionPage from '@/components/collection/CollectionPage';
import config from '@/constants/config';
import { useTranslations } from 'next-intl';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TasksList() {
    const t = useTranslations();

    const {team} = useParams();

    const [tasks,setTasks] = useState([]);
    const [loading,setLoading] = useState(true);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/teams/'+ team,{credentials: 'include'})
                .then(res => res.status == 200 ? res.json():Promise.reject())
                .then(res => {
                    setTasks(res);
                }).finally(() => {
                    setLoading(false);
                })
        }
    },[]);

    return (
        <section className = 'flex items-start gap-5'>
            <CollectionPage
                currentPage={searchParams.has('p') ? Math.abs(Number(searchParams.get('p'))):1}
                title = "Tasks List"
                data = {tasks}
                columns = {[]}
                onAdd={() => router.push('/dashboard/tasks/new')} />
        </section>
    );
}
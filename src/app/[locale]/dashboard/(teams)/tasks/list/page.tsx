'use client';

import CollectionPage from "@/components/collection/CollectionPage";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyOwnTasks() {

    const [tasks,setTasks] = useState([]);
    const [loading,setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/teams/tasks',{
                credentials: 'include'
            }).then(res => res.status == 200 ? res.json():Promise.reject())
            .then(res => {
                setTasks(res);
            }).finally(() => {
                setLoading(false);
            })
        }
    },[]);

    if( loading ) {
        return <div className = 'p-5 flex justify-center items-center'>
            <ButtonLoader size = {30}/>
        </div>
    }

    return (
        <section className = 'flex items-start justify-center gap-5'>
            <CollectionPage
                title = "My Tasks"
                data = {tasks}
                columns={[
                    {key: 'index',label: "#"},
                    {key: 'task',label: "Task"},
                    {key: 'status',label: 'Status'}
                ]}
                onEdit={(row:any) => {
                    router.push('/dashboard/tasks/'+ row.id);
                }}
                onAdd={() => router.push('/dashboard/tasks/new')}/>
        </section>
    );
}
'use client';

import CollectionPage from "@/components/collection/CollectionPage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyOwnTasks() {

    const [tasks,setTasks] = useState([]);
    const [loading,setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {

    },[]);

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
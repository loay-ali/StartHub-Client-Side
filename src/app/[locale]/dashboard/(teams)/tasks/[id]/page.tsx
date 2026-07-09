'use client';

import AIHelperButton from "@/components/ai/AIHelperButton";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Task = {
    title:string;
    details:string;
    status:'DONE'|'CANCELLED'|'PENDING'|'IN_PROGRESS';
}

export default function EditTask() {
    const {id} = useParams();

    const [taskData,setTaskData] = useState<Task>({
        title: "",
        details: "",
        status: 'PENDING'
    });

    const [loading,setLoading] = useState(true);

    const [switchStatus,setSwitchStatus] = useState(false);

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/teams/task/'+ id,{credentials: 'include'})
            .then(res => res.status == 200 ? res.json():Promise.reject())
            .then(res => {
                setTaskData(res);
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
            <section className = 'bg-white shadow rounded p-5'>
                <h2>
                    Task Data
                </h2>

                <div className = 'form-group relative'>
                    <label htmlFor="title">Title</label>
                    <input type = 'text' id = 'title' onInput = {ele => setTaskData(task => {
                        task.title = ele.currentTarget.value;
                        return task;
                    })} value = {taskData.title} />
                    <AIHelperButton purpose = "taskTitle" message = {{
                        content: "What Do You Need For Task Title Field ?",
                        actions: [],
                        //@ts-ignore
                        additional: {title: taskData.title}
                    }} />
                </div>

                <div className = 'form-group relative'>
                    <label htmlFor="details">Details</label>
                    <textarea id = 'details' defaultValue={taskData.details} onInput = {ele => {
                        setTaskData(task => {
                            task.details = ele.currentTarget.value;
                            return task;
                        })
                    }}></textarea>
                    <AIHelperButton purpose = "taskDetails" message = {{
                        content: "What Do You Need For Task Details Field ?",
                        actions: [],
                        //@ts-ignore
                        additional: {details: taskData.details}
                    }} />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <input type="text" id="status" readOnly = {true} defaultValue={taskData.status} />
                    <div className = 'flex gap-5 justify-center'>
                        
                    </div>
                </div>
            </section>
        </section>
    );
}
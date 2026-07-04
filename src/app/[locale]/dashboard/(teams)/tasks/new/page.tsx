'use client';

import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const taskStatus = ['PENDING','DONE','CANCELLED','IN_PROGRESS'];

export default function NewTask() {
    const router = useRouter();

    const [title,setTitle] = useState('');
    const [details,setDetails] = useState('');

    const [status,setStatus] = useState<string>('PENDING');

    const [saving,setSaving] = useState(false);
    const [error,setError] = useState(false);

    useEffect(() => {
        if( saving ) {
            fetch(config.apiUrl +'/teams/tasks',{
                credentials: 'include',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    details,
                    status
                })
            }).then(res => res.status == 201 ? router.push('/dashboard/tasks/list'):Promise.reject())
            .finally(() => {
                setSaving(false);
            })
        }
    },[saving]);

    return (
        <section className = 'flex items-start justify-center gap-5'>
            <section className = 'bg-white shadow rounded p-5'>
                <h2>
                    New Task
                </h2>

                <div className = 'form-group'>
                    <label htmlFor="title">Title</label>
                    <input type="text" defaultValue={title} onInput = {ele => setTitle(ele.currentTarget.value)} id="title" />
                </div>

                <div className = 'form-group'>
                    <label htmlFor="details">Details</label>
                    <textarea defaultValue={details} onInput = {ele => setDetails(ele.currentTarget.value)} id="details"></textarea>
                </div>

                <div className = 'form-group'>
                    <label htmlFor="status">Status</label>
                    <select defaultValue={status} onChange = {ele => setStatus(ele.target.value)} id="status">
                        {taskStatus.map((s:string) => {
                            return (
                                <option value = {s}>
                                    {s.replace('_',' ').toLowerCase()}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <button onClick = {() => setSaving(true)} type = 'button' className = 'button'>
                    {saving ? <ButtonLoader />:<>Save</>}
                </button>
            </section>
        </section>
    );
}
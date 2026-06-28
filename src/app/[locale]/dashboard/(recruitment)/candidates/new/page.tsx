'use client';

import config from "@/constants/config";
import Job from "@/types/requests/jobs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AiOutlineLoading } from "react-icons/ai";
import { PiEmptyLight } from "react-icons/pi";

export default function NewCandidate() {
    const router = useRouter();

    const [jobs,setJobs] = useState<Job[]>([]);
    const [isLoadingJobs,setIsLoadingJobs] = useState(true);

    const [isSavingCandidate,setIsSavingCandidate] = useState(false);
    const [candidate,setCandidate] = useState<{fullname:string,email:string,phone:string,appliedJob:string,cv:File|null}>({
        fullname: '',
        email: '',
        phone: '',
        appliedJob: '',
        cv: null
    });

    useEffect(() => {
        if( isLoadingJobs ) {
            fetch(config.apiUrl +'/candidates',{credentials: 'include'})
                .then(res => res.status == 200 ? res.json():Promise.reject())
                .then(res => {
                    setJobs(res);
                }).finally(() => {
                    setIsLoadingJobs(false);
                })
        }

        if( isSavingCandidate ) {
            if( candidate.cv ) {
                const formData = new FormData();
                formData.append('file',candidate.cv);

                fetch(config.apiUrl +'/upload-file/cv',{
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Content-Type': "multipart/form-data"
                    },
                    body: formData
                }).then(res => res.status == 201 ? res.json():Promise.reject())
                .then(res => {
                    fetch(config.apiUrl +'/candidates',{
                        credentials: 'include',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            jobId: candidate.appliedJob,
                            fullName: candidate.fullname,
                            phone: candidate.phone,
                            email: candidate.email,
                            cvUrl: res.data
                        })
                    }).then(() => {
                        router.push('/dashboard/candidates/list');
                    })
                })
            }

            fetch(config.apiUrl +'/candidates',{
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jobId: candidate.appliedJob,
                    fullName: candidate.fullname,
                    phone: candidate.phone,
                    email: candidate.email
                })
            }).then(() => {
                router.push('/dashboard/candidates/list');
            })
        }
    },[isSavingCandidate]);

    if( isLoadingJobs ) return <div className = 'p-5 flex justify-center items-center'><AiOutlineLoading className = 'spinner-loading' /></div>

    if( jobs.length == 0 ) {
        return (
            <section className = 'flex flex-col justify-center items-center gap-5 mt-20'>
                <PiEmptyLight size = {80} />
                <strong>No Jobs To Apply Candidates To</strong>

                <Link className = 'button' href = "/dashboard/jobs/new">Create a Job</Link>
            </section>
            );
    }

    return (
    <section className = 'bg-white max-w-[500px] my-5 mx-auto p-5 rounded shadow'>
        <h2 className = 'text-2xl'>Create a Candidate</h2>

        <div className = 'form-group'>
            <label htmlFor = 'fullname'>
                Fullname
            </label>
            <input onInput = {(ele) => {
                setCandidate(data => {
                    data.fullname = ele.currentTarget.value;
                    return data;
                });
            }} value = {candidate.fullname} type="text" name="fullname" id="fullname" />
        </div>

        <div className = 'form-group'>
            <label htmlFor = 'email'>
                E-Mail
            </label>
            <input onInput = {(ele) => {
                setCandidate(data => {
                    data.email = ele.currentTarget.value;
                    return data;
                });
            }} value = {candidate.email} type="email" name="email" id="email" />
        </div>

        <div className = 'form-group'>
            <label htmlFor = 'phone'>
                Phone
            </label>
            <input onInput = {(ele) => {
                setCandidate(data => {
                    data.phone = ele.currentTarget.value;
                    return data;
                });
            }} value = {candidate.phone} type="tel" name="phone" id = "phone" />
        </div>

        <div className = 'form-group'>
            <label htmlFor = 'job'>
                Applied Job
            </label>
            <select onInput = {(ele) => setCandidate((data) => {
                data.appliedJob = ele.currentTarget.value;
                return data;
            })} defaultValue = {candidate.appliedJob} name="job" id="job">
                {jobs.map(job => (<option value = {job.id}>
                    {job.title}
                </option>))}
            </select>
        </div>

        <div className = 'form-group'>
            <label htmlFor = 'cv'>
                CV
            </label>
            <input onInput = {(ele) => setCandidate((data) => {
                data.cv = ele.currentTarget.files?.[0] ?? null;
                return data;
            })} type = 'file' name = 'cv' id = 'cv' accept = '*.png,*.jpg,*.pdf' />
        </div>

        <button onClick = {() => setIsSavingCandidate(true)} type ='submit' className = 'button w-full flex justify-center items-center'>
            {isSavingCandidate ? <AiOutlineLoading className = 'spinner-loading' />:<>Add Candidate</>}
        </button>
    </section>
    );
}
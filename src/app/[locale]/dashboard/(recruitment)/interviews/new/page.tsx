'use client';

import Candidate from "@/types/requests/candidates";
import Job from "@/types/requests/jobs";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PiEmptyLight } from "react-icons/pi";
import { AiOutlineLoading } from "react-icons/ai";
import config from "@/constants/config";
import { useRouter } from "next/navigation";

export default function NewInterview() {
    const router = useRouter();

    const [jobs,setJobs] = useState<Job[]>([]);
    const [candidates,setCandidates] = useState<Candidate[]>([]);

    const [isLoading,setIsLoading] = useState(true);
    const [isLoadingCandidates,setIsLoadingCandidates] = useState(false);

    const [job,setJob] = useState('');
    const [candidate,setCandidate] = useState('');

    const [title,setTitle] = useState('');
    const [desc,setDesc] = useState('');

    const [isSavingInterview,setIsSavingInterview] = useState(false);

    useEffect(() => {
        if( isSavingInterview ) {
            fetch(config.apiUrl +'/interviews',{
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description: desc,
                    jobId: job,
                    candidateId: candidate
                })
            }).then(res => res.status == 201 ? res.json():Promise.reject())
            .then(res => {
                router.push('/dashboard/interviews');
            })
        }

        if( isLoading ) {
            fetch(config.apiUrl +'/jobs',{credentials: 'include'})
                .then(res => res.status == 200 ? res.json():Promise.reject())
                .then(res => {
                    setJobs(res.data);
                    setIsLoading(false);
                })
        }

        if( isLoadingCandidates && job != '' ) {
            fetch(config.apiUrl +'/candidates?jobId='+ job,{credentials: 'include'})
                .then(res => res.status == 200 ? res.json():Promise.reject())
                .then(res => {
                    setCandidates(res.data);
                    setIsLoadingCandidates(false);
                })
        }
    },[isLoadingCandidates]);

    if( isLoading ) return <div className = 'p-5 flex items-center justify-center'><AiOutlineLoading className = 'spinner-loading'/></div>

    if( jobs.length == 0 ) {
        return (<section className = 'flex flex-col justify-center items-center gap-5 mt-20'>
                <PiEmptyLight size = {80} />
                <strong>No Jobs To Apply Interview To</strong>

                <Link className = 'button' href = "/dashboard/jobs/new">Create a Job</Link>
            </section>)
    }

    if( candidates.length == 0 ) {
        return ((<section className = 'flex flex-col justify-center items-center gap-5 mt-20'>
                <PiEmptyLight size = {80} />
                <strong>No Candidates To Apply Interview To</strong>

                <Link className = 'button' href = "/dashboard/candidates/new">Create a Candidate</Link>
            </section>))
    }

    return (
    <section className = 'flex flex-col p-2 bg-white rounded shadow m-10 mx-auto'>
        <h2 className = 'text-2xl'>Create an Interview</h2>

        <div className = 'form-group'>
            <label htmlFor = 'job'>
                Job
            </label>
            <select id = 'job' defaultValue = {job} onChange = {ele => {
                setJob(ele.currentTarget.value);
            }}>
                <option value = ''>
                    Choose a Job
                </option>
                {jobs.map((job:Job) => (
                    <option value = {job.id}>
                        {job.title}
                    </option>
                ))}
            </select>
        </div>

        <div className = 'form-group'>
            <label htmlFor = 'candidate'>
                Candidate
            </label>
            {isLoadingCandidates ? <div><AiOutlineLoading className = 'spinner-loading' /></div>:<select id = 'candidate' defaultValue = {candidate} onChange = {ele => {
                setCandidate(ele.currentTarget.value);
            }}>
                <option value = ''>
                    Choose a Candidate
                </option>
                {candidates.map((candidate:Candidate) => (
                    <option value = {candidate.id}>
                        {candidate.fullname}
                    </option>
                ))}
            </select>}
        </div>

        <div className = 'form-group'>
            <label htmlFor = 'title'>
                Title
            </label>
            <input type = 'text' value = {title} onInput = {ele => setTitle(ele.currentTarget.value)} id = 'title' />
        </div>

        <div className = 'form-group'>
            <label htmlFor = 'desc'>
                Description
            </label>
            <textarea id = 'desc' onInput = {ele => setDesc(ele.currentTarget.value)}>{desc}</textarea>
        </div>

        <button onClick = {() => setIsSavingInterview(true)} type ='submit' className = 'button w-full flex justify-center items-center'>
            {isSavingInterview ? <AiOutlineLoading className = 'spinner-loading' />:<>Add Interview</>}
        </button>
    </section>);
}
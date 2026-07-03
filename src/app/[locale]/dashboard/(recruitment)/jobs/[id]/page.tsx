'use client';

import AIHelperButton from '@/components/ai/AIHelperButton';
import AISection, { ActionType } from '@/components/ai/section/AISection';
import { ButtonLoader } from '@/components/preloader/ButtonLoader';
import config from '@/constants/config';
import Job from '@/types/requests/jobs';
import Role from '@/types/requests/roles';
import { useRouter,useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BsPersonPlus } from "react-icons/bs";

export default async function SingleJob() {

    const router = useRouter();

    const {id} = useParams();

    if( ! id ) return <>Invalid Request</>;

    const [jobData,setJobData] = useState<Job>({
        title: "",
        timeModel: "fulltime",
        status: "ACTIVE",
        description: "",
        responsibilities: "",
        role: "",
        workspaceModel: "onsite",
        status: "PAUSED"
    });
    const [roles,setRoles] = useState<Role[]>([]);

    const [saving,setSaving] = useState(false);
    const [loadingJob,setLoadingJob] = useState(false);
    const [loadingRoles,setLoadingRoles] = useState(false);

    useEffect(() => {
        if( saving ) {
            fetch(config.apiUrl +'/jobs/'+ id,{
                credentials: 'include',
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(jobData)
            }).then(() => {
                setSaving(false);
            })
        }

        if( loadingRoles ) {
            fetch(config.apiUrl +'/recruitment/roles',{credentials: 'include'})
            .then(res => res.status == 200 ? res.json():Promise.reject())
            .then(res => {
                setRoles(res);
            }).finally(() => {
                setLoadingRoles(false);
            })
        }
        if( loadingJob ) {
            fetch(config.apiUrl +'/jobs/'+ id,{credentials: "include"})
            .then(res => res.status == 200 ? res.json():Promise.reject())
            .then(res => {
                setJobData(res);
            }).finally(() => {
                setLoadingJob(false);
            })
        }
    },[saving]);

    if( loadingRoles || loadingJob ) {
        return <div className = 'p-5 flex justify-center items-center'>
            <ButtonLoader size = {30} />
        </div>
    }

    const t = new Date(jobData.createdAt ?? Date.now());

    return (
    <section className = 'flex items-start justify-center mx-auto gap-5 wrap max-w-[750px]'>
        <section className = 'bg-white mx-auto grow rounded shadow p-5'>

            <h2 className = 'text-2xl'>Job Data</h2>

            <div className = 'form-group relative'>
                <label htmlFor = 'title'>
                    Title
                </label>
                <input onInput = {ele => setJobData(j => {
                    j.title = ele.currentTarget.value;
                    return j;
                })} value = {jobData.title} type="text" name="title" id="title" />
                <AIHelperButton purpose = "jobTitle" message = {{
                    content: "What Do You Need For Job Title Field ?",
                    actions: [],
                    //@ts-ignore
                    additional: {title: jobData.title}
                }} />
            </div>

            <div className = 'form-group relative'>
                <label htmlFor = 'desc'>
                    Description
                </label>
                <textarea onInput = {ele => setJobData(j => {
                    j.description = ele.currentTarget.value;
                    return j;
                })} defaultValue = {jobData.description} id = 'desc'></textarea>
                <AIHelperButton purpose = "jobDesc" message = {{
                    content: "What Do You Need For Job Description Field ?",
                    actions: [],
                    //@ts-ignore
                    additional: {description: jobData.description}
                }} />
            </div>

            <div className = 'form-group relative'>
                <label htmlFor = 'responsibilites'>
                    Responsibilites
                </label>
                <textarea onInput = {ele => setJobData(j => {
                    j.responsibilities = ele.currentTarget.value;
                    return j;
                })} defaultValue = {jobData.responsibilities} id = 'responsibilites'></textarea>
                <AIHelperButton purpose = "jobResponsibilies" message = {{
                    content: "What Do You Need For Job Responsibilites Field ?",
                    actions: [],
                    //@ts-ignore
                    additional: {responsibilites: jobData.responsibilites}
                }} />
            </div>

            <div className = 'form-group relative'>
                <label htmlFor = 'role'>
                    Role
                </label>
                <select onChange = {ele => {
                    setJobData(j => {
                        j.role = ele.target.value;
                        return j;
                    })
                }} defaultValue={jobData.role} id = 'role'>
                    {roles.map(role => {
                        return (<option value = {role.slug}>{role.name}</option>)
                    })}
                </select>
                <AIHelperButton purpose = "jobRole" message = {{
                    content: "What Do You Need For Job Role Field ?",
                    actions: [],
                    //@ts-ignore
                    additional: {role: jobData.role}
                }} />
            </div>

            <div className = 'form-group relative'>
                <label htmlFor = 'workspace-model'>
                    Workspace Model
                </label>
                <select onChange = {ele => {
                    setJobData(j => {
                        j.workspaceModel = ele.target.value;
                        return j;
                    })
                }} defaultValue={jobData.workspaceModel} id = 'workspace-model'>
                    <option value='onsite'>On-Site</option>
                    <option value="remotely">Remotely</option>
                    <option value="hybrid">Hybrid</option>
                </select>
                <AIHelperButton purpose = "jobWorkspaceModel" message = {{
                    content: "What Do You Need For Job Workspace Model Field ?",
                    actions: [],
                    //@ts-ignore
                    additional: {workspaceModel: jobData.workspaceModel}
                }} />
            </div>

            <div className = 'form-group relative'>
                <label htmlFor = 'time-model'>
                    Time Model
                </label>
                <select onChange = {ele => {
                    setJobData(j => {
                        j.timeModel = ele.target.value;
                        return j;
                    })
                }} defaultValue={jobData.timeModel} id = 'time-model' name = 'time-model'>
                    <option value='fulltime'>Full Time</option>
                    <option value="parttime">Part Time</option>
                </select>
                <AIHelperButton purpose = "jobTimeModel" message = {{
                    content: "What Do You Need For Job Time Model Field ?",
                    actions: [],
                    //@ts-ignore
                    additional: {timeModel: jobData.timeModel}
                }} />
            </div>
                
            <div className = 'form-group relative'>
                <label htmlFor="status">Status</label>
                <select defaultValue={jobData.status} id = 'status' onChange = {ele => {
                    setJobData(j => {
                        j.status = ele.target.value;
                        return j;
                    })
                }}>
                </select>
                <AIHelperButton purpose = "status" message = {{
                    content: "What Do You Need For Job Status Field ?",
                    actions: [],
                    //@ts-ignore
                    additional: {status: jobData.status}
                }} />
            </div>

            <div className = 'flex flex-col my-5'>
                <strong>Created At</strong>
                <time dateTime={jobData.createdAt}>
                    {t.getFullYear() +' / '+ (t.getMonth() + 1) +' / '+ t.getDate()}
                </time>
            </div>

            <button onClick = {() => setSaving(true)} type = 'button' className = 'flex justify-center w-full button'>
                {saving ? <ButtonLoader />:<>Update Job</>}
            </button>

        </section>
        <AISection
            Icon = {BsPersonPlus}
            title = "Do You Need Help ?"
            initialActions={[
                //@ts-ignore
                {type: ActionType.CHAT,title: "Modify Job With AI",action: "modifyJob",additional: {id}}
            ]}/>
    </section>
    )
}
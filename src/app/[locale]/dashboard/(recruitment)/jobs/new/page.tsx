'use client';

import Role from "@/types/requests/roles";
import { redirect } from "next/navigation";
import Form from "next/form";
import AIButton from "@/components/ai/AIHelperButton";
import AIHelperButton from "@/components/ai/AIHelperButton";
import { useEffect, useState } from "react";
import config from "@/constants/config";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import AISection, { ActionType } from "@/components/ai/section/AISection";
import Job from "@/types/requests/jobs";
import { useRouter } from "next/navigation";

import { BsPersonPlus } from "react-icons/bs";

export default function NewJob() {
    const router = useRouter();

    const [roles,setRoles] = useState([]);

    const [loadingRoles,setLoadingRoles] = useState(true);

    const [title,setTitle] = useState('');
    const [desc,setDesc] = useState('');
    const [responsibilities,setResponsibilities] = useState('');
    const [role,setRole] = useState('');
    const [workspaceModel,setWorkspaceModel] = useState('');
    const [timeModel,setTimeModel] = useState('');

    const [saving,setSaving] = useState(false);

    useEffect(() => {
        if( saving ) {
            fetch(config.apiUrl +'/jobs',{
                credentials: "include",
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description: desc,
                    responsibilities: responsibilities,
                    role,
                    workspaceModel,
                    timeModel
                } as Job)
            }).then(res => res.status == 201 ? Promise.resolve():Promise.reject())
            .then(_ => {
                router.push('/dashboard/jobs/list');
            }).finally(() => setSaving(false))
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
    },[saving]);

    if( loadingRoles ) {
        return <div className = 'p-5 flex justify-center items-center'>
                <ButtonLoader />
         </div>
    }

    return (
        <section className = 'flex gap-5 justify-center items-start flex-wrap max-w-[750px]'>
            <section className = 'bg-white p-5 rounded shadow grow order-[2] md:order-[1]'>
                <h2 className = 'text-2xl'>Create a Job</h2>

                <div className = 'form-group relative'>
                    <label htmlFor = 'title'>
                        Title
                    </label>
                    <input defaultValue = {title} onInput = {(ele) => setTitle(ele.currentTarget.value)} type="text" name="title" id="title" />
                    <AIHelperButton purpose = "jobTitle" message = {{
                        content: "What Do You Need For Job Title Field ?",
                        actions: [],
                        //@ts-ignore
                        additional: {title}
                    }} />
                </div>

                <div className = 'form-group relative'>
                    <label htmlFor = 'desc'>
                        Description
                    </label>
                    <textarea defaultValue = {desc} onInput = {(ele) => setDesc(ele.currentTarget.value)} name = 'desc' id = 'desc'></textarea>
                    <AIHelperButton purpose = "jobDesc" message = {{
                        content: "What Do You Need For Job Description Field ?",
                        actions: [],
                        //@ts-ignore
                        additional: {desc}
                    }} />
                </div>

                <div className = 'form-group relative'>
                    <label htmlFor = 'responsibilites'>
                        Responsibilites
                    </label>
                    <textarea defaultValue = {responsibilities} onInput = {(ele) => setResponsibilities(ele.currentTarget.value)} name = 'responsibilites' id = 'responsibilites'></textarea>
                    <AIHelperButton purpose = "jobResponsibilities" message = {{
                        content: "What Do You Need For Job Responsibilities Field ?",
                        actions: [],
                        //@ts-ignore
                        additional: {responsibilities}
                    }} />
                </div>

                <div className = 'form-group relative'>
                    <label htmlFor = 'role'>
                        Role
                    </label>
                    <select defaultValue = {role} onChange = {(ele) => setRole(ele.target.value)} id = 'role' name = 'role'>
                        <option value="">Choose a Role</option>
                        {roles.map((role:string) => {
                            return (<option key = {role} value = {role}>{role.toLowerCase()}</option>)
                        })}
                    </select>
                    <AIHelperButton purpose = "jobRole" message = {{
                        content: "What Do You Need For Job Role Field ?",
                        actions: [],
                        //@ts-ignore
                        additional: {role}
                    }} />
                </div>

                <div className = 'form-group relative'>
                    <label htmlFor = 'workspace-model'>
                        Workspace Model
                    </label>
                    <select defaultValue = {workspaceModel} onChange = {(ele) => setWorkspaceModel(ele.target.value)} id = 'workspace-model' name = 'workspace-model'>
                        <option value='onsite'>On-Site</option>
                        <option value="remotely">Remotely</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                    <AIHelperButton purpose = "jobWorkspaceModel" message = {{
                        content: "What Do You Need For Job Work Space Model Field ?",
                        actions: [],
                        //@ts-ignore
                        additional: {workspaceModel}
                    }} />
                </div>

                <div className = 'form-group relative'>
                    <label htmlFor = 'time-model'>
                        Time Model
                    </label>
                    <select defaultValue = {timeModel} onChange = {(ele) => setTimeModel(ele.target.value)} id = 'time-model' name = 'time-model'>
                        <option value='fulltime'>Full Time</option>
                        <option value="parttime">Part Time</option>
                    </select>
                    <AIHelperButton purpose = "jobTimeModel" message = {{
                        content: "What Do You Need For Job Time Model Field ?",
                        actions: [],
                        //@ts-ignore
                        additional: {timeModel}
                    }} />
                </div>

                <button onClick = {() => saving == false ? setSaving(true):null} type = 'submit' className = 'button w-full'>
                    {saving ? <ButtonLoader />:<>Create Job</>}
                </button>
            </section>
            <AISection
                title = "Do You Need Help ?"
                Icon = {BsPersonPlus}
                initialActions={[
                    {title: "Create Job With AI",type: ActionType.CHAT,action: "createJob"}
                ]}/>
        </section>
    );
}
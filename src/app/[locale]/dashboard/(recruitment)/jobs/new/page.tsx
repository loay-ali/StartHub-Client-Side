'use client';

import Role from "@/types/requests/roles";
import { redirect } from "next/navigation";
import Form from "next/form";
import AIButton from "@/components/ai/AIHelperButton";
import AIHelperButton from "@/components/ai/AIHelperButton";
import { useEffect, useState } from "react";
import config from "@/constants/config";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import AISection from "@/components/ai/section/AISection";

export default function NewJob() {
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
        return <ButtonLoader />
    }

    return (
        <section className = 'flex gap-10 justify-center items-start'>
            {/*<AISection handleResponse = {(res:string) => {
                const json = JSON.parse(res);

                let str = "<ol>";

                for(let item of Object.values<any>(json)) {
                    str += "<li>"+ item.title +'</li>';
                }

                return str +'</ol>';
            }} title = "Needed Jobs" body = {{}} url = "/recruitment/ai/suggest-jobs"/>*/}
            <section className = 'bg-white p-5 rounded shadow grow max-w-[600px]'>
                <h2 className = 'text-2xl'>Create a Job</h2>

                <div className = 'form-group relative'>
                    <label htmlFor = 'title'>
                        Title
                    </label>
                    <input defaultValue = {title} onInput = {(ele) => setTitle(ele.currentTarget.value)} type="text" name="title" id="title" />
                    <AIHelperButton purpose = "job-title" message = {{
                        content: "How Could I Help You ?",
                        actions: [
                            {title: "Create a Job Title",action: () => {
                                console.log("Create a new Job Title")
                            }},
                            {title: "Modify Job Title"}
                        ]
                    }} />
                </div>

                <div className = 'form-group'>
                    <label htmlFor = 'desc'>
                        Description
                    </label>
                    <textarea defaultValue = {desc} onInput = {(ele) => setDesc(ele.currentTarget.value)} name = 'desc' id = 'desc'></textarea>
                </div>

                <div className = 'form-group relative'>
                    <label htmlFor = 'responsibilites'>
                        Responsibilites
                    </label>
                    <textarea defaultValue = {responsibilities} onInput = {(ele) => setResponsibilities(ele.currentTarget.value)} name = 'responsibilites' id = 'responsibilites'></textarea>
                </div>

                <div className = 'form-group'>
                    <label htmlFor = 'role'>
                        Role
                    </label>
                    <select defaultValue = {role} onChange = {(ele) => setRole(ele.target.value)} id = 'role' name = 'role'>
                        <option value="">Choose a Role</option>
                        {roles.map((role:string) => {
                            return (<option key = {role} value = {role}>{role.toLowerCase()}</option>)
                        })}
                    </select>
                </div>

                <div className = 'form-group'>
                    <label htmlFor = 'workspace-model'>
                        Workspace Model
                    </label>
                    <select defaultValue = {workspaceModel} onChange = {(ele) => setWorkspaceModel(ele.target.value)} id = 'workspace-model' name = 'workspace-model'>
                        <option value='onsite'>On-Site</option>
                        <option value="remotely">Remotely</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </div>

                <div className = 'form-group'>
                    <label htmlFor = 'time-model'>
                        Time Model
                    </label>
                    <select defaultValue = {timeModel} onChange = {(ele) => setTimeModel(ele.target.value)} id = 'time-model' name = 'time-model'>
                        <option value='fulltime'>Full Time</option>
                        <option value="parttime">Part Time</option>
                    </select>
                </div>

                <button onClick = {() => saving == false ? setSaving(true):null} type = 'submit' className = 'button w-full'>
                    {saving ? <ButtonLoader />:<>Create Job</>}
                </button>
            </section>
        </section>
    );
}
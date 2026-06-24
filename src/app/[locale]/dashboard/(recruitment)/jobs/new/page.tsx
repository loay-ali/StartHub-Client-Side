import Role from "@/types/requests/roles";
import { redirect } from "next/navigation";
import Form from "next/form";
import AIButton from "@/components/ai/Button";

export default async function NewJob() {
    const roles:Role[] = [
        {slug: "accountant",name:"Accountant",description: "",departmentId: "123"}
    ];

    return (
        <Form action = {async (formData:FormData) => {
            'use server';

            redirect('/dashboard/jobs/'+ 'aloha')
        }} className = 'bg-white p-5 mx-auto mt-10 rounded shadow max-w-[500px]'>
            <h2 className = 'text-2xl'>Create a Job</h2>

            <div className = 'form-group'>
                <label htmlFor = 'title'>
                    Title
                </label>
                <input type="text" name="title" id="title" />
            </div>

            <div className = 'form-group'>
                <label htmlFor = 'desc'>
                    Description
                </label>
                <textarea name = 'desc' id = 'desc'></textarea>
            </div>

            <div className = 'form-group relative'>
                <label htmlFor = 'responsibilites'>
                    Responsibilites
                </label>
                <textarea name = 'responsibilites' id = 'responsibilites'></textarea>
                <AIButton open = {false}/>
            </div>

            <div className = 'form-group'>
                <label htmlFor = 'role'>
                    Role
                </label>
                <select id = 'role' name = 'role'>
                    {roles.map(role => {
                        return (<option key = {role.slug} value = {role.slug}>{role.name}</option>)
                    })}
                </select>
            </div>

            <div className = 'form-group'>
                <label htmlFor = 'workspace-model'>
                    Workspace Model
                </label>
                <select id = 'workspace-model' name = 'workspace-model'>
                    <option value='onsite'>On-Site</option>
                    <option value="remotely">Remotely</option>
                    <option value="hybrid">Hybrid</option>
                </select>
            </div>

            <div className = 'form-group'>
                <label htmlFor = 'time-model'>
                    Time Model
                </label>
                <select id = 'time-model' name = 'time-model'>
                    <option value='fulltime'>Full Time</option>
                    <option value="parttime">Part Time</option>
                </select>
            </div>

            <button type = 'submit' className = 'button w-full'>
                Create Job 
            </button>
        </Form>
    );
}
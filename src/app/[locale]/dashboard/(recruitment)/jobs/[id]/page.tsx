import { getJob } from '@/src/services/recruitment';
import Job from '@/types/requests/jobs';
import Role from '@/types/requests/roles';
import Form from 'next/form';
import { redirect } from 'next/navigation';

export default async function SingleJob({params}:{params:any}) {

    const id:string|null = await params.id;

    if( ! id ) return redirect('/dashboard/jobs/new');

    const roles:Role[] = [];

    const jobData:Job|null = await getJob(id);

    if( ! jobData ) return redirect('/dashboard/jobs/new');

    const t = new Date(jobData.createdAt ?? Date.now());

    return (
        <Form action = {async (formData:FormData) => {
            'use server';

            console.log(formData);
        }} className = 'bg-white max-w-[500px] mx-auto mt-10 rounded shadow p-5'>

            <h2 className = 'text-2xl'>Job Data</h2>

            <div className = 'form-group'>
                <label htmlFor = 'title'>
                    Title
                </label>
                <input value = {jobData.title} type="text" name="title" id="title" />
            </div>

            <div className = 'form-group'>
                <label htmlFor = 'desc'>
                    Description
                </label>
                <textarea value = {jobData.description} name = 'desc' id = 'desc'></textarea>
            </div>

            <div className = 'form-group'>
                <label htmlFor = 'responsibilites'>
                    Responsibilites
                </label>
                <textarea value = {jobData.responsibilities} name = 'responsibilites' id = 'responsibilites'></textarea>
            </div>

            <div className = 'form-group'>
                <label htmlFor = 'role'>
                    Role
                </label>
                <select defaultValue={jobData.role} id = 'role' name = 'role'>
                    {roles.map(role => {
                        return (<option value = {role.slug}>{role.name}</option>)
                    })}
                </select>
            </div>

            <div className = 'form-group'>
                <label htmlFor = 'workspace-model'>
                    Workspace Model
                </label>
                <select defaultValue={jobData.workspaceModel} id = 'workspace-model' name = 'workspace-model'>
                    <option value='onsite'>On-Site</option>
                    <option value="remotely">Remotely</option>
                    <option value="hybrid">Hybrid</option>
                </select>
            </div>

            <div className = 'form-group'>
                <label htmlFor = 'time-model'>
                    Time Model
                </label>
                <select defaultValue={jobData.timeModel} id = 'time-model' name = 'time-model'>
                    <option value='fulltime'>Full Time</option>
                    <option value="parttime">Part Time</option>
                </select>
            </div>
                
            <div className = 'flex flex-col my-5'>
                <strong>Created At</strong>
                <time dateTime={jobData.createdAt}>
                    {t.getFullYear() +' / '+ (t.getMonth() + 1) +' / '+ t.getDate()}
                </time>
            </div>

            <button type = 'submit' className = 'w-full button'>
                Update Job
            </button>

        </Form>
    )
}
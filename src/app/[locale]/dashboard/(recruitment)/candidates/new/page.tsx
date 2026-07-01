import { getJobs } from "@/src/services/recruitment";
import Form from "next/form";
import Link from "next/link";

import { PiEmptyLight } from "react-icons/pi";

export default async function NewCandidate() {
    const jobs = await getJobs();

    if (jobs.length == 0) {
        return (
            <section className='flex flex-col justify-center items-center gap-5 mt-20'>
                <PiEmptyLight size={80} />
                <strong>No Jobs To Apply Candidates To</strong>

                <Link className='button' href="/dashboard/jobs/new">Create a Job</Link>
            </section>
        );
    }

    return (
        <Form className='bg-white max-w-[500px] my-5 mx-auto p-5 rounded shadow' action={async (formData: FormData) => {
            'use server';

            console.log(formData);
        }} formEncType="multipart/form-data">
            <h2 className='text-2xl'>Create a Candidate</h2>

            <div className='form-group'>
                <label htmlFor='fullname'>
                    Fullname
                </label>
                <input type="text" name="fullname" id="fullname" />
            </div>

            <div className='form-group'>
                <label htmlFor='email'>
                    E-Mail
                </label>
                <input type="email" name="email" id="email" />
            </div>

            <div className='form-group'>
                <label htmlFor='phone'>
                    Phone
                </label>
                <input type="tel" name="phone" id="phone" />
            </div>

            <div className='form-group'>
                <label htmlFor='job'>
                    Applied Job
                </label>
                <select name="job" id="job">
                    {jobs.map(job => (<option value={job.id}>
                        {job.title}
                    </option>))}
                </select>
            </div>

            <div className='form-group'>
                <label htmlFor='cv'>
                    CV
                </label>
                <input type='file' name='cv' id='cv' accept='*.png,*.jpg,*.pdf' />
            </div>

            <button type='submit' className='button w-full'>
                Add Candidate
            </button>
        </Form>
    );
}
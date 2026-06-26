import Candidate from "@/types/requests/candidates";
import Job from "@/types/requests/jobs";
import Link from "next/link";
import { PiEmptyLight } from "react-icons/pi";

export default async function NewInterview() {
    const jobs:Job[] = [];
    const candidates:Candidate[] = [];

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
        
    </section>);
}
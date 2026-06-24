import Candidate from "@/types/requests/candidates";
import Job from "@/types/requests/jobs";

export default async function EditInterview() {
    const jobs:Job[] = [];
    const candidates:Candidate[] = [];

    if( jobs.length == 0 ) {
        return (<>No Jobs</>)
    }

    if( candidates.length == 0 ) {
        return (<>No Candidates</>)
    }

    return (<></>);
}
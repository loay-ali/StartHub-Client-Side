import config from "@/constants/config";
import Job from "@/types/requests/jobs";

export async function getJobs():Promise<Job[]> {
    const res = await fetch(config.apiUrl +'/jobs',{credentials: 'include'});

    if( res.status == 200 ) {
        return await res.json();
    }

    return [];
}

export async function getJob(id:string):Promise<Job|null> {
    const res = await fetch(config.apiUrl +'/jobs/'+ id,{credentials: 'include'});

    if( res.status == 200 ) {
        return await res.json();
    }

    return null;
}
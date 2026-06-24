import config from "@/constants/config";
import Department from "@/types/requests/departments";

export async function getAllDepartments() {
    const res = await fetch(config.apiUrl +'/departments',{
        credentials: 'include'
    });

    if( res.status == 200 ) {
        return await res.json();
    }

    return [];
}

export async function getSingleDepartment(id:string):Promise<Department | false> {
    const res = await fetch(config.apiUrl +'/departments/'+ id,{
        credentials: 'include'
    });

    console.log(res);

    if( res.status == 200 ) {
        return await res.json();
    }

    return false;
}

export async function createDepartment(department:Department) {
    const res = await fetch(config.apiUrl +'/departments',{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(department)
    });

    if( res.status == 201 ) {
        return true;
    }

    return false;
}

export async function deleteDepartment(id:string) {
    const res = await fetch(config.apiUrl +'/department/'+ id,{
        method: "DELETE",
        credentials: 'include'
    });

    if( res.status == 200 ) {
        return true;
    }

    return false;
}
import config from "@/constants/config";

export async function getUsers() {
    const res = await fetch(config.apiUrl +'/users',{credentials: 'include'});

    if( res.status == 200 ) {
        return await res.json();
    }

    return [];
}

export async function deleteUser(id:string) {
    const res = await fetch(config.apiUrl +'/uses/'+ id,{credentials: 'include',method: 'DELETE'});

    if( res.status == 200 ) {
        return true;
    }

    return false;
}
import config from "@/constants/config";
import { Account } from "@/types/requests/financial";

export async function getAccount(id:string) {
    const res = await fetch(config.apiUrl +'/financial/account/'+ id,{credentials: 'include'});

    if( res.status == 200 ) {
        return await res.json();
    }

    return null;
}

export async function newAccount(account:Account) {
    const res = await fetch(config.apiUrl +'/financial/account',{
        credentials: 'include',
        method: 'POST',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(account)});

    if( res.status == 201 ) {
        return true;
    }

    return false;
}
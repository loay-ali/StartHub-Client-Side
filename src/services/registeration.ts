import config from "@/constants/config";
import { RegisterationData } from "@/types/requests/registeration";

export async function init() {
    const response = await fetch(config.apiUrl +'/registration/register',{
        method: 'POST',
        credentials: 'include'
    });

    if( response.status == 201 ) {
        return await response.json();
    }
}

export async function startRegisteration() {
    const res = await fetch(config.apiUrl +'/registration/register',{
        method: 'POST'
    });

    return true;
}

export async function sendCompanyData(data:RegisterationData) {
        
}
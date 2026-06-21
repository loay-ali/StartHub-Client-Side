import config from "@/constants/config";
import { RegisterationData } from "@/types/requests/registeration";

export async function init() {
    const response = await fetch(config.apiUrl +'/registration/register',{
        method: 'POST',
        credentials: 'include'
    });

    console.log(response.status);

    if( response.status == 200 ) {
        const res = await response.json();

        return res;
    }
}

export async function startRegisteration() {
    await fetch(config.apiUrl +'/registration/register',{
        method: 'POST',
        credentials: 'include'
    });

    return true;
}

export async function sendCompanyData(data:RegisterationData) {
        
}
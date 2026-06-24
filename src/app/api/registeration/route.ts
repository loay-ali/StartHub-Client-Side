import config from "@/constants/config";

export async function GET(token:string) {

    const response = await fetch(config.apiUrl +'/registration/register?token='+ token,{
        method: 'POST',
        credentials: 'include'
    });

    if( response.status == 201 ) {
        return response;
    }

    return JSON.stringify({token:''});
}
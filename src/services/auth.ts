import config from '@/constants/config';

export async function authCheck() {
    const res = await fetch(config.apiUrl +'/auth/me',{credentials: 'include'});

    if( res.status == 200 ) {
        return true;
    }

    return false;
}
import config from '@/constants/config';

export async function authCheck() {
    const res = await fetch(config.apiUrl +'/auth/me',{credentials: 'include'});

    if( res.status == 200 ) {
        return true;
    }

    return false;
}

export async function getNotifications() {
    const res = await fetch(config.apiUrl +'/user/notifications');
    
    if( res.status == 200 ) {
        return await res.json();
    }

    return [];
}
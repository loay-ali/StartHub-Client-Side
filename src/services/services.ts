import config from '@/constants/config';
import Service from '@/types/requests/service';

export async function getServices():Promise<Service[]> {
    const res = await fetch(config.apiUrl + '/service/');

    if( res.status != 200 ) {
        return [];
    }

    return (await res.json()).data;
}
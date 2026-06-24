export default class Notification {
    id!:string;
    name!:string;
    description!:string;

    type:'WARNING'|'INFO'|'ERROR'|'DONE'|'CANCELLATION' = 'INFO';

    createdAt?: string;
}
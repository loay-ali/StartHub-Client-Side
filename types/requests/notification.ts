export default class Notification {
    id!:string;
    name!:string;

    /** Backend uses `details`; kept as optional alias for legacy client code */
    description?:string;
    details?:string;

    type:'WARNING'|'INFO'|'ERROR'|'DONE'|'CANCELLATION' = 'INFO';

    seen: boolean = false;

    createdAt?: string;
}
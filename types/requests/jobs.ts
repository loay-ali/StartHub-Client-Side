export default class Job {
    id?:string;

    title!:string;
    description!:string;

    role!:string;

    status?: 'OPEN'|'CLOSED'|'PAUSED'|'ACTIVE';

    workspaceModel!:string

    timeModel!:string;

    createdAt?:string;

    responsibilities?:string;

    expectedSalary?:number;
}
export default class Job {
    id?:string;

    title!:string;
    description!:string;

    role!:string;

    status:string = 'CLOSED';

    workspaceModel!:string

    timeModel!:string;

    createdAt?:string;

    responsibilities?:string;

    expectedSalary?:number;

    status?:'OPEN'|'CLOSED'|'PAUSED';
}
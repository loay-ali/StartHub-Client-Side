export default class Plan {
    id!:string;
    name!:string;
    tokens!:string;
    users!:number;
    storage!:string;
    isRecommended?:boolean = false;

    monthlyPrice!:number;
    yearlyPrice!:number;
}
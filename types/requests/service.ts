export default class Service {
    _id!:string;

    name!:string;

    description!:string;

    priceInUSD!:number;

    estimatedDurationInHours!:number;

    image?:string;

    neededData!: Options[];
}

export class Options {
    slug!:string;

    type:'TEXT'|'RANGE'|'SELECT'|'NUMBER'|'MULTIVALUE'|'CHECKBOX' = 'TEXT';

    values?: string[];

    required?:boolean = false;

    min?:number;
    max?:number;

    title!:string;

    description?:string;
}
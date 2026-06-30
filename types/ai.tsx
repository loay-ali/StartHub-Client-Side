export class AIMessage {
    content!:string;

    actions:AIAction[] = [];
}

export class AIAction {
    title!:string;

    link?:string;
    action?:Function;
}
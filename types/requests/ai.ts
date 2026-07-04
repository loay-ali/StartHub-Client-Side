export interface ChatActions {
    type:'link'|'callback'|'api';

    text: string;

    action:string|Function;
    payload?:Record<string,any>
}

export interface ChatMessage {
    _id:string;

    role:string;
    content: string;

    actions:ChatActions[];

    datetime:string;
}

export interface ChatData {
    conversationId:string;
    messages: ChatMessage[];
}
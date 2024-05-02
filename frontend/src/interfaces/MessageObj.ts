import { UserObj } from "./UserObj";

export interface MessageObj {
    id: number;
    user: UserObj;
    projectid: number;
    content: string;
    timestamp: Date;
}

export interface MessageResponseObj {
    id: number;
    userid: number;
    content: string;
    postedDate: string;
    projectid: number;
}
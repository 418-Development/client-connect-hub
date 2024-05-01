import { UserObj, UserResponseObj } from "./UserObj";

export interface MessageObj {
    id: number;
    user: UserObj;
    content: string;
    timestamp: Date;
}

export interface MessageResponseObj {
    id: number;
    user: UserResponseObj;
    content: string;
    timestamp: string;
}
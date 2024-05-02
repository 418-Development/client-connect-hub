import { UserObj } from "./UserObj";

export interface MessageObj {
    id: number;
    user: UserObj;
    projectId: number;
    content: string;
    timestamp: Date;
}

export interface MessageResponseObj {
    id: number;
    userId: number;
    content: string;
    postedDate: string;
    projectId: number;
}

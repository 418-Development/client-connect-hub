import { ProjectRespondsObj } from "./Project";
import { UserObj, UserResponseObj } from "./UserObj";

export interface MessageObj {
    id: number;
    user: UserObj;
    projectId: number;
    content: string;
    timestamp: Date;
}

export interface MessageResponseObj {
    id: number;
    author: UserResponseObj;
    content: string;
    postedDate: string;
    project: ProjectRespondsObj;
}

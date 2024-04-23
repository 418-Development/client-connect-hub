import { MilestoneObj } from "./Milestone";
import { UserObj, UserResponseObj } from "./UserObj";

export interface ProjectObj {
    id: number;
    title: string;
    estimatedEnd: string;
    startDate: string;
    description: string;
    milestones: MilestoneObj[];
    users: UserObj[];
}

export interface ProjectRespondsObj {
    createdDate: string;
    creatorId: number;
    description: string;
    estimateDate: string;
    milestones: [];
    users: UserResponseObj[];
    projectId: number;
    projectName: string;
    startDate: string;
}

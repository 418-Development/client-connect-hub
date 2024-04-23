import { MilestoneObj } from "./Milestone";

export interface ProjectObj {
    id: number;
    title: string;
    estimatedEnd: string;
    startDate: string;
    description: string;
    milestones: MilestoneObj[];
}

export interface ProjectRespondsObj {
    createdDate: string;
    creatorId: number;
    description: string;
    estimateDate: string;
    milestones: [];
    projectId: number;
    projectName: string;
    startDate: string;
}

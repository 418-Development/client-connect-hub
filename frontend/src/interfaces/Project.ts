import { MilestoneObj } from "./Milestone";

export interface ProjectObj {
    id: string;
    title: string;
    estimatedEnd: string;
    startDate: string;
    description: string;
    milestones: MilestoneObj[];
}

export interface MilestoneObj {
    id: string;
    title: string;
    estimatedEnd: string;
    isDone: boolean;
}

export interface MilestoneResponseObj {
    milestoneId: number;
    milestoneName: string;
    description: string;
    creatorId: number;
    createdDate: string;
    estimateDate: string;
    projectId: number;
}

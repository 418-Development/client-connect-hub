export interface MilestoneObj {
    id: number;
    title: string;
    description: string;
    estimatedEnd: string;
    isDone: boolean;
}

export interface MilestoneResponseObj {
    createdDate: string;
    description: string;
    milestoneId: number;
    milestoneName: string;
    creatorId: number;
    estimateDate: string;
}

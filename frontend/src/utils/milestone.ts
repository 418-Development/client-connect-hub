import { MilestoneObj, MilestoneResponseObj } from "../interfaces/Milestone";

export function parseMilestoneResponseObjArray(milestones: MilestoneResponseObj[]): MilestoneObj[] {
    return milestones?.map((milestone) => {
        return parseMilestoneResponseObj(milestone);
    });
}

export function parseMilestoneResponseObj(milestone: MilestoneResponseObj): MilestoneObj {
    return {
        id: milestone.milestoneId,
        title: milestone.milestoneName,
        estimatedEnd: milestone.estimateDate?.split("T")[0] ?? "",
        description: milestone.description ?? "N/A",
        isDone: milestone.isDone ?? false,
        createdDate: milestone.createdDate?.split("T")[0] ?? "",
    };
}

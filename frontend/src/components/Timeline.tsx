import { MilestoneObj } from "../interfaces/Milestone";
import Button from "./Button";

interface Props {
    milestones: MilestoneObj[];
    onlyShowOverview?: boolean;
}

function Timeline({ milestones, onlyShowOverview = false }: Props) {
    let displayedMilestones: MilestoneObj[] = [];
    let isActiveIndex = -1;
    let indicateMoreAtBeginning = false;
    let indicateMoreAtEnd = false;

    for (let index = 0; index < milestones.length; index++) {
        if (!milestones[index].isDone) {
            isActiveIndex = index;
            break;
        }
    }
    if (onlyShowOverview && milestones.length > 0) {
        if (isActiveIndex == -1 || isActiveIndex >= milestones.length - 1) {
            if (milestones.length - 3 >= 0) displayedMilestones.push(milestones[milestones.length - 3]);
            if (milestones.length - 2 >= 0) displayedMilestones.push(milestones[milestones.length - 2]);
            if (milestones.length - 1 >= 0) displayedMilestones.push(milestones[milestones.length - 1]);
            indicateMoreAtBeginning = milestones.length - 3 > 0;
            if (isActiveIndex >= milestones.length - 1) isActiveIndex = displayedMilestones.length - 1;
        } else if (isActiveIndex == 0) {
            displayedMilestones.push(milestones[0]);
            if (milestones.length >= 2) displayedMilestones.push(milestones[1]);
            if (milestones.length >= 3) displayedMilestones.push(milestones[2]);
            indicateMoreAtEnd = milestones.length > 3;
        } else {
            displayedMilestones.push(milestones[isActiveIndex - 1]);
            displayedMilestones.push(milestones[isActiveIndex]);
            displayedMilestones.push(milestones[isActiveIndex + 1]);
            indicateMoreAtBeginning = isActiveIndex > 1;
            indicateMoreAtEnd = isActiveIndex + 2 < milestones.length;
            isActiveIndex = 1;
        }
    } else {
        displayedMilestones = milestones;
    }

    return (
        <ul className="timeline">
            {displayedMilestones.map((milestone, index) => (
                <li
                    key={milestone.id}
                    className={
                        "pt-2 pb-2" +
                        (milestone.isDone ? " is-done" : "") +
                        (index == isActiveIndex ? " is-active" : "") +
                        (indicateMoreAtBeginning && index == 0 ? " indicate-more" : "") +
                        (indicateMoreAtEnd && index == displayedMilestones.length - 1 ? " indicate-more" : "")
                    }
                >
                    <Button outline={true} className="ms-3">
                        {milestone.title}
                    </Button>
                    {index == isActiveIndex - 1 ? (
                        <Button outline={true} style="danger" className="ms-2">
                            X
                        </Button>
                    ) : (
                        <></>
                    )}
                    {index == isActiveIndex ? (
                        <Button outline={true} style="success" className="ms-2">
                            ✓
                        </Button>
                    ) : (
                        <></>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default Timeline;

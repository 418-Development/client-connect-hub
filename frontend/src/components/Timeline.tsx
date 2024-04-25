import { useContext } from "react";
import { UserContext } from "../UserContext";
import { MilestoneObj } from "../interfaces/Milestone";
import Button from "./Button";
import { UserRole } from "../interfaces/UserObj";

interface Props {
    milestones: MilestoneObj[];
    onlyShowOverview?: boolean;
    style?: React.CSSProperties;
    deleteMilestone?: (milestone: MilestoneObj) => void;
    editMilestone?: (milestone: MilestoneObj) => void;
    showMilestone: (milestone: MilestoneObj) => void;
    onMilestoneEvent?: () => void;
}

function Timeline({
    milestones,
    onlyShowOverview = false,
    style = {},
    deleteMilestone = undefined,
    editMilestone = undefined,
    showMilestone,
    onMilestoneEvent,
}: Props) {
    const userInfo = useContext(UserContext);
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
            if (isActiveIndex === -1) isActiveIndex = displayedMilestones.length;
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
        if (isActiveIndex > displayedMilestones.length || isActiveIndex < 0) isActiveIndex = displayedMilestones.length;
    }

    const setMilestoneStatus = async (milestone: MilestoneObj, isDone: boolean) => {
        if (!userInfo) return;

        const url = (import.meta.env.VITE_API_URL as string) + `milestones/milestone-status/${milestone.id}`;

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") ?? "",
            },
            body: JSON.stringify(isDone),
        });

        if (response.ok) {
            if (onMilestoneEvent) onMilestoneEvent();
        }
    };

    return (
        <ul className="timeline" style={style}>
            {displayedMilestones.length === 0 ? <div className="text-center pt-5">No Milestones</div> : <></>}
            {displayedMilestones.map((milestone, index) => (
                <li
                    key={milestone.id}
                    className={
                        "pt-2 pb-2 d-flex " +
                        (milestone.isDone ? " is-done" : "") +
                        (index == isActiveIndex ? " is-active" : "") +
                        (indicateMoreAtBeginning && index == 0 ? " indicate-more" : "") +
                        (indicateMoreAtEnd && index == displayedMilestones.length - 1 ? " indicate-more" : "")
                    }
                >
                    <Button
                        outline
                        className="ms-3 text-truncate"
                        modalTarget="#milestoneModal"
                        onClick={() => {
                            showMilestone(milestone);
                        }}
                    >
                        {milestone.title}
                    </Button>
                    <div className="fill-flex flex-fill"></div>
                    {deleteMilestone && (
                        <Button
                            outline
                            kind="danger"
                            className="ms-2 iconButton"
                            onClick={() => {
                                deleteMilestone(milestone);
                            }}
                            modalTarget="#deleteMilestoneModal"
                        >
                            <i className="bi bi-trash" style={{ fontSize: "1.2rem" }}></i>
                        </Button>
                    )}
                    {editMilestone && (
                        <Button
                            outline
                            kind="success"
                            className="ms-2 iconButton"
                            onClick={() => {
                                editMilestone(milestone);
                            }}
                        >
                            <i className="bi bi-pencil" style={{ fontSize: "1.2rem" }}></i>
                        </Button>
                    )}

                    {!editMilestone && !deleteMilestone && index === isActiveIndex - 1 && userInfo?.role === UserRole.MANAGER && (
                        <Button
                            outline
                            kind="danger"
                            className="ms-2 iconButton"
                            onClick={() => {
                                setMilestoneStatus(milestone, false);
                            }}
                        >
                            <i className="bi bi-skip-start-circle" style={{ fontSize: "1.2rem" }}></i>
                        </Button>
                    )}
                    {!editMilestone && !deleteMilestone && index === isActiveIndex && userInfo?.role === UserRole.MANAGER && (
                        <Button
                            outline
                            kind="success"
                            className="ms-2 iconButton"
                            onClick={() => {
                                setMilestoneStatus(milestone, true);
                            }}
                        >
                            <i className="bi bi-check2-circle" style={{ fontSize: "1.2rem" }}></i>
                        </Button>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default Timeline;

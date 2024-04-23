import { useNavigate } from "react-router-dom";
import { ProjectObj, ProjectRespondsObj } from "../interfaces/Project";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import Button from "./Button";

interface Props {
    project: ProjectObj;
}

function EditMilestones({ project }: Props) {
    const userInfo = useContext(UserContext);
    const navigate = useNavigate();

    const createMilestone = async () => {
        if (!userInfo) return;

        const currentDate = new Date();
        const url = (import.meta.env.VITE_API_URL as string) + `milestones/${project.id}/create-milestone`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") ?? "",
            },
            body: JSON.stringify({
                milestoneName: "Milestone Name",
                description: "Milestone Description",
                estimateDate: currentDate.toISOString(),
                createdDate: currentDate.toISOString(),
                creatorId: userInfo.id,
            }),
        });

        if (response.ok) {
            const json = await response.json();

            navigate(`/edit-project/${project.id}`);
        }
    };

    return (
        <form className="mt-3">
            <h2>Milestones</h2>
            <Button
                onClick={() => {
                    createMilestone();
                }}
            >
                Add
            </Button>
        </form>
    );
}

export default EditMilestones;

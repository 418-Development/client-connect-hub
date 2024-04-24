import { ProjectObj } from "../interfaces/Project";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useState } from "react";
import Button from "./Button";
import Timeline from "./Timeline";
import MarkdownEditor from "./MarkdownEditor";
import DeleteMilestoneModal from "./DeleteMilestoneModal";
import { MilestoneObj } from "../interfaces/Milestone";
import MilestoneModal from "./MilestoneModal";

interface Props {
    project: ProjectObj;
    onMilestoneEvent: () => void;
}

function EditMilestones({ project, onMilestoneEvent }: Props) {
    const userInfo = useContext(UserContext);

    const [description, setDescription] = useState<string>("");
    const [milestoneName, setMilestoneName] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [selectedMilestone, setSelectedMilestone] = useState<MilestoneObj | null>(null);
    const [inEditMode, setInEditMode] = useState<boolean>(false);

    const updateMilestone = async () => {
        if (!userInfo || !selectedMilestone) return;

        const currentDate = new Date();
        const url = (import.meta.env.VITE_API_URL as string) + `milestones/update-milestone/${selectedMilestone.id}`;

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") ?? "",
            },
            body: JSON.stringify({
                milestoneName: milestoneName,
                description: description,
                estimateDate: endDate,
                createdDate: currentDate.toISOString(),
                creatorId: userInfo.id,
                isDone: selectedMilestone.isDone,
            }),
        });

        if (response.ok) {
            setDescription("");
            setMilestoneName("");
            setEndDate("");
            onMilestoneEvent();
        }
    };

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
                milestoneName: milestoneName,
                description: description,
                estimateDate: endDate,
                createdDate: currentDate.toISOString(),
                creatorId: userInfo.id,
                isDone: false,
            }),
        });

        if (response.ok) {
            setDescription("");
            setMilestoneName("");
            setEndDate("");
            onMilestoneEvent();
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between">
                <div className="d-flex flex-column">
                    <Timeline
                        milestones={project?.milestones ?? []}
                        style={{ marginLeft: "10px" }}
                        deleteMilestone={(milestone) => {
                            setSelectedMilestone(milestone);
                        }}
                        editMilestone={(milestone) => {
                            setSelectedMilestone(milestone);

                            setInEditMode(true);
                            setDescription(milestone.description);
                            setMilestoneName(milestone.title);
                            setEndDate(milestone.estimatedEnd);
                        }}
                        showMilestone={(milestone) => {
                            setSelectedMilestone(milestone);
                        }}
                    />
                </div>
                <div className="flex-fill ms-5">
                    <form
                        className=""
                        onSubmit={(e) => {
                            e.preventDefault();

                            if (inEditMode) {
                                updateMilestone();
                            } else {
                                createMilestone();
                            }
                        }}
                    >
                        <h3>{inEditMode ? "Edit" : "Create new"} Milestone</h3>
                        <div className="row g-3 mt-1">
                            <div className="col mt-2">
                                <label htmlFor="milestoneName">Name</label>
                                <input
                                    type="string"
                                    className="form-control mt-2"
                                    id="milestoneName"
                                    placeholder=""
                                    onChange={(e) => {
                                        setMilestoneName(e.target.value);
                                    }}
                                    value={milestoneName}
                                    required
                                />
                                <div className="invalid-feedback"></div>
                            </div>
                            <div className="col mt-2">
                                <label htmlFor="endDateMilestone">Estimated End Date</label>
                                <input
                                    type="date"
                                    className="form-control mt-2"
                                    id="endDateMilestone"
                                    placeholder=""
                                    onChange={(e) => {
                                        setEndDate(e.target.value);
                                    }}
                                    value={endDate}
                                    required
                                />
                                <div className="invalid-feedback"></div>
                            </div>
                        </div>

                        <div className="mt-3">
                            <MarkdownEditor
                                value={description}
                                onValueChanged={(value) => {
                                    setDescription(value);
                                }}
                                label="Description"
                                maxLength={1500}
                            />
                        </div>

                        <div className="d-flex justify-content-end">
                            <Button
                                kind="link"
                                className="mt-3"
                                onClick={() => {
                                    setInEditMode(false);
                                    setDescription("");
                                    setEndDate("");
                                    setMilestoneName("");
                                    setSelectedMilestone(null);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" kind="success" className="mt-3">
                                {inEditMode ? "Edit Milestone" : "Add Milestone"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <MilestoneModal milestone={selectedMilestone} />
            <DeleteMilestoneModal
                milestone={selectedMilestone}
                onDeletion={() => {
                    onMilestoneEvent();
                }}
            />
        </>
    );
}
export default EditMilestones;

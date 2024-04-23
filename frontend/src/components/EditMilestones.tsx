import { useNavigate } from "react-router-dom";
import { ProjectObj } from "../interfaces/Project";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useRef, useState } from "react";
import Button from "./Button";
import Markdown from "./Markdown";

interface Props {
    project: ProjectObj;
}

function EditMilestones({ project }: Props) {
    const userInfo = useContext(UserContext);
    const navigate = useNavigate();

    const [showPreview, setShowPreview] = useState<boolean>(false);
    const descriptionTextArea = useRef<HTMLTextAreaElement>(null);
    const [description, setDescription] = useState<string>("");
    const [milestoneName, setMilestoneName] = useState<string>("");

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

    const updateTextArea = () => {
        if (descriptionTextArea.current) {
            descriptionTextArea.current.style.height = "auto";
            descriptionTextArea.current.style.height = `${descriptionTextArea.current.scrollHeight + 2}px`;
        }
    };

    const preview = useRef<HTMLDivElement>(null);
    const [endDate, setEndDate] = useState<string>("");

    return (
        <form
            className="mt-3"
            onClick={(e) => {
                e.preventDefault();
                createMilestone();
            }}
        >
            <h2>Milestones</h2>
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
                    <label htmlFor="endDate">Estimated End Date</label>
                    <input
                        type="date"
                        className="form-control mt-2"
                        id="endDate"
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
                <div>
                    <div className="d-flex align-items-center">
                        <label htmlFor="milestoneDescription">Description</label>
                        <div className="ms-5 m-2">
                            <Button
                                type="button"
                                kind={showPreview ? "secondary" : "primary"}
                                style={{ borderRadius: 0 }}
                                onClick={() => {
                                    setShowPreview(false);
                                }}
                                outline={showPreview}
                            >
                                Write
                            </Button>
                            <Button
                                type="button"
                                kind={showPreview ? "primary" : "secondary"}
                                style={{ borderRadius: 0 }}
                                onClick={() => {
                                    setShowPreview(true);
                                }}
                                outline={!showPreview}
                            >
                                Preview
                            </Button>
                        </div>
                    </div>
                    <textarea
                        ref={descriptionTextArea}
                        autoComplete="description"
                        className="form-control"
                        id="projectDescription"
                        placeholder="Enter description"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        value={description}
                        onInput={updateTextArea}
                        hidden={showPreview}
                        maxLength={15000}
                        required
                    />
                    <div className="invalid-feedback"></div>
                    <div ref={preview} hidden={!showPreview} className="card p-1 markdown">
                        <Markdown>{description}</Markdown>
                    </div>
                </div>
            </div>

            <Button>Add</Button>
        </form>
    );
}
export default EditMilestones;

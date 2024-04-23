import { useNavigate } from "react-router-dom";
import { ProjectObj } from "../interfaces/Project";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useRef, useState } from "react";
import Button from "./Button";
import Markdown from "./Markdown";

interface Props {
    project: ProjectObj;
    onMilestoneEvent: () => void;
}

function EditMilestones({ project, onMilestoneEvent }: Props) {
    const userInfo = useContext(UserContext);
    const navigate = useNavigate();

    const [description, setDescription] = useState<string>("");
    const [milestoneName, setMilestoneName] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const [showPreview, setShowPreview] = useState<boolean>(false);
    const preview = useRef<HTMLDivElement>(null);
    const descriptionTextArea = useRef<HTMLTextAreaElement>(null);

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
            }),
        });

        if (response.ok) {
            const json = await response.json();

            setDescription("");
            setMilestoneName("");
            setEndDate("");
            onMilestoneEvent();
        }
    };

    const updateTextArea = () => {
        if (descriptionTextArea.current) {
            descriptionTextArea.current.style.height = "auto";
            descriptionTextArea.current.style.height = `${descriptionTextArea.current.scrollHeight + 2}px`;
        }
    };

    return (
        <form
            className=""
            onSubmit={(e) => {
                e.preventDefault();

                createMilestone();
            }}
        >
            <h3>Create new Milestone</h3>
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

            <div className="d-flex justify-content-end">
                <Button kind="link" className="mt-3">
                    Cancel
                </Button>
                <Button type="submit" kind="success" className="mt-3">
                    Save Changes
                </Button>
            </div>
        </form>
    );
}
export default EditMilestones;

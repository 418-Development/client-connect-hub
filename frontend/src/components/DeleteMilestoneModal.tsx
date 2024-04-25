import { useRef, useState } from "react";
import Button from "./Button";
import { MilestoneObj } from "../interfaces/Milestone";

interface Props {
    milestone: MilestoneObj | null;
    onDeletion: () => void;
}

function DeleteMilestoneModal({ milestone, onDeletion }: Props) {
    const [verifyDelete, setVerifyDelete] = useState<string>("");

    const closeButton = useRef<HTMLButtonElement>(null);
    const deleteValidation = useRef<HTMLInputElement>(null);

    const deleteMilestone = async () => {
        if (milestone == null || verifyDelete !== milestone.title) {
            deleteValidation.current?.classList.add("is-invalid");
            console.log("NOT VALID");
            return;
        }

        const url = (import.meta.env.VITE_API_URL as string) + `milestones/delete-milestone/${milestone.id}`;

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") ?? "",
            },
            body: JSON.stringify(milestone.id),
        });

        console.log(url, response.ok, response.status);
        onDeletion();
        closeButton.current?.click();
        setVerifyDelete("");
    };

    return (
        <div id="deleteMilestoneModal" className="modal fade">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Delete {milestone?.title}</h5>
                        <Button ref={closeButton} kind="close" dismissModal={true} ariaLabel="Close"></Button>
                    </div>

                    <form
                        action=""
                        onSubmit={(e) => {
                            e.preventDefault();

                            deleteMilestone();
                        }}
                    >
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="verifyDeleteInput">
                                    To confirm the deletion of the milestone please enter the the milestone title:
                                    <strong> "{milestone?.title}"</strong>
                                </label>
                                <input
                                    ref={deleteValidation}
                                    type="text"
                                    onChange={(e) => {
                                        setVerifyDelete(e.target.value);
                                        deleteValidation.current?.classList.remove("is-invalid");
                                    }}
                                    className="form-control mt-2"
                                    id="verifyDeleteInput"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter the project title..."
                                    value={verifyDelete}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Enter <strong>"{milestone?.title}"</strong> to confirm the deletion of the milestone!
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Button kind="secondary" dismissModal={true}>
                                Close
                            </Button>
                            <Button type="submit" kind="danger">
                                Delete
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DeleteMilestoneModal;

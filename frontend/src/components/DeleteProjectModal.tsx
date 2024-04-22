import { useRef, useState } from "react";
import Button from "./Button";
import { ProjectObj } from "../interfaces/Project";

interface Props {
    project: ProjectObj;
    onDeletion: () => void;
}

function DeleteProjectModal({ project, onDeletion }: Props) {
    const [verifyDelete, setVerifyDelete] = useState<string>("");

    const closeButton = useRef<HTMLButtonElement>(null);
    const deleteValidation = useRef<HTMLInputElement>(null);

    const deleteProject = async () => {
        if (verifyDelete !== project.title) {
            deleteValidation.current?.classList.add("is-invalid");
            console.log("NOT VALID");
            return;
        }

        const url = (import.meta.env.VITE_API_URL as string) + `projects/delete-project/${project.id}`;

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: document.cookie.substring(6),
            },
        });

        console.log(url, response.ok, response.status);
        onDeletion();
        closeButton.current?.click();
        setVerifyDelete("");
    };

    return (
        <div id="deleteProjectModal" className="modal fade">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Delete {project?.title}</h5>
                        <Button ref={closeButton} style="close" dismissModal={true} ariaLabel="Close"></Button>
                    </div>

                    <form
                        action=""
                        onSubmit={(e) => {
                            e.preventDefault();

                            deleteProject();
                        }}
                    >
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="verifyDeleteInput">
                                    To confirm the deletion of the project please enter the the project title:
                                    <strong> "{project?.title}"</strong>
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
                                    Enter <strong>"{project?.title}"</strong> to confirm the deletion of the project!
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Button style="secondary" dismissModal={true}>
                                Close
                            </Button>
                            <Button type="submit" style="danger">
                                Delete
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DeleteProjectModal;

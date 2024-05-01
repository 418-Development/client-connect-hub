import { useContext, useRef, useState } from "react";
import Button from "./Button";
import { UserObj, UserRole } from "../interfaces/UserObj";
import { UserContext } from "../UserContext";

interface Props {
    user?: UserObj;
    role?: UserRole;
    onConfirm: () => void;
}

function ChangeUserRoleModal({ user, role, onConfirm }: Props) {
    const [verifyDelete, setVerifyDelete] = useState<string>("");
    const userInfo = useContext(UserContext);

    const closeButton = useRef<HTMLButtonElement>(null);
    const deleteValidation = useRef<HTMLInputElement>(null);

    const confirm = async () => {
        if (verifyDelete !== user?.username) {
            deleteValidation.current?.classList.add("is-invalid");
            return;
        }

        onConfirm();
        closeButton.current?.click();
        setVerifyDelete("");
    };

    return (
        <div id="changeUserRoleModal" className="modal fade">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Change {user?.username}'s Role</h5>
                        <Button ref={closeButton} kind="close" dismissModal={true} ariaLabel="Close"></Button>
                    </div>

                    <form
                        action=""
                        onSubmit={(e) => {
                            e.preventDefault();

                            confirm();
                        }}
                    >
                        <div className="modal-body">
                            <div className="form-group">
                                {role === UserRole.MANAGER ? (
                                    <>
                                        <p>You are about to change {user?.username}'s role to "Project Manager".</p>
                                        <p>
                                            Please be aware that by assuming this role they'll gain full access to project management
                                            features. This includes creating, editing, and deleting projects and milestones, as well as
                                            managing users.
                                        </p>
                                    </>
                                ) : userInfo?.id === user?.id ? (
                                    <>
                                        <p>
                                            You are about to remove <b>your own</b> "Project Manager" role.
                                        </p>
                                        <p>
                                            Please be aware that by removing this role you'll <b>no</b> longer have access to project
                                            management features. This includes creating, editing, and deleting projects and milestones, as
                                            well as managing users.
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p>You are about to remove {user?.username}'s "Project Manager" role.</p>
                                        <p>
                                            Please be aware that by removing this role they'll <b>no</b> longer have access to project
                                            management features. This includes creating, editing, and deleting projects and milestones, as
                                            well as managing users.
                                        </p>
                                    </>
                                )}
                                <label htmlFor="verifyDeleteInput">
                                    To confirm the change of {user?.username}'s role please enter their name:
                                    <strong> "{user?.username}"</strong>
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
                                    placeholder="Enter the name..."
                                    value={verifyDelete}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Enter <strong>"{user?.username}"</strong> to confirm the change!
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Button kind="secondary" dismissModal={true}>
                                Close
                            </Button>
                            <Button type="submit" kind="danger">
                                Confirm Change
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangeUserRoleModal;

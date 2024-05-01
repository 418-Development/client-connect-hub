import { useEffect, useState } from "react";
import { UserObj, UserRole } from "../interfaces/UserObj";
import Button from "./Button";
import { useParams } from "react-router";
import { ProjectObj } from "../interfaces/Project";
import { fetchAllUsers } from "../utils/user";

interface Props {
    project: ProjectObj;
    onUserEvent: () => void;
}

function UserAssignment({ project, onUserEvent }: Props) {
    const [allUsers, setAllUsers] = useState<UserObj[]>([]);
    const [roleSearch, setRoleSearch] = useState<UserRole>(UserRole.MANAGER);
    // Project ID for updates
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        reloadAllUsers();
    }, [project]);

    const reloadAllUsers = async () => {
        try {
            const allUser = await fetchAllUsers();
            setAllUsers(allUser.filter((user) => !project.users.some((projectUser) => projectUser.id === user.id)));
        } catch (error) {
            /* eslint-disable no-console */
            console.error(error);
            /* eslint-enable no-console */
            setAllUsers([]);
        }
    };

    const removeUserFromProject = async (user: UserObj) => {
        // Can't remove manager from project
        if (user.role === UserRole.MANAGER) return;

        const url = `${import.meta.env.VITE_API_URL as string}projects/${id}/removeUser/${user.id}`;

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") ?? "",
            },
        });

        if (response.ok) {
            onUserEvent();
        }
    };

    const addUserToProject = async (user: UserObj) => {
        const url = `${import.meta.env.VITE_API_URL as string}projects/${id}/addUser/${user.id}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") ?? "",
            },
        });

        if (response.ok) {
            onUserEvent();
        }
    };

    return (
        <div>
            <div className="dropdown-wrapper mt-0 mb-3 d-flex align-items-center">
                <div className="btn-group dropend">
                    <Button
                        className="btn white-btn-text dropdown-toggle"
                        type="button"
                        id="roleSelect"
                        dataBsToggle="dropdown"
                        outline
                        kind="secondary"
                        ariaExpanded={false}
                    >
                        Filter by Role
                    </Button>
                    <ul className="dropdown-menu" aria-labelledby="roleSelect">
                        <li>
                            <Button className="dropdown-item" type="button" onClick={() => setRoleSearch(UserRole.MANAGER)}>
                                Show All
                            </Button>
                        </li>
                        <li>
                            <Button className="dropdown-item" type="button" onClick={() => setRoleSearch(UserRole.TEAM)}>
                                Team Member
                            </Button>
                        </li>
                        <li>
                            <Button className="dropdown-item" type="button" onClick={() => setRoleSearch(UserRole.CLIENT)}>
                                Client
                            </Button>
                        </li>
                    </ul>
                </div>
                <label htmlFor="roleSelect" className="form-label ms-3 mb-0">
                    {roleSearch == UserRole.MANAGER
                        ? "All"
                        : roleSearch == UserRole.CLIENT
                            ? "Client"
                            : roleSearch == UserRole.TEAM
                                ? "Team Member"
                                : ""}
                </label>
            </div>
            <div className="card">
                <div className="card-body">
                    {/* Current Participants */}
                    <div className="mb-4">
                        <h5 className="card-title">Current Participants</h5>
                        <div>
                            {project.users
                                .filter((user) => {
                                    if (roleSearch === UserRole.MANAGER) return true;
                                    return roleSearch === user.role || UserRole.MANAGER === user.role;
                                })
                                .map((user: UserObj) => (
                                    <div key={user.username} className="d-flex align-items-center">
                                        <div className="d-flex align-items-center" style={{ flex: 6 }}>
                                            <div className="col p-2">{user.username}</div>
                                            <div className="col p-2">{UserRole[user.role]}</div>
                                            <div className="col p-2">{user.label}</div>
                                        </div>
                                        <div className="d-flex justify-content-end" style={{ flex: 1 }}>
                                            {user.role !== UserRole.MANAGER && (
                                                <Button
                                                    outline
                                                    kind="danger"
                                                    className="ms-2 iconButton"
                                                    onClick={() => removeUserFromProject(user)}
                                                    data-bs-toggle="tooltip" 
                                                    title="Remove User from the Project."
                                                >
                                                    <i className="bi bi-caret-down" style={{ fontSize: "1.2rem" }}></i>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <hr className="my-0" /> {/* Divider between sections */}
                    {/* Addable Participants */}
                    <div className="mt-4">
                        <h5 className="card-title">Addable Participants</h5>
                        <div>
                            {allUsers
                                .filter((user) => {
                                    if (roleSearch === UserRole.MANAGER) return true;
                                    return roleSearch === user.role || UserRole.MANAGER === user.role;
                                })
                                .map((user: UserObj) => (
                                    <div key={user.username} className="d-flex align-items-center">
                                        <div className="d-flex align-items-center" style={{ flex: 6 }}>
                                            <div className="col p-2">{user.username}</div>
                                            <div className="col p-2">{UserRole[user.role]}</div>
                                            <div className="col p-2">{user.label}</div>
                                        </div>
                                        <div className="d-flex justify-content-end" style={{ flex: 1 }}>
                                            <Button 
                                                outline 
                                                kind="success" 
                                                className="ms-2 iconButton" 
                                                onClick={() => addUserToProject(user)}
                                                data-bs-toggle="tooltip" 
                                                title="Add User to the Project."
                                            >
                                                <i className="bi bi-caret-up" style={{ fontSize: "1.2rem" }}></i>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserAssignment;

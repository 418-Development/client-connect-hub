import { useEffect, useState } from "react";
import { UserObj, UserResponseObj, UserRole } from "../interfaces/UserObj";
import Button from "./Button";
import { useParams } from "react-router";

function UserAssignment() {
    const [allUsers, setAllUsers] = useState<UserObj[]>([]);
    const [projectUsers, setProjectUsers] = useState<UserObj[]>([]);
    const [roleSearch, setRoleSearch] = useState<UserRole>(UserRole.TEAM);
    // Project ID for updates
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        fetchProjectUser();
    }, []);

    useEffect(() => {
        fetchAllUsers();
    }, [projectUsers]);

    const fetchProjectUser = async () => {
        const url = (import.meta.env.VITE_API_URL as string) + "users/all";

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: document.cookie.substring(6),
            },
        });

        console.log(url, response.ok, response.status);

        if (response.ok) {
            const json = await response.json();
            const userResponseArray = json as UserResponseObj[];
            const userArray: UserObj[] = [];
            for (let index = 0; index < userResponseArray.length; index++) {
                const user = userResponseArray[index];
                userArray.push({
                    id: user.id,
                    username: user.username,
                    role: user.roles[0].id as UserRole,
                    label: "M.I.A.",
                    email: user.email,
                });
            }

            setProjectUsers(userArray);
        }
    };

    const fetchAllUsers = async () => {
        const url = (import.meta.env.VITE_API_URL as string) + "users/all";

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: document.cookie.substring(6),
            },
        });

        console.log(url, response.ok, response.status);

        if (response.ok) {
            const json = await response.json();
            const userResponseArray = json as UserResponseObj[];
            const userArray: UserObj[] = [];
            for (let index = 0; index < userResponseArray.length; index++) {
                const user = userResponseArray[index];
                if (!projectUsers.some((projectUser) => projectUser.id === user.id)) {
                    userArray.push({
                        id: user.id,
                        username: user.username,
                        role: user.roles[0].id as UserRole,
                        label: "M.I.A.",
                        email: user.email,
                    });
                }
            }

            setAllUsers(userArray);
        }
    };

    const removeUserFromProject = (user: UserObj) => {
        // Can't remove manager from project
        if (user.role === UserRole.MANAGER) return;

        const tempAllUsers = allUsers;
        tempAllUsers.push(user);
        setAllUsers(tempAllUsers);

        let tempProjectUsers = projectUsers;
        tempProjectUsers = tempProjectUsers.filter((projectUser) => {
            return user.id != projectUser.id;
        });
        setProjectUsers(tempProjectUsers);
    };

    const addUserToProject = (projectUser: UserObj) => {
        let tempAllUsers = allUsers;
        tempAllUsers = tempAllUsers.filter((user) => {
            return user.id != projectUser.id;
        });
        setAllUsers(tempAllUsers);

        const tempProjectUsers = projectUsers;
        tempProjectUsers.push(projectUser);
        setProjectUsers(tempProjectUsers);
    };

    const saveChanges = async () => {
        const url = (import.meta.env.VITE_API_URL as string) + "projects/" + id + "/update-clients";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: document.cookie.substring(6),
            },
            body: JSON.stringify({
                projectId: id,
                userIds: projectUsers.map((user) => user.id),
            }),
        });

        if (response.ok) {
            console.log("It worked");
        } else {
            console.log("It no work");
        }
    };

    const handleRoleSearch = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Number(e.target.value);
        const roleSelect = value as UserRole;
        setRoleSearch(roleSelect);
    };

    return (
        <div>
            <div className="col p-2">
                <select className="form-control" value={roleSearch} onChange={(e) => handleRoleSearch(e)}>
                    <option value={UserRole.TEAM}>Team Member</option>
                    <option value={UserRole.CLIENT}>Client</option>
                </select>
            </div>
            {/* Div for already added users */}
            <div>
                <p>Current Participants</p>
                {projectUsers
                    .filter((user) => {
                        return roleSearch === user.role || UserRole.MANAGER === user.role;
                    })
                    .map((user: UserObj) => (
                        <div key={user.username} className="d-flex align-items-center">
                            <div className="col p-2">{user.username}</div>
                            <div className="col p-2">{UserRole[user.role]}</div>
                            <div className="col p-2">{user.label}</div>
                            {user.role !== UserRole.MANAGER ? (
                                <Button outline kind="danger" className="ms-2 iconButton" onClick={() => removeUserFromProject(user)}>
                                    <i className="bi bi-caret-down" style={{ fontSize: "1.2rem" }}></i>
                                </Button>
                            ) : (
                                <div />
                            )}
                        </div>
                    ))}
            </div>
            <hr />
            {/* Div for addable users */}
            <div>
                <p>Addable Participants</p>
                {allUsers
                    .filter((user) => {
                        return roleSearch === user.role;
                    })
                    .map((user: UserObj) => (
                        <div key={user.username} className="d-flex align-items-center">
                            <div className="col p-2">{user.username}</div>
                            <div className="col p-2">{UserRole[user.role]}</div>
                            <div className="col p-2">{user.label}</div>
                            <Button outline kind="success" className="ms-2 iconButton" onClick={() => addUserToProject(user)}>
                                <i className="bi bi-caret-up" style={{ fontSize: "1.2rem" }}></i>
                            </Button>
                        </div>
                    ))}
            </div>
            <div>
                <Button kind="primary" className="mt-3 me-3" onClick={() => saveChanges()}>
                    Save Changes
                </Button>
                <Button kind="secondary" className="mt-3" onClick={() => fetchProjectUser()}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default UserAssignment;

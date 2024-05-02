import { useEffect, useState } from "react";
import { UserObj, UserRole } from "../interfaces/UserObj";
import { fetchAllUsers } from "../utils/User";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "bootstrap-icons/font/bootstrap-icons.css";
import ChangeUserRoleModal from "../components/ChangeUserRoleModal";
import * as bootstrap from "bootstrap";
import Gravatar from "../components/Gravatar";
import ConfirmInput from "../components/ConfirmInput";

function ManageUser() {
    const navigate = useNavigate();
    const [allUsers, setAllUsers] = useState<UserObj[]>([]);
    const [selectedUser, setSelectedUser] = useState<number>(-1);
    const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(undefined);

    useEffect(() => {
        reloadAllUsers();
    }, []);

    const reloadAllUsers = async () => {
        try {
            const allUser = await fetchAllUsers();
            setAllUsers(allUser);
        } catch (error) {
            /* eslint-disable no-console */
            console.error(error);
            /* eslint-enable no-console */
            navigate("/");
        }
    };

    const updateUserRole = async (id: number, role: number) => {
        const url = `${import.meta.env.VITE_API_URL as string}users/set/${id}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") ?? "",
            },
            body: JSON.stringify(role),
        });

        if (response.ok) {
            reloadAllUsers();
        }
    };

    const updateUserLabel = async (id: number, label: string, callback: () => void) => {
        const url = `${import.meta.env.VITE_API_URL as string}users/setLabel/${id}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") ?? "",
            },
            body: label,
        });

        if (response.ok) {
            reloadAllUsers();
            callback();
        }
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const updatedUsers = [...allUsers];
        const value = Number(e.target.value);
        if (updatedUsers[index].role === UserRole.MANAGER || value === UserRole.MANAGER) {
            setSelectedUser(index);
            setSelectedRole(value);
            const modal = new bootstrap.Modal("#changeUserRoleModal");
            modal.show();
        } else {
            updateUserRole(updatedUsers[index].id, value);
        }
    };
    const handleLabelInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
        const updatedUsers = [...allUsers];
        updatedUsers[index].label = (e.target as HTMLInputElement).value;
        setAllUsers(updatedUsers);
    };
    const handleLabelChange = (label: string, index: number, callback: () => void) => {
        const updatedUsers = [...allUsers];
        updateUserLabel(updatedUsers[index].id, label, callback);
    };

    return (
        <>
            <div className="container">
                <h1 className="mt-3">
                    <Button onClick={() => navigate("/")} className="me-3 mb-2" outline>
                        <i className="bi bi-arrow-left"></i>
                    </Button>
                    User Role Management
                </h1>
                {allUsers.map((user, index) => (
                    <div key={user.username} className="user-row">
                        <div className="gravatar-container">
                            <Gravatar gravatar={user.gravatar} />
                            <div className="user-info">
                                <h6 className="m-0">{user.username}</h6>
                                <h6 className="m-0 text-secondary email-truncate">{user.email}</h6>
                            </div>
                        </div>
                        <div className="role-container me-3">
                            <select className="form-control" value={user.role} onChange={(e) => handleRoleChange(e, index)}>
                                <option value={UserRole.MANAGER}>Project Manager</option>
                                <option value={UserRole.TEAM}>Team Member</option>
                                <option value={UserRole.CLIENT}>Client</option>
                            </select>
                        </div>
                        <div className="label-container">
                            <ConfirmInput
                                value={user.label}
                                onInput={(e) => handleLabelInput(e, index)}
                                onConfirm={(callback) => handleLabelChange(user.label, index, callback)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <ChangeUserRoleModal
                user={allUsers[selectedUser]}
                role={selectedRole}
                onConfirm={() => {
                    updateUserRole(allUsers[selectedUser].id, selectedRole as number);
                }}
            />
        </>
    );
}

export default ManageUser;

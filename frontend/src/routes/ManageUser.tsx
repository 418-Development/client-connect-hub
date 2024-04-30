import { useEffect, useState } from "react";
import { UserObj, UserRole } from "../interfaces/UserObj";
import { fetchAllUsers } from "../utils/user";
import { useNavigate } from "react-router-dom";
import ChangeUserRoleModal from "../components/ChangeUserRoleModal";
import * as bootstrap from "bootstrap";

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
        const url = (import.meta.env.VITE_API_URL as string) + "users/set/" + id;

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
    const handleLabelChange = () => {
        //
    };

    return (
        <>
            <div className="container">
                {allUsers.map((user: UserObj, index: number) => (
                    <div key={user.username} className="d-flex align-items-center">
                        <div className="col p-2">
                            {user.username} <span className="fs-6 fw-light text-body-secondary">({user.email})</span>
                        </div>
                        <div className="col p-2">
                            <select className="form-control" value={user.role} onChange={(e) => handleRoleChange(e, index)}>
                                <option value={UserRole.MANAGER}>Project Manager</option>
                                <option value={UserRole.TEAM}>Team Member</option>
                                <option value={UserRole.CLIENT}>Client</option>
                            </select>
                        </div>
                        <div className="col p-2">
                            <input
                                type="text"
                                className="form-control"
                                value={user.label}
                                onInput={(e) => handleLabelInput(e, index)}
                                onChange={handleLabelChange}
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

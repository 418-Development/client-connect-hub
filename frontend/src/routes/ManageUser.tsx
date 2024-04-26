import { useEffect, useState } from "react";
import { UserObj, UserRole } from "../interfaces/UserObj";
import { fetchAllUsers } from "../utils/user";
import { useNavigate } from "react-router-dom";

function ManageUser() {
    const navigate = useNavigate();
    const [allUsers, setAllUsers] = useState<UserObj[]>([]);

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
        updateUserRole(updatedUsers[index].id, value);
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
        <div className="container">
            {allUsers.map((user: UserObj, index: number) => (
                <div key={user.username} className="d-flex align-items-center">
                    <div className="col p-2">{user.username}</div>
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
    );
}

export default ManageUser;

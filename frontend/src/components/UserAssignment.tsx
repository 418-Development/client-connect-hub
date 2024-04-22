import { useEffect, useState } from "react";
import { UserObj, UserResponseObj, UserRole } from "../interfaces/UserObj";
import Button from "./Button";

function UserAssignment() {
    const [users, setUsers] = useState<UserObj[]>([]);
    const [roleSearch, setRoleSearch] = useState<UserRole>(UserRole.TEAM);

    useEffect(() => {
        fetchAllUsers();

        setRoleSearch(UserRole.CLIENT)
    }, []);

    const fetchAllUsers = async () => {
        const url = (import.meta.env.VITE_API_URL as string) + "users/all";

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: document.cookie.substring(6)
            },
        });

        console.log(url, response.ok, response.status)

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

            setUsers(userArray)
        }
    }

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
                {users.filter((user) => {return roleSearch === user.role || UserRole.MANAGER === user.role}).map((user: UserObj) => ( 
                    <div key={user.username} className="d-flex align-items-center">
                        <div className="col p-2">{user.username}</div>
                        <div className="col p-2">{UserRole[user.role]}</div>
                        <div className="col p-2">{user.label}</div>
                        <Button outline style="danger" className="ms-2 iconButton">
                            <i className="bi bi-caret-down" style={{ fontSize: "1.2rem" }}></i>
                        </Button>
                    </div>
                ))}
            </div>
            <hr/>
            {/* Div for addable users */}
            <div>
                <p>Addable Participants</p>
                {users.filter((user) => {return roleSearch === user.role}).map((user: UserObj) => (
                    <div key={user.username} className="d-flex align-items-center">
                        <div className="col p-2">{user.username}</div>
                        <div className="col p-2">{UserRole[user.role]}</div>
                        <div className="col p-2">{user.label}</div>
                        <Button outline style="success" className="ms-2 iconButton">
                            <i className="bi bi-caret-up" style={{ fontSize: "1.2rem" }}></i>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserAssignment;
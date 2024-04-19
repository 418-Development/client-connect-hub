import { useEffect, useState } from "react";
import { UserObj, UserRole } from "../interfaces/UserObj";
import Button from "./Button";

function UserAssignment() {
    const [users, setUsers] = useState<UserObj[]>([]);
    const [roleSearch, setRoleSearch] = useState<UserRole>(UserRole.TEAM);

    useEffect(() => {
        setUsers([
            {
                id: 1,
                email: "marc@gmail.com",
                username: "Marc",
                role: UserRole.MANAGER,
                label: "Team Manager",
            },
            {
                id: 2,
                email: "robert@gmail.com",
                username: "Robert",
                role: UserRole.TEAM,
                label: "Ui Designer",
            },
            {
                id: 2,
                email: "felix@gmail.com",
                username: "Felix",
                role: UserRole.CLIENT,
                label: "CEO",
            },
        ]);

        setRoleSearch(UserRole.CLIENT)
    }, []);


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
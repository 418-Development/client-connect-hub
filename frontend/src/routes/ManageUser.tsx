import { useEffect, useState } from "react";
import { UserObj, UserRole } from "../interfaces/UserObj";

function ManageUser() {
    const [users, setUsers] = useState<UserObj[]>([]);

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
    }, []);

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const updatedUsers = [...users];
        const value = Number(e.target.value);
        updatedUsers[index].role = value as UserRole;
        setUsers(updatedUsers);
    };
    const handleLabelInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
        const updatedUsers = [...users];
        updatedUsers[index].label = (e.target as HTMLInputElement).value;
        setUsers(updatedUsers);
    };
    const handleLabelChange = () => {
        //
    };

    return (
        <div className="container">
            {users.map((user: UserObj, index: number) => (
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
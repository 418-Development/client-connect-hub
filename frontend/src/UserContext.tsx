import React, { ReactNode, useState } from "react";

export const UserContext = React.createContext("");
export const UserUpdateContext = React.createContext("");

interface Props {
    children?: ReactNode;
}

export function UserProvider({ children }: Props) {
    const [username, setUserName] = useState("");

    function requestUserInfo() {
        setUserName("Peter");
    }

    return <UserContext.Provider value={username}>{children}</UserContext.Provider>;
}

import React, { ReactNode, useEffect, useState } from "react";
import { UserObj, UserResponseObj, UserRole } from "./interfaces/UserObj";
import { parseUserResponseObj } from "./utils/User";

export const UserContext = React.createContext<UserObj | null>(null);
export const UserUpdateContext = React.createContext(() => {});

interface Props {
    children?: ReactNode;
}

export function UserProvider({ children }: Props) {
    const [user, setUser] = useState<UserObj | null>(null);

    useEffect(() => {
        if (import.meta.env.VITE_DEBUG) {
            setUser({
                id: 0,
                username: "DEBUG",
                email: "DEBUG@DEBUG.DEBUG",
                role: UserRole.MANAGER,
                label: "DEBUG",
                gravatar: "asddsaasd",
            });
        }
    }, []);

    async function updateUserInfo() {
        if (localStorage.getItem("token")) {
            const url = `${import.meta.env.VITE_API_URL as string}users/test/userinfo`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token") ?? "",
                },
            });

            if (response.ok) {
                const data = await response.json();

                const userinfo = data as UserResponseObj;

                setUser(parseUserResponseObj(userinfo));
            } else {
                // Sign out user, because the token is most likely expired.
                localStorage.removeItem("token");
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }

    return (
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={updateUserInfo}>{children}</UserUpdateContext.Provider>
        </UserContext.Provider>
    );
}

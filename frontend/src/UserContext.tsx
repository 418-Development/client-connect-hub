import React, { ReactNode, useState } from "react";
import { UserObj, UserResponseObj, UserRole } from "./interfaces/UserObj";

export const UserContext = React.createContext<UserObj | null>(null);
export const UserUpdateContext = React.createContext(() => {});

interface Props {
    children?: ReactNode;
}

export function UserProvider({ children }: Props) {
    const [user, setUser] = useState<UserObj | null>(null);

    async function updateUserInfo() {
        if (document.cookie.startsWith("token=")) {
            const url = (import.meta.env.VITE_API_URL as string) + "users/test/userinfo";

            console.log("Request userinfo from", url);
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: document.cookie.substring(6),
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("data", data);

                const userinfo = data as UserResponseObj;
                const role = userinfo.roles[0].id as UserRole;

                setUser({
                    id: userinfo.id,
                    username: userinfo.username,
                    email: userinfo.email,
                    role: role,
                    label: "Team Lead",
                });
            } else {
                // Sign out user, because the token is most likely expired.
                setUser(null);
                document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
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

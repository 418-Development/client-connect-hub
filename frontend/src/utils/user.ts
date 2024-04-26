import { UserObj, UserResponseObj, UserRole } from "../interfaces/UserObj";

export function parseUserResponseObjArray(users: UserResponseObj[]): UserObj[] {
    return (
        users
            ?.map((user) => parseUserResponseObj(user))
            .sort((a, b) => {
                if (a.role === b.role) return a.username.localeCompare(b.username);
                if (a.role < b.role) return 1;
                return -1;
            }) ?? []
    );
}

export function parseUserResponseObj(user: UserResponseObj): UserObj {
    return {
        id: user.id,
        username: user.username,
        role: (user.roles[0]?.id as UserRole) ?? UserRole.CLIENT,
        label: user.label ?? "N/A",
        email: user.email,
    };
}

export async function fetchAllUsers() {
    const url = (import.meta.env.VITE_API_URL as string) + "users/all";

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") ?? "",
        },
    });

    if (response.ok) {
        const json = await response.json();
        const userResponseArray = json as UserResponseObj[];

        return parseUserResponseObjArray(userResponseArray);
    } else {
        const error = await response.text();
        return Promise.reject(`Error ${response.status}: ${error}`);
    }
}
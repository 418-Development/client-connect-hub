import { UserObj, UserResponseObj, UserRole } from "../interfaces/UserObj";

export function parseUserResponseObjArray(users: UserResponseObj[]): UserObj[] {
    return users?.map((user) => parseUserResponseObj(user));
}

export function parseUserResponseObj(user: UserResponseObj): UserObj {
    return {
        id: user.id,
        username: user.username,
        role: (user.roles[0]?.id as UserRole) ?? UserRole.CLIENT,
        label: user.label ?? "N/A",
        email: user.email,
        gravatar: user.gravatar,
    };
}

export async function fetchAllUsers() {
    const url = `${import.meta.env.VITE_API_URL as string}users/all`;

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

export async function fetchUser(userId: number) {
    const url = `${import.meta.env.VITE_API_URL as string}users/get/${userId}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") ?? "",
        },
    });

    if (response.ok) {
        const json = await response.json();
        const userResponse = json as UserResponseObj;

        return parseUserResponseObj(userResponse);
    } else {
        const error = await response.text();
        return Promise.reject(`Error ${response.status}: ${error}`);
    }
}

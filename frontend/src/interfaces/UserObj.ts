export interface UserObj {
    id: number;
    username: string;
    role: UserRole;
    email: string;
    gravatar: string;
    label: string;
}

export interface UserResponseObj {
    id: number;
    username: string;
    roles: { id: number; name: string }[];
    email: string;
    gravatar: string;
    label: string;
}

export enum UserRole {
    MANAGER = 3,
    TEAM = 2,
    CLIENT = 1,
}

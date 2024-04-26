export interface UserObj {
    id: number;
    username: string;
    role: UserRole;
    label: string;
    email: string;
}

export interface UserResponseObj {
    id: number;
    username: string;
    roles: { id: number; name: string }[];
    password: string;
    email: string;
    label: string;
}

export enum UserRole {
    MANAGER = 3,
    TEAM = 2,
    CLIENT = 1,
}

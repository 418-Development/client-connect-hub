export interface User {
    username: string;
    role: UserRole;
    label: string;
}

export enum UserRole {
    MANAGER,
    TEAM,
    CLIENT,
}

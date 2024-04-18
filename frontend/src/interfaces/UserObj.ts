export interface UserObj {
    username: string;
    role: UserRole;
    label: string;
}

export enum UserRole {
    MANAGER,
    TEAM,
    CLIENT,
}

import { MessageObj, MessageResponseObj } from "../interfaces/MessageObj";
import { UserRole } from "../interfaces/UserObj";
import { parseUserResponseObj } from "./user";

export function parseMessageResponseObjArray(messages: MessageResponseObj[]): MessageObj[] {
    return (
        messages
            ?.map((message) => parseMessageResponseObj(message))
            .sort((a, b) => {
                if (a.timestamp === b.timestamp) return a.content.localeCompare(b.content);
                if (a.timestamp < b.timestamp) return 1;
                return -1;
            }) ?? []
    );
}

export function parseMessageResponseObj(message: MessageResponseObj): MessageObj {
    return {
        id: message.id,
        user: parseUserResponseObj(message.user),
        content: message.content,
        timestamp: new Date(message.timestamp),
    };
}

export function getDummyMessages() {
    return [
        {
            id: 1,
            user: {
                id: 1,
                email: "team@team.com",
                username: "User 1",
                label: "Developer",
                role: UserRole.TEAM,
                gravatar: "4c20ff949f5c963e00647d9e4ac078f2f4328753918abeb8ee4d9551907a3fe6",
            },
            content: "This is a message!",
            timestamp: new Date("2024-01-01T23:07:32.000Z"),
        },
        {
            id: 2,
            user: {
                id: 2,
                email: "client@gmail.com",
                username: "User 2",
                label: "Client",
                role: UserRole.CLIENT,
                gravatar: "4c20ff949f5c963e00127d9e4ac078f2f4328753918abeb8ee4d9551907a3fe6",
            },
            content: "Ok thanks for that information!",
            timestamp: new Date("2024-01-02T12:30:00.000Z"),
        },
        {
            id: 3,
            user: {
                id: 1,
                email: "team@team.com",
                username: "User 1",
                label: "Developer",
                role: UserRole.TEAM,
                gravatar: "4c20ff949f5c963e00647d9e4ac07fd2f4328753918abeb8ee4d8551907a3fe6",
            },
            content: "Ok...",
            timestamp: new Date("2024-01-02T12:45:00.000Z"),
        },
        {
            id: 4,
            user: {
                id: 3,
                email: "user3@team.com",
                username: "User 3",
                label: "Developer",
                role: UserRole.MANAGER,
                gravatar: "4c20ff949f5c963e00647d9e4ac078f2f4328753918abeb8ee4d8551907a3fe6",
            },
            content: "# Title\n\n**Ok** I got it!",
            timestamp: new Date("2024-01-02T13:02:00.000Z"),
        },
    ];
}

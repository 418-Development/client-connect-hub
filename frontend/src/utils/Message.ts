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
            },
            content: "This is a message!",
            timestamp: new Date("2024-01-01T23:07:32.000Z"),
        },
        {
            id: 2,
            user: {
                id: 2,
                email: "client@client.com",
                username: "User 2",
                label: "Client",
                role: UserRole.CLIENT,
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
            },
            content: "Ok...",
            timestamp: new Date("2024-01-02T12:45:00.000Z"),
        },
        {
            id: 4,
            user: {
                id: 1,
                email: "team@team.com",
                username: "User 1",
                label: "Developer",
                role: UserRole.TEAM,
            },
            content: "...",
            timestamp: new Date("2024-01-02T13:02:00.000Z"),
        },
    ];
}

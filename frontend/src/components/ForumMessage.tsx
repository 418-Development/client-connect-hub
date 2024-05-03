import { useContext } from "react";
import { MessageObj } from "../interfaces/MessageObj";
import { UserContext } from "../UserContext";
import { UserRole } from "../interfaces/UserObj";
import Markdown from "./Markdown";
import Gravatar from "./Gravatar";
import Button from "./Button";

interface Props {
    message: MessageObj;
    onMessageEvent: () => void;
}
function ForumMessage({ message, onMessageEvent }: Props) {
    const userInfo = useContext(UserContext);

    const isClient = userInfo?.role === UserRole.CLIENT;

    const deleteMessage = async () => {
        const url = `${import.meta.env.VITE_API_URL as string}posts/delete-post/${message.projectId}/${message.id}`;

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") ?? "",
            },
        });

        if (response.ok) onMessageEvent();
    };

    return (
        <div
            className={`message message-${
                (isClient && message.user.role === UserRole.CLIENT) || (!isClient && message.user.role !== UserRole.CLIENT) ? "own" : "other"
            } mt-3`}
        >
            <div className="message-container card">
                <div className="message-header card-header px-2 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <Gravatar gravatar={message.user.gravatar} />
                        <h5 className="card-title my-0  mx-2">{message.user.username}</h5>
                        <span className="badge rounded-pill text-bg-secondary">{message.user.label}</span>
                    </div>
                    {message.user.id === userInfo?.id && (
                        <Button outline kind="danger" onClick={deleteMessage}>
                            <i className="bi bi-trash"></i>
                        </Button>
                    )}
                </div>
                <div className="card-body">
                    <Markdown medium>{message.content}</Markdown>
                    <div className="text-body-secondary">{message.timestamp.toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
}

export default ForumMessage;

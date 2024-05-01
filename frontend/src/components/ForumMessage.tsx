import { useContext } from "react";
import { MessageObj } from "../interfaces/MessageObj";
import { UserContext } from "../UserContext";
import { UserRole } from "../interfaces/UserObj";
import Markdown from "./Markdown";
import Gravatar from "./Gravatar";

interface Props {
    message: MessageObj;
}
function ForumMessage({ message }: Props) {
    const userInfo = useContext(UserContext);

    const isClient = userInfo?.role === UserRole.CLIENT;

    return (
        <div
            className={`message message-${
                (isClient && message.user.role === UserRole.CLIENT) || (!isClient && message.user.role !== UserRole.CLIENT) ? "own" : "other"
            } mt-3`}
        >
            <div className="message-container card">
                <div className="message-header card-header d-flex align-items-center">
                    <Gravatar gravatar={message.user.gravatar} />
                    <h5 className="card-title my-0  mx-2">{message.user.username}</h5>
                    <span className="badge rounded-pill text-bg-secondary">{message.user.label}</span>
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

import { useContext } from "react";
import { MessageObj } from "../interfaces/MessageObj";
import { UserContext } from "../UserContext";
import { UserRole } from "../interfaces/UserObj";

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
                <div className="message-header card-header d-flex align-items-end">
                    <h5 className="card-title m-0">{message.user.username}</h5>
                    <span className="badge rounded-pill text-bg-secondary ms-2">{message.user.label}</span>
                </div>
                <div className="card-body">{message.content}</div>
                <div className="card-footer text-body-secondary">
                    {`${message.timestamp.toLocaleTimeString()} ${message.timestamp.toLocaleDateString()}`}
                </div>
            </div>
        </div>
    );
}

export default ForumMessage;

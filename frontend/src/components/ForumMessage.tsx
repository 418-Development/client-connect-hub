import { MessageObj } from "../interfaces/MessageObj";

interface Props {
    message: MessageObj;
}
function ForumMessage({ message }: Props) {
    return (
        <div className={`message message-${message.user.role}`}>
            <div className="message-container">
                <div className="messageHeader">{message.user.username}</div>
                <div>{message.content}</div>
            </div>
        </div>
    );
}

export default ForumMessage;

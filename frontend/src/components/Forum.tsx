import { useState } from "react";
import Button from "./Button";
import MarkdownEditor from "./MarkdownEditor";
import ForumMessage from "./ForumMessage";
import { MessageObj } from "../interfaces/MessageObj";

interface Props {
    messages: MessageObj[];
}

function Forum({ messages }: Props) {
    const [messageContent, setMessageContent] = useState<string>("");

    return (
        <div>
            <div className="mt-3">
                <MarkdownEditor
                    value={messageContent}
                    onValueChanged={(value) => {
                        setMessageContent(value);
                    }}
                    label="Description"
                />
                <Button type="submit" kind="success" className="mt-3">
                    Send Message
                </Button>
            </div>
            <div>
                {messages.map((message: MessageObj) => (
                    <ForumMessage message={message}/>
                ))}
            </div>
        </div>
    );
}

export default Forum;

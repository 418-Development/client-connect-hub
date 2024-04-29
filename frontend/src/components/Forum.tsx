import { useState } from "react";
import Button from "./Button";
import MarkdownEditor from "./MarkdownEditor";
import ForumMessage from "./ForumMessage";
import { MessageObj } from "../interfaces/MessageObj";
import React from "react";

interface Props {
    messages: MessageObj[];
}

function Forum({ messages }: Props) {
    const [messageContent, setMessageContent] = useState<string>("");

    return (
        <div className="p-3">
            <div className="mt-3">
                <MarkdownEditor
                    value={messageContent}
                    onValueChanged={(value) => {
                        setMessageContent(value);
                    }}
                    label="Description"
                />

                <div className="d-flex justify-content-end">
                    <Button type="submit" kind="success" className="mt-3">
                        Send Message
                    </Button>
                </div>
            </div>
            <div>
                {messages.map((message: MessageObj) => (
                    <React.Fragment key={message.id}>
                        <ForumMessage message={message} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default Forum;

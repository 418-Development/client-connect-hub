import { useContext, useState } from "react";
import Button from "./Button";
import MarkdownEditor from "./MarkdownEditor";
import ForumMessage from "./ForumMessage";
import { MessageObj } from "../interfaces/MessageObj";
import React from "react";
import { UserContext } from "../UserContext";

interface Props {
    messages: MessageObj[];
    projectId: number;
}

function Forum({ messages, projectId }: Props) {
    const userInfo = useContext(UserContext);
    const [messageContent, setMessageContent] = useState<string>("");

    const createMessage = async () => {
        if (!userInfo) return;

        const currentDate = new Date();
        const url = `${import.meta.env.VITE_API_URL as string}posts/send-post/${projectId}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") ?? "",
            },
            body: JSON.stringify({
                id: 0,
                content: messageContent,
                postedDate: currentDate.toISOString(),
                projectId: projectId,
                userId: userInfo.id,
            }),
        });

        if (response.ok) {
            console.log("Worked")
        }
    };

    return (
        <div className="p-3">
            <div className="mt-3">
                <div className="p-2 pt-1 border">
                    <MarkdownEditor
                        value={messageContent}
                        onValueChanged={(value) => {
                            setMessageContent(value);
                        }}
                        label="Message"
                    />

                    <div className="d-flex justify-content-end">
                        <Button onClick={ () => createMessage() } kind="success" className="mt-2">
                            Send Message
                        </Button>
                    </div>
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

import Button from "./Button";
import { useEffect, useRef, useState } from "react";
import Markdown from "./Markdown";

interface Props {
    value: string;
    onValueChanged: (value: string) => void;
    label?: string;
    maxLength?: number;
}

function MarkdownEditor({ value, onValueChanged, label, maxLength = 15000 }: Props) {
    const [showPreview, setShowPreview] = useState<boolean>(false);

    const preview = useRef<HTMLDivElement>(null);
    const textArea = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        updateTextArea();
    }, [value]);

    const updateTextArea = () => {
        if (textArea.current) {
            textArea.current.style.height = "auto";
            textArea.current.style.height = `${textArea.current.scrollHeight + 2}px`;
        }
    };

    return (
        <div>
            <div className="d-flex align-items-center">
                {label && <label htmlFor="markdownEditorTextArea">{label}</label>}
                <div className="ms-3 m-2">
                    <Button
                        type="button"
                        kind={showPreview ? "secondary" : "success"}
                        style={{ borderRadius: 0, padding: "2px 10px", fontSize: "0.85rem" }}
                        onClick={() => {
                            setShowPreview(false);
                        }}
                        outline={showPreview}
                    >
                        Write
                    </Button>
                    <Button
                        type="button"
                        kind={showPreview ? "success" : "secondary"}
                        style={{ borderRadius: 0, padding: "2px 10px", fontSize: "0.85rem" }}
                        onClick={() => {
                            setShowPreview(true);
                        }}
                        outline={!showPreview}
                    >
                        Preview
                    </Button>
                </div>
            </div>
            <textarea
                ref={textArea}
                className="form-control"
                id="markdownEditorTextArea"
                placeholder={`Enter ${label ?? "..."}`}
                onChange={(e) => {
                    onValueChanged(e.target.value);
                }}
                value={value}
                hidden={showPreview}
                maxLength={maxLength}
                required
            />
            <div className="invalid-feedback"></div>
            <div ref={preview} hidden={!showPreview} className="card p-1 markdown">
                <Markdown>{value}</Markdown>
            </div>
        </div>
    );
}

export default MarkdownEditor;

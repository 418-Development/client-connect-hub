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

    const getSelection = () => {
        if (!textArea.current) return [0, 0];

        let selectionStart = textArea.current.selectionStart;
        let selectionEnd = textArea.current.selectionEnd;

        while (value[selectionStart] === " " && selectionEnd > selectionStart) selectionStart++;
        while (value[selectionEnd - 1] === " " && selectionEnd > selectionStart) selectionEnd--;

        return [selectionStart, selectionEnd];
    };

    const toggleBoldMarkdown = () => {
        const [selectionStart, selectionEnd] = getSelection();

        const startValue = value.substring(0, selectionStart);
        const selectedValue = value.substring(selectionStart, selectionEnd);
        const endValue = value.substring(selectionEnd);

        if (selectedValue.length === 0) return;

        if (selectedValue.startsWith("**") && selectedValue.endsWith("**") && selectedValue.length > 4) {
            onValueChanged(`${startValue}${selectedValue.substring(2, selectedValue.length - 4)}${endValue}`);
        } else if (startValue.endsWith("**") && endValue.startsWith("**")) {
            onValueChanged(`${startValue.substring(0, startValue.length - 2)}${selectedValue}${endValue.substring(2)}`);
        } else {
            onValueChanged(`${startValue}**${selectedValue}**${endValue}`);
        }

        textArea.current?.focus();
    };

    const toggleItalicMarkdown = () => {
        const [selectionStart, selectionEnd] = getSelection();

        const startValue = value.substring(0, selectionStart);
        const selectedValue = value.substring(selectionStart, selectionEnd);
        const endValue = value.substring(selectionEnd);

        if (selectedValue.length === 0) return;

        if (selectedValue.startsWith("***") && selectedValue.endsWith("***") && selectedValue.length > 6) {
            onValueChanged(`${startValue}${selectedValue.substring(1, selectedValue.length - 1)}${endValue}`);
        } else if (startValue.endsWith("***") && endValue.startsWith("***")) {
            onValueChanged(`${startValue.substring(0, startValue.length - 1)}${selectedValue}${endValue.substring(1)}`);
        } else if (selectedValue.startsWith("**") && selectedValue.endsWith("**") && selectedValue.length > 6) {
            onValueChanged(`${startValue}*${selectedValue}*${endValue}`);
        } else if (startValue.endsWith("**") && endValue.startsWith("**")) {
            onValueChanged(`${startValue}*${selectedValue}*${endValue}`);
        } else if (selectedValue.startsWith("*") && selectedValue.endsWith("*") && selectedValue.length > 6) {
            onValueChanged(`${startValue}${selectedValue.substring(1, selectedValue.length - 1)}${endValue}`);
        } else if (startValue.endsWith("*") && endValue.startsWith("*")) {
            onValueChanged(`${startValue.substring(0, startValue.length - 1)}${selectedValue}${endValue.substring(1)}`);
        } else {
            onValueChanged(`${startValue}*${selectedValue}*${endValue}`);
        }

        textArea.current?.focus();
    };

    const toggleBlockquoteMarkdown = () => {
        // eslint-disable-next-line prefer-const
        let [selectionStart, selectionEnd] = getSelection();
        if (selectionStart > 0) selectionStart--;
        while (value[selectionStart] !== "\n" && selectionStart >= 0) selectionStart--;

        const startValue = value.substring(0, selectionStart);
        let selectedValue = value.substring(selectionStart, selectionEnd);
        const endValue = value.substring(selectionEnd);
        if (selectedValue.match(/\n/g)?.length ?? 0 > 1) {
            selectedValue = selectedValue.replace("\n\n", "\n>\n>");
            value = `${startValue}${selectedValue}${endValue}`;
        }

        if (value[selectionStart + 1] === ">") {
            onValueChanged(`${value.substring(0, selectionStart + 1)}${value.substring(selectionStart + 2)}`);
        } else {
            onValueChanged(`${value.substring(0, selectionStart + 1)}>${value.substring(selectionStart + 1)}`);
        }

        textArea.current?.focus();
    };

    const toggleHeadingMarkdown = () => {
        let [selectionStart] = getSelection();
        if (selectionStart > 0) selectionStart--;
        while (value[selectionStart] !== "\n" && selectionStart >= 0) selectionStart--;

        if (value[selectionStart + 1] === "#" && value[selectionStart + 2] === " ") {
            onValueChanged(`${value.substring(0, selectionStart + 1)}${value.substring(selectionStart + 3)}`);
        } else {
            onValueChanged(`${value.substring(0, selectionStart + 1)}# ${value.substring(selectionStart + 1)}`);
        }

        textArea.current?.focus();
    };

    const toggleHeading2Markdown = () => {
        let [selectionStart] = getSelection();
        if (selectionStart > 0) selectionStart--;
        while (value[selectionStart] !== "\n" && selectionStart >= 0) selectionStart--;

        if (value[selectionStart + 1] === "#" && value[selectionStart + 2] === "#" && value[selectionStart + 3] === " ") {
            onValueChanged(`${value.substring(0, selectionStart + 1)}${value.substring(selectionStart + 4)}`);
        } else {
            onValueChanged(`${value.substring(0, selectionStart + 1)}## ${value.substring(selectionStart + 1)}`);
        }

        textArea.current?.focus();
    };

    const addImageMarkdown = () => {
        const [selectionStart] = getSelection();

        onValueChanged(`${value.substring(0, selectionStart)}![image {100x100}](url)${value.substring(selectionStart)}`);

        textArea.current?.focus();
    };

    return (
        <div>
            <div className="toolbar-wrapper d-flex flex-wrap align-items-center">
                {label && <label htmlFor="markdownEditorTextArea">{label}</label>}
                <div className="toolbar-buttons d-flex ms-3 m-2">
                    <Button
                        type="button"
                        kind={showPreview ? "secondary" : "success"}
                        className="toolbar-btn"
                        onClick={() => setShowPreview(false)}
                        outline={showPreview}
                    >
                        Write
                    </Button>
                    <Button
                        type="button"
                        kind={showPreview ? "success" : "secondary"}
                        className="toolbar-btn"
                        onClick={() => setShowPreview(true)}
                        outline={!showPreview}
                    >
                        Preview
                    </Button>
                </div>
                <div className="markdown-toolbar d-flex flex-wrap">
                    <Button kind="none" outline onClick={toggleBoldMarkdown} className="toolbar-btn">
                        <i className="bi bi-type-bold"></i>
                    </Button>
                    <Button kind="none" outline onClick={toggleItalicMarkdown} className="toolbar-btn">
                        <i className="bi bi-type-italic"></i>
                    </Button>
                    <Button kind="none" outline onClick={toggleBlockquoteMarkdown} className="toolbar-btn">
                        <i className="bi bi-quote"></i>
                    </Button>
                    <Button kind="none" outline onClick={toggleHeadingMarkdown} className="toolbar-btn">
                        <i className="bi bi-type-h1"></i>
                    </Button>
                    <Button kind="none" outline onClick={toggleHeading2Markdown} className="toolbar-btn">
                        <i className="bi bi-type-h2"></i>
                    </Button>
                    <Button kind="none" outline onClick={toggleBoldMarkdown} className="toolbar-btn">
                        <i className="bi bi-list-ol"></i>
                    </Button>
                    <Button kind="none" outline onClick={toggleBoldMarkdown} className="toolbar-btn">
                        <i className="bi bi-list-ul"></i>
                    </Button>
                    <Button kind="none" outline onClick={toggleBoldMarkdown} className="toolbar-btn">
                        <i className="bi bi-link-45deg"></i>
                    </Button>
                    <Button kind="none" outline onClick={addImageMarkdown} className="toolbar-btn">
                        <i className="bi bi-image"></i>
                    </Button>
                </div>
            </div>
            <textarea
                ref={textArea}
                className="form-control"
                id="markdownEditorTextArea"
                placeholder={`Enter ${label ?? "..."}`}
                onChange={(e) => onValueChanged(e.target.value)}
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

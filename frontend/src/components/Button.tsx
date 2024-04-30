import * as bootstrap from "bootstrap";
import * as React from "react";
import { ReactNode, forwardRef, useRef } from "react";

interface Props {
    children?: ReactNode;
    kind?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | "close" | "none";
    outline?: boolean;
    type?: "button" | "submit";
    style?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
    modalTarget?: string;
    dismissModal?: boolean;
    ariaLabel?: string;
    id?: string;
    dataBsToggle?: string;
    ariaExpanded?: boolean;
    title?: string;
}

const Button = forwardRef<HTMLButtonElement, Props>(
    (
        {
            children,
            onClick,
            className = "",
            kind = "primary",
            outline = false,
            type = "button",
            modalTarget,
            dismissModal = false,
            ariaLabel,
            style,
            id,
            dataBsToggle,
            ariaExpanded,
            title,
        },
        ref
    ) => {
        const buttonRef = useRef<HTMLButtonElement>(null);
        const additionalProps: { [key: string]: string } = {};

        if (modalTarget) {
            additionalProps["data-bs-toggle"] = "modal";
            additionalProps["data-bs-target"] = `${modalTarget}`;
        }
        if (dismissModal) {
            additionalProps["data-bs-dismiss"] = "modal";
        }
        if (ariaLabel) {
            additionalProps["aria-label"] = ariaLabel;
        }
        if (title && buttonRef.current) {
            if (!buttonRef?.current) return;
            additionalProps["data-bs-placement"] = "top";
            additionalProps["data-bs-custom-class"] = "custom-tooltip";
            additionalProps["data-bs-title"] = title;
            additionalProps["title"] = title;
            dataBsToggle = "true";
            new bootstrap.Tooltip(buttonRef.current);
        }

        // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useImperativeHandle(ref, () => buttonRef.current!);

        return (
            <button
                ref={buttonRef}
                type={type}
                style={style}
                id={id}
                aria-expanded={ariaExpanded}
                data-bs-toggle={dataBsToggle}
                className={`${kind != "close" && "btn "}btn-${outline ? "outline-" : ""}${kind} ${className}`}
                onClick={onClick}
                title={title}
                {...additionalProps}
            >
                {children}
            </button>
        );
    }
);

export default Button;

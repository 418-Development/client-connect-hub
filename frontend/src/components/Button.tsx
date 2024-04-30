import * as bootstrap from "bootstrap";
import * as React from "react";
import { ReactNode, forwardRef, useEffect, useRef } from "react";

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
    disposeTitle?: boolean;
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
            disposeTitle,
        },
        ref,
    ) => {
        const buttonRef = useRef<HTMLButtonElement>(null);
        const additionalProps: { [key: string]: string } = {};
        const [tooltip, setTooltip] = React.useState<bootstrap.Tooltip | undefined>();

        useEffect(() => {
            if (!title || !buttonRef.current) return;

            setTooltip(
                new bootstrap.Tooltip(buttonRef.current, {
                    title: title,
                    placement: "top",
                    trigger: "hover",
                }),
            );
        }, [title]);

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
                onClick={() => {
                    tooltip?.hide();
                    if (disposeTitle) tooltip?.dispose();
                    if (onClick) onClick();
                }}
                title={title}
                {...additionalProps}
            >
                {children}
            </button>
        );
    },
);

export default Button;

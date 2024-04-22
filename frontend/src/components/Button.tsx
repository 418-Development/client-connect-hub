import { ReactNode, forwardRef } from "react";

interface Props {
    children?: ReactNode;
    kind?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | "close";
    outline?: boolean;
    type?: "button" | "submit";
    style?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
    modalTarget?: string;
    dismissModal?: boolean;
    ariaLabel?: string;
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
        },
        ref
    ) => {
        const additionalProps: { "data-bs-toggle"?: string; "data-bs-target"?: string; "data-bs-dismiss"?: string; "aria-label"?: string } =
            {};

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
        return (
            <button
                ref={ref}
                type={type}
                style={style}
                className={`${kind != "close" ? "btn " : ""}btn-${outline ? "outline-" : ""}${kind} ${className}`}
                onClick={onClick}
                {...additionalProps}
            >
                {children}
            </button>
        );
    }
);

export default Button;

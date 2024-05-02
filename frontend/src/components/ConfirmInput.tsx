import { useState } from "react";

interface Props {
    value: string;
    maxLength?: number;
    minLength?: number;
    onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
    onConfirm?: (callback: () => void) => void;
}

function ConfirmInput({ value, onInput, onConfirm, maxLength = 50, minLength = 1 }: Props) {
    const [showIndicator, setShowIndicator] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    return (
        <form
            action=""
            onSubmit={(e) => {
                e.preventDefault();
                if (onConfirm) {
                    setShowSpinner(true);
                    setShowIndicator(false);
                    onConfirm(() => {
                        setShowSpinner(false);
                    });
                }
            }}
        >
            <div className="d-flex" style={{ position: "relative" }}>
                <input
                    required
                    type="text"
                    className="form-control"
                    value={value}
                    onInput={(e) => {
                        setShowIndicator(true);
                        if (onInput) onInput(e);
                    }}
                    maxLength={maxLength}
                    minLength={minLength}
                />
                <div className="spinner-border" role="status" style={{ position: "absolute", right: 5, top: 2 }} hidden={!showSpinner}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            <div className="form-text ms-3" style={{ position: "absolute", bottom: "-.55rem" }} hidden={!showIndicator}>
                Press 'Enter' to confirm your changes
            </div>
        </form>
    );
}

export default ConfirmInput;

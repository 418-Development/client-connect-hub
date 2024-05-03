import { ReactNode, useRef, useState } from "react";
import Button from "./Button";

interface Props {
    items?: { title: string; callback: () => void }[];
}

function DropdownButton({ items }: Props) {
    const dropdownBtn = useRef<HTMLButtonElement | null>(null);
    const list = useRef<HTMLUListElement | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className="dropend">
                <button
                    ref={dropdownBtn}
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    id="roleSelect"
                    onClick={() => {
                        setOpen((old) => !old);
                    }}
                >
                    Filter by Role
                </button>
                <ul className="dropdown-menu" aria-labelledby="roleSelect" style={{ display: open ? "initial" : "none" }} ref={list}>
                    {items?.map((item) => (
                        <li key={item.title}>
                            <Button
                                className="dropdown-item"
                                type="button"
                                onClick={() => {
                                    setOpen(false);
                                    item.callback();
                                }}
                            >
                                {item.title}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default DropdownButton;

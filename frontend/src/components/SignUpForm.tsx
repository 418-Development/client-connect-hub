import { useRef, useState } from "react";
import Button from "./Button";

interface Props {
    login: () => void;
    username?: string;
    password?: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}

function SignUpForm({ login, setUsername, setPassword, username = "", password = "" }: Props) {
    const [email, setEmail] = useState<string>("");
    const [verifyPassword, setVerifyPassword] = useState<string>("");

    const emailValidation = useRef<HTMLDivElement>(null);
    const emailValidationInput = useRef<HTMLInputElement>(null);

    const usernameValidation = useRef<HTMLDivElement>(null);
    const usernameValidationInput = useRef<HTMLInputElement>(null);

    const passwordValidation = useRef<HTMLDivElement>(null);
    const passwordValidationInput = useRef<HTMLInputElement>(null);
    const closeButton = useRef<HTMLButtonElement>(null);

    const checkPassword = async () => {
        if (password == verifyPassword) {
            const success = await signUp();
            if (success) {
                await login();
                closeButton.current?.click();
            }
        } else if (passwordValidation.current != null) {
            passwordValidationInput.current?.classList.add("is-invalid");
            passwordValidation.current.textContent = "Passwords are not the same. Please try again.";
        }
    };

    const signUp = async () => {
        const url = `${import.meta.env.VITE_API_URL as string  }users/auth/signup`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
            }),
        });

        if (!response.ok) {
            const json = await response.json();
            const msg: string = json.message;
            if (msg.toLowerCase().includes("email")) {
                emailValidationInput.current?.classList.add("is-invalid");
                if (emailValidation.current) emailValidation.current.textContent = msg;
            } else {
                usernameValidationInput.current?.classList.add("is-invalid");
                if (usernameValidation.current) usernameValidation.current.textContent = msg;
            }
        }

        return response.ok;
    };

    return (
        <div id="modalSignUpForm" className="modal fade">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Sign Up Form</h5>
                        <Button ref={closeButton} kind="close" dismissModal={true} ariaLabel="Close"></Button>
                    </div>

                    <form
                        action=""
                        onSubmit={(e) => {
                            e.preventDefault();

                            checkPassword();
                        }}
                    >
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="userEmail">Email address</label>
                                <input
                                    ref={emailValidationInput}
                                    type="email"
                                    autoComplete="email"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        emailValidationInput.current?.classList.remove("is-invalid");
                                    }}
                                    className="form-control"
                                    id="userEmail"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    required
                                    maxLength={50}
                                    data-bs-toggle="tooltip" 
                                    title="Enter your Email here."
                                />
                                <div className="invalid-feedback" ref={emailValidation}></div>
                                <small id="emailHelp" className="form-text text-muted">
                                    We'll never share your email with anyone else.
                                </small>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="Username">Username</label>
                                <input
                                    ref={usernameValidationInput}
                                    type="text"
                                    autoComplete="username"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        usernameValidationInput.current?.classList.remove("is-invalid");
                                    }}
                                    className="form-control"
                                    id="username"
                                    placeholder="Username"
                                    value={username}
                                    required
                                    maxLength={20}
                                    data-bs-toggle="tooltip" 
                                    title="Enter your Username here."
                                />
                                <div className="invalid-feedback" ref={usernameValidation}></div>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="userPassword">Password</label>
                                <input
                                    type="password"
                                    autoComplete="new-password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    className="form-control"
                                    id="userPassword"
                                    placeholder="Password"
                                    value={password}
                                    required
                                    min={6}
                                    maxLength={120}
                                    data-bs-toggle="tooltip" 
                                    title="Enter your Password here."
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="verifyUserPassword">Verify User Password</label>
                                <input
                                    type="password"
                                    autoComplete="new-password"
                                    ref={passwordValidationInput}
                                    onChange={(e) => {
                                        setVerifyPassword(e.target.value);
                                    }}
                                    className="form-control"
                                    id="verifyUserPassword"
                                    placeholder="Verify Password"
                                    required
                                    min={6}
                                    maxLength={120}
                                    data-bs-toggle="tooltip" 
                                    title="Enter your Password here again to verify it."
                                />
                                <div className="invalid-feedback" ref={passwordValidation}></div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Button kind="secondary" dismissModal={true}>
                                Close
                            </Button>
                            <Button type="submit" kind="primary">
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;

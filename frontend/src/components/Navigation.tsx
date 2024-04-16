import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo418-light.png";
import { NavigationItem } from "../enums/navigation";
import Button from "./Button"; // Adjust the import path as necessary

interface Props {
    activeNavigationItem: NavigationItem;
    isAuthenticated: boolean;
    onLogin: (email: string, password: string) => void;
    onSignOut: () => void;
    onSignUp: (email: string, password: string) => void;
    username?: string;
    password?: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    isLoginInvalid: boolean;
}

function Navigation({
    isAuthenticated,
    onLogin,
    onSignOut,
    onSignUp,
    setUsername,
    setPassword,
    username = "",
    password = "",
    isLoginInvalid = false,
}: Props) {
    const navigate = useNavigate();
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const toggleNav = () => setIsNavCollapsed(!isNavCollapsed);

    // Close navbar when resizing to desktop mode
    useEffect(() => {
        const updateNavOnResize = () => {
            if (window.innerWidth >= 992) {
                setIsNavCollapsed(true);
            }
        };

        window.addEventListener("resize", updateNavOnResize);

        return () => window.removeEventListener("resize", updateNavOnResize);
    }, []);

    const login = async () => {
        onLogin(username, password);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid justify-content-between">
                <div className="d-flex align-items-center">
                    <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-3" />
                    <Button onClick={() => navigate("/")} style="link" className="navbar-brand">
                        BMI Calculator
                    </Button>
                </div>
                <Button onClick={toggleNav} className="navbar-toggler ms-auto">
                    {" "}
                    {/* Ensures toggle is to the right */}
                    <span className="navbar-toggler-icon"></span>
                </Button>

                <div className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">{/* Navigation items here, if needed */}</ul>

                    {!isAuthenticated ? (
                        <div id="login-box" className="d-flex flex-column flex-lg-row align-items-center" style={{ gap: "0.5rem" }}>
                            <input
                                className={`form-control form-control-sm mb-2 mb-lg-0 me-lg-2${isLoginInvalid ? " is-invalid" : ""}`}
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                id="email"
                                autoComplete="username"
                                placeholder="Username"
                                aria-label="Username"
                                style={{ height: "40px" }}
                            />
                            <input
                                className={`form-control form-control-sm mb-2 mb-lg-0 me-lg-2${isLoginInvalid ? " is-invalid" : ""}`}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                autoComplete="current-password"
                                placeholder="Password"
                                aria-label="Password"
                                style={{ height: "40px" }}
                            />
                            <div className="d-flex">
                                <Button onClick={login} style="success" outline={true} className="me-2 text-nowrap" type="submit">
                                    Login
                                </Button>
                                <Button
                                    style="primary"
                                    outline={true}
                                    className="text-nowrap"
                                    modalTarget="#modalSignUpForm"
                                    onClick={() => {
                                        onSignUp(username, password);
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Button onClick={() => onSignOut()} style="primary" outline={true}>
                            Sign out
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navigation;

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LogoWhitePulseOnly.png";
import Button from "./Button"; // Adjust the import path as necessary
import { UserContext, UserUpdateContext } from "../UserContext";
import SignUpForm from "./SignUpForm";

function Navigation() {
    const navigate = useNavigate();
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoginInvalid, setIsLoginInvalid] = useState<boolean>(false);
    const updateUserInfo = useContext(UserUpdateContext);

    const userInfo = useContext(UserContext);

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

    useEffect(() => {
        if (document.cookie.startsWith("token=") && userInfo === null) {
            updateUserInfo();
        }
    }, []);

    const login = async () => {
        const url = (import.meta.env.VITE_API_URL as string) + "api/auth/signin";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (response.ok) {
            const json = await response.json();

            const date = new Date();
            date.setTime(date.getTime() + 15 * 60 * 1000);
            document.cookie = `token=${json.tokenType} ${json.accessToken};expires="${date.toUTCString()};SameSite=Strict;path=/`;

            updateUserInfo();
        } else {
            setIsLoginInvalid(true);
            setPassword("");
        }

        console.log(url, response.ok, response.status);
    };

    const signOut = async () => {
        console.log("signOut");
        document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        updateUserInfo();
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid justify-content-between">
                    <div className="d-flex align-items-center">
                        <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-text-top me-3" />
                        <Button onClick={() => navigate("/")} style="link" className="navbar-brand">
                            Client Connect Hub
                        </Button>
                    </div>
                    <Button onClick={toggleNav} className="navbar-toggler ms-auto">
                        {" "}
                        {/* Ensures toggle is to the right */}
                        <span className="navbar-toggler-icon"></span>
                    </Button>

                    <div className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">{/* Navigation items here, if needed */}</ul>

                        {!userInfo ? (
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
                                    <Button style="primary" outline={true} className="text-nowrap" modalTarget="#modalSignUpForm">
                                        Sign Up
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <span className="me-3">{userInfo.username}</span>
                                <Button onClick={signOut} style="primary" outline={true}>
                                    Sign out
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <SignUpForm
                login={login}
                username={username}
                password={password}
                setPassword={setPassword}
                setUsername={setUsername}
            ></SignUpForm>
        </>
    );
}

export default Navigation;

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/LogoPulseWhite.svg";
import Button from "./Button"; // Adjust the import path as necessary
import { UserContext, UserUpdateContext } from "../UserContext";
import SignUpForm from "./SignUpForm";
import Gravatar from "./Gravatar";

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
        if (localStorage.getItem("token") && userInfo === null) {
            updateUserInfo();
        }
    }, []);

    const login = async () => {
        const url = `${import.meta.env.VITE_API_URL as string}users/auth/signin`;

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

            localStorage.setItem("token", `${json.tokenType} ${json.accessToken}`);

            updateUserInfo();
        } else {
            setIsLoginInvalid(true);
            setPassword("");
        }
    };

    const signOut = async () => {
        localStorage.removeItem("token");
        updateUserInfo();
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg custom-client-color" style={{ minWidth: "335px" }}>
                <div className="container-fluid justify-content-between">
                    <div className="d-flex align-items-center">
                        <img
                            src={logo}
                            alt="Logo"
                            width="40"
                            height="40"
                            onClick={() => navigate("/")}
                            style={{ cursor: "pointer" }}
                            className="d-inline-block align-text-top mt-1 logo"
                        />
                        <Button onClick={() => navigate("/")} kind="link" className="navbar-brand">
                            Client Connect Hub
                        </Button>
                    </div>
                    <Button onClick={toggleNav} className="navbar-toggler ms-auto">
                        <span className="navbar-toggler-icon"></span>
                    </Button>

                    <div className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

                        {!userInfo ? (
                            <form
                                action=""
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    login();
                                }}
                            >
                                <div
                                    className={
                                        "d-flex flex-column flex-lg-row align-items-center " +
                                        "justify-content-center justify-content-lg-end w-100"
                                    }
                                    style={{ gap: "0.5rem" }}
                                >
                                    <input
                                        className={`form-control form-control-sm mb-2 mb-lg-0 me-lg-2${isLoginInvalid ? " is-invalid" : ""}`}
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        id="email"
                                        autoComplete="username"
                                        placeholder="Username"
                                        aria-label="Username"
                                        style={{ height: "40px", maxWidth: "200px" }}
                                        data-bs-toggle="tooltip"
                                        title="Enter your Username here."
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
                                        style={{ height: "40px", maxWidth: "200px" }}
                                        data-bs-toggle="tooltip"
                                        title="Enter your Password here."
                                    />
                                    <div className="d-flex justify-content-center">
                                        <Button kind="success" outline={true} className="me-2 text-nowrap" type="submit">
                                            Login
                                        </Button>
                                        <Button
                                            kind="primary"
                                            outline={true}
                                            className="text-nowrap"
                                            type="button"
                                            modalTarget="#modalSignUpForm"
                                        >
                                            Sign Up
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-end w-100">
                                <Gravatar gravatar={userInfo.gravatar} />
                                <div className="mx-2">
                                    <h6 className="m-0">{userInfo.username}</h6>
                                    <h6 className="m-0 text-secondary">{userInfo.email}</h6>
                                </div>
                                <Button onClick={signOut} kind="primary" outline>
                                    Sign out
                                </Button>
                            </div>
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

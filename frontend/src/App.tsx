import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { NavigationItem } from "./enums/navigation";
import SignUpForm from "./components/SignUpForm";
import DebugTimeline from "./routes/DebugTimeline";
import ProjectCard from "./components/ProjectCard";
import ProgressBar from "./components/ProgressBar";
import { UserProvider } from "./UserContext";
import Welcome from "./components/Welcome";
import ManagerFooter from "./components/ManagerFooter";
import ManageUser from "./routes/ManageUser";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoginInvalid, setIsLoginInvalid] = useState<boolean>(false);

    useEffect(() => {
        if (document.cookie.startsWith("token=")) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (username: string, password: string) => {
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

            setIsAuthenticated(true);
        } else {
            setIsLoginInvalid(true);
            setPassword("");
        }

        console.log(url, response.ok, response.status);
    };

    const singUp = async (username: string, password: string) => {
        console.log("username", username, "password", password);

        setUsername(username);
        setPassword(password);
    };

    const signOut = async () => {
        console.log("signOut");
        document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        setIsAuthenticated(false);
    };

    return (
        <div>
            <UserProvider>
                <Navigation
                    activeNavigationItem={NavigationItem.HOME}
                    isAuthenticated={isAuthenticated}
                    onLogin={login}
                    onSignOut={signOut}
                    onSignUp={singUp}
                    username={username}
                    password={password}
                    setPassword={setPassword}
                    setUsername={setUsername}
                    isLoginInvalid={isLoginInvalid}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <div className="container mt-3">{isAuthenticated ? <h2>Authenticated</h2> : <Welcome></Welcome>}</div>
                                <ProjectCard></ProjectCard>
                                <div className="container" style={{ height: "300px" }}>
                                    <ProgressBar progress={70} vertical />
                                </div>

                                <ManagerFooter />

                                <SignUpForm
                                    signin={login}
                                    username={username}
                                    password={password}
                                    setPassword={setPassword}
                                    setUsername={setUsername}
                                ></SignUpForm>
                            </>
                        }
                    />

                    <Route path="/debug/timeline" element={<DebugTimeline />} />

                    <Route path="/manage-user" element={<ManageUser />} />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </UserProvider>
        </div>
    );
}

export default App;

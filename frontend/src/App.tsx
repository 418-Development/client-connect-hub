import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { NavigationItem } from "./enums/navigation";
import SignUpForm from "./components/SignUpForm";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

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
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Navigation
                                activeNavigationItem={NavigationItem.HOME}
                                isAuthenticated={isAuthenticated}
                                onLogin={login}
                                onSignOut={signOut}
                                onSignUp={singUp}
                            />

                            <div className="container mt-3">{isAuthenticated ? <h2>Authenticated</h2> : <h2>Not Authenticated</h2>}</div>

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

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;

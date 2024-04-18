import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { NavigationItem } from "./enums/navigation";
import SignUpForm from "./components/SignUpForm";
import DebugTimeline from "./routes/DebugTimeline";
import ProjectCreation from "./routes/ProjectCreation";
import ProjectCards from "./components/ProjectCards";
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
        const url =
            (import.meta.env.VITE_API_URL as string) + "api/auth/signin";

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
            document.cookie = `token=${json.tokenType} ${
                json.accessToken
            };expires="${date.toUTCString()};SameSite=Strict;path=/`;

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
                <SignUpForm
                    signin={login}
                    username={username}
                    password={password}
                    setPassword={setPassword}
                    setUsername={setUsername}
                ></SignUpForm>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <div className="container mt-3">
                                    {isAuthenticated ? (
                                        <h2>Authenticated</h2>
                                    ) : (
                                        <Welcome></Welcome>
                                    )}
                                </div>

                                <ProjectCards
                                    projects={[
                                        {
                                            id: "Proj1",
                                            title: "Project 1",
                                            estimatedEnd: "2024-01-01",
                                            startDate: "2024-01-01",
                                            description:
                                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet magna sollicitudin, sodales libero quis, auctor leo. Mauris nec odio vitae urna volutpat varius. Ut vehicula, elit in condimentum cursus, metus ante pharetra magna, ac facilisis felis diam vel nisi. Aliquam erat volutpat. Curabitur eu ante massa. Fusce nec felis id libero pretium vehicula. Vivamus lacinia sem vitae enim dictum, in ullamcorper elit ornare. Praesent tristique velit vel eros congue, at pellentesque eros vehicula. Ut ac est nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus id ligula sed turpis sollicitudin dapibus. Sed luctus, mauris sit amet auctor aliquet, mi libero laoreet metus, non accumsan metus massa non nunc. Morbi ut dolor sit amet velit auctor tincidunt. Curabitur hendrerit, massa at aliquam sagittis, sapien leo vehicula risus, vel gravida purus lacus vel nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.",
                                            milestones: [
                                                {
                                                    id: "milestone1",
                                                    title: "Milestone 1",
                                                    estimatedEnd: "01.04.2024",
                                                    isDone: true,
                                                },
                                                {
                                                    id: "milestone2",
                                                    title: "Milestone 2",
                                                    estimatedEnd: "06.04.2024",
                                                    isDone: true,
                                                },
                                                {
                                                    id: "milestone3",
                                                    title: "Milestone 3",
                                                    estimatedEnd: "18.04.2024",
                                                    isDone: false,
                                                },
                                                {
                                                    id: "milestone4",
                                                    title: "Milestone 4",
                                                    estimatedEnd: "22.04.2024",
                                                    isDone: false,
                                                },
                                                {
                                                    id: "milestone5",
                                                    title: "Milestone 5",
                                                    estimatedEnd: "27.04.2024",
                                                    isDone: false,
                                                },
                                            ],
                                        },
                                        {
                                            id: "Proj2",
                                            title: "Project 2",
                                            estimatedEnd: "2024-01-01",
                                            startDate: "2024-01-01",
                                            description:
                                                "Lorem ipsum dolor sit amet.",
                                            milestones: [
                                                {
                                                    id: "milestone1",
                                                    title: "Milestone 1",
                                                    estimatedEnd: "01.04.2024",
                                                    isDone: true,
                                                },
                                                {
                                                    id: "milestone2",
                                                    title: "Milestone 2",
                                                    estimatedEnd: "06.04.2024",
                                                    isDone: true,
                                                },
                                                {
                                                    id: "milestone3",
                                                    title: "Milestone 3",
                                                    estimatedEnd: "18.04.2024",
                                                    isDone: false,
                                                },
                                                {
                                                    id: "milestone4",
                                                    title: "Milestone 4",
                                                    estimatedEnd: "22.04.2024",
                                                    isDone: false,
                                                },
                                                {
                                                    id: "milestone5",
                                                    title: "Milestone 5",
                                                    estimatedEnd: "27.04.2024",
                                                    isDone: false,
                                                },
                                            ],
                                        },
                                        {
                                            id: "Proj3",
                                            title: "Project 3",
                                            estimatedEnd: "2024-01-01",
                                            startDate: "2024-01-01",
                                            description:
                                                "Lorem ipsum dolor sit amet. Aliquam erat volutpat. Curabitur eu ante massa. Fusce nec felis id libero pretium vehicula. Vivamus lacinia sem vitae enim dictum, in ullamcorper elit ornare. Praesent tristique velit vel eros congue, at pellentesque eros vehicula. Ut ac est nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus id ligula sed turpis sollicitudin dapibus. Sed luctus, mauris sit amet auctor aliquet, mi libero laoreet metus, non accumsan metus massa non nunc.",
                                            milestones: [
                                                {
                                                    id: "milestone1",
                                                    title: "Milestone 1",
                                                    estimatedEnd: "01.04.2024",
                                                    isDone: true,
                                                },
                                                {
                                                    id: "milestone2",
                                                    title: "Milestone 2",
                                                    estimatedEnd: "06.04.2024",
                                                    isDone: true,
                                                },
                                                {
                                                    id: "milestone3",
                                                    title: "Milestone 3",
                                                    estimatedEnd: "18.04.2024",
                                                    isDone: false,
                                                },
                                                {
                                                    id: "milestone4",
                                                    title: "Milestone 4",
                                                    estimatedEnd: "22.04.2024",
                                                    isDone: false,
                                                },
                                                {
                                                    id: "milestone5",
                                                    title: "Milestone 5",
                                                    estimatedEnd: "27.04.2024",
                                                    isDone: false,
                                                },
                                            ],
                                        },
                                        {
                                            id: "Proj4",
                                            title: "Project 4",
                                            estimatedEnd: "2024-01-01",
                                            startDate: "2024-01-01",
                                            description:
                                                "Lorem ipsum dolor sit amet.Aliquam erat volutpat. Curabitur eu ante massa.Praesent tristique velit vel eros congue, at pellentesque eros vehicula. Ut ac est nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. ",
                                            milestones: [
                                                {
                                                    id: "milestone1",
                                                    title: "Milestone 1",
                                                    estimatedEnd: "01.04.2024",
                                                    isDone: true,
                                                },
                                                {
                                                    id: "milestone2",
                                                    title: "Milestone 2",
                                                    estimatedEnd: "06.04.2024",
                                                    isDone: true,
                                                },
                                                {
                                                    id: "milestone3",
                                                    title: "Milestone 3",
                                                    estimatedEnd: "18.04.2024",
                                                    isDone: false,
                                                },
                                                {
                                                    id: "milestone4",
                                                    title: "Milestone 4",
                                                    estimatedEnd: "22.04.2024",
                                                    isDone: false,
                                                },
                                                {
                                                    id: "milestone5",
                                                    title: "Milestone 5",
                                                    estimatedEnd: "27.04.2024",
                                                    isDone: false,
                                                },
                                            ],
                                        },
                                    ]}
                                ></ProjectCards>

                                <div
                                    className="container"
                                    style={{ height: "300px" }}
                                >
                                    <ProgressBar progress={70} vertical />
                                </div>

                                <ManagerFooter />
                            </>
                        }
                    />

                    <Route path="/debug/timeline" element={<DebugTimeline />} />

                    <Route path="/projects/*" element={<div>Test</div>} />

                    <Route path="/manage-user" element={<ManageUser />} />

                    <Route
                        path="/create-project"
                        element={<ProjectCreation />}
                    />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </UserProvider>
        </div>
    );
}

export default App;

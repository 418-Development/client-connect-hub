import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import DebugTimeline from "./routes/DebugTimeline";
import ProjectCreation from "./routes/ProjectCreation";
import ProjectCards from "./components/ProjectCards";
import { UserContext } from "./UserContext";
import Welcome from "./components/Welcome";
import ManagerFooter from "./components/ManagerFooter";
import ManageUser from "./routes/ManageUser";
import { UserRole } from "./interfaces/UserObj";

function App() {
    const userInfo = useContext(UserContext);

    return (
        <div>
            <Navigation />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <div className="container mt-3">
                                {userInfo ? (
                                    <>
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
                                                    ],
                                                },
                                                {
                                                    id: "Proj2",
                                                    title: "Project 2",
                                                    estimatedEnd: "2024-01-01",
                                                    startDate: "2024-01-01",
                                                    description: "Lorem ipsum dolor sit amet.",
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
                                                    ],
                                                },
                                                {
                                                    id: "Proj3",
                                                    title: "Project 3",
                                                    estimatedEnd: "2024-01-01",
                                                    startDate: "2024-01-01",
                                                    description:
                                                        "Lorem ipsum dolor sit amet. Aliquam erat volutpat. Curabitur eu ante massa. Fusce nec felis id libero pretium vehicula. Vivamus lacinia sem vitae enim dictum, in ullamcorper elit ornare. Praesent tristique velit vel eros congue, at pellentesque eros vehicula. Ut ac est nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus id ligula sed turpis sollicitudin dapibus. Sed luctus, mauris sit amet auctor aliquet, mi libero laoreet metus, non accumsan metus massa non nunc.",
                                                    milestones: [],
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
                                                    ],
                                                },
                                            ]}
                                        ></ProjectCards>
                                        {userInfo.role === UserRole.MANAGER ? <ManagerFooter /> : <></>}
                                    </>
                                ) : (
                                    <Welcome></Welcome>
                                )}
                            </div>
                        </>
                    }
                />

                {userInfo?.role === UserRole.MANAGER ? ( // Routes only the manager can visit
                    <>
                        <Route path="/debug/timeline" element={<DebugTimeline />} />

                        <Route path="/manage-user" element={<ManageUser />} />

                        <Route path="/create-project" element={<ProjectCreation />} />
                    </>
                ) : (
                    <></>
                )}

                {userInfo ? ( // Routes all logged in user can visit
                    <>
                        <Route path="/projects/*" element={<div>Test</div>} />
                    </>
                ) : (
                    <></>
                )}

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;

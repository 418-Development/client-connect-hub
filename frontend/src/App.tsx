import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import DebugTimeline from "./routes/DebugTimeline";
import ProjectCreation from "./routes/ProjectCreation";
import { UserContext } from "./UserContext";
import ManageUser from "./routes/ManageUser";
import { UserRole } from "./interfaces/UserObj";
import Dashboard from "./routes/Dashboard";

function App() {
    const userInfo = useContext(UserContext);

    return (
        <div>
            <Navigation />
            <Routes>
                {/* Routes only the manager can visit */}
                {userInfo?.role === UserRole.MANAGER ? (
                    <>
                        <Route path="/debug/timeline" element={<DebugTimeline />} />
                        <Route path="/manage-user" element={<ManageUser />} />
                        <Route path="/create-project" element={<ProjectCreation />} />
                        <Route path="/edit-project" element={<ProjectCreation isEditing/>} />
                    </>
                ) : (
                    <></>
                )}

                {/* Routes all logged in user can visit */}
                {userInfo ? (
                    <>
                        <Route path="/projects/*" element={<div>Test</div>} />
                    </>
                ) : (
                    <></>
                )}

                {/* Routes all user can visit */}
                <Route path="/" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;

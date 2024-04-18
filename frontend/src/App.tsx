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
                <Route path="/" element={<Dashboard />} />

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

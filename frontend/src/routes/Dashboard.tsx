import { useContext } from "react";
import { UserContext } from "../UserContext";
import ManagerFooter from "../components/ManagerFooter";
import ProjectCards from "../components/ProjectCards";
import Welcome from "../components/Welcome";
import { UserRole } from "../interfaces/UserObj";

function Dashboard() {
    const userInfo = useContext(UserContext);

    return (
        <>
            <div className="container mt-3">
                {userInfo ? (
                    <>
                        <ProjectCards />
                        {userInfo.role === UserRole.MANAGER ? <ManagerFooter /> : <></>}
                    </>
                ) : (
                    <Welcome></Welcome>
                )}
            </div>
        </>
    );
}

export default Dashboard;

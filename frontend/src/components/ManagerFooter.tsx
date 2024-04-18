import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ManagerFooter() {
    const navigate = useNavigate();

    return (
        <footer className="border-top mt-3">
            <div className="container d-flex justify-content-between mt-3 mb-3">
                <Button onClick={() => navigate("/create-project")}>Create Project</Button>
                <Button onClick={() => navigate("/manage-user")}>Manage User</Button>
            </div>
        </footer>
    );
}

export default ManagerFooter;

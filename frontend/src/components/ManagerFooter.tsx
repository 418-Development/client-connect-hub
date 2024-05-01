import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ManagerFooter() {
    const navigate = useNavigate();

    return (
        <nav className="navbar fixed-bottom custom-client-color">
            <div className="container-fluid justify-content-around">
                <Button outline className="white-btn-text" onClick={() => navigate("/create-project")}>
                    Create Project
                </Button>
                <Button outline className="white-btn-text" onClick={() => navigate("/manage-user")}>
                    Manage User
                </Button>
            </div>
        </nav>
    );
}

export default ManagerFooter;

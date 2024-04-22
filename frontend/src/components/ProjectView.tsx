import { useState, useRef, useEffect, useContext } from "react";
import ProgressBar from "./ProgressBar";
import Timeline from "./Timeline";
import { ProjectObj } from "../interfaces/Project";
import { useNavigate } from "react-router";
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from "./Button";
import { UserContext } from "../UserContext";
import { UserRole } from "../interfaces/UserObj";

function ProjectView() {
    const navigate = useNavigate();
    const userInfo = useContext(UserContext);
    const [isExpanded, setIsExpanded] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);
    const [progress, setProgress] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);
    const project = {
        id: 1,
        title: "Project 1",
        estimatedEnd: "2024-01-01",
        startDate: "2024-01-01",
        description:
            "Lorem ipsum dolor sit amet. " +
            " Consectetur adipiius.Ut ac est nunc. et ve ultricies nisi.Lorem ipsum dolor sit ipiscing elit. Sed sit amet magna sollicitudin, sodales libero quis, auctor leo. Mauris nec odio vitae urna volutpat varius. Ut vehicula, elit in condimentum cursus, metus ante pharetra magna, ac facilisis felis diam vel nisi. Aliquam erat volutpat. Curabitur eu ante massa. Fusce nec felis id libero pretium vehicula. Vivamus lacinia sem vitae enim dictum, in ullamcorper elit ornare. Praesent tristique velit vel eros congue, at pellentesque eros vehicula. Ut ac est nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus id ligula sed turpis sollicitudin dapibus. Sed luctus, mauris sit amet auctor aliquet, mi libero laoreet metus, non accumsan metus massa non nunc. Morbi ut dolor sit amet velit auctor tincidunt. Curabitur hendrerit, massa at aliquam sagittis, sapien leo vehicula risus, vel gravida purus lacus vel nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet magna sollicitudin, sodales libero quis, auctor leo. Mauris nec odio vitae urna volutpat varius. Ut vehicula, elit in condimentum cursus, metus ante pharetra magna, ac facilisis felis diam vel nisi. Aliquam erat volutpat. Curabitur eu ante massa. Fusce nec felis id libero pretium vehicula. Vivamus lacinia sem vitae enim dictum, in ullamcorper elit ornare. Praesent tristique velit vel eros congue, at pellentesque eros vehicula. Ut ac est nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus id ligula sed turpis sollicitudin dapibus. Sed luctus, mauris sit amet auctor aliquet, mi libero laoreet metus, non accumsan metus massa non nunc. Morbi ut dolor sit amet velit auctor tincidunt. Curabitur hendrerit, massa at aliquam sagittis, sapien leo vehicula risus, vel gravida purus lacus vel nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet magna sollicitudin, sodales libero quis, auctor leo. Mauris nec odio vitae urna volutpat varius. Ut vehicula, elit in condimentum cursus, metus ante pharetra magna, ac facilisis felis diam vel nisi. Aliquam erat volutpat. Curabitur eu ante massa. Fusce nec felis id libero pretium vehicula. Vivamus lacinia sem vitae enim dictum, in ullamcorper elit ornare. Praesent tristique velit vel eros congue, at pellentesque eros vehicula. Ut ac est nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus id ligula sed turpis sollicitudin dapibus. Sed luctus, mauris sit amet auctor aliquet, mi libero laoreet metus, non accumsan metus massa non nunc. Morbi ut dolor sit amet velit auctor tincidunt. Curabitur hendrerit, massa at aliquam sagittis, sapien leo vehicula risus, vel gravida purus lacus vel nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. ",
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
                id: "milestone3",
                title: "Milestone 3",
                estimatedEnd: "18.04.2024",
                isDone: false,
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
                id: "milestone3",
                title: "Milestone 3",
                estimatedEnd: "18.04.2024",
                isDone: false,
            },
        ],
    };
    const clients = [
        { id: 1, name: "Marc Beyer", label: "haha" },
        { id: 2, name: "Felix Held", label: "haha" },
        { id: 3, name: "Robert Soumagne", label: "hahaha" },
        { id: 1, name: "Marc Beyer", label: "haha" },
        { id: 2, name: "Felix Held", label: "haha" },
        { id: 3, name: "Robert Soumagne", label: "hahaha" },
        // Add more clients as needed
    ];

    // Dummy data for developers
    const developers = [
        { id: 1, name: "John Doe", label: "Frontend" },
        { id: 2, name: "Jane Smith", label: "Backend" },
        { id: 3, name: "Steve Brown", label: "Fullstack" },
        // Add more developers as needed
    ];

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (project.milestones.length === 0) return;
        let localProgress = 0;
        for (let index = 0; index < project.milestones.length; index++) {
            const milestone = project.milestones[index];
            if (milestone.isDone) localProgress++;
            else break;
        }
        localProgress /= project.milestones.length;
        localProgress *= 100;
        localProgress = Number(localProgress.toFixed(2));
        setProgress(localProgress);
    }, [project]);

    useEffect(() => {
        const handleResize = () => {
            if (contentRef.current) {
                const contentHeight = contentRef.current.scrollHeight;
                const containerHeight = contentRef.current.clientHeight;
                const overflowThreshold = 10;
                setHasOverflow(contentHeight - containerHeight > overflowThreshold);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="card m-3 mx-auto" style={{ width: "85%", boxSizing: "border-box" }}>
            <div className="card-header" style={{ textDecoration: "none" }}>
                <h2 className="m-0 text-truncate">{project.title}</h2>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <p className="text-center">
                            Created:
                            <br />
                            2024-12-14
                        </p>
                    </div>
                    <div className="col">
                        <p className="text-center">
                            Start:
                            <br />
                            2024-12-14
                        </p>
                    </div>
                    <div className="col">
                        <p className="text-center">
                            End:
                            <br />
                            2024-12-14
                        </p>
                    </div>
                </div>

                <h3>Description</h3>
                <div
                    ref={contentRef}
                    className="card p-1"
                    style={{
                        maxHeight: isExpanded ? "none" : "500px",
                        minHeight: "300px",
                        overflow: "hidden",
                        marginBottom: hasOverflow ? "0px" : "1.5em",
                        cursor: "default",
                    }}
                >
                    {project.description}
                </div>
                {hasOverflow && (
                    <div
                        onClick={toggleExpand}
                        className="text-secondary"
                        style={{
                            textAlign: "end",
                            cursor: "pointer",
                            marginTop: "0px",
                        }}
                    >
                        {isExpanded ? "collapse" : "expand"}
                    </div>
                )}

                <div className="container mt-3 mb-3">
                    <div className="row">
                        {/* First main div */}
                        <div className="col-md-5" style={{ width: "280px" }}>
                            <div className="container mt-3 mb-3" style={{ display: "flex", justifyContent: "left", alignItems: "stretch" }}>
                                <div className="d-flex flex-column">
                                    <ProgressBar progress={progress} vertical />
                                </div>
                                <div className="d-flex flex-column">
                                    <Timeline milestones={project.milestones} style={{ marginLeft: "10px" }} />
                                </div>
                            </div>
                        </div>

                        {/* Second main div */}
                        <div className="col-md">
                            <div className="d-flex flex-column" style={{ marginLeft: "10px" }}>
                                <div className="mb-3">
                                    <h3>Client</h3>
                                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                                        {clients.map((client) => (
                                            <div key={client.id} className="col">
                                                <div className="card">
                                                    <div className="card-header text-truncate" style={{ padding: "0.4rem" }}>
                                                        {client.name}
                                                    </div>
                                                    <div className="card-body" style={{ padding: "0.4rem" }}>
                                                        <p
                                                            className="card-text text-truncate"
                                                            style={{ fontSize: "0.8em", lineHeight: "1.2", marginBottom: "0" }}
                                                        >
                                                            {client.label}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3>Developer</h3>
                                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                                        {developers.map((developer) => (
                                            <div key={developer.id} className="col">
                                                <div className="card">
                                                    <div className="card-header text-truncate" style={{ padding: "0.4rem" }}>
                                                        {developer.name}
                                                    </div>
                                                    <div className="card-body" style={{ padding: "0.4rem" }}>
                                                        <p
                                                            className="card-text text-truncate"
                                                            style={{ fontSize: "0.8em", lineHeight: "1.2", marginBottom: "0" }}
                                                        >
                                                            {developer.label}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {userInfo?.role === UserRole.MANAGER ? (
                    <div className="d-flex justify-content-end me-2">
                        <Button style="danger" className="me-2" outline>
                            <i className="bi bi-trash"></i>
                        </Button>
                        <Button style="secondary" outline>
                            <i className="bi bi-pencil"></i>
                        </Button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default ProjectView;

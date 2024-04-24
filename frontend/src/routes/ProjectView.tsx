import { useState, useRef, useEffect, useContext } from "react";
import ProgressBar from "../components/ProgressBar";
import Timeline from "../components/Timeline";
import { ProjectObj, ProjectRespondsObj } from "../interfaces/Project";
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from "../components/Button";
import { UserContext } from "../UserContext";
import { UserRole } from "../interfaces/UserObj";
import { useNavigate, useParams } from "react-router-dom";
import DeleteProjectModal from "../components/DeleteProjectModal";
import Markdown from "../components/Markdown";
import { MilestoneObj } from "../interfaces/Milestone";

function ProjectView() {
    const userInfo = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<ProjectObj | null>(null);

    const [isExpanded, setIsExpanded] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);
    const [progress, setProgress] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (id !== undefined) fetchProjects(id);
    }, [id]);

    const fetchProjects = async (projectId: number | string) => {
        const url = (import.meta.env.VITE_API_URL as string) + `projects/get/${projectId}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") ?? "",
            },
        });

        if (response.ok) {
            const json = await response.json();
            const projectResponse = json as ProjectRespondsObj;

            const milestones: MilestoneObj[] = projectResponse.milestones.map((milestone) => {
                return {
                    id: milestone.milestoneId,
                    title: milestone.milestoneName,
                    estimatedEnd: milestone.estimateDate?.split("T")[0] ?? "",
                    description: milestone.description,
                    isDone: false,
                };
            });

            const curProject = {
                id: projectResponse.projectId,
                title: projectResponse.projectName,
                estimatedEnd: projectResponse.estimateDate.split("T")[0],
                startDate: projectResponse.startDate.split("T")[0],
                description: projectResponse.description,
                milestones: milestones,
                users: [],
            };
            setProject(curProject);
        } else {
            setProject(null);
        }
    };

    const clients = [
        { id: 1, name: "Marc Beyer", label: "haha" },
        { id: 2, name: "Felix Held", label: "haha" },
        { id: 3, name: "Robert Soumagne", label: "hahaha" },
        { id: 4, name: "Marc Beyer", label: "haha" },
        { id: 5, name: "Felix Held", label: "haha" },
        { id: 6, name: "Robert Soumagne", label: "hahaha" },
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
        handleResize();

        if (project === null || project.milestones.length === 0) return;
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
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResize = () => {
        console.log("contentRef.current", contentRef.current);
        if (contentRef.current) {
            const contentHeight = contentRef.current.scrollHeight;
            const containerHeight = contentRef.current.clientHeight;
            const overflowThreshold = 10;
            setHasOverflow(contentHeight - containerHeight > overflowThreshold);
            console.log("setHasOverflow", contentHeight - containerHeight > overflowThreshold);
        }
    };

    return (
        <>
            <div className="card m-3 mx-auto" style={{ width: "85%", boxSizing: "border-box" }}>
                <div className="card-header" style={{ textDecoration: "none" }}>
                    <h2 className="m-0 text-truncate">{project?.title}</h2>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <p className="text-center">
                                Start:
                                <br />
                                {project?.startDate}
                            </p>
                        </div>
                        <div className="col">
                            <p className="text-center">
                                End:
                                <br />
                                {project?.estimatedEnd}
                            </p>
                        </div>
                    </div>

                    <h3>Description</h3>
                    <div
                        ref={contentRef}
                        className="card p-1 markdown"
                        style={{
                            maxHeight: isExpanded ? "none" : "500px",
                            minHeight: "300px",
                            overflow: "hidden",
                            marginBottom: hasOverflow ? "0px" : "1.5em",
                            cursor: "default",
                        }}
                    >
                        <Markdown>{project?.description}</Markdown>
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
                                <div
                                    className="container mt-3 mb-3"
                                    style={{ display: "flex", justifyContent: "left", alignItems: "stretch" }}
                                >
                                    <div className="d-flex flex-column">
                                        <ProgressBar progress={progress} vertical />
                                    </div>
                                    <div className="d-flex flex-column">
                                        <Timeline milestones={project?.milestones ?? []} style={{ marginLeft: "10px" }} />
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
                            <Button kind="danger" className="me-2" outline modalTarget="#deleteProjectModal">
                                <i className="bi bi-trash"></i>
                            </Button>
                            <Button
                                kind="secondary"
                                outline
                                onClick={() => {
                                    navigate(`/edit-project/${project?.id}`);
                                }}
                            >
                                <i className="bi bi-pencil"></i>
                            </Button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            {project && (
                <DeleteProjectModal
                    project={project}
                    onDeletion={() => {
                        navigate("/");
                    }}
                />
            )}
        </>
    );
}

export default ProjectView;

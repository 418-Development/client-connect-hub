import { useState, useRef, useEffect, useContext } from "react";
import ProgressBar from "../components/ProgressBar";
import Timeline from "../components/Timeline";
import { ProjectObj } from "../interfaces/Project";
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from "../components/Button";
import { UserContext } from "../UserContext";
import { UserRole } from "../interfaces/UserObj";
import { useNavigate, useParams } from "react-router-dom";
import DeleteProjectModal from "../components/DeleteProjectModal";
import Markdown from "../components/Markdown";
import { MilestoneObj } from "../interfaces/Milestone";
import MilestoneModal from "../components/MilestoneModal";
import { fetchProject } from "../utils/project";
import Forum from "../components/Forum";
import { getDummyMessages } from "../utils/Message";

function ProjectView() {
    const userInfo = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<ProjectObj | null>(null);

    const [isExpanded, setIsExpanded] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);
    const [progress, setProgress] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const [selectedMilestone, setSelectedMilestone] = useState<MilestoneObj | null>(null);

    useEffect(() => {
        if (id !== undefined) reloadProject(id);
    }, [id]);

    const reloadProject = async (projectId: number | string) => {
        try {
            const project = await fetchProject(projectId);
            setProject(project);
        } catch (error) {
            /* eslint-disable no-console */
            console.error(error);
            /* eslint-enable no-console */
            navigate("/");
        }
    };

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
        if (contentRef.current) {
            const contentHeight = contentRef.current.scrollHeight;
            const containerHeight = contentRef.current.clientHeight;
            const overflowThreshold = 10;
            setHasOverflow(contentHeight - containerHeight > overflowThreshold);
        }
    };

    return (
        <>
            <div className="card m-3 mx-auto" style={{ width: "85%", boxSizing: "border-box" }}>
                <div className="card-header" style={{ textDecoration: "none" }}>
                    <h2 className="m-0 text-truncate">
                        <Button onClick={() => navigate("/")} className="me-3 mb-1" outline>
                            <i className="bi bi-arrow-left"></i>
                        </Button>
                        {project?.title}
                    </h2>
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
                                    <div className="d-flex flex-column" style={{ overflow: "hidden" }}>
                                        <Timeline
                                            milestones={project?.milestones ?? []}
                                            style={{ marginLeft: "10px" }}
                                            showMilestone={(milestone) => {
                                                setSelectedMilestone(milestone);
                                            }}
                                            onMilestoneEvent={() => {
                                                if (id) reloadProject(id);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Second main div */}
                            <div className="col-md">
                                <div className="d-flex flex-column" style={{ marginLeft: "10px" }}>
                                    <div className="mb-3">
                                        <h3>Client</h3>
                                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                                            {project?.users
                                                .filter((user) => user.role === UserRole.CLIENT)
                                                .map((client) => (
                                                    <div key={client.id} className="col">
                                                        <div className="card">
                                                            <div className="card-header text-truncate" style={{ padding: "0.4rem" }}>
                                                                {client.username}
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
                                            {project?.users
                                                .filter((user) => user.role === UserRole.TEAM || user.role === UserRole.MANAGER)
                                                .map((developer) => (
                                                    <div key={developer.id} className="col">
                                                        <div className="card">
                                                            <div className="card-header text-truncate" style={{ padding: "0.4rem" }}>
                                                                {developer.username}
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
                <div>
                    <Forum messages={getDummyMessages()} />
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
            <MilestoneModal milestone={selectedMilestone} />
        </>
    );
}

export default ProjectView;

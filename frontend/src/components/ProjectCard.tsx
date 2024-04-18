import { useState, useRef, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import Timeline from "./Timeline";
import { ProjectObj } from "../interfaces/Project";
import { useNavigate } from "react-router";
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from "./Button";

interface Props {
    project: ProjectObj;
}

function ProjectCard({ project }: Props) {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);
    const [progress, setProgress] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

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
        setProgress(localProgress);
    }, [project]);

    useEffect(() => {
        if (contentRef.current == null) {
            return;
        }
        const contentHeight = contentRef.current.scrollHeight;
        const containerHeight = contentRef.current.clientHeight;
        setHasOverflow(contentHeight > containerHeight);
    }, []);

    return (
        <div className="card m-3 mx-auto" style={{ width: "300px" }}>
            <a
                className="card-header project-card-header"
                onClick={() => {
                    navigate(`/projects/${project.id}`);
                }}
                style={{ textDecoration: "none", cursor: "pointer" }}
            >
                <h2 className="m-0">{project.title}</h2>
            </a>
            <div className="card-body">
                <div
                    ref={contentRef}
                    className="card p-1"
                    style={{
                        maxHeight: isExpanded ? "none" : "115px",
                        minHeight: "115px",
                        overflow: "hidden",
                        marginBottom: hasOverflow ? "0px" : "1.5em",
                        cursor: hasOverflow ? "pointer" : "default",
                    }}
                    onClick={hasOverflow ? toggleExpand : undefined}
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
                <Timeline style={{ height: "160px" }} milestones={project.milestones} onlyShowOverview />
                <div className="container mt-3 mb-3">
                    <ProgressBar progress={progress} />
                </div>

                <div className="d-flex justify-content-end me-2">
                    <Button style="secondary" outline>
                        <i className="bi bi-pencil"></i>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;

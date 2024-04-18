import { useState, useRef, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import Timeline from "./Timeline";
import { ProjectObj } from "../interfaces/Project";

interface Props {
    project: ProjectObj;
}

function ProjectCard({ project }: Props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

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
            <div className="card-header">
                <h2>{project.title}</h2>
            </div>
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
                <Timeline milestones={project.milestones} onlyShowOverview />
                <h5 className="card-title">
                    <div className="container mt-3">
                        <ProgressBar progress={50} height={20} />
                    </div>
                </h5>
            </div>
        </div>
    );
}

export default ProjectCard;

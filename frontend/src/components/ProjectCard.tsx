import { useState, useRef, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import Timeline from "./Timeline";

function ProjectCard() {
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
        if (contentHeight > containerHeight) {
            setHasOverflow(true);
        } else {
            setHasOverflow(false);
        }
    }, []);

    return (
        <div className="container p-3">
            <div className="card" style={{ width: "300px" }}>
                <div className="card-header">
                    <h2>Project 1</h2>
                </div>
                <div className="card-body">
                    <div
                        ref={contentRef}
                        className="card p-1"
                        style={{
                            maxHeight: isExpanded ? "none" : "115px",
                            overflow: "hidden",
                            cursor: "pointer",
                        }}
                        onClick={toggleExpand}
                    >
                        This is an example description: Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.
                    </div>
                    {hasOverflow && (
                        <div
                            onClick={toggleExpand}
                            className="text-secondary"
                            style={{ textAlign: "end", cursor: "pointer" }}
                        >
                            {isExpanded ? "collapse" : "expand"}{" "}
                            <i
                                className={`bi ${
                                    isExpanded
                                        ? "bi-chevron-up"
                                        : "bi-chevron-down"
                                }`}
                            ></i>
                        </div>
                    )}
                    <Timeline
                        milestones={[
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
                                id: "milestone5",
                                title: "Milestone 5",
                                estimatedEnd: "27.04.2024",
                                isDone: false,
                            },
                        ]}
                        onlyShowOverview
                    />
                    <h5 className="card-title">
                        <div className="container mt-3">
                            <ProgressBar progress={75} height={20} />
                        </div>
                    </h5>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;

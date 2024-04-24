import { useEffect, useState } from "react";
import { ProjectObj, ProjectRespondsObj } from "../interfaces/Project";
import ProjectCard from "./ProjectCard";
import DeleteProjectModal from "./DeleteProjectModal";
import { MilestoneObj } from "../interfaces/Milestone";

function ProjectCards() {
    const [projects, setProjects] = useState<ProjectObj[]>([]);
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
    const debugProjects: ProjectObj[] = [
        {
            id: 1,
            title: "Project 1",
            estimatedEnd: "2024-01-01",
            startDate: "2024-01-01",
            description: "Normal",
            milestones: [
                {
                    id: 1,
                    title: "Milestone 1",
                    estimatedEnd: "01.04.2024",
                    description: "description",
                    isDone: true,
                },
                {
                    id: 2,
                    title: "Milestone 2",
                    estimatedEnd: "06.04.2024",
                    description: "description",
                    isDone: true,
                },
                {
                    id: 3,
                    title: "Milestone 3",
                    estimatedEnd: "18.04.2024",
                    description: "description",
                    isDone: false,
                },
                {
                    id: 4,
                    title: "Milestone 4",
                    estimatedEnd: "22.04.2024",
                    description: "description",
                    isDone: false,
                },
            ],
            users: [],
        },
        {
            id: 2,
            title: "Project 2",
            estimatedEnd: "2024-01-01",
            startDate: "2024-01-01",
            description: "Lorem ipsum",
            milestones: [
                {
                    id: 1,
                    title: "Milestone 1",
                    estimatedEnd: "01.04.2024",
                    description: "description",
                    isDone: true,
                },
                {
                    id: 2,
                    title: "Milestone 2",
                    estimatedEnd: "06.04.2024",
                    description: "description",
                    isDone: true,
                },
                {
                    id: 3,
                    title: "Milestone 3",
                    estimatedEnd: "18.04.2024",
                    description: "description",
                    isDone: false,
                },
            ],
            users: [],
        },
        {
            id: 3,
            title: "Project 3",
            estimatedEnd: "2024-01-01",
            startDate: "2024-01-01",
            description: "Normal",
            milestones: [],
            users: [],
        },
        {
            id: 4,
            title: "Project 4",
            estimatedEnd: "2024-01-01",
            startDate: "2024-01-01",
            description: "Normal",
            milestones: [
                {
                    id: 1,
                    title: "Milestone 1",
                    estimatedEnd: "01.04.2024",
                    description: "description",
                    isDone: true,
                },
                {
                    id: 2,
                    title: "Milestone 2",
                    estimatedEnd: "06.04.2024",
                    description: "description",
                    isDone: true,
                },
            ],
            users: [],
        },
    ];

    useEffect(() => {
        fetchAllProjects();
    }, []);

    const fetchAllProjects = async () => {
        const url = (import.meta.env.VITE_API_URL as string) + "projects/all";

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") ?? "",
            },
        });

        console.log(url, response.ok, response.status);

        if (response.ok) {
            const json = await response.json();
            const projectRespondsArray = json as ProjectRespondsObj[];
            const projectArray: ProjectObj[] = [];
            for (let index = 0; index < projectRespondsArray.length; index++) {
                const project = projectRespondsArray[index];

                const milestones: MilestoneObj[] = project.milestones.map((milestone) => {
                    return {
                        id: milestone.milestoneId,
                        title: milestone.milestoneName,
                        estimatedEnd: milestone.estimateDate?.split("T")[0] ?? "",
                        description: milestone.description,
                        isDone: false,
                    };
                });

                projectArray.push({
                    id: project.projectId,
                    title: project.projectName,
                    estimatedEnd: project.estimateDate,
                    startDate: project.startDate,
                    description: project.description,
                    milestones: milestones,
                    users: [],
                });
            }
            console.log("json", json);
            console.log("projectArray", projectArray);
            setProjects(projectArray);
        } else {
            if (import.meta.env.VITE_DEBUG) {
                setProjects(debugProjects);
            } else {
                setProjects([]);
            }
        }
    };

    return (
        <>
            <div className="container p-3">
                <div className="row">
                    {projects.map((project, index) => (
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4" key={project.id}>
                            <ProjectCard
                                project={project}
                                deleteProject={() => {
                                    setSelectedProjectIndex(index);
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <DeleteProjectModal
                project={projects[selectedProjectIndex]}
                onDeletion={() => {
                    fetchAllProjects();
                }}
            />
        </>
    );
}

export default ProjectCards;

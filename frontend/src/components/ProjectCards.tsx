import { useEffect, useState } from "react";
import { ProjectObj } from "../interfaces/Project";
import ProjectCard from "./ProjectCard";
import DeleteProjectModal from "./DeleteProjectModal";
import { MilestoneObj } from "../interfaces/Milestone";
import MilestoneModal from "./MilestoneModal";
import { fetchAllProjects } from "../utils/project";

function ProjectCards() {
    const [projects, setProjects] = useState<ProjectObj[]>([]);
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
    const [selectedMilestone, setSelectedMilestone] = useState<MilestoneObj | null>(null);
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
                    createdDate: "01.04.2024",
                },
                {
                    id: 2,
                    title: "Milestone 2",
                    estimatedEnd: "06.04.2024",
                    description: "description",
                    isDone: true,
                    createdDate: "01.04.2024",
                },
                {
                    id: 3,
                    title: "Milestone 3",
                    estimatedEnd: "18.04.2024",
                    description: "description",
                    isDone: false,
                    createdDate: "01.04.2024",
                },
                {
                    id: 4,
                    title: "Milestone 4",
                    estimatedEnd: "22.04.2024",
                    description: "description",
                    isDone: false,
                    createdDate: "01.04.2024",
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
                    createdDate: "01.04.2024",
                },
                {
                    id: 2,
                    title: "Milestone 2",
                    estimatedEnd: "06.04.2024",
                    description: "description",
                    isDone: true,
                    createdDate: "01.04.2024",
                },
                {
                    id: 3,
                    title: "Milestone 3",
                    estimatedEnd: "18.04.2024",
                    description: "description",
                    isDone: false,
                    createdDate: "01.04.2024",
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
                    createdDate: "01.04.2024",
                },
                {
                    id: 2,
                    title: "Milestone 2",
                    estimatedEnd: "06.04.2024",
                    description: "description",
                    isDone: true,
                    createdDate: "01.04.2024",
                },
            ],
            users: [],
        },
    ];

    useEffect(() => {
        reloadProjects();
    }, []);

    const reloadProjects = async () => {
        try {
            const projects = await fetchAllProjects();
            setProjects(projects);
        } catch (error) {
            console.log(error);
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
                                showMilestone={(milestone) => {
                                    setSelectedMilestone(milestone);
                                }}
                                onMilestoneEvent={() => {
                                    reloadProjects();
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <DeleteProjectModal
                project={projects[selectedProjectIndex]}
                onDeletion={() => {
                    reloadProjects();
                }}
            />
            <MilestoneModal milestone={selectedMilestone} />
        </>
    );
}

export default ProjectCards;

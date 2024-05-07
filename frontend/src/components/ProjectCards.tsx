import { useEffect, useState } from "react";
import { ProjectObj } from "../interfaces/Project";
import ProjectCard from "./ProjectCard";
import DeleteProjectModal from "./DeleteProjectModal";
import { MilestoneObj } from "../interfaces/Milestone";
import MilestoneModal from "./MilestoneModal";
import { fetchAllProjects } from "../utils/Project";

function ProjectCards() {
    const [projects, setProjects] = useState<ProjectObj[]>([]);
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
    const [selectedMilestone, setSelectedMilestone] = useState<MilestoneObj | null>(null);

    useEffect(() => {
        reloadProjects();
    }, []);

    const reloadProjects = async () => {
        try {
            const projects = await fetchAllProjects();
            setProjects(projects);
        } catch (error) {
            /* eslint-disable no-console */
            console.error(error);
            /* eslint-enable no-console */
            setProjects([]);
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

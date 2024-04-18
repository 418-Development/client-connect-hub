import { ProjectObj } from "../interfaces/Project";
import ProjectCard from "./ProjectCard";

interface Props {
    projects: ProjectObj[];
}

function ProjectCards({ projects }: Props) {
    return (
        <div className="container p-3">
            <div className="row">
                {projects.map((project) => (
                    <div
                        className="col-sm-12 col-md-6 col-lg-4 col-xl-4"
                        key={project.id}
                    >
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectCards;

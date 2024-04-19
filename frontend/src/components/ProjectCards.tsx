import { ProjectObj } from "../interfaces/Project";
import ProjectCard from "./ProjectCard";

function ProjectCards() {
    const projects: ProjectObj[] = [
        {
            id: "Proj1",
            title: "Project 1",
            estimatedEnd: "2024-01-01",
            startDate: "2024-01-01",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet magna sollicitudin, sodales libero quis, auctor leo. Mauris nec odio vitae urna volutpat varius. Ut vehicula, elit in condimentum cursus, metus ante pharetra magna, ac facilisis felis diam vel nisi. Aliquam erat volutpat. Curabitur eu ante massa. Fusce nec felis id libero pretium vehicula. Vivamus lacinia sem vitae enim dictum, in ullamcorper elit ornare. Praesent tristique velit vel eros congue, at pellentesque eros vehicula. Ut ac est nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus id ligula sed turpis sollicitudin dapibus. Sed luctus, mauris sit amet auctor aliquet, mi libero laoreet metus, non accumsan metus massa non nunc. Morbi ut dolor sit amet velit auctor tincidunt. Curabitur hendrerit, massa at aliquam sagittis, sapien leo vehicula risus, vel gravida purus lacus vel nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.",
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
            ],
        },
        {
            id: "Proj2",
            title: "Project 2",
            estimatedEnd: "2024-01-01",
            startDate: "2024-01-01",
            description: "Lorem ipsum dolor sit amet.",
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
            ],
        },
        {
            id: "Proj3",
            title: "Project 3",
            estimatedEnd: "2024-01-01",
            startDate: "2024-01-01",
            description:
                "Lorem ipsum dolor sit amet. Aliquam erat volutpat. Curabitur eu ante massa. Fusce nec felis id libero pretium vehicula. Vivamus lacinia sem vitae enim dictum, in ullamcorper elit ornare. Praesent tristique velit vel eros congue, at pellentesque eros vehicula. Ut ac est nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus id ligula sed turpis sollicitudin dapibus. Sed luctus, mauris sit amet auctor aliquet, mi libero laoreet metus, non accumsan metus massa non nunc.",
            milestones: [],
        },
        {
            id: "Proj4",
            title: "Project 4",
            estimatedEnd: "2024-01-01",
            startDate: "2024-01-01",
            description:
                "Lorem ipsum dolor sit amet.Aliquam erat volutpat. Curabitur eu ante massa.Praesent tristique velit vel eros congue, at pellentesque eros vehicula. Ut ac est nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. ",
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
            ],
        },
    ];

    return (
        <div className="container p-3">
            <div className="row">
                {projects.map((project) => (
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4" key={project.id}>
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectCards;